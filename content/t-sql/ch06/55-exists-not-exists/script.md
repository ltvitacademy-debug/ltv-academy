# Lesson 55 — EXISTS and NOT EXISTS · Voiceover script

Segments map 1:1 to slides. Target: ~2.5 minutes total.

---

## S1 · TITLE CARD

So far every subquery has produced actual values to compare against. This
lesson covers a subquery used differently — not for what it returns, but
simply for whether it returns anything at all.

## S2 · CODE CARD (EXISTS example)

EXISTS, open paren, select 1, from SalesOrderDetail, where product ID
matches the outer product's ID, close paren. EXISTS returns true if that
subquery finds at least one row, false if it finds none. And notice we
selected the literal 1 — that's a T-SQL convention, because EXISTS never
actually looks at what columns come back. Select 1, select star, select
product ID — inside an EXISTS, they're all functionally identical. Only
presence matters.

## S3 · CODE CARD (NOT EXISTS example)

Now here's the payoff from last lesson's warning. NOT EXISTS solves the
NOT IN NULL trap completely, because it never compares individual values
at all — it only asks "did any row match." This finds every product
that's never appeared in a sales order, safely, no matter what NULLs
might be lurking in either table.

## S4 · STEPS CARD (NOT IN breaks / NOT EXISTS safe)

This course's rule from here forward: prefer NOT EXISTS over NOT IN
whenever the subquery's column might contain a NULL — which,
realistically, is most of the time unless you've specifically verified
otherwise.

## S5 · OUTRO CARD

And there's a performance upside too — EXISTS can stop the moment it
finds one single matching row, instead of needing to enumerate every
match the way IN effectively does. Often faster, and safer around NULL.
Next lesson: Common Table Expressions, for naming a subquery so you can
actually reuse it. See you there.
