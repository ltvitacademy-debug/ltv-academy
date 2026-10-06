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
      L(1, "program-overview-and-portfolio-strategy", "Program Overview & Portfolio Strategy", { contentDir: "ch01/01-program-overview-and-portfolio-strategy" }),
      L(2, "choosing-your-project-emphasis", "Choosing Your Project Emphasis", { contentDir: "ch01/02-choosing-your-project-emphasis" }),
    ],
  },
  {
    n: 2,
    title: "Project 1 — A Full DeFi Protocol",
    lessons: [
      L(3, "project-1-kickoff", "Project 1 Kickoff", { contentDir: "ch02/03-project-1-kickoff" }),
      L(4, "project-1-designing-the-pool-contracts", "Designing the Pool Contracts", { contentDir: "ch02/04-project-1-designing-the-pool-contracts" }),
      L(5, "project-1-building-the-frontend", "Building the Frontend", { contentDir: "ch02/05-project-1-building-the-frontend" }),
      L(6, "project-1-testing-and-security-review", "Testing & Security Review", { contentDir: "ch02/06-project-1-testing-and-security-review" }),
      L(7, "project-1-testnet-deployment-and-wrap-up", "Testnet Deployment & Wrap-Up", { contentDir: "ch02/07-project-1-testnet-deployment-and-wrap-up" }),
    ],
  },
  {
    n: 3,
    title: "Project 2 — An NFT Marketplace",
    lessons: [
      L(8, "project-2-kickoff", "Project 2 Kickoff", { contentDir: "ch03/08-project-2-kickoff" }),
      L(9, "project-2-marketplace-contract-design", "Marketplace Contract Design", { contentDir: "ch03/09-project-2-marketplace-contract-design" }),
      L(10, "project-2-indexing-listings-and-sales", "Indexing Listings & Sales", { contentDir: "ch03/10-project-2-indexing-listings-and-sales" }),
      L(11, "project-2-frontend-and-wallet-integration", "Frontend & Wallet Integration", { contentDir: "ch03/11-project-2-frontend-and-wallet-integration" }),
      L(12, "project-2-wrap-up-and-presentation", "Wrap-Up & Presentation", { contentDir: "ch03/12-project-2-wrap-up-and-presentation" }),
    ],
  },
  {
    n: 4,
    title: "Project 3 — A DAO Governance System",
    lessons: [
      L(13, "project-3-kickoff", "Project 3 Kickoff", { contentDir: "ch04/13-project-3-kickoff" }),
      L(14, "project-3-governance-token-and-voting", "Governance Token & Voting", { contentDir: "ch04/14-project-3-governance-token-and-voting" }),
      L(15, "project-3-treasury-and-timelock", "Treasury & Timelock", { contentDir: "ch04/15-project-3-treasury-and-timelock" }),
      L(16, "project-3-proposal-ui-and-deployment", "Proposal UI & Deployment", { contentDir: "ch04/16-project-3-proposal-ui-and-deployment" }),
      L(17, "project-3-wrap-up-and-presentation", "Wrap-Up & Presentation", { contentDir: "ch04/17-project-3-wrap-up-and-presentation" }),
    ],
  },
  {
    n: 5,
    title: "Career Preparation",
    lessons: [
      L(18, "building-your-blockchain-developer-resume", "Building Your Blockchain Developer Resume", { contentDir: "ch05/18-building-your-blockchain-developer-resume" }),
      L(19, "portfolio-and-github-presentation-strategy", "Portfolio & GitHub Presentation Strategy", { contentDir: "ch05/19-portfolio-and-github-presentation-strategy" }),
      L(20, "common-blockchain-interview-questions", "Common Blockchain Interview Questions", { contentDir: "ch05/20-common-blockchain-interview-questions" }),
      L(21, "whiteboard-and-security-review-exercises", "Whiteboard & Security Review Exercises", { contentDir: "ch05/21-whiteboard-and-security-review-exercises" }),
      L(22, "salary-negotiation-and-next-steps", "Salary Negotiation & Next Steps", { contentDir: "ch05/22-salary-negotiation-and-next-steps" }),
    ],
  },
];
