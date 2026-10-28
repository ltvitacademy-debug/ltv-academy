# Lesson 17 — Linux Logs & Where to Look When Something Breaks

**Chapter 4 · Linux Fundamentals II — Administration · Lesson 17 of 32**

## What you'll learn

- Where Linux keeps its system-wide logs, and where authentication attempts are logged
  separately
- How `journalctl` reads the logs for every systemd-managed service
- How to watch a log in real time with `tail -f`, and filter it with `grep`
- The real troubleshooting workflow experienced admins use: is it running, what do its logs say,
  what does the system log say

## Why logs are always the first stop

When something breaks on a Linux server, guessing wastes time. The system itself has already
written down what happened, in plain text, and reading that text is almost always faster than
trying to reproduce the problem by hand. Getting comfortable with where Linux keeps its logs — and
how to search them quickly — is one of the highest-leverage administration skills there is.

## journalctl: logs for every systemd service

Since Chapter 4's earlier lesson covered systemd managing services, it also centralizes their
logs. `journalctl` reads that centralized log, called the **journal**:

```
$ journalctl -u nginx          # everything nginx has logged, oldest first
$ journalctl -u nginx -f       # follow it live, like tail -f
$ journalctl -u sshd --since "10 min ago"
$ journalctl -b                # everything logged since the current boot
```

`-u <service>` filters to one unit, `-f` follows new log lines as they arrive, and `--since` lets
you filter by time instead of scrolling through everything. For any service managed by
`systemctl`, `journalctl -u <service>` is the fastest way to see exactly what it's been doing.

## The traditional log files

Alongside the journal, Linux also keeps plain-text log files under `/var/log/`, and two matter
most for troubleshooting:

- **`/var/log/syslog`** (Debian/Ubuntu) or **`/var/log/messages`** (RHEL/CentOS/Fedora) — the
  general system log: kernel messages, background services, anything not sent somewhere more
  specific.
- **`/var/log/auth.log`** (Debian/Ubuntu) or `/var/log/secure` (RHEL-based) — specifically
  authentication activity: every SSH login attempt, every `sudo` command, every success and
  every failure.

Separating authentication into its own log matters because it's the file you check first for
anything security-related — brute-force login attempts, an unexpected `sudo`, a login from an
unfamiliar account.

## Watching and filtering logs

Two commands do almost all the real work of reading a log:

```
$ tail -f /var/log/syslog
# shows new lines as they're written — leave this running while you reproduce a problem

$ grep -i error /var/log/syslog
# pulls out only lines containing "error" (case-insensitive)

$ tail -n 100 /var/log/auth.log | grep "Failed password"
# last 100 lines of the auth log, filtered down to failed SSH logins
```

`tail -f` ("follow") is the right tool when you want to watch a log update live, right as you try
to trigger the problem. `grep` is the right tool when a log file is too long to read and you only
care about lines matching a pattern — piping `tail`'s output into `grep`, as in that last
example, is one of the most common combinations in Linux troubleshooting.

## The real troubleshooting workflow

Put all of this together and most "something's broken" investigations follow the same three
steps, in order:

```
1. systemctl status <service>      # is it even running?
2. journalctl -u <service> -n 50   # what has the service itself logged recently?
3. tail -f /var/log/syslog         # is the wider system reporting anything related?
```

Start specific (the service's own status and logs) before going broad (the system-wide log).
Most problems — a service that crashed on startup, a config file with a typo, a port already in
use — show up clearly in step 1 or 2, and you only need step 3 when the service itself looks
healthy but something underneath it (disk space, memory, the network) isn't.

## Key terms

| Term | Meaning |
|---|---|
| Journal | systemd's centralized log for every service it manages, read with `journalctl` |
| `/var/log/syslog` / `/var/log/messages` | The general system log file |
| `/var/log/auth.log` / `/var/log/secure` | The log file dedicated to authentication events |
| `tail -f` | Follows a log file live, showing new lines as they're written |
| `grep` | Filters text to only the lines matching a pattern |

## Check yourself

A web service appears to be down. Walk through the three-step workflow from this lesson, in
order — what command do you run first, and what are you checking for at each step?
