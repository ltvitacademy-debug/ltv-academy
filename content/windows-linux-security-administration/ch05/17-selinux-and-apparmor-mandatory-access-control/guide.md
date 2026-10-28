# Lesson 17 — SELinux and AppArmor: Mandatory Access Control

**Chapter 5 · Linux Hardening & Security Tools · Lesson 1 of 4**

## What you'll learn

- Why standard Linux permissions (DAC) have a hard ceiling on what they can protect against
- How Mandatory Access Control (MAC) adds a second, system-wide layer that even root can't bypass
- SELinux on RHEL/CentOS: enforcing/permissive/disabled modes and security contexts
- AppArmor on Ubuntu/Debian: path-based profiles, and how it differs from SELinux's labeling approach

## DAC's ceiling: ownership is the whole policy

Everything you've used so far — `chmod`, `chown`, ACLs, the sticky bit — is **Discretionary
Access Control (DAC)**. The defining feature of DAC is right there in the name: access is
decided at the *discretion* of the resource's owner (or root). If a process is running as the
`apache` user, it can do anything the `apache` user is allowed to do, full stop. That's fine
until that process gets compromised — a web shell dropped through a vulnerable PHP upload, say
— because the attacker now inherits every permission `apache` has, and DAC has no concept of
"but this process shouldn't normally touch that file." Root is worse: DAC checks don't even
apply to root, since root can read, write, or change the permissions on anything.

## Mandatory Access Control: a policy nothing can opt out of

**Mandatory Access Control (MAC)** closes that gap by adding a second permission check that sits
*on top of* DAC and isn't controlled by the file owner at all — it's defined centrally, in a
system-wide policy, and even root is bound by it (lowering it requires deliberately changing the
MAC policy itself, not just `sudo`). A request has to pass **both** checks: DAC first, then MAC.
The two major real-world Linux MAC implementations are **SELinux** and **AppArmor**, and they
take genuinely different approaches to the same goal.

## SELinux: labels, not paths

**SELinux** (Security-Enhanced Linux), developed by the NSA and shipped by default on
RHEL/CentOS/Fedora, works by attaching a **security context** to every process and every file:

```
ls -Z /var/www/html/index.html
# -rw-r--r--. root root unconfined_u:object_r:httpd_sys_content_t:s0 index.html
```

That context — `user:role:type:level` — is what SELinux actually checks. The `type` field
(`httpd_sys_content_t` here) is the part that matters day to day: SELinux policy says which
process types are allowed to touch which file types, regardless of DAC permissions or who owns
what. Check the current mode with `getenforce` or `sestatus`; switch it (until reboot) with
`setenforce 0` (permissive) or `setenforce 1` (enforcing); make it permanent in
`/etc/selinux/config`. The three modes:

- **Enforcing** — policy is checked and violations are blocked and logged
- **Permissive** — violations are only logged, never blocked (useful for testing a policy change)
- **Disabled** — SELinux is off entirely

## AppArmor: profiles tied to the path

**AppArmor**, the default on Ubuntu, Debian, and SUSE, protects the same kind of ground but
skips labeling altogether. Instead, each confined program gets a **profile** — a plain-text file
in `/etc/apparmor.d/` named after the binary's path (e.g. `usr.sbin.nginx`) — that lists exactly
which files, by path, that program may read, write, or execute. Check status with `aa-status`;
put a specific profile into enforcement with `aa-enforce /etc/apparmor.d/usr.sbin.nginx`, or into
log-only testing mode with `aa-complain`. AppArmor's profiles are generally easier to read at a
glance than SELinux's label-and-policy model, which is a large part of why Ubuntu/Debian chose it
as the simpler default — but it's path-based, so renaming or moving a confined binary can
silently drop it out of its profile's protection in a way a label-based system wouldn't.

## A concrete example: a compromised Apache process

An attacker exploits a vulnerable PHP upload form and drops a web shell, getting arbitrary code
execution as the `apache` user. Under DAC alone, that's bad news: the attacker now has every
permission `apache` has — read/write on the web root, and whatever else that account can touch.
But if the box is RHEL with SELinux in **enforcing** mode, the `httpd_t` process type is
confined to files labeled `httpd_sys_content_t` and a short list of related types. The shell can
deface the website, but it cannot read `/etc/shadow`, cannot write to `/home/alice`, and cannot
open a raw socket to exfiltrate data — not because of file ownership, but because SELinux policy
never grants `httpd_t` those actions, and DAC permissions are irrelevant once SELinux says no.
That containment, happening automatically regardless of what the application itself was coded to
check, is the entire reason MAC exists as a layer above ordinary permissions.

## Key terms

| Term | Meaning |
|---|---|
| DAC (Discretionary Access Control) | Standard Linux permissions — access controlled at the resource owner's discretion; doesn't apply to root |
| MAC (Mandatory Access Control) | A second, system-wide policy layer checked after DAC, binding on every process including root |
| SELinux | RHEL/CentOS/Fedora's MAC implementation — labels processes and files with security contexts, enforced per type |
| AppArmor | Ubuntu/Debian/SUSE's MAC implementation — confines programs with path-based profiles in `/etc/apparmor.d/` |
| Enforcing / Permissive / Disabled | SELinux's three modes — block and log, log only, or off |

## Check yourself

A process is running as `root`, so every DAC check it makes will pass automatically. Why might
that same process still be denied an action on a system running SELinux in enforcing mode?
