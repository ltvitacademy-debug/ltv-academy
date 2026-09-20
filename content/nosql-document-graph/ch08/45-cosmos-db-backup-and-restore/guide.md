# Cosmos DB Backup & Restore

Backup strategy in SQL Server usually comes down to full/differential/log backups and how far
back your log chain lets you restore. Cosmos DB's backup story is simpler on the surface —
backups are automatic, you don't schedule jobs — but the real decision that matters is which of
its two backup **modes** a container uses, because it determines what kind of restore is actually
possible when something goes wrong.

## What you'll learn

- Periodic backup mode — the default/legacy mode — and its real limitations
- Continuous backup mode and what point-in-time restore (PITR) actually gives you
- Why this distinction genuinely matters, and isn't just a pricing-tier detail

## Periodic backup: the default, legacy mode

**Periodic backup mode** is what new accounts historically defaulted to. Cosmos DB automatically
takes full backups of the account at a configurable interval (a default of every 4 hours), and
retains a configurable number of the most recent backups (2, by default). These backups are
stored in Microsoft-managed storage, separate from your account. Restoring from a periodic backup
means restoring to one of those discrete snapshot points — not to an arbitrary moment in time —
and it restores into a **new** account, not in place over the original.

## Continuous backup: real point-in-time restore

**Continuous backup mode** is the meaningfully different option: instead of discrete periodic
snapshots, Cosmos DB continuously backs up data as it changes, enabling **point-in-time restore
(PITR)** to any specific timestamp within the retention window (7 or 30 days, depending on the
tier).

```bash
# Restore a continuous-backup account to a specific point in time
az cosmosdb restore \
  --account-name my-cosmos-account-restored \
  --target-database-account-name my-cosmos-account \
  --restore-timestamp "2026-09-15T14:30:00Z" \
  --resource-group my-rg \
  --location "EastUS"
```

This is the genuinely important distinction: periodic backup can only put you back at one of a
handful of coarse snapshot points spaced hours apart, while continuous backup can restore to
*any second* within the retention window — critical when recovering from something like an
accidental bulk delete or a bad application deploy that corrupted data, where you need to land
precisely before the incident, not hours before it.

## Choosing between them

Continuous backup is the right choice whenever fine-grained recovery genuinely matters — production
data where "restore to sometime in the last few hours" isn't good enough. Periodic backup remains
a lower-cost option (continuous backup carries an added cost) appropriate for less critical data
where coarse recovery points are acceptable. Both modes support self-service restore through the
portal, CLI, or PowerShell — restoring is not a support-ticket process on either mode today.

## Key terms

| Term | Meaning |
|---|---|
| Periodic backup mode | Default/legacy mode: automatic snapshots at a configurable interval, restorable to a new account |
| Continuous backup mode | Continuously backs up data, enabling restore to any timestamp within the retention window |
| Point-in-time restore (PITR) | Restoring data to an exact moment, only possible with continuous backup mode |
| Retention window | How far back continuous backup can restore to — 7 or 30 days depending on tier |

## Check yourself

A team on periodic backup mode needs to restore their container to the exact minute before a bad
deploy corrupted data, roughly two hours after the last scheduled snapshot. Why can't periodic
backup do that, and what mode would have made it possible?
