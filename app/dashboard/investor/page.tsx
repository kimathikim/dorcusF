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
  Briefcase,
  Calendar,
  Clock,
  FileText,
  Home,
  LineChart,
  MessageSquare,
  Settings,
  Users
} from "lucide-react";
import { Bar, Line, Pie } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, PointElement, LineElement, ArcElement } from "chart.js";

// Register required chart components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, PointElement, LineElement, ArcElement);

export default function InvestorDashboardPage() {
  const [activeTab, setActiveTab] = useState("home");

  // Sample Data for Charts
  const portfolioPerformanceData = {
    labels: ["EcoInnovate", "TechSolutions", "GreenTech"],
    datasets: [{ label: "Growth (%)", data: [25, 18, 12], backgroundColor: ["#1E88E5", "#43A047", "#FBC02D"] }]
  };

  const startupInterestData = {
    labels: ["Explored", "In Talks", "Invested"],
    datasets: [{ label: "Startups", data: [15, 8, 3], backgroundColor: ["#FF9800", "#4CAF50", "#1E88E5"] }]
  };

  const dealFlowData = {
    labels: ["Deal Sourcing", "Due Diligence", "Term Sheet", "Closed Deals"],
    datasets: [{ label: "Deals", data: [10, 6, 3, 2], borderColor: "#43A047", fill: false }]
  };

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <div className="flex-1 flex flex-col md:flex-row">

        {/* Sidebar */}
        <aside className="w-full md:w-64 bg-muted p-4 md:p-6 md:min-h-[calc(100vh-64px)]">
          <nav className="space-y-2">
            {[
              { href: "/dashboard/investor", label: "Home", icon: <Home className="mr-2 h-4 w-4" /> },
              { href: "/dashboard/investor/profile", label: "Profile", icon: <FileText className="mr-2 h-4 w-4" /> },
              { href: "/dashboard/investor/startups", label: "Startup Discovery", icon: <Briefcase className="mr-2 h-4 w-4" /> },
              { href: "/dashboard/investor/deals", label: "Deal Flow", icon: <LineChart className="mr-2 h-4 w-4" /> },
              { href: "/dashboard/investor/portfolio", label: "Portfolio", icon: <BarChart3 className="mr-2 h-4 w-4" /> },
              { href: "/dashboard/investor/messages", label: "Messages", icon: <MessageSquare className="mr-2 h-4 w-4" /> },
              { href: "/dashboard/investor/settings", label: "Settings", icon: <Settings className="mr-2 h-4 w-4" /> },
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
              <h1 className="text-3xl font-bold tracking-tight">Investor Dashboard</h1>
              <p className="text-muted-foreground">Track your investment performance and startup engagement.</p>
            </div>

            {/* Profile Completion */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Profile Completion</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">85%</div>
                <Progress value={85} className="h-2 mt-2" />
                <div className="pt-2">
                  <Button variant="outline" size="sm">Complete Profile</Button>
                </div>
              </CardContent>
            </Card>

            {/* Charts Section */}
            <div className="grid gap-4 md:grid-cols-2">

              {/* Portfolio Performance */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Portfolio Performance</CardTitle>
                </CardHeader>
                <CardContent className="flex justify-center">
                  <Bar data={portfolioPerformanceData} options={{ maintainAspectRatio: false }} height={180} />
                </CardContent>
              </Card>

              {/* Startup Interest Breakdown */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Startup Interest Breakdown</CardTitle>
                </CardHeader>
                <CardContent className="flex justify-center">
                  <Pie data={startupInterestData} options={{ maintainAspectRatio: false }} height={180} />
                </CardContent>
              </Card>

              {/* Deal Flow Progress */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Deal Flow Progress</CardTitle>
                </CardHeader>
                <CardContent className="flex justify-center">
                  <Line data={dealFlowData} options={{ maintainAspectRatio: false }} height={180} />
                </CardContent>
              </Card>
            </div>

            {/* Investor Insights */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Investor Insights</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <p className="text-sm">💡 You have <strong>8 startups in talks</strong>. Prioritize those with strong traction.</p>
                  <p className="text-sm">📈 Your portfolio saw a <strong>12% growth this quarter</strong>. Consider reinvesting in top-performing startups.</p>
                  <p className="text-sm">🤝 Engage startups earlier in their fundraising cycle for better deal leverage.</p>
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity & Upcoming */}
            <div className="grid gap-4 md:grid-cols-2">
              {[
                {
                  title: "Recent Activity", items: [
                    { text: "New startup match: EcoInnovate", timestamp: "Today, 9:00 AM", icon: <Briefcase className="h-4 w-4 text-primary" /> },
                    { text: "Deal updated: Due Diligence Complete", timestamp: "Yesterday, 2:00 PM", icon: <LineChart className="h-4 w-4 text-primary" /> },
                    { text: "Message from John at GreenTech", timestamp: "Last week", icon: <MessageSquare className="h-4 w-4 text-primary" /> },
                  ]
                },
                {
                  title: "Upcoming", items: [
                    { text: "Investor Meeting: EcoInnovate Pitch", timestamp: "Tomorrow, 10:00 AM", icon: <Calendar className="h-4 w-4 text-primary" /> },
                    { text: "Deadline: Term Sheet Review", timestamp: "Friday, 5:00 PM", icon: <Clock className="h-4 w-4 text-primary" /> },
                  ]
                },
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

