// Hybrid & Multi-Cloud Enterprise Architecture course outline. Lessons without a contentDir
// render as "in production". Course 13 of the Cloud Engineer → Cloud Architect path — the
// second of four Expert Specialization courses (any order), building on the whole path's
// Terraform/Kubernetes/enterprise architecture foundation.

export type LessonMeta = {
  n: number;
  slug: string;
  title: string;
  contentDir?: string; // under content/hybrid-multi-cloud-enterprise-architecture/
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

export const HYBRID_MULTI_CLOUD_ENTERPRISE_ARCHITECTURE_CHAPTERS: ChapterMeta[] = [
  {
    n: 1,
    title: "Hybrid Cloud Architecture Fundamentals",
    lessons: [
      L(1, "why-enterprises-end-up-hybrid-not-by-accident", "Why Enterprises End Up Hybrid, Not by Accident", { contentDir: "ch01/01-why-enterprises-end-up-hybrid-not-by-accident", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-hybrid-multi-cloud-enterprise-architecture/why-enterprises-end-up-hybrid-not-by-accident.mp4", durationLabel: "2 min 54 s" }),
      L(2, "on-prem-to-cloud-extension-patterns", "On-Prem-to-Cloud Extension Patterns", { contentDir: "ch01/02-on-prem-to-cloud-extension-patterns", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-hybrid-multi-cloud-enterprise-architecture/on-prem-to-cloud-extension-patterns.mp4", durationLabel: "2 min 50 s" }),
      L(3, "azure-arc-and-aws-outposts-real-hybrid-control-planes", "Azure Arc and AWS Outposts: Real Hybrid Control Planes", { contentDir: "ch01/03-azure-arc-and-aws-outposts-real-hybrid-control-planes", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-hybrid-multi-cloud-enterprise-architecture/azure-arc-and-aws-outposts-real-hybrid-control-planes.mp4", durationLabel: "3 min 8 s" }),
      L(4, "deciding-what-stays-on-prem-and-what-moves", "Deciding What Stays On-Prem and What Moves", { contentDir: "ch01/04-deciding-what-stays-on-prem-and-what-moves", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-hybrid-multi-cloud-enterprise-architecture/deciding-what-stays-on-prem-and-what-moves.mp4", durationLabel: "2 min 59 s" }),
    ],
  },
  {
    n: 2,
    title: "Multi-Cloud Strategy",
    lessons: [
      L(5, "why-companies-actually-go-multi-cloud-and-why-some-shouldnt", "Why Companies Actually Go Multi-Cloud, and Why Some Shouldn't", { contentDir: "ch02/05-why-companies-actually-go-multi-cloud-and-why-some-shouldnt", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-hybrid-multi-cloud-enterprise-architecture/why-companies-actually-go-multi-cloud-and-why-some-shouldnt.mp4", durationLabel: "2 min 41 s" }),
      L(6, "best-of-breed-vs-redundancy-driven-multi-cloud", "Best-of-Breed vs. Redundancy-Driven Multi-Cloud", { contentDir: "ch02/06-best-of-breed-vs-redundancy-driven-multi-cloud" }),
      L(7, "the-real-cost-of-multi-cloud-complexity", "The Real Cost of Multi-Cloud Complexity", { contentDir: "ch02/07-the-real-cost-of-multi-cloud-complexity" }),
      L(8, "avoiding-vendor-lock-in-without-over-engineering-for-it", "Avoiding Vendor Lock-In Without Over-Engineering for It", { contentDir: "ch02/08-avoiding-vendor-lock-in-without-over-engineering-for-it" }),
    ],
  },
  {
    n: 3,
    title: "Workload Portability Across Clouds",
    lessons: [
      L(9, "kubernetes-as-the-real-portability-layer", "Kubernetes as the Real Portability Layer", { contentDir: "ch03/09-kubernetes-as-the-real-portability-layer" }),
      L(10, "abstracting-cloud-specific-services-behind-a-common-interface", "Abstracting Cloud-Specific Services Behind a Common Interface", { contentDir: "ch03/10-abstracting-cloud-specific-services-behind-a-common-interface" }),
      L(11, "terraform-modules-that-target-more-than-one-cloud", "Terraform Modules That Target More Than One Cloud", { contentDir: "ch03/11-terraform-modules-that-target-more-than-one-cloud" }),
      L(12, "what-genuinely-doesnt-port-and-when-to-stop-trying", "What Genuinely Doesn't Port, and When to Stop Trying", { contentDir: "ch03/12-what-genuinely-doesnt-port-and-when-to-stop-trying" }),
    ],
  },
  {
    n: 4,
    title: "Hybrid Identity at Enterprise Scale",
    lessons: [
      L(13, "unifying-identity-across-on-prem-azure-and-aws", "Unifying Identity Across On-Prem, Azure, and AWS", { contentDir: "ch04/13-unifying-identity-across-on-prem-azure-and-aws" }),
      L(14, "federation-patterns-for-a-true-multi-cloud-org", "Federation Patterns for a True Multi-Cloud Org", { contentDir: "ch04/14-federation-patterns-for-a-true-multi-cloud-org" }),
      L(15, "a-single-conditional-access-policy-spanning-every-environment", "A Single Conditional Access Policy Spanning Every Environment", { contentDir: "ch04/15-a-single-conditional-access-policy-spanning-every-environment" }),
      L(16, "identity-as-the-glue-that-holds-a-hybrid-architecture-together", "Identity as the Glue That Holds a Hybrid Architecture Together", { contentDir: "ch04/16-identity-as-the-glue-that-holds-a-hybrid-architecture-together" }),
    ],
  },
  {
    n: 5,
    title: "Multi-Cloud Networking and Connectivity",
    lessons: [
      L(17, "connecting-azure-and-aws-networks-directly", "Connecting Azure and AWS Networks Directly", { contentDir: "ch05/17-connecting-azure-and-aws-networks-directly" }),
      L(18, "a-shared-dns-and-service-discovery-layer-across-clouds", "A Shared DNS and Service Discovery Layer Across Clouds", { contentDir: "ch05/18-a-shared-dns-and-service-discovery-layer-across-clouds" }),
      L(19, "latency-and-egress-cost-realities-of-cross-cloud-traffic", "Latency and Egress Cost Realities of Cross-Cloud Traffic", { contentDir: "ch05/19-latency-and-egress-cost-realities-of-cross-cloud-traffic" }),
      L(20, "designing-for-partial-failure-across-providers", "Designing for Partial Failure Across Providers", { contentDir: "ch05/20-designing-for-partial-failure-across-providers" }),
    ],
  },
  {
    n: 6,
    title: "Data Architecture Across Hybrid and Multi-Cloud",
    lessons: [
      L(21, "where-data-gravity-actually-decides-your-architecture", "Where Data Gravity Actually Decides Your Architecture", { contentDir: "ch06/21-where-data-gravity-actually-decides-your-architecture" }),
      L(22, "replicating-data-across-clouds-without-breaking-consistency", "Replicating Data Across Clouds Without Breaking Consistency", { contentDir: "ch06/22-replicating-data-across-clouds-without-breaking-consistency" }),
      L(23, "data-residency-and-sovereignty-requirements-in-practice", "Data Residency and Sovereignty Requirements in Practice", { contentDir: "ch06/23-data-residency-and-sovereignty-requirements-in-practice" }),
      L(24, "a-single-data-platform-serving-multiple-clouds", "A Single Data Platform Serving Multiple Clouds", { contentDir: "ch06/24-a-single-data-platform-serving-multiple-clouds" }),
    ],
  },
  {
    n: 7,
    title: "Multi-Cloud Cost and Governance",
    lessons: [
      L(25, "a-unified-cost-view-across-azure-aws-and-on-prem", "A Unified Cost View Across Azure, AWS, and On-Prem", { contentDir: "ch07/25-a-unified-cost-view-across-azure-aws-and-on-prem" }),
      L(26, "governance-policy-that-works-the-same-way-everywhere", "Governance Policy That Works the Same Way Everywhere", { contentDir: "ch07/26-governance-policy-that-works-the-same-way-everywhere" }),
      L(27, "a-cloud-brokerage-layer-and-what-it-actually-adds", "A Cloud Brokerage Layer, and What It Actually Adds", { contentDir: "ch07/27-a-cloud-brokerage-layer-and-what-it-actually-adds" }),
      L(28, "deciding-which-cloud-a-new-workload-should-land-on", "Deciding Which Cloud a New Workload Should Land On", { contentDir: "ch07/28-deciding-which-cloud-a-new-workload-should-land-on" }),
    ],
  },
  {
    n: 8,
    title: "Capstone: Designing a Hybrid/Multi-Cloud Architecture",
    lessons: [
      L(29, "lab-designing-a-hybrid-architecture-for-a-regulated-workload", "Lab: Designing a Hybrid Architecture for a Regulated Workload", { contentDir: "ch08/29-lab-designing-a-hybrid-architecture-for-a-regulated-workload" }),
      L(30, "lab-a-portable-workload-deployed-identically-to-two-clouds", "Lab: A Portable Workload Deployed Identically to Two Clouds", { contentDir: "ch08/30-lab-a-portable-workload-deployed-identically-to-two-clouds" }),
      L(31, "case-study-a-multi-cloud-strategy-that-cost-more-than-it-saved", "Case Study: A Multi-Cloud Strategy That Cost More Than It Saved", { contentDir: "ch08/31-case-study-a-multi-cloud-strategy-that-cost-more-than-it-saved" }),
      L(32, "chapter-capstone-hybrid-and-multi-cloud-architecture-review", "Chapter Capstone: Hybrid and Multi-Cloud Architecture Review", { contentDir: "ch08/32-chapter-capstone-hybrid-and-multi-cloud-architecture-review" }),
    ],
  },
];
