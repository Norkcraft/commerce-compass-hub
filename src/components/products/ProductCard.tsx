import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";
import { Link } from "react-router-dom";

export interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  rating: number;
  merchant: string;
  merchantLogo: string;
  category: string;
  description?: string;
  stock?: number;
  discountPercentage?: number;
}

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const discountPercentage = product.discountPercentage || (product.originalPrice ? 
    Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) : 0);

  return (
    <Link to={`/products/${product.id}`}>
      <Card className="h-full hover:shadow-md transition-shadow overflow-hidden">
        <div className="relative h-48 bg-gray-100">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
          />
          {discountPercentage > 0 && (
            <Badge className="absolute top-2 right-2 bg-red-500 hover:bg-red-600">
              {discountPercentage}% OFF
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
              ${product.price.toFixed(2)}
            </span>
            {product.originalPrice && product.originalPrice > product.price && (
              <span className="ml-2 text-sm text-gray-500 line-through">
                ${product.originalPrice.toFixed(2)}
              </span>
            )}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default ProductCard;
