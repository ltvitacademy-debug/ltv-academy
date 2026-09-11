# Lesson 29 — Bookmarks & Document Maps

**Chapter 6 · Drilldowns & Navigation · Lesson 29 of 40**

## What you'll learn

- How a **bookmark** creates a jump-to target inside the same report
- How a **bookmark link** navigates to that target from anywhere else
  in the report
- How a **document map** builds an automatic, clickable table of
  contents alongside a rendered report
- How different rendering extensions represent a document map when a
  report can't show a live side pane

## Bookmarks: a jump-to target inside the report

A **bookmark** marks a specific location in a report so you can link to
it from elsewhere — a customized table of contents, or plain internal
navigation. To create one:

1. Select the report item (text box, image, chart, or a group) you want
   to jump to. Its properties appear in the Properties pane.
2. In the **Bookmark** field, type a label — for example `BikePhoto` —
   or select the Expression (**fx**) button for an expression that
   evaluates to a label. For a group, that expression is normally the
   group's own expression.

The bookmark string can be anything, but it **must be unique** in the
report. If it isn't, a link to that bookmark jumps to the *first*
matching bookmark it finds — silently, with no error.

## Bookmark links: navigating to a bookmark

Once a bookmark exists, link to it from any item with an Action
property:

1. Right-click the text box, image, or chart you want to turn into a
   link, and select **Properties**.
2. On the **Action** tab, select **Go to bookmark**.
3. In **Select bookmark**, enter or select the bookmark ID (or an
   expression that evaluates to one) — using the earlier example,
   `BikePhoto`.
4. Select **OK**. Optionally, format the linking text as blue and
   underlined on the Home tab, since SSRS doesn't do that automatically.

## Document maps: an automatic table of contents

A **document map** goes further than a hand-built set of bookmark
links — it renders a separate side pane next to the report, listing
clickable links arranged in a hierarchy. Selecting an entry refreshes
the report to the matching area. You build one by setting the
**DocumentMapLabel** property:

- **On any report item** (a table, matrix, gauge, chart) — set
  `DocumentMapLabel` to the text (or expression) you want shown in the
  map, directly in the Properties pane.
- **On unique group values** — select the group in the Grouping pane,
  choose **Edit Group**, select **Advanced** on the Tablix Group
  Properties dialog, and set the **Document map** box to an expression
  matching the group's own expression. Each unique value (say, each
  color in a color-grouped table) becomes its own link.

## How other renderers represent a document map

The document map pane itself is an HTML-viewer feature — Preview and
the Report Viewer. Every other rendering extension translates it
differently:

- **PDF** — renders the document map as the **Bookmarks** pane in
  Acrobat.
- **Excel** — renders it as a named worksheet containing the link
  hierarchy, alongside separate worksheets for each report section.
- **Word** — includes it as the document's table of contents.
- **Atom, TIFF, XML, CSV** — ignore the document map entirely.

## Key terms

| Term | Meaning |
|---|---|
| Bookmark | A named jump-to target set on a report item's Bookmark property |
| Go to bookmark | The Action-tab option that links an item to a bookmark elsewhere in the report |
| DocumentMapLabel | The property that adds an item (or a group's unique values) as an entry in the document map |
| Document map | An auto-built, hierarchical side pane of clickable links to areas of the rendered report |

## Lab

1. In a table grouped by category, select the group and set its
   **Document map** expression (Advanced page of Tablix Group
   Properties) to the group's own expression.
2. Add a `Bookmark` value to a chart elsewhere in the same report — for
   example `SalesChart`.
3. Add a text box near the top of the report, set its Action to **Go to
   bookmark** targeting `SalesChart`, and format it as a link.
4. Run the report. Confirm the document map pane lists every category as
   a clickable entry, and that your text box jumps straight to the
   chart.

## Check yourself

You're ready for Lesson 30 when you can explain, without looking: what's
the difference between a bookmark link and a document map entry, and how
does the PDF rendering extension represent a document map when it can't
show a live side pane?
