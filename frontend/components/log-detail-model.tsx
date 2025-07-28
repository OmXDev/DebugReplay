"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Copy, Clock, Globe, ArrowRight } from "lucide-react"
import { useState } from "react"

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

interface LogDetailModalProps {
  log: Log
  onClose: () => void
}

export function LogDetailModal({ log, onClose }: LogDetailModalProps) {
  const [copiedField, setCopiedField] = useState<string | null>(null)

  const copyToClipboard = async (text: string, field: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedField(field)
      setTimeout(() => setCopiedField(null), 2000)
    } catch (err) {
      console.error("Failed to copy:", err)
    }
  }

  const formatJson = (jsonString: string | null | undefined) => {
    if (!jsonString) return "No data"
    try {
      return JSON.stringify(JSON.parse(jsonString), null, 2)
    } catch {
      return jsonString
    }
  }

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

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3">
            <Badge variant={getMethodBadgeVariant(log.method)}>{log.method}</Badge>
            <span className="font-mono text-sm">{log.url}</span>
            <Badge variant={getStatusBadgeVariant(log.statusCode)}>{log.statusCode}</Badge>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  Duration
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">{log.duration}ms</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm flex items-center gap-2">
                  <Globe className="h-4 w-4" />
                  Status
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">{log.statusCode}</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">Timestamp</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm font-mono">{new Date(log.createdAt).toLocaleString()}</p>
              </CardContent>
            </Card>
          </div>

          {/* Request/Response Details */}
          <Tabs defaultValue="request" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="request">Request</TabsTrigger>
              <TabsTrigger value="response">Response</TabsTrigger>
              <TabsTrigger value="headers">Headers</TabsTrigger>
            </TabsList>

            <TabsContent value="request" className="space-y-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="text-lg">Request Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold">URL</h4>
                      <Button variant="ghost" size="sm" onClick={() => copyToClipboard(log.url, "url")}>
                        <Copy className="h-4 w-4" />
                        {copiedField === "url" ? "Copied!" : "Copy"}
                      </Button>
                    </div>
                    <code className="block p-3 bg-muted rounded-md text-sm font-mono">{log.url}</code>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold">Request Body</h4>
                      {log.requestBody && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => copyToClipboard(log.requestBody!, "requestBody")}
                        >
                          <Copy className="h-4 w-4" />
                          {copiedField === "requestBody" ? "Copied!" : "Copy"}
                        </Button>
                      )}
                    </div>
                    <pre className="p-3 bg-muted rounded-md text-sm font-mono overflow-x-auto max-h-64 overflow-y-auto">
                      {formatJson(log.requestBody)}
                    </pre>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="response" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    Response Details
                    <ArrowRight className="h-4 w-4" />
                    <Badge variant={getStatusBadgeVariant(log.statusCode)}>{log.statusCode}</Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold">Response Body</h4>
                      {log.responseBody && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => copyToClipboard(log.responseBody!, "responseBody")}
                        >
                          <Copy className="h-4 w-4" />
                          {copiedField === "responseBody" ? "Copied!" : "Copy"}
                        </Button>
                      )}
                    </div>
                    <pre className="p-3 bg-muted rounded-md text-sm font-mono overflow-x-auto max-h-64 overflow-y-auto">
                      {formatJson(log.responseBody)}
                    </pre>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="headers" className="space-y-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="text-lg">Request Headers</CardTitle>
                  {log.headers && Object.keys(log.headers).length > 0 && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => copyToClipboard(JSON.stringify(log.headers, null, 2), "headers")}
                    >
                      <Copy className="h-4 w-4" />
                      {copiedField === "headers" ? "Copied!" : "Copy All"}
                    </Button>
                  )}
                </CardHeader>
                <CardContent>
                  {log.headers && Object.keys(log.headers).length > 0 ? (
                    <div className="space-y-2">
                      {Object.entries(log.headers).map(([key, value]) => (
                        <div key={key} className="flex items-start gap-4 p-2 bg-muted rounded">
                          <code className="font-semibold text-sm min-w-0 flex-shrink-0">{key}:</code>
                          <code className="text-sm font-mono break-all">{value}</code>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-muted-foreground">No headers recorded</p>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  )
}
