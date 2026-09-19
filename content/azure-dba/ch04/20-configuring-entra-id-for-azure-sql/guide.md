# Lesson 20 — Configuring Microsoft Entra ID for Azure SQL

**Chapter 4 · Authentication & Authorization · Lesson 2 of 7**

## What you'll learn

- Setting a Microsoft Entra admin on a logical server — the actual first step
- `CREATE USER ... FROM EXTERNAL PROVIDER` for an Entra-backed database user
- Assigning Entra groups instead of individual users, and why that's usually better
- The order these steps have to happen in, and why skipping one breaks the next

## Step 1: set an Entra admin on the logical server

Before any database can have Entra-authenticated users, the **logical
server** (Lessons 1-3's terminology) needs a Microsoft Entra admin
assigned. This is a server-level setting, done once:

- **Portal**: the server's **Microsoft Entra ID** blade → **Set
  admin** → pick a user or group.
- **PowerShell**:

```powershell
Set-AzSqlServerActiveDirectoryAdministrator `
  -ResourceGroupName "rg-dba-prod" `
  -ServerName "ltv-sql-server" `
  -DisplayName "sql-admins-group" `
  -ObjectId "<entra-object-id>"
```

Setting the admin to a **group** rather than one named person means
admin membership changes in Entra ID (someone joins or leaves the
group) without ever touching SQL Server configuration.

## Step 2: connect as that admin, then create Entra users

Once the admin is set, connect to a database **as that Entra
identity** (SSMS and Azure Data Studio both support Entra
authentication in the connection dialog) and create Entra-backed
database users from inside that database:

```sql
-- A single Entra user
CREATE USER [alex@ltvacademy.com] FROM EXTERNAL PROVIDER;

-- An Entra GROUP -- every member authenticates as this one database user
CREATE USER [DBA-Team] FROM EXTERNAL PROVIDER;

-- A managed identity (an Azure resource authenticating as itself)
CREATE USER [func-app-orders] FROM EXTERNAL PROVIDER;
```

Notice there's no `CREATE LOGIN` step here the way SQL authentication
needed one. Entra identities don't need a separate server-level login
object — the external identity itself is the credential, and `CREATE
USER ... FROM EXTERNAL PROVIDER` is both the reference and the
database-level grant point in one statement.

## Prefer groups over individual users

```sql
-- Prefer this:
CREATE USER [Reporting-Analysts] FROM EXTERNAL PROVIDER;
GRANT SELECT ON SCHEMA::Sales TO [Reporting-Analysts];

-- Over creating one user per analyst and repeating the GRANT each time
```

Assigning permissions to an Entra **group** once means every future
hire who joins that group in Entra ID inherits the exact same access
automatically — no repeated `CREATE USER`/`GRANT` pairs, and no
permission drift between team members over time.

## Why order matters here

```
1. Set Entra admin on the logical server   (server-level, once)
2. Connect to a database AS that admin
3. CREATE USER ... FROM EXTERNAL PROVIDER  (inside that database)
4. GRANT/assign roles to that user          (Lessons 21-23)
```

Step 3 is only possible after step 1 — Azure SQL has to know at least
one Entra identity is trusted as an admin before it can validate any
other Entra identity against that same tenant. Skipping step 1 and
jumping straight to step 3 fails outright.

## Key terms

| Term | Meaning |
|---|---|
| Entra admin (server-level) | The Entra identity/group authorized to manage Entra auth for a logical server |
| `FROM EXTERNAL PROVIDER` | Creates a database user backed by an Entra identity — no separate login object needed |
| Group-based assignment | Granting a permission once to an Entra group instead of repeatedly to individuals |

## Check yourself

You're ready for Lesson 21 when you can explain, without looking: what
has to be configured on the logical server before any `CREATE USER
... FROM EXTERNAL PROVIDER` statement can succeed, and why assigning
permissions to a group scales better than assigning them to
individuals one at a time?
