# Lesson 18 — auditd and Linux System Auditing

**Chapter 5 · Linux Hardening & Security Tools · Lesson 2 of 4**

## What you'll learn

- What `auditd` actually is, and why it's a different kind of logging than an application's own log file
- How to write a watch rule with `auditctl` and make it persistent in `/etc/audit/rules.d/`
- How to query what auditd captured with `ausearch` and summarize it with `aureport`
- Why syscall-level auditing catches activity that application-level logs can miss entirely

## A different layer of logging

By now you've used application-level logs constantly — `/var/log/secure`, `journalctl`, a web
server's access log. Those logs record whatever the application itself was written to record,
and nothing more: if a program never calls a logging function for a given action, that action
leaves no trace in its log. **`auditd`** (the Linux Audit Daemon) works at a fundamentally
different layer — the **kernel**. It watches system calls and file access directly, based on
rules you configure, and logs matching events to `/var/log/audit/audit.log` regardless of
whether any application chose to mention them. That's the real distinction: application logs
show you what software decided to tell you; auditd shows you what actually happened at the
syscall level, whether any program logged it or not.

## Writing a rule with auditctl

Audit rules tell the kernel what to watch. The simplest kind is a **watch rule** on a file or
directory:

```
auditctl -w /etc/shadow -p wa -k shadow_changes
```

`-w` names the path, `-p wa` says watch for **w**rite and **a**ttribute-change access (read,
execute, and attribute options also exist), and `-k` tags matching log entries with a label —
`shadow_changes` here — so you can find them quickly later. Rules entered with `auditctl`
directly are **not persistent**; they vanish on reboot. For rules that need to survive a
restart, write them into a file under `/etc/audit/rules.d/` (e.g. `/etc/audit/rules.d/audit.rules`),
which `auditd` loads automatically on startup via `augenrules`.

Beyond simple file watches, auditd can also watch specific **syscalls** directly:

```
-a always,exit -F arch=b64 -S execve -k exec_commands
```

That rule logs every `execve` call — in other words, every program execution on the system,
tagged `exec_commands` — which is a far broader net than watching one file.

## Querying what was captured

Raw `audit.log` is dense and not meant to be read line by line. Two tools make sense of it:

```
ausearch -k shadow_changes
ausearch -f /etc/shadow

aureport -au     # authentication report
aureport -f      # file access report
```

`ausearch` filters the log by a key (`-k`), a file (`-f`), a user, a time range, and more,
showing full matching events. `aureport` instead produces a **summarized** report across a
category — authentication attempts, file access, or executed commands — which is usually the
faster starting point before drilling into `ausearch` for the specific event you care about.

## A concrete example: who touched /etc/shadow

You want to know if anyone modifies the password hash file outside of normal `passwd` activity.
First, set a persistent watch rule in `/etc/audit/rules.d/shadow.rules`:

```
-w /etc/shadow -p wa -k shadow_changes
```

After `augenrules --load` (or a service restart) applies it, any write or attribute change to
`/etc/shadow` — whether through `passwd`, a text editor, or a script — generates an audit event.
Days later, investigating a suspicious account, you run `ausearch -k shadow_changes` and get back
the exact timestamp, the process that made the change, and the user ID that triggered it —
detail no application log would have captured, because the editor used to make the change was
never written to log anything about `/etc/shadow` specifically.

## Key terms

| Term | Meaning |
|---|---|
| auditd | The Linux Audit Daemon — a kernel-level subsystem logging syscalls and file access per configured rules |
| auditctl | The command used to add audit rules at runtime (not persistent across reboot) |
| /etc/audit/rules.d/ | Where persistent audit rules are stored, loaded automatically via augenrules |
| ausearch | Queries audit.log for specific matching events, filterable by key, file, user, or time |
| aureport | Produces summarized reports across a category, like authentication or file access |

## Check yourself

A text editor used to modify `/etc/shadow` never logs anything about that file itself. Why does
auditd still catch the change when an application-level log wouldn't?
