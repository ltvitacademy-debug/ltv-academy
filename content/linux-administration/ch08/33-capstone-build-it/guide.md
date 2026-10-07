# Capstone: Build It

Time to execute the plan from the kickoff lesson, step by step, on Northbridge Retail's new server, `app-02`. Every command below is real and in the order it actually has to run — follow it on your own lab VM alongside this guide.

## What you'll learn

- How to create a sudo-capable user and confirm their access before relying on it
- How to generate and install an SSH key pair, then verify it works before touching passwords
- How to disable root login and password authentication in `sshd_config` safely
- How to enable `ufw`, wrap an internal tool in a systemd service, and schedule a cron job
- How to confirm all of it in the logs

## 1. Create the user and confirm sudo access

```
$ sudo useradd -m -s /bin/bash deploy
$ sudo passwd deploy
New password:
Retype new password:
passwd: password updated successfully

$ sudo usermod -aG sudo deploy
$ groups deploy
deploy : deploy sudo
```

`-m` creates a home directory, `-s /bin/bash` sets the login shell. Adding `deploy` to the `sudo` group (Debian/Ubuntu's sudo-capable group) grants admin access without ever logging in as root directly. Confirm it actually works before moving on:

```
$ su - deploy
$ sudo whoami
[sudo] password for deploy:
root
```

If `sudo whoami` doesn't return `root`, stop here and fix it — everything after this depends on `deploy` having working sudo access.

## 2. Generate and install an SSH key

On your own machine (not the server), generate a key pair:

```
$ ssh-keygen -t ed25519 -C "deploy@app-02"
Generating public/private ed25519 key pair.
Enter file in which to save the key (/home/you/.ssh/id_ed25519):
Enter passphrase (empty for no passphrase):
Your identification has been saved in /home/you/.ssh/id_ed25519
Your public key has been saved in /home/you/.ssh/id_ed25519.pub
```

Copy the public key to the server:

```
$ ssh-copy-id deploy@app-02
Number of key(s) added: 1
```

Now confirm key-based login works, in a **new terminal, without closing your current session**:

```
$ ssh deploy@app-02
Welcome to Ubuntu 24.04 LTS
deploy@app-02:~$
```

Do not continue to the next step until this logs you in with no password prompt.

## 3. Disable root login and password authentication

Edit `/etc/ssh/sshd_config` and set:

```
PermitRootLogin no
PasswordAuthentication no
```

Before restarting `sshd`, always test the config file for syntax errors:

```
$ sudo sshd -t
```

No output means the config is valid. Now restart and verify:

```
$ sudo systemctl restart ssh
$ sudo sshd -T | grep -i -E "permitrootlogin|passwordauthentication"
permitrootlogin no
passwordauthentication no
```

Keep your already-open key-based session from step 2 active while you test a fresh connection — that way, if something is misconfigured, you still have a way in to fix it.

## 4. Enable the firewall

```
$ sudo ufw allow OpenSSH
Rule added

$ sudo ufw enable
Command may disrupt existing ssh connections. Proceed with operation (y|n)? y
Firewall is active and enabled on system startup

$ sudo ufw status
Status: active

To                         Action      From
--                         ------      ----
OpenSSH                    ALLOW       Anywhere
```

`ufw allow OpenSSH` must run **before** `ufw enable` — once enabled, the default policy denies everything not explicitly allowed, including the SSH connection you're using right now.

## 5. Wrap the internal tool in a systemd service

Northbridge's internal tool is a small script at `/opt/northbridge/bin/northbridge-tool`. Create `/etc/systemd/system/northbridge-tool.service`:

```
[Unit]
Description=Northbridge Retail internal tool
After=network.target

[Service]
Type=simple
User=deploy
ExecStart=/opt/northbridge/bin/northbridge-tool
Restart=on-failure

[Install]
WantedBy=multi-user.target
```

```
$ sudo systemctl daemon-reload
$ sudo systemctl enable --now northbridge-tool
$ systemctl status northbridge-tool
● northbridge-tool.service - Northbridge Retail internal tool
     Loaded: loaded (/etc/systemd/system/northbridge-tool.service; enabled)
     Active: active (running) since ...
```

`enable --now` both enables the service to start on boot and starts it immediately, in one command.

## 6. Schedule the nightly cron job

```
$ sudo crontab -u deploy -e
```

Add one line for a 2 a.m. nightly maintenance run:

```
0 2 * * * /opt/northbridge/bin/nightly-cleanup.sh >> /var/log/northbridge/nightly-cleanup.log 2>&1
```

```
$ sudo crontab -u deploy -l
0 2 * * * /opt/northbridge/bin/nightly-cleanup.sh >> /var/log/northbridge/nightly-cleanup.log 2>&1
```

Redirecting both stdout and stderr (`2>&1`) to a log file means a cron job's failures are never silently lost — they land somewhere you'll actually see them.

## 7. Review the logs

```
$ sudo journalctl -u northbridge-tool -n 10 --no-pager
... Started Northbridge Retail internal tool.

$ sudo journalctl -u ssh -n 20 --no-pager | grep -i "accepted"
... Accepted publickey for deploy from 10.0.0.15 port 51322 ssh2: ED25519 ...

$ sudo tail -n 20 /var/log/auth.log
... sshd[2213]: Accepted publickey for deploy from 10.0.0.15 ...
```

You're looking for two things: `Accepted publickey` entries (confirming key-based login, never a password) and the absence of any accepted login as `root`. Both confirm the hardening in steps 2–3 is actually working, not just configured.

## Key terms

- **`usermod -aG sudo`** — adds a user to the sudo group, granting admin access without logging in as root
- **`ssh-copy-id`** — copies a local public key to a remote server's `~/.ssh/authorized_keys`
- **`sshd -t`** — tests `sshd_config` for syntax errors before restarting the service
- **`ufw allow` then `ufw enable`** — order matters: allow SSH before turning on a default-deny firewall
- **`systemctl enable --now`** — enables a service to start on boot and starts it immediately
- **`crontab -u user -e`** — edits a specific user's scheduled cron jobs
