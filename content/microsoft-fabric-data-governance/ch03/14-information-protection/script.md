# Lesson 14 — Information Protection · Voiceover script

Segments map 1:1 to slides. Target: ~2-3 minutes total.

## S1 · TITLE

Lesson 13 showed you the label picker students click. This lesson is about everything that has to be configured before that picker works — the Microsoft Purview Information Protection program behind it.

## S2 · STEPS — The program behind the label

Sensitivity labels aren't just a dropdown in the Fabric ribbon. They're built, ordered, and automated in the Microsoft Purview compliance portal, under Information Protection — not the Fabric admin portal. That program is what this lesson covers: how labels are prioritized, how they get applied automatically, and what protection actually means.

## S3 · SCREENSHOT — Label priority order

Every label an organization creates lands in a ranked list, numbered from lowest to highest priority — something like Personal at the top, Highly Confidential at the bottom. An admin can move a label up, down, to the top, to the bottom, or assign a priority number directly.

## S4 · STEPS — Which label wins?

That order isn't cosmetic. If content matches the conditions for more than one label — say a general business term and a credit card number in the same file — the label with the highest priority number is the one that's applied. Every conflict resolves the same way.

## S5 · SCREENSHOT — Label policies also have priority

Labels reach users through label policies, and policies carry their own priority order too. A Standard policy might apply to everyone; an IT department or Legal department policy layers on top for narrower groups. When a user is covered by more than one policy and settings conflict, the policy with the highest order number wins.

## S6 · SCREENSHOT — Auto-labeling policies

Auto-labeling policies do the classification work without a human choosing a label. An admin edits the policy from Information Protection and runs it in simulation mode first, to see what it would catch, before turning it on to recommend or automatically apply the label for real.

## S7 · SCREENSHOT — Sensitive information types

What actually triggers a match? Sensitive information types — the same catalog data loss prevention policies use. Credit card numbers, passport numbers, national ID numbers. Select the types that should trigger a label, and matching content gets caught whether or not a user ever thought to label it themselves.

## S8 · STEPS — Protection actions vs. classification only

Not every label does the same job. Some only classify — a tag for reporting, with no technical enforcement. Others carry real protection actions: encryption, content marking like watermarks, and access restrictions. And none of it reaches Fabric or Power BI content until the tenant admin setting "Allow users to apply sensitivity labels for Power BI content" is turned on.

## S9 · STEPS — Seeing it tenant-wide

Building the program is only half the job. The Microsoft Purview compliance portal's data classification and label analytics reporting show which labels are actually landing on content across the tenant, and where coverage is still thin.

## S10 · OUTRO

Next lesson: auditing and activity logs — how Fabric records who did what, and where those records actually go.
