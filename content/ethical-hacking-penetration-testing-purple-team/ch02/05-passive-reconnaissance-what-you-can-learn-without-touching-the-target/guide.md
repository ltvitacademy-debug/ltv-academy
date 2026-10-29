# Lesson 5 — Passive Reconnaissance: What You Can Learn Without Touching the Target

**Chapter 2 · Reconnaissance and OSINT · Lesson 1 of 4**

## What you'll learn

- What makes reconnaissance **passive** — the one rule that defines the
  category, and why it matters for scope and authorization
- How to pull real intelligence from WHOIS records and DNS without ever
  querying the target's own infrastructure
- Why Certificate Transparency logs are one of the richest subdomain
  sources available, and how to query them for free
- How job postings and misconfigured public cloud storage buckets leak
  architecture and tech-stack details nobody meant to publish

## The one rule that defines "passive"

Every reconnaissance technique in a real engagement sorts into one of two
buckets, and the dividing line is simple: does a single packet leave your
machine and land on infrastructure the target owns or controls? If the
answer is no — if everything you're learning comes from a third party
that already holds the data — it's passive. WHOIS registrars, DNS
resolvers you don't control, certificate transparency mirrors, search
engines, and job boards all sit on the "safe" side of that line. This
matters because passive recon carries essentially zero risk of
detection or disruption, which is exactly why Rules of Engagement from
Lesson 1 almost always permit it even before a scope's active-testing
window officially opens.

## WHOIS: who registered this, and when

A WHOIS lookup against a domain's registrar returns registration dates,
registrant organization (when not redacted by GDPR/ICAAP privacy
protections, which most registrars now apply by default), the
designated nameservers, and sometimes an abuse contact. Run it with:

```
whois target-company.com
```

Even a privacy-redacted record tells you something: the registrar used,
the domain's age (a brand-new domain registered last month behind a
long-standing company name is itself a finding), and which nameservers
are authoritative — which is your entry point into DNS.

## DNS records: the public map of what exists

DNS is designed to be queried by the whole internet, so asking a public
resolver (not the target's own authoritative server, if you want to stay
strictly passive) for a domain's records is fair game:

```
dig target-company.com MX
dig target-company.com TXT
dig target-company.com NS
```

MX records name the mail provider (Microsoft 365? Google Workspace?
self-hosted?). TXT records often contain SPF strings that list every
IP range authorized to send mail — a free list of egress infrastructure.
NS records confirm who's authoritative, and sometimes reveal a
third-party DNS provider that's a separate vendor relationship worth
noting for the report.

## Certificate Transparency: the best subdomain source you're not using

Every public TLS certificate issued since roughly 2018 gets logged to a
public, append-only Certificate Transparency (CT) log — a requirement
browsers enforce on certificate authorities. That means every subdomain
anyone has ever requested a certificate for is sitting in a free,
searchable database. crt.sh is the standard web front-end:

```
https://crt.sh/?q=%.target-company.com
```

That single query often surfaces dozens of subdomains — `vpn.`,
`staging.`, `dev-api.`, `jenkins-internal.` — that would otherwise take
active brute-forcing to find. You learned them without sending a single
DNS query to the target's own name servers.

## Job postings and leaky cloud storage

Job listings are written by people who want qualified applicants to
apply, which means they describe the real environment in detail: "5+
years with Kubernetes on AWS EKS, Terraform, and Splunk" tells you the
cloud provider, the orchestration layer, the IaC tool, and the SIEM —
all before you've touched a single target system. Company engineering
blogs and conference talks leak the same kind of detail.

Misconfigured public cloud storage is a separate, high-value passive
find: S3 buckets, Azure Blob containers, and GCS buckets are sometimes
left world-readable. A targeted Google dork like
`site:s3.amazonaws.com "target-company"` or a purpose-built bucket
search engine can surface a bucket holding backups, source code, or
customer data — a critical finding recorded for the report, never
downloaded or exfiltrated beyond what the scope's evidence-handling
rules allow.

## Key terms

| Term | Meaning |
|---|---|
| Passive reconnaissance | Intelligence gathering where no packet is sent directly to target-owned or target-controlled infrastructure |
| WHOIS | A domain registration lookup returning registrant, registrar, dates, and nameserver data |
| Certificate Transparency (CT) log | A public, append-only log of every issued TLS certificate, searchable (e.g. via crt.sh) to enumerate subdomains |
| SPF record | A DNS TXT record listing IP ranges authorized to send mail for a domain — a free list of mail-sending infrastructure |

## Check yourself

You're ready for Lesson 6 when you can explain, without looking: why
does querying crt.sh for a target's certificates count as passive
reconnaissance, even though it reveals real subdomains that exist on
the target's own infrastructure?
