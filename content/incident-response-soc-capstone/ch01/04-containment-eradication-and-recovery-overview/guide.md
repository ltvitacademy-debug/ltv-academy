# Lesson 4 — Containment, Eradication, and Recovery: Overview

**Chapter 1 · The Incident Response Lifecycle · Lesson 4 of 4**

## What you'll learn

- What Containment, Eradication, and Recovery each mean as distinct, sequential phases
- Why these three happen in that specific order, and what goes wrong if the order is skipped
- A concrete walkthrough showing all three phases acting on the same incident
- How this lesson sets up Chapters 4 and 5, which cover each phase in real depth

## Three distinct jobs, one phase name

NIST SP 800-61 groups Containment, Eradication, and Recovery under one phase name, but they are
three separate jobs done in sequence, not one action with three labels. **Containment** stops the
bleeding — it limits an attacker's ability to do further damage or spread further, right now, before
anything else happens. **Eradication** removes the actual cause — the malware, the unauthorized
account, the vulnerability that let the attacker in — so the problem doesn't simply resume once
things calm down. **Recovery** returns affected systems to normal operation, verified clean, and
brings the business back to running as usual. This lesson is a high-level overview only; Chapter 4
covers Containment and Eradication in real depth, and Chapter 5 does the same for Recovery.

## Why the order matters

Doing these out of order causes real problems, which is exactly why NIST sequences them this way.
Attempting Eradication before Containment means trying to remove malware from a system an attacker
can still actively reach and reinfect — a losing battle. Attempting Recovery before Eradication
means restoring a system to "normal" while the actual cause is still present, which just invites the
same incident again, often within hours. The sequence exists because each phase depends on the one
before it actually being finished: you can't cleanly remove a cause from a system still under active
attack, and you can't safely call a system recovered while its cause is still there.

## A concrete walkthrough

Take the compromised-workstation example from Lesson 1's walkthrough, now with these three phases
filled in properly. **Containment**: the team disconnects the workstation from the network, cutting
off its ability to communicate with a command-and-control server or spread to other machines — the
damage stops growing right there. **Eradication**: the team identifies and removes the actual
malware that caused the outbound traffic in the first place, confirming it's gone rather than merely
quiet. **Recovery**: the team restores the workstation from a known-clean image, verifies it's
behaving normally, reconnects it to the network, and confirms with monitoring that the unusual
traffic doesn't return. Only after all three are complete does the incident move into Post-Incident
Activity from Lesson 1 — the lessons-learned review that feeds back into Preparation.

## Why this is only an overview

Each of these three phases has real depth that a single overview lesson can't cover responsibly.
Containment alone involves real decisions about isolation methods and tradeoffs between stopping an
attacker fast versus preserving evidence. Eradication involves real forensic work to confirm a cause
is actually gone, not just dormant. Recovery involves real verification work to confirm a system is
genuinely safe to reconnect, not just superficially clean. This lesson exists to give you the shape
of all three before Chapters 4 and 5 teach each one properly — which is also the natural close of
this chapter's lifecycle tour. Chapter 2 picks up right where Lesson 2 left off, going deep on what a
real incident response plan actually contains.

## Key terms

| Term | Meaning |
|---|---|
| Containment | Limiting an attacker's ability to do further damage or spread, before anything else happens |
| Eradication | Removing the actual cause of an incident so it cannot simply resume |
| Recovery | Returning affected systems to verified-clean, normal operation |
| Sequence dependency | Each phase requiring the one before it to be genuinely finished before it can safely begin |

## Check yourself

Explain, in your own words, why attempting Recovery before Eradication is finished is a real risk —
and what specifically could go wrong if a team skipped straight to it.
