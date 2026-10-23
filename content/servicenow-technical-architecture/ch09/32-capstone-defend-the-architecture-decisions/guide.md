# Lesson 32 — Capstone: Defend the Architecture Decisions

**Chapter 9 · Capstone: Enterprise Technical Architecture · Lesson 32 of 32**

## What you'll learn

- How the real CTA assessment format — presenting and defending a design to a live panel — applies
  to Meridian's actual architecture, not a hypothetical one
- The specific, tough questions a panel would realistically ask about the single-instance,
  domain-separation decision, and real, substantive answers grounded in Lessons 29 through 31
- How to defend the HR integration pattern choices and the security design when a panel pushes on
  their apparent inconsistencies
- Why this defense itself — not the diagrams from Lesson 31 — is the skill Chapter 1 said the real
  credential actually tests

## The format, applied for real this time

Chapter 1's second lesson described the real CTA assessment honestly: a candidate presents a
design in response to a realistic scenario, and a panel of experienced assessors pushes back in
real time — asking why one option was chosen over another, what happens if a constraint changes,
what you'd do differently under different pressure. This lesson runs that format against Meridian's
actual architecture. Each challenge below is the kind of question a real panel would ask, and each
answer is built only from the tradeoffs this capstone actually worked through — not a rehearsed
line, because a real panel can tell the difference immediately.

## Challenge one: "Why not just give each hospital system its own instance, given how historically autonomous they've been?"

The honest answer starts by naming the real test, not dodging it: Chapter 2's two legitimate
justifications for a second production instance are a genuine data-residency requirement or true
business-unit independence, and Meridian has neither. All three systems operate under the same
regulatory jurisdiction, and they're consolidating specifically because they'll increasingly share
patients, corporate HR and finance functions, and executive reporting — the opposite of
independence. Three instances would mean paying Chapter 2's maintenance multiplier three times
over, indefinitely: three upgrade schedules, three security models, three sets of integration
endpoints for every shared vendor, forever. The historical autonomy is real, but it's a governance
and change-management problem, and Lesson 29 already identified the actual fix for that — a
federated governance model that gives each hospital system real input — rather than solving a
political problem with an expensive technical one.

## Challenge two: "How does this scale if a fourth hospital system joins in two years?"

A strong answer doesn't oversell the design. Adding a fourth subordinate domain under the existing
Meridian corporate domain is a bounded, known pattern — far cheaper than provisioning, securing, and
integrating an entire fourth production instance from scratch. But the honest answer also names the
real cost Chapter 2's Domain Separation lesson flagged: every additional domain adds another
context every script, report, and integration has to be tested against, and that overhead compounds
with each domain added. The right answer isn't "it scales infinitely for free" — it's that domain
separation scales considerably better than multiplying instances, while recommending the team
periodically revisit whether domain count is still the right tool, exactly as Chapter 2 warned
against treating Domain Separation as a default that never gets reconsidered.

## Challenge three: "Why use request-response for the HR lookup instead of making the whole integration layer consistently event-driven?"

This challenge is designed to tempt an overconfident answer — claiming "everything should be
event-driven, it's more scalable." The real answer rejects that framing directly: Chapter 4 was
explicit that neither pattern is categorically better, and the architectural judgment is matching
the pattern to the actual need. An HR rep waiting on a case screen for a department confirmation
needs an answer *now* to continue their work — that's exactly the situation request-response exists
for. Defaulting to event-driven there wouldn't make the system more modern; it would add
unnecessary complexity — idempotency handling, delivery guarantees — to a transaction that never
needed it in the first place. Consistency for its own sake isn't the goal; fit is.

## Challenge four: "Your security design leaves most of the platform with relatively light controls — isn't that a compliance risk?"

This is the question most likely to catch an unprepared candidate overcorrecting under pressure by
promising to "lock everything down." The real answer holds the line instead: Chapter 5 showed that
uniform maximum restriction produces *worse* real security outcomes, not better — shared logins and
shadow spreadsheets outside any governed system at all. The regulated zone — health-related leave
cases, patient-care-unit facilities records — carries strict, audited controls exactly where real
risk justifies them. Everywhere else is deliberately low-friction, because that's what keeps
ordinary work inside the governed platform instead of pushing it into an ungoverned workaround. The
design isn't light on security; it's precise about where security actually needs to bite.

## Why this defense is the real skill

Chapter 1 was clear that no course can substitute for the real-world experience the actual CTA
credential requires. What this lesson — and this whole capstone — builds instead is the underlying
judgment: weighing real constraints, naming the actual tradeoffs honestly, and holding a position
under pressure without either caving to a leading question or refusing to acknowledge a genuine
weakness. That judgment, practiced here against one realistic organization, is the same judgment a
real panel, and a real client engagement, will test for the rest of your career on this platform.

## Key terms

| Term | Meaning |
|---|---|
| Design defense | Presenting an architecture and justifying its tradeoffs under live, real-time questioning |
| Leading question | A challenge framed to tempt an overcorrection rather than a reasoned answer |
| Tradeoff justification | Explaining why a chosen option was accepted given its real costs, not just restating the choice |
| Judgment under pressure | Holding a well-reasoned position, or honestly revising it, when directly challenged |

## Check yourself

This course has built the architectural judgment behind every decision in this capstone — not a
credential itself. Course 14, ServiceNow Career & Capstone, turns that judgment toward your actual
job search. Looking back at the four challenges in this lesson: which one would you personally find
hardest to defend out loud, right now, and what would you need to go learn or experience before you
could answer it as confidently as this lesson did?
