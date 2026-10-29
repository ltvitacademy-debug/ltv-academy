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
      L(1, "what-changes-about-sre-once-youre-running-hundreds-of-services", "What Changes About SRE Once You're Running Hundreds of Services", { contentDir: "ch01/01-what-changes-about-sre-once-youre-running-hundreds-of-services", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-advanced-sre-disaster-recovery-resilience/what-changes-about-sre-once-youre-running-hundreds-of-services.mp4", durationLabel: "3 min 4 s" }),
      L(2, "error-budgets-as-an-organizational-decision-making-tool", "Error Budgets as an Organizational Decision-Making Tool", { contentDir: "ch01/02-error-budgets-as-an-organizational-decision-making-tool", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-advanced-sre-disaster-recovery-resilience/error-budgets-as-an-organizational-decision-making-tool.mp4", durationLabel: "2 min 56 s" }),
      L(3, "toil-and-why-reducing-it-is-an-engineering-priority-not-a-nice-to-have", "Toil, and Why Reducing It Is an Engineering Priority, Not a Nice-to-Have", { contentDir: "ch01/03-toil-and-why-reducing-it-is-an-engineering-priority-not-a-nice-to-have", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-advanced-sre-disaster-recovery-resilience/toil-and-why-reducing-it-is-an-engineering-priority-not-a-nice-to-have.mp4", durationLabel: "3 min 10 s" }),
      L(4, "the-real-relationship-between-sre-and-platform-engineering", "The Real Relationship Between SRE and Platform Engineering", { contentDir: "ch01/04-the-real-relationship-between-sre-and-platform-engineering", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-advanced-sre-disaster-recovery-resilience/the-real-relationship-between-sre-and-platform-engineering.mp4", durationLabel: "3 min 22 s" }),
    ],
  },
  {
    n: 2,
    title: "Advanced Incident Management",
    lessons: [
      L(5, "incident-command-at-scale-roles-beyond-the-basics", "Incident Command at Scale: Roles Beyond the Basics", { contentDir: "ch02/05-incident-command-at-scale-roles-beyond-the-basics", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-advanced-sre-disaster-recovery-resilience/incident-command-at-scale-roles-beyond-the-basics.mp4", durationLabel: "2 min 38 s" }),
      L(6, "coordinating-a-multi-team-incident-without-chaos", "Coordinating a Multi-Team Incident Without Chaos", { contentDir: "ch02/06-coordinating-a-multi-team-incident-without-chaos", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-advanced-sre-disaster-recovery-resilience/coordinating-a-multi-team-incident-without-chaos.mp4", durationLabel: "2 min 22 s" }),
      L(7, "communicating-with-customers-and-stakeholders-during-an-outage", "Communicating with Customers and Stakeholders During an Outage", { contentDir: "ch02/07-communicating-with-customers-and-stakeholders-during-an-outage", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-advanced-sre-disaster-recovery-resilience/communicating-with-customers-and-stakeholders-during-an-outage.mp4", durationLabel: "2 min 11 s" }),
      L(8, "the-postmortem-process-at-scale-across-many-teams", "The Postmortem Process at Scale, Across Many Teams", { contentDir: "ch02/08-the-postmortem-process-at-scale-across-many-teams", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-advanced-sre-disaster-recovery-resilience/the-postmortem-process-at-scale-across-many-teams.mp4", durationLabel: "2 min 15 s" }),
    ],
  },
  {
    n: 3,
    title: "Chaos Engineering and Resilience Testing",
    lessons: [
      L(9, "what-chaos-engineering-actually-tests-for", "What Chaos Engineering Actually Tests For", { contentDir: "ch03/09-what-chaos-engineering-actually-tests-for", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-advanced-sre-disaster-recovery-resilience/what-chaos-engineering-actually-tests-for.mp4", durationLabel: "2 min 25 s" }),
      L(10, "running-a-real-chaos-experiment-safely", "Running a Real Chaos Experiment Safely", { contentDir: "ch03/10-running-a-real-chaos-experiment-safely", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-advanced-sre-disaster-recovery-resilience/running-a-real-chaos-experiment-safely.mp4", durationLabel: "2 min 15 s" }),
      L(11, "game-days-rehearsing-a-disaster-before-it-happens", "Game Days: Rehearsing a Disaster Before It Happens", { contentDir: "ch03/11-game-days-rehearsing-a-disaster-before-it-happens", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-advanced-sre-disaster-recovery-resilience/game-days-rehearsing-a-disaster-before-it-happens.mp4", durationLabel: "2 min 19 s" }),
      L(12, "turning-chaos-findings-into-real-architecture-changes", "Turning Chaos Findings into Real Architecture Changes", { contentDir: "ch03/12-turning-chaos-findings-into-real-architecture-changes", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-advanced-sre-disaster-recovery-resilience/turning-chaos-findings-into-real-architecture-changes.mp4", durationLabel: "2 min 26 s" }),
    ],
  },
  {
    n: 4,
    title: "Advanced Disaster Recovery Architecture",
    lessons: [
      L(13, "dr-architecture-patterns-revisited-at-enterprise-complexity", "DR Architecture Patterns Revisited at Enterprise Complexity", { contentDir: "ch04/13-dr-architecture-patterns-revisited-at-enterprise-complexity", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-advanced-sre-disaster-recovery-resilience/dr-architecture-patterns-revisited-at-enterprise-complexity.mp4", durationLabel: "2 min 25 s" }),
      L(14, "dependency-mapping-so-you-know-whats-actually-in-the-blast-radius", "Dependency Mapping So You Know What's Actually in the Blast Radius", { contentDir: "ch04/14-dependency-mapping-so-you-know-whats-actually-in-the-blast-radius", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-advanced-sre-disaster-recovery-resilience/dependency-mapping-so-you-know-whats-actually-in-the-blast-radius.mp4", durationLabel: "2 min 26 s" }),
      L(15, "automating-failover-instead-of-relying-on-a-runbook-at-3am", "Automating Failover Instead of Relying on a Runbook at 3 A.M.", { contentDir: "ch04/15-automating-failover-instead-of-relying-on-a-runbook-at-3am", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-advanced-sre-disaster-recovery-resilience/automating-failover-instead-of-relying-on-a-runbook-at-3am.mp4", durationLabel: "2 min 20 s" }),
      L(16, "testing-dr-at-the-scale-of-a-real-production-environment", "Testing DR at the Scale of a Real Production Environment", { contentDir: "ch04/16-testing-dr-at-the-scale-of-a-real-production-environment", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-advanced-sre-disaster-recovery-resilience/testing-dr-at-the-scale-of-a-real-production-environment.mp4", durationLabel: "2 min 34 s" }),
    ],
  },
  {
    n: 5,
    title: "Capacity Planning and Performance Engineering",
    lessons: [
      L(17, "forecasting-capacity-needs-from-real-growth-trends", "Forecasting Capacity Needs from Real Growth Trends", { contentDir: "ch05/17-forecasting-capacity-needs-from-real-growth-trends", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-advanced-sre-disaster-recovery-resilience/forecasting-capacity-needs-from-real-growth-trends.mp4", durationLabel: "2 min 31 s" }),
      L(18, "load-testing-that-actually-predicts-production-behavior", "Load Testing That Actually Predicts Production Behavior", { contentDir: "ch05/18-load-testing-that-actually-predicts-production-behavior", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-advanced-sre-disaster-recovery-resilience/load-testing-that-actually-predicts-production-behavior.mp4", durationLabel: "2 min 42 s" }),
      L(19, "performance-engineering-as-a-discipline-not-an-afterthought", "Performance Engineering as a Discipline, Not an Afterthought", { contentDir: "ch05/19-performance-engineering-as-a-discipline-not-an-afterthought", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-advanced-sre-disaster-recovery-resilience/performance-engineering-as-a-discipline-not-an-afterthought.mp4", durationLabel: "2 min 7 s" }),
      L(20, "capacity-planning-for-a-traffic-spike-you-can-see-coming", "Capacity Planning for a Traffic Spike You Can See Coming", { contentDir: "ch05/20-capacity-planning-for-a-traffic-spike-you-can-see-coming", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-advanced-sre-disaster-recovery-resilience/capacity-planning-for-a-traffic-spike-you-can-see-coming.mp4", durationLabel: "2 min 42 s" }),
    ],
  },
  {
    n: 6,
    title: "On-Call and Operational Excellence",
    lessons: [
      L(21, "designing-an-on-call-rotation-that-doesnt-burn-people-out", "Designing an On-Call Rotation That Doesn't Burn People Out", { contentDir: "ch06/21-designing-an-on-call-rotation-that-doesnt-burn-people-out", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-advanced-sre-disaster-recovery-resilience/designing-an-on-call-rotation-that-doesnt-burn-people-out.mp4", durationLabel: "2 min 22 s" }),
      L(22, "runbooks-that-actually-get-used-at-3am", "Runbooks That Actually Get Used at 3 A.M.", { contentDir: "ch06/22-runbooks-that-actually-get-used-at-3am", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-advanced-sre-disaster-recovery-resilience/runbooks-that-actually-get-used-at-3am.mp4", durationLabel: "2 min 32 s" }),
      L(23, "operational-readiness-reviews-before-a-service-goes-to-production", "Operational Readiness Reviews Before a Service Goes to Production", { contentDir: "ch06/23-operational-readiness-reviews-before-a-service-goes-to-production", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-advanced-sre-disaster-recovery-resilience/operational-readiness-reviews-before-a-service-goes-to-production.mp4", durationLabel: "2 min 37 s" }),
      L(24, "measuring-operational-excellence-beyond-uptime", "Measuring Operational Excellence Beyond Uptime", { contentDir: "ch06/24-measuring-operational-excellence-beyond-uptime", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-advanced-sre-disaster-recovery-resilience/measuring-operational-excellence-beyond-uptime.mp4", durationLabel: "2 min 37 s" }),
    ],
  },
  {
    n: 7,
    title: "Building an SRE Practice and Culture",
    lessons: [
      L(25, "introducing-sre-into-an-organization-that-doesnt-have-it-yet", "Introducing SRE into an Organization That Doesn't Have It Yet", { contentDir: "ch07/25-introducing-sre-into-an-organization-that-doesnt-have-it-yet", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-advanced-sre-disaster-recovery-resilience/introducing-sre-into-an-organization-that-doesnt-have-it-yet.mp4", durationLabel: "2 min 43 s" }),
      L(26, "the-real-tension-between-reliability-and-feature-velocity", "The Real Tension Between Reliability and Feature Velocity", { contentDir: "ch07/26-the-real-tension-between-reliability-and-feature-velocity", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-advanced-sre-disaster-recovery-resilience/the-real-tension-between-reliability-and-feature-velocity.mp4", durationLabel: "2 min 51 s" }),
      L(27, "blameless-culture-in-practice-not-just-in-the-postmortem-template", "Blameless Culture in Practice, Not Just in the Postmortem Template", { contentDir: "ch07/27-blameless-culture-in-practice-not-just-in-the-postmortem-template", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-advanced-sre-disaster-recovery-resilience/blameless-culture-in-practice-not-just-in-the-postmortem-template.mp4", durationLabel: "2 min 49 s" }),
      L(28, "scaling-an-sre-team-as-the-organization-grows", "Scaling an SRE Team as the Organization Grows", { contentDir: "ch07/28-scaling-an-sre-team-as-the-organization-grows", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-advanced-sre-disaster-recovery-resilience/scaling-an-sre-team-as-the-organization-grows.mp4", durationLabel: "2 min 55 s" }),
    ],
  },
  {
    n: 8,
    title: "Capstone: Building a Resilient Enterprise System",
    lessons: [
      L(29, "lab-designing-and-testing-a-disaster-recovery-plan", "Lab: Designing and Testing a Disaster Recovery Plan", { contentDir: "ch08/29-lab-designing-and-testing-a-disaster-recovery-plan", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-advanced-sre-disaster-recovery-resilience/lab-designing-and-testing-a-disaster-recovery-plan.mp4", durationLabel: "2 min 50 s" }),
      L(30, "lab-running-a-chaos-experiment-and-a-game-day", "Lab: Running a Chaos Experiment and a Game Day", { contentDir: "ch08/30-lab-running-a-chaos-experiment-and-a-game-day", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-advanced-sre-disaster-recovery-resilience/lab-running-a-chaos-experiment-and-a-game-day.mp4", durationLabel: "2 min 31 s" }),
      L(31, "case-study-a-resilient-architecture-that-still-had-a-single-point-of-failure", "Case Study: A Resilient Architecture That Still Had a Single Point of Failure", { contentDir: "ch08/31-case-study-a-resilient-architecture-that-still-had-a-single-point-of-failure", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-advanced-sre-disaster-recovery-resilience/case-study-a-resilient-architecture-that-still-had-a-single-point-of-failure.mp4", durationLabel: "2 min 37 s" }),
      L(32, "chapter-capstone-the-whole-path-from-cloud-support-to-cloud-architect", "Chapter Capstone: The Whole Path, from Cloud Support to Cloud Architect", { contentDir: "ch08/32-chapter-capstone-the-whole-path-from-cloud-support-to-cloud-architect" }),
    ],
  },
];
