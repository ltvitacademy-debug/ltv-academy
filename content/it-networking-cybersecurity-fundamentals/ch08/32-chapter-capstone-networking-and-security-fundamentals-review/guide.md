# Lesson 32 — Chapter Capstone: Networking & Security Fundamentals Review

**Chapter 8 · Putting It Together: Lab & Capstone · Lesson 32 of 32**

## What you'll learn

- How one realistic SOC shift touches networking fundamentals, core security concepts, attack
  recognition, and policy all in the space of a few minutes
- How to walk a real alert from first notice to closed ticket, the way this entire course has
  been building toward
- A chapter-by-chapter recap of everything this course covered, tied together in one place
- What comes next in this career path, now that this course is complete

## One shift, start to finish

It's 7:42 AM. You're the overnight SOC analyst at a mid-sized company, and your SIEM fires an
alert: a workstation on the internal network is making repeated outbound connections to an
external IP address on port 4444, roughly once every sixty seconds. Nothing about this alert
explains itself — it's up to you to work it, and every chapter of this course just became the tool
you work it with.

**Networking fundamentals first (Chapters 1-3).** Before anything else, you confirm what you're
actually looking at. The source is an internal IP in the company's subnet; the destination is a
public IP you don't recognize; the port, 4444, isn't one of the common, well-known ports this
course's protocols lesson covered, which is itself a small flag. A quick look in Wireshark shows
the connection completing a normal three-way handshake each time, then sending a small amount of
data at a steady interval — that regular, unfamiliar beaconing pattern Lesson 30 and Lesson 31 both
described.

**Core security concepts next (Chapters 4-5).** You frame what's at stake using the CIA triad: if
this is a live compromise, confidentiality is the immediate concern — whatever that workstation
can reach, this connection can potentially leak. You weigh risk the way Chapter 4 taught you: the
likelihood is high (the pattern matches known C2 behavior) and the impact depends on what that
account can access, which you check next using the authorization model your company runs — is
this a standard user with limited rights, or someone with broader access who'd make this far
worse?

**Attack recognition (Chapter 6).** The pattern itself — a quiet backdoor beaconing to an external
address on a non-standard port — matches the malware and command-and-control behavior from
Chapter 6, not a network attack and not a web application attack. That classification tells you
this almost certainly started earlier, upstream of this alert, likely with something like the
phishing delivery and exploitation stages this chapter's case study walked through.

**Policy and defense (Chapter 7).** You isolate the workstation from the network — a standard
response your company's incident-response policy requires for anything matching this profile —
and you document every step as you go, because Chapter 7's compliance frameworks (like NIST and
ISO 27001) require a clear record of what was found, when, and what was done about it, whether or
not this ultimately turns out to be a real breach. That documentation is also what defense-in-depth
is built on: this alert firing at all means some earlier layer worked, even if an even earlier one
didn't.

## The course, chapter by chapter

- **Chapters 1-3 — Networking fundamentals.** The OSI and TCP/IP models, IP addressing, routing,
  TCP vs. UDP, and the common ports and protocols every analyst has to recognize on sight.
- **Chapters 4-5 — Core security concepts.** The CIA triad, threat actors, vulnerability vs.
  threat vs. risk, the kill chain and MITRE ATT&CK, authentication and authorization, and
  encryption, hashing, and PKI.
- **Chapter 6 — Attack recognition.** Malware types, social engineering, network attacks, and web
  application attacks — what each one actually looks like.
- **Chapter 7 — Policy and defense.** Defense in depth, security policy, compliance frameworks, and
  physical security — the structures that make individual controls add up to real protection.
- **Chapter 8 — Putting it together.** A home lab you control, Wireshark to read real traffic, a
  full kill-chain case study, and this shift, which is what all seven chapters were for.

## Check yourself

In the 7:42 AM scenario above, which single detail — the destination port, the beaconing interval,
or the handshake completing normally — gave you the strongest early signal that this wasn't
ordinary traffic, and why?

## Course complete

That's the full course. You've gone from "what is a network" to recognizing a live incident and
knowing exactly which concept from which chapter to reach for. Next up in this path: **Windows,
Linux & Security Administration** — the operating systems you'll actually be defending.
