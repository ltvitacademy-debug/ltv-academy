# Script — Validation Rules

## Segment 1 (title)

A validation rule can't ask a human anything, it can only say yes or no, instantly, from data already on the record. The logic feels backwards the first time you write one, so let's untangle that before anything else.

## Segment 2 (code: inverted logic)

Here's a real rule: the length of Account Number is not equal to eight. Read that as "this is true when the account number is NOT eight characters." When it's true, Salesforce blocks the save. The formula doesn't describe what's correct, it describes what to reject. Every validation rule you'll ever write follows that same inverted shape.

## Segment 3 (screenshot: validation error)

And here's what the user actually sees: a real error on an Account edit page, Account Number set to a value that isn't eight characters, and a banner that stops the save cold until it's fixed. That's the whole mechanism. One formula, one message, blocking exactly the save that violates it.

## Segment 4 (code: the functions you'll use constantly)

Most real validation rules lean on a handful of functions: AND and OR to combine conditions, NOT to invert one, ISBLANK to catch a missing value, LEN for format checks. Here's one for our discount example: block the save when the discount is over 40 percent AND no justification has been entered. That forces a rep to explain an unusually large discount before it can even reach the approval process from Lesson 2.

## Segment 5 (steps: the four pieces)

Every rule you build has the same four pieces: a Rule Name with no spaces, the Error Condition Formula itself, the Error Message the user sees, and an Error Location, either a specific field or the top of the page. Click Check Syntax before you save, it catches typos without needing a full save to find out.

## Segment 6 (outro)

Validation rules run on every save, not just the first one. They're a standing gate the record has to clear every time. Up next: the formula language underneath all of this, in more depth.
