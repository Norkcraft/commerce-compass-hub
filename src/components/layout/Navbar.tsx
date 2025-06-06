
import { Link } from "react-router-dom";
import { Search, ShoppingCart, User, BarChart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/lib/auth";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useCart } from "@/contexts/CartContext";

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const { user, isAdmin } = useAuth();
  const { getCartCount } = useCart();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      toast.success("Logged out successfully");
      navigate("/");
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const cartCount = getCartCount();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="mr-4 flex">
          <Link to="/" className="flex items-center space-x-2">
            <div className="bg-gradient-to-r from-brand-600 to-accent2-600 text-white p-1 rounded-md">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-6 w-6"
              >
                <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
              </svg>
            </div>
            <span className="hidden font-bold sm:inline-block">
              CommerceCompass
            </span>
          </Link>
        </div>

        <form onSubmit={handleSearch} className="flex-1 flex max-w-xl mx-4">
          <div className="relative w-full">
            <Input
              type="search"
              placeholder="Search for products..."
              className="w-full rounded-md pl-4 pr-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Button
              type="submit"
              variant="ghost"
              size="icon"
              className="absolute right-0 top-0 h-full"
            >
              <Search className="h-4 w-4" />
              <span className="sr-only">Search</span>
            </Button>
          </div>
        </form>

        <div className="flex items-center space-x-1">
          <Link to="/cart">
            <Button variant="ghost" size="icon" className="relative">
              <ShoppingCart className="h-5 w-5" />
              <span className="sr-only">Cart</span>
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 h-4 w-4 text-xs bg-brand-500 text-white rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Button>
          </Link>
          {user ? (
            <>
              <Link to="/account">
                <Button variant="ghost" size="icon">
                  <User className="h-5 w-5" />
                  <span className="sr-only">Account</span>
                </Button>
              </Link>
              {isAdmin && (
                <Link to="/admin">
                  <Button variant="ghost" size="icon">
                    <BarChart className="h-5 w-5" />
                    <span className="sr-only">Admin</span>
                  </Button>
                </Link>
              )}
              <Button
                variant="outline"
                size="sm"
                className="ml-2"
                onClick={handleLogout}
              >
                Logout
              </Button>
            </>
          ) : (
            <Link to="/auth">
              <Button variant="outline" size="sm" className="ml-2">
                Login
              </Button>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
