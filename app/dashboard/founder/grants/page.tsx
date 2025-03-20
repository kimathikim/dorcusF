"use client";

import { useState, useEffect } from "react";
import {
  Briefcase,
  FileText,
  Calendar,
  Globe,
  Search,
  ExternalLink,
  ArrowRight,
  Sparkles,
  BarChart,
  Users,
  Filter,
  Clock
} from "lucide-react";
import { toast } from "sonner";
import { fetchICTWorksGrants, submitGrantApplication } from "../../../services/grantsService";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Grants = () => {
  const [grants, setGrants] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedGrant, setSelectedGrant] = useState(null);
  const [activeTab, setActiveTab] = useState("discover");
  const [formData, setFormData] = useState({
    startupName: "",
    contactEmail: "",
    contactPhone: "",
    description: "",
    website: "",
    teamSize: "",
    previousFunding: "",
    pitchDeck: null,
  });

  // Example categories
  const categories = [
    "All",
    "Technology",
    "Healthcare",
    "Financial Services",
    "Climate Change",
    "Education",
    "Women Entrepreneurs",
  ];

  useEffect(() => {
    const loadGrants = async () => {
      setIsLoading(true);
      const result = await fetchICTWorksGrants();
      if (result.success) {
        setGrants(result.data);
      } else {
        toast.error("Failed to load grants. Please try again later.");
      }
      setIsLoading(false);
    };

    loadGrants();
  }, []);

  const handleTabChange = (value) => {
    setActiveTab(value);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSelectChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleFileUpload = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setFormData({ ...formData, pitchDeck: e.target.files[0] });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedGrant) {
      toast.error("No grant selected for application.");
      return;
    }
    const result = await submitGrantApplication(selectedGrant.id, formData);

    if (result.success) {
      toast.success("Grant application submitted successfully!");
      // Reset form and close dialog
      setFormData({
        startupName: "",
        contactEmail: "",
        contactPhone: "",
        description: "",
        website: "",
        teamSize: "",
        previousFunding: "",
        pitchDeck: null,
      });
      setSelectedGrant(null);
    } else {
      toast.error(result.error || "Failed to submit application. Please try again.");
    }
  };

  const filteredGrants = grants.filter((grant) => {
    const matchesSearch =
      grant.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      grant.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "All" || grant.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="container mx-auto px-4 py-12">
        {/* Header Section */}
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4">Funding Opportunities</Badge>
          <h1 className="text-4xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent mb-4">
            Discover Startup Grants
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Find and apply for specially curated grant opportunities to fuel your startup's growth.
          </p>
        </div>

        {/* Main Tabs */}
        <Tabs defaultValue="discover" className="mb-12" onValueChange={handleTabChange}>
          <div className="flex justify-center mb-8">
            <TabsList className="grid w-full max-w-md grid-cols-2 p-1 bg-muted rounded-md">
              <TabsTrigger value="discover" className="data-[state=active]:bg-card">
                Discover Grants
              </TabsTrigger>
              <TabsTrigger value="applied" className="data-[state=active]:bg-card">
                My Applications
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent
            value="discover"
            className="mt-6 animate-in fade-in-50 duration-300"
          >
            <div className="bg-card p-6 md:p-8 rounded-xl shadow-sm border mb-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="md:col-span-2">
                  <div className="relative">
                    <Search
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
                      size={18}
                    />
                    <Input
                      placeholder="Search grants by keyword..."
                      className="pl-10 bg-background border"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                </div>
                <div>
                  <div className="flex items-center space-x-2 bg-muted rounded-md p-2 pl-3 border">
                    <Filter size={16} className="text-foreground" />
                    <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                      <SelectTrigger className="border-0 bg-transparent focus:ring-0 focus-visible:ring-0 pl-0 h-8">
                        <SelectValue placeholder="Filter by category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem key={category} value={category}>
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              {/* Grant Cards */}
              {isLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[1, 2, 3].map((i) => (
                    <Card key={i} className="animate-pulse">
                      <CardHeader className="bg-muted h-32"></CardHeader>
                      <CardContent className="pt-6">
                        <div className="h-4 bg-muted rounded mb-4"></div>
                        <div className="h-4 bg-muted rounded w-3/4 mb-2"></div>
                        <div className="h-4 bg-muted rounded w-1/2"></div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : filteredGrants.length === 0 ? (
                <div className="text-center py-16">
                  <FileText className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-xl font-medium mb-2">
                    No matching grants found
                  </h3>
                  <p className="text-muted-foreground mb-8">
                    Try adjusting your search or category filter
                  </p>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setSearchTerm("");
                      setSelectedCategory("All");
                    }}
                  >
                    Clear filters
                  </Button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredGrants.map((grant: any) => (
                    <Card
                      key={grant.id}
                      className="overflow-hidden transition-all duration-300 hover:shadow-md"
                    >
                      <CardHeader className="p-6 pb-4 border-b">
                        <div className="flex justify-between items-start">
                          <Badge>{grant.category}</Badge>
                          <Badge variant="outline">{grant.amount}</Badge>
                        </div>
                        <CardTitle className="text-xl mt-2">
                          {grant.title}
                        </CardTitle>
                        <CardDescription className="mt-1 line-clamp-2">
                          {grant.description}
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="p-6 pt-4">
                        <div className="space-y-2 text-sm">
                          <div className="flex items-center">
                            <Calendar className="h-4 w-4 mr-2" />
                            dateposted:{" "}
                            <span className="font-medium ml-1">
                              {new Date(grant.dateposted).toLocaleDateString()}
                            </span>
                          </div>
                          <div className="flex items-center">
                            <Globe className="h-4 w-4 mr-2" />
                            Region:{" "}
                            <span className="font-medium ml-1">
                              {grant.region}
                            </span>
                          </div>
                          <div className="flex items-center">
                            <Briefcase className="h-4 w-4 mr-2" />
                            Organization:{" "}
                            <span className="font-medium ml-1">
                              {grant.organization}
                            </span>
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter className="p-6 pt-0 flex justify-between items-center">
                        <a
                          href={grant.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center text-sm text-primary hover:underline"
                        >
                          View Details
                          <ExternalLink className="ml-1 h-4 w-4" />
                        </a>
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button
                              size="sm"
                              onClick={() => setSelectedGrant(grant)}
                            >
                              Apply Now
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-3xl overflow-y-auto max-h-[90vh]">
                            <DialogHeader>
                              <DialogTitle className="text-xl">
                                Apply for {grant.title}
                              </DialogTitle>
                              <DialogDescription>
                                Complete this form to apply for the selected grant
                                opportunity.
                              </DialogDescription>
                            </DialogHeader>
                            <div className="grid gap-6 py-4">
                              <div className="bg-muted p-4 rounded-md border text-sm">
                                <h4 className="font-medium mb-2">Grant Details</h4>
                                <div className="space-y-1">
                                  <p>
                                    <span className="font-medium">Amount:</span> {grant.amount}
                                  </p>
                                  <p>
                                    <span className="font-medium">Dateposted:</span> {new Date(grant.dateposted).toLocaleDateString()}
                                  </p>
                                  <p>
                                    <span className="font-medium">Eligibility:</span> {grant.eligibility}
                                  </p>
                                </div>
                              </div>

                              <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                  <div className="space-y-2">
                                    <label className="text-sm font-medium">Startup Name</label>
                                    <Input
                                      name="startupName"
                                      value={formData.startupName}
                                      onChange={handleChange}
                                      required
                                    />
                                  </div>

                                  <div className="space-y-2">
                                    <label className="text-sm font-medium">Contact Email</label>
                                    <Input
                                      type="email"
                                      name="contactEmail"
                                      value={formData.contactEmail}
                                      onChange={handleChange}
                                      required
                                    />
                                  </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                  <div className="space-y-2">
                                    <label className="text-sm font-medium">Contact Phone</label>
                                    <Input
                                      type="tel"
                                      name="contactPhone"
                                      value={formData.contactPhone}
                                      onChange={handleChange}
                                    />
                                  </div>

                                  <div className="space-y-2">
                                    <label className="text-sm font-medium">Website</label>
                                    <Input
                                      type="url"
                                      name="website"
                                      placeholder="https://"
                                      value={formData.website}
                                      onChange={handleChange}
                                    />
                                  </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                  <div className="space-y-2">
                                    <label className="text-sm font-medium">Team Size</label>
                                    <Select
                                      name="teamSize"
                                      value={formData.teamSize}
                                      onValueChange={(value) => handleSelectChange("teamSize", value)}
                                      required
                                    >
                                      <SelectTrigger>
                                        <SelectValue placeholder="Select team size" />
                                      </SelectTrigger>
                                      <SelectContent>
                                        <SelectItem value="Solo Founder">Solo Founder</SelectItem>
                                        <SelectItem value="2-5">2-5 Members</SelectItem>
                                        <SelectItem value="6-10">6-10 Members</SelectItem>
                                        <SelectItem value="11-50">11-50 Members</SelectItem>
                                        <SelectItem value="50+">50+ Members</SelectItem>
                                      </SelectContent>
                                    </Select>
                                  </div>

                                  <div className="space-y-2">
                                    <label className="text-sm font-medium">Previous Funding</label>
                                    <Select
                                      name="previousFunding"
                                      value={formData.previousFunding}
                                      onValueChange={(value) => handleSelectChange("previousFunding", value)}
                                    >
                                      <SelectTrigger>
                                        <SelectValue placeholder="Previous funding received" />
                                      </SelectTrigger>
                                      <SelectContent>
                                        <SelectItem value="None">None</SelectItem>
                                        <SelectItem value="Pre-seed">Pre-seed</SelectItem>
                                        <SelectItem value="Seed">Seed</SelectItem>
                                        <SelectItem value="Series A">Series A</SelectItem>
                                        <SelectItem value="Series B+">Series B+</SelectItem>
                                      </SelectContent>
                                    </Select>
                                  </div>
                                </div>

                                <div className="space-y-2">
                                  <label className="text-sm font-medium">Project Description</label>
                                  <Textarea
                                    name="description"
                                    placeholder="Describe your project and how it aligns with the grant's objectives..."
                                    value={formData.description}
                                    onChange={handleChange}
                                    required
                                    className="min-h-[120px]"
                                  />
                                </div>

                                <div className="space-y-2">
                                  <label className="text-sm font-medium">Upload Pitch Deck or Supporting Documents</label>
                                  <Input
                                    type="file"
                                    accept=".pdf,.ppt,.pptx,.doc,.docx"
                                    onChange={handleFileUpload}
                                  />
                                  <p className="text-xs text-muted-foreground mt-1">
                                    Accepted formats: PDF, PPT, PPTX, DOC, DOCX (Max 10MB)
                                  </p>
                                </div>

                                <DialogFooter>
                                  <Button type="submit">Submit Application</Button>
                                </DialogFooter>
                              </form>
                            </div>
                          </DialogContent>
                        </Dialog>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent
            value="applied"
            className="mt-6 animate-in fade-in-50 duration-300"
          >
            <Card>
              <CardHeader>
                <CardTitle>Your Grant Applications</CardTitle>
                <CardDescription>
                  Track the status of grants you've applied for.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <FileText className="h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="text-xl font-medium mb-2">No applications yet</h3>
                  <p className="text-muted-foreground mb-6 max-w-md">
                    You haven't submitted any grant applications yet. Discover
                    available grants and submit your first application.
                  </p>
                  <Button variant="outline" onClick={() => setActiveTab("discover")}>
                    Browse Available Grants
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Grants;

