# Script — Journal Validation and Errors

## Segment 1 (title)

General Ledger checks a journal's correctness the moment you try to complete it, not after it's already posted. A journal that fails validation just stays Incomplete — it never touches a balance. Let's look at what actually trips that gate.

## Segment 2 (steps)

Five errors you'll actually run into: an unbalanced journal, an invalid or disabled account combination, a closed accounting period, a missing required segment value, and a cross-validation rule violation. The first four are things we've already touched on. The fifth deserves its own explanation.

## Segment 3 (code)

A cross-validation rule blocks a combination of segment values that are each individually fine, but shouldn't exist together. Say Solara Fixtures has a European sales cost center that should only ever book under its European company, never the US one. Both values are valid on their own — the pairing is what's blocked.

## Segment 4 (steps)

When a journal won't complete, read the error literally before assuming the problem is somewhere else. "Period status is Closed" means check the accounting date, not the account. "Invalid account combination" means check whether that combination has ever been enabled, not whether the amount is right.

## Segment 5 (outro)

Fixing the wrong thing wastes time without solving anything. Next up, lesson ten: posting journals — what actually happens once a journal clears validation and approval.
