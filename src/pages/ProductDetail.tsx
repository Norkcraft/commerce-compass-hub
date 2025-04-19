
import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { 
  Star, 
  ShoppingCart, 
  ArrowLeft, 
  Heart, 
  Share2, 
  ChevronRight, 
  Store, 
  Clock, 
  TrendingDown 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { mockProducts } from "@/data/mockProducts";
import { Product } from "@/components/products/ProductCard";
import { useToast } from "@/hooks/use-toast";
import { useCart } from "@/contexts/CartContext";
import { Input } from "@/components/ui/input";

const ProductDetail = () => {
  const { productId } = useParams<{ productId: string }>();
  const { toast } = useToast();
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
  
  // In a real app, we would fetch this data from an API
  const product = mockProducts.find(p => p.id === Number(productId)) || mockProducts[0];
  
  const handleAddToCart = () => {
    addToCart(product, quantity);
  };
  
  // Mock price history data
  const priceHistory = [
    { date: "Apr 10", price: product.price + 20 },
    { date: "Apr 5", price: product.price + 15 },
    { date: "Apr 1", price: product.price + 10 },
    { date: "Mar 25", price: product.price + 5 },
    { date: "Mar 20", price: product.price }
  ];
  
  // Mock product alternatives from different merchants
  const merchantAlternatives = [
    { 
      merchant: "ElectroMart", 
      price: product.price, 
      logo: "https://placehold.co/80x30",
      delivery: "Free delivery",
      deliveryDate: "Tomorrow" 
    },
    { 
      merchant: "TechGadgets", 
      price: product.price * 1.05, 
      logo: "https://placehold.co/80x30",
      delivery: "$5.99 delivery",
      deliveryDate: "2-3 days" 
    },
    { 
      merchant: "HomeElectronics", 
      price: product.price * 0.98, 
      logo: "https://placehold.co/80x30",
      delivery: "Free delivery",
      deliveryDate: "3-5 days" 
    }
  ];
  
  // Mock images
  const productImages = [
    product.image,
    "https://images.unsplash.com/photo-1546435770-a3e426bf472b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2146&q=80",
    "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
  ];
  
  const discountPercentage = product.discountPercentage || (product.originalPrice ? 
    Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) : 0);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Link to="/products" className="text-brand-600 hover:text-brand-700 flex items-center text-sm">
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back to products
        </Link>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        {/* Product Images */}
        <div>
          <div className="relative bg-gray-100 rounded-lg overflow-hidden mb-4 h-[400px]">
            <img 
              src={productImages[selectedImage]} 
              alt={product.name} 
              className="w-full h-full object-contain"
            />
            {discountPercentage > 0 && (
              <Badge className="absolute top-4 right-4 bg-red-500 hover:bg-red-600">
                {discountPercentage}% OFF
              </Badge>
            )}
          </div>
          <div className="flex space-x-3">
            {productImages.map((image, index) => (
              <div 
                key={index}
                className={`h-20 w-20 border rounded-md cursor-pointer overflow-hidden ${
                  selectedImage === index ? 'border-brand-500 ring-2 ring-brand-200' : 'border-gray-200'
                }`}
                onClick={() => setSelectedImage(index)}
              >
                <img src={image} alt={`${product.name} - view ${index + 1}`} className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
        </div>
        
        {/* Product Info */}
        <div>
          <div className="mb-6">
            <div className="flex items-center text-sm text-gray-500 mb-2">
              <Link to={`/products?category=${product.category}`} className="hover:text-brand-600">
                {product.category}
              </Link>
              <ChevronRight className="h-4 w-4 mx-1" />
              <span>{product.name.split(' ')[0]}</span>
            </div>
            
            <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
            
            <div className="flex items-center space-x-4 mb-4">
              <div className="flex items-center">
                <div className="flex text-amber-500">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`h-5 w-5 ${i < Math.floor(product.rating) ? 'fill-current' : ''}`} 
                    />
                  ))}
                </div>
                <span className="ml-2 text-gray-600">{product.rating} ({Math.floor(Math.random() * 500) + 100} reviews)</span>
              </div>
              
              <div className="flex items-center text-gray-500">
                <Store className="h-4 w-4 mr-1" />
                <span>{product.merchant}</span>
              </div>
            </div>
            
            <div className="flex items-center mb-6">
              <span className="text-3xl font-bold mr-3">${product.price.toFixed(2)}</span>
              {product.originalPrice && product.originalPrice > product.price && (
                <span className="text-xl text-gray-500 line-through">${product.originalPrice.toFixed(2)}</span>
              )}
              
              {discountPercentage > 0 && (
                <Badge variant="outline" className="ml-3 text-red-500 border-red-200">
                  Save ${(product.originalPrice! - product.price).toFixed(2)}
                </Badge>
              )}
            </div>
            
            <div className="flex items-center space-x-2 px-3 py-2 bg-green-50 text-green-700 rounded-md mb-6">
              <TrendingDown className="h-5 w-5" />
              <p className="text-sm font-medium">
                Lowest price in the last 30 days! <span className="underline cursor-pointer">View price history</span>
              </p>
            </div>
            
            <div className="flex flex-col space-y-4 mb-8">
              <div className="flex items-center space-x-4">
                <div className="w-32">
                  <label htmlFor="quantity" className="text-sm font-medium mb-1 block">
                    Quantity
                  </label>
                  <div className="flex">
                    <Button 
                      type="button" 
                      variant="outline" 
                      size="icon" 
                      onClick={() => setQuantity(q => Math.max(1, q - 1))}
                      className="rounded-r-none"
                    >
                      -
                    </Button>
                    <Input 
                      id="quantity"
                      type="number" 
                      min="1" 
                      value={quantity} 
                      onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                      className="w-14 text-center rounded-none"
                    />
                    <Button 
                      type="button" 
                      variant="outline" 
                      size="icon" 
                      onClick={() => setQuantity(q => q + 1)}
                      className="rounded-l-none"
                    >
                      +
                    </Button>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <Button size="lg" className="bg-brand-600 hover:bg-brand-700 w-2/3" onClick={handleAddToCart}>
                  <ShoppingCart className="mr-2 h-5 w-5" />
                  Add to Cart
                </Button>
                <Button size="lg" variant="outline" className="w-1/3">
                  <Heart className="mr-2 h-5 w-5" />
                  Save
                </Button>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="flex items-center">
                <Clock className="h-4 w-4 text-gray-500 mr-2" />
                <span>Free delivery by <strong>Tomorrow</strong></span>
              </div>
              <div className="flex items-center">
                <Store className="h-4 w-4 text-gray-500 mr-2" />
                <span>In stock: <strong>Available</strong></span>
              </div>
            </div>
          </div>
          
          <Card>
            <CardContent className="p-0">
              <Tabs defaultValue="merchants">
                <TabsList className="w-full grid grid-cols-3">
                  <TabsTrigger value="merchants">Other Merchants</TabsTrigger>
                  <TabsTrigger value="price-history">Price History</TabsTrigger>
                  <TabsTrigger value="delivery">Delivery</TabsTrigger>
                </TabsList>
                
                <TabsContent value="merchants" className="p-4">
                  <div className="space-y-3">
                    {merchantAlternatives.map((alt, index) => (
                      <div key={index} className="flex items-center justify-between py-2">
                        <div className="flex items-center">
                          <img src={alt.logo} alt={alt.merchant} className="h-6 mr-3" />
                          <div>
                            <p className="font-medium">{alt.merchant}</p>
                            <p className="text-xs text-gray-500">{alt.delivery} | {alt.deliveryDate}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-bold">${alt.price.toFixed(2)}</p>
                          <Button variant="link" size="sm" className="h-auto p-0 text-xs text-brand-600">
                            View Offer
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>
                
                <TabsContent value="price-history" className="p-4">
                  <div className="space-y-3">
                    <div className="h-40 bg-gray-100 rounded-md flex items-center justify-center text-gray-500">
                      [Price history chart would go here]
                    </div>
                    <div className="text-sm">
                      <p className="font-medium mb-2">Price History</p>
                      <div className="space-y-1">
                        {priceHistory.map((entry, index) => (
                          <div key={index} className="flex justify-between">
                            <span>{entry.date}</span>
                            <span className={`font-medium ${
                              index === priceHistory.length - 1 ? 'text-green-600' : ''
                            }`}>
                              ${entry.price.toFixed(2)}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="delivery" className="p-4">
                  <div className="space-y-4 text-sm">
                    <div>
                      <p className="font-medium">Delivery Options</p>
                      <p>Free delivery available on this product when purchased from selected merchants.</p>
                    </div>
                    <div>
                      <p className="font-medium">Estimated Delivery Times</p>
                      <ul className="list-disc list-inside space-y-1 text-gray-600">
                        <li>ElectroMart: Next Day Delivery</li>
                        <li>TechGadgets: 2-3 Business Days</li>
                        <li>HomeElectronics: 3-5 Business Days</li>
                      </ul>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
      
      {/* Product Description */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Product Details</h2>
        <Tabs defaultValue="description">
          <TabsList>
            <TabsTrigger value="description">Description</TabsTrigger>
            <TabsTrigger value="specifications">Specifications</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
          </TabsList>
          <TabsContent value="description" className="py-4">
            <p className="text-gray-700 leading-relaxed">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris. 
              Vivamus hendrerit arcu sed erat molestie vehicula. Sed auctor neque eu tellus 
              rhoncus ut eleifend nibh porttitor. Ut in nulla enim. Phasellus molestie magna 
              non est bibendum non venenatis nisl tempor. Suspendisse dictum feugiat nisl ut 
              dapibus. Mauris iaculis porttitor posuere. Praesent id metus massa, ut blandit 
              odio. Proin quis tortor orci. Etiam at risus et justo dignissim congue.
            </p>
            <p className="text-gray-700 leading-relaxed mt-4">
              Donec congue lacinia dui, a porttitor lectus condimentum laoreet. Nunc eu 
              ullamcorper orci. Quisque eget odio ac lectus vestibulum faucibus eget in metus. 
              In pellentesque faucibus vestibulum. Nulla at nulla justo, eget luctus tortor.
            </p>
          </TabsContent>
          <TabsContent value="specifications" className="py-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-semibold mb-2">Product Specifications</h3>
                <table className="w-full text-sm">
                  <tbody>
                    <tr className="border-b">
                      <td className="py-2 font-medium">Brand</td>
                      <td className="py-2">Premium Tech</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 font-medium">Model</td>
                      <td className="py-2">PT-2023</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 font-medium">Color</td>
                      <td className="py-2">Black</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 font-medium">Dimensions</td>
                      <td className="py-2">10 x 5 x 2 inches</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 font-medium">Weight</td>
                      <td className="py-2">1.2 lbs</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Technical Details</h3>
                <table className="w-full text-sm">
                  <tbody>
                    <tr className="border-b">
                      <td className="py-2 font-medium">Connectivity</td>
                      <td className="py-2">Bluetooth 5.0, WiFi</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 font-medium">Battery Life</td>
                      <td className="py-2">Up to 20 hours</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 font-medium">Compatibility</td>
                      <td className="py-2">iOS, Android, Windows</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 font-medium">Warranty</td>
                      <td className="py-2">1 Year Limited</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 font-medium">In the Box</td>
                      <td className="py-2">Device, Charging Cable, Manual</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="reviews" className="py-4">
            <div className="text-center py-12">
              <Star className="h-12 w-12 text-amber-500 mx-auto mb-2" />
              <h3 className="text-2xl font-bold mb-1">4.7 out of 5</h3>
              <p className="text-gray-500 mb-6">Based on 127 reviews</p>
              <Button>Write a Review</Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>
      
      {/* Related Products */}
      <div>
        <h2 className="text-2xl font-bold mb-4">Related Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {mockProducts.slice(0, 4).map((relatedProduct) => (
            <Link to={`/products/${relatedProduct.id}`} key={relatedProduct.id}>
              <Card className="h-full hover:shadow-md transition-shadow overflow-hidden">
                <div className="h-40 bg-gray-100">
                  <img
                    src={relatedProduct.image}
                    alt={relatedProduct.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardContent className="pt-4">
                  <h3 className="font-medium text-gray-900 line-clamp-2">
                    {relatedProduct.name}
                  </h3>
                  <div className="mt-2 flex items-baseline">
                    <span className="text-lg font-bold text-gray-900">
                      ${relatedProduct.price.toFixed(2)}
                    </span>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
