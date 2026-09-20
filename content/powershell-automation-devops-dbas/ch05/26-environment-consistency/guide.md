# Environment Consistency

"It works in dev, it fails in prod." Every DBA has heard this, and it's almost never a mystery
once you actually compare the two servers — dev and prod were provisioned and configured by
hand, months apart, by possibly different people, and quietly drifted apart in ways nobody
tracked. This lesson is about the real value IaC has here: not the provisioning itself, but the
consistency it forces across environments.

## What you'll learn

- Why manually-built environments drift, specifically, and where that drift tends to hide
- How the same IaC template with different parameter values solves this, concretely
- What "consistency" does and doesn't guarantee — it isn't a substitute for real testing

## Where drift actually hides

Drift between environments rarely shows up as something dramatic. It's small, boring
differences that accumulate:

- Dev was set up on an older SQL Server cumulative update than prod, and a bug fixed in the
  newer CU changes behavior.
- Someone manually bumped `max server memory` on prod during an incident eighteen months ago
  and never documented it or applied the same change to dev.
- Test has a different collation than prod because whoever built it accepted the installer
  default.
- A trace flag or `sp_configure` value was set on one server during troubleshooting and never
  removed, or never propagated.

None of these show up in a code review of the application. They only show up when a query that
behaves fine in dev suddenly doesn't in prod, and the investigation eats a day before someone
finds the actual configuration difference.

## The same template, different parameters

The IaC fix isn't "be more careful" — it's removing the manual step that lets drift happen in
the first place. One template, parameterized, provisions all three environments:

```hcl
variable "environment" {
  type = string
}

variable "sku_name" {
  type = string
}

resource "azurerm_mssql_database" "app_db" {
  name      = "Sales-${var.environment}"
  server_id = azurerm_mssql_server.main.id
  sku_name  = var.sku_name
}
```

```bash
terraform apply -var="environment=dev"  -var="sku_name=S0"
terraform apply -var="environment=test" -var="sku_name=S1"
terraform apply -var="environment=prod" -var="sku_name=P1"
```

Dev, test, and prod get different capacity (a smaller SKU for dev makes sense — you don't need
prod-grade compute to run unit tests), but everything *else* about how the database is defined —
version, collation, the resources it depends on — comes from the exact same source file. There's
no separate "dev setup steps" document that can quietly go stale relative to "prod setup steps."

## What consistency doesn't guarantee

It's worth being honest about the limits here. Provisioning dev, test, and prod from the same
template guarantees they *start* structurally consistent. It does not guarantee:

- Data is the same across environments (dev typically has a subset or masked copy, not
  production data)
- Load is comparable (a smaller SKU in dev means performance characteristics genuinely differ)
- Someone won't manually change something in one environment after the fact — configuration as
  code (Lesson 25) and re-applying it on a schedule is what catches that

Environment consistency from IaC is a real, valuable foundation. It's not a replacement for
actually testing against production-like data and load before a release.

## Key terms

| Term | Meaning |
|---|---|
| Environment drift | Small, undocumented configuration differences that accumulate between manually-managed environments |
| Parameterized template | A single IaC file whose behavior changes per environment via input variables |
| Structural consistency | Environments provisioned identically in definition, though not necessarily in data or load |

## Check yourself

Two servers were both "set up the same way" according to the DBA who built them a year apart —
yet a query behaves differently on each. What's the most likely explanation this lesson gives,
and what would prevent it next time?
