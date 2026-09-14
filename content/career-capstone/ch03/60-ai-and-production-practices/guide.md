# Lesson 60 — Where AI Fits in the Production Practices From Course 3

**Chapter 3 · AI for Data Engineers (Bonus) · Lesson 60 of 81**

## What you'll learn

- How AI assistance maps onto specific lessons in Fabric & Real-Time Analytics's production chapter
- Why AI is one more tool in that toolkit, not a replacement for any of its practices
- Where each of this chapter's AI techniques actually plugs into a production workflow
- The one thing none of this chapter's tools can substitute for

## The toolkit doesn't change, the tools inside it do

Fabric & Real-Time Analytics Chapter 3, "Production Data Engineering,"
established the actual practices that keep a pipeline reliable:
testing (Lessons 48–49), observability and alerting (Lessons 52–53),
incident response and root cause analysis (Lessons 57–58), governance
and secrets handling (Lessons 60–62), and deployment patterns
(Lessons 45, 65). Nothing in this chapter replaces any of that. What
AI adds is a faster way to execute pieces of those practices — it's
a new tool inside an already-established toolkit, not a new toolkit.

```
Production practice (Fabric Ch3)      AI assistance (this chapter)
Testing pipelines (L48-49)     <-     draft test cases (L53)
Root cause analysis (L58)      <-     draft an RCA hypothesis (L54)
Secrets/PII handling (L61-62)  <-     the guardrail on what's off-limits (L56)
```

## Mapping the fit, practice by practice

Testing (Fabric L48–49) gets faster first drafts from Lesson 53's
spec-driven prompting, still reviewed the same way any test is.
Incident response and RCA (Fabric L57–58) gets a faster first
hypothesis from Lesson 54, still confirmed against logs and data
before it's written into an incident report. Observability (Fabric
L52) is what actually produces the logs Lesson 54's draft depends on
in the first place — no logs, no useful draft. Secrets management
and PII handling (Fabric L61–62) are exactly what Lesson 56's
guardrails exist to protect; those aren't AI practices, they're the
production practices AI has to respect.

## What AI cannot substitute for

None of this chapter's tools replace the judgment call of deciding
what "production ready" means for a specific pipeline — that's
Fabric Lesson 43's territory, and it depends on business context an
LLM was never given. AI drafts faster within an established practice;
it doesn't decide which practices apply, how strict an SLA needs to
be, or when an incident is actually resolved. Those calls still
belong to the engineer running the pipeline, informed by the same
production judgment Course 3 built from the ground up.

```
AI speeds up:                    AI does not decide:
- drafting tests, RCAs, mappings - what "production ready" means here
- summarizing logs                - how strict an SLA should be
- flagging obvious errors         - when an incident is truly resolved
```

## Key terms

| Term | Meaning |
|---|---|
| Production toolkit | The testing, observability, incident-response, and governance practices from Fabric Ch3 |
| AI as a tool, not a toolkit | AI speeds up specific tasks within existing practices; it doesn't replace the practices |
| Judgment calls | Decisions about SLAs, readiness, and resolution that remain the engineer's, not the AI's |

## Check yourself

You're ready for Lesson 61 when you can explain, without looking:
why does calling AI "one more tool in the toolkit" matter more than
it sounds — what exactly does that phrase rule out?
