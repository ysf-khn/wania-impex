import type { StructureResolver } from "sanity/structure";

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
  S.list()
    .title("Content")
    .items([
      S.listItem()
        .title("Products")
        .child(
          S.list()
            .title("Products by Category")
            .items([
              S.listItem()
                .title("Altar Tables")
                .child(
                  S.documentList()
                    .title("Altar Tables")
                    .filter(
                      '_type == "product" && itemCategory == "altar-tables"'
                    )
                    .defaultOrdering([{ field: "itemNo", direction: "asc" }])
                ),
              S.listItem()
                .title("Altar Tools")
                .child(
                  S.documentList()
                    .title("Altar Tools")
                    .filter(
                      '_type == "product" && itemCategory == "altar-tools"'
                    )
                    .defaultOrdering([{ field: "itemNo", direction: "asc" }])
                ),
              S.listItem()
                .title("Aluminium Incense Holders")
                .child(
                  S.documentList()
                    .title("Aluminium Incense Holders")
                    .filter(
                      '_type == "product" && itemCategory == "aluminium-incense-holders"'
                    )
                    .defaultOrdering([{ field: "itemNo", direction: "asc" }])
                ),
              S.listItem()
                .title("Brass Grids / Altar Grids")
                .child(
                  S.documentList()
                    .title("Brass Grids / Altar Grids")
                    .filter(
                      '_type == "product" && itemCategory == "brass-grids-altar-grids"'
                    )
                    .defaultOrdering([{ field: "itemNo", direction: "asc" }])
                ),
              S.listItem()
                .title("Brass Incense / Fragrance Burners")
                .child(
                  S.documentList()
                    .title("Brass Incense / Fragrance Burners")
                    .filter(
                      '_type == "product" && itemCategory == "brass-incense-fragrance-burners"'
                    )
                    .defaultOrdering([{ field: "itemNo", direction: "asc" }])
                ),
              S.listItem()
                .title("Cauldrons")
                .child(
                  S.documentList()
                    .title("Cauldrons")
                    .filter('_type == "product" && itemCategory == "cauldrons"')
                    .defaultOrdering([{ field: "itemNo", direction: "asc" }])
                ),
              S.listItem()
                .title("Copper Bracelets")
                .child(
                  S.documentList()
                    .title("Copper Bracelets")
                    .filter(
                      '_type == "product" && itemCategory == "copper-bracelets"'
                    )
                    .defaultOrdering([{ field: "itemNo", direction: "asc" }])
                ),
              S.listItem()
                .title("Copper Grids")
                .child(
                  S.documentList()
                    .title("Copper Grids")
                    .filter(
                      '_type == "product" && itemCategory == "copper-grids"'
                    )
                    .defaultOrdering([{ field: "itemNo", direction: "asc" }])
                ),
              S.listItem()
                .title("Herb Grinders")
                .child(
                  S.documentList()
                    .title("Herb Grinders")
                    .filter(
                      '_type == "product" && itemCategory == "herb-grinders"'
                    )
                    .defaultOrdering([{ field: "itemNo", direction: "asc" }])
                ),
              S.listItem()
                .title("Incense Accessories")
                .child(
                  S.documentList()
                    .title("Incense Accessories")
                    .filter(
                      '_type == "product" && itemCategory == "incense-accessories"'
                    )
                    .defaultOrdering([{ field: "itemNo", direction: "asc" }])
                ),
              S.listItem()
                .title("Lanterns")
                .child(
                  S.documentList()
                    .title("Lanterns")
                    .filter('_type == "product" && itemCategory == "lanterns"')
                    .defaultOrdering([{ field: "itemNo", direction: "asc" }])
                ),
              S.listItem()
                .title("Metal Wall Hangings")
                .child(
                  S.documentList()
                    .title("Metal Wall Hangings")
                    .filter(
                      '_type == "product" && itemCategory == "metal-wall-hangings"'
                    )
                    .defaultOrdering([{ field: "itemNo", direction: "asc" }])
                ),
              S.listItem()
                .title("Offering Bowls")
                .child(
                  S.documentList()
                    .title("Offering Bowls")
                    .filter(
                      '_type == "product" && itemCategory == "offering-bowls"'
                    )
                    .defaultOrdering([{ field: "itemNo", direction: "asc" }])
                ),
              S.listItem()
                .title("Singing Bowls")
                .child(
                  S.documentList()
                    .title("Singing Bowls")
                    .filter(
                      '_type == "product" && itemCategory == "singing-bowls"'
                    )
                    .defaultOrdering([{ field: "itemNo", direction: "asc" }])
                ),
              S.listItem()
                .title("Storage Shelves")
                .child(
                  S.documentList()
                    .title("Storage Shelves")
                    .filter(
                      '_type == "product" && itemCategory == "storage-shelves"'
                    )
                    .defaultOrdering([{ field: "itemNo", direction: "asc" }])
                ),
              S.listItem()
                .title("Ting Shas")
                .child(
                  S.documentList()
                    .title("Ting Shas")
                    .filter('_type == "product" && itemCategory == "ting-shas"')
                    .defaultOrdering([{ field: "itemNo", direction: "asc" }])
                ),
              S.listItem()
                .title("T Light Holders / Incense Holders")
                .child(
                  S.documentList()
                    .title("T Light Holders / Incense Holders")
                    .filter(
                      '_type == "product" && itemCategory == "t-light-holders-incense-holders"'
                    )
                    .defaultOrdering([{ field: "itemNo", direction: "asc" }])
                ),
              S.listItem()
                .title("Trinket / Storage Dishes")
                .child(
                  S.documentList()
                    .title("Trinket / Storage Dishes")
                    .filter(
                      '_type == "product" && itemCategory == "trinket-storage-dishes"'
                    )
                    .defaultOrdering([{ field: "itemNo", direction: "asc" }])
                ),
              S.listItem()
                .title("Wooden Wall Hangings")
                .child(
                  S.documentList()
                    .title("Wooden Wall Hangings")
                    .filter(
                      '_type == "product" && itemCategory == "wooden-wall-hangings"'
                    )
                    .defaultOrdering([{ field: "itemNo", direction: "asc" }])
                ),
              S.listItem()
                .title("Wooden Incense Holders / Grids")
                .child(
                  S.documentList()
                    .title("Wooden Incense Holders / Grids")
                    .filter(
                      '_type == "product" && itemCategory == "wooden-incense-holders-grids"'
                    )
                    .defaultOrdering([{ field: "itemNo", direction: "asc" }])
                ),
              // Show all products regardless of category
              S.listItem()
                .title("All Products")
                .child(
                  S.documentList()
                    .title("All Products")
                    .filter('_type == "product"')
                    .defaultOrdering([{ field: "itemNo", direction: "asc" }])
                ),
            ])
        ),
    ]);
