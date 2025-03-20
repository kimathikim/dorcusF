/**
 * Service to fetch and handle grants data from ICTWorks and other sources
 */

// Temporary sample data until we implement real API fetching
export const sampleGrants = [
  {
    id: 1,
    title: "Digital Innovation Grant for Sub-Saharan Africa",
    organization: "ICTWorks",
    amount: "$25,000",
    dateposted: "2023-12-15",
    category: "Technology",
    region: "Africa",
    description: "Supporting innovative digital solutions addressing local challenges in Sub-Saharan Africa with a focus on health, education, and agriculture.",
    url: "https://www.ictworks.org/digital-innovation-grant-africa/",
    eligibility: "Early-stage startups with at least an MVP and registered in an African country."
  },
  {
    id: 2,
    title: "Women in Tech Entrepreneurship Fund",
    organization: "ICTWorks",
    amount: "$50,000",
    dateposted: "2024-01-30",
    category: "Women Entrepreneurs",
    region: "Global",
    description: "Funding female-led tech startups working on solutions with significant social impact across developing markets.",
    url: "https://form.jotform.com/250563635168360",
    eligibility: "Tech startups with at least one female founder and a working product."
  },
  {
    id: 3,
    title: "Climate Tech Innovation Grant",
    organization: "ICTWorks",
    amount: "$75,000",
    dateposted: "2024-02-28",
    category: "Climate Change",
    region: "Global",
    description: "Supporting startups developing technological solutions to address climate change challenges in emerging markets.",
    url: "https://www.ictworks.org/climate-tech-innovation-grant/",
    eligibility: "Early to mid-stage startups with proven climate impact metrics."
  },

  {
    id: 4,
    title: "Digital Health Accelerator Program",
    organization: "ICTWorks",
    amount: "$30,000",
    dateposted: "2024-03-15",
    category: "Healthcare",
    region: "Asia, Africa",
    description: "Funding and mentorship for startups working on digital health solutions for underserved communities in developing countries.",
    url: "https://www.ictworks.org/digital-health-accelerator/",
    eligibility: "Healthcare startups with existing pilot programs and clear impact data."
  },
  {
    id: 5,
    title: "Fintech for Financial Inclusion",
    organization: "ICTWorks",
    amount: "$40,000",
    dateposted: "2024-04-10",
    category: "Financial Services",
    region: "Latin America, Africa",
    description: "Supporting innovative fintech solutions aimed at increasing financial inclusion in underbanked populations.",
    url: "https://www.ictworks.org/fintech-financial-inclusion/",
    eligibility: "Startups with a focus on financial services for underserved communities."
  }
];

// Function to actually fetch grants from ICTWorks
// This would normally use fetch() to get real data from the ICTWorks API
export const fetchICTWorksGrants = async () => {
  try {
    // In a real implementation, this would be an API call to ICTWorks
    // const response = await fetch('https://api.ictworks.org/grants');
    // const data = await response.json();

    // For now, we'll use our sample data
    return {
      success: true,
      data: sampleGrants
    };
  } catch (error) {
    console.error('Error fetching grants:', error);
    return {
      success: false,
      error: 'Failed to fetch grants data'
    };
  }
};

// Function to submit a grant application
export const submitGrantApplication = async (grantId: number, applicationData: any) => {
  try {
    // In a real implementation, this would submit to a backend API
    // const response = await fetch('https://api.example.com/grant-applications', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ grantId, ...applicationData })
    // });
    // const data = await response.json();

    // For now, we'll simulate a successful response
    console.log('Application submitted:', { grantId, ...applicationData });

    return {
      success: true,
      message: 'Application submitted successfully!'
    };
  } catch (error) {
    console.error('Error submitting application:', error);
    return {
      success: false,
      error: 'Failed to submit application'
    };
  }
};

