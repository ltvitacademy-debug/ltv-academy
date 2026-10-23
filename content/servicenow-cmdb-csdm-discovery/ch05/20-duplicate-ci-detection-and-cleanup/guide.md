# Lesson 20 — Duplicate CI Detection & Cleanup

**Chapter 5 · Data Quality & Governance · Lesson 20 of 26**

## What you'll learn

- The two most common real-world causes of duplicate CIs
- How built-in duplicate-detection tooling surfaces likely-duplicate pairs for review
- Why merging is the correct fix, and deleting one record is not
- What specifically gets lost when a duplicate is deleted instead of merged

## How duplicates actually happen

The duplicate rate score on the CMDB Health Dashboard doesn't appear from nowhere — it traces back to specific, repeatable causes, and the previous lesson already named the biggest one. An Identification Rule that's too loose, or simply misconfigured, lets two records that describe the same real asset get created side by side instead of being recognized as one. The second common cause is a timing and matching gap: a CI gets entered manually — say, during a project before Discovery has ever scanned that environment — and later, Discovery finds the same physical or virtual asset but fails to correctly match it to the existing manual record, so it creates a second one instead of updating the first.

Both causes point at the same underlying weakness: the identification logic didn't recognize two records as one asset. That's why Lesson 19's rule design is the actual prevention mechanism — duplicate cleanup treats the symptom, but a correct Identification Rule is what stops new duplicates from being created going forward.

## Finding duplicates that already exist

For CIs that are already duplicated, ServiceNow's duplicate-detection reporting surfaces likely-duplicate pairs by comparing records against the same kind of attributes an Identification Rule would use — matching serial numbers, matching IP addresses, near-identical hostnames — and flags pairs worth a human review. This is deliberately a review step, not an automatic delete: a tool that compares attributes can surface strong candidates, but a person still confirms that two flagged records genuinely are the same asset before anything is consolidated.

## Why merging, not deleting, is the fix

Once a duplicate pair is confirmed, the correct cleanup action is to **merge** the two records into one surviving CI — never to simply delete the extra one. This distinction matters more than it sounds like it should. A CI record isn't an isolated row; by the time it's been in the CMDB for even a few weeks, it's likely accumulated real relationships to other CIs, Incident and Change records logged against it, and possibly Business Service mappings that depend on it existing.

Deleting a duplicate record deletes all of that history along with it — every Incident ever logged against the deleted CI loses its link, every relationship pointing at it becomes orphaned, and any report built on that CI's history silently loses data with no error raised. A proper merge instead consolidates the surviving record: relationships, incident history, and other references are re-pointed to the single CI that remains, so nothing downstream breaks and nothing gets quietly lost.

## The full cleanup loop

Put together, the real-world cleanup pattern is: run duplicate detection, review the flagged pairs for genuine matches, merge confirmed duplicates onto a single surviving record, and then go fix the Identification Rule that let the duplication happen in the first place — otherwise the same tightening-the-barn-door-after-the-horse-left problem repeats on the next Discovery run.

## Key terms

| Term | Meaning |
|---|---|
| Duplicate CI | Two or more CI records that actually represent one real-world asset |
| Duplicate detection | Built-in reporting that surfaces likely-duplicate pairs by comparing attributes |
| Merge | Consolidating two confirmed duplicate records into one surviving CI, preserving history |
| Orphaned relationship | A relationship, incident, or change record left pointing at a CI that no longer exists |

## Check yourself

You're ready for Lesson 21 when you can explain, without looking: why does deleting a duplicate CI instead of merging it create a problem that might not show up until weeks later, in a completely different part of the platform?
