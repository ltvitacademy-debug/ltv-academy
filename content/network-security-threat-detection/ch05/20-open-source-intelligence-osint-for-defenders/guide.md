# Lesson 20 — Open-Source Intelligence (OSINT) for Defenders

**Chapter 5 · Threat Intelligence & Indicators of Compromise · Lesson 20 of 32**

## What you'll learn

- What OSINT actually is: using publicly available information, nothing exotic or illegal
- The specific defensive tools: WHOIS records, Shodan, breach databases, and social media
- Why these are the exact same tools an attacker uses during Reconnaissance — just pointed inward
- A concrete example of OSINT catching an exposed system before an attacker finds it

## OSINT: information that's already public

**Open-Source Intelligence (OSINT)** means gathering information from sources that are already
publicly available — nothing hacked, nothing stolen, nothing that requires special access. That
sounds almost too simple to matter, but it's exactly how both attackers and defenders build a
picture of an organization's footprint, because so much of what matters is sitting in plain
sight: domain registration records, internet-wide device scans, previously leaked credentials, and
what employees post publicly. The skill isn't finding secret information — it's knowing where to
look and what the public pieces add up to.

## The defender's OSINT toolkit

Four tools cover most of what a defender actually uses. **WHOIS records** show who registered a
domain, when, and through what registrar — useful for verifying your own domain portfolio hasn't
grown an unauthorized entry, or for researching a suspicious domain's registration history.
**Shodan** is a search engine that continuously scans the public internet and indexes what it
finds — open ports, exposed services, device banners — so a defender can search their own public
IP ranges the way an attacker would, and see exactly what's visible from outside. **Breach
databases**, such as Have I Been Pwned, let a defender check whether an employee's work email and
password have appeared in a previously leaked credential dump, which is a direct signal that
account needs a forced password reset. And **social media** review shows what employees are
publicly posting — job titles, internal tool names, travel dates — information a social engineer
could use to craft a convincing pretext.

## The same tools, pointed in the opposite direction

Here's the part worth sitting with: every one of those four tools is also exactly what an attacker
uses during the **Reconnaissance** stage of the Cyber Kill Chain — researching employee names,
technologies, and exposed services before building a weapon to deliver. The tools themselves are
neutral; what differs is only who's looking and why. A defender running the same WHOIS lookup,
the same Shodan search, the same breach-database check against their own organization gets to see
exactly what an attacker would see — and gets to fix it first, instead of finding out about it
during an incident.

## A concrete example: finding the forgotten VPN appliance

Picture a defender running a routine Shodan search against their organization's own public IP
range, as part of a quarterly attack-surface review. The search turns up an old VPN appliance,
long forgotten by IT, still reachable from the open internet and still running firmware with a
publicly known vulnerability nobody ever patched because nobody remembered it existed. Because the
defender found it through the exact same OSINT method an attacker would have used, they can
decommission or patch it quietly, on their own schedule — instead of learning about it the hard
way, after someone else finds it first.

## Key terms

| Term | Meaning |
|---|---|
| OSINT | Open-Source Intelligence — gathering information from already-public sources |
| WHOIS | A public record showing who registered a domain, when, and through what registrar |
| Shodan | A search engine that indexes internet-connected devices and exposed services |
| Breach database | A searchable record of previously leaked credentials, such as Have I Been Pwned |
| Attack surface | Everything about an organization that's visible or reachable from outside it |

## Check yourself

A defender and an attacker both run a Shodan search against the same company's public IP range,
using the exact same tool. What determines whether that search helps the defense or helps the
attack?
