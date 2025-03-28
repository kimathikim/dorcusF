"use client";
import { API_BASE_URL } from "@/lib/api-config";

import { useState, useEffect } from "react";
import DashboardShell from "@/components/dashboard-shell"
import { useRouter } from "next/navigation";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Mail,
  Briefcase,
  MapPin,
  Globe,
  Users,
  Edit,
  Save,
  ChevronRight,
} from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";

// Mock user data (for sidebar); in a real app, this comes from your auth system.
const mockUserData = {
  name: "John Doe",
  email: "john@investorco.com",
  roles: ["Investor"],
  avatarUrl: "/placeholder.svg?height=100&width=100",
  joinedDate: "March 2023",
};

export default function InvestorProfilePage() {
  const router = useRouter();
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setLoading] = useState(true);

  // User info (for sidebar)
  const [userData, setUserData] = useState(mockUserData);

  // Investor profile data state
  const [investorData, setInvestorData] = useState({
    investment_portfolio: [] as string[], // used for both portfolio and preferred industries here
    total_invested: 0,
    investor_type: "",
    thesis: "",
    preferred_funding_stage: "",
    investment_range: "",
    investment_frequency: "",
    risk_tolerance: "",
    exit_strategy: "",
    preferred_industries: [] as string[],
    preferred_regions: [] as string[],
  });

  // Form state for editing (pre-filled with investorData)
  const [formData, setFormData] = useState({ ...investorData });
  // For investment range editing, we break it into min and max
  const [investmentMin, setInvestmentMin] = useState("");
  const [investmentMax, setInvestmentMax] = useState("");

  // Options for dropdowns and checkboxes
  const investorTypes = ["Angel Investor", "Venture Capitalist", "Corporate Investor", "Family Office"];
  const fundingStages = ["Pre-seed", "Seed", "Series A", "Series B", "Series C+"];
  const investmentFrequencies = ["Once a year", "Twice a year", "Quarterly", "Monthly"];
  const riskLevels = ["Low Risk", "Moderate Risk", "High Risk"];
  const exitStrategies = ["3-5 Years", "5-10 Years", "10+ Years", "IPO", "Mergers & Acquisitions"];
  const industries = ["Technology", "Healthcare", "Finance", "Education", "E-commerce", "Clean Energy", "AI/ML", "Blockchain", "SaaS", "Consumer Apps"];
  const regions = ["North America", "Europe", "Asia", "Africa", "South America"];

  // Load user data from localStorage
  useEffect(() => {
    const storedUserData = localStorage.getItem("userData")
    if (storedUserData) {
      try {
        const parsedUserData = JSON.parse(storedUserData)
        setUserData({
          name: parsedUserData.firstName && parsedUserData.lastName 
            ? `${parsedUserData.firstName} ${parsedUserData.lastName}`
            : parsedUserData.name || "User",
          email: parsedUserData.email || "",
          roles: parsedUserData.roles || ["Investor"],
          avatarUrl: parsedUserData.avatar || "/placeholder.svg?height=100&width=100",
          joinedDate: parsedUserData.joinedDate || "March 2023",
        })
      } catch (error) {
        console.error("Error parsing user data:", error)
      }
    }
  }, [])

  // Fetch investor profile data on mount
  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const token = localStorage.getItem("authToken");
        const response = await fetch(`${API_BASE_URL}/investor/profile`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (response.ok) {
          const data = await response.json();
          // Assume data.investment_range is stored as "min-max"
          if (data.investment_range) {
            const [min, max] = data.investment_range.split("-");
            setInvestmentMin(min);
            setInvestmentMax(max);
          }
          if (data.preferred_industries === null) {
            data.preferred_industries = [];
          }
          if (data.preferred_regions === null) {
            data.preferred_regions = [];
          }
          setInvestorData(data);
          setFormData(data);
        }
      } catch (error) {
        console.error("Error fetching investor profile:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProfileData();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (list: string[], setList: (items: string[]) => void, item: string) => {
    setList(list.includes(item) ? list.filter((i) => i !== item) : [...list, item]);
  };

  const handleInvestmentMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInvestmentMin(e.target.value);
  };

  const handleInvestmentMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInvestmentMax(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Prepare payload with correct field names to match backend
    const payload = {
      total_invested: parseFloat(String(formData.total_invested || "0")),
      // Combine investment min and max into a single range string
      investment_range: `${investmentMin}-${investmentMax}`,
      investor_type: formData.investor_type,
      thesis: formData.thesis,
      preferred_funding_stage: formData.preferred_funding_stage,
      investment_frequency: formData.investment_frequency,
      risk_tolerance: formData.risk_tolerance,
      exit_strategy: formData.exit_strategy,
      preferred_industries: formData.preferred_industries,
      preferred_regions: formData.preferred_regions,
    };

    try {
      const response = await fetch(`${API_BASE_URL}/investor/profile`, {
        method: "PATCH",
        body: JSON.stringify(payload),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      });
      
      if (response.ok) {
        toast({
          title: "Success",
          description: "Your investor profile has been updated successfully!",
        });
        setIsEditing(false);
        // Refresh data after update
        const fetchProfileData = async () => {
          try {
            const token = localStorage.getItem("authToken");
            const response = await fetch(`${API_BASE_URL}/investor/profile`, {
              headers: { Authorization: `Bearer ${token}` },
            });
            if (response.ok) {
              const data = await response.json();
              // Assume data.investment_range is stored as "min-max"
              if (data.investment_range) {
                const [min, max] = data.investment_range.split("-");
                setInvestmentMin(min);
                setInvestmentMax(max);
              }
              if (data.preferred_industries === null) {
                data.preferred_industries = [];
              }
              if (data.preferred_regions === null) {
                data.preferred_regions = [];
              }
              setInvestorData(data);
              setFormData(data);
            }
          } catch (error) {
            console.error("Error fetching investor profile:", error);
          }
        };
        fetchProfileData();
      } else {
        const errorData = await response.json();
        toast({
          title: "Failed",
          description: `Failed to update profile: ${errorData.error || errorData.message || "Unknown error"}`,
        });
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      toast({
        title: "Error",
        description: "An error occurred while updating the profile.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (

    <DashboardShell userType="investor">
    <div className="flex min-h-screen flex-col">
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
                    <h3 className="text-sm font-medium text-muted-foreground mb-2">Investor Type</h3>
                    <p className="font-medium">{investorData.investor_type}</p>
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

          {/* Main Content - Investor Profile */}
          <div className="md:col-span-2">
            {isEditing ? (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Edit className="h-5 w-5 mr-2" />
                    Edit Your Investor Profile
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Row 1: Investor Type */}
                    <div className="space-y-2">
                      <Label htmlFor="investor_type">Investor Type</Label>
                      <Select
                        value={formData.investor_type}
                        onValueChange={(value) => handleSelectChange("investor_type", value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select investor type" />
                        </SelectTrigger>
                        <SelectContent>
                          {investorTypes.map((type) => (
                            <SelectItem key={type} value={type}>
                              {type}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Row 2: Investment Thesis */}
                    <div className="space-y-2">
                      <Label htmlFor="thesis">Investment Thesis</Label>
                      <Textarea
                        id="thesis"
                        name="thesis"
                        placeholder="Describe your investment philosophy..."
                        value={formData.thesis}
                        onChange={handleInputChange}
                        required
                      />
                    </div>

                    {/* Row 3: Preferred Funding Stage */}
                    <div className="space-y-2">
                      <Label htmlFor="preferred_funding_stage">Preferred Funding Stage</Label>
                      <Select
                        value={formData.preferred_funding_stage}
                        onValueChange={(value) => handleSelectChange("preferred_funding_stage", value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select funding stage" />
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

                    {/* Investment Range */}
                    <div className="space-y-2">
                      <Label>Investment Range</Label>
                      <div className="flex items-center gap-2">
                        <div className="flex-1">
                          <Label htmlFor="investmentMin" className="text-sm">Minimum ($)</Label>
                          <Input
                            id="investmentMin"
                            type="number"
                            value={investmentMin}
                            onChange={handleInvestmentMinChange}
                            placeholder="Min investment"
                          />
                        </div>
                        <span className="mt-6">-</span>
                        <div className="flex-1">
                          <Label htmlFor="investmentMax" className="text-sm">Maximum ($)</Label>
                          <Input
                            id="investmentMax"
                            type="number"
                            value={investmentMax}
                            onChange={handleInvestmentMaxChange}
                            placeholder="Max investment"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Row 5: Investment Frequency */}
                    <div className="space-y-2">
                      <Label htmlFor="investment_frequency">Investment Frequency</Label>
                      <Select
                        value={formData.investment_frequency}
                        onValueChange={(value) => handleSelectChange("investment_frequency", value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select frequency" />
                        </SelectTrigger>
                        <SelectContent>
                          {investmentFrequencies.map((freq) => (
                            <SelectItem key={freq} value={freq}>
                              {freq}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Row 6: Risk Tolerance */}
                    <div className="space-y-2">
                      <Label htmlFor="risk_tolerance">Risk Tolerance</Label>
                      <Select
                        value={formData.risk_tolerance}
                        onValueChange={(value) => handleSelectChange("risk_tolerance", value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select risk level" />
                        </SelectTrigger>
                        <SelectContent>
                          {riskLevels.map((level) => (
                            <SelectItem key={level} value={level}>
                              {level}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Row 7: Exit Strategy */}
                    <div className="space-y-2">
                      <Label htmlFor="exit_strategy">Exit Strategy</Label>
                      <Select
                        value={formData.exit_strategy}
                        onValueChange={(value) => handleSelectChange("exit_strategy", value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select exit strategy" />
                        </SelectTrigger>
                        <SelectContent>
                          {exitStrategies.map((strategy) => (
                            <SelectItem key={strategy} value={strategy}>
                              {strategy}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Row 8: Preferred Industries */}
                    <div className="space-y-2">
                      <Label>Preferred Industries</Label>
                      <div className="grid grid-cols-2 gap-2">
                        {industries.map((ind) => (
                          <div key={ind} className="flex items-center space-x-2">
                            <Checkbox
                              checked={formData.preferred_industries.includes(ind)}
                              onCheckedChange={() =>
                                handleCheckboxChange(formData.preferred_industries, (items) =>
                                  setFormData((prev) => ({ ...prev, preferred_industries: items }))
                                  , ind)
                              }
                            />
                            <span className="text-sm">{ind}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Row 9: Preferred Regions */}
                    <div className="space-y-2">
                      <Label>Preferred Regions</Label>
                      <div className="grid grid-cols-2 gap-2">
                        {regions.map((reg) => (
                          <div key={reg} className="flex items-center space-x-2">
                            <Checkbox
                              checked={formData.preferred_regions.includes(reg)}
                              onCheckedChange={() =>
                                handleCheckboxChange(formData.preferred_regions, (items) =>
                                  setFormData((prev) => ({ ...prev, preferred_regions: items }))
                                  , reg)
                              }
                            />
                            <span className="text-sm">{reg}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <Button type="submit" className="w-full" disabled={isLoading}>
                      {isLoading ? "Saving..." : "Save Profile"}
                      {!isLoading && <Save className="ml-2 h-4 w-4" />}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            ) : (
              <Tabs defaultValue="overview" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="strategy">Strategy</TabsTrigger>
                  <TabsTrigger value="preferences">Preferences</TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-2xl">{investorData.investor_type}</CardTitle>
                      <CardDescription className="flex items-center gap-2">
                        <Badge>{investorData.preferred_funding_stage}</Badge>
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <h3 className="font-medium">Investment Thesis</h3>
                        <p className="mt-1 text-muted-foreground">{investorData.thesis}</p>
                      </div>
                      <Separator />
                      <div>
                        <h3 className="font-medium flex items-center">
                          <Globe className="h-4 w-4 mr-2" />
                          Investment Range
                        </h3>
                        <p className="mt-1 text-muted-foreground">{investorData.investment_range}</p>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="strategy" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Investment Frequency & Risk</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <h3 className="font-medium">Investment Frequency</h3>
                        <p className="mt-1 text-muted-foreground">{investorData.investment_frequency}</p>
                      </div>
                      <Separator />
                      <div>
                        <h3 className="font-medium">Risk Tolerance</h3>
                        <p className="mt-1 text-muted-foreground">{investorData.risk_tolerance}</p>
                      </div>
                      <Separator />
                      <div>
                        <h3 className="font-medium">Exit Strategy</h3>
                        <p className="mt-1 text-muted-foreground">{investorData.exit_strategy}</p>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="preferences" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Preferred Industries & Regions</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <h3 className="font-medium">Preferred Industries</h3>
                        <p className="mt-1 text-muted-foreground">{investorData.preferred_industries.join(", ")}</p>
                      </div>
                      <Separator />
                      <div>
                        <h3 className="font-medium">Preferred Regions</h3>
                        <p className="mt-1 text-muted-foreground">{investorData.preferred_regions.join(", ")}</p>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            )}
          </div>
        </div>
      </main>
    </div>
    </DashboardShell>
  );
}


