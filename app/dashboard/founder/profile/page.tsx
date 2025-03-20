"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  Building2,
  Mail,
  Briefcase,
  MapPin,
  Globe,
  Users,
  Target,
  DollarSign,
  BarChart,
  TrendingUp,
  FileText,
  Edit,
  Save,
  ChevronRight,
} from "lucide-react"

// Mock user data - in a real app, this would come from your auth system
const userData = {
  name: "Sarah Johnson",
  email: "sarah@innovatech.co",
  roles: ["Founder", "CEO"],
  avatarUrl: "/placeholder.svg?height=100&width=100",
  joinedDate: "January 2023",
}

export default function FounderProfilePage() {
  const router = useRouter()
  const [isEditing, setIsEditing] = useState(false)
  const [loading, setLoading] = useState(false)
  const [pith_deck, setPitchDeck] = useState<File | null>(null);
  const [startupData, setStartupData] = useState({
    startup_name: "",
    mission_statement: "",
    industry: "",
    funding_stage: "",
    funding_allocation: "",
    bussiness_model: "",
    revenue_streams: "",
    traction: "",
    scaling_potential:
      "",
    competition:
      "",
    leadership_team:
      "",
    team_size: "",
    fund_required: 0,
    location: "",
    startup_website: "",
    pith_deck: "",
  })

  const [formData, setFormData] = useState({ ...startupData })

  const industries = [
    "Technology",
    "Healthcare",
    "Finance",
    "Education",
    "E-commerce",
    "AI/ML",
    "Blockchain",
    "SaaS",
    "Consumer Apps",
  ]
  const fundingStages = ["Pre-seed", "Seed", "Series A", "Series B", "Series C+"]

  useEffect(() => {
    // In a real app, you would fetch the profile data here
    const fetchProfileData = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/v1/founder/profile", {
          headers: {
            "Authorization": `Bearer ${localStorage.getItem("authToken")}`,
          },
        });
        if (response.ok) {
          const data = await response.json();
          console.log(data);
          setStartupData(data);
          setFormData(data);
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };
    fetchProfileData();
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  // Handle pitch deck file selection
  const handlePitchDeckUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setPitchDeck(e.target.files[0]);
    }
  };


const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  for (const [key, value] of Object.entries(formData)) {
    if (value === 0 || value === "") {
      alert(`Please fill out the ${key} field.`);
      return;
    }
  }

  const formDataToSend = new FormData();

  // Append pitch deck file if available
  if (pith_deck) {
    formDataToSend.append("pitch_deck", pith_deck);
  }

  // Convert formData to JSON and append
  formDataToSend.append("data", JSON.stringify(formData));
  console.log(formDataToSend);
  try {
    const response = await fetch("http://127.0.0.1:8080/api/v1/founder/profile", {
      method: "PUT",
      body: formDataToSend,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
    });

    if (response.ok) {
      alert("Founder profile updated successfully!");
      // Redirect or reload as needed
      window.location.href = "/dashboard/founder";
    } else {
      const errorData = await response.json();
      alert(`Failed to update profile: ${errorData.message}`);
    }
  } catch (error) {
    console.error("Error updating profile:", error);
    alert("An error occurred while updating the profile.");
  }
};
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1 container mx-auto py-10 px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Left Sidebar - User Info */}
          <div className="md:col-span-1">
            <Card>
              <CardHeader className="text-center">
                <Avatar className="w-24 h-24 mx-auto mb-4">
                  <AvatarImage src={userData.avatarUrl} alt={userData.name} />
                  <AvatarFallback>{userData.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <CardTitle className="text-2xl">{userData.name}</CardTitle>
                <CardDescription className="flex items-center justify-center gap-2">
                  <Mail className="h-4 w-4" />
                  {userData.email}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-2">Roles</h3>
                    <div className="flex flex-wrap gap-2">
                      {userData.roles.map((role, index) => (
                        <Badge key={index} variant="secondary">
                          {role}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-2">Startup</h3>
                    <p className="font-medium">{startupData.startup_name}</p>
                    <div className="flex items-center text-sm text-muted-foreground mt-1">
                      <Building2 className="h-4 w-4 mr-1" />
                      {startupData.industry}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-2">Location</h3>
                    <div className="flex items-center text-sm">
                      <MapPin className="h-4 w-4 mr-1" />
                      {startupData.location}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-2">Website</h3>
                    <div className="flex items-center text-sm">
                      <Globe className="h-4 w-4 mr-1" />
                      <a
                        href={startupData.startup_website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline truncate"
                      >
                        {startupData.startup_website}
                      </a>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-2">Member Since</h3>
                    <p className="text-sm">{userData.joinedDate}</p>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full" onClick={() => setIsEditing(!isEditing)}>
                  <Edit className="h-4 w-4 mr-2" />
                  {isEditing ? "Cancel Editing" : "Edit Profile"}
                </Button>
              </CardFooter>
            </Card>
          </div>

          {/* Main Content */}
          <div className="md:col-span-2">
            {isEditing ? (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Edit className="h-5 w-5 mr-2" />
                    Edit Startup Profile
                  </CardTitle>
                  <CardDescription>Update your startup information to attract the right investors</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="startup_name">Startup Name</Label>
                        <Input
                          id="startup_name"
                          name="startup_name"
                          value={formData.startup_name}
                          onChange={handleInputChange}
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="industry">Industry</Label>
                        <Select
                          value={formData.industry}
                          onValueChange={(value) => handleSelectChange("industry", value)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select industry" />
                          </SelectTrigger>
                          <SelectContent>
                            {industries.map((ind) => (
                              <SelectItem key={ind} value={ind}>
                                {ind}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="mission_statement">Mission Statement</Label>
                      <Textarea
                        id="mission_statement"
                        name="mission_statement"
                        value={formData.mission_statement}
                        onChange={handleInputChange}
                        required
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="funding_stage">Funding Stage</Label>
                        <Select
                          value={formData.funding_stage}
                          onValueChange={(value) => handleSelectChange("funding_stage", value)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select stage" />
                          </SelectTrigger>
                          <SelectContent>
                            {fundingStages.map((stage) => (
                              <SelectItem key={stage} value={stage}>
                                {stage}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="fund_required">Funding Required ($)</Label>
                        <Input
                          id="fund_required"
                          name="fund_required"
                          type="number"
                          value={formData.fund_required.toString()}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="funding_allocation">Fund Allocation</Label>
                      <Textarea
                        id="funding_allocation"
                        name="funding_allocation"
                        value={formData.funding_allocation}
                        onChange={handleInputChange}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="business_model">Business Model</Label>
                      <Textarea
                        id="business_model"
                        name="bussiness_model"
                        value={formData.bussiness_model}
                        onChange={handleInputChange}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="revenue_streams">Revenue Streams</Label>
                      <Textarea
                        id="revenue_streams"
                        name="revenue_streams"
                        value={formData.revenue_streams}
                        onChange={handleInputChange}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="traction">Traction</Label>
                      <Textarea
                        id="traction"
                        name="traction"
                        value={formData.traction}
                        onChange={handleInputChange}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="scaling_potential">Scaling Potential</Label>
                      <Textarea
                        id="scaling_potential"
                        name="scaling_potential"
                        value={formData.scaling_potential}
                        onChange={handleInputChange}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="competition">Competition</Label>
                      <Textarea
                        id="competition"
                        name="competition"
                        value={formData.competition}
                        onChange={handleInputChange}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="leadership_team">Leadership Team</Label>
                      <Textarea
                        id="leadership_team"
                        name="leadership_team"
                        value={formData.leadership_team}
                        onChange={handleInputChange}
                        required
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="team_size">Team Size</Label>
                        <Select
                          value={formData.team_size}
                          onValueChange={(value) => handleSelectChange("team_size", value)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select team size" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="solo">Solo Founder</SelectItem>
                            <SelectItem value="small">Small Team (2-10)</SelectItem>
                            <SelectItem value="large">Large Team (10+)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="location">Location</Label>
                        <Input
                          id="location"
                          name="location"
                          value={formData.location}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="startup_website">Startup Website</Label>
                      <Input
                        id="startup_website"
                        name="startup_website"
                        type="url"
                        value={formData.startup_website}
                        onChange={handleInputChange}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="pith_deck">Upload Pitch Deck</Label>
                      <Input id="pith_deck" type="file" accept=".pdf" onChange={handlePitchDeckUpload} />
                      {startupData.pith_deck && (
                        <p className="text-sm text-muted-foreground mt-1">
                          Current file:{" "}
                          <a href={startupData.pith_deck} className="text-primary hover:underline">
                            View pitch deck
                          </a>
                        </p>
                      )}
                    </div>

                    <Button type="submit" className="w-full" disabled={loading}>
                      {loading ? "Saving..." : "Save Profile"}
                      {!loading && <Save className="ml-2 h-4 w-4" />}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            ) : (
              <Tabs defaultValue="overview" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="business">Business</TabsTrigger>
                  <TabsTrigger value="team">Team & Funding</TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-2xl">{startupData.startup_name}</CardTitle>
                      <CardDescription className="flex items-center gap-2">
                        <Badge>{startupData.funding_stage}</Badge>
                        <Badge variant="outline">{startupData.industry}</Badge>
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <h3 className="font-medium flex items-center">
                          <Target className="h-4 w-4 mr-2" />
                          Mission
                        </h3>
                        <p className="mt-1 text-muted-foreground">{startupData.mission_statement}</p>
                      </div>

                      <Separator />

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <h3 className="font-medium flex items-center">
                            <Globe className="h-4 w-4 mr-2" />
                            Website
                          </h3>
                          <a
                            href={startupData.startup_website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-1 text-primary hover:underline block"
                          >
                            {startupData.startup_website}
                          </a>
                        </div>

                        <div>
                          <h3 className="font-medium flex items-center">
                            <MapPin className="h-4 w-4 mr-2" />
                            Location
                          </h3>
                          <p className="mt-1 text-muted-foreground">{startupData.location}</p>
                        </div>
                      </div>

                      <Separator />

                      <div>
                        <h3 className="font-medium flex items-center">
                          <TrendingUp className="h-4 w-4 mr-2" />
                          Traction
                        </h3>
                        <p className="mt-1 text-muted-foreground">{startupData.traction}</p>
                      </div>

                      <div>
                        <h3 className="font-medium flex items-center">
                          <FileText className="h-4 w-4 mr-2" />
                          Pitch Deck
                        </h3>
                        {startupData.pith_deck ? (
                          <a
                            href={startupData.pith_deck}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-1 inline-flex items-center text-primary hover:underline"
                          >
                            View Pitch Deck <ChevronRight className="h-4 w-4 ml-1" />
                          </a>
                        ) : (
                          <p className="mt-1 text-muted-foreground">No pitch deck uploaded</p>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="business" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Business Model & Market</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div>
                        <h3 className="font-medium">Business Model</h3>
                        <p className="mt-1 text-muted-foreground">{startupData.bussiness_model}</p>
                      </div>

                      <Separator />

                      <div>
                        <h3 className="font-medium">Revenue Streams</h3>
                        <p className="mt-1 text-muted-foreground">{startupData.revenue_streams}</p>
                      </div>

                      <Separator />

                      <div>
                        <h3 className="font-medium">Scaling Potential</h3>
                        <p className="mt-1 text-muted-foreground">{startupData.scaling_potential}</p>
                      </div>

                      <Separator />

                      <div>
                        <h3 className="font-medium">Competition</h3>
                        <p className="mt-1 text-muted-foreground">{startupData.competition}</p>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="team" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Team & Funding</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div>
                        <h3 className="font-medium flex items-center">
                          <Users className="h-4 w-4 mr-2" />
                          Leadership Team
                        </h3>
                        <p className="mt-1 text-muted-foreground">{startupData.leadership_team}</p>
                      </div>

                      <div>
                        <h3 className="font-medium flex items-center">
                          <Briefcase className="h-4 w-4 mr-2" />
                          Team Size
                        </h3>
                        <p className="mt-1 text-muted-foreground">
                          {startupData.team_size === "solo"
                            ? "Solo Founder"
                            : startupData.team_size === "small"
                              ? "Small Team (2-10)"
                              : "Large Team (10+)"}
                        </p>
                      </div>

                      <Separator />

                      <div>
                        <h3 className="font-medium flex items-center">
                          <DollarSign className="h-4 w-4 mr-2" />
                          Funding Required
                        </h3>
                        <p className="mt-1 text-muted-foreground">${startupData.fund_required}</p>
                      </div>

                      <div>
                        <h3 className="font-medium flex items-center">
                          <BarChart className="h-4 w-4 mr-2" />
                          Fund Allocation
                        </h3>
                        <p className="mt-1 text-muted-foreground">{startupData.funding_allocation}</p>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            )}
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}


