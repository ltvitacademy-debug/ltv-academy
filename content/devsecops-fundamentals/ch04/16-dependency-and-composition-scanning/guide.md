# Dependency & Composition Scanning

Lesson 15 covered the code your team writes. Almost no modern application is only that code — Northbridge Retail's checkout service pulls in dozens of open-source packages, and those packages pull in dozens more. Dependency and composition scanning, often called Software Composition Analysis (SCA), is how you find out whether any of that imported code carries a known vulnerability.

## What you'll learn

- What Software Composition Analysis checks, and why it's a different problem than SAST
- How CVEs and severity scores let you prioritize which vulnerable dependency to fix first
- Why transitive dependencies make this harder than just checking your own package.json
- How GitHub Dependabot turns a finding into an actual fix

## Your code is a small fraction of what ships

A typical Node.js or Python service might have twenty direct dependencies listed in its manifest file — and two hundred more pulled in transitively, as dependencies of those dependencies. SCA tools scan manifest and lockfiles (`package-lock.json`, `requirements.txt`, and similar) and compare every version against databases of known vulnerabilities, most commonly tracked as **CVEs** (Common Vulnerabilities and Exposures) with a **CVSS** severity score.

This is a different problem than SAST. SAST analyzes logic you wrote; SCA assumes the imported code is a black box and only checks "is this specific version of this specific package known to be vulnerable?"

## Dependabot alerts at Northbridge Retail

GitHub's Dependabot continuously compares a repository's dependencies against GitHub's Advisory Database. When it finds a match, it opens an alert — and, where a fixed version exists, it can open a pull request automatically.

![Screenshot of a Dependabot alert with the "Create Dependabot security update" button highlighted](/courses/devsecops-fundamentals/ch04/16-dependency-and-composition-scanning/dependabot-security-update-button.png)
*When a fixed version exists, Dependabot can generate the upgrade pull request directly from the alert — no manual version-hunting required.*

![Screenshot showing the "Tags" section on a Dependabot alert details page](/courses/devsecops-fundamentals/ch04/16-dependency-and-composition-scanning/dependabot-alerts-tags-section.png)
*Each alert carries tags and severity metadata, which is what lets a team triage a stack of alerts by what's actually urgent instead of working through them in whatever order they appeared.*

When a critical CVE surfaced in a logging library Northbridge's checkout service depended on transitively — two layers deep, not even a package the team had chosen directly — Dependabot's alert was what caught it. Nobody on the platform team had audited that dependency by hand; nobody needed to.

## Why transitive dependencies change the math

If Northbridge Retail's checkout service directly depends on a web framework, and that framework depends on a templating library, and that templating library has a critical vulnerability, the checkout service is exposed even though nobody on the team ever typed the templating library's name into a config file. Manual auditing doesn't scale past a handful of direct dependencies; automated SCA scanning is the only realistic way to track a dependency tree that's several layers deep and changes with every `npm install`.

## Triage still matters

Not every CVE in a dependency is reachable or exploitable in your specific usage — a vulnerability in a function your code never calls carries far less urgency than one in a function on your checkout service's critical path. Severity scores are a starting point for prioritization, not a verdict that every finding must be fixed within the hour.

## Key terms

- **SCA (Software Composition Analysis)** — scanning third-party and open-source dependencies for known vulnerabilities
- **CVE** — Common Vulnerabilities and Exposures, a standardized identifier for a publicly known vulnerability
- **CVSS** — Common Vulnerability Scoring System, a numeric severity score used to prioritize CVEs
- **Transitive dependency** — a package pulled in indirectly, as a dependency of a dependency, rather than listed directly
