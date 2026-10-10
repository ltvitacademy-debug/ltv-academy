# Lesson 14 — ERP and Financial System Integration

**Chapter 3 · Integration and Platform Architecture · Lesson 14 of 33**

## What you'll learn

- The full Meridian ERP integration design: what syncs in real time versus overnight, and why
- The full LedgerPoint integration design, built entirely around its batch-only constraint
- Why LedgerPoint's design is not a compromise to be apologized for, but the correct answer given the constraint
- How idempotency and reconciliation keep both integrations trustworthy over time

## Meridian ERP: two integration paths for two different needs

Meridian ERP integration splits into two distinct paths, because "sync with Meridian" actually means two different things with two different freshness requirements. **Order creation** is synchronous: when a sales rep or a dealer (through the portal) places an order, Salesforce makes a REST callout to Meridian through the integration hub established in Lesson 13, and Meridian's response — confirmed or rejected, with an order number — comes back within the same transaction, because a rep or dealer genuinely needs to know right away whether an order went through. **Product and inventory sync**, by contrast, runs as a nightly Bulk API batch job pulling Meridian's current product catalog and inventory levels into Salesforce's replicated Product2 records — this doesn't need to be real-time, because a sales rep deciding whether to quote a product doesn't need inventory numbers accurate to the second, and running it as a scheduled batch job is dramatically cheaper and more predictable than trying to keep every inventory field live.

Both directions use **Named Credentials** to manage the authentication to Meridian's endpoints centrally rather than scattering credentials through individual pieces of integration code, and the synchronous order-creation path is built to be **idempotent** — if a network timeout causes a retry, resubmitting the same order doesn't create a duplicate in Meridian, because the callout includes an order-reference ID Meridian checks before processing.

## LedgerPoint: designed entirely around a constraint, not despite it

LedgerPoint's integration looks completely different, because LedgerPoint itself is completely different: no API, mainframe-based, batch-file-only. The design doesn't try to disguise this as anything other than what it is. Each night, Salesforce's integration hub generates a flat file of the day's AR-relevant activity (new invoices referenced, payment confirmations recorded) and delivers it to LedgerPoint via SFTP on a scheduled window; LedgerPoint processes its own batch cycle on its own schedule and returns a corresponding flat file with updated AR/invoice status, which the hub ingests and uses to update the **summarized** AR/invoice-status fields on the relevant Account — never the full ledger detail, per Lesson 8's ownership map. A **reconciliation step** runs after each batch cycle, comparing record counts and key totals between what Salesforce sent and what LedgerPoint acknowledged, specifically so a silently dropped or malformed record in the file transfer gets caught quickly rather than discovered weeks later when a customer disputes a balance.

## Why this is the correct design, not a compromise

It would be easy to present LedgerPoint's batch-only integration apologetically, as something the team settled for because they ran out of budget to "fix" LedgerPoint. That framing is wrong, and saying so clearly is good architecture practice: LedgerPoint has no API to integrate with in real time, full stop, and a project to add one would mean modernizing core financial infrastructure LTV Global has explicitly decided not to touch in this transformation (Lesson 2's constraint). Given that constraint, nightly batch with reconciliation is not a lesser version of the "right" answer — it is the right answer, engineered carefully (idempotency on the Meridian side, reconciliation on the LedgerPoint side) rather than left to chance.

## Setting the NFR expectation

Because financial visibility through Salesforce will always lag LedgerPoint's own batch cycle by up to one business day, Lesson 17's nonfunctional requirements formally document this as an accepted tolerance window — a rep or finance user seeing "AR status as of last night's batch" is working exactly as designed, not experiencing a bug.

## Key terms

| Term | Meaning |
|---|---|
| Named Credential | A Salesforce feature centralizing authentication details for an external endpoint |
| Idempotent | A property of an operation where retrying it with the same reference doesn't create a duplicate result |
| Reconciliation | Comparing two sides of a batch transfer after the fact to catch dropped or malformed records |
| Batch tolerance window | An accepted, documented delay between when data changes in one system and when it's reflected in another |

## Lab

The CFO (Lesson 3's most conservative stakeholder about LedgerPoint) asks: "Why can't we just get LedgerPoint integration working in real time like Meridian's order sync?" Using this lesson's reasoning, write a three- or four-sentence answer that respects the question without apologizing for the design — explain the actual constraint, and why nightly batch with reconciliation is the correct engineered answer rather than a shortcut.

## Check yourself

Can you explain, in your own words, why Meridian's order-creation path is synchronous while its product/inventory sync is batch, even though both connect to the same system? Can you describe what reconciliation catches in the LedgerPoint integration, and why it runs after every batch cycle rather than only when someone reports a problem?
