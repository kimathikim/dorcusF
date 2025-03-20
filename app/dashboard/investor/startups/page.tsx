"use client"

import { useState, useEffect, useMemo } from "react"
import { SiteHeader } from "@/components/site-header"
import DashboardShell from "@/components/dashboard-shell"
import { SiteFooter } from "@/components/site-footer"
import { Card, CardHeader, CardContent, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  ChevronRight,
  Target,
  Globe,
  MapPin,
  Users,
  TrendingUp,
  FileText,
  ArrowLeft,
  Search,
  Building2,
  DollarSign,
  BarChart,
  Briefcase,
  Share2,
  Calendar,
  Mail,
  ExternalLink,
  Filter,
  Bookmark,
  BookmarkCheck,
  User,
} from "lucide-react"
import { useToast } from "@/hooks/use-toast";



// Mock data for development - replace with actual API data
const mockFounders = [
  {
    UserID: "1",
    Name: "Sarah Johnson",
    Email: "sarah@innovatech.co",
    Avatar: "/placeholder.svg?height=80&width=80",
    StartupName: "InnovaTech Solutions",
    Industry: "Healthcare",
    FundingStage: "Seed",
    Location: "Boston, MA",
    FundRequired: 1500000,
    MissionStatement: "Revolutionizing healthcare through AI-powered diagnostics that are accessible to everyone.",
    BusinessModel: "B2B SaaS subscription model with tiered pricing based on hospital size and usage.",
    RevenueStreams: "Monthly subscriptions, implementation services, data analytics add-ons",
    Traction: "3 pilot programs with major hospitals, 15% month-over-month user growth, $50K MRR",
    ScalingPotential:
      "Addressable market of 6,000+ hospitals in the US alone, with global expansion potential to Europe and Asia in Phase 2.",
    Competition:
      "Traditional diagnostic companies and 2 funded startups in adjacent spaces. Our AI accuracy rate is 30% higher.",
    LeadershipTeam:
      "Sarah Johnson (CEO, ex-Google Health), Dr. Michael Chen (CTO, PhD in ML), Lisa Rodriguez (COO, former hospital administrator)",
    TeamSize: "Small Team (2-10)",
    StartupWebsite: "https://innovatech.co",
    PitchDeck: "/files/innovatech-pitch.pdf",
    FundAllocation: "40% R&D, 30% Marketing, 20% Operations, 10% Legal",
    Founded: "2022",
    MatchScore: 92,
    Tags: ["AI", "Healthcare", "SaaS"],
    Bookmarked: false,
  },
  {
    UserID: "2",
    Name: "David Kim",
    Email: "david@ecoflow.io",
    Avatar: "/placeholder.svg?height=80&width=80",
    StartupName: "EcoFlow",
    Industry: "CleanTech",
    FundingStage: "Series A",
    Location: "San Francisco, CA",
    FundRequired: 3000000,
    MissionStatement: "Creating sustainable energy solutions for homes and businesses to reduce carbon footprints.",
    BusinessModel: "Direct-to-consumer hardware sales with recurring subscription for energy optimization software.",
    RevenueStreams: "Hardware sales, software subscriptions, installation services",
    Traction: "5,000 units sold, $1.2M in revenue last quarter, 40% quarter-over-quarter growth",
    ScalingPotential: "Targeting 1% of US households within 5 years, with international expansion planned for year 3.",
    Competition: "Two established players in the market, but our technology is 25% more efficient and 30% cheaper.",
    LeadershipTeam:
      "David Kim (CEO, former Tesla engineer), Maria Garcia (CTO, renewable energy expert), James Wilson (COO, scaling expert)",
    TeamSize: "Large Team (10+)",
    StartupWebsite: "https://ecoflow.io",
    PitchDeck: "/files/ecoflow-pitch.pdf",
    FundAllocation: "35% Manufacturing, 25% R&D, 25% Marketing, 15% Operations",
    Founded: "2020",
    MatchScore: 85,
    Tags: ["CleanTech", "Hardware", "Sustainability"],
    Bookmarked: true,
  },
  {
    UserID: "3",
    Name: "Alex Rivera",
    Email: "alex@finwise.co",
    Avatar: "/placeholder.svg?height=80&width=80",
    StartupName: "FinWise",
    Industry: "FinTech",
    FundingStage: "Pre-seed",
    Location: "New York, NY",
    FundRequired: 750000,
    MissionStatement:
      "Democratizing financial planning for millennials through AI-powered advice and automated investing.",
    BusinessModel: "Freemium model with premium subscription tiers for advanced features.",
    RevenueStreams: "Premium subscriptions, financial product referrals, white-label solutions for small banks",
    Traction: "10,000 active users, 8% conversion to paid plans, $15K MRR",
    ScalingPotential:
      "Target market of 72 million millennials in the US, with plans to expand to Gen Z and international markets.",
    Competition:
      "Several established fintech apps, but our AI advisor outperforms competitors by 20% in portfolio returns.",
    LeadershipTeam:
      "Alex Rivera (CEO, former JP Morgan analyst), Taylor Smith (CTO, AI specialist), Jordan Lee (CMO, growth expert)",
    TeamSize: "Small Team (2-10)",
    StartupWebsite: "https://finwise.co",
    PitchDeck: "/files/finwise-pitch.pdf",
    FundAllocation: "45% Engineering, 30% Marketing, 15% Operations, 10% Legal",
    Founded: "2023",
    MatchScore: 78,
    Tags: ["FinTech", "AI", "Consumer"],
    Bookmarked: false,
  },
  {
    UserID: "4",
    Name: "Emma Wilson",
    Email: "emma@edutech.io",
    Avatar: "/placeholder.svg?height=80&width=80",
    StartupName: "EduTech",
    Industry: "Education",
    FundingStage: "Seed",
    Location: "Austin, TX",
    FundRequired: 1200000,
    MissionStatement: "Transforming K-12 education with personalized learning experiences powered by AI.",
    BusinessModel: "B2B SaaS for schools and districts with per-student pricing model.",
    RevenueStreams: "School subscriptions, curriculum licensing, professional development services",
    Traction: "Implemented in 15 schools, serving 5,000 students, $30K MRR",
    ScalingPotential:
      "130,000 K-12 schools in the US, with each school representing $15-50K in annual revenue potential.",
    Competition:
      "Traditional education publishers and emerging edtech startups, but our personalization engine shows 40% better learning outcomes.",
    LeadershipTeam:
      "Emma Wilson (CEO, former educator), Dr. Robert Chen (CTO, learning science PhD), Marcus Johnson (COO, education administration background)",
    TeamSize: "Small Team (2-10)",
    StartupWebsite: "https://edutech.io",
    PitchDeck: "/files/edutech-pitch.pdf",
    FundAllocation: "40% Product Development, 30% Sales, 20% Content Creation, 10% Operations",
    Founded: "2021",
    Tags: [],
    Bookmarked: false,
  },
]

type Founder = (typeof mockFounders)[0]

export default function StartupDiscoveryPage() {
  const [founders, setFounders] = useState<Founder[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedStartup, setSelectedStartup] = useState<Founder | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [industryFilter, setIndustryFilter] = useState("all")
  const [stageFilter, setStageFilter] = useState("all")
  const [sortBy, setSortBy] = useState("match")
  const [viewMode, setViewMode] = useState("grid")
  const { toast } = useToast();
  const addToDeals = async (startup: Founder) => {
    // post all the deals of the founder to http://localhost:8080/api/v1/investor/deals
    const token = localStorage.getItem("authToken");
    try {
      const response = await fetch("http://localhost:8080/api/v1/dealflow/", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(startup),
      });
      if (response.ok) {
        toast({
          title: "Deal added",
          description: "The startup has been added to your deals",
        });
      } else if (response.status === 400) {
        toast({
          title: "Bad Request",
          description: "The request was invalid. Please check the data and try again.",
        });
      } else if (response.status === 401) {
        toast({
          title: "Unauthorized",
          description: "You are not authorized to perform this action",
        });
      } else if (response.status === 403) {
        toast({
          title: "Forbidden",
          description: "You do not have permission to perform this action",
        });
      } else if (response.status === 500) {
        toast({
          title: "Server Error",
          description: "An internal server error occurred. Please try again later.",
        });
      } else {
        toast({
          title: "Error",
          description: "An error occurred while adding to deals",
        });
      }
    } catch (error) {
      console.error("Error adding to deals:", error);
      toast({
        title: "Error",
        description: "An error occurred while adding to deals. Final!",
      })
    }
    console.log("Adding to deals:", startup);
  };  // Fetch startups from API
  useEffect(() => {
    async function fetchStartups() {
      try {
        setLoading(true)
        // In a real app, uncomment this code to fetch from your API
        const token = localStorage.getItem("authToken");
        const response = await fetch("http://localhost:8080/api/v1/investor/founderProfile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.ok) {
          const data = await response.json();
          const mappedFounders = await Promise.all(data.founder_profiles.map(async (profile: any) => {
            const matchResponse = await fetch(profile.match, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            });
            const matchData = matchResponse.ok ? await matchResponse.json() : 0
            return {
              UserID: profile._id,
              Name: `${profile.user.first_name} ${profile.user.second_name}`,
              Email: profile.user.email,
              Avatar: "/placeholder.svg?height=80&width=80",
              StartupName: profile.startup_name || "Unknown Startup",
              Industry: profile.industry || "Unknown Industry",
              FundingStage: profile.funding_stage || "Unknown Stage",
              Location: profile.location || "Unknown Location",
              FundRequired: profile.fund_required || 0,
              MissionStatement: profile.mission_statement || "No mission statement provided.",
              BusinessModel: profile.bussiness_model || "No business model provided.",
              RevenueStreams: profile.revenue_streams || "No revenue streams provided.",
              Traction: profile.traction || "No traction data provided.",
              ScalingPotential: profile.scaling_potential || "No scaling potential data provided.",
              Competition: profile.competition || "No competition data provided.",
              LeadershipTeam: profile.leadership_team || "No leadership team data provided.",
              TeamSize: profile.team_size || "Unknown Team Size",
              StartupWebsite: profile.startup_website || "No website provided.",
              PitchDeck: profile.pitch_deck || "",
              FundAllocation: profile.funding_allocation || "No fund allocation data provided.",
              Founded: "Unknown",
              MatchScore: matchData.match_probability,
              Tags: profile.tags || [],
              Bookmarked: profile.bookmark || false,
            };
          }));
          console.log("Founders:", mappedFounders);
          setFounders(mappedFounders);
        } else {
          console.error("Failed to fetch startups.");
        }

        // Using mock data for development
        setTimeout(() => {
          //         setFounders(mockFounders)
          setLoading(false)
        }, 500)
      } catch (error) {
        console.error("Error fetching startups:", error)
        setLoading(false)
      }
    }
    fetchStartups()
  }, [])

  // Toggle bookmark status
  const toggleBookmark = (id: string) => {
    setFounders((prevFounders) =>
      prevFounders.map((founder) =>
        founder.UserID === id ? { ...founder, Bookmarked: !founder.Bookmarked } : founder,
      ),
    )
  }

  // Extract unique industries for filter
  const industries = useMemo(() => {
    const uniqueIndustries = Array.from(new Set(founders.map((f) => f.Industry)))
    return ["all", ...uniqueIndustries]
  }, [founders])

  // Extract unique funding stages for filter
  const fundingStages = useMemo(() => {
    const uniqueStages = Array.from(new Set(founders.map((f) => f.FundingStage)))
    return ["all", ...uniqueStages]
  }, [founders])

  // Filter and sort startups
  const filteredStartups = useMemo(() => {
    return founders
      .filter((founder) => {
        // Search filter
        const searchLower = searchQuery.toLowerCase()
        const matchesSearch =
          searchQuery === "" ||
          founder.StartupName.toLowerCase().includes(searchLower) ||
          founder.Industry.toLowerCase().includes(searchLower) ||
          founder.MissionStatement.toLowerCase().includes(searchLower)

        // Industry filter
        const matchesIndustry = industryFilter === "all" || founder.Industry === industryFilter

        // Stage filter
        const matchesStage = stageFilter === "all" || founder.FundingStage === stageFilter

        return matchesSearch && matchesIndustry && matchesStage
      })
      .sort((a, b) => {
        switch (sortBy) {
          case "match":
            return b.MatchScore - a.MatchScore
          case "funding":
            return b.FundRequired - a.FundRequired
          case "name":
            return a.StartupName.localeCompare(b.StartupName)
          case "newest":
            return new Date(b.Founded).getTime() - new Date(a.Founded).getTime()
          default:
            return 0
        }
      })
  }, [founders, searchQuery, industryFilter, stageFilter, sortBy])

  // Format currency
  const formatCurrency = (amount: number) => {
    if (amount >= 1000000) {
      return `$${(amount / 1000000).toFixed(1)}M`
    } else if (amount >= 1000) {
      return `$${(amount / 1000).toFixed(0)}K`
    }
    return `$${amount}`
  }

  if (loading) {
    return (

      <div className="flex min-h-screen flex-col">
        <SiteHeader />
        <main className="flex-1 container mx-auto py-10 px-4 flex items-center justify-center">
          <div className="text-center space-y-4">
            <div className="animate-pulse flex flex-col items-center">
              <div className="h-12 w-48 bg-muted rounded-md mb-4"></div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="h-64 w-full bg-muted rounded-lg"></div>
                ))}
              </div>
            </div>
            <p className="text-lg font-medium text-muted-foreground">Loading startups...</p>
          </div>
        </main>
        <SiteFooter />
      </div>
    )
  }

  return (

    <DashboardShell userType="investor">
    <div className="flex min-h-screen flex-col">
      <main className="flex-1 container mx-auto py-10 px-4">
        {selectedStartup ? (
          // 🔹 Detailed Startup View
          <div>
            <Button variant="outline" onClick={() => setSelectedStartup(null)} className="mb-6">
              <ArrowLeft className="h-4 w-4 mr-2" /> Back to Discovery
            </Button>

            {/* Startup Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
              <div className="flex items-center gap-4">
                <Avatar className="h-16 w-16 border-2 border-primary/10">
                  <AvatarImage src={selectedStartup.Avatar} alt={selectedStartup.StartupName} />
                  <AvatarFallback>{selectedStartup.StartupName.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <h1 className="text-3xl font-bold">{selectedStartup.StartupName}</h1>
                  <div className="flex items-center gap-2 text-muted-foreground mt-1">
                    <Building2 className="h-4 w-4" />
                    <span>{selectedStartup.Industry}</span>
                    <span className="text-muted-foreground">•</span>
                    <MapPin className="h-4 w-4" />
                    <span>{selectedStartup.Location}</span>
                  </div>
                </div>
              </div>

              <div className="flex gap-2 self-start md:self-center">
                <Button variant="outline" size="sm" onClick={() => toggleBookmark(selectedStartup.UserID)}>
                  {selectedStartup.Bookmarked ? (
                    <>
                      <BookmarkCheck className="h-4 w-4 mr-2" /> Bookmarked
                    </>
                  ) : (
                    <>
                      <Bookmark className="h-4 w-4 mr-2" /> Bookmark
                    </>
                  )}
                </Button>
                <Button variant="outline" size="sm">
                  <Share2 className="h-4 w-4 mr-2" /> Share
                </Button>
                <Button variant="outline" size="sm" onClick={() => addToDeals(selectedStartup)}>
                  Add to Deals
                </Button>
                <Button>
                  <Mail className="h-4 w-4 mr-2" /> Contact Founder
                </Button>
              </div>
            </div>

            {/* Match Score */}
            <div className="bg-primary/5 rounded-lg p-4 mb-6 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="bg-primary text-primary-foreground rounded-full h-12 w-12 flex items-center justify-center text-lg font-bold">
                  {selectedStartup.MatchScore}%
                </div>
                <div>
                  <h3 className="font-medium">Match Score</h3>
                  <p className="text-sm text-muted-foreground">Based on your investment preferences</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="outline">{selectedStartup.FundingStage}</Badge>
                <Badge variant="outline">{formatCurrency(selectedStartup.FundRequired)}</Badge>
                {selectedStartup.Tags.map((tag) => (
                  <Badge key={tag} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Tabs for Startup Details */}
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="business">Business Model</TabsTrigger>
                <TabsTrigger value="team">Team & Funding</TabsTrigger>
                <TabsTrigger value="traction">Traction & Market</TabsTrigger>
              </TabsList>

              {/* Overview Tab */}
              <TabsContent value="overview" className="space-y-6 mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Target className="h-5 w-5 mr-2 text-primary" />
                      Mission & Vision
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{selectedStartup.MissionStatement}</p>
                  </CardContent>
                </Card>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <Calendar className="h-5 w-5 mr-2 text-primary" />
                        Founded
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-2xl font-bold">{selectedStartup.Founded}</p>
                      <p className="text-sm text-muted-foreground">
                        {new Date().getFullYear() - Number.parseInt(selectedStartup.Founded)} years in operation
                      </p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <Globe className="h-5 w-5 mr-2 text-primary" />
                        Online Presence
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <a
                        href={selectedStartup.StartupWebsite}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center text-primary hover:underline"
                      >
                        {selectedStartup.StartupWebsite} <ExternalLink className="h-4 w-4 ml-1" />
                      </a>
                    </CardContent>
                  </Card>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <FileText className="h-5 w-5 mr-2 text-primary" />
                      Pitch Deck
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {selectedStartup.PitchDeck ? (
                      <div className="flex flex-col gap-4">
                        <div className="bg-muted/50 rounded-lg h-40 flex items-center justify-center">
                          <FileText className="h-12 w-12 text-muted-foreground" />
                        </div>
                        <Button className="w-full sm:w-auto">
                          View Pitch Deck <ChevronRight className="h-4 w-4 ml-1" />
                        </Button>
                      </div>
                    ) : (
                      <p className="text-muted-foreground">No pitch deck uploaded</p>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Business Model Tab */}
              <TabsContent value="business" className="space-y-6 mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Briefcase className="h-5 w-5 mr-2 text-primary" />
                      Business Model
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{selectedStartup.BusinessModel}</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <DollarSign className="h-5 w-5 mr-2 text-primary" />
                      Revenue Streams
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{selectedStartup.RevenueStreams}</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Target className="h-5 w-5 mr-2 text-primary" />
                      Competition
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{selectedStartup.Competition}</p>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Team & Funding Tab */}
              <TabsContent value="team" className="space-y-6 mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Users className="h-5 w-5 mr-2 text-primary" />
                      Leadership Team
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{selectedStartup.LeadershipTeam}</p>
                    <div className="mt-4">
                      <h4 className="font-medium mb-2">Team Size</h4>
                      <Badge variant="outline">{selectedStartup.TeamSize}</Badge>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <DollarSign className="h-5 w-5 mr-2 text-primary" />
                      Funding Requirements
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-4 mb-4">
                      <div className="bg-primary/10 rounded-full p-4">
                        <DollarSign className="h-8 w-8 text-primary" />
                      </div>
                      <div>
                        <p className="text-3xl font-bold">{formatCurrency(selectedStartup.FundRequired)}</p>
                        <p className="text-sm text-muted-foreground">{selectedStartup.FundingStage} Round</p>
                      </div>
                    </div>

                    <h4 className="font-medium mb-2">Fund Allocation</h4>
                    <p className="text-muted-foreground mb-4">{selectedStartup.FundAllocation}</p>

                    {/* Visual representation of fund allocation */}
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm">R&D</span>
                          <span className="text-sm font-medium">40%</span>
                        </div>
                        <Progress value={40} className="h-2" />
                      </div>
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm">Marketing</span>
                          <span className="text-sm font-medium">30%</span>
                        </div>
                        <Progress value={30} className="h-2" />
                      </div>
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm">Operations</span>
                          <span className="text-sm font-medium">20%</span>
                        </div>
                        <Progress value={20} className="h-2" />
                      </div>
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm">Legal</span>
                          <span className="text-sm font-medium">10%</span>
                        </div>
                        <Progress value={10} className="h-2" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Traction & Market Tab */}
              <TabsContent value="traction" className="space-y-6 mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <TrendingUp className="h-5 w-5 mr-2 text-primary" />
                      Traction & Metrics
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{selectedStartup.Traction}</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <BarChart className="h-5 w-5 mr-2 text-primary" />
                      Scaling Potential
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{selectedStartup.ScalingPotential}</p>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>

            {/* Founder Contact */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <User className="h-5 w-5 mr-2 text-primary" />
                  Founder Information
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={selectedStartup.Avatar} alt={selectedStartup.Name} />
                    <AvatarFallback>{selectedStartup.Name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-medium">{selectedStartup.Name}</h3>
                    <p className="text-sm text-muted-foreground">{selectedStartup.Email}</p>
                  </div>
                  <Button className="sm:ml-auto">
                    <Mail className="h-4 w-4 mr-2" /> Contact Founder
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        ) : (
          // 🔹 Startup Discovery List View
          <div>
            <div className="flex flex-col gap-4 mb-8">
              <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold">Startup Discovery</h1>
                <div className="flex gap-2">
                  <Button
                    variant={viewMode === "grid" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setViewMode("grid")}
                  >
                    Grid
                  </Button>
                  <Button
                    variant={viewMode === "list" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setViewMode("list")}
                  >
                    List
                  </Button>
                </div>
              </div>

              <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-grow">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    placeholder="Search startups by name, industry, or description..."
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
                        {industries.map((industry) => (
                          <SelectItem key={industry} value={industry}>
                            {industry === "all" ? "All Industries" : industry}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <Select value={stageFilter} onValueChange={setStageFilter}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Funding Stage" />
                    </SelectTrigger>
                    <SelectContent>
                      {fundingStages.map((stage) => (
                        <SelectItem key={stage} value={stage}>
                          {stage === "all" ? "All Stages" : stage}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Sort By" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="match">Match Score</SelectItem>
                      <SelectItem value="funding">Funding Amount</SelectItem>
                      <SelectItem value="name">Startup Name</SelectItem>
                      <SelectItem value="newest">Newest First</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {filteredStartups.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="bg-muted/30 rounded-full p-6 mb-4">
                  <Search className="h-10 w-10 text-muted-foreground" />
                </div>
                <h2 className="text-xl font-semibold mb-2">No startups found</h2>
                <p className="text-muted-foreground max-w-md">
                  We couldn't find any startups matching your search criteria. Try adjusting your filters or search
                  query.
                </p>
              </div>
            ) : viewMode === "grid" ? (
              // Grid View
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredStartups.map((founder) => (
                  <Card
                    key={founder.UserID}
                    className="overflow-hidden hover:shadow-lg transition-all border-2 hover:border-primary/20"
                  >
                    <div className="bg-gradient-to-r from-primary/10 to-primary/5 p-4">
                      <div className="flex justify-between items-start">
                        <Badge variant={founder.MatchScore > 85 ? "default" : "secondary"} className="mb-2">
                          {founder.MatchScore}% Match
                        </Badge>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                          onClick={(e) => {
                            e.stopPropagation()
                            toggleBookmark(founder.UserID)
                          }}
                        >
                          {founder.Bookmarked ? (
                            <BookmarkCheck className="h-4 w-4 text-primary" />
                          ) : (
                            <Bookmark className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-12 w-12 border-2 border-background">
                          <AvatarImage src={founder.Avatar} alt={founder.StartupName} />
                          <AvatarFallback>{founder.StartupName.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="font-bold text-lg line-clamp-1">{founder.StartupName}</h3>
                          <div className="flex items-center text-sm text-muted-foreground">
                            <MapPin className="h-3 w-3 mr-1" />
                            <span>{founder.Location}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <CardContent className="pt-4">
                      <div className="flex flex-wrap gap-1 mb-3">
                        <Badge variant="outline">{founder.Industry}</Badge>
                        <Badge variant="outline">{founder.FundingStage}</Badge>
                        <Badge variant="outline">{formatCurrency(founder.FundRequired)}</Badge>
                      </div>

                      <p className="text-sm text-muted-foreground line-clamp-3 mb-4">{founder.MissionStatement}</p>

                      <div className="flex items-center text-sm text-muted-foreground mb-4">
                        <Users className="h-4 w-4 mr-1" />
                        <span>{founder.TeamSize}</span>
                        <span className="mx-2">•</span>
                        <Calendar className="h-4 w-4 mr-1" />
                        <span>Founded {founder.Founded}</span>
                      </div>
                    </CardContent>

                    <CardFooter className="border-t bg-muted/10 pt-4">
                      <Button className="w-full" onClick={() => setSelectedStartup(founder)}>
                        View Details
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            ) : (
              // List View
              <div className="space-y-4">
                {filteredStartups.map((founder) => (
                  <Card
                    key={founder.UserID}
                    className="overflow-hidden hover:shadow-md transition-all border hover:border-primary/20"
                  >
                    <div className="flex flex-col md:flex-row">
                      <div className="bg-gradient-to-r from-primary/10 to-primary/5 p-4 md:w-64 flex flex-col justify-between">
                        <div>
                          <div className="flex justify-between items-center mb-3">
                            <Badge variant={founder.MatchScore > 85 ? "default" : "secondary"}>
                              {founder.MatchScore}% Match
                            </Badge>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8"
                              onClick={(e) => {
                                e.stopPropagation()
                                toggleBookmark(founder.UserID)
                              }}
                            >
                              {founder.Bookmarked ? (
                                <BookmarkCheck className="h-4 w-4 text-primary" />
                              ) : (
                                <Bookmark className="h-4 w-4" />
                              )}
                            </Button>
                          </div>
                          <div className="flex items-center gap-3 mb-3">
                            <Avatar className="h-10 w-10 border-2 border-background">
                              <AvatarImage src={founder.Avatar} alt={founder.StartupName} />
                              <AvatarFallback>{founder.StartupName.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div>
                              <h3 className="font-bold line-clamp-1">{founder.StartupName}</h3>
                              <div className="flex items-center text-sm text-muted-foreground">
                                <MapPin className="h-3 w-3 mr-1" />
                                <span>{founder.Location}</span>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-1">
                          <Badge variant="outline">{founder.Industry}</Badge>
                          <Badge variant="outline">{founder.FundingStage}</Badge>
                        </div>
                      </div>

                      <CardContent className="flex-1 p-4">
                        <div className="flex flex-col h-full justify-between">
                          <div>
                            <div className="flex items-center gap-2 mb-2">
                              <DollarSign className="h-4 w-4 text-muted-foreground" />
                              <span className="font-medium">{formatCurrency(founder.FundRequired)}</span>
                              <span className="text-muted-foreground">•</span>
                              <Users className="h-4 w-4 text-muted-foreground" />
                              <span className="text-muted-foreground">{founder.TeamSize}</span>
                              <span className="text-muted-foreground">•</span>
                              <Calendar className="h-4 w-4 text-muted-foreground" />
                              <span className="text-muted-foreground">Founded {founder.Founded}</span>
                            </div>

                            <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                              {founder.MissionStatement}
                            </p>
                          </div>

                          <div className="flex justify-end">
                            <Button onClick={() => setSelectedStartup(founder)}>View Details</Button>
                          </div>
                        </div>
                      </CardContent>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </div>
        )}
      </main>
    </div>
    </DashboardShell>
  )
}


