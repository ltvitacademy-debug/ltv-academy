# Installing SQL Server

## What you'll learn

- The real ordered flow of the SQL Server Setup wizard (`setup.exe`), conceptually
- The decisions the wizard forces you to make in the moment, and which ones you should have
  already decided in Lesson 7
- Mixed mode vs. Windows Authentication mode, and why the choice matters immediately

## Setup is a wizard, but it's not optional thinking

`setup.exe` walks through a fixed sequence of screens. None of them are hard to click through —
the risk isn't confusion, it's clicking "Next" on a default that doesn't match your plan from
Lesson 7. Walk through the real flow, conceptually, in order.

## The Setup flow, step by step

1. **Feature Selection** — choose which components to install: Database Engine Services, SQL
   Server Replication, Full-Text Search, Analysis Services, Integration Services, and so on.
   Install only what you actually need; every additional feature is additional attack surface
   and additional patching burden.
2. **Instance Configuration** — choose a **default instance** (one per machine, unnamed) or a
   **named instance** (multiple instances can coexist on one machine, each with its own name,
   e.g. `SQLSERVER\FINANCE`). Named instances require SQL Server Browser running for clients to
   resolve the port dynamically.
3. **Server Configuration (service accounts)** — enter the service accounts decided on in
   Lesson 7's planning, one per service (Database Engine, Agent, Browser if used). This is also
   where you set each service's startup type (Automatic is standard for production).
4. **Database Engine Configuration — Authentication Mode** — choose **Windows Authentication
   mode** (only Windows/AD logins are trusted; no `sa` password needed) or **Mixed Mode** (both
   Windows logins and SQL Server logins, like `sa`, are allowed — and you must set the `sa`
   password right here, in the wizard). Windows-only is the more secure default when every
   client can authenticate via AD; Mixed Mode is required when you have non-Windows clients or
   legacy applications that only support SQL logins.
5. **Database Engine Configuration — Data Directories** — set the default paths for data files,
   log files, and (separately) tempdb files, matching the file layout decided in planning. This
   screen is exactly why Lesson 7's file-layout decision needed to happen before this moment,
   not during it.
6. **Collation** — confirm or change the server-level default collation. This is the last
   convenient point to get it right; changing it after install is the expensive path Lesson 7
   warned about.
7. **Install** — the wizard copies files, registers services, and runs configuration scripts.
   At the end, a summary log reports success or the specific failure point.

## Why the order matters

Notice that authentication mode, data directories, and collation all appear as in-the-moment
wizard choices — but every one of them was supposed to already be decided before this screen
ever appeared. A DBA who walks into Setup without Lesson 7's checklist in hand tends to accept
whatever default is on screen, and defaults are rarely what a specific production environment
actually needs.

## After the wizard finishes

Setup finishing successfully doesn't mean the instance is production-ready — it means the
Engine is installed with the choices you made during Setup. Lesson 9 covers the checklist of
settings you configure *after* Setup exits: max server memory, MAXDOP, cost threshold for
parallelism, tempdb file count, and backup compression defaults — none of which the Setup
wizard asks about at all.

## Key terms

| Term | Meaning |
|---|---|
| Named instance | A SQL Server instance identified by name (`SERVER\INSTANCENAME`); multiple can coexist per machine |
| Windows Authentication mode | Only Windows/AD logins are trusted; no SQL Server logins like `sa` |
| Mixed Mode | Both Windows logins and SQL Server logins are allowed; requires setting an `sa` password |
| Data directories | The Setup screen where default paths for data, log, and tempdb files are set |

## Check yourself

An application can only authenticate with a SQL Server login (username/password), not Windows
credentials. Which authentication mode must this instance use, and at which Setup screen do you
set that up?
