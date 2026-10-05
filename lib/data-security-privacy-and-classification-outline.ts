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
      L(10, "applying-classifications", "Applying Classifications"),
      L(11, "classification-governance", "Classification Governance"),
    ],
  },
  {
    n: 3,
    title: "Access Control",
    lessons: [
      L(12, "access-governance", "Access Governance"),
      L(13, "role-based-access-control", "Role-Based Access Control"),
      L(14, "least-privilege", "Least Privilege"),
      L(15, "segregation-of-duties", "Segregation of Duties"),
      L(16, "access-reviews-and-certification", "Access Reviews and Certification"),
      L(17, "privileged-access", "Privileged Access"),
    ],
  },
  {
    n: 4,
    title: "Protecting Data",
    lessons: [
      L(18, "data-masking", "Data Masking"),
      L(19, "tokenization-and-pseudonymization", "Tokenization and Pseudonymization"),
      L(20, "encryption", "Encryption"),
      L(21, "key-management-concepts", "Key Management Concepts"),
      L(22, "row-and-column-security-concepts", "Row and Column Security Concepts"),
    ],
  },
  {
    n: 5,
    title: "Lifecycle and Compliance",
    lessons: [
      L(23, "data-retention", "Data Retention"),
      L(24, "data-deletion-and-the-right-to-erasure", "Data Deletion and the Right to Erasure"),
      L(25, "data-subject-requests", "Data Subject Requests"),
      L(26, "auditing-and-logging", "Auditing and Logging"),
      L(27, "breach-response-concepts", "Breach Response Concepts"),
    ],
  },
  {
    n: 6,
    title: "Applied Security and Privacy",
    lessons: [
      L(28, "security-and-privacy-case-study-customer-data", "Security and Privacy Case Study: Customer Data"),
      L(29, "designing-an-access-governance-model", "Designing an Access Governance Model"),
      L(30, "privacy-impact-assessments", "Privacy Impact Assessments"),
    ],
  },
];
