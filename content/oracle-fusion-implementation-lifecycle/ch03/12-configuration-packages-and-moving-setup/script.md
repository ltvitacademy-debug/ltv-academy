# Script — Configuration Packages and Moving Setup

## Segment 1 (title)

A functional consultant doesn't configure Oracle Fusion once per project, naively — they'd configure it once per environment. This lesson covers the better way: using Functional Setup Manager's configuration packages to export setup from one environment and import it into another.

## Segment 2 (steps)

A configuration package is an export, scoped to an Implementation Project's task lists, of the setup data configured so far. FSM lets a consultant export a full package or an incremental one with only what's changed, then import it into a target environment, applying the same values automatically instead of re-keying them.

## Segment 3 (steps)

The standard discipline is configure once, in the lowest appropriate environment, get it reviewed there, then promote the same package upward toward Test and eventually Production, rather than configuring each environment independently. That guarantees Test and Production are genuinely the same configuration.

## Segment 4 (steps)

Some values are deliberately environment-specific and don't travel with a package: integration endpoint URLs, certain security keys, test-only data. FSM's comparison report shows exactly what's different between a package and the target environment before import, catching drift like someone manually changing a setting directly in Test.

## Segment 5 (outro)

Brightfield's consultant configures the wire-matching rule in a lower environment, exports a package scoped to Cash Management, reviews the comparison report against Test, and imports it — except the bank statement integration endpoint, which stays test-mode until the package is later promoted to Production. Up next, lesson thirteen: the DEV, TEST, and PROD environments this promotion moves between.
