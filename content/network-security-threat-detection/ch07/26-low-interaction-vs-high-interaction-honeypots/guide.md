# Lesson 26 — Low-Interaction vs. High-Interaction Honeypots

**Chapter 7 · Honeypots & Deception Technology · Lesson 26 of 32**

## What you'll learn

- The difference between a **low-interaction honeypot** and a **high-interaction honeypot** — what each one actually runs, not just how each one is labeled
- Why low-interaction honeypots are cheap and safe but limited in the intelligence they produce
- Why high-interaction honeypots produce far richer attacker intelligence, and the real operational risk that comes with that
- How to think about which type fits a given goal — broad coverage versus deep intelligence on a determined attacker

## Low-interaction honeypots: a thin simulation

A **low-interaction honeypot** simulates a service minimally — just enough to look like something real from the outside, without actually running the real service underneath. A classic example is a honeypot that emulates an open SSH port: it accepts a connection, presents a convincing SSH banner, maybe even logs a username and password an attacker tries to use, and then logs the attempt. But there's no real SSH daemon back there, no real shell, and nothing an attacker can actually do once "inside" — because there is no inside.

That thinness is the entire point. Because the honeypot never executes real commands or hosts a real operating system, there's very little an attacker can exploit, pivot through, or abuse, even if they figure out it's fake. Low-interaction honeypots are **low risk and low realism** — cheap to deploy in bulk, safe to leave running unattended, but they only ever capture the earliest, shallowest layer of an attack: that someone probed a port, tried a login, or scanned an IP range.

## High-interaction honeypots: the real thing

A **high-interaction honeypot** flips that tradeoff. It's a real, fully-functional system — a genuine operating system, genuine services, sometimes genuine (if fake) data — that an attacker can actually log into, explore, and interact with as if it were a legitimate target. Because the attacker is dealing with a real system rather than a scripted emulation, they'll behave far more naturally: running real reconnaissance commands, attempting to escalate privileges, trying to install tools, maybe even trying to pivot to other systems from inside what they believe is a genuine foothold.

That realism is exactly what makes high-interaction honeypots valuable for intelligence gathering — defenders get to watch an attacker's actual playbook unfold, not just the fact that a port got touched. But it comes with real operational risk: a system an attacker can genuinely interact with is a system an attacker could potentially abuse, including trying to use it as a launching point to reach other parts of the network, if it isn't properly isolated from everything else. A high-interaction honeypot that isn't rigorously sandboxed and segmented isn't a safe intelligence-gathering tool anymore — it's an actual foothold handed to the attacker.

## Concrete example of each

A **low-interaction** example: a honeypot tool emulates an exposed SSH service on port 22. An attacker's automated scanner connects, is offered a banner, tries `admin`/`admin123`, and the honeypot logs the attempt and disconnects — nothing more ever happens, because there's no real system behind the banner.

A **high-interaction** example: a fully installed Linux server, deliberately placed on an isolated subnet with no path to the real network, running real services with a deliberately weak configuration. An attacker who gets in can actually poke around the filesystem, try to escalate to root, and attempt to install a backdoor — all of it observed and logged in detail, and all of it contained, because the box has no real route anywhere else.

## The tradeoff in practice

Most real deception strategies use both, for different reasons. Low-interaction honeypots get deployed widely and cheaply across many network segments, acting as broad tripwires that catch the earliest probing activity. High-interaction honeypots get deployed more selectively, carefully isolated, when the goal is deep, detailed intelligence on how a specific category of attacker actually operates once they believe they've gotten somewhere real.

## Key terms

| Term | Meaning |
|---|---|
| Low-interaction honeypot | Simulates a service minimally (e.g., an emulated SSH banner); low risk, low realism, logs only shallow activity |
| High-interaction honeypot | A real, fully-functional system an attacker can actually interact with; high realism, higher operational risk if not isolated |
| Emulated service | A scripted stand-in for a real service, used by low-interaction honeypots to look real without being real |
| Isolation/segmentation | The containment a high-interaction honeypot requires so an attacker's real access can't reach anything else |

## Check yourself

A security team wants to understand exactly how a specific group of attackers escalates privileges once they get a foothold. Would a low-interaction or a high-interaction honeypot actually give them that answer, and what extra precaution does that choice require?
