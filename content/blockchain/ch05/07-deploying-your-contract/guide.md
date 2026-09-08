# Lesson 7 — Deploying Your Contract to a Test Network

**Chapter 5 · Solidity Programming · Lesson 7 of 8**

> Real classroom footage from the LTV Academy Blockchain Development course, taught by instructor Harris Lavine, live-deploying the actual "Hello" contract in Remix.

## What you'll learn

- The real, complete flow: write → compile → deploy → interact
- Why this course deploys to a test network instead of the real Ethereum mainnet
- What a contract address actually is, and where to find it after deploying

## The complete real flow, one more time

By this point in class, the instructor had already written and compiled
the `Hello` contract from the previous lesson. What's new here is the
final, real step: **deploying** it.

![The real Remix "Deploy & Run Transactions" panel, with the actual compiled Hello contract loaded and ready to deploy.](/courses/blockchain/ch05/07-deploying-your-contract/shot_deploy_button.png)
*The real Deploy & Run Transactions panel in Remix — the compiled contract, selected and ready.*

1. **Name** your contract, in the file explorer.
2. **Write** your code.
3. **Compile** it — press Compile, and Remix converts your Solidity into
   bytecode the EVM can run.
4. **Deploy** it — select your contract in the Deploy & Run panel, and
   press **Deploy**.

## Test network vs. mainnet: a real, concrete difference

There are two real places you can deploy a contract:

- **A test network** — costs **no gas, no real money**. This is what
  the class actually used.
- **The main Ethereum network (mainnet)** — costs **real gas**, paid in
  real ETH, every time you deploy.

For learning, practicing, and testing your code, a test network is the
obvious real choice — you get the exact same deployment experience
without spending a cent.

## What actually happens when you deploy

![The real "Deployed Contracts" panel in Remix, showing the actual Hello contract now live at its own address after a real deployment.](/courses/blockchain/ch05/07-deploying-your-contract/shot_deployed_contract.png)
*The real result of pressing Deploy: a green checkmark, real transaction data, and the contract's own address.*

After pressing Deploy, Remix shows a **green checkmark** and real
transaction data — including exactly how much gas the deployment cost.
Under **Deployed Contracts**, your contract now appears at its own real
**contract address** — you can expand it to interact with every
variable and function it contains.

## Key terms

| Term | Meaning |
|---|---|
| Deploy | Publishing your compiled contract to a blockchain, making it live |
| Test network | A practice blockchain that costs no real gas to deploy or use |
| Contract address | The unique on-chain location your deployed contract lives at |

## Check yourself

Before moving to the next lesson, make sure you can explain, in your own
words, why a developer would always test on a test network before ever
deploying to Ethereum's real mainnet.
