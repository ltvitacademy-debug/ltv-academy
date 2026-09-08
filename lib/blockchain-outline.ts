// The Blockchain Development course outline. Unlike the other three courses,
// lesson videos here are real clipped footage from Bill Green's "BlockChain
// 2025" class recordings (owned by LTV Academy), not synthetic narrated
// slides — so guide.md screenshots are real video frames, not Microsoft
// documentation screenshots, and durationLabel reflects genuine clip length.
// Only lessons with a contentDir + videoUrl are playable; everything else
// renders as "in production". Mirrors the pattern in powerbi-outline.ts.

import type { ChapterMeta, LessonMeta } from "./powerbi-outline";

const L = (n: number, slug: string, title: string, extra?: Partial<LessonMeta>): LessonMeta => ({
  n,
  slug,
  title,
  ...extra,
});

export const BLOCKCHAIN_CHAPTERS: ChapterMeta[] = [
  {
    n: 1,
    title: "Blockchain Foundations",
    lessons: [
      L(1, "what-is-a-blockchain", "What Is a Blockchain?", {
        contentDir: "ch01/01-what-is-a-blockchain",
        videoUrl:
          "https://res.cloudinary.com/gmgfbpxh/video/upload/v1788893801/ltv-blockchain/ch01-01-what-is-a-blockchain.mp4",
        durationLabel: "13 min 8 s",
      }),
      L(2, "nodes-blocks-block-explorers", "Nodes, Blocks & Block Explorers"),
      L(3, "hashing-cryptographic-security", "Hashing & Cryptographic Security"),
      L(4, "consensus-proof-of-work-vs-stake", "Consensus: Proof of Work vs. Proof of Stake"),
      L(5, "blockchain-in-the-real-world", "Blockchain in the Real World"),
    ],
  },
];
