# Script — Package Variables

## Segment 1 (title)

Welcome to Chapter 5 — Variables, Parameters, and Expressions. We're
starting with variables: the small pieces of state every SSIS package
carries around while it runs.

## Segment 2 (screenshot: variables-window-open.png)

A variable stores a value a package, or the containers and tasks inside
it, can read or update at run time — the same idea as a variable in any
programming language. You work with variables through the Variables
window, docked below Connection Managers in SSIS Designer. If it isn't
already open, right-click the design surface and pick Variables from the
menu, right here.

## Segment 3 (screenshot: variables-window-add-variable.png)

Click Add Variable, and a new row drops straight into the grid — Name,
Scope, Data Type, and Value, ready to edit. Every package gets two
namespaces for these: User, where anything you create lands by default,
and System, a fixed set of predefined variables like PackageName and
StartTime that you can't add to or delete.

## Segment 4 (steps: Variables window)

Here's the whole workflow. First, click somewhere on the design surface —
the package itself, a task, or a container — because whatever's selected
becomes that variable's scope. Then click Add Variable. Set its name, data
type, and value right in the grid. And if you need columns like Namespace
or Description that aren't shown by default, click Grid Options to reveal
them.

Scope is the part that trips people up. A variable scoped to a Foreach
Loop container is only visible to tasks inside that loop; a variable
scoped to the package itself acts like a global, visible everywhere. You
can't just edit the Scope column later, either — if a variable needs to
move, you select it and click Move Variable.

## Segment 5 (screenshot: variables-window-with-expression.png)

A real package's grid usually looks like this — several variables side by
side. Look closely at ProductFileName: it has a small extra icon next to
its name, and the Expression column actually holds something. That's your
visual tell that this variable isn't a fixed literal like the other four —
it's being recalculated from an expression.

## Segment 6 (code: expression-driven variable)

A variable's value doesn't have to be a fixed literal. Set
EvaluateAsExpression to True, and the variable recalculates its value from
an assigned expression every time it's evaluated instead. The classic
example: a variable that always holds the current month, using the
expression DATEPART, "mm", GETDATE — parentheses closed out. Now the
variable's value is live, not static.

## Segment 7 (outro)

Variables are how a package holds state internally. But what about
feeding a value in from outside — a different connection string on a test
server versus production, without touching the package itself? That's
exactly what parameters solve, and that's next.
