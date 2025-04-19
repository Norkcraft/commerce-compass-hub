
import { supabase } from "@/integrations/supabase/client";

export type User = {
  id: number;
  name: string;
  email: string;
};

export const fetchUsers = async (): Promise<User[]> => {
  const { data, error } = await supabase
    .from("customers")
    .select(`
      id,
      first_name,
      last_name
    `)
    .limit(10);

  if (error) {
    console.error("Error fetching users:", error);
    throw error;
  }

  // For now, we'll mock the email since we can't access auth.users
  return data.map((customer, index) => ({
    id: index + 1, // Using index for display purposes
    name: `${customer.first_name || ''} ${customer.last_name || ''}`.trim() || `User ${index + 1}`,
    email: `user${index + 1}@example.com` // Mocked email
  }));
};
