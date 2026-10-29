// Ethical Hacking, Penetration Testing & Purple Team Operations course outline. Lessons without
// a contentDir render as "in production". Course 13 of the Cybersecurity Analyst → Security
// Engineer path — the second of four Expert Specialization courses (any order), building on the
// whole path's networking, SOC, cloud security, and forensics foundation.

export type LessonMeta = {
  n: number;
  slug: string;
  title: string;
  contentDir?: string; // under content/ethical-hacking-penetration-testing-purple-team/
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

export const ETHICAL_HACKING_PENETRATION_TESTING_PURPLE_TEAM_CHAPTERS: ChapterMeta[] = [
  {
    n: 1,
    title: "Ethical Hacking Fundamentals and Methodology",
    lessons: [
      L(1, "rules-of-engagement-and-why-authorization-comes-before-anything-else", "Rules of Engagement, and Why Authorization Comes Before Anything Else", { contentDir: "ch01/01-rules-of-engagement-and-why-authorization-comes-before-anything-else", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-ethical-hacking-penetration-testing-purple-team/rules-of-engagement-and-why-authorization-comes-before-anything-else.mp4", durationLabel: "2 min 36 s" }),
      L(2, "scoping-a-penetration-test-so-everyone-agrees-on-the-boundaries", "Scoping a Penetration Test So Everyone Agrees on the Boundaries", { contentDir: "ch01/02-scoping-a-penetration-test-so-everyone-agrees-on-the-boundaries", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-ethical-hacking-penetration-testing-purple-team/scoping-a-penetration-test-so-everyone-agrees-on-the-boundaries.mp4", durationLabel: "2 min 21 s" }),
      L(3, "the-real-pentest-methodology-ptes-and-owasp-testing-guide", "The Real Pentest Methodology: PTES and the OWASP Testing Guide", { contentDir: "ch01/03-the-real-pentest-methodology-ptes-and-owasp-testing-guide", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-ethical-hacking-penetration-testing-purple-team/the-real-pentest-methodology-ptes-and-owasp-testing-guide.mp4", durationLabel: "2 min 47 s" }),
      L(4, "white-box-gray-box-and-black-box-testing-the-real-tradeoffs", "White-Box, Gray-Box, and Black-Box Testing: The Real Tradeoffs", { contentDir: "ch01/04-white-box-gray-box-and-black-box-testing-the-real-tradeoffs", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-ethical-hacking-penetration-testing-purple-team/white-box-gray-box-and-black-box-testing-the-real-tradeoffs.mp4", durationLabel: "2 min 17 s" }),
    ],
  },
  {
    n: 2,
    title: "Reconnaissance and OSINT",
    lessons: [
      L(5, "passive-reconnaissance-what-you-can-learn-without-touching-the-target", "Passive Reconnaissance: What You Can Learn Without Touching the Target", { contentDir: "ch02/05-passive-reconnaissance-what-you-can-learn-without-touching-the-target", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-ethical-hacking-penetration-testing-purple-team/passive-reconnaissance-what-you-can-learn-without-touching-the-target.mp4", durationLabel: "2 min 48 s" }),
      L(6, "osint-techniques-for-a-real-engagement", "OSINT Techniques for a Real Engagement", { contentDir: "ch02/06-osint-techniques-for-a-real-engagement", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-ethical-hacking-penetration-testing-purple-team/osint-techniques-for-a-real-engagement.mp4", durationLabel: "2 min 35 s" }),
      L(7, "active-reconnaissance-and-where-passive-recon-stops-being-enough", "Active Reconnaissance, and Where Passive Recon Stops Being Enough", { contentDir: "ch02/07-active-reconnaissance-and-where-passive-recon-stops-being-enough", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-ethical-hacking-penetration-testing-purple-team/active-reconnaissance-and-where-passive-recon-stops-being-enough.mp4", durationLabel: "2 min 21 s" }),
      L(8, "turning-recon-into-an-attack-surface-map", "Turning Recon into an Attack Surface Map", { contentDir: "ch02/08-turning-recon-into-an-attack-surface-map", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-ethical-hacking-penetration-testing-purple-team/turning-recon-into-an-attack-surface-map.mp4", durationLabel: "2 min 20 s" }),
    ],
  },
  {
    n: 3,
    title: "Scanning and Enumeration",
    lessons: [
      L(9, "network-scanning-fundamentals-with-nmap", "Network Scanning Fundamentals with Nmap", { contentDir: "ch03/09-network-scanning-fundamentals-with-nmap", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-ethical-hacking-penetration-testing-purple-team/network-scanning-fundamentals-with-nmap.mp4", durationLabel: "3 min 0 s" }),
      L(10, "service-and-version-enumeration-beyond-just-open-ports", "Service and Version Enumeration Beyond Just Open Ports", { contentDir: "ch03/10-service-and-version-enumeration-beyond-just-open-ports", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-ethical-hacking-penetration-testing-purple-team/service-and-version-enumeration-beyond-just-open-ports.mp4", durationLabel: "2 min 42 s" }),
      L(11, "vulnerability-scanning-and-why-a-scanner-isnt-a-pentest", "Vulnerability Scanning, and Why a Scanner Isn't a Pentest", { contentDir: "ch03/11-vulnerability-scanning-and-why-a-scanner-isnt-a-pentest", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-ethical-hacking-penetration-testing-purple-team/vulnerability-scanning-and-why-a-scanner-isnt-a-pentest.mp4", durationLabel: "2 min 33 s" }),
      L(12, "prioritizing-findings-before-you-ever-attempt-exploitation", "Prioritizing Findings Before You Ever Attempt Exploitation", { contentDir: "ch03/12-prioritizing-findings-before-you-ever-attempt-exploitation", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-ethical-hacking-penetration-testing-purple-team/prioritizing-findings-before-you-ever-attempt-exploitation.mp4", durationLabel: "2 min 40 s" }),
    ],
  },
  {
    n: 4,
    title: "Exploitation Fundamentals",
    lessons: [
      L(13, "how-a-real-exploit-actually-works-at-a-conceptual-level", "How a Real Exploit Actually Works, at a Conceptual Level", { contentDir: "ch04/13-how-a-real-exploit-actually-works-at-a-conceptual-level", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-ethical-hacking-penetration-testing-purple-team/how-a-real-exploit-actually-works-at-a-conceptual-level.mp4", durationLabel: "3 min 2 s" }),
      L(14, "using-a-known-exploit-safely-and-responsibly-in-a-test-environment", "Using a Known Exploit Safely and Responsibly in a Test Environment", { contentDir: "ch04/14-using-a-known-exploit-safely-and-responsibly-in-a-test-environment", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-ethical-hacking-penetration-testing-purple-team/using-a-known-exploit-safely-and-responsibly-in-a-test-environment.mp4", durationLabel: "2 min 54 s" }),
      L(15, "metasploit-framework-fundamentals", "Metasploit Framework Fundamentals", { contentDir: "ch04/15-metasploit-framework-fundamentals", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-ethical-hacking-penetration-testing-purple-team/metasploit-framework-fundamentals.mp4", durationLabel: "3 min 5 s" }),
      L(16, "when-not-to-exploit-risk-decisions-during-a-live-engagement", "When Not to Exploit: Risk Decisions During a Live Engagement", { contentDir: "ch04/16-when-not-to-exploit-risk-decisions-during-a-live-engagement", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-ethical-hacking-penetration-testing-purple-team/when-not-to-exploit-risk-decisions-during-a-live-engagement.mp4", durationLabel: "3 min 9 s" }),
    ],
  },
  {
    n: 5,
    title: "Web Application Penetration Testing",
    lessons: [
      L(17, "the-owasp-top-10-as-a-real-testing-checklist", "The OWASP Top 10 as a Real Testing Checklist", { contentDir: "ch05/17-the-owasp-top-10-as-a-real-testing-checklist", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-ethical-hacking-penetration-testing-purple-team/the-owasp-top-10-as-a-real-testing-checklist.mp4", durationLabel: "3 min 0 s" }),
      L(18, "sql-injection-and-cross-site-scripting-in-practice", "SQL Injection and Cross-Site Scripting in Practice", { contentDir: "ch05/18-sql-injection-and-cross-site-scripting-in-practice", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-ethical-hacking-penetration-testing-purple-team/sql-injection-and-cross-site-scripting-in-practice.mp4", durationLabel: "2 min 59 s" }),
      L(19, "authentication-and-session-management-flaws", "Authentication and Session Management Flaws", { contentDir: "ch05/19-authentication-and-session-management-flaws", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-ethical-hacking-penetration-testing-purple-team/authentication-and-session-management-flaws.mp4", durationLabel: "2 min 49 s" }),
      L(20, "api-security-testing-for-modern-applications", "API Security Testing for Modern Applications", { contentDir: "ch05/20-api-security-testing-for-modern-applications" }),
    ],
  },
  {
    n: 6,
    title: "Post-Exploitation and Privilege Escalation",
    lessons: [
      L(21, "post-exploitation-goals-what-happens-after-you-get-a-foothold", "Post-Exploitation Goals: What Happens After You Get a Foothold", { contentDir: "ch06/21-post-exploitation-goals-what-happens-after-you-get-a-foothold" }),
      L(22, "windows-and-linux-privilege-escalation-techniques", "Windows and Linux Privilege Escalation Techniques", { contentDir: "ch06/22-windows-and-linux-privilege-escalation-techniques" }),
      L(23, "lateral-movement-from-an-attackers-perspective", "Lateral Movement from an Attacker's Perspective", { contentDir: "ch06/23-lateral-movement-from-an-attackers-perspective" }),
      L(24, "maintaining-access-and-cleaning-up-after-an-authorized-test", "Maintaining Access, and Cleaning Up After an Authorized Test", { contentDir: "ch06/24-maintaining-access-and-cleaning-up-after-an-authorized-test" }),
    ],
  },
  {
    n: 7,
    title: "Purple Team Operations",
    lessons: [
      L(25, "red-team-vs-blue-team-vs-purple-team-what-actually-changes", "Red Team vs. Blue Team vs. Purple Team: What Actually Changes", { contentDir: "ch07/25-red-team-vs-blue-team-vs-purple-team-what-actually-changes" }),
      L(26, "running-a-collaborative-purple-team-exercise", "Running a Collaborative Purple Team Exercise", { contentDir: "ch07/26-running-a-collaborative-purple-team-exercise" }),
      L(27, "mapping-attacker-actions-to-mitre-attck-in-real-time", "Mapping Attacker Actions to MITRE ATT&CK in Real Time", { contentDir: "ch07/27-mapping-attacker-actions-to-mitre-attck-in-real-time" }),
      L(28, "turning-a-purple-team-exercise-into-better-detections", "Turning a Purple Team Exercise into Better Detections", { contentDir: "ch07/28-turning-a-purple-team-exercise-into-better-detections" }),
    ],
  },
  {
    n: 8,
    title: "Capstone: A Full Penetration Test Engagement",
    lessons: [
      L(29, "lab-a-full-recon-to-exploitation-engagement", "Lab: A Full Recon-to-Exploitation Engagement", { contentDir: "ch08/29-lab-a-full-recon-to-exploitation-engagement" }),
      L(30, "lab-writing-a-professional-penetration-test-report", "Lab: Writing a Professional Penetration Test Report", { contentDir: "ch08/30-lab-writing-a-professional-penetration-test-report" }),
      L(31, "case-study-a-finding-the-client-didnt-want-to-hear", "Case Study: A Finding the Client Didn't Want to Hear", { contentDir: "ch08/31-case-study-a-finding-the-client-didnt-want-to-hear" }),
      L(32, "chapter-capstone-ethical-hacking-and-purple-team-review", "Chapter Capstone: Ethical Hacking and Purple Team Review", { contentDir: "ch08/32-chapter-capstone-ethical-hacking-and-purple-team-review" }),
    ],
  },
];
