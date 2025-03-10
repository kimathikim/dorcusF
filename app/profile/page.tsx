"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";

export default function ProfilePage() {
  const searchParams = useSearchParams();
  const role = searchParams.get("role"); // Get role from query params

  // Founder Fields
  const [startupName, setStartupName] = useState("");
  const [startupIndustry, setStartupIndustry] = useState("");
  const [fundingStage, setFundingStage] = useState("");
  const [fundingRequired, setFundingRequired] = useState("");
  const [startupDescription, setStartupDescription] = useState("");
  const [startupWebsite, setStartupWebsite] = useState("");
  const [startupLocation, setStartupLocation] = useState("");
  const [teamSize, setTeamSize] = useState("");
  const [pitchDeck, setPitchDeck] = useState<File | null>(null);

  // Investor Fields
  const [investorType, setInvestorType] = useState("");
  const [investmentMin, setInvestmentMin] = useState("");
  const [investmentMax, setInvestmentMax] = useState("");
  const [investmentStrategy, setInvestmentStrategy] = useState("");
  const [experienceLevel, setExperienceLevel] = useState("");
  const [investmentDuration, setInvestmentDuration] = useState("");
  const [selectedIndustries, setSelectedIndustries] = useState<string[]>([]);
  const [regionsOfInterest, setRegionsOfInterest] = useState<string[]>([]);

  const industries = ["Technology", "Healthcare", "Finance", "Education", "E-commerce", "Clean Energy", "AI/ML", "Blockchain", "SaaS", "Consumer Apps"];
  const fundingStages = ["Pre-seed", "Seed", "Series A", "Series B", "Series C+"];
  const regions = ["North America", "Europe", "Asia", "Africa", "South America"];

  const handleIndustryChange = (industry: string) => {
    setSelectedIndustries(prev =>
      prev.includes(industry) ? prev.filter(i => i !== industry) : [...prev, industry]
    );
  };

  const handleRegionChange = (region: string) => {
    setRegionsOfInterest(prev =>
      prev.includes(region) ? prev.filter(i => i !== region) : [...prev, region]
    );
  };

  const handlePitchDeckUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setPitchDeck(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    alert("Profile updated successfully!");
  };

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1 flex items-center justify-center py-12 px-4">
        <div className="w-full max-w-md">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-center">
                {role === "founder" ? "Complete Your Startup Profile" : "Complete Your Investor Profile"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                {role === "founder" ? (
                  <>
                    <Label>Startup Name</Label>
                    <Input placeholder="Startup XYZ" value={startupName} onChange={(e) => setStartupName(e.target.value)} required />

                    <Label>Industry</Label>
                    <Select value={startupIndustry} onValueChange={setStartupIndustry}>
                      <SelectTrigger><SelectValue placeholder="Select industry" /></SelectTrigger>
                      <SelectContent>
                        {industries.map(ind => <SelectItem key={ind} value={ind}>{ind}</SelectItem>)}
                      </SelectContent>
                    </Select>

                    <Label>Funding Stage</Label>
                    <Select value={fundingStage} onValueChange={setFundingStage}>
                      <SelectTrigger><SelectValue placeholder="Select stage" /></SelectTrigger>
                      <SelectContent>
                        {fundingStages.map(stage => <SelectItem key={stage} value={stage}>{stage}</SelectItem>)}
                      </SelectContent>
                    </Select>

                    <Label>Funding Required ($)</Label>
                    <Input type="number" placeholder="Amount in USD" value={fundingRequired} onChange={(e) => setFundingRequired(e.target.value)} required />

                    <Label>Brief Description</Label>
                    <Textarea placeholder="Describe your startup..." value={startupDescription} onChange={(e) => setStartupDescription(e.target.value)} required />

                    <Label>Startup Website</Label>
                    <Input type="url" placeholder="https://yourstartup.com" value={startupWebsite} onChange={(e) => setStartupWebsite(e.target.value)} />

                    <Label>Location</Label>
                    <Input placeholder="Country, City" value={startupLocation} onChange={(e) => setStartupLocation(e.target.value)} />

                    <Label>Team Size</Label>
                    <Select value={teamSize} onValueChange={setTeamSize}>
                      <SelectTrigger><SelectValue placeholder="Select team size" /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="solo">Solo Founder</SelectItem>
                        <SelectItem value="small">Small Team (2-10)</SelectItem>
                        <SelectItem value="large">Large Team (10+)</SelectItem>
                      </SelectContent>
                    </Select>

                    <Label>Upload Pitch Deck</Label>
                    <Input type="file" accept=".pdf" onChange={handlePitchDeckUpload} />
                  </>
                ) : (
                  <>
                    <Label>Investor Type</Label>
                    <Select value={investorType} onValueChange={setInvestorType}>
                      <SelectTrigger><SelectValue placeholder="Select type" /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="angel">Angel Investor</SelectItem>
                        <SelectItem value="vc">Venture Capitalist</SelectItem>
                        <SelectItem value="corporate">Corporate Investor</SelectItem>
                      </SelectContent>
                    </Select>

                    <Label>Preferred Funding Stage</Label>
                    <Select value={fundingStage} onValueChange={setFundingStage}>
                      <SelectTrigger><SelectValue placeholder="Select stage" /></SelectTrigger>
                      <SelectContent>
                        {fundingStages.map(stage => <SelectItem key={stage} value={stage}>{stage}</SelectItem>)}
                      </SelectContent>
                    </Select>

                    <Label>Investment Range ($)</Label>
                    <div className="flex gap-4">
                      <Input type="number" placeholder="Min ($)" value={investmentMin} onChange={(e) => setInvestmentMin(e.target.value)} />
                      <Input type="number" placeholder="Max ($)" value={investmentMax} onChange={(e) => setInvestmentMax(e.target.value)} />
                    </div>

                    <Label>Preferred Regions</Label>
                    <div className="grid grid-cols-2 gap-2">
                      {regions.map(region => (
                        <div key={region} className="flex items-center space-x-2">
                          <Checkbox checked={regionsOfInterest.includes(region)} onCheckedChange={() => handleRegionChange(region)} />
                          <label className="text-sm">{region}</label>
                        </div>
                      ))}
                    </div>
                  </>
                )}
                <Button type="submit" className="w-full">Save Profile</Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}

