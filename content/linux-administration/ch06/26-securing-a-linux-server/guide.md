# Securing a Linux Server

Everything in this chapter — packages, mounts, SSH — comes together here. Securing a server isn't one setting; it's a handful of habits applied consistently: lock down SSH itself, keep a firewall in front of every port, keep software patched, and give accounts only the access they actually need. This is the baseline Northbridge Retail's ops team applies to every server before it ever touches production traffic.

## What you'll learn

- How to harden SSH access by disabling password and root login
- How to control network access with `ufw` (Ubuntu) or `firewalld` (RHEL-family)
- Why keeping packages patched matters as much as any single setting
- The principle of least privilege, applied to users and `sudo`

## Hardening SSH

The single highest-value SSH hardening step is disabling password authentication entirely, so a stolen or guessed password can't be used to log in at all — only a trusted private key can. Edit `/etc/ssh/sshd_config`:

```
PasswordAuthentication no
PermitRootLogin no
```

`PermitRootLogin no` forces anyone logging in to use a named account and `sudo` for privileged commands, rather than connecting directly as root — this also means every privileged action is attributable to a specific person. After editing, reload the service rather than restarting it, so existing connections aren't dropped mid-session:

```
$ sudo systemctl reload sshd
```

Test the new config in a second terminal before closing your current session — getting locked out of a remote server over SSH is a mistake you fix by driving to the data center.

## Firewalls with ufw (Ubuntu)

`ufw` ("uncomplicated firewall") is a simpler front end over the kernel's packet filter:

```
$ sudo ufw allow 22/tcp
$ sudo ufw allow 443/tcp
$ sudo ufw enable
$ sudo ufw status
Status: active
To                         Action      From
22/tcp                     ALLOW       Anywhere
443/tcp                    ALLOW       Anywhere
```

Allow SSH's port *before* enabling the firewall — enabling it with no explicit allow rule for your own connection locks you out immediately.

## Firewalls with firewalld (RHEL-family)

```
$ sudo firewall-cmd --add-service=ssh --permanent
$ sudo firewall-cmd --add-service=https --permanent
$ sudo firewall-cmd --reload
$ sudo firewall-cmd --list-services
ssh https
```

`--permanent` writes the rule to persist across reboots; `--reload` applies permanent changes without dropping currently active connections. Without `--permanent`, a rule only lasts until the next reload or reboot.

## Keeping software patched

A server is only as secure as its most out-of-date package. Regularly running `apt upgrade` or `dnf update` (covered in the previous lesson) closes known vulnerabilities before they're exploited — most real-world breaches use a vulnerability that already had a published patch available.

## Least privilege for users and sudo

Give each person their own named account rather than sharing one login — this is what makes `sudo`'s logging meaningful, since every privileged command is tied to a real identity. `visudo` safely edits `/etc/sudoers`, checking syntax before saving so a mistake can't lock out `sudo` entirely:

```
$ sudo visudo
```

Grant `sudo` access through group membership (adding a user to the `sudo` or `wheel` group) rather than editing `/etc/sudoers` per person, and only grant it to accounts that actually need it.

## Key terms

- **Hardening** — reducing a system's attack surface through configuration changes
- **`PasswordAuthentication no`** — disables password-based SSH login, requiring a key
- **`PermitRootLogin no`** — disables direct SSH login as root, forcing named accounts + sudo
- **Firewall** — a system that allows or blocks network traffic based on rules
- **`ufw`** — a simplified firewall front end on Debian/Ubuntu
- **`firewalld`** — the firewall management service on RHEL-family distributions
- **Principle of least privilege** — granting an account only the access it needs, nothing more
