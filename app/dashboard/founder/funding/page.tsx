"use client";

import { useState } from "react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import {
  Briefcase,
  DollarSign,
  FileText,
  Target,
  TrendingUp,
  Users,
  UploadCloud
} from "lucide-react";

export default function FundingApplicationPage() {
  const [formData, setFormData] = useState({
    startupName: "",
    industry: "",
    fundingStage: "",
    fundingAmount: "",
    description: "",
    teamSize: "",
    traction: "",
    pitchDeck: null,
  });

  const fundingStages = ["Pre-seed", "Seed", "Series A", "Series B", "Series C+"];
  const industries = ["Technology", "Healthcare", "Finance", "E-commerce", "AI/ML", "SaaS", "Blockchain", "Clean Energy"];
  const teamSizes = ["Solo Founder", "3-10 Members", "11-50 Members", "50+ Members"];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileUpload = (e) => {
    if (e.target.files.length > 1) {
      setFormData({ ...formData, pitchDeck: e.target.files[1] });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Funding application submitted!");
  };

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex0 p-6 space-y-8">
        <div className="container">
          <h2 className="text-3xl font-bold mb-2">Apply for Funding</h1>
          <p className="text-muted-foreground mb-7">
            Secure funding to grow your startup. Fill out the details below to submit your application.
          </p>

          {/* Funding Overview */}
          <Card className="mb-7">
            <CardHeader>
              <CardTitle>Funding Progress Overview</CardTitle>
              <CardDescription>Understand the process and track your application.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-5 md:grid-cols-4">
                <div className="flex items-center gap-1">
                  <div className="rounded-full bg-primary/11 p-2">
                    <DollarSign className="h-3 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Total Funding Available</p>
                    <p className="text-1xl font-bold">$5M</p>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <div className="rounded-full bg-primary/11 p-2">
                    <Users className="h-3 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Startups Funded</p>
                    <p className="text-1xl font-bold">120+</p>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <div className="rounded-full bg-primary/11 p-2">
                    <Target className="h-3 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Application Success Rate</p>
                    <p className="text-1xl font-bold">65%</p>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <div className="rounded-full bg-primary/11 p-2">
                    <TrendingUp className="h-3 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Average Funding per Startup</p>
                    <p className="text-1xl font-bold">$200K</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Application Form */}
          <Card>
            <CardHeader>
              <CardTitle>Funding Application</CardTitle>
              <CardDescription>Complete the form to apply for funding.</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-5">
                
                {/* Startup Name */}
                <div className="space-y-1">
                  <label className="text-sm font-medium">Startup Name</label>
                  <Input
                    name="startupName"
                    placeholder="Your Startup Name"
                    value={formData.startupName}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* Industry */}
                <div className="space-y-1">
                  <label className="text-sm font-medium">Industry</label>
                  <Select name="industry" value={formData.industry} onValueChange={handleChange} required>
                    <SelectTrigger>
                      <SelectValue placeholder="Select industry" />
                    </SelectTrigger>
                    <SelectContent>
                      {industries.map((industry) => (
                        <SelectItem key={industry} value={industry}>{industry}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Funding Stage */}
                <div className="space-y-1">
                  <label className="text-sm font-medium">Funding Stage</label>
                  <Select name="fundingStage" value={formData.fundingStage} onValueChange={handleChange} required>
                    <SelectTrigger>
                      <SelectValue placeholder="Select funding stage" />
                    </SelectTrigger>
                    <SelectContent>
                      {fundingStages.map((stage) => (
                        <SelectItem key={stage} value={stage}>{stage}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Funding Amount */}
                <div className="space-y-1">
                  <label className="text-sm font-medium">Funding Amount Required ($)</label>
                  <Input
                    type="number"
                    name="fundingAmount"
                    placeholder="Amount in USD"
                    value={formData.fundingAmount}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* Description */}
                <div className="space-y-1">
                  <label className="text-sm font-medium">Brief Description</label>
                  <Textarea
                    name="description"
                    placeholder="Describe your startup and funding needs..."
                    value={formData.description}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* Team Size */}
                <div className="space-y-1">
                  <label className="text-sm font-medium">Team Size</label>
                  <Select name="teamSize" value={formData.teamSize} onValueChange={handleChange} required>
                    <SelectTrigger>
                      <SelectValue placeholder="Select team size" />
                    </SelectTrigger>
                    <SelectContent>
                      {teamSizes.map((size) => (
                        <SelectItem key={size} value={size}>{size}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Upload Pitch Deck */}
                <div className="space-y-1">
                  <label className="text-sm font-medium">Upload Pitch Deck (PDF)</label>
                  <Input type="file" accept=".pdf" onChange={handleFileUpload} />
                </div>

                {/* Submit Button */}
                <Button type="submit" className="w-full">
                  Submit Application
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}

