# Bank Statement Errors and Corrections

Lessons 6 and 7 covered how a statement is supposed to flow through Load and Import. This lesson covers what happens when it doesn't — the errors you'll actually run into as a Cash Management consultant, and how each one gets corrected.

## What you'll learn

- The most common bank statement loading and import errors
- Why most errors trace back to setup, not the file itself
- The general correction workflow for a failed or problematic statement
- Why reloading a statement must be done carefully

## Common errors

- **Unmapped account number.** The statement's account number doesn't match any Bank Account record in Oracle — often because the account wasn't set up yet, or the number in the file has a formatting difference (leading zeros, dashes) from how it's stored in Oracle.
- **Duplicate statement.** The same statement (same account, same statement date/sequence) is loaded a second time, usually from a bank resending a file or an automated job running twice.
- **Out-of-balance statement.** The sum of the transaction lines doesn't reconcile to the stated opening and closing balances within the file itself — a sign of a corrupted file, a bank-side error, or a parsing problem.
- **Unmapped transaction code.** Covered in Lesson 7 — a line arrives with a transaction code that has no configured mapping.
- **Currency or format mismatch.** The statement's currency doesn't match the bank account's defined currency, or a field doesn't parse the way the format expects (a date in the wrong pattern, for example).

## Why most errors trace back to setup

It's tempting to treat every error as "something's wrong with this file," but in practice, the large majority of recurring errors trace back to setup gaps: an account that hasn't been created yet, a code that hasn't been mapped, a currency that was never set. A file-level problem (truly corrupted data from the bank) is comparatively rare. This matters because the fix for a setup gap is to fix the setup once, not to manually patch every statement that hits the same gap.

## The general correction workflow

1. **Identify the error** from the Load/Import process logs or the statement's error status.
2. **Classify it** — is this a one-time file problem, or a setup gap that will recur on every future statement?
3. **Fix the root cause** — add the missing bank account, map the missing transaction code, correct the currency setting, or contact the bank if the file itself is genuinely corrupted.
4. **Reload or reprocess** the statement once the root cause is fixed.

## Reloading carefully

If a statement already partially loaded before an error was found, simply re-running Load on the same file can create duplicate records unless the existing (failed or partial) statement is first voided or removed appropriately. A fictional illustration: Harborview Metals Inc.'s Treasury team once re-ran a Load process after a mapping fix without first checking whether the original attempt had already created statement header records — the result was a duplicate statement that then had to be manually identified and removed before Import could run cleanly. The lesson: confirm the state of the existing attempt before reloading, don't just rerun blindly.

## Key terms

| Term | Meaning |
|---|---|
| Out-of-balance statement | A file where transaction lines don't sum to the stated balances |
| Duplicate statement | The same statement loaded more than once |
| Root-cause fix | Correcting the setup gap once, rather than patching each occurrence |

## Recap

Most bank statement errors trace back to setup gaps — missing accounts, unmapped codes, currency mismatches — not genuinely bad files. The fix is to identify, classify, and correct the root cause, then reprocess carefully to avoid creating duplicates. Next up, lesson 9: the matching rules and reconciliation rules that take over once a statement loads cleanly.
