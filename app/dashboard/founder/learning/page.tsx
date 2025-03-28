"use client";

import { useState, useEffect } from "react";
import DashboardShell from "@/components/dashboard-shell";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  BookOpen,
  Search,
  PlayCircle,
  FileText,
  Download,
  CheckCircle,
  Clock,
  TrendingUp,
  Users,
  DollarSign,
  Briefcase,
  Target,
  Filter
} from "lucide-react";

interface ExternalResource {
  type: "youtube" | "blog";
  title: string;
  url: string;
  source?: string;
  thumbnail?: string;
}

interface LearningResource {
  id: number;
  title: string;
  description: string;
  category: string;
  type: string;
  duration: string;
  level: string;
  progress: number;
  image: string;
  modules: string[];
  externalResources?: ExternalResource[];
}

// Custom Progress component without validation logic
const SimpleProgress = ({ value = 0, className = "" }) => {
  return (
    <div className={`relative h-4 w-full overflow-hidden rounded-full bg-secondary ${className}`}>
      <div 
        className="h-full w-full flex-1 bg-primary transition-all"
        style={{ transform: `translateX(-${100 - value}%)` }}
      />
    </div>
  );
};

export default function LearningResourcesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");

  const categories = [
    { id: "all", name: "All Resources" },
    { id: "fundraising", name: "Fundraising" },
    { id: "pitch", name: "Pitch Deck" },
    { id: "growth", name: "Growth Strategy" },
    { id: "finance", name: "Financial Planning" },
    { id: "legal", name: "Legal & Compliance" },
    { id: "market", name: "Market Research" }
  ];

  const learningResources: LearningResource[] = [
    {
      id: 1,
      title: "The Perfect Pitch Deck Structure",
      description: "Learn the 12-slide framework used by successful startups to raise millions",
      category: "pitch",
      type: "Course",
      duration: "2.5 hours",
      level: "Beginner",
      progress: 0,
      image: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=300&h=200&auto=format&fit=crop",
      modules: [
        "Problem Statement & Market Opportunity",
        "Solution & Value Proposition",
        "Business Model & Go-to-Market Strategy",
        "Financial Projections & Funding Ask",
        "Team & Traction"
      ],
      externalResources: [
        {
          type: "youtube",
          title: "How to Create a Pitch Deck That VCs Will Love",
          url: "https://www.youtube.com/watch?v=SB16xgtFmco",
          thumbnail: "https://img.youtube.com/vi/SB16xgtFmco/hqdefault.jpg"
        },
        {
          type: "blog",
          title: "The Only 10 Slides You Need in Your Pitch Deck",
          url: "https://guykawasaki.com/the-only-10-slides-you-need-in-your-pitch/",
          source: "Guy Kawasaki"
        }
      ]
    },
    {
      id: 2,
      title: "Startup Valuation Fundamentals",
      description: "Master the key methods of valuing early-stage startups and negotiating with investors",
      category: "finance",
      type: "Workshop",
      duration: "3 hours",
      level: "Advanced",
      progress: 0,
      image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=300&h=200&auto=format&fit=crop",
      modules: [
        "Pre-money vs Post-money Valuation",
        "Valuation Methods for Early-stage Startups",
        "Cap Tables and Dilution",
        "Term Sheet Negotiation"
      ],
      externalResources: [
        {
          type: "youtube",
          title: "Startup Valuation - How to Calculate Your Company's Worth",
          url: "https://www.youtube.com/watch?v=BLehn1bDjbE",
          thumbnail: "https://img.youtube.com/vi/BLehn1bDjbE/hqdefault.jpg"
        },
        {
          type: "blog",
          title: "How to Value a Startup Company With No Revenue",
          url: "https://www.forbes.com/sites/alejandrocremades/2018/08/27/how-to-value-a-startup-company-with-no-revenue/",
          source: "Forbes"
        }
      ]
    },
    {
      id: 3,
      title: "Seed Round Fundraising Masterclass",
      description: "Complete guide to raising your seed round, from preparation to closing",
      category: "fundraising",
      type: "Video Series",
      duration: "4 hours",
      level: "Intermediate",
      progress: 0,
      image: "https://images.unsplash.com/photo-1553729459-efe14ef6055d?w=300&h=200&auto=format&fit=crop",
      modules: [
        "Fundraising Readiness Assessment",
        "Building Your Investor Pipeline",
        "Pitch Meeting Strategies",
        "Due Diligence Preparation",
        "Negotiation and Closing"
      ]
    },
    {
      id: 4,
      title: "Product-Market Fit Framework",
      description: "Systematic approach to achieving and measuring product-market fit",
      category: "growth",
      type: "Course",
      duration: "3.5 hours",
      level: "Intermediate",
      progress: 0,
      image: "https://images.unsplash.com/photo-1533750349088-cd871a92f312?w=300&h=200&auto=format&fit=crop",
      modules: [
        "Understanding Your Target Market",
        "Customer Development Process",
        "MVP Development and Testing",
        "Metrics That Matter",
        "Iteration and Scaling"
      ]
    },
    {
      id: 5,
      title: "Startup Legal Essentials",
      description: "Critical legal knowledge for founders, from incorporation to funding",
      category: "legal",
      type: "Guide",
      duration: "2.5 hours",
      level: "Beginner",
      progress: 0,
      image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=300&h=200&auto=format&fit=crop",
      modules: [
        "Company Formation and Structure",
        "Intellectual Property Protection",
        "Founder Agreements",
        "Employee Stock Options",
        "Investment Agreements"
      ]
    },
    {
      id: 6,
      title: "B2B Sales Strategy",
      description: "Build and scale your B2B sales process from first customer to predictable revenue",
      category: "growth",
      type: "Course",
      duration: "4 hours",
      level: "Advanced",
      progress: 0,
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=300&h=200&auto=format&fit=crop",
      modules: [
        "Sales Process Development",
        "Lead Generation Strategies",
        "Sales Team Structure",
        "Pipeline Management",
        "Enterprise Sales Tactics"
      ]
    },
    {
      id: 7,
      title: "Financial Modeling for Startups",
      description: "Build comprehensive financial models for fundraising and business planning",
      category: "finance",
      type: "Workshop",
      duration: "5 hours",
      level: "Advanced",
      progress: 0,
      image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=300&h=200&auto=format&fit=crop",
      modules: [
        "Revenue Modeling",
        "Cost Structure Analysis",
        "Cash Flow Projections",
        "Unit Economics",
        "Scenario Planning"
      ]
    },
    {
      id: 8,
      title: "Market Size Analysis (TAM, SAM, SOM)",
      description: "Learn how to accurately calculate and present your market opportunity",
      category: "market",
      type: "Course",
      duration: "2 hours",
      level: "Intermediate",
      progress: 0,
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=300&h=200&auto=format&fit=crop",
      modules: [
        "Market Sizing Methodologies",
        "Data Sources and Research",
        "Bottom-up vs Top-down Analysis",
        "Market Segmentation",
        "Growth Projections"
      ]
    },
    {
      id: 9,
      title: "Startup Metrics and KPIs",
      description: "Essential metrics for measuring and presenting startup growth",
      category: "growth",
      type: "Video Series",
      duration: "3 hours",
      level: "Intermediate",
      progress: 0,
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=300&h=200&auto=format&fit=crop",
      modules: [
        "Core Growth Metrics",
        "User Acquisition Metrics",
        "Revenue Metrics",
        "Customer Success Metrics",
        "Investor-focused KPIs"
      ]
    },
    {
      id: 10,
      title: "Term Sheet Deep Dive",
      description: "Understanding and negotiating startup investment terms",
      category: "legal",
      type: "Course",
      duration: "4 hours",
      level: "Advanced",
      progress: 0,
      image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=300&h=200&auto=format&fit=crop",
      modules: [
        "Key Investment Terms",
        "Valuation and Equity Terms",
        "Control and Board Rights",
        "Pro-rata Rights",
        "Exit and Liquidation Preferences"
      ]
    },
    {
      id: 11,
      title: "Go-to-Market Strategy",
      description: "Develop and execute a successful market entry strategy",
      category: "growth",
      type: "Course",
      duration: "3.5 hours",
      level: "Intermediate",
      progress: 0,
      image: "https://images.unsplash.com/photo-1512758017271-d7b84c2113f1?w=300&h=200&auto=format&fit=crop",
      modules: [
        "Market Entry Planning",
        "Channel Strategy",
        "Pricing Strategy",
        "Launch Planning",
        "Growth Tactics"
      ]
    },
    {
      id: 12,
      title: "Venture Capital Deep Dive",
      description: "Understanding how VCs work and what they look for",
      category: "fundraising",
      type: "Video Series",
      duration: "3 hours",
      level: "Intermediate",
      progress: 0,
      image: "https://images.unsplash.com/photo-1579532537598-459ecdaf39cc?w=300&h=200&auto=format&fit=crop",
      modules: [
        "VC Fund Structure",
        "Investment Thesis",
        "Due Diligence Process",
        "Portfolio Management",
        "Exit Strategies"
      ]
    }
  ];

  const filteredResources = learningResources
    .filter(resource => 
      (activeCategory === "all" || resource.category === activeCategory) &&
      (resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
       resource.description.toLowerCase().includes(searchQuery.toLowerCase()))
    );

  const getLevelColor = (level: string) => {
    switch (level.toLowerCase()) {
      case "beginner": return "bg-green-100 text-green-800";
      case "intermediate": return "bg-blue-100 text-blue-800";
      case "advanced": return "bg-purple-100 text-purple-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <DashboardShell userType="founder">
      <div className="space-y-8">
        <h1 className="text-3xl font-bold mb-2">Learning Resources</h1>
        <p className="text-muted-foreground mb-8">
          Access curated content to help you build and scale your startup successfully
        </p>

        {/* Search and Filter */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search resources..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex gap-2 overflow-x-auto pb-2">
            {categories.map(category => (
              <Button
                key={category.id}
                variant={activeCategory === category.id ? "default" : "outline"}
                onClick={() => setActiveCategory(category.id)}
                className="whitespace-nowrap"
              >
                {category.name}
              </Button>
            ))}
          </div>
        </div>

        {/* Learning Progress Overview */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Your Learning Progress</CardTitle>
            <CardDescription>Track your progress across all resources</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6 md:grid-cols-4">
              <div className="flex items-center gap-2">
                <div className="rounded-full bg-primary/10 p-2">
                  <BookOpen className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium">Available Courses</p>
                  <p className="text-2xl font-bold">{learningResources.length}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="rounded-full bg-primary/10 p-2">
                  <Clock className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium">Total Hours</p>
                  <p className="text-2xl font-bold">
                    {learningResources.reduce((acc, curr) => acc + parseFloat(curr.duration.split(' ')[0]), 0)}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="rounded-full bg-primary/10 p-2">
                  <Target className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium">Categories</p>
                  <p className="text-2xl font-bold">{categories.length - 1}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="rounded-full bg-primary/10 p-2">
                  <CheckCircle className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium">Completed</p>
                  <p className="text-2xl font-bold">0</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Resources Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredResources.map(resource => (
            <Card key={resource.id} className="overflow-hidden flex flex-col">
              <div className="aspect-video relative">
                <img
                  src={resource.image}
                  alt={resource.title}
                  className="object-cover w-full h-full"
                />
                {resource.progress > 0 && (
                  <div className="absolute bottom-0 left-0 right-0 bg-black/50 p-2">
                    <SimpleProgress value={resource.progress} className="h-2" />
                    <p className="text-xs text-white text-right mt-1">{resource.progress}% Complete</p>
                  </div>
                )}
              </div>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <CardTitle className="text-xl">{resource.title}</CardTitle>
                  <Badge variant="outline" className={getLevelColor(resource.level)}>
                    {resource.level}
                  </Badge>
                </div>
                <CardDescription>{resource.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow flex flex-col">
                <div className="space-y-4 flex-grow">
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center">
                      <PlayCircle className="h-4 w-4 mr-1" />
                      {resource.type}
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      {resource.duration}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm font-medium">Course Content:</p>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      {resource.modules.map((module, index) => (
                        <li key={index} className="flex items-center gap-2">
                          <div className="w-1 h-1 rounded-full bg-primary" />
                          {module}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  {/* External Resources Section */}
                  {resource.externalResources && resource.externalResources.length > 0 && (
                    <div className="space-y-2 mt-4">
                      <p className="text-sm font-medium">Additional Resources:</p>
                      <div className="space-y-3">
                        {resource.externalResources.map((extResource, idx) => (
                          <a 
                            key={idx} 
                            href={extResource.url} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="flex items-start gap-3 p-2 rounded-md hover:bg-muted transition-colors"
                          >
                            {extResource.type === "youtube" ? (
                              <>
                                <div className="flex-shrink-0 w-16 h-12 rounded overflow-hidden relative">
                                  {extResource.thumbnail ? (
                                    <img src={extResource.thumbnail} alt={extResource.title} className="object-cover w-full h-full" />
                                  ) : (
                                    <div className="bg-red-600 w-full h-full flex items-center justify-center">
                                      <PlayCircle className="h-6 w-6 text-white" />
                                    </div>
                                  )}
                                </div>
                                <div>
                                  <p className="text-sm font-medium line-clamp-2">{extResource.title}</p>
                                  <p className="text-xs text-muted-foreground mt-1">YouTube</p>
                                </div>
                              </>
                            ) : (
                              <>
                                <div className="flex-shrink-0 w-8 h-8 rounded bg-primary/10 flex items-center justify-center">
                                  <FileText className="h-4 w-4 text-primary" />
                                </div>
                                <div>
                                  <p className="text-sm font-medium line-clamp-2">{extResource.title}</p>
                                  <p className="text-xs text-muted-foreground mt-1">{extResource.source || "Blog"}</p>
                                </div>
                              </>
                            )}
                          </a>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                
                <Link href={resource.category === "pitch" ? "/dashboard/founder/learning/pitch" : "#"} className="w-full mt-4">
                  <Button className="w-full">
                    {resource.progress > 0 ? "Continue Learning" : "Start Learning"}
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </DashboardShell>
  );
}
