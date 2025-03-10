"use client";

import { useState } from "react";
import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { 
  BarChart3, 
  BookOpen, 
  Calendar, 
  Clock, 
  FileText, 
  Home, 
  LineChart, 
  MessageSquare, 
  Settings, 
  Users, 
  TrendingUp, 
  Target 
} from "lucide-react";
import { Bar, Line, Pie } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, PointElement, LineElement, ArcElement } from "chart.js";

// Register required chart components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, PointElement, LineElement, ArcElement);

export default function FounderDashboardPage() {
  const [activeTab, setActiveTab] = useState("home");

  // Sample Data
  const fundraisingData = {
    labels: ["Q1", "Q2", "Q3", "Q4"],
    datasets: [{ label: "Funds Raised ($)", data: [100, 250, 350, 500], backgroundColor: "#1E88E5" }]
  };

  const revenueGrowthData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May"],
    datasets: [{ label: "Revenue ($K)", data: [30, 45, 60, 75, 100], borderColor: "#43A047", fill: false }]
  };

  const investorInterestData = {
    labels: ["Warm", "Interested", "Committed"],
    datasets: [{ label: "Investors", data: [5, 8, 2], backgroundColor: ["#FF9800", "#FBC02D", "#4CAF50"] }]
  };

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <div className="flex-1 flex flex-col md:flex-row">
        
        {/* Sidebar */}
        <aside className="w-full md:w-64 bg-muted p-4 md:p-6 md:min-h-[calc(100vh-64px)]">
          <nav className="space-y-2">
            {[
              { href: "/dashboard/founder", label: "Home", icon: <Home className="mr-2 h-4 w-4" /> },
              { href: "/dashboard/founder/profile", label: "Profile", icon: <FileText className="mr-2 h-4 w-4" /> },
              { href: "/dashboard/founder/learning", label: "Learning Resources", icon: <BookOpen className="mr-2 h-4 w-4" /> },
              { href: "/dashboard/founder/investors", label: "Investor Engagement", icon: <Users className="mr-2 h-4 w-4" /> },
              { href: "/dashboard/founder/progress", label: "Milestones & Progress", icon: <LineChart className="mr-2 h-4 w-4" /> },
              { href: "/dashboard/founder/funding", label: "Funding Application", icon: <Target className="mr-2 h-4 w-4" /> },
              { href: "/dashboard/founder/messages", label: "Messages", icon: <MessageSquare className="mr-2 h-4 w-4" /> },
              { href: "/dashboard/founder/settings", label: "Settings", icon: <Settings className="mr-2 h-4 w-4" /> },
            ].map((item) => (
              <Link key={item.href} href={item.href}>
                <Button 
                  variant={activeTab === item.href ? "default" : "ghost"} 
                  className="w-full justify-start"
                  onClick={() => setActiveTab(item.href)}
                >
                  {item.icon}
                  {item.label}
                </Button>
              </Link>
            ))}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-4 md:p-6">
          <div className="space-y-6">
            
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Founder Dashboard</h1>
              <p className="text-muted-foreground">Track your fundraising, revenue, and investor engagement.</p>
            </div>

            {/* Fundraising Progress */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Fundraising Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <Bar data={fundraisingData} />
              </CardContent>
            </Card>

            {/* Revenue Growth */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Revenue Growth</CardTitle>
              </CardHeader>
              <CardContent>
                <Line data={revenueGrowthData} />
              </CardContent>
            </Card>

            {/* Investor Interest Breakdown */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Investor Interest Breakdown</CardTitle>
              </CardHeader>
              <CardContent>
                <Pie data={investorInterestData} />
              </CardContent>
            </Card>

            {/* Investor Insights */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Investor Insights</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <p className="text-sm">💡 You have <strong>3 warm investors</strong>. Follow up with them for the next round.</p>
                  <p className="text-sm">📈 Your traction shows a <strong>25% increase in revenue</strong> in the last quarter. Highlight this in your pitch deck.</p>
                  <p className="text-sm">🤝 Scheduling investor meetings <strong>earlier in the month</strong> can improve engagement.</p>
                </div>
              </CardContent>
            </Card>

            {/* Upcoming & Recent Activity */}
            <div className="grid gap-4 md:grid-cols-2">
              {[
                { title: "Recent Activity", items: [
                  { text: "New investor match: Acme Ventures", timestamp: "Today, 10:30 AM", icon: <Users className="h-4 w-4 text-primary" /> },
                  { text: "Completed module: 'Perfecting Your Pitch'", timestamp: "Yesterday, 2:00 PM", icon: <BookOpen className="h-4 w-4 text-primary" /> },
                  { text: "Received funding: $50K from Seed Fund", timestamp: "Last week", icon: <BarChart3 className="h-4 w-4 text-primary" /> },
                ]},
                { title: "Upcoming", items: [
                  { text: "Investor Meeting: Acme Ventures", timestamp: "Tomorrow, 2:00 PM", icon: <Calendar className="h-4 w-4 text-primary" /> },
                  { text: "Pitch Submission Deadline", timestamp: "Friday, 5:00 PM", icon: <Clock className="h-4 w-4 text-primary" /> },
                ]},
              ].map((section, index) => (
                <Card key={index}>
                  <CardHeader><CardTitle>{section.title}</CardTitle></CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {section.items.map((item, idx) => (
                        <div key={idx} className="flex items-start gap-4">
                          <div className="rounded-full bg-primary/10 p-2">{item.icon}</div>
                          <div>
                            <p className="text-sm font-medium">{item.text}</p>
                            <p className="text-xs text-muted-foreground">{item.timestamp}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </main>
      </div>
      <SiteFooter />
    </div>
  );
}

