# Capstone: Wrap-Up & Portfolio Presentation

You've built and hardened `app-02` for Northbridge Retail. This last lesson closes the loop two ways: a final verification checklist to run against your own work, and guidance on how to describe this exact project in a resume, a GitHub README, or an interview — because a hardened server nobody can see or hear about doesn't help your job search.

## What you'll learn

- A complete verification checklist — one command per requirement from the kickoff brief
- How to turn this project into a short, concrete resume bullet
- How to structure a GitHub README for this capstone so it reads like real documentation
- How to answer "walk me through a project you're proud of" using this exact build

## Final verification checklist

Run each of these against your own `app-02` build. Every one should match the expected result — if any doesn't, that's the thing to go back and fix before you consider this done.

```
# 1. Sudo user exists and works (not root)
$ groups deploy
deploy : deploy sudo

# 2. SSH key-based login — connect and confirm no password prompt
$ ssh deploy@app-02
deploy@app-02:~$

# 3. Root login disabled
$ sudo sshd -T | grep -i permitrootlogin
permitrootlogin no

# 4. Password authentication disabled
$ sudo sshd -T | grep -i passwordauthentication
passwordauthentication no

# 5. Firewall active, default-deny, SSH explicitly allowed
$ sudo ufw status verbose
Status: active
Default: deny (incoming), allow (outgoing), disabled (routed)
To                         Action      From
--                         ------      ----
OpenSSH                    ALLOW IN    Anywhere

# 6. Internal tool running as a managed systemd service
$ systemctl is-enabled northbridge-tool
enabled
$ systemctl is-active northbridge-tool
active

# 7. Nightly cron job scheduled
$ sudo crontab -u deploy -l
0 2 * * * /opt/northbridge/bin/nightly-cleanup.sh >> /var/log/northbridge/nightly-cleanup.log 2>&1

# 8. Logs confirm key-based access, no accepted root logins
$ sudo journalctl -u ssh --no-pager | grep -i "accepted" | tail -5
```

If every check above returns what's shown, `app-02` meets Northbridge's baseline — the same one a real ops team would sign off on before putting a server into service.

## Turning it into a resume bullet

A resume bullet should name the specific skills and be honest about scope — this was a lab capstone, not production infrastructure for a real company, so phrase it that way:

> Hardened a Linux server end-to-end in a self-directed lab project: configured SSH key-based authentication, disabled root login, implemented a default-deny firewall with `ufw`, and deployed an internal tool as a managed `systemd` service with a scheduled `cron` maintenance job.

Notice what that sentence does: it names the actual tools (`ufw`, `systemd`, `cron`, SSH keys), not vague phrases like "worked on Linux security." A hiring manager skimming resumes recognizes specific tool names faster than general claims.

## Structuring a GitHub README for this project

If you push your scripts and systemd unit file to a repo, a README with this shape reads like real documentation instead of a dump of files:

```markdown
# Linux Server Hardening — Capstone Project

A baseline hardening and setup walkthrough for a fictional company's
internal Linux server, covering user management, SSH key authentication,
firewall configuration, service management, and task scheduling.

## What this does
- Creates a least-privilege sudo user (no direct root access)
- Enforces SSH key-only authentication, root login disabled
- Enables a default-deny firewall (ufw) with an explicit SSH allow rule
- Runs an internal tool as a systemd service with automatic restart
- Schedules a nightly maintenance job via cron

## Files
- `hardening-checklist.md` — the verification steps run against the server
- `northbridge-tool.service` — the systemd unit file
- `nightly-cleanup.sh` — the scheduled maintenance script
```

Keep the actual `.service` file and scripts in the repo alongside it — an interviewer who's interested will often open them, and real, working files back up everything the README claims.

## Answering "walk me through a project you're proud of"

A strong answer to this question in an interview follows the same shape every time: situation, what you did, and the result you can prove. For this capstone:

- **Situation**: "I set up and hardened a Linux server from scratch in a lab environment, following the same baseline a real ops team would require before trusting a server with production traffic."
- **What you did**: "I created a least-privilege admin account, configured SSH key-only authentication, disabled root login, set up a default-deny firewall, and ran an internal tool as a managed systemd service with a scheduled cron job."
- **Result you can prove**: "I verified every piece afterward — confirmed in `sshd -T` that root login and password auth were off, confirmed the firewall policy with `ufw status`, and confirmed from the logs that logins were coming through via key, not password."

That last part — verification, not just configuration — is what separates someone who followed a checklist from someone who understands why each step matters. Be ready for a natural follow-up question like "what would happen if you enabled the firewall before allowing SSH?" — you already know the answer from the kickoff lesson, and being able to explain *why* the order matters is exactly what a technical interviewer is listening for.

## Key terms

- **Verification checklist** — a list of commands run after configuration to confirm each requirement actually took effect, not just that it was configured
- **Least-privilege account** — a non-root user with only the access it needs, used for day-to-day administration via `sudo`
- **README** — a repository's top-level documentation file, explaining what a project does and how it's organized
- **Situation / What you did / Result** — a simple structure for answering open-ended interview questions about past projects with specifics instead of generalities
