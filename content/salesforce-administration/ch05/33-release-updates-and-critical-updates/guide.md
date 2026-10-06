# Release Updates and Critical Updates

**Chapter 5 · Administration in Practice · Lesson 33 of 36**

Salesforce doesn't just add features three times a year — it also changes how existing features
behave, sometimes in ways that could break an org's customizations if nobody reviews them first.
**Release Updates** (the modern replacement for the older "Critical Updates" console) is how
Salesforce surfaces those changes to admins ahead of time, with a deadline and a way to test the
impact before it's enforced.

## What you'll learn

- Where Release Updates lives in Setup, and what replaced it
- What "Complete Steps By" and "Enable Test Run" actually mean for an admin
- How Salesforce's three-releases-a-year cycle connects to these updates
- Why ignoring a release update until its enforcement date is a real risk, not a formality

## Finding Release Updates

From Setup, the Quick Find box takes you to **Release Updates** — a list of every pending,
upcoming, and completed update affecting the org. Release Updates itself is one line item among
many in Salesforce's official release notes, nested under each seasonal release's own documentation.

![A Salesforce Release Notes table of contents, with sections for How to Use the Release Notes, Get Ready for the Release, Monthly Release Notes, Release Note Changes, Supported Browsers, Salesforce Overall, and "Release Updates" listed among them.](/courses/salesforce-administration/ch05/33-release-updates-and-critical-updates/release-updates-toc.png)
*Release Updates isn't a one-off setting — it's documented as its own section of every seasonal release's notes.*

## Testing before committing

Many release updates offer **Enable Test Run**: a way to turn the update on or off in the org
during its test period, which runs up until the **Complete Steps By** date. That date is the real
deadline — Salesforce activates the update automatically once it passes, whether or not an admin
has reviewed the impact.

![A release update's detail panel showing an "Enable Test Run" button beside a warning: "You can enable and disable the update during the test period, which ends on the Complete Steps By date. For a sandbox org, the test period can end early with a release upgrade."](/courses/salesforce-administration/ch05/33-release-updates-and-critical-updates/enable-test-run.png)
*Test Run exists specifically so an admin can see the real effect on their org before the deadline forces the issue.*

## Why these exist at all

Salesforce ships three seasonal releases a year — Spring, Summer, and Winter — and most new
features in each one are additive and opt-in. Release Updates are different: they're changes to
*existing* platform behavior, often security or performance related, that Salesforce has decided
should eventually become mandatory for every org. Shipping the change with a lead time, a test
run, and a firm deadline is how Salesforce balances "this needs to happen eventually" against "we
can't break live orgs with no warning."

## The admin's actual workflow

1. **Review** what's listed on the Release Updates page — each one names its Complete Steps By date.
2. **Read the details** — Salesforce explains what's changing, why, and what it affects.
3. **Enable Test Run** in a sandbox (or production, carefully) to see the real impact before committing.
4. **Activate** deliberately once satisfied, rather than letting the deadline activate it with no review.

## Why this matters

An update left unreviewed doesn't just vanish at its Complete Steps By date — it activates
automatically, on Salesforce's timeline instead of the org's. For an update that changes
validation behavior, sharing calculations, or API defaults, that's the difference between a
planned change and a Monday morning full of confused support tickets. Release Updates is one of
the few Setup pages genuinely worth checking on a recurring schedule, not just when something
breaks.

## Key terms

| Term | Meaning |
|---|---|
| Release Update | A platform behavior change Salesforce will eventually enforce for every org |
| Complete Steps By | The deadline after which Salesforce activates the update automatically |
| Enable Test Run | Turning an update on/off temporarily to observe its real impact before the deadline |
| Critical Updates | The older name/console that Release Updates replaced |

## Check yourself

Why does "Complete Steps By" matter even for an admin who's confident a release update won't
affect their org?
