"use client"

import type React from "react"

import { cn } from "@/lib/utils"

interface ChartTooltipProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string | number
  label?: string
  color?: string
  formattedValue?: string
}

export function ChartTooltip({ value, label, color, formattedValue, className, ...props }: ChartTooltipProps) {
  return (
    <div className={cn("flex flex-col gap-1 rounded-lg border bg-background p-2 shadow-sm", className)} {...props}>
      {label && <p className="text-xs text-muted-foreground">{label}</p>}
      <div className="flex items-center gap-1">
        {color && <div className="h-2 w-2 rounded-full" style={{ backgroundColor: color }} />}
        <p className="text-sm font-medium">{formattedValue ? formattedValue : value}</p>
      </div>
    </div>
  )
}


