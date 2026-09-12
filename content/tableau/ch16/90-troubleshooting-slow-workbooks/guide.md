# Lesson 90 — Troubleshooting Slow Tableau Workbooks

**Chapter 16 · Performance Optimization · Lesson 90 of 95**

## What you'll learn

- How to record exactly what a workbook is doing, moment by moment,
  instead of guessing why it feels slow
- How to read the Timeline and Events views a performance recording
  produces
- The categories of things that actually cause Tableau workbooks to
  slow down
- Why "it feels slow" is not a diagnosis, and what a real one looks like

## Stop guessing — record it

Every optimization lesson from here starts from the same principle:
**measure before you optimize.** Tableau ships a built-in tool for
exactly this — **Performance Recording**. In Tableau Desktop, open
**Help > Settings and Performance > Start Performance Recording**,
interact with the workbook the way a real user would (open the view,
apply filters, switch sheets), then **Stop Performance Recording**.
Tableau automatically opens a new workbook holding the recording
itself.

## Reading the Timeline

The Timeline view lays out every recorded event as a horizontal bar
across elapsed time — the longer the bar, the longer that event took.

![The Performance Recording Timeline view: a table of Workbook, Dashboard, and Worksheet columns next to a horizontal bar chart plotting each event (Computing Layout, Executing Query, Geocoding, Connecting to Data Source, Generating Extract) against elapsed time in seconds.](/courses/tableau/ch16/90-troubleshooting-slow-workbooks/performance-timeline.png)
*A slider lets you hide events under a duration threshold, so the real offenders aren't buried in noise.*
Source: [Tableau Help — Record and Analyze Workbook Performance](https://help.tableau.com/current/pro/desktop/en-us/perf_record_create_desktop.htm)

The Timeline is where you spot *when* things went wrong relative to
each other — for instance, whether a slow "Generating Extract" event
happened once at load time (a one-time cost) versus a slow "Executing
Query" event that repeats every time a filter changes (a recurring,
much more painful cost).

## Reading the Events view

The Events view takes the same recorded events and sorts them by
duration, longest first — this is where you find the actual bottleneck
without hunting for it.

![The Performance Recording Events view: a horizontal bar chart titled 'Events Sorted by Time,' listing Generating Extract, Connecting to Data Source, Geocoding, Computing Layout, and Executing Query, sorted from longest to shortest duration in seconds.](/courses/tableau/ch16/90-troubleshooting-slow-workbooks/performance-events.png)
*Whatever sits at the top of this list is where optimization effort actually pays off first.*
Source: [Tableau Help — Interpret a Performance Recording](https://help.tableau.com/current/server/en-us/perf_record_interpret_server.htm)

A third view, **Query**, shows the literal query text Tableau ran
against the data source for each query event — useful when "Executing
Query" is the top offender and you need to know *which* query, not
just that one was slow.

## What actually causes slowness

A performance recording tells you *where* the time went; it's still up
to you to recognize *why*. The recurring culprits, by category:

| Category | Typical cause |
|---|---|
| **Data connection** | A live connection to a large or poorly indexed source, repeated on every interaction |
| **Extract generation** | A first-time or scheduled extract build against a very large or wide dataset |
| **Calculations** | Complex LOD expressions or table calculations recomputed on every render |
| **View density** | Too many marks, or a very high-cardinality dimension driving the view |
| **Dashboard load** | Many worksheets, filters, or objects all loading and querying at once |
| **Geocoding** | Custom geographic data or unusual location fields needing lookup work |

Notice the pattern: none of these are guesses. Each one is something
the Timeline or Events view would have pointed at directly, by name,
with a duration attached.

## "It feels slow" is not a diagnosis

The habit this lesson is really building is a discipline, not a trick:
resist the urge to "try things" (turn off a filter, simplify a
calculation, hope it helps) before you've actually recorded what's
slow. A performance recording turns "this dashboard feels sluggish"
into "Executing Query took 4.2 seconds and everything else is under
0.3 seconds" — an actual, falsifiable finding you can act on, and
verify improved, by recording again after you change something.

## Key terms

| Term | Meaning |
|---|---|
| Performance Recording | Tableau Desktop's built-in tool for recording timed events during workbook interaction |
| Timeline view | Shows recorded events as bars across elapsed time, in the order they occurred |
| Events view | Shows the same events sorted by duration, longest first |
| Query view | Shows the literal query text run for each recorded query event |

## Lab

1. Start a Performance Recording on one of your own workbooks from
   earlier in this course, interact with it for 30-60 seconds the way
   a real viewer would, then stop the recording.
2. Open the resulting performance workbook and identify the single
   longest event in the Events view. Name its category from the table
   above.
3. Write one sentence stating exactly what you'd try changing first,
   based on that finding — not a guess, a direct response to what the
   recording showed.

## Check yourself

You're ready for Lesson 91 when you can explain the difference between
the Timeline and Events views in one sentence each, and state why
"measure before you optimize" matters more than any individual
optimization trick.
