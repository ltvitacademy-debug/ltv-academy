# Lesson 13 — The CIA Triad: Confidentiality, Integrity, Availability

**Chapter 4 · Cybersecurity Foundations: Core Concepts · Lesson 13 of 32**

## What you'll learn

- The three goals every security control ultimately serves: Confidentiality, Integrity, and Availability
- A real, concrete example of each one being violated
- Why most security tools and policies map back to protecting one or more of the three
- How to use the triad as a quick lens for evaluating any security decision

## The three pillars of security

Every security control that exists — a firewall rule, an encryption algorithm, a backup
job, an access policy — ultimately serves one or more of three goals, known together as the
**CIA triad**:

**Confidentiality** means only authorized people can see the data. A file full of customer
Social Security numbers has a confidentiality requirement: the payroll team can see it, a
random employee in marketing cannot.

**Integrity** means the data is accurate and hasn't been tampered with, whether by an
attacker, a bug, or an honest mistake. A bank balance has an integrity requirement: the
number on screen has to be the real number, not something silently altered in transit.

**Availability** means authorized people can actually get to the data and systems when they
need them. A hospital's patient records system has an availability requirement: a doctor in
an emergency can't wait three hours for the server to come back up.

## When each one fails

These aren't abstract. Each has a real-world failure mode security teams deal with
constantly.

A **confidentiality** violation is a data breach: in 2017, Equifax exposed roughly 147
million people's names, Social Security numbers, and birth dates because an unpatched web
application vulnerability let attackers pull data straight out of the database. Nothing was
changed or taken offline — the problem was that unauthorized parties could read it at all.

An **integrity** violation is unauthorized modification: an attacker who gains access to a
company's accounting system and quietly edits a vendor's bank routing number so future
payments route to their own account has not stolen anything yet and hasn't taken the system
down — they've corrupted the data's trustworthiness, which is just as damaging.

An **availability** violation is a denial-of-service: a distributed denial-of-service
(DDoS) attack that floods a company's website with junk traffic until legitimate customers
can't load the page isn't reading or changing any data — it's simply denying access to
people who are supposed to have it.

## Controls map back to the triad

Security controls exist to protect one or more legs of the triad, and naming which leg a
control protects is a useful habit. **Encryption** (at rest and in transit) protects
confidentiality — even if someone intercepts the data, they can't read it. **Hashing and
digital signatures** protect integrity — they let you detect if even a single bit of a file
or message was altered. **Redundancy, backups, and DDoS mitigation services** protect
availability — if one server dies or gets flooded, another takes over. Some controls, like
strong access control and multi-factor authentication, protect more than one leg at once:
they stop an unauthorized party from reading data (confidentiality) *and* from changing it
(integrity).

## Key terms

| Term | Meaning |
|---|---|
| CIA triad | Confidentiality, Integrity, and Availability — the three goals security controls ultimately serve |
| Confidentiality | Only authorized people can access or view the data |
| Integrity | Data is accurate and has not been tampered with |
| Availability | Authorized people can access systems and data when they need to |

## Check yourself

A company's website stays fully online and no data is stolen, but an attacker manages to
quietly change the prices listed on the product pages. Which leg of the CIA triad was
violated, and why is it not a confidentiality or availability problem?
