# Lesson 2 — Release Cadence and Salesforce Seasonal Releases

**Chapter 1 · Release and Governance · Lesson 2 of 16**

## What you'll learn

- How Salesforce's three-times-a-year seasonal release cycle actually works
- What the sandbox preview window is and why it matters for testing before go-live
- What a Release Update is, and the enforcement lifecycle it goes through
- Where to find authoritative dates for your own org's upgrade window
- How to layer an org's internal release cadence on top of this mandatory external cycle

## Three releases a year, on Salesforce's schedule

Salesforce upgrades every org on the platform three times a year through named seasonal releases — **Spring**, **Summer**, and **Winter** — each identified by the calendar year it ships in (for example, Spring '26, Summer '26, Winter '27). Unlike an org's own internal deployments, nobody at the customer organization chooses whether or when this happens: every production org and every sandbox gets upgraded on a schedule Salesforce sets and publishes well in advance. This is the single most important fact that separates Salesforce release management from release management on a platform you fully control: part of your release calendar is dictated to you.

Because the upgrade touches every org automatically, a seasonal release can change behavior, add new standard functionality, or deprecate something your org depends on — even if your team made zero changes of its own that quarter. Release management on Salesforce has to treat "test against the next seasonal release" as a recurring, mandatory task, not an optional one.

## The sandbox preview window

Ahead of each seasonal release going live in production, Salesforce makes the new release available early in sandboxes through a **sandbox preview window** — generally opening some weeks before the production upgrade, so teams can test their customizations, integrations, and automations against the new release before it reaches their live org. This is the practical mechanism a release strategy (Lesson 1) relies on to avoid being surprised: a team with a mature practice treats the sandbox preview window as a required testing gate, not an optional nicety, and schedules regression testing specifically during that window.

Exact preview and production upgrade dates are instance-specific — they depend on which Salesforce instance (data center) hosts a given org. The authoritative source for an org's own dates is the **Trust Status** site (status.salesforce.com or the Trust area of Salesforce's site), where looking up the specific instance shows its maintenance windows, including the sandbox preview and the production release weekend.

## Release Updates: a separate, ongoing stream of change

Distinct from the three big seasonal releases, Salesforce also ships **Release Updates** — individually trackable platform changes, often security or behavior fixes, that are introduced in a seasonal release but go through their own enforcement lifecycle rather than taking effect immediately for every org. A Release Update is typically visible in Setup (via the Release Updates area) with a status such as not yet enabled, enabled but not yet enforced, or enforced, and has a published future date after which it becomes mandatory. The intended workflow is: an admin reviews the update, tests it in a sandbox with it turned on, confirms nothing breaks, and enables it in production ahead of the enforcement date — rather than being caught off guard when Salesforce turns it on automatically. Salesforce's release notes remain the definitive source for which release updates exist and what their current enforcement status is in a given release.

## Layering an internal cadence on top

With the platform's three-times-a-year cycle fixed, an organization still chooses its own internal cadence for its own changes — releasing weekly, biweekly, or continuously within and around the seasonal release calendar. Good practice treats the weeks immediately around a seasonal production upgrade as a **change freeze** window: avoid scheduling large, risky internal releases in the same week the platform itself is changing underneath you, since if something breaks afterward, you want to be able to tell quickly whether the platform upgrade or your own release caused it. This freeze-window practice is a direct, practical extension of the risk tiers introduced in Lesson 1.

## Key terms

| Term | Meaning |
|---|---|
| Seasonal release | Salesforce's three-times-a-year, mandatory, platform-wide upgrade (Spring, Summer, Winter) |
| Sandbox preview window | The period before a seasonal release reaches production where sandboxes get the new release early, for testing |
| Release Update | An individually tracked platform change with its own enable/enforce lifecycle and a published enforcement date |
| Trust Status | Salesforce's status site, the authoritative source for an org's specific maintenance and upgrade dates |
| Change freeze | A deliberate period, often around a seasonal release weekend, where an org avoids scheduling its own risky deployments |

## Lab

A production org is scheduled for its Winter seasonal upgrade on a specific weekend six weeks from now. Build a short readiness checklist (5-7 items) the release team should complete before that weekend, using this lesson's concepts — include at minimum one item about the sandbox preview window, one about reviewing pending Release Updates, and one about the org's own change-freeze policy for that week.

## Check yourself

Can you name Salesforce's three seasonal releases and explain why their timing isn't something the customer organization controls? Can you explain the difference between a seasonal release and a Release Update, and describe where an admin would find authoritative upgrade dates for a specific org?
