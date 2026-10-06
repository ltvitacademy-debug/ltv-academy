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
      L(1, "what-makes-defi-different", "What Makes DeFi Different", { contentDir: "ch01/01-what-makes-defi-different" }),
      L(2, "the-major-categories-of-defi-protocols", "The Major Categories of DeFi Protocols", { contentDir: "ch01/02-the-major-categories-of-defi-protocols" }),
      L(3, "composability-and-money-legos", "Composability & Money Legos", { contentDir: "ch01/03-composability-and-money-legos" }),
      L(4, "reading-a-protocols-docs-and-contracts", "Reading a Protocol's Docs & Contracts", { contentDir: "ch01/04-reading-a-protocols-docs-and-contracts" }),
    ],
  },
  {
    n: 2,
    title: "Automated Market Makers",
    lessons: [
      L(5, "how-a-constant-product-amm-works", "How a Constant-Product AMM Works", { contentDir: "ch02/05-how-a-constant-product-amm-works" }),
      L(6, "liquidity-pools-and-lp-tokens", "Liquidity Pools & LP Tokens", { contentDir: "ch02/06-liquidity-pools-and-lp-tokens" }),
      L(7, "impermanent-loss", "Impermanent Loss", { contentDir: "ch02/07-impermanent-loss" }),
      L(8, "building-a-simple-amm-contract", "Building a Simple AMM Contract", { contentDir: "ch02/08-building-a-simple-amm-contract" }),
      L(9, "concentrated-liquidity-concepts", "Concentrated Liquidity Concepts", { contentDir: "ch02/09-concentrated-liquidity-concepts" }),
    ],
  },
  {
    n: 3,
    title: "Lending & Borrowing Protocols",
    lessons: [
      L(10, "overcollateralized-lending-mechanics", "Overcollateralized Lending Mechanics", { contentDir: "ch03/10-overcollateralized-lending-mechanics" }),
      L(11, "interest-rate-models", "Interest Rate Models", { contentDir: "ch03/11-interest-rate-models" }),
      L(12, "liquidations", "Liquidations", { contentDir: "ch03/12-liquidations" }),
      L(13, "flash-loans", "Flash Loans", { contentDir: "ch03/13-flash-loans" }),
      L(14, "building-a-simple-lending-pool", "Building a Simple Lending Pool", { contentDir: "ch03/14-building-a-simple-lending-pool" }),
    ],
  },
  {
    n: 4,
    title: "Staking & Yield",
    lessons: [
      L(15, "staking-mechanics", "Staking Mechanics", { contentDir: "ch04/15-staking-mechanics" }),
      L(16, "yield-farming-and-incentive-design", "Yield Farming & Incentive Design", { contentDir: "ch04/16-yield-farming-and-incentive-design" }),
      L(17, "vaults-and-auto-compounding", "Vaults & Auto-Compounding", { contentDir: "ch04/17-vaults-and-auto-compounding" }),
      L(18, "reward-emission-schedules", "Reward Emission Schedules", { contentDir: "ch04/18-reward-emission-schedules" }),
    ],
  },
  {
    n: 5,
    title: "Tokenomics Design",
    lessons: [
      L(19, "token-supply-models", "Token Supply Models", { contentDir: "ch05/19-token-supply-models" }),
      L(20, "utility-vs-governance-tokens", "Utility vs. Governance Tokens", { contentDir: "ch05/20-utility-vs-governance-tokens" }),
      L(21, "vesting-schedules-and-cliffs", "Vesting Schedules & Cliffs", { contentDir: "ch05/21-vesting-schedules-and-cliffs" }),
      L(22, "designing-sustainable-incentives", "Designing Sustainable Incentives", { contentDir: "ch05/22-designing-sustainable-incentives" }),
      L(23, "modeling-token-supply-and-demand", "Modeling Token Supply & Demand", { contentDir: "ch05/23-modeling-token-supply-and-demand" }),
    ],
  },
  {
    n: 6,
    title: "DAOs & Governance",
    lessons: [
      L(24, "on-chain-governance-mechanics", "On-Chain Governance Mechanics", { contentDir: "ch06/24-on-chain-governance-mechanics" }),
      L(25, "governance-token-voting-and-delegation", "Governance Token Voting & Delegation", { contentDir: "ch06/25-governance-token-voting-and-delegation" }),
      L(26, "timelocks-and-multisig-treasuries", "Timelocks & Multisig Treasuries", { contentDir: "ch06/26-timelocks-and-multisig-treasuries" }),
      L(27, "building-a-simple-governance-contract", "Building a Simple Governance Contract", { contentDir: "ch06/27-building-a-simple-governance-contract" }),
    ],
  },
  {
    n: 7,
    title: "NFTs Beyond Collectibles",
    lessons: [
      L(28, "erc-721-and-erc-1155-review", "ERC-721 & ERC-1155 Review", { contentDir: "ch07/28-erc-721-and-erc-1155-review" }),
      L(29, "nfts-as-financial-and-utility-primitives", "NFTs as Financial & Utility Primitives", { contentDir: "ch07/29-nfts-as-financial-and-utility-primitives" }),
      L(30, "royalties-and-marketplace-mechanics", "Royalties & Marketplace Mechanics", { contentDir: "ch07/30-royalties-and-marketplace-mechanics" }),
    ],
  },
];
