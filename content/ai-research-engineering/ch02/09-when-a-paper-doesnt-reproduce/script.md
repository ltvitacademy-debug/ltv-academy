# Script — When a Paper Doesn't Reproduce

## Segment 1 (title)

Sooner or later you'll do everything right — official code, matched hyperparameters, multiple seeds, the correct dataset version — and still not get the reported number. This lesson covers what to do next, in order, so you don't assume the bug is always yours, and don't jump to "the paper is wrong" before you've actually earned that conclusion.

## Segment 2 (steps)

Start by ruling out your own setup: are you really running the official code unmodified, with the right seeds, hyperparameters, and dataset version? Diff your environment against theirs — library, CUDA, and Python version drift is a common silent cause, especially for code that's a few years old. Then check the repository's issues and forks before contacting anyone; the mismatch is very often already reported, sometimes with a fix or a maintainer's explanation attached.

## Segment 3 (steps)

If that turns up nothing, email the authors — a normal part of research practice, not an imposition on their time. State exactly what you ran, what you expected, and what you've already ruled out, and ask one specific question. Vague reports get vague replies; specific ones tend to get specific, useful answers.

## Segment 4 (steps)

Document the whole attempt as if someone else has to pick it up without you: exact code version, environment, data version, every seed and its individual result, and the precise gap from what was reported. If the result still won't hold after all of that, a scoped, specific write-up of the failure is a legitimate research contribution, not just a personal setback to move past quietly.

## Segment 5 (outro)

Doing this once, for one paper, is useful on its own. The final lesson in this chapter is about turning the whole chapter's habits into something you sustain for years, not a skill you deploy once and set aside.
