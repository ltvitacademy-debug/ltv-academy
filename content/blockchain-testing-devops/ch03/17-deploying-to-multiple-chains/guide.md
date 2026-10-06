# Lesson 17 — Deploying to Multiple Chains

**Chapter 3 · Deployment Strategy · Lesson 17 of 29**

## What you'll learn

- Why a contract's address can differ across chains unless you deliberately prevent that
- How `CREATE2` and a deterministic deployer produce the *same* address on every chain
- How to structure a GitHub Actions matrix job that deploys the same contract to several networks
- Why Lesson 16's multisig discipline has to be repeated per chain, not done once

## The same bytecode, a different address

A contract deployed with plain `CREATE` gets an address derived from the deployer's address and its transaction nonce. If that nonce differs across chains — which it will, the moment transaction history on each chain diverges even slightly — the *same* contract ends up at *different* addresses on each chain. For a protocol users interact with across multiple networks, that's a real usability and security problem: there's no single address to point a frontend, an integration, or a block explorer bookmark at.

## CREATE2: a deterministic address

`CREATE2` derives an address from the deployer, a **salt**, and the contract's init code — not the nonce. Deploy with the same deployer, same salt, and same bytecode on two different chains, and you get the **same address** on both, even though the deployments are entirely separate transactions on separate networks:

```solidity
bytes32 salt = keccak256("vault-v1-deployment");
address predicted = vm.computeCreate2Address(salt, keccak256(type(Vault).creationCode));

Vault vault = new Vault{salt: salt}(owner, feeRecipient);
assert(address(vault) == predicted);
```

Most teams use a shared **deterministic deployment proxy** (a well-known factory contract already deployed at the same address on most EVM chains) rather than relying on raw `CREATE2` directly, specifically so the predicted address stays consistent without each team reinventing the factory.

## A matrix job for multiple chains

GitHub Actions' `strategy.matrix` runs the same job once per entry in a list — exactly the shape a multi-chain deploy needs:

```yaml
jobs:
  deploy:
    strategy:
      matrix:
        network: [sepolia, base-sepolia, arbitrum-sepolia]
    runs-on: ubuntu-latest
    steps:
      - uses: foundry-rs/foundry-toolchain@v1
      - name: Deploy to ${{ matrix.network }}
        run: |
          forge script script/Deploy.s.sol \
            --broadcast --rpc-url ${{ matrix.network }} \
            --verify --etherscan-api-key ${{ secrets[format('ETHERSCAN_KEY_{0}', matrix.network)] }}
```

Each matrix entry runs as its own isolated job, in parallel, against its own named RPC endpoint from Lesson 13's `[rpc_endpoints]` table — one failed chain doesn't block or corrupt the others' deployments.

## Multisig discipline, per chain

Lesson 16's Safe-controlled deployment doesn't collapse into "one approval for every chain" — a Safe account is itself deployed per-chain (though, with `CREATE2`, it can share the same address across chains too), and each chain's deployment transaction needs its own confirmations from that chain's Safe. A team deploying to five chains is running Lesson 16's propose-and-confirm flow five separate times, not once.

## Key terms

| Term | Meaning |
|---|---|
| `CREATE2` | Deploys to an address derived from deployer + salt + init code, not the nonce |
| Deterministic deployment proxy | A shared factory contract that makes CREATE2 addresses consistent without custom tooling |
| `strategy.matrix` | GitHub Actions construct that runs a job once per list entry, in parallel |

## Check yourself

You've completed Chapters 1-3 when you can explain, without looking: why does deploying with plain `CREATE` risk a different contract address on each chain, while `CREATE2` doesn't?
