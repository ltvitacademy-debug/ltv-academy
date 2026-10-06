# Lesson 14 — Architect Scenario Interviews

**Chapter 3 · Interviews · Lesson 14 of 19**

## What you'll learn

- How Architect-level interviews are structured differently from the interviews in Lessons 11-13
- A repeatable approach to an open-ended design scenario
- Two example scenario prompts (explicitly fictional, used for practice only)
- What separates a strong answer from a weak one when there's no single right answer

## A different interview structure

Architect-level interviews tend to run more interactive than earlier-career interviews: a round with the hiring manager, often a round with their manager, and then a panel round built around a mock customer scenario. In that panel round, you're typically asked to present your approach to a scenario and then "lead a meeting" with the panel role-playing as the customer — asking follow-up questions, pushing back, and sometimes asking you to demo or sketch your answer live. Some companies assign a coach to help a candidate prepare for this round in advance, because it's genuinely a different skill from a technical Q&A.

## Approaching an open-ended scenario

There is no single correct solution to an architecture scenario. What's being evaluated is your process:

1. **Ask clarifying questions first.** Real requirements are almost always incomplete on purpose — the interviewer wants to see whether you notice the gaps before designing around them.
2. **State your assumptions out loud** when a clarifying question doesn't get fully answered, so the panel can correct you rather than watching you build on a wrong guess silently.
3. **Propose a direction, with tradeoffs named explicitly** — "I'd do X because Y, which costs us Z" reads as architectural thinking; a single confident answer with no tradeoffs does not.
4. **Address security and scale even if not asked directly** — sharing model and large-data-volume considerations are assumed baseline knowledge at this level.

## Example scenario one — fictional

> **This company and scenario are entirely fictional, created for practice only.**
>
> "Cascadia Outdoor Supply" has grown by acquisition and now runs three separate Salesforce orgs — one per acquired brand — plus a legacy on-premises ERP that still owns order history. Leadership wants a single view of a customer across all three brands, and a cutover plan that doesn't stop order processing during the transition.

A strong answer surfaces the real questions buried in that prompt: Is "a single view" a reporting need (a BI/analytics layer) or an operational need (actually merging into one org)? What's an acceptable downtime window for cutover? What identifies the "same customer" across three systems that may have no shared key? Those questions matter more at this stage than jumping straight to a proposed architecture.

## Example scenario two — fictional

> **This company and scenario are entirely fictional, created for practice only.**
>
> "Northbridge Insurance Group" wants to let independent agents (not employees) log in and work certain opportunities and cases, without seeing anything belonging to other agents or to Northbridge's internal-only records.

This is a sharing-model and external-access scenario. A strong answer talks through Experience Cloud as the access channel, a sharing model that defaults to the most restrictive setting and opens up deliberately (not the reverse), and explicitly separates "what an agent needs to do their job" from "what's internal-only" rather than assuming more access is simpler.

## What separates a strong answer from a weak one

- **Weak:** jumping to a specific feature name before understanding the actual business constraint.
- **Strong:** naming the tradeoff, stating the assumption, and being able to defend *why* under follow-up questions — because the panel will ask follow-ups specifically to see if the reasoning holds up, not just the conclusion.

## Key terms

| Term | Meaning |
|---|---|
| Mock customer scenario | A panel round where interviewers role-play as the client asking follow-up questions |
| Large data volumes (LDV) | Architectural considerations that apply once an object holds millions of records |
| Sharing model | The combination of OWD, roles, and sharing rules/mechanisms that controls record visibility |
| Experience Cloud | Salesforce's platform for giving external users (customers, partners, agents) portal-style access |

## Check yourself

Why do interviewers deliberately leave architecture scenario prompts incomplete, instead of giving you every requirement up front?
