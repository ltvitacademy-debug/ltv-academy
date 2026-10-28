# Lesson 16 — Use-Case Development: Building Detections That Matter

**Chapter 4 · Correlation Rules & Alert Logic · Lesson 16 of 32**

## What you'll learn

- What "use-case development" means in a SOC, and why it starts from a real risk, not a rule catalog
- How to walk a real example — detecting lateral movement — from a stated risk to actual log sources and correlation logic
- Why simply enabling every out-of-the-box rule a SIEM ships with is a real anti-pattern, not a shortcut
- How use-case development connects back to tuning from Lesson 15 and the correlation-rule shape from Lessons 13-14

## Starting from a risk, not a rule list

Every SIEM ships with a library of pre-built, out-of-the-box correlation rules — dozens or hundreds of them, covering common attack patterns across many kinds of organizations. It's tempting to just turn all of them on and call detection coverage done. In a real SOC, that's a genuine anti-pattern: most pre-built rules were written for a generic environment, not yours, so plenty of them will be irrelevant to your actual log sources, noisy against your actual normal traffic, or silent on the specific risks your organization actually faces. **Use-case development** is the real, deliberate alternative: start from a specific threat or risk the organization cares about, then build — or select and tune — the exact log sources and correlation logic needed to catch it.

## A worked example: detecting lateral movement

Say a SOC decides **lateral movement** — an attacker who has already landed on one machine moving to additional machines inside the network — is a real risk worth a dedicated use case, because it's the step between an initial compromise and real damage (data theft, ransomware deployment) on a wider scale. Use-case development for that risk works through a few concrete questions:

- **What does it look like in logs?** An attacker moving laterally typically authenticates to new hosts using credentials harvested from the first one — so the log signal lives in authentication events, not firewall or antivirus logs.
- **Which log sources actually carry that signal?** Windows authentication logs (logon events) from every host, correlated together, not just one server's log in isolation.
- **What's the actual pattern, grouped and timed correctly?** The same user account authenticating to an unusual number of distinct hosts within a short time window — more hosts, faster, than that account's normal day-to-day behavior.
- **What would the correlation rule logic look like?** `GROUP BY user account`, count distinct destination hosts authenticated to `WITHIN 1 hour`, `THEN alert if distinct hosts >= N` (where N is set well above that account's normal baseline, not an arbitrary guess).

## Why this is different from "enable everything"

Notice what building this use case actually required: identifying the specific risk (lateral movement), tracing it to the specific events that would reveal it (authentication, not every log type the SIEM ingests), and writing correlation logic shaped around how that behavior actually looks across hosts and time — the same grouping-key and time-window thinking from Lessons 13 and 14. A pre-built, generic "excessive authentication" rule turned on by default might exist in the SIEM already, but without this deliberate process behind it, nobody would know whether its threshold matches this organization's real baseline, whether it's watching the right log sources, or whether it needs the same tuning work from Lesson 15 before it's trustworthy. Use-case development is what turns a SIEM from "a tool with a lot of rules in it" into an actual, organization-specific detection capability.

## Key terms

| Term | Meaning |
|---|---|
| Use-case development | Building detection logic starting from a specific real risk, rather than enabling generic pre-built rules |
| Lateral movement | An attacker moving from an already-compromised host to additional hosts inside the network |
| Baseline | An account's or host's normal behavior pattern, used to set a correlation rule's threshold meaningfully |
| Out-of-the-box rule | A pre-built correlation rule shipped by a SIEM vendor, written for a generic environment rather than any one organization |

## Check yourself

Without looking back: for the lateral-movement use case, why does the correlation logic group by user account and count distinct destination hosts, rather than just counting total authentication events?
