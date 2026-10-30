# Lesson 2 — Reconciling What Each Stakeholder Actually Wants

**Chapter 1 · Intermediate Capstone: Multi-Source Detection and a Real Misconfiguration · Lesson 2 of 16**

## What you'll learn

- How to turn two vague stakeholder asks into one concrete project scope
- Why "operational visibility" and "an auditable trail" aren't actually in tension
- The four concrete deliverables that satisfy both Owen and Renee at once
- Why scoping this conversation now avoids building the wrong thing later

## Starting from what each person actually said

Lesson 1 named the two asks. This lesson gets specific, the way Mara actually has to before
writing a single query. In a short working session, she asks Owen and Renee each one direct
question: *what does "done" look like to you?*

- **Owen** answers in SOC terms: he wants to be able to see a sign-in, a firewall allow, and a
  Linux authentication event from the same rough window of time, side by side, instead of
  checking three separate systems by hand. He doesn't care about paperwork — he cares whether
  the team would actually catch something.
- **Renee** answers in audit terms: she wants to be able to show, months from now, exactly what
  log sources are being watched, what rule catches what, who can access what, and what the team
  does when something fires. She doesn't care about the underlying KQL — she cares whether the
  process is documented and repeatable.

## Where the two answers actually meet

Mara's job isn't to pick one answer over the other — it's to notice that a single, well-built
SOC produces both. A cross-source correlation rule that actually works *is* the visibility Owen
wants, and the design documentation, the runbook, and the access-control policy behind that rule
*are* the audit trail Renee wants. Neither stakeholder has to compromise if the project is scoped
right from the start.

## The four concrete deliverables

Reconciling the two asks turns into four specific things to build, each one serving both
stakeholders at once:

1. **Multi-source ingestion** — Windows, Linux, and firewall logs landing in the same Sentinel
   workspace (Owen: visibility into real traffic; Renee: documented log coverage)
2. **A cross-source correlation rule** — one rule that watches more than one source together
   (Owen: a rule that could actually catch something real; Renee: a documented detection that
   exists for a specific threat scenario)
3. **A Conditional Access pilot policy** — a scoped access-control improvement, piloted before
   it's rolled out everywhere (Owen: fewer risky sign-ins; Renee: evidence of an access-control
   improvement in progress)
4. **An incident-response runbook** — a real, usable response procedure (Owen: the team knows
   what to do when something fires; Renee: documented incident-response capability)

## Why this conversation has to happen before any code

Skipping this step and jumping straight to connector setup is how projects end up technically
impressive but useless to one stakeholder or the other — a SOC with great detection and zero
documentation satisfies Owen and fails Renee; a SOC with a thick binder of policy and no working
rule satisfies Renee and fails Owen. Naming the four deliverables now, with both stakeholders in
the room, means every lesson from here forward has a clear reason to exist.

## Key terms

| Term | Meaning |
|---|---|
| Scope | The specific, agreed set of deliverables a project will and won't include |
| Cross-source correlation rule | A detection rule that evaluates more than one log source together, not just one in isolation |
| Access-control pilot | Rolling out a new access policy to a limited group first, before a tenant-wide rollout |
| Incident-response runbook | A tactical, step-by-step document responders actually follow during a real incident |

## Lab

Without writing anything technical yet, write one sentence for each of the four deliverables
explaining how it serves Owen's visibility goal *and* one sentence explaining how it serves
Renee's audit-trail goal. If you can't write both sentences for a deliverable, it isn't scoped
clearly enough yet.

## Check yourself

You're ready for Lesson 3 when you can name, without looking, the four concrete deliverables
this project will build, and explain in one sentence each why every one of them serves both
Owen's and Renee's goals at once.
