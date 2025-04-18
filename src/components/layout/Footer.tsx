
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-50 border-t">
      <div className="container mx-auto py-8 px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-bold text-lg mb-4">CommerceCompass</h3>
            <p className="text-gray-600 text-sm">
              The ultimate product aggregation platform that helps you find the best deals across multiple e-commerce websites.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Shop</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/products" className="text-gray-600 hover:text-brand-600">
                  All Products
                </Link>
              </li>
              <li>
                <Link to="/products?category=electronics" className="text-gray-600 hover:text-brand-600">
                  Electronics
                </Link>
              </li>
              <li>
                <Link to="/products?category=clothing" className="text-gray-600 hover:text-brand-600">
                  Clothing
                </Link>
              </li>
              <li>
                <Link to="/products?category=home" className="text-gray-600 hover:text-brand-600">
                  Home & Kitchen
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Account</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/login" className="text-gray-600 hover:text-brand-600">
                  Login
                </Link>
              </li>
              <li>
                <Link to="/register" className="text-gray-600 hover:text-brand-600">
                  Register
                </Link>
              </li>
              <li>
                <Link to="/account" className="text-gray-600 hover:text-brand-600">
                  My Account
                </Link>
              </li>
              <li>
                <Link to="/orders" className="text-gray-600 hover:text-brand-600">
                  Order History
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/contact" className="text-gray-600 hover:text-brand-600">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-gray-600 hover:text-brand-600">
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-gray-600 hover:text-brand-600">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-gray-600 hover:text-brand-600">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-6 border-t border-gray-200">
          <p className="text-center text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} CommerceCompass. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
