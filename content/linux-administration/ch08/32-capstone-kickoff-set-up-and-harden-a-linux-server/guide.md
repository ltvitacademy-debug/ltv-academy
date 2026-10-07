# Capstone Kickoff: Set Up and Harden a Linux Server

This is the project brief for your capstone. Northbridge Retail is standing up a new internal server, and the ops team has handed you the same checklist they hand every new hire before that server goes anywhere near the internet: create the right accounts, lock down SSH, put a firewall in front of it, stop root from logging in directly, and make sure something is actually watching it once it's live. Lesson 33 walks through building all of it command by command; lesson 34 reviews it and covers how to present the finished project. This lesson is the plan.

## What you'll learn

- The full scope of the capstone: what you're building and why each piece matters
- How the pieces connect — users and groups, SSH key auth, the firewall, root lockdown, a systemd service, a cron job, and log review
- What "done" looks like, so you can check your own work in lesson 34
- Why this exact checklist is the realistic baseline for standing up any production Linux server

## The scenario

Northbridge Retail needs a new internal server — call it `app-02` — to run a small internal tool and a nightly maintenance job. Before it's trusted with anything real, it has to meet the same baseline every server at Northbridge meets. That baseline is your capstone:

1. **Users & groups** — a named account for you to work under (never root directly), added to the right group for sudo access
2. **SSH key-based access** — a key pair, the public key installed for that account, so logging in never requires a password
3. **Firewall** — only the ports this server actually needs are open; everything else is denied by default
4. **Root login disabled** — `sshd` is configured so root cannot log in over SSH at all, key or password
5. **A systemd service** — Northbridge's internal tool runs as a managed service, not a process someone has to remember to restart by hand
6. **A cron job** — a nightly maintenance task runs on a schedule, unattended
7. **Log review** — confirming, from the logs, that the login path, the service, and the cron job are all actually behaving the way you configured them

Every one of these is something you've already learned in this course — Users & Groups and sudo & Privilege in Chapter 3, SSH & Key-Based Access and Securing a Linux Server in Chapter 6, systemd & Services and Scheduling With cron in Chapter 5. The capstone's only new skill is doing all of it together, in the right order, on one real server, the way it actually happens on the job.

## Why the order matters

Each step depends on the one before it holding up:

- You create the SSH key and confirm key-based login **before** you disable password authentication — otherwise you can lock yourself out permanently.
- You confirm your new non-root account can `sudo` **before** you disable root login — otherwise there's no way to perform admin tasks at all once root is locked out.
- You open the firewall for SSH specifically **before** you enable the firewall itself — enabling a default-deny firewall with no SSH rule in place drops your own connection.

This is also the realistic order a working sysadmin follows, and interviewers who ask about server hardening are often listening for exactly this sequencing, not just the list of tools.

## What "done" looks like

By the end of lesson 33, `app-02` should have:

- A dedicated admin user, in the sudo-capable group, with no password-based SSH login
- `PermitRootLogin no` and `PasswordAuthentication no` set in `sshd_config`, confirmed with `sshd -T`
- `ufw` (or `firewalld`) enabled, default-deny, with an explicit allow rule for SSH and any other port the internal tool needs
- A systemd unit for the internal tool, enabled so it starts on boot, confirmed running with `systemctl status`
- A cron job (or systemd timer) running a nightly maintenance script, confirmed in the user's crontab
- A quick pass through `journalctl` and `/var/log/auth.log` (or `/var/log/secure`) showing successful key-based logins and no unexpected root login attempts

Lesson 34 turns this list into a checklist you walk through and check off, plus guidance on describing this exact project in a portfolio or interview.

## Key terms

- **Baseline hardening** — the minimum set of security steps (no root login, key-only SSH, a default-deny firewall) expected on any server before it's trusted with real traffic
- **Principle of least privilege** — give an account only the access it needs; work as a named sudo user, not as root directly
- **Default-deny firewall** — a firewall policy that blocks all traffic except what's explicitly allowed
- **Managed service** — a program run under systemd so it starts on boot and restarts predictably, instead of running unmanaged in a terminal
- **Unattended job** — a cron job or systemd timer that runs on a schedule without a person triggering it
