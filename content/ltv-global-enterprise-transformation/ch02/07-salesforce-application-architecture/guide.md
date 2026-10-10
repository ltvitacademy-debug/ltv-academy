# Lesson 7 — Salesforce Application Architecture

**Chapter 2 · Core Architecture · Lesson 7 of 33**

## What you'll learn

- The single-org vs. multi-org decision, applied directly to LTV Global's four business units and three regions
- Why LTV Global's decision is single org, and exactly what trade-off that decision accepts
- How Sales Cloud, Service Cloud, and Experience Cloud map onto LTV Global's four business units
- Why this lesson's decision becomes one of the rejected alternatives you'll defend in Chapter 6

## The first real architecture decision

Every design area in this capstone depends on one foundational decision made first: how many Salesforce orgs does LTV Global run? A single org gives one shared data model, one place to report from, and standardized processes across all four business units — at the cost of concentrating governor-limit pressure and customization risk in one place, and requiring every business unit to compromise on a shared object model rather than diverging freely. Multiple orgs give each business unit or region full autonomy and data isolation — at the cost of duplicated master data, no native cross-org reporting, and multiplied licensing and integration cost. Neither answer is correct by default; the right call depends entirely on what LTV Global's actual vision and constraints require.

## LTV Global's decision: one global org

LTV Global adopts a **single, global Salesforce org** spanning all three regions and all four business units. This decision follows directly from Lesson 5's target-state vision, which commits to a unified customer view across business units regardless of which one originally touched the customer — a commitment a multi-org estate cannot deliver natively, since no Salesforce report can span two separate orgs without a separate integration or analytics layer doing the work underneath. A dealer who buys equipment from Equipment Manufacturing & Sales, orders parts through Parts & Aftermarket, and later opens a service case with Field Service should appear as one customer with one history, not three disconnected records sitting in three different orgs.

This decision accepts real costs, and naming them honestly now is what makes the decision defensible later: all four business units now share one object model, one set of governor limits, and one admin/release process, meaning a bad customization in one business unit is a shared-platform risk for all of them, and standardizing on common objects (Account, Case, Opportunity) requires real negotiation across business units with genuinely different processes.

## How the business units map onto Salesforce clouds

- **Equipment Manufacturing & Sales** — Sales Cloud, using standard Opportunity and a custom Equipment Asset object (introduced fully in Lesson 8) to track what a customer already owns before pitching a new sale.
- **Parts & Aftermarket Distribution** — primarily Experience Cloud for dealer self-service ordering (Lesson 16), backed by a custom Parts Order object, the highest-volume object in the entire design.
- **Field Service & Support** — Service Cloud, using standard Case against a custom Service Contract object, replacing EuroCRM's functionality once the Lesson 20 migration completes.
- **Equipment Financing** — primarily custom objects on the core platform, handling credit checks and lease terms with Shield Platform Encryption on sensitive fields (Lesson 11), since this business unit's data is the most regulated of the four.

## Why this becomes a Chapter 6 talking point

Single org vs. multi-org is exactly the kind of decision an Architecture Review Board probes directly, because it's foundational and hard to reverse after build begins. LTV Global's single-org decision has a clear, honest answer when challenged: the unified-customer-view requirement from the vision statement cannot be satisfied natively by a multi-org estate, and the costs a single org accepts (shared governor limits, shared risk, negotiated data model) are manageable with the security, sharing, and large-data-volume designs this chapter builds next — whereas the costs multi-org would have accepted (duplicated master data, no native cross-org reporting) directly contradict the vision itself.

## Key terms

| Term | Meaning |
|---|---|
| Single-org strategy | One Salesforce org serving the entire business, with one shared data model |
| Multi-org strategy | Separate Salesforce orgs per business unit, region, or subsidiary |
| Unified customer view | Seeing one complete picture of a customer regardless of which business unit touched them |
| Shared governor-limit pressure | The risk that one business unit's customization consumes platform limits shared by every other business unit in a single org |

## Lab

LTV Global's EMEA leadership raises a concern during design review: "Shouldn't EMEA just get its own org, given GDPR?" Using this lesson's trade-off reasoning (not a generic answer), write a three- or four-sentence response explaining why GDPR compliance does not, by itself, require a separate org — and what this design relies on instead (hint: look ahead to what Lesson 11's security design and Lesson 17's nonfunctional requirements will need to guarantee for this answer to hold up).

## Check yourself

Can you state, in your own words, exactly why LTV Global's single-org decision follows from the target-state vision rather than being an arbitrary default? Can you name two real costs this decision accepts, and explain which later lessons in this course are responsible for managing each one?
