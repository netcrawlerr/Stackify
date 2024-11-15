import { Suspense, useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar } from "@/components/ui/calendar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Search, Filter, ChevronDown, MoreHorizontal } from "lucide-react"
import { DateRange } from "react-day-picker"
import { usePageTitle } from '@/hooks/usePageTitle'

 
const orders = [
  {
    id: "ORD-001",
    customer: "John Doe",
    date: "2024-03-20",
    total: 299.99,
    status: "Processing",
  },
  {
    id: "ORD-002",
    customer: "Jane Smith",
    date: "2024-03-19",
    total: 159.99,
    status: "Shipped",
  },
  {
    id: "ORD-003",
    customer: "Bob Johnson",
    date: "2024-03-18",
    total: 499.99,
    status: "Delivered",
  },
 
]

const getStatusColor = (status: string) => {
  switch (status) {
    case "Processing":
      return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400"
    case "Shipped":
      return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400"
    case "Delivered":
      return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
    default:
      return "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400"
  }
}

function OrderStatistics() {
  const totalOrders = orders.length
  const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0)
  const processingOrders = orders.filter(order => order.status === "Processing").length

  return (
    <div className="grid gap-4 md:grid-cols-3 mb-6 ">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalOrders}</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">${totalRevenue.toFixed(2)}</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Processing Orders</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{processingOrders}</div>
        </CardContent>
      </Card>
    </div>
  )
}

function DateRangePicker({ dateRange, setDateRange }: { dateRange: DateRange | undefined, setDateRange: (range: DateRange | undefined) => void }) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" className="w-[300px] justify-start text-left font-normal">
          {/* <Calendar className="mr-2 h-4 w-4" /> */}
          {dateRange?.from ? (
            dateRange.to ? (
              <>
                {dateRange.from.toDateString()} - {dateRange.to.toDateString()}
              </>
            ) : (
              dateRange.from.toDateString()
            )
          ) : (
            <span>Pick a date range</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          initialFocus
          mode="range"
          defaultMonth={dateRange?.from}
          selected={dateRange}
          onSelect={setDateRange}
          numberOfMonths={2}
        />
      </PopoverContent>
    </Popover>
  )
}

export default function Orders() {
  return (
    <div className="container mx-auto py-10">
      <Suspense fallback={<div>Loading...</div>}>
        <OrderList />
      </Suspense>
    </div>
  )
}

function OrderList() {
  const [searchQuery, setSearchQuery] = useState("")
  const [dateRange, setDateRange] = useState<DateRange | undefined>()
  const [currentPage, setCurrentPage] = useState(1)
  const [sortColumn, setSortColumn] = useState<string | null>(null)
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc')
  const ordersPerPage = 10

  const filteredOrders = orders.filter(order => 
    order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    order.customer.toLowerCase().includes(searchQuery.toLowerCase())
  ).filter(order => {
    if (!dateRange?.from || !dateRange?.to) return true
    const orderDate = new Date(order.date)
    return orderDate >= dateRange.from && orderDate <= dateRange.to
  })

  const sortedOrders = [...filteredOrders].sort((a, b) => {
    if (!sortColumn) return 0
    if (a[sortColumn] < b[sortColumn]) return sortDirection === 'asc' ? -1 : 1
    if (a[sortColumn] > b[sortColumn]) return sortDirection === 'asc' ? 1 : -1
    return 0
  })

  const indexOfLastOrder = currentPage * ordersPerPage
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage
  const currentOrders = sortedOrders.slice(indexOfFirstOrder, indexOfLastOrder)

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber)

  const handleSort = (column: string) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
    } else {
      setSortColumn(column)
      setSortDirection('asc')
    }
  }
  usePageTitle("Orders");
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Orders</h1>
        <p className="text-muted-foreground">Manage customer orders</p>
      </div>

      <OrderStatistics />

      <Card>
        <CardContent>
          <div className="mt-4 mb-6">
            <div className="flex gap-2 mb-4">
              <div className="relative flex-1">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Search orders..." 
                  className="pl-8" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <DateRangePicker dateRange={dateRange} setDateRange={setDateRange} />
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline">
                    <Filter className="mr-2 h-4 w-4" />
                    Filters
                    <ChevronDown className="ml-2 h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>Filter by Status</DropdownMenuLabel>
                  <DropdownMenuItem>Processing</DropdownMenuItem>
                  <DropdownMenuItem>Shipped</DropdownMenuItem>
                  <DropdownMenuItem>Delivered</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="cursor-pointer" onClick={() => handleSort('id')}>Order ID {sortColumn === 'id' && (sortDirection === 'asc' ? '↑' : '↓')}</TableHead>
                  <TableHead className="cursor-pointer" onClick={() => handleSort('customer')}>Customer {sortColumn === 'customer' && (sortDirection === 'asc' ? '↑' : '↓')}</TableHead>
                  <TableHead className="cursor-pointer" onClick={() => handleSort('date')}>Date {sortColumn === 'date' && (sortDirection === 'asc' ? '↑' : '↓')}</TableHead>
                  <TableHead className="cursor-pointer" onClick={() => handleSort('total')}>Total {sortColumn === 'total' && (sortDirection === 'asc' ? '↑' : '↓')}</TableHead>
                  <TableHead className="cursor-pointer" onClick={() => handleSort('status')}>Status {sortColumn === 'status' && (sortDirection === 'asc' ? '↑' : '↓')}</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {currentOrders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell className="font-medium">{order.id}</TableCell>
                    <TableCell>{order.customer}</TableCell>
                    <TableCell>{order.date}</TableCell>
                    <TableCell>${order.total.toFixed(2)}</TableCell>
                    <TableCell>
                      <span
                        className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${getStatusColor(
                          order.status
                        )}`}
                      >
                        {order.status}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem>View details</DropdownMenuItem>
                          <DropdownMenuItem>Update status</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>Delete order</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          <div className="flex justify-between items-center mt-4">
            <div>
              Showing {indexOfFirstOrder + 1}-{Math.min(indexOfLastOrder, sortedOrders.length)} of {sortedOrders.length} orders
            </div>
            <div className="flex gap-2">
              <Button 
                onClick={() => paginate(currentPage - 1)} 
                disabled={currentPage === 1}
                variant="outline"
              >
                Previous
              </Button>
              <Button 
                onClick={() => paginate(currentPage + 1)} 
                disabled={indexOfLastOrder >= sortedOrders.length}
                variant="outline"
              >
                Next
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}