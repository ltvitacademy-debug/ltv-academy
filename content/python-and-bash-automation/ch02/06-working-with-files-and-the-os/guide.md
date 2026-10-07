# Working With Files & the OS

Northbridge Retail's web and application servers pile up log files fast — every service writes its own, every day, across multiple directories. Someone eventually has to find the old ones and archive them before a disk fills up. That's exactly the job this lesson prepares you for: finding files, reading and writing them, checking permissions, and moving or deleting them, all from Python instead of a pile of one-off shell commands.

## What you'll learn

- The difference between the older `os` module and the modern, object-oriented `pathlib` module
- How to read and write files safely with `open()` and a `with` block
- How to walk directory trees with `os.walk` and search them with `Path.glob`
- How to check and change file permissions, and how to copy, move, or delete files with `shutil`

## os vs. pathlib

The `os` module is the original way to interact with the filesystem; `pathlib` is the newer, more readable way, built around a `Path` object. Both still show up in real code, so you should recognize both.

```python
import os
from pathlib import Path

log_dir = "/var/log/northbridge"

# os style: paths are plain strings
full_path = os.path.join(log_dir, "web-01.log")

# pathlib style: paths are objects with methods
log_path = Path(log_dir) / "web-01.log"
print(log_path.name)       # web-01.log
print(log_path.suffix)     # .log
print(log_path.exists())   # True or False
```

Prefer `pathlib` for new code — the `/` operator joins paths cleanly, and methods like `.name` and `.exists()` read better than the equivalent `os.path` function calls.

## Reading and writing files

Always open files with a `with` block so Python closes the file automatically, even if an error happens partway through.

```python
log_path = Path("/var/log/northbridge/web-01.log")

with open(log_path, "r") as f:
    lines = f.readlines()

error_lines = [line for line in lines if "ERROR" in line]

with open("/var/log/northbridge/web-01-errors.log", "w") as f:
    f.writelines(error_lines)
```

`"r"` opens for reading, `"w"` opens for writing (and overwrites anything already there). Use `"a"` to append instead of overwrite.

## Finding files: os.walk and Path.glob

To find every log file across Northbridge's log directories, walk the tree or glob for a pattern.

```python
# os.walk: visits every directory, returning (dirpath, dirnames, filenames)
for dirpath, dirnames, filenames in os.walk("/var/log/northbridge"):
    for name in filenames:
        if name.endswith(".log"):
            print(os.path.join(dirpath, name))

# Path.glob: pattern-match in one directory; rglob searches recursively
old_logs = Path("/var/log/northbridge").rglob("*.log")
for log_file in old_logs:
    print(log_file)
```

`glob` searches one directory level by default; `rglob` ("recursive glob") walks every subdirectory too, which is usually what you want for a task like this.

## Permissions and shutil

```python
import shutil
import stat

log_file = Path("/var/log/northbridge/web-01.log")

# check permissions
mode = log_file.stat().st_mode
is_writable = bool(mode & stat.S_IWUSR)

# make sure the archive script itself can read and write a log
log_file.chmod(0o644)

# move old logs into an archive directory instead of deleting them outright
archive_dir = Path("/var/log/northbridge/archive")
archive_dir.mkdir(exist_ok=True)
shutil.move(str(log_file), str(archive_dir / log_file.name))

# shutil can also copy or delete
shutil.copy(str(log_file), "/backup/northbridge/web-01.log")
# shutil.rmtree("/var/log/northbridge/old")  # deletes a whole directory tree
```

`shutil.move` is safer than deleting outright — Northbridge keeps a 90-day archive of old logs instead of destroying them immediately, in case anything needs to be investigated later.

## Key terms

- **pathlib.Path** — an object representing a filesystem path, with methods like `.exists()`, `.glob()`, and `.chmod()`
- **with block** — a context manager that guarantees a file gets closed, even on error
- **os.walk** — recursively visits every directory under a starting path
- **glob / rglob** — pattern-matches filenames, with `rglob` searching subdirectories too
- **shutil** — the standard library module for copying, moving, and deleting files and directory trees

## Recap

You can now find files across a directory tree with `os.walk` or `Path.rglob`, read and write them safely with `with open(...)`, inspect and adjust permissions, and move or copy them with `shutil` instead of deleting first and asking questions later. Next up, Lesson 7: using `subprocess` to shell out to real commands from inside a Python script.
