# Lesson 21 — Data Policies for Server-Side Field Enforcement

**Chapter 5 · UI Policies, Data Policies & Business Rules (Admin View) · Lesson 21 of 36**

## What you'll learn

- What a Data Policy is and where it lives: `sys_data_policy2` plus its `sys_data_policy_rule` records
- Why Data Policies enforce at the server level, regardless of how a record is being written
- The real write paths a Data Policy actually covers that a UI Policy never touches
- The "Apply to UI" option — when a Data Policy also mirrors its rule onto the form
- Why this lesson's mechanism is the direct answer to Lesson 20's limitation

## sys_data_policy2: enforcement that doesn't care how the record got there

A Data Policy is a record on `sys_data_policy2`, scoped to a table, the same way a UI Policy is scoped to a table. The difference is where the rule actually gets enforced. A UI Policy's rule lives entirely in the browser and only fires when that specific form renders. A Data Policy's rule is enforced by the platform itself, on the server, at the moment a record is written — and it does not matter which door that write came through.

That's the real, practical distinction an administrator needs to internalize: Data Policies enforce field-level rules (mandatory, read-only) against the database itself, not against a rendered form. If the rule says a field must be filled in, the platform will refuse to save the record without it — whether the save is triggered by a user clicking Submit, an Import Set loading rows from a spreadsheet overnight, a Scripted REST API called by an external ticketing tool, or an admin running a background script in Scripts — Background.

## sys_data_policy_rule: the actual field rule

Just as a UI Policy delegates its real field-level work to UI Policy Actions, a Data Policy delegates its real field-level work to child records on `sys_data_policy_rule`. Each rule names one field on the governed table and sets one of two real enforcement options:

- **Mandatory** — the field must have a value before the record can be saved, through any write path
- **Read-only** — the field cannot be changed by that write path once the record exists

A Data Policy also carries a condition, just like a UI Policy does — the rule only applies when that condition evaluates true for the record being saved. "Business Justification is mandatory, but only when Priority is 1 - Critical" is exactly the shape of rule a Data Policy is built to express, and it holds whether that Priority-1 record was created by a service desk analyst filling out a form or by an integration posting JSON to a Scripted REST endpoint.

## Apply to UI: an optional mirror back to the form

A Data Policy's core job is server-side enforcement, but it has one more real, useful setting: **Apply to UI**. When this is checked, the platform doesn't just enforce the rule on save — it also pushes the same mandatory or read-only behavior onto the form itself, the same way a UI Policy would, so the end user sees the field marked mandatory (a red indicator) or locked, before they even try to submit. This is why many admins think of Data Policies as "the more complete version" of a UI Policy for mandatory/read-only rules specifically: Apply to UI gets you the live form behavior, and the policy still enforces at the server regardless. The one thing Apply to UI cannot do is add Visible behavior — Data Policies only ever govern mandatory and read-only, never show/hide; a field that needs to be hidden or revealed still needs an actual UI Policy.

## Why this matters: the enforcement Lesson 20 couldn't deliver

Recall the Lesson 20 scenario: Asset Tag marked mandatory by a UI Policy, but a Scripted REST API call creates a Hardware incident with Asset Tag blank, and the record saves anyway, because the UI Policy never evaluates outside the form. A Data Policy with the identical condition ("Category is Hardware") and the identical rule (Asset Tag is mandatory) closes that gap completely — the same REST API call would now be rejected by the platform itself, with no form, no browser, and no UI Policy involved at any point.

## Key terms

| Term | Meaning |
|---|---|
| Data Policy | A `sys_data_policy2` record: a condition on a table paired with server-enforced field rules |
| Data Policy Rule | A `sys_data_policy_rule` child record naming one field and setting it mandatory or read-only |
| Server-side enforcement | The rule holds for every write path — form, Import Set, Scripted REST API, background script |
| Apply to UI | Optional setting that also mirrors the mandatory/read-only behavior onto the form |

## Check yourself

A Data Policy makes Business Justification mandatory whenever Priority is "1 - Critical," with Apply to UI turned off. A Priority-1 Incident is created through a background script with Business Justification left blank. What happens, and would the answer change if the record had instead been created by a user filling out the form?
