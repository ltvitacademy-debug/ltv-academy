# Script — Gating Merges on Test & Audit Results

## Segment 1 (title)

Every job built so far — tests, lint, Slither — produces a status check on a pull request. By default that's purely informational. A reviewer can merge right past a red X if nothing stops them.

## Segment 2 (code: branch protection)

A branch protection rule on main, requiring specific status checks to pass before merging, is what makes the gate real. It removes the merge button's availability entirely until every required check is green — for every contributor, including admins if that box is checked.

## Segment 3 (why a human stays in the loop)

Static analysis tools are a floor, not an audit — they catch known patterns, not business-logic bugs. A required approving review count keeps a human in the loop for exactly the category automated tools can't catch: does this logic actually do what it's supposed to.

## Segment 4 (what this buys you)

Once this is wired up, all tests passing and Slither being clean stops being a convention the team tries to follow and becomes a property of the repository itself. No PR reaches main without it, regardless of who's merging or how much of a hurry they're in.

## Segment 5 (outro)

That closes out CI/CD — the gate is wired, automated, and enforced. Chapter 3 moves past the gate, into actually shipping a contract to a real network.
