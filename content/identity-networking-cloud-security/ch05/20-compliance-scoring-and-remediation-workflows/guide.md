# Lesson 20 — Compliance Scoring and Remediation Workflows

**Chapter 5 · Cloud Security Posture Management · Lesson 4 of 4**

## What you'll learn

- What a compliance score actually represents, and why it's only meaningful relative to the
  benchmark it was measured against
- The four-step remediation workflow a real finding follows from detection to confirmed fix
- The difference between auto-remediation and a manual fix, and when each one applies
- Why re-scanning after a fix is the step that turns "we think it's fixed" into a confirmed result

## What a compliance score actually is

A **compliance score** is a percentage: the number of checks a CSPM tool ran against a chosen
benchmark, divided into however many of those checks actually passed. Run 340 checks against an
environment using the **CIS Benchmark**, pass 312 of them, and the reported score is 91.8%. That
number is only meaningful *relative to the benchmark it was measured against* — a score from the
CIS Benchmark and a score from PCI DSS aren't directly comparable, because each one is measuring
the environment against a different checklist of requirements.

```
Compliance score =
    checks passed
    ------------------
    checks in the benchmark

e.g. CIS Benchmark:
    312 of 340 checks passed
    = 91.8%
```

## The remediation workflow

A compliance score is just a summary. Behind it, every individual finding moves through the same
four-step workflow:

1. **Surface** — a CSPM scan produces a specific, actionable finding, such as an open port or a
   public bucket.
2. **Assign** — the finding is routed to the team or owner actually positioned to fix it. A
   finding nobody owns never gets fixed.
3. **Fix** — the finding is remediated, either automatically through a pre-approved playbook or
   manually by someone making the change by hand.
4. **Re-scan** — the environment is scanned again to confirm the finding is actually gone, not
   just marked resolved.

## Auto-remediated vs. manual

That third step splits two ways:

- **Auto-remediation** applies a pre-approved, scripted fix with no human in the loop — ideal for
  a clear-cut case like closing an exposed port, where there's no judgment call involved.
- **Manual fix** is for cases that genuinely need a judgment call: deciding whether a broad IAM
  permission is actually needed for a legitimate reason, and narrowing it appropriately rather
  than just revoking it outright.

Re-scanning afterward applies to both paths equally — it's what turns either one from "we think we
fixed it" into a confirmed result, rather than trusting that the fix worked.

## A concrete example

A CSPM scan surfaces a finding: a security group allows `0.0.0.0/0` on port 22. The finding is
assigned to the infrastructure team that owns that resource. Because this specific case is
clear-cut — no legitimate reason requires SSH open to the entire internet — a pre-approved
automation auto-remediates it by narrowing the rule to the organization's own IP ranges. The
environment is re-scanned on its next pass, confirms the rule no longer matches the finding
criteria, and the finding closes. The environment's compliance score against its chosen benchmark
ticks up by exactly one check's worth, out of however many the benchmark contains.

## Key terms

| Term | Meaning |
|---|---|
| Compliance score | The percentage of checks passed against one specific chosen benchmark |
| CIS Benchmark | A widely used security best-practice benchmark CSPM tools commonly score against |
| Remediation workflow | Surface -> assign -> fix -> re-scan: how a finding moves from detection to confirmed resolution |
| Auto-remediation | A pre-approved, scripted fix applied automatically with no human step |
| Manual fix | A remediation that requires a person's judgment before changing the resource |

## Check yourself

An environment scores 88% against the CIS Benchmark and 95% against PCI DSS. Explain why it would
be wrong to conclude the environment is "more compliant with PCI DSS than with CIS" based on those
two numbers alone.
