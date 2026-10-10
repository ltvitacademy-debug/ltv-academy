// The Data Security, Privacy & Classification course outline — FRAMEWORK ONLY (chapter and lesson
// titles, no lesson content yet). Lessons without a contentDir render as
// "in production". Part of the Data Governance career path.

export type LessonMeta = {
  n: number;
  slug: string;
  title: string;
  contentDir?: string; // under content/data-security-privacy-and-classification/
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

export const GOV_DATA_SECURITY_PRIVACY_AND_CLASSIFICATION_CHAPTERS: ChapterMeta[] = [
  {
    n: 1,
    title: "Sensitive Data Foundations",
    lessons: [
      L(1, "data-security-and-privacy-concepts", "Data Security and Privacy Concepts", { contentDir: "ch01/01-data-security-and-privacy-concepts" }),
      L(2, "pii-and-personal-data", "PII and Personal Data", { contentDir: "ch01/02-pii-and-personal-data" }),
      L(3, "sensitive-and-confidential-data", "Sensitive and Confidential Data", { contentDir: "ch01/03-sensitive-and-confidential-data" }),
      L(4, "regulations-gdpr-ccpa-and-hipaa-overview", "Regulations: GDPR, CCPA and HIPAA Overview", { contentDir: "ch01/04-regulations-gdpr-ccpa-and-hipaa-overview" }),
      L(5, "regulations-sox-and-industry-rules", "Regulations: SOX and Industry Rules", { contentDir: "ch01/05-regulations-sox-and-industry-rules" }),
      L(6, "privacy-by-design", "Privacy by Design", { contentDir: "ch01/06-privacy-by-design" }),
    ],
  },
  {
    n: 2,
    title: "Classification",
    lessons: [
      L(7, "data-classification-concepts", "Data Classification Concepts", { contentDir: "ch02/07-data-classification-concepts" }),
      L(8, "classification-schemes-and-labels", "Classification Schemes and Labels", { contentDir: "ch02/08-classification-schemes-and-labels" }),
      L(9, "discovering-sensitive-data", "Discovering Sensitive Data", { contentDir: "ch02/09-discovering-sensitive-data" }),
      L(10, "applying-classifications", "Applying Classifications", { contentDir: "ch02/10-applying-classifications" }),
      L(11, "classification-governance", "Classification Governance", { contentDir: "ch02/11-classification-governance" }),
    ],
  },
  {
    n: 3,
    title: "Access Control",
    lessons: [
      L(12, "access-governance", "Access Governance", { contentDir: "ch03/12-access-governance" }),
      L(13, "role-based-access-control", "Role-Based Access Control", { contentDir: "ch03/13-role-based-access-control" }),
      L(14, "least-privilege", "Least Privilege", { contentDir: "ch03/14-least-privilege" }),
      L(15, "segregation-of-duties", "Segregation of Duties", { contentDir: "ch03/15-segregation-of-duties" }),
      L(16, "access-reviews-and-certification", "Access Reviews and Certification", { contentDir: "ch03/16-access-reviews-and-certification" }),
      L(17, "privileged-access", "Privileged Access", { contentDir: "ch03/17-privileged-access" }),
    ],
  },
  {
    n: 4,
    title: "Protecting Data",
    lessons: [
      L(18, "data-masking", "Data Masking", { contentDir: "ch04/18-data-masking" }),
      L(19, "tokenization-and-pseudonymization", "Tokenization and Pseudonymization", { contentDir: "ch04/19-tokenization-and-pseudonymization" }),
      L(20, "encryption", "Encryption", { contentDir: "ch04/20-encryption" }),
      L(21, "key-management-concepts", "Key Management Concepts", { contentDir: "ch04/21-key-management-concepts" }),
      L(22, "row-and-column-security-concepts", "Row and Column Security Concepts", { contentDir: "ch04/22-row-and-column-security-concepts" }),
    ],
  },
  {
    n: 5,
    title: "Lifecycle and Compliance",
    lessons: [
      L(23, "data-retention", "Data Retention", { contentDir: "ch05/23-data-retention" }),
      L(24, "data-deletion-and-the-right-to-erasure", "Data Deletion and the Right to Erasure", { contentDir: "ch05/24-data-deletion-and-the-right-to-erasure" }),
      L(25, "data-subject-requests", "Data Subject Requests", { contentDir: "ch05/25-data-subject-requests" }),
      L(26, "auditing-and-logging", "Auditing and Logging", { contentDir: "ch05/26-auditing-and-logging" }),
      L(27, "breach-response-concepts", "Breach Response Concepts", { contentDir: "ch05/27-breach-response-concepts" }),
    ],
  },
  {
    n: 6,
    title: "Applied Security and Privacy",
    lessons: [
      L(28, "security-and-privacy-case-study-customer-data", "Security and Privacy Case Study: Customer Data", { contentDir: "ch06/28-security-and-privacy-case-study-customer-data" }),
      L(29, "designing-an-access-governance-model", "Designing an Access Governance Model", { contentDir: "ch06/29-designing-an-access-governance-model" }),
      L(30, "privacy-impact-assessments", "Privacy Impact Assessments", { contentDir: "ch06/30-privacy-impact-assessments" }),
    ],
  },
];
