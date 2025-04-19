
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ShoppingCart, ArrowLeft, Trash, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { useCart } from "@/contexts/CartContext";
import { toast } from "sonner";

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity, clearCart, getCartTotal } = useCart();
  const [promoCode, setPromoCode] = useState("");
  const [isApplyingPromo, setIsApplyingPromo] = useState(false);
  const navigate = useNavigate();

  const handleApplyPromo = () => {
    if (!promoCode.trim()) {
      toast.error("Please enter a promo code");
      return;
    }

    setIsApplyingPromo(true);
    // Simulate API call
    setTimeout(() => {
      setIsApplyingPromo(false);
      toast.error("Invalid promo code or expired");
    }, 1000);
  };

  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-6">Your Cart</h1>
        <div className="bg-white rounded-lg shadow-sm p-8 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
            <ShoppingCart className="h-8 w-8 text-gray-400" />
          </div>
          <h2 className="text-xl font-semibold mb-2">Your cart is empty</h2>
          <p className="text-gray-500 mb-6">
            Looks like you haven't added anything to your cart yet.
          </p>
          <Button asChild>
            <Link to="/products">Continue Shopping</Link>
          </Button>
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
      <div className="flex items-center mb-6">
        <Link to="/products" className="text-brand-600 hover:text-brand-700 flex items-center text-sm mr-4">
          <ArrowLeft className="h-4 w-4 mr-1" />
          Continue Shopping
        </Link>
        <h1 className="text-2xl font-bold flex-1">Your Cart ({cartItems.length} items)</h1>
        <Button 
          variant="outline" 
          size="sm" 
          className="text-red-500 hover:text-red-600 hover:bg-red-50 border-red-200"
          onClick={clearCart}
        >
          <Trash className="h-4 w-4 mr-1" />
          Clear Cart
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="p-4 md:p-6">
              {cartItems.map((item) => (
                <div key={item.product.id} className="py-4 first:pt-0 last:pb-0">
                  <div className="flex flex-col sm:flex-row items-start">
                    <div className="h-20 w-20 bg-gray-100 rounded-md overflow-hidden flex-shrink-0 mb-4 sm:mb-0">
                      <img 
                        src={item.product.image} 
                        alt={item.product.name}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="sm:ml-4 flex-1">
                      <div className="flex flex-col sm:flex-row sm:items-start justify-between">
                        <div>
                          <h3 className="font-medium text-gray-900">
                            {item.product.name}
                          </h3>
                          <p className="text-sm text-gray-500 mt-1">
                            Seller: {item.product.merchant}
                          </p>
                        </div>
                        <div className="flex items-center mt-2 sm:mt-0">
                          <div className="flex items-center border rounded mr-4">
                            <button 
                              className="px-2 py-1 text-gray-500 hover:text-gray-700"
                              onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                              aria-label="Decrease quantity"
                            >
                              -
                            </button>
                            <input 
                              type="text" 
                              value={item.quantity}
                              onChange={(e) => {
                                const val = parseInt(e.target.value);
                                if (!isNaN(val) && val > 0) {
                                  updateQuantity(item.product.id, val);
                                }
                              }}
                              className="w-10 text-center py-1 border-x"
                            />
                            <button 
                              className="px-2 py-1 text-gray-500 hover:text-gray-700"
                              onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                              aria-label="Increase quantity"
                            >
                              +
                            </button>
                          </div>
                          <button 
                            onClick={() => removeFromCart(item.product.id)}
                            className="text-gray-400 hover:text-red-500"
                            aria-label="Remove item"
                          >
                            <X className="h-5 w-5" />
                          </button>
                        </div>
                      </div>
                      <div className="flex justify-between items-center mt-2">
                        <div>
                          {item.product.originalPrice && item.product.originalPrice > item.product.price && (
                            <span className="text-sm text-gray-500 line-through mr-2">
                              ${item.product.originalPrice.toFixed(2)}
                            </span>
                          )}
                          <span className="font-medium">
                            ${item.product.price.toFixed(2)}
                          </span>
                        </div>
                        <div className="font-medium">
                          ${(item.product.price * item.quantity).toFixed(2)}
                        </div>
                      </div>
                    </div>
                  </div>
                  {cartItems.indexOf(item) < cartItems.length - 1 && (
                    <Separator className="mt-4" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div>
          <div className="bg-white rounded-lg shadow-sm p-6 sticky top-20">
            <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
            
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
            
            <div className="pt-4 border-t">
              <div className="flex justify-between mb-4">
                <span className="font-semibold">Total</span>
                <span className="font-semibold">${orderTotal.toFixed(2)}</span>
              </div>
              
              <Button 
                className="w-full bg-brand-600 hover:bg-brand-700 mb-4"
                onClick={() => navigate("/checkout")}
              >
                Proceed to Checkout
              </Button>
              
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-white px-2 text-gray-500">or</span>
                </div>
              </div>
              
              <div className="mt-4 space-y-2">
                <div className="flex gap-2">
                  <Input 
                    type="text" 
                    placeholder="Promo code" 
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    className="flex-1"
                  />
                  <Button 
                    variant="outline" 
                    onClick={handleApplyPromo}
                    disabled={isApplyingPromo}
                  >
                    {isApplyingPromo ? "Applying..." : "Apply"}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
