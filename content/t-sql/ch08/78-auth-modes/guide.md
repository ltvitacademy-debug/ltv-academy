# Lesson 78 — SQL Server Authentication Modes

**Chapter 8 · Transactions and Error Handling · Lesson 7 of 7**

## What you'll learn

- Revisiting Windows Authentication and SQL Server Authentication (Lesson 2)
- "Mixed Mode" — supporting both at once
- Why a server picks one mode or both
- Wrapping up Chapter 8

## A quick recap

Lesson 2 introduced two ways to log in to SQL Server: **Windows
Authentication** (trusts your current Windows login) and **SQL Server
Authentication** (a username/password stored inside SQL Server itself).
This lesson looks at how a server actually **decides** which of these it
accepts.

## The two authentication modes, formally

A SQL Server instance is configured at setup (and changeable afterward)
to run in one of two modes:

- **Windows Authentication Mode** — only Windows logins are accepted. SQL
  Server Authentication logins are rejected outright, even if one exists.
- **Mixed Mode** (formally, "SQL Server and Windows Authentication
  Mode") — **both** Windows logins **and** SQL Server logins are
  accepted.

There is no mode that accepts **only** SQL Server logins and rejects
Windows ones — Windows Authentication is always available in both modes.

## Why choose one over the other

**Windows Authentication Mode alone** is generally considered **more
secure** for an all-Windows environment: it centralizes credential
management in Active Directory, inherits your organization's password
policies, and avoids a second, separate set of credentials to manage and
potentially leak.

**Mixed Mode** becomes necessary when you need to support:
- Applications or users that **aren't** part of the Windows domain
- Legacy applications built specifically around SQL Server logins
- Cross-platform or non-Windows clients that can't use Windows
  Authentication at all

## A practical note

If a server is in **Windows Authentication Mode only**, attempting to
connect with a SQL Server login (Lesson 2's `Connect` dialog, choosing
"SQL Server Authentication") fails outright, regardless of whether the
username/password themselves are correct — the mode itself blocks it
before credentials are even checked.

## Chapter 8 recap

You now understand how SQL Server guarantees multi-step changes happen
safely: transactions and `COMMIT`/`ROLLBACK`, the ACID properties they
provide, how locking enforces Isolation, what blocking and deadlocks
actually are, catching and raising errors with `TRY`/`CATCH` and
`THROW`/`RAISERROR`, and how a server decides who's allowed to connect at
all. Chapter 9 shifts to window and ranking functions — `ROW_NUMBER`,
`RANK`, `DENSE_RANK`, and `NTILE`.

## Key terms

| Term | Meaning |
|---|---|
| Windows Authentication Mode | Only Windows logins accepted |
| Mixed Mode | Both Windows and SQL Server logins accepted |

## Lab

In SSMS, right-click your connected server in Object Explorer →
Properties → Security, and check which authentication mode it's
currently configured for (view only — don't change it without knowing
why).

## Check yourself

You're ready for Chapter 9 when you can answer, without looking: what's
the difference between Windows Authentication Mode and Mixed Mode, and is
there a mode that accepts only SQL Server logins?
