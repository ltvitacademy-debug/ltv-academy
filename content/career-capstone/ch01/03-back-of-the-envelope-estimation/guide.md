# Lesson 3 — Back-of-the-Envelope Estimation

**Chapter 1 · System Design for Data Engineers · Lesson 3 of 81**

## What you'll learn

- Turning Lesson 2's requirements into actual numbers
- A worked estimation using this track's own NYC Taxi data
- Why rough numbers, done fast, beat precise numbers done never
- How the resulting scale changes which tools even make sense

## From requirements to numbers

Lesson 2 established *what* to ask. **Estimation** is where those
answers become numbers you can actually design against — events
per second, gigabytes per day, storage growth per year. A
requirement like "handle NYC's taxi volume" means nothing until
it's a number; a number is what actually determines whether a
laptop-sized SQLite file or a distributed streaming platform is the
right tool.

## A worked estimate

```
Given:  ~200,000 taxi trips per day, citywide (illustrative)
        Each trip event is roughly 500 bytes (fields: TripId,
        EventTime, FareAmount, VendorId, lat/long, etc.)

Trips per second (avg):    200,000 / 86,400 seconds ≈ 2.3/sec
Peak (assume 5x average):  ≈ 12/sec during rush hour
Bytes per day:              200,000 x 500 bytes ≈ 100 MB/day
Bytes per year:              100 MB x 365 ≈ 36.5 GB/year
```

Every one of these numbers is deliberately rough — real estimation
uses round numbers and simple multiplication, not precision. The
point isn't the exact figure; it's the order of magnitude, which is
almost always what actually matters for a design decision.

## Why rough numbers beat precise numbers done never

A system design interview, and a real design decision, both happen
under time pressure. Spending twenty minutes trying to get an exact
number is time not spent on the actual design. 2.3 events per
second, rounded, is close enough to immediately answer the
question that matters: this is nowhere close to the millions of
events per second that would force specialized infrastructure —
36.5 GB a year is well within a single KQL Database's easy
capacity (Fabric Lesson 21), no unusual scale-out story required.

## How scale changes which tools make sense

```
36.5 GB/year, 2-12 events/sec:  a single KQL Database or Warehouse
                                comfortably handles this -- no
                                sharding (Lesson 10) needed
3.65 TB/year, 2,000 events/sec: now sharding, partitioning
                                (Lesson 9), and careful capacity
                                planning (Fabric Lesson 64) start
                                to matter for real
```

The same architecture pattern doesn't automatically scale by a
factor of 100 just because it worked at a smaller size — this is
exactly why estimation happens *before* choosing storage and
processing models in Lessons 4–5, not after.

## Key terms

| Term | Meaning |
|---|---|
| Back-of-the-envelope estimation | Rough, fast numbers used to size a problem before designing for it |
| Order of magnitude | What actually matters in a rough estimate — not the precise figure |

## Check yourself

You're ready for Lesson 4 when you can explain, without looking: why
does a rough estimate done in two minutes usually beat a precise one
that takes twenty?
