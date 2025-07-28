"use client"

import { useState, useEffect } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { LogDetailModal } from "./log-detail-model"
import { Search, Filter, AlertCircle, Clock, Globe } from "lucide-react"
import { formatDistanceToNow } from "date-fns"

interface Log {
  id: string
  method: string
  url: string
  statusCode: number
  duration: number
  createdAt: string
  requestBody?: string
  responseBody?: string
  headers?: Record<string, string>
}

export function LogsTable() {
  const [logs, setLogs] = useState<Log[]>([])
  const [filteredLogs, setFilteredLogs] = useState<Log[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedLog, setSelectedLog] = useState<Log | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [methodFilter, setMethodFilter] = useState<string>("all")
  const [statusFilter, setStatusFilter] = useState<string>("all")

  // Mock data for demonstration
 useEffect(() => {
  const fetchLogs = async () => {
    try {
      setLoading(true)

      const res = await fetch(`${process.env.BACKEND_URL}/api/logs`)  
      if (!res.ok) throw new Error("Failed to fetch")

      const logs = await res.json()

      setLogs(logs)
      setFilteredLogs(logs)
    } catch (err) {
      setError("Failed to fetch logs. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  fetchLogs()
}, [])


  // Filter logs based on search and filters
  useEffect(() => {
    let filtered = logs

    if (searchTerm) {
      filtered = filtered.filter(
        (log) =>
          log.url.toLowerCase().includes(searchTerm.toLowerCase()) ||
          log.method.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    if (methodFilter !== "all") {
      filtered = filtered.filter((log) => log.method === methodFilter)
    }

    if (statusFilter !== "all") {
      if (statusFilter === "2xx") {
        filtered = filtered.filter((log) => log.statusCode >= 200 && log.statusCode < 300)
      } else if (statusFilter === "4xx") {
        filtered = filtered.filter((log) => log.statusCode >= 400 && log.statusCode < 500)
      } else if (statusFilter === "5xx") {
        filtered = filtered.filter((log) => log.statusCode >= 500 && log.statusCode < 600)
      }
    }

    setFilteredLogs(filtered)
  }, [logs, searchTerm, methodFilter, statusFilter])

  const getStatusBadgeVariant = (statusCode: number) => {
    if (statusCode >= 200 && statusCode < 300) return "default"
    if (statusCode >= 400 && statusCode < 500) return "secondary"
    if (statusCode >= 500) return "destructive"
    return "outline"
  }

  const getMethodBadgeVariant = (method: string) => {
    switch (method) {
      case "GET":
        return "outline"
      case "POST":
        return "default"
      case "PUT":
        return "secondary"
      case "DELETE":
        return "destructive"
      default:
        return "outline"
    }
  }

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5 animate-spin" />
            Loading logs...
          </CardTitle>
        </CardHeader>
      </Card>
    )
  }

  if (error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-destructive">
            <AlertCircle className="h-5 w-5" />
            Error Loading Logs
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-4">{error}</p>
          <Button onClick={() => window.location.reload()}>Try Again</Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-4">
      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filters
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by URL or method..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={methodFilter} onValueChange={setMethodFilter}>
              <SelectTrigger className="w-full sm:w-32">
                <SelectValue placeholder="Method" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Methods</SelectItem>
                <SelectItem value="GET">GET</SelectItem>
                <SelectItem value="POST">POST</SelectItem>
                <SelectItem value="PUT">PUT</SelectItem>
                <SelectItem value="DELETE">DELETE</SelectItem>
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-32">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="2xx">2xx Success</SelectItem>
                <SelectItem value="4xx">4xx Client Error</SelectItem>
                <SelectItem value="5xx">5xx Server Error</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Results Summary */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          Showing {filteredLogs.length} of {logs.length} logs
        </p>
      </div>

      {/* Logs Table */}
      {filteredLogs.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <Globe className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">No logs found</h3>
            <p className="text-muted-foreground">
              {logs.length === 0 ? "No logs have been captured yet." : "Try adjusting your search or filter criteria."}
            </p>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Method</TableHead>
                <TableHead>URL</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead>Time</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredLogs.map((log) => (
                <TableRow key={log.id} className="cursor-pointer hover:bg-muted/50" onClick={() => setSelectedLog(log)}>
                  <TableCell>
                    <Badge variant={getMethodBadgeVariant(log.method)}>{log.method}</Badge>
                  </TableCell>
                  <TableCell className="font-mono text-sm max-w-xs truncate">{log.url}</TableCell>
                  <TableCell>
                    <Badge variant={getStatusBadgeVariant(log.statusCode)}>{log.statusCode}</Badge>
                  </TableCell>
                  <TableCell className="text-sm">{log.duration}ms</TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {formatDistanceToNow(new Date(log.createdAt), { addSuffix: true })}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      )}

      {/* Log Detail Modal */}
      {selectedLog && <LogDetailModal log={selectedLog} onClose={() => setSelectedLog(null)} />}
    </div>
  )
}
