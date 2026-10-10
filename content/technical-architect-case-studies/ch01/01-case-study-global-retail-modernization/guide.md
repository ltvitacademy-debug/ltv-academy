# Lesson 1 — Case Study: Global Retail Modernization

**Chapter 1 · Technical Architect Case Studies · Lesson 1 of 21**

## What you'll learn

- How to read a realistic CTA-style scenario and separate the stated facts from the implied constraints
- Why "consolidate everything into one org" is rarely the right first move under a hard deadline, even when it looks architecturally cleaner
- How a unified customer-profile layer, event-driven inventory sync, and a historical-data archive strategy work together as one defensible design
- How to carry a single case study across data, integration, system, and application architecture at once, instead of answering each domain in isolation

## The scenario

Meridian Outfitters is a mid-market apparel retailer that grew by acquisition. It now runs three separate Salesforce orgs — one each for North America, EMEA, and APAC — each with its own customer records, case history, and loyalty data, accumulated because each acquired business kept its own instance. The CEO has committed publicly to launching a single global storefront with real-time inventory visibility and a unified customer profile before the next holiday season, nine months away. Leadership wants "one Salesforce" and has used the word "consolidation" in board materials. The CIO privately tells you the three regional IT teams barely coordinate today, and none of the three orgs has ever been through a serious data-quality cleanup.

## Separating facts from pressure

A realistic prompt like this mixes three different kinds of information, and the first job of a Technical Architect is to sort them before designing anything. The **hard facts** are the three existing orgs, the nine-month deadline, and the requirement for a single storefront with real-time inventory and a unified customer view. The **stated preference** is "one Salesforce" — leadership's words, not a requirement with a number or a date attached. The **hidden constraint** is organizational: three IT teams that don't coordinate well and three decades of inconsistent data hygiene, which the CIO only mentioned once asked. A design that takes "one Salesforce" literally and proposes merging three production orgs with uncleaned data, on uncoordinated teams, inside nine months, is answering the stated preference while ignoring the hard facts and the hidden constraint — exactly the kind of design a review board is trained to probe.

## The design: unify the profile, not the org

The defensible answer treats org consolidation as a separate, longer-term initiative and solves the actual nine-month requirement differently. A customer-profile unification layer — built on Salesforce Data Cloud, ingesting identity-resolution feeds from all three regional orgs plus the new commerce platform — becomes the single source of a resolved customer profile without requiring any of the three orgs to merge or migrate data first. For inventory, the new global storefront needs near-real-time stock visibility across regions; rather than one region's org querying another's database synchronously (which creates a hard cross-org dependency and a shared failure point during the busiest season of the year), each regional system publishes inventory-change events, and a central integration layer consumes them to keep a storefront-facing inventory view current within seconds, not real time in the literal sense, but fast enough that a customer doesn't see a sellout item as available. For the years of historical order and case data piling up in each regional org, a central archive object sized for very large data volumes — rather than keeping everything in standard objects that count against ordinary storage and query limits — gives support and analytics a place to query history without bloating the transactional orgs that still need to run day-to-day operations quickly.

## Why this beats literal consolidation

This design answers the actual business commitment — one storefront, one customer view, real-time-feeling inventory, by the holiday deadline — without betting the deadline on three uncoordinated teams successfully merging years of inconsistent production data in nine months. It also doesn't foreclose consolidation later: once the unified profile layer is live and proven, a slower, better-governed org-merge project becomes a lower-risk follow-on, not a prerequisite for this year's launch. A board asking "why didn't you just merge the orgs" has a direct answer: the deadline and the data-quality risk made that the higher-risk path, not the architecturally purer one.

## Key terms

| Term | Meaning |
|---|---|
| Hard fact | A stated, non-negotiable element of a scenario (a date, a system, a number) |
| Hidden constraint | A limiting detail a scenario reveals only indirectly or when asked, not in the headline requirements |
| Identity resolution | Matching and merging records that represent the same real-world customer across multiple source systems |
| Event-driven sync | Propagating a change as a published event other systems consume, instead of one system querying another directly |
| Large-data-volume archive | A storage pattern sized for historical records that don't need to live in day-to-day transactional objects |

## Lab

Write a one-page design memo for Meridian Outfitters' board. State three hard facts, one stated preference, and one hidden constraint from the scenario above. Then write two sentences defending why the unified-profile-layer design answers the hard facts without taking on the risk of full org consolidation inside the nine-month window.

## Check yourself

Can you explain, in your own words, the difference between a hard fact and a stated preference in this scenario — and why a design built only around the preference ("one Salesforce") would be harder to defend to a review board than one built around the underlying business commitment?
