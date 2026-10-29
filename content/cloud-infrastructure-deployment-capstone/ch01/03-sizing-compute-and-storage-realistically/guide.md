# Lesson 3 — Sizing Compute and Storage Realistically

**Chapter 1 · Planning a Real Deployment · Lesson 3 of 32**

## What you'll learn

- Why sizing starts from the real load numbers in your requirements brief, not a guess
- The realistic sizing loop: a reasonable baseline, deploy, monitor real usage, then right-size
- The two sizing mistakes that cost real money or cause real outages — over-provisioning "just in
  case" and under-provisioning
- Why sizing is a loop you revisit, not a decision you make once and forget

## Start from the brief, not from a feeling

Lesson 1's requirements brief already gave you the one number sizing actually depends on: expected
load. Sizing compute and storage realistically means starting there — a workload expecting a few
hundred internal users with a predictable 9-to-5 pattern does not need the same size instance as
one expecting ten thousand concurrent public users. Picking a size because it "feels about right,"
or because it's what got used on the last project, skips the one input that actually matters.

## The realistic sizing loop

Real sizing isn't a single decision made once at the start — it's a loop:

1. **Pick a reasonable baseline** from the expected load in the brief — not the smallest instance
   available, and not the largest "to be safe."
2. **Deploy it.**
3. **Monitor real usage** once traffic is actually hitting it — CPU, memory, storage I/O, and
   actual request counts, not projections.
4. **Right-size based on that real data** — scale up if it's consistently under pressure, scale
   down if it's consistently idle.

This loop is exactly why cost optimization work (covered elsewhere in this path) and sizing are
the same conversation: a size chosen from real monitoring data after deployment is almost always
more accurate, and often cheaper, than the best guess made before a single real user touched the
system.

## Two mistakes, two different kinds of damage

- **Over-provisioning "just in case."** Choosing a bigger, more expensive size than the load
  justifies, to avoid ever having to think about it again, quietly wastes budget every single
  month — a cost with no corresponding benefit, since the extra capacity sits unused.
- **Under-provisioning.** Choosing a size that's too small to save money or because the real load
  was never actually estimated causes a real outage the moment traffic exceeds what the
  infrastructure can handle — not a slowdown, a failure, often at the worst possible moment (a
  product launch, a seasonal spike, a marketing campaign that actually worked).

Neither mistake is a rounding error. One shows up as a wasted line item every month; the other
shows up as a 2am page and an outage review.

## Right-sizing is ongoing, not a one-time event

Load changes. A workload that started with a few hundred users can grow, and one that launched big
can settle into something smaller than expected. Treating the initial size as permanent is the
same mistake as guessing at it in the first place — real sizing means checking the monitoring data
periodically and adjusting, not setting it once during planning and never looking again.

## Key terms

| Term | Meaning |
|---|---|
| Baseline size | The reasonable starting instance/storage size chosen from expected load, not a guess |
| Right-sizing | Adjusting compute or storage after deployment, based on real monitoring data |
| Over-provisioning | Choosing more capacity than the real load justifies, wasting budget every month |
| Under-provisioning | Choosing too little capacity, risking an outage once real load exceeds it |

## Check yourself

A new internal tool launches sized for "a few hundred users, just in case" at a size meant for
tens of thousands. A month later, monitoring shows it's running at 4% CPU utilization around the
clock. What's the real cost of leaving it sized that way, and what should happen next?
