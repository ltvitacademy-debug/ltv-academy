# Lesson 27 — Audit Timing & Bug Bounties

**Chapter 6 · Mainnet Launch · Lesson 27 of 29**

## What you'll learn

- Why an audit and a bug bounty are different tools, not two names for the same thing
- What a competitive, time-boxed audit actually looks like in practice
- Why a bounty's payout size is a market signal, not just a generosity choice
- Why payouts are scaled as a percentage of funds at risk, specifically to beat the economics of exploiting

## Two tools, two clocks

Lesson 26's checklist deliberately left this out: a security audit and a bug bounty program. Both exist to find vulnerabilities before they cause real damage, but they're not interchangeable, and understanding when each one actually runs matters as much as having both.

- **A security audit is a fixed engagement.** A team of researchers reviews the code deeply, for a defined window, and delivers a report. Then it's over -- the audit doesn't keep watching the code after the engagement ends.
- **A bug bounty is an open-ended program.** It starts around launch and keeps running indefinitely, with no fixed end date, as long as the protocol is live.

Relying on only one leaves a gap: an audit alone has no coverage after launch, and a bounty alone has no guaranteed deep review before real funds are at risk.

## What a competitive audit looks like

![Code4rena's live audits board, showing contests in judging, reports in progress, and completed audits with their prize pools.](/courses/blockchain-testing-devops/ch06/27-audit-timing-and-bug-bounties/code4rena-audits-board.jpg)

Competitive audit platforms run audits as time-boxed contests: a fixed submission window, a fixed prize pool, and multiple independent researchers competing to find the same bugs in the same codebase before it ships. The deadline is real -- once the window closes, that round of scrutiny is done, which is exactly why Chapter 3's deployment discipline (multisig control, verified source) still matters after the audit ends.

## A live bounty market

![Immunefi's bug bounty explorer, listing active programs ranked by vault TVL and maximum bounty payout.](/courses/blockchain-testing-devops/ch06/27-audit-timing-and-bug-bounties/immunefi-bounty-explorer.jpg)

Once a protocol is live and running a bounty, it's competing for serious researcher attention against every other active bounty on the market -- 169 programs visible here, ranked by vault size and maximum payout. A bounty program isn't a formality; a maximum payout that's low relative to comparable protocols' programs simply attracts less serious scrutiny, the same way an underpriced job posting attracts fewer qualified applicants.

## Payouts scaled to actually beat exploiting

![Immunefi's severity-tiered reward structure for a real program, showing Critical, High, Medium, and Low payout tiers with a reward calculation based on funds at risk.](/courses/blockchain-testing-devops/ch06/27-audit-timing-and-bug-bounties/immunefi-severity-payouts.jpg)

The payout structure here isn't arbitrary: a Critical finding pays up to a quarter million dollars, calculated as a percentage of the funds directly at risk, up to a cap. That math is deliberate -- the whole point of a well-designed bounty is making responsible disclosure more profitable than exploiting the bug, for a rational researcher weighing both options.

## Key terms

| Term | Meaning |
|---|---|
| Security audit | A fixed-duration, deep code review engagement that ends with a report -- not an ongoing program |
| Bug bounty | An open-ended, continuously running program rewarding responsibly disclosed vulnerabilities after launch |
| Severity-tiered payout | A reward structure scaling payout to the severity of the finding, often as a percentage of funds at risk |

## Check yourself

You're ready for Lesson 28 when you can explain: why does relying on only an audit, or only a bug bounty, leave a coverage gap, and why are bounty payouts deliberately scaled as a percentage of funds at risk rather than a flat amount?
