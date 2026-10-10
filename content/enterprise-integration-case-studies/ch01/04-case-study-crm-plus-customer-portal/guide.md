# Lesson 4 — Case Study: CRM + Customer Portal

**Chapter 1 · Enterprise Integration Case Studies · Lesson 4 of 20**

## What you'll learn

- Why a customer-facing portal is an identity and sharing problem before it's a page-design problem
- How Experience Cloud, sharing sets, and account-based access combine to show each customer only their own records
- Why the organization-wide default has to start private for this pattern to work at all
- How to reason about which Salesforce license tier a portal use case actually needs

## The scenario: Doverfield's customers want self-service order status

Doverfield's largest customers call in constantly to ask "where's my order" and "can I see my past invoices." Support wants to deflect those calls with a self-service portal where each customer logs in and sees only their own Cases and Orders — never another customer's. This is an Experience Cloud problem wearing a UI costume: the actual hard part is making sure Customer A's login can never see Customer B's data, at any scale, without an admin manually sharing records one at a time.

## External users need a different sharing model

Doverfield's internal sharing model — role hierarchy plus a few sharing rules — assumes everyone inside it is an employee sitting somewhere in the org's management structure. External portal users aren't employees and don't belong in that hierarchy at all; Experience Cloud gives them their own kind of access, scoped by the **Account** they're associated with through a **Contact** record, not by a role.

The baseline that makes this safe is the same one that makes every sharing design safe: the object's **organization-wide default** has to start at Private. With Case and Order both set to Private, a portal user starts out seeing nothing — and everything they're allowed to see has to be explicitly granted by a defined mechanism, not left to whatever broader default the org happens to have.

## Sharing sets: the mechanism that makes this scale

With OWD private, Doverfield needs a rule that says "a portal user can see any Case or Order that belongs to their own Account" — without an admin configuring that grant one customer at a time. That's exactly what a **sharing set** does: configured once per object, in the portal's settings, it defines an access mapping (e.g., "share this object with the user when the record's Account matches the user's Account") and applies automatically to every external user the sharing set's profile covers. One sharing set, built once, scales to every current and future customer account without per-account configuration — which is the entire point, since Doverfield doesn't want to touch sharing setup every time it signs a new customer.

This account-based model is deliberately simpler than giving portal users role-based visibility: a plain Customer Community license has no role hierarchy at all, so sharing sets are the tool built for exactly this license tier, rather than a workaround.

## Choosing the right license tier

Not every portal need fits the same license. Doverfield's basic order-status use case — each customer sees only their own account's records — fits the plain customer community license tier that sharing sets are built for. If Doverfield later needed a large customer's own *internal team* to have different visibility levels among themselves (e.g., a customer's purchasing manager seeing more than a customer's warehouse clerk), that would call for a higher license tier that supports role-based sharing within the external org, not sharing sets alone. Picking the license tier before designing the sharing model — not after — avoids discovering mid-build that the chosen tier can't support a requirement that was actually needed from day one.

## Key terms

| Term | Meaning |
|---|---|
| Experience Cloud | Salesforce's platform for building external-facing portals and sites backed by org data |
| External user | A non-employee portal user, associated with an Account via a Contact, outside the internal role hierarchy |
| Organization-wide default (OWD) | The baseline record-level access before any sharing mechanism adds to it; must be Private for this pattern |
| Sharing set | A configured, account-based access mapping that automatically shares records with external users whose Account matches, without per-account setup |
| License tier | The Experience Cloud license level, which determines whether features like role-based sharing are available at all |

## Lab

Doverfield signs a new enterprise customer whose own purchasing team wants three internal visibility levels among themselves once they're in the portal: a purchasing manager who sees all of that customer's Cases and Orders, and two purchasing clerks who should each see only the Cases and Orders they personally opened. Decide: (1) whether a plain sharing set alone can satisfy this requirement, (2) what about the requirement specifically exceeds what sharing sets are built for, and (3) what you'd investigate next before committing to a design.

## Check yourself

Can you explain why the organization-wide default has to be Private before a sharing set design makes sense? Can you state, in your own words, why a plain Customer Community license has no role hierarchy, and why sharing sets exist specifically because of that constraint?
