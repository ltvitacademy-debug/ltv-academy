# Lesson 32 — Type Hints · Voiceover script

Segments map 1:1 to slides. Target: ~2.5 minutes total.

---

## S1 · TITLE CARD

Python never requires you to declare a variable's type, and that's not
changing. But you can optionally annotate one, and tools like your editor
and mypy will use those annotations to catch mistakes before you ever run
the code.

## S2 · CODE: Basic hints

name colon str means this parameter is expected to be a string. The arrow
str means this function returns a string. Python itself doesn't enforce
any of this at runtime — you could still call greet with a number and it
would run. The value comes from tools reading the hints.

## S3 · CODE: Hinting collections

list of float says every element in this list is a float. dict of string
to int says a dictionary with string keys and integer values. This is
exactly the shape of data you're constantly passing around when working
with AI API responses.

## S4 · CODE: Optional values

Optional string means a string, or None. It exists because real functions
like dict dot get genuinely can return None — the hint makes that
possibility visible right in the function's signature, instead of a
surprise three calls later when something crashes.

## S5 · STEPS: Why bother if Python won't enforce it

A separate tool, mypy, reads your type hints and checks your entire
codebase for mismatches without running any of it — catching a bug that
would otherwise only surface when that exact line finally executes. Most
editors use the same hints live, for autocomplete and inline warnings.

## S6 · OUTRO CARD

Hints on parameters, return values, collections, and optionals — enough to
start reading real AI-codebase signatures. Next lesson: linting and
formatting tools, the other half of keeping a codebase clean.
