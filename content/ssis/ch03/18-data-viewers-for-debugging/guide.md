# Lesson 18 — Data Viewers for Debugging

**Chapter 3 · Data Flow Fundamentals · Lesson 18 of 49**

## What you'll learn

- Why you can't just "look at" data mid-flow the way you can query a
  table
- How a Data Viewer attaches to a path and pauses execution buffer by
  buffer
- The four things you can do once a Data Viewer is open
- Why Data Viewers are a development-time tool, not something you leave
  running in production

## No dialog screenshot for this one

Microsoft's current Data Viewer reference page is entirely text-based —
no screenshot of the Data Viewer window itself remains in the docs. This
lesson uses two diagram slides built from the real, documented behavior
instead of a fabricated screenshot.

## Why you need a special tool for this

In Chapter 1 you learned that the data flow engine moves rows through
memory buffers in batches, for performance. That's great for speed, but
it means you can't just pause a running package and "look at the data"
the way you'd run a SELECT against a table — the rows are streaming
through memory, not sitting in a place you can query. A **Data Viewer**
is SSIS's answer: a debugging tool attached directly to a **path** (the
line connecting two data flow components) that shows you the data
flowing through it, one buffer at a time.

## Attaching a Data Viewer

Every path in a Data Flow has a **Data Flow Path Editor**, opened by
right-clicking the path and selecting **Enable Data Viewer** (or from
the path's properties). Once enabled:

- At design time, SSIS Designer adds a small data viewer icon directly
  on the path in the design surface — a visual reminder it's active.
- At run time, a separate **Data Viewer window** opens the moment data
  starts flowing through that path, and **execution pauses** until you
  tell it to continue.

## What you can do once it's open

- **Green arrow (Continue)** — advance to see the next buffer's worth of
  rows. If the whole data flow fits in a single buffer, this button is
  disabled — there's nothing left to advance to.
- **Detach** — stop pausing execution on this viewer. The data keeps
  flowing through the path at full speed, but the viewer's contents
  stop updating.
- **Attach** — re-attach a detached viewer, resuming the pause-and-show
  behavior.
- **Copy Data** — copy the current buffer's rows to the clipboard, handy
  for pasting into a spreadsheet or another tool to inspect further.

## Where to put one

A Data Viewer only helps if it's on the *right* path. The typical use:
suspect a transformation is producing wrong output? Put a Data Viewer on
the path immediately **after** that transformation, and one immediately
**before** it for comparison — now you can see exactly what changed
between the two points, buffer by buffer.

## A development-time tool, not a production one

Every Data Viewer pauses the entire data flow while it's waiting for you
to click Continue. That's exactly what you want while debugging, and
exactly what you don't want in a scheduled production package — a
package with an active Data Viewer left on will simply hang, waiting for
a human who isn't there. Always remove or disable Data Viewers before
deploying a package.

## Key terms

| Term | Meaning |
|---|---|
| Data Viewer | A debugging tool attached to a path that displays flowing data buffer by buffer, pausing execution |
| Path | The line connecting two data flow components, representing the data moving between them |
| Data Flow Path Editor | The dialog used to configure a path, including enabling a Data Viewer |
| Green Arrow (Continue) | Advances the Data Viewer to display the next buffer |
| Detach / Attach | Stops or resumes the Data Viewer's pause-and-display behavior without removing it |

## Lab

1. In any package with a data flow, right-click a path between two
   components and enable a Data Viewer on it.
2. Run the package in debug mode. Confirm execution pauses and the Data
   Viewer window opens, showing the buffer's rows and columns.
3. Click the green arrow to advance (if more than one buffer exists),
   then click **Detach** and confirm the package finishes running
   without further pauses.
4. Before you move on, remove the Data Viewer — get in the habit now of
   never leaving one on a package you'd actually deploy.

## Check yourself

You're ready for Chapter 4 when you can explain, without looking: why
can't you just query mid-flight data the way you'd query a table, and
what happens to a package's execution the moment a Data Viewer's buffer
is ready to show?
