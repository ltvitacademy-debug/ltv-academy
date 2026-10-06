# Mapping Sets

Last lesson introduced mapping sets as one of the three ways an account rule can derive a value. This lesson goes deep on mapping sets specifically, because they are one of the most useful, most reused tools in the entire Subledger Accounting toolkit.

## What you'll learn

- What a mapping set is, structurally
- Why mapping sets exist instead of just writing many separate account rules
- How a mapping set can use more than one input value at once
- A worked example translating expense categories into GL accounts

## What a mapping set is

A **mapping set** is a lookup table: a defined list of possible input values on one side, and the output value that corresponds to each one on the other side. You build it once, store it as its own object, and then reference it from an account rule (or a description rule) wherever that same translation logic is needed.

Think of it exactly like a spreadsheet with two columns. The left column lists every input value you care about — say, every expense category code a company uses. The right column lists the GL natural account that each one should map to. When SLA evaluates the rule, it takes the actual input value from the transaction, looks it up in the table, and returns the matching output.

## Why not just write separate account rules?

You could, in theory, build account rule conditions for every possible value one at a time — "if category is Travel, use account X; if category is Meals, use account Y" — but that becomes unwieldy fast, especially when a company has dozens or hundreds of possible input values (as is common for things like expense categories, item categories, or supplier types). A mapping set keeps all of those value-to-value translations in one organized, maintainable table instead of dozens of individual rule conditions, and functional users (not just technical consultants) can often maintain a mapping set's values directly, without touching the rule itself.

## Multiple input values at once

A mapping set is not limited to a single input column. It can be defined to accept more than one input value together — for example, both the expense category and the operating company — and produce a single output based on that combination. This lets a mapping set handle cases where the correct output genuinely depends on more than one fact about the transaction at the same time, without needing a separate mapping set (or a tangle of account rule conditions) for every combination.

## A worked example

Imagine a company with expense categories Travel, Meals, Office Supplies, and Software. A mapping set for the Natural Account segment might look like this: Travel maps to account 6410, Meals maps to account 6420, Office Supplies maps to account 6430, and Software maps to account 6440. An account rule references this mapping set, with "expense category" as the input source. When an expense report line with category Meals is accounted, SLA checks the mapping set, finds Meals, and returns 6420 — no separate account rule condition needed for each category, and when a fifth category gets added next year, someone simply adds a new row to the mapping set.

## Recap

A mapping set is a reusable lookup table that translates one or more input values from a transaction into a single output value, most often used inside an account rule to derive a segment. It avoids building dozens of individual rule conditions and keeps value-to-value translations centralized and easy to maintain. Next up, lesson 8: description rules, which build the readable text that appears on each journal line.
