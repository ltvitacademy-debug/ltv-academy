# Error Handling & Debugging

A script that fails silently is worse than one that doesn't exist — it gives you false confidence that a deploy or a backup actually happened. This lesson closes out Bash Scripting with the habits Northbridge Retail's ops team builds into every script: fail fast, fail loudly, and leave a trail when something does go wrong.

## What you'll learn

- What `set -e`, `set -u`, and `set -x` each change about how a script behaves
- Why `set -o pipefail` matters for catching failures inside a pipeline
- How `trap` runs cleanup code on exit or on a signal like Ctrl-C
- How to debug a misbehaving script with `bash -x` and targeted `echo` statements

## set -e, set -u, and set -x

By default, Bash keeps running a script even after a command fails — the script only stops if you check `$?` yourself. `set -e` changes that: the script exits immediately the moment any command returns a nonzero status.

```
#!/bin/bash
set -e

echo "Starting backup..."
cp /nonexistent/file /var/backups/   # this fails
echo "This line never runs"
```

```
$ ./backup.sh
Starting backup...
cp: cannot stat '/nonexistent/file': No such file or directory
```

`set -u` catches a different mistake: referencing a variable that was never set. Without it, a typo'd variable name silently expands to an empty string; with it, the script stops and tells you:

```
#!/bin/bash
set -u
echo "Deploying to $enviroment"   # typo: should be $environment
```

```
$ ./deploy.sh
./deploy.sh: line 2: enviroment: unbound variable
```

`set -x` prints every command the script runs, with the values already substituted in, right before it executes — invaluable for watching exactly what a script is doing:

```
$ bash -x ./deploy.sh
+ environment=production
+ echo 'Deploying to production'
Deploying to production
```

Most production scripts combine the first two at the top: `set -euo pipefail` (explained next) is a common opening line.

## set -o pipefail

Without it, a pipeline like `cmd1 | cmd2` only reports the exit status of the last command — if `cmd1` fails but `cmd2` succeeds, the pipeline looks successful. `set -o pipefail` makes the pipeline's exit status reflect the first command in it that failed:

```
#!/bin/bash
set -o pipefail
grep "ERROR" /var/log/nonexistent.log | wc -l
echo "Exit status: $?"
```

```
$ ./count-errors.sh
grep: /var/log/nonexistent.log: No such file or directory
0
Exit status: 1
```

Here `wc -l` still happily counts zero lines and would normally report success — `pipefail` makes sure the missing log file's failure doesn't get hidden behind it.

## trap for cleanup and signals

`trap` runs a command when a script exits, or when it receives a signal such as Ctrl-C (`SIGINT`). Northbridge's deploy scripts use it to always clean up a temporary file, even if the script fails partway through:

```
#!/bin/bash
tmpfile=$(mktemp)
trap 'rm -f "$tmpfile"' EXIT

echo "Working in $tmpfile"
# ... script logic that might fail anywhere ...
```

```
$ ./build.sh
Working in /tmp/tmp.X7fQ2a
```

The `rm -f "$tmpfile"` runs automatically when the script exits — whether it finished normally, hit `exit`, or was killed with Ctrl-C — because `EXIT` catches all of those. You can also trap a specific signal name, like `trap 'echo "Interrupted"; exit 1' SIGINT`, to react to Ctrl-C specifically.

## Debugging a misbehaving script

Two tools cover most debugging situations. `bash -x script.sh` (or `set -x` inside the script, turned off later with `set +x`) traces every command as it runs, shown above. For a quick, targeted look at a specific value, a temporary `echo` to stderr is often faster than tracing the whole script:

```
echo "DEBUG: usage=$usage threshold=$THRESHOLD" >&2
```

Writing debug output to stderr (`>&2`) keeps it separate from the script's normal output, so it doesn't get mixed into anything downstream that's reading the script's stdout.

## Key terms

- **`set -e`** — exits the script immediately if any command returns a nonzero exit status
- **`set -u`** — treats referencing an unset variable as an error instead of silently using an empty string
- **`set -x`** — prints each command (with substitutions applied) before running it, for tracing
- **`set -o pipefail`** — makes a pipeline's exit status reflect the first failing command, not just the last one
- **`trap 'commands' EXIT`** — runs cleanup commands when the script exits, for any reason
- **`bash -x script.sh`** — runs a script with command tracing turned on, without editing the file
