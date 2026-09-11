# Script — Master/Child Package Patterns

## Segment 1 (title)

Nothing stops you from building an entire warehouse refresh into one giant package. Almost nobody does. This lesson is about why — and the master/child pattern that replaces it.

## Segment 2 (steps: why split)

A master, or parent, package's Control Flow is mostly Execute Package Task entries, each one calling a smaller child package. Splitting things up this way buys you real readability — a package that only loads DimCustomer is easy to understand — plus reuse, since one child can be called from several different masters, and independent testing, since you can run and debug a single child completely on its own.

## Segment 3 (steps: sequential vs parallel)

How those children run comes down entirely to precedence constraints. Connect two Execute Package Tasks with a constraint when one genuinely depends on the other finishing first — loading a dimension before the fact table that references it. But if two children are truly independent, leave them unconnected, and SSIS's engine runs them in parallel, finishing the whole master package faster.

## Segment 4 (outro)

Next lesson, we move into deployment and administration for real — starting with the SSIS Catalog, where every deployed project, environment, and execution history actually lives.
