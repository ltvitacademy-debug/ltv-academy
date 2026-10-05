# Lesson 22 — Incident Response for AI

**Chapter 4 · Security, Access and Monitoring · Lesson 22 of 30**

## What you'll learn

- Why "AI incident" covers more than an outage, and why that broader definition matters
- The response sequence a governed AI program follows once something goes wrong
- Why a model's alias (Lesson 13) functions as the AI-specific equivalent of a kill switch
- What has to happen after the incident is contained, not just during it

## What counts as an AI incident

Traditional incident response trains people to think of "incident" as "the system is down." For AI, that's only one category, and often not the most damaging one. A model can be fully up, responding fast, with no errors in any dashboard — and still be an incident:

- **Biased or harmful output** — the model is working exactly as deployed, but its decisions are systematically unfair to a group, discovered after the fact
- **Drift-driven errors** — covered in the previous lesson: the model's accuracy has quietly degraded because the world it's predicting shifted
- **Data leakage via prompts or outputs** — a generative system (Lesson 19) reveals information it shouldn't, through a response rather than a breach
- **A conventional security incident** — unauthorized access to model weights or training data, same as any other system (Lesson 17-18)

The common thread: none of these necessarily trip a standard uptime or error-rate alert. A program that only watches for outages will miss every one of them.

## The response sequence

Once an AI incident is identified — by monitoring, by a user report, or by a review — a governed program moves through the same broad sequence security incident response already uses, with AI-specific steps at each stage:

1. **Detect** — the trigger: a monitoring alert, a complaint, or something found during a routine review
2. **Contain** — stop the immediate harm, which for a model usually means pulling it out of production, not patching code under pressure
3. **Assess impact via lineage** — use the lineage chain (Lesson 14) to determine which decisions, time period, and downstream systems were actually affected
4. **Notify** — tell whoever needs to know: affected business owners, and if the impact reaches customers or triggers a regulatory threshold, the people responsible for that notification
5. **Remediate** — fix the underlying cause, not just the symptom that was noticed

## The AI-specific kill switch: the alias

Lesson 13 introduced aliases — a mutable pointer like `Champion` that names which model version actually serves production traffic. In an incident, that alias is the fastest containment tool available: moving `Champion` back to the last known-good version is often a single operation, with no code deployment, no infrastructure change, and no waiting on an engineering release cycle.

```python
# Immediate containment: point production back at the last known-good version
client.set_registered_model_alias(
    "prod.ml_team.fraud_detector", "Champion", version=11  # previous version
)
```

*This is the same alias mechanism from Lesson 13's registry discussion, now used as the incident-response containment step rather than a routine promotion.*

That's only possible, though, if versioning (Lesson 15) and the registry (Lesson 13) were already disciplined before the incident happened — rollback isn't a capability you can retrofit mid-incident if there's no clean version history to roll back to.

## After containment

Containing the immediate harm isn't the end of the response:

- **Update the model card** (Lesson 12) with the newly discovered limitation — the next person to evaluate this model for reuse needs to know what was found
- **Feed the finding back into the approval process** (Lesson 16) — if the next version is going to reintroduce this behavior, the approval gate needs a new check for it
- **Record the full incident in version history** — what was found, what was contained, what was changed, matching the change-control discipline from Lesson 15

An incident that gets fixed but never documented is a problem that will happen again, because nothing in the governance chain learned from it.

## Key terms

| Term | Meaning |
|---|---|
| AI incident | Any event where a model's behavior causes real harm or risk, not limited to outages or errors |
| Containment | The immediate step of stopping ongoing harm, often by rolling back to a prior model version |
| Impact assessment | Using lineage to determine exactly which decisions and systems an incident actually affected |
| Alias rollback | Moving a registry alias back to a previous, known-good model version as a fast containment action |

## Lab

Sketch an incident response for a hypothetical case: a customer-facing recommendation model is found, after three weeks live, to be performing noticeably worse for one customer segment. Walk through the five-step response sequence above for this scenario, naming what "contain" and "assess impact" would concretely involve.

## Check yourself

Can you name four categories of AI incident that wouldn't trip a standard uptime alert, and explain why alias rollback only works as a fast containment step if the registry and version history were already disciplined before the incident happened?
