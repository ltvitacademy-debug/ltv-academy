# Script — Duplicates & Inconsistent Records

Two problems inflate and distort data more quietly than missing values do: rows that appear more than once, and values that mean the same thing but are spelled differently. Left alone, they double-count revenue and split one customer into three. Let's find and fix both.

The duplicated method marks repeated rows. By default it compares every column, and it flags the second and later copies. Sum it to count them. Drop_duplicates removes them. But most real duplicates are defined by a key, so pass subset with the columns that identify a record, like order id. Notice that with subset, our count jumps from one to two.

Why the difference? Order five thousand two is an exact copy, safe to drop. Order five thousand four appears twice with different amounts, two hundred and two hundred and ten. That's not a copy, that's a conflict. Dropping silently means guessing. Use keep equals False to see every row involved, then ask the source which is right.

Inconsistent records are duplicates in disguise. Here the state column holds GA, Georgia, lowercase g a, and GA with a trailing space. Value counts shows four different values for one state. Any group by on this column would produce four groups, and every total would be wrong.

Fix it with the str accessor you met in the text lesson. Strip the whitespace, convert to uppercase, then replace known variants with a dictionary. Value counts now shows a single value, GA, four times. Do the same for names: strip, collapse repeated spaces, and title-case them.

The order matters. Standardize first, then deduplicate, because two rows only look identical once their spelling matches. Always check the result with value counts, and never drop a conflict without knowing which row is correct.

Next up, Lesson 24: data type problems and parsing.
