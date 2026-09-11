# Lesson 15 — The Data Flow Buffer Concept

**Chapter 3 · Data Flow Fundamentals · Lesson 15 of 49**

## What you'll learn

- Why the data flow engine moves rows in batches called buffers,
  instead of one row at a time
- The two settings that control buffer size, and their real defaults
- What "buffers spooled" means, and why it's a performance warning
- Why removing unused columns actually speeds up a data flow

## No dialog box for this one

Buffers are an internal engine concept — there's no editor, no design
surface, nothing to screenshot. Microsoft's own documentation covers
this entirely in text and log-message tables. This lesson uses two
diagram slides instead of a fabricated screenshot.

## Rows travel in batches, not one at a time

It would be painfully slow if the data flow engine moved a single row
from source to destination, then went back for the next one, one row
at a time, for every row in a million-row table. Instead, the data
flow engine uses a **buffer-oriented architecture**: it allocates a
block of memory — a buffer — fills it with as many rows as will fit,
and passes that entire buffer down the chain of transformations to the
destination. Every component in the data flow processes rows a buffer
at a time, not a row at a time.

This is also exactly what the **Data Viewer** you'll meet in Lesson 18
is showing you when it pauses "buffer by buffer" — you're watching the
real unit the engine works in.

## The two settings that decide buffer size

Two properties on the Data Flow task decide how big each buffer is,
and both have real, documented defaults:

- **DefaultBufferSize** — the default buffer size is **10,485,760
  bytes (10 MB)**. The absolute maximum a buffer can grow to is
  2³¹−1 bytes.
- **DefaultMaxBufferRows** — buffers hold **10,000 rows by default**.

The engine actually tunes the buffer at runtime and logs it: a
**BufferSizeTuning** log entry records exactly why and by how much it
adjusted a buffer's size for a given run. You'll see entries like this
in a package's execution log:

> "Rows in buffer type 0 would cause a buffer size greater than the
> configured maximum. There will be only 9637 rows in buffers of this
> type."

## Why fewer columns means better performance

A buffer holds a fixed number of *bytes*, not a fixed number of rows.
That means row width directly decides how many rows fit in a buffer:
a narrower row (fewer columns, smaller data types) lets more rows fit
in the same 10 MB buffer, so fewer buffers are needed to move the same
million rows through the pipeline. This is exactly why experienced SSIS
developers are strict about dropping columns a data flow doesn't
actually need as early as possible — every unused column you carry
along shrinks how many rows fit per buffer for the rest of the
pipeline.

## When buffers spill to disk

If the machine running the package doesn't have enough memory to hold
the buffers a data flow needs, SSIS temporarily writes ("spools") them
to disk instead of keeping them in RAM. You can watch for this with
the **Buffers spooled** performance counter — a nonzero, growing value
there means the data flow is swapping to disk, which is a clear
performance red flag worth investigating (usually by adding memory,
reducing buffer size, or trimming columns) rather than ignoring.

## Key terms

| Term | Meaning |
|---|---|
| Buffer | A block of in-memory rows the data flow engine moves as a single unit between components |
| DefaultBufferSize | The Data Flow task property controlling buffer size in bytes; default 10,485,760 (10 MB) |
| DefaultMaxBufferRows | The Data Flow task property capping rows per buffer; default 10,000 |
| BufferSizeTuning | A log entry recording how and why the engine adjusted a buffer's size at run time |
| Buffers spooled | A performance counter showing buffers being written to disk — a sign of insufficient memory |

## Lab

1. Open any package with a Data Flow task, click the Data Flow task on
   the Control Flow surface, and open the **Properties** window.
   Locate **DefaultBufferSize** and **DefaultMaxBufferRows** and
   confirm they match the documented defaults (10 MB / 10,000 rows).
2. Run the package once with logging enabled at the **Verbose** level,
   then check the log output for a **BufferSizeTuning** or
   **PipelineInitialization** entry. Read what it reports about the
   buffer size actually used for that run.
3. Pick any data flow you've built so far and count the columns
   flowing through it. Identify at least one column that isn't
   actually used by any downstream transformation or destination —
   that's a column you could safely remove to shrink row width.

## Check yourself

You're ready for Lesson 16 when you can explain, without looking: why
does the data flow engine move rows in buffers instead of one at a
time, and what are the two properties that control how big a buffer
is?
