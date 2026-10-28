# Lesson 31 — Case Study: A Script That Prevented an Outage

**Chapter 8 · Capstone: An Automated Operations Toolkit · Lesson 31 of 32**

## What you'll learn

- How the compliance-checking script from Lesson 30, running nightly from a pipeline instead of
  a laptop, caught a dangerous manual change the same night it happened
- Why running from a pipeline — not a laptop — is the specific reason anyone noticed at all
- How Chapter 7's source-control and secrets practices turn a script into something a team can
  actually trust to run unattended, every night, without exception
- Why this is a realistic story, not a worst-case scenario built for effect: the kind of
  near-miss that automation like this exists to catch

## The setup: a tag cleanup that went one tag too far

Thornfield Analytics' platform team spent an afternoon standardizing tag casing across the
subscription — `costcenter` became `CostCenter`, `owner` became `Owner`, that kind of cleanup.
Working through the portal resource by resource, one engineer reached `sql-prod-01`, the
production database VM backing Thornfield's billing system, tagged `Tier: Critical` and
`DoNotDelete: true`. While re-typing its tags to fix the casing, the engineer retyped
`CostCenter` and `Owner` correctly — and simply forgot to re-add `DoNotDelete`. The portal saved
the change without complaint. Nothing about removing a tag looks dangerous in the moment; it's
just an empty field where a value used to be.

## Why a nightly pipeline run is what actually caught it

Here is where Lesson 30's script, and Chapter 7's insistence that it run from a pipeline rather
than a laptop, earned its keep. Thornfield had since extended that script's `REQUIRED_TAGS`
check with one more rule specifically for production resources: anything tagged `Tier: Critical`
must also carry `DoNotDelete: true`, or it's a violation. That rule had sat quietly passing,
night after night, for months — because it was running automatically, on a schedule, with no
one needing to remember to kick it off.

```python
if tags.get("Tier") == "Critical" and tags.get("DoNotDelete") != "true":
    violations.append({
        "resource": resource.name,
        "type": resource.type,
        "missing_tags": "DoNotDelete (required for Tier: Critical)",
    })
```

That night's run found exactly one violation: `sql-prod-01`. The script wrote it to the CSV
artifact and exited with status `1`, same as it would for any other violation — it had no idea
this one was more dangerous than a routine missing `CostCenter` tag. It didn't need to know. It
just had to run, every night, without fail, and flag what it found. If this script had lived on
an engineer's laptop, run "whenever someone remembered," there's no guarantee anyone would have
run it that week at all — the tag cleanup and the next scheduled check might never have
intersected before something worse happened.

## Why the timing mattered

Thornfield also runs a separate, unrelated operational script — built on the same pattern as
Lesson 29's, the kind Chapter 6 covers — that scans for stopped-or-idle resources older than 30
days without a `DoNotDelete` tag and deletes them to control cost. `sql-prod-01` wasn't stopped,
so that particular script wouldn't have touched it directly — but the missing tag meant it was
now one routine change away from qualifying for cleanup the next time someone paused it for
maintenance, with nothing left in its tags to stop a cleanup script from treating it as
disposable. The pipeline's failed check that night triggered an alert; a platform engineer saw
`sql-prod-01` on the violations report the next morning, recognized the resource immediately,
and restored the `DoNotDelete` tag before anything else touched it. Nobody had to remember to
check on the VM. The report told them exactly which resource needed attention and why.

## What Chapter 7 actually gets credit for

It would be easy to say "a tag check caught a mistake" and leave it there, but the specific
practices Chapter 7 taught are what made that possible, not luck:

- **Running from a pipeline, not a laptop (Lesson 26).** The check ran that night regardless of
  who was in the office, who remembered, or who was on vacation. A script's reliability depends
  entirely on it actually running, and a pipeline trigger doesn't forget.
- **Source control (Lesson 25).** The `Tier: Critical` rule had been added to the script as a
  reviewed, versioned change, not a one-off edit someone made locally and forgot to save anywhere
  else — so the rule that caught this was the same rule every run used, consistently.
- **Secrets handled by the pipeline, not hardcoded (Lesson 27).** The script authenticated using
  the pipeline's own service principal, the same `DefaultAzureCredential` pattern from Lesson 30 —
  so it could run unattended without anyone's personal credentials sitting in a config file
  somewhere, waiting to go stale or leak.

## Key terms

| Term | Meaning |
|---|---|
| Near-miss | A failure that almost happened but was caught before causing real damage |
| `Tier: Critical` | A tag convention marking a resource as production-critical, carrying stricter compliance rules |
| Unattended automation | A script that runs on its own schedule, independent of any person remembering to trigger it |
| Service principal | A non-human Azure identity a pipeline authenticates as, instead of a person's own credentials |

## Check yourself

You're ready for Lesson 32 when you can explain, without looking: if Lesson 30's compliance
script had been something an engineer ran manually "when they had time" instead of a nightly
pipeline job, what specifically would have had to go right for `sql-prod-01`'s missing tag to
still get caught in time — and why shouldn't a team depend on that?
