# Script — Duplicate Management

## Segment 1 (title)

Any org with more than one person creating records eventually gets duplicates. Salesforce's native duplicate management doesn't delete anything for you automatically — it catches likely duplicates at the moment of save and lets you decide what happens next.

## Segment 2 (screenshot: duplicate rules and matching rules lists)

Two pieces of configuration do the work, and they have different jobs. Matching Rules decide whether two records count as duplicates, by comparing fields like Name or email, exactly or fuzzily. Duplicate Rules decide what happens when a matching rule finds a hit. A duplicate rule always points at a matching rule — it has no comparison logic of its own.

## Segment 3 (steps: three standard pairs)

Every org ships with three standard pairs, one each for Account, Contact, and Lead. Here's the catch: none of it is active by default. Both the matching rule and the duplicate rule have to be turned on before anything fires, which is why a brand-new org can look unprotected even though the rules already exist.

## Segment 4 (screenshot: block action and alert text)

When a match is found, the duplicate rule decides what the user sees, set separately for Action On Create and Action On Edit. Block rejects the save outright and shows the Alert Text you write, so the user has to go find the existing record instead.

## Segment 5 (steps: three actions)

Block isn't the only option. Allow with Alert lets the save go through but warns the user first, which is friendlier for Leads and Contacts where a false positive shouldn't stop someone's work. Allow with Report saves silently and logs the match to a Duplicate Record Set for an admin to review later — and you can combine Alert and Report on the same rule.

## Segment 6 (screenshot: finished duplicate rule detail)

Here's a finished custom rule end to end: its Record-Level Security, its linked Matching Rule, and the Matching Criteria that rule compiles down to, all on one detail page. Notice it's still inactive — building the rule correctly and activating it are two separate steps, and it's easy to forget the second one.

## Segment 7 (outro)

Next, we go inside the matching rule itself — exact versus fuzzy criteria, and how to build a custom one when the standard rules aren't strict enough.
