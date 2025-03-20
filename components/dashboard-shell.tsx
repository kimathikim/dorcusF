"use client"

import { type ReactNode, useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"
import {
  Bell,
  BookOpen,
  Building2,
  ChevronDown,
  ChevronRight,
  CircleDollarSign,
  Compass,
  Flame,
  HelpCircle,
  Home,
  LineChart,
  LogOut,
  Menu,
  MessageSquare,
  PieChart,
  Search,
  Settings,
  User,
  Wallet,
  Briefcase,
  Lightbulb,
  Rocket,
  Zap,
} from "lucide-react"

interface DashboardShellProps {
  children: ReactNode
  userType?: "founder" | "investor"
}

interface NavItem {
  href: string
  label: string
  icon: ReactNode
  badge?: string
  subItems?: { href: string; label: string; badge?: string }[]
}

export default function DashboardShell({ children, userType = "founder" }: DashboardShellProps) {
  const pathname = usePathname()
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [openSubMenu, setOpenSubMenu] = useState<string | null>(null);
  const [notifications, setNotifications] = useState(3);
  const [userData, setUserData] = useState({
    name: userType === "founder" ? "Sarah Johnson" : "Alex Morgan",
    email: userType === "founder" ? "sarah@innovatech.co" : "alex@venturecap.com",
    role: userType === "founder" ? "Founder & CEO" : "Investment Partner",
    company: userType === "founder" ? "InnovaTech Solutions" : "Venture Capital Partners",
    avatar: "/placeholder.svg?height=32&width=32",
  });

  useEffect(() => {
    handleUserData();
  }, []);
  // Define navigation items based on user type
  const founderNavItems: NavItem[] = [
    {
      href: "/dashboard/founder",
      label: "Dashboard",
      icon: <Home className="h-5 w-5" />,
    },
    {
      href: "/dashboard/founder/profile",
      label: "Startup Profile",
      icon: <Building2 className="h-5 w-5" />,
    },
    {
      href: "/dashboard/founder/discovery",
      label: "Investor Discovery",
      icon: <Compass className="h-5 w-5" />,
      badge: "New",
    },
    {
      href: "/dashboard/founder/grants",
      label: "Fundraising",
      icon: <CircleDollarSign className="h-5 w-5" />,
    },
    // {
    //   href: "/metrics",
    //   label: "Traction & Metrics",
    //   icon: <LineChart className="h-5 w-5" />,
    // },
    {
      href: "/dashboard/founder/learning",
      label: "Resources",
      icon: <BookOpen className="h-5 w-5" />,
    },
    {
      href: "/dashboard/founder/messages",
      label: "Messages",
      icon: <MessageSquare className="h-5 w-5" />,
      badge: "5",
    },
  ]

  const investorNavItems: NavItem[] = [
    {
      href: "/dashboard/investor",
      label: "Dashboard",
      icon: <Home className="h-5 w-5" />,
    },
    {
      href: "/dashboard/investor/profile",
      label: "Investor Profile",
      icon: <User className="h-5 w-5" />,
    },
    {
      href: "/dashboard/investor/startups",
      label: "Startup Discovery",
      icon: <Search className="h-5 w-5" />,
      badge: "New",
    },
    {
      href: "/dashboard/investor/deals",
      label: "Deal Flow",
      icon: <Flame className="h-5 w-5" />,
    },
    // {
    //   href: "/portfolio",
    //   label: "Portfolio",
    //   icon: <Briefcase className="h-5 w-5" />,
    //   subItems: [
    //     { href: "/overview", label: "Overview" },
    //     { href: "/performance", label: "Performance" },
    //     { href: "/companies", label: "Companies" },
    //   ],
    // },
    // {
    //   href: "/analytics",
    //   label: "Analytics",
    //   icon: <PieChart className="h-5 w-5" />,
    //   subItems: [
    //     { href: "/investments", label: "Investment Analysis" },
    //     { href: "/trends", label: "Market Trends" },
    //     { href: "/reports", label: "Reports" },
    //   ],
    // },
    {
      href: "/messages",
      label: "Messages",
      icon: <MessageSquare className="h-5 w-5" />,
      badge: "3",
    },
  ]

  const navItems = userType === "founder" ? founderNavItems : investorNavItems

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
    if (href === "/dashboard/investor" && pathname === "/dashboard/investor") {
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
              className={cn(
                "w-full justify-between font-medium transition-all",
                isActive(item.href) && "bg-primary/10 text-primary",
              )}
              onClick={() => toggleSubMenu(item.href)}
            >
              <span className="flex items-center">
                <span className={cn("mr-3", isActive(item.href) ? "text-primary" : "text-muted-foreground")}>
                  {item.icon}
                </span>
                {item.label}
                {item.badge && (
                  <Badge variant="default" className="ml-2 px-1 py-0 h-5">
                    {item.badge}
                  </Badge>
                )}
              </span>
              <ChevronRight
                className={cn(
                  "h-4 w-4 text-muted-foreground transition-transform duration-200",
                  openSubMenu === item.href && "rotate-90",
                )}
              />
            </Button>
            {openSubMenu === item.href && (
              <div className="ml-8 mt-1 space-y-1 animate-in slide-in-from-left-5 duration-200">
                {item.subItems.map((subItem) => (
                  <Link key={subItem.href} href={item.href + subItem.href}>
                    <Button
                      variant="ghost"
                      className={cn(
                        "w-full justify-start font-normal h-9 px-3",
                        pathname === item.href + subItem.href && "bg-primary/10 text-primary font-medium",
                      )}
                    >
                      <span className="relative flex items-center">
                        {subItem.label}
                        {subItem.badge && (
                          <Badge variant="default" className="ml-2 px-1 py-0 h-5">
                            {subItem.badge}
                          </Badge>
                        )}
                      </span>
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
              className={cn(
                "w-full justify-start font-medium transition-all",
                isActive(item.href) && "bg-primary/10 text-primary",
              )}
            >
              <span className={cn("mr-3", isActive(item.href) ? "text-primary" : "text-muted-foreground")}>
                {item.icon}
              </span>
              <span className="relative flex items-center">
                {item.label}
                {item.badge && (
                  <Badge variant="default" className="ml-2 px-1 py-0 h-5">
                    {item.badge}
                  </Badge>
                )}
              </span>
            </Button>
          </Link>
        )}
      </div>
    ))
  }

  const handleLogout = () => {

    console.log("Logging out")
    localStorage.removeItem("userType")

    window.location.href = "/login"
  }
  // User data

  const handleUserData = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8080/api/v1/investor/');
      if (!response.ok) {
        throw new Error('Failed to fetch user data');
      }
      const data = await response.json();
      // Update userData with fetched data
      const userData = {
        name: `${data.FirstName} ${data.LastName}`,
        email: data.Email,
        role: data.Role || "Investor",
        company: data.Company || "Unknown Company",
        avatar: data.Avatar || "/placeholder.svg?height=32&width=32",
      };
      setUserData(userData);
      console.log(userData);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-muted/30">
      {/* Top Navigation Bar */}
      <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Sheet open={isMobileOpen} onOpenChange={setIsMobileOpen}>
              <SheetTrigger asChild className="md:hidden">
                <Button variant="ghost" size="icon" className="mr-2">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[280px] sm:w-[300px] pr-0">
                <div className="px-2 py-6">
                  <div className="mb-6 flex items-center px-2">
                    <div className="mr-2 rounded-md bg-primary/10 p-1">
                      {userType === "founder" ? (
                        <Rocket className="h-6 w-6 text-primary" />
                      ) : (
                        <CircleDollarSign className="h-6 w-6 text-primary" />
                      )}
                    </div>
                    <h2 className="text-lg font-semibold">
                      {userType === "founder" ? "Founder Portal" : "Investor Platform"}
                    </h2>
                  </div>
                  <ScrollArea className="h-[calc(100vh-8rem)]">
                    <div className="px-2">{renderNavItems(navItems)}</div>
                  </ScrollArea>
                </div>
              </SheetContent>
            </Sheet>

            <Link href="/dashboard/investor" className="flex items-center gap-2">
              <div className="hidden md:flex items-center rounded-md bg-primary/10 p-1">
                {userType === "founder" ? (
                  <Rocket className="h-6 w-6 text-primary" />
                ) : (
                  <CircleDollarSign className="h-6 w-6 text-primary" />
                )}
              </div>
              <span className="hidden font-bold sm:inline-block">
                {userType === "founder" ? "Founder Portal" : "Investor Platform"}
              </span>
            </Link>
          </div>

          <div className="flex items-center gap-4">
            {/* Search */}
            <div className="hidden md:flex relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <input
                type="search"
                placeholder={userType === "founder" ? "Search investors..." : "Search startups..."}
                className="rounded-md border border-input bg-background px-3 py-2 pl-8 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 w-[200px] lg:w-[300px]"
              />
            </div>

            {/* Notifications */}
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" className="relative">
                    <Bell className="h-5 w-5" />
                    {notifications > 0 && (
                      <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-medium text-primary-foreground">
                        {notifications}
                      </span>
                    )}
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Notifications</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            {/* Help */}
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <HelpCircle className="h-5 w-5" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Help & Resources</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            {/* User Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 flex items-center gap-2 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={userData.avatar} alt={userData.name} />
                    <AvatarFallback>{userData.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="hidden md:block text-left">
                    <p className="text-sm font-medium leading-none">{userData.name}</p>
                    <p className="text-xs text-muted-foreground">{userData.role}</p>
                  </div>
                  <ChevronDown className="h-4 w-4 text-muted-foreground" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">{userData.name}</p>
                    <p className="text-xs text-muted-foreground">{userData.email}</p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
                {userType === "founder" ? (
                  <DropdownMenuItem>
                    <Building2 className="mr-2 h-4 w-4" />
                    <span>Company Settings</span>
                  </DropdownMenuItem>
                ) : (
                  <DropdownMenuItem>
                    <Wallet className="mr-2 h-4 w-4" />
                    <span>Investment Settings</span>
                  </DropdownMenuItem>
                )}
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-destructive focus:text-destructive" onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      <div className="flex-1 flex flex-col md:flex-row">
        {/* Desktop Sidebar */}
        <aside className="hidden md:block w-64 border-r bg-background">
          <div className="h-full py-6 pl-4 pr-2">
            <ScrollArea className="h-[calc(100vh-10rem)]">
              <div className="pr-2 pl-2">{renderNavItems(navItems)}</div>
            </ScrollArea>

            {/* Bottom sidebar items */}
            {/* <div className="absolute bottom-0 left-0 right-0 border-t p-4"> */}
            {/*   <div className="space-y-2"> */}
            {/*     <Link href="/settings"> */}
            {/*       <Button variant="ghost" className="w-full justify-start"> */}
            {/*         <Settings className="mr-3 h-5 w-5 text-muted-foreground" /> */}
            {/*         Settings */}
            {/*       </Button> */}
            {/*     </Link> */}
            {/*     <Button variant="ghost" className="w-full justify-start text-destructive hover:text-destructive"> */}
            {/*       <LogOut className="mr-3 h-5 w-5" /> */}
            {/*       Log out */}
            {/*     </Button> */}
            {/*   </div> */}
            {/* </div> */}
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1">
          <div className="container max-w-7xl mx-auto p-4 md:p-6 lg:p-8">{children}</div>
        </main>
      </div>

      {/* Custom Footer for Founders/Investors */}
      <footer className="border-t bg-background py-6">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                {userType === "founder" ? (
                  <>
                    <Rocket className="h-5 w-5 mr-2 text-primary" />
                    Founder Resources
                  </>
                ) : (
                  <>
                    <CircleDollarSign className="h-5 w-5 mr-2 text-primary" />
                    Investor Resources
                  </>
                )}
              </h3>
              <ul className="space-y-2 text-sm">
                {userType === "founder" ? (
                  <>
                    <li>
                      <Link href="#" className="text-muted-foreground hover:text-foreground">
                        Pitch Deck Templates
                      </Link>
                    </li>
                    <li>
                      <Link href="#" className="text-muted-foreground hover:text-foreground">
                        Fundraising Guides
                      </Link>
                    </li>
                    <li>
                      <Link href="#" className="text-muted-foreground hover:text-foreground">
                        Financial Modeling Tools
                      </Link>
                    </li>
                    <li>
                      <Link href="#" className="text-muted-foreground hover:text-foreground">
                        Startup Legal Resources
                      </Link>
                    </li>
                  </>
                ) : (
                  <>
                    <li>
                      <Link href="#" className="text-muted-foreground hover:text-foreground">
                        Due Diligence Checklists
                      </Link>
                    </li>
                    <li>
                      <Link href="#" className="text-muted-foreground hover:text-foreground">
                        Investment Thesis Templates
                      </Link>
                    </li>
                    <li>
                      <Link href="#" className="text-muted-foreground hover:text-foreground">
                        Portfolio Management Tools
                      </Link>
                    </li>
                    <li>
                      <Link href="#" className="text-muted-foreground hover:text-foreground">
                        Market Research Reports
                      </Link>
                    </li>
                  </>
                )}
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <Lightbulb className="h-5 w-5 mr-2 text-primary" />
                Learning Center
              </h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground">
                    Webinars & Workshops
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground">
                    Expert Blog
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground">
                    Case Studies
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground">
                    Community Forums
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <Zap className="h-5 w-5 mr-2 text-primary" />
                Get Support
              </h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground">
                    Contact Support
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground">
                    FAQs
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground">
                    Schedule a Demo
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground">
                    Feature Requests
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-4 border-t text-center text-sm text-muted-foreground">
            <p>© 2023 Startup Investment Platform. All rights reserved.</p>
            <div className="mt-2 space-x-4">
              <Link href="#" className="hover:text-foreground">
                Terms
              </Link>
              <Link href="#" className="hover:text-foreground">
                Privacy
              </Link>
              <Link href="#" className="hover:text-foreground">
                Security
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

