# Lesson 6 — Lab: Build Your First Azure SQL Environment

**Chapter 1 · Azure SQL & DBA Foundations · Lesson 6 of 95**

## What you'll learn

- How to deploy a single Azure SQL Database through the Azure Portal, start to finish
- How to open the server-level firewall so your own machine can actually reach it
- How to connect to that database with SSMS and confirm it's really there
- How to run a real query against it to prove the whole chain works

## Chapter 1 is done — time to build something real

Lessons 2 through 5 were all conceptual: the ecosystem, the three
deployment options, IaaS vs. PaaS, and the tools you'll use. This
lab turns that into something that actually exists in your Azure
subscription. Everything below uses the Azure Portal and SSMS
exactly as described in Lesson 5 — this lab is the first time you
use them for real instead of reading about them.

## Step 1: create the logical server and database

In the Azure Portal, search **SQL databases** and select **+
Create**. Azure SQL Database always needs a **logical server**
first — a logical container for authentication and firewall rules,
not a physical machine you can see — so if you don't already have
one, the create flow prompts you to create it inline.

```
Resource group:     rg-azure-dba-lab
Database name:      lab-db-01
Server:              (create new) sql-azuredba-lab-<yourname>
Server admin login: labadmin
Authentication:      Use SQL authentication (Entra covered in Ch. 4)
Compute + storage:   Basic / DTU-based, smallest available tier
```

Leave compute and storage at the smallest available tier — this lab
is about proving connectivity, not performance, and Lesson 8 covers
what these tiers actually mean. Click **Review + create**, then
**Create**, and wait for deployment to finish — for a single Azure
SQL Database this typically takes a minute or two, nothing like the
hours Managed Instance can take (Lesson 12).

## Step 2: open the firewall so you can actually connect

A freshly created logical server rejects every connection by
default — including yours. In the Portal, open the server resource
(not the database) and go to **Networking**. Under **Firewall
rules**, click **Add your client IPv4 address**, then **Save**.
Firewalls, VNets, and private connectivity get their own full
chapter later (Chapter 5); for this lab, one rule is all you need.

## Step 3: connect with SSMS and confirm the database is real

Open SSMS. In **Connect to Server**, use the logical server's full
name from the Portal's **Overview** page (it ends in
`.database.windows.net`), the SQL authentication login and password
you set in Step 1, and connect. Once Object Explorer loads, expand
**Databases** and confirm `lab-db-01` is listed — that's the Portal
resource and the SSMS connection agreeing on the same object.

## Step 4: prove it with a real query

Open a new query window against `lab-db-01` and run:

```sql
SELECT
    DB_NAME()               AS current_database,
    @@SERVERNAME             AS server_name,
    SERVERPROPERTY('Edition') AS edition;
```

A result set with your database name, server name, and an edition
string containing "SQL Azure" confirms the full chain: Portal
deployment, firewall rule, and SSMS connectivity all actually work
together, using the exact SELECT syntax T-SQL Development already
taught you — nothing new about the query itself, only about what
you had to configure before it could run at all.

## Key terms

| Term | Meaning |
|---|---|
| Logical server | Azure SQL Database's authentication/firewall container — not a physical machine |
| Firewall rule | A server-level allow rule; without one, every connection is rejected by default |
| `SERVERPROPERTY('Edition')` | A quick way to confirm you're actually connected to Azure SQL Database, not on-prem |

## Check yourself

You're ready for Lesson 7 when you can explain, without looking:
why did the SSMS connection fail until you added a firewall rule,
even though the database itself deployed successfully in the Portal?

---

Chapter 1 is complete. Chapter 2, "Deploying Azure SQL," starts
exactly where this lab leaves off — the same `az sql server create`
/ `az sql db create` flow you just did by hand in the Portal, now
via the CLI, plus the full menu of purchasing models, service tiers,
and compute options this lab deliberately skipped past at their
smallest setting.
