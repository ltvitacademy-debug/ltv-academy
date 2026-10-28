# Lesson 19 — SSH Hardening Beyond Key-Based Auth

**Chapter 5 · Linux Hardening & Security Tools · Lesson 3 of 4**

## What you'll learn

- Why key-based authentication alone isn't the end of SSH hardening
- How `PermitRootLogin no` and a non-default `Port` reduce two different kinds of risk
- How `AllowUsers` and `DenyUsers` restrict exactly who's permitted to connect at all
- The safe order of operations for disabling password authentication without locking yourself out

## Keys are the foundation, not the finish line

By this point in the course, you've set up SSH key pairs and disabled password login is the
obvious next step everyone reaches for — but `sshd_config` has several other settings worth
hardening first, each closing a different gap that key-based auth alone doesn't touch. All of
these live in `/etc/ssh/sshd_config`, and every change here needs the same safety habit: test
the config before reloading it.

```
sshd -t
```

`sshd -t` checks the syntax of `sshd_config` without restarting the service — catching a typo
*before* it breaks every future SSH connection to the box, rather than after.

## Disabling root login outright

```
PermitRootLogin no
```

Even with keys required, allowing direct root login means a single compromised key (or a
misconfigured key) is instant full-system access with no second step. With
`PermitRootLogin no`, an administrator must log in as a named, ordinary user and then `sudo` to
root — which not only requires knowing (or compromising) two separate credentials chains in
practice, but also means every privileged action leaves a record of *which* named user invoked
`sudo`, instead of an undifferentiated root login.

## Moving off the default port

```
Port 2222
```

Changing the listening port away from 22 isn't real security on its own — a determined attacker
can scan for an open SSH service on any port in seconds. What it actually does is cut the volume
of automated, opportunistic scanning noise that hits port 22 nonstop on any internet-facing host,
which keeps your logs (and `fail2ban`, covered next lesson) focused on attempts that specifically
targeted your box rather than drowning in internet background noise. If the host runs SELinux,
remember the crosslink back to Lesson 17: SSHD's SELinux policy only expects to bind the
`ssh_port_t` type to the ports it already knows about, so a changed port also needs
`semanage port -a -t ssh_port_t -p tcp 2222` or the daemon will fail to bind under enforcing mode.

## Naming exactly who's allowed to connect

```
AllowUsers alice bob deploy
DenyUsers  baduser
```

`AllowUsers` is an explicit allow-list — only the named accounts may authenticate over SSH at
all, even if they exist and have valid keys. `DenyUsers` does the opposite, blocking specific
accounts while leaving everyone else alone. Both are checked after standard authentication, so
they're a hard backstop, not a replacement for keys — a user denied here is rejected even with a
perfectly valid key.

## Turning off password authentication — carefully

```
PasswordAuthentication no
```

This is the big one, and the one most likely to lock you out if done carelessly. The safe
order: confirm key-based login already works from a **second, still-open** SSH session, run
`sshd -t` to check syntax, restart `sshd`, and only then close the original session after
confirming a brand-new connection succeeds with keys alone. Flipping this setting and restarting
`sshd` from your *only* open session, without verifying key auth works first, is the single most
common way administrators accidentally lock themselves out of a remote server.

## A concrete example: the safe rollout order

You've confirmed your key logs you in fine. Session 1 stays open. In Session 2, you edit
`sshd_config`, adding `PermitRootLogin no` and `PasswordAuthentication no`. You run `sshd -t` —
clean. You restart `sshd`. Before closing Session 1, you open a *third* terminal and connect
fresh with your key — it works. Only now do you close the old sessions, confident a typo in the
config didn't just strand you outside a box with no other way in.

## Key terms

| Term | Meaning |
|---|---|
| sshd -t | Tests sshd_config syntax without restarting the service |
| PermitRootLogin no | Forces root access through a named user + sudo, instead of direct root login |
| AllowUsers / DenyUsers | An explicit allow-list or deny-list of accounts permitted to authenticate over SSH |
| PasswordAuthentication no | Disables password login entirely, requiring key-based authentication |

## Check yourself

Why should `PasswordAuthentication no` never be the first change you make and restart `sshd` for,
in a single session, without a second connection already open?
