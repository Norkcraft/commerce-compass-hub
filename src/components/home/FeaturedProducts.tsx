
import { Link } from "react-router-dom";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, ExternalLink } from "lucide-react";

// Mock data - in a real app, this would come from an API
const products = [
  {
    id: 1,
    name: "Wireless Noise Cancelling Headphones",
    price: 249.99,
    originalPrice: 299.99,
    image: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2146&q=80",
    rating: 4.7,
    merchant: "ElectroMart",
    merchantLogo: "https://placehold.co/80x30",
    discountPercentage: 17
  },
  {
    id: 2,
    name: "Smart Watch Series 5",
    price: 399.99,
    originalPrice: 449.99,
    image: "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?ixlib=rb-4.0.3&auto=format&fit=crop&w=2072&q=80",
    rating: 4.9,
    merchant: "TechGadgets",
    merchantLogo: "https://placehold.co/80x30",
    discountPercentage: 11
  },
  {
    id: 3,
    name: "Ultra HD 4K Smart TV - 55\"",
    price: 679.99,
    originalPrice: 799.99,
    image: "https://images.unsplash.com/photo-1595145942955-92fedf043f52?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
    rating: 4.5,
    merchant: "HomeElectronics",
    merchantLogo: "https://placehold.co/80x30",
    discountPercentage: 15
  },
  {
    id: 4,
    name: "Ergonomic Gaming Chair",
    price: 189.99,
    originalPrice: 249.99,
    image: "https://images.unsplash.com/photo-1596079890744-c1a0462d0975?ixlib=rb-4.0.3&auto=format&fit=crop&w=2071&q=80",
    rating: 4.6,
    merchant: "GamerZone",
    merchantLogo: "https://placehold.co/80x30",
    discountPercentage: 24
  }
];

const FeaturedProducts = () => {
  return (
    <section className="py-12 px-4 bg-gray-50">
      <div className="container mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900">
            Featured Deals
          </h2>
          <Link to="/products" className="text-brand-600 hover:text-brand-700 font-medium flex items-center">
            View all <ExternalLink className="ml-1 h-4 w-4" />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <Link to={`/products/${product.id}`} key={product.id}>
              <Card className="h-full hover:shadow-md transition-shadow overflow-hidden">
                <div className="relative h-48 bg-gray-100">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                  {product.discountPercentage > 0 && (
                    <Badge className="absolute top-2 right-2 bg-red-500 hover:bg-red-600">
                      {product.discountPercentage}% OFF
                    </Badge>
                  )}
                </div>
                <CardContent className="pt-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-1 text-amber-500">
                      <Star className="fill-current h-4 w-4" />
                      <span className="text-sm font-medium">{product.rating}</span>
                    </div>
                    <div className="text-xs text-gray-500 flex items-center">
                      <img src={product.merchantLogo} alt={product.merchant} className="h-4 mr-1" />
                      {product.merchant}
                    </div>
                  </div>
                  <h3 className="mt-2 font-medium text-gray-900 line-clamp-2">
                    {product.name}
                  </h3>
                  <div className="mt-2 flex items-baseline">
                    <span className="text-lg font-bold text-gray-900">
                      ${product.price}
                    </span>
                    {product.originalPrice > product.price && (
                      <span className="ml-2 text-sm text-gray-500 line-through">
                        ${product.originalPrice}
                      </span>
                    )}
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
