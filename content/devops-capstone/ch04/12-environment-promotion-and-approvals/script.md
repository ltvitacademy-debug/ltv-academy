# Script — Environment Promotion & Approvals

## Segment 1 (title)

Lesson 11 covered how main deploys to northbridge-dev on every merge, automatically and constantly. Staging and production run on a completely different rhythm — a deliberate, versioned decision. This lesson covers tag-based promotion and the approval gate that guards production.

## Segment 2 (steps)

A maintainer decides main is ready to ship, and cuts a semver tag like v1.5.0, then pushes it. That tag push triggers a separate workflow that deploys to staging automatically — no approval needed, because cutting the tag itself is the deliberate act. Staging actually runs in the northbridge-staging namespace on the same northbridge-aks-dev cluster dev uses, the cost-saving choice made back in Phase 2.

## Segment 3 (code)

The production job is identical in shape to the staging job — same login step, same helm upgrade install pattern — except for one line: environment production. That's a GitHub Environment configured with a protection rule requiring one reviewer's approval. When the job reaches that point it just pauses. Nothing runs until someone approves. Only then does it log into the isolated northbridge-aks-prod cluster and deploy.

## Segment 4 (steps)

If a promoted release turns out to be bad, there are two ways back. Helm rollback reverts the whole release to its previous revision in one command — the fastest option, and usually what you want right after a bad promotion. Or you can explicitly redeploy a prior, known-good image tag with helm upgrade and set image dot tag — more deliberate, useful when you want to be precise about exactly which commit you're returning to. Both only work because every image is SHA-tagged and Helm keeps a revision history.

## Segment 5 (outro)

You've now seen every piece of the pipeline separately: CI, automatic dev deploys, and gated promotion. Lesson 13 walks one real commit through all of it, start to finish.
