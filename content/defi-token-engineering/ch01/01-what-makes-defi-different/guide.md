# Lesson 1 — What Makes DeFi Different

**Chapter 1 · DeFi Building Blocks · Lesson 1 of 30**

## What you'll learn

- The four properties that separate DeFi from traditional finance and from centralized crypto exchanges
- Why "your keys, your coins" is a mechanical fact, not a slogan
- What "trust-minimized" means, and why it isn't the same as "trustless"
- Where the real risk moves to once you remove the middleman

## Custodial vs. self-custodial

A bank, a brokerage, and a centralized exchange (Coinbase, Binance) all share
one structural feature: they hold your asset in an account they control, and
you hold a claim against them. If the company freezes withdrawals, goes
insolvent, or simply decides to block you, your claim is only as good as
their willingness and ability to honor it — FTX's collapse in 2022 made that
concrete for millions of users who "owned" assets that turned out to be
IOUs against an empty balance sheet.

A DeFi protocol is a set of smart contracts deployed on a public blockchain.
There is no account to open and no company holding your funds — your wallet
holds the asset directly, and you interact with the contract by signing a
transaction yourself. The contract can't freeze your wallet, require an
application, or decide you're not eligible. It can only do exactly what its
code says, to anyone who calls it.

```
Custodial / permissioned:              Self-custodial / permissionless:
- open an account, pass KYC            - connect a wallet you already hold
- the company holds the asset          - the contract never takes custody
- withdrawals can be paused/blocked    - any valid transaction executes
- you trust a company's solvency       - you trust public, auditable code
```

## The four pillars

| Pillar | What it means |
|---|---|
| Non-custodial | The protocol never takes control of your asset; you sign every transaction yourself |
| Permissionless | No application, approval, or geographic allowlist — anyone with a wallet can call the contract |
| Transparent | Every balance, trade, and line of code is on a public ledger, inspectable by anyone |
| Composable | Any contract can call any other contract, so protocols stack like building blocks (Lesson 3) |

## Trust-minimized, not trustless

"Trustless" is the marketing word; "trust-minimized" is the accurate one.
You still trust that the code has no critical bug, that the oracle feeding
it a price isn't manipulated, and that no admin key can drain the contract
overnight. DeFi doesn't eliminate trust — it relocates it from a company's
legal promises to a smart contract's actual, verifiable logic. That's a
real improvement (code doesn't change its mind), but it's not a guarantee:
audited protocols have still been exploited for hundreds of millions of
dollars. The rest of this course is about understanding exactly what you're
trusting when you use a lending pool or an AMM, so you can evaluate that
risk instead of taking "DeFi" as a synonym for "safe."

## Key terms

| Term | Meaning |
|---|---|
| Custodial | A third party holds the asset on your behalf |
| Self-custodial | You hold the asset directly; only your wallet's private key can move it |
| Permissionless | No approval process gates who can use the protocol |
| Trust-minimized | Trust is placed in public, verifiable code rather than a company's promises |
| Smart contract risk | The risk that a bug or exploit in the contract's code causes a loss |

## Check yourself

You're ready for Lesson 2 when you can explain, without looking: why does
"the protocol can't freeze your wallet" follow directly from being
non-custodial, rather than being a separate feature someone added?
