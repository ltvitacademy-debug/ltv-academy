# Setting Engineering Standards Across a Team

Lesson 16's postmortem produced a concrete fix for one incident. This lesson covers the next, harder problem: turning a lesson learned once into a standard the whole team actually follows going forward — and why most attempts at "setting a standard" fail not because the standard was wrong, but because of how it was introduced.

## What you'll learn

- Why a standard announced in a document and never discussed usually gets ignored
- The difference between a standard that's enforced by a human and one enforced by tooling
- How to introduce a new standard without it reading as "senior engineer imposes new rule"
- When a standard should be a hard requirement vs. a strong default that can be consciously overridden

## Why an announced standard often gets ignored

A Slack message linking to a new "engineering standards" document, with no further follow-up, is one of the least effective ways to actually change how a team works — not because the content is wrong, but because reading a document and changing a habit are different things, and nothing about the announcement closes that gap. A standard that isn't discussed, isn't modeled by the people proposing it, and isn't checked anywhere tends to quietly fade: people default back to whatever they were already doing, especially under time pressure, unless something in their actual workflow makes the new standard the easier path, not an extra step to remember.

## Human-enforced vs. tooling-enforced standards

A standard that depends on a human remembering to check for it in code review ("make sure every new ADR documents alternatives considered") will be followed inconsistently — reviewers are busy, tired, or new, and will miss it sometimes no matter how well-intentioned everyone is. A standard that's enforced by tooling (a CI check that fails a pull request if a new ADR file is missing an "Alternatives Considered" section, a linter rule that fails a build if an API endpoint has no rate-limit handling) gets followed consistently, because it doesn't depend on anyone remembering anything — the system just won't let the gap through. Wherever a standard CAN be enforced by tooling instead of human vigilance, it should be; human-enforced standards should be reserved for the genuinely judgment-based cases tooling can't check.

## Introducing a standard without it landing as "a rule was imposed on me"

A standard that a team was never consulted about, delivered as a finished document from the senior engineer, tends to be followed resentfully or not at all — even when it's a genuinely good standard. A more durable approach: bring the *problem* to the team first ("we've had three incidents now where the test data didn't reflect production — should we have a standard for keeping it in sync?"), let the team participate in shaping the actual standard, and only then write it down. A standard the team helped design is a standard the team has some ownership of; a standard handed down is a standard the team merely tolerates.

## Hard requirement vs. strong default

Not every standard should be a hard, unbreakable rule. A **hard requirement** (every production deploy requires an automated test pass; every ADR documents alternatives considered) should be enforced with no exceptions, because the cost of letting it slide is high and the standard genuinely applies universally. A **strong default** (prefer this specific logging library; design docs should typically be under 5 pages) should be followed in the overwhelming majority of cases, but allows a conscious, explained exception when a specific situation genuinely warrants one — a rigid standard applied to every possible case, with zero room for judgment, tends to produce workarounds and quiet non-compliance instead of actual adherence, because someone eventually hits a real case the rule wasn't designed for.

## Key terms

| Term | Meaning |
|---|---|
| Tooling-enforced standard | A standard checked automatically (CI, linting), rather than relying on a human to remember to enforce it |
| Hard requirement vs. strong default | A non-negotiable rule vs. a usually-correct default that allows a conscious, explained exception |

## Check yourself

Why does a standard enforced by a CI check tend to be followed more consistently than the same standard enforced only by a human reviewer's memory during code review?
