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
  {
    n: 4,
    title: "Ethereum & Smart Contracts",
    lessons: [
      L(14, "what-is-ethereum-smart-contracts", "What Is Ethereum? Smart Contracts & the EVM", {
        contentDir: "ch04/01-what-is-ethereum-smart-contracts",
        videoUrl:
          "https://res.cloudinary.com/gmgfbpxh/video/upload/v1788899530/ltv-blockchain/ch04-01-what-is-ethereum-smart-contracts.mp4",
        durationLabel: "14 min 47 s",
      }),
      L(15, "gas-fees-on-ethereum", "Gas Fees on Ethereum", {
        contentDir: "ch04/02-gas-fees-on-ethereum",
        videoUrl:
          "https://res.cloudinary.com/gmgfbpxh/video/upload/v1788899538/ltv-blockchain/ch04-02-gas-fees-on-ethereum.mp4",
        durationLabel: "11 min 57 s",
      }),
      L(16, "history-of-ethereum", "The History of Ethereum: Whitepaper to Frontier", {
        contentDir: "ch04/03-history-of-ethereum",
        videoUrl:
          "https://res.cloudinary.com/gmgfbpxh/video/upload/v1788899793/ltv-blockchain/ch04-03-history-of-ethereum.mp4",
        durationLabel: "18 min 13 s",
      }),
      L(17, "dao-attack-the-merge", "The DAO Attack, the Merge & Ethereum Today", {
        contentDir: "ch04/04-dao-attack-the-merge",
        videoUrl:
          "https://res.cloudinary.com/gmgfbpxh/video/upload/v1788899799/ltv-blockchain/ch04-04-dao-attack-the-merge.mp4",
        durationLabel: "12 min 6 s",
      }),
    ],
  },
  {
    n: 5,
    title: "Solidity Programming",
    lessons: [
      L(18, "what-is-solidity", "What Is Solidity? High-Level vs. Low-Level Languages", {
        contentDir: "ch05/01-what-is-solidity",
        videoUrl:
          "https://res.cloudinary.com/gmgfbpxh/video/upload/v1788900393/ltv-blockchain/ch05-01-what-is-solidity.mp4",
        durationLabel: "7 min 12 s",
      }),
      L(19, "why-solidity-evm-compilation", "Why Solidity? Alternatives, the EVM & Compilation", {
        contentDir: "ch05/02-why-solidity-evm-compilation",
        videoUrl:
          "https://res.cloudinary.com/gmgfbpxh/video/upload/v1788900405/ltv-blockchain/ch05-02-why-solidity-evm-compilation.mp4",
        durationLabel: "19 min 55 s",
      }),
      L(20, "solidity-dev-tools-remix", "Solidity Dev Tools: Remix, Foundry & Hardhat", {
        contentDir: "ch05/03-solidity-dev-tools-remix",
        videoUrl:
          "https://res.cloudinary.com/gmgfbpxh/video/upload/v1788900412/ltv-blockchain/ch05-03-solidity-dev-tools-remix.mp4",
        durationLabel: "10 min 46 s",
      }),
      L(21, "immutability-gas-abi", "Contract Immutability, Gas & the ABI", {
        contentDir: "ch05/04-immutability-gas-abi",
        videoUrl:
          "https://res.cloudinary.com/gmgfbpxh/video/upload/v1788900418/ltv-blockchain/ch05-04-immutability-gas-abi.mp4",
        durationLabel: "12 min 37 s",
      }),
      L(22, "your-first-contract", "Your First Solidity Contract: Pragma, Contracts & Strings", {
        contentDir: "ch05/05-your-first-contract",
        videoUrl:
          "https://res.cloudinary.com/gmgfbpxh/video/upload/v1788900715/ltv-blockchain/ch05-05-your-first-contract.mp4",
        durationLabel: "18 min 2 s",
      }),
      L(23, "compiling-to-bytecode", "Compiling Your Contract & Viewing Bytecode", {
        contentDir: "ch05/06-compiling-to-bytecode",
        videoUrl:
          "https://res.cloudinary.com/gmgfbpxh/video/upload/v1788900719/ltv-blockchain/ch05-06-compiling-to-bytecode.mp4",
        durationLabel: "13 min 39 s",
      }),
      L(24, "deploying-your-contract", "Deploying Your Contract to a Test Network", {
        contentDir: "ch05/07-deploying-your-contract",
        videoUrl:
          "https://res.cloudinary.com/gmgfbpxh/video/upload/v1788900975/ltv-blockchain/ch05-07-deploying-your-contract.mp4",
        durationLabel: "5 min 1 s",
      }),
      L(25, "evm-stack-opcodes", "How the EVM Works: Stack, Opcodes & Gas", {
        contentDir: "ch05/08-evm-stack-opcodes",
        videoUrl:
          "https://res.cloudinary.com/gmgfbpxh/video/upload/v1788900979/ltv-blockchain/ch05-08-evm-stack-opcodes.mp4",
        durationLabel: "10 min",
      }),
      L(26, "writing-your-first-function", "Writing Your First Function: setMessage", {
        contentDir: "ch05/09-writing-your-first-function",
        videoUrl:
          "https://res.cloudinary.com/gmgfbpxh/video/upload/v1788901424/ltv-blockchain/ch05-09-writing-your-first-function.mp4",
        durationLabel: "11 min 52 s",
      }),
      L(27, "solidity-data-types", "Solidity Data Types: uint, int, bool & address", {
        contentDir: "ch05/10-solidity-data-types",
        videoUrl:
          "https://res.cloudinary.com/gmgfbpxh/video/upload/v1788901433/ltv-blockchain/ch05-10-solidity-data-types.mp4",
        durationLabel: "24 min 25 s",
      }),
      L(28, "the-constructor", "The Constructor: Initializing Your Contract", {
        contentDir: "ch05/11-the-constructor",
        videoUrl:
          "https://res.cloudinary.com/gmgfbpxh/video/upload/v1788901733/ltv-blockchain/ch05-11-the-constructor.mp4",
        durationLabel: "6 min 3 s",
      }),
      L(29, "reading-writing-state-view", "Reading vs. Writing State: the view Keyword", {
        contentDir: "ch05/12-reading-writing-state-view",
        videoUrl:
          "https://res.cloudinary.com/gmgfbpxh/video/upload/v1788901736/ltv-blockchain/ch05-12-reading-writing-state-view.mp4",
        durationLabel: "6 min 7 s",
      }),
      L(30, "control-flow-if-else", "Control Flow: if/else Statements & the Ternary Operator", {
        contentDir: "ch05/13-control-flow-if-else",
        videoUrl:
          "https://res.cloudinary.com/gmgfbpxh/video/upload/v1788902048/ltv-blockchain/ch05-13-control-flow-if-else.mp4",
        durationLabel: "7 min 13 s",
      }),
    ],
  },
];
