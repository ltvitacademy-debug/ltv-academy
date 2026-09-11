# Script — Bookmarks & Document Maps

## Segment 1 (title)

This lesson closes out Chapter 6 with two more ways to navigate inside a single report: bookmarks, and document maps — an automatic, clickable table of contents.

## Segment 2 (steps: bookmarks)

A bookmark just marks a spot. Select any report item — a text box, image, chart, even a group — and set its Bookmark property to a label, like BikePhoto, or an expression that evaluates to one. That label has to be unique in the report; if it isn't, a link to it just jumps to whichever match comes first, silently. Once the bookmark exists, you link to it from anywhere else: right-click the linking item, open Properties, go to the Action tab, and select "Go to bookmark." Enter the bookmark ID you're targeting, and you're done — though SSRS won't automatically make that text look like a link, so it's worth formatting it blue and underlined yourself.

## Segment 3 (steps: document maps)

A document map is a step up from hand-built bookmark links — it renders an entire separate side pane next to the report, with clickable entries arranged in a hierarchy. You build it with one property: DocumentMapLabel. Set it directly on any report item to add a single entry, or set it as an expression on a group's Advanced properties page to add every unique group value — every color, every category — as its own link. That side pane itself is an HTML-viewer feature. Other renderers translate it differently: PDF turns it into Acrobat's Bookmarks pane, Excel turns it into a named worksheet with the link hierarchy, and Word folds it into the document's table of contents. Atom, TIFF, XML, and CSV just ignore it.

## Segment 4 (outro)

That wraps up drilldowns and navigation. Next up is Chapter 7 — subscriptions, starting with standard subscriptions: getting a report delivered automatically, on a schedule, without anyone having to click Run.
