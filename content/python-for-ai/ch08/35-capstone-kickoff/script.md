# Lesson 35 — Capstone Kickoff · Voiceover script

Segments map 1:1 to slides. Target: ~2.5 minutes total.

---

## S1 · TITLE CARD

Seven chapters of syntax, data structures, OOP, environments, HTTP calls,
async, and testing all lead here. The capstone is one project: a
command-line tool that takes a prompt, calls a real API, and prints a
formatted result.

## S2 · CODE: What you're building, ask.py

Here's the actual command a user types: python ask dot py, followed by a
prompt in quotes. The script reads that prompt from the command line,
sends it to an API, and prints the response back — with real error
handling, not a raw crash, if anything goes wrong.

## S3 · STEPS: What "done" looks like

Done means a specific checklist, not a vibe. The prompt comes in as a
command-line argument, not hard-coded. There's a real HTTP call with error
handling for a missing key, a timeout, or a bad response. And there are
real pytest tests plus type hints on the main functions.

## S4 · STEPS: Skills this project pulls together

This project deliberately reuses almost everything from the course.
Functions and dictionaries from the early chapters, a small client class
like lesson seventeen's wrapper, requests and its error-handling patterns
from chapter five, and type hints and tests from the chapter you just
finished.

## S5 · OUTRO CARD

One CLI tool, a clear done-checklist, built from skills you already have.
Next lesson: building it for real — argument parsing, the client class,
and error handling, piece by piece.
