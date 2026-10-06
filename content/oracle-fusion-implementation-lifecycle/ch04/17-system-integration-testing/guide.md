# System Integration Testing

Scripts are written. This lesson covers the first level where they actually get executed: System Integration Testing, or SIT — the project team's own proof that the configured, migrated system works end to end before business users ever touch it.

## What you'll learn

- What SIT is specifically testing, and why "integration" is the key word
- Who runs SIT, and why it's the project team rather than end users
- What entry criteria typically gate SIT, and what exit criteria close it
- How Brightfield's SIT cycle played out for Cash Management

## What SIT actually tests

SIT validates an **integrated, end-to-end business process** — not one screen in isolation, but a full transaction flow across modules and across any system boundaries. For Cash Management, that might mean: an AP payment is issued, it posts to the General Ledger, the bank processes it, a statement comes in, and Cash Management automatically reconciles it — a single business event touching four different parts of the configured system (and, if an integration is involved, a connected external system too). SIT exists specifically to catch the problems that only show up when pieces interact, which unit-level testing inside one module never would.

## Who runs SIT

SIT is run by the **project team** — Functional Consultants testing their own and adjacent modules' scripts, Technical Consultants validating any integrations and extensions, often with the Testing Lead coordinating execution across everyone. Business users generally are not yet involved at this stage; SIT is the team's own quality gate before asking the business to spend its time testing.

## Entry and exit criteria

SIT's **entry criteria** (set in the test plan from Lesson 16) typically require: configuration complete and promoted to the Test environment (Lesson 12), test data loaded (often from a mock conversion cycle, Lesson 15), and test scripts written and traced to the RTM. SIT's **exit criteria** typically require: all critical and high-priority test scripts executed with a passing result, and any open defects (Lesson 19) triaged to an acceptable severity level before the project agrees to move into UAT.

## Brightfield Industrial Group: a SIT cycle

Brightfield's SIT cycle for Cash Management runs test script CM-TS-07 (Lesson 16) end to end: an AP test payment is issued in the Test environment, posts to GL, and a test bank statement file (mimicking the real bank feed) is manually imported to simulate the statement arriving. The auto-match rule reconciles it exactly as designed — but a second scenario, testing a *partial* payment against an invoice, fails: the reconciliation rule doesn't match it automatically. That failure becomes a defect, logged and triaged (Lesson 19) before SIT can close for Cash Management.

## Key terms

| Term | Meaning |
|---|---|
| SIT (System Integration Testing) | Validates an end-to-end process across modules and system boundaries |
| Entry criteria | Conditions that must be met before SIT can begin |
| Exit criteria | Conditions that must be met before SIT can be declared complete |

## Recap

SIT proves the configured, integrated system works end to end, run by the project team itself before business users get involved, gated by entry criteria (configuration and data ready) and exit criteria (scripts passed, defects triaged). Brightfield's SIT cycle caught a real reconciliation gap on partial payments before it ever reached UAT. Next up, lesson 18: User Acceptance Testing, where the business takes over.
