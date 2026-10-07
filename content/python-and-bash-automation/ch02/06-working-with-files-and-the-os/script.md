# Script — Working With Files & the OS

## Segment 1 (title)

Northbridge Retail's web and application servers pile up log files fast, across multiple directories, and someone has to find the old ones before a disk fills up. This lesson covers finding, reading, writing, and archiving files in Python — the exact job that task requires, using the os, pathlib, and shutil modules.

## Segment 2 (code)

Python gives you two ways to work with paths. The older `os` module treats paths as plain strings. The newer `pathlib` module wraps a path in a `Path` object, so you join pieces with a `/` operator and call readable methods like `.name` and `.exists()` instead of separate `os.path` functions. Prefer `pathlib` for new code.

## Segment 3 (code)

Always open a file inside a `with` block. It hands you the file to read or write, and guarantees Python closes it afterward even if something goes wrong partway through — no leaked file handles, no half-written archive files.

## Segment 4 (code)

To find every log file across Northbridge's directories, you've got two options. `os.walk` visits every directory under a starting path and hands you its files one folder at a time. `Path.rglob` does the same job with a pattern — `"*.log"` — and searches every subdirectory automatically.

## Segment 5 (code)

Once you've found old logs, `shutil` handles moving them. `shutil.move` relocates a file into an archive directory; `shutil.copy` duplicates it for backup; `shutil.rmtree` deletes an entire directory tree. Before moving anything, it's worth checking the file's permissions with `.stat().st_mode`, so the archive job doesn't fail on a file it can't touch. Northbridge moves old logs into a 90-day archive instead of deleting them outright, in case anything needs investigating later.

## Segment 6 (outro)

Next up, you'll use the `subprocess` module to shell out to a real command — like a backup script or a git pull — directly from Python.
