# Manual Reconciliation

Automatic reconciliation (Lesson 10) handles the routine cases. Manual reconciliation is where a human steps in — either because an account's volume doesn't justify automated rules at all, or because automatic reconciliation left exceptions behind. This lesson covers how manual reconciliation actually works.

## What you'll learn

- When manual reconciliation is the right primary approach, versus a cleanup step after automatic reconciliation
- How a Cash Manager manually matches a statement line to a transaction
- The account-level tolerance rule available during manual reconciliation
- Creating a transaction on the fly during manual reconciliation

## When manual reconciliation is the right fit

Manual reconciliation is "ideally suited to reconciling bank accounts that have a small volume of monthly transactions" — a petty cash account, a rarely-used escrow account, or a small subsidiary's operating account might only see a handful of transactions a month, where setting up and maintaining matching rules isn't worth the effort. For these accounts, a Cash Manager simply works through the statement lines directly.

Manual reconciliation is also where every account ends up, high-volume or not, for the exceptions automatic reconciliation couldn't resolve — so even on an account mostly handled automatically, this is a skill every Cash Manager needs.

## How it works

A Cash Manager working manually sees the unreconciled statement lines on one side and the open system transactions on the other, and selects the pair (or group) that actually represents the same event, then confirms the match. Unlike automatic reconciliation, a human can use judgment that a rule can't easily encode — recognizing, for example, that a statement line referencing "INV 44821-B" is clearly the same payment as a system transaction for invoice 44821 even though the reference format doesn't match character-for-character.

## Tolerance during manual reconciliation

A **tolerance rule can be assigned directly to a bank account** for use during manual reconciliation, separate from the tolerance rules associated with automatic matching rules covered in Lesson 9. This gives the Cash Manager the same kind of "close enough" latitude — a small dollar or percentage variance — when manually confirming a match, without requiring that tolerance to be embedded in an automatic matching rule.

## Creating a transaction on the fly

Sometimes a statement line genuinely has no system counterpart to match — a bank fee, interest earned, or a miscellaneous charge the bank applied that was never going to be recorded anywhere else first. During manual reconciliation, a Cash Manager can create the missing **external transaction** directly, rather than leaving the line stuck. (Lesson 15 covers external transactions in full; for now, just note that manual reconciliation is one of the places they commonly get created.)

## A worked example

Of the 20 exception lines from Harborview Metals Inc.'s nightly run in Lesson 10, the Treasury team reviews each one the next morning. Twelve are bank charges with no system counterpart — the team creates external transactions for each, directly from the reconciliation screen. Six are receipts that posted to Receivables overnight and simply weren't available at the time automatic reconciliation ran — those match cleanly now. The remaining two need a judgment call: a statement line for $4,998.00 against a system receipt for $5,000.00, outside the account's $0.02 automatic tolerance but close enough, with an attached remittance advice, that the Cash Manager manually confirms it's the same payment, short by a $2.00 bank-deducted wire fee.

## Key terms

| Term | Meaning |
|---|---|
| Manual reconciliation | Human-performed matching of statement lines to system transactions |
| Account-level tolerance rule | A tolerance assigned directly to a bank account, used during manual reconciliation |

## Recap

Manual reconciliation suits low-volume accounts as a primary approach, and serves every account as the cleanup step for automatic reconciliation's exceptions. A Cash Manager can apply judgment, use an account-level tolerance rule, and create missing transactions on the fly. Next up, lesson 12: the specifics of reconciling Payables payments and Receivables receipts.
