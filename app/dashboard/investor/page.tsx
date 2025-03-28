"use client"

import { useEffect, useState } from "react"
import DashboardShell from "@/components/dashboard-shell"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { CustomProgress } from "@/components/ui/custom-progress"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  BarChart3,
  Briefcase,
  Calendar,
  Clock,
  FileText,
  LineChart,
  MessageSquare,
  TrendingUp,
  Users,
  Wallet,
  ArrowUpRight,
  ExternalLink,
  PieChart,
  Lightbulb,
  Target,
  Zap,
  BarChart2,
  TrendingDown,
  AlertCircle,
  CheckCircle,
  ChevronRight,
  Plus,
} from "lucide-react"
import { Chart } from "@/components/ui/chart"
import API_BASE_URL from "@/lib/api-config"

// Define dashboard data interface
interface DashboardData {
  portfolioSummary: {
    totalInvested: number;
    totalStartups: number;
    avgReturn: number;
    topPerformers: any[] | null;
  };
  pipelineSummary: {
    totalDeals: number;
    closedDeals: number;
    pendingDeals: number;
    recentDeals: Array<{
      id: string;
      founder_id: string;
      startup_name: string | null;
      industry: string | null;
      stage: string;
      status: string;
      match_percentage: number | null;
      updated_at: string;
    }>;
  };
  recentActivities: any[];
}

export default function InvestorDashboardPage() {
  const [timeRange, setTimeRange] = useState("6m")
  const [filterView, setFilterView] = useState("all")
  const [loading, setLoading] = useState(true)
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null)

  // Fetch dashboard data from API
  useEffect(() => {
    async function fetchDashboardData() {
      try {
        setLoading(true)
        const token = localStorage.getItem("authToken");
        const response = await fetch(`${API_BASE_URL}/investor/dashboard`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        
        if (response.ok) {
          const data = await response.json();
          console.log("Dashboard data:", data);
          setDashboardData(data);
        } else {
          console.error("Failed to fetch dashboard data");
        }
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setLoading(false);
      }
    }
    
    fetchDashboardData();
  }, []);

  // Format currency helper
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      notation: 'compact',
      maximumFractionDigits: 1
    }).format(value);
  };

  // Sample data for charts with enhanced styling
  const portfolioPerformanceData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Portfolio Value",
        data: [1500000, 1650000, 1800000, 1750000, 1900000, 2100000],
        borderColor: "rgba(59, 130, 246, 1)", // Blue
        backgroundColor: "rgba(59, 130, 246, 0.1)",
        fill: true,
        tension: 0.4,
        pointBackgroundColor: "rgba(59, 130, 246, 1)",
        pointBorderColor: "#fff",
        pointBorderWidth: 2,
        pointRadius: 4,
      },
    ],
  }

  // Update dealFlowData with null checks
  const dealFlowData = {
    labels: ["Screening", "Due Diligence", "Negotiation", "Closed"],
    datasets: [
      {
        label: "Current Deals",
        data: dashboardData && dashboardData.pipelineSummary ? [
          (dashboardData.pipelineSummary.pendingDeals || 0) - (dashboardData.pipelineSummary.closedDeals || 0),
          dashboardData.pipelineSummary.recentDeals ? 
            dashboardData.pipelineSummary.recentDeals.filter(d => d && d.stage === "due_diligence").length : 0,
          dashboardData.pipelineSummary.recentDeals ? 
            dashboardData.pipelineSummary.recentDeals.filter(d => d && d.stage === "negotiation").length : 0,
          dashboardData.pipelineSummary.closedDeals || 0
        ] : [8, 5, 3, 2],
        backgroundColor: [
          "rgba(99, 102, 241, 0.8)", // Indigo
          "rgba(79, 70, 229, 0.85)", // Darker indigo
          "rgba(67, 56, 202, 0.9)", // Even darker indigo
          "rgba(55, 48, 163, 1)", // Darkest indigo
        ],
        borderWidth: 0,
        borderRadius: 4,
      },
    ],
  }

  const industryAllocationData = {
    labels: ["Healthcare", "FinTech", "CleanTech", "EdTech", "AI/ML", "Other"],
    datasets: [
      {
        label: "Allocation",
        data: [30, 25, 15, 10, 15, 5],
        backgroundColor: [
          "rgba(59, 130, 246, 0.8)", // Blue
          "rgba(16, 185, 129, 0.8)", // Green
          "rgba(245, 158, 11, 0.8)", // Amber
          "rgba(139, 92, 246, 0.8)", // Purple
          "rgba(236, 72, 153, 0.8)", // Pink
          "rgba(107, 114, 128, 0.8)", // Gray
        ],
        borderWidth: 2,
        borderColor: "#ffffff",
        hoverOffset: 15,
      },
    ],
  }

  const portfolioGrowthData = {
    labels: ["Q1 2022", "Q2 2022", "Q3 2022", "Q4 2022", "Q1 2023", "Q2 2023"],
    datasets: [
      {
        label: "Invested Capital",
        data: [800000, 950000, 1100000, 1250000, 1350000, 1470000],
        backgroundColor: "rgba(99, 102, 241, 0.4)", // Indigo
        borderColor: "rgba(99, 102, 241, 1)",
        borderWidth: 2,
        stack: "Stack 0",
        barThickness: 20,
        borderRadius: 4,
      },
      {
        label: "Growth",
        data: [0, 150000, 300000, 450000, 550000, 630000],
        backgroundColor: "rgba(16, 185, 129, 0.4)", // Green
        borderColor: "rgba(16, 185, 129, 1)",
        borderWidth: 2,
        stack: "Stack 0",
        barThickness: 20,
        borderRadius: 4,
      },
    ],
  }

  // Chart options with consistent styling
  const lineChartOptions = {
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
        backgroundColor: 'rgba(17, 24, 39, 0.9)',
        titleFont: {
          size: 13,
          weight: 'bold',
        },
        bodyFont: {
          size: 12,
        },
        padding: 12,
        cornerRadius: 8,
        displayColors: true,
      }
    },
    scales: {
      y: {
        beginAtZero: false,
        grid: {
          color: 'rgba(107, 114, 128, 0.1)',
          drawBorder: false,
        },
        ticks: {
          font: {
            size: 11,
          },
          callback: (value: number) => formatCurrency(value),
        }
      },
      x: {
        grid: {
          display: false,
        },
        ticks: {
          font: {
            size: 11,
          }
        }
      }
    }
  }

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
        backgroundColor: 'rgba(17, 24, 39, 0.9)',
        titleFont: {
          size: 13,
          weight: 'bold',
        },
        bodyFont: {
          size: 12,
        },
        padding: 12,
        cornerRadius: 8,
        displayColors: true,
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(107, 114, 128, 0.1)',
          drawBorder: false,
        },
        ticks: {
          font: {
            size: 11,
          },
          precision: 0,
        }
      },
      x: {
        grid: {
          display: false,
        },
        ticks: {
          font: {
            size: 11,
          }
        }
      }
    }
  }

  const stackedBarChartOptions = {
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
        backgroundColor: 'rgba(17, 24, 39, 0.9)',
        titleFont: {
          size: 13,
          weight: 'bold',
        },
        bodyFont: {
          size: 12,
        },
        padding: 12,
        cornerRadius: 8,
        displayColors: true,
        callbacks: {
          label: (context: any) => {
            const label = context.dataset.label || '';
            const value = formatCurrency(context.parsed.y);
            return `${label}: ${value}`;
          }
        }
      }
    },
    scales: {
      y: {
        stacked: true,
        beginAtZero: true,
        grid: {
          color: 'rgba(107, 114, 128, 0.1)',
          drawBorder: false,
        },
        ticks: {
          font: {
            size: 11,
          },
          callback: (value: number) => formatCurrency(value),
        }
      },
      x: {
        stacked: true,
        grid: {
          display: false,
        },
        ticks: {
          font: {
            size: 11,
          }
        }
      }
    }
  }

  const pieChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'right' as const,
        labels: {
          usePointStyle: true,
          boxWidth: 8,
          font: {
            size: 12,
          }
        }
      },
      tooltip: {
        backgroundColor: 'rgba(17, 24, 39, 0.9)',
        titleFont: {
          size: 13,
          weight: 'bold',
        },
        bodyFont: {
          size: 12,
        },
        padding: 12,
        cornerRadius: 8,
        displayColors: true,
        callbacks: {
          label: (context: any) => `${context.label}: ${context.parsed}%`,
        }
      }
    }
  }

  // Recent activity data
  const recentActivity = [
    {
      id: 1,
      type: "startup",
      title: "InnovaTech Solutions",
      description: "New startup match with 92% compatibility",
      time: "Today, 9:30 AM",
      icon: <Briefcase className="h-4 w-4" />,
      iconBg: "bg-blue-100",
      iconColor: "text-blue-600",
    },
    {
      id: 2,
      type: "deal",
      title: "EcoFlow",
      description: "Moved to Due Diligence stage",
      time: "Yesterday, 2:15 PM",
      icon: <LineChart className="h-4 w-4" />,
      iconBg: "bg-indigo-100",
      iconColor: "text-indigo-600",
    },
    {
      id: 3,
      type: "message",
      title: "David Kim (EcoFlow)",
      description: "Sent you financial projections",
      time: "Yesterday, 11:42 AM",
      icon: <MessageSquare className="h-4 w-4" />,
      iconBg: "bg-green-100",
      iconColor: "text-green-600",
    },
    {
      id: 4,
      type: "portfolio",
      title: "CyberShield",
      description: "Valuation increased by 15%",
      time: "2 days ago",
      icon: <TrendingUp className="h-4 w-4" />,
      iconBg: "bg-green-100",
      iconColor: "text-green-600",
    },
  ]

  // Upcoming events
  const upcomingEvents = [
    {
      id: 1,
      title: "Pitch Meeting: FinWise",
      date: "Tomorrow, 10:00 AM",
      type: "meeting",
      icon: <Calendar className="h-4 w-4" />,
    },
    {
      id: 2,
      title: "Due Diligence Deadline: EcoFlow",
      date: "Friday, 5:00 PM",
      type: "deadline",
      icon: <Clock className="h-4 w-4" />,
    },
    {
      id: 3,
      title: "Investment Committee Meeting",
      date: "Next Monday, 2:00 PM",
      type: "meeting",
      icon: <Users className="h-4 w-4" />,
    },
  ]

  // Top performing investments
  const topInvestments = [
    {
      id: 1,
      name: "CyberShield",
      industry: "Cybersecurity",
      roi: 50,
      invested: 400000,
      currentValue: 600000,
      avatar: "/placeholder.svg?height=40&width=40",
      trend: "up",
    },
    {
      id: 2,
      name: "EduTech",
      industry: "Education",
      roi: 40,
      invested: 120000,
      currentValue: 168000,
      avatar: "/placeholder.svg?height=40&width=40",
      trend: "up",
    },
    {
      id: 3,
      name: "InnovaTech",
      industry: "Healthcare",
      roi: 33.3,
      invested: 150000,
      currentValue: 200000,
      avatar: "/placeholder.svg?height=40&width=40",
      trend: "up",
    },
    {
      id: 4,
      name: "LogisticsPro",
      industry: "Logistics",
      roi: -5,
      invested: 200000,
      currentValue: 190000,
      avatar: "/placeholder.svg?height=40&width=40",
      trend: "down",
    },
  ]

  // Format currency
  // This function is already defined earlier in the file, so we can remove this duplicate declaration
  return (
    <DashboardShell userType="investor">
      <div className="container mx-auto max-w-full px-4 overflow-x-hidden">
        {/* Dashboard Header */}
        <div className="flex flex-col md:flex-row justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Investor Dashboard</h1>
            <p className="text-muted-foreground">
              Track your investments, monitor performance, and discover new opportunities.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Tabs defaultValue={timeRange} onValueChange={setTimeRange}>
              <TabsList>
                <TabsTrigger value="1m">1M</TabsTrigger>
                <TabsTrigger value="3m">3M</TabsTrigger>
                <TabsTrigger value="6m">6M</TabsTrigger>
                <TabsTrigger value="1y">1Y</TabsTrigger>
                <TabsTrigger value="all">All</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>

        {/* Portfolio Overview Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Portfolio Value</CardTitle>
              <Wallet className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {loading ? "Loading..." : formatCurrency(dashboardData?.portfolioSummary.totalInvested || 0)}
              </div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-600 font-medium flex items-center">
                  <ArrowUpRight className="mr-1 h-3 w-3" />
                  +12.5%
                </span>{" "}
                from last period
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Portfolio Companies</CardTitle>
              <Briefcase className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {loading ? "Loading..." : dashboardData?.portfolioSummary.totalStartups || 0}
              </div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-600 font-medium flex items-center">
                  <ArrowUpRight className="mr-1 h-3 w-3" />
                  +2
                </span>{" "}
                new this quarter
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Deals</CardTitle>
              <Target className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {loading ? "Loading..." : 
                  (dashboardData && dashboardData.pipelineSummary ? 
                    (dashboardData.pipelineSummary.pendingDeals || 0) : 0)}
              </div>
              <p className="text-xs text-muted-foreground">
                <span className="text-amber-600 font-medium flex items-center">
                  <ArrowUpRight className="mr-1 h-3 w-3" />
                  +5
                </span>{" "}
                in pipeline
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg. Return</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {loading ? "Loading..." : `${dashboardData?.portfolioSummary.avgReturn || 0}%`}
              </div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-600 font-medium flex items-center">
                  <ArrowUpRight className="mr-1 h-3 w-3" />
                  +2.5%
                </span>{" "}
                from last period
              </p>
            </CardContent>
          </Card>
        </div>

      {/* Portfolio Performance */}
      <Card className="overflow-hidden border-blue-100 dark:border-blue-800/50">
        <CardHeader className="bg-gradient-to-r from-blue-50 to-blue-50/50 dark:from-blue-950/20 dark:to-blue-950/10 border-b border-blue-100 dark:border-blue-800/50">
          <CardTitle className="flex items-center text-blue-800 dark:text-blue-300">
            <LineChart className="h-5 w-5 mr-2 text-blue-600 dark:text-blue-400" />
            Portfolio Performance
          </CardTitle>
          <CardDescription>6-month portfolio value trend</CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <div className="h-[350px]">
            <Chart
              type="line"
              data={portfolioPerformanceData}
              options={lineChartOptions}
            />
          </div>
        </CardContent>
      </Card>

      {/* Charts Section */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card className="overflow-hidden border-indigo-100 dark:border-indigo-800/50">
          <CardHeader className="bg-gradient-to-r from-indigo-50 to-indigo-50/50 dark:from-indigo-950/20 dark:to-indigo-950/10 border-b border-indigo-100 dark:border-indigo-800/50">
            <CardTitle className="flex items-center text-indigo-800 dark:text-indigo-300">
              <BarChart2 className="h-5 w-5 mr-2 text-indigo-600 dark:text-indigo-400" />
              Deal Flow
            </CardTitle>
            <CardDescription>Current deals by stage</CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <div className="h-[300px]">
              <Chart
                type="bar"
                data={dealFlowData}
                options={barChartOptions}
              />
            </div>
          </CardContent>
        </Card>

        <Card className="overflow-hidden border-green-100 dark:border-green-800/50">
          <CardHeader className="bg-gradient-to-r from-green-50 to-green-50/50 dark:from-green-950/20 dark:to-green-950/10 border-b border-green-100 dark:border-green-800/50">
            <CardTitle className="flex items-center text-green-800 dark:text-green-300">
              <PieChart className="h-5 w-5 mr-2 text-green-600 dark:text-green-400" />
              Industry Allocation
            </CardTitle>
            <CardDescription>Investment distribution by sector</CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <div className="h-[300px]">
              <Chart
                type="pie"
                data={industryAllocationData}
                options={pieChartOptions}
              />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Portfolio Growth */}
      <Card className="overflow-hidden border-purple-100 dark:border-purple-800/50">
        <CardHeader className="bg-gradient-to-r from-purple-50 to-purple-50/50 dark:from-purple-950/20 dark:to-purple-950/10 border-b border-purple-100 dark:border-purple-800/50">
          <CardTitle className="flex items-center text-purple-800 dark:text-purple-300">
            <TrendingUp className="h-5 w-5 mr-2 text-purple-600 dark:text-purple-400" />
            Portfolio Growth
          </CardTitle>
          <CardDescription>Capital invested vs. growth over time</CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <div className="h-[300px]">
            <Chart
              type="bar"
              data={portfolioGrowthData}
              options={stackedBarChartOptions}
            />
          </div>
        </CardContent>
      </Card>

      {/* Top Performing Investments */}
      <Card className="overflow-hidden border-blue-100 dark:border-blue-800/50">
        <CardHeader className="bg-gradient-to-r from-blue-50 to-blue-50/50 dark:from-blue-950/20 dark:to-blue-950/10 border-b border-blue-100 dark:border-blue-800/50">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center text-blue-800 dark:text-blue-300">
              <Zap className="h-5 w-5 mr-2 text-blue-600 dark:text-blue-400" />
              Investment Performance
            </CardTitle>
            <Tabs defaultValue={filterView} onValueChange={setFilterView} className="w-[240px]">
              <TabsList className="h-8">
                <TabsTrigger value="all" className="text-xs h-6">All</TabsTrigger>
                <TabsTrigger value="top" className="text-xs h-6">Top Performers</TabsTrigger>
                <TabsTrigger value="watch" className="text-xs h-6">Watch List</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
          <CardDescription>Performance metrics for your portfolio companies</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <div className="grid grid-cols-1 divide-y divide-blue-100 dark:divide-blue-800/30">
            {topInvestments.map((investment) => (
              <div key={investment.id} className="flex items-center justify-between p-4 hover:bg-blue-50/50 dark:hover:bg-blue-900/10 transition-colors">
                <div className="flex items-center space-x-4">
                  <Avatar className="h-10 w-10 border border-blue-100 dark:border-blue-800">
                    <AvatarImage src={investment.avatar} alt={investment.name} />
                    <AvatarFallback className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">{investment.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{investment.name}</p>
                    <div className="flex items-center space-x-2">
                      <Badge variant="outline" className="border-blue-200 dark:border-blue-800 text-xs">
                        {investment.industry}
                      </Badge>
                      <span className="text-xs text-muted-foreground">
                        {formatCurrency(investment.invested)} invested
                      </span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center justify-end space-x-2">
                    <span className="font-medium">{formatCurrency(investment.currentValue)}</span>
                    <span className={`flex items-center text-sm font-medium ${investment.trend === 'up' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
                      }`}>
                      {investment.trend === 'up' ? (
                        <ArrowUpRight className="h-4 w-4 mr-1" />
                      ) : (
                        <TrendingDown className="h-4 w-4 mr-1" />
                      )}
                      {investment.roi > 0 ? '+' : ''}{investment.roi}%
                    </span>
                  </div>
                  <div className="mt-1">
                    <span className={`inline-flex items-center text-xs px-2 py-0.5 rounded-full ${investment.roi > 30 ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300' :
                      investment.roi > 0 ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300' :
                        'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300'
                      }`}>
                      {investment.roi > 30 ? (
                        <>
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Outperforming
                        </>
                      ) : investment.roi > 0 ? (
                        <>
                          <Target className="h-3 w-3 mr-1" />
                          On Target
                        </>
                      ) : (
                        <>
                          <AlertCircle className="h-3 w-3 mr-1" />
                          Underperforming
                        </>
                      )}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
        <CardFooter className="bg-blue-50/50 dark:bg-blue-900/5 border-t border-blue-100 dark:border-blue-800/30 p-4">
          <Button variant="outline" className="w-full border-blue-200 dark:border-blue-800 hover:bg-blue-100 dark:hover:bg-blue-900/20">
            <ExternalLink className="mr-2 h-4 w-4" />
            View All Investments
          </Button>
        </CardFooter>
      </Card>

      {/* Activity and Upcoming */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card className="overflow-hidden border-indigo-100 dark:border-indigo-800/50">
          <CardHeader className="bg-gradient-to-r from-indigo-50 to-indigo-50/50 dark:from-indigo-950/20 dark:to-indigo-950/10 border-b border-indigo-100 dark:border-indigo-800/50">
            <CardTitle className="flex items-center text-indigo-800 dark:text-indigo-300">
              <Zap className="h-5 w-5 mr-2 text-indigo-600 dark:text-indigo-400" />
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4">
            <div className="space-y-4">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-start space-x-4 p-2 rounded-lg hover:bg-indigo-50/50 dark:hover:bg-indigo-900/10 transition-colors">
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
          <CardFooter className="bg-indigo-50/50 dark:bg-indigo-900/5 border-t border-indigo-100 dark:border-indigo-800/30 p-4">
            <Button variant="outline" className="w-full border-indigo-200 dark:border-indigo-800 hover:bg-indigo-100 dark:hover:bg-indigo-900/20">
              <FileText className="mr-2 h-4 w-4" />
              View All Activity
            </Button>
          </CardFooter>
        </Card>

        <Card className="overflow-hidden border-amber-100 dark:border-amber-800/50">
          <CardHeader className="bg-gradient-to-r from-amber-50 to-amber-50/50 dark:from-amber-950/20 dark:to-amber-950/10 border-b border-amber-100 dark:border-amber-800/50">
            <CardTitle className="flex items-center text-amber-800 dark:text-amber-300">
              <Calendar className="h-5 w-5 mr-2 text-amber-600 dark:text-amber-400" />
              Upcoming
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4">
            <div className="space-y-4">
              {upcomingEvents.map((event) => (
                <div key={event.id} className="flex items-start space-x-4 p-2 rounded-lg hover:bg-amber-50/50 dark:hover:bg-amber-900/10 transition-colors">
                  <div className="bg-amber-100 dark:bg-amber-900/50 p-2 rounded-full">
                    <div className="text-amber-600 dark:text-amber-400">{event.icon}</div>
                  </div>
                  <div className="space-y-1">
                    <p className="font-medium leading-none">{event.title}</p>
                    <p className="text-sm text-muted-foreground">{event.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter className="bg-amber-50/50 dark:bg-amber-900/5 border-t border-amber-100 dark:border-amber-800/30 p-4">
            <Button variant="outline" className="w-full border-amber-200 dark:border-amber-800 hover:bg-amber-100 dark:hover:bg-amber-900/20">
              <Calendar className="mr-2 h-4 w-4" />
              View Calendar
            </Button>
          </CardFooter>
        </Card>
      </div>

      {/* Investor Insights */}
      <Card className="mt-6 overflow-hidden border-green-100 dark:border-green-800/50">
        <CardHeader className="bg-gradient-to-r from-green-50 to-green-50/50 dark:from-green-950/20 dark:to-green-950/10 border-b border-green-100 dark:border-green-800/50">
          <CardTitle className="flex items-center text-green-800 dark:text-green-300">
            <Lightbulb className="h-5 w-5 mr-2 text-green-600 dark:text-green-400" />
            Investor Insights
          </CardTitle>
          <CardDescription>Personalized recommendations based on your portfolio</CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid gap-4 md:grid-cols-3">
            <div className="rounded-lg border border-green-100 dark:border-green-800/30 bg-gradient-to-br from-green-50/80 to-green-50/30 dark:from-green-900/10 dark:to-green-900/5 p-4 transition-all hover:shadow-md">
              <div className="flex items-start gap-4">
                <div className="bg-green-100 dark:bg-green-900/50 rounded-full p-2 text-green-600 dark:text-green-400">
                  <TrendingUp className="h-4 w-4" />
                </div>
                <div>
                  <h4 className="font-medium text-green-800 dark:text-green-300">Portfolio Diversification</h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    Your portfolio is heavily weighted in Healthcare (30%). Consider exploring opportunities in
                    emerging sectors like CleanTech to balance your investments.
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-lg border border-blue-100 dark:border-blue-800/30 bg-gradient-to-br from-blue-50/80 to-blue-50/30 dark:from-blue-900/10 dark:to-blue-900/5 p-4 transition-all hover:shadow-md">
              <div className="flex items-start gap-4">
                <div className="bg-blue-100 dark:bg-blue-900/50 rounded-full p-2 text-blue-600 dark:text-blue-400">
                  <Briefcase className="h-4 w-4" />
                </div>
                <div>
                  <h4 className="font-medium text-blue-800 dark:text-blue-300">Deal Flow Optimization</h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    You have 8 startups in the screening stage. Focus on moving the most promising ones forward to
                    maintain pipeline efficiency.
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-lg border border-indigo-100 dark:border-indigo-800/30 bg-gradient-to-br from-indigo-50/80 to-indigo-50/30 dark:from-indigo-900/10 dark:to-indigo-900/5 p-4 transition-all hover:shadow-md">
              <div className="flex items-start gap-4">
                <div className="bg-indigo-100 dark:bg-indigo-900/50 rounded-full p-2 text-indigo-600 dark:text-indigo-400">
                  <Wallet className="h-4 w-4" />
                </div>
                <div>
                  <h4 className="font-medium text-indigo-800 dark:text-indigo-300">Reinvestment Strategy</h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    CyberShield is showing strong growth potential. Consider follow-on investment in their upcoming
                    Series C round to maximize returns.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recent Deals */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Zap className="h-5 w-5 mr-2 text-amber-500" />
            Recent Deals
          </CardTitle>
          <CardDescription>Your most recent deal activity</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {loading ? (
              <p>Loading recent deals...</p>
            ) : dashboardData && dashboardData.pipelineSummary && 
               dashboardData.pipelineSummary.recentDeals && 
               dashboardData.pipelineSummary.recentDeals.length > 0 ? (
              dashboardData.pipelineSummary.recentDeals.slice(0, 5).map((deal) => (
                <div key={deal.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src="/placeholder.svg?height=40&width=40" alt="Startup" />
                      <AvatarFallback>{deal.startup_name ? deal.startup_name.substring(0, 2).toUpperCase() : "ST"}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h4 className="font-medium">{deal.startup_name || "Unnamed Startup"}</h4>
                      <p className="text-sm text-muted-foreground">{deal.industry || "Unknown Industry"}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge variant={
                      deal.stage === "closed_won" ? "default" :
                      deal.stage === "closed_lost" ? "destructive" :
                      deal.stage === "negotiation" ? "secondary" :
                      "outline"
                    }>
                      {deal.stage === "closed_won" ? "Closed Won" :
                       deal.stage === "closed_lost" ? "Closed Lost" :
                       deal.stage === "negotiation" ? "Negotiation" :
                       deal.stage === "due_diligence" ? "Due Diligence" :
                       "Screening"}
                    </Badge>
                    <Button variant="ghost" size="icon">
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-6">
                <p className="text-muted-foreground">No recent deals found</p>
                <Button variant="outline" className="mt-4">
                  <Plus className="mr-2 h-4 w-4" />
                  Add New Deal
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
      </div>
    </DashboardShell>
  );
}

