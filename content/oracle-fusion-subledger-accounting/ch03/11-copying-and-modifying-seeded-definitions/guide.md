# Copying and Modifying Seeded Definitions

Now that you know what an AAD is, this lesson covers the single most important working habit for anyone configuring Subledger Accounting: never edit Oracle's seeded AADs directly. Instead, copy them, and modify the copy.

## What you'll learn

- Why Oracle ships seeded AADs in the first place
- The risk of modifying a seeded AAD directly
- The standard workflow: copy, rename, modify, assign
- What you can safely change on a copied AAD without breaking its structure

## Why seeded AADs exist

Oracle ships ready-made AADs — most commonly, one named something like "Standard Accrual" for each subledger application — that already contain sensible, pre-built journal line rules, account rules, description rules, and supporting references for the most common accounting scenarios. For a company whose accounting needs are vanilla (standard accrual accounting, no unusual account derivation requirements), a seeded AAD may work with little to no change.

But most real companies have at least some requirement that the seeded definition does not anticipate: a custom supporting reference for a reconciliation need, a mapping set that handles a company-specific set of expense categories, a different journal line rule condition for a regional tax rule. Oracle cannot predict every company's needs, so seeded AADs are meant as a strong starting point, not a final destination.

## Why you don't edit the seeded version directly

Seeded AADs are Oracle-owned, Oracle-maintained objects. If you directly alter a seeded AAD, you create a few serious risks: a future Oracle patch or update that touches seeded content could overwrite or conflict with your changes, there is no clean way to tell at a glance which parts of the definition are Oracle's original logic and which parts a consultant modified, and if something breaks, you have destroyed your only unmodified reference copy to compare against.

## The standard workflow

Instead, the standard, safe approach is: **copy the seeded AAD**, give the copy a clear, descriptive name (something like "Acme Corp Payables Accounting" rather than leaving Oracle's generic seeded name), and make all your changes on that copy. The seeded original stays untouched, available as a reference and as a safety net, and your copy is unambiguously identified as custom, company-specific configuration.

This same copy-first discipline applies one level down too: if you need to adjust a seeded journal line rule or account rule referenced inside the AAD, you copy that specific rule (or the journal entry rule set that contains it) rather than editing Oracle's seeded rule directly, then point your copied AAD at your copied rule.

## What's safe to change on a copy

Once you're working on your own copy, you have full latitude: add new journal line rules for conditions the seeded version doesn't cover, swap in a custom account rule or mapping set, add a supporting reference the business needs, or adjust a description rule's wording. None of this puts Oracle's original seeded content at risk, because that content is left completely alone.

## Recap

Oracle ships seeded AADs as reasonable starting points, but real companies almost always need to customize them. The safe, standard practice is to copy a seeded AAD (and any seeded rules you need to change inside it) before making any modification, leaving the original untouched as a stable reference. Next up, lesson 12: subledger accounting methods, where you'll see exactly how an AAD — seeded or your own copy — gets wired into the method a ledger actually uses.
