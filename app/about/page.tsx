import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="space-y-4">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">About blackv</h1>
                <p className="max-w-[600px] text-muted-foreground md:text-xl">
                  We're on a mission to transform how startups and investors connect, making the fundraising process more efficient, transparent, and successful for everyone involved.
                </p>
              </div>
              <div className="flex justify-center">
                <img
                  alt="Team working together"
                  className="aspect-video overflow-hidden rounded-xl object-cover object-center"
                  height="310"
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1470&auto=format&fit=crop"
                  width="550"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-background">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-primary px-3 py-1 text-sm text-primary-foreground">
                  Our Mission
                </div>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
                  Bridging the gap between innovation and capital
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  blackv was founded in 2025 with a clear vision: to create a more efficient and equitable fundraising ecosystem. We believe that great ideas deserve the right backing, and smart capital deserves to find the most promising ventures.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3 lg:gap-12 mt-12">
              <Card className="bg-muted/50">
                <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
                  <div className="rounded-full bg-primary/10 p-4">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 text-primary">
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold">Trust</h3>
                  <p className="text-muted-foreground">
                    We build trust through transparency, data-driven insights, and a commitment to the success of all our users.
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-muted/50">
                <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
                  <div className="rounded-full bg-primary/10 p-4">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 text-primary">
                      <path d="M2 12h20" />
                      <path d="M12 2v20" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold">Innovation</h3>
                  <p className="text-muted-foreground">
                    We constantly innovate our platform to provide cutting-edge tools that make fundraising and investing more efficient.
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-muted/50">
                <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
                  <div className="rounded-full bg-primary/10 p-4">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 text-primary">
                      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                      <circle cx="9" cy="7" r="4" />
                      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold">Community</h3>
                  <p className="text-muted-foreground">
                    We foster a supportive community where founders and investors can learn, grow, and succeed together.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-primary px-3 py-1 text-sm text-primary-foreground">
                  Our Team
                </div>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
                  Meet the people behind blackv
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Our diverse team brings together expertise from venture capital, entrepreneurship, and technology.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 mt-12">
              <div className="flex flex-col items-center space-y-4">
                <img
                  alt="Alex Morgan"
                  className="aspect-square rounded-full object-cover object-center"
                  height="200"
                  src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=200&h=200&auto=format&fit=crop"
                  width="200"
                />
                <div className="space-y-2 text-center">
                  <h3 className="text-xl font-bold">Alex Morgan</h3>
                  <p className="text-sm text-muted-foreground">CEO & Co-Founder</p>
                </div>
              </div>
              <div className="flex flex-col items-center space-y-4">
                <img
                  alt="Sophia Chen"
                  className="aspect-square rounded-full object-cover object-center"
                  height="200"
                  src="https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&h=200&auto=format&fit=crop"
                  width="200"
                />
                <div className="space-y-2 text-center">
                  <h3 className="text-xl font-bold">Sophia Chen</h3>
                  <p className="text-sm text-muted-foreground">CTO & Co-Founder</p>
                </div>
              </div>
              <div className="flex flex-col items-center space-y-4">
                <img
                  alt="Marcus Johnson"
                  className="aspect-square rounded-full object-cover object-center"
                  height="200"
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&auto=format&fit=crop"
                  width="200"
                />
                <div className="space-y-2 text-center">
                  <h3 className="text-xl font-bold">Marcus Johnson</h3>
                  <p className="text-sm text-muted-foreground">Head of Investor Relations</p>
                </div>
              </div>
              <div className="flex flex-col items-center space-y-4">
                <img
                  alt="Priya Patel"
                  className="aspect-square rounded-full object-cover object-center"
                  height="200"
                  src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=200&h=200&auto=format&fit=crop"
                  width="200"
                />
                <div className="space-y-2 text-center">
                  <h3 className="text-xl font-bold">Priya Patel</h3>
                  <p className="text-sm text-muted-foreground">Head of Startup Success</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Partners Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-background">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-primary px-3 py-1 text-sm text-primary-foreground">
                  Our Partners
                </div>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
                  Backed by industry leaders
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  We're proud to partner with leading organizations in the startup and investment ecosystem.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-2 gap-8 md:grid-cols-4 lg:gap-12 items-center justify-center mt-12">
              <div className="flex items-center justify-center p-4 grayscale transition-all hover:grayscale-0">
                <svg xmlns="http://www.w3.org/2000/svg" width="100" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                  <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
                  <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
                </svg>
              </div>
              <div className="flex items-center justify-center p-4 grayscale transition-all hover:grayscale-0">
                <svg xmlns="http://www.w3.org/2000/svg" width="100" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                  <circle cx="12" cy="12" r="10"></circle>
                  <path d="M8 14s1.5 2 4 2 4-2 4-2"></path>
                  <line x1="9" x2="9.01" y1="9" y2="9"></line>
                  <line x1="15" x2="15.01" y1="9" y2="9"></line>
                </svg>
              </div>
              <div className="flex items-center justify-center p-4 grayscale transition-all hover:grayscale-0">
                <svg xmlns="http://www.w3.org/2000/svg" width="100" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                  <path d="M12 2L2 7l10 5 10-5-10-5z"></path>
                  <path d="M2 17l10 5 10-5"></path>
                  <path d="M2 12l10 5 10-5"></path>
                </svg>
              </div>
              <div className="flex items-center justify-center p-4 grayscale transition-all hover:grayscale-0">
                <svg xmlns="http://www.w3.org/2000/svg" width="100" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line>
                </svg>
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
                  Join our growing community
                </h2>
                <p className="mx-auto max-w-[600px] text-primary-foreground/80 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Be part of the future of startup funding and investment.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/signup">
                  <Button size="lg" variant="secondary" className="w-full sm:w-auto">
                    Get Started
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
                    Contact Us
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
