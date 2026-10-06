# Script — Auto Post Criteria

## Segment 1 (title)

So far, posting has meant a person choosing to click Post. For high-volume, trusted, routine journals, that click adds friction without adding safety. This lesson is about letting General Ledger post those batches automatically.

## Segment 2 (steps)

An AutoPost criteria set matches on four things: journal source, journal category, balance type — actual, budget, or encumbrance — and period, or a range of effective dates. You can define several criteria sets and give each a priority, so General Ledger knows which to check first if more than one could apply.

## Segment 3 (code)

Picture two criteria sets: one targeting allocation journals at priority one, one targeting routine payables journals at priority two. A batch from Solara Fixtures' monthly allocation run matches the first set and posts automatically the moment the allocation process validates cleanly — nobody opens Manage Journals and clicks Post.

## Segment 4 (steps)

Why does this work here but not everywhere? Because the journals AutoPost targets are predictable and already trusted — the same accrual every month, an allocation rule that was reviewed when it was built. It's a poor fit for one-off manual adjustments or anything a controller specifically wants to look at before it changes a balance.

## Segment 5 (outro)

That's exactly why scoping a criteria set tightly by source and category matters — it's what keeps AutoPost from quietly posting something that actually needed a second look. Next up, lesson sixteen: suspense accounts and balancing.
