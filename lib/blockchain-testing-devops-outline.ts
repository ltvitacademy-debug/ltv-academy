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
      L(1, "beyond-happy-path-tests", "Beyond Happy-Path Tests", { contentDir: "ch01/01-beyond-happy-path-tests", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792425972/ltv-blockchain-testing-devops/beyond-happy-path-tests.mp4", durationLabel: "1 min 54 s" }),
      L(2, "fuzz-testing-with-foundry", "Fuzz Testing With Foundry", { contentDir: "ch01/02-fuzz-testing-with-foundry", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792426608/ltv-blockchain-testing-devops/fuzz-testing-with-foundry.mp4", durationLabel: "1 min 48 s" }),
      L(3, "invariant-testing", "Invariant Testing", { contentDir: "ch01/03-invariant-testing", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792427417/ltv-blockchain-testing-devops/invariant-testing.mp4", durationLabel: "1 min 46 s" }),
      L(4, "fork-testing-against-mainnet-state", "Fork Testing Against Mainnet State", { contentDir: "ch01/04-fork-testing-against-mainnet-state", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792428067/ltv-blockchain-testing-devops/fork-testing-against-mainnet-state.mp4", durationLabel: "1 min 45 s" }),
      L(5, "gas-snapshot-testing", "Gas Snapshot Testing", { contentDir: "ch01/05-gas-snapshot-testing", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792428698/ltv-blockchain-testing-devops/gas-snapshot-testing.mp4", durationLabel: "1 min 46 s" }),
      L(6, "test-coverage-and-what-it-doesnt-tell-you", "Test Coverage — & What It Doesn't Tell You", { contentDir: "ch01/06-test-coverage-and-what-it-doesnt-tell-you", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792429325/ltv-blockchain-testing-devops/test-coverage-and-what-it-doesnt-tell-you.mp4", durationLabel: "1 min 59 s" }),
    ],
  },
  {
    n: 2,
    title: "CI/CD for Smart Contracts",
    lessons: [
      L(7, "why-contract-cicd-is-different", "Why Contract CI/CD Is Different", { contentDir: "ch02/07-why-contract-cicd-is-different", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792430177/ltv-blockchain-testing-devops/why-contract-cicd-is-different.mp4", durationLabel: "1 min 22 s" }),
      L(8, "github-actions-for-foundry-hardhat-projects", "GitHub Actions for Foundry/Hardhat Projects", { contentDir: "ch02/08-github-actions-for-foundry-hardhat-projects", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792430607/ltv-blockchain-testing-devops/github-actions-for-foundry-hardhat-projects.mp4", durationLabel: "1 min 18 s" }),
      L(9, "automated-linting-and-static-analysis", "Automated Linting & Static Analysis", { contentDir: "ch02/09-automated-linting-and-static-analysis", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792430956/ltv-blockchain-testing-devops/automated-linting-and-static-analysis.mp4", durationLabel: "1 min 13 s" }),
      L(10, "running-slither-and-mythril-in-ci", "Running Slither & Mythril in CI", { contentDir: "ch02/10-running-slither-and-mythril-in-ci", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792431238/ltv-blockchain-testing-devops/running-slither-and-mythril-in-ci.mp4", durationLabel: "1 min 12 s" }),
      L(11, "gating-merges-on-test-and-audit-results", "Gating Merges on Test & Audit Results", { contentDir: "ch02/11-gating-merges-on-test-and-audit-results", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792431566/ltv-blockchain-testing-devops/gating-merges-on-test-and-audit-results.mp4", durationLabel: "1 min 20 s" }),
    ],
  },
  {
    n: 3,
    title: "Deployment Strategy",
    lessons: [
      L(12, "testnets-and-what-they-actually-prove", "Testnets & What They Actually Prove", { contentDir: "ch03/12-testnets-and-what-they-actually-prove", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792431898/ltv-blockchain-testing-devops/testnets-and-what-they-actually-prove.mp4", durationLabel: "1 min 13 s" }),
      L(13, "deployment-scripts-with-foundry-hardhat", "Deployment Scripts With Foundry/Hardhat", { contentDir: "ch03/13-deployment-scripts-with-foundry-hardhat", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792432185/ltv-blockchain-testing-devops/deployment-scripts-with-foundry-hardhat.mp4", durationLabel: "1 min 12 s" }),
      L(14, "verifying-contracts-on-block-explorers", "Verifying Contracts on Block Explorers", { contentDir: "ch03/14-verifying-contracts-on-block-explorers", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792432460/ltv-blockchain-testing-devops/verifying-contracts-on-block-explorers.mp4", durationLabel: "1 min 17 s" }),
      L(15, "proxy-patterns-and-upgradeability", "Proxy Patterns & Upgradeability", { contentDir: "ch03/15-proxy-patterns-and-upgradeability", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792432705/ltv-blockchain-testing-devops/proxy-patterns-and-upgradeability.mp4", durationLabel: "1 min 17 s" }),
      L(16, "multisig-controlled-deployments", "Multisig-Controlled Deployments", { contentDir: "ch03/16-multisig-controlled-deployments", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792432941/ltv-blockchain-testing-devops/multisig-controlled-deployments.mp4", durationLabel: "1 min 10 s" }),
      L(17, "deploying-to-multiple-chains", "Deploying to Multiple Chains", { contentDir: "ch03/17-deploying-to-multiple-chains", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792433145/ltv-blockchain-testing-devops/deploying-to-multiple-chains.mp4", durationLabel: "1 min 17 s" }),
    ],
  },
  {
    n: 4,
    title: "Hosting the Off-Chain Stack",
    lessons: [
      L(18, "hosting-a-frontend-for-a-dapp", "Hosting a Frontend for a dApp", { contentDir: "ch04/18-hosting-a-frontend-for-a-dapp", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792433364/ltv-blockchain-testing-devops/hosting-a-frontend-for-a-dapp.mp4", durationLabel: "1 min 36 s" }),
      L(19, "containerizing-indexers-and-backend-services", "Containerizing Indexers & Backend Services", { contentDir: "ch04/19-containerizing-indexers-and-backend-services", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792433582/ltv-blockchain-testing-devops/containerizing-indexers-and-backend-services.mp4", durationLabel: "1 min 37 s" }),
      L(20, "environment-and-secrets-management", "Environment & Secrets Management", { contentDir: "ch04/20-environment-and-secrets-management", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792433759/ltv-blockchain-testing-devops/environment-and-secrets-management.mp4", durationLabel: "1 min 46 s" }),
      L(21, "choosing-rpc-and-infra-providers-for-production", "Choosing RPC & Infra Providers for Production", { contentDir: "ch04/21-choosing-rpc-and-infra-providers-for-production", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792433932/ltv-blockchain-testing-devops/choosing-rpc-and-infra-providers-for-production.mp4", durationLabel: "1 min 38 s" }),
    ],
  },
  {
    n: 5,
    title: "Monitoring & Incident Response",
    lessons: [
      L(22, "monitoring-contract-and-protocol-health", "Monitoring Contract & Protocol Health", { contentDir: "ch05/22-monitoring-contract-and-protocol-health", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792434093/ltv-blockchain-testing-devops/monitoring-contract-and-protocol-health.mp4", durationLabel: "1 min 44 s" }),
      L(23, "alerting-on-anomalous-on-chain-activity", "Alerting on Anomalous On-Chain Activity", { contentDir: "ch05/23-alerting-on-anomalous-on-chain-activity", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792434264/ltv-blockchain-testing-devops/alerting-on-anomalous-on-chain-activity.mp4", durationLabel: "1 min 36 s" }),
      L(24, "incident-response-and-pause-mechanisms", "Incident Response & Pause Mechanisms", { contentDir: "ch05/24-incident-response-and-pause-mechanisms", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792434442/ltv-blockchain-testing-devops/incident-response-and-pause-mechanisms.mp4", durationLabel: "1 min 50 s" }),
      L(25, "post-incident-communication-and-postmortems", "Post-Incident Communication & Postmortems", { contentDir: "ch05/25-post-incident-communication-and-postmortems", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792434616/ltv-blockchain-testing-devops/post-incident-communication-and-postmortems.mp4", durationLabel: "1 min 47 s" }),
    ],
  },
  {
    n: 6,
    title: "Mainnet Launch",
    lessons: [
      L(26, "the-pre-launch-checklist", "The Pre-Launch Checklist", { contentDir: "ch06/26-the-pre-launch-checklist", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792434769/ltv-blockchain-testing-devops/the-pre-launch-checklist.mp4", durationLabel: "1 min 54 s" }),
      L(27, "audit-timing-and-bug-bounties", "Audit Timing & Bug Bounties", { contentDir: "ch06/27-audit-timing-and-bug-bounties", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792434913/ltv-blockchain-testing-devops/audit-timing-and-bug-bounties.mp4", durationLabel: "1 min 40 s" }),
      L(28, "phased-rollouts-and-value-caps", "Phased Rollouts & Value Caps", { contentDir: "ch06/28-phased-rollouts-and-value-caps", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792435036/ltv-blockchain-testing-devops/phased-rollouts-and-value-caps.mp4", durationLabel: "1 min 44 s" }),
      L(29, "launch-day-runbook", "Launch-Day Runbook", { contentDir: "ch06/29-launch-day-runbook", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792435215/ltv-blockchain-testing-devops/launch-day-runbook.mp4", durationLabel: "2 min 7 s" }),
    ],
  },
];
