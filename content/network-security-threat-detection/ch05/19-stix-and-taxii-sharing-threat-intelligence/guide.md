# Lesson 19 — STIX and TAXII: Sharing Threat Intelligence

**Chapter 5 · Threat Intelligence & Indicators of Compromise · Lesson 19 of 32**

## What you'll learn

- What STIX actually is: a standardized format for describing threat intelligence
- What TAXII actually is: the transport protocol used to move that data between organizations
- Why the two are almost always discussed as a pair, not separately
- How this pairing lets two organizations automatically exchange IOCs about the same active attack

## STIX: the format, not just a list of IOCs

Lesson 18 covered feeds as a stream of IOCs; what it didn't cover is *how* those IOCs get
described in a form that different organizations' tools can all parse the same way. That's
**STIX** — **Structured Threat Information eXpression** — a standardized, JSON-based language
maintained by OASIS for describing threat intelligence in detail. STIX doesn't just hold a bare IP
address; it can describe an entire threat actor, a campaign, the specific indicators tied to it,
and the relationships between all of them — "this IP was used by this threat actor, in this
campaign, to deliver this malware." That structure is what lets one organization's data mean the
same thing when it lands in a completely different organization's tools, instead of requiring a
human to manually re-interpret a plain-text report.

## TAXII: the transport, not the content

**STIX describes what** is being shared; **TAXII — Trusted Automated eXchange of Indicator
Information — defines how** it physically moves from one organization to another. TAXII is an
HTTPS-based API specification: a **TAXII server** hosts one or more **collections** (bundles of
STIX data on a given topic), and a **TAXII client** at another organization connects to that
server to pull new STIX content, or subscribes to a channel to receive it as it's published. The
separation matters because it means the data format (STIX) and the delivery mechanism (TAXII) can
each improve independently — an organization can swap how it transports data without having to
redefine what the data actually means.

## Why they're always discussed together

In practice, almost no one uses STIX without TAXII or vice versa — they were designed as a pair
specifically to solve the sharing half of threat intelligence, and the pairing is now the real
industry standard for automated, machine-to-machine threat-intel exchange. CISA's Automated
Indicator Sharing (AIS) program, used across government and private-sector participants, and
tools like MISP (an open-source threat-intel sharing platform widely used by ISACs), both support
STIX and TAXII specifically because the pairing lets a human write up one incident once and have
it reach every subscribed partner's tooling automatically, in a format their systems already know
how to ingest.

## A concrete exchange between two organizations

Picture two financial-sector companies, both members of the same ISAC, who are hit by variants of
the same attack campaign within days of each other. Company A's analyst packages what they found
— the malicious IPs, the file hashes, the phishing subject line — into a STIX bundle describing
the campaign and publishes it to the ISAC's TAXII server. Company B's TIP, already subscribed to
that TAXII collection, pulls the new STIX bundle automatically within minutes, and Company B's
firewall is updated with the new IOCs before their own analysts have even finished their own
investigation. That's the entire point of the pairing: turning one organization's discovery into
every subscriber's defense, automatically.

## Key terms

| Term | Meaning |
|---|---|
| STIX | Structured Threat Information eXpression — a standardized format for describing threat intel |
| TAXII | Trusted Automated eXchange of Indicator Information — the transport protocol for sharing STIX data |
| TAXII collection | A bundle of STIX data on a given topic, hosted on a TAXII server |
| STIX bundle | A package of STIX objects — indicators, threat actors, campaigns, and their relationships |

## Check yourself

Why does it matter that STIX and TAXII are two separate standards — one for the data format, one
for the transport — rather than a single combined standard?
