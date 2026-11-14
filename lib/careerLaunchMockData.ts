// Placeholder data for the LTV Career Launch prototype (app/app/career-launch,
// app/admin/career-launch). No backend, no Prisma, no real students — this
// exists purely so the UI/UX can be reviewed before any of it gets built for
// real. See memory: "LTV Career Launch" for the staged build plan.

export type ApplicationStatus =
  | "discovered"
  | "tailored"
  | "staff_review"
  | "submitted"
  | "response"
  | "interview"
  | "rejected";

export const STATUS_LABEL: Record<ApplicationStatus, string> = {
  discovered: "Discovered",
  tailored: "Tailored",
  staff_review: "Staff review",
  submitted: "Submitted",
  response: "Employer response",
  interview: "Interview",
  rejected: "Closed — no fit",
};

export const STATUS_ORDER: ApplicationStatus[] = [
  "discovered",
  "tailored",
  "staff_review",
  "submitted",
  "response",
  "interview",
];

export type MockApplication = {
  id: string;
  studentName: string;
  studentPath: string;
  company: string;
  role: string;
  location: string;
  remote: boolean;
  matchScore: number;
  status: ApplicationStatus;
  discoveredAt: string;
  salaryRange?: string;
  baseResumeBullet: string;
  tailoredResumeBullet: string;
  coverLetterExcerpt: string;
  staffNote?: string;
};

export const MOCK_STUDENT = {
  name: "Jordan Alvarez",
  careerPath: "Azure & Fabric Data Engineer",
  mockInterviewResult: "Passed — Advanced, Certificate Eligible",
  eligibleSince: "Nov 3, 2026",
};

export const MOCK_PREFERENCES = {
  targetRoles: ["Data Engineer", "Cloud Data Engineer", "Analytics Engineer"],
  locations: ["Atlanta, GA", "Remote (US)"],
  compFloor: "$75,000",
  workAuth: "U.S. Citizen — no sponsorship needed",
  excludedCompanies: ["Comcast", "Intuit"],
  weeklyApplicationTarget: 15,
  startAvailability: "Immediately",
};

export const MOCK_APPLICATIONS: MockApplication[] = [
  {
    id: "app-1",
    studentName: "Jordan Alvarez",
    studentPath: "Azure & Fabric Data Engineer",
    company: "Northstar Analytics",
    role: "Data Engineer I",
    location: "Atlanta, GA",
    remote: false,
    matchScore: 81,
    status: "discovered",
    discoveredAt: "Today, 6:12 AM",
    salaryRange: "$70k–$85k",
    baseResumeBullet:
      "Built ETL pipelines moving on-prem SQL Server data into Azure Data Lake using ADF.",
    tailoredResumeBullet:
      "Built ETL pipelines moving on-prem SQL Server data into Azure Data Lake using ADF — matches Northstar's listed stack (ADF, Synapse, Power BI).",
    coverLetterExcerpt:
      "Not yet drafted — still in discovery. Matching runs before tailoring begins.",
  },
  {
    id: "app-2",
    studentName: "Jordan Alvarez",
    studentPath: "Azure & Fabric Data Engineer",
    company: "Vantage Retail Group",
    role: "Cloud Data Engineer",
    location: "Remote (US)",
    remote: true,
    matchScore: 88,
    status: "tailored",
    discoveredAt: "Yesterday, 2:40 PM",
    salaryRange: "$80k–$95k",
    baseResumeBullet:
      "Migrated a 200GB on-prem data warehouse to a cloud lakehouse, cutting reporting latency by 40%.",
    tailoredResumeBullet:
      "Migrated a 200GB on-prem data warehouse to Microsoft Fabric's OneLake, cutting reporting latency by 40% — directly maps to Vantage's Fabric migration initiative mentioned in the posting.",
    coverLetterExcerpt:
      "“...your posting specifically calls out the move from legacy SSIS pipelines to Fabric pipelines — that's the exact migration I led in my capstone project, down to the same source system (SQL Server) and target (OneLake)...”",
  },
  {
    id: "app-3",
    studentName: "Priya Natarajan",
    studentPath: "Databricks & Lakehouse Engineer",
    company: "BrightPoint Health",
    role: "Associate Data Engineer",
    location: "Remote (US)",
    remote: true,
    matchScore: 79,
    status: "staff_review",
    discoveredAt: "2 days ago",
    salaryRange: "$72k–$88k",
    baseResumeBullet:
      "Built Delta Lake pipelines for claims data, implementing SCD Type 2 for historical accuracy.",
    tailoredResumeBullet:
      "Built Delta Lake pipelines for healthcare claims data, implementing SCD Type 2 for historical accuracy and HIPAA-aware access controls — aligned to BrightPoint's healthcare-data compliance requirements.",
    coverLetterExcerpt:
      "“...healthcare data comes with compliance stakes most pipelines don't — in my capstone I built access controls around PHI-adjacent claims data using the same Unity Catalog pattern BrightPoint's stack likely relies on...”",
    staffNote: "Flag: confirm no real PHI was referenced from capstone dataset before this goes out.",
  },
  {
    id: "app-4",
    studentName: "Marcus Webb",
    studentPath: "AWS Data Engineer",
    company: "Meridian Logistics",
    role: "Data Platform Engineer",
    location: "Remote (US)",
    remote: true,
    matchScore: 84,
    status: "staff_review",
    discoveredAt: "2 days ago",
    salaryRange: "$85k–$100k",
    baseResumeBullet:
      "Orchestrated batch and streaming pipelines on AWS using Glue, Kinesis, and Redshift.",
    tailoredResumeBullet:
      "Orchestrated batch and streaming freight-tracking pipelines on AWS using Glue, Kinesis, and Redshift — mirrors Meridian's real-time shipment visibility use case.",
    coverLetterExcerpt:
      "“...logistics data is a timing problem as much as a volume problem — my Kinesis pipeline kept shipment-status updates under a 2-minute SLA end to end, which is the same bar your posting sets...”",
  },
  {
    id: "app-5",
    studentName: "Jordan Alvarez",
    studentPath: "Azure & Fabric Data Engineer",
    company: "Meridian Logistics",
    role: "Data Platform Engineer",
    location: "Remote (US)",
    remote: true,
    matchScore: 76,
    status: "submitted",
    discoveredAt: "4 days ago",
    salaryRange: "$85k–$100k",
    baseResumeBullet:
      "Built ETL pipelines moving on-prem SQL Server data into Azure Data Lake using ADF.",
    tailoredResumeBullet:
      "Built ETL pipelines moving on-prem SQL Server data into Azure Data Lake using ADF, with downstream monitoring comparable to Meridian's freight-tracking SLAs.",
    coverLetterExcerpt:
      "“...I'm applying from an Azure background rather than AWS, but the pipeline-reliability problem is the same one — keeping a data platform trustworthy enough that ops teams act on it in real time...”",
    staffNote: "Approved and submitted via Greenhouse sandbox — 11/10, 9:14 AM.",
  },
  {
    id: "app-6",
    studentName: "Jordan Alvarez",
    studentPath: "Azure & Fabric Data Engineer",
    company: "Fairview Insurance Group",
    role: "Junior Data Engineer",
    location: "Remote (US)",
    remote: true,
    matchScore: 90,
    status: "response",
    discoveredAt: "1 week ago",
    salaryRange: "$68k–$78k",
    baseResumeBullet:
      "Designed star-schema data marts for self-service BI reporting across 3 business units.",
    tailoredResumeBullet:
      "Designed star-schema data marts for self-service BI reporting across 3 business units, including a claims-reporting mart similar to Fairview's described use case.",
    coverLetterExcerpt:
      "“...self-service reporting only works if the underlying model is boring and predictable — that's exactly what I optimized for when I built the claims-adjacent data mart in my capstone...”",
    staffNote: "Recruiter replied requesting a 20-minute phone screen — handed off to student 11/12.",
  },
  {
    id: "app-7",
    studentName: "Jordan Alvarez",
    studentPath: "Azure & Fabric Data Engineer",
    company: "Cascade Energy Partners",
    role: "Data Engineer",
    location: "Remote (US)",
    remote: true,
    matchScore: 85,
    status: "interview",
    discoveredAt: "2 weeks ago",
    salaryRange: "$82k–$97k",
    baseResumeBullet:
      "Automated data quality checks across 40+ pipeline tables using Great Expectations.",
    tailoredResumeBullet:
      "Automated data quality checks across 40+ pipeline tables using Great Expectations, catching schema drift before it reached energy-usage dashboards — same failure mode Cascade's posting flags as a pain point.",
    coverLetterExcerpt:
      "“...you mentioned 'silent pipeline failures' in the posting — that's the exact problem I built automated data-quality gates to catch...”",
    staffNote: "First-round technical interview scheduled 11/18 — student handling directly from here.",
  },
  {
    id: "app-8",
    studentName: "Jordan Alvarez",
    studentPath: "Azure & Fabric Data Engineer",
    company: "Summit Retail Analytics",
    role: "Data Engineer, Reporting",
    location: "Remote (US)",
    remote: true,
    matchScore: 68,
    status: "rejected",
    discoveredAt: "3 weeks ago",
    salaryRange: "$65k–$75k",
    baseResumeBullet:
      "Designed star-schema data marts for self-service BI reporting across 3 business units.",
    tailoredResumeBullet:
      "Designed star-schema data marts for self-service BI reporting across 3 business units — adapted for retail reporting terminology.",
    coverLetterExcerpt:
      "“...retail reporting lives and dies on clean dimensional modeling, which is what I focused on in my capstone project...”",
    staffNote: "Auto-reply: role filled internally. No action needed.",
  },
];

export function applicationsForStudent(name: string) {
  return MOCK_APPLICATIONS.filter((a) => a.studentName === name);
}

export function pendingStaffReview() {
  return MOCK_APPLICATIONS.filter((a) => a.status === "tailored" || a.status === "staff_review");
}
