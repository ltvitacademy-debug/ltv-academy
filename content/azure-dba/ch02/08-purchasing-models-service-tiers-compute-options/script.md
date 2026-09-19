# Script — Azure SQL Purchasing Models, Service Tiers & Compute Options

## Segment 1 (title)

Azure SQL Database offers two purchasing models, DTU and vCore, each with its own service tiers. Both answer the same question — how much compute, memory, and I/O does this database get — with different units and different control.

## Segment 2 (steps: the two models' tiers)

The DTU model bundles compute, memory, and I/O into Basic, Standard, and Premium tiers. The vCore model prices compute and storage separately across General Purpose, Business Critical, and Hyperscale — and it's the model required for Azure Hybrid Benefit.

## Segment 3 (code: compute options and the real decision)

Within vCore specifically, you also pick a compute option — provisioned, fixed and always billed, or serverless, auto-scaling and billed per second. Picking a tier is really at least two decisions: purchasing model, then service tier, and for vCore, a third.

## Segment 4 (outro)

Lesson 9 takes the DTU-versus-vCore decision all the way; Lesson 10 takes the provisioned-versus-serverless decision the same way. Next up: DTU vs. vCore in full.
