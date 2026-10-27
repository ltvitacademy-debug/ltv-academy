# Lesson 4 — Writing the Bicep Template for Azure SQL

**Chapter 2 · Provisioning With Bicep · Lesson 4 of 26**

## What you'll learn

- The actual Bicep resource blocks for Overlook's SQL server and database
- Why the database is declared as the server's `parent`, not a separate standalone resource
- How Bicep's automatic dependency behavior removes the need to manage deployment order by hand
- What's intentionally still missing from this first version of the template

## The two resources Overlook actually needs

Lesson 3 scoped this template to exactly two resources: a logical server, and a database that
lives inside it. In Bicep, that's two `resource` blocks:

```
resource sqlServer 'Microsoft.Sql/servers@2023-08-01-preview' = {
  name: sqlServerName
  location: location
  properties: {
    administratorLogin: sqlAdminLogin
    administratorLoginPassword: sqlAdminPassword
  }
}

resource sqlDatabase 'Microsoft.Sql/servers/databases@2023-08-01-preview' = {
  parent: sqlServer
  name: sqlDatabaseName
  location: location
  sku: {
    name: 'S0'
    tier: 'Standard'
  }
}
```

`sqlServer` is the administrative boundary Lesson 3 described — it holds the admin login and
password that gate access to everything underneath it. `sqlDatabase` is the actual data store:
Overlook's patient records, appointment, and billing data will live inside this resource, not the
server itself.

## Why `parent: sqlServer` matters

`sqlDatabase`'s `parent: sqlServer` line tells Bicep that this database is a child resource of that
specific server — not just "a database that happens to reference a server by name." That one line
does two things at once:

1. **It's the actual Azure resource hierarchy** — `Microsoft.Sql/servers/databases` is genuinely a
   child resource type under `Microsoft.Sql/servers`, the same nesting you'd see navigating the
   Portal.
2. **It tells Bicep the deployment order automatically.** Bicep knows the database can't exist
   before the server does, and deploys them in that order — without a separate `dependsOn` line,
   and without anyone maintaining a manual dependency list by hand.

This is exactly the "automatic dependency behavior" Lesson 3 named as one reason this capstone uses
Bicep: the relationship between resources is expressed once, in the resource block itself, instead
of tracked separately.

## The `sku` block: choosing a real, modest tier

`sqlDatabase`'s `sku` — `name: 'S0'`, `tier: 'Standard'` — picks a real, inexpensive Azure SQL
service tier, appropriate for a capstone project (and for Overlook's actual current scale). Nothing
about the rest of this platform — security, HA/DR, automation — depends on a specific tier; this
value is exactly the kind of thing a later `param` could make configurable per environment, which
is precisely what Lesson 5 does next.

## What this version of the template still doesn't do

This is deliberately not the finished template. It has no firewall rules yet, so nothing outside
Azure's own services can actually reach this database. It has no `@secure()` parameter for the
password yet — that's a plain reference to `sqlAdminPassword` as if it already existed as a secure
input, which Lesson 5 defines properly. And it has no environment-specific values at all — every
name and setting is currently a bare variable reference with nothing behind it. Each of those gaps
gets closed over the next two lessons, in order.

## Key terms

| Term | Meaning |
|---|---|
| `resource` block | A Bicep declaration of one Azure resource — a type, an API version, and properties |
| `parent:` | Declares one resource as a child of another, which also sets automatic deployment order |
| `sku` | The service tier and performance level a resource is provisioned at |

## Check yourself

You're ready for Lesson 5 when you can explain, without looking: what does `parent: sqlServer` on
the `sqlDatabase` resource actually accomplish, and what would you have to add manually if that line
weren't there?
