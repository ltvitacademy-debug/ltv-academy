# Script — Identity Resolution

## Segment 1 (title)

The same person can show up as a Lead in Sales Cloud, a subscriber in Marketing Cloud, and a guest checkout online, each with a slightly different name and email. Identity resolution decides which records are the same person, and builds one unified profile from them.

## Segment 2 (screenshot: ruleset)

This is a real published ruleset. Match rules sit at the top: each rule combines criteria, like a fuzzy name plus a normalized email, and the rules are joined with OR. Above them, the counts: source, matched, and unified. Comparing source to unified tells you whether the rules are doing anything.

## Segment 3 (screenshot: reconciliation)

Matching isn't enough, because matched records can still disagree. Reconciliation rules pick one value per field. Here the default is most frequent, while loyalty fields use source sequence, meaning one source is treated as authoritative.

## Segment 4 (code: rule logic)

In T-SQL terms, it's a fuzzy dedupe join plus a rule for which value wins. Match on a name and a normalized email, or match on a shared identifier, then reconcile the disagreements.

## Segment 5 (steps)

Three stages: match rules find the same person, reconciliation rules choose surviving values, and a unified individual is created. Your source records stay untouched underneath. Rules too strict leave duplicates; rules too loose merge strangers.

## Segment 6 (outro)

Next up: calculated insights, reusable metrics computed on top of the unified data.
