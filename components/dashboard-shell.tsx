"use client"
import { API_BASE_URL } from "@/lib/api-config";

import { type ReactNode, useState, useEffect } from "react"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
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
import { toast, useToast } from "@/hooks/use-toast"
import {
  Bell,
  BookOpen,
  ChevronDown,
  ChevronLeft,
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
  Building2,
  EditIcon,
  TrashIcon,
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

export default function DashboardShell({ children, userType = "founder" }: DashboardShellProps): ReactNode {
  const pathname = usePathname()
  const router = useRouter()
  const { toast } = useToast()
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const [openSubMenu, setOpenSubMenu] = useState<string | null>(null)
  const [notifications, setNotifications] = useState([])
  const [showNotifications, setShowNotifications] = useState(false)
  const [isNavCollapsed, setIsNavCollapsed] = useState(false)

  const [userData, setUserData] = useState({
    name: "",
    email: "",
    role: "",
    company: "",
    avatar: "/placeholder.svg?height=32&width=32",
  })

  useEffect(() => {
    // Check if user is authenticated
    const authToken = localStorage.getItem("authToken");
    if (!authToken) {
      console.log("No auth token found, redirecting to login");
      toast({
        title: "Session expired",
        description: "Please log in again to continue",
        variant: "destructive",
      });
      router.push("/login");
      return;
    }
    
    // Load user data directly without token verification
    const storedUserData = localStorage.getItem("userData");
    if (storedUserData) {
      try {
        const userData = JSON.parse(storedUserData);
        // Use the user data directly
      } catch (error) {
        console.error("Error parsing user data:", error);
        localStorage.removeItem("userData");
        router.push("/login");
      }
    }
    
    fetchNotifications();
  }, [router, toast]);

  const fetchRoleSpecificData = async (role: string) => {
    if (!role) return
    
    try {
      const response = await fetch(`${API_BASE_URL}/${role}/profile`, {
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("authToken")}`,
        },
      })
      
      if (response.ok) {
        const data = await response.json()
        setUserData(prev => ({
          ...prev,
          company: data.company || data.startupName || data.firmName || data.organizationName || "",
          // Update avatar if available
          avatar: data.avatar || data.profileImage || prev.avatar,
        }))
      }
    } catch (error) {
      console.error('Error fetching role-specific data:', error)
    }
  }

  const fetchNotifications = async () => {
    try {
      const authToken = localStorage.getItem("authToken")
      if (!authToken) return
      
      const response = await fetch(`${API_BASE_URL}/${userType}/notifications`, {
        headers: {
          "Authorization": `Bearer ${authToken}`,
        },
      })
      
      if (response.ok) {
        const data = await response.json()
        // Handle potential null data
        setNotifications(data?.notifications || data || [])
      } else {
        throw new Error("Failed to fetch notifications")
      }
    } catch (error) {
      console.error('Error fetching notifications:', error)
      // Set empty array on error to prevent UI issues
      setNotifications([])
    }
  }

  const handleUpdateNotification = async (id: string, updatedData: { message: string }) => {
    try {
      const response = await fetch(`${API_BASE_URL}/${userType}/notifications/${id}`, {
        method: 'PUT',
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("authToken")}`,
        },
        body: JSON.stringify(updatedData),
      });
      if (!response.ok) {
        throw new Error("Failed to update notification");
      }
      fetchNotifications();
    } catch (error) {
      console.error('Error updating notification:', error);
    }
  };

  const handleDeleteNotification = async (id: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/${userType}/notification/${id}`, {
        method: 'DELETE',
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("authToken")}`,
        },
      });
      if (!response.ok) {
        throw new Error("Failed to delete notification");
      }
      fetchNotifications();
    } catch (error) {
      console.error('Error deleting notification:', error);
    }
  };

  const handleLogout = () => {
    // Clear all auth-related data from localStorage
    localStorage.removeItem("authToken")
    localStorage.removeItem("userData")
    localStorage.removeItem("currentRole")
    
    // Redirect to login page
    router.push("/login")
    
    toast({
      title: "Logged out",
      description: "You have been successfully logged out",
    })
  }

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
    // {
    //   href: "/dashboard/founder/discovery",
    //   label: "Investor Discovery",
    //   icon: <Compass className="h-5 w-5" />,
    //   badge: "New",
    // },
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
    // {
    //   href: "/dashboard/founder/messages",
    //   label: "Messages",
    //   icon: <MessageSquare className="h-5 w-5" />,
    //   badge: "5",
    // },
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
    // {
    //   href: "/messages",
    //   label: "Messages",
    //   icon: <MessageSquare className="h-5 w-5" />,
    //   badge: "3",
    // },
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

  // const handleLogout = () => {

  //   console.log("Logging out")
  //   localStorage.removeItem("userType")

  //   window.location.href = "/login"
  // }
  // // User data

  const handleUserData = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:8080/api/v1/${userType}/`);
      if (!response.ok) {
        throw new Error('Failed to fetch user data');
      }
      const data = await response.json();
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

  function getPageTitle(pathname: string): ReactNode {
    // Dashboard home pages
    if (pathname === "/dashboard/founder") return "Founder Dashboard"
    if (pathname === "/dashboard/investor") return "Investor Dashboard"
    
    // Founder specific pages
    if (pathname.includes("/dashboard/founder/profile")) return "Founder Profile"
    if (pathname.includes("/dashboard/founder/startup")) return "Startup Details"
    if (pathname.includes("/dashboard/founder/pitch")) return "Pitch Deck"
    if (pathname.includes("/dashboard/founder/funding")) return "Funding"
    if (pathname.includes("/dashboard/founder/investors")) return "Investor Discovery"
    
    // Investor specific pages
    if (pathname.includes("/dashboard/investor/profile")) return "Investor Profile"
    if (pathname.includes("/dashboard/investor/startups")) return "Startup Discovery"
    if (pathname.includes("/dashboard/investor/deals")) return "Deal Flow"
    
    // Common pages
    if (pathname.includes("/settings")) return "Settings"
    if (pathname.includes("/messages")) return "Messages"
    
    // Default fallback - extract the last part of the path
    const pathParts = pathname.split("/").filter(Boolean)
    if (pathParts.length > 0) {
      const lastPart = pathParts[pathParts.length - 1]
      return lastPart.charAt(0).toUpperCase() + lastPart.slice(1)
    }
    
    return "Dashboard"
  }

  // const fetchNotifications = async () => {
  //   try {
  //     const response = await fetch(`/${userType}/notifications`, {
  //       headers: {
  //         "Authorization": `Bearer ${localStorage.getItem("authToken")}`,
  //       },
  //     });
  //     if (!response.ok) {
  //       throw new Error("Failed to fetch notifications");
  //     }
  //     const data = await response.json();
  //     console.log(data);
  //     setNotifications(data);
  //   } catch (error) {
  //     console.error('Error fetching notifications:', error);
  //   }
  // };

  // const handleUpdateNotification = async (id: string, updatedData: { message: string }) => {
  //   try {
  //     const response = await fetch(`/${userType}/notifications/${id}`, {
  //       method: 'PUT',
  //       headers: {
  //         "Content-Type": "application/json",
  //         "Authorization": `Bearer ${localStorage.getItem("authToken")}`,
  //       },
  //       body: JSON.stringify(updatedData),
  //     });
  //     if (!response.ok) {
  //       throw new Error("Failed to update notification");
  //     }
  //     fetchNotifications();
  //   } catch (error) {
  //     console.error('Error updating notification:', error);
  //   }
  // };

  // const handleDeleteNotification = async (id: string) => {
  //   try {
  //     const response = await fetch(`/${userType}/notification/${id}`, {
  //       method: 'DELETE',
  //       headers: {
  //         "Authorization": `Bearer ${localStorage.getItem("authToken")}`,
  //       },
  //     });
  //     console.log(response);
  //     if (!response.ok) {
  //       throw new Error("Failed to delete notification");
  //     }
  //     fetchNotifications();
  //   } catch (error) {
  //     console.error('Error deleting notification:', error);
  //   }
  // };
  // 
   return (
    <div className="flex min-h-screen flex-col">
      {/* Top Navigation Bar */}
      <header className="sticky top-0 z-50 w-full border-b bg-background">
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

            <Link href={userType === "founder" ? "/dashboard/founder" : "/dashboard/investor"} className="flex items-center gap-2">
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
                  <Button variant="ghost" size="icon" className="relative" onClick={() => setShowNotifications(!showNotifications)}>
                    <Bell className="h-5 w-5" />
                    {notifications && notifications.length > 0 && (
                      <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[8px] font-medium text-primary-foreground">
                        {notifications.length}
                      </span>
                    )}
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Notifications</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            {showNotifications && (
              <div className="absolute right-5 top-0 mt-2 w-100 bg-white shadow-lg rounded-lg z-50">
                <div className="p-1">
                  {notifications && notifications.length > 0 ? (
                    notifications.map((notification: { ID: string; Message: string }) => (
                      <div key={notification.ID} className="flex justify-between items-center mb-2">
                        <p>{notification.Message}</p>
                        <div className="flex gap-2">
                          <Button size="icon" onClick={() => handleUpdateNotification(notification.ID, { message: "Updated message" })}>
                            <EditIcon className="h-4 w-4" />
                          </Button>
                          <Button size="icon" variant="destructive" onClick={() => handleDeleteNotification(notification.ID)}>
                            <TrashIcon className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p>No notifications available</p>
                  )}
                </div>
              </div>
            )}            {/* Help */}
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
        <aside className={cn(
          "hidden md:flex flex-col border-r bg-background transition-all duration-300 ease-in-out",
          isNavCollapsed ? "w-[70px]" : "w-64"
        )}>
          <div className="h-full py-6 pl-4 pr-2">
            <div className="flex items-center justify-between mb-6 px-2">
              <div className="flex items-center">
                <div className={cn("rounded-md bg-primary/10 p-1", isNavCollapsed ? "mx-auto" : "mr-2")}>
                  {userType === "founder" ? (
                    <Rocket className="h-6 w-6 text-primary" />
                  ) : (
                    <CircleDollarSign className="h-6 w-6 text-primary" />
                  )}
                </div>
                {!isNavCollapsed && (
                  <h2 className="text-lg font-semibold">
                    {userType === "founder" ? "Founder Portal" : "Investor Platform"}
                  </h2>
                )}
              </div>
              {!isNavCollapsed && (
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={() => setIsNavCollapsed(true)}
                  className="ml-auto"
                  title="Collapse sidebar"
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
              )}
            </div>
            
            {isNavCollapsed ? (
              <div className="flex flex-col items-center space-y-4 mt-4">
                {navItems.map((item) => (
                  <TooltipProvider key={item.href}>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Link href={item.href}>
                          <Button
                            variant="ghost"
                            size="icon"
                            className={cn(
                              "w-10 h-10 rounded-md",
                              isActive(item.href) && "bg-primary/10 text-primary"
                            )}
                          >
                            <span className={cn(isActive(item.href) ? "text-primary" : "text-muted-foreground")}>
                              {item.icon}
                            </span>
                            {item.badge && (
                              <Badge variant="default" className="absolute -top-1 -right-1 px-1 py-0 h-4 w-4 text-[10px]">
                                {item.badge}
                              </Badge>
                            )}
                          </Button>
                        </Link>
                      </TooltipTrigger>
                      <TooltipContent side="right">
                        {item.label}
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                ))}
                
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        onClick={() => setIsNavCollapsed(false)}
                        className="mt-4"
                        title="Expand sidebar"
                      >
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent side="right">
                      Expand sidebar
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            ) : (
              <ScrollArea className="h-[calc(100vh-10rem)]">
                <div className="pr-2">{renderNavItems(navItems)}</div>
              </ScrollArea>
            )}
          </div>
        </aside>

        {/* Main Content */}
        <div className="flex-1 w-full">
          {/* Header */}
          <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background px-6">
            <div className="flex flex-1 items-center justify-between">
              <div className="flex items-center gap-2">
                {/* Mobile menu trigger */}
                <Sheet open={isMobileOpen} onOpenChange={setIsMobileOpen}>
                  <SheetTrigger asChild className="md:hidden">
                    <Button variant="ghost" size="icon" className="mr-2">
                      <Menu className="h-5 w-5" />
                      <span className="sr-only">Toggle menu</span>
                    </Button>
                  </SheetTrigger>
                </Sheet>
                
                {/* Page title */}
                <h1 className="text-xl font-semibold">
                  {getPageTitle(pathname)}
                </h1>
              </div>
              
              {/* Rest of the header content */}
            </div>
          </header>
          
          {/* Page content */}
          <main className="flex-1 p-6">
            {children}
          </main>
        </div>
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

// Add a function to fetch user data if not in localStorage
const fetchUserData = async (token: string) => {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/me`, {
      headers: {
        "Authorization": `Bearer ${token}`,
      },
    })
    
    if (response.ok) {
      const data = await response.json()
      
      // Store user data in localStorage
      localStorage.setItem("userData", JSON.stringify(data.user))
      
      // If user has roles, set the current role
      if (data.user.roles && data.user.roles.length > 0) {
        const role = data.user.roles[0]
        localStorage.setItem("currentRole", role)
        
        // Use the fetchRoleSpecificData from the component scope
        // This will be handled by the component's useEffect
        window.dispatchEvent(new CustomEvent('roleUpdated', { detail: role }))
      }
    }
  } catch (error) {
    console.error('Error fetching user data:', error)
    toast({
      title: "Error",
      description: "Failed to load user data",
      variant: "destructive",
    })
  }
}

const getUserRole = () => {
  // First check if a current role is already set
  const currentRole = localStorage.getItem("currentRole");
  if (currentRole) return currentRole;
  
  // If no current role, check userData for roles
  const storedUserData = localStorage.getItem("userData");
  if (!storedUserData) return null;
  
  try {
    const parsedUserData = JSON.parse(storedUserData);
    // Check for both "roles" and "role" fields since the structure varies
    const userRoles = parsedUserData.roles || parsedUserData.role || [];
    
    if (userRoles.length === 0) return null;
    
    // If only one role, set it as current and return
    if (userRoles.length === 1) {
      const role = userRoles[0];
      localStorage.setItem("currentRole", role);
      return role;
    }
    
    // If multiple roles, prompt user to select one
    const selectedRole = window.prompt(
      `You have multiple roles: ${userRoles.join(", ")}. Please enter the role you want to use:`
    );
    
    if (selectedRole && userRoles.includes(selectedRole)) {
      localStorage.setItem("currentRole", selectedRole);
      return selectedRole;
    } else {
      // If invalid selection or canceled, default to first role
      const defaultRole = userRoles[0];
      localStorage.setItem("currentRole", defaultRole);
      return defaultRole;
    }
  } catch (error) {
    console.error("Error parsing user data:", error);
    return null;
  }
};

