# Lesson 5 — The Script Performance Profiler

**Chapter 2 · Diagnosing Slow Scripts · Lesson 5 of 25**

## What you'll learn

- Why "it's probably that business rule" is a guess, and what turns it into a measurement
- How to turn on script-level debugging for a single transaction
- How to read the resulting script-by-script time breakdown
- Why the slowest-sounding script on paper isn't always the one actually costing the time
- How this connects back to the Slow Request Log you learned in Lesson 1

## From a measured total to a measured breakdown

Lesson 1's Slow Request Log told you a transaction took around four seconds, and that most of
that time fell under business rules or script execution rather than rendering or database wait.
That's real progress over a vague complaint, but it still leaves one question open: which
script, exactly? A single form save can easily trigger a dozen business rules, several client
scripts, and two or three Script Include calls. Staring at that list and guessing — "it's
probably the approval-routing rule, that one always felt heavy" — is exactly the kind of guessing
this course exists to replace. The tool that replaces the guess is script-level debugging:
instead of one total, you get a line for every script that ran, in the order it ran, each with
its own elapsed time attached.

## Turning on script-level debugging

From the user profile picture menu in the top-right corner of any page, open **Developer** and
switch on developer mode if it isn't already active. Underneath it sits a set of debug toggles —
**Debug Business Rule**, **Debug Security Rule**, **Debug UI Policy**, and **Debug Client Script**
among them. Turn on the ones relevant to what you're chasing — Business Rule and Script almost
always belong on first — and then reload the exact page, or repeat the exact save, that was
reported as slow. A debug panel appears at the bottom of the page listing every matching script
that fired during that single transaction, each on its own line, each stamped with how long it
took.

## Reading the breakdown

A real debug panel for one incident save might read like this:

```
*** Script: Business Rule "Validate Priority" (incident) - 142 ms
*** Script: Business Rule "Update Related Problem" (incident) - 1894 ms
***   Script Include: "IncidentUtils.syncRelatedProblems" - 1820 ms
*** Script: Client Script "Set mandatory fields" (incident) - 8 ms
```

Four scripts fired. Three of them are trivial. One — "Update Related Problem" — accounts for
1894 of roughly 2044 total milliseconds, and the nested line underneath it shows that almost all
of *that* time was spent inside one Script Include method, `IncidentUtils.syncRelatedProblems`.
Nobody had to guess which business rule mattered. The panel measured it directly, down to the
method that's actually responsible.

## Why this beats guessing, concretely

Without this panel, two business rules with similar-sounding names ("Validate Priority" and
"Update Related Problem") look equally suspicious from their titles alone. A developer under
pressure might spend an hour tracing through "Validate Priority" first, simply because it ran
first, or because its logic looks more complex on a skim. The debug panel removes that coin
flip. It tells you, for this specific slow transaction, exactly where the time went — so the
very next thing you do is open `IncidentUtils.syncRelatedProblems` and find out what inside it is
slow, not re-read four scripts hoping to spot something.

## Key terms

| Term | Meaning |
|---|---|
| Developer mode | A per-session toggle that exposes debug options and extra diagnostic UI |
| Debug Business Rule / Debug Script | Toggles that make the platform log each business rule and script execution with its elapsed time |
| Debug panel (session debug) | The bottom-of-page output listing every script that fired in one transaction, in order, each with its own duration |
| Script Include method | A reusable server-side function; the debug panel can show time spent inside a specific one |

## Check yourself

You're ready for Lesson 6 when you can explain, without looking: a form save triggers four
business rules. The debug panel shows three finish in under 150ms and one takes 1.8 of the
transaction's 2 total seconds. What do you do next, and why is that different from how you'd
have approached it without the panel?
