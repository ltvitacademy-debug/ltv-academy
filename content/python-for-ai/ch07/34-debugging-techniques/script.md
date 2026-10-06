# Lesson 34 — Debugging Techniques · Voiceover script

Segments map 1:1 to slides. Target: ~2.5 minutes total.

---

## S1 · TITLE CARD

Tests, type hints, and linting catch a huge share of bugs — but not all of
them. This lesson closes out the chapter with what to actually do once
something is broken: reading a traceback, breakpoints, and a couple of
habits for AI-calling code specifically.

## S2 · CODE: Reading a traceback, bottom to top

Read a traceback from the bottom up. The last line is the actual error —
here, a KeyError because the code looked up "respones," a typo for
"response." The lines above show the call stack that got you there: which
function was called from where.

## S3 · CODE: breakpoint(), pause and inspect

Drop breakpoint into your code and execution pauses right there, opening
pdb, Python's interactive debugger, in your terminal. Type data to see its
real value, data dot keys to check what's actually in it, n to step
forward, c to continue. This beats guessing from the error message alone.

## S4 · CODE: print() debugging, with intent

print debugging still works and is often the fastest first move — the
trick is being deliberate. A clear DEBUG prefix so the lines are easy to
find and delete later, and printing exactly the value you're unsure about,
not the whole object dumped blindly.

## S5 · CODE: The async-specific trap

Here's the single most common async bug. Forgetting await doesn't raise an
error — it silently hands you a coroutine object instead of the actual
result. If a debugging session turns up something that prints like
coroutine object, check for a missing await first.

## S6 · OUTRO CARD

Bottom-up tracebacks, breakpoint, deliberate prints, and watch for missing
awaits. Next up: the capstone — building a real Python CLI tool that calls
an API, using everything from this course.
