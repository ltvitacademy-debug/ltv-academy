# Script — Copying and Modifying Seeded Definitions

## Segment 1 (title)

Now that you know what an AAD is, this lesson covers the single most important working habit for configuring Subledger Accounting: never edit Oracle's seeded AADs directly. Copy them, and modify the copy.

## Segment 2 (steps)

Oracle ships ready-made AADs, usually named something like "Standard Accrual," with sensible pre-built rules for common scenarios. For a vanilla company, that might work with little change. But most real companies have at least one requirement the seeded version doesn't anticipate - a custom supporting reference, a company-specific mapping set, a regional tax condition.

## Segment 3 (steps)

Why not just edit the seeded version? It's Oracle-owned and Oracle-maintained. A future patch could overwrite your changes. There's no clean way to tell what's Oracle's original logic versus what you modified. And if something breaks, you've destroyed your only unmodified copy to compare against.

## Segment 4 (steps)

The standard workflow: copy the seeded AAD, give the copy a clear name like "Acme Corp Payables Accounting" instead of Oracle's generic name, and make every change on that copy. The seeded original stays untouched as a reference and a safety net.

## Segment 5 (code)

This same discipline applies one level down. Need to adjust a seeded journal line rule or account rule referenced inside the AAD? Copy that specific rule, or the rule set containing it, rather than editing Oracle's version - then point your copied AAD at your copied rule.

## Segment 6 (outro)

So remember: copy first, then modify, at every level - the AAD and any rules inside it. That keeps Oracle's seeded content safe and your customizations clearly identified. Up next, lesson twelve: subledger accounting methods, where an AAD, seeded or your own copy, gets wired into what a ledger actually uses.
