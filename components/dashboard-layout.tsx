"use client"

import { type ReactNode, useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { cn } from "@/lib/utils"
import {
  BarChart3,
  ChevronRight,
  CircleDollarSign,
  Home,
  LineChart,
  Menu,
  MessageSquare,
  PieChart,
  Search,
  Settings,
  User,
} from "lucide-react"

interface DashboardLayoutProps {
  children: ReactNode
}

interface NavItem {
  href: string
  label: string
  icon: ReactNode
  subItems?: { href: string; label: string }[]
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const pathname = usePathname()
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const [openSubMenu, setOpenSubMenu] = useState<string | null>(null)

  // Define navigation items
  const navItems: NavItem[] = [
    {
      href: "investor",
      label: "Dashboard",
      icon: <Home className="h-5 w-5" />,
    },
    {
      href: "investor/profile",
      label: "Profile",
      icon: <User className="h-5 w-5" />,
    },
    {
      href: "investor/startups",
      label: "Startup Discovery",
      icon: <Search className="h-5 w-5" />,
    },
    {
      href: "investor/deals",
      label: "Deal Flow",
      icon: <LineChart className="h-5 w-5" />,
    },
    {
      href: "investor/portfolio",
      label: "Portfolio",
      icon: <BarChart3 className="h-5 w-5" />,
    },
    {
      href: "investor/messages",
      label: "Messages",
      icon: <MessageSquare className="h-5 w-5" />,
    },
    {
      href: "investor/analytics",
      label: "Analytics",
      icon: <PieChart className="h-5 w-5" />,
      subItems: [
        { href: "investor/analytics/performance", label: "Performance" },
        { href: "investor/analytics/investments", label: "Investments" },
        { href: "investor/analytics/trends", label: "Market Trends" },
      ],
    },
    {
      href: "investor/settings",
      label: "Settings",
      icon: <Settings className="h-5 w-5" />,
    },
  ]

  // Close mobile sidebar when route changes
  useEffect(() => {
    setIsMobileOpen(false)
  }, [pathname])

  // Toggle submenu
  const toggleSubMenu = (href: string) => {
    setOpenSubMenu(openSubMenu === href ? null : href)
  }

  // Check if a nav item is active
  const isActive = (href: string) => {
    if (href === "/dashboard" && pathname === "/dashboard") {
      return true
    }
    return pathname.startsWith(href) && href !== "/dashboard"
  }

  // Render navigation items
  const renderNavItems = (items: NavItem[]) => {
    return items.map((item) => (
      <div key={item.href} className="mb-1">
        {item.subItems ? (
          <div>
            <Button
              variant="ghost"
              className={cn("w-full justify-between font-medium", isActive(item.href) && "bg-muted")}
              onClick={() => toggleSubMenu(item.href)}
            >
              <span className="flex items-center">
                <span className="mr-3 text-muted-foreground">{item.icon}</span>
                {item.label}
              </span>
              <ChevronRight
                className={cn(
                  "h-4 w-4 text-muted-foreground transition-transform",
                  openSubMenu === item.href && "rotate-90",
                )}
              />
            </Button>
            {openSubMenu === item.href && (
              <div className="ml-8 mt-1 space-y-1">
                {item.subItems.map((subItem) => (
                  <Link key={subItem.href} href={item.href + subItem.href}>
                    <Button
                      variant="ghost"
                      className={cn(
                        "w-full justify-start font-normal",
                        pathname === item.href + subItem.href && "bg-muted font-medium",
                      )}
                    >
                      {subItem.label}
                    </Button>
                  </Link>
                ))}
              </div>
            )}
          </div>
        ) : (
          <Link href={item.href}>
            <Button
              variant="ghost"
              className={cn("w-full justify-start font-medium", isActive(item.href) && "bg-muted")}
            >
              <span className="mr-3 text-muted-foreground">{item.icon}</span>
              {item.label}
            </Button>
          </Link>
        )}
      </div>
    ))
  }

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader>
        <Sheet open={isMobileOpen} onOpenChange={setIsMobileOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon" className="mr-2">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[240px] sm:w-[300px] pr-0">
            <div className="px-2 py-6">
              <div className="mb-6 flex items-center px-2">
                <CircleDollarSign className="mr-2 h-6 w-6" />
                <h2 className="text-lg font-semibold">Investor Platform</h2>
              </div>
              <ScrollArea className="h-[calc(100vh-8rem)]">
                <div className="px-2">{renderNavItems(navItems)}</div>
              </ScrollArea>
            </div>
          </SheetContent>
        </Sheet>
      </SiteHeader>

      <div className="flex-1 flex flex-col md:flex-row">
        {/* Desktop Sidebar */}
        <aside className="hidden md:block w-64 border-r bg-background">
          <div className="h-full py-6 pl-6 pr-4">
            <div className="flex items-center mb-6 px-2">
              <CircleDollarSign className="mr-2 h-6 w-6" />
              <h2 className="text-lg font-semibold">Investor Platform</h2>
            </div>
            <ScrollArea className="h-[calc(100vh-10rem)]">
              <div className="pr-2">{renderNavItems(navItems)}</div>
            </ScrollArea>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1">
          <div className="container mx-auto p-6">{children}</div>
        </main>
      </div>

      <SiteFooter />
    </div>
  )
}

