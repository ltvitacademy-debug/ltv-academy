# Documenting a Resolution

**Chapter 1 · How to Work a Support Ticket · Lesson 3 of 3**

## What you'll learn

- Why documentation is not an afterthought in a financial system
- The five things every resolution note should contain
- A worked example of a good note versus a bad one
- How this habit connects to every remaining lesson in the course

## Why this matters more in Financials than almost anywhere else

A support ticket in a general IT system might only need "fixed, works now." A support ticket in a financial system touches numbers that feed an income statement, a balance sheet, a tax filing, or an audit. If an auditor — internal or external — later asks "why does this account have a manual adjustment in it," the honest answer needs to be *findable*. Every chapter after this one ends its worked tickets with exactly this kind of note, because in real production support, the documentation is as much a deliverable as the fix itself.

## The five things a resolution note needs

| Element | What it covers |
|---|---|
| **1. Original symptom** | Exactly what the user reported, in their words, with the specific record(s) affected |
| **2. Root cause** | The specific condition found — not "data issue," but the actual setup or data problem identified |
| **3. Fix applied** | The specific action taken: what was changed, where, and by whom |
| **4. Verification** | How you confirmed the fix worked — re-ran the process, re-validated the invoice, checked the reconciliation report |
| **5. Prevention note (when relevant)** | Whether this is likely to recur, and what would prevent it — without over-promising a permanent fix you weren't asked to build |

## A bad note vs. a good note

**Bad:** "Invoice was stuck, fixed it, now works."

That tells the next person nothing. It doesn't say which invoice, what was actually wrong, what was changed, or how anyone would know if it broke again.

**Good:**

> Ticket #40112 — Meridian Steel Fabricators. AP clerk reported invoice INV-88341 (Summit Freight Carriers) would not validate.
> **Root cause:** Invoice line/distribution total ($18,420.00) did not equal the invoice header amount ($18,450.00) due to a $30 freight line added after distributions were generated.
> **Fix:** Added a $30 distribution to the existing freight expense account on the invoice; confirmed distribution total now equals header amount.
> **Verified:** Re-ran Validate — invoice moved to Validated status with no holds.
> **Note:** No setup change was required; this was a data-entry sequencing issue on this one invoice only.

Notice what the good version does: it names the actual record, states a specific dollar-level cause rather than a vague category, states exactly what was changed, and confirms the fix with a specific, repeatable check. It also explicitly says no setup changed — which matters, because a reader might otherwise assume you touched a tolerance or hold rule that affects other suppliers.

## Don't document more confidence than you have

If you resolved the symptom but aren't fully certain of the underlying cause (this happens — some tickets get "worked around" rather than fully explained), say so plainly rather than writing a root cause you're not sure of. "Reapplied the receipt correctly; underlying cause of the original misapplication wasn't confirmed, recommend monitoring for recurrence" is an honest, useful note. A confident-sounding root cause that turns out to be wrong is worse than an honest "not fully confirmed."

## Key terms

| Term | Meaning |
|---|---|
| Resolution note | The written record of symptom, cause, fix, and verification attached to a closed ticket |
| Verification | The specific check that proves the fix actually worked, not just that you believe it did |
| Workaround | A fix that resolves the immediate symptom without fully explaining or eliminating the underlying cause |

## Recap

A resolution note isn't paperwork — in a financial system it's part of the audit trail. Every good note states the original symptom specifically, names the actual root cause, describes exactly what was changed, proves it with a verification step, and is honest about what wasn't fully confirmed. From here, every remaining chapter works a real ticket end-to-end — symptom, diagnosis, root cause, fix, and a resolution note exactly in this shape. Next up, Chapter 2: your first real tickets, in Payables.
