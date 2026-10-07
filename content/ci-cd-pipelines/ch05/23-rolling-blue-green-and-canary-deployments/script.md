# Script — Rolling, Blue-Green & Canary Deployments

## Segment 1 (title)

An approved deployment still has to actually happen without taking the application down. Northbridge Retail can't just stop every old pod and start new ones — that gap would mean checkout is offline for every customer mid-deploy. This lesson covers three real ways Kubernetes swaps versions while staying up the whole time.

## Segment 2 (code)

A rolling update is Kubernetes' default: replace old pods with new ones a few at a time, never taking capacity fully offline. maxUnavailable caps how many can be down at once, maxSurge caps how many extra can come up early. Simple, but old and new versions briefly serve traffic side by side during the swap.

## Segment 3 (steps)

Blue-green runs two complete, identical environments. Blue stays live serving all real traffic while green gets the new version with zero customer exposure. Once green checks out, a single switch flips all traffic over at once — no in-between state, and blue stays around as an instant rollback target.

## Segment 4 (steps)

Canary sends a small slice of real traffic, maybe ten percent, to the new version while most traffic stays on the known-good one. Watch error rate and latency on just that slice, then either expand it or roll it back — only a fraction of users were ever at risk.

## Segment 5 (steps)

Northbridge Retail doesn't commit to one strategy. Routine releases use a rolling update. A change to the payment flow uses canary, because the blast radius needs to stay small. A database schema change uses blue-green, where even brief version mixing isn't acceptable.

## Segment 6 (outro)

Getting new code running safely, without downtime, is one problem these three strategies all solve differently. Turning a specific feature on for users is a wholly separate problem — that's feature flags, next.
