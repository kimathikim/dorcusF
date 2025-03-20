
import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="container max-w-7xl mx-auto p-4 md:p-6 lg:p-8 space-y-6">
      <div className="space-y-2">
        <Skeleton className="h-10 w-[250px]" />
        <Skeleton className="h-4 w-[350px]" />
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {Array(4)
          .fill(0)
          .map((_, i) => (
            <Skeleton key={i} className="h-[120px] rounded-lg" />
          ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {Array(2)
          .fill(0)
          .map((_, i) => (
            <div key={i} className="space-y-2">
              <Skeleton className="h-8 w-[200px]" />
              <Skeleton className="h-[300px] rounded-lg" />
            </div>
          ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {Array(2)
          .fill(0)
          .map((_, i) => (
            <div key={i} className="space-y-2">
              <Skeleton className="h-8 w-[200px]" />
              <Skeleton className="h-[300px] rounded-lg" />
            </div>
          ))}
      </div>

      <Skeleton className="h-[200px] rounded-lg" />

      <div className="grid gap-6 md:grid-cols-2">
        {Array(2)
          .fill(0)
          .map((_, i) => (
            <Skeleton key={i} className="h-[300px] rounded-lg" />
          ))}
      </div>
    </div>
  )
}

