# Script — Oracle Fusion Cloud Architecture Overview

## Segment 1 (title)

You don't need to be a cloud engineer to work in Fusion Financials — Oracle manages the infrastructure. But a functional consultant should still know, conceptually, what's running underneath the screens. Here's just enough architecture to talk about it intelligently.

## Segment 2 (code: OCI)

Oracle Cloud Infrastructure, or OCI, is Oracle's own cloud computing platform — its answer to AWS or Azure. Fusion Cloud runs on top of OCI's data centers, networking, and compute resources, which Oracle is fully responsible for. Oracle has spent years migrating customers from an older infrastructure onto OCI, and new implementations run on OCI from day one.

## Segment 3 (steps: a customer's environments)

A company doesn't get just one copy of the application. It gets Production, where the real business runs, and at least one non-production environment for testing without risk. These are logically separate even though they share the same underlying OCI infrastructure.

## Segment 4 (code: one data model, one foundation)

Architecturally, all of Fusion Cloud's pillars run on one common data model and one shared technology foundation — not separate acquired products glued together with custom interfaces. That's what makes a unified data model actually possible, not just a marketing phrase.

## Segment 5 (outro)

Understanding Fusion Cloud as truly cloud-native, not an old product simply hosted remotely, is what makes the next lesson make sense: a predictable quarterly update rolled out to every customer at once. Next up, Lesson 10: quarterly updates and release management.
