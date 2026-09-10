// The full Blockchain Testing, DevOps & Deployment course outline. Only
// lessons with a contentDir + videoUrl are playable; everything else
// renders as "in production". Fills the deployment/hosting territory the
// original 54-lesson Blockchain Development course deliberately left out
// (no real classroom footage existed for it) — this is genuinely new
// material, not a relabeling of that course's missing chapter.

export type LessonMeta = {
  n: number;
  slug: string;
  title: string;
  contentDir?: string; // under content/blockchain-testing-devops/
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

export const BLOCKCHAIN_TESTING_DEVOPS_CHAPTERS: ChapterMeta[] = [
  {
    n: 1,
    title: "Testing Smart Contracts Rigorously",
    lessons: [
      L(1, "beyond-happy-path-tests", "Beyond Happy-Path Tests"),
      L(2, "fuzz-testing-with-foundry", "Fuzz Testing With Foundry"),
      L(3, "invariant-testing", "Invariant Testing"),
      L(4, "fork-testing-against-mainnet-state", "Fork Testing Against Mainnet State"),
      L(5, "gas-snapshot-testing", "Gas Snapshot Testing"),
      L(6, "test-coverage-and-what-it-doesnt-tell-you", "Test Coverage — & What It Doesn't Tell You"),
    ],
  },
  {
    n: 2,
    title: "CI/CD for Smart Contracts",
    lessons: [
      L(7, "why-contract-cicd-is-different", "Why Contract CI/CD Is Different"),
      L(8, "github-actions-for-foundry-hardhat-projects", "GitHub Actions for Foundry/Hardhat Projects"),
      L(9, "automated-linting-and-static-analysis", "Automated Linting & Static Analysis"),
      L(10, "running-slither-and-mythril-in-ci", "Running Slither & Mythril in CI"),
      L(11, "gating-merges-on-test-and-audit-results", "Gating Merges on Test & Audit Results"),
    ],
  },
  {
    n: 3,
    title: "Deployment Strategy",
    lessons: [
      L(12, "testnets-and-what-they-actually-prove", "Testnets & What They Actually Prove"),
      L(13, "deployment-scripts-with-foundry-hardhat", "Deployment Scripts With Foundry/Hardhat"),
      L(14, "verifying-contracts-on-block-explorers", "Verifying Contracts on Block Explorers"),
      L(15, "proxy-patterns-and-upgradeability", "Proxy Patterns & Upgradeability"),
      L(16, "multisig-controlled-deployments", "Multisig-Controlled Deployments"),
      L(17, "deploying-to-multiple-chains", "Deploying to Multiple Chains"),
    ],
  },
  {
    n: 4,
    title: "Hosting the Off-Chain Stack",
    lessons: [
      L(18, "hosting-a-frontend-for-a-dapp", "Hosting a Frontend for a dApp"),
      L(19, "containerizing-indexers-and-backend-services", "Containerizing Indexers & Backend Services"),
      L(20, "environment-and-secrets-management", "Environment & Secrets Management"),
      L(21, "choosing-rpc-and-infra-providers-for-production", "Choosing RPC & Infra Providers for Production"),
    ],
  },
  {
    n: 5,
    title: "Monitoring & Incident Response",
    lessons: [
      L(22, "monitoring-contract-and-protocol-health", "Monitoring Contract & Protocol Health"),
      L(23, "alerting-on-anomalous-on-chain-activity", "Alerting on Anomalous On-Chain Activity"),
      L(24, "incident-response-and-pause-mechanisms", "Incident Response & Pause Mechanisms"),
      L(25, "post-incident-communication-and-postmortems", "Post-Incident Communication & Postmortems"),
    ],
  },
  {
    n: 6,
    title: "Mainnet Launch",
    lessons: [
      L(26, "the-pre-launch-checklist", "The Pre-Launch Checklist"),
      L(27, "audit-timing-and-bug-bounties", "Audit Timing & Bug Bounties"),
      L(28, "phased-rollouts-and-value-caps", "Phased Rollouts & Value Caps"),
      L(29, "launch-day-runbook", "Launch-Day Runbook"),
    ],
  },
];
