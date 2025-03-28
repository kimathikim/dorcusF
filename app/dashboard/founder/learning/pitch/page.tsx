"use client"

import type React from "react"

import { useState, useEffect, useRef, use } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import DashboardShell from "@/components/dashboard-shell"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { CustomProgress } from "@/components/ui/custom-progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import {
  ArrowLeft,
  PlayCircle,
  FileText,
  CheckCircle,
  Clock,
  RotateCw,
  ChevronRight,
  ChevronLeft,
  List,
} from "lucide-react"

interface ExternalResource {
  type: "youtube" | "blog"
  title: string
  url: string
  source?: string
  thumbnail?: string
  content?: string
  videoId?: string
}

interface Module {
  id: number
  title: string
  resources: ExternalResource[]
  completed: boolean
}

export default function LearningExperiencePage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const resourceId = searchParams.get("id")
  const videoRef = useRef<HTMLVideoElement>(null)
  const [activeTab, setActiveTab] = useState("content")
  const [activeModuleIndex, setActiveModuleIndex] = useState(0)
  const [activeResourceIndex, setActiveResourceIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(1)
  const [isMuted, setIsMuted] = useState(false)
  const [timeSpent, setTimeSpent] = useState(0)
  const [showModuleList, setShowModuleList] = useState(false)
  const [learningResource, setLearningResource] = useState<any>(null)
  const timerRef = useRef<NodeJS.Timeout | null>(null)
  const [totalTimeSpent, setTotalTimeSpent] = useState(0)

  // Mock data for the selected learning resource
  useEffect(() => {
    // In a real app, you would fetch this data from an API based on resourceId
    const mockResource = {
      id: Number.parseInt(resourceId || "1"),
      title: "The Perfect Pitch Deck Structure",
      description: "Learn the 12-slide framework used by successful startups to raise millions",
      category: "pitch",
      type: "Course",
      duration: "2.5 hours",
      level: "Beginner",
      progress: 25,
      image: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&h=400&auto=format&fit=crop",
      modules: [
        {
          id: 1,
          title: "Problem Statement & Market Opportunity",
          resources: [
            {
              type: "youtube",
              title: "Problem-Solving for a Unique Market – Dave Vasen",
              url: "https://www.youtube.com/watch?v=q-g294WZw_M",
              videoId: "q-g294WZw_M",
              thumbnail: "https://img.youtube.com/vi/q-g294WZw_M/hqdefault.jpg",
            },
            {
              type: "blog",
              title: "Writing a Business Plan – Sequoia Capital",
              url: "https://www.sequoiacap.com/article/writing-a-business-plan/",
              source: "Sequoia Capital",
              content: `
                <h2>Company Purpose</h2>
                <p>Define the company/business in a single declarative sentence.</p>
                
                <h2>Problem</h2>
                <p>Describe the pain of the customer (or the customer's customer).</p>
                <p>Outline how the customer addresses the issue today.</p>
                
                <h2>Solution</h2>
                <p>Demonstrate your company's value proposition to make the customer's life better.</p>
                <p>Show where your product physically sits.</p>
                <p>Provide use cases.</p>
                
                <h2>Why Now</h2>
                <p>Set up the historical evolution of your category.</p>
                <p>Define recent trends that make your solution possible.</p>
              `,
            },
          ],
          completed: false,
        },
        {
          id: 2,
          title: "Solution & Value Proposition",
          resources: [
            {
              type: "blog",
              title: "How to Write a Great Value Proposition – HubSpot Blog",
              url: "https://blog.hubspot.com/marketing/write-value-proposition",
              source: "HubSpot",
              content: `
                <h2>What is a Value Proposition?</h2>
                <p>A value proposition is a statement that explains:</p>
                <ul>
                  <li>How your product solves customers' problems</li>
                  <li>What specific benefits customers can expect</li>
                  <li>Why customers should buy from you instead of your competitors</li>
                </ul>
                
                <h2>How to Create a Compelling Value Proposition</h2>
                <p>Your value proposition should be:</p>
                <ul>
                  <li>Clear: Simple, straightforward language</li>
                  <li>Specific: Focused on a particular customer pain point</li>
                  <li>Unique: Different from what competitors offer</li>
                  <li>Measurable: Quantifiable benefits when possible</li>
                </ul>
              `,
            },
            {
              type: "youtube",
              title: "Startup Secrets: Value Proposition – Michael Skok",
              url: "https://www.youtube.com/watch?v=MgpHuo52OfY",
              videoId: "MgpHuo52OfY",
              thumbnail: "https://img.youtube.com/vi/MgpHuo52OfY/hqdefault.jpg",
            },
          ],
          completed: false,
        },
        {
          id: 3,
          title: "Business Model & Go-to-Market Strategy",
          resources: [
            {
              type: "blog",
              title: "How to Think About Your Business Model as Part of a VC Pitch",
              url: "https://techcrunch.com/2022/06/08/how-to-think-about-your-business-model-as-part-of-a-vc-pitch/",
              source: "TechCrunch",
              content: `
                <h2>Business Model Fundamentals</h2>
                <p>When presenting your business model to investors, focus on:</p>
                <ul>
                  <li>Revenue streams: How you make money</li>
                  <li>Pricing strategy: How you price your product/service</li>
                  <li>Customer acquisition: How you get customers</li>
                  <li>Unit economics: Revenue and costs per unit</li>
                </ul>
                
                <h2>Key Metrics</h2>
                <p>Investors want to see metrics that demonstrate:</p>
                <ul>
                  <li>Customer Acquisition Cost (CAC)</li>
                  <li>Lifetime Value (LTV)</li>
                  <li>Churn rate</li>
                  <li>Payback period</li>
                </ul>
              `,
            },
            {
              type: "youtube",
              title: "Marketing for Entrepreneurs – Lynda Kate Smith",
              url: "https://www.youtube.com/watch?v=XQLX8HJiSQ4",
              videoId: "XQLX8HJiSQ4",
              thumbnail: "https://img.youtube.com/vi/XQLX8HJiSQ4/hqdefault.jpg",
            },
          ],
          completed: false,
        },
        {
          id: 4,
          title: "Financial Projections & Funding Ask",
          resources: [
            {
              type: "youtube",
              title: "Financial Projections for Startups",
              url: "https://www.youtube.com/watch?v=812zoKFPCYc",
              videoId: "812zoKFPCYc",
              thumbnail: "https://img.youtube.com/vi/812zoKFPCYc/hqdefault.jpg",
            },
            {
              type: "blog",
              title: "What Most Startup Founders Get Wrong About Financial Projections",
              url: "https://techcrunch.com/2022/06/14/what-most-startup-founders-get-wrong-about-financial-projections/",
              source: "TechCrunch",
              content: `
                <h2>Common Financial Projection Mistakes</h2>
                <p>Avoid these common pitfalls when creating financial projections:</p>
                <ul>
                  <li>Unrealistic growth assumptions</li>
                  <li>Underestimating expenses</li>
                  <li>Ignoring cash flow</li>
                  <li>Lack of scenario planning</li>
                </ul>
                
                <h2>Building Credible Projections</h2>
                <p>To create credible financial projections:</p>
                <ul>
                  <li>Start with bottom-up forecasting</li>
                  <li>Use industry benchmarks</li>
                  <li>Include multiple scenarios</li>
                  <li>Focus on key drivers of your business</li>
                </ul>
              `,
            },
          ],
          completed: false,
        },
        {
          id: 5,
          title: "Team & Traction",
          resources: [
            {
              type: "youtube",
              title: "How to Pitch Your Seed Stage Startup – Michael Seibel",
              url: "https://www.youtube.com/watch?v=17XZGUX_9iM",
              videoId: "17XZGUX_9iM",
              thumbnail: "https://img.youtube.com/vi/17XZGUX_9iM/hqdefault.jpg",
            },
            {
              type: "blog",
              title: "What Makes a Successful Startup Team – Harvard Business Review",
              url: "https://hbr.org/2017/12/what-makes-a-successful-startup-team",
              source: "Harvard Business Review",
              content: `
                <h2>Key Team Qualities</h2>
                <p>Successful startup teams typically demonstrate:</p>
                <ul>
                  <li>Complementary skills and expertise</li>
                  <li>Prior working relationships</li>
                  <li>Balanced technical and business backgrounds</li>
                  <li>Resilience and adaptability</li>
                </ul>
                
                <h2>Presenting Your Team</h2>
                <p>When pitching your team to investors:</p>
                <ul>
                  <li>Highlight relevant experience and achievements</li>
                  <li>Explain why this team is uniquely positioned to solve this problem</li>
                  <li>Address any gaps in the team and how you plan to fill them</li>
                  <li>Demonstrate team cohesion and shared vision</li>
                </ul>
              `,
            },
          ],
          completed: false,
        },
      ],
    }

    setLearningResource(mockResource)
  }, [resourceId])

  // Start timer immediately when page loads
  useEffect(() => {
    // Load saved time from localStorage
    const savedTimeSpent = localStorage.getItem('pitchLearningTimeSpent')
    const savedTotalTime = localStorage.getItem('totalLearningTimeSpent')
    
    if (savedTimeSpent) {
      setTimeSpent(parseInt(savedTimeSpent, 10))
    }
    
    if (savedTotalTime) {
      setTotalTimeSpent(parseInt(savedTotalTime, 10))
    }
    
    // Start timer immediately when component mounts
    timerRef.current = setInterval(() => {
      setTimeSpent(prev => {
        const newTime = prev + 1
        // Save current session time
        localStorage.setItem('pitchLearningTimeSpent', newTime.toString())
        return newTime
      })
    }, 1000)

    // Handle page visibility change
    const handleVisibilityChange = () => {
      if (document.hidden) {
        // Page is hidden (user left the page)
        if (timerRef.current) {
          clearInterval(timerRef.current)
          timerRef.current = null
          
          // Save total time when leaving
          const currentTotal = parseInt(localStorage.getItem('totalLearningTimeSpent') || '0', 10)
          const newTotal = currentTotal + timeSpent
          localStorage.setItem('totalLearningTimeSpent', newTotal.toString())
          setTotalTimeSpent(newTotal)
        }
      } else {
        // Page is visible again (user returned)
        if (!timerRef.current) {
          timerRef.current = setInterval(() => {
            setTimeSpent(prev => {
              const newTime = prev + 1
              localStorage.setItem('pitchLearningTimeSpent', newTime.toString())
              return newTime
            })
          }, 1000)
        }
      }
    }

    document.addEventListener('visibilitychange', handleVisibilityChange)

    // Clean up on unmount
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current)
      }
      
      // Save total time when unmounting
      const currentTotal = parseInt(localStorage.getItem('totalLearningTimeSpent') || '0', 10)
      const newTotal = currentTotal + timeSpent
      localStorage.setItem('totalLearningTimeSpent', newTotal.toString())
      
      document.removeEventListener('visibilitychange', handleVisibilityChange)
    }
  }, []) // Empty dependency array means this runs once on mount

  // Separate effect for play/pause state
  useEffect(() => {
    if (!isPlaying && timerRef.current) {
      // Don't clear the timer when paused - we want to keep tracking time spent on page
      // This is different from the original implementation
    }
  }, [isPlaying])

  // Handle video events
  useEffect(() => {
    const videoElement = videoRef.current
    if (!videoElement) return

    const handleTimeUpdate = () => {
      setCurrentTime(videoElement.currentTime)
    }

    const handleDurationChange = () => {
      setDuration(videoElement.duration)
    }

    const handleEnded = () => {
      setIsPlaying(false)
      markResourceAsCompleted()
    }

    videoElement.addEventListener("timeupdate", handleTimeUpdate)
    videoElement.addEventListener("durationchange", handleDurationChange)
    videoElement.addEventListener("ended", handleEnded)

    return () => {
      videoElement.removeEventListener("timeupdate", handleTimeUpdate)
      videoElement.removeEventListener("durationchange", handleDurationChange)
      videoElement.removeEventListener("ended", handleEnded)
    }
  }, [videoRef.current])

  if (!learningResource) {
    return (
      <DashboardShell userType="founder">
        <div className="flex items-center justify-center h-[60vh]">
          <div className="flex flex-col items-center gap-2">
            <RotateCw className="h-8 w-8 animate-spin text-primary" />
            <p>Loading learning content...</p>
          </div>
        </div>
      </DashboardShell>
    )
  }

  const activeModule = learningResource.modules[activeModuleIndex]
  const activeResource = activeModule.resources[activeResourceIndex]

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`
  }

  const handlePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause()
      } else {
        videoRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const handleVolumeToggle = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted
      setIsMuted(!isMuted)
    }
  }

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = Number.parseFloat(e.target.value)
    if (videoRef.current) {
      videoRef.current.currentTime = newTime
      setCurrentTime(newTime)
    }
  }

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = Number.parseFloat(e.target.value)
    if (videoRef.current) {
      videoRef.current.volume = newVolume
      setVolume(newVolume)
    }
  }

  const navigateToResource = (moduleIndex: number, resourceIndex: number) => {
    setActiveModuleIndex(moduleIndex)
    setActiveResourceIndex(resourceIndex)
    setIsPlaying(false)
    setCurrentTime(0)
    setShowModuleList(false)
  }

  const navigateToNextResource = () => {
    if (activeResourceIndex < activeModule.resources.length - 1) {
      navigateToResource(activeModuleIndex, activeResourceIndex + 1)
    } else if (activeModuleIndex < learningResource.modules.length - 1) {
      navigateToResource(activeModuleIndex + 1, 0)
    }
  }

  const navigateToPreviousResource = () => {
    if (activeResourceIndex > 0) {
      navigateToResource(activeModuleIndex, activeResourceIndex - 1)
    } else if (activeModuleIndex > 0) {
      const prevModule = learningResource.modules[activeModuleIndex - 1]
      navigateToResource(activeModuleIndex - 1, prevModule.resources.length - 1)
    }
  }

  const markResourceAsCompleted = () => {
    // In a real app, you would send this to your backend
    console.log(`Marked resource as completed: Module ${activeModuleIndex + 1}, Resource ${activeResourceIndex + 1}`)

    // Update local state to reflect completion
    const updatedModules = [...learningResource.modules]
    const resourcesInModule = updatedModules[activeModuleIndex].resources

    // Check if all resources in the module are completed
    const allResourcesCompleted = resourcesInModule.every(
      (_: any, index: number) => index === activeResourceIndex || resourcesInModule[index].completed,
    )

    if (allResourcesCompleted) {
      updatedModules[activeModuleIndex].completed = true
    }

    setLearningResource({
      ...learningResource,
      modules: updatedModules,
      progress: calculateProgress(updatedModules),
    })
  }

  const calculateProgress = (modules: any[]) => {
    const totalResources = modules.reduce((total, module) => total + module.resources.length, 0)
    const completedResources = modules.reduce((total, module) => {
      return total + module.resources.filter((r: any) => r.completed).length
    }, 0)

    return Math.round((completedResources / totalResources) * 100)
  }

  return (
    <DashboardShell userType="founder">
      <div className="space-y-6">
        {/* Header with back button and title */}
        <div className="flex items-center gap-4">
          <Button 
            variant="outline" 
            size="icon" 
            onClick={() => router.push("/dashboard/founder/learning")}
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold">{learningResource.title}</h1>
            <p className="text-muted-foreground">{learningResource.description}</p>
          </div>
          <div className="ml-auto flex items-center gap-2">
            <Badge variant="outline" className="bg-primary/10 text-primary">
              {learningResource.level}
            </Badge>
            <Badge variant="outline" className="bg-secondary/50">
              <Clock className="h-3 w-3 mr-1" />
              {formatTime(timeSpent)} this session
            </Badge>
            <Badge variant="outline" className="bg-secondary/50">
              <Clock className="h-3 w-3 mr-1" />
              {formatTime(totalTimeSpent)} total learning
            </Badge>
          </div>
        </div>

        {/* Progress bar */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Course progress</span>
            <span>{learningResource.progress}%</span>
          </div>
          <CustomProgress value={learningResource.progress} className="h-2" />
        </div>

        {/* Main content area */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Module list (mobile: hidden, desktop: visible) */}
          <div className={`lg:block ${showModuleList ? "block" : "hidden"} lg:col-span-1`}>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Course Modules</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="space-y-1">
                  {learningResource.modules.map((module: any, moduleIndex: number) => (
                    <div key={module.id} className="border-b last:border-b-0">
                      <div
                        className={`p-3 flex items-center gap-2 cursor-pointer hover:bg-muted transition-colors ${
                          moduleIndex === activeModuleIndex ? "bg-muted" : ""
                        }`}
                        onClick={() => {
                          setActiveModuleIndex(moduleIndex);
                          setActiveResourceIndex(0);
                          setShowModuleList(false);
                        }}
                      >
                        <div
                          className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${
                            module.completed
                              ? "bg-primary text-primary-foreground"
                              : "bg-muted-foreground/20 text-muted-foreground"
                          }`}
                        >
                          {module.completed ? <CheckCircle className="h-4 w-4" /> : moduleIndex + 1}
                        </div>
                        <div className="flex-1">
                          <p className="font-medium text-sm">{module.title}</p>
                          <p className="text-xs text-muted-foreground">{module.resources.length} resources</p>
                        </div>
                      </div>
                      {moduleIndex === activeModuleIndex && (
                        <div className="pl-11 pr-3 pb-3 space-y-2">
                          {module.resources.map((resource: any, resourceIndex: number) => (
                            <div
                              key={`${resource.type}-${resourceIndex}`}
                              className={`text-sm p-2 rounded-md cursor-pointer flex items-center gap-2 ${
                                resourceIndex === activeResourceIndex ? "bg-primary/10 text-primary" : "hover:bg-muted"
                              }`}
                              onClick={() => navigateToResource(moduleIndex, resourceIndex)}
                            >
                              {resource.type === "youtube" ? (
                                <PlayCircle className="h-4 w-4 flex-shrink-0" />
                              ) : (
                                <FileText className="h-4 w-4 flex-shrink-0" />
                              )}
                              <span className="line-clamp-1">{resource.title}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Content area */}
          <div className="lg:col-span-3 space-y-4">
            {/* Mobile module toggle */}
            <div className="lg:hidden">
              <Button
                variant="outline"
                className="w-full flex items-center justify-between"
                onClick={() => setShowModuleList(!showModuleList)}
              >
                <span>
                  Module {activeModuleIndex + 1}: {activeModule.title}
                </span>
                <List className="h-4 w-4" />
              </Button>
            </div>

            {/* Content tabs */}
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="content">Content</TabsTrigger>
                <TabsTrigger value="notes">Notes</TabsTrigger>
              </TabsList>
              <TabsContent value="content" className="space-y-4">
                {/* Resource title */}
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold">{activeResource.title}</h2>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={navigateToPreviousResource}
                      disabled={activeModuleIndex === 0 && activeResourceIndex === 0}
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={navigateToNextResource}
                      disabled={
                        activeModuleIndex === learningResource.modules.length - 1 &&
                        activeResourceIndex === activeModule.resources.length - 1
                      }
                    >
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {/* Resource content */}
                {activeResource.type === "youtube" ? (
                  <div className="space-y-4">
                    <div className="relative aspect-video bg-black rounded-lg overflow-hidden">
                      <iframe
                        className="absolute inset-0 w-full h-full"
                        src={`https://www.youtube.com/embed/${activeResource.videoId}?autoplay=0`}
                        title={activeResource.title}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      ></iframe>
                    </div>
                    <div className="flex justify-end">
                      <Button onClick={markResourceAsCompleted}>Mark as Completed</Button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <Card>
                      <CardContent className="p-6">
                        <div
                          className="prose prose-gray max-w-none dark:prose-invert"
                          dangerouslySetInnerHTML={{ __html: activeResource.content || "" }}
                        />
                      </CardContent>
                      <CardFooter className="flex justify-end">
                        <Button onClick={markResourceAsCompleted}>Mark as Completed</Button>
                      </CardFooter>
                    </Card>
                  </div>
                )}
              </TabsContent>
              <TabsContent value="notes">
                <Card>
                  <CardHeader>
                    <CardTitle>Your Notes</CardTitle>
                    <CardDescription>Take notes while learning to help remember key concepts</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <textarea
                      className="w-full min-h-[300px] p-4 rounded-md border resize-none focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="Start typing your notes here..."
                    />
                  </CardContent>
                  <CardFooter className="flex justify-end">
                    <Button>Save Notes</Button>
                  </CardFooter>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </DashboardShell>
  )
}

