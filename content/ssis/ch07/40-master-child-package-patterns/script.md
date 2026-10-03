# Script — Master/Child Package Patterns

## Segment 1 (title)

Nothing stops you from building an entire warehouse refresh into one giant package. Almost nobody does. This lesson is about why — and the master/child pattern that replaces it.

## Segment 2 (steps: why split)

A master, or parent, package's Control Flow is mostly Execute Package Task entries, each one calling a smaller child package. Splitting things up this way buys you real readability — a package that only loads DimCustomer is easy to understand — plus reuse, since one child can be called from several different masters, and independent testing, since you can run and debug a single child completely on its own.

## Segment 3 (screenshot: execute-package-task-general.jpg)

Here's that task's editor, General tab — just a name and a description,
same as every other task you've configured in this course. The real work
happens one tab over.

## Segment 4 (screenshot: execute-package-task-package-tab.jpg)

This is the Package tab, and it's where an Execute Package Task actually
becomes a master/child link. ReferenceType is set to Project Reference —
for a child package living in the same project, that's what you want —
and PackageNameFromProjectReference is the dropdown where you pick which
one. Leave ExecuteOutOfProcess at its default of False, and the child
runs inside the parent's own process.

## Segment 5 (screenshot: execute-package-task-parameter-bindings.png)

And this is how values actually get passed down. The Parameter bindings
tab maps each child package parameter — on the left — to a parent
variable or parameter on the right. Three rows here, three parameters,
each one bound to its own User variable. In the Project Deployment Model,
this is the whole mechanism — no Package Configuration required.

## Segment 6 (steps: sequential vs parallel)

How those children run comes down entirely to precedence constraints. Connect two Execute Package Tasks with a constraint when one genuinely depends on the other finishing first — loading a dimension before the fact table that references it. But if two children are truly independent, leave them unconnected, and SSIS's engine runs them in parallel, finishing the whole master package faster.

## Segment 7 (outro)

Next lesson, we move into deployment and administration for real — starting with the SSIS Catalog, where every deployed project, environment, and execution history actually lives.
