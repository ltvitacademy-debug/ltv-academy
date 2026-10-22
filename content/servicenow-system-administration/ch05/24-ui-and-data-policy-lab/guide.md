# Lesson 24 — UI & Data Policy Lab

**Chapter 5 · UI Policies, Data Policies & Business Rules (Admin View) · Lesson 24 of 36**

## What you'll learn

- How to work through a real configuration requirement end to end, the way a ticket would arrive
- Why a UI Policy alone fails this requirement, stated precisely rather than just "it's not enforced"
- How to configure the Data Policy that actually satisfies it: table, condition, and rule
- Whether Apply to UI belongs in this specific scenario, and why
- How to state the completed configuration back in plain language, the way you'd document it

## The scenario, as it would actually arrive

A change manager submits this requirement: "A 'Change Reason' field needs to be mandatory on every Change Request whenever Risk is set to 'High' — and this has to hold true even for changes created automatically through our REST API integration with the external ticketing tool our vendor uses." Nothing in that sentence mentions UI Policy or Data Policy by name; recognizing which mechanism it's actually asking for is the real administrative skill, not just following a recipe.

## Step 1 — Identify what kind of requirement this is

Apply the question from Lesson 22: does this rule only need to hold true on the form, or does it need to hold true no matter how the record is written? The requirement says explicitly "even for changes created automatically through our REST API integration" — that phrase is the signal. This is not a form-convenience request; it's a data-integrity requirement. The business needs it to be impossible for a High-Risk Change Request to exist anywhere in the system without a Change Reason, regardless of who or what created it.

## Step 2 — Explain, precisely, why a UI Policy alone fails

A UI Policy making Change Reason mandatory whenever Risk is High would work perfectly for a change coordinator filling out the form by hand — the field would appear, turn mandatory, and block their Submit click until it's filled in. But the vendor's integration never opens that form. It authenticates to ServiceNow and posts a Change Request record directly through a Scripted REST API. Because that write path never renders the Change Request form, the UI Policy's condition is never evaluated, its UI Policy Action never fires, and the record saves successfully with Change Reason blank — exactly the gap Lesson 20 described, now showing up as a real ticket instead of a hypothetical.

## Step 3 — Configure the Data Policy instead

The fix is a Data Policy on the Change Request table:

1. Create a new record on `sys_data_policy2`, with **Table** set to Change Request (`change_request`).
2. Set the **Condition** to `Risk is High`.
3. Add a **Data Policy Rule** (`sys_data_policy_rule`) naming the **Change Reason** field, with the enforcement set to **Mandatory**.
4. Leave the Data Policy **Active**.

With this in place, any attempt to save a High-Risk Change Request without a Change Reason value is rejected by the platform itself — whether that save comes from the change coordinator's form, the vendor's REST API integration, a scheduled Import Set, or an admin's background script. The requirement's exact wording, "even for changes created via the REST API integration," is satisfied because the enforcement never depended on a form existing in the first place.

## Step 4 — Decide on Apply to UI

Should Apply to UI be turned on here? Yes — and this is worth reasoning through rather than defaulting blindly. Turning it on costs nothing: the server-side enforcement from Step 3 holds regardless of this setting. But turning it on means the change coordinator filling out the form by hand sees Change Reason marked mandatory live, before they even attempt to submit, instead of only discovering the requirement when their save is rejected. Checking Apply to UI gives the human-facing form the same good experience a dedicated UI Policy would have provided, at no cost to the server-side guarantee the integration actually needed.

## Step 5 — State the finished configuration

Documented plainly, for a change ticket or a configuration record: "A Data Policy on Change Request enforces Change Reason as mandatory whenever Risk is High, with Apply to UI enabled. This is enforced at the server level and applies to every write path, including the vendor's REST API integration — not just the Change Request form." That sentence is the deliverable an administrator should be able to produce after working through a requirement like this, and it's the same reasoning chain — identify the requirement type, rule out UI Policy if the stakes are real, configure the Data Policy's table/condition/rule, and decide on Apply to UI — that applies to any future "must hold true no matter how it's written" ticket this course's path will throw at you.

## Key terms

| Term | Meaning |
|---|---|
| Data-integrity signal | Wording like "even via API/integration" that tells you a UI Policy alone is insufficient |
| Table / Condition / Rule | The three real pieces of a Data Policy: what it governs, when it applies, what it enforces |
| Apply to UI | Safe to enable alongside server-side enforcement — it only adds form feedback, never removes enforcement |
| Write-path-agnostic | The defining property of a correctly configured Data Policy: it doesn't matter how the record got there |

## Check yourself

Restate, in your own words and without re-reading the lesson, why the exact phrase "even for changes created via the REST API integration" was the clue that ruled out a UI Policy before any configuration was even opened.
