# Lesson 20 — fail2ban and Brute-Force Protection

**Chapter 5 · Linux Hardening & Security Tools · Lesson 4 of 4**

## What you'll learn

- How fail2ban actually works: watching log files, matching patterns, and banning IPs
- What a "jail" is, and how `jail.local` configures protection per service
- The real commands for checking ban status and manually unbanning an IP
- Why this still matters even after SSH is already hardened with keys-only access

## Watching logs, not watching the network

**fail2ban** doesn't inspect network traffic directly — it watches **log files**. For SSH on a
typical Debian/Ubuntu box that's `/var/log/auth.log`; on RHEL/CentOS it's `/var/log/secure`.
Each service fail2ban protects has a **filter** — a set of regular expressions describing what a
failed login attempt looks like in that log. When enough matching failures from the same source
IP happen within a configured time window, fail2ban acts: it inserts a rule into the host's
firewall (iptables, nftables, or firewalld, depending on the system) that drops or rejects
traffic from that IP for a set period. No application code changes, no SSH configuration
changes — fail2ban works entirely by reacting to what's already landing in the log.

## Jails: one protection unit per service

A **jail** is fail2ban's unit of configuration — one jail per protected service, each naming its
filter, its log path, and its thresholds. Jails are defined in `/etc/fail2ban/jail.conf`
(the shipped defaults, not meant to be edited directly) and overridden in `/etc/fail2ban/jail.local`,
which takes priority and survives a package upgrade:

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

`maxretry` is how many failures trigger a ban; `findtime` is the window those failures have to
happen in; `bantime` is how long the ban lasts. Five failed logins in ten minutes here earns a
one-hour ban — after which, by default, the IP is free to try again, which is why some
administrators raise `bantime` substantially or set it to a negative value for a permanent ban
against repeat offenders.

## Checking and managing bans

```
fail2ban-client status
fail2ban-client status sshd
fail2ban-client set sshd unbanip 203.0.113.42
```

`fail2ban-client status` lists every active jail; adding a jail name shows that jail's current
ban list specifically. `set <jail> unbanip <ip>` removes a ban immediately — useful when a
legitimate user (or your own forgotten second laptop) got caught by the threshold and needs back
in before `bantime` expires on its own.

## Why this matters even after Lesson 19's hardening

It's tempting to think fail2ban is redundant once `PasswordAuthentication no` is set — if there's
no password to brute-force, what's left to ban? Several things. First, defense in depth: a
future misconfiguration that silently re-enables password auth, or a service you forgot was
listening, is far less dangerous if fail2ban is already watching. Second, fail2ban isn't
SSH-only — the same mechanism protects any service with a log-matchable failure pattern, from
a web application's login form to FTP. Third, even failed *key* authentication attempts and
connection floods still clutter logs and consume server resources; banning the source IP keeps
that noise from accumulating indefinitely, which matters for the log-review habits built in
Lesson 18.

## A concrete example: a brute-force attempt against SSH

An attacker scripts repeated SSH login attempts against your server from a single IP,
`203.0.113.42`. Each failure lands in `/var/log/auth.log`, matched by the `sshd` filter's
pattern. After the fifth failure inside the ten-minute `findtime` window, fail2ban's `sshd` jail
fires: it adds a firewall rule dropping all traffic from `203.0.113.42` for the next hour. The
attacker's script keeps retrying, but every packet is now dropped at the firewall before SSH
ever sees it. Running `fail2ban-client status sshd` confirms the ban, and the `/var/log/auth.log`
entries that triggered it are exactly what `ausearch`-style log review would also surface if the
attempt had instead targeted a different, audited service.

## Key terms

| Term | Meaning |
|---|---|
| fail2ban | A service that watches log files for failed-auth patterns and bans the source IP via firewall rules |
| Filter | A set of regex patterns defining what a failed attempt looks like in a given service's log |
| Jail | fail2ban's per-service configuration unit — filter, log path, and ban thresholds, defined in jail.local |
| maxretry / findtime / bantime | How many failures, in what time window, trigger a ban of what duration |

## Check yourself

If `PasswordAuthentication no` is already set and SSH only accepts keys, what's still a real
reason to keep the `sshd` jail enabled in fail2ban?
