# Script — Errors & Debugging

## Segment 1 (title)

Everyone who writes code sees errors all day. The difference is how calmly you read them, and whether you have a routine to fix them.

## Segment 2 (code)

When Python fails, it prints a traceback. Read it from the bottom. The last line names the error type and the reason. Here, ZeroDivisionError: division by zero. The lines above show the path Python took, most recent call last. Work up to find your own line. Here, a customer with an empty list of orders made the length zero.

## Segment 3 (steps)

Learn the usual suspects. KeyError means a dictionary key does not exist. TypeError means the wrong type for the operation, like adding a string and a number. ValueError means the right type but an unusable value, like turning the text twelve point five into an integer. NameError means a name is not defined. In a notebook, that often means you skipped a cell.

## Segment 4 (code)

Sometimes an error is not a bug but a fact of messy data. A price column might contain n slash a, or an empty string. Wrap the risky step in try, and catch only the specific error you expect, here ValueError. Bad values are skipped and reported, and the clean numbers survive. Never use a bare except, because it hides real bugs.

## Segment 5 (code)

You can also raise errors yourself. If safe average receives an empty list, raising a ValueError with a clear message beats a mysterious division error. And assert is a one-line sanity check. It stays silent when true, and raises an AssertionError when false. It is the seed of real testing, which we cover in Chapter 7.

## Segment 6 (steps)

Here is your routine. Read the last line of the traceback. Find your own line. Inspect the values with print, repr, and type, instead of guessing. Shrink the problem to the smallest input that still fails. Then fix it, and rerun from a clean state.

## Segment 7 (outro)

That completes Chapter 1. Next lesson starts Chapter 2, NumPy, with arrays and vectorization.
