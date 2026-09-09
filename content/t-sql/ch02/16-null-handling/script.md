# Lesson 16 — Handling NULL (IS NULL / IS NOT NULL) · Voiceover script

Segments map 1:1 to slides. Target: ~2.5 minutes total.

---

## S1 · TITLE CARD

We touched on NULL back in Lesson 6, when concatenation broke because of
it. Now let's handle it properly. NULL doesn't mean zero, and it doesn't
mean an empty string — it means unknown, or not applicable. It's the total
absence of a value.

## S2 · CODE CARD (WHERE MiddleName = NULL — wrong)

Here's one of the most common mistakes in all of SQL. Where middle name
equals NULL. This returns zero rows, always — even on a table where plenty
of people genuinely have no middle name on file. Why? Because NULL
represents an unknown value, and an unknown value can't be said to equal
anything, not even another NULL. Equals NULL always evaluates to false,
silently, with no error to warn you.

## S3 · CODE CARD (WHERE MiddleName IS NULL / IS NOT NULL)

The correct tool is special syntax built just for this: IS NULL, and IS
NOT NULL. Where middle name IS NULL actually finds those rows. It's not a
comparison operator like equals — it's a dedicated test, and it's the only
reliable way to check for NULL.

## S4 · CODE CARD (ISNULL(MiddleName, '(none)'))

Sometimes you don't want to filter NULL out — you want to replace it with
something readable. ISNULL takes two arguments: the column, and a
fallback. If middle name is NULL, you get the fallback text instead;
otherwise, you get the real value.

## S5 · CODE CARD (COALESCE(MiddleName, LastName, '(unknown)'))

COALESCE does the same basic job, but it's more flexible — it accepts any
number of arguments and returns the first one that isn't NULL. Try middle
name first; if that's NULL, fall back to last name; if even that's somehow
NULL, fall back to literal text. COALESCE is also the ANSI standard
function, so reach for it whenever you need more than one fallback.

## S6 · OUTRO CARD

NULL means unknown, equals NULL never works, IS NULL is the fix, and
ISNULL or COALESCE let you substitute something readable. Next lesson:
ORDER BY, for sorting your results the way you actually want to see them.
See you there.
