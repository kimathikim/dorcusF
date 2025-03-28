"use client"

import React from "react";

import DashboardShell from "@/components/dashboard-shell"
import { useState, useEffect, useMemo } from "react"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Progress } from "@/components/ui/progress"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Checkbox } from "@/components/ui/checkbox"
import { CustomProgress } from "@/components/ui/custom-progress"
import {
  Search,
  Filter,
  MoreHorizontal,
  Calendar,
  DollarSign,
  Building2,
  MapPin,
  Users,
  ChevronRight,
  FileText,
  PlusCircle,
  ClipboardList,
  Microscope,
  Handshake,
  CheckCircle,
  XCircle,
  Clock,
  AlertCircle,
  MessageSquare,
  Edit,
  Trash2,
  BarChart3,
  TrendingUp,
  Star,
  Download,
  Share2,
  CalendarClock,
  ArrowLeft,
  Mail,
  ExternalLink,
  Check,
} from "lucide-react"
import { API_BASE_URL } from "@/lib/api-config";
import { Label } from "@/components/ui/label";
import { toast as Toast } from "@/hooks/use-toast";
import { ToastAction } from "@radix-ui/react-toast";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { toast } from "@/hooks/use-toast";

// Mock data for development
const mockDeals = [
  {
    id: "1",
    startupName: "InnovaTech Solutions",
    stage: "screening",
    industry: "Healthcare",
    fundingStage: "Seed",
    fundRequired: 1500000,
    location: "Boston, MA",
    matchScore: 92,
    avatar: "/placeholder.svg?height=80&width=80",
    lastActivity: "2023-03-15T10:30:00",
    addedDate: "2023-03-10T14:20:00",
    founder: "Sarah Johnson",
    founderEmail: "sarah@innovatech.co",
    traction: "3 pilot programs with major hospitals, 15% month-over-month user growth, $50K MRR",
    notes: "Impressive team with strong healthcare background. Technology shows promise in initial pilots.",
    tags: ["AI", "Healthcare", "SaaS"],
    status: "High Priority",
    meetings: [{ date: "2023-03-20T15:00:00", type: "Initial Call", notes: "Discussed business model and traction" }],
    documents: [
      { name: "Pitch Deck", url: "/files/innovatech-pitch.pdf", date: "2023-03-10T14:20:00" },
      { name: "Financial Projections", url: "/files/innovatech-financials.xlsx", date: "2023-03-12T09:15:00" },
    ],
    tasks: [
      { id: "t1", title: "Review financial projections", completed: true, dueDate: "2023-03-18T00:00:00" },
      { id: "t2", title: "Schedule follow-up call", completed: false, dueDate: "2023-03-25T00:00:00" },
    ],
  }
]
type Deal = (typeof mockDeals)[0]

// Define pipeline stages
const pipelineStages = [
  { id: "screening", name: "Screening", icon: ClipboardList, color: "text-blue-500" },
  { id: "due_diligence", name: "Due Diligence", icon: Microscope, color: "text-amber-500" },
  { id: "negotiation", name: "Negotiation", icon: Handshake, color: "text-purple-500" },
  { id: "closed_won", name: "Closed Won", icon: CheckCircle, color: "text-green-500" },
  { id: "closed_lost", name: "Closed Lost", icon: XCircle, color: "text-red-500" },
]

// Priority badges
const priorityBadges = {
  "High Priority": { variant: "destructive", icon: AlertCircle },
  "Medium Priority": { variant: "default", icon: Clock },
  "Low Priority": { variant: "secondary", icon: Clock },
  Completed: { variant: "outline", icon: CheckCircle },
  Rejected: { variant: "outline", icon: XCircle },
}

const statusBadges = {
  "active": { variant: "default", icon: Clock, label: "Active" },
  "paused": { variant: "secondary", icon: Clock, label: "Paused" },
  "completed": { variant: "outline", icon: CheckCircle, label: "Completed" },
  "cancelled": { variant: "outline", icon: XCircle, label: "Cancelled" },
}

export default function DealFlowPage() {
  const [deals, setDeals] = useState<Deal[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [industryFilter, setIndustryFilter] = useState("all")
  const [stageFilter, setStageFilter] = useState("all")
  const [sortBy, setSortBy] = useState("recent")
  const [selectedDeal, setSelectedDeal] = useState<Deal | null>(null)
  const [viewMode, setViewMode] = useState<"kanban" | "list">("kanban")
  const [newNote, setNewNote] = useState("")
  const [newTaskTitle, setNewTaskTitle] = useState("")
  const [newTaskDueDate, setNewTaskDueDate] = useState("")
  // negotiation
  const [negotiationAmount, setNegotiationAmount] = useState("")
  const [showNegotiationModal, setShowNegotiationModal] = useState(false)
  const [negotiationDealId, setNegotiationDealId] = useState<string | null>(null)
  const [selectedDealId, setSelectedDealId] = useState<string | null>(null)
  // Add these state variables at the top of your component
  const [showInvestmentModal, setShowInvestmentModal] = useState(false);
  const [investmentAmount, setInvestmentAmount] = useState("");
  const [investmentDealId, setInvestmentDealId] = useState<string | null>(null);

  const deleteDeal = async (dealId: string) => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await fetch(`${API_BASE_URL}/dealflow/${dealId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        // Remove the deal from the state
        setDeals((prevDeals) => prevDeals.filter((deal) => deal.id !== dealId));

        // Close the detail view if the deleted deal was selected
        if (selectedDealId === dealId) {
          setSelectedDealId(null);
        }

        // Go back to the dealflow immediately
        setSelectedDeal(null);

        toast({
          title: "Deal deleted",
          description: "The deal has been removed from your pipeline.",
          variant: "default",
        });
      } else {
        console.error("Failed to delete deal:", response.statusText);
        toast({
          title: "Error",
          description: "Failed to delete the deal. Please try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error deleting deal:", error);
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    }
  };

  const [newMeetingTitle, setNewMeetingTitle] = useState("");
  const [newMeetingStartTime, setNewMeetingStartTime] = useState("");
  const [newMeetingEndTime, setNewMeetingEndTime] = useState("");
  const [newMeetingNotes, setNewMeetingNotes] = useState("");

  // Uncomment and update the investment modal state and functions
  const submitInvestment = async () => {
    if (!investmentAmount || parseFloat(investmentAmount) <= 0) {
      Toast({
        title: "Invalid amount",
        description: "Please enter a valid investment amount",
        variant: "destructive",
      });
      return;
    }

    try {
      const token = localStorage.getItem("authToken");
      
      const response = await fetch(`${API_BASE_URL}/dealflow/${investmentDealId}/invest`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ investmentAmount: parseFloat(investmentAmount) }),
      });

      const data = await response.json();

      if (response.ok) {
        setDeals((prevDeals) =>
          prevDeals.map((deal) =>
            deal.id === investmentDealId
              ? {
                ...deal,
                fundRequired: deal.fundRequired - parseFloat(investmentAmount),
                lastActivity: new Date().toISOString(),
              }
              : deal
          )
        );
        setShowInvestmentModal(false);
        setInvestmentAmount("");

        Toast({
          title: "Investment successfully submitted.",
          variant: "default",
        });
      } else {
        console.error("Failed to submit investment:", data.error || response.statusText);
        Toast({
          title: "Failed to submit investment.",
          description: data.error || "An error occurred",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error submitting investment:", error);
      Toast({
        title: "Error",
        description: "An error occurred while submitting investment.",
        variant: "destructive",
      });
    }
  };

  const openInvestmentModal = (e: React.MouseEvent, dealId: string) => {
    e.stopPropagation(); // Prevent card click event
    setInvestmentDealId(dealId);
    setShowInvestmentModal(true);
  };

  useEffect(() => {
    async function fetchDeals() {
      try {
        setLoading(true)
        const token = localStorage.getItem("authToken");
        const response = await fetch(`${API_BASE_URL}/dealflow/`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        if (response.ok) {
          const data = await response.json();
          const mappedDeals = data.map((deal: any) => ({
            id: deal._id,
            startupName: deal.startup.startup_name || "N/A",
            stage: deal.stage || "N/A",
            industry: deal.startup.industry || "N/A",
            fundingStage: deal.startup.funding_stage || "N/A",
            fundRequired: deal.startup.fund_required || "N/A",
            location: deal.startup.location || "N/A",
            matchScore: deal.match_score || 0,
            avatar: "/placeholder.svg?height=80&width=80",
            lastActivity: deal.last_activity || "N/A",
            addedDate: deal.added_date || "N/A",
            founder: deal.startup.leadership_team.split(",")[0].split(" ")[0] || "N/A",
            founderEmail: "",
            traction: deal.startup.traction || "N/A",
            notes: "",
            tags: [],
            status: deal.status || "Medium Priority",
            meetings: deal.meetings || [],
            documents: deal.documents.map((doc: any) => ({
              name: doc.name || "N/A",
              url: doc.url || "#",
              date: doc.date || "N/A",
            })),
            tasks: deal.tasks.map((task: any) => ({
              id: task.id || "N/A",
              title: task.title || "N/A",
              completed: task.completed || false,
              dueDate: task.due_date || "N/A",
            })),
          }));
          setDeals(mappedDeals);
        } else if (response.status === 400) {
          console.error("Bad Request: The request was invalid. Please check the data and try again.");
        } else if (response.status === 401) {
          console.error("Unauthorized: You are not authorized to perform this action.");
        } else if (response.status === 403) {
          console.error("Forbidden: You do not have permission to perform this action.");
        } else if (response.status === 500) {
          console.error("Server Error: An internal server error occurred. Please try again later.");
        } else {
          console.error("Error: An error occurred while fetching deals.");
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching deals:", error);
        setLoading(false);
      }
    }
    fetchDeals();
  }, []);

  const scheduleMeeting = async (dealId: string) => {
    if (!newMeetingTitle || !newMeetingStartTime || !newMeetingEndTime) return;

    try {
      const token = localStorage.getItem("authToken");
      const response = await fetch(`${API_BASE_URL}/dealflow/${dealId}/meetings`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: newMeetingTitle,
          start_time: new Date(newMeetingStartTime).toISOString(),
          end_time: new Date(newMeetingEndTime).toISOString(),
          notes: newMeetingNotes,
        }),
      });

      if (response.ok) {
        const result = await response.json();
        setDeals((prevDeals) =>
          prevDeals.map((deal) =>
            deal.id === dealId
              ? {
                ...deal,
                meetings: [...deal.meetings, result.meeting],
                lastActivity: new Date().toISOString(),
              }
              : deal
          )
        );
        setNewMeetingTitle("");
        setNewMeetingStartTime("");
        setNewMeetingEndTime("");
        setNewMeetingNotes("");
        Toast({
          title: "Meeting successfully scheduled.",
          variant: "default",
        });
      } else {
        console.error("Failed to schedule meeting:", response.statusText);
        Toast({
          title: "Failed to schedule meeting.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error scheduling meeting:", error);
      Toast({
        title: "An error occurred while scheduling the meeting.",
        variant: "destructive",
      });
    }
  };
  // Extract unique industries for filter
  const industries = useMemo(() => {
    const uniqueIndustries = Array.from(new Set(deals.map((d: Deal) => d.industry)))

    return ["all", ...uniqueIndustries]
  }, [deals])

  // Filter and sort deals
  const filteredDeals = useMemo(() => {
    return deals
      .filter((deal) => {
        // Search filter
        const searchLower = searchQuery.toLowerCase()
        const matchesSearch =
          searchQuery === "" ||
          deal.startupName.toLowerCase().includes(searchLower) ||
          deal.industry.toLowerCase().includes(searchLower) ||
          deal.founder.toLowerCase().includes(searchLower)

        // Industry filter
        const matchesIndustry = industryFilter === "all" || deal.industry === industryFilter

        // Stage filter
        const matchesStage = stageFilter === "all" || deal.stage === stageFilter

        return matchesSearch && matchesIndustry && matchesStage
      })
      .sort((a, b) => {
        switch (sortBy) {
          case "recent":
            return new Date(b.lastActivity).getTime() - new Date(a.lastActivity).getTime()
          case "match":
            return b.matchScore - a.matchScore
          case "funding":
            return b.fundRequired - a.fundRequired
          case "name":
            return a.startupName.localeCompare(b.startupName)
          default:
            return 0
        }
      })
  }, [deals, searchQuery, industryFilter, stageFilter, sortBy])

  // Group deals by stage for kanban view
  const dealsByStage = useMemo(() => {
    const grouped: Record<string, Deal[]> = {}

    pipelineStages.forEach((stage) => {
      grouped[stage.id] = filteredDeals.filter((deal) => deal.stage === stage.id)
    })

    return grouped
  }, [filteredDeals])

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      notation: 'compact',
      maximumFractionDigits: 1
    }).format(amount);
  };

  // Format date with error handling
  const formatDate = (dateString: string) => {
    if (!dateString) return "N/A";

    try {
      const date = new Date(dateString);

      // Check if date is valid
      if (isNaN(date.getTime())) {
        return "Invalid date";
      }

      return new Intl.DateTimeFormat("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }).format(date);
    } catch (error) {
      console.error("Date formatting error:", error);
      return "Invalid date";
    }
  }

  // Format relative time with error handling
  const formatRelativeTime = (dateString: string) => {
    if (!dateString) return "N/A";

    try {
      const date = new Date(dateString);

      // Check if date is valid
      if (isNaN(date.getTime())) {
        return "Invalid date";
      }

      const now = new Date();
      const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

      if (diffInSeconds < 60) {
        return "just now";
      } else if (diffInSeconds < 3600) {
        const minutes = Math.floor(diffInSeconds / 60);
        return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
      } else if (diffInSeconds < 86400) {
        const hours = Math.floor(diffInSeconds / 3600);
        return `${hours} hour${hours > 1 ? "s" : ""} ago`;
      } else if (diffInSeconds < 604800) {
        const days = Math.floor(diffInSeconds / 86400);
        return `${days} day${days > 1 ? "s" : ""} ago`;
      } else {
        return formatDate(dateString).split(",")[0]; // Just return the date part
      }
    } catch (error) {
      console.error("Relative time formatting error:", error);
      return "Unknown";
    }
  }

  // Move deal to a different stage
  const moveDealToStage = (dealId: string, newStage: string) => {
    setDeals((prevDeals) =>
      prevDeals.map((deal) =>
        deal.id === dealId ? { ...deal, stage: newStage, lastActivity: new Date().toISOString() } : deal,
      ),
    )
  }

  // Add a note to a deal
  const addNote = (dealId: string) => {
    if (!newNote.trim()) return

    // In a real app, you would send this to your API
    console.log(`Adding note to deal ${dealId}: ${newNote}`)

    // Update the UI optimistically
    setDeals((prevDeals) =>
      prevDeals.map((deal) =>
        deal.id === dealId
          ? {
            ...deal,
            notes: deal.notes ? `${deal.notes}\n\n${new Date().toLocaleString()}: ${newNote}` : newNote,
            lastActivity: new Date().toISOString(),
          }
          : deal,
      ),
    )

    setNewNote("")
  }

  // Add a task to a deal
  const addTask = async (dealId: string) => {
    if (!newTaskTitle.trim() || !newTaskDueDate) return;

    try {
      const token = localStorage.getItem("authToken");
      const response = await fetch(`${API_BASE_URL}/dealflow/${dealId}/tasks`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: newTaskTitle,
          due_date: new Date(newTaskDueDate).toISOString(),
          completed: false,
        }),
      });

      if (response.ok) {
        const result = await response.json();
        // Update UI optimistically
        setDeals((prevDeals) =>
          prevDeals.map((deal) =>
            deal.id === dealId
              ? {
                ...deal,
                tasks: [
                  ...deal.tasks,
                  {
                    id: result.task?.id || `t${Date.now()}`,
                    title: newTaskTitle,
                    completed: false,
                    dueDate: new Date(newTaskDueDate).toISOString(),
                  },
                ],
                lastActivity: new Date().toISOString(),
              }
              : deal
          )
        );

        setNewTaskTitle("");
        setNewTaskDueDate("");
        //setIsDialogOpen(false);

        Toast({
          title: "Task added successfully.",
          variant: "default",
        });
      } else {
        console.error("Failed to add task:", response.statusText);
        Toast({
          title: "Failed to add task.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error adding task:", error);
      Toast({
        title: "An error occurred while adding the task.",
        variant: "destructive",
      });
    }
  };

  // Toggle task completion
  const toggleTaskCompletion = async (dealId: string, taskId: string, currentStatus: boolean) => {
    try {
      const newStatus = !currentStatus;
      const token = localStorage.getItem("authToken");
      const response = await fetch(`${API_BASE_URL}/dealflow/${dealId}/tasks/${taskId}/status`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          completed: newStatus
        }),
      });

      if (response.ok) {
        const result = await response.json();

        // Update UI with the task from response
        setDeals((prevDeals) =>
          prevDeals.map((deal) => ({
            ...deal,
            tasks: deal.tasks.map((task) =>
              task.id === taskId
                ? { ...task, completed: newStatus }
                : task
            ),
            lastActivity: new Date().toISOString(),
          }))
        );

        Toast({
          title: `Task marked as ${newStatus ? 'completed' : 'pending'}`,
          variant: "default",
        });
      } else {
        console.error("Failed to update task status:", response.statusText);
        Toast({
          title: "Failed to update task status",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error updating task status:", error);
      Toast({
        title: "Error updating task status",
        variant: "destructive",
      });
    }
  };
  const updateDealStatus = async (dealId: string, newStatus: string) => {
    try {
      // Validate status against backend expectations
      const validStatuses = ["active", "paused", "completed", "cancelled"];
      if (!validStatuses.includes(newStatus)) {
        console.error(`Invalid status: ${newStatus}. Must be one of: ${validStatuses.join(', ')}`);
        Toast({
          title: "Invalid status value",
          variant: "destructive",
        });
        return;
      }

      const token = localStorage.getItem("authToken");
      // Use the correct endpoint and HTTP method
      const response = await fetch(`${API_BASE_URL}/dealflow/${dealId}/status`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (response.ok) {
        setDeals((prevDeals) =>
          prevDeals.map((deal) =>
            deal.id === dealId ? { ...deal, status: newStatus, lastActivity: new Date().toISOString() } : deal
          )
        );
        Toast({
          title: `Deal status updated to ${newStatus}`,
          variant: "default",
        });
      } else {
        console.error("Failed to update status:", response.statusText);
        Toast({
          title: "Failed to update deal status",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error updating deal status:", error);
      Toast({
        title: "Error updating deal status",
        variant: "destructive",
      });
    }
  };

  const updatePipelineStage = async (dealId: string, newStage: string) => {
    try {
      const token = localStorage.getItem("authToken");

      // If moving to negotiation, open modal
      if (newStage === "negotiation") {
        setNegotiationDealId(dealId);
        setShowNegotiationModal(true);
      }

      const response = await fetch(`${API_BASE_URL}/dealflow/${dealId}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ stage: newStage }),
      });

      if (response.ok) {
        setDeals((prevDeals) =>
          prevDeals.map((deal) =>
            deal.id === dealId ? { ...deal, stage: newStage, lastActivity: new Date().toISOString() } : deal
          )
        );
        console.log(`Updated deal ${dealId} to stage ${newStage}`);
      } else {
        console.error("Failed to update stage:", response.statusText);
      }
    } catch (error) {
      console.error("Error updating deal stage:", error);
    }
  };


  const submitNegotiationInvestment = async () => {
    // if (!negotiationDealId || !negotiationAmount) return;

    try {
      const token = localStorage.getItem("authToken");

      const response = await fetch(`${API_BASE_URL}dealflow/${negotiationDealId}/invest`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ investmentAmount: parseFloat(negotiationAmount) }),
      });

      if (response.ok) {
        setDeals((prevDeals) =>
          prevDeals.map((deal) =>
            deal.id === negotiationDealId
              ? {
                ...deal,
                stage: "negotiation",
                fundRequired: deal.fundRequired - parseFloat(negotiationAmount),
                lastActivity: new Date().toISOString(),
              }
              : deal
          )
        );

        setShowNegotiationModal(false);
        setNegotiationAmount("");
        console.log("Investment successfully added.");
      } else {
        console.error("Failed to submit investment:", response.statusText);
      }
    } catch (error) {
      console.error("Error submitting investment:", error);
    }
  };
  const updateDealPriority = async (dealId: string, newPriority: string) => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await fetch(`${API_BASE_URL}/dealflow/${dealId}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: newPriority }),
      });

      if (response.ok) {
        setDeals((prevDeals) =>
          prevDeals.map((deal) =>
            deal.id === dealId ? { ...deal, status: newPriority, lastActivity: new Date().toISOString() } : deal
          )
        );
        console.log(`Updated deal ${dealId} priority to ${newPriority}`);
      } else {
        console.error("Failed to update priority:", response.statusText);
      }
    } catch (error) {
      console.error("Error updating deal priority:", error);
    }
  };
  // Calculate deal metrics
  const dealMetrics = useMemo(() => {
    const totalDeals = deals.length
    const totalValue = deals.reduce((sum, deal) => sum + deal.fundRequired, 0)
    const closedWonDeals = deals.filter((deal) => deal.stage === "closed_won").length
    const closedWonValue = deals
      .filter((deal) => deal.stage === "closed_won")
      .reduce((sum, deal) => sum + deal.fundRequired, 0)
    const conversionRate = totalDeals > 0 ? (closedWonDeals / totalDeals) * 100 : 0

    return {
      totalDeals,
      totalValue,
      closedWonDeals,
      closedWonValue,
      conversionRate,
    }
  }, [deals])

  // Loading state
  if (loading) {
    return (

      <DashboardShell userType="investor">
        <div className="flex min-h-screen flex-col">
          <main className="flex-1 container mx-auto py-10 px-4 flex items-center justify-center">
            <div className="text-center space-y-4">
              <div className="animate-pulse flex flex-col items-center">
                <div className="h-12 w-48 bg-muted rounded-md mb-4"></div>
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 w-full">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className="h-64 w-full bg-muted rounded-lg"></div>
                  ))}
                </div>
              </div>
              <p className="text-lg font-medium text-muted-foreground">Loading deal flow...</p>
            </div>
          </main>
        </div>
      </DashboardShell>
    )
  }

  return (

    <><DashboardShell userType="investor">
      <div className="flex min-h-screen flex-col">
        <main className="flex-1 container mx-auto py-10 px-4">
          {selectedDeal ? (
            // 🔹 Detailed Deal View
            <div>
              <Button variant="outline" onClick={() => setSelectedDeal(null)} className="mb-6">
                <ArrowLeft className="h-4 w-4 mr-2" /> Back to Deal Flow
              </Button>

              {/* Deal Header */}
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
                <div className="flex items-center gap-4">
                  <Avatar className="h-16 w-16 border-2 border-primary/10">
                    <AvatarImage src={selectedDeal.avatar} alt={selectedDeal.startupName} />
                    <AvatarFallback>{selectedDeal.startupName.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h1 className="text-3xl font-bold">{selectedDeal.startupName}</h1>
                    <div className="flex items-center gap-2 text-muted-foreground mt-1">
                      <Building2 className="h-4 w-4" />
                      <span>{selectedDeal.industry}</span>
                      <span className="text-muted-foreground">•</span>
                      <MapPin className="h-4 w-4" />
                      <span>{selectedDeal.location}</span>
                    </div>
                  </div>
                </div>

                <div className="flex gap-2 self-start md:self-center">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" size="sm">
                        Update Priority <ChevronRight className="h-4 w-4 ml-1" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      {Object.keys(priorityBadges).map((priority) => (
                        <DropdownMenuItem key={priority} onClick={() => updateDealPriority(selectedDeal.id, priority)}>
                          {React.createElement(priorityBadges[priority as keyof typeof priorityBadges].icon, { className: "h-4 w-4 mr-2" })}
                          {priority}
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" size="sm">
                        Update Stage <ChevronRight className="h-4 w-4 ml-1" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      {pipelineStages.map((stage) => (
                        <DropdownMenuItem
                          key={stage.id}
                          disabled={selectedDeal.stage === stage.id}
                          onClick={() => updatePipelineStage(selectedDeal.id, stage.id)}
                        >
                          {React.createElement(stage.icon, { className: `h-4 w-4 mr-2 ${stage.color}` })}
                          {stage.name}
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                  <Button variant="outline" size="sm">
                    <Share2 className="h-4 w-4 mr-2" /> Share
                  </Button>

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" size="sm">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem>
                        <Edit className="h-4 w-4 mr-2" /> Edit Deal
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Download className="h-4 w-4 mr-2" /> Export Data
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <DropdownMenuItem className="text-destructive" onSelect={(e) => e.preventDefault()}>
                            <Trash2 className="h-4 w-4 mr-2" /> Delete Deal
                          </DropdownMenuItem>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                            <AlertDialogDescription>
                              This will permanently remove {selectedDeal.startupName} from your deal pipeline.
                              This action cannot be undone.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => deleteDeal(selectedDeal.id)}
                              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                            >
                              Delete
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>

              {/* Deal Status */}
              <div className="bg-primary/5 rounded-lg p-4 mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="bg-primary text-primary-foreground rounded-full h-12 w-12 flex items-center justify-center text-lg font-bold">
                    {selectedDeal.matchScore}%
                  </div>
                  <div>
                    <h3 className="font-medium">Match Score</h3>
                    <p className="text-sm text-muted-foreground">Based on your investment criteria</p>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <Badge variant="outline" className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" /> Added {formatRelativeTime(selectedDeal.addedDate)}
                  </Badge>

                  <Badge variant="outline" className="flex items-center gap-1">
                    <DollarSign className="h-3 w-3" /> {formatCurrency(selectedDeal.fundRequired)}
                  </Badge>

                  <Badge variant="outline">{selectedDeal.fundingStage}</Badge>

                  {selectedDeal.tags.map(tag => (
                    <Badge key={tag} variant="secondary">{tag}</Badge>
                  ))}

                  {selectedDeal.status && (
                    <Badge
                      variant={(priorityBadges[selectedDeal.status as keyof typeof priorityBadges]?.variant as "destructive" | "default" | "secondary" | "outline") || "default"}
                      className="ml-auto"
                    >
                      {priorityBadges[selectedDeal.status as keyof typeof priorityBadges]?.icon && (
                        React.createElement(priorityBadges[selectedDeal.status as keyof typeof priorityBadges].icon, { className: "h-3 w-3 mr-1" })
                      )}
                      {selectedDeal.status}
                    </Badge>
                  )}
                </div>
              </div>

              {/* Deal Details Tabs */}
              <Tabs defaultValue="overview" className="w-full">
                <TabsList className="grid w-full grid-cols-5">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="tasks">Tasks</TabsTrigger>
                  <TabsTrigger value="meetings">Meetings</TabsTrigger>
                  <TabsTrigger value="documents">Documents</TabsTrigger>
                  <TabsTrigger value="notes">Notes</TabsTrigger>
                </TabsList>

                {/* Overview Tab */}
                <TabsContent value="overview" className="space-y-6 mt-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center">
                          <Users className="h-5 w-5 mr-2 text-primary" />
                          Founder
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center gap-3 mb-3">
                          <Avatar className="h-10 w-10">
                            <AvatarImage src={selectedDeal.avatar} alt={selectedDeal.founder} />
                            <AvatarFallback>{selectedDeal.founder.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{selectedDeal.founder}</p>
                            <p className="text-sm text-muted-foreground">{selectedDeal.founderEmail}</p>
                          </div>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          className="w-full"
                          onClick={() => {
                            // Get user data from localStorage
                            const storedUserData = localStorage.getItem("userData");
                            let userName = "";

                            if (storedUserData) {
                              try {
                                const parsedUserData = JSON.parse(storedUserData);
                                userName = parsedUserData.firstName && parsedUserData.lastName
                                  ? `${parsedUserData.firstName} ${parsedUserData.lastName}`
                                  : parsedUserData.name || "";
                              } catch (error) {
                                console.error("Error parsing user data:", error);
                              }
                            }

                            const subject = `Regarding your startup: ${selectedDeal.startupName}`;
                            const body = `Hello ${selectedDeal.founder},\n\nI'm writing regarding our ongoing discussions about ${selectedDeal.startupName}. The current status of our deal is "${selectedDeal.status}" and we're in the "${pipelineStages.find(s => s.id === selectedDeal.stage)?.name}" stage.\n\nLet's discuss next steps.\n\nRegards,\n${userName}`;
                            window.location.href = `mailto:${selectedDeal.founderEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
                          }}
                        >
                          <Mail className="h-4 w-4 mr-2" /> Contact Founder
                        </Button>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center">
                          <DollarSign className="h-5 w-5 mr-2 text-primary" />
                          Funding
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-3xl font-bold mb-1">{formatCurrency(selectedDeal.fundRequired)}</div>
                        <p className="text-sm text-muted-foreground mb-3">{selectedDeal.fundingStage} Round</p>
                        <CustomProgress value={selectedDeal.matchScore} className="h-2 mb-2" />
                        <p className="text-xs text-muted-foreground">Match score: {selectedDeal.matchScore}%</p>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center">
                          <TrendingUp className="h-5 w-5 mr-2 text-primary" />
                          Traction
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground">{selectedDeal.traction}</p>
                      </CardContent>
                    </Card>
                  </div>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <ClipboardList className="h-5 w-5 mr-2 text-primary" />
                        Deal Status
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-col md:flex-row gap-6">
                        <div className="flex-1">
                          <h3 className="font-medium mb-2">Current Stage</h3>
                          <div className="flex items-center gap-2 mb-6">
                            {pipelineStages.find((s) => s.id === selectedDeal.stage)?.icon && (
                              React.createElement(pipelineStages.find((s) => s.id === selectedDeal.stage)!.icon, {
                                className: `h-5 w-5 ${pipelineStages.find((s) => s.id === selectedDeal.stage)?.color}`
                              })
                            )}
                            <span className="font-medium">{pipelineStages.find((s) => s.id === selectedDeal.stage)?.name}</span>
                          </div>

                          <h3 className="font-medium mb-2">Timeline</h3>
                          <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span>Added to Pipeline</span>
                              <span className="text-muted-foreground">{formatDate(selectedDeal.addedDate)}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span>Last Activity</span>
                              <span className="text-muted-foreground">{formatDate(selectedDeal.lastActivity)}</span>
                            </div>
                          </div>
                        </div>

                        <Separator orientation="vertical" className="hidden md:block" />

                        <div className="flex-1">
                          <h3 className="font-medium mb-2">Next Steps</h3>
                          {selectedDeal.stage === "negotiation" && (
                            <div className="mb-4">
                              <Button 
                                variant="outline" 
                                onClick={(e) => {
                                  e.preventDefault();
                                  e.stopPropagation();
                                  setInvestmentDealId(selectedDeal.id);
                                  setShowInvestmentModal(true);
                                }}
                              >
                                <DollarSign className="h-4 w-4 mr-2" /> Invest in Company
                              </Button>
                            </div>
                          )}
                          {selectedDeal.tasks.filter(task => !task.completed).length > 0 ? (
                            <div className="space-y-2">
                              {selectedDeal.tasks
                                .filter(task => !task.completed)
                                .slice(0, 3)
                                .map(task => (
                                  <div key={task.id} className="flex items-start gap-2">
                                    <div className="h-5 w-5 mt-0.5 rounded-full border border-muted-foreground flex items-center justify-center">
                                      <div className="h-2 w-2 rounded-full bg-muted-foreground"></div>
                                    </div>
                                    <div>
                                      <p className="text-sm">{task.title}</p>
                                      <p className="text-xs text-muted-foreground">Due: {formatDate(task.dueDate)}</p>
                                    </div>
                                  </div>
                                ))}
                              {selectedDeal.tasks.filter(task => !task.completed).length > 3 && (
                                <Button variant="link" size="sm" className="px-0">
                                  View all tasks ({selectedDeal.tasks.filter(task => !task.completed).length})
                                </Button>
                              )}
                            </div>
                          ) : (
                            <p className="text-sm text-muted-foreground">No pending tasks</p>
                          )}
                        </div>                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Tasks Tab */}
                <TabsContent value="tasks" className="space-y-6 mt-6">
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle>Tasks</CardTitle>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button size="sm">
                            <PlusCircle className="h-4 w-4 mr-2" /> Add Task
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px]">
                          <DialogHeader>
                            <DialogTitle>Add New Task</DialogTitle>
                            <DialogDescription>
                              Create a new task for this deal.
                            </DialogDescription>
                          </DialogHeader>
                          <div className="grid gap-4 py-4">
                            <div className="grid gap-2">
                              <Label htmlFor="task-title">Task Title</Label>
                              <Input
                                id="task-title"
                                placeholder="What needs to be done?"
                                value={newTaskTitle}
                                onChange={(e) => setNewTaskTitle(e.target.value)} />
                            </div>
                            <div className="grid gap-2">
                              <Label htmlFor="due-date">Due Date</Label>
                              <Input
                                id="due-date"
                                type="datetime-local"
                                value={newTaskDueDate}
                                onChange={(e) => setNewTaskDueDate(e.target.value)} />
                            </div>
                          </div>
                          <DialogFooter>
                            <Button onClick={() => addTask(selectedDeal.id)}>Add Task</Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    </CardHeader>
                    <CardContent>
                      {selectedDeal.tasks.length > 0 ? (
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <h3 className="text-sm font-medium">Pending Tasks</h3>
                            {selectedDeal.tasks.filter(task => !task.completed).length > 0 ? (
                              selectedDeal.tasks
                                .filter(task => !task.completed)
                                .map(task => (
                                  <div key={task.id} className="flex items-center gap-2 p-2 hover:bg-muted/50 rounded-md">
                                    <Checkbox
                                      checked={task.completed}
                                      onCheckedChange={(checked: boolean) => toggleTaskCompletion(selectedDeal.id, task.id, checked)} />
                                    <div className="flex-1">
                                      <p className="text-sm">{task.title}</p>
                                      <p className="text-xs text-muted-foreground">Due: {formatDate(task.dueDate)}</p>
                                    </div>
                                    <DropdownMenu>
                                      <DropdownMenuTrigger asChild>
                                        <Button variant="ghost" size="icon" className="h-8 w-8">
                                          <MoreHorizontal className="h-4 w-4" />
                                        </Button>
                                      </DropdownMenuTrigger>
                                      <DropdownMenuContent align="end">
                                        <DropdownMenuItem>
                                          <Edit className="h-4 w-4 mr-2" /> Edit
                                        </DropdownMenuItem>
                                        <DropdownMenuItem className="text-destructive">
                                          <Trash2 className="h-4 w-4 mr-2" /> Delete
                                        </DropdownMenuItem>
                                      </DropdownMenuContent>
                                    </DropdownMenu>
                                  </div>
                                ))
                            ) : (
                              <p className="text-sm text-muted-foreground">No pending tasks</p>
                            )}
                          </div>

                          {selectedDeal.tasks.filter(task => task.completed).length > 0 && (
                            <div className="space-y-2">
                              <h3 className="text-sm font-medium">Completed Tasks</h3>
                              {selectedDeal.tasks
                                .filter(task => task.completed)
                                .map(task => (
                                  <div key={task.id} className="flex items-center gap-2 p-2 hover:bg-muted/50 rounded-md">
                                    <Checkbox
                                      checked={task.completed}
                                      onCheckedChange={() => toggleTaskCompletion(selectedDeal.id, task.id, false)} />
                                    <div className="flex-1">
                                      <p className="text-sm line-through text-muted-foreground">{task.title}</p>
                                      <p className="text-xs text-muted-foreground">Completed</p>
                                    </div>
                                    <DropdownMenu>
                                      <DropdownMenuTrigger asChild>
                                        <Button variant="ghost" size="icon" className="h-8 w-8">
                                          <MoreHorizontal className="h-4 w-4" />
                                        </Button>
                                      </DropdownMenuTrigger>
                                      <DropdownMenuContent align="end">
                                        <DropdownMenuItem className="text-destructive">
                                          <Trash2 className="h-4 w-4 mr-2" /> Delete
                                        </DropdownMenuItem>
                                      </DropdownMenuContent>
                                    </DropdownMenu>
                                  </div>
                                ))}
                            </div>
                          )}
                        </div>
                      ) : (
                        <div className="text-center py-6">
                          <ClipboardList className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                          <h3 className="font-medium mb-1">No tasks yet</h3>
                          <p className="text-sm text-muted-foreground mb-4">Create your first task to track progress</p>
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button>
                                <PlusCircle className="h-4 w-4 mr-2" /> Add First Task
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-[425px]">
                              <DialogHeader>
                                <DialogTitle>Add New Task</DialogTitle>
                                <DialogDescription>
                                  Create a new task for this deal.
                                </DialogDescription>
                              </DialogHeader>
                              <div className="grid gap-4 py-4">
                                <div className="grid gap-2">
                                  <Label htmlFor="task-title-empty">Task Title</Label>
                                  <Input
                                    id="task-title-empty"
                                    placeholder="What needs to be done?"
                                    value={newTaskTitle}
                                    onChange={(e) => setNewTaskTitle(e.target.value)} />
                                </div>
                                <div className="grid gap-2">
                                  <Label htmlFor="due-date-empty">Due Date</Label>
                                  <Input
                                    id="due-date-empty"
                                    type="datetime-local"
                                    value={newTaskDueDate}
                                    onChange={(e) => setNewTaskDueDate(e.target.value)} />
                                </div>
                              </div>
                              <DialogFooter>
                                <Button onClick={() => addTask(selectedDeal.id)}>Add Task</Button>
                              </DialogFooter>
                            </DialogContent>
                          </Dialog>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </TabsContent>


                <TabsContent value="meetings" className="space-y-6 mt-6">
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle>Meetings & Calls</CardTitle>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button size="sm">
                            <PlusCircle className="h-4 w-4 mr-2" /> Schedule Meeting
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px]">
                          <DialogHeader>
                            <DialogTitle>Schedule New Meeting</DialogTitle>
                            <DialogDescription>
                              Enter the details for the new meeting.
                            </DialogDescription>
                          </DialogHeader>
                          <div className="grid gap-4 py-4">
                            <div className="grid gap-2">
                              <Label htmlFor="meeting-title">Title</Label>
                              <Input
                                id="meeting-title"
                                placeholder="Meeting Title"
                                value={newMeetingTitle}
                                onChange={(e) => setNewMeetingTitle(e.target.value)} />
                            </div>
                            <div className="grid gap-2">
                              <Label htmlFor="start-time">Start Time</Label>
                              <Input
                                id="start-time"
                                type="datetime-local"
                                value={newMeetingStartTime}
                                onChange={(e) => setNewMeetingStartTime(e.target.value)} />
                            </div>
                            <div className="grid gap-2">
                              <Label htmlFor="end-time">End Time</Label>
                              <Input
                                id="end-time"
                                type="datetime-local"
                                value={newMeetingEndTime}
                                onChange={(e) => setNewMeetingEndTime(e.target.value)} />
                            </div>
                            <div className="grid gap-2">
                              <Label htmlFor="meeting-notes">Notes</Label>
                              <Textarea
                                id="meeting-notes"
                                placeholder="Additional Notes"
                                value={newMeetingNotes}
                                onChange={(e) => setNewMeetingNotes(e.target.value)} />
                            </div>
                          </div>
                          <DialogFooter>
                            <Button
                              onClick={() => {
                                scheduleMeeting(selectedDeal.id);
                                // Only close the dialog if all required fields are filled
                                if (newMeetingTitle && newMeetingStartTime && newMeetingEndTime) {
                                  // Close the dialog - you might need to add state for this
                                  console.log("open")
                                  // setIsDialogOpen(false);
                                }
                              }}
                              disabled={!newMeetingTitle || !newMeetingStartTime || !newMeetingEndTime}
                            >
                              Schedule Meeting
                            </Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    </CardHeader>
                    <CardContent>
                      {selectedDeal.meetings.length > 0 ? (
                        <div className="space-y-4">
                          {selectedDeal.meetings.map((meeting, index) => (
                            <div key={index} className="flex gap-4 p-3 hover:bg-muted/50 rounded-md">
                              <div className="bg-primary/10 rounded-full h-10 w-10 flex items-center justify-center shrink-0">
                                <CalendarClock className="h-5 w-5 text-primary" />
                              </div>
                              <div className="flex-1">
                                <div className="flex justify-between items-start">
                                  <div>
                                    <p className="font-medium">{meeting.type}</p>
                                    <p className="text-sm text-muted-foreground">{formatDate(meeting.date)}</p>
                                  </div>
                                  <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                      <Button variant="ghost" size="icon" className="h-8 w-8">
                                        <MoreHorizontal className="h-4 w-4" />
                                      </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                      <DropdownMenuItem>
                                        <Edit className="h-4 w-4 mr-2" /> Edit
                                      </DropdownMenuItem>
                                      <DropdownMenuItem className="text-destructive">
                                        <Trash2 className="h-4 w-4 mr-2" /> Delete
                                      </DropdownMenuItem>
                                    </DropdownMenuContent>
                                  </DropdownMenu>
                                </div>
                                {meeting.notes && (
                                  <div className="mt-2 text-sm text-muted-foreground">
                                    <p>{meeting.notes}</p>
                                  </div>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="text-center py-6">
                          <CalendarClock className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                          <h3 className="font-medium mb-1">No meetings yet</h3>
                          <p className="text-sm text-muted-foreground mb-4">Schedule your first meeting with this startup</p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </TabsContent>
                <TabsContent value="documents" className="space-y-6 mt-6">
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle>Documents</CardTitle>
                      <Button size="sm">
                        <PlusCircle className="h-4 w-4 mr-2" /> Upload Document
                      </Button>
                    </CardHeader>
                    <CardContent>
                      {selectedDeal.documents.length > 0 ? (
                        <div className="space-y-4">
                          {selectedDeal.documents.map((doc, index) => (
                            <div key={index} className="flex gap-4 p-3 hover:bg-muted/50 rounded-md">
                              <div className="bg-primary/10 rounded-full h-10 w-10 flex items-center justify-center shrink-0">
                                <FileText className="h-5 w-5 text-primary" />
                              </div>
                              <div className="flex-1">
                                <div className="flex justify-between items-start">
                                  <div>
                                    <p className="font-medium">{doc.name}</p>
                                    <p className="text-sm text-muted-foreground">Added {formatRelativeTime(doc.date)}</p>
                                  </div>
                                  <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                      <Button variant="ghost" size="icon" className="h-8 w-8">
                                        <MoreHorizontal className="h-4 w-4" />
                                      </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                      <DropdownMenuItem>
                                        <Download className="h-4 w-4 mr-2" /> Download
                                      </DropdownMenuItem>
                                      <DropdownMenuItem>
                                        <Share2 className="h-4 w-4 mr-2" /> Share
                                      </DropdownMenuItem>
                                      <DropdownMenuSeparator />
                                      <DropdownMenuItem className="text-destructive">
                                        <Trash2 className="h-4 w-4 mr-2" /> Delete
                                      </DropdownMenuItem>
                                    </DropdownMenuContent>
                                  </DropdownMenu>
                                </div>
                                <Button variant="link" size="sm" className="px-0 h-auto" asChild>
                                  <a href={doc.url} target="_blank" rel="noopener noreferrer">
                                    View Document <ExternalLink className="h-3 w-3 ml-1" />
                                  </a>
                                </Button>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="text-center py-6">
                          <FileText className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                          <h3 className="font-medium mb-1">No documents yet</h3>
                          <p className="text-sm text-muted-foreground mb-4">Upload documents like pitch decks, financials, etc.</p>
                          <Button>
                            <PlusCircle className="h-4 w-4 mr-2" /> Upload Document
                          </Button>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Notes Tab */}
                <TabsContent value="notes" className="space-y-6 mt-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Notes</CardTitle>
                      <CardDescription>
                        Add notes and observations about this deal
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <Textarea
                          placeholder="Add a note about this deal..."
                          className="min-h-[100px]"
                          value={newNote}
                          onChange={(e) => setNewNote(e.target.value)} />
                        <Button onClick={() => addNote(selectedDeal.id)}>
                          <MessageSquare className="h-4 w-4 mr-2" /> Add Note
                        </Button>

                        {selectedDeal.notes && (
                          <div className="mt-6">
                            <h3 className="text-sm font-medium mb-2">Previous Notes</h3>
                            <div className="p-4 bg-muted/50 rounded-md whitespace-pre-line">
                              {selectedDeal.notes}
                            </div>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          ) : (
            // 🔹 Deal Flow List View
            <div>
              {/* Header with metrics */}
              <div className="mb-8">
                <h1 className="text-3xl font-bold mb-6">Deal Flow</h1>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                  <Card>
                    <CardContent className="pt-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-muted-foreground">Total Deals</p>
                          <p className="text-3xl font-bold">{dealMetrics.totalDeals}</p>
                        </div>
                        <div className="bg-primary/10 p-3 rounded-full">
                          <ClipboardList className="h-6 w-6 text-primary" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="pt-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-muted-foreground">Pipeline Value</p>
                          <p className="text-3xl font-bold">{formatCurrency(dealMetrics.totalValue)}</p>
                        </div>
                        <div className="bg-primary/10 p-3 rounded-full">
                          <DollarSign className="h-6 w-6 text-primary" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="pt-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-muted-foreground">Closed Deals</p>
                          <p className="text-3xl font-bold">{dealMetrics.closedWonDeals}</p>
                        </div>
                        <div className="bg-green-100 p-3 rounded-full">
                          <CheckCircle className="h-6 w-6 text-green-600" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="pt-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-muted-foreground">Conversion Rate</p>
                          <p className="text-3xl font-bold">{dealMetrics.conversionRate.toFixed(1)}%</p>
                        </div>
                        <div className="bg-primary/10 p-3 rounded-full">
                          <BarChart3 className="h-6 w-6 text-primary" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Filters and controls */}
                <div className="flex flex-col md:flex-row gap-4 mb-6">
                  <div className="flex gap-2">
                    <Button
                      variant={viewMode === "kanban" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setViewMode("kanban")}
                    >
                      Kanban
                    </Button>
                    <Button
                      variant={viewMode === "list" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setViewMode("list")}
                    >
                      List
                    </Button>
                  </div>

                  <div className="relative flex-grow">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      placeholder="Search deals by startup name, industry, or founder..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10" />
                  </div>

                  <div className="flex flex-col sm:flex-row gap-2">
                    <div className="flex items-center gap-2">
                      <Filter className="h-4 w-4 text-muted-foreground" />
                      <Select value={industryFilter} onValueChange={setIndustryFilter}>
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Industry" />
                        </SelectTrigger>
                        <SelectContent>
                          {industries.map(industry => (
                            <SelectItem key={industry} value={industry}>
                              {industry === "all" ? "All Industries" : industry}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <Select value={stageFilter} onValueChange={setStageFilter}>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Stage" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Stages</SelectItem>
                        {pipelineStages.map(stage => (
                          <SelectItem key={stage.id} value={stage.id}>
                            {stage.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    <Select value={sortBy} onValueChange={setSortBy}>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Sort By" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="recent">Recent Activity</SelectItem>
                        <SelectItem value="match">Match Score</SelectItem>
                        <SelectItem value="funding">Funding Amount</SelectItem>
                        <SelectItem value="name">Startup Name</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              {filteredDeals.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="bg-muted/30 rounded-full p-6 mb-4">
                    <Search className="h-10 w-10 text-muted-foreground" />
                  </div>
                  <h2 className="text-xl font-semibold mb-2">No deals found</h2>
                  <p className="text-muted-foreground max-w-md">
                    We couldn't find any deals matching your search criteria. Try adjusting your filters or search query.
                  </p>
                </div>
              ) : viewMode === "kanban" ? (
                // Kanban View
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
                  {pipelineStages.map(stage => (
                    <div key={stage.id} className="flex flex-col">
                      <div className="flex items-center gap-2 mb-3 px-2">
                        <stage.icon className={`h-5 w-5 ${stage.color}`} />
                        <h3 className="font-medium">{stage.name}</h3>
                        <Badge variant="outline" className="ml-auto">
                          {dealsByStage[stage.id].length}
                        </Badge>
                      </div>

                      <div className="space-y-3">
                        {dealsByStage[stage.id].map(deal => (
                          <Card
                            key={deal.id}
                            className="cursor-pointer hover:shadow-md transition-shadow"
                            onClick={() => setSelectedDeal(deal)}
                          >
                            <CardContent className="p-3">
                              <div className="flex items-center gap-2 mb-2">
                                <Avatar className="h-8 w-8">
                                  <AvatarImage src={deal.avatar} alt={deal.startupName} />
                                  <AvatarFallback>{deal.startupName.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <div className="flex-1 min-w-0">
                                  <p className="font-medium text-sm truncate">{deal.startupName}</p>
                                  <div className="flex items-center text-xs text-muted-foreground">
                                    <Building2 className="h-3 w-3 mr-1" />
                                    <span className="truncate">{deal.industry}</span>
                                  </div>
                                </div>
                              </div>

                              <div className="flex items-center justify-between mb-2">
                                <Badge variant="outline" className="text-xs">
                                  {deal.fundingStage}
                                </Badge>
                                <span className="text-sm font-medium">{formatCurrency(deal.fundRequired)}</span>
                              </div>

                              <div className="flex items-center justify-between text-xs">
                                <span className="text-muted-foreground">
                                  {formatRelativeTime(deal.lastActivity)}
                                </span>
                                <div className="flex items-center">
                                  <Star className="h-3 w-3 text-amber-400 mr-1" />
                                  <span>{deal.matchScore}%</span>
                                </div>
                              </div>
                              {deal.status && (
                                <div className="mt-2 pt-2 border-t">
                                  <Badge
                                    variant={(priorityBadges[deal.status as keyof typeof priorityBadges]?.variant as "destructive" | "default" | "secondary" | "outline") || "default"}
                                    className="w-full justify-center"
                                  >
                                    {priorityBadges[deal.status as keyof typeof priorityBadges]?.icon && (
                                      React.createElement(priorityBadges[deal.status as keyof typeof priorityBadges].icon, { className: "h-3 w-3 mr-1" })
                                    )}
                                    {deal.status}
                                  </Badge>
                                </div>
                              )}
                            </CardContent>
                          </Card>
                        ))}

                        {dealsByStage[stage.id].length === 0 && (
                          <div className="bg-muted/30 rounded-lg p-4 text-center">
                            <p className="text-sm text-muted-foreground">No deals in this stage</p>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                // List View
                <div className="space-y-3">
                  {filteredDeals.map(deal => (
                    <Card
                      key={deal.id}
                      className="cursor-pointer hover:shadow-md transition-shadow"
                      onClick={() => setSelectedDeal(deal)}
                    >
                      <CardContent className="p-4">
                        <div className="flex flex-col md:flex-row gap-4">
                          <div className="flex items-center gap-3">
                            <Avatar className="h-10 w-10">
                              <AvatarImage src={deal.avatar} alt={deal.startupName} />
                              <AvatarFallback>{deal.startupName.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium">{deal.startupName}</p>
                              <div className="flex items-center text-sm text-muted-foreground">
                                <Building2 className="h-4 w-4 mr-1" />
                                <span>{deal.industry}</span>
                                <span className="mx-1">•</span>
                                <MapPin className="h-4 w-4 mr-1" />
                                <span>{deal.location}</span>
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center gap-3 md:ml-auto">
                            <div className="flex flex-col items-center">
                              <div className="text-xs text-muted-foreground">Match</div>
                              <div className="flex items-center">
                                <Star className="h-4 w-4 text-amber-400 mr-1" />
                                <span className="font-medium">{deal.matchScore}%</span>
                              </div>
                            </div>

                            <div className="flex flex-col items-center">
                              <div className="text-xs text-muted-foreground">Amount</div>
                              <div className="font-medium">{formatCurrency(deal.fundRequired)}</div>
                            </div>

                            <div className="flex flex-col items-center">
                              <div className="text-xs text-muted-foreground">Stage</div>
                              <div className="flex items-center gap-1">
                                {pipelineStages.find((s: any) => s.id === deal.stage)?.icon && (
                                  React.createElement(pipelineStages.find((s: any) => s.id === deal.stage)!.icon, {
                                    className: `h-4 w-4 ${pipelineStages.find((s: any) => s.id === deal.stage)?.color}`
                                  })
                                )}
                                <span>{pipelineStages.find((s: any) => s.id === deal.stage)?.name}</span>
                              </div>
                            </div>

                            {deal.status && (
                              <Badge
                                variant={(priorityBadges[deal.status as keyof typeof priorityBadges]?.variant as "destructive" | "default" | "secondary" | "outline") || "default"}
                              >
                                {priorityBadges[deal.status as keyof typeof priorityBadges]?.icon && (
                                  React.createElement(priorityBadges[deal.status as keyof typeof priorityBadges].icon, { className: "h-3 w-3 mr-1" })
                                )}
                                {deal.status}
                              </Badge>
                            )}
                            <Button variant="ghost" size="icon">
                              <ChevronRight className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          )}
        </main>
      </div>
    </DashboardShell><Dialog open={showInvestmentModal} onOpenChange={setShowInvestmentModal}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Investment Quotation</DialogTitle>
            <DialogDescription>Enter your investment amount.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="investment-amount">Investment Amount</Label>
              <Input
                id="investment-amount"
                type="number"
                placeholder="Enter amount"
                value={investmentAmount}
                onChange={(e) => setInvestmentAmount(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button onClick={submitInvestment}>Submit Investment</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog></>
  );
}


// // Missing Label component
// function Label({ htmlFor, children }: { htmlFor: string; children: React.ReactNode }) {
//   return (
//     <label
//       htmlFor={htmlFor}
//       className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
//     >
//       {children}
//     </label>
//   )
// }

//   // Missing Checkbox component
//   function Checkbox({ checked, onCheckedChange }: { checked: boolean; onCheckedChange: () => void }) {
//     return (
//       <div
//         className={`h-4 w-4 rounded border flex items-center justify-center cursor-pointer ${checked ? "bg-primary border-primary" : "border-input"}`}
//         onClick={onCheckedChange}
//       >
//         {checked && <Check className="h-3 w-3 text-primary-foreground" />}
//       </div>
//     )
//   }

//   // Investment Modal
//   const [showInvestmentModal, setShowInvestmentModal] = useState(false);
//   const [investmentAmount, setInvestmentAmount] = useState("");
//   const [investmentDealId, setInvestmentDealId] = useState<string | null>(null);

//   const submitInvestment = async () => {
//     if (!investmentDealId || !investmentAmount) return;

//     try {
//       const token = localStorage.getItem("authToken");
//       const response = await fetch(`${API_BASE_URL}/dealflow/${investmentDealId}/invest`, {
//         method: "POST",
//         headers: {
//           Authorization: `Bearer ${token}`,
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ investmentAmount: parseFloat(investmentAmount) }),
//       });

//       if (response.ok) {
//         const updatedDeal = await response.json();
//         setDeals((prevDeals) =>
//           prevDeals.map((deal: Deal) => (deal.id === investmentDealId ? updatedDeal : deal))
//         );
//         setShowInvestmentModal(false);
//         setInvestmentAmount("");
//         console.log("Investment successfully submitted.");
//       } else {
//         console.error("Failed to submit investment:", response.statusText);
//       }
//     } catch (error) {
//       console.error("Error submitting investment:", error);
//     }
//   };

//   const openInvestmentModal = (dealId: string) => {
//     setInvestmentDealId(dealId);
//     setShowInvestmentModal(true);
//   };

//   return (
//     <DashboardShell userType="investor">
//       {/* ... existing code ... */}

//       {/* Investment Modal */}
//       <Dialog open={showInvestmentModal} onOpenChange={setShowInvestmentModal}>
//         <DialogContent className="sm:max-w-[425px]">
//           <DialogHeader>
//             <DialogTitle>Investment Quotation</DialogTitle>
//             <DialogDescription>Enter your investment amount.</DialogDescription>
//           </DialogHeader>
//           <div className="grid gap-4 py-4">
//             <div className="grid gap-2">
//               <Label htmlFor="investment-amount">Investment Amount</Label>
//               <Input
//                 id="investment-amount"
//                 type="number"
//                 placeholder="Enter amount"
//                 value={investmentAmount}
//                 onChange={(e) => setInvestmentAmount(e.target.value)}
//               />
//             </div>
//           </div>
//           <DialogFooter>
//             <Button onClick={submitInvestment}>Submit Investment</Button>
//           </DialogFooter>
//         </DialogContent>
//       </Dialog>

//       {/* ... existing code ... */}

//       {/* Add openInvestmentModal call in the appropriate place, for example: */}
//       {filteredDeals.map(deal => (
//         <Card
//           key={deal.id}
//           className="cursor-pointer hover:shadow-md transition-shadow"
//           onClick={() => setSelectedDeal(deal)}
//         >
//           {/* ... existing code ... */}
//           <Button onClick={() => openInvestmentModal(deal.id)}>Invest</Button> {/* Add this button */}
//           {/* ... existing code ... */}
//         </Card>
//       ))}

//       {/* ... rest of the code ... */}
//     </DashboardShell>
//   );
// }
//   return (
//     <div
//       className={`h-4 w-4 rounded border flex items-center justify-center cursor-pointer ${checked ? "bg-primary border-primary" : "border-input"}`}
//       onClick={onCheckedChange}
//     >
//       {checked && <Check className="h-3 w-3 text-primary-foreground" />}
//     </div>
//   )
// }
// function setDeals(arg0: (prevDeals: any) => any) {
//   throw new Error("Function not implemented.");
// }


