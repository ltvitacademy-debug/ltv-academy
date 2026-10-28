# Lesson 14 — PAM: Pluggable Authentication Modules Basics

**Chapter 4 · Linux Administration Deep Dive · Lesson 14 of 32**

## What you'll learn

- What PAM actually is: a shared framework that `login`, `sudo`, `su`, and `sshd` all call into
  instead of each checking passwords themselves
- How PAM configuration is organized under `/etc/pam.d/`, one file per service
- What `pam_unix.so` does, and how `pam_faillock.so` adds an account-lockout defense on top of it
- Why stacking modules behind one shared framework lets you add a new auth policy once, without
  touching any application's source code

## PAM: one framework, many callers

**PAM** — Pluggable Authentication Modules — is the framework every program that needs to verify
a user's identity on Linux calls into, rather than implementing password checking itself. `login`,
`sudo`, `su`, `sshd`, and `passwd` all hand authentication off to the shared `libpam` library,
which reads a config file matching that service's name and runs a stack of pluggable modules to
decide allow or deny. That indirection is the entire point: add a policy — say, locking an account
after repeated failed attempts — to the shared stack once, and every one of those programs
inherits it, with zero changes to their own source code.

```
$ cat /etc/pam.d/sudo
#%PAM-1.0
auth       include      system-auth
account    include      system-auth
password   include      system-auth
session    include      system-auth
```

Each `/etc/pam.d/<service>` file is organized into four phase types: **auth** (verifies who you
are), **account** (checks the account itself isn't expired or locked), **password** (handles
password changes), and **session** (sets up and tears down the session, like mounting a home
directory). Most service files, like this one, just `include` a shared stack such as
`system-auth` rather than repeating the same rules in every file.

## pam_unix.so: the traditional password check

```
auth required pam_unix.so
```

Near the bottom of a typical `auth` stack sits `pam_unix.so` — the module that actually checks a
typed password against the hashed value stored in `/etc/shadow`. It's the traditional Unix
password check, and it's present in nearly every PAM stack as the baseline authentication step
that every other module builds on top of.

## pam_faillock.so: locking out after failed attempts

```
auth required pam_faillock.so preauth silent deny=5 unlock_time=900
auth [success=1 default=bad] pam_unix.so
auth [default=die] pam_faillock.so authfail deny=5 unlock_time=900
account required pam_faillock.so
```

`pam_faillock.so` tracks failed login attempts per user and temporarily locks the account once
too many pile up. `deny=5` sets the threshold — five failed attempts — and `unlock_time=900`
releases the lock automatically after 900 seconds (15 minutes). `preauth` runs the check before
the password is even evaluated, so an already-locked account never gets as far as `pam_unix.so`;
`authfail` records a failure once `pam_unix.so` denies the password. The bracketed terms like
`[success=1 default=bad]` are control-flag syntax that decides what happens next in the stack
based on that module's result — the mechanism that makes stacking multiple modules together
possible at all. Together, this is a real, working defense against brute-force password guessing
against `login`, `sudo`, or `ssh` — all three, from one shared config change.

## Key terms

| Term | Meaning |
|---|---|
| PAM | Pluggable Authentication Modules — the shared framework Linux auth programs call into |
| `/etc/pam.d/` | Directory of PAM config files, one per service (`sudo`, `sshd`, `login`, …) |
| `pam_unix.so` | The module that checks a password against the hash in `/etc/shadow` |
| `pam_faillock.so` | The module that locks an account after too many failed attempts |
| Control flag | The `required`/`sufficient`/bracketed syntax that decides how a module's result affects the stack |

## Check yourself

If you removed `pam_faillock.so` from a shared PAM stack like `system-auth`, what real-world
protection would the system lose, and for which programs — name at least two?
