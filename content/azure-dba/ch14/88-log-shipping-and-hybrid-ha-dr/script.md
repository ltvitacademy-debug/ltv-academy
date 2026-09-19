# Script — Log Shipping & Hybrid HA/DR

## Segment 1 (title)

Log shipping predates Availability Groups, and its simplicity is exactly why it's still in production today. It periodically backs up the transaction log on the primary, copies that backup to a secondary, and restores it there — backup, copy, restore, repeated on a schedule.

## Segment 2 (code: latency and RPO comparison)

Log shipping's RPO is directly set by how often the log-backup job runs — the same restore-chain logic from Chapter 13's backup fundamentals, just automated and pointed at a warm secondary. Run that job every 15 minutes, and 15 minutes is your best-case RPO, full stop.

## Segment 3 (steps: when a DBA reaches for it)

Log shipping earns its place in hybrid topologies — an on-prem primary shipping to an Azure VM secondary, or the reverse — where it doesn't care that the two environments are fundamentally different. It also works on Standard Edition and across a wider range of SQL Server versions than a full AG.

## Segment 4 (code: the three jobs underneath)

Underneath, it's three SQL Server Agent jobs: a backup job on the primary, a copy job that moves the file over, and a restore job on the secondary. Because it's just backup-copy-restore, bringing a log-shipped secondary online is a deliberate, manual recovery step, not an automatic promotion.

## Segment 5 (outro)

Higher latency, higher potential data loss, but real, simple, and still the right tool for the right hybrid scenario. Next up: the last lesson of this chapter — actually testing that any of this HA/DR planning works before a real disaster forces the question.
