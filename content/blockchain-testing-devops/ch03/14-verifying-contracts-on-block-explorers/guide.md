# Lesson 14 — Verifying Contracts on Block Explorers

**Chapter 3 · Deployment Strategy · Lesson 14 of 29**

## What you'll learn

- What "verifying" a contract actually publishes, and why unverified bytecode is a trust problem for users
- The real `forge verify-contract` command syntax, including constructor arguments
- What Etherscan's own Verify & Publish form looks like, step by step, for a manual verification
- Why Advanced Configuration fields (optimizer settings, EVM version) have to match the actual deployment exactly

## What verification actually publishes

A deployed contract is just bytecode on-chain — unreadable to a human, and functionally a black box to any user deciding whether to trust it. **Verification** publishes three things alongside that already-deployed bytecode: the Solidity source itself, the exact compiler version and settings used, and any constructor arguments. Etherscan then recompiles the source with those exact settings and confirms the result matches the deployed bytecode byte-for-byte. Only after that match succeeds does Etherscan unlock the **Read Contract** and **Write Contract** tabs most users expect, and start decoding function calls and events on every transaction page instead of showing raw hex.

## Verifying from Foundry directly

`forge verify-contract` does this programmatically, usually right after (or as part of) the deploy script from Lesson 13:

```bash
forge verify-contract \
  --chain-id 11155111 \
  0xYourContractAddress \
  src/Vault.sol:Vault \
  --etherscan-api-key $ETHERSCAN_API_KEY \
  --constructor-args $(cast abi-encode "constructor(address,address)" $OWNER $FEE_RECIPIENT)
```

`--constructor-args` has to be the ABI-encoded version of whatever arguments the constructor actually received at deploy time — `cast abi-encode` produces that encoding so it matches exactly, since even a correct-looking but misformatted argument will fail the bytecode match.

## Verifying manually, through the UI

Sometimes you're verifying a contract you didn't deploy, or confirming what a CI-triggered verification actually submitted. Etherscan's own **Verify & Publish Contract Source Code** form walks through this in two steps — contract details, then source and settings:

![Etherscan's Verify & Publish Contract Source Code form, showing the contract address, compiler type, compiler version, and a pasted Solidity source file](/courses/blockchain-testing-devops/ch03/14-verifying-contracts-on-block-explorers/etherscan-verify-publish-form.png)

The **Advanced Configuration** section is where verification most often fails on a correct contract: Optimization (on/off), Runs, and EVM Version all have to match the actual values the contract was compiled and deployed with — not reasonable-looking defaults:

![Etherscan's Advanced Configuration panel, showing Optimization, Runs (Optimizer), EVM Version, and License Type fields, plus Constructor Arguments and Contract Library Address sections](/courses/blockchain-testing-devops/ch03/14-verifying-contracts-on-block-explorers/etherscan-advanced-configuration.png)

A successful verification confirms the match and exposes the compiled output — compiler version, optimization settings, the contract's ABI, and its bytecode, all now readable instead of opaque:

![Etherscan's successful verification result, showing compiler version, optimization settings, and the generated Contract ABI](/courses/blockchain-testing-devops/ch03/14-verifying-contracts-on-block-explorers/etherscan-verification-success.png)

## Key terms

| Term | Meaning |
|---|---|
| Verification | Publishing source + compiler settings + constructor args, matched byte-for-byte against deployed bytecode |
| `forge verify-contract` | Foundry's programmatic verification command |
| `cast abi-encode` | Produces the exact ABI encoding verification needs for constructor arguments |

## Check yourself

You're ready for Lesson 15 when you can explain, without looking: why does a mismatched Optimizer "Runs" value cause an otherwise-correct verification attempt to fail?
