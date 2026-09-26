# Git & GitHub for Data Scientists

You already know how Git works from the Git & GitHub for Software Engineers course: commits, branches, merges, remotes and pull requests. This lesson does not repeat that. It answers a narrower question: what is different about using Git on a **data science project**? Three things: the project contains big files that do not belong in Git, notebooks are awkward to diff, and an "experiment" is really a change to settings plus a change in results. We use the `churn-project` from lesson 3 and run real Git commands in a scratch repository outside the course repo. The output below is real, apart from lines we trimmed for space. (Git may also print line-ending warnings on Windows; they are harmless and omitted.)

## What you'll learn

- What to commit and what to keep out, using `.gitignore`
- How to keep notebook outputs and run counters out of your history
- How to record an experiment as a branch and read its diff
- How GitHub features (pull requests, templates, size limits) apply to ML work

## Decide what goes in Git

After `git init`, run the project once so it has data and a model, then ask Git what it sees:

```
$ git status --short -uall
?? churn/__pycache__/model.cpython-39.pyc
?? churn/data.py
?? data/raw/customers.csv
?? models/churn.joblib
?? models/metrics.json
?? notebooks/01-explore.ipynb
?? params.yaml
...
```

Compiled `__pycache__` files, the raw data and the trained model are all about to be committed. The CSV here is only 31 KB, but real datasets are gigabytes, and a model file changes on every training run. Git stores the full history of every version, so large binary files bloat the repository forever, even after you delete them. GitHub, as of this writing, warns above 50 MiB and blocks files larger than 100 MiB. Git LFS exists for large files, but for datasets and models the dedicated tools in the next lesson are a better fit.

Our `.gitignore` keeps code and small results, and skips the rest:

```
# Python
__pycache__/
*.pyc
.venv/

# Notebooks
.ipynb_checkpoints/

# Data and models: versioned separately (Chapter 2)
data/
models/*.joblib
```

Note that `models/metrics.json` is **not** ignored. It is a few bytes, and tracking it means a commit records both the settings and the score they produced. `git check-ignore -v` confirms which rule caught which file:

```
$ git check-ignore -v data/raw/customers.csv models/churn.joblib
.gitignore:10:data/   data/raw/customers.csv
.gitignore:11:models/*.joblib   models/churn.joblib
```

## Keep notebooks clean

A `.ipynb` file is JSON that stores your code **and** every output and execution counter. We wrote a notebook with a real `describe()` output, committed it, then re-ran the cell so only the execution counter changed from 3 to 9. Git reports a change:

```
$ git diff
-   "execution_count": 3,
+   "execution_count": 9,
-     "execution_count": 3,
+     "execution_count": 9,
```

Nothing meaningful changed, yet the file is modified. With charts embedded as base64 images, a notebook diff can run to thousands of lines. The fix is to strip outputs when committing. The `nbstripout` tool (version 0.8.2 here) installs a Git filter:

```
nbstripout --install --attributes .gitattributes
```

This writes a `.gitattributes` line, `*.ipynb filter=nbstripout`, and registers the filter in the repository's local `.git/config`. After `git add`, the staged notebook lost its output and counters: 3 insertions and 22 deletions, all boilerplate. Your working copy on disk still shows your outputs, and `git status` stays clean. Two cautions: the filter definition lives in each clone's local config, so every teammate must run the install command once, and stripped notebooks mean a reviewer cannot see results in the diff. Share results as saved charts, metrics files or reports instead. Alternatives such as pairing notebooks with plain-text `.py` files exist; check their current docs if you prefer that route.

## An experiment is a branch

Suppose we want to try a weaker regularization (`C` is the inverse of regularization strength in scikit-learn's logistic regression). Because settings live in `params.yaml`, the whole experiment is a branch with a one-line change:

```
$ git switch -c tune-C
# edit params.yaml: C: 10.0, then retrain
$ python -m churn.train
trained on 750 rows; {'accuracy': 0.776}
$ git commit -a -m "Try C=10 (accuracy 0.768 -> 0.776)"
$ git diff main
-  C: 1.0
+  C: 10.0
-  "accuracy": 0.768
+  "accuracy": 0.776
```

The commit ties the setting to the result. Be careful with the conclusion, though: on a 250-row test set, a gain of 0.008 is two customers. Git records *what* you tried; it cannot tell you whether the difference is real. Chapter 2 adds proper experiment tracking for that.

## GitHub for ML teams

Push the branch to a remote (not run here, since we have no repository to push to) with `git remote add origin <url>` and `git push -u origin tune-C`, then open a pull request. ML changes benefit from a checklist in the description. GitHub reads a template from `.github/pull_request_template.md` in the default branch:

```
## What changed
- [ ] params.yaml / code (which settings?)

## Results
- [ ] Metrics before and after (from models/metrics.json)
- [ ] Test set and data version used

## Checks
- [ ] Notebooks committed without outputs
- [ ] No data or model files added
```

The reviewer sees the settings diff and the metrics diff together, which is exactly what makes ML review possible.

## Recap

Commit code, settings, small metrics files and clean notebooks; ignore data, model binaries, caches and environments, and version those separately. Use `nbstripout` so notebook diffs show real changes. Treat an experiment as a branch whose diff shows settings and results side by side, and use pull-request templates to make reviews consistent. Your code is now versioned, but it only runs if the environment matches. The next lesson makes the environment reproducible too.
