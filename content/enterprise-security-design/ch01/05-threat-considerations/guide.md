# Lesson 5 — Threat Considerations

**Chapter 1 · Designing Security · Lesson 5 of 15**

## What you'll learn

- What threat modeling is, and why it's a design-time activity rather than something you do after a system is already built
- The STRIDE framework as a practical checklist for finding threats systematically instead of by guesswork
- How to apply STRIDE to a concrete Salesforce scenario — an inbound integration — rather than to Salesforce in the abstract
- Why "unlikely" and "low-impact" are two different axes, and why a threat model has to consider both

## Threat modeling is asking "how could this be attacked" before it ships

**Threat modeling** is the structured practice of asking, deliberately and systematically, how a system could be attacked or misused — before it's built, or before a new feature is added to one that already exists. It's deliberately different from waiting for a penetration test or an incident to reveal the weaknesses, because by then the cost of fixing a design flaw is far higher than the cost of catching it on a whiteboard. An architect doesn't threat-model everything equally; the practice is aimed specifically at the places where trust changes — which is exactly Lesson 1's boundaries again: new integrations, new user-facing surfaces, anything that crosses the org boundary or hands data to a third party.

## STRIDE: six categories, not six steps

**STRIDE** is a widely used threat-modeling mnemonic, originally developed at Microsoft, that gives six categories of threat to check a design against, so the exercise doesn't depend on whoever's in the room happening to think of the right attack:

| Letter | Threat category | What it asks |
|---|---|---|
| S | Spoofing | Can someone successfully pretend to be a user, system, or integration they aren't? |
| T | Tampering | Can data or configuration be modified by someone who shouldn't be able to? |
| R | Repudiation | Could someone perform an action and later credibly deny having done it, because there's no reliable record? |
| I | Information disclosure | Can data be exposed to someone who shouldn't see it? |
| D | Denial of service | Can the system be made unavailable or degraded for legitimate users? |
| E | Elevation of privilege | Can someone gain more access than they were ever granted? |

The value of going through all six deliberately, rather than stopping at whichever threat is most obvious, is that different categories point at different controls. A design that's airtight against information disclosure can still have a wide-open repudiation problem if nothing logs who did what.

## Applying it to a real scenario: an inbound integration

Consider a mid-size retailer connecting an external order-management system to Salesforce via a Connected App, so the external system can create and update Order records through the API. Walking STRIDE against this one integration surfaces concrete, specific questions:

- **Spoofing:** Is the Connected App's OAuth flow configured so that only the real order-management system's credentials can authenticate as this integration user — not just "any system that knows the consumer key"?
- **Tampering:** Does the integration user's permission set allow it to edit *only* Order fields it's supposed to touch, or could a bug (or a compromised partner system) modify unrelated fields on the same record?
- **Repudiation:** If an Order gets modified incorrectly, can you prove whether it was this integration, a human user, or a different automation that made the change?
- **Information disclosure:** Does the integration user's access scope leak unrelated data — can it read Opportunity or Contact fields it has no legitimate reason to touch, just because "API User" profiles are often over-scoped by habit?
- **Denial of service:** Could this integration, if it malfunctioned or was attacked, exhaust API call limits in a way that degrades the org for everyone else using the same limits?
- **Elevation of privilege:** If the integration's named credential or connected app secret leaked, what's the blast radius — does it grant only Order access, or does it open a path to broader admin-level actions?

Six questions, six different design decisions — scoped OAuth, a tightly scoped permission set, field history tracking on Order, a separate API usage allocation, and tightly held credential storage — none of which would reliably surface from a single "is this secure?" conversation.

## Likelihood and impact are two different axes

Not every threat identified this way gets the same response. A threat model also has to weigh **likelihood** (how plausible is this, given the real attacker population and real access paths) against **impact** (how bad is it if it happens). A low-likelihood, high-impact threat (a Master Secret compromise) still deserves serious design attention; a high-likelihood, low-impact one (a user occasionally fat-fingering a field they're allowed to edit) might just need a validation rule, not an architectural redesign. Treating every identified threat as equally urgent burns effort on the wrong things; treating low-likelihood/high-impact threats as not worth addressing is how organizations end up surprised.

## Key terms

| Term | Meaning |
|---|---|
| Threat modeling | Systematically asking how a system could be attacked or misused, at design time |
| STRIDE | Spoofing, Tampering, Repudiation, Information disclosure, Denial of service, Elevation of privilege — six threat categories |
| Likelihood | How plausible a given threat actually is |
| Impact | How severe the consequences are if the threat is realized |

## Lab

A nonprofit is building a public-facing donation form (an Experience Cloud site) that writes directly to a Donor custom object in their Salesforce org. Run all six STRIDE categories against this scenario and write one concrete question per letter, specific to a public donation form (not the integration example above). For at least two of your six, note whether you'd call it high-likelihood/low-impact, low-likelihood/high-impact, or something else, and why.

## Check yourself

Can you list all six STRIDE categories from memory and explain, in one sentence each, what question each one asks? Can you explain why a design review that only asks "is this secure?" tends to miss threats that a structured STRIDE pass catches?
