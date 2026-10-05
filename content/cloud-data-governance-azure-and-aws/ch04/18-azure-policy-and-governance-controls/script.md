# Lesson 18 — Azure Policy and Governance Controls · Voiceover script

Segments map 1:1 to slides. Target: ~2-3 minutes total.

## S1 · TITLE CARD

Azure Policy and Governance Controls — a condition, plus an effect, evaluated
against real resources regardless of who created them.

## S2 · SCREENSHOT (search policy)

Policy is just another Azure service, found the same way you'd find anything else
in the portal search box.

## S3 · SCREENSHOT (assignments page)

The Assignments page is both home base and the starting point for a new one —
individual policies and initiatives, bundles of several policies together.

## S4 · SCREENSHOT (select definition)

Built-in definitions are versioned. An assignment can float, picking up new minor
versions automatically, or pin to an exact one — which matters a lot more for a
Deny policy than an audit-only one.

## S5 · SCREENSHOT (compliance page)

Compliance evaluates on a cycle, not instantly. Each assignment traces straight
down to its actual non-compliant resources.

## S6 · CODE (simplified policy rule)

Strip away the wizard, and every definition is just this: an if condition, and a
then effect.

## S7 · OUTRO CARD

Next up: AWS Organizations and service control policies — AWS's answer, applied
across entire accounts rather than single resources.
