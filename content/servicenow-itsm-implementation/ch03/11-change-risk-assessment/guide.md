# Lesson 11 — Change Risk Assessment

**Chapter 3 · Implementing Change Enablement · Lesson 11 of 32**

## What you'll learn

- Why a Normal change needs its risk calculated, not guessed by whoever fills out the form
- How a Risk Assessment questionnaire is actually built — as variables or a dedicated record
- How individual answers roll up into a single High/Medium/Low risk value
- Why higher risk has to programmatically require more approval, not just display a label
- What a poorly implemented risk model looks like, and why it fails silently

## Risk can't be whatever the requester feels like typing

Lesson 10 established that a Normal change needs individual assessment before it's authorized. The part of that assessment this lesson covers is risk: how does the platform decide whether a given Normal change is High, Medium, or Low risk? The implementation principle to hold onto is that risk has to be **calculated consistently from real answers**, not left as a free-text field or a dropdown the requester sets to whatever they think sounds right. If risk is just a label someone picks, two people submitting equally dangerous changes can land on completely different risk values depending on their mood — and nothing downstream can be trusted to act on it.

## Building the questionnaire

Many implementations build the risk assessment as a structured questionnaire — a set of variables (the same mechanism Catalog Item lessons used for request forms), or a dedicated Risk Assessment record related to the change, answered when the Normal change is created. Real questions on a well-built questionnaire ask about the actual conditions that make a change dangerous: does this change affect a production environment? Does it touch a Configuration Item marked business-critical? Is there a tested backout plan? Has this exact change been performed successfully before? Does it require a maintenance window outside business hours? Each answer is a concrete, checkable fact about the change — not a vibe.

## From answers to a calculated value

The questionnaire's answers feed into a **calculated risk value** — commonly surfaced as a `risk` field on `change_request` with values like High, Medium, and Low. The calculation can be built a few real ways: a weighted scoring model (each answer contributes points, and point thresholds map to a risk band), or a simpler rules-based lookup (certain answer combinations — "production: yes" plus "backout plan: no" — automatically force High, regardless of anything else). What matters for implementation is that the mapping from answers to risk band is a defined, repeatable rule, applied the same way to every change, not a judgment call made record by record.

## Risk has to do something

A calculated risk value that nobody acts on is worse than having no risk field at all — it creates the appearance of governance without any real effect. The implementation principle that makes risk assessment worth building is that **higher risk should programmatically require more approval stages**. A Low-risk Normal change might need only manager approval. A Medium or High-risk Normal change should automatically also require CAB approval, chained onto the same workflow. That chaining is exactly what Lesson 12 builds — this lesson's job is making sure the risk value feeding into it is actually trustworthy before anything downstream relies on it.

## What a weak implementation looks like

A common mistake is letting the requester or assignee manually set the risk field directly, with the questionnaire built but not actually wired to compute anything. In that setup, the field exists, looks correct in a report, and does nothing — because nothing stops someone from setting a change that touches the production database to "Low" simply by selecting it from a dropdown. A correctly implemented instance makes the risk field **read-only and system-calculated**, driven only by the questionnaire's real answers, so the only way to change the risk is to change the underlying facts about the change.

## Key terms

| Term | Meaning |
|---|---|
| Risk Assessment questionnaire | A structured set of variables or a dedicated record, answered when a Normal change is created, capturing real conditions that affect risk |
| Calculated risk value | A High/Medium/Low value derived consistently from questionnaire answers, not manually set |
| Weighted scoring model | One calculation approach: each answer contributes points, and thresholds map total points to a risk band |
| Rules-based lookup | A calculation approach where specific answer combinations directly force a risk band regardless of other answers |

## Check yourself

You're ready for Lesson 12 when you can explain, without looking: why does letting a requester manually set the risk field make the whole questionnaire pointless, and what should drive the risk value instead?
