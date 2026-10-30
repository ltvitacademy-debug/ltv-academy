// Capstone tier outline for cloud-engineer-capstone-intermediate. Only lessons with a contentDir +
// videoUrl are playable; everything else renders as "in production".

export type LessonMeta = {
  n: number;
  slug: string;
  title: string;
  contentDir?: string; // under content/cloud-engineer-capstone-intermediate/
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

export const CLOUD_ENGINEER_CAPSTONE_INTERMEDIATE_CHAPTERS: ChapterMeta[] = [
  {
    n: 1,
    title: "Intermediate Capstone: Containers, CI/CD, and a Real Misconfiguration",
    lessons: [
      L(1, "the-ask-grows", "The Ask Grows: Containers and a Second Cloud", { contentDir: "ch01/01-the-ask-grows", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-cloud-engineer-capstone-intermediate/the-ask-grows.mp4", durationLabel: "1 min 21 s" }),
      L(2, "reconciling-stakeholder-priorities", "Reconciling Stakeholder Priorities", { contentDir: "ch01/02-reconciling-stakeholder-priorities", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-cloud-engineer-capstone-intermediate/reconciling-stakeholder-priorities.mp4", durationLabel: "1 min 25 s" }),
      L(3, "containerizing-the-application", "Containerizing the Application", { contentDir: "ch01/03-containerizing-the-application", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-cloud-engineer-capstone-intermediate/containerizing-the-application.mp4", durationLabel: "1 min 21 s" }),
      L(4, "writing-the-terraform-modules", "Writing the Terraform Modules", { contentDir: "ch01/04-writing-the-terraform-modules", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-cloud-engineer-capstone-intermediate/writing-the-terraform-modules.mp4", durationLabel: "1 min 29 s" }),
      L(5, "building-the-cicd-pipeline", "Building the CI/CD Pipeline", { contentDir: "ch01/05-building-the-cicd-pipeline", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-cloud-engineer-capstone-intermediate/building-the-cicd-pipeline.mp4", durationLabel: "1 min 25 s" }),
      L(6, "adding-aws-as-a-backup-target", "Adding AWS as a Backup Target", { contentDir: "ch01/06-adding-aws-as-a-backup-target", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-cloud-engineer-capstone-intermediate/adding-aws-as-a-backup-target.mp4", durationLabel: "1 min 23 s" }),
      L(7, "configuring-cross-cloud-replication", "Configuring Cross-Cloud Replication", { contentDir: "ch01/07-configuring-cross-cloud-replication", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-cloud-engineer-capstone-intermediate/configuring-cross-cloud-replication.mp4", durationLabel: "1 min 14 s" }),
      L(8, "the-first-deploy-to-production", "The First Deploy to Production", { contentDir: "ch01/08-the-first-deploy-to-production", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-cloud-engineer-capstone-intermediate/the-first-deploy-to-production.mp4", durationLabel: "1 min 28 s" }),
      L(9, "a-cost-anomaly-appears", "A Cost Anomaly Appears", { contentDir: "ch01/09-a-cost-anomaly-appears", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-cloud-engineer-capstone-intermediate/a-cost-anomaly-appears.mp4", durationLabel: "1 min 0 s" }),
      L(10, "tracing-the-anomaly", "Tracing the Anomaly to a Scaling Misconfiguration", { contentDir: "ch01/10-tracing-the-anomaly", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-cloud-engineer-capstone-intermediate/tracing-the-anomaly.mp4", durationLabel: "1 min 26 s" }),
      L(11, "finding-the-open-storage-bucket", "Finding an Open Storage Bucket Nobody Flagged", { contentDir: "ch01/11-finding-the-open-storage-bucket", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-cloud-engineer-capstone-intermediate/finding-the-open-storage-bucket.mp4", durationLabel: "1 min 12 s" }),
      L(12, "fixing-and-validating-both-issues", "Fixing and Validating Both Issues", { contentDir: "ch01/12-fixing-and-validating-both-issues", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-cloud-engineer-capstone-intermediate/fixing-and-validating-both-issues.mp4", durationLabel: "1 min 20 s" }),
      L(13, "updating-the-cicd-pipeline-with-a-guardrail", "Updating the CI/CD Pipeline with a Guardrail", { contentDir: "ch01/13-updating-the-cicd-pipeline-with-a-guardrail", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-cloud-engineer-capstone-intermediate/updating-the-cicd-pipeline-with-a-guardrail.mp4", durationLabel: "1 min 9 s" }),
      L(14, "documenting-the-expanded-platform", "Documenting the Expanded Platform", { contentDir: "ch01/14-documenting-the-expanded-platform", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-cloud-engineer-capstone-intermediate/documenting-the-expanded-platform.mp4", durationLabel: "1 min 6 s" }),
      L(15, "presenting-to-both-stakeholders", "Presenting to Both Stakeholders", { contentDir: "ch01/15-presenting-to-both-stakeholders", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-cloud-engineer-capstone-intermediate/presenting-to-both-stakeholders.mp4", durationLabel: "56 s" }),
      L(16, "wrap-up-and-whats-next", "Wrap-Up: What Changed, and What's Next", { contentDir: "ch01/16-wrap-up-and-whats-next", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-cloud-engineer-capstone-intermediate/wrap-up-and-whats-next.mp4", durationLabel: "1 min 3 s" }),
    ],
  },
];
