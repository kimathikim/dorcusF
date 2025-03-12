"use client";

import { useState } from "react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function FounderProfilePage() {
  const [startupName, setStartupName] = useState("");
  const [mission, setMission] = useState("");
  const [startupIndustry, setStartupIndustry] = useState("");
  const [fundingStage, setFundingStage] = useState("");
  const [fundingRequired, setFundingRequired] = useState("");
  const [startupDescription, setStartupDescription] = useState("");
  const [businessModel, setBusinessModel] = useState("");
  const [revenueStreams, setRevenueStreams] = useState("");
  const [traction, setTraction] = useState("");
  const [scalingPotential, setScalingPotential] = useState("");
  const [competition, setCompetition] = useState("");
  const [startupWebsite, setStartupWebsite] = useState("");
  const [startupLocation, setStartupLocation] = useState("");
  const [teamSize, setTeamSize] = useState("");
  const [leadershipTeam, setLeadershipTeam] = useState("");
  const [fundAllocation, setFundAllocation] = useState("");
  const [pitchDeck, setPitchDeck] = useState<File | null>(null);

  const industries = ["Technology", "Healthcare", "Finance", "Education", "E-commerce", "AI/ML", "Blockchain", "SaaS", "Consumer Apps"];
  const fundingStages = ["Pre-seed", "Seed", "Series A", "Series B", "Series C+"];

  const handlePitchDeckUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setPitchDeck(e.target.files[0]);
    }
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    if (pitchDeck) {
      formData.append("pitch_deck", pitchDeck);
    }
    formData.append("data", JSON.stringify({
      startup_name: startupName,
      mission_statement: mission,
      industry: startupIndustry,
      funding_stage: fundingStage,
      funding_allocation: fundAllocation,
      business_model: businessModel,
      revenue_streams: revenueStreams,
      traction: traction,
      scaling_potential: scalingPotential,
      competition: competition,
      leadership_team: leadershipTeam,
      team_size: parseInt(teamSize),
      location: startupLocation,
      startup_website: startupWebsite,
    }));

    try {
      const response = await fetch("http://127.0.0.1:8080/api/v1/founder/profile", {
        method: "PATCH",
        body: formData,
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("authToken")}`,
        },
      });

      if (response.ok) {
        //redirect to dashboard

        alert("Founder Profile updated successfully!");
        return window.location.href = "/dashboard/founder";
      } else {
        alert("Failed to update profile.");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("An error occurred while updating the profile.");
    }
  };
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1 flex items-center justify-center py-12 px-4">
        <div className="w-full max-w-md">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-center">Complete Your Startup Profile</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">

                {/* Startup Name & Mission */}
                <Label>Startup Name</Label>
                <Input placeholder="Startup XYZ" value={startupName} onChange={(e) => setStartupName(e.target.value)} required />

                <Label>Mission Statement</Label>
                <Textarea placeholder="What is your startup's purpose?" value={mission} onChange={(e) => setMission(e.target.value)} required />

                {/* Industry & Funding Stage */}
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

                {/* Funding Required */}
                <Label>Funding Required ($)</Label>
                <Input type="number" placeholder="Amount in USD" value={fundingRequired} onChange={(e) => setFundingRequired(e.target.value)} required />

                <Label>Fund Allocation</Label>
                <Textarea placeholder="How will you use the funds?" value={fundAllocation} onChange={(e) => setFundAllocation(e.target.value)} required />

                {/* Business Model */}
                <Label>Business Model</Label>
                <Textarea placeholder="How does your startup generate revenue?" value={businessModel} onChange={(e) => setBusinessModel(e.target.value)} required />

                <Label>Revenue Streams</Label>
                <Textarea placeholder="Describe your revenue channels" value={revenueStreams} onChange={(e) => setRevenueStreams(e.target.value)} required />

                {/* Market Fit */}
                <Label>Traction (Growth, Users, Revenue, etc.)</Label>
                <Textarea placeholder="Key traction metrics (e.g., 10,000+ active users, $100K monthly revenue)" value={traction} onChange={(e) => setTraction(e.target.value)} required />

                <Label>Scaling Potential</Label>
                <Textarea placeholder="How big can this grow?" value={scalingPotential} onChange={(e) => setScalingPotential(e.target.value)} required />

                <Label>Competition</Label>
                <Textarea placeholder="Who are your competitors?" value={competition} onChange={(e) => setCompetition(e.target.value)} required />

                {/* Team & Location */}
                <Label>Leadership Team</Label>
                <Textarea placeholder="Who are the key members and their experience?" value={leadershipTeam} onChange={(e) => setLeadershipTeam(e.target.value)} required />

                <Label>Team Size</Label>
                <Select value={teamSize} onValueChange={setTeamSize}>
                  <SelectTrigger><SelectValue placeholder="Select team size" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="solo">Solo Founder</SelectItem>
                    <SelectItem value="small">Small Team (2-10)</SelectItem>
                    <SelectItem value="large">Large Team (10+)</SelectItem>
                  </SelectContent>
                </Select>

                <Label>Location</Label>
                <Input placeholder="Country, City" value={startupLocation} onChange={(e) => setStartupLocation(e.target.value)} />

                <Label>Startup Website</Label>
                <Input type="url" placeholder="https://yourstartup.com" value={startupWebsite} onChange={(e) => setStartupWebsite(e.target.value)} />

                {/* Pitch Deck */}
                <Label>Upload Pitch Deck</Label>
                <Input type="file" accept=".pdf" onChange={handlePitchDeckUpload} />

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

