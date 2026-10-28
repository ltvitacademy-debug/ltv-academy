# Lesson 27 — SOAR and the Analyst Relationship: Not a Replacement

**Chapter 7 · SOAR & Automation Basics · Lesson 27 of 32**

## What you'll learn

- Why SOAR is designed to be a force multiplier for analysts, not a replacement for them
- What kind of work SOAR actually takes off an analyst's plate, versus what it was never meant to touch
- Concrete examples of situations that still require a human, even in a SOC with mature SOAR playbooks
- Why someone still has to build, test, and tune every playbook SOAR runs

## The real division of labor

Lessons 25 and 26 covered what SOAR can do: connect tools, run repeatable steps, and take real action without waiting on a person. It would be easy to read that and conclude SOAR is heading toward replacing the analyst role entirely. It isn't, and understanding exactly where the line falls is the point of this lesson. SOAR is a **force multiplier**: it removes the repetitive, well-understood portion of the workload so the same analyst team can handle a far higher alert volume — but every playbook from Lesson 26 only covers scenarios someone already fully worked out in advance. Everything outside that stays a human's job.

## What still needs a human, concretely

A few real categories make this concrete rather than abstract:

- **Novel attack patterns.** An alert that doesn't cleanly match any known category has no pre-built playbook branch to follow — by definition, nobody has written the "correct response" for a situation that's never happened before.
- **Ambiguous alerts that need business context.** A VP logging in from an unusual location at 2 a.m. could be a compromised account or could be a executive on a red-eye flight closing a deal. A tool can see the login; it can't know the travel itinerary or the deal. That judgment call needs a human with context the platform doesn't have.
- **Playbook exceptions and edge cases.** Even a well-built playbook occasionally hits a case it wasn't designed for — a false enrichment result, an unusual combination of indicators. Someone has to recognize that the automated path doesn't apply and step in.
- **Building, testing, and tuning the playbooks themselves.** Every playbook in Lesson 26 started as a human decision about what the correct response should be. Someone has to design that logic, test it against real scenarios before trusting it with automated action, and keep revising it as new attack patterns and false-positive sources show up — the same tuning discipline Chapter 3 covered for correlation rules.
- **Final accountability for high-stakes actions.** Some actions — terminating an employee's access, a disclosure with legal implications — carry consequences serious enough that an organization keeps a human sign-off step even when the technical decision could be automated.

## Judgment and novel investigation are the human's actual job now

Put together, this is the real shift SOAR causes: it doesn't shrink the analyst's role, it changes what fills most of their day. Less time re-running the same extraction-and-lookup steps on report after report; more time on the investigations that actually require thinking — the alert that doesn't fit a known pattern, the context a tool can't see, the playbook that needs a human to notice it's wrong this one time. That's the force-multiplier relationship in practice, and it's exactly the skill a worked playbook example, next in Lesson 28, will show in full.

## Key terms

| Term | Meaning |
|---|---|
| Force multiplier | A tool that increases what an existing team can accomplish, rather than replacing members of that team |
| Human-in-the-loop | A point in a process deliberately left for a person to review or decide, rather than fully automating it |
| Playbook tuning | Ongoing human review and adjustment of a playbook's logic as new scenarios and false positives appear |
| Business context | Information about the organization (travel, role, ongoing deals) that a security tool has no way to know on its own |

## Check yourself

You're ready for Lesson 28 when you can name two concrete categories of work that still require a human analyst even in a SOC with mature SOAR playbooks, and explain why a playbook can't cover either one.
