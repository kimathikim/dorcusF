"use client"

import React from "react";
import { Textarea } from "@/components/ui/textarea"

import { useState, useEffect, useMemo } from "react"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Progress } from "@/components/ui/progress"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Search,
  Filter,
  MoreHorizontal,
  Calendar,
  DollarSign,
  Building2,
  MapPin,
  Users,
  ChevronRight,
  FileText,
  PlusCircle,
  BarChart3,
  PieChart,
  TrendingUp,
  TrendingDown,
  Download,
  Share2,
  Briefcase,
  LineChart,
  Percent,
  ArrowUpRight,
  ArrowDownRight,
  Wallet,
  Landmark,
  BarChart4,
  BarChart2,
  Gauge,
  Target,
  Rocket,
} from "lucide-react"

// Mock data for development
const mockInvestments = [
  {
    id: "1",
    startupName: "InnovaTech Solutions",
    industry: "Healthcare",
    fundingStage: "Seed",
    location: "Boston, MA",
    avatar: "/placeholder.svg?height=80&width=80",
    investmentDate: "2023-01-15",
    investmentAmount: 150000,
    equityPercentage: 8,
    currentValuation: 2500000,
    initialValuation: 1875000,
    roi: 33.3,
    status: "Active",
    performance: "Performing",
    tags: ["AI", "Healthcare", "SaaS"],
    founder: "Sarah Johnson",
    founderEmail: "sarah@innovatech.co",
    lastUpdate: "2023-03-15",
    metrics: {
      revenue: { current: 50000, previous: 35000, growth: 42.9 },
      users: { current: 1200, previous: 800, growth: 50 },
      burn: { current: 40000, previous: 45000, growth: -11.1 },
      runway: { current: 12, previous: 10, growth: 20 },
    },
    nextMilestone: "Series A funding round",
    nextMilestoneDate: "2023-09-30",
    documents: [
      { name: "Investment Agreement", url: "/files/innovatech-agreement.pdf", date: "2023-01-15" },
      { name: "Q1 2023 Report", url: "/files/innovatech-q1-2023.pdf", date: "2023-04-10" },
    ],
    notes: "Strong team with healthcare background. Technology showing promising results in early pilots.",
  },
  {
    id: "2",
    startupName: "EcoFlow",
    industry: "CleanTech",
    fundingStage: "Series A",
    location: "San Francisco, CA",
    avatar: "/placeholder.svg?height=80&width=80",
    investmentDate: "2022-06-10",
    investmentAmount: 300000,
    equityPercentage: 5,
    currentValuation: 8000000,
    initialValuation: 6000000,
    roi: 33.3,
    status: "Active",
    performance: "Outperforming",
    tags: ["CleanTech", "Hardware", "Sustainability"],
    founder: "David Kim",
    founderEmail: "david@ecoflow.io",
    lastUpdate: "2023-03-18",
    metrics: {
      revenue: { current: 180000, previous: 120000, growth: 50 },
      users: { current: 5000, previous: 3000, growth: 66.7 },
      burn: { current: 100000, previous: 90000, growth: 11.1 },
      runway: { current: 18, previous: 14, growth: 28.6 },
    },
    nextMilestone: "International expansion",
    nextMilestoneDate: "2023-08-15",
    documents: [
      { name: "Investment Agreement", url: "/files/ecoflow-agreement.pdf", date: "2022-06-10" },
      { name: "Q4 2022 Report", url: "/files/ecoflow-q4-2022.pdf", date: "2023-01-20" },
      { name: "Q1 2023 Report", url: "/files/ecoflow-q1-2023.pdf", date: "2023-04-15" },
    ],
    notes: "Exceeding sales targets. Manufacturing costs higher than projected but margins still healthy.",
  },
  {
    id: "3",
    startupName: "FinWise",
    industry: "FinTech",
    fundingStage: "Pre-seed",
    location: "New York, NY",
    avatar: "/placeholder.svg?height=80&width=80",
    investmentDate: "2023-03-01",
    investmentAmount: 75000,
    equityPercentage: 10,
    currentValuation: 750000,
    initialValuation: 750000,
    roi: 0,
    status: "Active",
    performance: "Early Stage",
    tags: ["FinTech", "AI", "Consumer"],
    founder: "Alex Rivera",
    founderEmail: "alex@finwise.co",
    lastUpdate: "2023-03-19",
    metrics: {
      revenue: { current: 15000, previous: 8000, growth: 87.5 },
      users: { current: 10000, previous: 5000, growth: 100 },
      burn: { current: 30000, previous: 25000, growth: 20 },
      runway: { current: 8, previous: 9, growth: -11.1 },
    },
    nextMilestone: "Seed funding round",
    nextMilestoneDate: "2023-10-15",
    documents: [{ name: "Investment Agreement", url: "/files/finwise-agreement.pdf", date: "2023-03-01" }],
    notes: "Strong user growth but burn rate increasing. Need to monitor runway closely.",
  },
  {
    id: "4",
    startupName: "EduTech",
    industry: "Education",
    fundingStage: "Seed",
    location: "Austin, TX",
    avatar: "/placeholder.svg?height=80&width=80",
    investmentDate: "2022-02-28",
    investmentAmount: 120000,
    equityPercentage: 7,
    currentValuation: 2400000,
    initialValuation: 1714285,
    roi: 40,
    status: "Active",
    performance: "Performing",
    tags: ["EdTech", "AI", "B2B"],
    founder: "Emma Wilson",
    founderEmail: "emma@edutech.io",
    lastUpdate: "2023-03-01",
    metrics: {
      revenue: { current: 30000, previous: 20000, growth: 50 },
      users: { current: 5000, previous: 3500, growth: 42.9 },
      burn: { current: 35000, previous: 30000, growth: 16.7 },
      runway: { current: 14, previous: 16, growth: -12.5 },
    },
    nextMilestone: "Major school district partnership",
    nextMilestoneDate: "2023-07-30",
    documents: [
      { name: "Investment Agreement", url: "/files/edutech-agreement.pdf", date: "2022-02-28" },
      { name: "Q4 2022 Report", url: "/files/edutech-q4-2022.pdf", date: "2023-01-15" },
    ],
    notes: "Steady growth in school adoptions. Product development on track.",
  },
  {
    id: "5",
    startupName: "LogisticsPro",
    industry: "Logistics",
    fundingStage: "Series A",
    location: "Chicago, IL",
    avatar: "/placeholder.svg?height=80&width=80",
    investmentDate: "2021-11-15",
    investmentAmount: 250000,
    equityPercentage: 4,
    currentValuation: 5000000,
    initialValuation: 6250000,
    roi: -20,
    status: "Active",
    performance: "Underperforming",
    tags: ["Logistics", "Enterprise", "SaaS"],
    founder: "Michael Chen",
    founderEmail: "michael@logisticspro.com",
    lastUpdate: "2023-02-20",
    metrics: {
      revenue: { current: 120000, previous: 140000, growth: -14.3 },
      users: { current: 45, previous: 50, growth: -10 },
      burn: { current: 110000, previous: 100000, growth: 10 },
      runway: { current: 9, previous: 12, growth: -25 },
    },
    nextMilestone: "Break-even",
    nextMilestoneDate: "2023-12-31",
    documents: [
      { name: "Investment Agreement", url: "/files/logisticspro-agreement.pdf", date: "2021-11-15" },
      { name: "Q3 2022 Report", url: "/files/logisticspro-q3-2022.pdf", date: "2022-10-15" },
      { name: "Q4 2022 Report", url: "/files/logisticspro-q4-2022.pdf", date: "2023-01-20" },
    ],
    notes: "Facing increased competition. Team implementing cost-cutting measures and pivoting strategy.",
  },
  {
    id: "6",
    startupName: "VR Immerse",
    industry: "Virtual Reality",
    fundingStage: "Seed",
    location: "Los Angeles, CA",
    avatar: "/placeholder.svg?height=80&width=80",
    investmentDate: "2022-09-05",
    investmentAmount: 180000,
    equityPercentage: 9,
    currentValuation: 2200000,
    initialValuation: 2000000,
    roi: 10,
    status: "Active",
    performance: "Performing",
    tags: ["VR", "Entertainment", "B2C"],
    founder: "Jason Park",
    founderEmail: "jason@vrimmerse.com",
    lastUpdate: "2023-03-10",
    metrics: {
      revenue: { current: 40000, previous: 25000, growth: 60 },
      users: { current: 8000, previous: 5000, growth: 60 },
      burn: { current: 60000, previous: 55000, growth: 9.1 },
      runway: { current: 11, previous: 12, growth: -8.3 },
    },
    nextMilestone: "Major content partnership",
    nextMilestoneDate: "2023-06-30",
    documents: [
      { name: "Investment Agreement", url: "/files/vrimmerse-agreement.pdf", date: "2022-09-05" },
      { name: "Q1 2023 Report", url: "/files/vrimmerse-q1-2023.pdf", date: "2023-04-05" },
    ],
    notes: "User engagement metrics strong. Hardware costs decreasing which should improve margins.",
  },
  {
    id: "7",
    startupName: "CyberShield",
    industry: "Cybersecurity",
    fundingStage: "Series B",
    location: "Seattle, WA",
    avatar: "/placeholder.svg?height=80&width=80",
    investmentDate: "2021-05-20",
    investmentAmount: 400000,
    equityPercentage: 2,
    currentValuation: 30000000,
    initialValuation: 20000000,
    roi: 50,
    status: "Active",
    performance: "Outperforming",
    tags: ["Cybersecurity", "Enterprise", "B2B"],
    founder: "Sophia Chen",
    founderEmail: "sophia@cybershield.com",
    lastUpdate: "2023-03-05",
    metrics: {
      revenue: { current: 500000, previous: 350000, growth: 42.9 },
      users: { current: 120, previous: 85, growth: 41.2 },
      burn: { current: 300000, previous: 250000, growth: 20 },
      runway: { current: 24, previous: 20, growth: 20 },
    },
    nextMilestone: "IPO preparation",
    nextMilestoneDate: "2024-06-30",
    documents: [
      { name: "Investment Agreement", url: "/files/cybershield-agreement.pdf", date: "2021-05-20" },
      { name: "Q4 2022 Report", url: "/files/cybershield-q4-2022.pdf", date: "2023-01-25" },
    ],
    notes: "Strong enterprise client growth. Potential acquisition target for major tech companies.",
  },
]
type Investment = (typeof mockInvestments)[0]

// Performance indicators
const performanceIndicators = {
  Outperforming: { color: "text-green-500", bgColor: "bg-green-100", icon: TrendingUp },
  Performing: { color: "text-blue-500", bgColor: "bg-blue-100", icon: LineChart },
  Underperforming: { color: "text-red-500", bgColor: "bg-red-100", icon: TrendingDown },
  "Early Stage": { color: "text-amber-500", bgColor: "bg-amber-100", icon: Rocket },
}

export default function PortfolioPage() {
  const [investments, setInvestments] = useState<Investment[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [industryFilter, setIndustryFilter] = useState("all")
  const [performanceFilter, setPerformanceFilter] = useState("all")
  const [sortBy, setSortBy] = useState("roi")
  const [selectedInvestment, setSelectedInvestment] = useState<Investment | null>(null)
  const [viewMode, setViewMode] = useState<"grid" | "table">("grid")
  const [timeRange, setTimeRange] = useState("all")

  // Fetch investments from API
  useEffect(() => {
    async function fetchInvestments() {
      try {
        setLoading(true)
        // In a real app, uncomment this code to fetch from your API
        // const token = localStorage.getItem("authToken");
        // const response = await fetch("http://localhost:8080/api/v1/investor/portfolio", {
        //   headers: {
        //     Authorization: `Bearer ${token}`,
        //   },
        // });
        // if (response.ok) {
        //   const data = await response.json();
        //   setInvestments(data.investments);
        // } else {
        //   console.error("Failed to fetch investments.");
        // }

        // Using mock data for development
        setTimeout(() => {
          setInvestments(mockInvestments)
          setLoading(false)
        }, 500)
      } catch (error) {
        console.error("Error fetching investments:", error)
        setLoading(false)
      }
    }
    fetchInvestments()
  }, [])

  // Extract unique industries for filter
  const industries = useMemo(() => {
    const uniqueIndustries = Array.from(new Set(investments.map((inv) => inv.industry)))
    return ["all", ...uniqueIndustries]
  }, [investments])

  // Extract unique performance categories for filter
  const performanceCategories = useMemo(() => {
    const uniqueCategories = Array.from(new Set(investments.map((inv) => inv.performance)))
    return ["all", ...uniqueCategories]
  }, [investments])

  // Filter and sort investments
  const filteredInvestments = useMemo(() => {
    return investments
      .filter((investment) => {
        // Search filter
        const searchLower = searchQuery.toLowerCase()
        const matchesSearch =
          searchQuery === "" ||
          investment.startupName.toLowerCase().includes(searchLower) ||
          investment.industry.toLowerCase().includes(searchLower) ||
          investment.founder.toLowerCase().includes(searchLower)

        // Industry filter
        const matchesIndustry = industryFilter === "all" || investment.industry === industryFilter

        // Performance filter
        const matchesPerformance = performanceFilter === "all" || investment.performance === performanceFilter

        return matchesSearch && matchesIndustry && matchesPerformance
      })
      .sort((a, b) => {
        switch (sortBy) {
          case "roi":
            return b.roi - a.roi
          case "amount":
            return b.investmentAmount - a.investmentAmount
          case "date":
            return new Date(b.investmentDate).getTime() - new Date(a.investmentDate).getTime()
          case "name":
            return a.startupName.localeCompare(b.startupName)
          default:
            return 0
        }
      })
  }, [investments, searchQuery, industryFilter, performanceFilter, sortBy])

  // Calculate portfolio metrics
  const portfolioMetrics = useMemo(() => {
    const totalInvested = investments.reduce((sum, inv) => sum + inv.investmentAmount, 0)
    const currentValue = investments.reduce((sum, inv) => sum + inv.investmentAmount * (1 + inv.roi / 100), 0)
    const overallROI = totalInvested > 0 ? ((currentValue - totalInvested) / totalInvested) * 100 : 0

    const outperforming = investments.filter((inv) => inv.performance === "Outperforming").length
    const performing = investments.filter((inv) => inv.performance === "Performing").length
    const underperforming = investments.filter((inv) => inv.performance === "Underperforming").length
    const earlyStage = investments.filter((inv) => inv.performance === "Early Stage").length

    // Industry distribution
    const industryDistribution = investments.reduce(
      (acc, inv) => {
        acc[inv.industry] = (acc[inv.industry] || 0) + inv.investmentAmount
        return acc
      },
      {} as Record<string, number>,
    )

    // Stage distribution
    const stageDistribution = investments.reduce(
      (acc, inv) => {
        acc[inv.fundingStage] = (acc[inv.fundingStage] || 0) + inv.investmentAmount
        return acc
      },
      {} as Record<string, number>,
    )

    return {
      totalInvested,
      currentValue,
      overallROI,
      totalInvestments: investments.length,
      outperforming,
      performing,
      underperforming,
      earlyStage,
      industryDistribution,
      stageDistribution,
    }
  }, [investments])

  // Format currency
  const formatCurrency = (amount: number) => {
    if (amount >= 1000000) {
      return `$${(amount / 1000000).toFixed(1)}M`
    } else if (amount >= 1000) {
      return `$${(amount / 1000).toFixed(0)}K`
    }
    return `$${amount}`
  }

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }).format(date)
  }

  // Format percentage
  const formatPercentage = (value: number) => {
    return `${value > 0 ? "+" : ""}${value.toFixed(1)}%`
  }

  // Get growth indicator
  const getGrowthIndicator = (growth: number) => {
    if (growth > 0) {
      return <ArrowUpRight className="h-4 w-4 text-green-500" />
    } else if (growth < 0) {
      return <ArrowDownRight className="h-4 w-4 text-red-500" />
    }
    return null
  }

  // Loading state
  if (loading) {
    return (
      <div className="flex min-h-screen flex-col">
        <SiteHeader />
        <main className="flex-1 container mx-auto py-10 px-4 flex items-center justify-center">
          <div className="text-center space-y-4">
            <div className="animate-pulse flex flex-col items-center">
              <div className="h-12 w-48 bg-muted rounded-md mb-4"></div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="h-32 w-full bg-muted rounded-lg"></div>
                ))}
              </div>
              <div className="h-64 w-full bg-muted rounded-lg mt-6"></div>
            </div>
            <p className="text-lg font-medium text-muted-foreground">Loading portfolio...</p>
          </div>
        </main>
        <SiteFooter />
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1 container mx-auto py-10 px-4">
        {selectedInvestment ? (
          // 🔹 Detailed Investment View
          <div>
            <Button variant="outline" onClick={() => setSelectedInvestment(null)} className="mb-6">
              <ArrowLeft className="h-4 w-4 mr-2" /> Back to Portfolio
            </Button>

            {/* Investment Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
              <div className="flex items-center gap-4">
                <Avatar className="h-16 w-16 border-2 border-primary/10">
                  <AvatarImage src={selectedInvestment.avatar} alt={selectedInvestment.startupName} />
                  <AvatarFallback>{selectedInvestment.startupName.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <h1 className="text-3xl font-bold">{selectedInvestment.startupName}</h1>
                  <div className="flex items-center gap-2 text-muted-foreground mt-1">
                    <Building2 className="h-4 w-4" />
                    <span>{selectedInvestment.industry}</span>
                    <span className="text-muted-foreground">•</span>
                    <MapPin className="h-4 w-4" />
                    <span>{selectedInvestment.location}</span>
                  </div>
                </div>
              </div>

              <div className="flex gap-2 self-start md:self-center">
                <Button variant="outline" size="sm">
                  <MailIcon className="h-4 w-4 mr-2" /> Contact Founder
                </Button>

                <Button variant="outline" size="sm">
                  <Share2 className="h-4 w-4 mr-2" /> Share
                </Button>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem>
                      <FileText className="h-4 w-4 mr-2" /> View Documents
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Download className="h-4 w-4 mr-2" /> Export Data
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <EditIcon className="h-4 w-4 mr-2" /> Edit Investment
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>

            {/* Investment Status */}
            <div className="bg-primary/5 rounded-lg p-4 mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className={`${performanceIndicators[selectedInvestment.performance as keyof typeof performanceIndicators].bgColor} rounded-full p-3`}>
                  {performanceIndicators[selectedInvestment.performance as keyof typeof performanceIndicators].icon && (
                    React.createElement(performanceIndicators[selectedInvestment.performance as keyof typeof performanceIndicators].icon, {
                      className: `h-6 w-6 ${performanceIndicators[selectedInvestment.performance as keyof typeof performanceIndicators].color}`
                    })
                  )}
                </div>
                <div>
                  <h3 className="font-medium">Performance</h3>
                  <p className={`text-lg font-bold ${performanceIndicators[selectedInvestment.performance as keyof typeof performanceIndicators].color}`}>
                    {selectedInvestment.performance}
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <Badge variant="outline" className="flex items-center gap-1">
                  <Calendar className="h-3 w-3" /> Invested {formatDate(selectedInvestment.investmentDate)}
                </Badge>

                <Badge variant="outline" className="flex items-center gap-1">
                  <DollarSign className="h-3 w-3" /> {formatCurrency(selectedInvestment.investmentAmount)}
                </Badge>

                <Badge variant="outline" className="flex items-center gap-1">
                  <Percent className="h-3 w-3" /> {selectedInvestment.equityPercentage}% Equity
                </Badge>

                <Badge
                  variant={selectedInvestment.roi >= 0 ? "default" : "destructive"}
                  className="flex items-center gap-1"
                >
                  {selectedInvestment.roi >= 0 ? (
                    <TrendingUp className="h-3 w-3" />
                  ) : (
                    <TrendingDown className="h-3 w-3" />
                  )}
                  ROI: {formatPercentage(selectedInvestment.roi)}
                </Badge>

                {selectedInvestment.tags.map(tag => (
                  <Badge key={tag} variant="secondary">{tag}</Badge>
                ))}
              </div>
            </div>

            {/* Investment Details Tabs */}
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="performance">Performance</TabsTrigger>
                <TabsTrigger value="documents">Documents</TabsTrigger>
                <TabsTrigger value="notes">Notes</TabsTrigger>
              </TabsList>

              {/* Overview Tab */}
              <TabsContent value="overview" className="space-y-6 mt-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <Users className="h-5 w-5 mr-2 text-primary" />
                        Founder
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center gap-3 mb-3">
                        <Avatar className="h-10 w-10">
                          <AvatarFallback>{selectedInvestment.founder.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{selectedInvestment.founder}</p>
                          <p className="text-sm text-muted-foreground">{selectedInvestment.founderEmail}</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm" className="w-full">
                        <MailIcon className="h-4 w-4 mr-2" /> Contact Founder
                      </Button>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <DollarSign className="h-5 w-5 mr-2 text-primary" />
                        Investment
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Amount Invested</span>
                          <span className="font-medium">{formatCurrency(selectedInvestment.investmentAmount)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Equity Percentage</span>
                          <span className="font-medium">{selectedInvestment.equityPercentage}%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Initial Valuation</span>
                          <span className="font-medium">{formatCurrency(selectedInvestment.initialValuation)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Current Valuation</span>
                          <span className="font-medium">{formatCurrency(selectedInvestment.currentValuation)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">ROI</span>
                          <span className={`font-medium ${selectedInvestment.roi >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                            {formatPercentage(selectedInvestment.roi)}
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <Target className="h-5 w-5 mr-2 text-primary" />
                        Next Milestone
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="font-medium mb-2">{selectedInvestment.nextMilestone}</p>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Calendar className="h-4 w-4 mr-1" />
                        <span>Target: {formatDate(selectedInvestment.nextMilestoneDate)}</span>
                      </div>
                      <div className="mt-4">
                        <p className="text-sm text-muted-foreground mb-1">Time Remaining</p>
                        <div className="flex items-center">
                          <Progress
                            value={Math.max(0, Math.min(100, (new Date(selectedInvestment.nextMilestoneDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24 * 90) * 100))}
                            className="h-2 flex-1 mr-2"
                          />
                          <span className="text-sm font-medium">
                            {Math.max(0, Math.floor((new Date(selectedInvestment.nextMilestoneDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)))} days
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <BarChart3 className="h-5 w-5 mr-2 text-primary" />
                      Key Metrics
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                      <div className="space-y-2">
                        <h3 className="text-sm font-medium text-muted-foreground">Monthly Revenue</h3>
                        <div className="flex items-center">
                          <span className="text-2xl font-bold mr-2">{formatCurrency(selectedInvestment.metrics.revenue.current)}</span>
                          <div className="flex items-center text-sm">
                            {getGrowthIndicator(selectedInvestment.metrics.revenue.growth)}
                            <span className={selectedInvestment.metrics.revenue.growth >= 0 ? 'text-green-500' : 'text-red-500'}>
                              {formatPercentage(selectedInvestment.metrics.revenue.growth)}
                            </span>
                          </div>
                        </div>
                        <p className="text-xs text-muted-foreground">vs. {formatCurrency(selectedInvestment.metrics.revenue.previous)} last period</p>
                      </div>

                      <div className="space-y-2">
                        <h3 className="text-sm font-medium text-muted-foreground">Active Users</h3>
                        <div className="flex items-center">
                          <span className="text-2xl font-bold mr-2">{selectedInvestment.metrics.users.current.toLocaleString()}</span>
                          <div className="flex items-center text-sm">
                            {getGrowthIndicator(selectedInvestment.metrics.users.growth)}
                            <span className={selectedInvestment.metrics.users.growth >= 0 ? 'text-green-500' : 'text-red-500'}>
                              {formatPercentage(selectedInvestment.metrics.users.growth)}
                            </span>
                          </div>
                        </div>
                        <p className="text-xs text-muted-foreground">vs. {selectedInvestment.metrics.users.previous.toLocaleString()} last period</p>
                      </div>

                      <div className="space-y-2">
                        <h3 className="text-sm font-medium text-muted-foreground">Monthly Burn</h3>
                        <div className="flex items-center">
                          <span className="text-2xl font-bold mr-2">{formatCurrency(selectedInvestment.metrics.burn.current)}</span>
                          <div className="flex items-center text-sm">
                            {getGrowthIndicator(-selectedInvestment.metrics.burn.growth)}
                            <span className={selectedInvestment.metrics.burn.growth <= 0 ? 'text-green-500' : 'text-red-500'}>
                              {formatPercentage(selectedInvestment.metrics.burn.growth)}
                            </span>
                          </div>
                        </div>
                        <p className="text-xs text-muted-foreground">vs. {formatCurrency(selectedInvestment.metrics.burn.previous)} last period</p>
                      </div>

                      <div className="space-y-2">
                        <h3 className="text-sm font-medium text-muted-foreground">Runway (months)</h3>
                        <div className="flex items-center">
                          <span className="text-2xl font-bold mr-2">{selectedInvestment.metrics.runway.current}</span>
                          <div className="flex items-center text-sm">
                            {getGrowthIndicator(selectedInvestment.metrics.runway.growth)}
                            <span className={selectedInvestment.metrics.runway.growth >= 0 ? 'text-green-500' : 'text-red-500'}>
                              {formatPercentage(selectedInvestment.metrics.runway.growth)}
                            </span>
                          </div>
                        </div>
                        <p className="text-xs text-muted-foreground">vs. {selectedInvestment.metrics.runway.previous} months last period</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Performance Tab */}
              <TabsContent value="performance" className="space-y-6 mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <LineChart className="h-5 w-5 mr-2 text-primary" />
                      Performance Over Time
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="h-80 flex items-center justify-center">
                    <div className="text-center text-muted-foreground">
                      <LineChart className="h-16 w-16 mx-auto mb-4 opacity-50" />
                      <p>Performance chart would be displayed here</p>
                      <p className="text-sm">Showing historical valuation, revenue, and user growth</p>
                    </div>
                  </CardContent>
                </Card>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <BarChart2 className="h-5 w-5 mr-2 text-primary" />
                        Comparative Analysis
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div>
                          <div className="flex justify-between mb-1">
                            <span className="text-sm">ROI vs Portfolio Average</span>
                            <span className="text-sm font-medium">
                              {selectedInvestment.roi.toFixed(1)}% vs {portfolioMetrics.overallROI.toFixed(1)}%
                            </span>
                          </div>
                          <div className="relative pt-1">
                            <div className="flex mb-2 items-center justify-between">
                              <div>
                                <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full bg-primary text-primary-foreground">
                                  {selectedInvestment.roi > portfolioMetrics.overallROI ? 'Outperforming' : 'Underperforming'}
                                </span>
                              </div>
                            </div>
                            <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-primary/20">
                              <div style={{ width: `${Math.max(0, Math.min(100, (selectedInvestment.roi / (Math.max(Math.abs(selectedInvestment.roi), Math.abs(portfolioMetrics.overallROI)) * 2 + 10)) * 100 + 50))}%` }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-primary"></div>
                            </div>
                          </div>
                        </div>

                        <div>
                          <div className="flex justify-between mb-1">
                            <span className="text-sm">Revenue Growth vs Industry</span>
                            <span className="text-sm font-medium">
                              {selectedInvestment.metrics.revenue.growth.toFixed(1)}% vs 25.0%
                            </span>
                          </div>
                          <div className="relative pt-1">
                            <div className="flex mb-2 items-center justify-between">
                              <div>
                                <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full bg-primary text-primary-foreground">
                                  {selectedInvestment.metrics.revenue.growth > 25 ? 'Outperforming' : 'Underperforming'}
                                </span>
                              </div>
                            </div>
                            <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-primary/20">
                              <div style={{ width: `${Math.max(0, Math.min(100, (selectedInvestment.metrics.revenue.growth / 50) * 100))}%` }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-primary"></div>
                            </div>
                          </div>
                        </div>

                        <div>
                          <div className="flex justify-between mb-1">
                            <span className="text-sm">User Growth vs Industry</span>
                            <span className="text-sm font-medium">
                              {selectedInvestment.metrics.users.growth.toFixed(1)}% vs 20.0%
                            </span>
                          </div>
                          <div className="relative pt-1">
                            <div className="flex mb-2 items-center justify-between">
                              <div>
                                <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full bg-primary text-primary-foreground">
                                  {selectedInvestment.metrics.users.growth > 20 ? 'Outperforming' : 'Underperforming'}
                                </span>
                              </div>
                            </div>
                            <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-primary/20">
                              <div style={{ width: `${Math.max(0, Math.min(100, (selectedInvestment.metrics.users.growth / 40) * 100))}%` }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-primary"></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <Gauge className="h-5 w-5 mr-2 text-primary" />
                        Risk Assessment
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div>
                          <div className="flex justify-between mb-1">
                            <span className="text-sm">Burn Rate Risk</span>
                            <span className="text-sm font-medium">
                              {selectedInvestment.metrics.runway.current < 12 ? 'High' : selectedInvestment.metrics.runway.current < 18 ? 'Medium' : 'Low'}
                            </span>
                          </div>
                          <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-muted">
                            <div
                              style={{ width: `${Math.max(0, Math.min(100, 100 - (selectedInvestment.metrics.runway.current / 24) * 100))}%` }}
                              className={`shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center ${selectedInvestment.metrics.runway.current < 12 ? 'bg-red-500' :
                                selectedInvestment.metrics.runway.current < 18 ? 'bg-amber-500' :
                                  'bg-green-500'
                                }`}
                            ></div>
                          </div>
                        </div>

                        <div>
                          <div className="flex justify-between mb-1">
                            <span className="text-sm">Market Risk</span>
                            <span className="text-sm font-medium">Medium</span>
                          </div>
                          <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-muted">
                            <div style={{ width: '50%' }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-amber-500"></div>
                          </div>
                        </div>

                        <div>
                          <div className="flex justify-between mb-1">
                            <span className="text-sm">Execution Risk</span>
                            <span className="text-sm font-medium">
                              {selectedInvestment.performance === "Outperforming" ? 'Low' :
                                selectedInvestment.performance === "Performing" ? 'Low' :
                                  selectedInvestment.performance === "Underperforming" ? 'High' : 'Medium'}
                            </span>
                          </div>
                          <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-muted">
                            <div
                              style={{
                                width: selectedInvestment.performance === "Outperforming" ? '25%' :
                                  selectedInvestment.performance === "Performing" ? '35%' :
                                    selectedInvestment.performance === "Underperforming" ? '80%' : '50%'
                              }}
                              className={`shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center ${selectedInvestment.performance === "Outperforming" || selectedInvestment.performance === "Performing" ? 'bg-green-500' :
                                selectedInvestment.performance === "Underperforming" ? 'bg-red-500' :
                                  'bg-amber-500'
                                }`}
                            ></div>
                          </div>
                        </div>

                        <div>
                          <div className="flex justify-between mb-1">
                            <span className="text-sm">Overall Risk</span>
                            <span className="text-sm font-medium">
                              {selectedInvestment.performance === "Underperforming" ? 'High' :
                                selectedInvestment.metrics.runway.current < 12 ? 'High' :
                                  selectedInvestment.performance === "Outperforming" ? 'Low' : 'Medium'}
                            </span>
                          </div>
                          <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-muted">
                            <div
                              style={{
                                width: selectedInvestment.performance === "Underperforming" ? '80%' :
                                  selectedInvestment.metrics.runway.current < 12 ? '75%' :
                                    selectedInvestment.performance === "Outperforming" ? '30%' : '50%'
                              }}
                              className={`shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center ${selectedInvestment.performance === "Underperforming" || selectedInvestment.metrics.runway.current < 12 ? 'bg-red-500' :
                                selectedInvestment.performance === "Outperforming" ? 'bg-green-500' :
                                  'bg-amber-500'
                                }`}
                            ></div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              {/* Documents Tab */}
              <TabsContent value="documents" className="space-y-6 mt-6">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle>Documents</CardTitle>
                    <Button size="sm">
                      <PlusCircle className="h-4 w-4 mr-2" /> Upload Document
                    </Button>
                  </CardHeader>
                  <CardContent>
                    {selectedInvestment.documents.length > 0 ? (
                      <div className="space-y-4">
                        {selectedInvestment.documents.map((doc, index) => (
                          <div key={index} className="flex gap-4 p-3 hover:bg-muted/50 rounded-md">
                            <div className="bg-primary/10 rounded-full h-10 w-10 flex items-center justify-center shrink-0">
                              <FileText className="h-5 w-5 text-primary" />
                            </div>
                            <div className="flex-1">
                              <div className="flex justify-between items-start">
                                <div>
                                  <p className="font-medium">{doc.name}</p>
                                  <p className="text-sm text-muted-foreground">Added {formatDate(doc.date)}</p>
                                </div>
                                <DropdownMenu>
                                  <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="icon" className="h-8 w-8">
                                      <MoreHorizontal className="h-4 w-4" />
                                    </Button>
                                  </DropdownMenuTrigger>
                                  <DropdownMenuContent align="end">
                                    <DropdownMenuItem>
                                      <Download className="h-4 w-4 mr-2" /> Download
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                      <Share2 className="h-4 w-4 mr-2" /> Share
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem className="text-destructive">
                                      <Trash2 className="h-4 w-4 mr-2" /> Delete
                                    </DropdownMenuItem>
                                  </DropdownMenuContent>
                                </DropdownMenu>
                              </div>
                              <Button variant="link" size="sm" className="px-0 h-auto" asChild>
                                <a href={doc.url} target="_blank" rel="noopener noreferrer">
                                  View Document <ExternalLinkIcon className="h-3 w-3 ml-1" />
                                </a>
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-6">
                        <FileText className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                        <h3 className="font-medium mb-1">No documents yet</h3>
                        <p className="text-sm text-muted-foreground mb-4">Upload investment agreements, reports, and other documents</p>
                        <Button>
                          <PlusCircle className="h-4 w-4 mr-2" /> Upload Document
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Notes Tab */}
              <TabsContent value="notes" className="space-y-6 mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Notes</CardTitle>
                    <CardDescription>
                      Investment notes and observations
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <Textarea
                        placeholder="Add a note about this investment..."
                        className="min-h-[100px]"
                      />
                      <Button>
                        <MessageSquare className="h-4 w-4 mr-2" /> Add Note
                      </Button>

                      {selectedInvestment.notes && (
                        <div className="mt-6">
                          <h3 className="text-sm font-medium mb-2">Previous Notes</h3>
                          <div className="p-4 bg-muted/50 rounded-md whitespace-pre-line">
                            {selectedInvestment.notes}
                          </div>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        ) : (
          // 🔹 Portfolio Overview
          <div>
            {/* Header with metrics */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold mb-6">Investment Portfolio</h1>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">Total Invested</p>
                        <p className="text-3xl font-bold">{formatCurrency(portfolioMetrics.totalInvested)}</p>
                      </div>
                      <div className="bg-primary/10 p-3 rounded-full">
                        <Briefcase className="h-6 w-6 text-primary" />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">Current Value</p>
                        <p className="text-3xl font-bold">{formatCurrency(portfolioMetrics.currentValue)}</p>
                      </div>
                      <div className="bg-primary/10 p-3 rounded-full">
                        <Wallet className="h-6 w-6 text-primary" />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">Overall ROI</p>
                        <p className={`text-3xl font-bold ${portfolioMetrics.overallROI >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                          {formatPercentage(portfolioMetrics.overallROI)}
                        </p>
                      </div>
                      <div className={`${portfolioMetrics.overallROI >= 0 ? 'bg-green-100' : 'bg-red-100'} p-3 rounded-full`}>
                        {portfolioMetrics.overallROI >= 0 ? (
                          <TrendingUp className={`h-6 w-6 ${portfolioMetrics.overallROI >= 0 ? 'text-green-500' : 'text-red-500'}`} />
                        ) : (
                          <TrendingDown className={`h-6 w-6 ${portfolioMetrics.overallROI >= 0 ? 'text-green-500' : 'text-red-500'}`} />
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">Total Investments</p>
                        <p className="text-3xl font-bold">{portfolioMetrics.totalInvestments}</p>
                      </div>
                      <div className="bg-primary/10 p-3 rounded-full">
                        <Landmark className="h-6 w-6 text-primary" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Portfolio Analysis */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                <Card className="lg:col-span-2">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <LineChart className="h-5 w-5 mr-2 text-primary" />
                      Portfolio Performance
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="h-80 flex items-center justify-center">
                    <div className="text-center text-muted-foreground">
                      <LineChart className="h-16 w-16 mx-auto mb-4 opacity-50" />
                      <p>Portfolio performance chart would be displayed here</p>
                      <p className="text-sm">Showing historical portfolio value over time</p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <PieChart className="h-5 w-5 mr-2 text-primary" />
                      Portfolio Composition
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-sm font-medium mb-2">By Industry</h3>
                        <div className="space-y-2">
                          {Object.entries(portfolioMetrics.industryDistribution).map(([industry, amount]) => (
                            <div key={industry} className="space-y-1">
                              <div className="flex justify-between text-sm">
                                <span>{industry}</span>
                                <span>{((amount / portfolioMetrics.totalInvested) * 100).toFixed(1)}%</span>
                              </div>
                              <Progress value={(amount / portfolioMetrics.totalInvested) * 100} className="h-2" />
                            </div>
                          ))}
                        </div>
                      </div>

                      <Separator />

                      <div>
                        <h3 className="text-sm font-medium mb-2">By Stage</h3>
                        <div className="space-y-2">
                          {Object.entries(portfolioMetrics.stageDistribution).map(([stage, amount]) => (
                            <div key={stage} className="space-y-1">
                              <div className="flex justify-between text-sm">
                                <span>{stage}</span>
                                <span>{((amount / portfolioMetrics.totalInvested) * 100).toFixed(1)}%</span>
                              </div>
                              <Progress value={(amount / portfolioMetrics.totalInvested) * 100} className="h-2" />
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Performance Distribution */}
              <Card className="mb-8">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <BarChart4 className="h-5 w-5 mr-2 text-primary" />
                    Performance Distribution
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <div className="flex flex-col items-center">
                      <div className="bg-green-100 rounded-full p-4 mb-3">
                        <TrendingUp className="h-8 w-8 text-green-500" />
                      </div>
                      <p className="font-medium">Outperforming</p>
                      <p className="text-3xl font-bold">{portfolioMetrics.outperforming}</p>
                      <p className="text-sm text-muted-foreground">
                        {((portfolioMetrics.outperforming / portfolioMetrics.totalInvestments) * 100).toFixed(1)}% of portfolio
                      </p>
                    </div>

                    <div className="flex flex-col items-center">
                      <div className="bg-blue-100 rounded-full p-4 mb-3">
                        <LineChart className="h-8 w-8 text-blue-500" />
                      </div>
                      <p className="font-medium">Performing</p>
                      <p className="text-3xl font-bold">{portfolioMetrics.performing}</p>
                      <p className="text-sm text-muted-foreground">
                        {((portfolioMetrics.performing / portfolioMetrics.totalInvestments) * 100).toFixed(1)}% of portfolio
                      </p>
                    </div>

                    <div className="flex flex-col items-center">
                      <div className="bg-red-100 rounded-full p-4 mb-3">
                        <TrendingDown className="h-8 w-8 text-red-500" />
                      </div>
                      <p className="font-medium">Underperforming</p>
                      <p className="text-3xl font-bold">{portfolioMetrics.underperforming}</p>
                      <p className="text-sm text-muted-foreground">
                        {((portfolioMetrics.underperforming / portfolioMetrics.totalInvestments) * 100).toFixed(1)}% of portfolio
                      </p>
                    </div>

                    <div className="flex flex-col items-center">
                      <div className="bg-amber-100 rounded-full p-4 mb-3">
                        <Rocket className="h-8 w-8 text-amber-500" />
                      </div>
                      <p className="font-medium">Early Stage</p>
                      <p className="text-3xl font-bold">{portfolioMetrics.earlyStage}</p>
                      <p className="text-sm text-muted-foreground">
                        {((portfolioMetrics.earlyStage / portfolioMetrics.totalInvestments) * 100).toFixed(1)}% of portfolio
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Filters and controls */}
              <div className="flex flex-col md:flex-row gap-4 mb-6">
                <div className="flex gap-2">
                  <Button
                    variant={viewMode === "grid" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setViewMode("grid")}
                  >
                    Grid
                  </Button>
                  <Button
                    variant={viewMode === "table" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setViewMode("table")}
                  >
                    Table
                  </Button>
                </div>

                <div className="relative flex-grow">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    placeholder="Search investments by startup name, industry, or founder..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>

                <div className="flex flex-col sm:flex-row gap-2">
                  <div className="flex items-center gap-2">
                    <Filter className="h-4 w-4 text-muted-foreground" />
                    <Select value={industryFilter} onValueChange={setIndustryFilter}>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Industry" />
                      </SelectTrigger>
                      <SelectContent>
                        {industries.map(industry => (
                          <SelectItem key={industry} value={industry}>
                            {industry === "all" ? "All Industries" : industry}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <Select value={performanceFilter} onValueChange={setPerformanceFilter}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Performance" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Performance</SelectItem>
                      {performanceCategories.map(category => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Sort By" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="roi">ROI</SelectItem>
                      <SelectItem value="amount">Investment Amount</SelectItem>
                      <SelectItem value="date">Investment Date</SelectItem>
                      <SelectItem value="name">Startup Name</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {filteredInvestments.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="bg-muted/30 rounded-full p-6 mb-4">
                    <Search className="h-10 w-10 text-muted-foreground" />
                  </div>
                  <h2 className="text-xl font-semibold mb-2">No investments found</h2>
                  <p className="text-muted-foreground max-w-md">
                    We couldn't find any investments matching your search criteria. Try adjusting your filters or search query.
                  </p>
                </div>
              ) : viewMode === "grid" ? (
                // Grid View
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredInvestments.map(investment => (
                    <Card
                      key={investment.id}
                      className="overflow-hidden hover:shadow-lg transition-all border-2 hover:border-primary/20 cursor-pointer"
                      onClick={() => setSelectedInvestment(investment)}
                    >
                      <div className={`${performanceIndicators[investment.performance as keyof typeof performanceIndicators].bgColor} p-4`}>
                        <div className="flex justify-between items-start">
                          <Badge variant="outline" className="bg-background mb-2">
                            {investment.fundingStage}
                          </Badge>
                          <div className="flex items-center">
                            {performanceIndicators[investment.performance as keyof typeof performanceIndicators].icon && (
                              React.createElement(performanceIndicators[investment.performance as keyof typeof performanceIndicators].icon, {
                                className: `h-5 w-5 mr-1 ${performanceIndicators[investment.performance as keyof typeof performanceIndicators].color}`
                              })
                            )}
                            <span className={`text-sm font-medium ${performanceIndicators[investment.performance as keyof typeof performanceIndicators].color}`}>
                              {investment.performance}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <Avatar className="h-12 w-12 border-2 border-background">
                            <AvatarImage src={investment.avatar} alt={investment.startupName} />
                            <AvatarFallback>{investment.startupName.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <h3 className="font-bold text-lg line-clamp-1">{investment.startupName}</h3>
                            <div className="flex items-center text-sm text-muted-foreground">
                              <MapPin className="h-3 w-3 mr-1" />
                              <span>{investment.location}</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <CardContent className="pt-4">
                        <div className="flex flex-wrap gap-1 mb-3">
                          <Badge variant="outline">{investment.industry}</Badge>
                          {investment.tags.slice(0, 2).map(tag => (
                            <Badge key={tag} variant="secondary">{tag}</Badge>
                          ))}
                          {investment.tags.length > 2 && (
                            <Badge variant="secondary">+{investment.tags.length - 2}</Badge>
                          )}
                        </div>

                        <div className="space-y-2 mb-4">
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Investment</span>
                            <span className="font-medium">{formatCurrency(investment.investmentAmount)}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Equity</span>
                            <span className="font-medium">{investment.equityPercentage}%</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Current Value</span>
                            <span className="font-medium">{formatCurrency(investment.investmentAmount * (1 + investment.roi / 100))}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">ROI</span>
                            <span className={`font-medium ${investment.roi >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                              {formatPercentage(investment.roi)}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center text-sm text-muted-foreground mb-2">
                          <Calendar className="h-4 w-4 mr-1" />
                          <span>Invested {formatDate(investment.investmentDate)}</span>
                        </div>
                      </CardContent>

                      <CardFooter className="border-t bg-muted/10 pt-4">
                        <Button className="w-full">
                          View Details <ChevronRight className="h-4 w-4 ml-1" />
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              ) : (
                // Table View
                <Card>
                  <CardContent className="p-0">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Startup</TableHead>
                          <TableHead>Industry</TableHead>
                          <TableHead>Stage</TableHead>
                          <TableHead className="text-right">Investment</TableHead>
                          <TableHead className="text-right">Equity</TableHead>
                          <TableHead className="text-right">Current Value</TableHead>
                          <TableHead className="text-right">ROI</TableHead>
                          <TableHead>Performance</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredInvestments.map(investment => (
                          <TableRow
                            key={investment.id}
                            className="cursor-pointer hover:bg-muted/50"
                            onClick={() => setSelectedInvestment(investment)}
                          >
                            <TableCell>
                              <div className="flex items-center gap-2">
                                <Avatar className="h-8 w-8">
                                  <AvatarImage src={investment.avatar} alt={investment.startupName} />
                                  <AvatarFallback>{investment.startupName.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <div>
                                  <p className="font-medium">{investment.startupName}</p>
                                  <p className="text-xs text-muted-foreground">{investment.location}</p>
                                </div>
                              </div>
                            </TableCell>
                            <TableCell>{investment.industry}</TableCell>
                            <TableCell>
                              <Badge variant="outline">{investment.fundingStage}</Badge>
                            </TableCell>
                            <TableCell className="text-right font-medium">
                              {formatCurrency(investment.investmentAmount)}
                            </TableCell>
                            <TableCell className="text-right">
                              {investment.equityPercentage}%
                            </TableCell>
                            <TableCell className="text-right font-medium">
                              {formatCurrency(investment.investmentAmount * (1 + investment.roi / 100))}
                            </TableCell>
                            <TableCell className={`text-right font-medium ${investment.roi >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                              {formatPercentage(investment.roi)}
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center">
                                {performanceIndicators[investment.performance as keyof typeof performanceIndicators].icon && (
                                  React.createElement(performanceIndicators[investment.performance as keyof typeof performanceIndicators].icon, {
                                    className: `h-4 w-4 mr-1 ${performanceIndicators[investment.performance as keyof typeof performanceIndicators].color}`
                                  })
                                )}
                                <span className={`text-sm ${performanceIndicators[investment.performance as keyof typeof performanceIndicators].color}`}>
                                  {investment.performance}
                                </span>
                              </div>
                            </TableCell>
                            <TableCell className="text-right">
                              <Button variant="ghost" size="icon" onClick={(e) => {
                                e.stopPropagation();
                                setSelectedInvestment(investment);
                              }}>
                                <ChevronRight className="h-4 w-4" />
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        )}
      </main>
      <SiteFooter />
    </div>
  );
}

// Missing components
function ArrowLeft({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="m12 19-7-7 7-7" />
      <path d="M19 12H5" />
    </svg>
  )
}

function MailIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  )
}

function EditIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
    </svg>
  )
}

function ExternalLinkIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <polyline points="15 3 21 3 21 9" />
      <line x1="10" x2="21" y1="14" y2="3" />
    </svg>
  )
}

function MessageSquare({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  )
}

function Trash2({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M3 6h18" />
      <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
      <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
      <line x1="10" x2="10" y1="11" y2="17" />
      <line x1="14" x2="14" y1="11" y2="17" />
    </svg>
  )
}


