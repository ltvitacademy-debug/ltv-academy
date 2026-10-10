import type { PathResumes } from "../sampleResumeTypes";

const CONTACT = ["Atlanta, GA", "(404) 555-0182", "john.doe@example.com", "linkedin.com/in/johndoe-biexample"];

export const RESUMES: PathResumes = {
  "job-ready": {
    levelLabel: "Job Ready",
    name: "John Doe",
    contact: CONTACT,
    summary:
      "Blockchain Engineer trained end to end in JavaScript/TypeScript, Solidity smart contract development, DeFi and " +
      "token-engineering mechanics, smart contract testing/DevOps, and full-stack dApp development through a " +
      "project-based apprenticeship program. Built and deployed three capstone systems — a constant-product AMM " +
      "liquidity pool, an ERC-721 NFT marketplace with royalty payouts and subgraph indexing, and a full DAO " +
      "governance system with a timelock-controlled treasury — each with a contract verified on a public block " +
      "explorer. Bringing that full-stack blockchain approach to a Blockchain Developer, Smart Contract Developer, or " +
      "Web3 Developer role.",
    skills: [
      "Smart Contract Development (Solidity, OpenZeppelin)",
      "JavaScript & TypeScript (Node.js)",
      "DeFi Mechanics & AMM/Lending Design",
      "Token Standards (ERC-20, ERC-721, ERC-2981)",
      "DAO Governance (Governor, ERC20Votes, TimelockController)",
      "Smart Contract Testing (Foundry: Unit, Fuzz & Invariant)",
      "CI/CD & Security Tooling (GitHub Actions, Slither, Mythril)",
      "Off-Chain Backend & Indexing (ethers.js/viem, The Graph, RPC)",
      "Security Auditing & Reentrancy Prevention",
      "Version Control (Git/GitHub)",
    ],
    tools:
      "Solidity, Foundry, Hardhat (Ignition), OpenZeppelin Contracts v5, ethers.js, viem, wagmi, React, The Graph, " +
      "Etherscan, Slither, Mythril, Git/GitHub",
    sections: [
      {
        heading: "Training",
        entries: [
          {
            left: "Lifting the Veil IT Academy — Apprenticeship Program",
            right: "Jan 2026 – Jun 2026",
            sub: "Blockchain Engineer Track · Atlanta, GA",
            bullets: [
              "Completed an intensive, project-based apprenticeship covering JavaScript/TypeScript programming fundamentals, blockchain foundations, Solidity smart contract development, off-chain backend integration, DeFi and token engineering, smart contract testing/DevOps, and three capstone projects — no prior programming experience assumed.",
              "Built programming fundamentals in JavaScript — variables, control flow, functions, arrays/objects, ES6+ syntax, destructuring, and array methods (map/filter/reduce) — then asynchronous JavaScript (callbacks, Promises, async/await) and TypeScript (interfaces, generics, type narrowing), applied specifically to typing blockchain data structures and ethers.js/viem contract interactions.",
              "Built and ran Node.js scripts and a simple Express server, managing npm packages, environment variables, and the file system.",
              "Learned blockchain foundations from real classroom instruction — nodes, blocks, block explorers, cryptographic hashing, and Proof of Work vs. Proof of Stake consensus — plus the real Bitcoin and Ethereum histories, from the Bitcoin whitepaper and genesis block through the DAO attack and the Merge.",
              "Wrote Solidity smart contracts from first principles — pragma, contracts, the constructor, state variables, the view keyword, control flow, mappings, arrays, structs, enums, function modifiers (onlyOwner access control), and events — and compiled/deployed them to a test network using Remix, Foundry, and Hardhat.",
              "Built and deployed ERC-20 (transfer/approve/transferFrom, mint/burn) and ERC-721 NFT contracts, including a version built on OpenZeppelin's audited base contracts.",
              "Studied a real smart contract exploit hands-on — wrote a vulnerable contract, exploited its reentrancy bug, and fixed it with the checks-effects-interactions pattern and a reentrancy guard modifier, the same vulnerability behind the 2016 DAO attack.",
              "Built the off-chain half of a dApp: read chain data and sent transactions programmatically with ethers.js/viem, listened for on-chain events, indexed contract data into queryable GraphQL subgraphs with The Graph, integrated Chainlink price feeds, and implemented Sign-In With Ethereum with server-side signature verification.",
              "Went deeper into DeFi mechanics beyond basic token standards — constant-product AMMs and liquidity pools, impermanent loss, overcollateralized lending and liquidations, flash loans, staking/yield-farming incentive design, token vesting schedules, and on-chain DAO governance (voting, delegation, timelocks, multisig treasuries).",
              "Practiced rigorous contract testing beyond the happy path — fuzz testing and invariant testing with Foundry, fork testing against real mainnet state, and gas snapshot testing — and set up CI/CD for smart contracts with GitHub Actions, running Slither and Mythril static analysis and gating merges on test results.",
              "Practiced production deployment and operations: testnet deployment scripts and Etherscan contract verification, proxy/upgradeability patterns, multisig-controlled and multi-chain deployments, monitoring on-chain activity, incident response/pause mechanisms, and a mainnet launch checklist including audit timing and phased rollouts.",
              "Practiced the Agile/Scrum and SDLC fundamentals every engineering team runs on — sprints, user stories, Kanban boards, and Dev/QA/UAT/Production environments — plus version control with Git: repositories, commits, branches, remotes, and pull requests.",
              "Built three end-to-end capstone projects simulating real blockchain engineering work: a constant-product AMM liquidity pool, an ERC-721 NFT marketplace with royalty payouts and subgraph indexing, and a full DAO governance system with a governance token, timelock-controlled treasury, and Governor contract.",
            ],
          },
        ],
      },
      {
        heading: "Projects",
        entries: [
          {
            left: "Constant-Product AMM Liquidity Pool — Capstone Project 1",
            right: "2026",
            sub: "Lifting the Veil IT Academy, Blockchain Engineer Apprenticeship Program",
            bullets: [
              "Designed and built SimplePool, a two-token constant-product AMM liquidity pool contract (Solidity ^0.8.24, Hardhat 3) with addLiquidity, swapAforB/swapBforA, and removeLiquidity functions and a 0.3% swap fee, modeled on the mechanism behind Uniswap V2.",
              "Applied the checks-effects-interactions pattern to every state-changing function to block reentrancy, and documented a six-point security-review checklist (reentrancy, overflow/underflow, first-depositor division-by-zero, access control, slippage/front-running, rounding) directly in the project README.",
              "Wrote a three-layer test suite — hand-picked unit tests, a Foundry fuzz test validating the pool's constant-product invariant held across randomized swap amounts, and an invariant test confirming the pool's token balance never fell below its own reserve bookkeeping.",
              "Built a React frontend (wagmi, viem) reading live pool reserves and letting a connected wallet add liquidity, swap, and remove liquidity.",
              "Deployed both ERC-20 test tokens and the pool contract to the Sepolia testnet with a Hardhat Ignition deployment module, and verified the contracts on Etherscan so the source code is publicly checkable.",
            ],
          },
          {
            left: "ERC-721 NFT Marketplace — Capstone Project 2",
            right: "2026",
            sub: "Lifting the Veil IT Academy, Blockchain Engineer Apprenticeship Program",
            bullets: [
              "Designed and built SimpleNFTMarketplace, an approval-based listing contract (Solidity, OpenZeppelin IERC721/IERC2981/ReentrancyGuard) with listItem, buyItem, and cancelListing functions, mirroring the approval pattern used by OpenSea's Seaport rather than taking custody of listed NFTs.",
              "Implemented automatic ERC-2981 royalty payouts on every sale, reading each collection's own royaltyInfo and splitting proceeds between the royalty receiver and the seller in a single atomic transaction, with listing state deleted and the NFT transferred before any payment leaves the contract.",
              "Built a subgraph (schema.graphql + AssemblyScript mapping handlers) indexing the contract's Listed, Sale, and Cancelled events into queryable \"active listings\" and \"sales history\" data, since the marketplace contract itself has no on-chain way to list everything.",
              "Built a React frontend that connects a wallet, lists and buys NFTs, and reads listings from the subgraph's GraphQL endpoint rather than scanning the chain directly.",
            ],
          },
          {
            left: "DAO Governance System — Capstone Project 3",
            right: "2026",
            sub: "Lifting the Veil IT Academy, Blockchain Engineer Apprenticeship Program",
            bullets: [
              "Built a governance token (ERC20Votes + ERC20Permit on OpenZeppelin Contracts v5) with checkpointed voting power and delegation, so a holder's vote weight is locked in at a past block instead of read live.",
              "Built a TimelockController-controlled treasury with the Governor contract granted the proposer role, execution opened to any address once a proposal's mandatory delay passes, and the deployer's own admin role renounced so no standing backdoor remains.",
              "Built and wired a Governor contract to both the token and the timelock, and walked a full proposal through its real lifecycle — propose, vote, queue, and execute — on a local/test network.",
              "Documented every governance design decision (the timelock delay, the renounced admin role, open execution) in the project README for a reviewer to evaluate without asking in person.",
            ],
          },
        ],
      },
      {
        heading: "GitHub Portfolio",
        entries: [
          {
            left: "github.com/johndoe-biexample/blockchain-capstones",
            right: "2026",
            sub: "Public portfolio repository for the three capstone projects",
            bullets: [
              "Pinned the three capstone projects — the AMM liquidity pool, the NFT marketplace, and the DAO governance system — as GitHub's featured pinned repos, rather than a longer list of shallow tutorial follow-alongs.",
              "Wrote each project's README to a five-part structure: a one-sentence description, an architecture summary, the deployed and Etherscan-verified contract address linked directly to the block explorer, the real test commands and what they check, and the key design decisions a reviewer can't get from reading the code alone.",
              "Used Git and GitHub for version control throughout — repositories, commits, branches, remotes, and pull requests — with a .gitignore excluding local config and never committing a private key or RPC secret.",
              "Set up a GitHub Actions CI workflow (foundry-toolchain) running forge fmt --check, forge build --sizes, and the full fuzz/invariant test suite on every push and pull request.",
            ],
          },
        ],
      },
      {
        heading: "Education",
        entries: [{ left: "High School Diploma — Washington High School", right: "Atlanta, GA · 2020" }],
      },
    ],
  },
};
