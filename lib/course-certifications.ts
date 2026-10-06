// Maps individual courses (by slug) to the real vendor and the real
// certification exam(s) that course's material prepares a student for.
// Used on the redesigned /careers/[slug] page to build a "what this path
// prepares you for" sidebar, derived from the actual courses in a path's
// stages rather than per-path copy — no links off-site, logos only.

export type CourseCertInfo = {
  logo?: string; // public/brand/logos/<logo>.svg, omitted for courses with no vendor logo
  certification?: string; // real, current exam/credential name
};

export const COURSE_CERTIFICATIONS: Record<string, CourseCertInfo> = {
  // Microsoft / Power BI / Azure
  "power-bi": { logo: "microsoft", certification: "PL-300: Microsoft Power BI Data Analyst" },
  "microsoft-data-bi-developer": { logo: "microsoft" },
  "data-factory": { logo: "azure", certification: "DP-203: Azure Data Engineer Associate (selected topics)" },
  "microsoft-fabric-and-real-time-analytics": { logo: "microsoft", certification: "DP-700: Microsoft Fabric Data Engineer Associate" },
  "azure-fundamentals": { logo: "azure", certification: "AZ-900: Azure Fundamentals" },
  "azure-dba": { logo: "azure", certification: "DP-300: Azure Database Administrator Associate" },
  "advanced-excel-for-data-analysts": { logo: "microsoft" },

  // Snowflake
  snowflake: { logo: "snowflake", certification: "SnowPro Core" },
  "snowflake-data-engineer": { logo: "snowflake", certification: "SnowPro Core" },

  // dbt
  "dbt-analytics-engineering": { certification: "dbt Certified Developer (optional)" },

  // Databricks
  "azure-databricks-and-delta-lake": { logo: "databricks", certification: "Databricks Certified Data Engineer Associate" },
  "advanced-databricks": { logo: "databricks", certification: "Databricks Certified Data Engineer Professional" },
  "databricks-lakehouse-engineer": { logo: "databricks" },

  // AWS
  "aws-data-engineer": { logo: "aws", certification: "AWS Certified Data Engineer – Associate" },
  "aws-fundamentals-for-data-engineers": { logo: "aws" },

  // GitHub / Git / CI-CD
  "git-github-cicd-for-data": { logo: "github" },
  "git-github-for-software-engineers": { logo: "github" },
  "git-and-source-control": { logo: "git" },

  // Airflow
  airflow: { logo: "airflow" },

  // Terraform
  "terraform-bicep-for-data-engineers": { logo: "terraform", certification: "HashiCorp Certified: Terraform Associate" },
  "infrastructure-as-code-with-terraform": { logo: "terraform", certification: "HashiCorp Certified: Terraform Associate" },

  // Kubernetes / Docker
  "kubernetes-orchestration": { logo: "kubernetes", certification: "CKA: Certified Kubernetes Administrator" },
  "docker-and-containers": { logo: "docker", certification: "Docker Certified Associate" },

  // SQL Server
  "t-sql-development": { logo: "sqlserver" },
  "sql-server-database-administrator": { logo: "sqlserver" },

  // Salesforce
  "salesforce-administration": { logo: "salesforce", certification: "Salesforce Certified Administrator" },
  "salesforce-platform-app-builder": { logo: "salesforce", certification: "Salesforce Certified Platform App Builder" },

  // Oracle
  "oracle-fusion-cloud-and-erp-foundations": { logo: "oracle" },
  "accounting-fundamentals-for-oracle-professionals": { logo: "oracle" },
  "oracle-fusion-enterprise-structures-and-chart-of-accounts": { logo: "oracle" },
  "oracle-fusion-general-ledger": { logo: "oracle" },
  "oracle-fusion-accounts-payable": { logo: "oracle" },
  "oracle-fusion-accounts-receivable": { logo: "oracle" },
  "oracle-fusion-cash-management": { logo: "oracle" },
  "oracle-fusion-fixed-assets": { logo: "oracle" },
  "oracle-fusion-expenses": { logo: "oracle" },
  "oracle-fusion-procure-to-pay": { logo: "oracle" },
  "oracle-fusion-order-to-cash": { logo: "oracle" },
  "oracle-fusion-subledger-accounting": { logo: "oracle" },
  "oracle-financial-reporting": { logo: "oracle" },
  "sql-for-oracle-financials": { logo: "oracle" },
  "fbdi-and-adfdi": { logo: "oracle" },
  "oracle-fusion-security": { logo: "oracle" },
  "oracle-fusion-implementation-lifecycle": { logo: "oracle" },
  "troubleshooting-oracle-financials": { logo: "oracle" },

  // Tableau (no official logo asset sourced yet — certification text only, no fabricated mark)
  tableau: { certification: "Tableau Certified Data Analyst" },

  // Azure data/AI/database roles
  "azure-database-administrator": { logo: "azure", certification: "DP-300: Azure Database Administrator Associate" },
  "azure-data-science": { logo: "azure", certification: "DP-100: Azure Data Scientist Associate" },
  "azure-ai-and-cloud-for-ai-engineers": { logo: "azure", certification: "AI-102: Azure AI Engineer Associate" },

  // AWS
  "aws-data-engineering": { logo: "aws", certification: "AWS Certified Data Engineer – Associate" },
  "aws-data-science": { logo: "aws", certification: "AWS Certified Machine Learning – Specialty" },

  // Databricks
  "advanced-databricks-specialization": { logo: "databricks", certification: "Databricks Certified Data Engineer Professional" },

  // Microsoft Purview / Fabric governance (no standalone public exam yet — logo only)
  "microsoft-purview": { logo: "microsoft" },
  "microsoft-fabric-data-governance": { logo: "microsoft" },
  "power-bi-governance": { logo: "microsoft" },
  "cloud-data-governance-azure-and-aws": { logo: "azure" },
  "databricks-unity-catalog-governance": { logo: "databricks" },
  "snowflake-data-governance": { logo: "snowflake" },

  // SQL Server DBA track (no standalone current DBA exam beyond DP-300 above — logo only)
  "t-sql-for-database-administrators": { logo: "sqlserver" },
  "sql-server-database-administration": { logo: "sqlserver" },
  "sql-server-performance-tuning": { logo: "sqlserver" },
  "sql-server-ha-backup-and-disaster-recovery": { logo: "sqlserver" },

  // Docker (AI-engineering deployment course, same real cert as the DevOps track)
  "docker-and-deployment-for-ai-applications": { logo: "docker", certification: "Docker Certified Associate" },

  // Salesforce (course-level logos only — this path's real certification names come from
  // its own certificationRoadmap, not invented here, to avoid duplicating/approximating them)
  "programming-foundations-for-salesforce": { logo: "salesforce" },
  "apex-programming": { logo: "salesforce" },
  "lightning-web-components": { logo: "salesforce" },
  "salesforce-apis": { logo: "salesforce" },
  "salesforce-dx": { logo: "salesforce" },
  "salesforce-and-crm-foundations": { logo: "salesforce" },
};

/** Collects the deduplicated set of real certifications implied by a list of course slugs. */
export function certificationsForCourses(courseSlugs: string[]): { logo?: string; certification: string }[] {
  const seen = new Set<string>();
  const out: { logo?: string; certification: string }[] = [];
  for (const slug of courseSlugs) {
    const info = COURSE_CERTIFICATIONS[slug];
    if (info?.certification && !seen.has(info.certification)) {
      seen.add(info.certification);
      out.push({ logo: info.logo, certification: info.certification });
    }
  }
  return out;
}
