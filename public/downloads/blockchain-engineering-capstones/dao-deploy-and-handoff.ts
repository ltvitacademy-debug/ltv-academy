// DAO deployment & role-handoff script, matching Lesson 16's exact
// five-step order: token -> timelock -> Governor -> role grants ->
// deployer renounces admin. The renounce step is placed immediately
// after the role grants, not left as an optional cleanup step at the
// end, so it can't be accidentally skipped.
//
// Run with: npx hardhat run scripts/dao-deploy-and-handoff.ts --network <network>

import { ethers } from "hardhat";

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying from:", deployer.address);

  // --- Step 1: governance token ---
  const GovernanceToken = await ethers.getContractFactory("GovernanceToken");
  const token = await GovernanceToken.deploy(deployer.address, ethers.parseEther("1000000"));
  await token.waitForDeployment();
  console.log("GovernanceToken deployed:", await token.getAddress());

  // --- Step 2: timelock, deployer as TEMPORARY admin ---
  const MIN_DELAY = 2 * 24 * 60 * 60; // 2 days, in seconds -- tune per project
  const TreasuryTimelock = await ethers.getContractFactory("TreasuryTimelock");
  const timelock = await TreasuryTimelock.deploy(
    MIN_DELAY,
    [], // proposers granted in Step 4, not in the constructor
    [], // executors granted in Step 4
    deployer.address // temporary admin -- renounced in Step 5
  );
  await timelock.waitForDeployment();
  console.log("TreasuryTimelock deployed:", await timelock.getAddress());

  // --- Step 3: Governor, wired to the token and timelock ---
  const ProjectGovernor = await ethers.getContractFactory("ProjectGovernor");
  const governor = await ProjectGovernor.deploy(
    await token.getAddress(),
    await timelock.getAddress()
  );
  await governor.waitForDeployment();
  console.log("ProjectGovernor deployed:", await governor.getAddress());

  // --- Step 4: grant roles ---
  const proposerRole = await timelock.PROPOSER_ROLE();
  const executorRole = await timelock.EXECUTOR_ROLE();
  const adminRole = await timelock.DEFAULT_ADMIN_ROLE();

  await (await timelock.grantRole(proposerRole, await governor.getAddress())).wait();
  console.log("Granted PROPOSER_ROLE to Governor");

  await (await timelock.grantRole(executorRole, ethers.ZeroAddress)).wait();
  console.log("Granted EXECUTOR_ROLE to anyone (zero address)");

  // --- Step 5: renounce deployer's admin role -- THE STEP THAT MATTERS ---
  // Do not reorder this below any "optional" steps. A deployer that
  // keeps TIMELOCK_ADMIN_ROLE can grant itself proposer/executor at
  // any time and bypass the vote entirely -- see Lesson 15.
  await (await timelock.renounceRole(adminRole, deployer.address)).wait();
  const stillAdmin = await timelock.hasRole(adminRole, deployer.address);
  if (stillAdmin) {
    throw new Error("Renounce failed -- deployer still holds TIMELOCK_ADMIN_ROLE. Do not proceed.");
  }
  console.log("Deployer admin role renounced. Hand-off complete:", !stillAdmin);

  console.log("\nDeployment summary:");
  console.log("  GovernanceToken:", await token.getAddress());
  console.log("  TreasuryTimelock:", await timelock.getAddress());
  console.log("  ProjectGovernor:", await governor.getAddress());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
