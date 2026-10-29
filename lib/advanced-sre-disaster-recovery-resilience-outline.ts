// Advanced Site Reliability Engineering, Disaster Recovery & Resilience course outline. Lessons
// without a contentDir render as "in production". Course 15 of the Cloud Engineer → Cloud
// Architect path — the fourth and final Expert Specialization course, closing the entire
// 15-course path. Builds on the whole path: Terraform, Kubernetes, observability/FinOps, and
// the three other Expert courses.

export type LessonMeta = {
  n: number;
  slug: string;
  title: string;
  contentDir?: string; // under content/advanced-sre-disaster-recovery-resilience/
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

export const ADVANCED_SRE_DISASTER_RECOVERY_RESILIENCE_CHAPTERS: ChapterMeta[] = [
  {
    n: 1,
    title: "SRE Principles at Enterprise Scale",
    lessons: [
      L(1, "what-changes-about-sre-once-youre-running-hundreds-of-services", "What Changes About SRE Once You're Running Hundreds of Services", { contentDir: "ch01/01-what-changes-about-sre-once-youre-running-hundreds-of-services" }),
      L(2, "error-budgets-as-an-organizational-decision-making-tool", "Error Budgets as an Organizational Decision-Making Tool", { contentDir: "ch01/02-error-budgets-as-an-organizational-decision-making-tool" }),
      L(3, "toil-and-why-reducing-it-is-an-engineering-priority-not-a-nice-to-have", "Toil, and Why Reducing It Is an Engineering Priority, Not a Nice-to-Have", { contentDir: "ch01/03-toil-and-why-reducing-it-is-an-engineering-priority-not-a-nice-to-have" }),
      L(4, "the-real-relationship-between-sre-and-platform-engineering", "The Real Relationship Between SRE and Platform Engineering", { contentDir: "ch01/04-the-real-relationship-between-sre-and-platform-engineering" }),
    ],
  },
  {
    n: 2,
    title: "Advanced Incident Management",
    lessons: [
      L(5, "incident-command-at-scale-roles-beyond-the-basics", "Incident Command at Scale: Roles Beyond the Basics", { contentDir: "ch02/05-incident-command-at-scale-roles-beyond-the-basics" }),
      L(6, "coordinating-a-multi-team-incident-without-chaos", "Coordinating a Multi-Team Incident Without Chaos", { contentDir: "ch02/06-coordinating-a-multi-team-incident-without-chaos" }),
      L(7, "communicating-with-customers-and-stakeholders-during-an-outage", "Communicating with Customers and Stakeholders During an Outage", { contentDir: "ch02/07-communicating-with-customers-and-stakeholders-during-an-outage" }),
      L(8, "the-postmortem-process-at-scale-across-many-teams", "The Postmortem Process at Scale, Across Many Teams", { contentDir: "ch02/08-the-postmortem-process-at-scale-across-many-teams" }),
    ],
  },
  {
    n: 3,
    title: "Chaos Engineering and Resilience Testing",
    lessons: [
      L(9, "what-chaos-engineering-actually-tests-for", "What Chaos Engineering Actually Tests For", { contentDir: "ch03/09-what-chaos-engineering-actually-tests-for" }),
      L(10, "running-a-real-chaos-experiment-safely", "Running a Real Chaos Experiment Safely", { contentDir: "ch03/10-running-a-real-chaos-experiment-safely" }),
      L(11, "game-days-rehearsing-a-disaster-before-it-happens", "Game Days: Rehearsing a Disaster Before It Happens", { contentDir: "ch03/11-game-days-rehearsing-a-disaster-before-it-happens" }),
      L(12, "turning-chaos-findings-into-real-architecture-changes", "Turning Chaos Findings into Real Architecture Changes", { contentDir: "ch03/12-turning-chaos-findings-into-real-architecture-changes" }),
    ],
  },
  {
    n: 4,
    title: "Advanced Disaster Recovery Architecture",
    lessons: [
      L(13, "dr-architecture-patterns-revisited-at-enterprise-complexity", "DR Architecture Patterns Revisited at Enterprise Complexity", { contentDir: "ch04/13-dr-architecture-patterns-revisited-at-enterprise-complexity" }),
      L(14, "dependency-mapping-so-you-know-whats-actually-in-the-blast-radius", "Dependency Mapping So You Know What's Actually in the Blast Radius", { contentDir: "ch04/14-dependency-mapping-so-you-know-whats-actually-in-the-blast-radius" }),
      L(15, "automating-failover-instead-of-relying-on-a-runbook-at-3am", "Automating Failover Instead of Relying on a Runbook at 3 A.M.", { contentDir: "ch04/15-automating-failover-instead-of-relying-on-a-runbook-at-3am" }),
      L(16, "testing-dr-at-the-scale-of-a-real-production-environment", "Testing DR at the Scale of a Real Production Environment", { contentDir: "ch04/16-testing-dr-at-the-scale-of-a-real-production-environment" }),
    ],
  },
  {
    n: 5,
    title: "Capacity Planning and Performance Engineering",
    lessons: [
      L(17, "forecasting-capacity-needs-from-real-growth-trends", "Forecasting Capacity Needs from Real Growth Trends", { contentDir: "ch05/17-forecasting-capacity-needs-from-real-growth-trends" }),
      L(18, "load-testing-that-actually-predicts-production-behavior", "Load Testing That Actually Predicts Production Behavior", { contentDir: "ch05/18-load-testing-that-actually-predicts-production-behavior" }),
      L(19, "performance-engineering-as-a-discipline-not-an-afterthought", "Performance Engineering as a Discipline, Not an Afterthought", { contentDir: "ch05/19-performance-engineering-as-a-discipline-not-an-afterthought" }),
      L(20, "capacity-planning-for-a-traffic-spike-you-can-see-coming", "Capacity Planning for a Traffic Spike You Can See Coming", { contentDir: "ch05/20-capacity-planning-for-a-traffic-spike-you-can-see-coming" }),
    ],
  },
  {
    n: 6,
    title: "On-Call and Operational Excellence",
    lessons: [
      L(21, "designing-an-on-call-rotation-that-doesnt-burn-people-out", "Designing an On-Call Rotation That Doesn't Burn People Out", { contentDir: "ch06/21-designing-an-on-call-rotation-that-doesnt-burn-people-out" }),
      L(22, "runbooks-that-actually-get-used-at-3am", "Runbooks That Actually Get Used at 3 A.M.", { contentDir: "ch06/22-runbooks-that-actually-get-used-at-3am" }),
      L(23, "operational-readiness-reviews-before-a-service-goes-to-production", "Operational Readiness Reviews Before a Service Goes to Production", { contentDir: "ch06/23-operational-readiness-reviews-before-a-service-goes-to-production" }),
      L(24, "measuring-operational-excellence-beyond-uptime", "Measuring Operational Excellence Beyond Uptime", { contentDir: "ch06/24-measuring-operational-excellence-beyond-uptime" }),
    ],
  },
  {
    n: 7,
    title: "Building an SRE Practice and Culture",
    lessons: [
      L(25, "introducing-sre-into-an-organization-that-doesnt-have-it-yet", "Introducing SRE into an Organization That Doesn't Have It Yet", { contentDir: "ch07/25-introducing-sre-into-an-organization-that-doesnt-have-it-yet" }),
      L(26, "the-real-tension-between-reliability-and-feature-velocity", "The Real Tension Between Reliability and Feature Velocity", { contentDir: "ch07/26-the-real-tension-between-reliability-and-feature-velocity" }),
      L(27, "blameless-culture-in-practice-not-just-in-the-postmortem-template", "Blameless Culture in Practice, Not Just in the Postmortem Template", { contentDir: "ch07/27-blameless-culture-in-practice-not-just-in-the-postmortem-template" }),
      L(28, "scaling-an-sre-team-as-the-organization-grows", "Scaling an SRE Team as the Organization Grows", { contentDir: "ch07/28-scaling-an-sre-team-as-the-organization-grows" }),
    ],
  },
  {
    n: 8,
    title: "Capstone: Building a Resilient Enterprise System",
    lessons: [
      L(29, "lab-designing-and-testing-a-disaster-recovery-plan", "Lab: Designing and Testing a Disaster Recovery Plan", { contentDir: "ch08/29-lab-designing-and-testing-a-disaster-recovery-plan" }),
      L(30, "lab-running-a-chaos-experiment-and-a-game-day", "Lab: Running a Chaos Experiment and a Game Day", { contentDir: "ch08/30-lab-running-a-chaos-experiment-and-a-game-day" }),
      L(31, "case-study-a-resilient-architecture-that-still-had-a-single-point-of-failure", "Case Study: A Resilient Architecture That Still Had a Single Point of Failure", { contentDir: "ch08/31-case-study-a-resilient-architecture-that-still-had-a-single-point-of-failure" }),
      L(32, "chapter-capstone-the-whole-path-from-cloud-support-to-cloud-architect", "Chapter Capstone: The Whole Path, from Cloud Support to Cloud Architect", { contentDir: "ch08/32-chapter-capstone-the-whole-path-from-cloud-support-to-cloud-architect" }),
    ],
  },
];
