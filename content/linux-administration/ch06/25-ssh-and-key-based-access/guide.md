# SSH & Key-Based Access

SSH is how you reach almost every Linux server you'll ever administer remotely — an encrypted connection for a shell, a file copy, or a tunnel. Password authentication over SSH works, but key-based authentication is both more secure and more convenient once it's set up, which is why Northbridge Retail requires it for every engineer with access to a production server.

## What you'll learn

- How to connect to a remote server with `ssh`
- How public-key authentication works, at a level you can actually reason about
- How to generate a key pair and copy the public key to a server
- How to copy files over SSH with `scp`, and manage multiple hosts with `~/.ssh/config`

## Connecting with ssh

```
$ ssh deploy@web01.northbridgeretail.internal
deploy@web01.northbridgeretail.internal's password:
```

The first time you connect to a new host, SSH shows a fingerprint and asks you to confirm it — this is SSH recording the server's identity so it can detect if that identity ever changes unexpectedly later (which could mean the server was rebuilt, or something worse):

```
The authenticity of host 'web01.northbridgeretail.internal' can't be established.
ED25519 key fingerprint is SHA256:9fK3mZ...
Are you sure you want to continue connecting (yes/no/[fingerprint])?
```

## How public-key authentication works

A key pair has two halves: a private key, which never leaves your machine, and a public key, which you give to any server you want to access. When you connect, the server challenges your SSH client to prove it holds the private key matching a public key it already trusts — your private key answers that challenge mathematically, and the password is never involved at all.

```
$ ssh-keygen -t ed25519 -C "deploy@northbridgeretail.com"
Generating public/private ed25519 key pair.
Enter file in which to save the key (/home/deploy/.ssh/id_ed25519):
Enter passphrase (empty for no passphrase):
```

This creates `~/.ssh/id_ed25519` (private — keep this secret) and `~/.ssh/id_ed25519.pub` (public — safe to share). A passphrase encrypts the private key file itself, adding a second layer if the key file is ever stolen.

## Copying your public key to a server

`ssh-copy-id` appends your public key to the right file on the remote server in one step:

```
$ ssh-copy-id deploy@web01.northbridgeretail.internal
/usr/bin/ssh-copy-id: INFO: attempting to log in with the new key(s)...
Number of key(s) added: 1
```

Under the hood, this appends the contents of your `.pub` file to `~/.ssh/authorized_keys` on the remote server — the list of public keys that account will accept. After this, `ssh deploy@web01...` connects with no password prompt at all.

## Copying files with scp

`scp` uses the same authentication as `ssh` to copy files to or from a remote host:

```
$ scp deploy-report.txt deploy@web01.northbridgeretail.internal:/opt/northbridge/
$ scp deploy@web01.northbridgeretail.internal:/var/log/northbridge/deploy.log ./
```

The first copies a local file up to the server; the second pulls a remote file back down. `-r` copies a directory recursively.

## Managing multiple hosts with ~/.ssh/config

Typing full hostnames and usernames for every server gets old fast. `~/.ssh/config` lets you define a shortcut per host:

```
# ~/.ssh/config
Host web01
    HostName web01.northbridgeretail.internal
    User deploy
    IdentityFile ~/.ssh/id_ed25519
```

After this, `ssh web01` connects exactly as if you'd typed the full command, and `scp` honors the same config.

## Key terms

- **SSH (Secure Shell)** — an encrypted protocol for remote shell access, file transfer, and tunneling
- **Key pair** — a private key (kept secret) and public key (shared) used together for authentication
- **`ssh-keygen`** — generates a new SSH key pair
- **`authorized_keys`** — the file on a server listing public keys an account will accept
- **`ssh-copy-id`** — copies a public key to a remote server's authorized_keys in one step
- **`scp`** — copies files to or from a remote host over SSH
- **`~/.ssh/config`** — defines per-host shortcuts (hostname, user, key) for `ssh` and `scp`
