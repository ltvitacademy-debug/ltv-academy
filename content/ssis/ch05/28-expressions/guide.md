# Lesson 28 — Expressions

**Chapter 5 · Variables, Parameters & Expressions · Lesson 28 of 49**

## What you'll learn

- The core syntax of the SSIS expression language: literals, the `@`
  variable/parameter reference, casts, and operators
- How to reference a variable or parameter inside an expression
- The handful of function families you'll use constantly: string, date,
  and NULL functions
- Where the **Expression Builder** fits into building and testing an
  expression before you commit to it

## Expressions are a language, not one dialog

Variables and parameters both need a way to actually get combined,
compared, and transformed — that's what the **SSIS expression language**
is for. It isn't a single screen you learn once; it's syntax you write,
the same way you'd write a formula. You'll see it in three places
constantly: assigned to a variable's Expression property, assigned to a
task or connection manager's property (a **property expression** —
Lesson 29 covers this in depth), and inside the Conditional Split and
Derived Column transformations back in Chapter 4.

You've actually already seen the expression-building UI without knowing
it — the Derived Column Transformation Editor's own expression grid uses
the exact same tree and function folders you'll use everywhere else in
this lesson:

![The Derived Column Transformation Editor, with a Variables and Parameters tree on the left and Mathematical, String, Date/Time, NULL, Type Casts, and Operators function folders on the right, above an empty Derived Column Name/Expression mapping grid.](/courses/ssis/ch05/28-expressions/derived-column-expression-tree.png)
*The Derived Column Transformation Editor's own Variables and Parameters tree, plus every function family.*

## Referencing a variable or parameter

Every variable and parameter is referenced with an `@` sign, its
namespace, and its name:

```
@[User::varFileName]
@[System::PackageName]
$Project::SourceFolder
```

`User::` and `System::` are variable namespaces from Lesson 26.
Parameters use `$Package::` or `$Project::` instead of `@`, matching the
parameter scopes from Lesson 27.

## String concatenation and casting

The `+` operator concatenates strings as well as adding numbers — SSIS
figures out which from the operand types. Casting uses a type in
parentheses right before the value, borrowed straight from C-family
languages:

```
"PExpression-->Package: (" + @[System::PackageName] +
") Started:" + (DT_WSTR, 30) @[System::StartTime] +
" Duration:" + (DT_WSTR, 10)
  (DATEDIFF("ss", @[System::StartTime], GETDATE())) +
" seconds"
```

*A real property expression for a Send Mail task's Subject line, built entirely from casts, concatenation, and a date function.*

`(DT_WSTR, 30)` casts whatever follows it to a 30-character wide string —
you'll cast constantly, because SSIS's expression language is strict
about mixing types, more so than T-SQL.

## The conditional operator

SSIS has no `IF` statement inside an expression — it uses the ternary
conditional operator instead, `condition ? true_result : false_result`:

```
DATEPART("weekday", GETDATE()) == 2 ? "notepad.exe" : "mspaint.exe"

DAY((DT_DBTIMESTAMP)GETDATE()) == 1 ||
DAY((DT_DBTIMESTAMP)GETDATE()) == 15 ? 1 : 2
```

*Top: picks an executable based on the day of the week. Bottom: a real LoggingMode property expression — enables logging (1) on the 1st or 15th, disables it (2) otherwise.*

Note the second example uses `1` and `2` rather than the friendly
enumerator names `Enabled`/`Disabled` — property expressions that set an
enumerated property must use the numeric value, not the name.

## Function families you'll reach for constantly

| Family | Examples | Used for |
|---|---|---|
| String functions | `LEN`, `SUBSTRING`, `UPPER`, `REPLACE` | Cleaning up or reshaping text values |
| Date/Time functions | `GETDATE`, `DATEPART`, `DATEADD`, `DATEDIFF` | Timestamps, scheduling logic, date math |
| NULL functions | `ISNULL`, `REPLACENULL` | Guarding an expression against a missing value |
| Type casts | `(DT_WSTR, n)`, `(DT_I4)`, `(DT_DBTIMESTAMP)` | Making two operand types compatible before an operator can run |

## The Expression Builder

Rather than typing an expression blind, the **Expression Builder** dialog
gives you a **Variables and Parameters** tree and function-family folders
you can drag terms from directly into the **Expression** box:

![The Expression Builder dialog for a connection manager's ConnectionString property, with a Variables and Parameters tree, function folders, and a multi-line Expression box containing a real string-concatenation property expression.](/courses/ssis/ch05/28-expressions/expression-builder-connectionstring.png)
*A real property expression, typed directly into the Expression box.*

Below the Expression box sits an **Evaluate Expression** button and an
**Evaluated value** field — click it, and the Expression Builder actually
runs your expression and shows you the real result, so you find out an
expression is broken (or exactly what it produces) before you commit to
it, not after the package fails at run time:

![The Expression Builder dialog for a Foreach Loop container's Directory property, with the expression @[User::ParentFolder] and, after clicking Evaluate Expression, the Evaluated value field showing the real result E:\Data\SourceFiles.](/courses/ssis/ch05/28-expressions/expression-builder-directory.png)
*Evaluate Expression shows the real result — no guessing whether the syntax is right.*

You'll see the Expression Builder open from several places — the
Variables window, a task's Property Expressions Editor, the Conditional
Split and Derived Column editors — and Lesson 29 walks through opening it
from a connection manager specifically.

## Key terms

| Term | Meaning |
|---|---|
| Property expression | An expression assigned to a task, connection manager, or container property, evaluated dynamically at run time |
| `@[Namespace::Name]` | Syntax for referencing a variable inside an expression |
| `$Package::Name` / `$Project::Name` | Syntax for referencing a parameter inside an expression |
| Type cast | A `(DT_xxx)` prefix that converts a value to a compatible type before an operator or function can use it |
| Conditional operator | `condition ? true : false` — the expression language's only branching construct |

## Lab

Using the Execute SQL Task pattern from Lesson 26's lab against
`AdventureWorks2012`:

1. Add a variable `varSubject` of type `String`, with **EvaluateAsExpression**
   `True` and the expression
   `"Order count as of " + (DT_WSTR, 30) (DT_DBTIMESTAMP) GETDATE()`.
2. Confirm in the Expression Builder's **Evaluate Expression** panel that
   the result is a real formatted date string, not an error.
3. Change the expression to use the conditional operator: return
   `"Weekday run"` if `DATEPART("weekday", GETDATE())` is between 2 and 6,
   otherwise `"Weekend run"`.

## Check yourself

You're ready for Lesson 29 when you can explain, without looking: how do
you reference a variable inside an expression, and what construct does
SSIS's expression language use in place of an `IF` statement?
