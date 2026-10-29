# Lesson 8 — Tabletop Exercises: Testing the Plan Before You Need It

**Chapter 2 · Preparation: Building an IR Plan · Lesson 8 of 32**

## What you'll learn

- What a tabletop exercise actually is: a structured walkthrough of a hypothetical incident
  scenario with the real IR team, without touching any real systems
- How a tabletop exercise runs in practice — a facilitator, a scenario, and a series of
  "injects" that evolve the situation as the team talks through it
- The real value a tabletop exercise delivers: finding gaps in the plan, building muscle
  memory in the team's roles, and doing both far more cheaply than a real incident would
- Why this lesson closes the loop on everything the rest of this chapter just built

## What a tabletop exercise actually is

A **tabletop exercise** is a structured walkthrough of a hypothetical incident scenario, run
with the real IR team, where no real system is touched and nothing is actually broken. A
facilitator presents a scenario and the team talks through how they would respond — which
playbook applies, who's Accountable for which decision, what the communication plan says to do
first — using the actual plan, the actual playbooks, and the actual RACI matrix from the
previous three lessons. It's a rehearsal, not a performance.

## How it runs

A tabletop typically has a **facilitator** who runs the session and isn't playing a response
role themselves, an initial **scenario** ("it's Friday at 5 p.m. and the file server's contents
have just been renamed with a `.locked` extension"), and a sequence of **injects** — new pieces
of information the facilitator introduces as the exercise goes on ("the backup job log shows the
last successful backup was 11 days ago," "a reporter has just emailed asking if the company has
been hit by ransomware"). Each inject forces the team to apply the plan and playbooks to a
development nobody had time to prepare for in advance, which is exactly the point.

**Concrete example:** a tabletop scenario opens with ransomware encrypting a file server on a
Friday at 5 p.m. The ransomware playbook says to isolate the host and check backups — but an
inject reveals the most recent backup job actually failed silently eleven days ago, and nobody
noticed. Another inject reveals the on-call escalation list has a phone number for an employee
who left the company two months ago. A third surfaces real confusion: two different people both
believe they're Accountable for approving contact with a ransomware negotiator, because the
RACI matrix was never actually finalized for that specific decision.

## Why it's worth doing

None of those three problems — a silently failed backup, a stale contact list, an unresolved
RACI gap — would be found by simply re-reading the plan. They surface only when a real team
tries to actually *use* it against a scenario that moves. That's the entire value of a tabletop:
it finds gaps in the plan and playbooks while there's still time to fix them, it builds the
team's familiarity with their own roles so the real thing feels less unfamiliar, and it does both
at a cost that is nowhere close to what learning the same gaps during an actual incident would
cost. Many organizations also run these periodically to satisfy requirements like PCI DSS or
SOC 2, but the real payoff is the gaps it finds, not the box it checks. A debrief after each
tabletop — an after-action review — feeds directly back into updating the plan, the playbooks,
and the RACI matrix for next time.

## Key terms

| Term | Meaning |
|---|---|
| Tabletop exercise | A structured walkthrough of a hypothetical incident scenario with the real IR team, without touching real systems |
| Facilitator | The person running a tabletop exercise, introducing the scenario and injects, not playing a response role |
| Inject | A new piece of information the facilitator introduces mid-exercise to evolve the scenario |
| After-action review | The debrief following an exercise (or real incident) that feeds gaps found back into updating the plan |

## Check yourself

In the Friday-at-5-p.m. ransomware tabletop example, name the three gaps the exercise surfaced,
and explain why each one would likely have gone undiscovered without running the exercise.
