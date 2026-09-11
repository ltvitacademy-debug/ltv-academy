# Script — Expressions

## Segment 1 (title)

Variables and parameters both need a way to actually get combined,
compared, and transformed. That's expressions — the language underneath
almost everything else in this chapter.

## Segment 2 (code: referencing variables & parameters)

Expressions aren't one dialog you learn once — they're syntax you write,
and it starts with how you reference a variable or a parameter. A
variable is an at-sign, its namespace, two colons, and its name — so
User colon colon varFileName, or System colon colon PackageName for a
system variable. Parameters use a dollar sign instead of an at-sign, with
the same Package or Project scope you learned last lesson.

## Segment 3 (code: concatenation, casting, conditional)

The plus operator concatenates strings the same way it adds numbers — SSIS
figures out which from context. Casting shows up constantly, because
SSIS's expression language is strict about mixing types: a cast like
D-T underscore W-S-T-R, comma, 30, in parentheses right before a value,
converts it to a 30-character string before concatenating. And there's no
IF statement in this language at all — branching is done entirely with
the conditional operator: a condition, a question mark, the result if
true, a colon, the result if false.

## Segment 4 (outro)

Everything here — the at-sign syntax, the casts, the conditional operator
— gets put to real use in the next lesson, where we attach an expression
directly to a connection manager's ConnectionString property, so the same
package can connect to a different file or server every time it runs.
