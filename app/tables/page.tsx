"use client"

import { V0Button } from "@/components/v0-button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ChevronDown, ChevronRight, Search, Download, Filter, Eye, Edit, Trash2 } from "lucide-react"
import { useState } from "react"

const data = [
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

export default function Tables() {
  const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set())
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  const toggleRow = (id: string) => {
    const newExpanded = new Set(expandedRows)
    if (newExpanded.has(id)) {
      newExpanded.delete(id)
    } else {
      newExpanded.add(id)
    }
    setExpandedRows(newExpanded)
  }

  const filteredData = data.filter(item => {
    const matchesSearch = item.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || item.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "bg-green-100 text-green-800 border-green-200"
      case "pending": return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "inactive": return "bg-red-100 text-red-800 border-red-200"
      default: return "bg-gray-100 text-gray-800 border-gray-200"
    }
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
        <V0Button prompt="Create an advanced data table with collapsible rows, search, filters, and actions" />
      </div>

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
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
              <Button size="sm">
                Add Customer
              </Button>
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
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-64"
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
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
              {filteredData.length} of {data.length} customers
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
                {filteredData.map((item) => (
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
                            <Button variant="ghost" size="sm">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
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
    </div>
  )
}