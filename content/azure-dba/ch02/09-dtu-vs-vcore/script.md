# Script — DTU vs. vCore & Choosing the Right Database Configuration

## Segment 1 (title)

A Database Transaction Unit bundles compute, memory, and I/O into one number — simple to reason about, but you can't scale storage independently or apply an existing SQL Server license. The vCore model separates compute and storage entirely.

## Segment 2 (code: DTU bundling)

Pick a service tier and a DTU count, and sizing is done — one number to alert on, one number to raise when performance complains. The cost is that compute and storage move together, and there's no separate compute price to discount.

## Segment 3 (screenshot: Microsoft's own comparison diagram)

This is Microsoft's own diagram comparing the two models — bundled DTU on one side, independently priced vCore compute and storage on the other. It's the clearest way to see the difference at a glance.

## Segment 4 (code: making the decision)

No license and want simple sizing — DTU. Own a SQL Server license — vCore plus Hybrid Benefit for real savings. Need independent storage scaling, or Business Critical or Hyperscale specifically — vCore, since those tiers don't exist under DTU at all.

## Segment 5 (outro)

License ownership and independent storage scaling are the two real deciding questions. Next up: serverless, provisioned compute, and elastic pools — the compute options that sit inside the vCore model.
