# Configuration Packages and Moving Setup

A functional consultant doesn't configure Oracle Fusion once — they configure it once per environment, or at least that's the naive approach. This lesson covers the better way: using Functional Setup Manager's **configuration packages** to export setup from one environment and import it into another, instead of re-keying every value by hand.

## What you'll learn

- What a configuration package actually contains
- Why configuration is built once (in a lower environment) and promoted upward
- What doesn't move with a configuration package, and has to be set manually in each environment
- How Brightfield promoted its Cash Management configuration from Test toward Production

## What a configuration package contains

A **configuration package** is an export, scoped to an Implementation Project's task lists, of the setup data configured so far — essentially everything a consultant entered in Setup and Maintenance for the scoped task lists. FSM lets a consultant export either a full package or an **incremental** one (only what's changed since the last export), then import that package into a target environment, where it applies the same setup values automatically instead of requiring manual re-entry.

## Promote upward, not sideways

The standard discipline is: configure once, in the lowest appropriate environment (commonly a development or configuration instance), get it reviewed and tested there, then promote the same configuration package upward — toward Test, then eventually Production — rather than configuring each environment independently. This guarantees that what gets tested in Test and what eventually goes live in Production are genuinely the same configuration, not three different people's interpretation of the same configuration workbook.

## What doesn't travel automatically

Some values are deliberately environment-specific and are not meant to move with a configuration package — integration endpoint URLs that point to a different system instance per environment, certain security or encryption keys, and some test-only data deliberately left out of a package bound for Production. A consultant reviewing an import has to know which setup values are genuinely common across environments and which need a manual, environment-specific override after the package lands.

## Sequencing and comparison

Because enterprise structure decisions (Lesson 9) have to exist before most module-level setup can be imported, configuration packages are usually sequenced: foundational task lists first, module task lists after. FSM also offers a comparison report that shows exactly what's different between a package and the target environment's current setup before import — letting a consultant catch an unexpected difference (someone manually changing a setting directly in Test, for example) before it gets overwritten or compounded.

## Brightfield Industrial Group: promoting Cash Management

Brightfield's Cash Management functional consultant finishes configuring the wire-matching rule and bank account setup in the development/configuration environment, exports a configuration package scoped to the Cash Management task lists, reviews the comparison report against Test (confirming no one has manually changed anything there), and imports it. The one exception: the integration endpoint for the bank statement file feed, which points to a test-mode URL in Test and will be manually re-pointed to the production bank connection only when the package is later promoted to Production.

## Key terms

| Term | Meaning |
|---|---|
| Configuration package | An FSM export of setup data scoped to an Implementation Project's task lists |
| Incremental export | A package containing only setup changes since the last export |
| Comparison report | Shows differences between a package and the target environment before import |

## Recap

Configuration packages let a team configure once and promote the same setup upward through environments instead of re-keying it, with a comparison report catching drift before import — while a few genuinely environment-specific values, like integration endpoints, still need manual handling in each environment. Next up, lesson 13: the DEV, TEST, and PROD environments this promotion actually moves between.
