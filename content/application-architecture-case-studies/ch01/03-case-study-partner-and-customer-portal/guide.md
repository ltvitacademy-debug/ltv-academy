# Lesson 3 — Case Study: Partner and Customer Portal

**Chapter 1 · Application Case Studies · Lesson 3 of 16**

## What you'll learn

- Why a single Experience Cloud license decision has to be made per audience, not once for the whole project
- How sharing sets differ from role-based sharing, and why portal users need the former
- Why "partners" and "customers" are not the same audience even when they use the same site technology
- How to scope a license choice against what the audience actually needs to do, not what would be nice to have

## The scenario: Renwick Outdoor Gear

Renwick Outdoor Gear sells through two very different outside audiences: independent retail partners who place wholesale orders and need visibility into their own deal registrations and co-op marketing funds, and end consumers who bought a product directly and want to check a warranty claim or repair ticket. Renwick's exec sponsor wants "one portal" for both. An architect's job here is to find out whether "one portal" means one piece of technology (likely yes) or one undifferentiated experience for two different audiences (almost certainly no).

## Two audiences, two different access needs

The partner audience needs to see and sometimes edit Opportunity-like records (deal registrations), access Leads created for their territory, and see aggregate co-op fund balances — this is advanced, CRM-object-heavy access that looks a lot like what an internal user does. The consumer audience needs something much narrower: see their own Cases and Orders, submit a new warranty claim, and read Knowledge articles — record access scoped tightly to records they themselves are associated with, nothing about Leads or Opportunities at all.

**Experience Cloud** licenses are built around exactly this distinction. A **Partner** license is designed for the deeper CRM access partners need (Leads, Opportunities, custom objects, more generous API limits), while a **Customer** license is built for a narrower self-service footprint (the customer's own Cases, Orders, and related records) at a correspondingly lower cost per user. Treating "one portal" as one license decision would either over-license thousands of consumers at partner-tier cost, or under-license partners into a tier that can't actually show them a Lead.

## Sharing sets vs. the mechanisms from Lesson 1

Lesson 1's design used role hierarchy and sharing rules — mechanisms built for internal, licensed CRM users sitting inside Renwick's own role hierarchy. External portal users generally don't get a seat in that internal hierarchy at all, and with potentially thousands of retail partners or consumers, manually placing each one into a role or writing per-user sharing doesn't scale. **Sharing sets** solve this differently: they grant an external user access to records associated with their own account or contact, based on a matching criterion (for example, a Case whose Account lookup matches the external user's own Account), rather than any position in a hierarchy. This is the standard record-access mechanism for customer-tier external users specifically because it scales to large external populations without requiring one role per user.

Partners, by contrast, often need something closer to internal-style visibility (seeing records across their whole dealer territory, not just their own account), which is why partner sites commonly lean on a combination of sharing rules scoped to a partner's account hierarchy and, where more complex criteria are needed, Apex-managed sharing — a heavier mechanism reserved for access logic that criteria-based rules genuinely can't express.

## Scoping the license to the task, not the wish list

A recurring failure mode in portal projects is letting the license choice get driven by a feature wish list rather than the actual task list. If the consumer audience's entire task list is "see my own Case, submit a claim, read an article," a Customer-tier license satisfies every item on that list; adding Partner-tier access for consumers because "we might want to show them something CRM-ish later" is buying capability the design doesn't need yet, at a cost the business does pay immediately. The right question for every audience in a portal design is the same one from the first lesson of this course: what does this specific group of users actually need to do, stated as a concrete task — not what license sounds more capable.

## Key terms

| Term | Meaning |
|---|---|
| Experience Cloud | Salesforce's platform for building external-facing sites (partner portals, customer communities, help centers) on top of CRM data |
| Partner license | An Experience Cloud license tier built for deeper CRM access (Leads, Opportunities, custom objects) typically used by channel partners |
| Customer license | An Experience Cloud license tier built for a narrower self-service footprint (a user's own Cases, Orders) typically used by end consumers |
| Sharing set | A record-access mechanism for external users that grants access based on a matching criterion against the user's own account or contact, rather than role position |

## Lab

Renwick later adds a third audience: a small group of independent repair technicians who aren't Renwick employees but need to see warranty claims assigned to them and update repair status. Decide, with written justification: (1) which Experience Cloud license tier best fits this audience's task list, (2) whether sharing sets alone can express "see only the claims assigned to me" or whether a different mechanism is needed, and (3) one reason this audience should not simply be added to the existing partner site using the partner license.

## Check yourself

Can you explain why "one portal" as a business request doesn't automatically mean "one license tier" as a technical decision? Can you state why sharing sets, rather than role hierarchy, are the standard mechanism for giving large numbers of external customer-tier users access to their own records?
