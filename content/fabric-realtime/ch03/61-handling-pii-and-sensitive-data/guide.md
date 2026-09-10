# Lesson 61 — Handling PII and Sensitive Data

**Chapter 3 · Production Data Engineering · Lesson 61 of 70**

## What you'll learn

- What actually counts as sensitive in this course's own taxi data
- Classification, tagging, and masking — three distinct controls
- Why real-time makes PII mistakes spread faster than in batch
- Minimizing collection as the first, cheapest control

## What actually counts as PII here

```
Obviously sensitive:   a rider's name, phone number, payment card details
Less obviously so:     precise pickup/dropoff coordinates -- these can
                       reveal exactly where someone lives or works,
                       even with no name attached at all
```

This course's NYC Taxi data has looked purely operational throughout
— fares, trip counts, vendor IDs. Precise location data is the
sharpest edge case: a lat/long pair, repeated across many trips for
the same rider, can identify a home address and workplace even
without a single explicitly-named field anywhere in the schema.

## Three distinct controls

```
Classification:  tagging a field as sensitive in Purview's catalog
                 (Lesson 60), so its status is visible and searchable
Access control:  restricting who can query the unmasked column at all
Masking:         showing a transformed or partial value instead of
                 the real one, for people who don't need the real thing
```

```kql
RawTripEvents
| extend MaskedPickupLocation = strcat(substring(tostring(PickupLat), 0, 2), "...")
```

Classification without access control is just labeling; access
control without masking is all-or-nothing. Together, they let a
dashboard show an aggregated fare trend to anyone, while only a
narrow, audited group can ever see a specific rider's exact
pickup coordinates.

## Real-time makes mistakes spread faster

Lesson 39's real-time data quality lesson made a similar point about
bad values: a mistake in a batch pipeline delays a report; the same
mistake in a stream is visible immediately. The same is true here,
with higher stakes — unmasked PII flowing into a live dashboard
(Lesson 28) or an Activator alert (Lesson 37) is exposed the moment
it happens, not caught in a review before anyone sees it. Fixing a
masking rule after the fact doesn't un-expose what already went out
the door.

## Minimizing collection — the cheapest control of all

The simplest fix to a PII exposure risk is never having the
sensitive field flow downstream in the first place. Lesson 35's
Manage Fields transformation — already covered as a way to shape
data in-stream — can drop or truncate a sensitive field before it
ever reaches a KQL Database or dashboard, which is both cheaper and
safer than classifying and masking a field nobody downstream
actually needed.

## Key terms

| Term | Meaning |
|---|---|
| Classification | Tagging a field's sensitivity so it's visible and searchable |
| Masking | Showing a transformed value instead of the real one |
| Minimizing collection | Not letting a sensitive field flow downstream at all, when it isn't needed |

## Check yourself

You're ready for Lesson 62 when you can explain, without looking: why
can't a masking rule fix an exposure that already reached a live
dashboard?
