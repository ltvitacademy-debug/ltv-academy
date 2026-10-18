# Version Control Practices for Research Code

Quantum research code has a reproducibility requirement most application code doesn't: a result you report in a paper or a design doc needs to be traceable back to the exact commit, exact dependencies, and exact parameters that produced it, potentially years later.

## What you'll learn

- Why "the code that produced this result" needs to be a specific, retrievable commit, not "whatever's on my laptop"
- A git tagging convention for experiments, tying a result directly to a commit
- What belongs in `.gitignore` for a quantum project (and the one category of file worth a deliberate exception)
- Commit message conventions that record *why* a circuit or parameter changed, not just *what* changed
- How this lesson sets up Lesson 15 (pinning) and Lesson 16 (recording seeds/shots)

## The core requirement: traceable results

If a statistical test result, a resource estimate, or a reported fidelity number can't be traced back to the exact code that produced it, it's not reproducible — it's an anecdote with a number attached. "Traceable" means: given a reported result, you can identify the exact git commit, the exact dependency versions (Lesson 15), and the exact random seed and shot count (Lesson 16) that generated it. This lesson handles the first piece.

## Tag experiments, don't just commit them

A plain commit history tells you what changed over time, but doesn't make it easy to jump straight to "the code that produced the number in section 4.2 of my writeup." Git tags solve this directly:

```bash
git add src/grover_toolkit/
git commit -m "Add resource estimate for 10-qubit Grover search"
git tag -a exp-grover-10q-2026-10-18 -m "Resource estimate reported in docs/results.md section 4.2"
git push origin main --tags
```

A convention like `exp-<short-description>-<date>` makes tags greppable and sortable, and `git show exp-grover-10q-2026-10-18` instantly retrieves the exact snapshot, regardless of how much the main branch has moved since.

## What belongs in `.gitignore` — and the deliberate exception

Standard exclusions apply (virtual environments, `__pycache__`, IDE config). For a quantum project specifically:

```gitignore
# Standard
__pycache__/
*.pyc
.venv/
.ipynb_checkpoints/

# Quantum-specific: large raw result dumps
results/raw_counts/*.json

# Do NOT ignore: small, hand-curated reference results used by tests
!tests/fixtures/expected_counts/*.json
```

The deliberate exception matters: raw experiment dumps (potentially megabytes of per-shot data from a large parameter sweep) don't belong in git, but small, curated "golden" result files that a regression test compares against absolutely do — those files are part of what makes a test suite's claims checkable later, and losing them to a gitignore rule by accident silently weakens the test suite.

## Commit messages that record *why*, not just *what*

A commit message like `"fixed oracle"` is nearly useless to someone (including future you) trying to understand why a reported result changed between two tagged experiments. For quantum research code, prefer a message that states the reasoning:

```
Fix oracle: control/target qubits were swapped in the CX gate

The GHZ fidelity test was failing with a statevector mismatch that
traced to build_oracle() applying cx(i, 0) instead of cx(0, i),
which inverted the entanglement pattern. See test_oracle_structure
in test_ghz.py. Previously-reported fidelity numbers computed before
this commit (tagged exp-ghz-5q-2026-09-30) are invalid and should be
re-run.
```

This single commit message does three jobs a one-line "fixed oracle" message can't: explains the bug mechanism, points to the test that caught it, and explicitly flags which previously-tagged results are now suspect.

## How this connects to the next two lessons

A git tag identifies *which code* produced a result. It doesn't, by itself, guarantee that re-checking out that tag and re-running it reproduces the same numbers — that also requires the exact dependency versions to still be resolvable (Lesson 15, pinning) and the exact random seed and shot count to be recorded somewhere alongside the tag (Lesson 16). All three together are what "reproducible" actually means for a quantum result.

## Key terms

| Term | Meaning |
|---|---|
| Traceable result | A reported numeric result that can be mapped back to the exact commit, dependencies, and parameters that produced it |
| Experiment tag | A git tag (e.g. `exp-grover-10q-2026-10-18`) marking the exact commit that produced a specific reported result |
| Golden result file | A small, hand-curated reference result committed to the repo (e.g. `tests/fixtures/`) that a regression test compares new runs against |
| Reasoning-first commit message | A commit message that explains why a change was made and what it affects, not just a terse description of what changed |

## Check yourself

Six months after reporting a fidelity number, a colleague asks you to re-verify it, but you only remember it came from "sometime last spring." Walk through what this lesson's tagging convention would have needed to exist at the time for that re-verification to be possible today.
