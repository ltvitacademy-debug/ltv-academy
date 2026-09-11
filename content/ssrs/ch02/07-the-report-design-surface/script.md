# Script — The Report Design Surface

## Segment 1 (title)

Now that you know where a report's data comes from, let's get oriented in the Report Builder window itself — the ribbon, the panes, and where everything actually lives before we start placing items on the canvas.

## Segment 2 (screenshot: ssrb-designview)

This is the whole Report Builder window, numbered. One is the ribbon — Home, Insert, View. Two is Parameters, empty until you add some. Three is the Report Part Gallery, a deprecated feature you'll rarely open. Four is Properties, showing whatever's currently selected. Five is the actual design surface — the canvas. Six is Report Data, the pane from last lesson. Seven is Grouping — Row Groups and Column Groups. And eight is Run, which switches you into a live preview.

## Segment 3 (steps: not-wysiwyg)

Here's the single most common surprise: the design surface is not a page preview. Its size has no relationship to the physical page you'll print or export to. Growing the canvas doesn't grow your print area. Item position does matter — Report Builder preserves spacing when it renders — but the canvas itself is just a workspace. To actually see page breaks, you switch to Print Layout from the Run tab.

## Segment 4 (steps: right-click-targets)

And there are three completely different Properties dialogs depending on exactly where you right-click. The white body area, outside any item, gets you Body Properties. The gray area around the design surface gets you Report Properties — page setup lives there. And any specific item — a table, a text box — gets you that item's own Properties. Right-clicking the wrong spot is the single most common early mistake.

## Segment 5 (outro)

Next lesson, we finally put something on that design surface — the Table and List data regions.
