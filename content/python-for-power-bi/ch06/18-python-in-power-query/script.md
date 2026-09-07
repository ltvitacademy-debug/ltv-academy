# Lesson 18 — Python Scripts in Power Query · Voiceover script

Segments map 1:1 to slides. Target: 2-3 minutes — write for 340-380 words
at this voice's ~120 words/min pace.

---

## S1 · TITLE CARD

Lesson 1 said Python plugs into Power BI at exactly two points. This is
the genuine second one, and it's honestly easy to confuse with the
first if you're not paying attention.

## S2 · IMAGE: python-in-query-editor-5.png

Lesson 8's Get Data, Python script approach made Python the entire data
source from the very start. This is different — Run Python Script,
sitting right there on the Transform tab inside Power Query Editor, as
just one step in a pipeline that already has data loaded into it.

## S3 · IMAGE: python-in-query-editor-5b.png

Here's the part that genuinely surprises people the first time they see
it: your Power Query table is already sitting there, automatically,
available as a variable named dataset. You never write a single line to
create it yourself — it simply arrives, pre-loaded, the moment the
script editor opens up.

## S4 · IMAGE: python-in-query-editor-6.png

After running a script like this and selecting OK, expect a data-privacy
warning to appear every single time, without exception. It's not an
error message — it's a required step, because a Python script step
specifically counts as an external transformation for privacy purposes
inside Power Query.

## S5 · IMAGE: python-in-query-editor-8.png

Three lines of Python filled in missing values using a genuinely real
predictive method, and the resulting new column shows up in the Fields
pane exactly like any other column would, ready to build visuals on top
of immediately.

## S6 · OUTRO CARD

Run Python Script, dataset arriving already pre-loaded for you, and the
privacy warning that reliably follows every time. Lesson 19 covers the
other integration point entirely — Python as an actual visual sitting on
the report canvas itself.
