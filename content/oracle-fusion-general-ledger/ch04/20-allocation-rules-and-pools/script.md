# Script — Allocation Rules and Pools

## Segment 1 (title)

Last lesson showed the allocation formula in action. This lesson opens up the actual rule behind it — the building blocks Allocation Manager uses, and how they map onto a cost pool.

## Segment 2 (steps)

Five elements make up a rule. Point of view fixes dimension values for the whole rule, so you don't re-specify them everywhere — things like ledger and balance type. Source is where the pool actually lives. Basis is the usage driver that decides each target's share — what lesson nineteen called the usage factor. Target is where the amount moves to. And offset is the account that relieves the source, usually the credit side.

## Segment 3 (code)

Map that onto the facilities example. Point of view: Solara Fixtures US, current period, actual balances. Source: the facilities pool account, sixty thousand dollars. Basis: headcount, by cost center. Target: the three cost centers' facilities allocated expense accounts. Offset: the facilities pool account again, credited to relieve it.

## Segment 4 (steps)

The basis is really the engine of the whole thing — it's what turns one flat pool into three proportional amounts instead of an even three-way split. Swap headcount for square footage, and every target amount would shift accordingly, even with the same sixty-thousand-dollar pool.

## Segment 5 (outro)

Once a rule is built, it's reusable — but running it for March is still a deliberate action, producing a journal batch that goes through the same validation, approval, and posting steps as everything else in this course. Next up, lesson twenty-one: journal copy and reuse — automation's simpler, more manual cousin.
