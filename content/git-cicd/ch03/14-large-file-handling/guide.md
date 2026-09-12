# Lesson 14 — Large File Handling & Git LFS

**Chapter 3 · Git for Data Projects Specifically · Lesson 14 of 25**

## What you'll learn

- Why Git handles large binary files badly by design
- What Git LFS actually does — a pointer file, not a Git feature
- Setting up LFS for a real data project's large files
- When LFS is the right tool, and when a large file shouldn't be in
  Git at all

## Why Git struggles with large files

Git was built to track line-based text changes efficiently — every
version of every file, forever, compressed and delta-encoded against
previous versions. That model works badly for a large binary file
(a trained model artifact, a big Parquet extract, a zipped dataset):
Git can't diff it meaningfully, so every version is stored close to
its full size, and the repository balloons permanently. Deleting the
file later doesn't help — its full weight is still sitting in every
earlier commit's history.

## What Git LFS actually does

**Git LFS (Large File Storage)** doesn't change how Git itself works —
it substitutes a tiny **pointer file** for the real content. The
pointer is what Git actually tracks and stores in history; the real
file content lives on a separate LFS server, fetched on demand:

```
version https://git-lfs.github.com/spec/v1
oid sha256:4d7a214614ab2935c943f9e0ff69d22eadbb8f32b1258daaa5e2ca24d17e2393
size 129423642
```

That's the entire contents of what Git commits for a large file once
it's tracked by LFS — a version tag, a hash, and a size. Git's history
stays small and fast regardless of how large the actual file is,
because it's this pointer being diffed and stored, not the file
itself.

## Setting up LFS for a real project

```
git lfs install
git lfs track "*.parquet"
git lfs track "models/*.pkl"
git add .gitattributes
git commit -m "Track large data files with Git LFS"
```

`git lfs track` writes patterns into a `.gitattributes` file — from
that point on, any file matching those patterns is automatically
stored as a pointer, transparently, on every future `add` and
`commit`. Existing files matching the pattern need `git lfs migrate`
to convert already-committed history; new ones are handled
automatically going forward.

## When LFS is the right tool — and when it isn't

LFS makes sense for files that:

- Change occasionally, not every run (a versioned reference dataset,
  a trained model checkpoint)
- Are genuinely part of the project's history, not regenerable output

LFS is the *wrong* tool for:

- **dbt's `target/` directory or notebook checkpoints** — these
  regenerate every run; `.gitignore` (Lesson 12) is correct here, not
  LFS.
- **Files better suited to a data lake or object store** — a raw
  400GB extract belongs in S3 or a similar store with a link or a
  small manifest in the repo, not in Git at all, LFS or otherwise.

## Key terms

| Term | Meaning |
|---|---|
| Git LFS | A Git extension that stores large files as pointers, keeping actual content on a separate server |
| Pointer file | The small text file (hash, size, version) Git actually tracks in place of the real content |
| `.gitattributes` | Where `git lfs track` patterns live, so matching files are handled automatically |
| `git lfs migrate` | Converts files already committed to plain Git into LFS-tracked pointers |

## Lab

1. In a real or practice repository, run `git lfs install` and
   `git lfs track` on a pattern matching a large file type you
   actually work with.
2. Add and commit a file matching that pattern, then inspect what Git
   actually stored — either via `cat` on the committed file inside
   `.git`, or `git show` on the commit — and confirm it's a small
   pointer, not the full file.
3. Decide, for one real large file in your own work, whether it
   belongs in Git LFS, in `.gitignore`, or in an object store entirely
   outside Git — and write one sentence justifying the choice.

## Check yourself

You're ready for Lesson 15 when you can explain what a Git LFS pointer
file actually contains, and describe one situation where LFS is the
wrong tool even though the file is large.
