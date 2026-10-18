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
      L(1, "what-a-configuration-item-actually-is", "What a Configuration Item Actually Is", { contentDir: "ch01/01-what-a-configuration-item-actually-is" }),
      L(2, "the-cmdb-ci-table-hierarchy", "The cmdb_ci Table Hierarchy", { contentDir: "ch01/02-the-cmdb-ci-table-hierarchy" }),
      L(3, "why-cmdb-data-quality-is-genuinely-hard", "Why CMDB Data Quality Is Genuinely Hard", { contentDir: "ch01/03-why-cmdb-data-quality-is-genuinely-hard" }),
      L(4, "cmdb-fundamentals-lab", "CMDB Fundamentals Lab", { contentDir: "ch01/04-cmdb-fundamentals-lab" }),
    ],
  },
  {
    n: 2,
    title: "Relationships & the Dependency View",
    lessons: [
      L(5, "ci-relationships-and-relationship-types", "CI Relationships & Relationship Types", { contentDir: "ch02/05-ci-relationships-and-relationship-types" }),
      L(6, "the-dependency-view-and-service-mapping-overview", "The Dependency View & Service Mapping: Overview", { contentDir: "ch02/06-the-dependency-view-and-service-mapping-overview" }),
      L(7, "impact-analysis-using-relationships", "Impact Analysis Using Relationships", { contentDir: "ch02/07-impact-analysis-using-relationships" }),
      L(8, "relationships-lab", "Relationships Lab", { contentDir: "ch02/08-relationships-lab" }),
    ],
  },
  {
    n: 3,
    title: "The Common Service Data Model (CSDM)",
    lessons: [
      L(9, "why-csdm-exists", "Why CSDM Exists", { contentDir: "ch03/09-why-csdm-exists" }),
      L(10, "the-csdm-domains-overview", "The CSDM Domains: Overview", { contentDir: "ch03/10-the-csdm-domains-overview" }),
      L(11, "business-and-technical-services-in-csdm", "Business & Technical Services in CSDM", { contentDir: "ch03/11-business-and-technical-services-in-csdm" }),
      L(12, "applying-csdm-to-a-real-cmdb", "Applying CSDM to a Real CMDB", { contentDir: "ch03/12-applying-csdm-to-a-real-cmdb" }),
      L(13, "csdm-lab", "CSDM Lab", { contentDir: "ch03/13-csdm-lab" }),
    ],
  },
  {
    n: 4,
    title: "Discovery Fundamentals",
    lessons: [
      L(14, "what-discovery-actually-does", "What Discovery Actually Does", { contentDir: "ch04/14-what-discovery-actually-does" }),
      L(15, "discovery-schedules-and-probes", "Discovery Schedules & Probes", { contentDir: "ch04/15-discovery-schedules-and-probes" }),
      L(16, "horizontal-and-vertical-discovery", "Horizontal & Vertical Discovery", { contentDir: "ch04/16-horizontal-and-vertical-discovery" }),
      L(17, "discovery-and-mid-server-requirements", "Discovery & MID Server Requirements", { contentDir: "ch04/17-discovery-and-mid-server-requirements" }),
    ],
  },
  {
    n: 5,
    title: "Data Quality & Governance",
    lessons: [
      L(18, "cmdb-health-dashboard", "CMDB Health Dashboard", { contentDir: "ch05/18-cmdb-health-dashboard" }),
      L(19, "identification-and-reconciliation-rules", "Identification & Reconciliation Rules", { contentDir: "ch05/19-identification-and-reconciliation-rules" }),
      L(20, "duplicate-ci-detection-and-cleanup", "Duplicate CI Detection & Cleanup", { contentDir: "ch05/20-duplicate-ci-detection-and-cleanup" }),
      L(21, "cmdb-governance-ownership-and-stewardship", "CMDB Governance: Ownership & Stewardship", { contentDir: "ch05/21-cmdb-governance-ownership-and-stewardship" }),
      L(22, "data-quality-lab", "Data Quality Lab", { contentDir: "ch05/22-data-quality-lab" }),
    ],
  },
  {
    n: 6,
    title: "Capstone: CMDB & Data Quality Implementation",
    lessons: [
      L(23, "capstone-kickoff-model-a-real-service", "Capstone Kickoff: Model a Real Service", { contentDir: "ch06/23-capstone-kickoff-model-a-real-service" }),
      L(24, "capstone-build-cis-and-relationships", "Capstone: Build CIs & Relationships", { contentDir: "ch06/24-capstone-build-cis-and-relationships" }),
      L(25, "capstone-apply-csdm-and-validate-data-quality", "Capstone: Apply CSDM & Validate Data Quality", { contentDir: "ch06/25-capstone-apply-csdm-and-validate-data-quality" }),
      L(26, "capstone-wrap-up-and-governance-plan", "Capstone Wrap-Up & Governance Plan", { contentDir: "ch06/26-capstone-wrap-up-and-governance-plan" }),
    ],
  },
];
