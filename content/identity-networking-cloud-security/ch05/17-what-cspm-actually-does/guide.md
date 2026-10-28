# Lesson 17 — What CSPM Actually Does

**Chapter 5 · Cloud Security Posture Management · Lesson 1 of 4**

## What you'll learn

- What CSPM (Cloud Security Posture Management) actually is, and what kind of risk it scans for
- Why CSPM looks at configuration, not application code — and how that makes it the
  configuration-risk counterpart to the vulnerability scanning covered earlier in this program
- The scan cycle every CSPM tool runs: discover, compare, flag, re-scan
- Why the majority of real-world cloud breaches trace back to a misconfigured setting rather than
  a sophisticated exploit

## CSPM: continuously checking configuration, not code

**CSPM** stands for **Cloud Security Posture Management**. It's a category of tooling that
continuously scans a cloud environment — every storage account, every security group, every IAM
role — and compares what it finds against a security best-practice **baseline**. Crucially, CSPM
isn't hunting for a bug in an application's source code. It's checking whether a resource is
*configured* safely: is this bucket public when it shouldn't be, is this port open to the whole
internet, does this role have more access than its job requires. That's **configuration risk**,
and it's a fundamentally different category of problem from an application vulnerability.

## The configuration-risk counterpart to vulnerability scanning

This program already covered vulnerability scanning and CVE/CVSS: tools that find a flaw in
*code* — an unpatched CVE with a known severity score — and tell you to patch it. CSPM runs the
same continuous-scanning idea one layer over, against *configuration* instead of code. A storage
account set to allow public read access, or a security group rule allowing `0.0.0.0/0` on port 22,
isn't a CVE; nobody has to discover and disclose it the way a CNA discloses a new vulnerability.
It's simply a setting someone left wrong. CSPM exists to catch exactly that, continuously, the
same way a vulnerability scanner continuously checks for unpatched software.

## The CSPM scan cycle

Every CSPM tool runs roughly the same loop:

1. **Discover** — inventory every resource across the environment. It has to see everything
   before it can check anything.
2. **Compare** — check each resource against a recognized security baseline, such as the CIS
   Benchmark.
3. **Flag** — surface any resource that drifts from that baseline as a finding.
4. **Re-scan** — run the whole cycle again on a schedule, because cloud environments change
   constantly. A setting that was safe yesterday can be flipped open by someone's change today.

```
Discover resources
      ↓
Compare to baseline
      ↓
Flag misconfigurations
      ↓
Re-scan continuously
```

## A concrete example

Say a developer spins up a new Azure Storage account for a quick data export and, to make testing
easier, leaves public blob access enabled — intending to lock it down "later." A CSPM tool doesn't
need to know anything about the application using that storage account. On its next scan pass, it
simply compares the account's configuration against the baseline rule "storage accounts should not
allow public access," finds a mismatch, and raises a finding. Nobody had to exploit anything for
this to matter: post-incident reviews of real cloud breaches keep landing on exactly this pattern —
not a zero-day, not a sophisticated attack chain, but a resource that was left misconfigured until
someone found it. CSPM's job is to be the one who finds it first.

## Key terms

| Term | Meaning |
|---|---|
| CSPM (Cloud Security Posture Management) | Tooling that continuously scans a cloud environment for configuration risk against a security baseline |
| Configuration risk | Risk from how a resource is *set up*, not from a flaw in application code |
| Baseline | The security best-practice standard (e.g., the CIS Benchmark) a CSPM tool compares resources against |
| Finding | A specific resource flagged as not matching the baseline |
| Posture drift | The way a cloud environment's security configuration changes over time, requiring continuous re-scanning |

## Check yourself

A colleague says, "We already run vulnerability scans, so we don't need CSPM too — they're the
same thing." Explain, in your own words, why that's wrong: what specific category of risk does
CSPM catch that a vulnerability scanner focused on CVEs would miss entirely?
