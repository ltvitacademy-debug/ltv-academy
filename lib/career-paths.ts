// Career path definitions for the /careers selector and per-path pages.
// Each stage lists course slugs (matching COURSES in lib/courses.ts) in the
// order a student should take them. A stage may instead list pathChoiceSlugs
// when the stage is "pick one of these other paths" rather than a flat
// course sequence (used only by the Principal Data Engineer destination path).

export type PathStage = {
  label: string;
  note?: string;
  courseSlugs?: string[];
  pathChoiceSlugs?: string[];
  capstone?: boolean; // rendered as a prominent dark panel
  checkpoint?: { kind: "checkpoint" | "milestone" | "destination"; label: string; items: string[]; note?: string };
};

export type CareerPath = {
  slug: string;
  title: string;
  targetJobs: string[];
  description: string;
  salaryRange?: string; // omitted where no verified range has been supplied
  certification?: string;
  isDestination?: boolean; // shown as an advanced destination, not a first choice
  // Optional richer page content (used by destination pages that need more than one paragraph)
  subtitle?: string;
  longDescription?: string[]; // paragraphs shown before the capstone flow
  capstoneFlow?: string[]; // steps rendered as an arrow sequence
  afterFlow?: string[]; // paragraphs shown after the capstone flow
  compensation?: { heading: string; paragraphs: string[] };
  progression?: { heading: string; ladder: string; levels: { label: string; value: string }[] };
  // Extra one-line detail shown under a course's tagline on the path page, keyed by course slug
  courseDetails?: Record<string, string>;
  courseDetailLists?: Record<string, { heading: string; items: string[] }[]>;
  showLessonTotals?: boolean; // show a section lesson total and a program total, computed from the courses
  positioning?: { heading: string; paragraphs: string[] };
  certificationRoadmap?: { heading: string; steps: { label: string; items: string[] }[]; notice: string };
  freeLab?: {
    eyebrow: string;
    heading: string;
    intro: string[];
    listLabel: string;
    items: string[];
    buttons: { label: string; url: string }[];
    notes: string[];
  };
  milestones?: { label: string; value: string }[];
  specializations?: { heading: string; primaryLabel: string; primary: string[]; optionalLabel: string; optional: string[] };
  // A prominent third-party requirement block shown before the course sections
  labRequirement?: {
    eyebrow: string;
    heading: string;
    intro: string[];
    optionLabel: string;
    optionLines: string[];
    buttonLabel: string;
    buttonUrl: string;
    importantNote: string;
    whenHeading: string;
    whenText: string;
    verifiedNote: string;
  };
  stages: PathStage[];
  destinationNote: string;
};

export const CAREER_PATHS: CareerPath[] = [
  {
    slug: "microsoft-data-bi-developer",
    title: "Microsoft Data & BI Developer",
    targetJobs: ["Junior BI Developer", "SQL/BI Developer", "Report Developer", "Power BI Developer", "Data & BI Developer"],
    description:
      "This is the actual foundation program — SQL Server, SSIS, SSRS, Power BI, and data warehousing, taught together as one complete stack, no Python or Tableau required. Those are skills to add later, once you're already employable. You'll move from raw data through SQL Server and SSIS-driven ETL into a proper star-schema warehouse, then serve it two ways — SSRS for paginated reporting, Power BI for analytics — and finish with a capstone that ties the entire stack together plus real resume, portfolio, and interview preparation. Every other path in this catalog is something you add after this one, not instead of it.",
    salaryRange: "$75K to start as a Microsoft BI/SQL Developer · $125K+ within 5 years, before choosing an advanced specialization",
    certification: "PL-300 is a natural add-on once Power BI Development is complete, though this program isn't built around a single exam",
    stages: [
      {
        label: "Job Ready",
        note: "The whole program — this is the complete foundation, not step one of something bigger",
        courseSlugs: [
          "t-sql-development",
          "ssis-development",
          "ssrs-development",
          "power-bi",
          "data-modeling-and-data-warehousing",
          "microsoft-bi-capstone",
        ],
      },
    ],
    destinationNote:
      "This program doesn't lead to a single destination — it leads to a first job. Once you're working, the rest of this catalog becomes optional next steps, not required ones: Analytics Engineer, Azure/Fabric Data Engineer, Snowflake Data Engineer, Azure Database Engineer, and Salesforce Data Analyst all build on exactly what you just learned here. Get job-ready first. Then decide how far you want to go.",
  },
  {
    slug: "data-analyst-bi-engineer",
    title: "Data Analyst → BI Engineer",
    targetJobs: ["Data Analyst", "BI Analyst", "Senior BI Analyst", "BI Developer", "BI Engineer"],
    description:
      "This is the most direct way into a data career. You'll learn SQL Server fundamentals, then build real dashboards in Power BI and Tableau, add just enough Python to extend what point-and-click tools can't do, and round it out with the advanced Excel skills that still show up in nearly every analyst job posting. It's the easiest path to a first job in data — and, combined with Analytics Engineering later, a realistic route to senior BI and analytics roles.",
    salaryRange: "$60K–$100K to start · $100K–$160K+ at Senior BI Analyst / BI Engineer",
    certification: "PL-300",
    stages: [
      {
        label: "Job Ready",
        courseSlugs: ["t-sql-development", "power-bi", "python-for-power-bi", "tableau", "advanced-excel-for-data-analysts"],
      },
      { label: "Advanced", note: "Data Factory, selected sections", courseSlugs: ["data-factory", "git-github-cicd-for-data"] },
    ],
    destinationNote:
      "The pure dashboard-developer route gets harder past this point. Branch into Analytics Engineer → Senior/Staff/Principal Analytics Engineer → Data Architect to keep climbing toward $200K+.",
  },
  {
    slug: "analytics-engineer",
    title: "Analytics Engineer",
    targetJobs: ["Junior Analytics Engineer", "Analytics Engineer", "Senior Analytics Engineer", "Staff / Principal Analytics Engineer"],
    description:
      "Analytics Engineering sits between Data Analyst and Data Engineer, and it's one of the fastest-growing, best-paid corners of the field — most students never hear about it. You'll take the SQL and cloud-warehouse fundamentals from T-SQL and Snowflake and add the piece that actually defines the role: dbt. Version-controlled, tested, documented data models are what separate an Analytics Engineer from someone who just writes ad-hoc SQL.",
    salaryRange: "$80K–$140K as an Analytics Engineer · $140K–$200K+ at Senior, with Staff/Principal regularly clearing $200K",
    stages: [
      {
        label: "Job Ready",
        courseSlugs: ["t-sql-development", "power-bi", "snowflake", "dbt-analytics-engineering", "git-github-cicd-for-data"],
      },
      { label: "Advanced", courseSlugs: ["data-factory", "airflow"] },
    ],
    destinationNote:
      "Analytics Engineer → Senior Analytics Engineer → Staff/Principal Analytics Engineer → Data/Analytics Architect. Worth calling out on the site explicitly — students hear far less about this path than Data Analyst or Data Engineer.",
  },
  {
    slug: "azure-fabric-data-engineer",
    title: "Azure / Fabric Data Engineer",
    targetJobs: ["Data Engineer", "Azure Data Engineer", "Fabric Data Engineer", "Senior Data Engineer", "Lead Data Engineer", "Principal Data Engineer"],
    description:
      "This is the flagship Data Engineering path, and the one with the most built-out backbone already: four courses that take you from Python and Spark fundamentals all the way through Databricks, Microsoft Fabric, real-time streaming, and production engineering practice, capped by a DP-700 certification track and a full portfolio capstone. Layer on version control, infrastructure as code, and orchestration, and this becomes a complete, senior-ready Azure data engineering skill set.",
    salaryRange: "$80K–$140K as a Data Engineer · $140K–$190K+ at Senior · Lead/Staff/Principal roles regularly post at $200K–$280K+",
    certification: "DP-700 — already built into Data Engineering Career & Capstone's Chapter 2",
    stages: [
      {
        label: "Job Ready",
        courseSlugs: [
          "t-sql-development",
          "data-engineering-foundations",
          "data-factory",
          "azure-databricks-and-delta-lake",
          "microsoft-fabric-and-real-time-analytics",
          "data-engineering-career-and-capstone",
        ],
      },
      {
        label: "Advanced",
        courseSlugs: ["git-github-cicd-for-data", "terraform-bicep-for-data-engineers", "airflow", "kafka-event-streaming"],
      },
    ],
    destinationNote:
      "Data Engineer → Senior → Lead → Staff → Principal Data Engineer → Data/Cloud Architect. This path's backbone already exists end to end — the advanced-stage courses are what turn it into a senior-ready skill set.",
  },
  {
    slug: "databricks-lakehouse-engineer",
    title: "Databricks / Lakehouse Engineer",
    targetJobs: ["Databricks Data Engineer", "Senior Data Engineer", "Lakehouse Engineer", "Lead Data Engineer", "Principal Data Engineer"],
    description:
      "For students who want to go deep on one platform instead of broad across three, this path branches off the core Data Engineering track right after Databricks & Delta Lake. You'll go far past the fundamentals — Unity Catalog at scale, Auto Loader, Lakeflow, and Databricks Workflows — and finish aimed squarely at the DP-750 certification and Lakehouse Engineer/Architect roles.",
    salaryRange: "$90K–$150K as a Databricks Data Engineer · $150K–$190K+ at Senior · Principal Databricks Architect roles currently post $190K–$200K+",
    certification: "DP-750",
    stages: [
      {
        label: "Job Ready",
        courseSlugs: ["t-sql-development", "data-engineering-foundations", "data-factory", "azure-databricks-and-delta-lake"],
      },
      {
        label: "Advanced",
        courseSlugs: [
          "advanced-databricks-specialization",
          "kafka-event-streaming",
          "airflow",
          "terraform-bicep-for-data-engineers",
          "data-engineering-career-and-capstone",
        ],
      },
    ],
    destinationNote:
      "Databricks Data Engineer → Senior → Lead Data Engineer → Principal Databricks Engineer → Databricks/Lakehouse Architect.",
  },
  {
    slug: "aws-data-engineer",
    title: "AWS Data Engineer",
    targetJobs: ["Junior Data Engineer", "AWS Data Engineer", "Senior Data Engineer", "Lead / Staff Engineer", "Principal Data Engineer", "AWS Data Architect"],
    description:
      "The flagship engineering path in this catalog is heavily Microsoft-flavored — this path reuses the same SQL and Spark foundation but points it at AWS instead: S3, Glue, Redshift, Athena, EMR, Lambda, Kinesis, and Step Functions, the exact combination current AWS data engineering postings ask for.",
    salaryRange: "$80K–$140K as an AWS Data Engineer · $140K–$190K+ at Senior · Lead/Staff/Principal roles regularly post at $200K–$280K+",
    certification: "AWS Certified Data Engineer – Associate",
    stages: [
      {
        label: "Job Ready",
        courseSlugs: ["t-sql-development", "data-engineering-foundations", "aws-fundamentals-for-data-engineers", "aws-data-engineering"],
      },
      {
        label: "Advanced",
        note: "Databricks/Spark, selected content",
        courseSlugs: ["azure-databricks-and-delta-lake", "git-github-cicd-for-data", "terraform-bicep-for-data-engineers", "aws-capstone"],
      },
    ],
    destinationNote:
      "Junior Data Engineer → AWS Data Engineer → Senior Data Engineer → Lead/Staff Engineer → Principal Data Engineer → AWS Data Architect — the same $200K+ ceiling as the Azure/Fabric path, reached through AWS's own tools instead.",
  },
  {
    slug: "snowflake-data-engineer",
    title: "Snowflake Data / Analytics Engineer",
    targetJobs: ["Snowflake Developer", "Analytics Engineer", "Cloud Data Engineer", "Senior Snowflake Engineer", "Principal Data Engineer"],
    description:
      "Snowflake alone isn't a career — Snowflake plus dbt, Python, and orchestration is. This path treats Snowflake as a genuinely short specialization for students who already know SQL, then immediately builds the modern combination current postings actually ask for: dbt for modeling, Airflow for orchestration, and a BI tool on top.",
    salaryRange: "$90K–$150K as a Snowflake Developer / Cloud Data Engineer · $150K–$200K+ at Senior",
    certification: "SnowPro Core",
    stages: [
      {
        label: "Job Ready",
        courseSlugs: ["t-sql-development", "snowflake", "dbt-analytics-engineering", "data-factory", "power-bi"],
      },
      { label: "Advanced", courseSlugs: ["airflow", "git-github-cicd-for-data", "terraform-bicep-for-data-engineers"] },
    ],
    destinationNote:
      "SQL Developer → Snowflake Developer → Analytics/Data Engineer → Senior Snowflake Engineer → Lead Data Engineer → Principal Data Engineer → Snowflake/Data Architect — converging into the same ceiling as the other engineering paths.",
  },
  {
    slug: "azure-database-engineer",
    title: "Azure Database Engineer",
    targetJobs: ["SQL Developer", "Azure Database Administrator", "Senior DBA", "Database Engineer", "Principal Database Engineer"],
    description:
      "This is the path for someone who loves SQL Server and wants to go deep on it rather than pivot into Python and Spark all day. Starting from T-SQL, you'll build real Azure SQL administration skills — security, performance tuning, automation, and disaster recovery — toward the DP-300 certification, then round it out with the cloud, scripting, and infrastructure-as-code skills that separate a mid-level DBA from a Principal Database Engineer.",
    salaryRange: "$80K–$130K as an Azure Database Administrator · $130K–$180K+ at Senior DBA / Database Engineer",
    certification: "DP-300 — already the spine of Azure Database Administrator",
    stages: [
      {
        label: "Job Ready",
        courseSlugs: ["t-sql-development", "azure-fundamentals", "azure-database-administrator", "data-factory"],
      },
      { label: "Advanced", courseSlugs: ["powershell-fundamentals", "terraform-bicep-for-data-engineers", "git-github-cicd-for-data"] },
    ],
    destinationNote:
      "SQL Developer/DBA → Azure DBA → Senior DBA → Database Engineer → Senior Database Engineer → Principal Database Engineer → Database Architect. Even this path needs some cloud and scripting skill to reach the highest levels.",
  },
  {
    slug: "sql-server-database-administrator",
    title: "SQL Server Database Administrator",
    targetJobs: ["SQL Developer", "Junior DBA", "Database Administrator", "Senior DBA", "Database Engineer", "Principal Database Engineer"],
    description:
      "A deeper, SQL-Server-first alternative to the Azure Database Engineer path, for someone who wants to go all the way into database administration as its own discipline. It deliberately doesn't repeat T-SQL Development's SQL language foundation — instead it moves straight from writing SQL to using T-SQL like a DBA: diagnosing, monitoring, and fixing SQL Server. From there you build real on-prem administration, deep performance tuning, and high-availability skills before moving into Azure and the DP-300 certification, closing with the automation and DevOps practices senior DBAs are expected to know — then rounds out with real, hands-on exposure to the other database platforms every senior DBA eventually runs into: Oracle, MySQL, and PostgreSQL on the relational side, and MongoDB, Cosmos DB, and Neo4j on the NoSQL side.",
    salaryRange: "$80K–$130K as a DBA · $130K–$180K+ at Senior DBA / Database Engineer · Principal Database Engineer roles currently post above $200K",
    certification: "DP-300 — a checkpoint partway through this path, not the end of it",
    stages: [
      {
        label: "Job Ready",
        note: "T-SQL, used like a DBA, then real on-prem administration",
        courseSlugs: ["t-sql-development", "t-sql-for-database-administrators", "sql-server-database-administration"],
      },
      {
        label: "Advanced SQL Server",
        note: "Tune it, keep it alive, move to the cloud, automate everything",
        courseSlugs: [
          "sql-server-performance-tuning",
          "sql-server-ha-backup-and-disaster-recovery",
          "azure-database-administrator",
          "powershell-automation-and-devops-for-dbas",
        ],
      },
      {
        label: "Multi-Platform Databases",
        note: "Apply everything above to the platforms every senior DBA eventually meets",
        courseSlugs: ["cross-platform-relational-database-administration", "nosql-document-and-graph-databases"],
      },
    ],
    destinationNote:
      "SQL Developer/DBA → Senior DBA → Database Engineer → Senior Database Engineer → Principal Database Engineer → Database Architect. Learn SQL → use SQL like a DBA → administer SQL Server → tune performance → keep databases alive → move to Azure → automate everything → apply it all to Oracle, MySQL, PostgreSQL, MongoDB, Cosmos DB, and Neo4j. Two additional multi-platform courses are enough to give a SQL Server DBA meaningful, credible exposure elsewhere without turning this into a database-of-the-week mega-program — if demand later justifies deeper Oracle, MongoDB, or Cosmos DB training, that becomes its own advanced specialization rather than a redesign of this path.",
  },
  {
    "slug": "data-governance",
    "title": "Data Governance Engineer",
    "targetJobs": [
      "Data Governance Analyst",
      "Data Quality Analyst",
      "Data Steward",
      "Data Governance Specialist",
      "Data Governance Consultant",
      "Data Governance Lead / Manager",
      "Data Governance Architect"
    ],
    "salaryRange": "$90K–$190K as a Data Governance Engineer",
    "description": "This path takes a student from SQL and data-engineering foundations into the discipline that makes enterprise data trustworthy: governance, data quality, metadata and business glossaries, lineage, master data, security and privacy, and governance architecture. Students specialize in Microsoft Purview, Fabric, Power BI and Azure governance, with optional tracks in Databricks, Snowflake, AWS, AI governance and master data management.",
    "longDescription": [
      "This path takes a student from SQL and data-engineering foundations into the discipline that makes enterprise data trustworthy: data governance, data quality, metadata and business glossaries, lineage, master and reference data, security and privacy, and governance architecture.",
      "Students learn to work directly with enterprise data, then to govern it — assigning ownership and stewardship, writing quality rules and SQL checks, documenting lineage from source to executive dashboard, and classifying and protecting sensitive data.",
      "The primary LTV specialization is Microsoft Purview, Microsoft Fabric, Power BI and Azure data governance. Databricks Unity Catalog, Snowflake governance, AWS data governance, AI governance and master data management are optional specializations.",
      "The path closes with the LTV Global Data Governance Program capstone, in which the student designs a complete governance program for a fictional company whose systems produce different numbers."
    ],
    "showLessonTotals": true,
    "specializations": {
      "heading": "Specializations",
      "primaryLabel": "Primary LTV specialization",
      "primary": [
        "Microsoft Purview",
        "Microsoft Fabric",
        "Power BI",
        "Azure Data Governance"
      ],
      "optionalLabel": "Optional specializations",
      "optional": [
        "Databricks Unity Catalog",
        "Snowflake Governance",
        "AWS Data Governance",
        "AI Governance",
        "Master Data Management"
      ]
    },
    "courseDetails": {
      "data-lineage-and-impact-analysis": "Students learn to trace: Source → ETL/ELT → Data Lake/Warehouse → Semantic Model → Power BI → Executive Dashboard.",
      "data-governance-career-and-capstone": "Scenario: executives no longer trust the company's reports because different systems produce different numbers, and the student is hired to design the company's Data Governance Program."
    },
    "courseDetailLists": {
      "data-governance-career-and-capstone": [
        {
          "heading": "LTV Global has data spread across",
          "items": [
            "SQL Server",
            "Salesforce",
            "Oracle Financials",
            "Azure Data Lake",
            "Microsoft Fabric",
            "Databricks",
            "Snowflake",
            "Power BI"
          ]
        },
        {
          "heading": "Students must",
          "items": [
            "Identify critical data elements",
            "Assign data owners",
            "Assign data stewards",
            "Create a business glossary",
            "Build a data dictionary",
            "Classify sensitive data",
            "Create data quality rules",
            "Write SQL data-quality checks",
            "Document data lineage",
            "Identify authoritative data sources",
            "Design access policies",
            "Create retention policies",
            "Develop governance KPIs",
            "Design governance workflows",
            "Create a governance operating model",
            "Develop an AI governance strategy"
          ]
        },
        {
          "heading": "Final deliverables",
          "items": [
            "Enterprise Data Governance Strategy",
            "Business Glossary",
            "Data Dictionary",
            "Data Ownership Matrix",
            "Data Stewardship Matrix",
            "Data Classification Framework",
            "Data Quality Scorecard",
            "Data Lineage Diagram",
            "Access Control Strategy",
            "Retention Policy",
            "Governance KPI Dashboard",
            "AI Governance Framework",
            "Governance Architecture Diagram",
            "Executive Presentation"
          ]
        }
      ]
    },
    "stages": [
      {
        "label": "T-SQL Development",
        "note": "Existing LTV course",
        "courseSlugs": [
          "t-sql-development"
        ]
      },
      {
        "label": "Data Engineering Foundations",
        "note": "Existing LTV course",
        "courseSlugs": [
          "data-engineering-foundations"
        ]
      },
      {
        "label": "Data Governance Foundations",
        "courseSlugs": [
          "data-governance-foundations"
        ]
      },
      {
        "label": "Data Quality Management",
        "courseSlugs": [
          "data-quality-management"
        ]
      },
      {
        "label": "Metadata Management & Business Glossary",
        "courseSlugs": [
          "metadata-management-and-business-glossary"
        ]
      },
      {
        "label": "Data Lineage & Impact Analysis",
        "courseSlugs": [
          "data-lineage-and-impact-analysis"
        ]
      },
      {
        "label": "Master & Reference Data Management",
        "note": "Optional specialization",
        "courseSlugs": [
          "master-and-reference-data-management"
        ]
      },
      {
        "label": "Data Security, Privacy & Classification",
        "courseSlugs": [
          "data-security-privacy-and-classification"
        ]
      },
      {
        "label": "Microsoft Purview",
        "note": "Primary LTV specialization",
        "courseSlugs": [
          "microsoft-purview"
        ]
      },
      {
        "label": "Microsoft Fabric Data Governance",
        "note": "Primary LTV specialization",
        "courseSlugs": [
          "microsoft-fabric-data-governance"
        ]
      },
      {
        "label": "Databricks Unity Catalog Governance",
        "note": "Optional specialization",
        "courseSlugs": [
          "databricks-unity-catalog-governance"
        ]
      },
      {
        "label": "Snowflake Data Governance",
        "note": "Optional specialization",
        "courseSlugs": [
          "snowflake-data-governance"
        ]
      },
      {
        "label": "Power BI Governance",
        "note": "Primary LTV specialization",
        "courseSlugs": [
          "power-bi-governance"
        ]
      },
      {
        "label": "Cloud Data Governance: Azure & AWS",
        "note": "Azure is a primary specialization; AWS is optional",
        "courseSlugs": [
          "cloud-data-governance-azure-and-aws"
        ]
      },
      {
        "label": "AI & Machine Learning Governance",
        "note": "Optional specialization",
        "courseSlugs": [
          "ai-and-machine-learning-governance"
        ]
      },
      {
        "label": "Data Governance Program Management",
        "courseSlugs": [
          "data-governance-program-management"
        ]
      },
      {
        "label": "Data Governance Architecture",
        "courseSlugs": [
          "data-governance-architecture"
        ]
      },
      {
        "label": "Data Governance Career & Capstone",
        "note": "Final capstone: the LTV Global Data Governance Program",
        "courseSlugs": [
          "data-governance-career-and-capstone"
        ],
        "capstone": true
      }
    ],
    "destinationNote": "Data Governance Analyst → Data Quality Analyst → Data Steward → Data Governance Specialist → Data Governance Consultant → Data Governance Lead / Manager → Data Governance Architect. Job titles and pay vary a great deal by organization, and the senior architect and leadership roles typically take years of hands-on experience — the capstone gives you a complete governance program to talk through in interviews."
  },
  {
    slug: "data-scientist",
    title: "Data Scientist",
    targetJobs: ["Junior Data Scientist", "Data Science Analyst", "Machine Learning Analyst", "Data Scientist", "Applied Scientist"],
    description:
      "This path takes someone from analytics fundamentals into Python, machine learning, cloud ML, and production-ready data science. You'll start from SQL — because every data scientist spends half their time getting data out of databases — then build Python, statistics, and visualization/EDA as separate, properly taught skills before touching machine learning. From there it covers ML fundamentals, the applied scikit-learn workflow, and advanced topics (boosting, forecasting, NLP, recommenders, explainability), then modern AI and generative AI, ML on both Azure and AWS, and MLOps. It closes with a capstone where you take a messy business dataset from business problem to SQL, Python, EDA, model, evaluation, deployment, and presentation.",
    salaryRange: "$75K–$110K as a Junior Data Scientist / Data Science Analyst · $130K–$180K+ at Senior Data Scientist · $200K+ potential at Staff/Principal Data Scientist or ML Scientist",
    certification: "Aligned with current Microsoft and AWS credentials (for example Azure Data Scientist Associate and AWS Machine Learning Specialty) rather than built around any single exam — a portfolio of real, deployed projects and strong SQL/statistics fundamentals carry more weight in hiring",
    stages: [
      {
        label: "Job Ready",
        note: "The whole program — SQL and Python foundations, then statistics, machine learning, AI, cloud ML, and MLOps",
        courseSlugs: [
          "t-sql-development",
          "python-for-data-science",
          "statistics-and-probability-for-data-science",
          "data-visualization-and-eda",
          "machine-learning-fundamentals",
          "applied-machine-learning",
          "advanced-data-science",
          "ai-and-generative-ai-fundamentals-for-data-scientists",
          "azure-data-science",
          "aws-data-science",
          "mlops-for-data-scientists",
          "data-science-capstone",
        ],
      },
    ],
    destinationNote:
      "Data Analyst → Junior Data Scientist → Data Scientist → Senior Data Scientist → Staff/Principal Data Scientist → Head of Data Science. SQL, Python, and cloud knowledge are the common trunk shared with Data Engineering: a Data Engineering student can branch into Data Science (or DevOps) without starting over. If you'd rather build AI applications than models, the AI Engineer path is the better fit.",
  },
  {
    slug: "ai-engineer",
    title: "AI Engineer",
    targetJobs: ["Junior AI Engineer", "AI Application Developer", "Generative AI Developer", "AI Solutions Developer", "AI Engineer"],
    description:
      "This is its own door into LTV, not an add-on to an existing program — no prior course assumed. You'll start from real Python fundamentals and build straight through APIs, classic AI/ML foundations, generative AI and LLMs, prompt and context engineering, retrieval-augmented generation, and AI agents, then round it out with the cloud, deployment, security, and monitoring skills that separate a demo from something running in production. It closes with three flagship portfolio projects: a production RAG knowledge assistant, an AI data analyst that works with SQL and APIs, and a tool-using AI agent with human approval, security, and logging.",
    salaryRange: "$75K–$110K as a Junior AI Engineer / AI Application Developer · $130K–$180K+ at Senior/Staff AI Engineer · $200K+ potential at Principal AI Engineer / AI Architect",
    certification: "No single industry-standard certification yet — portfolio and production experience carry more weight in AI hiring than any one exam",
    stages: [
      {
        label: "Job Ready",
        note: "The whole program — no prior course assumed",
        courseSlugs: [
          "python-for-ai-engineering",
          "git-github-for-software-engineers",
          "apis-json-for-ai-applications",
          "ai-ml-foundations",
          "generative-ai-and-llms",
          "prompt-and-context-engineering",
          "rag-and-vector-databases",
          "ai-agents",
          "azure-ai-and-cloud-for-ai-engineers",
          "docker-and-deployment-for-ai-applications",
          "ai-security-evaluation-and-monitoring",
          "ai-engineering-capstones",
        ],
      },
    ],
    destinationNote:
      "AI Application Developer → AI Engineer → Senior AI Engineer → Staff/Lead AI Engineer → Principal AI Engineer → AI Architect → $200K+ potential — real compensation at the top of that ladder, but it typically requires years of production experience, not a promise on graduation.",
  },
  {
    "slug": "salesforce-administrator",
    "title": "Salesforce Administrator",
    "targetJobs": [
      "Salesforce Administrator",
      "Senior Salesforce Administrator",
      "Salesforce Business Analyst",
      "Salesforce Platform App Builder"
    ],
    "description": "This path takes a beginner from Salesforce fundamentals through administration, security, data management, reporting, declarative app building, and Flow automation — up to the Administrator and Platform App Builder credentials — and closes with a portfolio capstone. It is the shared start for the Salesforce Architect destination, which forks into a Technical Architect ladder and a Data & Analytics Architect ladder.",
    "salaryRange": "$75K to start as a Salesforce Administrator — higher with experience and additional credentials",
    "certification": "Salesforce Certified Administrator → Salesforce Certified Platform App Builder — LTV Academy does not issue Salesforce certifications",
    "showLessonTotals": true,
    "certificationRoadmap": {
      "heading": "Certification journey",
      "steps": [
        {
          "label": "Foundation",
          "items": [
            "Salesforce Certified Administrator",
            "Salesforce Certified Platform App Builder"
          ]
        }
      ],
      "notice": "Certification requirements and credential names can change. LTV Academy prepares students for relevant skills and certification objectives but does not issue Salesforce certifications. Students should verify current Salesforce certification requirements before scheduling an exam."
    },
    "freeLab": {
      "eyebrow": "Start free",
      "heading": "Free Salesforce Hands-On Environment",
      "intro": [
        "Unlike many enterprise software platforms, students do not need to purchase an expensive Salesforce environment to complete most of this career path.",
        "Students can create FREE Salesforce Trailhead Playgrounds and Developer Edition organizations for hands-on practice."
      ],
      "listLabel": "Students will use these environments to:",
      "items": [
        "Create objects and fields",
        "Build applications",
        "Configure security",
        "Create users",
        "Build reports and dashboards",
        "Create Flow automations",
        "Write Apex",
        "Build Lightning Web Components",
        "Work with APIs",
        "Practice integrations",
        "Use Salesforce CLI",
        "Practice deployment",
        "Create scratch orgs",
        "Complete LTV projects"
      ],
      "buttons": [
        {
          "label": "Create a Trailhead Account",
          "url": "https://trailhead.salesforce.com/"
        },
        {
          "label": "Salesforce Developer",
          "url": "https://developer.salesforce.com/"
        }
      ],
      "notes": [
        "Some advanced Salesforce products or features may require a special Salesforce-provided trial, training environment, or other environment and may not be available in a standard Trailhead Playground or Developer Edition org.",
        "Salesforce, Trailhead and Developer Edition are Salesforce products. LTV Academy is independent and is not sponsored, endorsed, or operated by Salesforce."
      ]
    },
    "courseDetailLists": {
      "ltv-customer-management-system": [
        {
          "heading": "Build",
          "items": [
            "Accounts",
            "Contacts",
            "Leads",
            "Opportunities",
            "Custom objects",
            "Security",
            "Flows",
            "Validation rules",
            "Reports",
            "Dashboards"
          ]
        }
      ],
      "salesforce-career-preparation": [
        {
          "heading": "Covers",
          "items": [
            "Salesforce resumes",
            "Trailhead profile",
            "Portfolio development",
            "GitHub",
            "Certification strategy",
            "Administrator interviews",
            "Developer interviews",
            "Consultant interviews",
            "Architect scenario interviews",
            "Architecture whiteboarding",
            "Presenting capstones",
            "Explaining architecture decisions"
          ]
        }
      ]
    },
    "stages": [
      {
        "label": "Salesforce Foundations",
        "courseSlugs": [
          "salesforce-and-crm-foundations",
          "salesforce-hands-on-environment",
          "salesforce-data-model-fundamentals"
        ]
      },
      {
        "label": "Salesforce Administration",
        "courseSlugs": [
          "salesforce-administration",
          "salesforce-security-and-access-fundamentals",
          "salesforce-data-management",
          "salesforce-admin-reports-and-dashboards"
        ],
        "checkpoint": {
          "kind": "checkpoint",
          "label": "Certification checkpoint",
          "items": [
            "Salesforce Certified Administrator"
          ]
        }
      },
      {
        "label": "Declarative Development",
        "courseSlugs": [
          "salesforce-platform-app-builder",
          "salesforce-flow-automation",
          "salesforce-business-process-automation"
        ],
        "checkpoint": {
          "kind": "checkpoint",
          "label": "Certification checkpoint",
          "items": [
            "Salesforce Certified Platform App Builder"
          ]
        }
      },
      {
        "label": "Capstone — Salesforce Admin",
        "note": "A portfolio project suitable for an entry-level Salesforce portfolio",
        "courseSlugs": [
          "ltv-customer-management-system"
        ],
        "capstone": true
      },
      {
        "label": "Career & Interview Preparation",
        "courseSlugs": [
          "salesforce-career-preparation"
        ]
      },
      {
        "label": "Continue to a Salesforce destination",
        "note": "Both technical ladders converge on one destination — Salesforce Architect",
        "pathChoiceSlugs": [
          "salesforce-architect"
        ]
      }
    ],
    "destinationNote": "This is the shared start for Salesforce Architect, which forks into two ladders: one through SQL, analytics, CRM Analytics and the modern data stack, the other through development, integration, security and enterprise architecture. Neither ladder is a first job — work as a Salesforce Administrator or in a related role while you keep progressing."
  },
  {
    slug: "oracle-fusion-financials-consultant",
    title: "Oracle Fusion Financials Consultant",
    targetJobs: [
      "Oracle Fusion Financials Analyst",
      "Junior Oracle Financials Functional Consultant",
      "Oracle ERP Analyst",
      "Financial Systems Analyst",
      "Oracle Fusion Financials Consultant",
      "Senior Oracle Financials Consultant",
    ],
    description:
      "This path takes a student from basic accounting and ERP concepts through hands-on Oracle Fusion Cloud Financials implementation, transactions, reporting, integrations, and production support — General Ledger, Payables, Receivables, Cash Management, Fixed Assets, Expenses, Subledger Accounting, Procure-to-Pay, and Order-to-Cash.",
    longDescription: [
      "This path takes a student from basic accounting and ERP concepts through hands-on Oracle Fusion Cloud Financials implementation, transactions, reporting, integrations, and production support. Students learn how a company's financial operations move through General Ledger, Payables, Receivables, Cash Management, Fixed Assets, Expenses, Subledger Accounting, Procure-to-Pay, and Order-to-Cash.",
      "This is not just a theory course. Students work inside an Oracle Fusion Cloud practice environment and complete configurations, transactions, troubleshooting exercises, reporting assignments, and an end-to-end implementation capstone.",
      "The program also adds SQL, financial data analysis, FBDI, ADFdi, REST API concepts, reporting, security, and implementation methodology so students understand both the functional and technical sides of Oracle Fusion Financials.",
    ],
    salaryRange: "$130K–$270K",
    certification:
      "Aligned with current Oracle Fusion Cloud Financials certification objectives where appropriate — completing this path does not automatically earn an Oracle certification",
    labRequirement: {
      eyebrow: "Read this before you enroll",
      heading: "Required Oracle Fusion Practice Environment",
      intro: [
        "This career path requires hands-on access to Oracle Fusion Cloud. Oracle Fusion Cloud access is NOT included with your Lifting the Veil IT Academy subscription.",
        "Students must purchase their own Oracle Fusion Cloud practice-instance access separately from OracleERPGuide (OEG).",
      ],
      optionLabel: "Current option",
      optionLines: [
        "Oracle Fusion Cloud Practice Instance",
        "Approximately $85 for 3 months",
        "Purchased directly from OracleERPGuide",
      ],
      buttonLabel: "Get Oracle Fusion Lab Access",
      buttonUrl: "https://www.oracleerpguide.com/courses/oracle-fusion-cloud-instance-access/",
      importantNote:
        "OracleERPGuide is a third-party provider and is separate from Lifting the Veil IT Academy. Lab pricing, availability, features, access duration, and terms are controlled by OracleERPGuide and may change. LTV Academy tuition does not include this fee. Nothing on this page implies sponsorship or endorsement of LTV Academy by Oracle or OracleERPGuide, and LTV Academy does not own, operate, resell, or provide the OracleERPGuide environment.",
      whenHeading: "When should I purchase it?",
      whenText:
        "Do not purchase your lab environment just because you enrolled in LTV Academy. Begin the introductory lessons first. The course will tell you when you have reached the hands-on portion and should activate your practice environment so you can maximize your three-month access period.",
      verifiedNote:
        "Third-party pricing last verified September 2026. Verify current pricing with OracleERPGuide before you purchase.",
    },
    courseDetails: {
      "oracle-fusion-procure-to-pay": "Students follow one transaction through the complete purchasing lifecycle.",
      "oracle-fusion-order-to-cash": "Students follow revenue through the complete customer lifecycle.",
      "sql-for-oracle-financials": "Example challenge: Finance needs all unpaid supplier invoices over $10,000 that are more than 30 days old.",
      "troubleshooting-oracle-financials": "Students must identify the cause, resolve the issue and document what they did.",
      "ltv-manufacturing-corporation-capstone":
        "Final challenge: It is January 31. The CFO says the books do not balance and the accounting period cannot be closed. The student is the Oracle Fusion Financials Consultant and must investigate AP, AR, Assets, Cash Management, SLA and GL, identify the problems, correct them, reconcile the accounts and complete the month-end close. Final deliverables: Income Statement, Balance Sheet, AP Aging, AR Aging, Reconciliation Report, Issue Log, Implementation Documentation, and a final presentation explaining what was wrong and how it was corrected.",
    },
    stages: [
      {
        label: "Oracle & Financial Foundations",
        note: "No accounting or ERP background assumed",
        courseSlugs: ["oracle-fusion-cloud-and-erp-foundations", "accounting-fundamentals-for-oracle-professionals"],
      },
      {
        label: "Financials Configuration",
        note: "Hands-on begins here — the course tells you when to activate your practice environment",
        courseSlugs: ["oracle-fusion-enterprise-structures-and-chart-of-accounts", "oracle-fusion-general-ledger", "oracle-fusion-accounts-payable", "oracle-fusion-accounts-receivable"],
      },
      {
        label: "Financial Operations",
        courseSlugs: ["oracle-fusion-cash-management", "oracle-fusion-fixed-assets", "oracle-fusion-expenses"],
      },
      {
        label: "End-to-End Business Processes",
        note: "Follow one transaction from the business event to the General Ledger",
        courseSlugs: ["oracle-fusion-procure-to-pay", "oracle-fusion-order-to-cash", "oracle-fusion-subledger-accounting"],
      },
      {
        label: "Reporting & Data",
        courseSlugs: ["oracle-financial-reporting", "oracle-financials-data", "sql-for-oracle-financials"],
      },
      {
        label: "Data Loading & Integrations",
        courseSlugs: ["fbdi-and-adfdi", "rest-apis-and-integration-fundamentals"],
      },
      {
        label: "Security & Implementation",
        courseSlugs: ["oracle-fusion-security", "oracle-fusion-implementation-lifecycle"],
      },
      {
        label: "Production Support",
        courseSlugs: ["troubleshooting-oracle-financials"],
      },
      {
        label: "Capstone",
        note: "An end-to-end simulated implementation and a month-end close under pressure",
        courseSlugs: ["ltv-manufacturing-corporation-capstone"],
      },
      {
        label: "Career & Interview Preparation",
        courseSlugs: ["oracle-financials-career-and-interview-preparation"],
      },
    ],
    destinationNote:
      "This path is its own door into LTV — no accounting, ERP, or Oracle experience is assumed. A typical progression runs Oracle Fusion Financials Analyst → Junior Oracle Financials Functional Consultant → Oracle ERP Analyst → Financial Systems Analyst → Oracle Fusion Financials Consultant → Senior Oracle Financials Consultant. How far and how fast depends on your experience, the modules you specialize in, and the projects you can walk an interviewer through — the LTV Manufacturing capstone gives you a complete implementation to talk about.",
  },
  {
    slug: "devops-engineer",
    title: "DevOps Engineer",
    targetJobs: ["Junior DevOps Engineer", "Cloud Support Engineer", "Build & Release Engineer", "DevOps Engineer", "Platform Engineer"],
    description:
      "This is its own door into LTV, not an add-on to an existing program — no prior course assumed, and much more infrastructure- and automation-oriented than the data paths. You'll start where every DevOps job starts: IT and networking fundamentals, Linux administration, Git, and Python/Bash automation. Then Azure and AWS fundamentals, Docker, Kubernetes, infrastructure as code with Terraform, CI/CD, monitoring and observability, and DevSecOps. It closes with a capstone that builds one real system end to end: push a code change to GitHub and the pipeline builds, tests, packages, and deploys it to Kubernetes on Azure or AWS with monitoring in place.",
    salaryRange: "$70K–$100K as a Junior DevOps Engineer / Cloud Support Engineer · $120K–$170K+ at Senior DevOps / Platform Engineer · $180K+ potential at Staff Platform Engineer / SRE Lead",
    certification: "Aligned with AZ-400 (Azure DevOps Engineer Expert), AWS DevOps Engineer Professional, CKA (Certified Kubernetes Administrator), and the HashiCorp Terraform Associate — pick one after the program rather than building around a single exam",
    stages: [
      {
        label: "Job Ready",
        note: "The whole program — no prior course assumed",
        courseSlugs: [
          "it-networking-and-cloud-fundamentals",
          "linux-administration",
          "git-github-for-software-engineers",
          "python-and-bash-automation",
          "azure-fundamentals",
          "aws-fundamentals-for-data-engineers",
          "docker-and-containers",
          "kubernetes-orchestration",
          "infrastructure-as-code-with-terraform",
          "ci-cd-pipelines",
          "monitoring-logging-and-observability",
          "devsecops-fundamentals",
          "devops-capstone",
        ],
      },
    ],
    destinationNote:
      "Junior DevOps Engineer → DevOps Engineer → Senior DevOps Engineer → Platform Engineer or Site Reliability Engineer → Staff/Principal Platform Engineer → DevOps/Platform Architect. SQL/Python/cloud knowledge is the common trunk with the data paths, so a Data Engineering student can branch into DevOps without starting over.",
  },
  {
    slug: "blockchain-engineer",
    title: "Blockchain Engineer",
    targetJobs: ["Junior Blockchain Developer", "Web3 Developer", "Solidity Developer", "Smart Contract Developer", "Blockchain Engineer"],
    description:
      "This is its own door into LTV, not an add-on to an existing program — no prior course assumed. You'll start from real programming fundamentals in JavaScript and TypeScript, then move through blockchain foundations, cryptography, Bitcoin, Ethereum and smart contracts, Solidity, token standards, testing and tooling, and full-stack DApp development, plus a dedicated security auditing course. From there it goes further than most bootcamps: the off-chain backend work every dApp actually needs, deeper DeFi and token-engineering mechanics, and the testing, DevOps, and deployment skills that take a contract from a testnet demo to a real mainnet launch. It closes with three flagship portfolio projects: a full DeFi protocol, an NFT marketplace, and a DAO governance system.",
    salaryRange: "$70K–$100K as a Junior Blockchain Developer / Web3 Developer · $120K–$160K+ at Senior/Staff Blockchain Engineer · $200K+ potential at Principal Blockchain Engineer / Blockchain Architect",
    certification: "No single industry-standard certification — a working GitHub portfolio of audited, deployed contracts carries far more weight in blockchain hiring than any exam",
    stages: [
      {
        label: "Job Ready",
        note: "The whole program — no prior course assumed",
        courseSlugs: [
          "js-ts-blockchain",
          "blockchain",
          "blockchain-apis-backend",
          "defi-token-engineering",
          "blockchain-testing-devops",
          "blockchain-engineering-capstones",
        ],
      },
    ],
    destinationNote:
      "Blockchain Developer → Smart Contract Developer → Blockchain Engineer → Senior Blockchain Engineer → Staff/Lead Blockchain Engineer → Protocol Engineer → Blockchain Architect → $200K+ potential — real compensation at the top of that ladder, but it typically requires years of production experience, not a promise on graduation.",
  },
  {
    slug: "bi-to-data-architect",
    title: "BI → Data Architect",
    targetJobs: ["Data Analyst", "BI Developer", "BI Engineer", "Analytics Engineer", "Senior Analytics Engineer", "Data Architect"],
    description:
      "The longest path in the catalog, and not a beginner's first choice — this is for a Data Analyst or BI Developer who wants to see the whole road ahead. It expands reporting into modeling, modeling into engineering, and engineering into cloud architecture and governance, converging everything else in the catalog into a single Data Architect destination.",
    salaryRange: "$250K–$500K+ total compensation at Principal/Enterprise level — realistic only after years of the progression below",
    isDestination: true,
    stages: [
      { label: "Start", courseSlugs: ["t-sql-development", "power-bi", "tableau"] },
      { label: "Expand", courseSlugs: ["data-factory", "snowflake", "dbt-analytics-engineering", "microsoft-fabric-and-real-time-analytics"] },
      { label: "Converge", courseSlugs: ["azure-databricks-and-delta-lake", "data-engineering-career-and-capstone"] },
    ],
    destinationNote:
      "It starts with Power BI. But $250K+ was never about the best bar chart in America — it's reporting → modeling → engineering → cloud → architecture, in that order.",
  },
  {
    slug: "principal-data-engineer",
    title: "Principal Data Engineer",
    targetJobs: ["Senior Data Engineer", "Lead Data Engineer", "Staff Data Engineer", "Principal Data Engineer", "Data / Principal Architect"],
    description:
      "This isn't a starting point — it's shown to students as where the other paths lead, not something to enroll in directly. Pick a specialty (Fabric, Databricks, or Snowflake), add the senior-engineering layer nearly every $250K+ posting asks for — Git, dbt, Airflow, Kafka, and infrastructure as code — and the leadership layer most students expect to be missing (system design, architecture trade-offs, requirements gathering) is already built into Data Engineering Career & Capstone's first chapter.",
    salaryRange: "$300K–$600K+ total compensation at elite tech companies — genuinely real, but typically requiring 5–10+ years of production experience and technical ownership",
    isDestination: true,
    stages: [
      { label: "Foundation", courseSlugs: ["t-sql-development"] },
      {
        label: "Choose a specialty",
        note: "Pick one",
        pathChoiceSlugs: ["azure-fabric-data-engineer", "databricks-lakehouse-engineer", "snowflake-data-engineer"],
      },
      {
        label: "Senior layer",
        courseSlugs: ["git-github-cicd-for-data", "dbt-analytics-engineering", "airflow", "kafka-event-streaming", "terraform-bicep-for-data-engineers"],
      },
      {
        label: "Leadership layer",
        note: "Already built — not a gap",
        courseSlugs: ["data-engineering-career-and-capstone"],
      },
    ],
    destinationNote:
      "Already further along than it looks: Career & Capstone's System Design chapter (requirements, estimation, architecture trade-offs, case studies) already covers a real slice of the technical-leadership layer these postings ask for.",
  },
  {
    slug: "principal-staff-ai-engineer",
    title: "Principal / Staff AI Engineer",
    targetJobs: ["Senior AI Engineer", "Staff AI Engineer", "Lead AI Engineer", "Principal AI Engineer", "AI Architect"],
    description:
      "This isn't a starting point — it's shown to students as where the AI Engineer path leads, not something to enroll in directly. Complete the full AI Engineer path and its three capstones, and the senior-engineering and technical-leadership layers that separate a Senior AI Engineer from a Principal AI Engineer or AI Architect — system design at scale, production ownership, mentoring, and architecture trade-offs — come from real production experience. This destination names that ladder rather than promising it's taught in full here.",
    salaryRange: "$350K–$700K+ total compensation at top AI & tech companies — typically requiring years of production AI/ML experience, not a promise on graduation",
    isDestination: true,
    stages: [
      { label: "Foundation", note: "The full AI Engineer path — no prior course assumed", pathChoiceSlugs: ["ai-engineer"] },
    ],
    destinationNote:
      "AI Application Developer → AI Engineer → Senior AI Engineer → Staff/Lead AI Engineer → Principal AI Engineer → AI Architect. Same rule as Principal Data Engineer: no need to invent a second curriculum just so the card looks impressive — the ladder from here is years of production experience, system ownership, architecture, mentoring and scale, not more coursework.",
  },
  {
    slug: "ai-ml-research-and-alignment-engineer",
    title: "AI/ML Research Engineer & Alignment Engineer",
    targetJobs: ["AI Research Engineer", "ML Research Engineer", "AI Alignment Research Engineer", "Reinforcement Learning Research Engineer", "AI Research Scientist"],
    description:
      "This is not a starting point. AI/ML Research Engineering is an advanced destination built on the full AI Engineer path, taking those skills into one of the most technically demanding and fastest-growing areas of AI: frontier model training, reinforcement learning, and alignment. Instead of repeating the foundation, you build real PyTorch fluency and a from-scratch Transformer, then go through how production-scale LLMs are actually pretrained and fine-tuned, the RL algorithms behind modern alignment (RLHF, RLAIF, RL for reasoning), and the evaluation and interpretability techniques used to understand and govern these models. It closes with a taught research lab — three projects deliberately built around SQL and data systems instead of generic RL tasks, since that's this catalog's own strength.",
    salaryRange:
      "$380K–$700K+ total compensation at frontier AI labs — compensation varies enormously by employer and is not a guarantee",
    isDestination: true,
    stages: [
      { label: "Foundation", note: "The full AI Engineer path — no prior course assumed", pathChoiceSlugs: ["ai-engineer"] },
      { label: "Deep Learning & PyTorch", note: "Real PyTorch fluency, ending in a from-scratch Transformer", courseSlugs: ["deep-learning-and-pytorch"] },
      { label: "Advanced LLM Training & ML Systems", courseSlugs: ["advanced-llm-training-and-ml-systems"] },
      { label: "Reinforcement Learning & RL for LLMs", courseSlugs: ["reinforcement-learning-and-rl-for-llms"] },
      { label: "AI Safety, Alignment & Interpretability", courseSlugs: ["ai-safety-alignment-and-interpretability"] },
      { label: "AI Research Engineering", note: "The craft of research engineering itself, not a research subfield", courseSlugs: ["ai-research-engineering"] },
      {
        label: "Research Lab Capstone",
        note: "Three SQL/data-systems-flavored research projects, taught end to end",
        courseSlugs: ["ltv-ai-research-lab"],
        capstone: true,
      },
    ],
    destinationNote:
      "From here, students can specialize as an AI/ML Research Engineer (model training, deep learning, transformers, experimentation), an AI Alignment Research Engineer (alignment, interpretability, evaluations, scalable oversight), a Reinforcement Learning Research Engineer (RL environments, PPO, reward modeling, RLHF/RLAIF, agentic RL), or toward AI Research Scientist — the most research-intensive of the four, with the caveat that Research Scientist roles typically carry substantially stronger academic/research expectations than the others.",
  },
  {
    slug: "ai-infrastructure-ml-systems-engineer",
    title: "AI Infrastructure / ML Systems Engineer",
    targetJobs: ["ML Infrastructure Engineer", "AI Infrastructure Engineer", "ML Systems Engineer", "ML Platform Engineer", "Principal ML Systems Engineer"],
    description:
      "This destination gives an experienced Data Engineer or DevOps Engineer a route into frontier AI without pretending they need to become an ML researcher first. It runs through the full DevOps Engineer path, then distributed systems concepts, real PyTorch fluency, GPU computing, the infrastructure that actually runs distributed training, the platform layer a company builds once it has more than one model in production, and finally inference and model serving — the systems that run frontier AI workloads, not the research itself.",
    salaryRange:
      "$350K–$700K+ total compensation at frontier AI & hyperscale companies — compensation varies enormously by employer and is not a guarantee",
    isDestination: true,
    stages: [
      { label: "Foundation", note: "The full DevOps Engineer path — Linux, Docker, Kubernetes, Terraform and cloud fundamentals", pathChoiceSlugs: ["devops-engineer"] },
      { label: "Distributed Systems Concepts", courseSlugs: ["distributed-systems-concepts"] },
      { label: "Deep Learning & PyTorch", note: "Shared with the AI/ML Research Engineer & Alignment Engineer destination — understand what you're about to run", courseSlugs: ["deep-learning-and-pytorch"] },
      { label: "GPU Computing", courseSlugs: ["gpu-computing"] },
      { label: "Distributed Training Infrastructure", courseSlugs: ["distributed-training-infrastructure"] },
      { label: "ML Infrastructure & Platform Engineering", courseSlugs: ["ml-infrastructure-and-platform-engineering"] },
      {
        label: "Inference & Model Serving",
        note: "Closes with a deployed, benchmarked serving stack",
        courseSlugs: ["inference-and-model-serving"],
        capstone: true,
      },
    ],
    destinationNote:
      "Data Engineer / DevOps Engineer → ML Infrastructure Engineer → Senior ML Infrastructure Engineer → Staff/Principal ML Systems Engineer. Notice how little of this is brand-new: Linux, Docker, Kubernetes and Terraform already exist in the DevOps Engineer path — this destination adds the GPU, distributed-training, platform and serving layers on top of that trunk, not a parallel curriculum.",
  },
  {
    slug: "salesforce-architect",
    title: "Salesforce Architect",
    targetJobs: [
      "Salesforce Administrator",
      "Salesforce Business Analyst",
      "Salesforce Data Analyst",
      "Salesforce Platform Developer",
      "Salesforce Consultant",
      "CRM Analytics Developer",
      "Salesforce Analytics Engineer",
      "Senior Salesforce Developer",
      "Salesforce Solution Architect",
      "Salesforce Application Architect / System Architect",
      "Salesforce Data / Analytics Architect",
      "Salesforce Technical Architect",
    ],
    description:
      "This path takes a beginner from Salesforce fundamentals through administration, then forks into two converging technical ladders. One runs through application development, Apex, Lightning Web Components, integration and enterprise architecture toward Salesforce Technical Architect. The other runs through SQL, analytics, CRM Analytics and the modern data stack toward Salesforce Data/Analytics Architect. Salesforce Architect is the destination — not the student's first job — and both ladders share the same Administrator start and the same career-preparation close.",
    longDescription: [
      "This destination builds on the Salesforce Administrator path. Complete that path first (Administrator and Platform App Builder), then continue here.",
      "From there, this destination forks into two converging ladders that both lead to an Architect-level role. The Technical Architect ladder runs through application development, Apex, Lightning Web Components, integrations, security, and enterprise architecture. The Data & Analytics Architect ladder runs through SQL, analytics, CRM Analytics, Tableau Next, and the modern data stack — Snowflake, dbt, and Airflow.",
      "Students begin by learning how businesses actually use Salesforce and progress through Administrator, then Developer or Analyst, then Architect-level skills on whichever ladder they choose.",
      "Salesforce Architect is the destination — not the student's first job. Students should expect to gain professional Salesforce experience while progressing through either ladder.",
      "The Technical Architect ladder closes with advanced architecture case studies and a capstone requiring students to design and defend a secure, scalable, integrated enterprise Salesforce solution. The Data & Analytics ladder closes with a three-project analytics portfolio capstone.",
    ],
    salaryRange:
      "$250K–$500K+ total compensation at senior enterprise/consulting levels — at the top of either ladder, not an entry-level salary",
    certification:
      "Salesforce certification journey, Administrator through CTA, or Administrator through Tableau Data Analyst / Analytics Architect — see the roadmap below; LTV Academy does not issue Salesforce certifications",
    showLessonTotals: true,
    positioning: {
      heading: "Read this first: what this path is — and is not",
      paragraphs: [
        "A student does NOT graduate from this curriculum and instantly become a Salesforce Architect.",
        "The curriculum teaches the technical foundation and architecture knowledge leading toward that destination, on either ladder. Students should pursue entry-level and intermediate Salesforce employment while progressing through the path.",
        "CTA — and a senior Data/Analytics Architect role — represent advanced professional destinations requiring significant real-world experience. LTV Academy does not promise employment, a Salesforce certification, or CTA.",
      ],
    },
    certificationRoadmap: {
      heading: "Certification journey",
      steps: [
        {
          label: "Foundation",
          items: ["Salesforce Certified Administrator", "Salesforce Certified Platform App Builder"],
        },
        {
          label: "Alternate: Data & Analytics Track",
          items: ["Salesforce Certified Tableau Data Analyst"],
        },
        {
          label: "Developer",
          items: ["Salesforce Certified Platform Developer I"],
        },
        {
          label: "Architect domain credentials",
          items: [
            "Salesforce Certified Platform Data Architect",
            "Salesforce Certified Platform Sharing and Visibility Architect",
            "Salesforce Certified Platform Integration Architect",
            "Salesforce Certified Platform Identity and Access Management Architect",
            "Salesforce Certified Platform Development Lifecycle and Deployment Architect",
          ],
        },
        {
          label: "Architect milestones",
          items: ["Salesforce Certified Application Architect", "Salesforce Certified System Architect"],
        },
        {
          label: "Destination",
          items: ["Salesforce Certified Technical Architect (CTA)"],
        },
      ],
      notice:
        "Certification requirements and credential names can change. LTV Academy prepares students for relevant skills and certification objectives but does not issue Salesforce certifications. Students should verify current Salesforce certification requirements before scheduling an exam.",
    },
    freeLab: {
      eyebrow: "Start free",
      heading: "Free Salesforce Hands-On Environment",
      intro: [
        "Unlike many enterprise software platforms, students do not need to purchase an expensive Salesforce environment to complete most of this career path.",
        "Students can create FREE Salesforce Trailhead Playgrounds and Developer Edition organizations for hands-on practice.",
      ],
      listLabel: "Students will use these environments to:",
      items: [
        "Create objects and fields",
        "Build applications",
        "Configure security",
        "Create users",
        "Build reports and dashboards",
        "Create Flow automations",
        "Write Apex",
        "Build Lightning Web Components",
        "Work with APIs",
        "Practice integrations",
        "Use Salesforce CLI",
        "Practice deployment",
        "Create scratch orgs",
        "Complete LTV projects",
      ],
      buttons: [
        { label: "Create a Trailhead Account", url: "https://trailhead.salesforce.com/" },
        { label: "Salesforce Developer", url: "https://developer.salesforce.com/" },
      ],
      notes: [
        "Some advanced Salesforce products or features may require a special Salesforce-provided trial, training environment, or other environment and may not be available in a standard Trailhead Playground or Developer Edition org.",
        "Salesforce, Trailhead and Developer Edition are Salesforce products. LTV Academy is independent and is not sponsored, endorsed, or operated by Salesforce.",
      ],
    },
    milestones: [
      { label: "Foundation", value: "Salesforce Administrator" },
      { label: "Builder", value: "Salesforce Platform App Builder" },
      { label: "Developer", value: "Salesforce Platform Developer" },
      { label: "Architect", value: "Domain Architect Credentials" },
      { label: "Advanced", value: "Application Architect + System Architect" },
      { label: "Destination", value: "Salesforce Technical Architect / CTA" },
      { label: "Alternate", value: "CRM Analytics Developer → Salesforce Analytics Engineer → Data/Analytics Architect" },
    ],
    courseDetails: {
      "ltv-service-and-sales-platform": "Students document and present the application.",
      "ltv-global-enterprise-transformation":
        "Scenario: LTV Global is a fictional multinational organization replacing disconnected CRM applications with Salesforce. Final defense: the student presents the architecture as though appearing before an enterprise Architecture Review Board, must defend the design, and must explain why alternatives were rejected.",
    },
    courseDetailLists: {
      "architecture-tradeoffs": [
        {
          heading: "Tradeoffs",
          items: [
            "Security vs. usability",
            "Performance vs. complexity",
            "Build vs. buy",
            "Synchronous vs. asynchronous",
            "Declarative vs. programmatic",
            "Real-time vs. batch",
          ],
        },
      ],
      "ltv-service-and-sales-platform": [
        {
          heading: "A more advanced application containing",
          items: [
            "Custom data model",
            "Complex Flow",
            "Apex",
            "SOQL",
            "Apex tests",
            "Lightning Web Components",
            "REST integration",
            "Security model",
            "Reports",
            "Deployment",
          ],
        },
      ],
      "ltv-global-enterprise-transformation": [
        {
          heading: "Salesforce must integrate with",
          items: ["ERP", "Financial system", "Data warehouse", "Identity provider", "Customer portal", "External APIs"],
        },
        {
          heading: "The company has",
          items: [
            "10,000 internal users",
            "Millions of customer records",
            "Multiple business units",
            "International operations",
            "Complex security requirements",
            "Legacy applications",
            "High-volume integrations",
          ],
        },
        {
          heading: "Students must design",
          items: [
            "Salesforce application architecture",
            "Data architecture",
            "Security architecture",
            "Sharing architecture",
            "Identity architecture",
            "Integration architecture",
            "API architecture",
            "Environment strategy",
            "DevOps strategy",
            "Migration strategy",
            "Backup/recovery considerations",
            "Monitoring strategy",
            "Governance model",
          ],
        },
        {
          heading: "Deliverables",
          items: [
            "Executive architecture diagram",
            "System context diagram",
            "Data model",
            "Integration diagram",
            "Security model",
            "Identity design",
            "Environment strategy",
            "CI/CD design",
            "Migration plan",
            "Risk register",
            "Architecture decision records",
            "Implementation roadmap",
            "Technical architecture document",
            "Executive presentation",
          ],
        },
        {
          heading: "Final defense: the instructor challenges you on",
          items: ["Security", "Scalability", "Integration", "Performance", "Data", "Identity", "Deployment", "Failure scenarios", "Architecture tradeoffs"],
        },
      ],
      "salesforce-career-preparation": [
        {
          heading: "Covers",
          items: [
            "Salesforce resumes",
            "Trailhead profile",
            "Portfolio development",
            "GitHub",
            "Certification strategy",
            "Administrator interviews",
            "Developer interviews",
            "Consultant interviews",
            "Architect scenario interviews",
            "Architecture whiteboarding",
            "Presenting capstones",
            "Explaining architecture decisions",
          ],
        },
      ],
    },
    stages: [
      {
        label: "Start: Salesforce Administrator",
        note: "The shared start for both ladders — Administrator and Platform App Builder foundations",
        pathChoiceSlugs: ["salesforce-administrator"],
      },
      {
        label: "Salesforce Development",
        courseSlugs: ["programming-foundations-for-salesforce", "apex-programming", "soql-and-sosl", "apex-testing", "lightning-web-components"],
        checkpoint: {
          kind: "checkpoint",
          label: "Certification checkpoint",
          items: ["Salesforce Certified Platform Developer I"],
        },
      },
      {
        label: "Professional Salesforce Development",
        courseSlugs: ["salesforce-apis", "salesforce-integration-development", "asynchronous-apex", "performance-and-governor-limits"],
      },
      {
        label: "Data Architecture",
        courseSlugs: ["enterprise-salesforce-data-architecture", "large-data-volumes", "data-migration-architecture", "data-governance"],
        checkpoint: {
          kind: "checkpoint",
          label: "Certification checkpoint",
          items: ["Salesforce Certified Platform Data Architect"],
        },
      },
      {
        label: "Alternate Track — Data Analyst Foundations",
        note: "Optional branch toward Salesforce Data/Analytics Architect instead of Technical Architect — SQL, SOQL and native Salesforce reporting",
        courseSlugs: ["t-sql-development", "salesforce-fundamentals-for-data-analysts", "soql-and-salesforce-data-management", "salesforce-reports-and-dashboards"],
      },
      {
        label: "Alternate Track — Analytics & Visualization",
        note: "Tableau, Excel, Python and statistics for analysts",
        courseSlugs: ["tableau", "advanced-excel-for-data-analysts", "python-for-data-science", "statistics-and-probability-for-data-science", "data-visualization-and-eda"],
      },
      {
        label: "Alternate Track — Analytics Capstone & Career Preparation",
        note: "Three portfolio projects, then interview preparation",
        courseSlugs: ["salesforce-analytics-career-and-capstone"],
        capstone: true,
      },
      {
        label: "Alternate Track — Enterprise Analytics",
        note: "Beyond CRM reporting into the enterprise data stack",
        courseSlugs: ["salesforce-crm-analytics-and-tableau-next", "snowflake", "dbt-analytics-engineering", "data-modeling-and-data-warehousing", "airflow", "git-github-cicd-for-data"],
      },
      {
        label: "Alternate Track — Data/Analytics Architecture",
        note: "Already built — not a gap",
        courseSlugs: ["data-engineering-career-and-capstone"],
      },
      {
        label: "Enterprise Security Architecture",
        courseSlugs: ["sharing-and-visibility-architecture", "identity-and-access-management", "enterprise-security-design"],
        checkpoint: {
          kind: "checkpoint",
          label: "Certification checkpoints",
          items: ["Salesforce Certified Platform Sharing and Visibility Architect", "Salesforce Certified Platform Identity and Access Management Architect"],
        },
      },
      {
        label: "Enterprise Integration Architecture",
        courseSlugs: ["integration-architecture", "event-driven-salesforce", "integration-security", "integration-architecture-case-studies"],
        checkpoint: {
          kind: "checkpoint",
          label: "Certification checkpoint",
          items: ["Salesforce Certified Platform Integration Architect"],
        },
      },
      {
        label: "DevOps & Application Lifecycle",
        courseSlugs: ["salesforce-dx", "git-and-source-control", "cicd-for-salesforce", "salesforce-environment-strategy", "release-and-governance-architecture"],
        checkpoint: {
          kind: "checkpoint",
          label: "Certification checkpoint",
          items: ["Salesforce Certified Platform Development Lifecycle and Deployment Architect"],
        },
      },
      {
        label: "Application Architect",
        courseSlugs: ["enterprise-application-architecture", "application-architecture-case-studies", "architecture-documentation"],
        checkpoint: {
          kind: "milestone",
          label: "Milestone",
          items: ["Salesforce Certified Application Architect"],
        },
      },
      {
        label: "System Architect",
        courseSlugs: ["enterprise-systems-architecture", "distributed-systems-concepts", "enterprise-integration-case-studies"],
        checkpoint: {
          kind: "milestone",
          label: "Milestone",
          items: ["Salesforce Certified System Architect"],
        },
      },
      {
        label: "Technical Architect",
        note: "The destination — an advanced professional credential, not a graduation outcome",
        courseSlugs: ["technical-architecture-fundamentals", "architecture-tradeoffs", "architecture-review-boards", "nonfunctional-requirements", "technical-architect-case-studies"],
        checkpoint: {
          kind: "destination",
          label: "Destination",
          items: ["Salesforce Certified Technical Architect (CTA)"],
          note: "The Certified Technical Architect (CTA) credential is an advanced destination credential that requires substantial professional experience. It is not an entry-level certification and should never be treated as one.",
        },
      },
      {
        label: "Capstone II — Salesforce Developer",
        courseSlugs: ["ltv-service-and-sales-platform"],
        capstone: true,
      },
      {
        label: "Final Enterprise Architect Capstone",
        note: "Design and defend a secure, scalable, integrated enterprise Salesforce solution",
        courseSlugs: ["ltv-global-enterprise-transformation"],
        capstone: true,
      },
      {
        label: "Career & Interview Preparation",
        note: "Shared close for both ladders",
        courseSlugs: ["salesforce-career-preparation"],
      },
    ],
    specializations: {
      heading: "Two ladders, one destination",
      primaryLabel: "Technical Architect track",
      primary: ["Development", "Integration architecture", "Security architecture", "Enterprise architecture", "Salesforce Certified Technical Architect (CTA)"],
      optionalLabel: "Data & Analytics Architect track",
      optional: ["CRM Analytics & Tableau Next", "Snowflake & dbt", "Data engineering capstone", "Salesforce Data / Analytics Architect"],
    },
    destinationNote:
      "Two ladders converge on one destination. Technical: Salesforce Administrator → Business Analyst → Platform Developer → Consultant → Senior Developer → Solution Architect → Application Architect / System Architect → Technical Architect. Analytics: Salesforce Administrator → Data Analyst → Senior Data Analyst → CRM Analytics Developer → Salesforce Analytics Engineer → Senior Analytics Engineer → Data/Analytics Architect. Both take significant real-world experience, not just coursework — pursue entry-level and intermediate Salesforce roles while you work through either ladder.",
    isDestination: true,
  },
  {
    slug: "quantitative-developer-researcher",
    title: "Quantitative Developer / Researcher",
    subtitle: "The highest technical destination on the LTV career ladder",
    targetJobs: ["Quantitative Analyst", "Quantitative Developer", "Quantitative Researcher", "Quant ML Researcher", "Low-Latency / High-Frequency Trading (HFT) Engineer"],
    description:
      "This is not a starting point. Quantitative Development and Research is an advanced destination built on the skills developed throughout the LTV career paths — SQL, Python, statistics, machine learning, data engineering, cloud computing, Git, data pipelines, and MLOps. It takes those skills into one of the most technically demanding areas of technology and finance.",
    longDescription: [
      "This is not a starting point. Quantitative Development and Research is an advanced destination built on the skills developed throughout the LTV career paths.",
      "By the time you reach this specialization, you should already have a strong foundation in SQL, Python, statistics, machine learning, data engineering, cloud computing, Git, data pipelines, and MLOps through the Data Scientist path and a Data Engineering specialty.",
      "The Quantitative Developer / Researcher path takes those skills into one of the most technically demanding areas of technology and finance.",
      "Instead of repeating the foundation, you advance into mathematics for quantitative finance, advanced Python for research, C++ for high-performance production systems, financial markets and derivatives, time-series analysis, financial modeling, machine learning for noisy financial data, algorithmic trading, risk modeling, and backtesting.",
      "The path concludes with a Quantitative Research & Trading Capstone in which you take:",
    ],
    capstoneFlow: [
      "Raw Market Data",
      "Research Question",
      "Statistical Analysis",
      "Feature Engineering",
      "Model",
      "Trading Signal",
      "Backtest",
      "Risk Analysis",
      "Performance Report",
      "Presentation",
    ],
    afterFlow: [
      "From there, students can specialize as a Quantitative Researcher, Quantitative Developer, Quant ML Researcher, or Low-Latency / High-Frequency Trading Engineer.",
    ],
    salaryRange: "$500K–$1M+ total compensation at elite quant firms — exceptional senior researchers can exceed $1M",
    compensation: {
      heading: "Compensation potential",
      paragraphs: [
        "$250K–$500K+ total compensation is possible early in a quantitative career at highly selective trading firms and hedge funds.",
        "Experienced and senior quantitative professionals can reach approximately $500K–$1M+ in total compensation, while successful senior Quant Researchers at elite firms can reach $750K–$1.5M+ and, in exceptional performance-driven positions, considerably more.",
        "These figures represent total compensation — base salary plus bonuses, incentives, profit sharing, and/or equity — rather than guaranteed base salary.",
        "Quantitative finance has an unusually wide compensation range because bonuses and performance can represent a substantial portion of earnings. Reaching the highest compensation levels generally requires exceptional technical ability, strong performance, experience, and admission to some of the most selective employers in technology and finance.",
      ],
    },
    progression: {
      heading: "Career progression",
      ladder: "Quantitative Analyst → Quantitative Developer / Researcher → Senior Quantitative Developer / Researcher → Lead Quant / Portfolio Manager / Head of Quantitative Research",
      levels: [
        { label: "Senior-career target", value: "$500K–$1M+ total compensation" },
        { label: "High-performing Senior Quant Research", value: "$750K–$1.5M+" },
        { label: "Elite leadership / performance-driven roles", value: "$1M–$2M+ potential" },
      ],
    },
    isDestination: true,
    stages: [
      {
        label: "Data science foundation",
        note: "Levels 1–4 of the ladder: SQL, Python, statistics, machine learning, AI, cloud ML, and MLOps",
        pathChoiceSlugs: ["data-scientist"],
      },
      {
        label: "Data engineering layer",
        note: "Level 3: pipelines and cloud — pick one specialty",
        pathChoiceSlugs: ["azure-fabric-data-engineer", "databricks-lakehouse-engineer", "aws-data-engineer", "snowflake-data-engineer"],
      },
      {
        label: "Quantitative core",
        note: "Level 5: the new advanced specialization layer",
        courseSlugs: [
          "mathematics-for-quantitative-finance",
          "advanced-python-for-quant-research",
          "cpp-for-quantitative-developers",
          "financial-markets-and-quantitative-finance",
          "time-series-and-financial-modeling",
          "machine-learning-for-quant-finance",
          "algorithmic-trading-and-backtesting",
        ],
      },
      {
        label: "Research capstone",
        note: "From raw market data to a presented, backtested, risk-analyzed trading strategy",
        courseSlugs: ["quant-research-and-trading-capstone"],
      },
    ],
    destinationNote:
      "Level 6 is specialization: Quantitative Researcher (heavy mathematics, statistics, machine learning, and research), Quantitative Developer (C++, Python, distributed systems, and performance engineering), Quant ML Researcher (deep learning, alternative data, NLP, and time series), or Low-Latency / High-Frequency Trading Engineer (C++, networking, operating systems, concurrency, and performance optimization). Top firms hire very selectively, and the highest compensation levels typically take years of proven results rather than being a promise on graduation.",
  },
];

export const getCareerPath = (slug: string) => CAREER_PATHS.find((p) => p.slug === slug);
