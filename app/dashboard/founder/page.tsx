"use client"

import { useState, useEffect } from "react"
import DashboardShell from "@/components/dashboard-shell"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  BookOpen,
  Calendar,
  Clock,
  FileText,
  MessageSquare,
  TrendingUp,
  Users,
  Wallet,
  ArrowUpRight,
  Target,
  Lightbulb,
  Rocket,
  Zap,
  DollarSign,
  Building2,
} from "lucide-react"
import { Bar, Line, Doughnut } from "react-chartjs-2"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement,
  ArcElement,
} from "chart.js"

// Register required chart components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, PointElement, LineElement, ArcElement)
import { Bell } from "lucide-react"


export default function FounderDashboardPage() {
  const [timeRange, setTimeRange] = useState("month")

  // Enhanced color palette
  const colorPalette = {
    primary: "rgba(124, 58, 237, 1)", // Vibrant purple
    primaryLight: "rgba(124, 58, 237, 0.2)",
    secondary: "rgba(14, 165, 233, 1)", // Bright blue
    secondaryLight: "rgba(14, 165, 233, 0.2)",
    success: "rgba(34, 197, 94, 1)", // Green
    successLight: "rgba(34, 197, 94, 0.2)",
    warning: "rgba(245, 158, 11, 1)", // Amber
    warningLight: "rgba(245, 158, 11, 0.2)",
    danger: "rgba(239, 68, 68, 1)", // Red
    dangerLight: "rgba(239, 68, 68, 0.2)",
    info: "rgba(6, 182, 212, 1)", // Cyan
    infoLight: "rgba(6, 182, 212, 0.2)",
  }

  // Sample Data for Charts with enhanced styling
  const fundraisingData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Target",
        data: [100, 200, 300, 400, 500, 600],
        borderColor: colorPalette.secondary,
        backgroundColor: "transparent",
        borderDashed: true,
        borderWidth: 2,
        pointRadius: 0,
        type: "line",
      },
      {
        label: "Funds Raised ($K)",
        data: [50, 150, 250, 320, 450, 520],
        backgroundColor: colorPalette.primaryLight,
        borderColor: colorPalette.primary,
        borderWidth: 2,
        borderRadius: 6,
        barThickness: 20,
      },
    ],
  }

  const revenueGrowthData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Revenue ($K)",
        data: [30, 45, 60, 75, 90, 110],
        borderColor: colorPalette.success,
        backgroundColor: colorPalette.successLight,
        fill: true,
        tension: 0.4,
        pointBackgroundColor: colorPalette.success,
        pointBorderColor: "#fff",
        pointBorderWidth: 2,
        pointRadius: 4,
      },
    ],
  }

  const investorInterestData = {
    labels: ["Initial Contact", "Engaged", "Due Diligence", "Term Sheet", "Committed"],
    datasets: [
      {
        label: "Investors",
        data: [12, 8, 5, 3, 2],
        backgroundColor: [
          colorPalette.infoLight,
          colorPalette.secondaryLight,
          colorPalette.primaryLight,
          colorPalette.warningLight,
          colorPalette.successLight,
        ],
        borderColor: [
          colorPalette.info,
          colorPalette.secondary,
          colorPalette.primary,
          colorPalette.warning,
          colorPalette.success,
        ],
        borderWidth: 2,
        hoverOffset: 15,
      },
    ],
  }

  const burnRateData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Burn Rate ($K)",
        data: [45, 42, 50, 46, 40, 35],
        backgroundColor: colorPalette.dangerLight,
        borderColor: colorPalette.danger,
        borderWidth: 2,
        fill: true,
        tension: 0.4,
      },
      {
        label: "Runway (months)",
        data: [8, 7.5, 6, 5.5, 6.5, 8],
        backgroundColor: colorPalette.warningLight,
        borderColor: colorPalette.warning,
        borderWidth: 2,
        fill: true,
        tension: 0.4,
        yAxisID: "y1",
      },
    ],
  }

  // Chart options with consistent styling
  const barChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          usePointStyle: true,
          boxWidth: 6,
          font: {
            size: 12,
          }
        }
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleFont: {
          size: 13,
        },
        bodyFont: {
          size: 12,
        },
        padding: 10,
        cornerRadius: 6,
        displayColors: true,
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(0, 0, 0, 0.05)',
        },
        ticks: {
          font: {
            size: 11,
          }
        },
      },
      x: {
        grid: {
          color: 'rgba(0, 0, 0, 0.05)',
        },
        ticks: {
          font: {
            size: 11,
          }
        }
      }
    }
  };

  const lineChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top" as const,
        labels: {
          usePointStyle: true,
          boxWidth: 6,
          font: {
            size: 12,
          },
        },
      },
      tooltip: {
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        titleFont: {
          size: 13,
        },
        bodyFont: {
          size: 12,
        },
        padding: 10,
        cornerRadius: 6,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: "rgba(0, 0, 0, 0.05)",
        },
        ticks: {
          font: {
            size: 11,
          },
        },
      },
      x: {
        grid: {
          display: false,
        },
        ticks: {
          font: {
            size: 11,
          },
        },
      },
    },
  }

  const burnRateOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top" as const,
        labels: {
          usePointStyle: true,
          boxWidth: 6,
          font: {
            size: 12,
          },
        },
      },
      tooltip: {
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        titleFont: {
          size: 13,
        },
        bodyFont: {
          size: 12,
        },
        padding: 10,
        cornerRadius: 6,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: "rgba(0, 0, 0, 0.05)",
        },
        ticks: {
          font: {
            size: 11,
          },
        },
      },
      y1: {
        position: "right" as const,
        beginAtZero: true,
        grid: {
          display: false,
        },
        ticks: {
          font: {
            size: 11,
          },
        },
      },
      x: {
        grid: {
          display: false,
        },
        ticks: {
          font: {
            size: 11,
          },
        },
      },
    },
  }

  const pieChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "right" as const,
        labels: {
          usePointStyle: true,
          boxWidth: 6,
          font: {
            size: 12,
          },
        },
      },
      tooltip: {
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        titleFont: {
          size: 13,
        },
        bodyFont: {
          size: 12,
        },
        padding: 10,
        cornerRadius: 6,
      },
    },
  }

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(amount)
  }

  // Recent activity data
  const recentActivity = [
    {
      id: 1,
      type: "investor",
      title: "New investor match: Acme Ventures",
      description: "92% compatibility with your startup profile",
      time: "Today, 10:30 AM",
      icon: <Users className="h-4 w-4" />,
      iconBg: "bg-blue-100",
      iconColor: "text-blue-600",
    },
    {
      id: 2,
      type: "learning",
      title: "Completed module: 'Perfecting Your Pitch'",
      description: "You've earned the Pitch Master badge",
      time: "Yesterday, 2:00 PM",
      icon: <BookOpen className="h-4 w-4" />,
      iconBg: "bg-purple-100",
      iconColor: "text-purple-600",
    },
    {
      id: 3,
      type: "funding",
      title: "Received funding: $50K from Seed Fund",
      description: "First tranche of seed round completed",
      time: "Last week",
      icon: <Wallet className="h-4 w-4" />,
      iconBg: "bg-green-100",
      iconColor: "text-green-600",
    },
    {
      id: 4,
      type: "milestone",
      title: "Milestone achieved: 1,000 users",
      description: "User growth target reached 2 weeks early",
      time: "Last week",
      icon: <Target className="h-4 w-4" />,
      iconBg: "bg-amber-100",
      iconColor: "text-amber-600",
    },
  ]

  // Upcoming events
  const upcomingEvents = [
    {
      id: 1,
      title: "Investor Meeting: Acme Ventures",
      date: "Tomorrow, 2:00 PM",
      type: "meeting",
      icon: <Calendar className="h-4 w-4" />,
    },
    {
      id: 2,
      title: "Pitch Submission Deadline",
      date: "Friday, 5:00 PM",
      type: "deadline",
      icon: <Clock className="h-4 w-4" />,
    },
    {
      id: 3,
      title: "Product Demo: Enterprise Client",
      date: "Next Monday, 11:00 AM",
      type: "demo",
      icon: <Rocket className="h-4 w-4" />,
    },
  ]

  // Investor insights
  const investorInsights = [
    {
      id: 1,
      title: "Traction Highlight",
      description:
        "Your 25% MoM growth rate is in the top 10% of startups in your sector. Highlight this metric in your pitch deck.",
      icon: <TrendingUp />,
      color: "bg-green-100 text-green-600",
    },
    {
      id: 2,
      title: "Investor Engagement",
      description: "Follow up with Acme Ventures within 48 hours of your meeting for optimal engagement.",
      icon: <Users />,
      color: "bg-blue-100 text-blue-600",
    },
    {
      id: 3,
      title: "Fundraising Strategy",
      description: "Based on your metrics, consider raising $750K instead of $500K to extend runway to 18 months.",
      icon: <Lightbulb />,
      color: "bg-amber-100 text-amber-600",
    },
  ]

  return (
    <DashboardShell userType="founder">
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight mb-1">Founder Dashboard</h1>
            <p className="text-muted-foreground">Track your fundraising progress, metrics, and investor engagement</p>
          </div>
          <div className="flex items-center gap-2">
            <Tabs defaultValue={timeRange} onValueChange={setTimeRange} className="w-[300px]">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="month">Month</TabsTrigger>
                <TabsTrigger value="quarter">Quarter</TabsTrigger>
                <TabsTrigger value="year">Year</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card className="overflow-hidden border-l-4 border-l-primary">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Funds Raised</p>
                  <h3 className="text-2xl font-bold mt-1">$520,000</h3>
                  <p className="text-xs text-muted-foreground mt-1">of $750,000 target</p>
                </div>
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <DollarSign className="h-6 w-6 text-primary" />
                </div>
              </div>
              <Progress value={69} className="h-2 mt-4" />
            </CardContent>
          </Card>

          <Card className="overflow-hidden border-l-4 border-l-green-500">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Monthly Revenue</p>
                  <div className="flex items-center mt-1">
                    <h3 className="text-2xl font-bold">$110,000</h3>
                    <span className="flex items-center text-sm font-medium text-green-600 ml-2">
                      <ArrowUpRight className="h-4 w-4 mr-1" />
                      22%
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">vs last month</p>
                </div>
                <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center">
                  <TrendingUp className="h-6 w-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="overflow-hidden border-l-4 border-l-blue-500">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Active Users</p>
                  <div className="flex items-center mt-1">
                    <h3 className="text-2xl font-bold">12,580</h3>
                    <span className="flex items-center text-sm font-medium text-green-600 ml-2">
                      <ArrowUpRight className="h-4 w-4 mr-1" />
                      18%
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">vs last month</p>
                </div>
                <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
                  <Users className="h-6 w-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="overflow-hidden border-l-4 border-l-amber-500">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Runway</p>
                  <div className="flex items-center mt-1">
                    <h3 className="text-2xl font-bold">8 months</h3>
                    <span className="flex items-center text-sm font-medium text-green-600 ml-2">
                      <ArrowUpRight className="h-4 w-4 mr-1" />
                      1.5
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">vs last month</p>
                </div>
                <div className="h-12 w-12 rounded-full bg-amber-100 flex items-center justify-center">
                  <Clock className="h-6 w-6 text-amber-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts Section */}
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <DollarSign className="h-5 w-5 mr-2 text-primary" />
                Fundraising Progress
              </CardTitle>
              <CardDescription>Monthly fundraising vs target</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <Bar data={fundraisingData} options={barChartOptions} />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <TrendingUp className="h-5 w-5 mr-2 text-green-600" />
                Revenue Growth
              </CardTitle>
              <CardDescription>Monthly revenue trend</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <Line data={revenueGrowthData} options={lineChartOptions} />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Users className="h-5 w-5 mr-2 text-blue-600" />
                Investor Interest
              </CardTitle>
              <CardDescription>Investors by stage in your pipeline</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <Doughnut data={investorInterestData} options={pieChartOptions} />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Clock className="h-5 w-5 mr-2 text-amber-600" />
                Burn Rate & Runway
              </CardTitle>
              <CardDescription>Monthly burn and remaining runway</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <Line data={burnRateData} options={burnRateOptions} />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Investor Insights */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Lightbulb className="h-5 w-5 mr-2 text-amber-500" />
              Investor Insights
            </CardTitle>
            <CardDescription>Personalized recommendations based on your startup metrics</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-3">
              {investorInsights.map((insight) => (
                <div key={insight.id} className="rounded-lg border p-4 transition-all hover:shadow-md">
                  <div className="flex items-start gap-4">
                    <div className={`rounded-full p-2 ${insight.color}`}>{insight.icon}</div>
                    <div>
                      <h4 className="font-medium">{insight.title}</h4>
                      <p className="text-sm text-muted-foreground mt-1">{insight.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Activity and Upcoming */}
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Zap className="h-5 w-5 mr-2 text-primary" />
                Recent Activity
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {recentActivity.map((activity) => (
                  <div key={activity.id} className="flex items-start space-x-4">
                    <div className={`${activity.iconBg} p-2 rounded-full`}>
                      <div className={activity.iconColor}>{activity.icon}</div>
                    </div>
                    <div className="space-y-1">
                      <p className="font-medium leading-none">{activity.title}</p>
                      <p className="text-sm text-muted-foreground">{activity.description}</p>
                      <p className="text-xs text-muted-foreground">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                <FileText className="mr-2 h-4 w-4" />
                View All Activity
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Calendar className="h-5 w-5 mr-2 text-primary" />
                Upcoming
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {upcomingEvents.map((event) => (
                  <div key={event.id} className="flex items-start space-x-4">
                    <div className="bg-primary/10 p-2 rounded-full">
                      <div className="text-primary">{event.icon}</div>
                    </div>
                    <div className="space-y-1">
                      <p className="font-medium leading-none">{event.title}</p>
                      <p className="text-sm text-muted-foreground">{event.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                <Calendar className="mr-2 h-4 w-4" />
                View Calendar
              </Button>
            </CardFooter>
          </Card>
        </div>
        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-4">
              <Button className="h-auto py-4 flex flex-col items-center justify-center gap-2">
                <Building2 className="h-6 w-6" />
                <span>Update Profile</span>
              </Button>
              <Button className="h-auto py-4 flex flex-col items-center justify-center gap-2" variant="outline">
                <FileText className="h-6 w-6" />
                <span>Edit Pitch Deck</span>
              </Button>
              <Button className="h-auto py-4 flex flex-col items-center justify-center gap-2" variant="outline">
                <Users className="h-6 w-6" />
                <span>Find Investors</span>
              </Button>
              <Button className="h-auto py-4 flex flex-col items-center justify-center gap-2" variant="outline">
                <MessageSquare className="h-6 w-6" />
                <span>Contact Support</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardShell>
  )
}

