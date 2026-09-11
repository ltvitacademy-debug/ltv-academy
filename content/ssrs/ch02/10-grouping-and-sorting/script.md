# Script — Grouping & Sorting

## Segment 1 (title)

We've been dragging fields into the Grouping pane for two lessons now without really looking at it closely. Let's fix that — plus cover the two completely different kinds of "sort" a report actually has.

## Segment 2 (screenshot: ssrb-rowgroups)

Here's a three-level Row Groups pane — country/region, then territory nested under it, then last name nested under that. And the relationship with the design surface runs both ways: select a group here, and the matching cell highlights on the canvas. Select a cell on the canvas, and the matching entry highlights here. Once a report gets complex, this pane is often the faster place to actually work.

## Segment 3 (screenshot: rs-basictablixdesigngroupingpanedefaultview)

Two different relationships live in this same pane. Drag a field under another one, and it becomes a child — indented, nested, repeating once per parent instance. That's Category with Subcat nested inside it here. But use the Add Group shortcut instead of a plain drag, and you get an adjacent group — a sibling at the same depth, a genuinely separate grouping. That's Year, sitting next to Geography rather than inside it.

## Segment 4 (steps: two-kinds-of-sort)

And there are two completely different kinds of sort. Design-time sort is baked into the report — set it once through Group Properties, and it controls render order every time. Interactive sort is different: it's a clickable button you add to a column header so the person viewing the report can re-sort detail rows on demand, without touching the report definition at all. You add it through Text Box Properties, Interactive Sorting. The two aren't mutually exclusive — you can have a sensible default and still let viewers override it per column.

## Segment 5 (outro)

Last lesson in this chapter: pulling all of this together into genuine print-friendly report layout.
