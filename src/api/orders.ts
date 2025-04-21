
import { supabase } from "@/integrations/supabase/client";
import type { Order } from "@/components/admin/dashboard/mockData";
import { CartItem } from "@/contexts/CartContext";
import { toast } from "sonner";

export interface CheckoutFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
}

export interface OrderDetails {
  items: CartItem[];
  shippingInfo: CheckoutFormData;
  paymentMethod: string;
  subtotal: number;
  tax: number;
  total: number;
}

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
    customer: `${order.customers?.first_name || ''} ${order.customers?.last_name || ''}`.trim() || 'Guest',
    date: new Date(order.created_at).toISOString().split('T')[0],
    status: order.status as "Pending" | "Processing" | "Completed" | "Cancelled",
    total: order.total,
    items: order.order_items.map(item => ({
      name: item.products?.name || 'Unknown Product',
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

export const createOrder = async (orderDetails: OrderDetails): Promise<Order> => {
  try {
    console.log("Creating order with details:", JSON.stringify(orderDetails, null, 2));
    
    // Get the current authenticated user
    const { data: { user } } = await supabase.auth.getUser();
    console.log("Current user:", user);
    
    // Call the create_order function with parameter names explicitly specified
    // to avoid TypeScript errors with function overloads
    const { data, error } = await supabase.rpc('create_order', {
      p_customer_id: user?.id || null,
      p_first_name: orderDetails.shippingInfo.firstName,
      p_last_name: orderDetails.shippingInfo.lastName,
      p_email: orderDetails.shippingInfo.email,
      p_address: orderDetails.shippingInfo.address,
      p_city: orderDetails.shippingInfo.city,
      p_state: orderDetails.shippingInfo.state,
      p_zip: orderDetails.shippingInfo.zipCode,
      p_payment_method: orderDetails.paymentMethod,
      p_total: orderDetails.total
    });

    if (error) {
      console.error("Error creating order:", error);
      throw error;
    }

    const orderId = data;
    console.log("Order created with ID:", orderId);

    // Create order items
    for (const item of orderDetails.items) {
      console.log("Creating order item:", item);
      const { error: itemError } = await supabase
        .from('order_items')
        .insert({
          order_id: orderId.toString(), // Convert to string as required by the type
          product_id: item.product.id.toString(),
          quantity: item.quantity,
          price: item.product.price
        });

      if (itemError) {
        console.error("Error creating order item:", itemError);
        throw itemError;
      }
    }

    toast.success("Order placed successfully!");
    console.log("Order completed successfully");

    // Return a simplified order representation
    return {
      id: `#${orderId.toString().substring(0, 5)}`,
      customer: `${orderDetails.shippingInfo.firstName} ${orderDetails.shippingInfo.lastName}`,
      date: new Date().toISOString().split('T')[0],
      status: "Pending",
      total: orderDetails.total,
      items: orderDetails.items.map(item => ({
        name: item.product.name,
        quantity: item.quantity,
        price: item.product.price
      }))
    };
  } catch (error) {
    console.error("Error creating order:", error);
    toast.error("Failed to place order. Please try again.");
    throw error;
  }
};

export const updateOrderStatus = async (id: string, status: "Pending" | "Processing" | "Completed" | "Cancelled"): Promise<void> => {
  // Clean the ID (remove the # prefix)
  const cleanId = id.startsWith('#') ? id.substring(1) : id;
  
  const { error } = await supabase
    .from('orders')
    .update({ status })
    .eq('id', cleanId);

  if (error) {
    console.error("Error updating order status:", error);
    throw error;
  }
  
  toast.success(`Order ${id} status updated to ${status}`);
};
