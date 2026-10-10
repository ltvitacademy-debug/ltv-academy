# Lesson 4 — Case Study: Manufacturing Dealer Network

**Chapter 1 · Technical Architect Case Studies · Lesson 4 of 21**

## What you'll learn

- How territory-based sharing differs from standard role-hierarchy sharing, and when a dealer network actually needs it
- How to weigh Salesforce Connect's real-time external objects against data replication for an ERP integration
- Why a B2B Commerce storefront for parts ordering raises different questions than an internal sales tool would
- How partner identity (Experience Cloud) changes the trust model versus an internal-employee-only org

## The scenario

Carrow Equipment manufactures industrial machinery and sells almost entirely through roughly 1,200 independent dealers worldwide, not direct to end customers. Each dealer needs to order parts, file warranty claims, and track co-op marketing funds Carrow provides for local advertising. Critically, Dealer A must never see Dealer B's accounts, opportunities, or pricing — dealers are legally independent businesses and often compete with each other in overlapping territories. Pricing and live inventory for parts live in Carrow's SAP ERP system, which the dealer portal needs to reflect accurately at the moment of ordering, since a dealer placing an order against stale inventory creates a real fulfillment problem. Order history, once placed, needs to be reportable inside Salesforce without constantly re-querying SAP.

## Why this isn't a role-hierarchy sharing problem

A standard Salesforce sharing model built on role hierarchy assumes an internal organizational structure — managers above reps, with visibility flowing up. Dealers aren't part of Carrow's organization at all, and "visibility flowing up a role hierarchy" has no meaning for 1,200 independent businesses that need to see only their own data and nothing from any peer. This is exactly the shape **territory management** and **partner sharing** exist for: each dealer is modeled as an external Experience Cloud partner user tied to their own Account, with sharing rules and sharing sets scoping their visibility strictly to records owned by or shared with their specific dealer account — not a hierarchy, a hard boundary between peers who may be direct competitors.

## Salesforce Connect vs. replication: two different jobs

The pricing-and-inventory requirement and the order-history requirement sound similar but need opposite answers. Live pricing and inventory have to reflect SAP's current state at the moment a dealer is deciding whether to place an order — showing a dealer a Salesforce-cached inventory number that's hours stale risks exactly the fulfillment problem the scenario calls out. **Salesforce Connect**, using external objects, queries SAP in real time through an OData or custom adapter rather than copying SAP's data into Salesforce, which is the right tool when freshness at the moment of use matters more than query performance or offline availability. Order history is the opposite case: once an order is placed, a dealer running reports on their own order trends doesn't need that query to hit SAP live every time, and SAP shouldn't have to absorb open-ended ad hoc reporting load from 1,200 dealers' Salesforce dashboards. Order records get created and owned in Salesforce directly at the moment of purchase (or replicated shortly after via an integration event), so the reporting load lands on Salesforce's own storage and query engine, not SAP's.

## B2B Commerce changes the question from "can they order" to "who's ordering, and against what"

A B2B Commerce storefront built for 1,200 independent dealers has to answer "who is this buyer, and what price list applies to them" before it answers "what's in the catalog" — dealer-specific pricing, minimum order quantities, and even catalog visibility can legitimately differ by dealer tier or region, which means the commerce configuration has to be driven by the same Account/territory structure the sharing model already uses, not a second, parallel buyer-identity system. Designing B2B Commerce and the sharing model as two unrelated workstreams is a common mistake; they need to agree on the same definition of "which dealer is this" from day one.

## Identity: partner, not employee

Experience Cloud partner users authenticate against a different trust boundary than Carrow's own employees: a dealer's login only ever grants access scoped to that dealer's own Account hierarchy, and — because some dealers already run their own identity systems — the portal should support SSO from the dealer's own identity provider where a dealer organization needs it, rather than forcing every individual dealer employee to manage a separate Carrow-issued password.

## Key terms

| Term | Meaning |
|---|---|
| Territory management / partner sharing | Sharing model scoping external partner users strictly to their own account, with no visibility into peer partners |
| Salesforce Connect / external objects | Real-time query access to an external system's data without copying it into Salesforce |
| Data replication | Copying external data into Salesforce so queries and reports run against Salesforce's own storage |
| B2B Commerce | Salesforce's commerce platform for business buyers, supporting buyer-specific pricing and catalogs |
| SSO (single sign-on) | Letting an external organization's own identity provider authenticate its users into the portal |

## Lab

Dealer A and Dealer B both operate in the same metro region and are direct competitors. Design the sharing rule(s) that guarantee Dealer A's Experience Cloud user can never see Dealer B's accounts, opportunities, or co-op fund records — even if a future Carrow admin accidentally assigns both dealers to the same public group. Write the specific sharing-model answer, not just "use profiles."

## Check yourself

Can you explain why live inventory needs Salesforce Connect while order history doesn't? Can you state why B2B Commerce pricing configuration has to be driven by the same Account/territory model as the sharing rules, rather than a separate system?
