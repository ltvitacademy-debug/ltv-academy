# Lesson 15 — Lateral Movement, and the Controls That Actually Stop It

**Chapter 4 · Assume Breach: Designing for Containment · Lesson 3 of 4**

## What you'll learn

- The real techniques attackers use to move from one compromised
  foothold to other systems: pass-the-hash, token theft, and abusing
  shared admin credentials
- Why each technique works specifically because of a design choice
  that was already in place, not because of a novel exploit
- The controls that counter each technique directly — credential
  tiering, privileged access workstations, and network
  micro-segmentation — and why the match between attack and control
  matters
- Why "we have a firewall" and "we require MFA" don't, by themselves,
  stop any of these techniques

## Why lateral movement is the attack that matters most here

Initial compromise — a phished credential, a vulnerable public-facing
service — is almost never the attacker's actual goal. It's a foothold.
What turns a single phished laptop into a full enterprise breach is
**lateral movement**: using what was gained at the foothold to reach
further, higher-value systems. This is the exact mechanism Lesson 13
pointed at when it asked "how far can they get" — and it's worth
learning the real techniques behind it, because generic advice like
"segment your network" is far more convincing once you can see exactly
what it's segmenting against.

## Pass-the-hash

When a user authenticates to a Windows system, a hash of their
credential is cached in memory rather than the plaintext password.
**Pass-the-hash** is the technique of extracting that cached hash from
a compromised machine — often from the LSASS process memory — and
reusing it directly to authenticate to *other* machines, without ever
needing to know the actual password. It works because many
authentication protocols accept the hash itself as proof of identity,
and because that hash is often valid against many machines at once:
if the same local administrator account and password exist on every
workstation, one dumped hash authenticates to all of them.

**What stops it:** unique per-machine local administrator passwords
(so a hash dumped from one machine is worthless everywhere else),
Windows Credential Guard (which isolates credential material from the
process memory that tools like Mimikatz read), and tiered
administration that keeps high-privilege credentials off the
workstations where routine browsing and email happen in the first
place.

## Token and session theft

Once a user has already authenticated — to Azure AD, to a web
application, to a Kerberos-protected resource — the system often
issues a **token or ticket** that represents "this session has already
proven who it is," so the user isn't re-prompted for every request.
**Token theft** is stealing that already-issued token from a
compromised device and replaying it elsewhere, which sidesteps MFA
entirely: MFA happened once, at login, and the token is proof that it
happened, not a fresh check. A Kerberos variant of the same idea is
called pass-the-ticket.

**What stops it:** continuous access evaluation, covered in Lesson 6
— tokens that get revoked the moment a signal changes, rather than
staying valid for their full lifetime regardless of what the device
does next — plus shorter token lifetimes and binding tokens to the
specific device that requested them, so a stolen token doesn't work
from a different machine.

## Shared and overprivileged admin credentials

The most mundane technique is often the most effective: many
organizations still use **the same local administrator account and
password across large numbers of machines**, or grant a single
service account far more access than any one of its tasks requires. An
attacker who compromises one machine, or one service account's stored
secret, inherits every system that credential also happens to control
— which, per Lesson 14, is exactly how a blast-radius estimate gets
discovered to be far larger than anyone intended.

**What stops it:** credential tiering — a model (Microsoft's
Tier 0/1/2 is the common reference point) that strictly separates
domain-level admin credentials, server admin credentials, and
workstation admin credentials so that compromising one tier never
grants access to a higher one — enforced through **Privileged Access
Workstations (PAWs)**: dedicated, locked-down machines that are the
*only* place privileged credentials are ever used, kept completely
separate from the laptops people check email and browse the web on.

## The controls work together, not alone

None of these controls is sufficient on its own, and that's the point
worth taking into the rest of this course: unique local admin
passwords close the pass-the-hash path but don't touch token theft.
PAWs and credential tiering close the privileged-credential path but
don't stop an attacker from moving between two ordinary workstations on
a flat network — that's what the micro-segmentation from Chapter 3
closes. The real defense against lateral movement is always a specific
control matched to a specific technique, layered with the others, not
a single tool marketed as "lateral movement protection."

## Key terms

| Term | Meaning |
|---|---|
| Lateral movement | Using access gained at an initial foothold to reach further systems, turning a single compromise into a wider breach |
| Pass-the-hash | Extracting a cached credential hash from a compromised machine and reusing it to authenticate elsewhere, without knowing the plaintext password |
| Token/ticket theft | Stealing an already-issued proof-of-authentication token or Kerberos ticket and replaying it from another device, sidestepping MFA |
| Credential tiering | A model (e.g., Tier 0/1/2) that strictly separates admin credentials by privilege level so a lower-tier compromise can't reach a higher tier |
| Privileged Access Workstation (PAW) | A dedicated, locked-down machine used only for privileged administrative tasks, kept separate from everyday-use devices |

## Check yourself

You're ready for Lesson 16 when you can explain, without looking: pick
any one of pass-the-hash, token theft, or shared admin credentials, and
name the specific control that stops it and why that control works
against that specific technique.
