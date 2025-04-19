
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip } from "@/components/ui/chart";
import { ComposedChart, Bar, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { salesData } from './mockData';
import { supabase } from '@/integrations/supabase/client';

interface UpdateChartWindow extends Window {
  updateSalesChart?: (amount: number) => void;
}

declare let window: UpdateChartWindow;

// Function to generate monthly data
const generateMonthlyData = () => {
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const currentMonth = new Date().getMonth();
  
  return months.slice(0, currentMonth + 1).map((month, index) => ({
    month,
    revenue: Math.floor(Math.random() * 4000) + 1000,
    orders: Math.floor(Math.random() * 30) + 10
  }));
};

const SalesChart = () => {
  const [data, setData] = useState(salesData);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch real sales data on component mount
  useEffect(() => {
    const fetchSalesData = async () => {
      try {
        // In a real app, we would fetch actual sales data from the database
        // For now, let's generate some realistic mock data
        setData(generateMonthlyData());
      } catch (error) {
        console.error("Error fetching sales data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSalesData();
  }, []);

  // Update the last month's data when new orders come in
  const updateChart = (amount: number) => {
    setData(currentData => {
      const newData = [...currentData];
      const lastIndex = newData.length - 1;
      if (lastIndex >= 0) {
        newData[lastIndex] = {
          ...newData[lastIndex],
          revenue: newData[lastIndex].revenue + amount,
          orders: newData[lastIndex].orders + 1
        };
      }
      return newData;
    });
  };

  // Set up realtime updates with Supabase
  useEffect(() => {
    const channel = supabase
      .channel('orders-revenue')
      .on('postgres_changes', 
        {
          event: 'INSERT',
          schema: 'public',
          table: 'orders'
        }, 
        (payload) => {
          // When a new order is created, update the chart
          if (payload.new && typeof payload.new.total === 'number') {
            updateChart(payload.new.total);
          }
        }
      )
      .subscribe();

    // Expose the updateChart method to parent components
    window.updateSalesChart = updateChart;
    
    return () => {
      supabase.removeChannel(channel);
      delete window.updateSalesChart;
    };
  }, []);

  const chartConfig = {
    revenue: {
      color: '#4f46e5',
    },
    orders: {
      color: '#22c55e',
    },
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Sales Analytics</CardTitle>
        <CardDescription>Monthly revenue and order trends (updates in real-time)</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          {isLoading ? (
            <div className="flex h-full items-center justify-center">
              <p className="text-muted-foreground">Loading chart data...</p>
            </div>
          ) : (
            <ChartContainer config={chartConfig}>
              <ComposedChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip content={<ChartTooltip />} />
                <Bar yAxisId="left" dataKey="revenue" fill="#4f46e5" name="Revenue" />
                <Line yAxisId="right" type="monotone" dataKey="orders" stroke="#22c55e" name="Orders" />
              </ComposedChart>
            </ChartContainer>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default SalesChart;
