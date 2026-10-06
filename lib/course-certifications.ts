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
