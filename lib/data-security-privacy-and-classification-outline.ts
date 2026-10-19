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
      L(1, "data-security-and-privacy-concepts", "Data Security and Privacy Concepts", { contentDir: "ch01/01-data-security-and-privacy-concepts", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792407835/ltv-data-security-privacy-and-classification/data-security-and-privacy-concepts.mp4", durationLabel: "2 min 16 s" }),
      L(2, "pii-and-personal-data", "PII and Personal Data", { contentDir: "ch01/02-pii-and-personal-data", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792408021/ltv-data-security-privacy-and-classification/pii-and-personal-data.mp4", durationLabel: "2 min 18 s" }),
      L(3, "sensitive-and-confidential-data", "Sensitive and Confidential Data", { contentDir: "ch01/03-sensitive-and-confidential-data", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792408254/ltv-data-security-privacy-and-classification/sensitive-and-confidential-data.mp4", durationLabel: "1 min 57 s" }),
      L(4, "regulations-gdpr-ccpa-and-hipaa-overview", "Regulations: GDPR, CCPA and HIPAA Overview", { contentDir: "ch01/04-regulations-gdpr-ccpa-and-hipaa-overview", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792408539/ltv-data-security-privacy-and-classification/regulations-gdpr-ccpa-and-hipaa-overview.mp4", durationLabel: "2 min 30 s" }),
      L(5, "regulations-sox-and-industry-rules", "Regulations: SOX and Industry Rules", { contentDir: "ch01/05-regulations-sox-and-industry-rules", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792408778/ltv-data-security-privacy-and-classification/regulations-sox-and-industry-rules.mp4", durationLabel: "1 min 59 s" }),
      L(6, "privacy-by-design", "Privacy by Design", { contentDir: "ch01/06-privacy-by-design", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792409033/ltv-data-security-privacy-and-classification/privacy-by-design.mp4", durationLabel: "2 min 1 s" }),
    ],
  },
  {
    n: 2,
    title: "Classification",
    lessons: [
      L(7, "data-classification-concepts", "Data Classification Concepts", { contentDir: "ch02/07-data-classification-concepts", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792409267/ltv-data-security-privacy-and-classification/data-classification-concepts.mp4", durationLabel: "1 min 58 s" }),
      L(8, "classification-schemes-and-labels", "Classification Schemes and Labels", { contentDir: "ch02/08-classification-schemes-and-labels", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792409507/ltv-data-security-privacy-and-classification/classification-schemes-and-labels.mp4", durationLabel: "1 min 57 s" }),
      L(9, "discovering-sensitive-data", "Discovering Sensitive Data", { contentDir: "ch02/09-discovering-sensitive-data", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792409788/ltv-data-security-privacy-and-classification/discovering-sensitive-data.mp4", durationLabel: "2 min 5 s" }),
      L(10, "applying-classifications", "Applying Classifications", { contentDir: "ch02/10-applying-classifications", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792410031/ltv-data-security-privacy-and-classification/applying-classifications.mp4", durationLabel: "2 min 13 s" }),
      L(11, "classification-governance", "Classification Governance", { contentDir: "ch02/11-classification-governance", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792410309/ltv-data-security-privacy-and-classification/classification-governance.mp4", durationLabel: "2 min 8 s" }),
    ],
  },
  {
    n: 3,
    title: "Access Control",
    lessons: [
      L(12, "access-governance", "Access Governance", { contentDir: "ch03/12-access-governance", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792410604/ltv-data-security-privacy-and-classification/access-governance.mp4", durationLabel: "2 min 11 s" }),
      L(13, "role-based-access-control", "Role-Based Access Control", { contentDir: "ch03/13-role-based-access-control", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792410846/ltv-data-security-privacy-and-classification/role-based-access-control.mp4", durationLabel: "1 min 53 s" }),
      L(14, "least-privilege", "Least Privilege", { contentDir: "ch03/14-least-privilege", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792411139/ltv-data-security-privacy-and-classification/least-privilege.mp4", durationLabel: "1 min 55 s" }),
      L(15, "segregation-of-duties", "Segregation of Duties", { contentDir: "ch03/15-segregation-of-duties", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792411516/ltv-data-security-privacy-and-classification/segregation-of-duties.mp4", durationLabel: "2 min 4 s" }),
      L(16, "access-reviews-and-certification", "Access Reviews and Certification", { contentDir: "ch03/16-access-reviews-and-certification", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792411776/ltv-data-security-privacy-and-classification/access-reviews-and-certification.mp4", durationLabel: "1 min 54 s" }),
      L(17, "privileged-access", "Privileged Access", { contentDir: "ch03/17-privileged-access", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792412065/ltv-data-security-privacy-and-classification/privileged-access.mp4", durationLabel: "1 min 58 s" }),
    ],
  },
  {
    n: 4,
    title: "Protecting Data",
    lessons: [
      L(18, "data-masking", "Data Masking", { contentDir: "ch04/18-data-masking", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792412317/ltv-data-security-privacy-and-classification/data-masking.mp4", durationLabel: "2 min 14 s" }),
      L(19, "tokenization-and-pseudonymization", "Tokenization and Pseudonymization", { contentDir: "ch04/19-tokenization-and-pseudonymization", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792412581/ltv-data-security-privacy-and-classification/tokenization-and-pseudonymization.mp4", durationLabel: "2 min 17 s" }),
      L(20, "encryption", "Encryption", { contentDir: "ch04/20-encryption", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792412853/ltv-data-security-privacy-and-classification/encryption.mp4", durationLabel: "2 min 15 s" }),
      L(21, "key-management-concepts", "Key Management Concepts", { contentDir: "ch04/21-key-management-concepts", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792413116/ltv-data-security-privacy-and-classification/key-management-concepts.mp4", durationLabel: "2 min 17 s" }),
      L(22, "row-and-column-security-concepts", "Row and Column Security Concepts", { contentDir: "ch04/22-row-and-column-security-concepts", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792413370/ltv-data-security-privacy-and-classification/row-and-column-security-concepts.mp4", durationLabel: "2 min 5 s" }),
    ],
  },
  {
    n: 5,
    title: "Lifecycle and Compliance",
    lessons: [
      L(23, "data-retention", "Data Retention", { contentDir: "ch05/23-data-retention", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792413624/ltv-data-security-privacy-and-classification/data-retention.mp4", durationLabel: "2 min 5 s" }),
      L(24, "data-deletion-and-the-right-to-erasure", "Data Deletion and the Right to Erasure", { contentDir: "ch05/24-data-deletion-and-the-right-to-erasure", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792413876/ltv-data-security-privacy-and-classification/data-deletion-and-the-right-to-erasure.mp4", durationLabel: "2 min 5 s" }),
      L(25, "data-subject-requests", "Data Subject Requests", { contentDir: "ch05/25-data-subject-requests", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792414131/ltv-data-security-privacy-and-classification/data-subject-requests.mp4", durationLabel: "2 min 8 s" }),
      L(26, "auditing-and-logging", "Auditing and Logging", { contentDir: "ch05/26-auditing-and-logging", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792414346/ltv-data-security-privacy-and-classification/auditing-and-logging.mp4", durationLabel: "1 min 57 s" }),
      L(27, "breach-response-concepts", "Breach Response Concepts", { contentDir: "ch05/27-breach-response-concepts", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792414615/ltv-data-security-privacy-and-classification/breach-response-concepts.mp4", durationLabel: "2 min 17 s" }),
    ],
  },
  {
    n: 6,
    title: "Applied Security and Privacy",
    lessons: [
      L(28, "security-and-privacy-case-study-customer-data", "Security and Privacy Case Study: Customer Data", { contentDir: "ch06/28-security-and-privacy-case-study-customer-data", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792414884/ltv-data-security-privacy-and-classification/security-and-privacy-case-study-customer-data.mp4", durationLabel: "2 min 6 s" }),
      L(29, "designing-an-access-governance-model", "Designing an Access Governance Model", { contentDir: "ch06/29-designing-an-access-governance-model", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792415156/ltv-data-security-privacy-and-classification/designing-an-access-governance-model.mp4", durationLabel: "2 min 12 s" }),
      L(30, "privacy-impact-assessments", "Privacy Impact Assessments", { contentDir: "ch06/30-privacy-impact-assessments", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792415588/ltv-data-security-privacy-and-classification/privacy-impact-assessments.mp4", durationLabel: "2 min 25 s" }),
    ],
  },
];
