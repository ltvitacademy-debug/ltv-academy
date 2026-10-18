# Pinning SDK Versions — and Why It Matters More Here

Chapter 1 introduced exact pinning as a defense against silent breaks. This lesson treats pinning specifically as a reproducibility requirement: if you can't reinstall the exact environment that produced a result, a git tag (Lesson 14) only gets you half the way to reproducing it.

## What you'll learn

- Why pinning is a reproducibility concern, not just a stability concern
- How to snapshot an entire resolved environment, not just top-level packages
- Tying a pinned environment to a specific experiment tag
- What to do when a result was produced under a dependency version you can no longer install
- A worked scenario: reproducing a six-month-old result step by step

## Pinning as reproducibility, not just stability

Chapter 1, Lesson 3 argued for exact pins because quantum SDKs have more frequent breaking changes, including silent ones, than typical classical libraries. That's a *stability* argument — it protects you going forward. There's a second, equally important *reproducibility* argument: if `qiskit==1.1.0` produced a specific statevector for a specific circuit, and `qiskit==1.2.4` produces a numerically different statevector for the identical circuit due to a changed default somewhere in the transpiler, then "the code" alone (Lesson 14's git tag) is not enough to reproduce the original number. You also need the exact dependency snapshot active at the time.

## Snapshot the whole resolved environment

A `pyproject.toml` with `qiskit==1.2.4` pinned is necessary but not sufficient — it pins the *direct* dependency, not qiskit's own internal dependencies (`rustworkx`, `symengine`, etc.), which can still resolve differently across machines or time without a full lockfile:

```bash
# Generate a full lockfile capturing the entire resolved dependency tree
uv lock
# Or, for a pip-based workflow, freeze everything that's actually installed:
pip freeze > requirements-lock-exp-grover-10q-2026-10-18.txt
```

Naming the frozen snapshot after the experiment tag (Lesson 14) makes the connection between "this result" and "this exact environment" explicit and searchable, rather than implicit and easy to lose.

## Tying the environment to the experiment tag

Extend Lesson 14's tagging practice: commit the lockfile alongside the tagged commit, so retrieving the tag also retrieves the exact environment:

```bash
git add uv.lock
git commit -m "Lock environment for 10-qubit Grover resource estimate"
git tag -a exp-grover-10q-2026-10-18 -m "Resource estimate + locked environment, see docs/results.md 4.2"
git push origin main --tags
```

Now `git show exp-grover-10q-2026-10-18:uv.lock` retrieves the exact dependency tree active when the result was produced, with no separate record-keeping required outside git itself.

## When you can no longer install the exact pinned version

Over enough time, a pinned version may become genuinely uninstallable — a package index removes an old release, or it's incompatible with a newer Python version you're now forced to use. When this happens:

1. Document explicitly that exact reproduction is no longer possible, rather than silently re-running on a different version and reporting the same old number as if nothing changed.
2. Re-run the experiment under the closest currently-installable version, and report the new result as a *new*, separately tagged experiment — not a patch to the old one.
3. If the discrepancy between old and new results matters, that discrepancy is itself worth investigating and documenting (it may reveal a silent break, per Lesson 3) rather than quietly discarding whichever number is inconvenient.

## Worked scenario: reproducing a six-month-old result

A colleague asks you to re-verify a fidelity number reported six months ago. The process, assuming Lessons 14–15 were followed at the time:

1. `git show exp-ghz-5q-2026-04-10` retrieves the exact commit.
2. `git show exp-ghz-5q-2026-04-10:uv.lock` retrieves the exact dependency snapshot from that commit.
3. `uv sync` (or `pip install -r` the frozen requirements) recreates that exact environment in a fresh virtual environment.
4. Lesson 16's recorded random seed and shot count let you re-run the identical statistical test with the identical inputs.
5. Compare the re-run result against the originally reported number, within the statistical test's own documented confidence level (Lesson 7) — not expecting bit-for-bit identical raw counts if any randomness wasn't fully pinned, but a statistically consistent result.

Without steps 1–2 having been done at the time, step 3 either reconstructs the wrong environment or becomes outright impossible.

## Key terms

| Term | Meaning |
|---|---|
| Resolved environment | The complete set of exact versions of every dependency, direct and transitive, actually installed for a given run |
| Lockfile | A file capturing a full resolved environment, enabling it to be recreated exactly later (introduced in Chapter 1) |
| Uninstallable pin | A previously pinned dependency version that can no longer be installed due to index removal or platform incompatibility |
| Re-tagged re-run | Re-running an experiment under a new dependency version and recording it as a new, separately tagged experiment rather than silently overwriting the old result |

## Check yourself

A reported result's git tag exists, but no lockfile was ever committed alongside it — only a `pyproject.toml` with `qiskit>=1.0` (a range, not an exact pin). Explain concretely what information is now missing to reproduce that result, even though the exact code commit is still retrievable.
