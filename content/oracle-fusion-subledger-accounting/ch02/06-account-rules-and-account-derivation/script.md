# Script — Account Rules and Account Derivation

## Segment 1 (title)

Journal line rules decide which lines appear and whether each is a debit or credit. They don't decide which GL account each line posts to - that's the job of account rules, today's topic.

## Segment 2 (steps)

For every line a journal line rule generates, SLA still needs an account. An account rule answers that: which GL account, or more commonly which single segment - like Natural Account or Cost Center - does this line use. Each segment can have its own account rule.

## Segment 3 (steps)

An account rule can derive its value three common ways. A constant value - always the same, like a fixed Cost Center for Payables accrual lines. A source value - taken straight from the transaction, like the natural account already on the invoice distribution. Or a mapping set - a lookup table translating inputs to an output, which gets its own lesson next.

## Segment 4 (code)

What if more than one condition could apply? Account rules use priority order. For example: if expense category is Travel, use Cost Center 500, priority one. Otherwise, use the Cost Center from the source transaction, priority two. SLA evaluates in order and uses the first match.

## Segment 5 (steps)

Most of the time you build one account rule per segment, and the journal line rule assembles the complete account from each segment's rule. Oracle also allows an account combination rule that derives the whole account string in one step from a source account. Either way, every line ends up with a complete, valid GL account.

## Segment 6 (outro)

So remember: account rules decide the GL account or segment for every line, using constants, source values, or mapping sets, resolved by priority order. Up next, lesson seven: mapping sets, the lookup-table mechanism that makes this flexible.
