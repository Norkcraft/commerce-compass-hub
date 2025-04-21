
import { useEffect, useState } from 'react';
import { Bell, Package } from 'lucide-react';
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { generateNewOrder } from './mockData';
import { createOrder } from '@/api/orders';
import { supabase } from '@/integrations/supabase/client';

type OrderSimulatorProps = {
  onNewOrder: (order: any) => void;
};

const OrderSimulator = ({ onNewOrder }: OrderSimulatorProps) => {
  const [isSimulating, setIsSimulating] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  useEffect(() => {
    const checkAuth = async () => {
      const { data } = await supabase.auth.getSession();
      setIsLoggedIn(!!data.session);
      
      if (!data.session) {
        toast.error("You need to be logged in as an admin to simulate orders");
      }
    };
    
    checkAuth();
  }, []);
  
  useEffect(() => {
    let intervalId: number;
    
    if (isSimulating && isLoggedIn) {
      const generateOrder = async () => {
        try {
          // Generate a mock order with the correct structure
          const mockOrder = generateNewOrder();
          
          // Convert the mock order to the format expected by createOrder
          const orderDetails = {
            items: mockOrder.items.map(item => ({
              product: {
                id: Math.floor(Math.random() * 1000).toString(),
                name: item.name,
                price: item.price,
                image: "https://picsum.photos/200",
                category: "Simulated",
                merchant: "Simulator"
              },
              quantity: item.quantity
            })),
            shippingInfo: {
              firstName: mockOrder.customer.split(' ')[0] || "Test",
              lastName: mockOrder.customer.split(' ')[1] || "User",
              email: "test@example.com",
              phone: "123-456-7890",
              address: "123 Test St",
              city: "Test City",
              state: "TS",
              zipCode: "12345"
            },
            paymentMethod: "credit-card",
            subtotal: mockOrder.total * 0.93, // Approximate to remove tax
            tax: mockOrder.total * 0.07, // 7% tax
            total: mockOrder.total
          };
          
          const newOrder = await createOrder(orderDetails);
          onNewOrder(newOrder);
          
          toast.success(`${newOrder.customer} placed an order for $${newOrder.total.toFixed(2)}`, {
            icon: <Package className="h-4 w-4" />,
          });
        } catch (error) {
          console.error("Failed to generate order:", error);
          toast.error("Failed to generate order");
          setIsSimulating(false);
        }
      };
      
      intervalId = window.setInterval(() => {
        generateOrder();
      }, Math.random() * 10000 + 5000);
    }
    
    return () => {
      if (intervalId) {
        window.clearInterval(intervalId);
      }
    };
  }, [isSimulating, isLoggedIn, onNewOrder]);

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="p-2 bg-yellow-100 rounded-full">
              <Bell className="h-4 w-4 text-yellow-600" />
            </div>
            <div className="space-y-0.5">
              <p className="text-sm font-medium">Order Simulation</p>
              <p className="text-xs text-muted-foreground">
                {isSimulating ? 'Generating orders every 5-15 seconds' : 'Simulation paused'}
              </p>
            </div>
          </div>
          <Button
            variant={isSimulating ? "destructive" : "default"}
            onClick={() => {
              if (!isLoggedIn) {
                toast.error("You need to be logged in as an admin to simulate orders");
                return;
              }
              setIsSimulating(!isSimulating);
            }}
          >
            {isSimulating ? 'Stop Simulation' : 'Start Simulation'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default OrderSimulator;
