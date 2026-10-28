# Lesson 18 — Shell Scripting Basics for Automation

**Chapter 4 · Linux Fundamentals II — Administration · Lesson 18 of 32**

## What you'll learn

- What a shebang line is, and why every bash script starts with one
- How to store and reuse values with variables
- How to make a decision in a script with `if`, and repeat an action with `for`
- How to make a script executable with `chmod +x`, and why this matters for cloud automation

## Why turn commands into scripts

Every command from this chapter — `systemctl status`, `journalctl -u`, `tail -f`, `grep` — is
useful typed by hand once. But real administration means running the same checks over and over,
on multiple servers, on a schedule, without a human retyping them every time. A **shell script**
is just those same commands saved into a file so they run together, in order, automatically.
That's the entire idea behind automation, and it's the direct foundation for the Infrastructure
as Code and cloud automation tools later in this course.

## The shebang line

Every bash script starts with a **shebang** — a special first line telling the system which
program should run the rest of the file:

```bash
#!/bin/bash
```

`#!` is the shebang itself, and `/bin/bash` is the path to the program that interprets everything
below it. Without this line, the system has no reliable way to know your file full of commands
should be run by bash specifically.

## Variables: storing a value for reuse

A **variable** stores a value under a name you choose, so you can reuse it or change it in one
place instead of everywhere it appears:

```bash
SERVICE="nginx"
echo "Checking $SERVICE"
```

Assignment (`SERVICE="nginx"`) has no spaces around the `=`. Reading the value back requires a
`$` in front of the name (`$SERVICE`) — that's what tells bash "substitute the stored value
here," rather than treating `SERVICE` as literal text.

## Making a decision: if

An `if` statement runs a block of commands only when a condition is true:

```bash
if systemctl is-active --quiet "$SERVICE"; then
  echo "$SERVICE is running"
else
  echo "$SERVICE is NOT running"
fi
```

`systemctl is-active --quiet` exits successfully (true) if the service is running and fails
(false) otherwise — exactly the kind of check `if` is built to react to. Every `if` block ends
with `fi` ("if" spelled backward), which is how bash knows where the conditional stops.

## Repeating an action: for

A `for` loop runs the same block of commands once for every item in a list:

```bash
for LOGFILE in /var/log/syslog /var/log/auth.log; do
  echo "--- Checking $LOGFILE ---"
  tail -n 5 "$LOGFILE"
done
```

Here `LOGFILE` takes on each value in the list in turn — first `/var/log/syslog`, then
`/var/log/auth.log` — running the `tail -n 5 "$LOGFILE"` command once per file. Just like `if`
ends with `fi`, a `for` loop ends with `done`.

## Putting it together: a real check-services script

```bash
#!/bin/bash
SERVICE="nginx"

if systemctl is-active --quiet "$SERVICE"; then
  echo "$SERVICE is running"
else
  echo "$SERVICE is NOT running"
fi

for LOGFILE in /var/log/syslog /var/log/auth.log; do
  echo "--- Checking $LOGFILE ---"
  tail -n 5 "$LOGFILE"
done
```

Save that as `check-services.sh`. One more step is required before you can run it — Linux won't
execute a file just because it contains valid commands, it also has to be marked executable:

```
$ chmod +x check-services.sh
$ ./check-services.sh
nginx is running
--- Checking /var/log/syslog ---
...
```

`chmod +x` adds the execute permission for the file's owner (and others, depending on the
existing permissions), and `./` tells the shell to run the script sitting right here in the
current directory.

## Why this matters for cloud automation

This exact pattern — shebang, variables, a conditional, a loop, made executable — is the building
block every cloud automation tool in this program builds on: a startup script that runs when a
cloud VM boots, a health check a monitoring system calls on a schedule, a deployment step that
runs the same commands across a dozen servers at once. Everything in the chapters ahead on
virtualization and the cloud assumes you're comfortable writing exactly this kind of script.

## Key terms

| Term | Meaning |
|---|---|
| Shebang | The `#!/bin/bash` first line telling the system which interpreter runs the script |
| Variable | A named value, assigned with `NAME=value` and read back with `$NAME` |
| `if` / `fi` | Runs a block of commands only when a condition is true; `fi` closes the block |
| `for` / `done` | Repeats a block of commands once per item in a list; `done` closes the loop |
| `chmod +x` | Marks a file executable so it can be run directly, e.g. `./script.sh` |

## Check yourself

Why won't Linux run a script just because it starts with `#!/bin/bash` and contains valid
commands — what's the extra step, and what command performs it?
