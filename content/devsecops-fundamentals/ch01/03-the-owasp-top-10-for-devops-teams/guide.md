# The OWASP Top 10 for DevOps Teams

Threat modeling tells you how to find risks specific to your own system. The OWASP Top 10 is the industry's shared vocabulary for the risk categories that show up again and again, across almost every web application — including the services Northbridge Retail runs. You don't need to memorize all ten to be a good DevOps engineer, but you do need to recognize them by name, because they're what your scanning tools (Chapter 4) will report back to you.

## What you'll learn

- What the OWASP Top 10 is, who publishes it, and why it gets periodically revised
- The current ten categories, in plain language
- Which categories a DevOps/platform engineer is most likely to meet in pipeline tooling, versus which are mostly an application-developer's concern
- Why "Top 10" doesn't mean "only 10 risks that matter"

## What OWASP is, and what this list actually is

OWASP, the Open Worldwide Application Security Project, is a nonprofit that publishes free, community-driven application security resources. The OWASP Top 10 is its best-known project: a ranked list of the most critical web application security risk categories, rebuilt periodically from real-world vulnerability data and practitioner surveys. It isn't ten specific bugs — each entry is a *category* covering a family of related weaknesses, which is why a single scanning tool finding might map to one Top 10 category while a completely different-looking bug maps to the same one.

## The current ten categories

1. **Broken Access Control** — a user can act on data or functions they shouldn't be able to reach (the elevation-of-privilege and information-disclosure threats from Lesson 2's STRIDE walkthrough, in named form).
2. **Security Misconfiguration** — a system shipped with insecure defaults, unnecessary features enabled, or missing security headers.
3. **Software Supply Chain Failures** — a vulnerability or malicious change introduced through a dependency, build tool, or CI/CD pipeline rather than the application's own code (covered in depth in Chapter 4).
4. **Cryptographic Failures** — sensitive data exposed because it wasn't encrypted, or was encrypted with weak or outdated algorithms.
5. **Injection** — untrusted input is interpreted as code or commands, such as SQL injection or command injection.
6. **Insecure Design** — the vulnerability exists not because of a coding mistake, but because the system was architected without security requirements from the start — the exact gap threat modeling exists to close.
7. **Authentication Failures** — weaknesses in how a system verifies identity, from weak password policies to broken session handling.
8. **Software or Data Integrity Failures** — code or data is trusted without verifying it hasn't been tampered with, such as an unsigned software update.
9. **Security Logging and Alerting Failures** — attacks go undetected because events aren't logged, or logs aren't monitored (the subject of Chapter 6's audit logging lesson).
10. **Mishandling of Exceptional Conditions** — error states, edge cases, and failure paths are handled in ways that create security gaps, such as a crash that falls back to an insecure default.

## Which of these a DevOps engineer meets most often

As a platform or DevOps engineer at Northbridge Retail, you're less likely to personally write the application-layer injection bug, and far more likely to be the person who configures the pipeline that *catches* it. Three categories are especially close to the DevOps/platform role: **Security Misconfiguration** (your infrastructure-as-code and container defaults), **Software Supply Chain Failures** (your dependency and build-pipeline integrity — the direct subject of Chapters 4 and 5), and **Security Logging and Alerting Failures** (your observability and audit trail). The rest matter too, but those three are where your daily tooling decisions have the most direct influence.

## "Top 10" doesn't mean "the only 10"

The list is a prioritization aid, not a ceiling. It represents the categories most commonly found and most broadly applicable across web applications — not an exhaustive catalog of every risk Northbridge Retail's systems could face. A good scanning and threat-modeling practice (Chapters 2-5) will surface plenty of findings that don't map neatly to any Top 10 entry, and that's expected, not a sign something is broken.

## Key terms

- **OWASP** — Open Worldwide Application Security Project, a nonprofit publishing free application security resources
- **OWASP Top 10** — a periodically revised, ranked list of the most critical web application security risk categories
- **Risk category** — a family of related weaknesses grouped under one name, rather than one specific bug
