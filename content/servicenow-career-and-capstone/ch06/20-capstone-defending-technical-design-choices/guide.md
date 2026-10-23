# Lesson 20 — Capstone: Defending Technical Design Choices

**Chapter 6 · Capstone: Wrap-Up & Presentation · Lesson 20 of 26**

## What you'll learn

- How the real CTA panel-defense format from course 13's final lesson applies to this capstone's
  own, different implementation choices
- Four realistic challenge questions a reviewing panel would actually ask about Phase 1 — and
  substantive answers grounded only in what Chapters 4 and 5 actually built
- Why "why didn't you integrate directly instead of staging the sync" is the kind of question that
  rewards a specific answer and punishes a vague one
- Why defending a build under pressure is a different, harder skill than the board presentation
  Lesson 19 just rehearsed

## The format, aimed at a build instead of a diagram

Course 13's final lesson ran the real CTA assessment format — present a design, then a panel pushes
back in real time — against Meridian's architecture decisions. This capstone made its own, narrower
set of decisions: not whether Meridian gets one instance or three, but how a Service Desk actually
gets built, integrated, tested, and rolled out inside that already-approved architecture. The same
format applies here, with different, more concrete questions, because there's an actual build —
Lessons 15 through 18 — to defend instead of a diagram.

## Challenge one: "Why didn't you integrate directly with Prairie View in real time, instead of staging a sync every fifteen minutes?"

The honest answer starts with the constraint, not the choice: Lesson 16 established that Prairie
View's homegrown system has no webhook or event capability at all — only a read endpoint. A "direct,
real-time integration" isn't a harder version of the chosen design; it's not an available option,
because there's no event to call out on and no way for Prairie View's system to notify ServiceNow
of anything. A real-time *inline* call during ticket submission was available in theory — querying
Prairie View live every time someone opens the catalog — but that would make every Service Desk
submission depend on a legacy system's uptime and response time in the critical path. The scheduled
pull decouples the two: the Service Desk stays responsive even if Prairie View's system is briefly
slow or down, at the cost of a staleness window Lesson 18's ADR already named and accepted as
reasonable for HR data feeding a help desk, not a payroll run.

## Challenge two: "Why one shared flow instead of three, one per hospital system — isn't that riskier if their needs diverge later?"

This challenge tempts the "more flexible" answer that's actually the weaker one. Three flows sound
more customizable; in practice, Lesson 15 built one domain-aware flow specifically because three
near-identical flows are three places the same logic can quietly drift out of sync — a bug fixed in
St. Catherine's copy and forgotten in Lakeshore's, silently, until someone notices tickets routing
wrong. A single flow that reads the caller's own domain is the only version that actually proves the
architecture holds: a Lakeshore request has to land with a Lakeshore group *every time*, not most of
the time across three maintained copies. If a hospital system's routing logic genuinely needs to
diverge later, that's a controlled branch inside one flow, reviewed once — not a structural argument
for three flows today.

## Challenge three: "Nobody in your category model got exactly what they originally asked for — doesn't that mean requirements gathering failed?"

This is the question designed to tempt a defensive answer. The real answer owns the outcome instead
of apologizing for it: Lesson 13 surfaced a genuine structural conflict — three systems whose
categorization habits don't map onto each other — and a real conflict like that doesn't have a
solution where everyone gets everything. The two-layer model Lesson 14 built gives St. Catherine's
its reporting precision, Lakeshore its local control, and Prairie View real structure instead of
free text. Requirements gathering didn't fail; it did its job by surfacing a conflict honestly
instead of quietly resolving it in whoever's favor seemed easiest, and the scoping decision resolved
it as a documented compromise, not an oversight.

## Challenge four: "Why pilot at your most capable site instead of your smallest, lowest-risk one?"

A panel asks this expecting "we picked the easy one." Lesson 18's actual reasoning says the
opposite: St. Catherine's structured, mature process makes its staff the most likely to catch a real
configuration problem during the pilot week and describe it precisely, turning the pilot into a
genuine quality gate. Using Lakeshore or Prairie View to absorb the first round of real-world defects
would mean testing on the two systems Lesson 13 flagged as the most trust-sensitive — exactly
backwards. Piloting with the most capable group first protects the two systems that can least afford
a rocky first impression.

## Key terms

| Term | Meaning |
|---|---|
| Panel-defense format | Presenting a design or build and justifying its tradeoffs under live, real-time challenge |
| Available option | A choice that was genuinely possible given real constraints, as opposed to one that sounds appealing but isn't actually buildable |
| Owning the outcome | Defending a result honestly on its real reasoning, rather than apologizing for it or overselling it |
| Quality gate | Using the most capable, most prepared group to surface defects first, protecting more vulnerable groups downstream |

## Check yourself

Of the four challenges in this lesson, which one would a Lakeshore stakeholder from Lesson 13 be
most likely to ask themselves, given their specific worry about losing control? Write the one
sentence of this lesson's actual answer you'd use to address it directly to them.
