// The full Blockchain Engineering Capstones course outline. Only lessons
// with a contentDir + videoUrl are playable; everything else renders as
// "in production". Fills the capstone territory the original 54-lesson
// Blockchain Development course deliberately left out (no real classroom
// footage existed for it) — genuinely new material. Three flagship
// portfolio projects plus job preparation, closing out the Blockchain
// Engineer path.

export type LessonMeta = {
  n: number;
  slug: string;
  title: string;
  contentDir?: string; // under content/blockchain-engineering-capstones/
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

export const BLOCKCHAIN_ENGINEERING_CAPSTONES_CHAPTERS: ChapterMeta[] = [
  {
    n: 1,
    title: "Capstone Overview",
    lessons: [
      L(1, "program-overview-and-portfolio-strategy", "Program Overview & Portfolio Strategy"),
      L(2, "choosing-your-project-emphasis", "Choosing Your Project Emphasis"),
    ],
  },
  {
    n: 2,
    title: "Project 1 — A Full DeFi Protocol",
    lessons: [
      L(3, "project-1-kickoff", "Project 1 Kickoff"),
      L(4, "project-1-designing-the-pool-contracts", "Designing the Pool Contracts"),
      L(5, "project-1-building-the-frontend", "Building the Frontend"),
      L(6, "project-1-testing-and-security-review", "Testing & Security Review"),
      L(7, "project-1-testnet-deployment-and-wrap-up", "Testnet Deployment & Wrap-Up"),
    ],
  },
  {
    n: 3,
    title: "Project 2 — An NFT Marketplace",
    lessons: [
      L(8, "project-2-kickoff", "Project 2 Kickoff"),
      L(9, "project-2-marketplace-contract-design", "Marketplace Contract Design"),
      L(10, "project-2-indexing-listings-and-sales", "Indexing Listings & Sales"),
      L(11, "project-2-frontend-and-wallet-integration", "Frontend & Wallet Integration"),
      L(12, "project-2-wrap-up-and-presentation", "Wrap-Up & Presentation"),
    ],
  },
  {
    n: 4,
    title: "Project 3 — A DAO Governance System",
    lessons: [
      L(13, "project-3-kickoff", "Project 3 Kickoff"),
      L(14, "project-3-governance-token-and-voting", "Governance Token & Voting"),
      L(15, "project-3-treasury-and-timelock", "Treasury & Timelock"),
      L(16, "project-3-proposal-ui-and-deployment", "Proposal UI & Deployment"),
      L(17, "project-3-wrap-up-and-presentation", "Wrap-Up & Presentation"),
    ],
  },
  {
    n: 5,
    title: "Career Preparation",
    lessons: [
      L(18, "building-your-blockchain-developer-resume", "Building Your Blockchain Developer Resume"),
      L(19, "portfolio-and-github-presentation-strategy", "Portfolio & GitHub Presentation Strategy"),
      L(20, "common-blockchain-interview-questions", "Common Blockchain Interview Questions"),
      L(21, "whiteboard-and-security-review-exercises", "Whiteboard & Security Review Exercises"),
      L(22, "salary-negotiation-and-next-steps", "Salary Negotiation & Next Steps"),
    ],
  },
];
