
import { supabase } from "@/integrations/supabase/client";
import type { Product } from "@/components/products/ProductCard";

export const fetchProducts = async (): Promise<Product[]> => {
  const { data, error } = await supabase
    .from("products")
    .select("*");

  if (error) {
    console.error("Error fetching products:", error);
    throw error;
  }

  // Transform the database products to match our Product interface
  const transformedProducts: Product[] = data.map(item => ({
    id: parseInt(item.id),
    name: item.name,
    price: item.price,
    image: item.image_url || "https://placehold.co/400x300",
    rating: 4.5, // Default rating
    merchant: item.merchant || "DefaultMerchant",
    merchantLogo: "https://placehold.co/80x30", // Default logo
    category: item.category,
    description: item.description,
    stock: item.stock,
    discountPercentage: 0, // Default no discount
  }));

  return transformedProducts;
};

export const createProduct = async (product: Omit<Product, "id">): Promise<Product> => {
  // Transform our Product object to match the database schema
  const dbProduct = {
    name: product.name,
    price: product.price,
    image_url: product.image,
    merchant: product.merchant,
    category: product.category,
    description: product.description || "",
    stock: product.stock || 0
  };

  const { data, error } = await supabase
    .from("products")
    .insert(dbProduct)
    .select()
    .single();

  if (error) {
    console.error("Error creating product:", error);
    throw error;
  }

  // Transform back to our Product interface
  return {
    id: parseInt(data.id),
    name: data.name,
    price: data.price,
    image: data.image_url || "https://placehold.co/400x300",
    rating: 4.5, // Default rating
    merchant: data.merchant || "DefaultMerchant",
    merchantLogo: "https://placehold.co/80x30", // Default logo
    category: data.category,
    description: data.description,
    stock: data.stock,
    discountPercentage: 0, // Default no discount
  };
};

export const updateProduct = async (id: number, product: Partial<Product>): Promise<Product> => {
  // Transform our Product object to match the database schema
  const dbProduct: any = {};
  if (product.name) dbProduct.name = product.name;
  if (product.price !== undefined) dbProduct.price = product.price;
  if (product.image) dbProduct.image_url = product.image;
  if (product.merchant) dbProduct.merchant = product.merchant;
  if (product.category) dbProduct.category = product.category;
  if (product.description !== undefined) dbProduct.description = product.description;
  if (product.stock !== undefined) dbProduct.stock = product.stock;

  const { data, error } = await supabase
    .from("products")
    .update(dbProduct)
    .eq("id", id.toString())
    .select()
    .single();

  if (error) {
    console.error("Error updating product:", error);
    throw error;
  }

  // Transform back to our Product interface
  return {
    id: parseInt(data.id),
    name: data.name,
    price: data.price,
    image: data.image_url || "https://placehold.co/400x300",
    rating: 4.5, // Default rating
    merchant: data.merchant || "DefaultMerchant",
    merchantLogo: "https://placehold.co/80x30", // Default logo
    category: data.category,
    description: data.description,
    stock: data.stock,
    discountPercentage: 0, // Default no discount
  };
};

export const deleteProduct = async (id: number): Promise<void> => {
  const { error } = await supabase
    .from("products")
    .delete()
    .eq("id", id.toString());

  if (error) {
    console.error("Error deleting product:", error);
    throw error;
  }
};
