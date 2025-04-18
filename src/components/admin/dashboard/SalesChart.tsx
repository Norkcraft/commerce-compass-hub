
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip } from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip, Line, ComposedChart } from 'recharts';
import { salesData } from './mockData';

const SalesChart = () => {
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
        <CardDescription>Monthly revenue and order trends</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ChartContainer config={chartConfig}>
            <ComposedChart data={salesData}>
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
