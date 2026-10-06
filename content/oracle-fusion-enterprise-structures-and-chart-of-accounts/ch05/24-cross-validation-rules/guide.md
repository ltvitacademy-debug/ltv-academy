# Cross-Validation Rules

A chart of accounts with, say, four independent segments can technically combine into millions of possible account combinations — and the vast majority of them would be nonsense (a Manufacturing cost center combined with a Corporate-only natural account, for example). **Cross-validation rules** are what stop a user from creating most of those nonsense combinations in the first place. This lesson closes Chapter 5 with how they work.

## What you'll learn

- What a cross-validation rule actually checks
- The two parts every rule is built from: condition and validation filters
- How cross-validation combination sets differ from rules
- Why hierarchies from Lesson 23 make rules easier to maintain

## What a cross-validation rule checks

Segments in a chart of accounts are, by default, **independent** of each other — any value in one segment can combine with any value in another, unless something stops it. A **cross-validation rule** is exactly that "something": once enabled, it determines whether a selected value in one segment can be combined with specific values in other segments to form a valid account combination. Well-designed cross-validation rules prevent nonsense combinations — like a Manufacturing cost center paired with a Finance-only natural account — from ever being created on a live transaction.

## Condition and validation filters

Every cross-validation rule is built from two filters:

```
Cross-Validation Rule structure:
  Condition Filter    — which account combinations this rule applies to
  Validation Filter    — which values are actually allowed, given the condition
```

For example: "IF the Cost Center segment is in the Manufacturing range (400–499), THEN the Natural Account segment must be in the Manufacturing-allowed range (6000–6999)." The condition filter identifies when the rule applies; the validation filter defines what's actually permitted once it does.

## Cross-validation combination sets: a related, simpler tool

**Cross-validation combination sets** are a related but distinct feature: instead of a condition/validation filter pair, a combination set is based on an explicit list of valid child-segment-value combinations between two or more segments — up to five segments. This can be simpler to build and understand for a finite, well-known list of valid combinations, but it does not scale as gracefully as a rule when the valid combinations are numerous or follow a clear pattern (like a range).

## Why hierarchies make rules easier to maintain

A cross-validation rule's condition or validation filter can reference a value set **range** or, more powerfully, a **hierarchy node** (tree) from Lesson 23, rather than an exhaustive list of individual values. A rule written against "all cost centers under the Manufacturing parent" automatically covers a new cost center added under that parent later, with no rule change required — this is exactly the maintenance benefit Lesson 23 previewed.

## Recap

Cross-validation rules use condition and validation filters to prevent nonsense account combinations, cross-validation combination sets offer a simpler list-based alternative for a finite set of valid combinations, and referencing hierarchies instead of individual values keeps rules low-maintenance as the business grows. That completes Chapter 5 — the full anatomy of a chart of accounts. Chapter 6 puts everything from this entire course together in a realistic design exercise.
