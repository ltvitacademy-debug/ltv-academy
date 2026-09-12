# Lesson 79 — Building Your First Professional Dashboard

**Chapter 14 · Dashboards · Lesson 79 of 95**

## What you'll learn

- What a Tableau **dashboard** actually is, and how it differs from a worksheet
- The real mechanics of assembling one: creating it, sizing it, and dragging
  worksheets onto the canvas
- A repeatable 5-step build order for turning a pile of finished worksheets
  into a dashboard that reads like something a hiring manager would trust
- Why this chapter — despite being only 8 lessons — is where this course
  wants you spending disproportionate hands-on time

## From worksheet to dashboard

Every chart you've built since Chapter 3 has lived on its own worksheet —
one chart, one canvas, one question answered. A **dashboard** is a different
object entirely: a combination of worksheets, filters, and objects assembled
onto one canvas so a viewer can see several related answers at once and
interact with all of them together. This is also, not coincidentally, the
actual deliverable a real BI Developer or Data Analyst job asks for. Nobody
gets hired to hand over a folder of 40 disconnected worksheets — they get
hired to hand over a dashboard a VP can open, understand in ten seconds, and
click around in without help.

To create one: right-click in the **Sheets** area at the bottom of the
workbook and choose **New Dashboard**, or use the **New Dashboard** icon next
to the worksheet tabs. That opens the Dashboard pane on the left — a **Size**
control up top (Desktop Browser, Automatic, or a fixed size) and a **Sheets**
list showing every worksheet in the workbook. From there, the actual
mechanics are almost entirely drag-and-drop:

![Tableau Dashboard pane showing the Sheets list on the left, with a worksheet named "Forecast" being dragged onto the dashboard canvas — an arrow highlights the drag motion toward a U.S. map view.](/courses/tableau/ch14/79-your-first-professional-dashboard/dashboard_create.png)
*Dragging a worksheet from the Sheets list straight onto the dashboard canvas — this is the core interaction behind every dashboard you'll ever build in Tableau.*
Source: [Tableau Help — Create a Dashboard](https://help.tableau.com/current/pro/desktop/en-us/dashboards_create.htm)

Drop a worksheet onto the canvas and Tableau adds it as a **zone**. Drop a
second one next to it and Tableau automatically splits the layout to fit
both. Every worksheet you drag in stays live — filter it, sort it, or edit
its calculated fields back on its own tab, and the dashboard zone updates
immediately, because it isn't a picture of the worksheet, it's a window onto
the same underlying worksheet object.

## Choosing a size before you build

The **Size** dropdown at the top of the Dashboard pane matters more than it
looks like it should. Your options:

| Size setting | What it does | When to use it |
|---|---|---|
| **Desktop Browser (1000×800)** | Fixed pixel dimensions, the Tableau default | Good starting point for a first dashboard — predictable, easy to reason about |
| **Automatic** | Stretches to fill whatever window or device displays it | Tempting, but unpredictable — objects can end up oddly stretched on a different screen |
| **Range** | You set a minimum and maximum width/height, and Tableau scales between them | The professional middle ground — flexible without collapsing |
| **Fixed Size (custom)** | An exact pixel size you specify | Best when the dashboard is destined for one known screen or embed |

For your first professional dashboard, start with a fixed or ranged size you
control. "Automatic" feels safer because it sounds flexible, but in practice
it makes precise layout work (Lesson 80's containers, Lesson 81's KPI
headers) much harder to get pixel-perfect, because the canvas keeps
resizing itself while you work.

## A 5-step build order that actually works

Professionals don't drag worksheets onto a blank dashboard in random order
and hope it comes together. There's a build order that consistently produces
a clean result:

1. **Finish every worksheet first.** A dashboard assembles worksheets — it
   doesn't fix a badly-formatted one. If a chart's titles, colors, or
   tooltips aren't right on its own tab, fix that before it ever touches the
   dashboard canvas.
2. **Set the dashboard size before dragging anything in.** Changing size
   after the layout is built forces you to redo spacing and container work.
3. **Place the largest, most important view first.** This becomes your
   anchor — everything else gets arranged around it, not the other way
   around.
4. **Add supporting views and filters next**, watching how Tableau's
   automatic layout responds to each addition.
5. **Add the KPI header and any global filters last**, once you can see the
   actual shape of the dashboard around them — this is exactly what Lesson
   81 covers in depth.

## Key terms

| Term | Meaning |
|---|---|
| Dashboard | A combination of worksheets, filters, and objects assembled onto one interactive canvas |
| Zone | One rectangular region of a dashboard holding a worksheet, filter, legend, or object |
| Dashboard pane | The left-hand panel (Size + Sheets list) used to build and size a dashboard |
| Fixed / Range / Automatic sizing | The three size modes governing how a dashboard's dimensions behave across screens |

## Lab

1. Open any workbook from Chapters 3-13 with at least three finished
   worksheets. Create a new dashboard, set its size to a **Range** (try
   min 800×600, max 1400×900), and drag your largest worksheet in first.
2. Add two more worksheets to the same dashboard, following the 5-step
   order above. Resize the browser preview (or use **Device Preview**) and
   watch how the Range setting behaves compared to what Automatic would do.

## Check yourself

You're ready for Lesson 80 when you can explain, in your own words, why a
dashboard's worksheets stay "live" instead of being static images, and why
this course recommends finishing worksheets and setting dashboard size
*before* dragging anything onto the canvas.
