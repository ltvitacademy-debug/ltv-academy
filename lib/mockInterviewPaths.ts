// Career paths enabled for the Professional Mock Interview. Pure, client-safe
// constant (no fs) shared between the selection page and the session page so
// the two can't drift out of sync. The session/turn engine (Netlify
// Functions) is already careerPath-driven — adding a path here is enough to
// make it selectable; each path falls back gracefully if its optional
// competency/scenario/project-ownership content hasn't been authored yet
// (see lib/mockInterview.ts).
//
// 2026-11-13: expanded from the original 2-path pilot (Snowflake,
// Microsoft Data & BI Developer) to every path in lib/career-paths.ts — all
// 20 primary paths plus all 8 destinations. All 20 primary paths already
// have real Interview Prep Center question banks
// (content/interview-prep/<slug>/) to seed from. Of the 8 destinations,
// only quantitative-developer-researcher and quantitative-trader do;
// the other 6 (bi-to-data-architect, principal-data-engineer,
// principal-staff-ai-engineer, ai-ml-research-and-alignment-engineer,
// ai-infrastructure-ml-systems-engineer, salesforce-architect) run on fully
// AI-improvised questions via the same graceful-fallback design — still
// functional, just without a path-specific seed bank yet.
export const MOCK_INTERVIEW_PATHS = [
  // Primary paths (20) — in the same order as lib/career-paths.ts / the /careers page
  "microsoft-data-bi-developer",
  "data-analyst-bi-engineer",
  "analytics-engineer",
  "azure-fabric-data-engineer",
  "databricks-lakehouse-engineer",
  "aws-data-engineer",
  "snowflake-data-engineer",
  "azure-database-engineer",
  "sql-server-database-administrator",
  "data-governance",
  "data-scientist",
  "ai-engineer",
  "salesforce-administrator",
  "oracle-fusion-financials-consultant",
  "devops-engineer",
  "blockchain-engineer",
  "quantum-computing-engineer",
  "servicenow-developer-architect",
  "cybersecurity-analyst-security-engineer",
  "cloud-engineer-cloud-architect",
  // Destinations (8)
  "bi-to-data-architect",
  "principal-data-engineer",
  "principal-staff-ai-engineer",
  "ai-ml-research-and-alignment-engineer",
  "ai-infrastructure-ml-systems-engineer",
  "salesforce-architect",
  "quantitative-developer-researcher",
  "quantitative-trader",
];
