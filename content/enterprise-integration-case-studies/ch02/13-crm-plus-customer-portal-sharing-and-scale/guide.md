# Lesson 13 — CRM + Customer Portal: Sharing and Scale

**Chapter 2 · Deep Dives · Lesson 13 of 20**

## What you'll learn

- Why Doverfield's larger customers outgrow a plain sharing set and need role-based sharing instead
- How Experience Cloud's role-based sharing differs structurally from the internal role hierarchy
- Why large external account hierarchies raise real performance considerations, not just a licensing question
- How to decide, concretely, when a portal design needs to move up a license tier

## Going deeper than Lesson 4's account-based sharing

Lesson 4 established sharing sets as the right tool for Doverfield's basic customer-portal need: each customer sees only their own Account's Cases and Orders, scoped automatically with no per-account configuration. That design assumed every customer's portal users are functionally equivalent to each other. Lesson 4's own Lab scenario broke that assumption — a customer wanting internal visibility tiers among their own purchasing staff. This lesson goes into what it actually takes to support that.

## Role-based sharing inside an external account

Higher Experience Cloud license tiers (**Customer Community Plus** and **Partner Community**, as distinct from the plain Customer Community tier Lesson 4 covered) support a **role hierarchy scoped to the external account itself** — not Doverfield's internal employee hierarchy, but a separate, parallel hierarchy that exists per external account. A customer's purchasing manager can be placed above their purchasing clerks in this account-scoped hierarchy, giving the manager visibility into records the clerks own, the same way an internal manager automatically sees their direct reports' records through Doverfield's own role hierarchy — except this hierarchy is defined per customer account, independently for each one, rather than being one hierarchy shared org-wide.

This is a structurally different mechanism from a sharing set, not an enhancement of one. A sharing set grants access based on matching the user's account to the record's account, with every user at that account treated identically. Account-scoped role hierarchy adds a dimension sharing sets don't have at all: differentiated visibility *within* the same external account.

## Performance at scale is a real design consideration

A large enterprise customer's external account hierarchy can itself become large — dozens or hundreds of portal users across multiple role levels, with sharing recalculating whenever role assignments or record ownership changes. This isn't purely a licensing or feature question; it's also a performance consideration, since Salesforce's sharing-recalculation engine has to process every record-visibility implication of a role or ownership change, and recalculation cost scales with the complexity of the hierarchy triggering it. Doverfield's design has to consider how deep and how wide a single customer's account-scoped role hierarchy realistically needs to be, rather than defaulting to a deep hierarchy mirroring the customer's full internal org chart just because the data is available to model it — a hierarchy that's deeper than the actual visibility requirements justify adds recalculation cost without adding any real access-control value.

## Deciding when to move up a license tier

The concrete trigger for moving from a plain Customer Community sharing-set design to a Customer Community Plus (or Partner Community) role-based design is a specific, named requirement: does any customer actually need differentiated visibility *among their own users*, where some of their people should see more of that same account's records than others. If every customer's portal users are functionally interchangeable — anyone from Customer A sees everything Customer A is entitled to, with no internal distinction — the plain sharing-set tier remains the right, simpler choice, and moving to a higher tier "just in case" adds license cost and hierarchy-management complexity without solving an actual requirement. Doverfield's enterprise customer from Lesson 4's Lab is the case that justifies the upgrade; a typical small customer buying occasional parts is not.

## Key terms

| Term | Meaning |
|---|---|
| Customer Community Plus / Partner Community | Higher Experience Cloud license tiers supporting account-scoped role-based sharing |
| Account-scoped role hierarchy | A role hierarchy defined per external account, independent of Doverfield's internal employee hierarchy |
| Sharing recalculation | The processing Salesforce performs to update record visibility when roles or ownership change, which scales with hierarchy complexity |
| License-tier trigger | The specific requirement (differentiated visibility within one external account) that justifies moving beyond a plain sharing-set design |

## Lab

A mid-size Doverfield customer asks whether they should get the same three-tier role-based portal access as the large enterprise customer from Lesson 4's Lab, even though in practice every one of their five portal users currently does the same job and nobody has ever asked for differentiated visibility. Using this lesson's license-tier trigger, recommend whether this customer should move to a higher license tier or stay on the plain sharing-set design, and justify your answer against the actual requirement rather than matching the enterprise customer's tier by default.

## Check yourself

Can you explain the structural difference between a sharing set and an account-scoped role hierarchy, rather than describing one as just a bigger version of the other? Can you state the specific, concrete trigger this lesson gives for deciding a portal design needs a higher license tier?
