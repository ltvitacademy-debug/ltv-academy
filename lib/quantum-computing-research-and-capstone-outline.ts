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
      L(1, "how-quantum-computing-research-actually-gets-done", "How Quantum Computing Research Actually Gets Done", { contentDir: "ch01/01-how-quantum-computing-research-actually-gets-done" }),
      L(2, "reading-a-quantum-computing-paper", "Reading a Quantum Computing Paper", { contentDir: "ch01/02-reading-a-quantum-computing-paper" }),
      L(3, "forming-a-testable-hypothesis", "Forming a Testable Hypothesis", { contentDir: "ch01/03-forming-a-testable-hypothesis" }),
      L(4, "experimental-design-controls-and-baselines", "Experimental Design: Controls & Baselines", { contentDir: "ch01/04-experimental-design-controls-and-baselines" }),
      L(5, "research-methods-lab", "Research Methods Lab", { contentDir: "ch01/05-research-methods-lab" }),
    ],
  },
  {
    n: 2,
    title: "Reproducing Published Results",
    lessons: [
      L(6, "what-reproducibility-actually-requires", "What Reproducibility Actually Requires", { contentDir: "ch02/06-what-reproducibility-actually-requires" }),
      L(7, "selecting-an-appropriate-paper-to-reproduce", "Selecting an Appropriate Paper to Reproduce", { contentDir: "ch02/07-selecting-an-appropriate-paper-to-reproduce" }),
      L(8, "extracting-a-reproducible-methodology-from-a-paper", "Extracting a Reproducible Methodology From a Paper", { contentDir: "ch02/08-extracting-a-reproducible-methodology-from-a-paper" }),
      L(9, "handling-discrepancies-between-your-results-and-the-paper", "Handling Discrepancies Between Your Results & the Paper", { contentDir: "ch02/09-handling-discrepancies-between-your-results-and-the-paper" }),
      L(10, "reproduction-lab", "Reproduction Lab", { contentDir: "ch02/10-reproduction-lab" }),
    ],
  },
  {
    n: 3,
    title: "Capstone Kickoff",
    lessons: [
      L(11, "capstone-overview-and-project-selection", "Capstone Overview & Project Selection", { contentDir: "ch03/11-capstone-overview-and-project-selection" }),
      L(12, "writing-a-capstone-proposal", "Writing a Capstone Proposal", { contentDir: "ch03/12-writing-a-capstone-proposal" }),
      L(13, "scoping-a-capstone-to-be-finishable", "Scoping a Capstone to Be Finishable", { contentDir: "ch03/13-scoping-a-capstone-to-be-finishable" }),
    ],
  },
  {
    n: 4,
    title: "Capstone: Build It",
    lessons: [
      L(14, "capstone-build-the-experimental-setup", "Capstone: Build the Experimental Setup", { contentDir: "ch04/14-capstone-build-the-experimental-setup" }),
      L(15, "capstone-run-and-record-the-experiment", "Capstone: Run & Record the Experiment", { contentDir: "ch04/15-capstone-run-and-record-the-experiment" }),
      L(16, "capstone-analyze-results-against-the-hypothesis", "Capstone: Analyze Results Against the Hypothesis", { contentDir: "ch04/16-capstone-analyze-results-against-the-hypothesis" }),
      L(17, "capstone-handle-unexpected-results-honestly", "Capstone: Handle Unexpected Results Honestly", { contentDir: "ch04/17-capstone-handle-unexpected-results-honestly" }),
      L(18, "capstone-iterate-and-refine", "Capstone: Iterate & Refine", { contentDir: "ch04/18-capstone-iterate-and-refine" }),
      L(19, "capstone-finalize-the-experiment", "Capstone: Finalize the Experiment", { contentDir: "ch04/19-capstone-finalize-the-experiment" }),
    ],
  },
  {
    n: 5,
    title: "Capstone: Document & Present Findings",
    lessons: [
      L(20, "writing-up-methods-results-limitations-and-conclusions", "Writing Up Methods, Results, Limitations & Conclusions", { contentDir: "ch05/20-writing-up-methods-results-limitations-and-conclusions" }),
      L(21, "building-a-professional-technical-presentation", "Building a Professional Technical Presentation", { contentDir: "ch05/21-building-a-professional-technical-presentation" }),
      L(22, "presenting-quantum-results-to-a-non-specialist-audience", "Presenting Quantum Results to a Non-Specialist Audience", { contentDir: "ch05/22-presenting-quantum-results-to-a-non-specialist-audience" }),
      L(23, "capstone-wrap-up-and-portfolio-packaging", "Capstone Wrap-Up & Portfolio Packaging", { contentDir: "ch05/23-capstone-wrap-up-and-portfolio-packaging" }),
      L(24, "peer-review-and-revision", "Peer Review & Revision", { contentDir: "ch05/24-peer-review-and-revision" }),
    ],
  },
  {
    n: 6,
    title: "Career Preparation for Quantum Roles",
    lessons: [
      L(25, "the-real-quantum-computing-job-market-today", "The Real Quantum Computing Job Market Today", { contentDir: "ch06/25-the-real-quantum-computing-job-market-today" }),
      L(26, "building-a-quantum-computing-portfolio-and-resume", "Building a Quantum Computing Portfolio & Resume", { contentDir: "ch06/26-building-a-quantum-computing-portfolio-and-resume" }),
      L(27, "what-graduate-study-adds-for-research-and-hardware-roles", "What Graduate Study Adds for Research & Hardware Roles", { contentDir: "ch06/27-what-graduate-study-adds-for-research-and-hardware-roles" }),
      L(28, "common-quantum-computing-interview-topics", "Common Quantum Computing Interview Topics", { contentDir: "ch06/28-common-quantum-computing-interview-topics" }),
    ],
  },
];
