# Lesson 19 — Creating a Python Visual · Voiceover script

Segments map 1:1 to slides. Target: 2-3 minutes — write for 340-380 words
at this voice's ~120 words/min pace.

---

## S1 · TITLE CARD

The last piece of Chapter Six: Python as an actual, genuine visual,
sitting directly on the report canvas right next to every native chart
type Power BI ships with.

## S2 · IMAGE: python-visuals-2.png

Select the Python visual icon inside the Visualizations pane. The very
first time only, an Enable script visuals dialog box appears — a
one-time, per-file prompt, not something you'll actually see again on
the next Python visual you happen to add afterward.

## S3 · IMAGE: python-visuals-3.png

A placeholder image appears on the canvas, and the script editor opens
up along the bottom of the screen. Drag fields into the Values section,
and exactly like Lesson 18 already showed you, Power BI auto-generates a
dataset DataFrame from your selections — you genuinely never write that
generation code yourself.

## S4 · CODE: dataset.plot(kind='bar', ...) -> plt.show()

Write the actual chart itself using Matplotlib, and always end with plt
dot show — the specific line that actually tells Matplotlib to render
anything at all onto the canvas. Skip that line by accident, and the
script runs successfully with absolutely no visual to show for it, a
genuinely common first mistake people make.

## S5 · IMAGE: python-visuals-14.png

Select Run in the script editor's title bar, and Power BI plots it —
automatically replotting again every time you select Run, and also
whenever the underlying data refreshes, gets filtered, or gets
highlighted by another visual on the page.

## S6 · OUTRO CARD

Real limitations worth genuinely knowing: a hundred fifty thousand row
cap, seventy two DPI resolution only, and no cross-filtering capability
out of the visual itself toward anything else. Lesson 20 closes the
entire course: choosing correctly between Python, Power Query, and DAX.
