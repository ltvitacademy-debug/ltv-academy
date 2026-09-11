# Lesson 10 — For Loop & Foreach Loop Containers

**Chapter 2 · Control Flow · Lesson 10 of 49**

## What you'll learn

- The difference between the For Loop and Foreach Loop containers, and
  how to pick the right one
- The three expressions that drive a For Loop container
- The enumerator types a Foreach Loop container can use, and what each
  one is actually for
- How variable mappings connect an enumerator's current value to the
  rest of your control flow

## Two containers, two looping models

Both containers repeat a control flow, but they answer different
questions:

- **For Loop container** — "run this exactly this many times." It
  behaves like a **For** loop in a programming language: it evaluates a
  condition on every pass and stops when that condition is false.
- **Foreach Loop container** — "run this once for every item in this
  collection." You don't know or care how many items there are in
  advance — the loop just runs until the collection is exhausted.

Neither container does anything by itself — each one is only a
structure. You have to put at least one task inside it for the loop to
actually do work, exactly like the Sequence Container in Lesson 11.

## The For Loop container's three expressions

A For Loop container is configured with up to three expressions, all
typed into the **For Loop Editor**:

- **InitExpression** (optional) — sets a loop counter's starting value.
  For example, `@Counter = 0`.
- **EvalExpression** (required) — the condition checked before every
  pass. When it evaluates to `False`, the loop stops. For example,
  `@Counter < 4`.
- **AssignExpression** (optional) — updates the counter after every
  pass. For example, `@Counter = @Counter + 1`.

With those three expressions, a For Loop container with a Send Mail
task inside it and `@Counter < 4` as its EvalExpression sends exactly
four e-mails, one per pass, before the loop stops. A For Loop container
can only have one EvalExpression, so every task inside it runs the same
number of times — but you can nest another For Loop container inside it
for more complex, multi-level looping.

## The Foreach Loop container's enumerators

A Foreach Loop container needs exactly one **enumerator** — the thing
that defines what it's looping over. The most common ones you'll reach
for:

| Enumerator | What it enumerates |
|---|---|
| Foreach File | Files in a folder, optionally including subfolders |
| Foreach ADO | Rows (or tables) in an in-memory ADO/ADO.NET object stored in a variable |
| Foreach Item | Rows you type directly into the editor — useful for small, fixed lists |
| Foreach From Variable | Whatever enumerable object (array, DataTable, etc.) a variable already holds |
| Foreach Nodelist | The nodes an XPath expression matches in an XML document |
| Foreach SMO | SQL Server Management Objects, like a list of tables in a database |

A package can only use one enumerator type per Foreach Loop container —
if you need to loop over two different kinds of things, you need two
containers.

## Getting values out of the loop: variable mappings

Neither container is useful unless the rest of your control flow can
see what iteration it's on. That's what **Variable Mappings** is for —
on every pass, the enumerator's current value gets written into a
variable you choose. From there, you can reference that variable in a
property expression elsewhere in the package. The classic example: map
the Foreach File enumerator's current file path to a variable, then use
a property expression to update a File Connection Manager's
`ConnectionString` with that variable — so the same connection manager
points at a different file on every pass.

## Key terms

| Term | Meaning |
|---|---|
| InitExpression | Optional expression that sets a For Loop's starting counter value |
| EvalExpression | Required expression that stops a For Loop when it evaluates to False |
| AssignExpression | Optional expression that updates a For Loop's counter each pass |
| Enumerator | The Foreach Loop setting that defines what collection the loop iterates over |
| Variable Mappings | The page that writes the enumerator's current value into a variable each pass |

## Lab

1. Add a **For Loop container** to a new package. Set
   `InitExpression = @Counter = 0`, `EvalExpression = @Counter < 3`,
   and `AssignExpression = @Counter = @Counter + 1`. Put a Script Task
   inside that writes `@Counter`'s value to the Output window, and
   confirm it prints `0`, `1`, `2`.
2. Add a **Foreach Loop container** to the same package, using the
   **Foreach File enumerator**, pointed at any folder with a few files
   in it. Set **Retrieve file name** to **Name and extension**.
3. On **Variable Mappings**, map the enumerator's value to a new string
   variable. Put a Script Task inside the loop that writes that
   variable's value out, and confirm it prints one file name per pass.

## Check yourself

You're ready for Lesson 11 when you can say, without looking, which
container you'd use to process every file dropped into a folder, and
which one you'd use to run a task exactly ten times regardless of any
external data.
