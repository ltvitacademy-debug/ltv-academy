# Oracle Authentication & User Accounts

SQL Server gives you a choice at the instance level: Windows Authentication or SQL Server
Authentication (or both, in mixed mode). Oracle's authentication story is more layered —
there's password authentication, OS authentication, and password-file authentication for
remote administrative connections, and they solve different problems. Understanding which
one is doing the work in a given connection is the first real security skill this chapter
builds.

## What you'll learn

- The three ways Oracle authenticates a connection, and when each applies
- Real `CREATE USER` syntax and the account-level options that matter
- What SYS and SYSTEM actually are, and why you shouldn't do daily work as either one

## Password authentication is the default, and it's per-user

Every Oracle user account can be created with a password stored (as a hash) in the data
dictionary:

```sql
CREATE USER app_owner IDENTIFIED BY "Str0ng!Passw0rd"
  DEFAULT TABLESPACE users
  TEMPORARY TABLESPACE temp
  QUOTA UNLIMITED ON users;
```

This is the direct analog of SQL Server Authentication — the database itself verifies the
password. Unlike SQL Server, Oracle has no separate "login vs. user" split; a `CREATE USER`
statement creates both identity and database-level presence in one step, and privileges are
granted afterward.

## OS authentication skips the password for local OS-trusted connections

Oracle can also trust the operating system to have already authenticated the person. A user
created `IDENTIFIED EXTERNALLY` has no database password at all — Oracle checks that the OS
user connecting matches (with an `OPS$` prefix by convention, controlled by the
`OS_AUTHENT_PREFIX` parameter). More commonly you'll meet OS authentication through the
special `dba` OS group: on Linux, any OS user who is a member of the `dba` group can connect
locally with:

```sql
sqlplus / as sysdba
```

No password is asked for, because the operating system already vouches for who's logged in
to the server. This is why controlling OS-level access to the database server — who's in the
`dba` group — is itself a database security control, not just a sysadmin concern.

## Password-file authentication makes SYSDBA/SYSOPER work remotely

OS authentication only works for local connections. To connect **remotely** as SYSDBA or
SYSOPER — before the database is even open, which local OS trust can't help with — Oracle
uses a password file, created with the `orapwd` utility:

```
orapwd file=orapw$ORACLE_SID password=SysPassword123 entries=5
```

The `REMOTE_LOGIN_PASSWORDFILE` initialization parameter controls whether this file is
honored (`NONE` disables remote privileged connections entirely, `EXCLUSIVE` is the normal
single-database setting, `SHARED` allows one file across multiple databases with only SYS
able to connect that way). This password file is a real, separate credential store from the
data dictionary — it has to exist because SYSDBA connections can happen before the database
is mounted, when the data dictionary isn't even readable yet.

## SYS and SYSTEM are not interchangeable

Two accounts exist in every Oracle database from creation:

- **SYS** owns the data dictionary itself — every base table Oracle's metadata lives in.
  SYS should only ever connect `AS SYSDBA` (or `AS SYSOPER` for a more limited operational
  subset), and real practice is to never run application or routine DBA work as SYS.
- **SYSTEM** is a default administrative account with the `DBA` role granted, meant for
  DBA console-style work, but it is **not** the dictionary owner and isn't magic — it's
  just a regular user with broad privileges granted to it.

Real best practice: don't do day-to-day administration as either one. Create named,
individual DBA accounts (`CREATE USER dba_jsmith ... ; GRANT DBA TO dba_jsmith;`) so actions
are attributable to a person, keep SYS/SYSTEM passwords long and tightly controlled, and lock
or drop the sample default accounts (like the classic `SCOTT` demo schema) that ship unlocked
on some older installations.

## Key terms

| Term | Meaning |
|---|---|
| `CREATE USER` | Statement that creates both identity and database presence in one step |
| `IDENTIFIED EXTERNALLY` | Account with no database password; trusts OS authentication |
| `orapwd` | Utility that creates the password file enabling remote SYSDBA/SYSOPER connections |
| `REMOTE_LOGIN_PASSWORDFILE` | Parameter controlling whether the password file is honored (NONE/EXCLUSIVE/SHARED) |
| SYS | Owns the data dictionary; connects AS SYSDBA; not for routine work |
| SYSTEM | Default DBA-role account for administration; not the dictionary owner |

## Check yourself

A colleague wants to run a nightly maintenance job connected as SYS because "it has every
privilege." Explain, using what this lesson covered, why that's the wrong call and what you'd
set up instead.
