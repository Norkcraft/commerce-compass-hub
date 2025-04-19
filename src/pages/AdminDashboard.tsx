import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { 
  Users, 
  ShoppingBag, 
  DollarSign, 
  TrendingUp, 
  Search,
  ArrowUpRight,
  ArrowDownRight,
  Edit,
  Trash2,
  FileText,
  Plus,
  Loader2
} from "lucide-react";
import { mockProducts } from "@/data/mockProducts";
import { toast } from "sonner";
import ProductForm from "@/components/admin/ProductForm";
import DeleteProductDialog from "@/components/admin/DeleteProductDialog";
import type { Product } from "@/components/products/ProductCard";
import { mockData, recentUsers } from "@/data/mockData";
import OrderSimulator from "@/components/admin/dashboard/OrderSimulator";
import SalesChart from "@/components/admin/dashboard/SalesChart";
import TopProducts from "@/components/admin/dashboard/TopProducts";
import { type Order } from "@/components/admin/dashboard/mockData";
import { supabase } from "@/integrations/supabase/client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchProducts, createProduct, updateProduct, deleteProduct } from "@/api/products";
import { fetchOrders, fetchRealtimeOrders } from "@/api/orders";
import { fetchUsers } from "@/api/users";
import { useNavigate } from "react-router-dom";

// Extend Window interface to include our custom method
declare global {
  interface Window {
    updateSalesChart?: (amount: number) => void;
  }
}

const AdminDashboard = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [activeTab, setActiveTab] = useState("overview");
  const [searchQuery, setSearchQuery] = useState("");
  const [showProductForm, setShowProductForm] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [recentOrders, setRecentOrders] = useState<Order[]>([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  // Check if user is an admin
  useEffect(() => {
    const checkAdmin = async () => {
      setIsLoading(true);
      try {
        const { data: session } = await supabase.auth.getSession();
        
        if (!session.session) {
          // Redirect to login if not logged in
          toast.error("You must be logged in to access the admin dashboard");
          navigate("/auth");
          return;
        }
        
        // Check if user has admin role
        const { data, error } = await supabase.rpc('is_admin');
        
        if (error) {
          console.error("Error checking admin status:", error);
          setIsAdmin(false);
          toast.error("Failed to verify admin privileges");
          navigate("/");
        } else {
          setIsAdmin(!!data);
          if (!data) {
            toast.error("You don't have permission to access the admin dashboard");
            navigate("/");
          }
        }
      } catch (error) {
        console.error("Error in admin check:", error);
        toast.error("Authentication error");
        navigate("/");
      } finally {
        setIsLoading(false);
      }
    };
    
    checkAdmin();
  }, [navigate]);
  
  // Fetch products data
  const { 
    data: products = [],
    isLoading: productsLoading 
  } = useQuery({
    queryKey: ['products'],
    queryFn: fetchProducts,
    enabled: !isLoading && isAdmin
  });
  
  // Set up realtime orders
  useEffect(() => {
    if (!isAdmin) return;
    
    const cleanup = fetchRealtimeOrders(orders => {
      setRecentOrders(orders);
    });
    
    return cleanup;
  }, [isAdmin]);
  
  // Create product mutation
  const createProductMutation = useMutation({
    mutationFn: createProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      toast.success("Product added successfully");
      setShowProductForm(false);
    },
    onError: () => {
      toast.error("Failed to add product");
    }
  });
  
  // Update product mutation
  const updateProductMutation = useMutation({
    mutationFn: ({ id, product }: { id: number, product: Partial<Product> }) => 
      updateProduct(id, product),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      toast.success("Product updated successfully");
      setShowProductForm(false);
    },
    onError: () => {
      toast.error("Failed to update product");
    }
  });
  
  // Delete product mutation
  const deleteProductMutation = useMutation({
    mutationFn: deleteProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      toast.success("Product deleted successfully");
      setShowDeleteDialog(false);
    },
    onError: () => {
      toast.error("Failed to delete product");
    }
  });

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.merchant?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.category?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddProduct = () => {
    setSelectedProduct(null);
    setShowProductForm(true);
  };

  const handleEditProduct = (product: Product) => {
    setSelectedProduct(product);
    setShowProductForm(true);
  };

  const handleDeleteProduct = (product: Product) => {
    setSelectedProduct(product);
    setShowDeleteDialog(true);
  };

  const handleProductSubmit = (productData: Partial<Product>) => {
    if (selectedProduct) {
      updateProductMutation.mutate({ 
        id: selectedProduct.id, 
        product: productData 
      });
    } else {
      createProductMutation.mutate(productData as Omit<Product, "id">);
    }
  };

  const handleProductDelete = () => {
    if (selectedProduct) {
      deleteProductMutation.mutate(selectedProduct.id);
    }
  };

  const handleNewOrder = (order: Order) => {
    setActiveTab(prev => {
      if (prev !== "overview") {
        toast.info("New order received! Switch to Overview tab to see live updates.");
      }
      return prev;
    });

    if (window.updateSalesChart) {
      window.updateSalesChart(order.total);
    }

    setRecentOrders(prev => [order, ...prev.slice(0, -1)]);
  };

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-brand-600" />
        <span className="ml-2">Loading admin dashboard...</span>
      </div>
    );
  }

  if (!isAdmin) {
    return null; // The user will be redirected in the useEffect
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <p className="text-gray-500">Manage your e-commerce platform</p>
        </div>
        <div className="mt-4 md:mt-0">
          <Button>Export Reports</Button>
        </div>
      </div>
      
      <div className="mb-8">
        <OrderSimulator onNewOrder={handleNewOrder} />
      </div>
      
      <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="products">Products</TabsTrigger>
          <TabsTrigger value="orders">Orders</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Total Revenue</p>
                    <p className="text-3xl font-bold">$12,426</p>
                    <p className="text-xs text-green-500 mt-1 flex items-center">
                      <ArrowUpRight className="h-3 w-3 mr-1" />
                      +8.2% from last month
                    </p>
                  </div>
                  <div className="h-12 w-12 bg-brand-100 rounded-full flex items-center justify-center">
                    <DollarSign className="h-6 w-6 text-brand-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Total Orders</p>
                    <p className="text-3xl font-bold">142</p>
                    <p className="text-xs text-green-500 mt-1 flex items-center">
                      <ArrowUpRight className="h-3 w-3 mr-1" />
                      +12.5% from last month
                    </p>
                  </div>
                  <div className="h-12 w-12 bg-purple-100 rounded-full flex items-center justify-center">
                    <ShoppingBag className="h-6 w-6 text-purple-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Total Users</p>
                    <p className="text-3xl font-bold">2,856</p>
                    <p className="text-xs text-green-500 mt-1 flex items-center">
                      <ArrowUpRight className="h-3 w-3 mr-1" />
                      +4.3% from last month
                    </p>
                  </div>
                  <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <Users className="h-6 w-6 text-blue-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Profit Margin</p>
                    <p className="text-3xl font-bold">24.6%</p>
                    <p className="text-xs text-red-500 mt-1 flex items-center">
                      <ArrowDownRight className="h-3 w-3 mr-1" />
                      -2.1% from last month
                    </p>
                  </div>
                  <div className="h-12 w-12 bg-green-100 rounded-full flex items-center justify-center">
                    <TrendingUp className="h-6 w-6 text-green-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="grid gap-6 md:grid-cols-2 mb-8">
            <SalesChart />
            <TopProducts />
          </div>
          
          <Card>
              <CardHeader>
                <CardTitle>Recent Orders</CardTitle>
                <CardDescription>Latest customer purchases</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Order ID</TableHead>
                      <TableHead>Customer</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Amount</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {recentOrders.length > 0 ? (
                      recentOrders.slice(0, 5).map((order) => (
                        <TableRow key={order.id}>
                          <TableCell className="font-medium">{order.id}</TableCell>
                          <TableCell>{order.customer}</TableCell>
                          <TableCell>
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              order.status === 'Completed' ? 'bg-green-100 text-green-800' :
                              order.status === 'Processing' ? 'bg-blue-100 text-blue-800' :
                              'bg-amber-100 text-amber-800'
                            }`}>
                              {order.status}
                            </span>
                          </TableCell>
                          <TableCell className="text-right">${order.total.toFixed(2)}</TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={4} className="text-center py-4 text-muted-foreground">
                          No recent orders found. Try simulating some orders.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
                <div className="mt-4">
                  <Button variant="outline" size="sm" className="w-full" onClick={() => setActiveTab("orders")}>
                    View All Orders
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Recent Users</CardTitle>
                <CardDescription>Latest registered customers</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentUsers.map((user) => (
                    <div key={user.id} className="flex items-center">
                      <div className="h-10 w-10 rounded-full bg-gray-200 mr-3 flex items-center justify-center">
                        <span className="text-gray-600 font-medium text-sm">
                          {user.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">{user.name}</p>
                        <p className="text-xs text-gray-500">{user.email}</p>
                      </div>
                      <div className="ml-4">
                        <Button variant="ghost" size="sm">
                          <FileText className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-8">
                  <Button variant="outline" size="sm" className="w-full" onClick={() => setActiveTab("users")}>
                    View All Users
                  </Button>
                </div>
              </CardContent>
            </Card>
        </TabsContent>
        
        <TabsContent value="products">
          <Card>
            <CardHeader>
              <div className="flex flex-col md:flex-row justify-between md:items-center">
                <div>
                  <CardTitle>Product Management</CardTitle>
                  <CardDescription>Manage your product inventory</CardDescription>
                </div>
                <div className="mt-4 md:mt-0 flex flex-col sm:flex-row gap-2">
                  <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                    <Input 
                      placeholder="Search products..." 
                      className="pl-8 w-full sm:w-[200px] lg:w-[300px]"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  <Button onClick={handleAddProduct}>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Product
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {productsLoading ? (
                <div className="flex justify-center py-8">
                  <Loader2 className="h-6 w-6 animate-spin text-brand-600" />
                  <span className="ml-2">Loading products...</span>
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Product Name</TableHead>
                      <TableHead>Price</TableHead>
                      <TableHead>Merchant</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Stock</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredProducts.length > 0 ? (
                      filteredProducts.map((product) => (
                        <TableRow key={product.id}>
                          <TableCell className="font-medium">
                            <div className="flex items-center">
                              <div className="h-10 w-10 rounded bg-gray-200 mr-3 flex-shrink-0">
                                <img src={product.image} alt={product.name} className="h-full w-full object-cover rounded" />
                              </div>
                              <span className="truncate max-w-[250px]">{product.name}</span>
                            </div>
                          </TableCell>
                          <TableCell>${product.price.toFixed(2)}</TableCell>
                          <TableCell>{product.merchant || 'N/A'}</TableCell>
                          <TableCell>{product.category || 'N/A'}</TableCell>
                          <TableCell>{product.stock || 0}</TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => handleEditProduct(product)}
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => handleDeleteProduct(product)}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                          No products found. Add some products to get started.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="orders">
          <Card>
            <CardHeader>
              <div className="flex flex-col md:flex-row justify-between md:items-center">
                <div>
                  <CardTitle>Order Management</CardTitle>
                  <CardDescription>Track and manage customer orders</CardDescription>
                </div>
                <div className="mt-4 md:mt-0 flex flex-col sm:flex-row gap-2">
                  <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                    <Input 
                      placeholder="Search orders..." 
                      className="pl-8 w-full sm:w-[200px] lg:w-[300px]" 
                    />
                  </div>
                  <Button>Export Orders</Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Order ID</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Total</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentOrders.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell className="font-medium">{order.id}</TableCell>
                      <TableCell>{order.customer}</TableCell>
                      <TableCell>{order.date}</TableCell>
                      <TableCell>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          order.status === 'Completed' ? 'bg-green-100 text-green-800' :
                          order.status === 'Processing' ? 'bg-blue-100 text-blue-800' :
                          'bg-amber-100 text-amber-800'
                        }`}>
                          {order.status}
                        </span>
                      </TableCell>
                      <TableCell className="text-right">${order.total.toFixed(2)}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="ghost" size="icon">
                            <FileText className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon">
                            <Edit className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="users">
          <Card>
            <CardHeader>
              <div className="flex flex-col md:flex-row justify-between md:items-center">
                <div>
                  <CardTitle>User Management</CardTitle>
                  <CardDescription>Manage registered users</CardDescription>
                </div>
                <div className="mt-4 md:mt-0 flex flex-col sm:flex-row gap-2">
                  <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                    <Input 
                      placeholder="Search users..." 
                      className="pl-8 w-full sm:w-[200px] lg:w-[300px]" 
                    />
                  </div>
                  <Button>Add User</Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Registered</TableHead>
                    <TableHead>Orders</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {Array(10).fill(0).map((_, i) => {
                    const user = {
                      id: i + 1,
                      name: ["John Doe", "Jane Smith", "Bob Johnson", "Alice Williams", "Tom Brown"][i % 5],
                      email: ["john.doe@example.com", "jane.smith@example.com", "bob.johnson@example.com", 
                              "alice.williams@example.com", "tom.brown@example.com"][i % 5],
                      registered: ["2023-04-10", "2023-04-09", "2023-04-08", "2023-04-07", "2023-04-06"][i % 5],
                      orders: Math.floor(Math.random() * 10)
                    };
                    
                    return (
                      <TableRow key={user.id}>
                        <TableCell className="font-medium">#{user.id}</TableCell>
                        <TableCell>{user.name}</TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>{user.registered}</TableCell>
                        <TableCell>{user.orders}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button variant="ghost" size="icon">
                              <FileText className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <ProductForm
        product={selectedProduct || undefined}
        isOpen={showProductForm}
        onClose={() => setShowProductForm(false)}
        onSubmit={handleProductSubmit}
      />

      <DeleteProductDialog
        isOpen={showDeleteDialog}
        onClose={() => setShowDeleteDialog(false)}
        onConfirm={handleProductDelete}
      />
    </div>
  );
};

export default AdminDashboard;
