# Lesson 20 — Multi-Org vs. Single-Org Data Strategy

**Chapter 4 · Applying Data Architecture · Lesson 20 of 26**

## What you'll learn

- Why "how many Salesforce orgs should we run" is a data-architecture decision, not just an IT-governance one
- The concrete pressures that push an organization toward a single org vs. toward multiple orgs
- What a multi-org strategy costs in data terms: duplicated master data, cross-org integration, and split reporting
- How to frame the decision as a tradeoff analysis rather than a default answer

## One org, or several

Every enterprise running Salesforce eventually asks: should this entire company live in one Salesforce org, or should different business units, subsidiaries, or regions each get their own? There's no universally correct answer — this is a genuine architectural tradeoff, and the right call depends on organizational structure, regulatory constraints, and growth plans, not on a rule of thumb. What matters is that the decision gets made deliberately, with the data consequences understood up front, rather than drifting into a multi-org estate by accident because different business units independently stood up their own orgs with no coordination.

## The case for a single org

A single org gives you one copy of the data model, one copy of the data, and one place to report from. Every Account, Contact, and Opportunity lives in the same database, under the same schema, visible through the same reports. Standardization is the main draw: a single org forces every business unit onto the same object model and the same processes, which is exactly what you want if the business genuinely operates as one integrated company. Reporting across the whole business is a single query, not a data integration project. Administration is simpler because there's exactly one set of security settings, one set of automation, and one place new features get configured.

The failure mode of a single org is scale and divergence. As a company grows, the volume of customization, automation, and data accumulates in one place, and very different business units start fighting over the same object model — one unit wants a Lead field that means something completely different to another unit, and now the "shared" schema is full of compromises that serve nobody well. Large single orgs also concentrate governor-limit pressure (Lesson 22 covers this directly) and make a bad customization in one part of the business a risk to every other part sharing the same org.

## The case for multiple orgs

Multiple orgs make sense when business units genuinely need to diverge — different processes, different regulatory regimes, different data residency requirements, or an acquisition that needs to keep operating on its own systems rather than being force-fit into the parent company's data model on day one. A regulated subsidiary in a country with strict data-residency law may need its customer data to physically stay in that country's infrastructure, which a single global org can't guarantee on its own. An acquired company with its own mature Salesforce implementation often gets more value from staying separate for a transition period than being migrated immediately into a model that doesn't yet understand its data.

The cost of multiple orgs is paid entirely in data terms. Master data — the same customer, the same product, the same employee — now exists in more than one place, and nothing keeps those copies in sync automatically. Cross-org reporting requires an integration layer or a separate analytics platform that pulls from every org, because no native Salesforce report can span two orgs. Licensing gets less efficient, since a user who needs access to two orgs needs two separate licenses, and volume discounts calculated per-org don't benefit from combining headcount across orgs. Every integration that used to be "another object in the same database" becomes a real point-to-point or platform-mediated integration with its own failure modes.

## Framing the decision

The architect's job isn't to have a default position — it's to lay out what a single org buys you (standardization, simple reporting, lower integration cost) against what multiple orgs buy you (autonomy, isolation, regulatory fit) for this specific company's actual constraints, and make the tradeoff explicit to the people making the call. The decision should be revisited periodically, too: a company that was multi-org for good reasons during a merger might be ready to consolidate five years later, and a company that started single-org might legitimately need to split off a regulated subsidiary as it enters a new market.

## Key terms

| Term | Meaning |
|---|---|
| Single-org strategy | One Salesforce org serving the entire business, with one shared data model |
| Multi-org strategy | Separate Salesforce orgs for different business units, regions, or subsidiaries |
| Org consolidation | Merging previously separate orgs into one, usually to simplify reporting and administration |
| Data residency | A legal or regulatory requirement that certain data physically remain within a specific country or region |
| Org strategy review | A periodic re-evaluation of whether the current single-org or multi-org structure still fits the business |

## Lab

A mid-size manufacturer runs one Salesforce org today. It just acquired a competitor in a country with strict data-residency law requiring customer data to stay within that country's borders, and the competitor has its own mature, heavily customized Salesforce org. Write a short recommendation: should the acquired company be merged into the parent's single org, kept as a separate org indefinitely, or kept separate temporarily with a planned future consolidation? Name the specific data consequences (master data duplication, cross-org reporting, licensing) your recommendation accepts, and what would have to be true for you to recommend differently.

## Check yourself

Can you name two concrete pressures that push toward a single org and two that push toward multiple orgs? Can you explain, in data terms specifically (not general IT-governance terms), what a company gives up when it chooses to run multiple orgs instead of one?
