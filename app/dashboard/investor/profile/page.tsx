"use client";

import { useState } from "react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";

export default function InvestorProfilePage() {
  const [investorType, setInvestorType] = useState("");
  const [investmentThesis, setInvestmentThesis] = useState("");
  const [fundingStage, setFundingStage] = useState("");
  const [investmentFrequency, setInvestmentFrequency] = useState("");
  const [investmentMin, setInvestmentMin] = useState("");
  const [investmentMax, setInvestmentMax] = useState("");
  const [riskTolerance, setRiskTolerance] = useState("");
  const [exitStrategy, setExitStrategy] = useState("");
  const [selectedIndustries, setSelectedIndustries] = useState<string[]>([]);
  const [regionsOfInterest, setRegionsOfInterest] = useState<string[]>([]);

  const industries = ["Technology", "Healthcare", "Finance", "Education", "E-commerce", "Clean Energy", "AI/ML", "Blockchain", "SaaS", "Consumer Apps"];
  const fundingStages = ["Pre-seed", "Seed", "Series A", "Series B", "Series C+"];
  const riskLevels = ["Low Risk", "Moderate Risk", "High Risk"];
  const exitStrategies = ["3-5 Years", "5-10 Years", "10+ Years", "IPO", "Mergers & Acquisitions"];
  const investmentFrequencies = ["Once a year", "Twice a year", "Quarterly", "Monthly"];
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    alert("Investor Profile updated successfully!");
  };

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1 flex items-center justify-center py-12 px-4">
        <div className="w-full max-w-md">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-center">Complete Your Investor Profile</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                
                {/* Investor Type */}
                <Label>Investor Type</Label>
                <Select value={investorType} onValueChange={setInvestorType}>
                  <SelectTrigger><SelectValue placeholder="Select investor type" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="angel">Angel Investor</SelectItem>
                    <SelectItem value="vc">Venture Capitalist</SelectItem>
                    <SelectItem value="corporate">Corporate Investor</SelectItem>
                    <SelectItem value="family-office">Family Office</SelectItem>
                  </SelectContent>
                </Select>

                {/* Investment Thesis */}
                <Label>Investment Thesis (Your focus areas)</Label>
                <Textarea placeholder="Describe your investment philosophy..." value={investmentThesis} onChange={(e) => setInvestmentThesis(e.target.value)} required />

                {/* Preferred Funding Stage */}
                <Label>Preferred Funding Stage</Label>
                <Select value={fundingStage} onValueChange={setFundingStage}>
                  <SelectTrigger><SelectValue placeholder="Select funding stage" /></SelectTrigger>
                  <SelectContent>
                    {fundingStages.map(stage => <SelectItem key={stage} value={stage}>{stage}</SelectItem>)}
                  </SelectContent>
                </Select>

                {/* Investment Range */}
                <Label>Investment Range ($)</Label>
                <div className="flex gap-4">
                  <Input type="number" placeholder="Min ($)" value={investmentMin} onChange={(e) => setInvestmentMin(e.target.value)} />
                  <Input type="number" placeholder="Max ($)" value={investmentMax} onChange={(e) => setInvestmentMax(e.target.value)} />
                </div>

                {/* Investment Frequency */}
                <Label>Investment Frequency</Label>
                <Select value={investmentFrequency} onValueChange={setInvestmentFrequency}>
                  <SelectTrigger><SelectValue placeholder="How often do you invest?" /></SelectTrigger>
                  <SelectContent>
                    {investmentFrequencies.map(freq => <SelectItem key={freq} value={freq}>{freq}</SelectItem>)}
                  </SelectContent>
                </Select>

                {/* Risk Tolerance */}
                <Label>Risk Tolerance</Label>
                <Select value={riskTolerance} onValueChange={setRiskTolerance}>
                  <SelectTrigger><SelectValue placeholder="Select risk level" /></SelectTrigger>
                  <SelectContent>
                    {riskLevels.map(level => <SelectItem key={level} value={level}>{level}</SelectItem>)}
                  </SelectContent>
                </Select>

                {/* Exit Strategy */}
                <Label>Exit Strategy</Label>
                <Select value={exitStrategy} onValueChange={setExitStrategy}>
                  <SelectTrigger><SelectValue placeholder="Preferred exit strategy" /></SelectTrigger>
                  <SelectContent>
                    {exitStrategies.map(strategy => <SelectItem key={strategy} value={strategy}>{strategy}</SelectItem>)}
                  </SelectContent>
                </Select>

                {/* Preferred Industries */}
                <Label>Preferred Industries</Label>
                <div className="grid grid-cols-2 gap-2">
                  {industries.map(industry => (
                    <div key={industry} className="flex items-center space-x-2">
                      <Checkbox checked={selectedIndustries.includes(industry)} onCheckedChange={() => handleIndustryChange(industry)} />
                      <label className="text-sm">{industry}</label>
                    </div>
                  ))}
                </div>

                {/* Preferred Regions */}
                <Label>Preferred Regions</Label>
                <div className="grid grid-cols-2 gap-2">
                  {regions.map(region => (
                    <div key={region} className="flex items-center space-x-2">
                      <Checkbox checked={regionsOfInterest.includes(region)} onCheckedChange={() => handleRegionChange(region)} />
                      <label className="text-sm">{region}</label>
                    </div>
                  ))}
                </div>

                <Button type="submit" className="w-full">Save Profile</Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}

