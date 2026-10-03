# Script — Sequence Containers

## Segment 1 (title)

Not every container loops. The Sequence Container's whole job is
grouping — let's look at what that actually buys you.

## Segment 2 (screenshot: empty-sequence-container.png)

Here's a Sequence Container the moment it's dropped onto the design
surface — completely empty. Adding tasks to it works exactly like
adding them to a package: drag them in, and connect them with
precedence constraints just like you would anywhere else. Right now
these three Execute SQL Tasks are still sitting outside it, waiting to
move in.

## Segment 3 (screenshot: sequence-containers-grouped-tasks.png)

And here's the pattern repeated seven times — one Sequence Container
per day of the week, each one holding its own copy of the same
three-task flow. From the outside, each container behaves as a single
unit, even though three tasks and their precedence constraints live
inside it.

## Segment 4 (screenshot: disable-context-menu.png)

That grouping pays off immediately. Right-click any one of these
containers — say, Tuesday — and Disable turns off every task inside it
at once. You don't touch Task1, Task2, or Task3 individually; the whole
group stops running in one click, and the other six containers keep
working normally.

## Segment 5 (steps: four real benefits)

So why use one? Four practical reasons. It sharpens debugging — disable
the whole container in one click to isolate a subset of the package.
It centralizes property management — set a property once on the
container instead of on every task inside it. It scopes variables — a
variable created inside a Sequence Container is only visible to what's
inside it. And it supports transactions at a finer grain than the whole
package — commit or roll back everything inside the container as one
unit.

## Segment 6 (outro)

Grouping, scope, and transactions, with zero looping involved — that's
the Sequence Container. Next lesson, we go deep on the connectors that
tie all of this together: precedence constraints — Success, Failure,
Completion, and expressions.
