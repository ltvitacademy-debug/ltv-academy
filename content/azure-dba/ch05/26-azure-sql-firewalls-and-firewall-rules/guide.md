# Lesson 26 — Azure SQL Firewalls & Firewall Rules

**Chapter 5 · Azure SQL Network Security · Lesson 26 of 95**

## What you'll learn

- How the Azure SQL firewall decides whether a connection attempt even reaches the login stage
- Server-level vs. database-level firewall rules, and why both exist
- The "Allow Azure services and resources to access this server" checkbox — and its real trade-off
- Where firewall rules live and how to configure them from the Azure Portal or T-SQL

## The firewall runs before login even starts

Every layer of security you built in Chapters 4 — Entra ID, logins, roles, `GRANT`/`DENY` — assumes
the connection already reached SQL Server. The firewall is the layer *before* that. Azure SQL's
firewall checks the source IP address of every incoming connection attempt against an allow-list.
If the IP isn't on the list, the TCP connection is rejected before authentication is even attempted
— your correct password and your correctly-scoped permissions never come into play, because the
packet never gets that far.

```
Connection attempt → Firewall checks source IP → not allowed → REJECTED (no login attempt happens)
Connection attempt → Firewall checks source IP → allowed     → proceeds to login/auth (Ch. 4 rules apply)
```

This ordering matters for troubleshooting (Lesson 30 builds a full checklist), and it matters for
security: a firewall rule is a coarser, earlier control than anything you configured with Entra ID
or `GRANT`. Get the firewall wrong, and no amount of correct permission-scoping downstream fixes it.

## Server-level firewall rules

A **server-level firewall rule** is configured once, on the logical server, and applies to *every*
database hosted on that server. You define it as an IP range: a single address (start = end) or a
block. These rules live in the `master` database and are visible via:

```sql
SELECT * FROM sys.firewall_rules;
```

Configuring them in the Portal looks like this — the server's **Networking** page, with a named
rule and a start/end IP range:

![Azure Portal firewall rule configuration screen showing a named rule with start and end IP address fields](/courses/azure-dba/ch05/26-azure-sql-firewalls-and-firewall-rules/sql-database-server-set-firewall-rule.png)
*A server-level firewall rule: a name, a start IP, and an end IP. Anything outside that range is rejected before login.*

You can also manage server-level rules with T-SQL, connected as a suitably-privileged principal:

```sql
EXEC sp_set_firewall_rule
  @name = N'OfficeRange',
  @start_ip_address = '203.0.113.0',
  @end_ip_address = '203.0.113.255';
```

## Database-level firewall rules

A **database-level firewall rule** is scoped to one database instead of the whole server. It's
useful when different databases on the same logical server need different allowed IP ranges — for
example, a reporting database that a third-party analytics vendor connects to, versus a production
database nobody outside your own network should reach. Database-level rules are managed *from
inside that database*, not from `master`:

```sql
-- Run while connected to the specific database, not master
EXEC sp_set_database_firewall_rule
  @name = N'VendorReportingAccess',
  @start_ip_address = '198.51.100.10',
  @end_ip_address = '198.51.100.10';
```

Database-level rules are checked *in addition to* server-level rules — an IP matching either one is
let through to attempt login for that database.

## The full Networking settings picture

The server's **Networking** page (also called **Firewalls and virtual networks** on older Portal
layouts) is where every server-level rule, the public network access toggle, and the Azure-services
checkbox all live together:

![Azure Portal server networking settings page listing firewall rules and connectivity toggles](/courses/azure-dba/ch05/26-azure-sql-firewalls-and-firewall-rules/sql-database-server-firewall-settings.png)
*The full Networking blade: firewall rules, public network access, and the "Allow Azure services" toggle in one place.*

## "Allow Azure services and resources to access this server" — the real trade-off

This checkbox is the one setting that trips people up. Turning it **on** doesn't allow one Azure
resource you specify — it allows **any** Azure resource in **any** Azure subscription (yours or
anyone else's) to attempt a connection, as long as it also passes authentication. It exists because
Azure services like Azure Functions, App Service, or Data Factory don't have a fixed, publishable
IP range you could otherwise allow-list.

The trade-off is real: turning this on widens your firewall's effective allow-list to "the entire
Azure IP space," and relies entirely on your login/auth layer (Chapter 4) to do the actual access
control from that point on. It is a convenience switch, not a "trusted Azure resource" switch —
Azure doesn't verify that the connecting resource is *yours*. For anything beyond a quick dev/test
setup, Lessons 27-28's VNet-based controls are the more defensible answer, because they scope access
to network identity you actually control instead of "all of Azure."

## Key terms

| Term | Meaning |
|---|---|
| Server-level firewall rule | IP allow-list rule applied to every database on a logical server |
| Database-level firewall rule | IP allow-list rule scoped to one specific database |
| `sys.firewall_rules` | System view listing a server's configured firewall rules |
| Allow Azure services checkbox | Opens the firewall to all Azure-originating traffic, not just your own resources |

## Lab

1. In the Azure Portal, open a test logical server's **Networking** page and add a server-level
   firewall rule scoped to your current public IP only.
2. Add a database-level rule on one database using `sp_set_database_firewall_rule`, and confirm with
   `SELECT * FROM sys.database_firewall_rules;` from inside that database.
3. Toggle "Allow Azure services and resources to access this server" on, then off, and explain in
   your own words what changed about who can attempt to connect.

## Check yourself

You're ready for Lesson 27 when you can explain, without looking: why does a correct password and a
correctly-scoped `GRANT` still fail to connect if the client's IP isn't on the firewall's allow-list?
