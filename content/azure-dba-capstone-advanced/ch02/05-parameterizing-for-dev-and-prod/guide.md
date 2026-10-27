# Lesson 5 — Parameterizing for Dev and Prod

**Chapter 2 · Provisioning With Bicep · Lesson 5 of 26**

## What you'll learn

- Why Overlook needs more than one copy of this environment
- The `param` block that makes names, location, and tier configurable per environment
- Why `sqlAdminPassword` specifically needs `@secure()`, not just any parameter
- What goes wrong if the password is declared as a plain string with a default

## Why Overlook needs a dev environment at all

Lesson 4's template has every value — server name, database name, tier — hardcoded as a bare
variable reference with nothing behind it. That's fine for a single deployment, but Overlook's
situation specifically calls for at least two: a **dev** environment where changes to this
template (and to later chapters' security and HA/DR settings) get tried safely, and a **prod**
environment holding the real patient data nobody wants a mistake landing in directly. One Bicep
file, deployed twice with different parameter values, is exactly how that works.

## The `param` block

```
param environmentName string
param location string = 'eastus'
param sqlServerName string
param sqlDatabaseName string
param sqlAdminLogin string

@secure()
param sqlAdminPassword string
```

`environmentName` (`'dev'` or `'prod'`) and the resource names get supplied at deploy time, so the
same template produces two separate, independently named environments instead of one deployment
overwriting the other. `location` has a default (`'eastus'`) since it's genuinely the same for both
environments here — a default is appropriate when a value really doesn't vary, which is different
from hardcoding something that *should* vary but currently doesn't.

## Why the password gets `@secure()`, specifically

```
@secure()
param sqlAdminPassword string
```

`@secure()` is not just "a parameter for a sensitive value" — it's a specific Bicep guarantee: a
`@secure()` parameter is never written to deployment history, never logged, and never shown in
`az deployment group create`'s own output, anywhere. It must be supplied at deploy time — from an
environment variable, a CI/CD secret, or a Key Vault reference — never hardcoded as a default in
the file itself.

## What actually goes wrong without it

If `sqlAdminPassword` were declared as an ordinary `param sqlAdminPassword string = 'TempPass123'`
instead:

- That default would sit in the Bicep file in plain text — visible to anyone with read access to
  the repository, which for a healthcare company's database admin credential is precisely the kind
  of exposure the board's security mandate (Chapter 3) exists to prevent.
- Azure's own deployment history would record the plain-text value as part of the deployment's
  parameters, creating a second place the secret leaks to, even if the file itself were later
  cleaned up.
- Anyone who could read either the file or the deployment history would have the production
  database's admin password — not a hypothetical risk, a direct one.

`@secure()` closes all three of those at once, by making the value something Bicep actively refuses
to persist or display anywhere.

## Using the parameters in the resources

Lesson 4's two resources now reference these parameters directly instead of bare names with
nothing behind them:

```
resource sqlServer 'Microsoft.Sql/servers@2023-08-01-preview' = {
  name: sqlServerName
  location: location
  properties: {
    administratorLogin: sqlAdminLogin
    administratorLoginPassword: sqlAdminPassword
  }
}
```

Deploying with `-sqlServerName overlook-sql-dev` versus `-sqlServerName overlook-sql-prod` is now
the entire difference between standing up the dev and prod environments — the resource definitions
themselves never change.

## Key terms

| Term | Meaning |
|---|---|
| `param` | A Bicep input supplied at deploy time, making a template reusable across environments |
| `@secure()` | Marks a parameter as a secret — never logged, output, or recorded in deployment history |
| Environment separation | Using the same template with different parameter values for dev vs. prod |

## Check yourself

You're ready for Lesson 6 when you can explain, without looking: what three specific bad outcomes
does `@secure()` prevent that a plain `string` parameter with a default would not?
