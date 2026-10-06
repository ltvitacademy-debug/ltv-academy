# Lesson 3 — Purview Licensing and Environments · Voiceover script

Segments map 1:1 to slides. Target: ~2-3 minutes total.

---

## S1 · TITLE CARD

Let's talk about what you're actually working with — free versus enterprise Purview, and what environments and regions mean once you get past the marketing language.

## S2 · STEPS CARD (free vs enterprise)

The free version is real, not a trial — browse and manually tag up to 1,000 assets, no scanning, no support tickets. Enterprise unlocks collections, automated classification, scanning, workflows, and support access. From Chapter 2 onward, this course assumes enterprise, because scanning — the thing that actually finds your data — is an enterprise-only capability.

## S3 · SCREENSHOT (check tier)

You can check which tier you're on at any time — Settings, then View all settings, shows your current account type right there.

## S4 · SCREENSHOT (upgrade prompt)

Upgrading means converting your existing free instance in place — your data carries over. The prompt is right in the command bar: select the rocket icon, and you get this — "Better coverage and more apps."

## S5 · SCREENSHOT (upgrade details)

Confirm, and you pick where it's hosted — your Azure subscription and resource group. By default you get 1 capacity unit: 25 operations per second and 10 gigabytes of metadata storage, with auto-scale available after that.

## S6 · SCREENSHOT (switch back)

And even after you upgrade, you're not locked in — this toggle switches you back to the classic portal experience for the same account whenever you need it.

## S7 · STEPS CARD (environment vs region)

Two different ideas both get called "environment" here. An environment tag — Production, Test, Dev — is just a label for your own organization; Purview doesn't enforce anything based on it. A region is where your account's metadata is actually stored, tied to your Entra tenant, and you cannot move it after creation. And GCC regions aren't supported in the new experience at all.

## S8 · OUTRO CARD

Next lesson: roles and permissions — who can actually see, scan, and manage what inside Purview, and exactly where that gets configured.
