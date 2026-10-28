# Lesson 20 — Defender for Identity and Detecting On-Prem AD Attacks

**Chapter 5 · Microsoft Defender XDR · Lesson 20 of 32**

## What you'll learn

- Why Defender for Identity exists as a separate workload instead of being folded into Defender for Endpoint
- How it watches on-prem Active Directory domain controllers directly, rather than from the cloud
- What Pass-the-Hash, Golden Ticket, and DCSync actually are, and why each is a real detection it raises
- How this closes this chapter's last real blind spot in Defender XDR's coverage

## The gap the other three workloads can't cover

Defender for Endpoint watches devices. Defender for Office 365 watches email and collaboration
tools. Defender for Cloud Apps watches SaaS usage. All three are, in one way or another,
cloud-facing. None of them is positioned to watch the one system almost every enterprise
network still depends on for authentication: an on-prem **Active Directory domain controller**.
**Defender for Identity (MDI)** exists specifically to close that gap. It deploys a sensor
directly on domain controllers (and AD FS servers), analyzing authentication traffic, network
traffic, and Windows event logs from the one vantage point that can actually see what's
happening to on-prem identity.

## Pass-the-Hash: moving laterally without the password

Windows doesn't need a plaintext password to authenticate a session — it can use the password's
NTLM hash directly. **Pass-the-Hash** abuses that: an attacker who has already compromised one
machine extracts a cached NTLM hash and uses it to authenticate to another machine, without ever
knowing or needing the actual password. Defender for Identity's sensor on the domain controller
sees the resulting authentication pattern and flags it — exactly the kind of lateral-movement
step that would otherwise look like a normal login to anything not specifically watching for it.

## Golden Ticket: forging trust itself

Kerberos authentication in Active Directory relies on a special account called **KRBTGT** to
sign ticket-granting tickets (TGTs). If an attacker manages to steal the KRBTGT account's
password hash, they can forge their own TGTs offline — a **Golden Ticket** — that appear valid
for accounts of their choosing, with lifetimes and privileges they set themselves, bypassing
normal authentication entirely. Defender for Identity watches for the anomalies a forged ticket
tends to produce, such as unusual ticket lifetimes or requests for accounts that don't actually
exist in the directory.

## DCSync: impersonating a domain controller

Active Directory domain controllers normally replicate data — including password hashes —
between each other using a defined replication protocol. **DCSync** abuses that same protocol:
an attacker with sufficient replication rights (often obtained through an earlier compromise)
impersonates a domain controller and requests a replication of password hashes for any account
in the domain, including highly privileged ones, without ever touching a DC's disk directly.
An ordinary workstation never legitimately issues that kind of replication request, which is
exactly the anomaly Defender for Identity is positioned to catch.

## Closing the chapter's real gap

Put Pass-the-Hash, Golden Ticket, and DCSync next to each other and the pattern is clear: all
three are attacks against identity infrastructure that lives on-premises, not in the cloud.
Defender for Endpoint, Office 365, and Cloud Apps were never going to see any of them, because
none of those products has a sensor anywhere near a domain controller. That's this chapter's
real takeaway: Defender XDR's four workloads aren't redundant coverage of the same ground —
each one watches a different piece of the environment, and Defender for Identity is the piece
that watches the on-prem identity layer the others simply can't reach.

## Key terms

| Term | Meaning |
|---|---|
| Defender for Identity (MDI) | The Defender XDR workload that deploys a sensor on on-prem AD domain controllers (and AD FS) |
| Pass-the-Hash | Authenticating with a stolen NTLM hash instead of a plaintext password |
| Golden Ticket | A forged Kerberos TGT created using a stolen KRBTGT account hash, bypassing normal authentication |
| DCSync | Impersonating a domain controller to request replication of password hashes via AD's replication protocol |

## Check yourself

Explain why Defender for Endpoint, which already watches the device an attacker compromised
first, still wouldn't see a Pass-the-Hash, Golden Ticket, or DCSync attack happening against the
domain controller — and why that's exactly the gap Defender for Identity exists to close.
