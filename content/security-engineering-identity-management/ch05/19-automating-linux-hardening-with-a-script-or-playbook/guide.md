# Lesson 19 — Automating Linux Hardening with a Script or Playbook

**Chapter 5 · Linux System Hardening Engineering · Lesson 3 of 4**

## What you'll learn

- Why manual, host-by-host hardening breaks down the moment a fleet grows past a handful of
  servers
- What **configuration drift** is, and why it happens even when every host started out compliant
- How a shell script turns the sysctl and benchmark settings from the last two lessons into a
  repeatable, idempotent artifact
- How a configuration management tool like Ansible applies the same controls across many hosts at
  once, and checks whether they still hold

## Why manual hardening doesn't scale

Hardening one server by hand — working through a CIS Benchmark, writing a sysctl drop-in file,
locking down SSH — is a reasonable afternoon's work. Hardening the same way across fifty servers
is fifty afternoons, and the moment the fleet is that large, two things start happening that
manual work can't catch: **new hosts get provisioned** from a base image that predates the
hardening work, so they come up unhardened by default; and **existing hosts drift** — a patch
resets a config file to its package default, an engineer edits `/etc/ssh/sshd_config` directly at
2 a.m. to fix an outage and forgets to reapply the hardening on top, a package reinstall silently
re-enables a kernel module. Six months later, a fleet that was 95% CIS-compliant on day one might
be anywhere from 60% to 95%, and nobody can say which hosts are which without re-scanning every
one of them.

## The first fix: a script, not a checklist

The most basic automation is a **shell script** that applies the settings from Lessons 17 and 18
— not as a one-time run, but as something checked into version control and re-run on every host,
on a schedule. A well-written hardening script is **idempotent**: running it twice produces the
same end state as running it once, because it checks current state before changing anything,
rather than blindly appending the same line to a config file every time it runs.

```bash
#!/usr/bin/env bash
set -euo pipefail

SYSCTL_FILE="/etc/sysctl.d/99-cis-hardening.conf"
if [ ! -f "$SYSCTL_FILE" ]; then
  cat > "$SYSCTL_FILE" <<EOF
net.ipv4.ip_forward = 0
fs.suid_dumpable = 0
net.ipv4.tcp_syncookies = 1
kernel.kptr_restrict = 2
EOF
  sysctl --system
fi
```

That's real progress over doing it by hand — it's version-controlled, reviewable in a pull
request, and re-runnable — but it still has to be copied to, and executed on, every host
individually.

## The second fix: configuration management at fleet scale

**Ansible** (and tools like it) removes that last manual step: a single playbook, run against an
**inventory** of however many hosts, applies the same role to all of them in parallel over SSH,
with no agent to install on the target first. The real-world **ansible-lockdown** project ships
exactly this for CIS Benchmarks — roles like `UBUNTU22-CIS` or `RHEL9-CIS` encode each numbered
benchmark recommendation as its own Ansible task, tagged by level and by control number, so a
team can run the whole profile or just a subset:

```yaml
- name: "1.1.1.1 | Ensure mounting of cramfs filesystems is disabled"
  tags: [level1, cis_1.1.1.1]
  community.general.modprobe:
    name: cramfs
    state: absent
    persistent: absent
```

`ansible-playbook -i inventory hardening.yml --check --diff` runs in **check mode** — reporting
what *would* change without changing anything — which is exactly how a team verifies drift exists
before they commit to fixing it.

## A concrete example: catching drift before it's a finding

A nightly scheduled job runs `ansible-playbook ... --check` across the fleet and reports which
hosts have diverged. One week it flags three app servers where `net.ipv4.tcp_syncookies` came
back to `0` after a routine patch rebuilt their sysctl config from the package default. Instead of
discovering that during an audit months later — or not at all, until a SYN flood actually lands —
the same playbook, run without `--check`, puts those three hosts back in compliance that night,
and the whole fleet's compliance score never has the chance to quietly slide.

## Key terms

| Term | Meaning |
|---|---|
| Configuration drift | Hosts silently diverging from their intended hardened state over time, via patches, manual fixes, or reinstalls |
| Idempotent | A script or task that produces the same end state no matter how many times it's run |
| Inventory | The list of hosts a configuration management tool like Ansible targets with a given playbook |
| Check mode | Running a playbook to report what would change, without actually changing anything |

## Check yourself

You're ready for Lesson 20 when you can explain, without looking: why can a fleet that was fully
CIS-compliant on the day it was provisioned still fall out of compliance six months later, even if
nobody deliberately changed a single hardening setting?
