# Lesson 13 — Building a GPO Baseline from a Real Benchmark

**Chapter 4 · Windows System Hardening Engineering · Lesson 1 of 4**

## What you'll learn

- How to actually import a published baseline — Microsoft's Security Compliance Toolkit (SCT) or a CIS Benchmark GPO backup — instead of configuring it by hand
- How to customize specific baseline settings for your organization's real needs without throwing away the whole baseline
- Why a pilot OU exists, and what you're actually watching for during a pilot period
- How to move from pilot to org-wide rollout without surprising the whole company at once

## Importing a baseline instead of building one

Lesson 6 covered what the Security Compliance Toolkit and CIS Benchmarks are — tested, documented
starting points instead of hand-picked settings. Using one in practice means importing it: both
the SCT and the CIS Benchmark for Windows ship each baseline as a **GPO backup** — a folder
containing the exported settings for a specific OS version, e.g. "MSFT Windows 11 23H2 - Computer."
In the Group Policy Management Console (GPMC), an admin creates a new, empty GPO, right-clicks it,
chooses **Import Settings**, and points the wizard at that backup folder. Every setting the
baseline defines — password policy, audit policy, disabled legacy protocols, hundreds of registry
and security-template values — lands in that one GPO in seconds, with zero manual re-typing and
zero chance of a typo in a GUID or a registry path.

## Customizing it for your organization

A baseline is a starting point, not a final answer, and real environments always need at least one
deviation. **Concrete example:** the Microsoft baseline disables **SMBv1** everywhere, which is
correct almost universally — except one organization still runs a 15-year-old label printer whose
firmware only speaks SMBv1. Re-enabling SMBv1 in the baseline GPO itself would quietly undo that
protection fleet-wide. The right fix is narrower: leave the baseline GPO untouched, and create a
second, more specific GPO — linked only to the OU containing that one print server, or scoped with
a **WMI filter** matching just that machine — that re-enables SMBv1 for that single exception. The
baseline stays intact for every other machine; the exception is documented, scoped, and reversible
the day that printer gets replaced.

## Testing in a pilot OU before rollout

Linking a new baseline GPO straight to the domain root affects every computer in the organization
the next time Group Policy refreshes — including whatever nobody thought to test. The standard
practice is a **pilot OU**: create an OU like `Pilot - Hardening Baseline`, move a representative
slice of machines into it (a mix of departments, OS versions, and critical line-of-business apps,
not just IT's own laptops), and link the baseline GPO there first. For a defined pilot window —
commonly one to two weeks — the team watches `gpresult` output on pilot machines, Event Viewer for
new audit or lockout events, and the help desk queue for anything that broke. Only after the pilot
period passes cleanly does the same GPO get re-linked (or linked a second time) to the production
OUs, rolling out to the rest of the organization with real evidence it won't cause an outage.

## Key terms

| Term | Meaning |
|---|---|
| GPO backup | An exported folder of GPO settings — how both SCT and CIS Benchmark baselines are distributed |
| Import Settings wizard | The GPMC feature that loads a GPO backup's settings into a new, empty GPO |
| WMI filter | A query that scopes a GPO to only the machines matching specific criteria, used to carve out exceptions |
| Pilot OU | A small, representative organizational unit where a new baseline GPO is linked and monitored before org-wide rollout |

## Check yourself

You're ready for Lesson 14 when you can explain, without looking: why is creating a second,
narrowly-scoped GPO the better way to handle a baseline exception, instead of editing the setting
inside the baseline GPO itself?
