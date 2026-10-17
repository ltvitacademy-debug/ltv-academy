// Generalized Hardhat Ignition deployment module template.
// Based on Lesson 7's SimplePoolDeployment pattern — swap in your own
// contract names and constructor arguments for whichever capstone
// project you're deploying.
//
// Usage:
//   hardhat keystore set <NETWORK>_RPC_URL
//   hardhat keystore set <NETWORK>_PRIVATE_KEY
//   hardhat ignition deploy ignition/modules/Deployment.ts --network <network>
//   npx hardhat verify --network <network> <DEPLOYED_ADDRESS> <CONSTRUCTOR_ARGS...>

import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

export default buildModule("ProjectDeployment", (m) => {
  // --- Example: deploy dependencies first, in the order the final
  // contract's constructor actually needs them. For Project 1
  // (SimplePool), that's the two tokens before the pool; for
  // Project 3 (DAO), that's the token, then the timelock, then the
  // Governor — see dao-deploy-and-handoff.ts for that specific,
  // ordered sequence instead of this generic template.

  // const dependencyA = m.contract("DependencyA", ["constructor", "args"]);
  // const dependencyB = m.contract("DependencyB", ["constructor", "args"]);

  // const mainContract = m.contract("YourContract", [dependencyA, dependencyB]);

  // return { dependencyA, dependencyB, mainContract };

  // Replace the above with your project's real contracts and
  // constructor arguments. m.contract() deploys in dependency order
  // and Ignition records every deployment under
  // ignition/deployments/chain-<id>/, so a failed or interrupted
  // deploy can resume rather than starting over.

  const mainContract = m.contract("YourContract", [
    /* constructor args */
  ]);

  return { mainContract };
});
