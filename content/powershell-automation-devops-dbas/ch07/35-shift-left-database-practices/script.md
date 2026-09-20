# Script — Shift-Left Database Practices

## Segment 1 (title)

Lesson 34 covered getting a DBA into conversations earlier. This lesson names the broader principle behind that: shift-left, and how the CI/CD pipeline from Chapter 4 is exactly where shift-left database practices live in practice.

## Segment 2 (steps: where problems get caught)

Without shift-left practices, a bad migration surfaces in production — a page slows down, an alert fires, a DBA gets paged, and the fix happens under incident pressure. The same problem, caught in code review or CI before the change even merges, is a five-minute fix instead of an incident.

## Segment 3 (code: what CI actually checks)

Here's what that looks like concretely — a CI stage that runs a migration against a throwaway copy of the schema, fails on a destructive change without an explicit flag, and warns when a new query in the pull request has no supporting index. All of it runs before merge, on every pull request, without a person doing it by hand.

## Segment 4 (steps: it's about cost)

The real argument for shift-left is cost, not virtue. A schema problem caught in review costs a comment and a five-minute fix. The same problem caught in production costs an incident, a postmortem, and a rushed fix made under far worse conditions.

## Segment 5 (outro)

Shifting left doesn't eliminate problems, it changes which version of finding out you get — and it's cheaper every time. Next up: blameless postmortems for database incidents, for the problems that still make it to production despite all of this.
