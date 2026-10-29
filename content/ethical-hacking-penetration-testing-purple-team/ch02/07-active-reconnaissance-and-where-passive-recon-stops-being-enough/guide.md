# Lesson 7 — Active Reconnaissance, and Where Passive Recon Stops Being Enough

**Chapter 2 · Reconnaissance and OSINT · Lesson 3 of 4**

## What you'll learn

- The exact moment passive reconnaissance ends and active reconnaissance
  begins — and why that line matters legally, not just technically
- What a basic connectivity sweep and an initial port scan actually do,
  using real Nmap syntax
- How banner grabbing confirms exactly what's running behind an open
  port
- Why active recon is detectable, and what that means for scope,
  timing windows, and rate limiting in a real authorized engagement

## Where the line actually sits

Every technique in Lessons 5 and 6 shared one property: the target never
received a single packet from you. Active reconnaissance is defined by
the opposite — the first moment you send traffic directly to
infrastructure the target owns. A ping sweep, a port scan, even a
single `curl` against the target's own web server all cross that line.
This isn't a technicality. It's the point where your authorized Rules
of Engagement document stops being a formality and starts being the
only thing standing between you and something that looks, from the
target's firewall logs, exactly like an attack. Before running anything
in this lesson against a real system, confirm the signed scope
explicitly covers that IP range or hostname, and confirm you're inside
the agreed testing window.

## Connectivity: confirming hosts are actually alive

Before scanning ports, a real engagement typically confirms which hosts
in an authorized range are actually up:

```
nmap -sn 10.20.30.0/24
```

The `-sn` flag runs a ping-style sweep without touching any ports at
all — the lightest possible active technique, useful for narrowing a
large authorized range down to the hosts actually worth scanning
further. Note that even this counts as active: ICMP (or the TCP/ARP
probes Nmap substitutes when ICMP is blocked) still reaches the target.

## Port scanning: what's actually open

The core active recon technique is a port scan, which asks a target
host which TCP or UDP ports are listening:

```
nmap -sS -p- 10.20.30.15
```

`-sS` runs a TCP SYN scan — Nmap's default and stealthiest common
option, sending a SYN and reading the response without completing the
full TCP handshake. `-p-` scans the complete 1–65535 port range rather
than just the common-ports default, which matters because a real
engagement shouldn't assume unusual services only run on well-known
ports. The output gives you a list of open, closed, and filtered
ports — the raw material for everything scanning and enumeration cover
in the next chapter.

## Banner grabbing: confirming what's actually listening

An open port tells you a service exists; it doesn't tell you which one,
or which version. Banner grabbing closes that gap by connecting directly
and reading what the service volunteers:

```
nc 10.20.30.15 22
```

Many services — SSH, FTP, SMTP, plenty of web servers — announce their
software and version the moment a connection opens. `OpenSSH_8.9` back
from port 22 is a specific, versioned fact you can check against known
vulnerabilities later. This is a deliberately small, surgical probe:
one connection, read the banner, disconnect — not yet an attempt to
exploit anything.

## Why this is where scope discipline gets strict

Active recon is loud by comparison to everything passive: it shows up
in firewall logs, IDS/IPS alerts, and SOC dashboards, and an aggressive
scan against the wrong range can trip alarms, degrade a production
service, or simply scan a host that was never in scope. Real
engagements manage that risk with explicit IP/CIDR allow-lists, defined
testing windows, and rate-limited scan timing (Nmap's `--scan-delay` or
a slower `-T2` timing template) rather than firing an unthrottled scan
at everything reachable. None of that caution applied to the passive
techniques in Lessons 5 and 6 — it starts here.

## Key terms

| Term | Meaning |
|---|---|
| Active reconnaissance | Any technique where traffic is sent directly to infrastructure the target owns or controls |
| Ping sweep | A lightweight active scan (`nmap -sn`) that identifies which hosts in a range are up, without touching any ports |
| Port scan | A probe (e.g. `nmap -sS`) that determines which TCP/UDP ports on a host are open, closed, or filtered |
| Banner grabbing | Connecting directly to an open port to read the version/software string a service volunteers on connect |

## Check yourself

You're ready for Lesson 8 when you can explain, without looking: what
specific property makes a technique "active" rather than "passive,"
and name two scope-discipline controls a real engagement uses to keep
active recon from going wrong.
