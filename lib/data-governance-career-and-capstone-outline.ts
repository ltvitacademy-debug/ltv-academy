// The Data Governance Career & Capstone course outline — FRAMEWORK ONLY (chapter and lesson
// titles, no lesson content yet). Lessons without a contentDir render as
// "in production". Part of the Data Governance career path.

export type LessonMeta = {
  n: number;
  slug: string;
  title: string;
  contentDir?: string; // under content/data-governance-career-and-capstone/
  videoUrl?: string;
  durationLabel?: string;
};

export type ChapterMeta = { n: number; title: string; lessons: LessonMeta[] };

const L = (n: number, slug: string, title: string, extra?: Partial<LessonMeta>): LessonMeta => ({
  n,
  slug,
  title,
  ...extra,
});

export const GOV_DATA_GOVERNANCE_CAREER_AND_CAPSTONE_CHAPTERS: ChapterMeta[] = [
  {
    n: 1,
    title: "Capstone: LTV Global Data Governance Program",
    lessons: [
      L(1, "capstone-kickoff-the-ltv-global-scenario", "Capstone Kickoff: The LTV Global Scenario"),
      L(2, "reviewing-the-data-landscape", "Reviewing the Data Landscape"),
      L(3, "identifying-critical-data-elements", "Identifying Critical Data Elements"),
      L(4, "assigning-data-owners-and-data-stewards", "Assigning Data Owners and Data Stewards"),
      L(5, "building-the-business-glossary-and-data-dictionary", "Building the Business Glossary and Data Dictionary"),
      L(6, "classifying-sensitive-data", "Classifying Sensitive Data"),
      L(7, "creating-data-quality-rules-and-sql-checks", "Creating Data Quality Rules and SQL Checks"),
      L(8, "documenting-data-lineage", "Documenting Data Lineage"),
      L(9, "identifying-authoritative-data-sources", "Identifying Authoritative Data Sources"),
      L(10, "designing-access-and-retention-policies", "Designing Access and Retention Policies"),
      L(11, "developing-governance-kpis-and-workflows", "Developing Governance KPIs and Workflows"),
      L(12, "creating-the-governance-operating-model", "Creating the Governance Operating Model"),
      L(13, "developing-the-ai-governance-strategy", "Developing the AI Governance Strategy"),
      L(14, "designing-the-governance-architecture", "Designing the Governance Architecture"),
      L(15, "assembling-the-deliverables", "Assembling the Deliverables"),
      L(16, "writing-the-enterprise-data-governance-strategy", "Writing the Enterprise Data Governance Strategy"),
      L(17, "building-the-executive-presentation", "Building the Executive Presentation"),
      L(18, "final-review-and-retrospective", "Final Review and Retrospective"),
    ],
  },
  {
    n: 2,
    title: "Career Preparation",
    lessons: [
      L(19, "data-governance-career-paths-and-roles", "Data Governance Career Paths and Roles"),
      L(20, "resume-preparation-for-governance-roles", "Resume Preparation for Governance Roles"),
      L(21, "linkedin-and-portfolio-development", "LinkedIn and Portfolio Development"),
      L(22, "governance-portfolio-review", "Governance Portfolio Review"),
      L(23, "explaining-your-capstone-in-interviews", "Explaining Your Capstone in Interviews"),
      L(24, "the-governance-interview-landscape", "The Governance Interview Landscape"),
      L(25, "scenario-based-governance-questions", "Scenario-Based Governance Questions"),
      L(26, "data-quality-and-sql-interview-practice", "Data Quality and SQL Interview Practice"),
      L(27, "metadata-and-lineage-interview-questions", "Metadata and Lineage Interview Questions"),
      L(28, "security-privacy-and-ai-governance-questions", "Security, Privacy and AI Governance Questions"),
      L(29, "stakeholder-presentations-and-communication", "Stakeholder Presentations and Communication"),
      L(30, "governance-certifications-overview", "Governance Certifications Overview"),
      L(31, "working-with-data-teams-as-a-governance-analyst", "Working With Data Teams as a Governance Analyst"),
      L(32, "salary-and-offer-basics", "Salary and Offer Basics"),
      L(33, "your-first-90-days-in-a-governance-role", "Your First 90 Days in a Governance Role"),
      L(34, "the-long-path-to-data-governance-architect", "The Long Path to Data Governance Architect"),
      L(35, "path-complete-next-steps", "Path Complete: Next Steps"),
    ],
  },
];
