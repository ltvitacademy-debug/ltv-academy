# Script — Securing a Linux Server

## Segment 1 (title)

Everything in this chapter — packages, mounts, SSH — comes together here. Securing a server isn't one setting; it's a handful of habits applied consistently, and it's the baseline Northbridge Retail's ops team applies to every server before it ever touches production traffic.

## Segment 2 (code)

The single highest-value SSH hardening step is disabling password authentication entirely in sshd_config, so a stolen or guessed password can't log in at all — only a trusted private key can. PermitRootLogin no forces anyone connecting to use a named account and sudo instead of root directly, and reloading rather than restarting applies the change without dropping existing sessions.

## Segment 3 (code)

ufw is Ubuntu's simplified firewall front end, and the order matters — you allow SSH's port before you enable the firewall, because enabling it with no rule for your own connection locks you out immediately. ufw status confirms exactly which ports are open and to whom.

## Segment 4 (code)

firewalld does the same job on RHEL-family systems, using named services instead of raw port numbers. The --permanent flag makes a rule survive a reboot, and --reload applies permanent changes without dropping connections that are already active.

## Segment 5 (steps)

Beyond SSH and the firewall, a server is only as secure as its most out-of-date package, so regularly running apt upgrade or dnf update closes known vulnerabilities before they're exploited. And giving each person their own named account, with sudo granted through group membership rather than shared logins, is what makes every privileged action traceable to a real identity.

## Segment 6 (outro)

Hardened SSH, a firewall, current patches, and least privilege are the baseline every Northbridge server gets before go-live. Up next, chapter seven, lesson twenty-seven: script basics, for turning these very commands into a script you can run on demand instead of typing them one at a time.
