# Lesson 8 — Turning Recon into an Attack Surface Map

**Chapter 2 · Reconnaissance and OSINT · Lesson 4 of 4**

## What you'll learn

- Why raw reconnaissance output is worthless until it's organized into
  one structured artifact
- What actually belongs in a real attack surface map — the specific
  fields that matter, not just a pile of IPs
- How to tag each finding by source and confidence, the way a
  professional report expects
- How the attack surface map hands off directly into Chapter 3's
  scanning and enumeration work

## Why raw findings aren't enough

By the end of Lesson 7, a real engagement has accumulated a WHOIS
record, a list of subdomains from crt.sh, a theHarvester export full of
emails and names, a Shodan result set, Nmap output for every host in
scope, and a handful of banner-grab results. That's a lot of
intelligence and almost no usable structure — nobody can look at six
separate tool outputs and immediately answer "what's our actual attack
surface?" The attack surface map is the single artifact that answers
that question, and building it carefully is what separates a
disciplined methodology (the PTES-style process from Lesson 3) from a
pile of scattered notes.

## What actually belongs in the map

A real attack surface map organizes every finding under consistent
fields, typically one row per discovered asset:

```
Asset          Type          Source         Open Ports/Services   Notes
vpn.target.com subdomain     crt.sh         443 (TLS)             SSL VPN portal, vendor unclear
10.20.30.15    host          nmap -sS -p-   22 (OpenSSH_8.9)       banner confirmed, outdated version
staging.target.com subdomain theHarvester   80, 443                no auth prompt seen; check further
S3 bucket      cloud storage Google dork    n/a                    world-readable, contains backups
```

Notice the pattern: every asset carries what it is, where the finding
came from, what's actually open or exposed, and a note capturing
anything that needs follow-up. That source column matters more than it
looks — it's what lets you (or a teammate) trace a finding back to how
it was discovered, which is exactly what a professional penetration
test report has to show for every claim it makes.

## Tagging by confidence and risk

Not every finding carries the same weight. A subdomain confirmed by
both crt.sh and a live Nmap scan is high-confidence; a job posting that
merely implies a technology is a lead, not a fact, until something else
corroborates it. Tag entries accordingly — confirmed / probable /
unconfirmed is a simple, effective scheme — so the team prioritizing
next steps isn't treating a guess with the same weight as a verified
open port. The same goes for risk: a world-readable storage bucket
holding backups is a different priority than an open port running a
fully patched, well-known service.

## From map to next steps

The attack surface map isn't the end product of an engagement — it's
the handoff document into everything that follows. Chapter 3's scanning
and enumeration work starts from exactly this map: every host and port
you've already identified becomes the input list for deeper service and
version enumeration, rather than re-discovering the same hosts from
scratch. A structured map also makes scope compliance checkable at a
glance — if an asset shows up that was never in the signed Rules of
Engagement, that's a conversation with the client before anything else
touches it, not a line item to quietly include.

## Key terms

| Term | Meaning |
|---|---|
| Attack surface map | A structured, consolidated record of every discovered asset, its source, and its exposed ports/services |
| Confidence tagging | Marking each finding confirmed, probable, or unconfirmed based on how many independent sources support it |
| Source traceability | Recording exactly which tool or technique produced each finding, required for a defensible professional report |
| Handoff artifact | A deliverable (like the attack surface map) that one methodology phase produces specifically for the next phase to consume |

## Check yourself

You're ready for Chapter 3 when you can explain, without looking: what
specific fields does a real attack surface map need beyond a bare list
of IP addresses, and why does source traceability matter for the final
report?
