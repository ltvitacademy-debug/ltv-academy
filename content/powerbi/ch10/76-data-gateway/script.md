# Lesson 76 — Installing & Configuring the Data Gateway · Voiceover script

Segments map 1:1 to slides. Target: ~2.5 minutes total.

---

## S1 · TITLE CARD

Your SQL Server instance isn't reachable from the cloud on its own.
The gateway is what bridges that gap.

## S2 · IMAGE: on-premises-data-gateway.png

Cloud requests come in, the gateway relays them to your local data
sources, and nothing on your network gets exposed directly to the
internet.

## S3 · STEPS: Standard -> Personal mode -> Virtual network

Three gateway types. Standard is shareable, multi-user. Personal mode
is solo, Power BI only. Virtual network needs no installation at all.

## S4 · CODE: Install -> Configure -> Add admins -> Use it -> Troubleshoot

Five steps to actually put one to work — install it, configure it for
your network, add admins, use it to refresh, and troubleshoot as
issues come up.

## S5 · OUTRO CARD

Every lab connecting to AdventureWorks or Northwind through the SQL
Server connector depends on this gateway being online. Lesson 77
covers scheduling that refresh properly.
