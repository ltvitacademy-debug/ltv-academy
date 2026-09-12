# Lesson 25 — Titles, Captions, Reference Lines & Annotations

**Chapter 4 · Formatting & Visual Design · Lesson 25 of 95**

## What you'll learn

- How to edit a worksheet's title and caption
- What Tableau's auto-generated caption actually describes
- How reference lines add instant comparison context to a chart
- How annotations call out one specific mark, point, or area

## Titles

Every worksheet has a title, on by default (**Worksheet → Show Title**).
Double-click it to open the Edit Title dialog:

![The Edit Title dialog box, showing a <Sheet Name> placeholder in the text area, a formatting toolbar with font, size, bold, italic, underline, color, alignment, and Insert options, and Reset, OK, Cancel, Apply buttons.](/courses/tableau/ch04/25-titles-captions-reference-lines-annotations/edit-title.png)
*The default title is a <Sheet Name> placeholder — rewrite it, reformat it, or insert dynamic text via the Insert menu.*
Source: [Tableau Help — Format Individual Parts of the View](https://help.tableau.com/current/pro/desktop/en-us/formatting_specific_titlecaption.htm)

## Captions

The caption sits below the view and, unlike the title, Tableau writes it
for you by default:

![A caption reading "Sum of Sales for each Category. Colors shows details about Region. The view is filtered on Region, which keeps Central, East and South."](/courses/tableau/ch04/25-titles-captions-reference-lines-annotations/caption.png)
*The auto-generated caption describes exactly what's on the shelves and which filters are active — in a plain, readable sentence.*
Source: [Tableau Help — Parts of the View](https://help.tableau.com/current/pro/desktop/en-us/view_parts.htm)

Turn it on with **Worksheet → Show Caption**, then double-click to edit
it the same way as a title — or leave Tableau's auto-generated version,
which updates automatically as the view changes.

## Reference lines

A **reference line** draws a fixed or computed value directly onto the
chart, so every mark can be compared against it instantly:

![A bar chart of Sales by Segment, with a horizontal orange reference line labeled "Average = $95,466" running across all three bars.](/courses/tableau/ch04/25-titles-captions-reference-lines-annotations/reference-line.png)
*An Average reference line lets a reader see at a glance which segments beat the average and which fall short.*
Source: [Tableau Help — Reference Lines, Bands, Distributions, and Boxes](https://help.tableau.com/current/pro/desktop/en-us/reference_lines.htm)

Add one by right-clicking the axis and choosing **Add Reference Line**,
then picking a computation (Average, Median, Total, a constant, or a
custom calculation) and a scope (entire table, per pane, or per cell).

## Annotations

An **annotation** is a callout tied to one specific mark, point, or area
— not the whole chart:

![A red-bordered annotation callout box reading "This mark represents the sales and profit for the Canon PC940 Copier in the WEST." connected by a line to a diamond-shaped mark.](/courses/tableau/ch04/25-titles-captions-reference-lines-annotations/annotation.png)
*Right-click any mark and choose Annotate to attach a callout explaining exactly what that one mark means.*
Source: [Tableau Help — Add Annotations](https://help.tableau.com/current/pro/desktop/en-us/annotations_annotations_add.htm)

Tableau supports three annotation types: **mark** (attached to a specific
data point), **point** (attached to a location, like an axis value), and
**area** (a general callout not tied to any one mark — useful for calling
out a cluster of outliers).

## Key terms

| Term | Meaning |
|---|---|
| Title | The heading above a worksheet, editable via the Edit Title dialog |
| Caption | The auto-generated (or custom) description below a view |
| Reference line | A drawn line for a fixed or computed value, for instant comparison |
| Annotation | A callout tied to one mark, point, or area |

## Lab

1. On a bar chart of Sales by Segment, edit the title to something more
   descriptive than the default sheet name.
2. Turn on the caption and read what Tableau generated automatically —
   does it match what you expect the view to show?
3. Add an Average reference line to the same chart, then annotate the
   single highest bar with a mark annotation explaining why it stands out.

## Check yourself

You're ready for Lesson 26 when you can explain the difference between a
reference line and an annotation, and describe in one sentence what
Tableau's auto-generated caption actually contains.
