# Script — ADFdi Errors and Troubleshooting

## Segment 1 (title)

Chapter five built a troubleshooting model for FBDI around two validation layers. ADFdi needs its own version of that model, because its failures look and feel completely different, even when the underlying cause is conceptually similar.

## Segment 2 (steps)

Category one is ADFdi-specific: the tool doesn't work at all. A missing or outdated add-in, macros disabled, security settings blocking it. The telltale sign is that data never even gets a chance to matter — the ribbon doesn't appear, an action does nothing when clicked. None of this is a data problem. The fix is back in lesson twenty-four's checklist: add-in installed and current, macros enabled, nothing blocked or untrusted.

## Segment 3 (steps)

Category two: the tool works, but a row gets rejected — an invalid account combination, an unbalanced batch, lines that don't sum to a header. The business rules haven't changed, only the delivery mechanism for the error has. ADFdi surfaces this directly in the spreadsheet, often as an inline message, before the user has even left the session.

## Segment 4 (steps)

That immediacy is both a strength and a trap. A strength, because a user fixes a typo and resubmits within the same minute. A trap, because that same immediacy can tempt someone into resubmitting the entire spreadsheet after fixing one row — the exact mistake lesson twenty-one warned against, reappearing here in a faster, more tempting form.

## Segment 5 (outro)

If the tool won't launch: check the add-in, macros, and security settings first. If rows get rejected: read the inline message, trace it to a business rule you already know, and correct only that row before resubmitting. Up next, the final lesson of this course: choosing between FBDI, ADFdi, and manual entry.
