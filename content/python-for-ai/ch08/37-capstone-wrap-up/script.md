# Lesson 37 — Capstone: Wrap-Up & Portfolio Presentation · Voiceover script

Segments map 1:1 to slides. Target: ~2.5-3 minutes total.

---

## S1 · TITLE CARD

ask dot py is built, tested, and handles failure without crashing. This
final lesson covers running it end to end, what a strong next step looks
like, and how to talk about this project — and this course — in an
interview.

## S2 · CODE: Running it for real

Set a real credential as an environment variable, the same pattern from
lesson twenty-five, not a hard-coded string. Run the tool with a real
prompt and you get a real answer back. Then run the test suite separately
— it passes without ever needing that credential at all.

## S3 · STEPS: Three realistic next steps

None of these are required for done, but they're worth knowing. A model
flag lets the user pick which model to call. A retry loop handles
transient failures like a rate limit or a server hiccup. And async batch
mode applies lesson thirty's gather pattern to a whole file of prompts at
once.

## S4 · STEPS: Talking about it in an interview

Lead with the decisions, not just the result. Why a class instead of a
bare function — state plus one clear interface. Why specific exception
handling instead of a bare except. Why the tests mock the network instead
of hitting it for real. Interviewers remember a candidate who can explain
a tradeoff.

## S5 · OUTRO CARD

Seven chapters took you from print hello world to a tested, type-hinted
CLI tool that calls a real API and recovers from failure — that arc is the
job, compressed into one project. Next course in the path: Git and GitHub
for Software Engineers, version control for exactly this kind of project.
