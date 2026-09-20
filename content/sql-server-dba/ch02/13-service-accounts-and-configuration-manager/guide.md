# Service Accounts & Configuration Manager

## What you'll learn

- The real account types SQL Server services can run under, and which is actually best practice
- What SQL Server Configuration Manager does, precisely, and why it exists as its own tool
- How network protocol configuration (TCP/IP, client protocols) lives inside Configuration Manager

## Service account types, for real

Lesson 7 named this as a pre-install decision; here's the full picture of the options and why
one is preferred:

- **Local System** — the most privileged built-in account on the machine. Technically works,
  but grants the SQL Server service far more machine-level privilege than it needs, and it's a
  shared identity with no accountability to a specific service. Avoid it for production.
- **Network Service** / **Local Service** — lower-privilege built-in accounts, better than Local
  System but still generic, shared, and not tied to any specific application identity — hard to
  audit which service did what on the network.
- **A dedicated domain account** — a normal AD account created specifically for this service,
  with only the permissions it actually needs. Better than the built-ins, but has a real
  operational cost: someone has to manage and rotate its password, and a forgotten rotation
  causes a service outage.
- **Group Managed Service Account (gMSA)** — the current best practice on a domain. A gMSA is
  a special AD account type whose password is generated and rotated automatically by AD itself
  (no human ever needs to know or manage it), while still functioning as a normal, least-
  privilege, individually-auditable domain identity. It removes the password-rotation
  operational burden that a plain dedicated domain account carries, without giving up any of the
  least-privilege benefit.

The consistent theme: least privilege, one identity per service, automatic credential
management where possible. Never share one account across every SQL Server service on a box,
and never default to Local System out of convenience.

## Changing a service account after install

Service accounts aren't locked in forever, but they should be changed through **SQL Server
Configuration Manager**, not through the Windows Services control panel applet — Configuration
Manager applies the necessary permission grants (like granting the new account the right to act
as a service, and adjusting registry/file permissions SQL Server depends on) as part of the
change. Changing it through `services.msc` directly can leave the instance in a broken state
that "looks" changed but doesn't actually have working permissions.

## SQL Server Configuration Manager, precisely

**SQL Server Configuration Manager** is a dedicated MMC snap-in (separate from SQL Server
Management Studio) whose job is managing the services and network configuration for every SQL
Server instance and component installed on a machine — not writing or running T-SQL. Its three
main areas:

1. **SQL Server Services** — start, stop, restart, and configure the service account and
   startup mode for every SQL Server–related service (Database Engine, Agent, Browser,
   Integration Services, and so on) on the machine. This is also where you change a service
   account, as described above.
2. **SQL Server Network Configuration** — enable or disable **network protocols** per instance.
   **TCP/IP** is the standard protocol for real client-server connectivity and must be enabled
   for anything other than local connections; **Named Pipes** is an alternative mostly used for
   local/same-machine connections; **Shared Memory** is used only for connections originating on
   the same machine as the instance.
3. **SQL Native Client Configuration** — the client-side mirror of the network configuration,
   controlling which protocols and in what order a client attempts when connecting out to any
   SQL Server instance.

## Why this lives outside SSMS

Configuration Manager exists as its own tool because these are Windows-service-level and
network-level concerns, not database concerns — they need to work (and be usable) even when the
Database Engine itself won't start, which is exactly the situation a DBA is often in when they
need this tool most.

## Key terms

| Term | Meaning |
|---|---|
| gMSA | Group Managed Service Account — domain account with AD-automated password rotation |
| SQL Server Configuration Manager | MMC snap-in managing SQL Server services and network protocol configuration |
| TCP/IP protocol | The standard network protocol for real client-server SQL Server connectivity |
| Named Pipes | An alternative protocol typically used for local/same-machine connections |

## Check yourself

A DBA changes the Database Engine's service account by editing the account directly in
`services.msc` instead of Configuration Manager, and the service now fails to start. What did
Configuration Manager do automatically that `services.msc` didn't?
