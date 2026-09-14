# Lesson 44 — Copilot in Microsoft Fabric

**Chapter 3 · AI for Data Engineers (Bonus) · Lesson 44 of 81**

## What you'll learn

- What Copilot in Fabric actually is: an AI assistant built into Fabric items, not a separate product
- The two ways it shows up inside a notebook — the chat pane and in-cell Copilot
- Why Copilot is "schema-aware," and what that unlocks
- Where else Copilot shows up across Fabric, beyond notebooks
- Why the model still asks for your approval before it runs anything

## One assistant, many Fabric surfaces

Copilot in Fabric isn't a single chat window bolted onto the side of the
portal. It's an AI experience embedded directly into the Fabric item you're
already working in — a notebook (from Fabric & Real-Time Analytics
Lesson 6), a KQL Queryset (built on the KQL fundamentals from Lessons
22–27), a Power BI report, or a data pipeline. Each surface gets a
Copilot experience tailored to what you're doing there. This lesson
focuses on the data engineering notebook experience specifically, because
that's where Lessons 45 and 46 build worked examples.

## Two ways it shows up in a notebook

```
Chat pane                         In-cell Copilot
Multi-step workflows,             Single-cell, focused actions:
building across cells,            /explain  — what does this do?
reviewing a diff before           /fix      — resolve an error
applying changes                  /comments — add documentation
                                   /optimize — improve performance
```

The chat pane is where you'd ask something like "create a dataframe from
sales.csv" and watch it draft (and let you review) changes across several
cells. In-cell Copilot is narrower and faster: highlight one cell, run a
slash command, get a focused result without leaving that cell.

## Schema-aware, not guessing

Copilot in a Fabric notebook understands the notebook's actual context —
the attached lakehouse, its tables and files, the notebook's existing code,
and even recent execution telemetry like data sizes and join behavior. That
means you can ask plain questions like "how many tables are in the
lakehouse?" or "what are the columns of the table `customers`?" and get an
answer grounded in your real workspace, not a generic guess. This is
different from pasting code into a general-purpose chat tool that has never
seen your lakehouse.

## Fix with Copilot

When a cell or Spark job fails, a **Fix with Copilot** action appears right
below the failed cell. It gives an error summary, a root-cause guess, and a
suggested fix you can review as a diff before it's applied — the same
approval-diff pattern the chat pane uses for multi-cell changes. Lesson 46
uses this same underlying idea for fixing a broken KQL query.

## It still asks first

By default, Copilot asks for your approval before running a cell or
applying an edit. That default matters: it's the mechanism that keeps a
human in the loop, and it's exactly the kind of guardrail Lesson 56 comes
back to later in this chapter. Turning it off trades a safety check for
speed — rarely worth it while you're still learning what Copilot tends to
get wrong.

## Key terms

| Term | Meaning |
|---|---|
| Chat pane | Copilot's multi-step, multi-cell interface for building and reviewing whole workflows |
| In-cell Copilot | Slash commands (`/explain`, `/fix`, `/comments`, `/optimize`) scoped to one cell |
| Schema-aware | Copilot reads your actual lakehouse tables/files/telemetry instead of guessing |
| Approval diff | The review step before Copilot's suggested change is actually applied |

## Check yourself

You're ready for Lesson 45 when you can explain, without looking: what's
the practical difference between using the chat pane and using an in-cell
slash command, and when would you reach for each one?
