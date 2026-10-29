# Lesson 8 — The Postmortem Process at Scale, Across Many Teams

**Chapter 2 · Advanced Incident Management · Lesson 4 of 4**

## What you'll learn

- Why an org-wide incident volume needs a standardized postmortem
  template, not each team inventing its own format
- What a real postmortem template actually contains, section by
  section
- Why a postmortem review board or forum exists above the single-team
  retro, and what it's specifically looking for
- How action items get tracked to actual completion instead of
  quietly dying in a doc nobody revisits
- Why blameless language is a practical requirement, not just a nice
  tone

## Why one team's retro format doesn't scale across many teams

A single team can run its own informal post-incident discussion and
get real value from it. That stops working once an organization runs
dozens of incidents a month across many teams: without a shared
format, every postmortem is structured differently, which makes it
nearly impossible to compare incidents, spot repeated causes, or let
anyone outside the team that wrote it actually learn from it. The fix,
used by Google's SRE org and widely adopted since, is a **standardized
postmortem template** that every team fills in the same way, regardless
of which service or team the incident belonged to.

## What a real postmortem template contains

A working template is a known, fixed structure, not a blank page:

```
# Postmortem: Checkout error rate spike — 2026-10-29

Status: Final        Severity: SEV2        Duration: 43 min

## Summary
One paragraph, plain language: what broke, how badly, for how long.

## Impact
Who was affected, how many requests/users, estimated revenue impact,
any SLA exposure.

## Timeline
Pulled directly from the Scribe's log — every key event, timestamped.

## Root cause
The actual technical cause(s) — often more than one contributing
factor, not a single "root" cause.

## What went well
Specific things that worked — fast detection, a runbook that helped.

## What went poorly
Specific gaps — slow detection, a missing alert, an unclear owner.

## Action items
| Action | Owner | Due date | Status |
|---|---|---|---|
| Add alert on replication lag > 10s | @db-team | 2026-11-12 | Open |
| Add migration pre-check to CI | @platform | 2026-11-05 | Open |
```

Three details matter beyond the obvious fields. First, "root cause" is
deliberately plural-friendly — most real incidents have several
contributing factors, and a template that forces a single root cause
pressures people to oversimplify. Second, the timeline is pulled
straight from the Scribe's live log from Lesson 5, which is exactly
why that log mattered in the moment. Third, every action item gets a
named owner and a due date — an action item with neither is not
actually an action item, it's a wish.

## The review board: looking across postmortems, not inside one

A single-team retro asks "what should *we* change?" A **postmortem
review board** (sometimes called a review forum or postmortem council)
asks a different question entirely: "what's changing across *many*
postmortems that no single team would notice on its own?" It's a
recurring cross-team meeting — commonly weekly or biweekly — where a
small group reads incoming postmortems and specifically looks for:

- The same root cause showing up across unrelated teams (e.g. three
  postmortems this quarter all cite a missing alert on a shared
  dependency)
- Action items that keep getting pushed past their due date,
  suggesting they're underprioritized against feature work
- A severity pattern worth escalating — not one bad incident, but a
  rising trend in one area of the system

This is the layer that turns individual incidents into organizational
learning. Without it, each team learns its own lesson in isolation,
and the same systemic gap quietly causes a near-identical incident on
a different team six months later.

## Making action items actually get done

A postmortem with action items that never close is worse than no
postmortem — it creates the appearance of accountability without the
substance. The review board is also where unresolved action items get
visibility: items significantly overdue get raised, re-prioritized
against other work, or explicitly reassigned, rather than quietly
aging in a document nobody reopens.

## Blameless language is a practical requirement

"Blameless" isn't a tone preference — it's what makes the whole system
work. If writing an honest timeline risks individual blame, people
start writing vaguer timelines, omitting the decision that seemed
reasonable at the time but turned out wrong, and the postmortem stops
reflecting what actually happened. A blameless postmortem focuses on
the system and the decision inputs available at the time ("the
alerting didn't distinguish this failure mode" rather than "the
on-call engineer should have caught it faster") specifically so the
Scribe's timeline and the "what went poorly" section stay honest enough
to be useful to the review board.

## Key terms

| Term | Meaning |
|---|---|
| Postmortem template | A standardized, org-wide document structure every team fills in the same way after an incident |
| Action item | A specific fix with a named owner and a due date, tracked until it's actually closed |
| Postmortem review board | A recurring cross-team forum that reads many postmortems looking for systemic patterns, not just one team's single incident |
| Blameless postmortem | A postmortem that examines system and decision failures rather than assigning individual blame, so the record stays honest |

## Check yourself

You're ready to move on when you can explain, without looking: what
question does a postmortem review board ask that a single team's own
retro cannot, and why does blameless language directly protect the
accuracy of the Scribe's timeline from Lesson 5?
