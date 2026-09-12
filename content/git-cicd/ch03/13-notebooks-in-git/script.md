# Script — Notebooks in Git: The Diff Problem

## Segment 1 (title)

A .py file is plain text — a diff shows exactly what changed. A .ipynb file is JSON: cell code, markdown, metadata, execution counts, and the base64-encoded image data of every rendered plot, all in one structured file.

## Segment 2 (screenshot: diff-bad-shortened)

Run a plain diff on two notebooks that differ by one small code change, and this is what you get — the real change is two lines, and almost everything else on screen is base64 noise from a changed plot's embedded image. This isn't a bug, it's the direct consequence of diffing a structured document with a tool built for line-based text.

## Segment 3 (screenshot: nbdiff-web)

nbdime parses the notebook's actual JSON structure, so it shows a code diff as a code diff, and a changed plot as a rendered before-and-after image comparison, not raw bytes. Installing it wires directly into git diff — no change to your day-to-day commands.

## Segment 4 (steps: habits that help)

Even without nbdime, three habits help: clear outputs before committing exploratory work, restart and run all before committing a final version so execution counts aren't noise, and move logic that's become a real pipeline step out of the notebook into a .py file.

## Segment 5 (outro)

Next lesson: large file handling and Git LFS — what to do when a data file genuinely needs to be versioned.
