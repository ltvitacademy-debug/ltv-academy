# Lesson 4 — Sharing Rules

**Chapter 1 · Sharing Building Blocks · Lesson 4 of 24**

## What you'll learn

- The two kinds of sharing rules — owner-based and criteria-based — and when each one is the right tool
- Why sharing rules can only grant Read Only or Read/Write, never a more granular access level
- What actually triggers sharing recalculation after a sharing rule is created, edited, or deleted
- Why sharing rules are the mechanism architects reach for first, before considering Apex managed sharing

## Owner-based vs. criteria-based

A sharing rule always answers the same question — "which records should this group of users automatically see?" — but it can define *which records* in one of two ways.

An **owner-based** sharing rule shares records based on who owns them: "share every record owned by anyone in Role X (optionally including subordinates), or in Public Group Y, with Role/Group Z." This is the right tool when the thing that determines whether someone needs visibility is *who created or owns the record* — a common pattern for territory-adjacent or cross-functional visibility, like "give the Customer Success team read access to every Opportunity owned by anyone on the Sales team."

A **criteria-based** sharing rule shares records based on the *values in the record itself*, completely independent of who owns it: "share every Case where Priority equals Critical and Region equals EMEA with the EMEA Escalations group." This is the right tool when visibility depends on the content of the record rather than its owner — an escalation team doesn't care who originally logged a critical case, only that it meets the criteria that makes it their problem.

Criteria-based sharing rules are not available for every object — certain objects support only owner-based rules — and criteria-based rules evaluate against field values, which means they re-fire automatically whenever a qualifying field changes on an existing record, not just at creation.

## What a sharing rule can and can't grant

Every sharing rule sets an access level of either **Read Only** or **Read/Write** — there is no "Read/Write/Transfer" or custom combination available through the standard sharing-rule UI, and a sharing rule can never grant more access than that ceiling regardless of how the rule is configured. Just as important: a sharing rule can never grant *less* than OWD already provides, and it can never be used to restrict access — if you need to remove visibility a broader mechanism already grants, Lesson 13's Restriction Rules are the actual tool, not a sharing rule configured in reverse.

Sharing rules also only ever target a role, a public group, a territory, or a combination — never an individual named user directly. If the requirement is genuinely "share this one record with this one specific person," that's manual sharing (Lesson 6) or, if it needs to happen automatically at scale for one-off relationships, Apex managed sharing (Lesson 8) — a sharing rule is the wrong tool for a one-to-one grant because its entire design assumes a reusable, ongoing population on both sides of the rule.

## What triggers recalculation

Sharing rules aren't evaluated live on every page load; they're baked into the underlying sharing tables ahead of time, and Salesforce recalculates those tables whenever something that could change the rule's outcome actually changes: the rule's own criteria or target group being edited, a user's role or group membership changing, or (for owner-based rules) a record changing owner. For a small rule touching a handful of records this recalculation is instant and invisible. For a rule governing millions of records against a large and frequently-changing user population, recalculation becomes a real operation with real duration — which is exactly why Lesson 16 exists as its own lesson, covering how architects manage recalculation cost deliberately rather than letting it become an unplanned background tax on every reorganization.

## Why sharing rules come before Apex managed sharing

When a design requirement can be expressed as "everyone in group A sees everyone in group B's records" or "every record matching criteria C is visible to group D," a declarative sharing rule should always be the first tool considered, before reaching for Apex managed sharing. Declarative sharing rules are visible in Setup, maintainable by an admin without a deployment, and automatically recalculated by the platform — none of which is true once logic moves into Apex. The honest test for whether a requirement actually needs Apex managed sharing (Lesson 8) is whether it depends on logic a declarative criteria filter genuinely cannot express — multi-object lookups, external data, or business rules too complex for a field-value comparison. Reaching for Apex before confirming a sharing rule can't do the job is a common architecture review finding, not a stylistic preference.

## Key terms

| Term | Meaning |
|---|---|
| Owner-based sharing rule | Shares records based on who owns them — a role, public group, or territory |
| Criteria-based sharing rule | Shares records based on field values on the record itself, independent of ownership |
| Access level ceiling | Sharing rules can only grant Read Only or Read/Write — never a finer-grained level |
| Sharing recalculation | The background process that re-evaluates sharing-table entries after a rule, group membership, or record ownership changes |

## Lab

In a Developer Edition org, create one owner-based sharing rule and one criteria-based sharing rule on the same object (Case works well for both, if criteria-based rules are supported on it in your org; otherwise substitute a custom object). For the owner-based rule, share records owned by one public group with another group at Read Only. For the criteria-based rule, share records matching a specific field value with a third group at Read/Write. Create test records that satisfy each rule and confirm visibility for a test user in the receiving group. Then change a qualifying field on an existing record and confirm the criteria-based rule re-evaluates it into visibility without you touching the rule itself.

## Check yourself

1. What is the real difference between how an owner-based and a criteria-based sharing rule decide which records to share?
2. What are the only two access levels a standard sharing rule can grant?
3. Name one specific kind of change that would force Salesforce to recalculate sharing for records governed by an owner-based sharing rule.
