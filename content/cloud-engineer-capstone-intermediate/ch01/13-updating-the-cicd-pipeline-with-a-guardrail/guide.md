# Lesson 13 — Updating the CI/CD Pipeline with a Guardrail

**Chapter 1 · Intermediate Capstone: Containers, CI/CD, and a Real Misconfiguration · Lesson 13 of 16**

## What you'll learn

- Why both Lesson 10 and Lesson 11's mistakes share the same real failure mode: nothing checked
  the change before it shipped, even though a human reviewer could have
- How to extend Lesson 5's GitHub Actions pipeline, using the same `terraform plan` + PR-comment
  pattern from Lesson 25's pattern, to inspect the plan's actual JSON output before merge
- The exact two checks that would have caught both of this chapter's mistakes automatically
- Why a guardrail should fail the pull request loudly, with an override path for genuinely
  intentional cases, instead of silently warning and letting the merge through anyway

## The same failure mode, twice

Lesson 10's autoscaling floor and Lesson 11's bucket policy look unrelated — different clouds,
different services, different people made each mistake. But they share one root cause: both
changes went through a pull request, and nothing in that pull request's checks actually looked at
*what the change would do* — only whether the Terraform syntax was valid and the plan would apply
cleanly. A `terraform plan` that says "this will succeed" says nothing about whether ten replicas
or a wildcard principal is a good idea.

That's the gap this lesson closes: not a new review habit that depends on a human remembering to
look closely every time, but an automated check that looks every time, whether anyone remembers to
or not.

## Reading the plan's actual content, not just its exit code

Lesson 5's pipeline already runs `terraform plan` on every pull request, following the same shape
covered in the real CI/CD lessons for this project: trigger on `pull_request`, run the plan, post
it as a comment. The guardrail adds one more step that converts the plan into a format a script
can actually inspect:

```yaml
      - name: Terraform Plan (JSON)
        run: |
          terraform plan -out=tfplan
          terraform show -json tfplan > plan.json

      - name: Guardrail — scaling floor and bucket policy
        run: python scripts/ci/check_guardrails.py plan.json
```

## Check one: an unreasonably high replica floor

```python
# scripts/ci/check_guardrails.py (excerpt)
MAX_STANDARD_MIN_REPLICAS = 4

for change in plan["resource_changes"]:
    if change["type"] == "kubernetes_horizontal_pod_autoscaler_v2":
        min_replicas = change["change"]["after"]["spec"][0]["min_replicas"]
        if min_replicas > MAX_STANDARD_MIN_REPLICAS and "peak-season-override" not in pr_labels:
            fail(f"minReplicas={min_replicas} exceeds {MAX_STANDARD_MIN_REPLICAS}. "
                 f"Add the 'peak-season-override' label if this is intentional.")
```

A floor above 4 isn't banned outright — a real peak-season event is a legitimate reason to raise
it — but it now requires someone to deliberately apply a `peak-season-override` label to the pull
request, turning a silent copy-paste into a visible, intentional decision someone has to make and
justify.

## Check two: an overly permissive bucket policy

```python
for change in plan["resource_changes"]:
    if change["type"] == "aws_s3_bucket_policy":
        statements = json.loads(change["change"]["after"]["policy"])["Statement"]
        for stmt in statements:
            if stmt.get("Principal") == "*" and not stmt.get("Condition"):
                fail("Bucket policy grants Principal \"*\" with no Condition. "
                     "Scope to a specific role ARN or add an explicit Condition.")
```

This check would have failed Lesson 6's original pull request outright — before the bucket was
ever created with a public-facing policy, instead of waiting for a review pass days or weeks
later to notice a "Not blocked" banner.

## Failing loudly, with a real override path

Both checks exit non-zero on a failure, which fails the GitHub Actions job, which — with branch
protection requiring that status check — blocks the merge button entirely. The pipeline also posts
a comment explaining exactly which rule tripped and why, using the same `actions/github-script`
approach already in place for posting the plan itself. The override isn't "ignore the warning and
merge anyway" — it's a deliberate, visible label that shows up in the PR history, so a legitimate
peak-season change is still fast, but an accidental one no longer ships silently.

## What this actually buys Driftwood

Neither of this chapter's two mistakes required unusual skill to make — a copy-pasted module
reference, a quick-start policy snippet with the wildcard left in. That's exactly why a guardrail
belongs in the pipeline instead of in a checklist someone has to remember: the checklist works
until the one time someone's in a hurry, and the pipeline doesn't get tired or distracted.

## Key terms

| Term | Meaning |
|---|---|
| `terraform show -json` | Converts a Terraform plan into structured JSON a script can inspect programmatically |
| Guardrail | An automated check in CI/CD that blocks a change meeting a defined risky pattern, rather than relying on manual review to catch it |
| Branch protection | The GitHub setting that makes a status check's pass/fail actually block the merge button |
| Override label | A deliberate, visible marker on a pull request that lets an intentional exception bypass a guardrail without disabling it |

## Lab

Write the guardrail rule, in plain English, that would have caught Lesson 10's mistake if it had
been in place during Lesson 4's original pull request — including what override, if any, should
have been required to let it through anyway.

## Check yourself

You're ready for Lesson 14 when you can explain, without looking: why does a guardrail that fails
loudly with an override label serve Driftwood better than one that only posts a warning comment
and still lets the merge go through?
