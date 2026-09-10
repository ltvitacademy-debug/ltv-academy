// The full Blockchain APIs & Backend Development course outline. Only
// lessons with a contentDir + videoUrl are playable; everything else
// renders as "in production". Covers everything a dApp needs off-chain:
// RPC providers, indexing, event listening, oracles, and wallet/session
// integration on the server side.

export type LessonMeta = {
  n: number;
  slug: string;
  title: string;
  contentDir?: string; // under content/blockchain-apis-backend/
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

export const BLOCKCHAIN_APIS_BACKEND_CHAPTERS: ChapterMeta[] = [
  {
    n: 1,
    title: "Talking to the Chain",
    lessons: [
      L(1, "the-off-chain-half-of-a-dapp", "The Off-Chain Half of a dApp"),
      L(2, "rpc-providers-and-nodes", "RPC Providers & Nodes"),
      L(3, "reading-chain-data-with-ethers-viem", "Reading Chain Data With ethers.js/viem"),
      L(4, "sending-transactions-programmatically", "Sending Transactions Programmatically"),
      L(5, "handling-nonces-and-gas-estimation", "Handling Nonces & Gas Estimation"),
      L(6, "rate-limits-and-provider-failover", "Rate Limits & Provider Failover"),
    ],
  },
  {
    n: 2,
    title: "Listening for On-Chain Events",
    lessons: [
      L(7, "event-listening-fundamentals", "Event Listening Fundamentals"),
      L(8, "polling-vs-websocket-subscriptions", "Polling vs. WebSocket Subscriptions"),
      L(9, "handling-chain-reorgs", "Handling Chain Reorgs"),
      L(10, "building-a-simple-event-listener-service", "Building a Simple Event Listener Service"),
    ],
  },
  {
    n: 3,
    title: "Indexing Blockchain Data",
    lessons: [
      L(11, "why-you-cant-just-query-the-chain", "Why You Can't Just Query the Chain"),
      L(12, "the-graph-and-subgraphs", "The Graph & Subgraphs"),
      L(13, "writing-a-subgraph-schema", "Writing a Subgraph Schema"),
      L(14, "mapping-handlers", "Mapping Handlers"),
      L(15, "deploying-and-querying-a-subgraph", "Deploying & Querying a Subgraph"),
      L(16, "custom-indexers-vs-managed-services", "Custom Indexers vs. Managed Services"),
    ],
  },
  {
    n: 4,
    title: "Oracles & External Data",
    lessons: [
      L(17, "the-oracle-problem", "The Oracle Problem"),
      L(18, "chainlink-price-feeds", "Chainlink Price Feeds"),
      L(19, "chainlink-automation-and-functions", "Chainlink Automation & Functions"),
      L(20, "building-a-simple-price-triggered-service", "Building a Simple Price-Triggered Service"),
    ],
  },
  {
    n: 5,
    title: "Wallets & Sessions on the Backend",
    lessons: [
      L(21, "sign-in-with-ethereum", "Sign-In With Ethereum"),
      L(22, "verifying-signatures-server-side", "Verifying Signatures Server-Side"),
      L(23, "session-management-for-web3-apps", "Session Management for Web3 Apps"),
      L(24, "gasless-transactions-and-relayers", "Gasless Transactions & Relayers"),
    ],
  },
];
