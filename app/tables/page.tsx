"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Tooltip as UITooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { ChevronDown, ChevronRight, Search, Download, Filter, Eye, Edit, Trash2, Plus, RefreshCw, Code, ExternalLink } from "lucide-react"
import { useState } from "react"

interface CustomerDetails {
  address: string
  phone: string
  orders: number
  totalSpent: string
}

interface Customer {
  id: string
  customer: string
  email: string
  status: string
  amount: string
  date: string
  details: CustomerDetails
}

interface Product {
  id: string
  name: string
  category: string
  price: string
  stock: number
  status: string
  sales: number
}

interface Order {
  id: string
  customer: string
  product: string
  amount: string
  status: string
  date: string
}

interface NewCustomer {
  customer: string
  email: string
  phone: string
  address: string
  status: string
}

interface NewProduct {
  name: string
  category: string
  price: string
  stock: string
  status: string
}

interface NewOrder {
  customer: string
  product: string
  amount: string
  status: string
}

const initialCustomerData: Customer[] = [
  {
    id: "1",
    customer: "Olivia Martin",
    email: "olivia.martin@email.com",
    status: "active",
    amount: "$1,999.00",
    date: "2024-01-15",
    details: {
      address: "123 Main St, San Francisco, CA",
      phone: "+1 (555) 123-4567",
      orders: 15,
      totalSpent: "$15,420.00"
    }
  },
  {
    id: "2",
    customer: "Jackson Lee",
    email: "jackson.lee@email.com",
    status: "pending",
    amount: "$39.00",
    date: "2024-01-14",
    details: {
      address: "456 Oak Ave, New York, NY",
      phone: "+1 (555) 234-5678",
      orders: 3,
      totalSpent: "$420.00"
    }
  },
  {
    id: "3",
    customer: "Isabella Nguyen",
    email: "isabella.nguyen@email.com",
    status: "active",
    amount: "$299.00",
    date: "2024-01-13",
    details: {
      address: "789 Pine Rd, Los Angeles, CA",
      phone: "+1 (555) 345-6789",
      orders: 8,
      totalSpent: "$2,350.00"
    }
  },
  {
    id: "4",
    customer: "William Kim",
    email: "will@email.com",
    status: "inactive",
    amount: "$99.00",
    date: "2024-01-12",
    details: {
      address: "321 Elm St, Chicago, IL",
      phone: "+1 (555) 456-7890",
      orders: 2,
      totalSpent: "$180.00"
    }
  },
]

const initialProductData: Product[] = [
  {
    id: "1",
    name: "Premium Subscription",
    category: "Subscription",
    price: "$29.99",
    stock: 999,
    status: "active",
    sales: 142
  },
  {
    id: "2",
    name: "Basic Plan",
    category: "Subscription",
    price: "$9.99",
    stock: 999,
    status: "active",
    sales: 89
  },
  {
    id: "3",
    name: "Enterprise",
    category: "Subscription",
    price: "$99.99",
    stock: 999,
    status: "active",
    sales: 23
  },
]

const initialOrderData: Order[] = [
  {
    id: "ORD-001",
    customer: "Olivia Martin",
    product: "Premium Subscription",
    amount: "$29.99",
    status: "completed",
    date: "2024-01-15"
  },
  {
    id: "ORD-002",
    customer: "Jackson Lee",
    product: "Basic Plan",
    amount: "$9.99",
    status: "pending",
    date: "2024-01-14"
  },
  {
    id: "ORD-003",
    customer: "Isabella Nguyen",
    product: "Enterprise",
    amount: "$99.99",
    status: "completed",
    date: "2024-01-13"
  },
]

export default function Tables() {
  const [customerData, setCustomerData] = useState<Customer[]>(initialCustomerData)
  const [productData, setProductData] = useState<Product[]>(initialProductData)
  const [orderData, setOrderData] = useState<Order[]>(initialOrderData)
  
  const [expandedRows, setExpandedRows] = useState(new Set<string>())
  const [customerSearchTerm, setCustomerSearchTerm] = useState("")
  const [customerStatusFilter, setCustomerStatusFilter] = useState("all")
  
  const [productSearchTerm, setProductSearchTerm] = useState("")
  const [orderSearchTerm, setOrderSearchTerm] = useState("")
  
  const [customerModalOpen, setCustomerModalOpen] = useState(false)
  const [productModalOpen, setProductModalOpen] = useState(false)
  const [orderModalOpen, setOrderModalOpen] = useState(false)
  const [isRefreshing, setIsRefreshing] = useState(false)
  
  const [newCustomer, setNewCustomer] = useState<NewCustomer>({
    customer: "",
    email: "",
    phone: "",
    address: "",
    status: "active"
  })
  
  const [newProduct, setNewProduct] = useState<NewProduct>({
    name: "",
    category: "",
    price: "",
    stock: "",
    status: "active"
  })
  
  const [newOrder, setNewOrder] = useState<NewOrder>({
    customer: "",
    product: "",
    amount: "",
    status: "pending"
  })

  // Export functionality
  const exportToCSV = (data: any[], filename: string) => {
    const headers = Object.keys(data[0]).filter(key => key !== 'details').join(",")
    const csvData = data.map(row => 
      Object.entries(row)
        .filter(([key]) => key !== 'details')
        .map(([_, value]) => typeof value === 'object' ? JSON.stringify(value) : value)
        .join(",")
    ).join("\n")
    
    const csv = `${headers}\n${csvData}`
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.setAttribute('hidden', '')
    a.setAttribute('href', url)
    a.setAttribute('download', `${filename}.csv`)
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
  }

  const toggleRow = (id: string) => {
    const newExpanded = new Set(expandedRows)
    if (newExpanded.has(id)) {
      newExpanded.delete(id)
    } else {
      newExpanded.add(id)
    }
    setExpandedRows(newExpanded)
  }

  const filteredCustomerData = customerData.filter(item => {
    const matchesSearch = item.customer.toLowerCase().includes(customerSearchTerm.toLowerCase()) ||
                         item.email.toLowerCase().includes(customerSearchTerm.toLowerCase())
    const matchesStatus = customerStatusFilter === "all" || item.status === customerStatusFilter
    return matchesSearch && matchesStatus
  })
  
  const filteredProductData = productData.filter(item =>
    item.name.toLowerCase().includes(productSearchTerm.toLowerCase()) ||
    item.category.toLowerCase().includes(productSearchTerm.toLowerCase())
  )
  
  const filteredOrderData = orderData.filter(item =>
    item.customer.toLowerCase().includes(orderSearchTerm.toLowerCase()) ||
    item.product.toLowerCase().includes(orderSearchTerm.toLowerCase()) ||
    item.id.toLowerCase().includes(orderSearchTerm.toLowerCase())
  )

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": case "completed": return "bg-green-300 text-green-800 border-green-700"
      case "pending": return "bg-yellow-300 text-yellow-800 border-yellow-700"
      case "inactive": return "bg-red-300 text-red-800 border-red-700"
      default: return "bg-gray-300 text-gray-800 border-gray-700"
    }
  }

  const handleAddCustomer = () => {
    if (!newCustomer.customer || !newCustomer.email) {
      return
    }

    const customer: Customer = {
      id: (customerData.length + 1).toString(),
      customer: newCustomer.customer,
      email: newCustomer.email,
      status: newCustomer.status,
      amount: "$0.00",
      date: new Date().toISOString().split('T')[0],
      details: {
        address: newCustomer.address,
        phone: newCustomer.phone,
        orders: 0,
        totalSpent: "$0.00"
      }
    }
    setCustomerData([...customerData, customer])
    setNewCustomer({ customer: "", email: "", phone: "", address: "", status: "active" })
    setCustomerModalOpen(false)
  }

  const handleAddProduct = () => {
    if (!newProduct.name || !newProduct.price) {
      return
    }

    const product: Product = {
      id: (productData.length + 1).toString(),
      name: newProduct.name,
      category: newProduct.category,
      price: newProduct.price,
      stock: parseInt(newProduct.stock) || 0,
      status: newProduct.status,
      sales: 0
    }
    setProductData([...productData, product])
    setNewProduct({ name: "", category: "", price: "", stock: "", status: "active" })
    setProductModalOpen(false)
  }

  const handleAddOrder = () => {
    if (!newOrder.customer || !newOrder.product || !newOrder.amount) {
      return
    }

    const order: Order = {
      id: `ORD-${String(orderData.length + 1).padStart(3, '0')}`,
      customer: newOrder.customer,
      product: newOrder.product,
      amount: newOrder.amount,
      status: newOrder.status,
      date: new Date().toISOString().split('T')[0]
    }
    setOrderData([...orderData, order])
    setNewOrder({ customer: "", product: "", amount: "", status: "pending" })
    setOrderModalOpen(false)
  }

  const handleDeleteItem = (id: string, type: string, name: string) => {
    switch (type) {
      case 'customer':
        setCustomerData(customerData.filter(item => item.id !== id))
        break
      case 'product':
        setProductData(productData.filter(item => item.id !== id))
        break
      case 'order':
        setOrderData(orderData.filter(item => item.id !== id))
        break
    }
  }

  const handleRefresh = async () => {
    setIsRefreshing(true)
    await new Promise(resolve => setTimeout(resolve, 1500))
    setIsRefreshing(false)
  }

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Data Tables</h1>
          <p className="text-muted-foreground mt-1">
            Advanced tables with collapsible rows, filtering, and sorting.
          </p>
        </div>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleRefresh}
            disabled={isRefreshing}
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
          <TooltipProvider>
            <UITooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    const baseUrl = typeof window !== 'undefined' ? window.location.origin : ''
                    const registryUrl = `${baseUrl}/r/tables.json`
                    const v0Url = `https://v0.dev/chat/api/open?url=${encodeURIComponent(registryUrl)}`
                    window.open(v0Url, '_blank', 'noopener,noreferrer')
                  }}
                  className="flex items-center gap-2"
                  aria-label="Open in v0"
                >
                  <Code className="h-4 w-4" />
                  <span className="hidden sm:inline">Open in v0</span>
                  <ExternalLink className="h-3 w-3" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Open this component in v0 for AI-powered editing</p>
              </TooltipContent>
            </UITooltip>
          </TooltipProvider>
        </div>
      </div>

      {/* Customer Table */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Customer Database</CardTitle>
              <CardDescription>
                Manage and view customer information with expandable details
              </CardDescription>
            </div>
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => exportToCSV(customerData, 'customers')}
              >
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
              <Dialog open={customerModalOpen} onOpenChange={setCustomerModalOpen}>
                <DialogTrigger asChild>
                  <Button size="sm">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Customer
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add New Customer</DialogTitle>
                    <DialogDescription>
                      Enter the customer details below.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="customer">Customer Name *</Label>
                        <Input
                          id="customer"
                          value={newCustomer.customer}
                          onChange={(e) => setNewCustomer({...newCustomer, customer: e.target.value})}
                          placeholder="John Doe"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email *</Label>
                        <Input
                          id="email"
                          type="email"
                          value={newCustomer.email}
                          onChange={(e) => setNewCustomer({...newCustomer, email: e.target.value})}
                          placeholder="john@example.com"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone</Label>
                      <Input
                        id="phone"
                        value={newCustomer.phone}
                        onChange={(e) => setNewCustomer({...newCustomer, phone: e.target.value})}
                        placeholder="+1 (555) 123-4567"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="address">Address</Label>
                      <Textarea
                        id="address"
                        value={newCustomer.address}
                        onChange={(e) => setNewCustomer({...newCustomer, address: e.target.value})}
                        placeholder="123 Main St, City, State"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="status">Status</Label>
                      <Select value={newCustomer.status} onValueChange={(value) => setNewCustomer({...newCustomer, status: value})}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="active">Active</SelectItem>
                          <SelectItem value="pending">Pending</SelectItem>
                          <SelectItem value="inactive">Inactive</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setCustomerModalOpen(false)}>
                      Cancel
                    </Button>
                    <Button onClick={handleAddCustomer}>Add Customer</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input 
                  placeholder="Search customers..." 
                  value={customerSearchTerm}
                  onChange={(e) => setCustomerSearchTerm(e.target.value)}
                  className="pl-10 w-64"
                />
              </div>
              <Select value={customerStatusFilter} onValueChange={setCustomerStatusFilter}>
                <SelectTrigger className="w-32">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <p className="text-sm text-muted-foreground">
              {filteredCustomerData.length} of {customerData.length} customers
            </p>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-8"></TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCustomerData.map((item) => (
                  <Collapsible key={item.id} asChild>
                    <>
                      <TableRow className="cursor-pointer hover:bg-muted/50">
                        <TableCell>
                          <CollapsibleTrigger asChild>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => toggleRow(item.id)}
                              className="p-0 h-6 w-6"
                            >
                              {expandedRows.has(item.id) ? (
                                <ChevronDown className="h-4 w-4" />
                              ) : (
                                <ChevronRight className="h-4 w-4" />
                              )}
                            </Button>
                          </CollapsibleTrigger>
                        </TableCell>
                        <TableCell className="font-medium">
                          {item.customer}
                        </TableCell>
                        <TableCell className="text-muted-foreground">
                          {item.email}
                        </TableCell>
                        <TableCell>
                          <Badge 
                            variant="outline" 
                            className={getStatusColor(item.status)}
                          >
                            {item.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="font-mono text-sm">
                          {item.amount}
                        </TableCell>
                        <TableCell className="text-muted-foreground">
                          {item.date}
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center justify-end gap-2">
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => {}}
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => {}}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => handleDeleteItem(item.id, 'customer', item.customer)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                      <CollapsibleContent asChild>
                        <TableRow className="hover:bg-muted/25">
                          <TableCell></TableCell>
                          <TableCell colSpan={6}>
                            <div className="p-4 bg-muted/25 rounded-md">
                              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                <div>
                                  <h4 className="text-sm font-medium text-muted-foreground">Address</h4>
                                  <p className="text-sm">{item.details.address}</p>
                                </div>
                                <div>
                                  <h4 className="text-sm font-medium text-muted-foreground">Phone</h4>
                                  <p className="text-sm">{item.details.phone}</p>
                                </div>
                                <div>
                                  <h4 className="text-sm font-medium text-muted-foreground">Total Orders</h4>
                                  <p className="text-sm font-medium">{item.details.orders}</p>
                                </div>
                                <div>
                                  <h4 className="text-sm font-medium text-muted-foreground">Total Spent</h4>
                                  <p className="text-sm font-medium font-mono">{item.details.totalSpent}</p>
                                </div>
                              </div>
                            </div>
                          </TableCell>
                        </TableRow>
                      </CollapsibleContent>
                    </>
                  </Collapsible>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Products Table */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Product Catalog</CardTitle>
              <CardDescription>
                Manage your products and inventory
              </CardDescription>
            </div>
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => exportToCSV(productData, 'products')}
              >
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
              <Dialog open={productModalOpen} onOpenChange={setProductModalOpen}>
                <DialogTrigger asChild>
                  <Button size="sm">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Product
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add New Product</DialogTitle>
                    <DialogDescription>
                      Enter the product details below.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Product Name *</Label>
                        <Input
                          id="name"
                          value={newProduct.name}
                          onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
                          placeholder="Premium Plan"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="category">Category</Label>
                        <Input
                          id="category"
                          value={newProduct.category}
                          onChange={(e) => setNewProduct({...newProduct, category: e.target.value})}
                          placeholder="Subscription"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="price">Price *</Label>
                        <Input
                          id="price"
                          placeholder="$29.99"
                          value={newProduct.price}
                          onChange={(e) => setNewProduct({...newProduct, price: e.target.value})}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="stock">Stock</Label>
                        <Input
                          id="stock"
                          type="number"
                          value={newProduct.stock}
                          onChange={(e) => setNewProduct({...newProduct, stock: e.target.value})}
                          placeholder="100"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="status">Status</Label>
                      <Select value={newProduct.status} onValueChange={(value) => setNewProduct({...newProduct, status: value})}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="active">Active</SelectItem>
                          <SelectItem value="inactive">Inactive</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setProductModalOpen(false)}>
                      Cancel
                    </Button>
                    <Button onClick={handleAddProduct}>Add Product</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between mb-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input 
                placeholder="Search products..." 
                value={productSearchTerm}
                onChange={(e) => setProductSearchTerm(e.target.value)}
                className="pl-10 w-64"
              />
            </div>
            <p className="text-sm text-muted-foreground">
              {filteredProductData.length} of {productData.length} products
            </p>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Stock</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Sales</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredProductData.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium">{item.name}</TableCell>
                    <TableCell>{item.category}</TableCell>
                    <TableCell className="font-mono">{item.price}</TableCell>
                    <TableCell>{item.stock}</TableCell>
                    <TableCell>
                      <Badge 
                        variant="outline" 
                        className={getStatusColor(item.status)}
                      >
                        {item.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{item.sales}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => {}}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => {}}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => handleDeleteItem(item.id, 'product', item.name)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Orders Table */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Order Management</CardTitle>
              <CardDescription>
                Track and manage customer orders
              </CardDescription>
            </div>
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => exportToCSV(orderData, 'orders')}
              >
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
              <Dialog open={orderModalOpen} onOpenChange={setOrderModalOpen}>
                <DialogTrigger asChild>
                  <Button size="sm">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Order
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add New Order</DialogTitle>
                    <DialogDescription>
                      Enter the order details below.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="space-y-2">
                      <Label htmlFor="orderCustomer">Customer Name *</Label>
                      <Input
                        id="orderCustomer"
                        value={newOrder.customer}
                        onChange={(e) => setNewOrder({...newOrder, customer: e.target.value})}
                        placeholder="John Doe"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="orderProduct">Product *</Label>
                      <Input
                        id="orderProduct"
                        value={newOrder.product}
                        onChange={(e) => setNewOrder({...newOrder, product: e.target.value})}
                        placeholder="Premium Subscription"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="orderAmount">Amount *</Label>
                      <Input
                        id="orderAmount"
                        placeholder="$29.99"
                        value={newOrder.amount}
                        onChange={(e) => setNewOrder({...newOrder, amount: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="orderStatus">Status</Label>
                      <Select value={newOrder.status} onValueChange={(value) => setNewOrder({...newOrder, status: value})}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="pending">Pending</SelectItem>
                          <SelectItem value="completed">Completed</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setOrderModalOpen(false)}>
                      Cancel
                    </Button>
                    <Button onClick={handleAddOrder}>Add Order</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between mb-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input 
                placeholder="Search orders..." 
                value={orderSearchTerm}
                onChange={(e) => setOrderSearchTerm(e.target.value)}
                className="pl-10 w-64"
              />
            </div>
            <p className="text-sm text-muted-foreground">
              {filteredOrderData.length} of {orderData.length} orders
            </p>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Order ID</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Product</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredOrderData.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-mono">{item.id}</TableCell>
                    <TableCell className="font-medium">{item.customer}</TableCell>
                    <TableCell>{item.product}</TableCell>
                    <TableCell className="font-mono">{item.amount}</TableCell>
                    <TableCell>
                      <Badge 
                        variant="outline" 
                        className={getStatusColor(item.status)}
                      >
                        {item.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-muted-foreground">{item.date}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => {}}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => {}}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => handleDeleteItem(item.id, 'order', `Order ${item.id}`)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}