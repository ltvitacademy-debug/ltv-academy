# Script — Exporting Reports

## Segment 1 (title)

Sometimes data needs to leave Salesforce entirely — into a spreadsheet, a board deck, a pivot table someone already lives in. Exporting turns a report's rows into a file, no login required.

## Segment 2 (screenshot: report run page)

Here's a real report run page. The Edit dropdown, right next to Add Chart and the refresh icon, is where Export lives — same entry point whether the report is a flat list or a grouped summary.

## Segment 3 (steps: two formats)

Export gives you two shapes. Formatted Report keeps what you see on screen: groupings, subtotals, even a chart image, as a dot-x-l-s-x file. Details Only strips all of that into flat rows as a C-S-V — no subtotals, no merged cells, just data. Details Only is almost always what you want when the destination is another tool.

## Segment 4 (steps: encoding and the manual trap)

Two things worth knowing. CSV exports let you change the character encoding, which only matters if accented names or non-English symbols come out garbled. And the real trap isn't the export itself — it's relying on a manual export for something recurring. If the same pull happens every week, that's a subscription with Attach File turned on, not a standing chore.

## Segment 5 (outro)

Export gets data out once; a subscription gets it out automatically, forever. Next up: the limits that quietly shape both — how many rows, how many scheduled reports, and what to do when a report starts timing out.
