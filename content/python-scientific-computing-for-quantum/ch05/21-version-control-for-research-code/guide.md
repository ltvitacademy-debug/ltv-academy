# Version Control for Research Code

"Which version of the code produced the number in Figure 3?" is a question every research project eventually has to answer, and "I'm not sure, I've changed the gate matrix a few times since then" is not an answer anyone can build on. Git exists to make that question always answerable.

## What you'll learn

- Why research code needs version control as much as production software does
- How to write commit messages that connect a code change to a numeric result
- How to use a git tag to pin the exact code that produced a specific published number
- What belongs in a commit, and what belongs in `.gitignore` instead
- A simple, honest workflow for when a result changes after a code fix

## Why "it's just research code" isn't an exemption

It's tempting to think version control is overhead that only "real" software projects need, and that a personal quantum-simulation script can skip it. The opposite is true: research code is exactly where you most need to answer "what did the code look like when it produced this result?" — and without git, the honest answer after a few weeks of edits is usually "I don't know." A `git log` is a dated, ordered record of every change, which a folder of files named `simulate_v2_final_FINAL.py` can never reliably provide.

## Commit messages that connect code to results

A commit message for research code is most useful when it says *why* a change was made, especially when the change affects a numeric result:

```bash
git add src/gates.py
git commit -m "Fix sign error in CNOT control-qubit projector

Previous version used P1 = outer(ket0, ket0) by mistake instead of
outer(ket1, ket1), which silently flipped the target qubit when the
control was |0> instead of |1>. Confirmed fix against the standard
CNOT truth table."
```

Compare that to `git commit -m "fix bug"` — both commits change the same lines, but only the first one tells a future reader (including future you) *what* was wrong and *why* the new version is trustworthy. For a numerical project, a good habit is: if a commit changes a number that appears anywhere in a result file, a plot, or a writeup, say so explicitly in the message.

## Tagging the exact code behind a published number

If a specific result — "Bell state fidelity = 0.9987, reported in the project writeup" — depends on a specific state of the code, a git tag lets you mark that exact commit permanently, so it can be found again even after dozens of later commits:

```bash
git tag -a v1.0-bell-fidelity-result -m "Code state that produced the 0.9987 fidelity result in the writeup"
git push origin v1.0-bell-fidelity-result
```

Later, `git checkout v1.0-bell-fidelity-result` reconstructs exactly the code that produced that number, regardless of how much the `main` branch has changed since. This is the version-control equivalent of the "document the seed and tolerance" habit from the previous lesson — both exist so a specific numeric claim can be traced back to exactly what produced it.

## What belongs in a commit, and what doesn't

Source files (`src/`, `tests/`, `notebooks/`) and small, specific result files belong in commits. Large generated artifacts — a multi-gigabyte array of simulated shot data, or every intermediate `.ipynb_checkpoints/` autosave — generally don't, because they bloat the repository's history without adding information that can't be regenerated from the code plus its seed:

```
# .gitignore
__pycache__/
.ipynb_checkpoints/
*.pyc
results/raw_shot_data/
```

A small, final, important number (the 0.9987 fidelity result itself, saved as a tiny JSON file) is the exception — it's worth committing precisely because it's small and because it's the specific claim later commits should be checked against.

## An honest workflow for when a result changes

Fixing a real bug in simulation code will sometimes change a previously reported number — that's expected, and hiding it is the actual problem, not the change itself. The honest workflow is: commit the fix with a message explaining what was wrong (as above), update the result file with the new number, and — if the old number was ever published or shared — note explicitly that it has changed and why, rather than silently overwriting it with no trace. Git's history already preserves the old value in the commit log; the responsibility is to make sure anyone relying on the old number finds out it changed.

## Key terms

| Term | Meaning |
|---|---|
| Commit message | A description attached to a saved code change; for research code, ideally explains *why* the change was made and whether it affects a numeric result |
| Git tag | A permanent, named marker on a specific commit, used here to pin the exact code version that produced a specific published result |
| `git checkout <tag>` | Restores the repository to exactly the state recorded by that tag, letting you reconstruct the code behind an old result |
| `.gitignore` | Lists file patterns git should not track, typically large, regeneratable simulation output |
| Reproducibility trail | The combination of a tagged commit, a documented seed, and a documented tolerance that together let someone trace a result back to exactly how it was produced |

## Check yourself

Six months after publishing a quantum simulation result, you discover the gate matrix used had a sign error, and the corrected code gives a different fidelity value. Using the tools from this lesson, what should your workflow be to both fix the bug and handle the now-outdated published number honestly?
