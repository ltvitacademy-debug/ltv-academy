# Lesson 18 — Kernel Hardening and sysctl Parameters

**Chapter 5 · Linux System Hardening Engineering · Lesson 2 of 4**

## What you'll learn

- What `sysctl` actually controls, and why these settings sit below anything a filesystem-permission
  benchmark check touches
- Four real kernel parameters worth hardening deliberately, and why each one matters
- How to make a change permanent in `/etc/sysctl.d/`, instead of losing it on the next reboot
- How to verify a kernel parameter actually took effect

## Below the filesystem: tuning the kernel itself

Everything in Lesson 17's CIS Benchmark walk-through — file permissions, service configuration,
mounted filesystems — operates on top of the kernel. `sysctl` reaches a layer below that: it
reads and writes **kernel parameters** live, through the `/proc/sys/` virtual filesystem, covering
things like how the networking stack behaves, what the kernel exposes to unprivileged processes,
and what gets written to disk when a program crashes. `sysctl -a` lists every parameter the
running kernel currently exposes — there are hundreds — and `sysctl <name>` reads one:

```
sysctl net.ipv4.ip_forward
net.ipv4.ip_forward = 0
```

A change made with `sysctl -w net.ipv4.ip_forward=0` takes effect immediately but only lasts
until the next reboot, which is exactly why hardening work has to end up in a config file, not
just a terminal command.

## Four settings worth knowing by name

**`net.ipv4.ip_forward`** — controls whether the kernel forwards packets between network
interfaces. A box acting as a router needs it on; nearly everything else should set it to `0`, so
a compromised host can't be repurposed to pivot traffic between network segments.
**`fs.suid_dumpable`** — controls whether a setuid program (one that runs with elevated
privileges, like `sudo` or `passwd`) writes a core dump when it crashes. Left at its default, a
crashed setuid process can dump sensitive memory — including credentials it was holding — into a
file an unprivileged user might be able to read; setting it to `0` disables that dump entirely.
**`net.ipv4.tcp_syncookies`** — enables **SYN cookies**, the kernel's defense against a SYN flood
denial-of-service attack, where an attacker opens huge numbers of half-finished TCP connections to
exhaust the server's connection table; setting it to `1` lets the kernel verify a connection is
legitimate without holding state for it until the handshake completes.
**`kernel.kptr_restrict`** — restricts whether kernel pointer addresses are exposed to
unprivileged processes through files like `/proc/kallsyms`. Those addresses sound harmless, but
they're exactly what certain kernel-exploit techniques need to defeat kernel ASLR; setting it to
`2` hides them from everyone without `CAP_SYSLOG`.

## Making it stick: /etc/sysctl.d/

A one-off `sysctl -w` disappears at reboot. The durable version is a file in `/etc/sysctl.d/`
(the older single-file `/etc/sysctl.conf` still works but drop-in files are the modern convention,
since they let a configuration-management tool own one file without touching another team's):

```
# /etc/sysctl.d/99-hardening.conf
net.ipv4.ip_forward = 0
fs.suid_dumpable = 0
net.ipv4.tcp_syncookies = 1
kernel.kptr_restrict = 2
```

Running `sysctl --system` reads every file under `/etc/sysctl.d/` (plus `/run/sysctl.d/` and
`/etc/sysctl.conf`) in order and applies them all, and the same files get re-applied automatically
on every boot — no separate reboot required to see the change take effect, and no risk of losing
it on the next one.

## A concrete example: verifying the change actually took

Writing the file isn't the same as confirming it worked. After `sysctl --system`, re-read the
specific parameter: `sysctl net.ipv4.tcp_syncookies` should now report `1`. An engineer doing this
across a fleet doesn't trust the file alone — they verify the live kernel state matches what the
drop-in file says it should be, because a typo in the file (a stray space around `=`, a value
sysctl silently rejects) can leave the running kernel exactly where it started while the config
file looks correct at a glance.

## Key terms

| Term | Meaning |
|---|---|
| sysctl | The tool (and `/proc/sys/` interface) for reading and writing kernel parameters at runtime |
| `/etc/sysctl.d/` | Directory of drop-in config files applied on boot and by `sysctl --system`, the durable way to set a parameter |
| SYN cookies | A kernel defense (`tcp_syncookies`) against SYN flood denial-of-service attacks |
| kptr_restrict | Restricts exposure of kernel memory addresses, hardening against pointer-leak exploit techniques |

## Check yourself

You're ready for Lesson 19 when you can explain, without looking: why does running
`sysctl -w net.ipv4.ip_forward=0` at the command line alone fail to count as "hardened" from an
engineering standpoint, even though the setting takes effect immediately?
