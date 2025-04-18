
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from "@/components/ui/accordion";
import { Star, X } from "lucide-react";

interface ProductFiltersProps {
  onFilterChange: (filters: any) => void;
  onMobileClose?: () => void;
  isMobile?: boolean;
}

const merchants = [
  { id: "electromart", name: "ElectroMart" },
  { id: "techgadgets", name: "TechGadgets" },
  { id: "homeelectronics", name: "HomeElectronics" },
  { id: "gamerzone", name: "GamerZone" },
  { id: "megastore", name: "MegaStore" }
];

const categories = [
  { id: "electronics", name: "Electronics" },
  { id: "clothing", name: "Clothing & Apparel" },
  { id: "home", name: "Home & Kitchen" },
  { id: "beauty", name: "Beauty & Health" },
  { id: "sports", name: "Sports & Outdoors" }
];

const ProductFilters = ({ onFilterChange, onMobileClose, isMobile }: ProductFiltersProps) => {
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [selectedMerchants, setSelectedMerchants] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [rating, setRating] = useState<number | null>(null);

  const handlePriceChange = (values: number[]) => {
    setPriceRange(values);
    applyFilters({ priceRange: values });
  };

  const handleMerchantChange = (merchantId: string, checked: boolean) => {
    const newSelectedMerchants = checked
      ? [...selectedMerchants, merchantId]
      : selectedMerchants.filter(id => id !== merchantId);
    
    setSelectedMerchants(newSelectedMerchants);
    applyFilters({ selectedMerchants: newSelectedMerchants });
  };

  const handleCategoryChange = (categoryId: string, checked: boolean) => {
    const newSelectedCategories = checked
      ? [...selectedCategories, categoryId]
      : selectedCategories.filter(id => id !== categoryId);
    
    setSelectedCategories(newSelectedCategories);
    applyFilters({ selectedCategories: newSelectedCategories });
  };

  const handleRatingChange = (value: number) => {
    setRating(rating === value ? null : value);
    applyFilters({ rating: rating === value ? null : value });
  };

  const applyFilters = (changedFilters: any) => {
    const filters = {
      priceRange,
      selectedMerchants,
      selectedCategories,
      rating,
      ...changedFilters
    };
    onFilterChange(filters);
  };

  const resetFilters = () => {
    setPriceRange([0, 1000]);
    setSelectedMerchants([]);
    setSelectedCategories([]);
    setRating(null);
    onFilterChange({
      priceRange: [0, 1000],
      selectedMerchants: [],
      selectedCategories: [],
      rating: null
    });
  };

  return (
    <div className={`${isMobile ? 'p-4' : ''}`}>
      {isMobile && (
        <div className="flex items-center justify-between mb-4 pb-4 border-b">
          <h2 className="font-semibold text-lg">Filters</h2>
          <Button variant="ghost" size="icon" onClick={onMobileClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>
      )}
      
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-medium">Filters</h3>
        <Button variant="ghost" size="sm" onClick={resetFilters} className="text-sm">
          Reset
        </Button>
      </div>

      <Accordion type="multiple" defaultValue={["price", "merchant", "category", "rating"]}>
        <AccordionItem value="price">
          <AccordionTrigger>Price Range</AccordionTrigger>
          <AccordionContent>
            <div className="px-1 py-4">
              <Slider
                defaultValue={[0, 1000]}
                max={1000}
                step={10}
                value={priceRange}
                onValueChange={handlePriceChange}
              />
              <div className="flex justify-between mt-2">
                <span className="text-sm">${priceRange[0]}</span>
                <span className="text-sm">${priceRange[1]}</span>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="merchant">
          <AccordionTrigger>Merchant</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              {merchants.map((merchant) => (
                <div key={merchant.id} className="flex items-center space-x-2">
                  <Checkbox 
                    id={`merchant-${merchant.id}`} 
                    checked={selectedMerchants.includes(merchant.id)}
                    onCheckedChange={(checked) => 
                      handleMerchantChange(merchant.id, checked as boolean)
                    }
                  />
                  <Label 
                    htmlFor={`merchant-${merchant.id}`}
                    className="text-sm cursor-pointer"
                  >
                    {merchant.name}
                  </Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="category">
          <AccordionTrigger>Category</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              {categories.map((category) => (
                <div key={category.id} className="flex items-center space-x-2">
                  <Checkbox 
                    id={`category-${category.id}`}
                    checked={selectedCategories.includes(category.id)}
                    onCheckedChange={(checked) => 
                      handleCategoryChange(category.id, checked as boolean)
                    }
                  />
                  <Label 
                    htmlFor={`category-${category.id}`}
                    className="text-sm cursor-pointer"
                  >
                    {category.name}
                  </Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="rating">
          <AccordionTrigger>Rating</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              {[4, 3, 2, 1].map((starRating) => (
                <div 
                  key={starRating} 
                  className={`flex items-center space-x-2 p-1.5 rounded cursor-pointer ${
                    rating === starRating ? 'bg-gray-100' : ''
                  }`}
                  onClick={() => handleRatingChange(starRating)}
                >
                  <div className="flex">
                    {Array(5).fill(0).map((_, index) => (
                      <Star 
                        key={index} 
                        className={`h-4 w-4 ${
                          index < starRating ? 'text-amber-500 fill-amber-500' : 'text-gray-300'
                        }`} 
                      />
                    ))}
                  </div>
                  <span className="text-sm">{starRating}+ stars</span>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default ProductFilters;
