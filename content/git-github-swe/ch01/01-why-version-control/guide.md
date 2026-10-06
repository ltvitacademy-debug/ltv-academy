# Lesson 1 — Why Version Control?

**Chapter 1 · Git Fundamentals · Lesson 1 of 22**

## What you'll learn

- The problem version control actually solves — and why "just save another copy" breaks down
- What a version control system tracks: snapshots, history, and who changed what
- Why Git specifically became the standard, and how it differs from older centralized systems
- The vocabulary you'll use for the rest of this course: repository, commit, history

## The problem: working without version control

Every developer starts the same way — editing files directly, with no safety
net. The first time something breaks, the instinct is to protect yourself by
duplicating the file:

```
report.py
report_v2.py
report_v2_FINAL.py
report_v2_FINAL_fixed.py
report_v2_FINAL_fixed_ACTUALLY.py
```

This is version control's prehistory, and it fails fast once more than one
person touches the project. Two people editing "the same" file by email or a
shared drive overwrite each other's work with no warning. There's no record
of *why* a change was made, no way to see what the file looked like last
Tuesday, and no way to undo a bad edit without hunting through old copies —
if they even still exist.

## What a version control system actually does

A version control system (VCS) replaces "save another copy" with a single
tracked history of the project. Instead of files named `_v2_FINAL`, every
meaningful change becomes a **snapshot** — a recorded, timestamped,
attributed point in the project's history that you can always return to.

That gives you, for free:

- **History** — every change, who made it, when, and (if they wrote a good
  message) why
- **Recoverability** — revert any file, or the whole project, to any
  previous snapshot
- **Safe parallel work** — two people can both edit the project at once
  without silently overwriting each other
- **Confidence to experiment** — try something risky, knowing you can always
  get back to where you started

## Why Git

Git, created by Linus Torvalds in 2005 for Linux kernel development, is a
**distributed** version control system: every developer's machine holds a
full copy of the project's entire history, not just the current files. That
matters for two reasons covered across this chapter — it's why Git works
offline, and it's why branching and merging (Lessons 4–6) are fast and
cheap compared to older centralized systems like Subversion, where branching
meant talking to a central server for almost everything.

Git isn't the only version control system, but it's the one nearly every
software team, and GitHub itself, is built around — which is why this course
spends Chapters 1–2 on it before GitHub's own collaboration features.

## Key terms

| Term | Meaning |
|---|---|
| Version control system (VCS) | Software that tracks changes to files over time |
| Repository ("repo") | The tracked project — its files plus their full history |
| Commit | A saved snapshot of the project at a point in time |
| Distributed VCS | Every clone holds the full history, not just a central server |

## Check yourself

You're ready for Lesson 2 when you can explain, without looking: what
specifically breaks about naming files `_v2_FINAL` once two people are
working on the same project, and what a commit gives you that a saved copy
doesn't.
