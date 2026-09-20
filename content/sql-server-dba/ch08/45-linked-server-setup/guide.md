# Linked Server Setup

Chapter 7 was entirely about Agent. This chapter shifts to a different connectivity
concern: getting one SQL Server instance to talk directly to another server — another
SQL Server, or a non-SQL data source — from inside T-SQL. That connection is a
**linked server**.

## What you'll learn

- Creating a linked server with `sp_addlinkedserver`
- Configuring how logins map across that link with `sp_addlinkedsrvlogin`
- The distinction between linking to another SQL Server and linking to an OLE DB/ODBC
  source

## sp_addlinkedserver: defining the remote connection

A linked server is a named connection definition stored on the local instance,
pointing at a remote data source through an OLE DB provider:

```sql
EXEC sp_addlinkedserver
    @server = N'SQLSRV02',
    @srvproduct = N'',
    @provider = N'SQLNCLI',       -- SQL Server Native Client OLE DB provider
    @datasrc = N'SQLSRV02\PROD';  -- the remote instance name
```

For a plain SQL Server-to-SQL Server link, `@server` is just the friendly name you'll
use in queries, and `@datasrc` is the actual network name of the remote instance. The
same procedure links to non-SQL Server sources by swapping the provider — Oracle,
an ODBC data source, or a flat-file provider all go through the same `@provider`
parameter, just naming a different OLE DB provider installed on the local machine.

## sp_addlinkedsrvlogin: mapping logins across the link

Defining the server alone doesn't establish who authenticates on the remote side. Two
common patterns:

```sql
-- Map a specific local login to a specific remote login
EXEC sp_addlinkedsrvlogin
    @rmtsrvname = N'SQLSRV02',
    @useself = N'False',
    @locallogin = N'DOMAIN\reporting_svc',
    @rmtuser = N'remote_login',
    @rmtpassword = N'the-password';

-- Or: pass through the current login's own security context
EXEC sp_addlinkedsrvlogin
    @rmtsrvname = N'SQLSRV02',
    @useself = N'True';
```

`@useself = N'True'` tells SQL Server to use the connecting user's own credentials
against the remote server (this only works cleanly with Windows-authenticated logins
using delegation, or matching SQL logins on both sides). `@useself = N'False'` with
explicit `@locallogin`/`@rmtuser`/`@rmtpassword` maps a specific local login to a
specific remote identity instead — the more common, more controllable pattern in
production, since it doesn't depend on Kerberos delegation being configured correctly.

## SQL Server vs. OLE DB/ODBC sources

Linking to another SQL Server is the simplest case — full T-SQL syntax support, the
richest metadata, and (as later lessons cover) both four-part names and `OPENQUERY`
work naturally. Linking to a non-SQL Server OLE DB or ODBC source (an Oracle database,
an Excel file, an ODBC-exposed system) still works through the same
`sp_addlinkedserver`/`sp_addlinkedsrvlogin` pair, but the local instance needs that
provider actually installed, and the further the source is from SQL Server's own data
types and SQL dialect, the more likely `OPENQUERY` (letting the query run natively on
the far side) becomes necessary rather than optional.

## Key terms

| Term | Meaning |
|---|---|
| Linked server | A named, stored connection definition to a remote data source |
| `sp_addlinkedserver` | Creates the linked server definition and specifies its OLE DB provider |
| `sp_addlinkedsrvlogin` | Maps local logins to remote authentication for that linked server |
| `@useself` | Whether to pass through the connecting user's own credentials, vs. an explicit mapped login |

## Check yourself

Why is `@useself = N'False'` with an explicit mapped login generally the more reliable
production choice than `@useself = N'True'`?
