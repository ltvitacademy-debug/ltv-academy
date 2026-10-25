# AI Incident Response Playbook Template

A fill-in template for the five-stage incident response shape from Chapter 4, Lesson 22 —
detect, triage, contain, communicate, review — pre-adapted for the three AI-specific incident
types that lesson names explicitly. Fill in a copy of the relevant section *before* an incident
happens, not during one; the capstone (Lesson 24) asks you to do exactly this for your own
feature's most likely failure mode.

---

## The five stages, as a checklist for any AI incident

```
1. Detect     — [What alert fired, or who reported it, and when?]
2. Triage     — [How many users/requests affected? Is it still happening right now?]
3. Contain    — [Model/prompt rollback? Feature disabled? Output filter tightened?]
4. Communicate — [Who gets told, what do they get told, how honestly?]
5. Review     — [Which earlier control — eval, drift check, alert, bias test —
                 should have caught this, and why didn't it?]
```

---

## Template 1 — A hallucination that caused real harm

**Incident:** [one sentence — what did the model claim, and what did a user do because of it?]

- **Detect:** [Which eval case, alert, or user report would catch this?]
- **Triage:** [How many users saw this specific fabricated claim? Is the prompt/retrieval path still producing it right now?]
- **Contain:** [Add the exact failing case to the eval dataset immediately — not just fix the one instance. What's the immediate mitigation while a real fix ships?]
- **Communicate:** [What do affected users need to be told, and by whom?]
- **Review:** [Why didn't the existing eval dataset or faithfulness check (Lesson 8) catch this before it reached production?]

## Template 2 — A prompt injection that got through

**Incident:** [one sentence — what did the injected instruction get the model to do?]

- **Detect:** [Alert, user report, or anomalous output pattern?]
- **Triage:** [Is this a one-off crafted attack, or a pattern across multiple sessions?]
- **Contain:** [Patch the specific gap (input/output boundary, tool permission). Re-run the red-teaming suite (Lesson 11) for siblings of the same attack — not just the exact one that succeeded.]
- **Communicate:** [Who needs to know — affected users, security team, leadership?]
- **Review:** [Which Chapter 1 defense (trusted/untrusted text separation, least-privilege tools, output filtering) was missing or insufficient, and what closes that specific gap?]

## Template 3 — A valid bias complaint

**Incident:** [one sentence — what outcome was reported as unfair, for whom?]

- **Detect:** [Was this caught by a paired-prompt test (Lesson 18), or only by a user complaint?]
- **Triage:** [Is this an isolated case, or does it reproduce across similar inputs?]
- **Contain:** [What's the immediate mitigation — a prompt change, a manual review step for this category of request?]
- **Communicate:** [What does the affected person/group need to hear, and from whom?]
- **Review:** [What should the existing bias-testing approach (Lesson 18) have included that it didn't? Treat this as a signal the tests missed something, not a one-off.]

---

## The postmortem question, asked of every incident

> Which earlier control — eval dataset, drift check, alert threshold, bias test, or
> documentation — should have caught this, and why didn't it?

An incident response that doesn't produce a concrete change to one of those controls was
reviewed, not actually learned from (Lesson 22). Every completed playbook above should end with
at least one specific edit to an eval case, an alert threshold, or a model card section — not
just a fixed line of code.
