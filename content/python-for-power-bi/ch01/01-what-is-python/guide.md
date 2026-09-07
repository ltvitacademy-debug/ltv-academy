# Lesson 1 — What Is Python & Why Use It in Power BI?

**Chapter 1 · Getting Started · Lesson 1 of 20**

## What you'll learn

- What Python is, in one sentence
- The three tools already living inside Power BI, and what each is actually for
- The two specific places Python plugs into Power BI — and the one place it can't
- What this 20-lesson course will and won't try to teach you

## Python, in one sentence

Python is a general-purpose programming language — not a Power BI feature,
not a Microsoft product, a real language used everywhere from web servers to
machine learning research. Power BI happens to know how to run it. That's the
entire relationship: Power BI doesn't extend Python, and Python doesn't
replace Power BI — it's a second, more powerful tool you can reach for from
inside the first one, when the built-in tools hit a wall.

## Three tools, already living inside Power BI

If you've built anything in Power BI, you've already used two of these three
tools without necessarily calling them by name:

| Tool | What it actually is | What it's for |
|---|---|---|
| **Power Query (M)** | The engine behind every "Transform Data" step | Connecting to sources, reshaping and cleaning data, before it loads |
| **DAX** | The formula language behind every measure | Calculations that respond to filters, slicers, and report interaction |
| **Python** | A general-purpose programming language | Everything the first two weren't built for |

Power Query and DAX were both purpose-built for Power BI — every button in
the Power Query Editor and every DAX function exists because someone at
Microsoft decided Power BI users would need it. Python wasn't built for
Power BI at all. It was built for everything, which is exactly its strength
and its limitation here: unmatched power, with none of Power BI's guardrails.

## What Python adds that neither tool can

Three concrete gaps Python fills, that this course spends real lessons on:

- **Data-cleaning patterns that are clumsy in M.** Power Query's UI-driven
  steps handle the common cases well; some text-cleaning and reshaping tasks
  are genuinely simpler as a few lines of Pandas than a dozen Power Query
  steps (Lessons 9-14 cover this directly).
- **Statistical and machine-learning libraries.** Power Query and DAX have no
  equivalent to Python's ecosystem for forecasting, clustering, or regression
  — that ecosystem simply doesn't exist inside Power BI's native languages.
- **Custom visuals no built-in chart type covers.** Lesson 19 builds a
  Matplotlib chart directly inside a Power BI report page — a level of visual
  customization the native visual gallery doesn't offer.

## Where Python actually plugs in — exactly two places

This matters more than it sounds like: Python does **not** become a fourth,
general-purpose tool sitting alongside Power Query and DAX everywhere in
Power BI. It plugs in at exactly two points:

1. **As a data source**, via Get Data → Python script — Python runs once,
   produces a Pandas DataFrame, and that DataFrame becomes a table in your
   model (Lesson 18 covers this specifically).
2. **As a visual**, via the Python visual — Python runs once per interaction
   to redraw a Matplotlib chart on the report canvas (Lesson 19).

## The one place Python can't go

Python cannot replace DAX. DAX measures recalculate live, per visual, per
filter context, as a user clicks around a report — that's the entire point
of DAX. A Python script runs once, at import or refresh time, and produces a
static result. If a calculation needs to respond to what a user clicks,
that's DAX's job, not Python's — no exceptions, and Lesson 20 makes this
distinction the whole point of the course's final lesson.

## What this course will and won't teach

This is deliberately **not** a general Python course. In twenty three-minute
videos, you'll learn exactly enough Python and Pandas to be dangerous inside
Power BI specifically — reading a CSV, cleaning it, reshaping it, and
handing it to Power BI as a data source or a visual. Software engineering
concepts (functions, classes, testing, packaging) are out of scope entirely;
if you finish this course wanting more, that's a different, longer course.

## Key terms

| Term | Meaning |
|---|---|
| Python | A general-purpose programming language Power BI can run scripts in |
| Power Query (M) | Power BI's built-in data-connection and cleaning engine |
| DAX | Power BI's formula language for interactive, filter-aware calculations |
| Pandas | The Python library that represents tabular data as a DataFrame |
| DataFrame | Pandas' table-shaped data structure — Power BI can only import this |

## Lab

1. Visit [python.org](https://www.python.org) and note the current stable
   Python version listed on the homepage — you'll install this exact version
   in Lesson 2.
2. Open Power BI Desktop and go to **File → Options and settings → Options →
   Python scripting**. Just look — the settings will be empty until Lesson 2
   installs Python and Lesson 3 configures this exact screen.
3. Write down one task you've done in Power Query or DAX that felt harder
   than it should have. Keep that note — by Lesson 20 you'll know whether
   Python would actually have helped, or whether it was the right tool all
   along.

## Check yourself

You're ready for Lesson 2 when you can name, without looking, the two exact
places Python plugs into Power BI, and explain in one sentence why DAX can
never be replaced by a Python script.
