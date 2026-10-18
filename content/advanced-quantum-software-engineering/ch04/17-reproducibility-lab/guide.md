# Reproducibility Lab

Hands-on lab: take an under-specified "trust me, it worked" result and rebuild it into a fully reproducible package — tagged commit, lockfile, and experiment record — then actually attempt to reproduce it as if you were a colleague six months later.

## What you'll learn

- Assembling all three reproducibility layers (Lessons 14–16) for one real experiment, in order
- A reproduction "fire drill": pretending you're someone else trying to rebuild a past result from scratch
- What a reproducibility failure actually looks like in practice, and how to diagnose which layer was missing
- A reusable reproducibility checklist to run before reporting any quantum result
- How this chapter's output feeds into Chapter 5's performance and resource-estimation work

## The starting point: an under-specified result

A shared doc says: "Ran the 4-qubit GHZ fidelity check, got 0.97. Code's on the `experiments` branch somewhere." This sentence is missing every piece this chapter built: no commit, no environment snapshot, no seed, no shot count, no backend version. It is not reproducible, even in principle, as written.

## Step 1: tag the exact commit (Lesson 14)

```bash
git log --oneline -5   # find the actual commit that produced the 0.97 result
git tag -a exp-ghz-4q-fidelity-2026-10-18 -m "GHZ fidelity check, result 0.97, see lab writeup"
git push origin --tags
```

## Step 2: lock and commit the environment (Lesson 15)

```bash
uv lock
git add uv.lock pyproject.toml
git commit -m "Lock environment for GHZ fidelity experiment"
```

## Step 3: assemble and save the experiment record (Lesson 16)

```python
record = ExperimentRecord(
    git_commit="<actual commit hash>",
    experiment_tag="exp-ghz-4q-fidelity-2026-10-18",
    sdk_name="qiskit", sdk_version="1.2.4",
    backend_name="aer-simulator",
    seed_simulator=42, seed_transpiler=7,
    shots=2048, timestamp_utc="2026-10-18T15:00:00Z",
)
save_experiment_record(record, "results/exp-ghz-4q-fidelity-2026-10-18/metadata.json")
```

```bash
git add results/exp-ghz-4q-fidelity-2026-10-18/metadata.json
git commit -m "Add experiment record for GHZ fidelity result 0.97"
```

## Step 4: the fire drill — reproduce it as a stranger would

Clone the repo into a fresh directory (simulating "a colleague with no context, six months later") and follow only what's recorded:

```bash
git clone <repo-url> fresh-checkout && cd fresh-checkout
git checkout exp-ghz-4q-fidelity-2026-10-18
uv sync   # recreate the exact locked environment
python scripts/run_experiment.py \
  --config results/exp-ghz-4q-fidelity-2026-10-18/metadata.json
```

If `run_experiment.py` reads `seed_simulator`, `seed_transpiler`, and `shots` directly from the metadata file rather than requiring anyone to remember or re-type them, the fire drill either reproduces a statistically consistent result (checked via Lesson 7's confidence-level logic, not bit-for-bit equality unless every layer of randomness was pinned) — or it reveals exactly which recorded piece was wrong or missing.

## Diagnosing a reproducibility failure

If the fire drill's result is inconsistent with the original 0.97:

1. Check whether `uv sync` actually reproduced the exact locked versions — a network issue or an unavailable package version (Lesson 15) is the first thing to rule out.
2. Check whether the metadata file actually has all three randomness layers from Lesson 16 (`seed_simulator`, `seed_transpiler`, and any optimizer seed) — a missing one is the single most common cause of a near-miss.
3. Confirm the checked-out commit is exactly the tagged one (Lesson 14), not a descendant with unrecorded further changes.
4. Only after ruling out 1–3, consider whether this is a genuine silent SDK break (Chapter 1, Lesson 3) between what was locked and what's actually resolvable now.

## Reproducibility checklist, to run before reporting any result

- [ ] An experiment tag exists, pointing at the exact commit (Lesson 14)
- [ ] A lockfile is committed alongside that commit, capturing the full resolved environment (Lesson 15)
- [ ] Every layer of randomness used (simulator seed, transpiler seed, optimizer seed) is recorded (Lesson 16)
- [ ] Shot count and backend/version are recorded (Lesson 16)
- [ ] A fresh checkout + `uv sync` + recorded parameters was actually tried once, not assumed to work

## Where this feeds forward

A reproducible experiment record is also the foundation Chapter 5 needs for resource estimation and profiling: estimating "how many shots will this cost" or "how long will this run take" is only meaningful if you're estimating against the same pinned, recorded configuration you'd actually deploy — not an untracked, unreproducible one-off.

## Check yourself

During the fire drill, `uv sync` succeeds and the checked-out commit is correct, but the reproduced fidelity is 0.89 instead of 0.97 — outside what Lesson 7's statistical tolerance would call consistent. List, in order, the first two things from this lesson's diagnostic steps you'd check, and why that order makes sense.
