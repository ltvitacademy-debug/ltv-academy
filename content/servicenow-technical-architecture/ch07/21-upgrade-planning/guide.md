# Lesson 21 — Upgrade Planning

**Chapter 7 · Platform Lifecycle & Release Management · Lesson 21 of 32**

## What you'll learn

- A one-sentence recap of ServiceNow's periodic platform release cadence and who owns the upgrade decision
- Why every custom application and customization has to be tested against a pre-upgrade sandbox before production ever sees the new release
- How to triage customizations into high-risk and low-risk tiers instead of testing everything with equal intensity
- How to build a real upgrade timeline that gives stakeholders advance notice instead of a surprise
- The specific people and teams who need to be in the loop, and when

## Recap: ServiceNow owns the release calendar, you own the upgrade

ServiceNow Platform Development Lesson 1 covered the basics: ServiceNow ships new platform releases on its own periodic cadence (historically twice a year, now moving toward a continuous model), and upgrading to each release is the customer's own responsibility, not something ServiceNow does for you automatically. That one fact — "you decide when, ServiceNow decides what's in the release" — is the entire reason upgrade planning exists as a discipline at all. If ServiceNow silently pushed every release to every instance, there would be nothing to plan.

## Testing isn't optional, and it isn't uniform

The core architect-level responsibility in upgrade planning is systematic pre-upgrade testing: every custom application, every customization, every integration gets validated against a sandbox instance that has already been upgraded to the new release, before that release ever touches production. "Systematic" is the operative word — this isn't "click around and see if anything looks broken." It means an actual inventory of what exists on the instance (scoped apps, Business Rules, Client Scripts, UI Policies, integrations, ATF test suites) and a deliberate pass over every item in that inventory.

But not every item deserves the same amount of testing effort, and pretending otherwise is how upgrade projects run out of time. A technical architect triages customizations into tiers before testing begins:

- **High-risk, high-usage first.** A scoped application that every service desk agent touches hundreds of times a day, or one built on an API ServiceNow has flagged as deprecated or changed in the new release, gets thorough, hands-on validation — functional testing, regression testing, ideally automated ATF coverage run against the upgraded sandbox.
- **Low-risk, low-usage later, or lighter-touch.** A UI Policy on a rarely-used form, or a simple Client Script with no dependency on platform internals, can be spot-checked rather than exhaustively regression-tested. Spending the same rigor here as on the high-risk tier just steals time from where it actually matters.

The triage question an architect asks for every item is simple to state and hard to answer honestly: "If this breaks the day after upgrade, how many people notice, and how fast?" High blast radius and high likelihood of breaking (deprecated API, heavy platform coupling) earns priority. Low blast radius and low likelihood earns a lighter pass.

## A real timeline — not a surprise

Enterprise upgrades fail politically more often than they fail technically. A technical debt customization quietly breaking on upgrade day is a problem; stakeholders finding out about the upgrade *on* upgrade day is a bigger one. A real upgrade timeline looks roughly like this:

- **Months out:** communicate the target upgrade window to application owners and business stakeholders — not just IT. Anyone who owns a customization needs enough runway to either test it themselves or request time from the platform team.
- **Weeks out:** pre-upgrade sandbox is actually upgraded to the new release; high-risk tier testing begins first, because it's the most likely to surface a real blocker that needs a fix before production upgrade.
- **Final week:** low-risk tier gets its lighter validation pass; a go/no-go decision is made with named owners, not left ambiguous; a rollback or mitigation plan exists in writing for anything still flagged as risky.
- **Upgrade day:** production upgrade happens in a defined maintenance window that was communicated well in advance, with the people who own high-risk customizations on standby, not caught off guard.

Skipping the "months out" step is the single most common upgrade-planning failure this course will point to. Technical readiness without stakeholder communication still produces a surprise — just a well-tested one.

## Key terms

| Term | Meaning |
|---|---|
| Pre-upgrade sandbox | A non-production instance already upgraded to the target release, used to validate customizations before production is touched |
| Upgrade triage | Sorting customizations into high-risk/high-usage vs. low-risk tiers to focus testing effort where it matters most |
| Go/no-go decision | A named, documented decision point confirming the production upgrade should proceed, based on sandbox test results |
| Rollback plan | A written mitigation path for any customization still flagged as risky when the upgrade window arrives |

## Check yourself

You're ready for Lesson 22 when you can explain, without looking: why does a technical architect test a heavily-used scoped application relying on a soon-to-be-deprecated API before testing a rarely-used UI Policy — and what would actually go wrong if that testing order were reversed?
