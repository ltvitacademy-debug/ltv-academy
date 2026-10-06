# Aging Reports

Every tool in this chapter — collections, dunning, write-offs — depends on knowing, precisely, how overdue a balance is. The **aging report** is where that precision comes from: it buckets every open transaction by how many days past due it is, giving a shape to the AR portfolio that a simple list of balances never could. This lesson closes out Chapter 6 by covering how aging buckets work and the standard aging report options Oracle Fusion provides.

## What you'll learn

- What an aging bucket is and how transactions are sorted into one
- The difference between a 4-bucket and a 7-bucket aging report
- Aging by common currency versus aging by collector
- How aging drives both dunning and write-off decisions

## What an aging bucket is

An aging bucket is a range of days past due — "current," "1-30 days," "31-60 days," and so on — and every open transaction gets sorted into exactly one bucket based on how many days have passed since its due date. A transaction not yet due sits in the "current" bucket; a transaction 45 days past its due date sits in the "31-60" bucket (in a report using that bucket width). The total dollar amount in each bucket, across every customer or for one specific customer, gives a fast visual read on how much of the company's receivables are current versus how much is aging into risk.

## 4-bucket versus 7-bucket aging

Oracle Fusion provides more than one predefined aging report, differing mainly in how finely the buckets are sliced:

- A **4-bucket aging report** uses four, broader ranges — useful for a quick, high-level view of overall portfolio health.
- A **7-bucket aging report** slices the same balances into seven, narrower ranges — useful for a collections team that wants to distinguish a transaction that's barely 31 days overdue from one that's 89 days overdue, since those two situations call for very different responses even though a 4-bucket report might lump them into the same wide range.

The right choice depends on the audience: a CFO glancing at overall AR health might prefer the simpler 4-bucket view, while a collector working accounts day to day wants the finer 7-bucket granularity.

## Aging by common currency and by collector

Two more report variants matter in practice:

- **Aging by common currency** converts every transaction's balance into a single reporting currency, so a company with customers invoiced in multiple currencies can still see one unified total per bucket, rather than a confusing mix of currency symbols.
- **Aging by collector** organizes the same bucketed data by which collector is assigned to each customer, so a collections manager can see each team member's portfolio and workload at a glance, rather than one undifferentiated company-wide list.

## How aging drives decisions downstream

Aging isn't just a report that gets filed away — it is the direct input to the two processes covered earlier in this chapter. Dunning level escalation (lesson 32) is frequently driven by which aging bucket a transaction has fallen into. Write-off decisions (lesson 31) typically require evidence that collections has exhausted its options, which usually means showing the transaction has aged well past the final dunning stage with no response. Aging reports are the evidence trail behind both.

## Recap

An aging report buckets open transactions by days past due, available in 4-bucket and 7-bucket versions depending on how much granularity the audience needs, with variants for a single common currency or organized by collector. Aging data is the direct driver behind dunning escalation and the evidence supporting a write-off decision. That wraps up Chapter 6. Next up, Chapter 7: Accounting, Reconciliation and Close, starting with lesson 35, accounting for receivables transactions.
