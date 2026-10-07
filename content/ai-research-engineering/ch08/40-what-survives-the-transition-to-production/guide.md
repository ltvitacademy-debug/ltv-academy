# What Survives the Transition to Production

Lessons 38 and 39 covered packaging a model and choosing how to serve it. Both can be done perfectly and the handoff can still fail a different way: six months later, nobody can explain what the deployed model actually is relative to the research that produced it. This lesson is about the specific artifacts that have to travel with a model into production so that connection never gets lost.

## What you'll learn

- Why a production model disconnected from its training lineage becomes unmaintainable, not just undocumented
- What an eval harness is and why it has to travel with the model, not stay behind in the research repo
- Which three pieces of lineage information (commit hash, resolved config, data version) must ship with every production artifact
- How to package all of this as a single production manifest instead of scattered tribal knowledge

## The lineage problem: a model with no history

Chapter 3's lesson on version control (Lesson 16) established a rule for research runs: given a result, you should be able to recover the exact code that produced it, via a logged commit hash and a resolved config snapshot. That rule doesn't stop mattering once a model ships — it matters more, because a production incident six months out is a much higher-stakes version of "can you show me the exact code behind this number" than a reviewer's question in a research meeting.

A production model with no recoverable lineage turns every future question — "can we retrain this with the newer dataset," "did this regression start with a code change or a data change," "is this still the model from the paper or a since-updated one" — into an investigation instead of a lookup.

## The eval harness travels with the model

The eval harness is the script (or test suite) that computed the metric reported at handoff time. Leaving it behind in the research repo means the production team has no way to tell, later, whether a new deployment regressed on the metric that justified shipping the original one. Treat it as a regression test that runs before any redeploy:

```python
# tests/test_model_regression.py
import torch
from eval.run_eval import evaluate

BASELINE_ACCURACY = 0.762  # from the original handoff's eval harness
TOLERANCE = 0.01

def test_no_accuracy_regression():
    model = torch.jit.load("model_production.pt")
    score = evaluate(model, dataset="holdout_v2.3")
    assert score >= BASELINE_ACCURACY - TOLERANCE, (
        f"Accuracy {score:.3f} regressed below baseline {BASELINE_ACCURACY:.3f}"
    )
```

Wiring this into CI means a quantized export, a re-trained checkpoint, or a dependency bump that silently breaks the model fails a build instead of failing in production.

## Documentation and config lineage

Three specific pieces of information need to ship with the artifact, not live only in someone's memory or a since-deleted Slack thread:

- **Commit hash** — `git rev-parse HEAD` at training time (Lesson 16's mechanism), identifying the exact code
- **Resolved config** — the fully-expanded Hydra config for the training run that produced the shipped checkpoint, not just the override flags someone typed
- **Data version** — which version of the training dataset was used, since the same code and config against different data produces a different model

Any one of these missing breaks the chain. A commit hash with no config tells you the code but not the hyperparameters that code ran with; a config with no data version tells you the recipe but not which ingredients.

## A production manifest

Bundling lineage, eval results, and export details into one file makes the full picture retrievable with one read instead of a cross-team archaeology project:

```json
{
  "model_name": "sparse-attention-classifier-v3",
  "commit_hash": "a3f91c2",
  "config_snapshot": "configs/resolved/run_214.yaml",
  "data_version": "internal_dataset_v2.3",
  "eval_harness": "eval/run_eval.py",
  "eval_score": 0.762,
  "export_format": "onnx",
  "opset_version": 17,
  "created_at": "2026-09-30T00:00:00Z",
  "owner": "research-infra-team"
}
```

Store this manifest alongside the artifact (same model registry entry, same storage path) so loading the model and reading its lineage are the same lookup, not two separate ones that can drift apart.

## Key terms

- **Lineage** — the recoverable chain from a production model back to the exact code, config, and data that produced it
- **Eval harness** — the script or test suite that computes the metric a model was shipped on; the same harness, run against new artifacts, is what detects regressions
- **Data version** — an identifier for the specific snapshot of training data used, since the same code and config can still produce a different model against different data
- **Production manifest** — a single artifact bundling lineage, eval results, and export metadata so a model's provenance is one lookup, not an investigation
