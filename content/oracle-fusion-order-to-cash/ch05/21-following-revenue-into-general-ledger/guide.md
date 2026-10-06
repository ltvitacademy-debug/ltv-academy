# Following Revenue into General Ledger

The journal entries from lesson 20 exist inside Subledger Accounting, tied to SO-48217's specific transactions. They are not yet sitting in the General Ledger as postable journal entries a GL user could see on a trial balance. This lesson covers the last mechanical step: getting accounting out of Subledger Accounting and into the GL itself, the same transfer-and-posting process you were introduced to conceptually in the General Ledger and Accounts Receivable courses.

## What you'll learn

- The two-stage process that moves SLA accounting into the GL
- What "final accounting" means versus "draft" accounting
- How to find SO-48217's specific entries once they're posted
- Why this is the last stop in SO-48217's entire journey

## Create Accounting: the two stages

Getting from a Receivables transaction to a posted GL journal happens through the **Create Accounting** process, which runs in two stages:

1. **Create final accounting in Subledger Accounting.** This takes the draft accounting events (the invoice, the credit memo, the receipt application) and finalizes them into complete, balanced subledger journal entries, each one still tagged back to its originating transaction.
2. **Transfer to General Ledger and post.** The finalized subledger entries are transferred into GL as journal entries and posted, becoming part of the GL's balances for the period, visible in standard GL inquiries and reports like the trial balance.

These two stages can run together or be run separately depending on configuration — some organizations transfer and post immediately after creating final accounting; others transfer in a batch at defined intervals, which is one reason a transaction's accounting can be complete in Receivables before it's visible in GL.

## Draft vs. final

Before Create Accounting runs, an event can have **draft** accounting — a preview of what the entry would look like, useful for review, but not yet something that can post. Only **final** accounting is eligible to transfer and post to GL. This distinction matters because a consultant looking at "what did this transaction post as" needs to know whether they're looking at a draft preview or the final, posted result — they can look identical and still not be the same thing.

## Where SO-48217's entries land

Once Create Accounting runs for the invoice, credit memo, and receipt application, each one's finalized subledger entry transfers to GL and posts, landing in the receivable, revenue, and cash accounts defined by the chart of accounts you learned in the General Ledger course — the same chart of accounts every other course in this path ultimately feeds. From here, SO-48217 is fully reflected in the ledger: revenue recognized and later partly reversed, a receivable opened and fully cleared, and cash received, all visible on a standard trial balance for the period.

## Recap

Create Accounting finalizes draft subledger events into complete entries, then transfers and posts them into the General Ledger, where they become part of the period's balances. Draft accounting is a preview; only final accounting posts. SO-48217's entire accounting trail — invoice, credit memo, receipt — now sits in the same GL you set up earlier in this path. Next up, lesson 22: reconciling this entire order, end to end, to make sure everything actually ties together.
