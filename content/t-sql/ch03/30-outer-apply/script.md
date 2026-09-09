# Lesson 30 — OUTER APPLY · Voiceover script

Segments map 1:1 to slides. Target: ~2 minutes total.

---

## S1 · TITLE CARD

CROSS APPLY drops any row where the function comes back empty — exactly
like INNER JOIN drops unmatched rows. But sometimes that's the wrong
call. You want every row from the left table, whether the function found
anything or not. That's OUTER APPLY.

## S2 · CODE CARD (OUTER APPLY example)

Same query as last lesson, one word changed: OUTER APPLY instead of CROSS
APPLY. Now every single row from Person comes back, even if the contact
information function returns nothing for a particular business entity ID.
When that happens, first name and last name simply come back NULL for
that row — exactly the same NULL-filling behavior you already know from
LEFT JOIN.

## S3 · STEPS CARD (INNER = CROSS APPLY / LEFT = OUTER APPLY)

And this parallel is exact, not approximate. INNER JOIN maps to CROSS
APPLY — drop unmatched rows. LEFT JOIN maps to OUTER APPLY — keep them,
NULL-filled. If you've genuinely internalized INNER versus LEFT from a
few lessons back, you already understand CROSS versus OUTER APPLY. It's
the identical idea, just applied to a function instead of a table.

## S4 · OUTRO CARD

OUTER APPLY matters whenever a lookup might legitimately come back empty,
but you still need that row to show up in your report rather than
silently vanishing. Next lesson wraps up the core join types with some
guidance on choosing between them. See you there.
