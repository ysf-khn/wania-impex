import { NextRequest, NextResponse } from "next/server";
import { client } from "@/sanity/lib/client";
import { groq } from "next-sanity";

interface Product {
  _id: string;
  itemNo: string;
  itemName: string;
  itemCategory: string;
  design?: string;
  finish?: string;
  colors?: string[];
  images: string[];
}

// Primary query: Items with itemName matches (highest priority)
const primarySearchQuery = groq`
  *[_type == "product" && itemName match "*" + $searchTerm + "*"] | order(itemName asc) {
    _id,
    itemNo,
    itemName,
    itemCategory,
    design,
    finish,
    colors,
    "images": images[].asset->url
  }
`;

// Secondary query: Items matching other fields but NOT itemName
const secondarySearchQuery = groq`
  *[_type == "product" && 
    !itemName match "*" + $searchTerm + "*" && 
    (
      design match $searchTerm + "*" ||
      finish match $searchTerm + "*" ||
      $searchTerm in colors[]
    )
  ] | order(itemName asc) {
    _id,
    itemNo,
    itemName,
    itemCategory,
    design,
    finish,
    colors,
    "images": images[].asset->url
  }
`;

export async function GET(request: NextRequest) {
  try {
    // Get search term from query parameters
    const { searchParams } = new URL(request.url);
    const searchTerm = searchParams.get('q');
    const offset = parseInt(searchParams.get('offset') || '0');
    const limit = parseInt(searchParams.get('limit') || '10');

    // Validate search term
    if (!searchTerm || searchTerm.trim().length === 0) {
      return NextResponse.json(
        { products: [], success: false, error: "Search term is required" },
        { status: 400 }
      );
    }

    // Limit search term length to prevent abuse
    if (searchTerm.length > 100) {
      return NextResponse.json(
        { products: [], success: false, error: "Search term too long" },
        { status: 400 }
      );
    }

    // Validate pagination parameters
    if (offset < 0 || limit < 1 || limit > 50) {
      return NextResponse.json(
        { products: [], success: false, error: "Invalid pagination parameters" },
        { status: 400 }
      );
    }

    // Execute both queries
    const [primaryResults, secondaryResults] = await Promise.all([
      client.fetch(primarySearchQuery, { searchTerm: searchTerm.trim() }),
      client.fetch(secondarySearchQuery, { searchTerm: searchTerm.trim() })
    ]);

    // Merge results with primary matches first
    const allResults: Product[] = [...(primaryResults || []), ...(secondaryResults || [])];
    
    // Apply pagination to merged results
    const paginatedResults = allResults.slice(offset, offset + limit);
    const hasMore = offset + limit < allResults.length;

    return NextResponse.json({
      products: paginatedResults,
      success: true,
      hasMore,
    });

  } catch (error) {
    console.error("Search API error:", error);
    
    return NextResponse.json(
      { 
        products: [], 
        success: false, 
        error: "Internal server error" 
      },
      { status: 500 }
    );
  }
}