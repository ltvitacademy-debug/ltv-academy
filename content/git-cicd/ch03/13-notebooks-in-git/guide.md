# Lesson 13 — Notebooks in Git: The Diff Problem

**Chapter 3 · Git for Data Projects Specifically · Lesson 13 of 25**

## What you'll learn

- Why a `.ipynb` file's diff is unreadable by default — it's not a bug,
  it's the file format
- What a Jupyter notebook actually is under the hood (JSON, not
  Python source)
- `nbdime` — a real diff/merge tool built specifically for notebooks
- Practical habits that reduce notebook diff noise even without
  extra tooling

## A notebook is JSON, not source code

A `.py` file is plain text — a diff shows exactly the lines that
changed, and nothing else. A `.ipynb` file is **JSON**: cell code,
markdown, metadata, execution counts, and — critically — the base64-
encoded image data of every rendered plot output, all in one
structured file.

Run a plain `diff` (or look at a plain `git diff`) on two notebooks
that differ by one small code change, and this is what you get:

![A terminal `diff a.ipynb b.ipynb` output showing a two-line code change buried under walls of base64-encoded image data as diff noise.](/courses/git-cicd/ch03/13-notebooks-in-git/diff-bad-shortened.png)
*The real code change here is two lines. Almost everything else on screen is base64 noise from a changed plot's embedded image — unreadable, and not what anyone asked to review.*
Source: [nbdime documentation](https://nbdime.readthedocs.io/en/latest/)

This isn't a Jupyter bug or a Git misconfiguration — it's the direct
consequence of a notebook being a structured document with embedded
binary output, diffed with a tool built for line-based text.

## nbdime: a diff tool that understands notebooks

**nbdime** ("notebook diff and merge") parses the `.ipynb` JSON
structure itself, so it can show you a code diff as a code diff, and a
changed plot as an actual rendered image comparison — not raw bytes:

![nbdime's web-based diff view: a side-by-side code diff (with the exact line that changed) above a rendered before/after comparison of the plot's visual output.](/courses/git-cicd/ch03/13-notebooks-in-git/nbdiff-web.png)
*Same underlying change as the noisy diff above — nbdime shows the one line that actually changed and renders both plot versions instead of dumping their base64 encoding.*
Source: [nbdime documentation](https://nbdime.readthedocs.io/en/latest/)

Installing it wires directly into `git diff`:

```
pip install nbdime
nbdime config-git --enable --global
```

After that, `git diff` on a `.ipynb` file automatically routes through
nbdime's readable output instead of raw JSON — no change to your
day-to-day Git commands required.

## Habits that help even without nbdime

- **Clear outputs before committing** exploratory work. `Cell > All
  Output > Clear` (or `jupyter nbconvert --clear-output`) strips
  embedded images and execution counts, cutting diff noise
  dramatically, at the cost of losing the saved output.
- **Restart and run all before committing a "final" version.** Stale,
  out-of-order execution counts are their own source of noisy,
  meaningless diffs between two notebooks with identical logic.
- **Keep notebooks for exploration, move final logic to `.py` files.**
  A notebook that's become a real, reusable pipeline step is a strong
  signal it belongs in ordinary source code instead.

## Key terms

| Term | Meaning |
|---|---|
| `.ipynb` | Jupyter's file format — JSON containing cells, metadata, and outputs, not plain source |
| nbdime | An open-source tool that diffs and merges notebooks by their actual structure |
| Clear outputs | Stripping a notebook's saved outputs before committing, to reduce diff noise |
| Execution count | The `In [4]:` number Jupyter stamps on a cell — a common source of noisy diffs |

## Lab

1. Open a notebook with at least one plot, make a one-line code
   change, and run `git diff` on it before installing anything —
   look at how unreadable it is.
2. Install `nbdime`, run `nbdime config-git --enable --global`, and
   run `git diff` on the same file again — compare the difference.
3. Clear a notebook's outputs before committing it once, and note how
   much smaller the resulting diff is.

## Check yourself

You're ready for Lesson 14 when you can explain, in one sentence, why
a notebook's diff is unreadable by default — and name one real fix.
