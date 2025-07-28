import { LogsTable } from "@/components/logs-table"
import { Suspense } from "react"
import { Skeleton } from "@/components/ui/skeleton"

export default function HomePage() {
  return (
    <div className="container mx-auto py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Log History Dashboard</h1>
        <p className="text-muted-foreground mt-2">
          Monitor and analyze API requests captured by your middleware across all projects
        </p>
      </div>

      <Suspense fallback={<LogsTableSkeleton />}>
        <LogsTable />
      </Suspense>
    </div>
  )
}

function LogsTableSkeleton() {
  return (
    <div className="space-y-4">
      <div className="flex gap-4">
        <Skeleton className="h-10 w-32" />
        <Skeleton className="h-10 w-32" />
        <Skeleton className="h-10 w-48" />
      </div>
      <div className="border rounded-lg ">
        <div className="p-4">
          <Skeleton className="h-4 w-full mb-2" />
          <Skeleton className="h-4 w-3/4 mb-2" />
          <Skeleton className="h-4 w-1/2" />
        </div>
        {Array.from({ length: 10 }).map((_, i) => (
          <div key={i} className="border-t p-4">
            <div className="flex justify-between items-center">
              <div className="flex gap-4">
                <Skeleton className="h-4 w-16" />
                <Skeleton className="h-4 w-48" />
                <Skeleton className="h-4 w-12" />
              </div>
              <Skeleton className="h-4 w-20" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
