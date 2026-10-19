// Quantum Computing Research & Capstone course outline. Lessons without a contentDir render as
// "in production". Course 14 of 14, closing the Quantum Computing Software Engineer path: real
// research methods, reproducing a published result, and a full capstone plus career preparation.

export type LessonMeta = {
  n: number;
  slug: string;
  title: string;
  contentDir?: string; // under content/quantum-computing-research-and-capstone/
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

export const QUANTUM_COMPUTING_RESEARCH_AND_CAPSTONE_CHAPTERS: ChapterMeta[] = [
  {
    n: 1,
    title: "Research Methods & Experimental Design",
    lessons: [
      L(1, "how-quantum-computing-research-actually-gets-done", "How Quantum Computing Research Actually Gets Done", { contentDir: "ch01/01-how-quantum-computing-research-actually-gets-done", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792368438/ltv-quantum/quantum-computing-research-and-capstone-ch01-01-how-quantum-computing-research-actually-gets-done.mp4", durationLabel: "3:06" }),
      L(2, "reading-a-quantum-computing-paper", "Reading a Quantum Computing Paper", { contentDir: "ch01/02-reading-a-quantum-computing-paper", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792368545/ltv-quantum/quantum-computing-research-and-capstone-ch01-02-reading-a-quantum-computing-paper.mp4", durationLabel: "2:48" }),
      L(3, "forming-a-testable-hypothesis", "Forming a Testable Hypothesis", { contentDir: "ch01/03-forming-a-testable-hypothesis", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792368645/ltv-quantum/quantum-computing-research-and-capstone-ch01-03-forming-a-testable-hypothesis.mp4", durationLabel: "2:39" }),
      L(4, "experimental-design-controls-and-baselines", "Experimental Design: Controls & Baselines", { contentDir: "ch01/04-experimental-design-controls-and-baselines", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792368754/ltv-quantum/quantum-computing-research-and-capstone-ch01-04-experimental-design-controls-and-baselines.mp4", durationLabel: "2:41" }),
      L(5, "research-methods-lab", "Research Methods Lab", { contentDir: "ch01/05-research-methods-lab", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792368875/ltv-quantum/quantum-computing-research-and-capstone-ch01-05-research-methods-lab.mp4", durationLabel: "2:56" }),
    ],
  },
  {
    n: 2,
    title: "Reproducing Published Results",
    lessons: [
      L(6, "what-reproducibility-actually-requires", "What Reproducibility Actually Requires", { contentDir: "ch02/06-what-reproducibility-actually-requires", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792369104/ltv-quantum/quantum-computing-research-and-capstone-ch02-06-what-reproducibility-actually-requires.mp4", durationLabel: "2:52" }),
      L(7, "selecting-an-appropriate-paper-to-reproduce", "Selecting an Appropriate Paper to Reproduce", { contentDir: "ch02/07-selecting-an-appropriate-paper-to-reproduce", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792369217/ltv-quantum/quantum-computing-research-and-capstone-ch02-07-selecting-an-appropriate-paper-to-reproduce.mp4", durationLabel: "2:37" }),
      L(8, "extracting-a-reproducible-methodology-from-a-paper", "Extracting a Reproducible Methodology From a Paper", { contentDir: "ch02/08-extracting-a-reproducible-methodology-from-a-paper", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792369320/ltv-quantum/quantum-computing-research-and-capstone-ch02-08-extracting-a-reproducible-methodology-from-a-paper.mp4", durationLabel: "2:48" }),
      L(9, "handling-discrepancies-between-your-results-and-the-paper", "Handling Discrepancies Between Your Results & the Paper", { contentDir: "ch02/09-handling-discrepancies-between-your-results-and-the-paper", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792369419/ltv-quantum/quantum-computing-research-and-capstone-ch02-09-handling-discrepancies-between-your-results-and-the-paper.mp4", durationLabel: "2:35" }),
      L(10, "reproduction-lab", "Reproduction Lab", { contentDir: "ch02/10-reproduction-lab", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792369523/ltv-quantum/quantum-computing-research-and-capstone-ch02-10-reproduction-lab.mp4", durationLabel: "2:32" }),
    ],
  },
  {
    n: 3,
    title: "Capstone Kickoff",
    lessons: [
      L(11, "capstone-overview-and-project-selection", "Capstone Overview & Project Selection", { contentDir: "ch03/11-capstone-overview-and-project-selection", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792369680/ltv-quantum/quantum-computing-research-and-capstone-ch03-11-capstone-overview-and-project-selection.mp4", durationLabel: "2:30" }),
      L(12, "writing-a-capstone-proposal", "Writing a Capstone Proposal", { contentDir: "ch03/12-writing-a-capstone-proposal", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792369816/ltv-quantum/quantum-computing-research-and-capstone-ch03-12-writing-a-capstone-proposal.mp4", durationLabel: "2:29" }),
      L(13, "scoping-a-capstone-to-be-finishable", "Scoping a Capstone to Be Finishable", { contentDir: "ch03/13-scoping-a-capstone-to-be-finishable", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792369936/ltv-quantum/quantum-computing-research-and-capstone-ch03-13-scoping-a-capstone-to-be-finishable.mp4", durationLabel: "2:26" }),
    ],
  },
  {
    n: 4,
    title: "Capstone: Build It",
    lessons: [
      L(14, "capstone-build-the-experimental-setup", "Capstone: Build the Experimental Setup", { contentDir: "ch04/14-capstone-build-the-experimental-setup", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792370205/ltv-quantum/quantum-computing-research-and-capstone-ch04-14-capstone-build-the-experimental-setup.mp4", durationLabel: "3:05" }),
      L(15, "capstone-run-and-record-the-experiment", "Capstone: Run & Record the Experiment", { contentDir: "ch04/15-capstone-run-and-record-the-experiment", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792370306/ltv-quantum/quantum-computing-research-and-capstone-ch04-15-capstone-run-and-record-the-experiment.mp4", durationLabel: "2:21" }),
      L(16, "capstone-analyze-results-against-the-hypothesis", "Capstone: Analyze Results Against the Hypothesis", { contentDir: "ch04/16-capstone-analyze-results-against-the-hypothesis", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792370413/ltv-quantum/quantum-computing-research-and-capstone-ch04-16-capstone-analyze-results-against-the-hypothesis.mp4", durationLabel: "2:27" }),
      L(17, "capstone-handle-unexpected-results-honestly", "Capstone: Handle Unexpected Results Honestly", { contentDir: "ch04/17-capstone-handle-unexpected-results-honestly", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792370517/ltv-quantum/quantum-computing-research-and-capstone-ch04-17-capstone-handle-unexpected-results-honestly.mp4", durationLabel: "2:33" }),
      L(18, "capstone-iterate-and-refine", "Capstone: Iterate & Refine", { contentDir: "ch04/18-capstone-iterate-and-refine", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792370621/ltv-quantum/quantum-computing-research-and-capstone-ch04-18-capstone-iterate-and-refine.mp4", durationLabel: "2:18" }),
      L(19, "capstone-finalize-the-experiment", "Capstone: Finalize the Experiment", { contentDir: "ch04/19-capstone-finalize-the-experiment", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792370714/ltv-quantum/quantum-computing-research-and-capstone-ch04-19-capstone-finalize-the-experiment.mp4", durationLabel: "2:34" }),
    ],
  },
  {
    n: 5,
    title: "Capstone: Document & Present Findings",
    lessons: [
      L(20, "writing-up-methods-results-limitations-and-conclusions", "Writing Up Methods, Results, Limitations & Conclusions", { contentDir: "ch05/20-writing-up-methods-results-limitations-and-conclusions", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792370923/ltv-quantum/quantum-computing-research-and-capstone-ch05-20-writing-up-methods-results-limitations-and-conclusions.mp4", durationLabel: "2:30" }),
      L(21, "building-a-professional-technical-presentation", "Building a Professional Technical Presentation", { contentDir: "ch05/21-building-a-professional-technical-presentation", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792371031/ltv-quantum/quantum-computing-research-and-capstone-ch05-21-building-a-professional-technical-presentation.mp4", durationLabel: "2:41" }),
      L(22, "presenting-quantum-results-to-a-non-specialist-audience", "Presenting Quantum Results to a Non-Specialist Audience", { contentDir: "ch05/22-presenting-quantum-results-to-a-non-specialist-audience", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792371133/ltv-quantum/quantum-computing-research-and-capstone-ch05-22-presenting-quantum-results-to-a-non-specialist-audience.mp4", durationLabel: "2:32" }),
      L(23, "capstone-wrap-up-and-portfolio-packaging", "Capstone Wrap-Up & Portfolio Packaging", { contentDir: "ch05/23-capstone-wrap-up-and-portfolio-packaging", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792371237/ltv-quantum/quantum-computing-research-and-capstone-ch05-23-capstone-wrap-up-and-portfolio-packaging.mp4", durationLabel: "2:25" }),
      L(24, "peer-review-and-revision", "Peer Review & Revision", { contentDir: "ch05/24-peer-review-and-revision", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792371344/ltv-quantum/quantum-computing-research-and-capstone-ch05-24-peer-review-and-revision.mp4", durationLabel: "2:21" }),
    ],
  },
  {
    n: 6,
    title: "Career Preparation for Quantum Roles",
    lessons: [
      L(25, "the-real-quantum-computing-job-market-today", "The Real Quantum Computing Job Market Today", { contentDir: "ch06/25-the-real-quantum-computing-job-market-today", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792371525/ltv-quantum/quantum-computing-research-and-capstone-ch06-25-the-real-quantum-computing-job-market-today.mp4", durationLabel: "2:40" }),
      L(26, "building-a-quantum-computing-portfolio-and-resume", "Building a Quantum Computing Portfolio & Resume", { contentDir: "ch06/26-building-a-quantum-computing-portfolio-and-resume", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792371617/ltv-quantum/quantum-computing-research-and-capstone-ch06-26-building-a-quantum-computing-portfolio-and-resume.mp4", durationLabel: "2:44" }),
      L(27, "what-graduate-study-adds-for-research-and-hardware-roles", "What Graduate Study Adds for Research & Hardware Roles", { contentDir: "ch06/27-what-graduate-study-adds-for-research-and-hardware-roles", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792371712/ltv-quantum/quantum-computing-research-and-capstone-ch06-27-what-graduate-study-adds-for-research-and-hardware-roles.mp4", durationLabel: "2:52" }),
      L(28, "common-quantum-computing-interview-topics", "Common Quantum Computing Interview Topics", { contentDir: "ch06/28-common-quantum-computing-interview-topics", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792371805/ltv-quantum/quantum-computing-research-and-capstone-ch06-28-common-quantum-computing-interview-topics.mp4", durationLabel: "2:45" }),
    ],
  },
];
