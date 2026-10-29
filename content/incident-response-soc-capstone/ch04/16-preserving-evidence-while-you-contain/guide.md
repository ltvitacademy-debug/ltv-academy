# Lesson 16 — Preserving Evidence While You Contain

**Chapter 4 · Containment Strategies · Lesson 16 of 32**

## What you'll learn

- Why the fastest-looking containment move can quietly destroy the evidence you'll need later
- What forensic imaging actually captures, and why order of operations matters
- When preserving evidence formally matters — legal, regulatory, and insurance reasons, not just curiosity
- A real sequence that contains fast without losing the evidence a later review may require

## The tension this chapter has been circling

Every lesson in this chapter has built toward a real tension: contain fast, or contain carefully — and
the fastest-looking option is sometimes the one that destroys what you'd need later. The EDR lesson
already flagged the core fact at the technical level: powering off a machine loses whatever lived only
in volatile memory — running processes, decrypted strings, injected code, active connection state —
none of which survives a shutdown. This lesson covers the same tension, but one level up, at the level
of containment *strategy*: when does preserving that evidence formally matter enough to change how you
contain, and what does doing it right actually look like?

## When evidence preservation isn't optional

Not every incident needs forensic-grade evidence preservation — a low-severity false-positive-adjacent
finding usually doesn't. But a real category of incidents does, and it's larger than "just the serious
ones": anything that might lead to **legal action** (prosecuting an insider or external attacker),
**regulatory reporting** (breach notification laws that require proving what was and wasn't accessed),
or a **cyber insurance claim** (insurers often require documented evidence of scope before paying out).
In any of those situations, acting fast without preserving evidence can cost an organization far more
later than the extra time preservation takes during the incident — a breach notification determination
that could've been "no personal data was accessed" can turn into "we can't prove what was or wasn't
accessed," which is a materially worse position, legally and reputationally.

## The real order of operations

The practice that resolves the tension is sequencing, not choosing one side over the other. **Isolate
first, not power off** — the host stays live, cut off from the network, exactly as the EDR lesson
described. That alone stops the active damage without losing anything in memory. **Then acquire
evidence before eradication** — a memory dump and a disk image, captured with proper forensic tooling
(often a write blocker, to guarantee the acquisition process itself doesn't alter the original data)
and a cryptographic hash recorded at the time of capture, so anyone later can verify the image hasn't
been tampered with since. **Document the chain of custody** — who captured it, when, how, and where
it's stored — because if this evidence ever needs to hold up to outside scrutiny (a regulator, a court,
an insurer), an undocumented gap in that chain can undermine the whole thing. Only after that
acquisition is complete does the team move into eradication and rebuild, covered starting next chapter.

## Concrete example: the healthcare breach that needed proof

A healthcare provider's SOC discovers a server holding patient records has likely been accessed by an
attacker. Under HIPAA, the organization has to determine — and be able to show — what was actually
accessed, because that determination drives whether and how patients must be notified. The IR team
isolates the server immediately rather than shutting it down, stopping any further access while the
machine stays live. Before any rebuild or cleanup happens, a forensic specialist captures a full memory
dump and a disk image, hashes both, and logs exactly who handled them and when. Eradication and
recovery happen only after that capture is complete. Months later, when outside counsel and a regulator
both ask for proof of exactly what the attacker could and couldn't reach, the evidence still exists,
with a documented chain of custody — instead of having been wiped the day the server was rebuilt.

## Key terms

| Term | Meaning |
|---|---|
| Forensic imaging | Capturing a verified, unaltered copy of a disk or memory for later analysis |
| Memory dump | A captured snapshot of a system's volatile RAM, taken before power-off or rebuild destroys it |
| Chain of custody | Documentation of who handled evidence, when, and how, so its integrity can be verified later |
| Order of operations | Isolate (not shut down) first, acquire evidence second, eradicate/rebuild only after that |

## Check yourself

A team is under pressure to rebuild a compromised server as fast as possible. Why should they isolate
and image it before eradicating, rather than wiping and rebuilding immediately — and what specifically
would they lose if they skipped straight to the rebuild?
