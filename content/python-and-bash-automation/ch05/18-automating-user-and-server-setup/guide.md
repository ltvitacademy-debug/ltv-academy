# Automating User & Server Setup

Every time Northbridge Retail hires a new engineer or spins up a new server, someone has to run through the same handful of setup steps by hand: create the account, drop in an SSH key, add it to the right group, fix the permissions. It's exactly the kind of repetitive, easy-to-get-wrong task this whole course has been building toward automating — and it comes with one hard requirement: the script has to be safe to run twice, because someone *will* run it twice.

## What you'll learn

- Why a setup script must be idempotent — safe to run more than once with the same result
- How to check whether a user already exists before creating one
- How to install an SSH public key into `authorized_keys` without duplicating it on a rerun
- How to run the same setup across a whole server fleet with Python's `subprocess`, and log which ones failed

## Idempotency: the one rule that matters most

A script that blindly runs `useradd new.engineer` works the first time and fails the second, because the user already exists. That's not idempotent. An **idempotent** script checks the current state first and only changes what actually needs changing — run it once or run it ten times, the end result is identical:

```bash
if id -u "$USERNAME" &>/dev/null; then
    echo "User $USERNAME already exists, skipping creation"
else
    useradd -m -s /bin/bash "$USERNAME"
    echo "Created user $USERNAME"
fi
```

`id -u "$USERNAME"` exits with a non-zero status if the user doesn't exist, and `&>/dev/null` throws away its output since we only care about the exit code.

## A full user-setup script that's safe to rerun

Putting the same idempotent pattern around every step — account creation, group membership, and the SSH key — gives you a script Northbridge can hand to anyone on the on-call rotation without worrying they'll break something by running it again:

```bash
#!/usr/bin/env bash
set -euo pipefail

USERNAME="$1"
PUBKEY_FILE="$2"

if id -u "$USERNAME" &>/dev/null; then
    echo "User $USERNAME already exists, skipping creation"
else
    useradd -m -s /bin/bash "$USERNAME"
    echo "Created user $USERNAME"
fi

usermod -aG developers "$USERNAME"

SSH_DIR="/home/$USERNAME/.ssh"
mkdir -p "$SSH_DIR"
AUTHORIZED_KEYS="$SSH_DIR/authorized_keys"
touch "$AUTHORIZED_KEYS"

if ! grep -qF -- "$(cat "$PUBKEY_FILE")" "$AUTHORIZED_KEYS"; then
    cat "$PUBKEY_FILE" >> "$AUTHORIZED_KEYS"
    echo "Added public key for $USERNAME"
else
    echo "Public key already present for $USERNAME"
fi

chown -R "$USERNAME:$USERNAME" "$SSH_DIR"
chmod 700 "$SSH_DIR"
chmod 600 "$AUTHORIZED_KEYS"
```

Three idempotency checks are doing the real work here: `id -u` before creating the user, `grep -qF` before appending the key (so rerunning doesn't paste the same key in twice), and running `chown`/`chmod` unconditionally every time, since fixing permissions that are already correct is harmless. `usermod -aG` is naturally idempotent too — adding a user to a group they're already in is a no-op. `sshd` is strict about `.ssh` permissions: it will silently refuse to use a key if the directory isn't `700` or the file isn't `600`, which is why those two lines run on every single execution rather than only on first creation.

## Running it across a whole fleet with `subprocess`

Northbridge's engineers aren't set up on just one server — the same script needs to run on every box they'll touch. Rather than SSHing in by hand repeatedly, a small Python wrapper runs the bash script remotely on each server and keeps a record of which ones succeeded:

```python
import logging
import subprocess

logger = logging.getLogger("northbridge.setup")
SERVERS = ["nbr-web-01", "nbr-web-02", "nbr-app-01"]

def setup_user_on(server, username, pubkey_path):
    result = subprocess.run(
        ["ssh", server, "sudo", "/opt/northbridge/scripts/setup-user.sh",
         username, pubkey_path],
        capture_output=True, text=True,
    )
    if result.returncode != 0:
        logger.error(f"{server}: setup failed -> {result.stderr.strip()}")
        return False
    logger.info(f"{server}: setup complete")
    return True

failures = [s for s in SERVERS if not setup_user_on(s, "new.engineer", "/tmp/new-engineer.pub")]
if failures:
    logger.error(f"Setup failed on: {', '.join(failures)}")
```

Checking `result.returncode` after every call means one unreachable or misconfigured server doesn't silently get skipped — it shows up in the failure list and the log, instead of someone discovering it weeks later when that engineer can't log in.

## Key terms

| Term | Meaning |
|---|---|
| Idempotent | A script that produces the same end state whether run once or many times |
| `id -u` | Prints a user's UID, or exits non-zero if the user doesn't exist — the standard existence check |
| `authorized_keys` | The file `sshd` reads to decide which public keys may log in as a user |
| `grep -qF` | Quiet, fixed-string search used here to avoid appending a duplicate key |

## Recap

An idempotent setup script checks state before changing it — `id -u` before creating a user, `grep -qF` before appending a key, and unconditional `chmod`/`chown` to self-heal permissions every run. Wrapping that script in a Python loop with `subprocess` and checking `returncode` lets you run it across an entire fleet and know exactly which servers need a second look. Next up, lesson 19 turns that same "run it everywhere, collect what matters" approach toward parsing logs and building a report.
