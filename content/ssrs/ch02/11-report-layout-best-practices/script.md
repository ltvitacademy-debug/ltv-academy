# Script — Report Layout Best Practices

## Segment 1 (title)

We've built tables, matrices, and grouped and sorted data across this whole chapter. Let's close it out with the thing that actually determines whether any of it survives being printed: real page layout.

## Segment 2 (steps: two-page-sizes)

There are two page sizes, and only one of them prints. The report body on the design surface is elastic — it grows to fit whatever you place on it, no ceiling. The physical page is fixed, 8.5 by 11 inches by default, and it's what PDF, Image, and Print renderers actually paginate against. If the report body's width, including margins, exceeds that physical page width, you get unwanted extra pages. That's the single biggest cause of "why did this print across three pages."

## Segment 3 (steps: where-settings-live)

Page size and margins live in two different places. Design mode — right-click the gray area around the design surface, Report Properties, Page Setup — saves permanently into the report definition. Run mode's Page Setup, on the Run tab, is session-only; close the report and it reverts. And margins are measured inward from the page edge — anything extending into that space simply gets clipped.

## Segment 4 (steps: print-friendly-checklist)

So the checklist: set an explicit page size and orientation, don't rely on the default. Set deliberate margins — even a half-inch on all sides. Strip out unused white space between data regions. Use rectangles as containers once layouts get complex. And if you're targeting PDF specifically, set an exact report width that accounts for the page size and margins together. Then preview in Print Layout — it's the only view that actually simulates the printed page.

## Segment 5 (outro)

That closes out Chapter 2. Chapter 3 moves into report parameters — making reports genuinely interactive instead of static.
