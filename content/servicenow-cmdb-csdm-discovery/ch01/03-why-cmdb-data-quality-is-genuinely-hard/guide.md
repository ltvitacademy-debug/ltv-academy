# Lesson 3 — Why CMDB Data Quality Is Genuinely Hard

**Chapter 1 · CMDB Fundamentals · Lesson 3 of 26**

## What you'll learn

- Why a CMDB goes stale on its own, without anyone doing anything wrong
- Why data from different sources genuinely conflicts, not just occasionally
- Why unclear ownership is the quiet reason inaccuracies never get caught
- The honest, well-documented reason most real CMDB implementations fail

## This course will not pretend this is solved

It would be easy to teach the CMDB as if building the table hierarchy
from Lesson 2 and running Discovery (Chapter 4) is the whole job. It
isn't. CMDB data quality is a genuinely hard, widely documented
challenge across the industry, and treating it as a "set it and forget
it" problem is exactly how real implementations fail. This lesson lays
out why it's hard honestly, so the discipline you'll build in Chapter 5
makes sense as a necessity, not busywork.

## Reason one: CIs change constantly

Infrastructure is not static. Servers get decommissioned. Applications
get upgraded, replaced, or retired. A database gets migrated to new
hardware. Every one of these real-world events needs a corresponding
update to the CI record that represents it — someone, or some
automated process, has to change `operational_status`, retire the old
record, or update its attributes. If nothing drives that update, the
CMDB keeps showing a server as operational long after it was powered
off, or keeps listing a software version nobody runs anymore. A CMDB
isn't a one-time inventory; it's a living model of infrastructure that
is itself always changing, which means the CMDB has to keep moving just
to stay accurate — and left alone, it goes stale quickly.

## Reason two: data arrives from multiple sources that can genuinely conflict

A given CI's record isn't populated from one single, authoritative
place. It can come from manual entry by an administrator, from a
Discovery scan of the network (Chapter 4), from a bulk data import, or
from an integration with another system entirely. Each of those sources
can have a different, equally plausible answer for the same field. A
manually entered record might say a server is in "Data Center A" based
on what someone was told; a Discovery scan might report its actual
current IP range, which maps to "Data Center B." Neither source is
lying — they're just looking at the world through different mechanisms,
at different times, and genuinely disagreeing. Resolving that conflict
is exactly what Chapter 5's Identification and Reconciliation rules are
for; this lesson is just naming why the conflict exists in the first
place.

## Reason three: without clear ownership, nobody catches the drift

Even if the first two problems were somehow solved, a CMDB still needs
someone accountable for its accuracy. If no specific team or role owns
a given class of CI, or a given application's records, then when a
field goes stale or a duplicate record appears, there's no one whose
job it is to notice, let alone fix it. Ownership gaps are quiet — they
don't throw an error, they just mean inaccurate data sits unchallenged,
sometimes for years, until someone makes a decision based on it and
the decision turns out to be wrong.

## The honest conclusion: this is governance, not a platform limitation

Here is the single most important, and most honest, thing to take from
this lesson: most real-world CMDB implementations that fail do not fail
because of a technical limitation of the ServiceNow platform. They fail
because of governance and process gaps — nobody owns the data, nobody
reconciles conflicting sources, nobody notices when CIs go stale. You'll
get the full governance model, including real ownership and stewardship
roles, in Chapter 5. For now, the discipline required is the honest
takeaway: a CMDB stays accurate because an organization actively
maintains it, not because the table structure from Lesson 2 makes
accuracy automatic.

## Key terms

| Term | Meaning |
|---|---|
| Stale CI | A CI record whose data no longer reflects the real, current state of the thing it represents |
| Data source conflict | Two legitimate sources (manual entry, Discovery, import, integration) reporting different values for the same CI field |
| Identification and Reconciliation | Chapter 5's rules for resolving which source wins when CI data conflicts |
| CMDB governance | The ownership and accountability structure that keeps a CMDB maintained over time, covered in depth in Chapter 5 |

## Check yourself

You're ready for Lesson 4 when you can explain, without looking: why do
most real-world CMDB implementations that fail do so for governance
reasons rather than a technical limitation of the platform?
