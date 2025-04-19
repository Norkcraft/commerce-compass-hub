
import { supabase } from "@/integrations/supabase/client";
import type { Order } from "@/components/admin/dashboard/mockData";

export const fetchOrders = async (): Promise<Order[]> => {
  const { data, error } = await supabase
    .from("orders")
    .select(`
      id,
      customer_id,
      status,
      total,
      created_at,
      customers (
        first_name,
        last_name
      ),
      order_items (
        id,
        product_id,
        quantity,
        price,
        products (
          name
        )
      )
    `)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching orders:", error);
    throw error;
  }

  // Transform the data to match our Order type
  const transformedOrders = data.map(order => ({
    id: `#${order.id.substring(0, 5)}`,
    customer: `${order.customers.first_name} ${order.customers.last_name}`,
    date: new Date(order.created_at).toISOString().split('T')[0],
    status: order.status as "Pending" | "Processing" | "Completed" | "Cancelled",
    total: order.total,
    items: order.order_items.map(item => ({
      name: item.products.name,
      quantity: item.quantity,
      price: item.price
    }))
  }));

  return transformedOrders;
};

export const fetchRealtimeOrders = (onUpdate: (orders: Order[]) => void): (() => void) => {
  // Initial fetch
  fetchOrders().then(onUpdate).catch(console.error);
  
  // Set up realtime subscription
  const channel = supabase
    .channel('orders-changes')
    .on(
      'postgres_changes',
      {
        event: '*',
        schema: 'public',
        table: 'orders'
      },
      () => {
        // Refetch all orders when any change occurs
        fetchOrders().then(onUpdate).catch(console.error);
      }
    )
    .subscribe();

  // Return cleanup function
  return () => {
    supabase.removeChannel(channel);
  };
};

export const createOrder = async (order: Omit<Order, "id" | "date">): Promise<Order> => {
  // In a real app, this would create an order in the database
  // For now, let's simulate it
  const newOrderId = `#${Math.floor(10000 + Math.random() * 90000)}`;
  const newOrder: Order = {
    ...order,
    id: newOrderId,
    date: new Date().toISOString().split('T')[0],
  };
  
  return newOrder;
};

export const updateOrderStatus = async (id: string, status: "Pending" | "Processing" | "Completed" | "Cancelled"): Promise<void> => {
  // In a real app, we would update the order in the database
  // For now, we'll just simulate success
  console.log(`Updated order ${id} status to ${status}`);
};
