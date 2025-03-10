"use client";

import { useState } from "react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Search, Filter, MessageSquare, Calendar, ExternalLink, Star, Clock, CheckCircle, XCircle, Upload, DollarSign, Target, Users } from "lucide-react";

export default function FounderInvestorsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("matches");
  const [selectedInvestor, setSelectedInvestor] = useState(null);
  const [isApplying, setIsApplying] = useState(false);
  const { toast } = useToast();

  // Application form state
  const [applicationForm, setApplicationForm] = useState({
    pitchDeck: "",
    fundingAmount: "",
    useOfFunds: "",
    timeline: "",
    milestones: "",
    teamSize: "",
    currentInvestors: "",
    previousFunding: "",
  });

  const handleApplicationSubmit = (e) => {
    e.preventDefault();
    setIsApplying(true);

    // Simulate application submission
    setTimeout(() => {
      setIsApplying(false);
      toast({
        title: "Application Submitted",
        description: "Your application has been sent to the investor for review.",
      });
      // Reset form
      setApplicationForm({
        pitchDeck: "",
        fundingAmount: "",
        useOfFunds: "",
        timeline: "",
        milestones: "",
        teamSize: "",
        currentInvestors: "",
        previousFunding: "",
      });
    }, 1500);
  };

  const investorMatches = [
    {
      id: 1,
      name: "Sarah Chen",
      company: "Blue Horizon Capital",
      type: "Venture Capitalist",
      matchScore: 92,
      interests: ["Technology", "AI/ML", "SaaS"],
      investmentRange: "$500K - $2M",
      status: "Interested",
      lastActivity: "2 days ago",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&h=150&auto=format&fit=crop"
    },
    {
      id: 2,
      name: "Michael Rodriguez",
      company: "TechVentures LLC",
      type: "Angel Investor",
      matchScore: 88,
      interests: ["Technology", "E-commerce"],
      investmentRange: "$100K - $500K",
      status: "Reviewing",
      lastActivity: "5 days ago",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&auto=format&fit=crop"
    },
    {
      id: 3,
      name: "Emily Wong",
      company: "Innovation Partners",
      type: "Venture Capitalist",
      matchScore: 85,
      interests: ["Technology", "Healthcare"],
      investmentRange: "$1M - $5M",
      status: "Meeting Scheduled",
      lastActivity: "1 day ago",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&auto=format&fit=crop"
    }
  ];

  const applications = [
    {
      id: 1,
      investor: "Acme Ventures",
      status: "Under Review",
      submittedDate: "2024-03-15",
      nextStep: "Due Diligence",
      progress: 60
    },
    {
      id: 2,
      investor: "TechStars",
      status: "Initial Screening",
      submittedDate: "2024-03-10",
      nextStep: "First Meeting",
      progress: 30
    },
    {
      id: 3,
      investor: "Sequoia Capital",
      status: "Rejected",
      submittedDate: "2024-02-28",
      nextStep: "N/A",
      progress: 100
    }
  ];

  const meetings = [
    {
      id: 1,
      investor: "Sarah Chen",
      company: "Blue Horizon Capital",
      date: "2024-03-20",
      time: "10:00 AM",
      type: "Virtual Pitch",
      status: "Confirmed"
    },
    {
      id: 2,
      investor: "Michael Rodriguez",
      company: "TechVentures LLC",
      date: "2024-03-22",
      time: "2:00 PM",
      type: "Follow-up Call",
      status: "Pending"
    }
  ];

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1 py-12 px-4">
        <div className="container">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Investor Engagement</h1>
              <p className="text-muted-foreground">Manage your investor relationships and funding applications</p>
            </div>
            <Button>
              <Calendar className="mr-2 h-4 w-4" />
              Schedule Meeting
            </Button>
          </div>

          <div className="flex flex-col gap-6">
            {/* Search and Filter */}
            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                    <Input
                      placeholder="Search investors..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <Button variant="outline">
                    <Filter className="mr-2 h-4 w-4" />
                    Filters
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Main Content */}
            <Tabs defaultValue="matches" className="space-y-4">
              <TabsList>
                <TabsTrigger value="matches">Matches</TabsTrigger>
                <TabsTrigger value="applications">Applications</TabsTrigger>
                <TabsTrigger value="meetings">Meetings</TabsTrigger>
              </TabsList>

              <TabsContent value="matches" className="space-y-4">
                {investorMatches.map((investor) => (
                  <Card key={investor.id}>
                    <CardContent className="pt-6">
                      <div className="flex flex-col md:flex-row gap-6">
                        <div className="flex-shrink-0">
                          <img
                            src={investor.image}
                            alt={investor.name}
                            className="w-20 h-20 rounded-full object-cover"
                          />
                        </div>
                        <div className="flex-1 space-y-4">
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="text-xl font-semibold">{investor.name}</h3>
                              <p className="text-muted-foreground">{investor.company}</p>
                            </div>
                            <Badge variant="secondary">
                              {investor.matchScore}% Match
                            </Badge>
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <p className="text-sm text-muted-foreground">Investor Type</p>
                              <p className="font-medium">{investor.type}</p>
                            </div>
                            <div>
                              <p className="text-sm text-muted-foreground">Investment Range</p>
                              <p className="font-medium">{investor.investmentRange}</p>
                            </div>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground mb-2">Interests</p>
                            <div className="flex flex-wrap gap-2">
                              {investor.interests.map((interest) => (
                                <Badge key={interest} variant="outline">
                                  {interest}
                                </Badge>
                              ))}
                            </div>
                          </div>
                          <div className="flex justify-between items-center pt-4">
                            <p className="text-sm text-muted-foreground">
                              <Clock className="inline-block mr-1 h-4 w-4" />
                              Last active {investor.lastActivity}
                            </p>
                            <div className="flex gap-2">
                              <Button variant="outline" size="sm">
                                <MessageSquare className="mr-2 h-4 w-4" />
                                Message
                              </Button>
                              <Dialog>
                                <DialogTrigger asChild>
                                  <Button size="sm">Apply for Investment</Button>
                                </DialogTrigger>
                                <DialogContent className="sm:max-w-[600px]">
                                  <DialogHeader>
                                    <DialogTitle>Investment Application</DialogTitle>
                                    <DialogDescription>
                                      Apply for investment from {investor.name} at {investor.company}. Please fill out all required information carefully.
                                    </DialogDescription>
                                  </DialogHeader>
                                  <form onSubmit={handleApplicationSubmit} className="space-y-6 pt-4">
                                    <div className="space-y-2">
                                      <Label htmlFor="pitchDeck">Pitch Deck URL</Label>
                                      <div className="flex gap-2">
                                        <Input
                                          id="pitchDeck"
                                          placeholder="https://..."
                                          value={applicationForm.pitchDeck}
                                          onChange={(e) => setApplicationForm({ ...applicationForm, pitchDeck: e.target.value })}
                                          required
                                        />
                                        <Button type="button" variant="outline" size="icon">
                                          <Upload className="h-4 w-4" />
                                        </Button>
                                      </div>
                                      <p className="text-sm text-muted-foreground">Share a link to your pitch deck (Google Slides, PDF, etc.)</p>
                                    </div>

                                    <div className="space-y-2">
                                      <Label htmlFor="fundingAmount">Funding Amount Requested</Label>
                                      <div className="relative">
                                        <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                        <Input
                                          id="fundingAmount"
                                          type="number"
                                          placeholder="500000"
                                          className="pl-10"
                                          value={applicationForm.fundingAmount}
                                          onChange={(e) => setApplicationForm({ ...applicationForm, fundingAmount: e.target.value })}
                                          required
                                        />
                                      </div>
                                    </div>

                                    <div className="space-y-2">
                                      <Label htmlFor="useOfFunds">Use of Funds</Label>
                                      <Textarea
                                        id="useOfFunds"
                                        placeholder="Describe how you plan to use the investment..."
                                        value={applicationForm.useOfFunds}
                                        onChange={(e) => setApplicationForm({ ...applicationForm, useOfFunds: e.target.value })}
                                        required
                                      />
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                      <div className="space-y-2">
                                        <Label htmlFor="timeline">Funding Timeline</Label>
                                        <Select
                                          value={applicationForm.timeline}
                                          onValueChange={(value) => setApplicationForm({ ...applicationForm, timeline: value })}
                                        >
                                          <SelectTrigger>
                                            <SelectValue placeholder="Select timeline" />
                                          </SelectTrigger>
                                          <SelectContent>
                                            <SelectItem value="immediate">Immediate</SelectItem>
                                            <SelectItem value="1-3months">1-3 months</SelectItem>
                                            <SelectItem value="3-6months">3-6 months</SelectItem>
                                            <SelectItem value="6-12months">6-12 months</SelectItem>
                                          </SelectContent>
                                        </Select>
                                      </div>

                                      <div className="space-y-2">
                                        <Label htmlFor="teamSize">Team Size</Label>
                                        <div className="relative">
                                          <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                          <Input
                                            id="teamSize"
                                            type="number"
                                            placeholder="5"
                                            className="pl-10"
                                            value={applicationForm.teamSize}
                                            onChange={(e) => setApplicationForm({ ...applicationForm, teamSize: e.target.value })}
                                            required
                                          />
                                        </div>
                                      </div>
                                    </div>

                                    <div className="space-y-2">
                                      <Label htmlFor="milestones">Key Milestones</Label>
                                      <Textarea
                                        id="milestones"
                                        placeholder="List your key milestones and achievements..."
                                        value={applicationForm.milestones}
                                        onChange={(e) => setApplicationForm({ ...applicationForm, milestones: e.target.value })}
                                        required
                                      />
                                    </div>

                                    <div className="space-y-2">
                                      <Label htmlFor="currentInvestors">Current Investors</Label>
                                      <Input
                                        id="currentInvestors"
                                        placeholder="List any current investors..."
                                        value={applicationForm.currentInvestors}
                                        onChange={(e) => setApplicationForm({ ...applicationForm, currentInvestors: e.target.value })}
                                      />
                                    </div>

                                    <div className="space-y-2">
                                      <Label htmlFor="previousFunding">Previous Funding</Label>
                                      <Input
                                        id="previousFunding"
                                        placeholder="Amount of previous funding raised..."
                                        value={applicationForm.previousFunding}
                                        onChange={(e) => setApplicationForm({ ...applicationForm, previousFunding: e.target.value })}
                                      />
                                    </div>

                                    <div className="flex justify-end gap-2">
                                      <Button type="button" variant="outline">
                                        Cancel
                                      </Button>
                                      <Button type="submit" disabled={isApplying}>
                                        {isApplying ? "Submitting..." : "Submit Application"}
                                      </Button>
                                    </div>
                                  </form>
                                </DialogContent>
                              </Dialog>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>

              <TabsContent value="applications" className="space-y-4">
                {applications.map((application) => (
                  <Card key={application.id}>
                    <CardContent className="pt-6">
                      <div className="flex flex-col gap-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="text-xl font-semibold">{application.investor}</h3>
                            <p className="text-muted-foreground">Submitted: {application.submittedDate}</p>
                          </div>
                          <Badge
                            variant={
                              application.status === "Rejected" ? "destructive" :
                                application.status === "Under Review" ? "secondary" :
                                  "outline"
                            }
                          >
                            {application.status}
                          </Badge>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground mb-2">Application Progress</p>
                          <Progress value={application.progress} className="h-2" />
                        </div>
                        <div className="flex justify-between items-center pt-2">
                          <p className="text-sm">
                            Next Step: <span className="font-medium">{application.nextStep}</span>
                          </p>
                          <Button variant="outline" size="sm">
                            View Details
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>

              <TabsContent value="meetings" className="space-y-4">
                {meetings.map((meeting) => (
                  <Card key={meeting.id}>
                    <CardContent className="pt-6">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-xl font-semibold">{meeting.investor}</h3>
                          <p className="text-muted-foreground">{meeting.company}</p>
                        </div>
                        <Badge variant={meeting.status === "Confirmed" ? "secondary" : "outline"}>
                          {meeting.status}
                        </Badge>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                        <div>
                          <p className="text-sm text-muted-foreground">Date</p>
                          <p className="font-medium">{meeting.date}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Time</p>
                          <p className="font-medium">{meeting.time}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Type</p>
                          <p className="font-medium">{meeting.type}</p>
                        </div>
                      </div>
                      <div className="flex justify-end gap-2 mt-4">
                        <Button variant="outline" size="sm">
                          Reschedule
                        </Button>
                        <Button variant="outline" size="sm">
                          <Calendar className="mr-2 h-4 w-4" />
                          Add to Calendar
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
