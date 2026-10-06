# Account Rules and Account Derivation

Journal line rules decide which lines appear on an entry and whether each is a debit or credit. They do not decide which GL account each line posts to — that job belongs to account rules, the subject of this lesson.

## What you'll learn

- What an account rule is and what question it answers
- The different ways an account rule can derive a value: constant, source, or mapping set
- How priority order resolves a segment value when multiple conditions could apply
- The difference between deriving a full account and deriving one segment

## The question an account rule answers

For every journal line that a journal line rule generates, SLA still needs to know: which GL account does this line post to? An **account rule** answers that question. It can derive an entire account combination, or — more commonly, since most Chart of Accounts structures have multiple segments — derive just one segment (like the Natural Account segment or the Cost Center segment), with each segment potentially governed by its own account rule.

## Three common ways to derive a value

An account rule can pull its value from more than one kind of source, depending on what makes sense for the segment:

- **Constant value** — always use the same fixed value, regardless of the transaction. Useful for segments that never vary for a given rule, like always posting Payables accrual lines to a specific Cost Center.
- **Source value** — use a value taken directly from the transaction, such as the natural account already recorded on the AP invoice distribution. This is common when the subledger transaction already carries the correct segment value and SLA should simply pass it through.
- **Mapping set** — translate one or more input values into an output value through a lookup table you define (mapping sets get their own lesson next, because they are powerful and widely used).

## Priority order: what happens when more than one condition could apply

A single account rule can actually contain several possible value assignments, each with its own condition, and a **priority order** that says which one wins if more than one condition is satisfied. SLA evaluates conditions in priority order and uses the first one that matches. For example, an account rule for the Cost Center segment on expense lines might say: "if the expense category is Travel, use Cost Center 500 (priority 1); otherwise, use the Cost Center from the source transaction (priority 2)." If a transaction is categorized as Travel, priority 1 wins; every other transaction falls through to priority 2.

This priority structure is what lets one account rule handle many different real-world cases cleanly, instead of needing a separate rule for every possible scenario.

## Account rules versus account combination rules

Most of the time, you build one account rule per segment (Natural Account, Cost Center, Department, and so on), and the journal line rule references each applicable segment rule to assemble the complete account. In simpler cases, Oracle also allows an account combination rule that derives the entire account string in one step, typically by referencing an account already present on the source transaction. Either approach ends at the same place: every journal line SLA generates has a complete, valid GL account attached before the entry can be accounted.

## Recap

Account rules determine which GL account, or which individual segment of a GL account, a journal line posts to, using constant values, source values, or mapping sets, with a priority order resolving any overlapping conditions. Next up, lesson 7: mapping sets, the lookup-table mechanism that makes account derivation flexible without writing a rule for every possible value.
