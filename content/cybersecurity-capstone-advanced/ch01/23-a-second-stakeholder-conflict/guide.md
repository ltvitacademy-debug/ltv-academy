# Lesson 23 — A Second Stakeholder Conflict: Speed vs. Control

**Chapter 1 · Advanced Capstone: Zero Trust, Dual-Cloud Identity, and a Cross-Team Incident · Lesson 23 of 26**

## What you'll learn

- The new conflict Lesson 22's scoping work surfaced, and the two
  people on opposite sides of it
- Why both sides have a legitimate, defensible position — this isn't
  a careless stakeholder versus a careful one
- What's actually at stake if either side simply wins outright
- Why this is a harder conflict than the Beginner and Intermediate
  capstones' stakeholder disagreements, and what makes it harder

## The new stakeholder

**Priya Nair**, Hartwell's VP of Grid Operations, has one planned
outage window on the calendar: a multi-day shutdown of the second
substation's control network, scheduled for routine physical
maintenance that happens roughly twice a year. If the foundational
identity and segmentation work from Lesson 22 doesn't ship during that
window, the next opportunity is six months away — a second dedicated
outage isn't something Operations can simply schedule on demand, since
taking a substation offline outside planned maintenance has real
operational and safety costs of its own.

## Priya's position is legitimate

Priya isn't asking Mara to cut corners for convenience. A missed
window means either six months of the second segment running without
the identity and segmentation work the board just funded, or
requesting an unplanned outage that disrupts grid operations and costs
real money — the kind of ask that's hard to justify twice in one year.
From where Priya sits, "do it carefully, whenever that turns out to
be" isn't free; it has a real cost attached, measured in months and in
risk the pilot segment already carries that the second segment
wouldn't yet have.

## Security's position is also legitimate

Mara and Howard aren't being cautious for its own sake. Lesson 22's
scoping work surfaced a hard requirement: the corrected, dual-check
audit methodology has to apply to the new segment from day one, not
get bolted on afterward. Deploying identity and segmentation changes
to a live OT segment inside a compressed outage window, without time
to validate the new audit methodology actually catches what it's
supposed to catch there, risks recreating a version of exactly the gap
Lesson 19's AAR just documented — this time on a segment controlling
physical substation equipment, where a missed gap isn't just a
compliance finding.

## What's actually at stake

If Operations simply wins: the rollout ships fast, inside the window,
with validation compressed or skipped — and if the new segment has its
own version of a direct-grant blind spot, nobody finds out until the
next scheduled audit, months later, the same way the original gap sat
unnoticed for months after the March emergency.

If Security simply wins: the rollout slips past the maintenance
window entirely, costing Hartwell six months of delay or the expense
and risk of an unplanned outage — and it hands "security blocked a
funded, board-approved initiative over caution" to anyone looking for
a reason to deprioritize the program next budget cycle.

## Why this conflict is harder than the earlier ones

The Beginner and Intermediate capstones' stakeholder tensions (Dale
Granger's single ask, then Owen Mercer and Renee Castellano's
overlapping-but-separate asks) were ultimately compatible — one
well-scoped project satisfied both. This one is structurally
different: Priya's deadline and Mara's validation requirement are
genuinely in tension over the same calendar window, not just two
people who hadn't yet realized their asks overlapped. Resolving it
takes more than reconciliation; it takes a real compromise, which is
exactly what Lesson 24 builds.

## Key terms

| Term | Meaning |
|---|---|
| Legitimate conflicting interest | A disagreement where both sides have a real, defensible stake, as opposed to one side simply being wrong or careless |
| Compressed validation | Shortening the time available to confirm a change works safely, in order to fit a fixed deadline |
| Opportunity cost (of delay) | What a stakeholder loses by waiting, measured concretely, not just as abstract impatience |

## Lab

1. Write Priya Nair's position in two sentences, as she would state it
   herself, without caricaturing it as "Operations doesn't care about
   security."
2. Write Mara Voss's position in two sentences, as she would state it
   herself, without caricaturing it as "Security doesn't care about
   deadlines."

## Check yourself

You're ready for Lesson 24 when you can state both Priya's and Mara's
positions fairly, in their own terms, and explain concretely what each
side actually risks losing if the other one simply wins the argument.
