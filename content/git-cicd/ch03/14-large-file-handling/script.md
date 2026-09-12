# Script — Large File Handling & Git LFS

## Segment 1 (title)

Git was built to track line-based text changes efficiently, storing every version forever. That model works badly for a large binary file — a trained model, a big Parquet extract. Git can't diff it meaningfully, so every version is stored close to full size, and the repository balloons permanently, even after the file is deleted.

## Segment 2 (code: the pointer file)

Git LFS doesn't change how Git works — it substitutes a tiny pointer file for the real content. That pointer, a version tag, a hash, and a size, is the entire thing Git actually commits and diffs. The real content lives on a separate LFS server, fetched on demand.

## Segment 3 (code: setting up LFS)

Setting it up: git lfs install, then git lfs track on a pattern like star.parquet, which writes into .gitattributes. From that point, matching files are automatically stored as pointers on every future add and commit — already-committed files need git lfs migrate instead.

## Segment 4 (steps: when LFS is right or wrong)

LFS is right for files that change occasionally and are genuinely part of the project's history — a versioned dataset, a model checkpoint. It's the wrong tool for regenerable output like dbt's target directory, where .gitignore is correct, and for anything closer to a data lake's scale, which belongs in an object store, not Git at all.

## Segment 5 (outro)

Next lesson: versioning SQL, dbt projects, and notebooks — pulling together everything from this chapter into one real project structure.
