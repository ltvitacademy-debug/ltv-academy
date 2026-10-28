# Lesson 30 — Lab: Hardening a Linux Server Baseline

**Chapter 8 · Capstone: Hardening a Mixed Environment · Lesson 30 of 32**

## What you'll learn

- How to lock down a sudoers file so it grants exactly the access a role needs, nothing more
- How to flip SELinux from permissive to enforcing without breaking the application it's
  protecting
- How to harden SSH down to key-only authentication and layer fail2ban on top of it
- How to write auditd rules that catch exactly the changes an auditor will ask about

## The scenario

`lnx-app-02` is Meridian Fabrication's internal application server, running the same shop-
floor system that `WIN-SRV-04` from Lesson 29 feeds data to. It's RHEL-based, it's about to
join production, and it gets the Linux side of the same checklist — Chapters 4 and 5 of this
course, applied to one real box.

## Step 1: Lock down sudoers

The existing sudoers file has a leftover entry from an earlier migration: a wildcard grant
that lets the application service account run anything as root. Lesson 13's rule applies
here directly — sudo access should be scoped to exactly the commands a role needs:

```
# visudo
%sysadmins ALL=(ALL) ALL
appsvc ALL=(ALL) NOPASSWD: /usr/bin/systemctl restart meridian-app
Defaults requiretty
Defaults log_input,log_output
```

The `appsvc` account can restart its own service without a password — nothing else. The
`Defaults` lines turn on input/output logging for every sudo session, so "what did this
account actually run" has an answer.

## Step 2: SELinux, permissive to enforcing

`getenforce` on a lot of freshly built RHEL boxes comes back `Permissive` — SELinux is
logging violations but not blocking them, which means it's not actually protecting anything
yet. Flipping it the wrong way breaks the application; flipping it correctly means checking
for denials first:

```
ausearch -m avc -ts recent
restorecon -R /var/www
setenforce 1
```

`restorecon` fixes any files with the wrong SELinux context before enforcement goes live, so
the app doesn't immediately break on a mislabeled file. `setenforce 1` is temporary; making it
permanent means setting `SELINUX=enforcing` in `/etc/selinux/config` so it survives a reboot.

## Step 3: SSH, key-only, with fail2ban behind it

Lesson 19's SSH hardening and Lesson 20's fail2ban are built to work together — one closes
the door, the other watches whoever keeps knocking:

```
# /etc/ssh/sshd_config
PermitRootLogin no
PasswordAuthentication no
AllowUsers deploy sysadmin
MaxAuthTries 3
```

```
# /etc/fail2ban/jail.local
[sshd]
enabled = true
maxretry = 4
bantime = 1h
findtime = 10m
```

No root login, no password fallback if a key is somehow misplaced, and a short list of users
who are allowed to connect at all. Fail2ban then bans any IP that trips four failed attempts
inside ten minutes, for an hour — a real deterrent against the credential-stuffing attempts
this server sees constantly from the open internet.

## Step 4: auditd rules that answer the auditor's question

Lesson 18's auditd, pointed at the files an auditor will actually ask about:

```
auditctl -w /etc/passwd -p wa -k identity
auditctl -w /etc/shadow -p wa -k identity
auditctl -w /etc/sudoers -p wa -k privilege_escalation
```

Written and persisted to `/etc/audit/rules.d/hardening.rules` and loaded with
`augenrules --load`, these three rules mean any write to the password database, the shadow
file, or the sudoers file shows up in a search tagged `privilege_escalation` — exactly the
kind of change a security audit checks for.

## Key terms

| Term | Meaning |
|---|---|
| Sudoers scoping | Granting a role exactly the commands it needs via sudo, never a blanket `ALL` |
| Enforcing mode | SELinux actively blocking policy violations, not just logging them (permissive mode) |
| fail2ban jail | A rule set that bans an IP after too many failed attempts within a time window |
| auditd watch rule | A rule (`auditctl -w`) that logs any read/write/execute on a specific file or path |

## Check yourself

Before running `setenforce 1` on `lnx-app-02`, this lab runs `ausearch -m avc -ts recent`
first. What would skipping that check risk, and why does checking first matter more on an
application server than on a server with no live workload?
