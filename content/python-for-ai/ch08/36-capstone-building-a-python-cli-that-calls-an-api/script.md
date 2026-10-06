# Lesson 36 — Capstone: Building a Python CLI Tool That Calls an API · Voiceover script

Segments map 1:1 to slides. Target: ~2.5-3 minutes total.

---

## S1 · TITLE CARD

Time to build ask dot py for real. This lesson walks through every piece
in order: parsing a command-line argument, wrapping the API call in a
class, handling the failures that actually happen over a network, and
testing the parts that don't need a live connection.

## S2 · STEPS: The file layout

Three files, deliberately small. ask dot py holds both the command-line
logic and the API client. requirements dot txt pins the two dependencies.
test underscore ask dot py stays separate, so the tests can import from
ask dot py without running it as a script.

## S3 · CODE: Parsing the CLI argument

argparse is the standard-library way to build a CLI. Making prompt a
required positional argument means if someone runs this with no prompt at
all, argparse prints a usage message and exits on its own — no extra code
needed from you.

## S4 · CODE: The client class

This is the exact same pattern from lesson seventeen: a class that holds
configuration, here the API key, in init, and exposes one clear method.
resp dot raise for status, from lesson twenty-four, turns a bad HTTP
status into an exception immediately instead of silently returning
garbage.

## S5 · CODE: Handling failures without crashing

A real CLI tool shouldn't dump a raw Python traceback at a user. Catching
the specific requests exceptions from chapter five and printing a
one-line message to stderr, with a non-zero exit code so other programs
can detect the failure, is what separates a script from a tool.

## S6 · CODE: Testing without a live network call

unittest dot mock dot patch replaces requests dot post with a fake version
for the duration of the test, so it runs instantly and never touches the
real network — exactly the kind of test lesson thirty-one's checklist
called for.

## S7 · OUTRO CARD

Argument parsing, a client class, real error handling, and tests that
don't need the network — that's ask dot py. Next lesson: running the
finished tool for real, and wrapping up the whole capstone.
