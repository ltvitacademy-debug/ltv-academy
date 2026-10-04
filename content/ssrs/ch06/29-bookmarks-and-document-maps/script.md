# Script — Bookmarks & Document Maps

## Segment 1 (title)

This lesson closes out Chapter 6 with two more ways to navigate inside a single report: bookmarks, and document maps — an automatic, clickable table of contents.

## Segment 2 (steps: bookmarks)

A bookmark just marks a spot. Select any report item — a text box, image, chart, even a group — and set its Bookmark property to a label, like BikePhoto, or an expression that evaluates to one. That label has to be unique in the report; if it isn't, a link to it just jumps to whichever match comes first, silently. Once the bookmark exists, you link to it from anywhere else: right-click the linking item, open Properties, and go to the Action tab.

## Segment 3 (screenshot: action-tab-four-types.jpg)

Here's that Action tab. Four choices sit under "Enable as an action": None, Go to report, Go to bookmark, and Go to URL — this capture has Go to URL selected, but for a bookmark link you'd pick Go to bookmark instead, then enter the bookmark ID you're targeting in the Select bookmark box that appears underneath. Same dialog, same tab, just a different radio button and a bookmark name instead of a URL expression.

## Segment 4 (screenshot: link-text-font-format.jpg)

SSRS won't automatically make that linking text look like a link, so it's worth formatting it yourself. Same Text Box Properties dialog, Font tab this time: set Color to Blue and Effects to Underline, and the Sample box at the bottom previews exactly what your reader will see — blue, underlined text that behaves like the hyperlink it now is.

## Segment 5 (steps: document maps)

A document map is a step up from hand-built bookmark links — it renders an entire separate side pane next to the report, with clickable entries arranged in a hierarchy. You build it with one property: DocumentMapLabel. Set it directly on any report item to add a single entry, or set it as an expression on a group's Advanced properties page to add every unique group value — every color, every category — as its own link.

## Segment 6 (screenshot: document-map-pane-rendered.jpg)

That's what it looks like rendered. This report's document map pane lists three entries — Sales Territory with Total Due, Sales Territory, and Sales by Status and Country — each one a DocumentMapLabel set somewhere in the report. Click any entry and the viewer jumps straight to that part of the report on the right. That side pane itself only exists in the HTML viewer — Report Builder's preview and the web portal.

## Segment 7 (screenshot: document-map-excel-worksheet.jpg)

Export that same report to Excel, and the document map doesn't disappear — it becomes its own worksheet. Here it's labeled "Sales by Region DM and Bookmarks," with the exact same three entries as blue hyperlinks. Click one and Excel jumps to the matching worksheet, the same way the HTML pane jumps to the matching section.

## Segment 8 (screenshot: document-map-pdf-bookmarks.jpg)

Export to PDF instead, and the document map becomes Acrobat's own Bookmarks pane on the left — same three entries, same hierarchy, just living inside the PDF reader's native bookmark feature instead of a custom SSRS pane. Word takes a third approach: it folds the document map into the document's table of contents. Atom, TIFF, XML, and CSV just ignore it.

## Segment 9 (outro)

That wraps up drilldowns and navigation. Next up is Chapter 7 — subscriptions, starting with standard subscriptions: getting a report delivered automatically, on a schedule, without anyone having to click Run.
