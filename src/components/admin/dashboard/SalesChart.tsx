
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip } from "@/components/ui/chart";
import { ComposedChart, Bar, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { salesData } from './mockData';

interface UpdateChartWindow extends Window {
  updateSalesChart?: (amount: number) => void;
}

declare let window: UpdateChartWindow;

const SalesChart = () => {
  const [data, setData] = useState(salesData);

  // Update the last month's data when new orders come in
  const updateChart = (amount: number) => {
    setData(currentData => {
      const newData = [...currentData];
      const lastIndex = newData.length - 1;
      newData[lastIndex] = {
        ...newData[lastIndex],
        revenue: newData[lastIndex].revenue + amount,
        orders: newData[lastIndex].orders + 1
      };
      return newData;
    });
  };

  // Expose the updateChart method to parent components
  useEffect(() => {
    window.updateSalesChart = updateChart;
    return () => {
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
        </div>
      </CardContent>
    </Card>
  );
};

export default SalesChart;
