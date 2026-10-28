# Lesson 16 — SSH: Remote Access & Key-Based Authentication

**Chapter 4 · Linux Fundamentals II — Administration · Lesson 16 of 32**

## What you'll learn

- What SSH is, which port it runs on, and how `ssh user@host` connects you to a remote machine
- How a public/private key pair works, and how `ssh-keygen` creates one
- Where your public key needs to live on the server for key-based login to work
- Why key-based authentication is safer than a password, and why this is exactly how you'll
  connect to a cloud VM

## What SSH actually does

**SSH** (Secure Shell) is the standard way to log into a remote Linux machine over the network
and get a command-line session on it, as if you were sitting at its keyboard. Everything —
the login itself, every command you type, every byte of output — travels encrypted, which is why
SSH replaced older, unencrypted tools like Telnet decades ago. SSH listens on **port 22** by
default, and connecting is one command:

```
$ ssh deploy@203.0.113.10
deploy@203.0.113.10's password:
```

`deploy` is the username on the remote machine, `203.0.113.10` is its address, and once you
authenticate, your terminal is now running commands on that remote server, not your own machine.

## The problem with password login

A password works, but it has a real weakness: it's a secret that has to be typed and verified
over the network every time, and it's the exact kind of secret an attacker can try to guess
over and over — a brute-force attack. Every public-facing cloud VM gets scanned and
password-guessed constantly, which is why production servers disable password login for SSH
entirely and require something stronger: a **key pair**.

## Key pairs: how they work

A key pair is two mathematically related files generated together:

- A **private key** — stays on your own machine, never shared, never leaves your laptop
- A **public key** — safe to copy anywhere, including onto a server

```
$ ssh-keygen -t ed25519 -C "deploy@ltvacademy"
Generating public/private ed25519 key pair.
Enter file in which to save the key (/home/you/.ssh/id_ed25519):
Enter passphrase (empty for no passphrase):
Your identification has been saved in /home/you/.ssh/id_ed25519
Your public key has been saved in /home/you/.ssh/id_ed25519.pub
```

`ssh-keygen` generates both files at once: `id_ed25519` (private — keep this secret) and
`id_ed25519.pub` (public — this is the one you share). The math behind the pair means anything
encrypted with the public key can only be decrypted with the matching private key, and vice
versa — which is the entire basis for how key-based login proves who you are.

## Getting your public key onto the server

For key-based login to work, the server needs a copy of your **public** key in one specific
place: a file called `authorized_keys`, inside a hidden `.ssh` folder in your home directory on
that server.

```
$ ssh-copy-id deploy@203.0.113.10
# or manually:
$ cat ~/.ssh/id_ed25519.pub | ssh deploy@203.0.113.10 \
    "mkdir -p ~/.ssh && cat >> ~/.ssh/authorized_keys"
$ ssh deploy@203.0.113.10 "chmod 700 ~/.ssh && chmod 600 ~/.ssh/authorized_keys"
```

`ssh-copy-id` does exactly that in one step. The permissions matter — SSH will flatly refuse to
use an `authorized_keys` file that's writable by anyone other than its owner, so `chmod 700` on
`.ssh` and `chmod 600` on `authorized_keys` are both required, not optional polish.

## Why key-based auth is the right default

Once your public key is in `authorized_keys`, logging in with `ssh deploy@203.0.113.10` no
longer asks for a password at all — the server challenges your client to prove it holds the
matching private key, your SSH client answers automatically, and you're in. This is safer than a
password for three concrete reasons: there's no secret transmitted over the network to intercept,
the private key is effectively impossible to brute-force (unlike a short password), and revoking
someone's access is one line deleted from `authorized_keys`, instead of forcing a password reset
for everyone who shared it.

This is also, directly, how you'll connect to almost every cloud VM in the chapters ahead — AWS,
Azure, and GCP all let you upload a public key when you create a virtual machine, and from that
moment on, your private key is the only way in.

## Key terms

| Term | Meaning |
|---|---|
| SSH | Secure Shell — encrypted remote login to a Linux machine, over port 22 by default |
| Private key | The secret half of a key pair; never leaves your own machine |
| Public key | The shareable half of a key pair; placed on servers you want to log into |
| `authorized_keys` | The file in `~/.ssh/` on a server listing public keys allowed to log in |
| `ssh-keygen` | The command that generates a new public/private key pair |

## Check yourself

If someone steals a copy of your public key, can they log in as you? Why or why not?
