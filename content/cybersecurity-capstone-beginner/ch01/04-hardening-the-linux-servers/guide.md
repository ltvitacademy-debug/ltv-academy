# Lesson 4 — Hardening the Linux Servers

**Chapter 1 · Beginner Capstone: Baseline Security Hardening and the First Detection Rule · Lesson 4 of 10**

## What you'll learn

- How to harden SSH on `hru-web01` and `hru-db01` without locking yourself out in the process
- How `fail2ban` adds a real backstop against brute-force attempts even after SSH is key-only
- Why automatic security updates matter more on an internet-facing box than anywhere else
- How to scope `ufw` so only the ports each server actually needs are reachable at all

## Two Linux servers, same checklist, different exposure

`hru-web01` (the public-facing outage-reporting portal) and `hru-db01` (its backend database)
get Lesson 2's Linux checklist applied — but `hru-web01` sits directly on the internet, while
`hru-db01` only ever talks to `hru-web01` on an internal network. That difference matters for how
tightly each `ufw` rule set gets scoped, even though the SSH and `fail2ban` steps are identical on
both.

## Step 1: SSH, hardened carefully

Both servers already use key-based authentication from Hartwell's earlier IT setup, but keys
alone don't close every gap. In `/etc/ssh/sshd_config` on each server:

```
PermitRootLogin no
PasswordAuthentication no
AllowUsers mvoss dgranger deploy
```

`PermitRootLogin no` forces anyone needing root to log in as a named user first and `sudo` —
so every privileged action leaves a record of *who* ran it. `AllowUsers` is an explicit
allow-list: only `mvoss`, `dgranger`, and the `deploy` service account may authenticate over SSH
at all, even with a valid key.

The safe rollout order matters more than the settings themselves. Mara confirms her key-based
login already works in a **second, still-open** SSH session, checks syntax with `sshd -t`,
restarts `sshd`, and only then opens a brand-new third session to confirm key auth still works —
*before* closing either of the first two sessions:

```
sshd -t
systemctl restart sshd
```

Restarting `sshd` from the only open session, without a second connection already verified, is
the single most common way an administrator locks themselves out of a remote Linux server —
exactly the mistake this order avoids.

## Step 2: fail2ban as the backstop

Even with keys-only SSH, `fail2ban` stays enabled on both servers — a future misconfiguration
that silently re-enables password auth is far less dangerous if `fail2ban` is already watching,
and it also catches connection floods and failed key attempts that still clutter logs.
`/etc/fail2ban/jail.local` on both servers:

```
[sshd]
enabled  = true
port     = ssh
filter   = sshd
logpath  = /var/log/auth.log
maxretry = 5
findtime = 10m
bantime  = 1h
```

Five failed attempts from one IP within 10 minutes earns that IP a one-hour ban at the firewall
level, before it ever reaches `sshd` again. `fail2ban-client status sshd` shows the current ban
list on either server at any time.

## Step 3: automatic security updates

`hru-web01`, sitting directly on the internet, is the server where an unpatched, publicly known
vulnerability is most likely to actually get exploited — waiting on a manual patch cycle leaves
exactly that kind of gap open. Both servers get `unattended-upgrades` configured for security
updates:

```
apt install unattended-upgrades
dpkg-reconfigure --priority=low unattended-upgrades
```

This applies security patches automatically as they're released, instead of depending on someone
remembering to run a manual update cycle.

## Step 4: `ufw`, scoped differently per server

`hru-web01` needs to accept real inbound traffic from the public internet; `hru-db01` should
never be reachable from anywhere except `hru-web01` itself:

```
# hru-web01
ufw default deny incoming
ufw allow 22/tcp
ufw allow 80/tcp
ufw allow 443/tcp
ufw enable

# hru-db01
ufw default deny incoming
ufw allow 22/tcp
ufw allow from 10.20.5.11 to any port 5432
ufw enable
```

`hru-web01` opens SSH, HTTP, and HTTPS — the only three things an internet-facing portal needs.
`hru-db01` opens SSH and its database port, but only from `hru-web01`'s specific internal IP
address, not from the whole internal network. `ufw status verbose` on either box confirms exactly
which rules are active.

## Key terms

| Term | Meaning |
|---|---|
| AllowUsers | An explicit allow-list of accounts permitted to authenticate over SSH at all |
| fail2ban jail | A rule set banning an IP at the firewall after too many failed attempts in a time window |
| unattended-upgrades | A Debian/Ubuntu package that applies security updates automatically |
| ufw | Uncomplicated Firewall — a simplified front end for configuring a Linux host's firewall rules |

## Lab

Write the `ufw` rule set you'd apply to a hypothetical third Linux server that only needs SSH
from the management subnet and no other inbound traffic at all — no web, no database port.

## Check yourself

You're ready for Lesson 5 when you can explain why `fail2ban` still matters on `hru-web01` and
`hru-db01` even after `PasswordAuthentication no` is set, and why `hru-db01`'s `ufw` rule is
scoped to one specific IP instead of the whole internal subnet.
