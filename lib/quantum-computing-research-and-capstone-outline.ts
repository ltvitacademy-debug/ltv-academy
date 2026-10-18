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
      L(1, "how-quantum-computing-research-actually-gets-done", "How Quantum Computing Research Actually Gets Done"),
      L(2, "reading-a-quantum-computing-paper", "Reading a Quantum Computing Paper"),
      L(3, "forming-a-testable-hypothesis", "Forming a Testable Hypothesis"),
      L(4, "experimental-design-controls-and-baselines", "Experimental Design: Controls & Baselines"),
      L(5, "research-methods-lab", "Research Methods Lab"),
    ],
  },
  {
    n: 2,
    title: "Reproducing Published Results",
    lessons: [
      L(6, "what-reproducibility-actually-requires", "What Reproducibility Actually Requires"),
      L(7, "selecting-an-appropriate-paper-to-reproduce", "Selecting an Appropriate Paper to Reproduce"),
      L(8, "extracting-a-reproducible-methodology-from-a-paper", "Extracting a Reproducible Methodology From a Paper"),
      L(9, "handling-discrepancies-between-your-results-and-the-paper", "Handling Discrepancies Between Your Results & the Paper"),
      L(10, "reproduction-lab", "Reproduction Lab"),
    ],
  },
  {
    n: 3,
    title: "Capstone Kickoff",
    lessons: [
      L(11, "capstone-overview-and-project-selection", "Capstone Overview & Project Selection"),
      L(12, "writing-a-capstone-proposal", "Writing a Capstone Proposal"),
      L(13, "scoping-a-capstone-to-be-finishable", "Scoping a Capstone to Be Finishable"),
    ],
  },
  {
    n: 4,
    title: "Capstone: Build It",
    lessons: [
      L(14, "capstone-build-the-experimental-setup", "Capstone: Build the Experimental Setup"),
      L(15, "capstone-run-and-record-the-experiment", "Capstone: Run & Record the Experiment"),
      L(16, "capstone-analyze-results-against-the-hypothesis", "Capstone: Analyze Results Against the Hypothesis"),
      L(17, "capstone-handle-unexpected-results-honestly", "Capstone: Handle Unexpected Results Honestly"),
      L(18, "capstone-iterate-and-refine", "Capstone: Iterate & Refine"),
      L(19, "capstone-finalize-the-experiment", "Capstone: Finalize the Experiment"),
    ],
  },
  {
    n: 5,
    title: "Capstone: Document & Present Findings",
    lessons: [
      L(20, "writing-up-methods-results-limitations-and-conclusions", "Writing Up Methods, Results, Limitations & Conclusions"),
      L(21, "building-a-professional-technical-presentation", "Building a Professional Technical Presentation"),
      L(22, "presenting-quantum-results-to-a-non-specialist-audience", "Presenting Quantum Results to a Non-Specialist Audience"),
      L(23, "capstone-wrap-up-and-portfolio-packaging", "Capstone Wrap-Up & Portfolio Packaging"),
      L(24, "peer-review-and-revision", "Peer Review & Revision"),
    ],
  },
  {
    n: 6,
    title: "Career Preparation for Quantum Roles",
    lessons: [
      L(25, "the-real-quantum-computing-job-market-today", "The Real Quantum Computing Job Market Today"),
      L(26, "building-a-quantum-computing-portfolio-and-resume", "Building a Quantum Computing Portfolio & Resume"),
      L(27, "what-graduate-study-adds-for-research-and-hardware-roles", "What Graduate Study Adds for Research & Hardware Roles"),
      L(28, "common-quantum-computing-interview-topics", "Common Quantum Computing Interview Topics"),
    ],
  },
];
