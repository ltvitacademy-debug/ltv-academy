# Script — Text Box Formatting

## Segment 1 (title)

Not everything in a report needs an expression behind it. Sometimes you just want to bold a header, put a border around a box, or run a column label sideways. Let's cover the fixed, direct formatting controls on a text box.

## Segment 2 (screenshot: formatted-report-currency-hyperlink-rotated)

This single report shows three separate text box techniques at once. The Sales column is currency formatted, using the Home tab's Number group — that's the full subject of the next lesson. The Link Text column is a real hyperlink: set through the text box's Action tab, choosing Go to URL, and then styled underlined and blue with the ordinary Font group so it visually reads as a link. And the Territory column header runs vertically, bottom to top — that's the WritingMode property, changed from Default to Rotate270, found in the Properties pane rather than the ribbon.

## Segment 3 (screenshot: hyperlink-before-rotation)

Let's isolate that last one, because three techniques at once can blur together. This is an earlier step in the same tutorial — the hyperlink is already done, Link Text is already blue and underlined. But look at Territory on the left: still horizontal, reading left to right. WritingMode hasn't been touched yet.

## Segment 4 (screenshot: territory-rotated-270)

One step later, same report: WritingMode just changed from Default to Rotate270 on that Territory column, and nothing else. Central, North, South — now they read bottom to top. That confirms it: rotation is purely a WritingMode property, completely separate from the hyperlink styling that carried over unchanged.

## Segment 5 (steps: ribbon vs properties dialog)

That last point matters — some controls live on the Home ribbon's Font group: bold, italic, underline, color, straight from the toolbar. Border and background fill don't live there. Right-click any text box, choose Text Box Properties, and you'll find a Border tab and a Fill tab — border style, width, and color on one, a solid background color or image on the other. Rectangles and images get the exact same two tabs on their own Properties dialogs.

## Segment 6 (outro)

Next lesson, we go deep on one specific formatting job — numbers, dates, and currency — including the real .NET format strings behind each option in that Number tab.
