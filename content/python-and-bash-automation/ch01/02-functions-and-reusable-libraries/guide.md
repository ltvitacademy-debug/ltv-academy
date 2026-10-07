# Functions & Reusable Libraries

Northbridge Retail's ops team has five different bash scripts: a deploy script, a nightly backup script, a health-check script, a log-cleanup script, and a cloud-cost cleanup script. Every one of them needs to log messages with a timestamp, and every one of them needs to retry a flaky network call instead of giving up on the first failure. For a while, each script had its own copy-pasted version of both — and when one script's logging format got fixed, the other four stayed broken. This lesson covers the fix: bash functions, and a shared library file the whole team sources.

## What you'll learn

- How to define a bash function and pass arguments into it
- Why `local` matters for variables inside a function
- Two ways a function can report back: an exit code for yes/no checks, or `echo` + command substitution for an actual value
- How to put shared functions in one file (`lib/common.sh`) and `source` it from every script that needs it

## Defining a function

A bash function looks like this. Arguments arrive as `$1`, `$2`, and so on, exactly like a standalone script:

```bash
log() {
  local level="$1"
  shift
  echo "[$(date '+%Y-%m-%d %H:%M:%S')] [$level] $*"
}

log "INFO" "Starting nightly cleanup for Northbridge Retail"
# -> [2026-10-06 02:00:01] [INFO] Starting nightly cleanup for Northbridge Retail
```

`shift` drops `$1` off the argument list, so `$*` afterward is everything the caller passed after the log level — this lets `log` accept a whole free-form message.

## `local` variables

Without `local`, every variable you set inside a function is global — it leaks into and can silently overwrite variables in whatever called it:

```bash
greet_region() {
  local region="$1"   # local: scoped to this function only
  echo "Deploying to region: $region"
}

region="us-east-1"
greet_region "eu-west-1"
echo "$region"   # still "us-east-1" -- untouched by the function
```

If `region="$1"` had been written without `local`, calling `greet_region "eu-west-1"` would have overwritten the caller's `region` variable too. Always declare function-local variables with `local`.

## Returning a status vs. returning a value

Bash functions have two different ways to "return" something, and mixing them up causes bugs. For a yes/no check, return it as an **exit code**:

```bash
is_release_dir_valid() {
  local dir="$1"
  [[ -d "$dir" && -f "$dir/app.conf" ]]
}

if is_release_dir_valid "/opt/northbridge/releases/2026.10.1"; then
  echo "Release directory looks good."
fi
```

The function's exit code is simply the exit code of its last command — here, the `[[ ... ]]` test. No `return` statement needed.

For an actual **value** (a string, a number), `echo` it and capture the output with command substitution:

```bash
current_release_tag() {
  local link_target
  link_target="$(readlink -f /opt/northbridge/current)"
  basename "$link_target"
}

tag="$(current_release_tag)"
echo "Currently running release: $tag"
```

`return` in bash can only send back a number 0–255 — it cannot send back a string. That's why passing data back out of a function always goes through `echo` and `$(...)`, never `return`.

## A shared library: `lib/common.sh`

Northbridge collects its logging and retry helpers into one file that every ops script sources:

```bash
#!/usr/bin/env bash
# lib/common.sh -- shared helpers for Northbridge ops scripts

log() {
  local level="$1"
  shift
  echo "[$(date '+%Y-%m-%d %H:%M:%S')] [$level] $*"
}

retry() {
  local max_attempts="$1"
  local delay="$2"
  shift 2
  local attempt=1

  until "$@"; do
    if (( attempt >= max_attempts )); then
      log "ERROR" "command failed after $attempt attempts: $*"
      return 1
    fi
    log "WARN" "attempt $attempt failed, retrying in ${delay}s: $*"
    sleep "$delay"
    (( attempt++ ))
  done
}
```

Any script pulls it in with `source` (or the `.` shorthand), using a path resolved relative to the script's own location so it works no matter where the script is called from:

```bash
#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
source "${SCRIPT_DIR}/lib/common.sh"

log "INFO" "Starting nightly cleanup for Northbridge Retail"
retry 3 5 curl -sf "https://api.northbridge-retail.internal/health"
log "INFO" "Cleanup finished"
```

Fix a bug in `log` or `retry` once, in `lib/common.sh`, and all five Northbridge scripts that source it are fixed at the same time.

## Key terms

- **Function** — a named, reusable block of bash code, called like a command and given arguments via `$1`, `$2`, etc.
- **`local`** — declares a variable scoped to the current function, preventing it from leaking into or colliding with the caller's variables
- **Command substitution** — `$(...)`, used to capture a function's `echo`'d output into a variable
- **`source`** (or `.`) — runs another script's contents in the current shell, making its functions and variables available

## Recap

Functions let you name and reuse logic instead of copy-pasting it across scripts; `local` keeps their variables from leaking; and the exit-code-vs-echo distinction decides how a function reports back a yes/no versus an actual value. Collecting shared functions into one sourced file, like Northbridge's `lib/common.sh`, means a single fix propagates to every script that uses it. Next up, Lesson 3: parsing real log and CSV data with grep, sed, awk, and friends.
