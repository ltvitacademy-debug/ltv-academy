# AI Incident Response Runbook

A fillable runbook built on Lesson 22's five-step response sequence. Open a fresh copy of this runbook the moment an AI incident is identified — by monitoring, a user report, or a routine review. "AI incident" is broader than an outage: biased or harmful output, drift-driven errors, data leakage via prompts or outputs, and conventional security incidents all qualify (Lesson 22).

---

## Incident record

**Incident ID:** `<assign one>`
**System affected:** `<model/system name, matching its registry entry>`
**Date/time detected:** `<timestamp>`
**Detected by:** `<monitoring alert / user report / routine review — name which>`
**Risk tier of affected system:** `<from Lesson 24>`

## Step 1 — Detect

What was the trigger? Quote the alert, the complaint, or the review finding verbatim.

```
<detection detail>
```

## Step 2 — Contain

What immediate action stopped the harm? If an alias rollback was used (Lesson 22), record the exact versions involved.

```
Alias:            <e.g. "Champion">
Rolled back from: <version>
Rolled back to:   <last known-good version>
Rolled back by:   <name>
Rolled back at:   <timestamp>
```

If containment was not a rollback, describe the action taken instead:

```
<containment action>
```

## Step 3 — Assess impact via lineage

Using the model's lineage chain (Lesson 14), determine which decisions, time period, and downstream systems were actually affected.

```
Time window affected:       <start> to <end>
Decisions/records affected: <count or description>
Downstream systems touched: <list>
```

## Step 4 — Notify

Who needed to know, and when were they told?

| Who | What they were told | When |
|---|---|---|
| | | |
| | | |

Did this reach a regulatory notification threshold? `<yes/no, and who made that determination>`

## Step 5 — Remediate

What fixed the underlying cause, not just the symptom?

```
<remediation detail>
```

## After containment — close the loop

- [ ] Model card updated with the newly discovered limitation (Lesson 12)
- [ ] Finding fed back into the approval process for the next version (Lesson 16)
- [ ] Full incident recorded in version history (Lesson 15)
- [ ] Incident logged as input for the next scheduled audit (Lesson 27)

## Sign-off

**Resolved by:** `<name>` **Date:** `<date>`
**Reviewed by (accountable owner, Lesson 4):** `<name>` **Date:** `<date>`
