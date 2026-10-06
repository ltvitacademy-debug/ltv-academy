# Lesson 27 — Monitoring Agent Behavior

**Chapter 5 · Agent Safety & Guardrails · Lesson 27 of 32**

## What you'll learn

- Why monitoring is the chapter's connective layer, not a separate add-on feature
- Anthropic's own "transparency" principle for agent oversight
- Four signals worth watching continuously, and what each one actually catches
- The difference between monitoring for debugging and monitoring for drift

## Every guardrail so far produces a signal — if you're watching for it

This chapter built checkpoints (Ch 4), stopping conditions, budgets,
sandboxing, and injection defenses. Each one, when it fires, produces a
fact: a rejection happened, a budget ran out, a repeat-call limit tripped,
an injection screen flagged something. Monitoring is what turns those
individual facts — most of which Lesson 21's audit log already
captures — into an ongoing picture of how the agent is actually behaving
in production, not just what happened in any one run.

Anthropic's own guidance on building agents frames this as one of its core
oversight principles: "transparency by explicitly showing the agent's
planning steps," so a human reviewer can actually monitor decision-making
and intervene — not just see a final answer with no visibility into how the
agent got there.

## Four signals worth watching continuously

```
1. Rejection rate per tool  -- rising = checkpoint
   or tool design needs review
2. Limit-trip frequency     -- rising = tasks are
   under-scoped or genuinely getting harder
3. Injection-screen flags   -- any nonzero rate on
   a given source warrants investigation
4. Cost per task, trending  -- drift here often means
   a prompt or tool regressed quietly
```

None of these is useful as a one-time check. A rejection rate of 5% on a
`send_email` tool isn't alarming by itself — but a rejection rate that
climbed from 5% to 40% over two weeks says something changed, either in
what the agent is being asked to do or in how well it understands the
task, and that's worth investigating before it becomes an incident instead
of after.

## Debugging vs. drift

Lesson 21 drew the line between a debug log (developer-facing, ephemeral)
and an audit log (durable, complete). Monitoring adds a third lens on the
same underlying data: not "what happened in this one run" (debugging) and
not "what is the permanent record" (audit), but "how is the aggregate
pattern changing over time" (drift). The same audit log entries feed all
three uses — monitoring is mostly about asking the aggregate question
regularly, not collecting new data.

## Closing the loop back to Chapter 4

Monitoring is also what makes escalation (Lesson 20) and undo (Lesson 22)
actionable at the system level, not just the individual-incident level. If
escalations to a particular reviewer queue are piling up, that's a staffing
or routing problem to fix. If a particular tool keeps needing rollback
after approval, that tool's checkpoint design (Lesson 19) probably needs
tightening, not just its logging. Every control in this chapter gets
better when the team watching it can see the pattern, not only the
individual event.

## Key terms

| Term | Meaning |
|---|---|
| Transparency | Anthropic's principle of showing an agent's planning steps so a human can monitor and intervene |
| Rejection rate | The share of a tool's approval requests that get declined, tracked over time |
| Drift | A gradual change in aggregate behavior (cost, rejections, limit trips) worth investigating before it's an incident |
| Limit-trip frequency | How often stopping conditions (Lesson 23) or budgets (Lesson 24) actually fire, tracked over time |

## Check yourself

A team notices `issue_refund`'s rejection rate climbed from 5% to 35% over
three weeks, with no code changes. Using this lesson's framing, name two
different root causes this drift could point to, and which of this
chapter's earlier lessons each one would send you back to.
