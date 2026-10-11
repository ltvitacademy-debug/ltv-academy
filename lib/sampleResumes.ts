// Sample resumes shown on a career path page — a fictional graduate ("John Doe")
// demonstrating what a student can credibly claim after finishing that path's
// stages. Rendered in-site (see components/careers/ResumeView.tsx), not as a
// downloadable file.
//
// Add a path by creating lib/sample-resumes-data/<path-slug>.ts exporting a
// `RESUMES: PathResumes` object (one entry per stage worth a resume, keyed by
// a URL-safe level slug — not limited to "job-ready"/"advanced"; use whatever
// level slugs/labels actually match that path's own stages), then import and
// register it below. Each path's data lives in its own file specifically so
// multiple paths can be authored at once without touching a shared file.

export * from "./sampleResumeTypes";
import type { PathResumes, ResumeData } from "./sampleResumeTypes";

import { RESUMES as MICROSOFT_DATA_BI_DEVELOPER } from "./sample-resumes-data/microsoft-data-bi-developer";
import { RESUMES as DATA_ANALYST_BI_ENGINEER } from "./sample-resumes-data/data-analyst-bi-engineer";
import { RESUMES as ANALYTICS_ENGINEER } from "./sample-resumes-data/analytics-engineer";
import { RESUMES as BLOCKCHAIN_ENGINEER } from "./sample-resumes-data/blockchain-engineer";
import { RESUMES as AZURE_DATABASE_ENGINEER } from "./sample-resumes-data/azure-database-engineer";
import { RESUMES as DEVOPS_ENGINEER } from "./sample-resumes-data/devops-engineer";
import { RESUMES as DATA_SCIENTIST } from "./sample-resumes-data/data-scientist";
import { RESUMES as SALESFORCE_ADMINISTRATOR } from "./sample-resumes-data/salesforce-administrator";
import { RESUMES as AI_ENGINEER } from "./sample-resumes-data/ai-engineer";
import { RESUMES as DATABRICKS_LAKEHOUSE_ENGINEER } from "./sample-resumes-data/databricks-lakehouse-engineer";
import { RESUMES as AZURE_FABRIC_DATA_ENGINEER } from "./sample-resumes-data/azure-fabric-data-engineer";
import { RESUMES as ORACLE_FUSION_FINANCIALS_CONSULTANT } from "./sample-resumes-data/oracle-fusion-financials-consultant";
import { RESUMES as SNOWFLAKE_DATA_ENGINEER } from "./sample-resumes-data/snowflake-data-engineer";
import { RESUMES as AWS_DATA_ENGINEER } from "./sample-resumes-data/aws-data-engineer";
import { RESUMES as SQL_SERVER_DATABASE_ADMINISTRATOR } from "./sample-resumes-data/sql-server-database-administrator";
import { RESUMES as DATA_GOVERNANCE } from "./sample-resumes-data/data-governance";
import { RESUMES as QUANTITATIVE_DEVELOPER_RESEARCHER } from "./sample-resumes-data/quantitative-developer-researcher";

export const SAMPLE_RESUMES: Record<string, PathResumes> = {
  "microsoft-data-bi-developer": MICROSOFT_DATA_BI_DEVELOPER,
  "data-analyst-bi-engineer": DATA_ANALYST_BI_ENGINEER,
  "analytics-engineer": ANALYTICS_ENGINEER,
  "blockchain-engineer": BLOCKCHAIN_ENGINEER,
  "azure-database-engineer": AZURE_DATABASE_ENGINEER,
  "devops-engineer": DEVOPS_ENGINEER,
  "data-scientist": DATA_SCIENTIST,
  "salesforce-administrator": SALESFORCE_ADMINISTRATOR,
  "ai-engineer": AI_ENGINEER,
  "databricks-lakehouse-engineer": DATABRICKS_LAKEHOUSE_ENGINEER,
  "azure-fabric-data-engineer": AZURE_FABRIC_DATA_ENGINEER,
  "oracle-fusion-financials-consultant": ORACLE_FUSION_FINANCIALS_CONSULTANT,
  "snowflake-data-engineer": SNOWFLAKE_DATA_ENGINEER,
  "aws-data-engineer": AWS_DATA_ENGINEER,
  "sql-server-database-administrator": SQL_SERVER_DATABASE_ADMINISTRATOR,
  "data-governance": DATA_GOVERNANCE,
  "quantitative-developer-researcher": QUANTITATIVE_DEVELOPER_RESEARCHER,
};

export function getSampleResume(pathSlug: string, level: string): ResumeData | undefined {
  return SAMPLE_RESUMES[pathSlug]?.[level];
}

export function getSampleResumeLevels(pathSlug: string): { key: string; label: string }[] {
  const entry = SAMPLE_RESUMES[pathSlug];
  if (!entry) return [];
  return Object.entries(entry).map(([key, data]) => ({ key, label: data.levelLabel }));
}

export function getAllSampleResumeParams(): { slug: string; level: string }[] {
  return Object.entries(SAMPLE_RESUMES).flatMap(([slug, levels]) =>
    Object.keys(levels).map((level) => ({ slug, level }))
  );
}
