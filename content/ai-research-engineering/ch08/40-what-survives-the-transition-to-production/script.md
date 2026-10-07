# Script — What Survives the Transition to Production

## Segment 1 (title)

Lessons 38 and 39 covered packaging a model and choosing how to serve it. Both can be done perfectly and the handoff can still fail a different way: six months later, nobody can explain what the deployed model actually is relative to the research that produced it. This lesson is about what has to travel with a model so that connection never gets lost.

## Segment 2 (steps)

Four things need to ship with a production model. The commit hash, from git rev-parse HEAD at training time, identifies the exact code. The resolved config — fully expanded, not just the override flags someone typed — identifies the exact hyperparameters. The data version matters because the same code and config against different data still produces a different model. And the eval harness, with its baseline score, is the only way a later regression is even detectable.

## Segment 3 (code)

The eval harness shouldn't stay behind in the research repo — it should become a regression test that runs in CI before any redeploy. Load the production artifact, run the same evaluation that produced the original reported number, and assert the score hasn't dropped below a tolerance. That turns a silently broken redeploy into a failed build instead of a production incident.

## Segment 4 (code)

Bundling commit hash, config snapshot, data version, eval score, and export details into a single production manifest makes the full picture one lookup instead of a cross-team archaeology project. Stored right alongside the model artifact itself, loading the model and reading its lineage stay the same action, which is what keeps them from drifting apart over time.

## Segment 5 (outro)

Lineage answers where a production model came from. It doesn't yet answer what happens after it's running — what production actually observes should flow back into the next research cycle. Lesson 41 closes the loop on that.
