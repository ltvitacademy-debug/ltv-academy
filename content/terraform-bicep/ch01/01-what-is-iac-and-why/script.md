# Script — What Is Infrastructure as Code, and Why?

## Segment 1 (title)

You already know how to provision a Storage Account, a Fabric Capacity, an Event Hub — by hand, in the Azure Portal. This course teaches the one thing that couldn't: describing that same resource in a text file, checked into Git, applied the same way every time.

## Segment 2 (code: the problem with clicking)

Manual provisioning works exactly once, remembered only by whoever clicked. There's no diff, no review, and no guarantee a second environment actually matches the first. Infrastructure as code is a text file — reviewed the same way as application code, and rebuildable from that file alone.

## Segment 3 (code: declarative vs imperative)

An Azure CLI script is imperative — a list of steps, run in order, once. Terraform and Bicep are declarative — you describe the end state you want, and the tool figures out what needs to change. Run it again with no changes, and nothing happens. That's what idempotent means.

## Segment 4 (steps: why it matters here)

This track's own capstone projects needed real Azure resources provisioned before a single pipeline could run. IaC is what makes that step reviewable, repeatable across dev and production, and recoverable if a resource ever gets deleted by accident.

## Segment 5 (outro)

Declarative, reviewable, rebuildable. Next up: choosing between the two tools that do this — Terraform and Bicep.
