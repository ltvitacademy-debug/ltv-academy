# Script — Validation Rules

## Segment 1 (title)

A validation rule is the simplest business-logic tool on the platform. It's a formula that returns true or false, and when it's true, the save is blocked and an error shows up. No branching, no routing — just a gate.

## Segment 2 (steps: building one)

You build it from Object Manager, under Validation Rules, New. You name it, make sure it's active, write a description — always write the description — and then the error condition formula. Check Syntax catches mistakes before you save. Finally, you choose an error message and where it displays: a specific field, or the top of the page.

## Segment 3 (code: the formula)

Here's the trick: you write the bad condition, not the good one. To require a close reason whenever an opportunity is closed lost, the formula is: stage equals Closed Lost, and the close reason is blank. Read it as "fire when both of these are true." The toolkit is small and reusable: ISBLANK and ISNULL for empty values, ISPICKVAL for picklists, ISCHANGED and PRIORVALUE to compare against the old value, REGEX for pattern matching, and AND, OR, NOT to combine it all.

## Segment 4 (steps: who it applies to)

Validation rules run after Salesforce's own system checks and before the record actually saves. And here's the one students get wrong most often: they apply to everyone, including administrators, with no built-in exception. If you want an exception, you build it into the formula yourself, usually by checking the user's profile or a custom permission.

## Segment 5 (code: limits)

What a validation rule can't do matters just as much. It can't change data — only block or allow a save. It evaluates the whole record at once, so most admins write several small, clearly named rules instead of one dense one. And there's no UI toggle to bypass it mid-task the way you might deactivate a workflow — deactivating the rule itself is the blunt option, and it's easy to forget to turn it back on.

## Segment 6 (outro)

A validation rule blocks; it never fixes. Next up: the same formula editor, used to calculate a value instead of to stop a save — formula fields.
