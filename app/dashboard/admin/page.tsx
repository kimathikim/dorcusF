"use client";

import { useState } from "react";
import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { 
  BarChart3, 
  BookOpen, 
  Calendar, 
  FileText, 
  Home, 
  LineChart, 
  MessageSquare, 
  Search, 
  Settings, 
  Users, 
  UserPlus,
  AlertTriangle,
  CheckCircle,
  XCircle,
  PieChart
} from "lucide-react";

export default function AdminDashboardPage() {
  const [activeTab, setActiveTab] = useState("home");

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <div className="flex-1 flex flex-col md:flex-row">
        {/* Sidebar */}
        <aside className="w-full md:w-64 bg-muted p-4 md:p-6 md:min-h-[calc(100vh-64px)]">
          <nav className="space-y-2">
            <Link href="/dashboard/admin">
              <Button 
                variant={activeTab === "home" ? "default" : "ghost"} 
                className="w-full justify-start"
                onClick={() => setActiveTab("home")}
              >
                <Home className="mr-2 h-4 w-4" />
                Home
              </Button>
            </Link>
            <Link href="/dashboard/admin/users">
              <Button 
                variant={activeTab === "users" ? "default" : "ghost"} 
                className="w-full justify-start"
                onClick={() => setActiveTab("users")}
              >
                <Users className="mr-2 h-4 w-4" />
                User Management
              </Button>
            </Link>
            <Link href="/dashboard/admin/content">
              <Button 
                variant={activeTab === "content" ? "default" : "ghost"} 
                className="w-full justify-start"
                onClick={() => setActiveTab("content")}
              >
                <FileText className="mr-2 h-4 w-4" />
                Content Management
              </Button>
            </Link>
            <Link href="/dashboard/admin/analytics">
              <Button 
                variant={activeTab === "analytics" ? "default" : "ghost"} 
                className="w-full justify-start"
                onClick={() => setActiveTab("analytics")}
              >
                <BarChart3 className="mr-2 h-4 w-4" />
                Analytics
              </Button>
            </Link>
            <Link href="/dashboard/admin/settings">
              <Button 
                variant={activeTab === "settings" ? "default" : "ghost"} 
                className="w-full justify-start"
                onClick={() => setActiveTab("settings")}
              >
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </Button>
            </Link>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-4 md:p-6">
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
              <p className="text-muted-foreground">Welcome back! Here's an overview of platform activity.</p>
            </div>

            {/* Overview Cards */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">Total Users</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">2,458</div>
                  <p className="text-xs text-muted-foreground">+156 this month</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">New Sign-ups</CardTitle>
                  <UserPlus className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">48</div>
                  <p className="text-xs text-muted-foreground">+12% from last week</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">Active Matches</CardTitle>
                  <LineChart className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">342</div>
                  <p className="text-xs text-muted-foreground">+28 this week</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">Support Tickets</CardTitle>
                  <MessageSquare className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">12</div>
                  <p className="text-xs text-muted-foreground">5 unresolved</p>
                </CardContent>
              </Card>
            </div>

            {/* User Management */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>User Management</CardTitle>
                  <Button size="sm">View All</Button>
                </div>
                <CardDescription>Recent user activity and pending approvals</CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="pending">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="pending">Pending Approval (8)</TabsTrigger>
                    <TabsTrigger value="recent">Recent Activity</TabsTrigger>
                    <TabsTrigger value="flagged">Flagged Accounts (3)</TabsTrigger>
                  </TabsList>
                  <TabsContent value="pending" className="pt-4">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="rounded-full bg-primary/10 p-2">
                            <Users className="h-4 w-4 text-primary" />
                          </div>
                          <div>
                            <p className="font-medium">Sarah Johnson</p>
                            <p className="text-sm text-muted-foreground">Founder, TechSolutions</p>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">
                            <XCircle className="mr-2 h-4 w-4" />
                            Reject
                          </Button>
                          <Button size="sm">
                            <CheckCircle className="mr-2 h-4 w-4" />
                            Approve
                          </Button>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="rounded-full bg-primary/10 p-2">
                            <Users className="h-4 w-4 text-primary" />
                          </div>
                          <div>
                            <p className="font-medium">Michael Chen</p>
                            <p className="text-sm text-muted-foreground">Investor, Blue Horizon Capital</p>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">
                            <XCircle className="mr-2 h-4 w-4" />
                            Reject
                          </Button>
                          <Button size="sm">
                            <CheckCircle className="mr-2 h-4 w-4" />
                            Approve
                          </Button>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="rounded-full bg-primary/10 p-2">
                            <Users className="h-4 w-4 text-primary" />
                          </div>
                          <div>
                            <p className="font-medium">Aisha Patel</p>
                            <p className="text-sm text-muted-foreground">Founder, EcoInnovate</p>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">
                            <XCircle className="mr-2 h-4 w-4" />
                            Reject
                          </Button>
                          <Button size="sm">
                            <CheckCircle className="mr-2 h-4 w-4" />
                            Approve
                          </Button>
                        </div>
                      </div>
                    </div>
                    <div className="mt-4 flex justify-center">
                      <Button variant="outline">View All Pending (8)</Button>
                    </div>
                  </TabsContent>
                  <TabsContent value="recent" className="pt-4">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="rounded-full bg-primary/10 p-2">
                            <Users className="h-4 w-4 text-primary" />
                          </div>
                          <div>
                            <p className="font-medium">John Smith</p>
                            <p className="text-sm text-muted-foreground">Updated profile information</p>
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground">Today, 10:30 AM</p>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="rounded-full bg-primary/10 p-2">
                            <Users className="h-4 w-4 text-primary" />
                          </div>
                          <div>
                            <p className="font-medium">Emily Wong</p>
                            <p className="text-sm text-muted-foreground">Connected with 3 investors</p>
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground">Yesterday, 3:45 PM</p>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="rounded-full bg-primary/10 p-2">
                            <Users className="h-4 w-4 text-primary" />
                          </div>
                          <div>
                            <p className="font-medium">David Lee</p>
                            <p className="text-sm text-muted-foreground">Upgraded to Premium plan</p>
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground">Yesterday, 11:20 AM</p>
                      </div>
                    </div>
                  </TabsContent>
                  <TabsContent value="flagged" className="pt-4">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="rounded-full bg-destructive/10 p-2">
                            <AlertTriangle className="h-4 w-4 text-destructive" />
                          </div>
                          <div>
                            <p className="font-medium">Suspicious Account</p>
                            <p className="text-sm text-muted-foreground">Multiple failed login attempts</p>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">
                            <CheckCircle className="mr-2 h-4 w-4" />
                            Clear
                          </Button>
                          <Button size="sm" variant="destructive">
                            <XCircle className="mr-2 h-4 w-4" />
                            Suspend
                          </Button>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="rounded-full bg-destructive/10 p-2">
                            <AlertTriangle className="h-4 w-4 text-destructive" />
                          </div>
                          <div>
                            <p className="font-medium">Reported User</p>
                            <p className="text-sm text-muted-foreground">Reported for inappropriate content</p>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">
                            <CheckCircle className="mr-2 h-4 w-4" />
                            Clear
                          </Button>
                          <Button size="sm" variant="destructive">
                            <XCircle className="mr-2 h-4 w-4" />
                            Suspend
                          </Button>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>

            {/* Analytics Overview */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Analytics Overview</CardTitle>
                  <Button size="sm">View Detailed Reports</Button>
                </div>
                <CardDescription>Platform performance metrics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">User Growth</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="h-[200px] w-full bg-muted/30 rounded-md flex items-center justify-center">
                        <LineChart className="h-8 w-8 text-muted-foreground" />
                        <span className="ml-2 text-muted-foreground">Growth chart would display here</span>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">User Distribution</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="h-[200px] w-full bg-muted/30 rounded-md flex items-center justify-center">
                        <PieChart className="h-8 w-8 text-muted-foreground" />
                        <span className="ml-2 text-muted-foreground">Distribution chart would display here</span>
                      </div>
                      <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
                        <div className="flex items-center">
                          <div className="mr-2 h-3 w-3 rounded-full bg-primary"></div>
                          <span>Founders (65%)</span>
                        </div>
                        <div className="flex items-center">
                          <div className="mr-2 h-3 w-3 rounded-full bg-[hsl(var(--chart-2))]"></div>
                          <span>Investors (35%)</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>

            {/* Content Management */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Content Management</CardTitle>
                  <Button size="sm">Add New Content</Button>
                </div>
                <CardDescription>Recently added learning resources and events</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="rounded-full bg-primary/10 p-2">
                        <BookOpen className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">How to Create a Compelling Pitch Deck</p>
                        <p className="text-sm text-muted-foreground">Article • 1,245 views</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">Edit</Button>
                      <Button size="sm" variant="outline">Unpublish</Button>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="rounded-full bg-primary/10 p-2">
                        <Calendar className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">Startup Funding Webinar</p>
                        <p className="text-sm text-muted-foreground">Event • June 15, 2025</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">Edit</Button>
                      <Button size="sm" variant="outline">Cancel</Button>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="rounded-full bg-primary/10 p-2">
                        <BookOpen className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">Due Diligence Checklist Template</p>
                        <p className="text-sm text-muted-foreground">Template • 876 downloads</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">Edit</Button>
                      <Button size="sm" variant="outline">Unpublish</Button>
                    </div>
                  </div>
                </div>
                <div className="mt-4 flex justify-center">
                  <Button variant="outline">View All Content</Button>
                </div>
              </CardContent>
            </Card>

            {/* System Status */}
            <Card>
              <CardHeader>
                <CardTitle>System Status</CardTitle>
                <CardDescription>Current platform performance metrics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="rounded-full bg-green-500/10 p-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                      </div>
                      <div>
                        <p className="font-medium">API Services</p>
                        <p className="text-sm text-muted-foreground">All systems operational</p>
                      </div>
                    </div>
                    <p className="text-sm text-green-500">99.9% uptime</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="rounded-full bg-green-500/10 p-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                      </div>
                      <div>
                        <p className="font-medium">Database</p>
                        <p className="text-sm text-muted-foreground">Operating normally</p>
                      </div>
                    </div>
                    <p className="text-sm text-green-500">100% uptime</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="rounded-full bg-yellow-500/10 p-2">
                        <AlertTriangle className="h-4 w-4 text-yellow-500" />
                      </div>
                      <div>
                        <p className="font-medium">Email Notifications</p>
                        <p className="text-sm text-muted-foreground">Minor delays detected</p>
                      </div>
                    </div>
                    <p className="text-sm text-yellow-500">Investigating</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
      <SiteFooter />
    </div>
  );
}