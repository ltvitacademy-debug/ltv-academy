# Lesson 12 — Power Query Editor Explained · Voiceover script

Segments map 1:1 to slides. Each segment is one TTS call so slide timing follows
the audio. Target: ~3-4 minutes total.

---

## S1 · TITLE CARD (SVG: lesson title, LTV brand)

Chapter Two got data in. Chapter Three cleans it up before it ever reaches
a report. Everything from here through Lesson 23 happens in one place:
Power Query Editor. Let's open it properly.

## S2 · IMAGE: query-overview-transform.png (Transform data button)

Same button you've been skipping past since Lesson 4 — Transform Data,
instead of Load. It opens its own window, separate from the report canvas,
on purpose. Everything here happens before your data ever reaches a visual.

## S3 · IMAGE: query-overview-with-data-connection.png (four areas)

Four working areas. Ribbon on top. Your queries, listed on the left. The
actual data, live, in the center. And on the right, Query Settings — every
step you've taken, in order. That last one is what this entire chapter is
really about.

## S4 · IMAGE: query-overview-ribbon.png (Home ribbon)

The Home tab holds what you'll use constantly: new connections, refreshing
the preview, and Close and Apply, which is how you leave the editor when
you're done. Three more tabs sit beside it — Transform, Add Column, and
View — and you'll meet each one properly as this chapter goes on.

## S5 · IMAGE: query-overview-the-left-pane.png (Queries pane)

The Queries pane lists every table you're working on — one query per
table. Later in this chapter we combine more than one, merging and
appending queries together.

## S6 · IMAGE: query-overview-query-settings-pane.png (Applied Steps)

And here's Applied Steps. Every single cleaning action — changing a type,
removing a column, filtering rows — lands here, in order. This is the one
idea to really hold onto: Power Query doesn't change your original data.
It records a sequence of steps, and replays that exact sequence on
whatever data shows up next time you refresh.

## S7 · IMAGE: query-overview-advanced-editor.png (Advanced Editor M code)

Every step you clicked through the ribbon is really just generating code
behind the scenes, in a language called Power Query M. You can see it
directly in the Advanced Editor. You won't need to write it by hand for
most of this course — but it's there, if a step ever needs a small manual
tweak the ribbon can't quite make.

## S8 · OUTRO CARD (SVG: next lesson, LTV seal)

Ribbon, queries, data, and Applied Steps — that's Power Query Editor.
Every lesson from here is really just another kind of step to add to that
list. Next up: changing data types, the cleaning step nearly every query
needs first. See you there.
