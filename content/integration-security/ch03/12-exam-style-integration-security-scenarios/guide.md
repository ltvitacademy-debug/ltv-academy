# Lesson 12 — Exam-Style Integration Security Scenarios

**Chapter 3 · Practice · Lesson 12 of 13**

## What you'll learn

- How Salesforce architect-style review-board questions are actually structured: a scenario, constraints, and a request to justify a trade-off
- How to answer "which flow/control fits" questions by naming the constraint that rules out the alternatives, not just naming your preferred answer
- Practice reasoning through four realistic scenarios that combine multiple concepts from this course
- A reusable structure for answering this style of question under exam or review-board conditions

## How these questions are actually built

An architect-style scenario question is rarely "what is Named Credentials." It's a short business situation with two or three specific constraints embedded in the wording, followed by "which approach would you recommend, and why." The skill being tested isn't recall — it's noticing which constraint in the scenario rules out the otherwise-obvious answer. A good answer names the ruled-out alternative and says specifically why the scenario's wording rules it out, not just asserts the chosen answer in isolation.

## Scenario 1: the unattended nightly sync

A client runs a nightly batch job, with no user present, syncing financial close data from an ERP into Salesforce. The ERP team wants to avoid managing certificates if at all possible, and already has a single dedicated service account they use for all their other system-to-system integrations.

*Reasoning:* No human is present (ruling out Authorization Code, which assumes a browser consent step), and the team wants to avoid certificate management (ruling out JWT Bearer, which depends on a certificate and private key). That leaves Client Credentials flow, authenticating with a client ID/secret and a configured Run As user — which also fits naturally with the team's existing "one service account for everything" pattern, as long as that Run As user is scoped to this integration specifically rather than reused broadly (Lesson 6's warning against convenience-driven over-scoping still applies).

## Scenario 2: the per-customer consent requirement

A company is building a product that connects to each of its customers' own separate Salesforce orgs, and legal has required that each customer must explicitly see and approve exactly what the product can access before any data flows.

*Reasoning:* The explicit, individual consent requirement is the deciding constraint — it rules out Client Credentials and JWT Bearer, both of which are designed for unattended, no-consent-screen authentication. Authorization Code flow is the one built around a human explicitly logging in and approving access, which directly satisfies the legal requirement; the resulting refresh token also fits the "ongoing access after initial approval" shape of a SaaS product.

## Scenario 3: the webhook with no verification

A client's integration partner says their inbound webhook calls don't need signature verification because "the data isn't sensitive, it's just order status updates, and the endpoint URL is private."

*Reasoning:* Two separate claims need to be challenged here, matching Lesson 10's logic. First, "the URL is private" is security through obscurity — a Salesforce Site URL is discoverable, not secret, regardless of whether it's advertised anywhere, exactly as happened to Meridian Parts in Lesson 11. Second, "the data isn't sensitive" addresses confidentiality but not integrity or availability — even non-sensitive order-status data can be forged or flooded by anyone who finds the endpoint, corrupting real records or creating a denial-of-service-style load, regardless of whether the data itself was ever secret. The recommendation is signature verification regardless of data sensitivity, because the risk being addressed is "who's allowed to write to this endpoint," not "is this specific data secret."

## Scenario 4: the "it's always worked" integration user

An existing integration user has had the System Administrator profile for four years. The client's argument for leaving it alone is "it's never caused a problem, and scoping it down risks breaking something we don't fully understand anymore."

*Reasoning:* This tests whether least privilege is understood as a standing risk, not a reactive one (Lesson 6). "It hasn't caused a problem" describes absence of detected misuse, not absence of risk — the blast radius if this specific credential is ever compromised is the entire org, which is the risk regardless of whether anything has happened yet. The recommendation isn't to flip the profile without analysis — it's to first map exactly what the integration actually touches (reviewing its real historical activity via event monitoring, per Lesson 9, is the concrete way to do this safely), build a scoped permission set matching that mapped behavior, and cut over with a monitored rollback plan — addressing the client's legitimate "we don't fully understand it" concern with evidence rather than leaving a four-year-old System Administrator credential in place indefinitely because investigating it feels risky.

## The reusable structure

For any scenario like these: (1) identify every constraint stated in the scenario's wording, (2) for each plausible answer, name the specific constraint that rules it out, (3) state your recommendation and connect it directly back to the constraints that survived, (4) note any remaining risk or follow-up action your recommendation doesn't fully resolve on its own. This structure is what separates a confident-sounding guess from a defensible architectural answer.

## Key terms

| Term | Meaning |
|---|---|
| Review-board scenario question | An architecture question built from a short business situation with embedded constraints, requiring a justified recommendation rather than a recalled fact |
| Ruling-out reasoning | Explicitly naming which scenario constraint eliminates an otherwise-plausible alternative, rather than only asserting the preferred answer |

## Lab

Write your own fifth scenario, in the same style as the four above: a short business situation with two or three embedded constraints, drawn from any lesson in this course. Then write the full reasoning for it yourself, explicitly naming which constraint rules out each plausible-but-wrong answer, following the four-step reusable structure from this lesson.

## Check yourself

Can you re-derive the reasoning for Scenario 3 without rereading it -- specifically, the two separate claims it challenges? Can you apply the four-step reusable structure to a brand-new scenario you make up yourself?
