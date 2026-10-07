# Script — Capstone Kickoff: Set Up and Harden a Linux Server

## Segment 1 (title)

This is the project brief for your capstone. Northbridge Retail is standing up a new internal server, and the ops team has handed you the same checklist they hand every new hire before that server goes anywhere near the internet.

## Segment 2 (steps)

The first half of the baseline is about who can get onto the server and how: a named sudo account instead of working as root directly, SSH key-based access so no password is ever needed to log in, and a default-deny firewall that only opens the ports this server actually needs. On top of that, root login gets disabled in sshd entirely, so root can't log in directly by key or by password.

## Segment 3 (steps)

The second half is about what the server actually does once it's reachable: Northbridge's internal tool runs as a managed systemd service instead of something someone has to remember to restart by hand, a nightly maintenance task runs unattended through cron, and a log review at the end confirms all of it is genuinely behaving the way it was configured.

## Segment 4 (steps)

The order here isn't arbitrary — each step depends on the one before it holding up. You confirm key-based login works before you disable password authentication, or you can lock yourself out permanently; you confirm sudo works before disabling root login, or there's no way to do admin work at all; and you open the firewall for SSH before you turn the firewall on, or a default-deny policy with no SSH rule drops your own connection.

## Segment 5 (code)

By the end of the next lesson, three quick checks prove the hardening actually took effect: sshd -T confirms root login is off, ufw status confirms the firewall is active with SSH allowed, and systemctl is-active confirms Northbridge's internal tool is running as a managed service.

## Segment 6 (outro)

Every piece of this plan is something you've already learned in this course — this capstone is about doing all of it together, in the right order, on one real server. Up next, lesson thirty-three: Capstone, Build It — the hands-on walkthrough, every command, in order, on app-02.
