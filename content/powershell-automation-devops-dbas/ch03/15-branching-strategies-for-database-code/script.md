# Script — Branching Strategies for Database Code

## Segment 1 (title)

Application teams have argued about branching strategy for years. Database code can use the same models, but with one extra wrinkle app code mostly doesn't have: a schema is stateful, so you can't casually branch a live database the way you branch a repository.

## Segment 2 (steps: two real models)

Trunk-based development means small, frequent merges into one shared branch — easier to sequence safely against a live schema. Feature branches hold larger work longer, but the longer they live, the further their version of the schema drifts from what's actually running.

## Segment 3 (code: the wrinkle)

Here's the wrinkle. If a feature branch's migration adds a column and gets deployed to a test environment, that column now exists in real data. Abandoning the branch doesn't undo that — the data doesn't disappear just because the branch did.

## Segment 4 (steps: the real constraint)

Whichever branching model a team picks, what actually matters for database code is migration sequencing — making sure schema changes apply in a consistent, predictable order across every environment, regardless of which branch they came from.

## Segment 5 (outro)

That sequencing discipline is what Lesson 19's numbered migration pattern is built to guarantee. Next up: code review for database changes — what reviewers should actually look for beyond typical app-code concerns.
