# Lesson 2 — Gas Fees on Ethereum

**Chapter 4 · Ethereum & Smart Contracts · Lesson 2 of 2**

> Real classroom footage from the LTV Academy Blockchain Development course, taught by instructor Harris Lavine, reading directly from a real Investopedia article on screen.

## What you'll learn

- What "gas" actually is, and why Ethereum needs it at all
- How wei, gwei, and ether relate to each other
- The real formula used to calculate a gas fee
- Practical, real ways to avoid paying more than you have to

## Gas is the fee for computation, not just for sending data

**Gas** is the fee required to successfully conduct a transaction or
execute a smart contract on Ethereum. It's priced in tiny fractions of
ether called **gwei**, and it's paid to compensate the validators who
secure the network.

![The real Investopedia article on screen during class: "Understanding Gas in Ethereum," explaining that gas fees became partly a staking reward after the September 2022 proof-of-stake upgrade.](/courses/blockchain/ch04/02-gas-fees-on-ethereum/shot_understanding_gas.png)
*The actual source article referenced live in class, explaining how gas fees work since Ethereum's move to proof of stake.*

The exact price of gas is determined by **supply, demand, and network
capacity** at the moment of the transaction — the more people trying to
transact at once, the higher gas prices climb.

## From wei to ether: the real denominations

Ether breaks down into much smaller units, the same way a dollar breaks
into cents:

| Unit | Value in ETH |
|---|---|
| Ether (ETH) | 1 |
| Finney | 0.001 ETH |
| Gwei | 0.000000001 ETH (10⁻⁹) |
| Wei | 0.000000000000000001 ETH (10⁻¹⁸, the smallest unit) |

## The real gas fee formula

Since Ethereum's August 2021 update, gas fees are calculated as:

**Gas fee = units of gas used × (base fee + priority fee)**

- The **base fee** is a set fee for the transaction, determined by the
  network.
- The **priority fee** is a tip to the validator who processes your
  transaction — the higher the tip, the faster it's likely to be
  confirmed.

**Worked example from class**: sending 2 ETH that requires 2 units of gas,
with a base fee of 11 gwei and a tip of 3 gwei:

2 × (11 + 3) = 28 gwei in fees, added on top of the 2 ETH being sent.

## Proof of work vs. proof of stake, in one line

Ethereum originally ran on **proof of work**, like Bitcoin: miners solve a
complex mathematical problem with computing power and get rewarded for it.
After the September 2022 upgrade, Ethereum moved to **proof of stake**:
instead of solving a problem, validators lock up (stake) their ETH — for
example, 20 ETH — and are rewarded in ETH for validating the network.

## Avoiding high gas fees, for real

![The same article, further down: "Avoiding High Gas Fees" — the real, practical section referenced live in class.](/courses/blockchain/ch04/02-gas-fees-on-ethereum/shot_avoiding_high_fees.png)
*"Avoiding High Gas Fees" — the exact section shown on screen, including the Etherscan gas tracker mentioned below.*

Two real strategies covered in class:

1. **Time your transactions.** Choose times when the network isn't busy.
   **Etherscan** provides a gas tracker showing the day's high, low, and
   average gas fees, plus a Chrome extension to see gas prices in real
   time.
2. **Use Layer 2 solutions.** Taking activity off the main chain — onto a
   Layer 2 network — is one of the best ways to keep fees low.

Gas fees on Ethereum have ranged widely over time: under a few cents
before 2020, over $20 for long stretches after January 2020, and $5–$30
in the period after the Merge (when proof of stake was implemented) — the
Merge itself was never designed to lower fees directly, just to be one
piece of a larger set of upgrades aimed at eventually bringing them down.

## Key terms

| Term | Meaning |
|---|---|
| Gas | The fee required to execute a transaction or smart contract on Ethereum |
| Gwei | A billionth of an ether (10⁻⁹ ETH) — the unit gas prices are usually quoted in |
| Base fee / priority fee | The network-set fee plus an optional tip to the validator, together making up the gas fee |
| Proof of stake | Ethereum's current consensus mechanism, where validators stake ETH instead of mining |

## Check yourself

You've finished Chapter 4's first two lessons when you can explain, in
your own words, why a simple ETH transfer and a complex smart contract
call cost different amounts of gas — even though both are just
"transactions" on Ethereum.
