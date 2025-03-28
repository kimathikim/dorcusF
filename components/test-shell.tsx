"use client"
import { ReactNode } from "react"

interface TestShellProps {
  children: ReactNode
  userType?: "founder" | "investor"
}

export default function TestShell({ children, userType = "founder" }: TestShellProps): ReactNode {
  return (
    <div className="min-h-screen">
      <header className="p-4 border-b">
        {userType === "founder" ? "Founder Dashboard" : "Investor Dashboard"}
      </header>
      <main className="p-6">
        {children}
      </main>
    </div>
  )
}