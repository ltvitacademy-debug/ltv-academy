# Lesson 9 — Troubleshooting an Access-Denied Issue

**Chapter 2 · Access Control Lists (ACLs) · Lesson 9 of 36**

## What you'll learn

- The Security Debugger — what it actually shows you, and where to turn it on
- Why it beats guessing: it lists every ACL evaluated and why each passed or failed
- Elevate Roles and the `security_admin` role — what it's for
- Why `security_admin` is deliberately not always-on, even for full admins
- A repeatable order of operations for any access-denied report

## The Security Debugger: stop guessing, start reading

The single most useful tool for ACL troubleshooting is the Security
Debugger (sometimes called "Debug Security Rules"), reachable as a
toggle in the user's profile menu or through System Diagnostics. Once
it's switched on, the next page load or form render shows a security
log underneath the output: every single ACL the platform evaluated
for that page, in order, with a clear pass or fail for each one and
the reason. If a field-level ACL failed because the user lacked the
required role, the debugger tells you that explicitly — you don't
have to reconstruct it from symptoms. If a script-based ACL returned
`answer = false`, the debugger names that exact ACL.

This replaces the old guess-and-check approach of opening the Access
Control list, filtering by table, and manually reasoning through every
record that might apply. With the debugger on, you load the exact page
the user is complaining about, and it hands you the real evaluation
trace — the same one described back in Lesson 6, happening in front of
you instead of in theory.

## Elevate Roles and `security_admin`

Editing an ACL is itself governed by ACLs — the `sys_security_acl`
table has its own access rules, and by default, even a full admin
doesn't automatically bypass them. To edit ACL records, an admin needs
the `security_admin` role active, and that role is activated through
"Elevate Roles" (found under the user's profile icon), not held
permanently turned on.

This is deliberate, not an oversight. `security_admin` is powerful
enough to bypass the very ACL script evaluation it's meant to
configure — if it were always active, an admin editing an unrelated
ACL could accidentally break the ACL that governs ACL editing itself,
with no safety net, because that same elevated role would have silently
sailed past the broken rule instead of being stopped by it. Requiring
a deliberate elevation step means admins only carry that bypass power
for the specific session where they intend to use it, and the rest of
the time, they're subject to the same ACL enforcement as everyone
else — including ACLs on `sys_security_acl` itself.

## A repeatable order of operations

When a user reports "I can't see/edit X," work it in this order:

1. **Identify the exact operation and field.** Is this a whole record
   they can't see (table-level), or one field on a record they can
   open fine (field-level)? Lesson 7's distinction decides where you
   look first.
2. **Turn on the Security Debugger and reproduce it.** Load the same
   page as the affected user (or impersonate them, if permitted) and
   read the trace. It names every ACL evaluated and the pass/fail
   reason for each.
3. **Open the specific ACL the debugger flagged.** Check its Requires
   role list, its Condition, and its Script — remember from Lesson 8
   that all present ingredients must pass.
4. **Confirm the user's actual roles and group memberships** against
   what the ACL requires, rather than assuming what you think they
   have.
5. **Only elevate roles if you need to edit the ACL itself** — reading
   and troubleshooting rarely requires `security_admin`; editing the
   ACL record to fix it does.

## Key terms

| Term | Meaning |
|---|---|
| Security Debugger | Diagnostic view listing every ACL evaluated for a page load, with pass/fail reasons |
| Debug Security Rules | Another name for the same Security Debugger toggle |
| Elevate Roles | The profile-menu action that activates `security_admin` for the current session |
| `security_admin` | Role required to edit ACL records; deliberately not always-on |
| Impersonation | Viewing the instance as another user, useful for reproducing their exact access |

## Check yourself

Why does ServiceNow require admins to deliberately elevate into
`security_admin` instead of simply granting it permanently alongside
the `admin` role? What specific risk does the elevation step protect
against?
