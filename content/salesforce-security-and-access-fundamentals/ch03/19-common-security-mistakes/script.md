# Script — Common Security Mistakes

## Segment 1 (title)

Nothing new this lesson — a deliberate look back at the whole course so far, through the lens of what goes wrong when these tools get used carelessly under deadline pressure.

## Segment 2 (steps: mistakes 1 and 2)

Public Read/Write as the default OWD avoids sharing-rule work now, at the cost of a data model with nothing private by default — every future control has to get bolted on with restriction rules instead of designed in. And granting View All or Modify All as a quick unblock bypasses restriction rules and sharing entirely — and narrowing it later usually just doesn't happen once the ticket's closed.

## Segment 3 (steps: mistakes 3 and 4)

Cloning a profile for every job variation instead of one profile plus permission sets creates a profile explosion — dozens of near-identical profiles that all need updating independently. And patching a too-restrictive OWD with sharing rule after sharing rule, instead of reconsidering the OWD itself, ends in a sharing model nobody can reason about holistically.

## Segment 4 (code: mistake 5)

And the quiet one: no access review, ever. Granting access has a deadline and someone asking for it; removing unused access has neither. So it silently accumulates — former project members, accounts nobody deactivated, View All grants from reorganizations ago.

## Segment 5 (steps: the pattern)

Every one of these is the same shape: a real, locally reasonable shortcut under time pressure that quietly defers cost onto whoever has to understand the org later. None of them are about not knowing the tools — they're about reaching for the fast one instead of the right one.

## Segment 6 (outro)

Five patterns, five fixes, all using tools already in this course. Next lesson puts all of it together in a full security audit of one fictional company.
