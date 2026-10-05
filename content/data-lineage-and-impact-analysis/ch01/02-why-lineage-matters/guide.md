# Lesson 2 — Why Lineage Matters

**Chapter 1 · Lineage Concepts · Lesson 2 of 25**

## What you'll learn

- The four concrete business reasons organizations invest in lineage, beyond "it's good practice"
- What specifically breaks, in practical terms, when lineage doesn't exist or isn't trusted
- Why lineage is a prerequisite for trustworthy root-cause analysis, not a nice-to-have alongside it
- How this connects back to the "one definition, one home" theme from the Metadata Management course

## Four reasons lineage earns its keep

**Trust.** When a number on a report looks wrong, the first question is always "where did this actually come from?" Without lineage, the honest answer is often "nobody fully knows" — the report was built by someone who left, against a pipeline nobody fully documented. With lineage, the answer is a traceable chain of hops anyone on the team can walk through.

**Impact analysis.** Before changing a column name, a data type, or a transformation rule, someone needs to know what else depends on it. Lineage answers that question directly: "this column feeds these 6 downstream tables and these 3 reports" — turning a guess into a checked fact before the change ships, not an unpleasant discovery after it breaks something.

**Root cause analysis.** When a number is wrong, lineage lets you walk backward from the broken report to the exact hop where things diverged, instead of re-checking every system from scratch. A missing row in a dashboard total might trace back to one filter added two transformations upstream — lineage is what makes finding that filter a lookup instead of a multi-day investigation.

**Regulatory and audit requirements.** Many regulated industries (financial services, healthcare, insurance) require organizations to demonstrate exactly how a reported figure was calculated, from source to final number, for audit purposes. Lineage is the documentation that satisfies that requirement — without it, an audit becomes a scramble to reconstruct history that should have already been recorded.

## What breaks without it

Picture a quarterly revenue number that drops unexpectedly. Without lineage, three different people independently start checking three different systems, duplicating effort, because nobody has a map of which systems actually feed that number. The fix, once found, might be as small as a single incorrectly-joined table — but finding it took days instead of minutes, purely because the path from source to report was never recorded anywhere.

Now picture the same scenario with lineage in place: the team opens the lineage record for that revenue figure, sees every hop it passes through, and checks each one in order. The investigation becomes mechanical instead of exploratory.

## The connection to "one definition, one home"

The Metadata Management course closed on the idea that a well-run data program gives every concept one definition and one home, rather than scattering it across spreadsheets that never agree. Lineage extends that idea from *identity* to *movement*: once a concept has one definition and one home, lineage is what proves that every report actually pulling that concept is pulling it from that one home, correctly, through every hop in between — rather than silently drifting onto a stale copy somewhere else.

## Key terms

| Term | Meaning |
|---|---|
| Impact analysis | Determining what downstream systems or reports would be affected by a proposed change, before making it |
| Root cause analysis | Tracing a data problem backward through its lineage to find the specific hop where it originated |
| Audit trail | A recorded history (often overlapping with lineage) demonstrating how a reported figure was produced |

## Lab

Think of one time (at work, in a class project, or anywhere else) when a number looked wrong and someone had to figure out why. Write down, honestly, how long that investigation took and how it was actually done — checking logs, asking around, re-running queries. Then estimate how much of that time would have been saved if a lineage record for that number had already existed.

## Check yourself

Can you name all four business reasons this lesson gives for investing in lineage, and explain in your own words why root-cause analysis without lineage turns into "checking everything" rather than "checking one place"?
