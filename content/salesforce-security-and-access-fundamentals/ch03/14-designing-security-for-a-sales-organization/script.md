# Script — Designing Security for a Sales Organization

## Segment 1 (title)

Everything so far has been a toolbox. This lesson shows how an admin actually picks tools out of it, with a full worked design for a fictional sales org: Meridian Outfitters.

## Segment 2 (steps: the org chart)

Meridian's reps each own their own retail territory — nobody shares accounts. A small Sales Operations team supports every region without reporting into the sales chain. That one fact — territories don't overlap — decides the org-wide default: Private on Account, Contact, and Opportunity. Reaching for Public Read/Write instead just avoids a little setup now, at the cost of a data model where nothing is actually private.

## Segment 3 (code: role hierarchy rollup)

With Private OWD, the role hierarchy does most of the work. Set it to mirror the org chart — rep, team lead, regional manager, VP — and visibility rolls up automatically. A regional manager sees every opportunity owned by every rep beneath them, with zero sharing rules.

## Segment 4 (steps: where hierarchy falls short)

Two things don't fit that shape. Sales Operations supports every region, so it's not in the hierarchy at all — a role-hierarchy sharing rule gives them read-only access to everything instead. And a handful of national accounts get co-sold across regions, so a criteria-based sharing rule grants read-write to a National Account Team public group. Both rules exist because hierarchy genuinely can't reach that access — not as a shortcut.

## Segment 5 (code: permission sets)

Then permission sets layer on the extras: Forecast Manager for team leads and up, Discount Approver for regional managers, and full access for Sales Operations. The profile stays generic — the permission sets carry the differences.

## Segment 6 (outro)

Private OWD, a role hierarchy that matches the org chart, two sharing rules for the two places hierarchy can't reach, and three permission sets for the extras. Next lesson applies the same process to a service organization — where the shape of the problem is different.
