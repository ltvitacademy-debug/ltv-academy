// The full DeFi & Token Engineering course outline. Only lessons with a
// contentDir + videoUrl are playable; everything else renders as "in
// production". Goes deeper than the base Blockchain Development course's
// Token Standards chapter — AMMs, lending, staking, tokenomics design, and
// governance, the mechanics behind real DeFi protocols.

export type LessonMeta = {
  n: number;
  slug: string;
  title: string;
  contentDir?: string; // under content/defi-token-engineering/
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

export const DEFI_TOKEN_ENGINEERING_CHAPTERS: ChapterMeta[] = [
  {
    n: 1,
    title: "DeFi Building Blocks",
    lessons: [
      L(1, "what-makes-defi-different", "What Makes DeFi Different"),
      L(2, "the-major-categories-of-defi-protocols", "The Major Categories of DeFi Protocols"),
      L(3, "composability-and-money-legos", "Composability & Money Legos"),
      L(4, "reading-a-protocols-docs-and-contracts", "Reading a Protocol's Docs & Contracts"),
    ],
  },
  {
    n: 2,
    title: "Automated Market Makers",
    lessons: [
      L(5, "how-a-constant-product-amm-works", "How a Constant-Product AMM Works"),
      L(6, "liquidity-pools-and-lp-tokens", "Liquidity Pools & LP Tokens"),
      L(7, "impermanent-loss", "Impermanent Loss"),
      L(8, "building-a-simple-amm-contract", "Building a Simple AMM Contract"),
      L(9, "concentrated-liquidity-concepts", "Concentrated Liquidity Concepts"),
    ],
  },
  {
    n: 3,
    title: "Lending & Borrowing Protocols",
    lessons: [
      L(10, "overcollateralized-lending-mechanics", "Overcollateralized Lending Mechanics"),
      L(11, "interest-rate-models", "Interest Rate Models"),
      L(12, "liquidations", "Liquidations"),
      L(13, "flash-loans", "Flash Loans"),
      L(14, "building-a-simple-lending-pool", "Building a Simple Lending Pool"),
    ],
  },
  {
    n: 4,
    title: "Staking & Yield",
    lessons: [
      L(15, "staking-mechanics", "Staking Mechanics"),
      L(16, "yield-farming-and-incentive-design", "Yield Farming & Incentive Design"),
      L(17, "vaults-and-auto-compounding", "Vaults & Auto-Compounding"),
      L(18, "reward-emission-schedules", "Reward Emission Schedules"),
    ],
  },
  {
    n: 5,
    title: "Tokenomics Design",
    lessons: [
      L(19, "token-supply-models", "Token Supply Models"),
      L(20, "utility-vs-governance-tokens", "Utility vs. Governance Tokens"),
      L(21, "vesting-schedules-and-cliffs", "Vesting Schedules & Cliffs"),
      L(22, "designing-sustainable-incentives", "Designing Sustainable Incentives"),
      L(23, "modeling-token-supply-and-demand", "Modeling Token Supply & Demand"),
    ],
  },
  {
    n: 6,
    title: "DAOs & Governance",
    lessons: [
      L(24, "on-chain-governance-mechanics", "On-Chain Governance Mechanics"),
      L(25, "governance-token-voting-and-delegation", "Governance Token Voting & Delegation"),
      L(26, "timelocks-and-multisig-treasuries", "Timelocks & Multisig Treasuries"),
      L(27, "building-a-simple-governance-contract", "Building a Simple Governance Contract"),
    ],
  },
  {
    n: 7,
    title: "NFTs Beyond Collectibles",
    lessons: [
      L(28, "erc-721-and-erc-1155-review", "ERC-721 & ERC-1155 Review"),
      L(29, "nfts-as-financial-and-utility-primitives", "NFTs as Financial & Utility Primitives"),
      L(30, "royalties-and-marketplace-mechanics", "Royalties & Marketplace Mechanics"),
    ],
  },
];
