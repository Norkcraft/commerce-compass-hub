import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { SlidersHorizontal, Search, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import ProductCard, { Product } from "@/components/products/ProductCard";
import ProductFilters from "@/components/products/ProductFilters";
import { mockProducts } from "@/data/mockProducts";
import { useIsMobile } from "@/hooks/use-mobile";

const ProductListing = () => {
  const [searchParams] = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [sortOption, setSortOption] = useState("relevance");
  const [filters, setFilters] = useState({
    priceRange: [0, 1000],
    selectedMerchants: [] as string[],
    selectedCategories: [] as string[],
    rating: null as number | null,
  });
  const isMobile = useIsMobile();

  const searchQuery = searchParams.get("search") || "";
  const categoryParam = searchParams.get("category") || "";

  useEffect(() => {
    // In a real app, we would fetch the products from an API
    // For now, we'll use mock data and filter based on the URL parameters
    
    let filtered = [...mockProducts];
    
    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(product => 
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    // Filter by category
    if (categoryParam) {
      filtered = filtered.filter(product => 
        product.category?.toLowerCase() === categoryParam.toLowerCase()
      );
    }
    
    setProducts(filtered);
    setFilteredProducts(filtered);
    
    // If a category is specified in the URL, update the filters
    if (categoryParam) {
      setFilters(prev => ({
        ...prev,
        selectedCategories: [categoryParam]
      }));
    }
  }, [searchQuery, categoryParam]);

  const handleFilterChange = (newFilters: any) => {
    setFilters(newFilters);
    
    let filtered = [...products];
    
    // Apply price range filter
    filtered = filtered.filter(
      product => product.price >= newFilters.priceRange[0] && 
                product.price <= newFilters.priceRange[1]
    );
    
    // Apply merchant filter
    if (newFilters.selectedMerchants.length > 0) {
      filtered = filtered.filter(product => 
        newFilters.selectedMerchants.some((m: string) => 
          product.merchant.toLowerCase().includes(m.toLowerCase())
        )
      );
    }
    
    // Apply category filter
    if (newFilters.selectedCategories.length > 0) {
      filtered = filtered.filter(product => 
        product.category && newFilters.selectedCategories.includes(product.category.toLowerCase())
      );
    }
    
    // Apply rating filter
    if (newFilters.rating) {
      filtered = filtered.filter(product => product.rating >= newFilters.rating!);
    }
    
    setFilteredProducts(filtered);
  };

  const handleSortChange = (value: string) => {
    setSortOption(value);
    
    const sorted = [...filteredProducts];
    
    switch (value) {
      case "price-low":
        sorted.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        sorted.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        sorted.sort((a, b) => b.rating - a.rating);
        break;
      case "discount":
        sorted.sort((a, b) => {
          const discountA = a.discountPercentage || 0;
          const discountB = b.discountPercentage || 0;
          return discountB - discountA;
        });
        break;
      default:
        // relevance - keep original order
        break;
    }
    
    setFilteredProducts(sorted);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col space-y-4">
        <div>
          <h1 className="text-2xl font-bold mb-1">
            {categoryParam 
              ? `${categoryParam.charAt(0).toUpperCase() + categoryParam.slice(1)}` 
              : (searchQuery ? `Search results for "${searchQuery}"` : 'All Products')}
          </h1>
          <p className="text-gray-500">{filteredProducts.length} products found</p>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            {isMobile ? (
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" size="sm" className="mr-2">
                    <SlidersHorizontal className="h-4 w-4 mr-2" />
                    Filters
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-[300px] sm:w-[400px]">
                  <ProductFilters 
                    onFilterChange={handleFilterChange}
                    onMobileClose={() => {}}
                    isMobile={true}
                  />
                </SheetContent>
              </Sheet>
            ) : (
              <div className="hidden sm:block">
                <Button variant="outline" size="sm">
                  <SlidersHorizontal className="h-4 w-4 mr-2" />
                  Filters
                </Button>
              </div>
            )}
          </div>
          
          <div className="flex items-center">
            <span className="text-sm text-gray-500 mr-2">Sort by:</span>
            <Select value={sortOption} onValueChange={handleSortChange}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Relevance" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="relevance">Relevance</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="rating">Highest Rated</SelectItem>
                <SelectItem value="discount">Biggest Discount</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
      
      <div className="flex mt-6 gap-6">
        {/* Filters - Desktop */}
        <div className="hidden md:block w-1/4 max-w-xs">
          <div className="bg-white rounded-lg border p-4 sticky top-20">
            <ProductFilters onFilterChange={handleFilterChange} />
          </div>
        </div>
        
        {/* Product grid */}
        <div className="w-full md:w-3/4">
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <Search className="h-12 w-12 text-gray-300 mb-4" />
              <h3 className="text-lg font-medium mb-2">No products found</h3>
              <p className="text-gray-500 max-w-md">
                We couldn't find any products matching your criteria. Try changing your filters or search query.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductListing;
