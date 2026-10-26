# Lesson 18 — Formatting for a Non-Technical Board Audience

**Chapter 5 · The Tableau Board Deck · Lesson 18 of 26**

## What you'll learn

- Why a Board audience needs a genuinely different formatting pass
  than the Executive dashboard needed
- How to turn raw field names and default number formatting into
  something a non-technical, partly-external audience reads correctly
  on first glance
- How to add context — titles, annotations, a short takeaway — to
  worksheets that were originally built for exploration, not
  presentation
- Why "it's technically correct" isn't the same bar as "it's
  board-ready"

## Who's actually in this room

Thornbury's board is a mix of internal executives and external
members — investors, an outside advisor — who don't work inside this
data every day the way an Executive running the business does. The
Power BI dashboard Chapter 4 built can afford a little analytical
density, because its audience lives in the numbers daily and is
clicking through it live, asking their own questions. A board deck
gets looked at, not interrogated — it has to read correctly in the
few seconds someone actually spends on each slide.

## Renaming fields and formatting numbers

Tableau's default field names come straight from the warehouse's real
column names — `LineTotal`, `TerritoryGroup` — which are exactly right
for a SQL query and exactly wrong for a board room. Right-click each
pill → **Rename** to plain language: `LineTotal` becomes "Total
Sales," `TerritoryGroup` becomes "Region." Then format every currency
field with **Format → Numbers → Currency (Custom)**, zero decimal
places, so the dashboard reads "$2.4M," not "$2,401,983.17" — a board
doesn't need the extra three digits of precision, and that level of
precision actively works against quick reading.

## Titles that say something, not just name a field

A worksheet titled "Sheet 3" or even "Total Sales by Region" describes
*what* is on screen but not *why it matters*. Retitling it something
like "Pacific Carries the Quarter" (if that's what the real data
actually shows) gives a board member the headline before they've
finished reading the chart — exactly the kind of framing a Board
deck needs that an Executive's click-through dashboard doesn't, since
the Executive is actively exploring rather than being told a
conclusion.

## Removing exploration, adding takeaway

Worksheets built in Lesson 17 may still carry tooltips full of every
field, gridlines meant for a builder's own reference, or axis labels
that only make sense mid-build. Each one gets a pass: **Format →
Lines** to remove unnecessary gridlines, a simplified tooltip showing
only the two or three numbers that matter, and — on the dashboard
itself — a text object with one or two sentences stating the real
takeaway in plain language, not a caption restating the chart's axis
labels.

## Why "technically correct" isn't the bar

Every number on this dashboard was already correct the moment Lesson
17 finished it — built from the same validated warehouse as every
other deliverable in this capstone. This lesson doesn't touch a single
number. It's entirely about whether a board member who looks at this
for ten seconds walks away with the right conclusion. A technically
correct chart that's misread because of a confusing label is a real
failure, even though no number on it is wrong — and it's a genuinely
different skill than building the chart in the first place.

## Key terms

| Term | Meaning |
|---|---|
| Board-ready | Formatted and framed for a brief, non-interactive viewing by a mostly non-technical audience, as opposed to hands-on exploration |
| Pill | Tableau's term for a field dragged onto a shelf in the view |
| Takeaway | A one- or two-sentence plain-language statement of what a chart actually means, distinct from its axis labels |

## Lab

1. Rename every field pill used on your dashboard to plain language.
2. Reformat every currency value to a rounded, human-readable format.
3. Retitle each worksheet with a real headline based on what the data
   actually shows, and add one takeaway sentence to the dashboard
   itself.

## Check yourself

You're ready for Lesson 19 when you can explain why the Board's deck
needs a different formatting pass than the Executive's Power BI
dashboard, and why a dashboard can be "technically correct" and still
fail at being board-ready.
