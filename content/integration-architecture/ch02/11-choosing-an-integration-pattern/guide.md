# Lesson 11 — Choosing an Integration Pattern

**Chapter 2 · Integration Design · Lesson 11 of 28**

## What you'll learn

- A repeatable decision framework for choosing an integration pattern, built from the four questions in Lesson 1 and every pattern covered so far
- Why "what pattern did the last project use" is not a valid reason to choose a pattern for a new requirement
- A worked example applying the framework to a specific business requirement
- Why this decision belongs to the architect, and why it has to be made before implementation starts, not during it

## The framework is the four questions, applied deliberately

Chapter 1 ended with several named options: point-to-point, middleware/hub-and-spoke, synchronous, asynchronous (fire-and-forget and request-reply), and event-driven. Lesson 1's four framing questions — who initiates, how often, how much data, how fast — are exactly the inputs that determine which of those options actually fits a given requirement. Choosing a pattern isn't a matter of taste or habit; it's the output of answering those four questions honestly and following where the answers lead:

- **Volume** rules out synchronous, per-record APIs for large batches and points toward Bulk API or a scheduled batch pattern (Lesson 13) instead.
- **Timing/urgency** separates requirements that genuinely need an immediate answer (synchronous) from requirements that only feel urgent but can tolerate a short delay (asynchronous request-reply) or need no response tracking at all (fire-and-forget, often event-driven).
- **Number of systems involved, now and foreseeably** determines whether point-to-point is still proportionate or whether a hub-and-spoke/middleware layer is justified, per the N-squared analysis from Lesson 3.
- **Coupling tolerance** — how acceptable is it for this flow to be dependent on another system's uptime? — separates patterns that accept availability coupling (synchronous) from patterns designed specifically to avoid it (asynchronous, event-driven).

## "We used X last time" is not a design decision

A recurring, specifically unacceptable shortcut is choosing a pattern because it's what the last project used, or because it's the tool a particular developer already knows well, rather than because it actually fits this requirement's answers to the four questions. A team that built its first integration as a synchronous Apex callout because that's what the first developer on the project knew how to do, and then builds every subsequent integration the same way regardless of volume or coupling tolerance, isn't making architecture decisions — it's defaulting to familiarity and calling it a pattern. An architect's specific value in this process is forcing the four questions to be asked explicitly, every time, rather than letting precedent or convenience make the choice silently.

## A worked example

A company needs new leads captured on their public website to appear in Salesforce as Lead records, and separately needs every Lead conversion event to trigger an update in their marketing automation platform's contact record. Walking through the four questions for the first requirement: initiation is from the website (inbound to Salesforce); frequency is continuous, as leads arrive; volume is low per event (one Lead at a time) even if frequent overall; urgency is moderate — a few minutes' delay before the Lead appears is tolerable, but days would not be. These answers point toward an asynchronous or near-real-time pattern (an inbound REST API call creating the Lead, processed quickly but without the website visitor's own transaction being blocked waiting for Salesforce's internal processing to finish) rather than a synchronous, blocking integration or a batch job. For the second requirement — Lead conversion triggering a marketing platform update — initiation is from Salesforce; frequency is per-conversion, not continuous; volume is low; and critically, the triggering transaction (converting the Lead) has no business reason to wait on the marketing platform's response. This points squarely at fire-and-forget, likely via a Platform Event that the marketing integration subscribes to, rather than a synchronous callout bolted onto the conversion logic.

## Why this is the architect's decision, made before implementation

Choosing a pattern after implementation has already started invites sunk-cost bias — a team that's already written synchronous Apex is reluctant to rework it into an async design even once the volume or coupling problems become apparent. This decision belongs explicitly to the architecture phase, documented and justified against the four questions, before a single line of integration code is written, precisely because unwinding the wrong pattern after the fact costs far more than choosing correctly up front.

## Key terms

| Term | Meaning |
|---|---|
| Decision framework | A repeatable method (here, the four questions) for choosing an integration pattern based on requirements rather than habit |
| Coupling tolerance | How acceptable it is for a given integration flow to depend on another system's uptime and response time |
| Sunk-cost bias | The tendency to keep an already-built, ill-fitting design rather than rework it once its flaws become apparent |

## Lab

A hospital network needs two integrations: (1) nightly, send the full patient-appointment schedule for the next day to a third-party reminder-call service, and (2) when a nurse updates a patient's allergy information in Salesforce Health Cloud, immediately alert the hospital's internal pharmacy system before any new medication order can be entered. Apply the four-question framework to each requirement and recommend a pattern (point-to-point vs. hub-and-spoke, synchronous vs. asynchronous, fire-and-forget vs. request-reply vs. event-driven) for each, justifying your answer from the questions' answers rather than from habit.

## Check yourself

Can you list the four framing questions and explain, for each, what kind of pattern decision it drives? Can you explain why "we used this pattern on the last project" is not, by itself, a valid justification for choosing a pattern on a new one?
