# Script — Precedence Constraints

## Segment 1 (title)

We've used precedence constraints in every lesson so far without
fully explaining them. Let's fix that — this is the connector that
decides what runs next, and why.

## Segment 2 (steps: three constraint values)

A precedence constraint always links two executables — the precedence
executable, which runs first, and the constrained executable, which
runs after it. Whether the constrained executable actually runs depends
on the constraint value, and SSIS Designer color-codes all three.
Success, green, the default — the precedence executable has to finish
successfully. Failure, red — the precedence executable has to fail,
which is exactly how you build an error-handling branch. And
Completion, blue — the constrained executable runs no matter what,
success or failure, as long as the precedence executable actually
finished.

## Segment 3 (screenshot: success-constraint-series.png)

Here's that default in a real package — a solid green line between two
Execute SQL Tasks, and after a run, both tasks flagged with a green
checkmark. The second task only ever started because the first one
succeeded.

## Segment 4 (screenshot: precedence-constraint-editor.png)

Double-click any connector and this is what opens — the Precedence
Constraint Editor. Evaluation operation and Value at the top set the
constraint itself. Down at the bottom, under Multiple constraints, is a
setting that only matters once a task has more than one incoming
connector: Logical AND, the default, requires every single incoming
constraint to evaluate true before the task runs.

## Segment 5 (code: expression and constraint)

A constraint value isn't the only option — you can add an expression
too, any valid SSIS expression that evaluates to true or false. Say
Task A connects to Task B with a Success constraint and the expression
"X is greater than or equal to Z," combined using Expression and
Constraint. Task B only runs if both things are true: Task A actually
succeeded, and the expression evaluated to true.

## Segment 6 (screenshot: logical-and-or.png)

Switch that Multiple constraints setting to Logical OR, and SSIS
Designer tells you at a glance — the lines turn dotted instead of
solid. Now only one of the incoming constraints has to be true, not
all of them.

## Segment 7 (outro)

Success, Failure, Completion, and expressions on top of any of them —
that's the full toolkit for precedence constraints. That wraps up
Chapter 2. Next, Chapter 3 begins: Data Flow Architecture, where we
shift from control flow entirely into moving and transforming actual
rows of data.
