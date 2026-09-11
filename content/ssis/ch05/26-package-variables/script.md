# Script — Package Variables

## Segment 1 (title)

Welcome to Chapter 5 — Variables, Parameters, and Expressions. We're
starting with variables: the small pieces of state every SSIS package
carries around while it runs.

## Segment 2 (steps: Variables window)

A variable stores a value a package, or the containers and tasks inside
it, can read or update at run time — the same idea as a variable in any
programming language. Every package gets two namespaces for these: User,
where anything you create lands by default, and System, a fixed set of
predefined variables like PackageName and StartTime that you can't add to
or delete.

You work with variables through the Variables window, docked below
Connection Managers in SSIS Designer. Here's the workflow: first, click
somewhere on the design surface — the package itself, a task, or a
container — because whatever's selected becomes that variable's scope.
Then click Add Variable. Set its name, data type, and value right in the
grid. And if you need columns like Namespace or Description that aren't
shown by default, click Grid Options to reveal them.

Scope is the part that trips people up. A variable scoped to a Foreach
Loop container is only visible to tasks inside that loop; a variable
scoped to the package itself acts like a global, visible everywhere. You
can't just edit the Scope column later, either — if a variable needs to
move, you select it and click Move Variable.

## Segment 3 (code: expression-driven variable)

A variable's value doesn't have to be a fixed literal. Set
EvaluateAsExpression to True, and the variable recalculates its value from
an assigned expression every time it's evaluated instead. The classic
example: a variable that always holds the current month, using the
expression DATEPART, "mm", GETDATE — parentheses closed out. Now the
variable's value is live, not static.

## Segment 4 (outro)

Variables are how a package holds state internally. But what about
feeding a value in from outside — a different connection string on a test
server versus production, without touching the package itself? That's
exactly what parameters solve, and that's next.
