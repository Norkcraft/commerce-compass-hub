
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ArrowLeft, CheckCircle, CreditCard, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useCart } from "@/contexts/CartContext";
import { toast } from "sonner";
import { useAuth } from "@/lib/auth";

const Checkout = () => {
  const navigate = useNavigate();
  const { cartItems, getCartTotal, clearCart } = useCart();
  const { user } = useAuth();
  const [activeStep, setActiveStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("credit-card");
  
  // Form states
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: user?.email || "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    cardName: "",
    cardNumber: "",
    cardExpiry: "",
    cardCvc: "",
  });
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  
  const validateShippingInfo = () => {
    const requiredFields = ['firstName', 'lastName', 'email', 'phone', 'address', 'city', 'state', 'zipCode'];
    const missingFields = requiredFields.filter(field => !formData[field as keyof typeof formData]);
    
    if (missingFields.length > 0) {
      toast.error("Please fill in all required fields");
      return false;
    }
    
    if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      toast.error("Please enter a valid email address");
      return false;
    }
    
    return true;
  };
  
  const validatePaymentInfo = () => {
    if (paymentMethod === "credit-card") {
      const requiredFields = ['cardName', 'cardNumber', 'cardExpiry', 'cardCvc'];
      const missingFields = requiredFields.filter(field => !formData[field as keyof typeof formData]);
      
      if (missingFields.length > 0) {
        toast.error("Please fill in all card details");
        return false;
      }
      
      if (!/^\d{16}$/.test(formData.cardNumber.replace(/\s/g, ''))) {
        toast.error("Please enter a valid card number");
        return false;
      }
      
      if (!/^\d{2}\/\d{2}$/.test(formData.cardExpiry)) {
        toast.error("Please enter a valid expiry date (MM/YY)");
        return false;
      }
      
      if (!/^\d{3,4}$/.test(formData.cardCvc)) {
        toast.error("Please enter a valid CVC");
        return false;
      }
    }
    
    return true;
  };
  
  const handleContinueToPayment = () => {
    if (validateShippingInfo()) {
      setActiveStep(2);
      window.scrollTo(0, 0);
    }
  };
  
  const handlePlaceOrder = () => {
    if (!validatePaymentInfo()) return;
    
    setIsProcessing(true);
    
    // Simulate order processing
    setTimeout(() => {
      setIsProcessing(false);
      setOrderPlaced(true);
      clearCart();
      window.scrollTo(0, 0);
    }, 2000);
  };
  
  // Redirect to cart if it's empty
  if (cartItems.length === 0 && !orderPlaced) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto text-center">
          <ShoppingCart className="mx-auto h-12 w-12 text-gray-400 mb-4" />
          <h1 className="text-2xl font-bold mb-2">Your cart is empty</h1>
          <p className="text-gray-500 mb-6">Add some items to your cart before proceeding to checkout.</p>
          <Button asChild>
            <Link to="/products">Browse Products</Link>
          </Button>
        </div>
      </div>
    );
  }
  
  // Order confirmation page
  if (orderPlaced) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-sm p-8 text-center">
          <CheckCircle className="mx-auto h-16 w-16 text-green-500 mb-4" />
          <h1 className="text-3xl font-bold mb-2">Thank You For Your Order!</h1>
          <p className="text-gray-500 mb-6">
            Order #ORD-{Math.random().toString(36).substring(2, 10).toUpperCase()} has been placed successfully.
          </p>
          <p className="mb-6">
            We've sent a confirmation email to <span className="font-semibold">{formData.email}</span>.
            You'll receive another email when your order ships.
          </p>
          <div className="flex justify-center space-x-4">
            <Button asChild variant="outline">
              <Link to="/products">Continue Shopping</Link>
            </Button>
            <Button asChild>
              <Link to="/">Go to Home</Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }
  
  const cartTotal = getCartTotal();
  const shippingCost = 0; // Free shipping
  const taxRate = 0.07; // 7% tax
  const taxAmount = cartTotal * taxRate;
  const orderTotal = cartTotal + taxAmount + shippingCost;
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Link to="/cart" className="text-brand-600 hover:text-brand-700 flex items-center text-sm">
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back to Cart
        </Link>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-6">
            <div className="p-6 border-b">
              <h1 className="text-2xl font-bold">Checkout</h1>
              <div className="flex items-center mt-4">
                <div className={`flex items-center justify-center h-8 w-8 rounded-full ${activeStep >= 1 ? 'bg-brand-600 text-white' : 'bg-gray-200 text-gray-500'}`}>
                  1
                </div>
                <div className={`flex-1 h-1 mx-2 ${activeStep >= 2 ? 'bg-brand-600' : 'bg-gray-200'}`}></div>
                <div className={`flex items-center justify-center h-8 w-8 rounded-full ${activeStep >= 2 ? 'bg-brand-600 text-white' : 'bg-gray-200 text-gray-500'}`}>
                  2
                </div>
                <div className={`flex-1 h-1 mx-2 ${activeStep >= 3 ? 'bg-brand-600' : 'bg-gray-200'}`}></div>
                <div className={`flex items-center justify-center h-8 w-8 rounded-full ${activeStep >= 3 ? 'bg-brand-600 text-white' : 'bg-gray-200 text-gray-500'}`}>
                  3
                </div>
              </div>
              <div className="flex justify-between mt-2 text-sm">
                <span className={activeStep >= 1 ? 'text-brand-600 font-medium' : 'text-gray-500'}>Shipping</span>
                <span className={activeStep >= 2 ? 'text-brand-600 font-medium' : 'text-gray-500'}>Payment</span>
                <span className={activeStep >= 3 ? 'text-brand-600 font-medium' : 'text-gray-500'}>Confirmation</span>
              </div>
            </div>

            <div className="p-6">
              {activeStep === 1 && (
                <div>
                  <h2 className="text-xl font-semibold mb-4">Shipping Information</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div>
                      <Label htmlFor="firstName">First Name *</Label>
                      <Input 
                        id="firstName" 
                        name="firstName" 
                        value={formData.firstName}
                        onChange={handleInputChange}
                        required 
                      />
                    </div>
                    <div>
                      <Label htmlFor="lastName">Last Name *</Label>
                      <Input 
                        id="lastName" 
                        name="lastName" 
                        value={formData.lastName}
                        onChange={handleInputChange}
                        required 
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email *</Label>
                      <Input 
                        id="email" 
                        name="email" 
                        type="email" 
                        value={formData.email}
                        onChange={handleInputChange}
                        required 
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone">Phone *</Label>
                      <Input 
                        id="phone" 
                        name="phone" 
                        type="tel" 
                        value={formData.phone}
                        onChange={handleInputChange}
                        required 
                      />
                    </div>
                    <div className="md:col-span-2">
                      <Label htmlFor="address">Address *</Label>
                      <Input 
                        id="address" 
                        name="address" 
                        value={formData.address}
                        onChange={handleInputChange}
                        required 
                      />
                    </div>
                    <div>
                      <Label htmlFor="city">City *</Label>
                      <Input 
                        id="city" 
                        name="city" 
                        value={formData.city}
                        onChange={handleInputChange}
                        required 
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="state">State *</Label>
                        <Input 
                          id="state" 
                          name="state" 
                          value={formData.state}
                          onChange={handleInputChange}
                          required 
                        />
                      </div>
                      <div>
                        <Label htmlFor="zipCode">ZIP Code *</Label>
                        <Input 
                          id="zipCode" 
                          name="zipCode" 
                          value={formData.zipCode}
                          onChange={handleInputChange}
                          required 
                        />
                      </div>
                    </div>
                  </div>
                  <Button 
                    className="w-full md:w-auto bg-brand-600 hover:bg-brand-700"
                    onClick={handleContinueToPayment}
                  >
                    Continue to Payment
                  </Button>
                </div>
              )}
              
              {activeStep === 2 && (
                <div>
                  <h2 className="text-xl font-semibold mb-4">Payment Method</h2>
                  
                  <Tabs defaultValue="credit-card" onValueChange={setPaymentMethod} className="mb-6">
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="credit-card">Credit Card</TabsTrigger>
                      <TabsTrigger value="paypal">PayPal</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="credit-card" className="mt-4">
                      <Card>
                        <CardContent className="pt-6">
                          <div className="space-y-4">
                            <div>
                              <Label htmlFor="cardName">Name on card *</Label>
                              <Input 
                                id="cardName" 
                                name="cardName" 
                                value={formData.cardName}
                                onChange={handleInputChange}
                                required 
                              />
                            </div>
                            <div>
                              <Label htmlFor="cardNumber">Card number *</Label>
                              <Input 
                                id="cardNumber" 
                                name="cardNumber" 
                                placeholder="1234 5678 9012 3456"
                                value={formData.cardNumber}
                                onChange={handleInputChange}
                                required 
                              />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <Label htmlFor="cardExpiry">Expiry date *</Label>
                                <Input 
                                  id="cardExpiry" 
                                  name="cardExpiry" 
                                  placeholder="MM/YY"
                                  value={formData.cardExpiry}
                                  onChange={handleInputChange}
                                  required 
                                />
                              </div>
                              <div>
                                <Label htmlFor="cardCvc">CVC *</Label>
                                <Input 
                                  id="cardCvc" 
                                  name="cardCvc" 
                                  placeholder="123"
                                  value={formData.cardCvc}
                                  onChange={handleInputChange}
                                  required 
                                />
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </TabsContent>
                    
                    <TabsContent value="paypal" className="mt-4">
                      <Card>
                        <CardContent className="pt-6">
                          <div className="text-center p-4">
                            <p className="mb-4">You'll be redirected to PayPal to complete your purchase securely.</p>
                            <img src="https://www.paypalobjects.com/webstatic/mktg/logo/pp_cc_mark_111x69.jpg" alt="PayPal" className="h-12 mx-auto" />
                          </div>
                        </CardContent>
                      </Card>
                    </TabsContent>
                  </Tabs>
                  
                  <div className="flex flex-col md:flex-row gap-4">
                    <Button 
                      variant="outline" 
                      onClick={() => setActiveStep(1)}
                    >
                      Back
                    </Button>
                    <Button 
                      className="bg-brand-600 hover:bg-brand-700"
                      onClick={handlePlaceOrder}
                      disabled={isProcessing}
                    >
                      {isProcessing ? "Processing..." : "Place Order"}
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        
        <div>
          <div className="bg-white rounded-lg shadow-sm p-6 sticky top-20">
            <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
            
            <div className="space-y-4 mb-4">
              {cartItems.map((item) => (
                <div key={item.product.id} className="flex justify-between items-start">
                  <div className="flex items-start">
                    <div className="h-10 w-10 bg-gray-100 rounded-md overflow-hidden flex-shrink-0">
                      <img 
                        src={item.product.image} 
                        alt={item.product.name}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium line-clamp-1">{item.product.name}</p>
                      <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                    </div>
                  </div>
                  <span className="text-sm font-medium">
                    ${(item.product.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>
            
            <Separator className="my-4" />
            
            <div className="space-y-2 mb-4">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Subtotal</span>
                <span>${cartTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Shipping</span>
                <span className="text-green-600">Free</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Tax (7%)</span>
                <span>${taxAmount.toFixed(2)}</span>
              </div>
            </div>
            
            <Separator className="my-4" />
            
            <div className="flex justify-between font-medium">
              <span>Total</span>
              <span>${orderTotal.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
