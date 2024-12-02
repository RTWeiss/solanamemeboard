import React from "react";
import { Link } from "react-router-dom";
import { Sticker, Heart } from "lucide-react";

export const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <Link
              to="/"
              className="inline-flex items-center gap-2 hover:opacity-80 transition-opacity"
            >
              <Sticker className="h-6 w-6 text-secondary" />
              <span className="text-xl font-bold text-secondary">MEMEGRID</span>
            </Link>
            <p className="mt-2 text-sm text-gray-600">
              The Solana Memegrid lets you purchase pixels to add your meme or
              advertise your brand. Join the community and claim your spot on
              the grid today!
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 mb-3">Resources</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-600 hover:text-secondary">
                  Pixel Grid
                </Link>
              </li>
              <li>
                <Link
                  to="/how-to"
                  className="text-gray-600 hover:text-secondary"
                >
                  How To Guide
                </Link>
              </li>
              <li>
                <a
                  href="https://solana.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-secondary"
                >
                  About Solana
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 mb-3">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/terms"
                  className="text-gray-600 hover:text-secondary"
                >
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link
                  to="/privacy"
                  className="text-gray-600 hover:text-secondary"
                >
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-200">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-600">
              © {new Date().getFullYear()} Memegrid. All rights reserved.
            </p>
            <div className="flex items-center gap-1 text-sm text-gray-600">
              Made with <Heart className="h-4 w-4 text-red-500" /> on Solana
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
