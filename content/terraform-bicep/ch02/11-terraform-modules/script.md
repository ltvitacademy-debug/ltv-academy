# Script — Terraform Modules

## Segment 1 (title)

Lessons 8 through 10 built a Storage Account, a Fabric Capacity, and an Event Hub, each as a standalone resource block. A real project needs that set of resources three times over — dev, staging, production — and copy-pasting them three times means three places to fix the same bug.

## Segment 2 (code: a module is just a parameterized folder)

A Terraform module is nothing more than a folder of .tf files with its own variable and output declarations — the same files you've been writing all chapter, just parameterized by environment instead of hardcoded.

## Segment 3 (code: calling the module three times)

The root configuration has one module block per environment. source points at the module's folder, and each call passes in whatever's different — an environment name, maybe a different storage replication type for production.

## Segment 4 (steps: inputs and outputs are the whole interface)

A module's variables are its inputs and its outputs are what it exposes back — that's the entire contract. Anything inside the module that isn't output simply isn't reachable from outside it, which is what keeps a module reusable across projects, not just across environments in one project.

## Segment 5 (outro)

One file now defines what a data landing zone means, reused three times instead of copy-pasted three times. Chapter 2 is done — Chapter 3 moves to Bicep for the same Azure data resources.
