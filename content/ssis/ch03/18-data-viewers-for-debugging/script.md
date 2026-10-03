# Script — Data Viewers for Debugging

## Segment 1 (title)

You can't just query data mid-flight in a data flow the way you'd query a table. This lesson covers the tool that solves that: Data Viewers.

## Segment 2 (screenshot: enable-data-viewer-menu.png)

It starts with a right-click. Every path between two components has
this same context menu, and Enable Data Viewer is right there in it —
no separate dialog to hunt for, no configuration step before you can
turn one on.

## Segment 3 (steps: attaching)

Remember from Chapter 1: the data flow engine moves rows through memory buffers in batches, for speed. That means there's no table sitting there for you to SELECT from while a package runs. A Data Viewer attaches directly to a path — the connector between two components — and the moment data starts flowing through it, a Data Viewer window opens and execution pauses, showing you exactly what's in that buffer.

## Segment 4 (screenshot: close-data-viewer.png)

Once it's on, SSIS Designer leaves you a reminder right on the canvas —
this small magnifying-glass icon sitting on the path, reading how many
rows it last showed. It's easy to forget a Data Viewer is still
attached days later; this icon is exactly how you'd notice.

## Segment 5 (screenshot: data-viewer-window.jpg)

And this is the window itself, mid-run. The green arrow, Detach, and
Copy Data sit right at the top, the actual rows fill the grid below,
and the status bar tells you precisely which buffer you're looking at —
forty-eight rows, one buffer, in this example.

## Segment 6 (steps: controls)

Once it's open, you've got four moves. The green arrow advances to the next buffer. Detach stops the pausing — data keeps flowing at full speed, the viewer just stops updating. Attach brings that pause-and-show behavior back. And Copy Data grabs the current buffer's rows to your clipboard. The best place to put one: right after a transformation you suspect is misbehaving, so you can see exactly what changed.

## Segment 7 (outro)

One hard rule: always remove Data Viewers before deploying a package. That pause-and-wait behavior is perfect while you're debugging, and it will hang a scheduled production run dead in its tracks, waiting on a human who isn't there. Next chapter, we move into the transformations themselves — starting with Lookup.
