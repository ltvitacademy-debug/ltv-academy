# Lesson 30 — Lab: Building a Security Review Checklist for an AI Feature

**Chapter 8 · Capstone: Securing an AI Application End to End · Lesson 30 of 32**

## What you'll learn

- How to turn six chapters of individual AI security concepts into one checklist a feature either
  passes or doesn't, before it ships
- Why a checklist organized by attack category (injection, poisoning, extraction, adversarial
  robustness, architecture) catches gaps a general "is this secure?" review misses
- How Larkspur's Lesson 29 finding becomes one concrete, reusable checklist item instead of a
  one-off fix
- What a real go/no-go gate looks like for an AI feature with tool-calling access

## The scenario

Larkspur Software wants to extend SupportPilot, the RAG assistant from Lesson 29, with two new
tools: `close_ticket` and `issue_refund`. Before that ships, the security team requires every AI
feature to pass a written review checklist — the same role a code review or a pen-test sign-off
plays for any other feature, just scoped to what's specific about AI systems. This lab builds that
checklist from the ground up, using the six earlier chapters of this course as its categories.

## Category 1 — Prompt injection (Chapter 2)

- [ ] Every retrieval source is labeled trusted or untrusted, and untrusted sources are documented
- [ ] Retrieved content is marked as data in the prompt template, not concatenated as instructions
- [ ] A marker-string test (Lesson 29's method) has been run against each untrusted source
- [ ] Tool calls triggered by the agent require a check that the triggering request came from the
      actual user, not from retrieved content

## Category 2 — Data poisoning and supply chain (Chapter 3)

- [ ] The source and provenance of any fine-tuning or embedding data is documented and reviewed
- [ ] Third-party models or datasets used by the feature have a known, checked origin
- [ ] There's a process for re-validating data if the knowledge base's ingestion pipeline changes

## Category 3 — Model extraction and inversion (Chapter 4)

- [ ] The feature's API has rate limiting and query monitoring, not just authentication
- [ ] Unusual query patterns (e.g., high-volume systematic probing) trigger an alert
- [ ] Nothing in a response leaks more of the underlying model or its training data than the
      feature's purpose requires

## Category 4 — Adversarial robustness (Chapter 5)

- [ ] If the feature classifies or scores input, it's been tested against the evasion patterns
      from Chapter 5, not just clean test data
- [ ] A degraded or uncertain classification fails safe (escalates to a human) rather than
      defaulting to "allow"

## Category 5 — AI application architecture (Chapter 6)

- [ ] **Privilege separation**: `close_ticket` and `issue_refund` run as distinct, narrowly-scoped
      tools — the agent can't use a summarization call to also trigger a refund
- [ ] **Human approval gate**: any tool with real-world effect (refund, ticket closure) requires an
      explicit confirmation step, not a fully autonomous call
- [ ] Secrets used by any tool are never exposed to the model itself, only to the code invoking the
      tool
- [ ] API endpoints behind the feature follow the same authentication and authorization review as
      any other production API

## The go/no-go gate

```
AI FEATURE SECURITY REVIEW — SupportPilot tool expansion
Reviewer: ___________        Date: ___________

Category 1 (Injection):          PASS / FAIL — items checked: __ / 4
Category 2 (Data/Supply chain):  PASS / FAIL — items checked: __ / 3
Category 3 (Extraction):         PASS / FAIL — items checked: __ / 3
Category 4 (Adversarial):        PASS / FAIL — items checked: __ / 2
Category 5 (Architecture):       PASS / FAIL — items checked: __ / 4

Overall: SHIP / DO NOT SHIP
Open findings (if DO NOT SHIP): ___________________________
```

Larkspur's security lead applies this directly to the refund tool: the Lesson 29 finding means
Category 1 and Category 5 can't pass until retrieved ticket content is marked as untrusted data
*and* `issue_refund` sits behind a human approval gate. Both conditions have to be true — a
checklist that catches the injection but still lets the agent refund money autonomously hasn't
actually closed the risk.

## Key terms

| Term | Meaning |
|---|---|
| Security review checklist | A written, category-organized gate a feature must pass before shipping, scoped to what's specific about AI systems |
| Go/no-go gate | A binary ship-or-don't decision tied to specific, checkable items rather than a subjective judgment |
| Privilege separation | Splitting an agent's tools so no single compromised call can reach a sensitive action directly |
| Human approval gate | A required confirmation step before an AI system executes an action with real-world effect |

## Check yourself

You're ready for Lesson 31 when you can explain, without looking: why does the refund tool need
*both* the injection fix and the approval gate to pass review, and what would still be at risk if
only one of the two shipped?
