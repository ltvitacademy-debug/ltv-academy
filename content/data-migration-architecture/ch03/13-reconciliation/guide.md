# Lesson 13 — Reconciliation

**Chapter 3 · Proving and Cutting Over · Lesson 13 of 18**

## What you'll learn

- How reconciliation differs from validation, even though they sound similar
- How to use Bulk API 2.0's own success/failure result sets as a reconciliation tool
- What a reconciliation report actually needs to contain
- Why unresolved discrepancies have to block sign-off rather than just get logged

## Validation checks the load; reconciliation checks the whole picture

Lesson 12's validation asks "did this load do what it was supposed to do." **Reconciliation** asks a related but distinct question across the entire source-to-target picture: do the numbers actually add up end to end — records extracted, records loaded, records rejected, and records still outstanding — with every one of those accounted for, not just assumed. Validation is largely about correctness of what landed; reconciliation is about completeness and accountability for everything that was supposed to land, including the parts that didn't.

## Counting all the way through

A real reconciliation starts with the number of records extracted from the source for a given object, and then has to account for every one of them landing in exactly one of three buckets: successfully loaded, deliberately excluded by scope (and therefore expected to be missing, not a discrepancy), or rejected by the load and still needing resolution. The arithmetic has to close: extracted should equal loaded plus excluded plus rejected, with nothing left unaccounted for. A reconciliation that only reports "we loaded 48,200 of the 50,000 records we extracted" without explaining where the other 1,800 went isn't actually reconciliation — it's just an incomplete count.

## Using Bulk API 2.0's own result sets

This is where Bulk API 2.0 directly supports reconciliation rather than just performing the load: every ingest job gets a job Id, and once the job completes, Salesforce returns separate success and failure result sets — with per-record status and, for failures, the specific error reason for each rejected record. That failure result set is exactly the raw material a reconciliation report is built from: instead of guessing at why records didn't load, the job's own output tells you precisely which records failed and why (a required field left blank, a picklist value that didn't translate correctly, a relationship that pointed at a record that hadn't loaded yet). A practical benefit of this mechanism is that a job's failed-records result file can be corrected and re-processed on its own, rather than needing to re-run the entire original file from scratch.

## What a reconciliation report needs

A usable reconciliation report, built per object, states: the extracted count, the loaded count, the excluded-by-scope count (with the scope decision it traces back to), the rejected count broken down by specific failure reason (not just a single "failed" bucket), and the current resolution status of every rejected record — fixed and re-loaded, intentionally abandoned with a documented reason, or still open and unresolved. This is the artifact that turns "I think the load went fine" into a specific, defensible claim the architect can actually sign off on.

## Unresolved discrepancies block sign-off

The standard discipline around reconciliation is simple to state and easy to skip under time pressure: any discrepancy that isn't fully explained and resolved blocks sign-off on that part of the migration. It does not get noted in a report and carried forward as a known issue to "look at later" — because "later" in a live production org, after cutover, is a far more expensive and riskier place to discover that 1,800 Contacts never actually made it across. A reconciliation report with open, unexplained gaps is not a finished reconciliation; it's a flag that the load (or the reconciliation process itself) isn't done yet.

## Key terms

| Term | Meaning |
|---|---|
| Reconciliation | Confirming every record extracted from the source is accounted for as loaded, excluded, or rejected, end to end |
| Reconciliation report | A per-object document stating extracted, loaded, excluded, and rejected counts, with rejected records broken down by reason and resolution status |
| Bulk API success/failure result set | The per-record status and error-reason output Salesforce returns once a Bulk API 2.0 job completes |

## Lab

A migration extracted 50,000 Opportunity records. Reconciliation shows: 46,000 loaded successfully, 2,000 were deliberately excluded (Opportunities older than the agreed scope's historical cutoff), and 2,000 are shown in the Bulk API job's failure result set, split between 1,200 failing on a required-field validation error and 800 failing on a relationship pointing at an Account that hadn't loaded yet. Write the reconciliation report entry for this object (the four counts, and the two rejection reasons), and explain specifically why this migration should not receive sign-off yet, even though 92% of records loaded successfully.

## Check yourself

Can you explain, in your own words, how reconciliation differs from validation even though both happen in Chapter 3? Can you describe what a Bulk API 2.0 job's failure result set contains, and why it's directly useful for building a reconciliation report rather than just being log output nobody reads?
