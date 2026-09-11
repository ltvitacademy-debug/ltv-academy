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

## Segment 3 (code: expression and constraint)

A constraint value isn't the only option — you can add an expression
too, any valid SSIS expression that evaluates to true or false. Say
Task A connects to Task B with a Success constraint and the expression
"X is greater than or equal to Z," combined using Expression and
Constraint. Task B only runs if both things are true: Task A actually
succeeded, and the expression evaluated to true. Switch that to
Expression or Constraint instead, and only one of the two needs to be
true. And when several constraints feed the same task, the LogicalAnd
property decides whether all of them have to be true, or just one.

## Segment 4 (outro)

Success, Failure, Completion, and expressions on top of any of them —
that's the full toolkit for precedence constraints. That wraps up
Chapter 2. Next, Chapter 3 begins: Data Flow Architecture, where we
shift from control flow entirely into moving and transforming actual
rows of data.
