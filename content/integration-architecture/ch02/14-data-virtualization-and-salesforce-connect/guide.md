# Lesson 14 — Data Virtualization and Salesforce Connect

**Chapter 2 · Integration Design · Lesson 14 of 28**

## What you'll learn

- What data virtualization means, as the alternative to copying data between systems
- Salesforce Connect's external objects and the three adapter types that back them
- The genuine trade-offs of virtualization vs. replication (sync): freshness and storage savings against real-time dependency and query limitations
- When data virtualization is the right architectural choice, and when it quietly becomes a liability

## Access data without copying it

Every pattern so far in this course — point-to-point calls, Bulk sync, Platform Events — eventually results in a copy of data sitting in Salesforce (or in the other system) separate from its original source. **Data virtualization** is the alternative: instead of copying data, it's accessed live, in real time, from wherever it actually lives, through a layer that makes the remote data look and behave like it's local. The data never gets duplicated; every query against it reaches back to the real source at query time.

## Salesforce Connect: external objects

Salesforce implements data virtualization through **Salesforce Connect**, using **external objects** — objects that behave like standard or custom Salesforce objects in many respects (they can have tabs, page layouts, and custom fields, and they're reachable through SOQL and the UI much like native data), but the records are never stored in Salesforce. Each query against an external object reaches out to the external system live, retrieves the matching data, and presents it as if it were a native Salesforce record. Because the data isn't stored in Salesforce, external objects don't support everything a native custom object does — formula fields, validation rules, and workflow automation built directly on an external object generally aren't available, since those features depend on data actually being present in Salesforce's own database.

Salesforce Connect supports external objects through three adapter types. The **OData adapter** (supporting both OData 2.0 and 4.0) reaches external systems that expose their data through the Open Data Protocol, a standard way of exposing queryable data over HTTP. The **Cross-Org adapter** connects to data in a different Salesforce org, using that org's own Lightning Platform REST API under the hood — useful for multi-org architectures where one org needs live access to another's data without replicating it. The **Apex Connector Framework** lets a developer build a fully custom adapter for a data source that doesn't speak OData and isn't another Salesforce org, giving architects a path to virtualize essentially any data source with enough custom development effort.

## The trade-off: freshness and storage vs. real-time dependency

Data virtualization's advantage is that the data is always current — there's no sync lag, no stale copy, no batch job to schedule, and no storage consumed in Salesforce for data that already lives somewhere else, which matters for very large external datasets that would be expensive or impractical to fully replicate. The cost mirrors the availability coupling from Lesson 6 applied to a specific query: every time a user views or searches an external object, that query depends on the external system being available and fast enough to answer in real time. If the external system is slow or down, the external object is effectively unusable at that moment — there's no local copy to fall back on. Query capability is also more limited than against native data: complex reporting, certain SOQL constructs, and declarative automation that assumes locally-stored data often don't work the same way (or at all) against an external object.

## Choosing virtualization vs. replication deliberately

Data virtualization is the right call when a dataset is large, used relatively infrequently compared to its size, needs to always reflect the external system's current state exactly, and the external system can reliably handle live query load. It becomes the wrong call — or at least needs a fallback plan — when users need the data in contexts virtualization doesn't support well (heavy reporting, declarative automation, offline access), or when the external system can't reliably sustain the query volume Salesforce users would generate against it. In many real architectures, the choice isn't binary: frequently-accessed or automation-critical fields get replicated into Salesforce (via one of this chapter's sync patterns) while less-critical, rarely-needed data stays virtualized through Salesforce Connect.

## Key terms

| Term | Meaning |
|---|---|
| Data virtualization | Accessing remote data live, in real time, without copying it into the local system |
| Salesforce Connect | Salesforce's feature implementing data virtualization through external objects |
| External object | An object that behaves like a Salesforce object in the UI and SOQL, but whose data lives entirely in an external system |
| OData adapter | A Salesforce Connect adapter reaching external systems that expose data via the Open Data Protocol |
| Cross-Org adapter | A Salesforce Connect adapter connecting to data in a different Salesforce org |

## Lab

A pharmaceutical company has a 40-million-row research-data table in an external OData-compliant system. Sales reps occasionally need to look up a specific research record while on a call, but the data is never used in reports, dashboards, or automation, and the company doesn't want to replicate 40 million rows into Salesforce storage. Recommend whether this is a good candidate for Salesforce Connect external objects or for a replicated sync pattern instead, justify your answer using this lesson's trade-offs, and name one limitation the reps should be warned about if the external system ever has an outage.

## Check yourself

Can you explain, in your own words, the core difference between data virtualization and data replication/sync? Can you name Salesforce Connect's three adapter types and what kind of external source each one is built for?
