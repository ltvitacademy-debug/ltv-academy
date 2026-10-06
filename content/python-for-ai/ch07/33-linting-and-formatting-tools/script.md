# Lesson 33 — Linting & Formatting Tools · Voiceover script

Segments map 1:1 to slides. Target: ~2.5 minutes total.

---

## S1 · TITLE CARD

Tests check that code works. Linters and formatters check that code is
consistent and free of common mistakes. This lesson covers the two tools
you'll see in nearly every real Python project: black and ruff.

## S2 · CODE: Formatting with black, before

Here's some technically valid but messy Python — inconsistent spacing,
awkward parentheses, no agreement on quote style. Nothing here is wrong,
exactly, but it's the kind of thing that turns every code review into an
argument about style instead of substance.

## S3 · CODE: Formatting with black, after

Run black on it, and it rewrites the whitespace, quotes, and line breaks
into one consistent style automatically. black is deliberately almost
non-configurable — the point isn't that this exact style is objectively
best, it's that nobody on a team spends time debating it ever again.

## S4 · CODE: Catching real problems with ruff

ruff is different — it doesn't rewrite your code, it reports problems.
Here it flags an unused import and an undefined name, which is actually a
typo: retrun instead of return. ruff catches that without ever running the
program.

## S5 · CODE: A minimal pyproject.toml

Both tools read their settings from pyproject dot toml, the standard place
for Python project configuration. One file, checked into the repo, so
every contributor and every CI run enforces the exact same rules.

## S6 · OUTRO CARD

black for style, ruff for real problems, pyproject dot toml to keep both
consistent across a team. Next lesson: debugging techniques, for the bugs
that make it past both of these tools.
