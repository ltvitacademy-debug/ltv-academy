# Lesson 6 — OSINT Techniques for a Real Engagement

**Chapter 2 · Reconnaissance and OSINT · Lesson 2 of 4**

## What you'll learn

- How Shodan turns already-collected internet-wide scan data into a
  passive reconnaissance goldmine
- How to run theHarvester to automate email, subdomain, and employee-name
  discovery across dozens of public sources in one command
- How to use Google dorking as a disciplined search methodology, not
  just a party trick
- Why social media footprinting has to stay inside the engagement's
  written scope, even though the data is public

## Shodan: someone else already scanned the internet

Shodan is a search engine that continuously scans the public internet
and indexes what it finds — banners, open ports, exposed login panels,
SCADA systems, webcams, and far more — then lets anyone search that
index by organization name, IP range, or ASN. The reason this still
counts as passive from your side: Shodan did the scanning, not you.
You're querying a third party's pre-existing database, the same way
you'd query crt.sh. A search like:

```
org:"Target Company" port:22,3389
```

can reveal every SSH and RDP service Shodan has already observed
exposed to the internet for that organization — a serious attack
surface finding gathered without a single probe of your own leaving
your machine.

## theHarvester: automating OSINT collection

theHarvester is a purpose-built OSINT aggregation tool that queries
dozens of public sources — search engines, PGP key servers, Certificate
Transparency logs, Shodan, and more — in a single pass, then
deduplicates the results into emails, subdomains, and employee names:

```
theHarvester -d target-company.com -b all
```

The `-b all` flag tells it to hit every supported source. What used to
be twenty manual lookups across twenty sites becomes one command, and
the output feeds directly into the attack surface map you'll build in
Lesson 8 — a list of real email addresses (useful for understanding
naming conventions like `first.last@target-company.com`) and subdomains
you hadn't found yet.

## Google dorking as a methodology, not a trick

Google dorking means using advanced search operators deliberately,
as a checklist, rather than typing a lucky phrase. The operators that
matter most in a real engagement:

```
site:target-company.com filetype:pdf
site:target-company.com inurl:admin
intitle:"index of" site:target-company.com
```

`site:` scopes every query to the target's domain. `filetype:pdf`
hunts exposed documents — policies, org charts, old proposals — that
often carry metadata (author names, software versions) in their
properties. `inurl:admin` surfaces exposed administrative interfaces
Google happened to crawl. `intitle:"index of"` finds open directory
listings, which regularly expose files nobody meant to publish. Run
each of these as a standing checklist against every in-scope domain,
not as one-off guesses.

## Social media footprinting — and where the scope line sits

LinkedIn, in particular, is a legitimate and valuable OSINT source: it
reveals org structure, team sizes per department, job titles, and
sometimes technology mentions in employee profiles — all useful for
understanding who you might be testing against in a later social
engineering or phishing exercise. The critical discipline here is
scope. Your authorization almost always restricts social engineering
targets to a named list of employees or roles, not "anyone who works
there." Footprinting an employee's personal accounts, family members,
or personal social media beyond what the signed scope explicitly
covers is not OSINT anymore — it's a scope violation, even if the data
happens to be public. Document every source you used for every finding;
a professional report needs to show exactly where each piece of
intelligence came from.

## Key terms

| Term | Meaning |
|---|---|
| Shodan | A search engine indexing pre-existing internet-wide scan results — banners, open ports, exposed services — searchable by org, IP, or ASN |
| theHarvester | An OSINT aggregation tool that queries many public sources in one pass to collect emails, subdomains, and names |
| Google dorking | Deliberate use of advanced search operators (site:, filetype:, inurl:, intitle:) as a repeatable OSINT checklist |
| Social engineering target scope | The specific, written list of people or roles an engagement's authorization permits footprinting or targeting — never "anyone public" |

## Check yourself

You're ready for Lesson 7 when you can explain, without looking: why
does querying Shodan still count as passive reconnaissance, and what
specifically turns legitimate social media footprinting into a scope
violation?
