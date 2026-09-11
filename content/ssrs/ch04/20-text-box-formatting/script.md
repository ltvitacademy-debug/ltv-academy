# Script — Text Box Formatting

## Segment 1 (title)

Not everything in a report needs an expression behind it. Sometimes you just want to bold a header, put a border around a box, or run a column label sideways. Let's cover the fixed, direct formatting controls on a text box.

## Segment 2 (screenshot: formatted-report-currency-hyperlink-rotated)

This single report shows three separate text box techniques at once. The Sales column is currency formatted, using the Home tab's Number group — that's the full subject of the next lesson. The Link Text column is a real hyperlink: set through the text box's Action tab, choosing Go to URL, and then styled underlined and blue with the ordinary Font group so it visually reads as a link, exactly like it would in a word processor. And the Territory column header runs vertically — that's the WritingMode property, changed from Default to Rotate270, found in the Properties pane rather than the ribbon.

## Segment 3 (steps: ribbon vs properties dialog)

That last point matters — some controls live on the Home ribbon's Font group: bold, italic, underline, color, straight from the toolbar. Border and background fill don't live there. Right-click any text box, choose Text Box Properties, and you'll find a Border tab and a Fill tab — border style, width, and color on one, a solid background color or image on the other. Rectangles and images get the exact same two tabs on their own Properties dialogs.

## Segment 4 (outro)

Next lesson, we go deep on one specific formatting job — numbers, dates, and currency — including the real .NET format strings behind each option in that Number tab.
