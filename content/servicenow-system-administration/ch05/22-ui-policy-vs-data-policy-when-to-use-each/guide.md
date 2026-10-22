# Lesson 22 — UI Policy vs. Data Policy: When to Use Each

**Chapter 5 · UI Policies, Data Policies & Business Rules (Admin View) · Lesson 22 of 36**

## What you'll learn

- The real decision point: are you guiding the form experience, or enforcing data integrity?
- When a UI Policy alone is the right, sufficient choice
- When a Data Policy is the right choice, and why "it must hold true everywhere" is the signal
- The common default experienced admins lean on when a rule involves real data integrity
- Why Visible behavior can only ever come from a UI Policy, never a Data Policy

## The question that actually decides it

After Lessons 20 and 21, the mechanics of both tools are clear. The harder, more useful skill is recognizing which one a given requirement actually calls for — and that comes down to a single question: **does this rule only need to hold true on the form, or does it need to hold true no matter how the record is written?**

If the answer is "just the form" — you're improving the form experience. Use a UI Policy.
If the answer is "no matter how it's written" — you're protecting data integrity. Use a Data Policy.

## When a UI Policy alone is the right call

A UI Policy is the correct, sufficient choice whenever the goal is pure user-experience convenience, with no real consequence if the rule is bypassed by some other write path. Hiding a field that's irrelevant to the current record just to reduce visual clutter is the textbook case: if Category isn't Hardware, there's no reason to show Asset Tag at all, but nothing breaks if an import or an API happens to set an Asset Tag value on a non-Hardware record anyway — it's just an unused field, not a data problem. Likewise, a UI Policy that makes a field read-only purely to stop an end user from fat-fingering a value they shouldn't be touching, when no other write path is realistically going to touch that field, is also a reasonable, lightweight choice. UI Policies are also cheaper to build and easier to reason about, so when the stakes are genuinely just "the form should feel smart," they're the right tool, not an underpowered one.

## When a Data Policy is the right call

A Data Policy is the correct choice the moment a rule is actually a data-integrity requirement — something that must be true of the record itself, independent of who or what created it. "Business Justification is mandatory for any Incident marked Priority 1, even if that Incident was created via the API integration with our ticketing tool" is exactly this shape: the business doesn't care whether a human filled out a form or software posted JSON — it cares that no Priority-1 incident exists anywhere in the system without a justification. A UI Policy cannot make that promise, because it has no reach outside the browser form. Only a Data Policy, enforced at the server, can.

## The practical default experienced admins use

In real practice, many administrators adopt a simple working default: reach for a Data Policy any time there's a genuine data-integrity requirement behind the rule, and reserve UI Policy for pure form-UX convenience with no integrity stakes. This default isn't a platform rule — it's a judgment call that holds up well because Data Policies can also mirror their behavior onto the form (via Apply to UI from Lesson 21), so choosing a Data Policy rarely costs you the live form feedback a UI Policy would have given you anyway. The one thing you lose by defaulting to Data Policy is Visible/hidden control — if a field genuinely needs to show or hide based on a condition, that behavior can only come from an actual UI Policy, since Data Policies never touch visibility at all. In practice this means many real-world requirements end up using both: a UI Policy to hide and reveal fields for a clean form, plus a Data Policy to guarantee the mandatory/read-only rules hold everywhere.

## Key terms

| Term | Meaning |
|---|---|
| Form-experience rule | A requirement that only needs to hold true on the rendered form — a UI Policy candidate |
| Data-integrity rule | A requirement that must hold true for the record regardless of how it's written — a Data Policy candidate |
| Visible/hidden | A field effect only a UI Policy can produce; Data Policies never control it |
| Admin default | When integrity is at stake, default to Data Policy; reserve UI Policy for pure UX convenience |

## Check yourself

A requirement says: "Hide the Vendor field unless Category is Software, and separately, require a Vendor value on every Software-category record regardless of how it's created." Which mechanism handles the hiding, which mechanism handles the mandatory requirement, and why can't one tool do both halves alone?
