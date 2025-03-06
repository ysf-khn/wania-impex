"use client";
import React from "react";
import Link from "next/link";
import { Mail, Phone } from "lucide-react";

const ContactPage = () => {
  return (
    <div className="min-h-screen bg-white pt-28 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="font-heading text-4xl font-bold text-gray-800 mb-4">
            Contact Wania Impex
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto font-body">
            Get in touch with us for any inquiries about our spiritual and
            ritual products.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Contact Information */}
          <div className="bg-amber-50/50 rounded-xl p-8 space-y-6">
            <div>
              <h3 className="font-semibold text-gray-800 font-body mb-4">
                Our Location
              </h3>
              <div className="w-full h-96 relative">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3495.4092888747236!2d78.78044907550918!3d28.826672275238188!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390afbb0b6ec33b7%3A0x799450448ad516e2!2sWania%20Impex!5e0!3m2!1sen!2sin!4v1741112936949!5m2!1sen!2sin"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="absolute inset-0 w-full h-full rounded-lg"
                />
              </div>
            </div>
          </div>

          {/* Additional Information Column */}
          <div className="bg-white rounded-xl shadow-md p-8 space-y-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 font-heading">
              Contact Information
            </h2>
            <div className="space-y-4 font-body">
              <div className="flex items-center space-x-3">
                <Mail className="h-6 w-6 text-amber-600" />
                <div>
                  <h3 className="font-semibold text-gray-800">Email</h3>
                  <a
                    href="mailto:info@waniaimpexind.com"
                    className="text-gray-600 hover:text-amber-600 transition-colors"
                  >
                    info@waniaimpexind.com
                  </a>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <Phone className="h-6 w-6 text-amber-600" />
                <div>
                  <h3 className="font-semibold text-gray-800">Phone</h3>
                  <a
                    href="tel:+919355254435"
                    className="text-gray-600 hover:text-amber-600 transition-colors"
                  >
                    +91 93552 54435
                  </a>
                </div>
              </div>
            </div>

            <h2 className="text-2xl font-bold text-gray-800 mt-6 mb-4 font-heading">
              Business Hours
            </h2>
            <div className="space-y-2 font-body">
              <p className="text-gray-600">
                <span className="font-bold">Monday - Saturday:</span> 10:00 AM -
                7:00 PM
              </p>
              <p className="text-gray-600">
                <span className="font-bold">Sunday:</span> Closed
              </p>
            </div>

            <h2 className="text-2xl font-bold text-gray-800 mt-6 mb-4 font-heading">
              Quick Links
            </h2>
            <div className="space-y-2 font-body">
              <Link
                href="/about-us"
                className="text-gray-600 hover:text-amber-600 transition-colors block"
              >
                About Us
              </Link>
              <Link
                href="/all-categories"
                className="text-gray-600 hover:text-amber-600 transition-colors block"
              >
                Our Products
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
