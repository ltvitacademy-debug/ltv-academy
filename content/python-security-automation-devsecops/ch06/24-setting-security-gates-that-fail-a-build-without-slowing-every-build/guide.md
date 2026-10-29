# Lesson 24 — Setting Security Gates That Fail a Build Without Slowing Every Build

**Chapter 6 · DevSecOps Fundamentals · Lesson 4 of 4**

## What you'll learn

- Why a pipeline that fails the build on every scan finding, regardless of
  severity, trains developers to ignore the pipeline entirely
- How to design a security gate around severity thresholds instead — block
  on what's actually dangerous, warn on the rest
- How to keep pre-existing findings from blocking every future build
  through a baseline, so the gate only fires on genuinely new risk
- How to read a real gate implementation that fails a job based on scan
  output, rather than on the mere presence of any finding at all

## The failure mode: a gate nobody respects

You now have four kinds of automated security checks from this chapter:
SAST, dependency scanning, DAST, and container image scanning. The
tempting next step is to wire all four into CI and fail the build the
moment any of them reports anything. In practice, that approach fails
within weeks — not because the checks are wrong, but because of how
people respond to them. A scanner that blocks merges over a Low-severity
style finding in a logging statement teaches developers one lesson very
quickly: this pipeline is noise, and the fastest way to ship is to find a
way around it, whether that's a suppression comment nobody reviews, a
rushed "just disable the check" pull request, or simply getting good at
ignoring red X marks. Once a team learns to tune out a security gate, it
has stopped functioning as a gate at all — it's just a failing status
check everyone clicks past.

## Gate on severity, not on presence

The fix isn't fewer checks — it's a smarter gate. Every scanner in this
chapter reports a **severity** for each finding, typically something like
Critical, High, Medium, and Low. A well-designed gate uses that severity
to decide what actually blocks a merge or a deploy:

- **Critical and High findings fail the build.** These represent real,
  exploitable risk — a confirmed injection pattern, a dependency with a
  disclosed severe vulnerability, a container image shipping a critical
  OS-level flaw. Blocking here is the whole point of having the checks.
- **Medium findings surface as a warning, not a blocker.** They show up as
  a pull-request annotation or a ticket for the team to triage on its own
  schedule, but they don't stop the merge. This is deliberate: Medium
  findings are often real but lower-urgency, and treating every one as a
  hard stop is exactly what trains developers to ignore the tool.
- **Low findings get logged, not surfaced loudly.** They accumulate in a
  dashboard for periodic review rather than interrupting anyone's day.

This is the same shift-left-but-not-shift-everything-to-a-screeching-halt
principle you'll see across any mature DevSecOps pipeline: the loudest
signal should be reserved for the findings that actually deserve it.

## Don't let old findings block new work

A scanner turned on for the first time against an existing codebase will
usually surface a backlog of pre-existing issues that predate the gate
itself. If the gate blocks on all of them immediately, every team's first
pull request after the rollout fails — for work that has nothing to do
with the new code being merged. The standard fix is a **baseline**: record
the findings that exist at rollout time, and configure the gate to fail
only on *new* findings introduced after that point, while the pre-existing
backlog gets triaged separately, on its own timeline, without blocking
unrelated work.

## A real gate, reading severity from scan output

```yaml
- name: Run dependency scan
  run: pip-audit -r requirements.txt -f json -o audit.json || true

- name: Evaluate the gate
  run: |
    python - <<'EOF'
    import json, sys

    with open("audit.json") as f:
        findings = json.load(f)

    severities = [f["severity"] for f in findings.get("dependencies", [])]
    critical_or_high = [s for s in severities if s in ("CRITICAL", "HIGH")]
    medium = [s for s in severities if s == "MEDIUM"]

    if critical_or_high:
        print(f"BLOCKING: {len(critical_or_high)} critical/high finding(s)")
        sys.exit(1)
    if medium:
        print(f"WARNING: {len(medium)} medium finding(s) -- not blocking")
    sys.exit(0)
    EOF
```

The scan step itself never fails the job (`|| true`); a separate
evaluation step reads the structured output and makes the actual pass/fail
decision based on severity. That separation — scan, then decide — is what
makes it possible to apply the same severity policy consistently across
SAST, dependency scanning, DAST, and image scanning, even though each
produces a different report format.

## Keep tuning it

A gate's thresholds aren't a one-time decision. Teams revisit them as they
learn which finding categories turn out to matter and which don't, and as
scanners themselves get noisier or quieter with new rule sets. The goal
stays constant through every adjustment: developers should trust that a
failed build means something real, so that when the gate does fire, they
fix it instead of looking for a way around it.

## Key terms

| Term | Meaning |
|---|---|
| Security gate | A pipeline step that fails a build or blocks a deploy based on scan results |
| Severity threshold | The rule that decides which severities (e.g. Critical/High) actually block, versus which (Medium/Low) only warn |
| Baseline | A recorded snapshot of pre-existing findings, used so a gate only fails on genuinely new issues |
| Alert fatigue | The point at which developers stop trusting or acting on a tool's warnings because too many of them weren't worth acting on |

## Check yourself

This closes Chapter 6. You're ready for Chapter 7 when you can design, on
your own, a severity policy for a hypothetical pipeline — stating exactly
which severities block, which only warn, and how you'd keep a first-time
scan of an existing codebase from blocking every team's very next pull
request.
