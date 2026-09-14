# Script — Project 2 Kickoff: A Multi-Source Data Warehouse Migration

## Segment 1 (title)

Project 2: three legacy systems from three acquisitions — orders, customers, inventory — consolidating into one Fabric Data Warehouse so a single BI team can report across the whole business.

## Segment 2 (code: a different problem shape)

Project 1 built a system from nothing. Project 2 has to coexist with, and eventually replace, three systems that already exist and already hold years of real data. No big-bang cutover allowed.

## Segment 3 (code: choosing the target)

The BI team needs full T-SQL and strong multi-table joins for cross-source reporting, so the target is a Fabric Data Warehouse this time, not a lakehouse — the same Chapter 1 process, resolving to a different answer.

## Segment 4 (code: the real design question)

All three sources are batch-extractable, so this isn't really a batch-vs-streaming decision. The real question is migration order and coexistence — how old and new both stay correct during the overlap.

## Segment 5 (outro)

Requirements scoped, target chosen, the real design question named. Next up: assessing the three source systems and planning the actual migration.
