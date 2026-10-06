# Lesson 14 — Release Cycles: Three Releases a Year

**Chapter 3 · How Salesforce Works · Lesson 14 of 20**

## What you'll learn

- The names and rough timing of Salesforce's three annual releases
- How a release reaches your org, and when
- The difference between features that turn on automatically and features you have to opt into
- Why "what release are we on?" is a normal, everyday admin question

## Spring, Summer, Winter — three releases, every year

Because Salesforce is multitenant (Lesson 11), the whole platform upgrades together, on a predictable, recurring schedule. Salesforce ships three major releases a year, named for the season they launch in, and numbered with the year that follows:

- **Spring release** — ships around February
- **Summer release** — ships around June
- **Winter release** — ships around October, numbered for the *following* year (so "Winter '27" actually ships in autumn of the prior year)

Every release bundles hundreds of new features, enhancements, and fixes across the entire platform — everything from small UI tweaks to entirely new products. Salesforce publishes detailed **Release Notes** ahead of each release, documenting every change.

## How a release actually reaches your org

Salesforce doesn't flip every customer over at the same instant. Instead:

1. **Sandbox preview.** Weeks before the production release, Salesforce upgrades Sandbox orgs first, so admins, developers, and QA teams can test the new release against their own customizations in a safe environment.
2. **Scheduled maintenance windows.** Production orgs are upgraded automatically during a scheduled maintenance window assigned to their instance — you don't request it, and you can't skip it. Salesforce publishes exact maintenance dates per instance on trust.salesforce.com.
3. **It just happens.** Because of multitenancy, there's no "click install" step for a customer. One day your org is simply running the new release.

## Not every new feature turns on automatically

This trips up a lot of new admins: a release doesn't mean every new feature is suddenly live and visible to your users. Salesforce categorizes new functionality roughly into:

- **Enabled automatically** — the feature is just there after the release, often minor UI or performance improvements.
- **Opt-in** — the feature exists but is off by default; an admin has to turn it on deliberately in Setup, often because it could change behavior your users are relying on.
- **Beta / pilot** — early-access features, sometimes requiring Salesforce to enable them for your org directly, with the expectation that functionality may still change.

This staged approach is intentional: Salesforce doesn't want to silently change how your business-critical automation behaves overnight.

## Why admins actually care about this

- **Regression risk.** A release can occasionally change behavior in ways that affect your existing customizations — testing in the Sandbox preview window is the whole point of that step.
- **New tools for your roadmap.** Every release is also an opportunity: new declarative features regularly replace things admins used to need code (or a workaround) for.
- **Certification maintenance.** If you pursue Salesforce certifications later in this career path, you'll need to pass a release-specific "maintenance module" a few times a year to keep them current — a direct, practical reason to pay attention to release notes.

## Key terms

| Term | Meaning |
|---|---|
| Release | A platform-wide upgrade, shipped three times a year (Spring, Summer, Winter) |
| Release Notes | Salesforce's official documentation of every change in a release |
| Sandbox preview | The window when Sandboxes get the new release before Production, for testing |
| Opt-in feature | A new capability that exists after a release but must be manually enabled |

## Lab

1. Search "Salesforce release notes" for the current release and skim the table of contents for just one Cloud (e.g., Sales Cloud).
2. Find one feature listed as "opt-in" and note what it does and why an admin might choose to delay enabling it.
3. Check trust.salesforce.com for your instance's next scheduled maintenance window.

## Check yourself

You're ready for Lesson 15 when you can name all three release seasons in order, explain why Sandbox gets the new release before Production, and explain the difference between an automatically enabled feature and an opt-in one.
