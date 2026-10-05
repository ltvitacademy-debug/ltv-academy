# Lesson 21 — Governance Automation · Voiceover script

Segments map 1:1 to slides. Target: ~2-3 minutes total.

## S1 · TITLE

This lesson closes Chapter Four: how policy as code actually gets run, continuously, without a human remembering.

## S2 · STEPS — From code to automation

Lesson 19 covered writing rules as code. Automation is what happens next — that code has to actually run, against real resources, on some trigger. The architecture question is where and when those checks fire.

## S3 · STEPS — Three insertion points

CI/CD pipeline checks run against a proposed change before it merges, same place application tests already run. Scheduled compliance scans run against everything already deployed, catching drift a pipeline check would never see. Event-triggered checks fire the instant a change happens — the push pattern from earlier lessons, now applied to enforcement.

## S4 · CODE — A CI pipeline step

Here's an illustrative CI step: a governance policy check running in the same pipeline as the application's own tests. If the resource fails the policy, the check fails, and the merge is blocked — exactly like a failing test would be.

## S5 · STEPS — Detection vs remediation

Detection-only finds a violation and reports it — a human still decides and acts. Automated remediation fixes it directly, no human in the loop. Most real architectures start with detection-only, and only move specific, well-understood checks to automated remediation once their detections have proven reliable.

## S6 · OUTRO

Chapter Four is done. Chapter Five moves from architecture into strategy — how an organization actually plans and sequences a governance program using everything covered so far.
