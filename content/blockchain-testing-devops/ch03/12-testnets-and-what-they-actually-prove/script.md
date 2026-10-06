# Script — Testnets & What They Actually Prove

## Segment 1 (title)

Sepolia is Ethereum's current recommended testnet for application and contract testing. Hoodi handles staking and protocol-level testing. Testnet ETH has zero value — and that's exactly what makes testnets both useful and misleading.

## Segment 2 (steps: what a clean deployment proves)

A clean testnet deployment proves the mechanics work: the deploy script's constructor arguments and ordering, the bytecode fitting under the size limit, basic integration with testnet infrastructure, gas estimation logic not crashing.

## Segment 3 (code: what it doesn't prove)

What it doesn't prove: no real economic incentive to attack it, no real liquidity depth, no real gas market congestion, no MEV pressure. Testnets see none of the adversarial conditions a mainnet contract holding real funds actually faces.

## Segment 4 (the mental model)

Treat a testnet deployment as proof the mechanics work, not proof the economics are safe. That distinction is exactly why later lessons add a pre-launch checklist and phased rollouts with value caps.

## Segment 5 (outro)

Testnets prove the script and the bytecode work. Lesson 13 builds that deployment script for real, with Foundry and Hardhat's actual syntax.
