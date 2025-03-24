import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { ArrowRight, BarChart3, Briefcase, Lightbulb, LineChart, Users, BookOpen, Calendar, MessageSquare, Shield, Zap } from "lucide-react";

export default function FeaturesPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">Platform Features</h1>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Discover the powerful tools and features that make fundMe the leading platform for connecting startups and investors.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-background">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardHeader className="flex flex-row items-center gap-4 pb-2">
                  <Users className="h-8 w-8 text-primary" />
                  <CardTitle className="text-xl">Investor Matching</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    Our AI-powered algorithm connects founders with the most suitable investors based on industry, stage, and goals. Get matched with investors who truly understand your vision and can provide the right support.
                  </CardDescription>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center gap-4 pb-2">
                  <Lightbulb className="h-8 w-8 text-primary" />
                  <CardTitle className="text-xl">Learning Resources</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    Access a comprehensive library of articles, videos, and templates to help you navigate the startup ecosystem. Learn from industry experts and successful founders about fundraising, scaling, and more.
                  </CardDescription>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center gap-4 pb-2">
                  <LineChart className="h-8 w-8 text-primary" />
                  <CardTitle className="text-xl">Progress Tracking</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    Monitor your fundraising journey with visual analytics and milestone tracking to stay on target. Set goals, track your progress, and celebrate your achievements along the way.
                  </CardDescription>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center gap-4 pb-2">
                  <Briefcase className="h-8 w-8 text-primary" />
                  <CardTitle className="text-xl">Deal Flow Management</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    Investors can efficiently manage their pipeline of potential investments with our intuitive deal flow tools. Organize startups by stage, set reminders for follow-ups, and make informed investment decisions.
                  </CardDescription>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center gap-4 pb-2">
                  <BarChart3 className="h-8 w-8 text-primary" />
                  <CardTitle className="text-xl">Analytics Dashboard</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    Gain insights into your performance with detailed analytics and customizable reports. Track key metrics, identify trends, and optimize your strategy based on data-driven insights.
                  </CardDescription>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center gap-4 pb-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-8 w-8 text-primary"
                  >
                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                  </svg>
                  <CardTitle className="text-xl">Community Network</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    Connect with a global community of founders and investors to share knowledge and opportunities. Participate in discussions, ask questions, and build valuable relationships.
                  </CardDescription>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center gap-4 pb-2">
                  <BookOpen className="h-8 w-8 text-primary" />
                  <CardTitle className="text-xl">Pitch Deck Builder</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    Create professional pitch decks with our easy-to-use templates and guidance. Get feedback from our community and refine your pitch to attract the right investors.
                  </CardDescription>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center gap-4 pb-2">
                  <Calendar className="h-8 w-8 text-primary" />
                  <CardTitle className="text-xl">Event Management</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    Discover and register for relevant industry events, webinars, and pitch competitions. Network with potential investors and partners to grow your startup.
                  </CardDescription>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center gap-4 pb-2">
                  <MessageSquare className="h-8 w-8 text-primary" />
                  <CardTitle className="text-xl">Secure Messaging</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    Communicate directly with investors or founders through our secure messaging system. Share documents, schedule meetings, and build relationships in a professional environment.
                  </CardDescription>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center gap-4 pb-2">
                  <Shield className="h-8 w-8 text-primary" />
                  <CardTitle className="text-xl">Due Diligence Tools</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    Streamline the due diligence process with our comprehensive tools and templates. Investors can request and review documents securely, while founders can organize and share information efficiently.
                  </CardDescription>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center gap-4 pb-2">
                  <Zap className="h-8 w-8 text-primary" />
                  <CardTitle className="text-xl">Smart Notifications</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    Stay informed with personalized notifications about new matches, messages, events, and opportunities. Never miss an important update or deadline.
                  </CardDescription>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center gap-4 pb-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-8 w-8 text-primary"
                  >
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
                  </svg>
                  <CardTitle className="text-xl">Privacy & Security</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    Your data is protected with enterprise-grade security measures. Control what information is shared with whom, and maintain confidentiality throughout the fundraising process.
                  </CardDescription>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-primary px-3 py-1 text-sm text-primary-foreground">
                  How It Works
                </div>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
                  Simple process, powerful results
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Our platform is designed to make the fundraising and investment process as smooth and efficient as possible.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 md:grid-cols-2 mt-12">
              <div className="space-y-8">
                <h3 className="text-2xl font-bold">For Founders</h3>
                <div className="space-y-6">
                  <div className="flex gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground">
                      1
                    </div>
                    <div className="space-y-1">
                      <h4 className="text-xl font-bold">Create Your Profile</h4>
                      <p className="text-muted-foreground">
                        Sign up and build your startup profile with key information about your team, product, traction, and funding needs.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground">
                      2
                    </div>
                    <div className="space-y-1">
                      <h4 className="text-xl font-bold">Get Matched</h4>
                      <p className="text-muted-foreground">
                        Our algorithm will match you with investors who are interested in your industry, stage, and investment size.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground">
                      3
                    </div>
                    <div className="space-y-1">
                      <h4 className="text-xl font-bold">Connect & Pitch</h4>
                      <p className="text-muted-foreground">
                        Reach out to matched investors, share your pitch deck, and schedule meetings through our platform.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground">
                      4
                    </div>
                    <div className="space-y-1">
                      <h4 className="text-xl font-bold">Close the Deal</h4>
                      <p className="text-muted-foreground">
                        Use our tools to manage the due diligence process and track your progress toward closing the investment.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="space-y-8">
                <h3 className="text-2xl font-bold">For Investors</h3>
                <div className="space-y-6">
                  <div className="flex gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground">
                      1
                    </div>
                    <div className="space-y-1">
                      <h4 className="text-xl font-bold">Set Your Preferences</h4>
                      <p className="text-muted-foreground">
                        Create your investor profile with your investment thesis, focus areas, check size, and stage preferences.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground">
                      2
                    </div>
                    <div className="space-y-1">
                      <h4 className="text-xl font-bold">Discover Startups</h4>
                      <p className="text-muted-foreground">
                        Browse matched startups or search for specific opportunities using our advanced filters.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground">
                      3
                    </div>
                    <div className="space-y-1">
                      <h4 className="text-xl font-bold">Evaluate & Connect</h4>
                      <p className="text-muted-foreground">
                        Review startup profiles, request additional information, and connect with promising founders.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground">
                      4
                    </div>
                    <div className="space-y-1">
                      <h4 className="text-xl font-bold">Manage Investments</h4>
                      <p className="text-muted-foreground">
                        Track your deal flow, conduct due diligence, and manage your portfolio all in one place.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-primary text-primary-foreground">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                  Ready to experience these features?
                </h2>
                <p className="mx-auto max-w-[600px] text-primary-foreground/80 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Join fundMew today and transform how you fundraise or invest.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/signup">
                  <Button size="lg" variant="secondary" className="w-full sm:w-auto">
                    Get Started
                  </Button>
                </Link>
                <Link href="/pricing">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
                    View Pricing
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
