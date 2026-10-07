# Static Application Security Testing

You've spent three chapters on identity and secrets — controlling who can act and what they can authenticate with. This chapter turns to a different question: is the code itself safe? Static Application Security Testing, or SAST, is where that question gets asked first, because it runs against source code before anything is ever built or deployed.

## What you'll learn

- What SAST actually analyzes, and what it can't see
- How GitHub's code scanning (built on CodeQL) surfaces findings as alerts and pull request checks
- Why every SAST finding needs a human triage step, not blind trust
- Where SAST fits relative to the other scans in this chapter

## What SAST looks at

SAST tools read your source code — without running it — and look for patterns that match known categories of vulnerability: a SQL query built by concatenating user input instead of using parameterized queries, a regular expression vulnerable to catastrophic backtracking, a cryptographic function known to be weak. Some SAST engines go further with **taint analysis**, tracing whether data from an untrusted source (a request parameter) can reach a dangerous function (a database call) without being validated along the way.

At Northbridge Retail, the platform team runs GitHub's code scanning on every pull request to the checkout service. When a developer writes an inventory lookup that builds a SQL string by concatenating a product ID straight out of the request, CodeQL's taint analysis flags it as a potential SQL injection path before a reviewer ever has to spot it by eye.

## Alerts, and the pull request check that blocks nothing by itself

Findings show up in two places: the repository's **Security** tab, where each alert lists the affected code, severity, and metadata, and directly on the pull request as a check result. The screenshot below shows what a developer actually sees.

![Screenshot of a code scanning alert, with the alert title, the relevant lines of code on the left, and severity and metadata on the right](/courses/devsecops-fundamentals/ch04/15-static-application-security-testing/code-scanning-alert.png)
*A code scanning alert — the flagged lines of code sit alongside severity and rule metadata, so a developer can act without leaving the pull request.*

![Screenshot of the code scanning results check on a pull request, with a link to view all alerts on the branch](/courses/devsecops-fundamentals/ch04/15-static-application-security-testing/code-scanning-results-check.png)
*The code scanning results check surfaces directly in the pull request's checks — a developer doesn't need to visit the Security tab to know a scan ran and what it found.*

Whether that check actually blocks a merge depends on branch protection rules, not on the scan itself — a theme you'll see again in Lesson 22, when pipeline-level enforcement gets its own treatment.

## Triage is not optional

A SAST finding is a hypothesis, not a verdict. Pattern-based analysis produces false positives: a string concatenation that looks like SQL injection but only ever touches a hardcoded constant, or a "weak crypto" flag on a hashing call used for a non-security checksum. Every finding needs a developer to confirm it's real, fix it, or dismiss it with a documented reason — dismissing without review just hides the backlog.

## What SAST misses

SAST only sees the code you wrote. It won't catch a vulnerable open-source library you imported (that's Lesson 16), a secret accidentally committed to a config file (Lesson 17), or a misconfigured cloud resource defined in Terraform (Lesson 18). Each of this chapter's scans covers a different blind spot — none of them substitutes for the others.

## Key terms

- **SAST (Static Application Security Testing)** — analyzing source code for vulnerability patterns without executing it
- **CodeQL** — the semantic code analysis engine behind GitHub's code scanning
- **Taint analysis** — tracing whether untrusted input can reach a dangerous function without validation
- **False positive** — a flagged finding that isn't actually exploitable, requiring triage rather than automatic trust
