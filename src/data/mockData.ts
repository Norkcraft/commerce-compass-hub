
import { type Order } from '../components/admin/dashboard/mockData';

// Sample recent orders for the admin dashboard
export const mockData = {
  recentOrders: [
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
  ]
};

// Sample recent users for the admin dashboard
export const recentUsers = [
  { id: 1, name: 'John Doe', email: 'john.doe@example.com' },
  { id: 2, name: 'Jane Smith', email: 'jane.smith@example.com' },
  { id: 3, name: 'Bob Wilson', email: 'bob.wilson@example.com' },
  { id: 4, name: 'Alice Brown', email: 'alice.brown@example.com' },
  { id: 5, name: 'Charlie Davis', email: 'charlie.davis@example.com' },
];
