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
      L(1, "the-off-chain-half-of-a-dapp", "The Off-Chain Half of a dApp", {
        contentDir: "ch01/01-the-off-chain-half-of-a-dapp",
        videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792408418/ltv-blockchain-apis-backend/the-off-chain-half-of-a-dapp.mp4",
        durationLabel: "1 min 13 s",
      }),
      L(2, "rpc-providers-and-nodes", "RPC Providers & Nodes", {
        contentDir: "ch01/02-rpc-providers-and-nodes",
        videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792408786/ltv-blockchain-apis-backend/rpc-providers-and-nodes.mp4",
        durationLabel: "1 min 21 s",
      }),
      L(3, "reading-chain-data-with-ethers-viem", "Reading Chain Data With ethers.js/viem", {
        contentDir: "ch01/03-reading-chain-data-with-ethers-viem",
        videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792409006/ltv-blockchain-apis-backend/reading-chain-data-with-ethers-viem.mp4",
        durationLabel: "1 min 33 s",
      }),
      L(4, "sending-transactions-programmatically", "Sending Transactions Programmatically", {
        contentDir: "ch01/04-sending-transactions-programmatically",
        videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792409211/ltv-blockchain-apis-backend/sending-transactions-programmatically.mp4",
        durationLabel: "1 min 26 s",
      }),
      L(5, "handling-nonces-and-gas-estimation", "Handling Nonces & Gas Estimation", {
        contentDir: "ch01/05-handling-nonces-and-gas-estimation",
        videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792409407/ltv-blockchain-apis-backend/handling-nonces-and-gas-estimation.mp4",
        durationLabel: "1 min 27 s",
      }),
      L(6, "rate-limits-and-provider-failover", "Rate Limits & Provider Failover", {
        contentDir: "ch01/06-rate-limits-and-provider-failover",
        videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792409590/ltv-blockchain-apis-backend/rate-limits-and-provider-failover.mp4",
        durationLabel: "1 min 28 s",
      }),
    ],
  },
  {
    n: 2,
    title: "Listening for On-Chain Events",
    lessons: [
      L(7, "event-listening-fundamentals", "Event Listening Fundamentals", {
        contentDir: "ch02/07-event-listening-fundamentals",
        videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792409768/ltv-blockchain-apis-backend/event-listening-fundamentals.mp4",
        durationLabel: "1 min 13 s",
      }),
      L(8, "polling-vs-websocket-subscriptions", "Polling vs. WebSocket Subscriptions", {
        contentDir: "ch02/08-polling-vs-websocket-subscriptions",
        videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792409966/ltv-blockchain-apis-backend/polling-vs-websocket-subscriptions.mp4",
        durationLabel: "1 min 29 s",
      }),
      L(9, "handling-chain-reorgs", "Handling Chain Reorgs", {
        contentDir: "ch02/09-handling-chain-reorgs",
        videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792410130/ltv-blockchain-apis-backend/handling-chain-reorgs.mp4",
        durationLabel: "1 min 11 s",
      }),
      L(10, "building-a-simple-event-listener-service", "Building a Simple Event Listener Service", {
        contentDir: "ch02/10-building-a-simple-event-listener-service",
        videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792410312/ltv-blockchain-apis-backend/building-a-simple-event-listener-service.mp4",
        durationLabel: "1 min 18 s",
      }),
    ],
  },
  {
    n: 3,
    title: "Indexing Blockchain Data",
    lessons: [
      L(11, "why-you-cant-just-query-the-chain", "Why You Can't Just Query the Chain", {
        contentDir: "ch03/11-why-you-cant-just-query-the-chain",
        videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792410474/ltv-blockchain-apis-backend/why-you-cant-just-query-the-chain.mp4",
        durationLabel: "1 min 17 s",
      }),
      L(12, "the-graph-and-subgraphs", "The Graph & Subgraphs", {
        contentDir: "ch03/12-the-graph-and-subgraphs",
        videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792410674/ltv-blockchain-apis-backend/the-graph-and-subgraphs.mp4",
        durationLabel: "1 min 27 s",
      }),
      L(13, "writing-a-subgraph-schema", "Writing a Subgraph Schema", {
        contentDir: "ch03/13-writing-a-subgraph-schema",
        videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792410834/ltv-blockchain-apis-backend/writing-a-subgraph-schema.mp4",
        durationLabel: "60 s",
      }),
      L(14, "mapping-handlers", "Mapping Handlers", {
        contentDir: "ch03/14-mapping-handlers",
        videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792411007/ltv-blockchain-apis-backend/mapping-handlers.mp4",
        durationLabel: "1 min 15 s",
      }),
      L(15, "deploying-and-querying-a-subgraph", "Deploying & Querying a Subgraph", {
        contentDir: "ch03/15-deploying-and-querying-a-subgraph",
        videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792411206/ltv-blockchain-apis-backend/deploying-and-querying-a-subgraph.mp4",
        durationLabel: "1 min 13 s",
      }),
      L(16, "custom-indexers-vs-managed-services", "Custom Indexers vs. Managed Services", {
        contentDir: "ch03/16-custom-indexers-vs-managed-services",
        videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792411373/ltv-blockchain-apis-backend/custom-indexers-vs-managed-services.mp4",
        durationLabel: "1 min 22 s",
      }),
    ],
  },
  {
    n: 4,
    title: "Oracles & External Data",
    lessons: [
      L(17, "the-oracle-problem", "The Oracle Problem", {
        contentDir: "ch04/17-the-oracle-problem",
        videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792411538/ltv-blockchain-apis-backend/the-oracle-problem.mp4",
        durationLabel: "1 min 7 s",
      }),
      L(18, "chainlink-price-feeds", "Chainlink Price Feeds", {
        contentDir: "ch04/18-chainlink-price-feeds",
        videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792411743/ltv-blockchain-apis-backend/chainlink-price-feeds.mp4",
        durationLabel: "1 min 30 s",
      }),
      L(19, "chainlink-automation-and-functions", "Chainlink Automation & Functions", {
        contentDir: "ch04/19-chainlink-automation-and-functions",
        videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792411919/ltv-blockchain-apis-backend/chainlink-automation-and-functions.mp4",
        durationLabel: "1 min 15 s",
      }),
      L(20, "building-a-simple-price-triggered-service", "Building a Simple Price-Triggered Service", {
        contentDir: "ch04/20-building-a-simple-price-triggered-service",
        videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792412113/ltv-blockchain-apis-backend/building-a-simple-price-triggered-service.mp4",
        durationLabel: "1 min 17 s",
      }),
    ],
  },
  {
    n: 5,
    title: "Wallets & Sessions on the Backend",
    lessons: [
      L(21, "sign-in-with-ethereum", "Sign-In With Ethereum", {
        contentDir: "ch05/21-sign-in-with-ethereum",
        videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792412247/ltv-blockchain-apis-backend/sign-in-with-ethereum.mp4",
        durationLabel: "58 s",
      }),
      L(22, "verifying-signatures-server-side", "Verifying Signatures Server-Side", {
        contentDir: "ch05/22-verifying-signatures-server-side",
        videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792412410/ltv-blockchain-apis-backend/verifying-signatures-server-side.mp4",
        durationLabel: "58 s",
      }),
      L(23, "session-management-for-web3-apps", "Session Management for Web3 Apps", {
        contentDir: "ch05/23-session-management-for-web3-apps",
        videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792412567/ltv-blockchain-apis-backend/session-management-for-web3-apps.mp4",
        durationLabel: "1 min 10 s",
      }),
      L(24, "gasless-transactions-and-relayers", "Gasless Transactions & Relayers", {
        contentDir: "ch05/24-gasless-transactions-and-relayers",
        videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792412748/ltv-blockchain-apis-backend/gasless-transactions-and-relayers.mp4",
        durationLabel: "1 min 8 s",
      }),
    ],
  },
];
