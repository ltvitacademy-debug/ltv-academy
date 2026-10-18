// ServiceNow CMDB, CSDM & Discovery course outline. Lessons without a contentDir render as
// "in production". Course 9 of 14 in the ServiceNow Administrator → Developer → Technical
// Architect path: configuration management, the Common Service Data Model, and Discovery basics.

export type LessonMeta = {
  n: number;
  slug: string;
  title: string;
  contentDir?: string; // under content/servicenow-cmdb-csdm-discovery/
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

export const SERVICENOW_CMDB_CSDM_DISCOVERY_CHAPTERS: ChapterMeta[] = [
  {
    n: 1,
    title: "CMDB Fundamentals",
    lessons: [
      L(1, "what-a-configuration-item-actually-is", "What a Configuration Item Actually Is"),
      L(2, "the-cmdb-ci-table-hierarchy", "The cmdb_ci Table Hierarchy"),
      L(3, "why-cmdb-data-quality-is-genuinely-hard", "Why CMDB Data Quality Is Genuinely Hard"),
      L(4, "cmdb-fundamentals-lab", "CMDB Fundamentals Lab"),
    ],
  },
  {
    n: 2,
    title: "Relationships & the Dependency View",
    lessons: [
      L(5, "ci-relationships-and-relationship-types", "CI Relationships & Relationship Types"),
      L(6, "the-dependency-view-and-service-mapping-overview", "The Dependency View & Service Mapping: Overview"),
      L(7, "impact-analysis-using-relationships", "Impact Analysis Using Relationships"),
      L(8, "relationships-lab", "Relationships Lab"),
    ],
  },
  {
    n: 3,
    title: "The Common Service Data Model (CSDM)",
    lessons: [
      L(9, "why-csdm-exists", "Why CSDM Exists"),
      L(10, "the-csdm-domains-overview", "The CSDM Domains: Overview"),
      L(11, "business-and-technical-services-in-csdm", "Business & Technical Services in CSDM"),
      L(12, "applying-csdm-to-a-real-cmdb", "Applying CSDM to a Real CMDB"),
      L(13, "csdm-lab", "CSDM Lab"),
    ],
  },
  {
    n: 4,
    title: "Discovery Fundamentals",
    lessons: [
      L(14, "what-discovery-actually-does", "What Discovery Actually Does"),
      L(15, "discovery-schedules-and-probes", "Discovery Schedules & Probes"),
      L(16, "horizontal-and-vertical-discovery", "Horizontal & Vertical Discovery"),
      L(17, "discovery-and-mid-server-requirements", "Discovery & MID Server Requirements"),
    ],
  },
  {
    n: 5,
    title: "Data Quality & Governance",
    lessons: [
      L(18, "cmdb-health-dashboard", "CMDB Health Dashboard"),
      L(19, "identification-and-reconciliation-rules", "Identification & Reconciliation Rules"),
      L(20, "duplicate-ci-detection-and-cleanup", "Duplicate CI Detection & Cleanup"),
      L(21, "cmdb-governance-ownership-and-stewardship", "CMDB Governance: Ownership & Stewardship"),
      L(22, "data-quality-lab", "Data Quality Lab"),
    ],
  },
  {
    n: 6,
    title: "Capstone: CMDB & Data Quality Implementation",
    lessons: [
      L(23, "capstone-kickoff-model-a-real-service", "Capstone Kickoff: Model a Real Service"),
      L(24, "capstone-build-cis-and-relationships", "Capstone: Build CIs & Relationships"),
      L(25, "capstone-apply-csdm-and-validate-data-quality", "Capstone: Apply CSDM & Validate Data Quality"),
      L(26, "capstone-wrap-up-and-governance-plan", "Capstone Wrap-Up & Governance Plan"),
    ],
  },
];
