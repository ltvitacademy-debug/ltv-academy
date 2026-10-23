# Lesson 6 — The Dependency View & Service Mapping: Overview

**Chapter 2 · Relationships & the Dependency View · Lesson 6 of 26**

## What you'll learn

- What the Dependency View actually shows, and where it gets its data from
- Why it's just a visual read of the same `cmdb_rel_ci` records from Lesson 5
- What Service Mapping is, and the real, practical difference between it and manual relationship documentation
- The genuine tradeoff between the two approaches — simplicity vs. power — and why most real instances use both

## The Dependency View is a window into relationships you already built

Lesson 5 established that every relationship between two CIs is a real row on `cmdb_rel_ci`, directional and typed. The **Dependency View** is the platform's visual way of looking at those rows for one specific CI: open it from a CI record, and it lays out that CI's relationships as a graph — the CIs it depends on (upstream) and the CIs that depend on it (downstream), following the real `cmdb_rel_ci` records outward in both directions. It's worth being precise about what the Dependency View actually *is*: it isn't a separate data source, and it doesn't calculate anything new. It's a graphical read of exactly the same relationship data you'd see by querying `cmdb_rel_ci` directly — just laid out so a human can follow the connections at a glance instead of reading a list of rows. If the underlying relationships are missing or wrong, the Dependency View will faithfully show that same missing or wrong picture.

## Manual documentation: simple, but only as good as the upkeep

Everything in Lesson 5 — creating a `cmdb_rel_ci` record by hand, picking the right relationship type — is **manual relationship documentation**. It's the same basic mechanism this path's Platform Fundamentals course taught with reference fields and related lists, just applied at CMDB scale: someone who knows that an application runs on a given server goes and records that fact. The real advantage is that it's simple to set up — no extra licensing, no extra infrastructure, just disciplined data entry. The real cost is ongoing upkeep: every time a server is replaced, an application is moved, or a new dependency is introduced, a human has to remember to update the relationship records. In a large, fast-changing environment, that upkeep burden is exactly where manual CMDBs tend to go stale — the CI exists, but the relationships describing it quietly drift out of date.

## Service Mapping: the automated alternative

**Service Mapping** is a real, separately available ServiceNow capability — similar in spirit to how Performance Analytics and IntegrationHub are also capabilities layered on top of the base platform rather than switched on everywhere by default — that takes a fundamentally different approach to building the same relationship data. Instead of a person documenting that an application runs on a server, Service Mapping discovers the relationship automatically by tracing real connections: it identifies the actual network traffic and process-level connections between components of a business service (which process on which host is talking to which process on which other host, over which port) and builds the corresponding `cmdb_rel_ci` records from what it genuinely finds running. Pointed at a business service, Service Mapping can trace outward from a known entry point — a load balancer or a web server — through the real application and database tiers underneath it, discovering CIs and relationships that nobody had to type in by hand.

## The real tradeoff

Neither approach is simply "better." Manual documentation is cheap to start and good enough for a small, stable set of relationships someone is actually willing to maintain — but it decays as the environment grows and changes. Service Mapping keeps relationship data current with far less ongoing human effort and can surface connections nobody documented because nobody fully knew they existed — but it's a bigger investment: it requires credentials into the systems being mapped, careful configuration of what to trace, and (like other add-on capabilities) typically separate licensing. Most real, mature ServiceNow instances end up using both: Service Mapping for the complex, fast-changing business services where automated discovery earns its cost, and manual documentation for simpler, slower-changing relationships where it isn't worth the investment.

## Key terms

| Term | Meaning |
|---|---|
| Dependency View | A visual graph of a CI's upstream and downstream relationships, built entirely from existing `cmdb_rel_ci` records |
| Manual relationship documentation | Creating `cmdb_rel_ci` records by hand; simple to start, requires ongoing upkeep as the environment changes |
| Service Mapping | A separately available ServiceNow capability that automatically discovers relationships by tracing real network/process connections |
| Upkeep burden | The real, recurring cost of manual documentation — someone has to update relationships every time the environment changes |

## Check yourself

You're ready for Lesson 7 when you can explain, without looking: why is the Dependency View not a separate source of truth, and what real tradeoff does a ServiceNow administrator weigh when deciding whether a given business service's relationships should be documented manually or discovered with Service Mapping?
