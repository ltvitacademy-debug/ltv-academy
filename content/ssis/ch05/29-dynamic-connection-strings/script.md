# Script — Dynamic Connection Strings

## Segment 1 (title)

Everything in this chapter converges here. Variables, parameters,
expressions — the real payoff is making a connection manager point
somewhere different every single time a package runs.

## Segment 2 (screenshot: property-expressions-ui)

A property expression is an expression assigned directly to a read-write
property — a task, a container, a log provider, or a connection manager —
and it gets recalculated at run time instead of staying fixed. Here's how
you actually reach one: either a task's Expressions page, or the
Properties window, both leading into the Property Expressions Editor,
which maps one property to one expression. From there, the ellipsis opens
the Expression Builder — the same graphical tool from last lesson, just
now working on a property instead of a variable. Connection managers are
a special case worth remembering: you only reach their property
expressions through the Properties window, after selecting the
connection manager itself — they don't get an Expressions page.

## Segment 3 (code: ConnectionString from a variable)

Here's the textbook pattern, and it's the exact mechanism behind every
loop-over-files package back in Chapter 2. Select the connection manager,
open the Property Expressions Editor, pick ConnectionString under
Property, and set its expression to the variable a Foreach Loop container
updates — User colon colon varFileName. From that point on, every time
the loop advances to the next file, the variable updates, and the
connection manager's ConnectionString updates right along with it —
zero changes needed to the data flow downstream. One more thing worth
knowing: property expressions evaluate after configurations load, but
before the package validates and runs — so a configuration can update the
variable, and the expression still picks up that fresh value in time.

## Segment 4 (outro)

Property expressions on one connection manager is the small version of
this idea. The full version — driving an entire package's behavior from
which environment it's deployed to — is configuration patterns, and
that's next.
