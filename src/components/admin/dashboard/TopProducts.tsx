
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip } from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip } from 'recharts';
import { mockProducts } from "@/data/mockProducts";

const TopProducts = () => {
  // Transform products data for the chart
  const topProductsData = mockProducts
    .slice(0, 5)
    .map(product => ({
      name: product.name,
      sales: Math.floor(Math.random() * 100) + 10
    }));

  const chartConfig = {
    sales: {
      color: '#8b5cf6',
    },
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Top Selling Products</CardTitle>
        <CardDescription>Products with highest sales volume</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ChartContainer config={chartConfig}>
            <BarChart data={topProductsData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" />
              <YAxis dataKey="name" type="category" width={150} />
              <Tooltip content={<ChartTooltip />} />
              <Bar dataKey="sales" fill="#8b5cf6" name="Sales" />
            </BarChart>
          </ChartContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default TopProducts;
