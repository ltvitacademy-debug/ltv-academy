# Lesson 12 — .gitignore for Data Projects

**Chapter 3 · Git for Data Projects Specifically · Lesson 12 of 25**

## What you'll learn

- What `.gitignore` actually does, and why it only affects untracked files
- The specific files data projects accidentally commit that they shouldn't
- Writing a real `.gitignore` for a dbt project or a folder of notebooks
- Removing a file from tracking that was already committed by mistake

## What .gitignore actually does

A `.gitignore` file tells Git which untracked files to leave alone —
never stage them automatically, never flag them as "untracked" in
`git status`. It's a plain text file, one pattern per line, that lives
at the root of a repository (or a subfolder, for scoped rules):

```
*.csv
.env
__pycache__/
target/
.ipynb_checkpoints/
```

Critically, `.gitignore` only affects files Git **doesn't already
track**. Adding a pattern for a file you've already committed does
nothing — that file needs to be explicitly untracked first, covered
below.

## What data projects specifically leak into Git

Every one of these has happened on a real team, and each is exactly
the kind of thing `.gitignore` exists to prevent:

- **Credentials** — a `.env` file with a database password or an API
  key, committed once, permanently in the repository's history even
  after it's deleted from the latest commit.
- **Large raw data files** — a 400MB CSV export, committed "just this
  once," that now makes every future clone of the repository slower.
- **Local database files** — a `.db` or `.sqlite` file from local
  testing, environment-specific and useless to anyone else who clones
  the repo.
- **dbt's `target/` directory** — compiled SQL and run artifacts dbt
  regenerates on every run. Committing it just creates merge conflicts
  on files nobody should be editing by hand.
- **Jupyter's `.ipynb_checkpoints/`** — autosave copies Jupyter creates
  alongside every notebook, redundant with the notebook itself.

## A real .gitignore for a data project

```
# Environment & secrets
.env
.env.local
*.pem

# Data
*.csv
*.parquet
data/raw/

# dbt
target/
dbt_packages/
logs/

# Notebooks
.ipynb_checkpoints/

# Python
__pycache__/
*.pyc
venv/
```

Adapt the data-file patterns to what your project actually generates —
some teams *do* want small reference CSVs tracked; the point is a
deliberate choice, not "everything with this extension, no exceptions,
ever."

## Untracking a file that's already committed

If a file is already in the repository's history, adding it to
`.gitignore` doesn't retroactively remove it. Untrack it explicitly,
then commit that removal:

```
git rm --cached .env
git commit -m "Stop tracking .env"
```

`--cached` removes it from Git's tracking without deleting the actual
file from your working directory. If real credentials were committed,
untracking isn't enough on its own — rotate the credential, since it's
still recoverable from the repository's history.

## Key terms

| Term | Meaning |
|---|---|
| `.gitignore` | A file listing patterns Git should never stage automatically |
| Untracked file | A file Git sees but isn't following — `.gitignore` only affects these |
| `git rm --cached` | Stops tracking a file without deleting it locally |
| `target/` | dbt's compiled-output directory — regenerated every run, shouldn't be committed |

## Lab

1. In a real (or practice) dbt or Python data project, write a
   `.gitignore` covering at minimum: environment files, raw data, and
   the tool's own generated-output folder.
2. Deliberately commit a throwaway `.env` file first, then use
   `git rm --cached` to untrack it, and confirm with `git status` that
   it now shows as ignored, not untracked.
3. Check whether your project already has a real credential or large
   file sitting in its history from before you added `.gitignore` —
   if so, note it (rotating a real leaked credential is beyond this
   lesson's scope, but recognizing the risk isn't).

## Check yourself

You're ready for Lesson 13 when you can explain why adding a pattern
to `.gitignore` doesn't remove a file that's already tracked — and
what command actually fixes that.
