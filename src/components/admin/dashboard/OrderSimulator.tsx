
import { useEffect, useState } from 'react';
import { Bell, Package } from 'lucide-react';
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { generateNewOrder, type Order } from './mockData';

type OrderSimulatorProps = {
  onNewOrder: (order: Order) => void;
};

const OrderSimulator = ({ onNewOrder }: OrderSimulatorProps) => {
  const [isSimulating, setIsSimulating] = useState(false);
  
  useEffect(() => {
    let intervalId: number;
    
    if (isSimulating) {
      // Generate new order every 5-15 seconds
      const generateOrder = () => {
        const newOrder = generateNewOrder();
        onNewOrder(newOrder);
        
        toast.success(`${newOrder.customer} placed an order for $${newOrder.total.toFixed(2)}`, {
          icon: <Package className="h-4 w-4" />,
        });
      };
      
      intervalId = window.setInterval(() => {
        generateOrder();
      }, Math.random() * 10000 + 5000); // Random interval between 5-15 seconds
    }
    
    return () => {
      if (intervalId) {
        window.clearInterval(intervalId);
      }
    };
  }, [isSimulating, onNewOrder]);

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
            onClick={() => setIsSimulating(!isSimulating)}
          >
            {isSimulating ? 'Stop Simulation' : 'Start Simulation'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default OrderSimulator;
