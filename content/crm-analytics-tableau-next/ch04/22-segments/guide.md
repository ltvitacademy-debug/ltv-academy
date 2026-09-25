# Segments

So far this chapter has been about preparing data: ingest it, map it, unify identities, define metrics. **Segments** are where that preparation pays off. A segment is a filtered group of unified profiles, such as customers who bought a yellow scarf in the last 90 days, or accounts whose lifetime value is in the top decile. This lesson covers building segments in Data Cloud (now branded Data 360) from an analyst's point of view, and how they connect to analytics.

## What you'll learn

- What a segment is, and what it is built on
- How the segment builder's filter logic works
- How segments differ from calculated insights and from CRM reports
- Why a segment's population count is a number worth checking

## A segment is a saved filter over unified profiles

If you have written a `WHERE` clause with several `EXISTS` subqueries against related tables, you already understand a segment. It defines a population by conditions on the profile itself and on related records. You choose what the segment is **on**, typically an Individual or Account, and then add conditions. The result is a list of member profiles, not a set of aggregated numbers. That is the main difference from a calculated insight, which gives you a metric per group, while a segment gives you the members themselves.

## The segment builder

The builder has three working areas. On the left is a searchable **Attributes** panel, split into **direct attributes**, which belong to the object the segment is on, and **related attributes**, which come from connected objects such as sales orders or engagement events. In the center is the canvas where you drop attributes into filter containers. At the top is the **population count**, an estimate of how many profiles match right now, plus a publish schedule setting and a status.

Each container states a condition on a related object, for example: a Sales Order Product record where the category equals a given value, with a count of at least one. Operators such as *is equal to*, *is in*, *is between*, and *is greater than* work as you would expect. Containers are combined with AND or OR. Where you place conditions matters: conditions inside one container are evaluated against the same related record, while conditions in separate containers can be satisfied by different records. Check the builder's behavior against a few known profiles before you trust a new segment.

Two more details from Trailhead's material: date-based event attributes default to a look-back window (24 months in the example shown), and you can only filter on data that was mapped, exactly as Lesson 19 warned.

## From segment to action, and to analytics

A published segment refreshes on a schedule you choose, and its members can be activated, sent to targets such as marketing tools, which is why segments are the marketer-facing end of Data 360. For an analyst, segments matter for a different reason: they are governed, named populations. Comparing conversion between "high-value" and everyone else is far easier when "high-value" is a defined segment rather than a filter someone rebuilds in each report. Whether a given analytics tool can read segment membership directly depends on your release and setup, so verify in current documentation.

## Segments versus native reports

A CRM report filters records from one org's objects. A segment filters unified profiles built from many sources, including data that never lived in Salesforce CRM. That is the reason to reach for a segment: the population depends on facts from more than one system.

## Key terms

| Term | Meaning |
|---|---|
| Segment | A saved population of unified profiles that meet conditions |
| Direct attribute | An attribute on the object the segment is built on |
| Related attribute | An attribute from a connected object, such as orders |
| Population | The count of profiles currently matching the segment |
| Activation | Sending segment members to an external target |

## Recap

A segment is a named, reusable population. Choose the right object, mind the container logic, sanity-check the population count, and remember that unmapped or badly unified data will silently shrink or distort it.
