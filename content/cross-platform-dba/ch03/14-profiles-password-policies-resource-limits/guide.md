# Profiles, Password Policies & Resource Limits

SQL Server enforces password complexity through the Windows OS policy (`CHECK_POLICY`) when
a login uses SQL Server Authentication, and it has no built-in per-login CPU or session-time
cap at all. Oracle bundles both concerns — password rules and resource consumption — into a
single object you attach to a user: the **profile**. One `CREATE PROFILE` statement can lock
down how a password behaves and how much of the server a session is allowed to consume.

## What you'll learn

- Real `CREATE PROFILE` syntax for password policy and resource limits
- Which password parameters are enforced always, and which limits need a switch turned on
- How to attach a profile to a user and where the `DEFAULT` profile fits in

## Every user has a profile, whether you set one or not

Every Oracle user is assigned exactly one profile. If you don't specify one at `CREATE USER`
time, the user gets the profile named `DEFAULT` — which ships with generous, mostly-unlimited
settings. A real hardening pass usually means editing `DEFAULT` itself (its settings apply to
every user who hasn't been assigned something else) and/or creating named profiles for
different classes of account:

```sql
CREATE PROFILE app_password_policy LIMIT
  PASSWORD_LIFE_TIME 90
  PASSWORD_GRACE_TIME 7
  PASSWORD_REUSE_TIME 365
  PASSWORD_REUSE_MAX 10
  FAILED_LOGIN_ATTEMPTS 5
  PASSWORD_LOCK_TIME 1
  PASSWORD_VERIFY_FUNCTION ora12c_strong_verify_function;

ALTER USER app_owner PROFILE app_password_policy;
```

This is the direct analog of an Active Directory fine-grained password policy, except it's
enforced by the database itself, not the domain controller.

## Password parameters cover expiration, reuse, and lockout

- **`PASSWORD_LIFE_TIME`** — days before the password expires and must be changed.
- **`PASSWORD_GRACE_TIME`** — days *after* expiration during which the account can still log
  in, with a warning, before it's locked — gives a user a runway instead of a hard cutoff.
- **`PASSWORD_REUSE_TIME`** / **`PASSWORD_REUSE_MAX`** — how long, or how many password
  changes, must pass before an old password can be reused. Oracle requires *both* to be set
  (not `UNLIMITED`) for reuse checking to actually take effect.
- **`FAILED_LOGIN_ATTEMPTS`** / **`PASSWORD_LOCK_TIME`** — how many consecutive bad
  passwords lock the account, and how many days it stays locked before auto-unlocking (or
  `UNLIMITED` to require a DBA to run `ALTER USER ... ACCOUNT UNLOCK`).
- **`PASSWORD_VERIFY_FUNCTION`** — a PL/SQL function that checks *complexity* (length, mixed
  case, digits, not equal to the username) at the moment the password is set. Oracle ships
  `ora12c_verify_function` and the stricter `ora12c_strong_verify_function` as ready-made
  options, or you can write your own.

Password-related limits are enforced by default, regardless of any other setting — Oracle
treats password policy as always-on.

## Resource limits need `RESOURCE_LIMIT` switched on

Resource limits are different: they exist on the profile the same way, but they're silently
**ignored** database-wide until an instance-level switch is flipped:

```sql
ALTER SYSTEM SET RESOURCE_LIMIT = TRUE;
```

Once that's on, resource limits in a profile are enforced:

```sql
CREATE PROFILE reporting_limits LIMIT
  SESSIONS_PER_USER 3
  CPU_PER_SESSION UNLIMITED
  CPU_PER_CALL 3000
  CONNECT_TIME 480
  IDLE_TIME 30
  LOGICAL_READS_PER_SESSION UNLIMITED
  LOGICAL_READS_PER_CALL 10000
  COMPOSITE_LIMIT UNLIMITED;
```

`CPU_PER_CALL` and `CPU_PER_SESSION` are in hundredths of a second; `CONNECT_TIME` and
`IDLE_TIME` are in minutes. `IDLE_TIME` is the one that maps most directly to a real
operational problem — a reporting user who opens a session and walks away for lunch, holding
locks and a connection slot, gets disconnected automatically. `COMPOSITE_LIMIT` combines
several weighted resource costs into one overall service-unit ceiling, for profiles that need
one number rather than tuning each limit separately.

## Key terms

| Term | Meaning |
|---|---|
| Profile | A named set of password and resource limits, assigned one-per-user |
| `DEFAULT` profile | The profile every user gets unless another is assigned |
| `PASSWORD_VERIFY_FUNCTION` | PL/SQL function enforcing password complexity at change time |
| `RESOURCE_LIMIT` | Instance parameter that must be `TRUE` for resource limits to be enforced |
| `IDLE_TIME` | Minutes a session can sit idle before Oracle disconnects it |
| `COMPOSITE_LIMIT` | One combined service-unit ceiling across several weighted resource costs |

## Check yourself

You set `FAILED_LOGIN_ATTEMPTS 3` and `SESSIONS_PER_USER 2` on a profile, but neither seems to
be doing anything. One of the two should already be working and one needs an extra step —
which is which, and what's the extra step?
