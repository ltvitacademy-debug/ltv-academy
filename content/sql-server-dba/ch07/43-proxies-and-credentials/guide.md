# Proxies & Credentials

Lesson 40 mentioned that a `CmdExec` step "needs a proxy" without explaining why. This
lesson explains it: by default, a `CmdExec` or non-T-SQL Agent step runs as the SQL
Server Agent service account, which is almost always the wrong amount of privilege —
either too much, or applied inconsistently across steps that need different rights. A
**proxy** paired with a **credential** solves that.

## The problem: the service account is the wrong identity

Without a proxy, a job step that runs `CmdExec`, `PowerShell`, or several other
non-T-SQL subsystems executes under the SQL Server Agent service account's Windows
identity. That account frequently has broad rights on the box (it may need them for
SQL Server itself), which means every CmdExec step — even one that just needs to
robocopy a backup folder — inherits that same broad privilege. It's also a single
identity for every job on the instance, so there's no way to scope "this job can touch
this file share" separately from "this other job can restart this Windows service."
Members of the `sysadmin` fixed server role are exempt from needing a proxy at all for
CmdExec, which is itself a reason many shops require proxies even for administrators —
it forces every non-T-SQL step to run under an explicitly scoped identity instead of
defaulting to whatever ambient privilege happens to be available.

## CREATE CREDENTIAL: storing the Windows identity

A **credential** is a SQL Server object that stores a Windows account's authentication
information (a login name and its secret, encrypted) so SQL Server can present that
identity when it needs to act outside the Database Engine:

```sql
CREATE CREDENTIAL [DOMAIN\svc_agent_backup]
    WITH IDENTITY = N'DOMAIN\svc_agent_backup',
    SECRET = N'the-account-password';
```

The credential name matching the Windows account name here isn't required for
credentials generally, but it is required for the specific case of an Agent proxy —
Agent proxies must be built on a credential whose name is the Windows account itself.

## sp_add_proxy: scoping the identity to a subsystem

A proxy wraps a credential and grants it for use by specific job step subsystems:

```sql
EXEC msdb.dbo.sp_add_proxy
    @proxy_name = N'Backup Folder Proxy',
    @credential_name = N'DOMAIN\svc_agent_backup',
    @enabled = 1;

EXEC msdb.dbo.sp_grant_proxy_to_subsystem
    @proxy_name = N'Backup Folder Proxy',
    @subsystem_id = 3;  -- CmdExec
```

A job step then specifies `@proxy_name` in its `sp_add_jobstep` call, and that step
runs as `DOMAIN\svc_agent_backup` — an account that, ideally, has exactly the rights
needed for that task (write access to the backup archive share) and nothing more —
instead of inheriting whatever the Agent service account happens to have.

## Why this matters operationally

The scoped-account principle is the point: a `svc_agent_backup` account with rights
only to a specific file share limits the blast radius if that credential is ever
compromised, compared to a CmdExec step quietly running as an over-privileged service
account. Different job steps can also use different proxies, so a PowerShell step that
manages Windows services and a CmdExec step that just copies files can run under two
entirely different, independently-scoped Windows identities on the same instance.

## Key terms

| Term | Meaning |
|---|---|
| Proxy | An Agent object that lets a job step run under a specific Windows identity instead of the Agent service account |
| Credential | A SQL Server object storing a Windows account's authentication info, encrypted |
| `sp_add_proxy` | Creates a proxy from an existing credential |
| `sp_grant_proxy_to_subsystem` | Authorizes a proxy for use by a specific subsystem (e.g. CmdExec) |
| `sysadmin` exemption | Members of sysadmin can run CmdExec without a proxy — a reason many shops mandate proxies anyway |

## Check yourself

A CmdExec step needs to write files to a network share that the SQL Server Agent
service account can't access, but a domain service account can. Walk through the two
objects you'd create, in order, to make that step run as the domain account.
