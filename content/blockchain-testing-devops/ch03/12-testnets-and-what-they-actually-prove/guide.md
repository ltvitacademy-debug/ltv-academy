# Lesson 12 — Testnets & What They Actually Prove

**Chapter 3 · Deployment Strategy · Lesson 12 of 29**

## What you'll learn

- Which Ethereum testnets are actually current, and what each one is for
- What a successful testnet deployment genuinely proves about your contract and deploy script
- What it does *not* prove, no matter how clean the run looked
- Why testnet ETH having zero value is exactly the property that makes testnets both useful and misleading

## The current testnets, and what each is for

Goerli was deprecated in 2024. As of this course, **Sepolia** is Ethereum's recommended testnet for application and smart contract testing — it's what Chapter 1's fork testing and this chapter's deployment scripts target by default. (Sepolia itself has an announced end-of-life around September 2026, with a successor testnet planned to run in parallel during a migration window — check current Ethereum Foundation guidance before a long-lived project commits to one.) **Hoodi** replaced the now-defunct Holesky as the testnet for staking, validator, and protocol-level testing — not typically where an application contract gets deployed.

## What a clean testnet deployment actually proves

A contract that deploys successfully to Sepolia and behaves correctly there has proven real things:

- The deployment script itself works — constructor arguments are correct, deployment ordering is right, any post-deploy initialization calls succeed
- The contract's bytecode fits under the 24KB size limit and actually deploys without reverting
- Basic integration with testnet versions of common infrastructure (a testnet Chainlink feed, a testnet Uniswap pool) behaves as expected
- The deploy script's gas estimation logic doesn't crash or produce nonsense numbers

That's a meaningful checkpoint — Lesson 13's deployment scripts get battle-tested here before they ever touch mainnet.

## What it does not prove

Testnet ETH has no value. That's exactly the property that makes a testnet safe to experiment on — and exactly why it can't prove anything about what happens once real value is involved:

- **No real economic incentive to attack it.** An exploit against a testnet deployment costs an attacker nothing to attempt and gains them nothing real if it works — so testnets see none of the adversarial pressure a mainnet contract holding real funds actually faces.
- **No real liquidity depth.** A testnet DEX pool might have a few thousand dollars of notional testnet liquidity; mainnet pools your contract actually interacts with can have hundreds of millions. Slippage and price-impact behavior genuinely differs.
- **No real gas market congestion.** Testnet gas prices don't reflect mainnet's actual fee market under load — a deploy script that estimates gas fine on a quiet testnet can behave differently during real mainnet congestion.
- **No MEV pressure.** Testnets don't have the same searcher/builder ecosystem competing to extract value from transaction ordering, so a contract's MEV exposure is untested by a testnet deployment, full stop.

## The right mental model

Treat a testnet deployment as proof the *mechanics* work — the script, the bytecode, the basic integrations — not as proof the *economics* are safe. Chapter 3's later lessons (the pre-launch checklist, phased rollouts with value caps) exist specifically because testnet success was never meant to answer the economic-safety question.

## Key terms

| Term | Meaning |
|---|---|
| Sepolia | Ethereum's current recommended testnet for application/contract testing |
| Hoodi | Current testnet for staking/validator/protocol-level testing (replaced Holesky) |
| Mechanics vs. economics | What a testnet proves (the script/bytecode work) vs. what it can't (real adversarial and market conditions) |

## Check yourself

You're ready for Lesson 13 when you can explain, without looking: why does a flawless testnet deployment say nothing about whether a contract is safe from MEV or real adversarial attack?
