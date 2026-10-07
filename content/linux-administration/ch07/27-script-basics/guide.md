# Script Basics

This lesson opens Bash Scripting by turning the commands you already know into something you can save, re-run, and hand to a teammate: a shell script. Northbridge Retail's ops team doesn't retype the same six commands every time they deploy a build or rotate a log file — they wrote a script once, and now anyone on the team can run it the same way, every time.

## What you'll learn

- What a shebang line is and why every script should start with one
- How to make a script file executable and the two ways to run it
- How comments, `echo`, and exit status communicate what a script is doing
- How to lay out a script so the next person who opens it understands it in ten seconds

## The shebang line

The first line of a script tells the kernel which interpreter should run the rest of the file. For Bash scripts, that's almost always:

```
#!/bin/bash
```

`#!` is called a shebang. The kernel reads it before anything else and hands the file to `/bin/bash` to execute line by line. Without it, running the script directly can fall back to whatever shell happens to be interpreting it — which may not support the Bash-specific syntax used later in this chapter.

## Creating and running a script

Northbridge's ops team keeps a simple script that checks disk space on a server. Here's a minimal version:

```
#!/bin/bash
# check-disk.sh — reports free space on the root filesystem

echo "Checking disk space on $(hostname)..."
df -h /
echo "Done."
```

A line starting with `#` (other than the shebang on line one) is a comment — Bash ignores it entirely. Comments are how the script explains itself to a human reader.

To run it, you have two options:

```
$ bash check-disk.sh
Checking disk space on web-01...
Filesystem      Size  Used Avail Use% Mounted on
/dev/sda1        40G   12G   28G  30% /
Done.
```

That works with no setup, because you're explicitly telling `bash` to interpret the file. The more common way is to make the file itself executable and run it directly:

```
$ chmod +x check-disk.sh
$ ./check-disk.sh
Checking disk space on web-01...
Filesystem      Size  Used Avail Use% Mounted on
/dev/sda1        40G   12G   28G  30% /
Done.
```

`chmod +x` adds the execute permission bit. The leading `./` is required — it tells the shell to look in the current directory, since the current directory usually isn't on `PATH`. Once a script like this lives in a directory that IS on `PATH` (Northbridge keeps theirs in `/opt/northbridge/bin`, from the PATH lesson earlier in this course), it can be run by name alone, from anywhere.

## Exit status

Every command and every script finishes with a numeric exit status: `0` means success, anything else means some kind of failure. The shell always remembers the most recent one in `$?`:

```
$ ./check-disk.sh
$ echo $?
0

$ ls /no-such-directory
ls: cannot access '/no-such-directory': No such file or directory
$ echo $?
2
```

A script can set its own exit status explicitly with `exit`:

```
#!/bin/bash
if [ ! -d /opt/northbridge ]; then
  echo "Northbridge directory missing — aborting"
  exit 1
fi
echo "Directory found, continuing..."
```

If `exit` is never called, the script's exit status is whatever its last command produced. This matters once a script is called from another script, or from a cron job that only alerts on failure — `$?` is how the caller knows whether to trust what just ran.

## Structuring a script for readability

A short header comment, one blank line between logical sections, and descriptive variable names turn a script from a one-off hack into something the next person can safely edit. A slightly more complete version of the disk-check script:

```
#!/bin/bash
# check-disk.sh
# Reports free space on / and warns if usage is high.
# Northbridge Retail — ops team

THRESHOLD=80

usage=$(df -h / | awk 'NR==2 {print $5}' | tr -d '%')

if [ "$usage" -ge "$THRESHOLD" ]; then
  echo "WARNING: / is at ${usage}% — above the ${THRESHOLD}% threshold"
else
  echo "OK: / is at ${usage}%"
fi
```

You'll come back to variables, `if`, and comparisons like `-ge` in the next lesson — for now, notice the shape: a shebang, a comment block saying what the script does and who owns it, then the logic below.

## Key terms

- **Shebang (`#!/bin/bash`)** — the first line of a script, telling the kernel which interpreter to run it with
- **Comment (`#`)** — a line Bash ignores, used to explain what the script does
- **`chmod +x`** — adds the execute permission bit so a script can be run directly
- **`./script.sh`** — runs an executable script in the current directory (the `./` is required because the current directory usually isn't on `PATH`)
- **Exit status** — the numeric result (`0` = success, nonzero = failure) a command or script finishes with, available in `$?`
- **`exit N`** — ends a script immediately with exit status `N`
