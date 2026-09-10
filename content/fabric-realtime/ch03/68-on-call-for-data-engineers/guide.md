# Lesson 68 — On-Call for Data Engineers

**Chapter 3 · Production Data Engineering · Lesson 68 of 70**

## What you'll learn

- Picking back up Lesson 53's severity tiers — who actually receives each one
- The escalation path a runbook (Lesson 67) points toward
- What makes an on-call rotation sustainable, not just staffed
- Handoff — the moment most on-call knowledge quietly gets lost

## Severity tiers, revisited with a name attached

Lesson 53 defined severity without saying who receives what. On-call
answers that directly:

```
Sev 1 (page now):              the on-call engineer, immediately, any hour
Sev 2 (business hours):        the on-call engineer, during working hours only
Sev 3 (log only):              nobody paged -- reviewed at the next
                                regular check-in, not urgently
```

Without a defined rotation, "page someone" is a vague instruction
that fails exactly when it matters most — during a real Sev 1, at
2am, when the only reasonable question is "whose phone rings?" and
there needs to already be an unambiguous answer.

## The escalation path a runbook points toward

Lesson 67's runbook example ended with "escalate to [on-call
rotation]" as its final step when a fix doesn't resolve things
within 10 minutes. That escalation path has to be a real,
maintained thing — a specific person or a rotation schedule, not a
placeholder nobody ever filled in. A runbook's last step is only as
good as the escalation target actually being reachable when needed.

## What makes a rotation sustainable

```
Unsustainable:  one person always on-call, every night, indefinitely
Sustainable:    a rotation across several people, each carrying the
                pager for a bounded period, with real recovery time after
```

A rotation that burns out its one or two engineers eventually fails
completely — not gradually, but exactly when it's needed most,
because a burned-out on-call engineer misses things a fresh one
wouldn't. Sustainability isn't a soft perk; it's a structural
requirement for the on-call system to actually work when a real
Sev 1 happens.

## Handoff — where knowledge quietly gets lost

The moment one person's on-call shift ends and another's begins is
exactly when context can silently disappear: an issue that's been
"probably fine, keep an eye on it" for three days needs to actually
be said out loud to the next person, not assumed to be obvious.
A short, deliberate handoff — what's currently unresolved, what to
watch — is cheap insurance against the next person starting their
shift blind.

## Key terms

| Term | Meaning |
|---|---|
| On-call rotation | A defined schedule of who receives each severity tier, and when |
| Escalation path | A runbook's last step, only useful if the target is actually reachable |
| Handoff | Deliberately passing context between shifts, so nothing gets silently dropped |

## Check yourself

You're ready for Lesson 69 when you can explain, without looking: why
does an unsustainable on-call rotation tend to fail exactly when it's
needed most, rather than gradually?
