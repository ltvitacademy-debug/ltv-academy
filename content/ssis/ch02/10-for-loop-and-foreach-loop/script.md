# Script — For Loop & Foreach Loop Containers

## Segment 1 (title)

Two containers, two ways to repeat a control flow. Let's figure out
which one to reach for, and how each one is actually configured.

## Segment 2 (screenshot: for-loop-empty.png)

Here's the real For Loop Editor, right after you drop the container
into your control flow — all three expressions start blank.
InitExpression and AssignExpression are both optional; EvalExpression
is the only one that's required, since without it the editor has no
condition to test.

## Segment 3 (screenshot: for-loop-canvas-and-variable.png)

And here's the container actually placed on the canvas, with a
Variables window open beside it. Most For Loop containers are driven
by a variable like this one — CounterNumber, starting at zero — which
is exactly what you'd reference in InitExpression, EvalExpression, and
AssignExpression to control the loop.

## Segment 4 (steps: foreach enumerators)

The Foreach Loop container answers a different question — not "how
many times," but "once for every item in this collection." That
collection is defined by an enumerator, and you pick exactly one per
container. Foreach File enumerates files in a folder. Foreach ADO
enumerates rows sitting in an in-memory recordset variable. Foreach
Item enumerates rows you type directly into the editor. And Foreach
From Variable enumerates whatever array or object a variable already
holds.

## Segment 5 (screenshot: foreach-general.png)

The Foreach Loop Editor has its own four pages — General, Collection,
Variable Mappings, and Expressions. General is just naming the
container; the real decisions happen on the two pages right after it.

## Segment 6 (steps: Collection and Variable Mappings)

Collection is where you pick the enumerator type — Foreach File, say —
and its configuration area changes to match: a folder, a file filter,
whether to recurse into subfolders. Switch the enumerator and that
whole lower section changes to whatever that enumerator needs instead.
Variable Mappings is what actually makes it useful — it writes the
enumerator's current value into a variable you choose, by Index, on
every single pass. A single-value enumerator like Foreach File uses
Index 0.

## Segment 7 (outro)

Fixed count, or once per item — that's the choice these two containers
give you. Next lesson, we look at a container that does neither:
Sequence Containers, for grouping tasks without any looping at all.
