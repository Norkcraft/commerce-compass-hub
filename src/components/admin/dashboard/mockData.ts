// Mock data for dashboard charts
export const salesData = [
  { month: 'Jan', revenue: 4000, orders: 24 },
  { month: 'Feb', revenue: 3000, orders: 18 },
  { month: 'Mar', revenue: 2000, orders: 22 },
  { month: 'Apr', revenue: 2780, orders: 28 },
  { month: 'May', revenue: 1890, orders: 20 },
  { month: 'Jun', revenue: 2390, orders: 25 },
  { month: 'Jul', revenue: 3490, orders: 30 },
];

// Status types for orders
export type OrderStatus = 'Pending' | 'Processing' | 'Completed' | 'Cancelled';

export type Order = {
  id: string;
  customer: string;
  date: string;
  status: OrderStatus;
  total: number;
  items: Array<{ name: string; quantity: number; price: number }>;
};

export const recentOrders: Order[] = [
  {
    id: '#12345',
    customer: 'John Doe',
    date: '2024-04-18',
    status: 'Completed',
    total: 230.50,
    items: [
      { name: 'Premium Headphones', quantity: 1, price: 199.99 },
      { name: 'USB Cable', quantity: 2, price: 15.25 }
    ]
  },
  {
    id: '#12346',
    customer: 'Jane Smith',
    date: '2024-04-17',
    status: 'Processing',
    total: 150.00,
    items: [
      { name: 'Wireless Mouse', quantity: 1, price: 49.99 },
      { name: 'Mouse Pad', quantity: 1, price: 19.99 },
      { name: 'Keyboard Cover', quantity: 1, price: 79.99 }
    ]
  },
  {
    id: '#12347',
    customer: 'Bob Wilson',
    date: '2024-04-17',
    status: 'Pending',
    total: 85.99,
    items: [
      { name: 'Smart Watch', quantity: 1, price: 249.99 },
      { name: 'Bluetooth Speaker', quantity: 1, price: 79.99 }
    ]
  },
  {
    id: '#12348',
    customer: 'Alice Brown',
    date: '2024-04-16',
    status: 'Completed',
    total: 340.00,
    items: [
      { name: 'Wireless Earbuds', quantity: 1, price: 129.99 },
      { name: 'Phone Case', quantity: 1, price: 24.99 }
    ]
  },
  {
    id: '#12349',
    customer: 'Charlie Davis',
    date: '2024-04-16',
    status: 'Processing',
    total: 120.75,
    items: [
      { name: 'Power Bank', quantity: 1, price: 49.99 },
      { name: 'USB-C Cable', quantity: 1, price: 15.99 }
    ]
  },
];

export const recentUsers = [
  { id: 1, name: 'John Doe', email: 'john.doe@example.com' },
  { id: 2, name: 'Jane Smith', email: 'jane.smith@example.com' },
  { id: 3, name: 'Bob Wilson', email: 'bob.wilson@example.com' },
  { id: 4, name: 'Alice Brown', email: 'alice.brown@example.com' },
  { id: 5, name: 'Charlie Davis', email: 'charlie.davis@example.com' },
];

// Simulate new orders
const customers = ['Alex Thompson', 'Sarah Wilson', 'Mike Johnson', 'Emily Brown', 'Chris Davis', 'Lisa Anderson'];
const products = [
  { name: 'Wireless Earbuds', price: 129.99 },
  { name: 'Smart Watch', price: 249.99 },
  { name: 'Bluetooth Speaker', price: 79.99 },
  { name: 'Phone Case', price: 24.99 },
  { name: 'Power Bank', price: 49.99 },
  { name: 'USB-C Cable', price: 15.99 },
];

export function generateNewOrder(): Order {
  const orderItems = Array(Math.floor(Math.random() * 3) + 1)
    .fill(null)
    .map(() => {
      const product = products[Math.floor(Math.random() * products.length)];
      const quantity = Math.floor(Math.random() * 3) + 1;
      return {
        name: product.name,
        quantity,
        price: product.price
      };
    });

  const total = orderItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  
  return {
    id: '#' + Math.floor(10000 + Math.random() * 90000),
    customer: customers[Math.floor(Math.random() * customers.length)],
    date: new Date().toISOString().split('T')[0],
    status: 'Pending',
    total,
    items: orderItems
  };
}
