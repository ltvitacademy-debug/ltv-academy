# Lesson 67 — Documentation That Actually Gets Used

**Chapter 3 · Production Data Engineering · Lesson 67 of 70**

## What you'll learn

- Why most documentation goes stale, and what actually prevents it
- Runbooks — the one document every on-call engineer genuinely reads
- Documentation that lives next to the code it describes, not apart from it
- The data contract (Lesson 50) as documentation that enforces itself

## Why documentation usually rots

A wiki page describing "how the taxi pipeline works," written once
at launch, is already stale by the time Lesson 35's transformations
or Lesson 36's routing gets added six months later — nobody
remembers to update a document that lives somewhere separate from
the thing it describes. This isn't laziness; it's structural.
Documentation survives only when something forces it to stay
current, or when it lives close enough to the code that updating one
naturally prompts updating the other.

## The runbook — documentation people actually open

```markdown
## Runbook: Eventstream Disconnected Alert

1. Check the Monitoring Hub (Lesson 16) for the Eventstream's status
2. If disconnected: verify the Event Hub namespace is reachable
   (check Azure Portal, or run `az eventhubs namespace show`)
3. If reachable but still disconnected: restart the Eventstream
   from the Fabric portal
4. If restart doesn't resolve it within 10 minutes: escalate to
   [on-call rotation, Lesson 68]
5. Once resolved: log the incident per Lesson 57's process
```

A **runbook** is a specific, step-by-step response to a specific,
known alert — not a general description of the system, but exactly
what to *do* right now, at 2am, half-awake. This is the one kind of
documentation that survives, because it gets opened during an actual
incident and its gaps get noticed and fixed immediately, rather than
discovered by nobody, ever.

## Documentation that lives next to the code

Lesson 46 already established that Fabric item definitions live in
Git, reviewable as readable text. A README committed in the same
folder as an Eventstream's definition — explaining what it does and
why — gets updated in the same pull request as a change to that
Eventstream, because it's sitting right there, impossible to miss
during review. A README on a separate wiki has no such connection
to anything that would remind someone to update it.

## The data contract as self-enforcing documentation

Lesson 50's data contract is the clearest example of documentation
that can't casually go stale: it's enforced in CI (Lesson 45), so
a change that contradicts it fails the build, not just quietly
diverging from a description nobody's reading anymore. This is the
model worth generalizing wherever possible — documentation that's
checked, not just written.

## Key terms

| Term | Meaning |
|---|---|
| Runbook | A step-by-step response to a specific alert, used during real incidents |
| Docs next to code | Documentation reviewed in the same pull request as the change it describes |
| Self-enforcing docs | A specification (like a data contract) checked automatically, not just written down |

## Check yourself

You're ready for Lesson 68 when you can explain, without looking: why
does a runbook tend to survive and stay accurate while a general
architecture wiki page tends to rot?
