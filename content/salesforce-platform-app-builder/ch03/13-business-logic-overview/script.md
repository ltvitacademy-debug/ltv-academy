# Script — Business Logic Overview

## Segment 1 (title)

Your app has a shape now: objects, relationships, fields, and pages. Shape alone isn't a business application — it's just somewhere to type data. Business logic is what makes it enforce real rules. This lesson maps the toolbox before we open each tool in the next five lessons.

## Segment 2 (steps: five tools)

Five declarative tools, each with its own job. Validation rules block a bad save. Formula fields calculate a live value from other fields. Roll-up summary fields aggregate child records up to a master. Approval processes route a record through human sign-off. And Flow handles the multi-step logic — screens, branching, loops — that's too much for any single rule.

## Segment 3 (code: order of execution)

Logic has a fixed place in the save order. Salesforce's own system validations run first, then your validation rules — if one returns true, the save stops right there. The record saves, and only then do approval entry criteria and Flow automation run, which can loop back through validations again. A formula field or roll-up summary isn't really in this order at all — nothing gets saved for a formula, and a roll-up recalculates when the child changes, not when you view the parent.

## Segment 4 (steps: declarative first)

Why declarative first? It's faster to build, easier for the next admin to read, and it doesn't need a sandbox pipeline and test coverage to fix on a Tuesday afternoon. Apex still has its place, but a Platform App Builder's job is to exhaust these five tools before reaching for a developer.

## Segment 5 (code: chapter map)

That's why this chapter is sequenced the way it is. Validation rules and formula fields share one editor, so they're back to back. Roll-up summaries depend on the master-detail relationships from chapter one. Approval processes and Flow both route logic across steps, which sets up lesson eighteen's real question: for a given requirement, which of these five tools is actually the right one.

## Segment 6 (outro)

Five tools, one save order, one chapter. Next: validation rules, the first and simplest way to stop bad data before it ever gets saved.
