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
      L(1, "what-a-configuration-item-actually-is", "What a Configuration Item Actually Is", { contentDir: "ch01/01-what-a-configuration-item-actually-is", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792720832/ltv-servicenow-cmdb-csdm-discovery/what-a-configuration-item-actually-is.mp4", durationLabel: "2 min 36 s" }),
      L(2, "the-cmdb-ci-table-hierarchy", "The cmdb_ci Table Hierarchy", { contentDir: "ch01/02-the-cmdb-ci-table-hierarchy", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792720903/ltv-servicenow-cmdb-csdm-discovery/the-cmdb-ci-table-hierarchy.mp4", durationLabel: "2 min 29 s" }),
      L(3, "why-cmdb-data-quality-is-genuinely-hard", "Why CMDB Data Quality Is Genuinely Hard", { contentDir: "ch01/03-why-cmdb-data-quality-is-genuinely-hard", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792720967/ltv-servicenow-cmdb-csdm-discovery/why-cmdb-data-quality-is-genuinely-hard.mp4", durationLabel: "2 min 14 s" }),
      L(4, "cmdb-fundamentals-lab", "CMDB Fundamentals Lab", { contentDir: "ch01/04-cmdb-fundamentals-lab", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792721044/ltv-servicenow-cmdb-csdm-discovery/cmdb-fundamentals-lab.mp4", durationLabel: "2 min 44 s" }),
    ],
  },
  {
    n: 2,
    title: "Relationships & the Dependency View",
    lessons: [
      L(5, "ci-relationships-and-relationship-types", "CI Relationships & Relationship Types", { contentDir: "ch02/05-ci-relationships-and-relationship-types", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792721114/ltv-servicenow-cmdb-csdm-discovery/ci-relationships-and-relationship-types.mp4", durationLabel: "2 min 26 s" }),
      L(6, "the-dependency-view-and-service-mapping-overview", "The Dependency View & Service Mapping: Overview", { contentDir: "ch02/06-the-dependency-view-and-service-mapping-overview", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792721184/ltv-servicenow-cmdb-csdm-discovery/the-dependency-view-and-service-mapping-overview.mp4", durationLabel: "2 min 30 s" }),
      L(7, "impact-analysis-using-relationships", "Impact Analysis Using Relationships", { contentDir: "ch02/07-impact-analysis-using-relationships", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792721243/ltv-servicenow-cmdb-csdm-discovery/impact-analysis-using-relationships.mp4", durationLabel: "2 min 10 s" }),
      L(8, "relationships-lab", "Relationships Lab", { contentDir: "ch02/08-relationships-lab", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792721301/ltv-servicenow-cmdb-csdm-discovery/relationships-lab.mp4", durationLabel: "2 min 13 s" }),
    ],
  },
  {
    n: 3,
    title: "The Common Service Data Model (CSDM)",
    lessons: [
      L(9, "why-csdm-exists", "Why CSDM Exists", { contentDir: "ch03/09-why-csdm-exists", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792721373/ltv-servicenow-cmdb-csdm-discovery/why-csdm-exists.mp4", durationLabel: "2 min 45 s" }),
      L(10, "the-csdm-domains-overview", "The CSDM Domains: Overview", { contentDir: "ch03/10-the-csdm-domains-overview", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792721435/ltv-servicenow-cmdb-csdm-discovery/the-csdm-domains-overview.mp4", durationLabel: "2 min 19 s" }),
      L(11, "business-and-technical-services-in-csdm", "Business & Technical Services in CSDM", { contentDir: "ch03/11-business-and-technical-services-in-csdm", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792721492/ltv-servicenow-cmdb-csdm-discovery/business-and-technical-services-in-csdm.mp4", durationLabel: "2 min 11 s" }),
      L(12, "applying-csdm-to-a-real-cmdb", "Applying CSDM to a Real CMDB", { contentDir: "ch03/12-applying-csdm-to-a-real-cmdb", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792721554/ltv-servicenow-cmdb-csdm-discovery/applying-csdm-to-a-real-cmdb.mp4", durationLabel: "2 min 20 s" }),
      L(13, "csdm-lab", "CSDM Lab", { contentDir: "ch03/13-csdm-lab", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792721611/ltv-servicenow-cmdb-csdm-discovery/csdm-lab.mp4", durationLabel: "2 min 12 s" }),
    ],
  },
  {
    n: 4,
    title: "Discovery Fundamentals",
    lessons: [
      L(14, "what-discovery-actually-does", "What Discovery Actually Does", { contentDir: "ch04/14-what-discovery-actually-does", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792721674/ltv-servicenow-cmdb-csdm-discovery/what-discovery-actually-does.mp4", durationLabel: "2 min 25 s" }),
      L(15, "discovery-schedules-and-probes", "Discovery Schedules & Probes", { contentDir: "ch04/15-discovery-schedules-and-probes", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792721739/ltv-servicenow-cmdb-csdm-discovery/discovery-schedules-and-probes.mp4", durationLabel: "2 min 31 s" }),
      L(16, "horizontal-and-vertical-discovery", "Horizontal & Vertical Discovery", { contentDir: "ch04/16-horizontal-and-vertical-discovery", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792721801/ltv-servicenow-cmdb-csdm-discovery/horizontal-and-vertical-discovery.mp4", durationLabel: "2 min 21 s" }),
      L(17, "discovery-and-mid-server-requirements", "Discovery & MID Server Requirements", { contentDir: "ch04/17-discovery-and-mid-server-requirements", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792721864/ltv-servicenow-cmdb-csdm-discovery/discovery-and-mid-server-requirements.mp4", durationLabel: "2 min 28 s" }),
    ],
  },
  {
    n: 5,
    title: "Data Quality & Governance",
    lessons: [
      L(18, "cmdb-health-dashboard", "CMDB Health Dashboard", { contentDir: "ch05/18-cmdb-health-dashboard", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792721933/ltv-servicenow-cmdb-csdm-discovery/cmdb-health-dashboard.mp4", durationLabel: "2 min 35 s" }),
      L(19, "identification-and-reconciliation-rules", "Identification & Reconciliation Rules", { contentDir: "ch05/19-identification-and-reconciliation-rules", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792722006/ltv-servicenow-cmdb-csdm-discovery/identification-and-reconciliation-rules.mp4", durationLabel: "2 min 47 s" }),
      L(20, "duplicate-ci-detection-and-cleanup", "Duplicate CI Detection & Cleanup", { contentDir: "ch05/20-duplicate-ci-detection-and-cleanup", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792722074/ltv-servicenow-cmdb-csdm-discovery/duplicate-ci-detection-and-cleanup.mp4", durationLabel: "2 min 41 s" }),
      L(21, "cmdb-governance-ownership-and-stewardship", "CMDB Governance: Ownership & Stewardship", { contentDir: "ch05/21-cmdb-governance-ownership-and-stewardship", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792722147/ltv-servicenow-cmdb-csdm-discovery/cmdb-governance-ownership-and-stewardship.mp4", durationLabel: "2 min 56 s" }),
      L(22, "data-quality-lab", "Data Quality Lab", { contentDir: "ch05/22-data-quality-lab", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792722214/ltv-servicenow-cmdb-csdm-discovery/data-quality-lab.mp4", durationLabel: "2 min 31 s" }),
    ],
  },
  {
    n: 6,
    title: "Capstone: CMDB & Data Quality Implementation",
    lessons: [
      L(23, "capstone-kickoff-model-a-real-service", "Capstone Kickoff: Model a Real Service", { contentDir: "ch06/23-capstone-kickoff-model-a-real-service", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792722284/ltv-servicenow-cmdb-csdm-discovery/capstone-kickoff-model-a-real-service.mp4", durationLabel: "2 min 40 s" }),
      L(24, "capstone-build-cis-and-relationships", "Capstone: Build CIs & Relationships", { contentDir: "ch06/24-capstone-build-cis-and-relationships", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792722357/ltv-servicenow-cmdb-csdm-discovery/capstone-build-cis-and-relationships.mp4", durationLabel: "2 min 48 s" }),
      L(25, "capstone-apply-csdm-and-validate-data-quality", "Capstone: Apply CSDM & Validate Data Quality", { contentDir: "ch06/25-capstone-apply-csdm-and-validate-data-quality", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792722421/ltv-servicenow-cmdb-csdm-discovery/capstone-apply-csdm-and-validate-data-quality.mp4", durationLabel: "2 min 27 s" }),
      L(26, "capstone-wrap-up-and-governance-plan", "Capstone Wrap-Up & Governance Plan", { contentDir: "ch06/26-capstone-wrap-up-and-governance-plan", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792722488/ltv-servicenow-cmdb-csdm-discovery/capstone-wrap-up-and-governance-plan.mp4", durationLabel: "2 min 34 s" }),
    ],
  },
];
