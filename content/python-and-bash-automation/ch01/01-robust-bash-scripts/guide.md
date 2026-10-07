# Robust Bash Scripts

Northbridge Retail — our fictional mid-size e-commerce retailer for this course — runs a deployment script that pushes new releases of its order-processing API. The script used to "work," right up until the night a release directory didn't exist, the `cp` step silently failed, and the old binary kept running while the team thought the new version was live. Nobody saw an error because bash, by default, doesn't treat most failures as fatal. This lesson fixes that: you'll learn how to make a bash script fail loudly, the instant something goes wrong, instead of limping forward.

## What you'll learn

- Why the shebang line (`#!/usr/bin/env bash`) matters for portability
- What `set -euo pipefail` actually does, flag by flag, and why every serious script starts with it
- Why unquoted variables break on filenames with spaces — and how to always quote correctly
- How exit codes communicate success/failure to whatever calls your script
- How to use `trap` to guarantee cleanup code runs even when a script dies partway through

## The shebang line

Every bash script should start with a shebang that tells the OS which interpreter to run it with:

```bash
#!/usr/bin/env bash
```

`#!/usr/bin/env bash` is preferred over a hardcoded `#!/bin/bash` because it finds `bash` via the user's `PATH`, which matters on systems where bash isn't at `/bin/bash` (some macOS setups, containers with a newer bash installed elsewhere).

## `set -euo pipefail`: making failures loud

By default, bash scripts have three bad habits that caused Northbridge's silent-failure incident. `set -euo pipefail` turns all three off:

```bash
#!/usr/bin/env bash
set -euo pipefail

# -e: exit immediately if any command exits non-zero
# -u: treat any unset variable as an error, instead of substituting ""
# -o pipefail: a pipeline fails if ANY command in it fails,
#              not just the last one
```

Here's the deploy step that failed silently without those flags, and what happens with them on:

```bash
#!/usr/bin/env bash
set -euo pipefail

RELEASE_TAG="$1"
RELEASE_DIR="/opt/northbridge/releases/${RELEASE_TAG}"

if [[ ! -d "$RELEASE_DIR" ]]; then
  echo "ERROR: release directory not found: $RELEASE_DIR" >&2
  exit 1
fi

cp "${RELEASE_DIR}/app.conf" /etc/northbridge/app.conf
systemctl restart northbridge-api
echo "Deployed ${RELEASE_TAG} successfully."
```

With `set -e`, if `cp` fails (bad path, permissions), the script stops right there — it never reaches `systemctl restart` and never prints the false "success" message.

## Quoting variables

Unquoted variables get word-split and glob-expanded by bash, which breaks the moment a value contains a space or a wildcard character:

```bash
RELEASE_NOTE="release notes oct.txt"

rm $RELEASE_NOTE     # BAD: bash splits this into two arguments,
                      # "release", "notes", "oct.txt" -- wrong files!

rm "$RELEASE_NOTE"   # GOOD: quoted, treated as one single argument
```

The rule of thumb: quote every variable expansion (`"$var"`, `"${var}"`) unless you have a specific reason not to (like intentional word-splitting on a list). It costs nothing and prevents an entire category of bugs.

## Exit codes

Every command and script returns an exit code: `0` means success, anything `1`–`255` means failure. Scripts that call other scripts (cron, CI pipelines, other scripts) depend on this to know whether to proceed:

```bash
#!/usr/bin/env bash
set -euo pipefail

if ! curl -sf "https://api.northbridge-retail.internal/health" > /dev/null; then
  echo "ERROR: health check failed, aborting deploy" >&2
  exit 1
fi

echo "Health check passed, continuing deploy."
exit 0
```

`curl -sf` suppresses curl's progress output (`-s`) and makes curl itself return non-zero on an HTTP error (`-f`), so the `if !` check works correctly.

## `trap` for guaranteed cleanup

`trap` registers a function to run when the script exits — whether it exits normally, hits an error under `set -e`, or gets killed by a signal. Northbridge uses this to make sure a deploy lock file is always released:

```bash
#!/usr/bin/env bash
set -euo pipefail

LOCK_FILE="/tmp/northbridge-deploy.lock"

cleanup() {
  rm -f "$LOCK_FILE"
}
trap cleanup EXIT

if [[ -e "$LOCK_FILE" ]]; then
  echo "ERROR: another deploy is already running" >&2
  exit 1
fi

touch "$LOCK_FILE"

# ... deploy steps go here; if any of them fail, set -e triggers
# the script's exit, and the EXIT trap still removes the lock file.

echo "Deploy finished; lock released automatically."
```

Without the trap, a failed deploy would leave `LOCK_FILE` behind forever, and every future deploy would refuse to run until someone manually deleted it.

## Key terms

- **Shebang** — the `#!` line at the top of a script that specifies which interpreter should run it
- **`set -euo pipefail`** — the standard safety header: exit on error (`-e`), error on unset variables (`-u`), fail a pipeline if any stage fails (`-o pipefail`)
- **Exit code** — the number (0–255) a command or script returns; `0` is success, nonzero is failure
- **`trap`** — registers a function to run automatically on script exit, so cleanup happens even after an error

## Recap

A robust bash script starts with `#!/usr/bin/env bash` and `set -euo pipefail`, quotes every variable expansion, checks and returns meaningful exit codes, and uses `trap` to guarantee cleanup runs no matter how the script exits. Apply all four and Northbridge's deploy script fails loudly the moment something's wrong — instead of quietly leaving the old version running. Next up, Lesson 2: turning these patterns into reusable functions and a shared library.
