# Lesson 22 — Social Engineering: Phishing, Pretexting, and Baiting

**Chapter 6 · Common Attack Types & Social Engineering · Lesson 22 of 32**

## What you'll learn

- Why social engineering targets people, not technology, and why that makes it so hard to patch
- The difference between mass phishing and targeted spear phishing
- How pretexting and baiting work, and what makes each one convincing
- Why social engineering stays one of the most effective attack vectors regardless of how good the technical controls are

## Attacking the person, not the firewall

Every technique in this lesson shares one trait: none of them exploit a software flaw.
**Social engineering** is the psychological manipulation of a person into taking an
action or revealing information that compromises security — clicking a link, approving
a payment, handing over a password, propping open a locked door. A firewall, a patched
server, and strong encryption do nothing to stop an attack aimed at a person's trust,
curiosity, or fear. That's exactly why social engineering remains one of the most
effective ways into an organization: it routes around the technical controls entirely by
going after the one component that isn't running software — the human being.

## Phishing: mass, email-based, and a numbers game

**Phishing** is a fraudulent email (or message) sent to a large number of recipients,
impersonating a trusted sender — a bank, a shipping company, an internal IT
department — to trick the recipient into clicking a malicious link, downloading an
attachment, or entering credentials on a fake login page. It's a volume strategy: the
attacker doesn't need every recipient to fall for it, just a small percentage out of
thousands. That's why phishing remains, year after year, the single most common
initial-access technique in breach reports — it's cheap to send and only needs to work
once.

## Spear phishing: the same idea, aimed at one person

**Spear phishing** is phishing narrowed to a specific individual or small group, using
details researched about that target — their name, job title, manager, recent projects,
even writing style — to make the message far more convincing than a generic blast.
An email that references a real vendor invoice, addressed to the one person in accounts
payable who actually processes invoices, is spear phishing. The research investment is
higher, but so is the success rate, which is why spear phishing is the technique behind
most high-value business email compromise incidents.

## Pretexting: a fabricated scenario to extract information

**Pretexting** is building a fabricated scenario or false identity to manipulate a
target into divulging information or performing an action — an attacker calling the
help desk pretending to be a traveling executive who's locked out and needs an urgent
password reset, or posing as an auditor who needs "just a quick" look at a system. The
scenario itself does the work: it gives the target a plausible reason to break a rule
they'd normally follow, especially when the pretext includes urgency or a claim of
authority.

## Baiting: offering something enticing

**Baiting** dangles something a target wants, then delivers malware or a compromise the
moment they take it. The textbook example is leaving a USB drive labeled "Payroll
2024 — Confidential" in a parking lot or break room: curiosity leads someone to plug it
into a work computer, and the drive silently installs malware the instant it's inserted.
Baiting can also be digital — a fake "free movie download" or "exclusive offer" link —
but the mechanism is identical: offer something enticing, let curiosity or desire do the
rest.

## Why social engineering keeps winning

Technical controls get patched, updated, and hardened. Human trust, curiosity, urgency,
and the desire to be helpful don't patch the same way — they're part of normal, healthy
behavior that attackers deliberately exploit. That's why security awareness training,
verification procedures (like calling back a known number before acting on an "urgent"
request), and a culture where it's safe to question a suspicious request matter as much
as any firewall rule.

## Key terms

| Term | Meaning |
|---|---|
| Social engineering | Psychological manipulation of a person into an action or disclosure that compromises security |
| Phishing | Fraudulent, mass-distributed email impersonating a trusted sender to steal credentials or deliver malware |
| Spear phishing | Phishing targeted at a specific individual using researched, personalized details |
| Pretexting | A fabricated scenario or false identity used to manipulate a target into divulging information |
| Baiting | Offering something enticing (a labeled USB drive, a free download) to trigger a compromise |

## Check yourself

An attacker calls the IT help desk claiming to be a VP traveling overseas who urgently
needs their password reset over the phone, with no video call or ID check. Which social
engineering technique is this, and what two things about the scenario make it work?
