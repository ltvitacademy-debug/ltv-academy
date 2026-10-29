# Lesson 6 — Designing a Real MFA Rollout

**Chapter 2 · Authentication Architecture · Lesson 6 of 32**

## What you'll learn

- Why a company-wide "turn on MFA for everyone tomorrow" rollout usually causes an outage of its own, and how a phased approach avoids it
- How to group users for a phased rollout — pilot group, then high-privilege accounts, then general staff, then everyone remaining — and why privileged accounts go early despite the extra friction
- The real exceptions every MFA rollout has to plan for: shared or kiosk devices, service accounts, legacy apps with no MFA support, and break-glass emergency-access accounts
- Why user communication and help-desk staffing are real engineering work for this project, not an afterthought to bolt on at the end

## Why "turn it on for everyone" rollouts fail

Flipping an MFA enforcement switch for the entire organization at once looks simple on paper, but it rarely works cleanly in practice. Some fraction of users haven't enrolled a second factor yet; some are on shared devices with no personal phone to register; some depend on an old internal application that was never built to prompt for a code. A single flip locks all of them out simultaneously, overwhelms the help desk in one spike, and often gets the whole policy reverted before it ever proves its value. Engineering a rollout means staging the risk, not eliminating a step.

## Phasing the rollout by user group

A real rollout moves through distinct phases, each validating before the next expands. **Pilot group** first — IT and security staff who can troubleshoot their own enrollment and surface problems early. **High-privilege accounts** next, even though admins tend to push back hardest: their accounts are the ones an attacker wants most, so the earlier they're protected, the smaller the window of real exposure. **General staff**, department by department, so support load is spread out and any issue specific to one team's tools surfaces in a contained group. **Everyone remaining**, enforced last, once the earlier phases have worked out the kinks.

## The exceptions every rollout has to plan for

No rollout finishes without exceptions, and planning for them up front beats discovering them mid-rollout. **Shared or kiosk devices** (a warehouse floor terminal, a shared nursing-station PC) often need a different factor entirely, like a hardware token tied to the device rather than a person. **Service accounts** can't tap a phone — they need a different authentication model covered in Lesson 8. **Legacy applications** that were never built to support MFA may need to sit behind a layer that adds it, or be scheduled for replacement. **Break-glass accounts** — a small number of emergency-access credentials kept outside normal MFA enforcement so admins aren't locked out during an identity-provider outage — need to exist, be tightly monitored, and alert immediately on any use.

## Communication and the support burden

The engineering work includes telling people what's changing, when, and how to get help — clear email and intranet notices ahead of each phase, a short enrollment walkthrough, and a staffed help desk during the rollout window, since ticket volume reliably spikes the day a phase goes live. Skipping this isn't a shortcut; it's where rollouts actually fail.

## Example: rolling out MFA at a 2,000-person org

A 2,000-employee company starts with a 40-person pilot (IT and security), moves to its 60 admin and privileged accounts in week two, then enforces MFA department by department over six weeks, and finishes with remaining accounts in week eight. Three break-glass accounts are excluded from enforcement, monitored, and alerted on any sign-in. Two legacy apps get a temporary MFA-unaware exception with a scheduled replacement date. Help-desk staffing doubles for the two days surrounding each phase's launch.

## Key terms

| Term | Meaning |
|---|---|
| Phased rollout | Enforcing MFA in stages by user group instead of for everyone at once |
| Break-glass account | An emergency-access credential deliberately kept outside normal MFA enforcement, tightly monitored |
| Legacy application exception | A deliberate, documented, time-bounded carve-out for an app that can't support MFA yet |
| Help-desk burden | The predictable spike in support tickets each time a new rollout phase goes live |

## Check yourself

Why do high-privilege accounts usually get enrolled in MFA earlier in a phased rollout than general staff, even though they tend to push back the hardest?
