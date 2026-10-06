# Lesson 31 — Writing Basic Unit Tests · Voiceover script

Segments map 1:1 to slides. Target: ~2.5 minutes total.

---

## S1 · TITLE CARD

A unit test is a small, automated check that one piece of code does what
you expect — run in seconds, repeatable forever. This lesson covers
pytest, the standard tool for writing them in Python.

## S2 · CODE: Your first test

pytest finds any file named test underscore something dot py, and runs
every function inside it named test underscore something. No test runner
boilerplate, no special class to inherit from — a plain function with an
assert statement is a complete, runnable test.

## S3 · CODE: Running it

Run pytest and point it at the file. It reports exactly how many tests it
found, which passed, which failed, and how long the whole thing took —
here, one test, one pass, in a hundredth of a second.

## S4 · STEPS: assert is the whole mechanism

assert checks that a condition is true. If it is, nothing happens and the
test quietly passes. If it isn't, Python raises an AssertionError, and
pytest reports the failure with both sides of the comparison so you can
see exactly what was expected versus what you actually got.

## S5 · CODE: Testing that errors happen correctly

Some of the most important tests aren't about the happy path — they
confirm your code fails the right way. pytest dot raises only passes if
the code inside the with block actually raises that exact exception type;
if nothing gets raised, the test itself fails.

## S6 · OUTRO CARD

pytest, assert, and raises — that's enough to start testing real code.
Next lesson: type hints, which catch a whole category of bugs before you
even get to run a test.
