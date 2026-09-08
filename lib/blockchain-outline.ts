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
      L(2, "nodes-blocks-block-explorers", "Nodes, Blocks & Block Explorers", {
        contentDir: "ch01/02-nodes-blocks-block-explorers",
        videoUrl:
          "https://res.cloudinary.com/gmgfbpxh/video/upload/v1788896876/ltv-blockchain/ch01-02-nodes-blocks-block-explorers.mp4",
        durationLabel: "6 min 17 s",
      }),
      L(3, "hashing-cryptographic-security", "Hashing & Cryptographic Security", {
        contentDir: "ch01/03-hashing-cryptographic-security",
        videoUrl:
          "https://res.cloudinary.com/gmgfbpxh/video/upload/v1788896881/ltv-blockchain/ch01-03-hashing-cryptographic-security.mp4",
        durationLabel: "10 min 12 s",
      }),
      L(4, "consensus-proof-of-work-vs-stake", "Consensus: Proof of Work vs. Proof of Stake", {
        contentDir: "ch01/04-consensus-proof-of-work-vs-stake",
        videoUrl:
          "https://res.cloudinary.com/gmgfbpxh/video/upload/v1788896892/ltv-blockchain/ch01-04-consensus-proof-of-work-vs-stake.mp4",
        durationLabel: "5 min 8 s",
      }),
      L(5, "blockchain-in-the-real-world", "Blockchain in the Real World", {
        contentDir: "ch01/05-blockchain-in-the-real-world",
        videoUrl:
          "https://res.cloudinary.com/gmgfbpxh/video/upload/v1788896895/ltv-blockchain/ch01-05-blockchain-in-the-real-world.mp4",
        durationLabel: "3 min 17 s",
      }),
    ],
  },
  {
    n: 2,
    title: "Cryptography Basics",
    lessons: [
      L(6, "what-is-cryptography", "What Is Cryptography?", {
        contentDir: "ch02/01-what-is-cryptography",
        videoUrl:
          "https://res.cloudinary.com/gmgfbpxh/video/upload/v1788897478/ltv-blockchain/ch02-01-what-is-cryptography.mp4",
        durationLabel: "2 min 54 s",
      }),
      L(7, "symmetric-vs-asymmetric-encryption", "Symmetric vs. Asymmetric Encryption", {
        contentDir: "ch02/02-symmetric-vs-asymmetric-encryption",
        videoUrl:
          "https://res.cloudinary.com/gmgfbpxh/video/upload/v1788897480/ltv-blockchain/ch02-02-symmetric-vs-asymmetric-encryption.mp4",
        durationLabel: "1 min 32 s",
      }),
      L(8, "digital-signatures-public-key-crypto", "Digital Signatures & Public Key Cryptography", {
        contentDir: "ch02/03-digital-signatures-public-key-crypto",
        videoUrl:
          "https://res.cloudinary.com/gmgfbpxh/video/upload/v1788897483/ltv-blockchain/ch02-03-digital-signatures-public-key-crypto.mp4",
        durationLabel: "4 min 23 s",
      }),
    ],
  },
  {
    n: 3,
    title: "Bitcoin Deep Dive",
    lessons: [
      L(9, "signing-verifying-transactions", "Signing & Verifying Blockchain Transactions", {
        contentDir: "ch03/01-signing-verifying-transactions",
        videoUrl:
          "https://res.cloudinary.com/gmgfbpxh/video/upload/v1788898137/ltv-blockchain/ch03-01-signing-verifying-transactions.mp4",
        durationLabel: "7 min 33 s",
      }),
      L(10, "pgp-public-key-crypto-real-world", "PGP: Public Key Cryptography in the Real World", {
        contentDir: "ch03/02-pgp-public-key-crypto-real-world",
        videoUrl:
          "https://res.cloudinary.com/gmgfbpxh/video/upload/v1788898141/ltv-blockchain/ch03-02-pgp-public-key-crypto-real-world.mp4",
        durationLabel: "8 min 32 s",
      }),
      L(11, "precursors-bit-gold-cypherpunks", "Precursors to Bitcoin: Bit Gold, e-gold & the Cypherpunks", {
        contentDir: "ch03/03-precursors-bit-gold-cypherpunks",
        videoUrl:
          "https://res.cloudinary.com/gmgfbpxh/video/upload/v1788898153/ltv-blockchain/ch03-03-precursors-bit-gold-cypherpunks.mp4",
        durationLabel: "3 min 59 s",
      }),
      L(12, "bitcoin-whitepaper-genesis-block", "The Bitcoin Whitepaper & the Genesis Block", {
        contentDir: "ch03/04-bitcoin-whitepaper-genesis-block",
        videoUrl:
          "https://res.cloudinary.com/gmgfbpxh/video/upload/v1788898156/ltv-blockchain/ch03-04-bitcoin-whitepaper-genesis-block.mp4",
        durationLabel: "3 min 57 s",
      }),
      L(13, "bitcoin-milestones-halving", "Bitcoin Milestones: Pizza Day to Institutional Adoption", {
        contentDir: "ch03/05-bitcoin-milestones-halving",
        videoUrl:
          "https://res.cloudinary.com/gmgfbpxh/video/upload/v1788898450/ltv-blockchain/ch03-05-bitcoin-milestones-halving.mp4",
        durationLabel: "4 min 23 s",
      }),
    ],
  },
];
