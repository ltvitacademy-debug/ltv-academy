// Capstone tier outline for cybersecurity-capstone-beginner. Only lessons with a contentDir +
// videoUrl are playable; everything else renders as "in production".

export type LessonMeta = {
  n: number;
  slug: string;
  title: string;
  contentDir?: string; // under content/cybersecurity-capstone-beginner/
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

export const CYBERSECURITY_CAPSTONE_BEGINNER_CHAPTERS: ChapterMeta[] = [
  {
    n: 1,
    title: "Beginner Capstone: Baseline Security Hardening and the First Detection Rule",
    lessons: [
      L(1, "the-business-ask", "The Business Ask: One Manager, One Worry", { contentDir: "ch01/01-the-business-ask", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-cybersecurity-capstone-beginner/the-business-ask.mp4", durationLabel: "2 min 0 s" }),
      L(2, "scoping-the-hardening-checklist", "Scoping a Baseline Hardening Checklist", { contentDir: "ch01/02-scoping-the-hardening-checklist", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-cybersecurity-capstone-beginner/scoping-the-hardening-checklist.mp4", durationLabel: "2 min 21 s" }),
      L(3, "hardening-the-windows-servers", "Hardening the Windows Servers", { contentDir: "ch01/03-hardening-the-windows-servers", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-cybersecurity-capstone-beginner/hardening-the-windows-servers.mp4", durationLabel: "1 min 53 s" }),
      L(4, "hardening-the-linux-servers", "Hardening the Linux Servers", { contentDir: "ch01/04-hardening-the-linux-servers", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-cybersecurity-capstone-beginner/hardening-the-linux-servers.mp4", durationLabel: "2 min 7 s" }),
      L(5, "writing-the-first-sentinel-rule", "Writing the First Sentinel Analytics Rule", { contentDir: "ch01/05-writing-the-first-sentinel-rule", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-cybersecurity-capstone-beginner/writing-the-first-sentinel-rule.mp4", durationLabel: "1 min 59 s" }),
      L(6, "testing-the-rule-against-sample-signin-data", "Testing the Rule Against Sample Sign-In Data", { contentDir: "ch01/06-testing-the-rule-against-sample-signin-data", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-cybersecurity-capstone-beginner/testing-the-rule-against-sample-signin-data.mp4", durationLabel: "1 min 44 s" }),
      L(7, "documenting-the-baseline", "Documenting the Baseline for the Team", { contentDir: "ch01/07-documenting-the-baseline", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-cybersecurity-capstone-beginner/documenting-the-baseline.mp4", durationLabel: "1 min 47 s" }),
      L(8, "presenting-the-findings", "Presenting the Findings to the IT Manager", { contentDir: "ch01/08-presenting-the-findings", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-cybersecurity-capstone-beginner/presenting-the-findings.mp4", durationLabel: "1 min 55 s" }),
      L(9, "handling-the-pushback-question", "Handling the One Pushback Question", { contentDir: "ch01/09-handling-the-pushback-question", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-cybersecurity-capstone-beginner/handling-the-pushback-question.mp4", durationLabel: "1 min 55 s" }),
      L(10, "wrap-up-and-whats-next", "Wrap-Up: What You Hardened, and What's Next", { contentDir: "ch01/10-wrap-up-and-whats-next", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-cybersecurity-capstone-beginner/wrap-up-and-whats-next.mp4", durationLabel: "2 min 0 s" }),
    ],
  },
];
