# Lesson 10 — Built-In vs. Custom Analytics Rules

**Chapter 3 · Analytics Rules & Detection Engineering · Lesson 10 of 32**

## What you'll learn

- Where a Scheduled Analytics Rule's KQL query actually comes from — a built-in **analytics rule template**, or a **custom** rule written from scratch
- What's inside the hundreds of templates Microsoft ships, and how little work it takes to turn one into a live rule
- When a custom rule is the only real option, and what that costs you in ongoing effort
- The actual tradeoff between the two, not "always prefer one"

## Built-in rule templates: fast coverage, Microsoft's logic

Open **Microsoft Sentinel → Configuration → Analytics → Rule templates**, and you'll find hundreds of pre-built analytics rules, organized by data source and by MITRE ATT&CK tactic. Each template already has its KQL query, its recommended schedule, its severity, and (where it applies) its entity mapping filled in — written and maintained by Microsoft's own security research teams and the broader Sentinel community, and updated over time as new templates ship. Most only need one thing from you: the matching **data connector** turned on, since a template built for Microsoft Defender for Endpoint data obviously won't return anything if that connector isn't feeding the workspace. For common, well-understood threats — a user added to multiple high-privilege groups in a short window, a sign-in from an unfamiliar country, a mass-download from a single account — a template gets you a working rule in minutes, not hours, and it's already been reasoned through by people who do this full-time.

## Custom rules: your logic, your maintenance

A **custom** analytics rule starts from a blank query instead of a template. You write the KQL yourself, set your own schedule, threshold, and entity mapping — the same pieces Lesson 9 covered, just authored from scratch instead of pre-filled. Custom rules are the only option whenever the thing you're watching for is specific to your own environment: a custom application's own log table, a business rule no vendor could anticipate ("this finance app should never be queried after hours by anyone outside the finance group"), or a threat pattern tuned to your organization's actual baseline rather than a generic one. The cost is real: you own the query's correctness, you own tuning it as your environment changes, and nobody at Microsoft is updating it when the underlying data source changes shape.

## The actual tradeoff

Neither option is categorically "better" — they solve different problems:

- **Built-in** = fast time-to-value, vetted logic, low maintenance, but tuned for the general case and sometimes noisy until you adjust its thresholds for your environment.
- **Custom** = exact fit for an org-specific scenario, full control over every clause, but all the authoring and ongoing tuning work is yours.

In practice, most real Sentinel deployments run a mix: templates enabled for the broad, well-known threats, and a smaller number of custom rules covering the handful of things that are genuinely unique to that organization.

## Key terms

| Term | Meaning |
|---|---|
| Analytics rule template | A pre-built rule Microsoft ships with its query, schedule, and mapping already filled in |
| Rule templates gallery | The Sentinel UI tab (Configuration → Analytics → Rule templates) listing all available templates |
| Custom analytics rule | A rule whose KQL query, schedule, and mapping are written from scratch by the analyst |
| Time-to-value | How quickly a rule starts producing useful alerts after being enabled |

## Check yourself

Without looking back: why would a template built for a specific data connector produce zero alerts in a workspace even after the rule is enabled — and what's the one thing you'd check first?
