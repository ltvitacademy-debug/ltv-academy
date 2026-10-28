# Lesson 18 — Threat Intelligence Feeds and How SOCs Use Them

**Chapter 5 · Threat Intelligence & Indicators of Compromise · Lesson 18 of 32**

## What you'll learn

- What a threat intelligence feed actually is, and where the IOCs inside it come from
- The three common sources: commercial vendors, ISACs, and open-source projects
- How a Threat Intelligence Platform (TIP) turns a feed into automatic firewall blocks
- How feed context enriches a SIEM alert so an analyst isn't starting from zero

## A feed is just a continuously updated list of known-bad IOCs

A **threat intelligence feed** is exactly what it sounds like: a continuously updated stream of
IOCs — malicious IPs, domains, file hashes — that someone else has already confirmed are bad,
packaged so a SOC can consume it automatically instead of discovering each one the hard way, one
incident at a time. Lesson 17 covered what an individual IOC looks like; a feed is thousands of
those, refreshed constantly, from sources that specialize in finding them faster than any single
organization could on its own. The value isn't the list itself — it's that the list updates
before an attacker's infrastructure even reaches your organization.

## Where feeds actually come from

Feeds come from three common sources. **Commercial vendors** (security companies that run their
own research teams and honeypots) sell curated, high-confidence feeds as part of a broader
security product. **ISACs** (Information Sharing and Analysis Centers) are sector-specific
non-profits — the financial sector's ISAC, the healthcare sector's ISAC, and others — where member
organizations in the same industry pool what they're seeing, on the theory that an attacker
targeting one bank is often about to target the next one. And **open-source projects**, run by
the security research community, publish IOCs for free, often as the fastest way for a newly
discovered campaign's indicators to reach the public. A mature SOC typically blends feeds from all
three, because each source tends to catch different things first.

## Turning a feed into an automatic firewall block

A feed by itself is just data; the useful part is what happens next. A **Threat Intelligence
Platform (TIP)** is the piece of SOC tooling that ingests multiple feeds, deduplicates and scores
them, and pushes the resulting blocklist out to enforcement points automatically — most commonly
the firewall. Concretely: a feed reports that a specific IP address is actively serving as
command-and-control infrastructure for a malware family; within minutes, the TIP pushes that IP to
the firewall's blocklist, and any attempt from any device on the network to reach it is blocked
before a human ever looks at it. That automatic loop — feed in, block out — is what lets a SOC
defend against infrastructure it has never personally seen targeting it.

## Enriching a SIEM alert with feed context

The second major use is **enrichment**. When a SIEM (Security Information and Event Management
system) raises an alert — say, an internal workstation just connected to an external IP — that
alert is far more useful if it already carries feed context: "this IP has been reported in 40
other organizations' incidents over the past month as Cobalt Strike command-and-control." An
analyst staring at a bare IP address has to go research it from scratch; an analyst staring at that
same IP already annotated by feed data can skip straight to containment. Enrichment is why
threat intelligence feeds matter even for the alerts a SOC generates entirely on its own.

## Key terms

| Term | Meaning |
|---|---|
| Threat intelligence feed | A continuously updated stream of confirmed-bad IOCs from an external source |
| ISAC | Information Sharing and Analysis Center — a sector-specific group where members share threat data |
| Threat Intelligence Platform (TIP) | Tooling that ingests feeds and pushes resulting blocklists to enforcement points |
| Enrichment | Adding feed context to a SIEM alert so an analyst doesn't start from zero |

## Check yourself

A TIP automatically pushes a newly reported malicious IP to the firewall's blocklist within
minutes of the feed updating. Why does that automatic loop matter more than if the SOC simply
reviewed the feed manually once a day?
