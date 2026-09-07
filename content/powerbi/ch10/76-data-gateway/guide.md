# Lesson 76 — Installing & Configuring the Data Gateway

**Chapter 10 · Refresh & Gateways · Lesson 2 of 4**

## What you'll learn

- What an on-premises data gateway actually does
- The three gateway types, and which one fits your SQL Server setup
- The five-step process for putting a gateway into use
- Why your `AdventureWorksDW2014` refresh needs one at all

## Bridging on-premises data to the cloud

Your SQL Server instance — the one hosting `AdventureWorks2012`,
`AdventureWorksDW2014`, and `Northwind` — sits on a machine the Power
BI service has no direct route to. An **on-premises data gateway** is
software installed on your network that bridges that gap: it accepts
requests from the cloud service and relays them securely to your
local SQL Server, without ever opening that server up to the public
internet.

![Diagram showing the on-premises data gateway bridging cloud services and on-premises data sources.](/courses/power-bi/ch10/76-data-gateway/on-premises-data-gateway.png)
*The gateway sits at the boundary — cloud requests in, local data sources out, nothing exposed directly.*

Without a gateway, Import-mode refresh and DirectQuery against your
local SQL Server simply can't reach the data at all. This is the
missing piece behind Chapter 2 Lesson 9's SQL Server connector setup —
you needed a gateway (or a local Desktop session) to make that
connection work in the first place.

## Three gateway types

| Type | Fits |
|---|---|
| **On-premises data gateway (standard)** | Multiple users, multiple data sources, any supported Microsoft cloud service — the right choice for a shared team setup |
| **On-premises data gateway (personal mode)** | One user only, Power BI only, can't be shared — fine for a solo learner's own machine |
| **Virtual network data gateway** | Multiple users/sources secured with virtual networks; no installation, Microsoft-managed |

For this course, working solo against your own SQL Server instance,
**personal mode** is the practical choice — it's the one Lesson 77's
scheduled-refresh screenshots assume when no shared gateway is
configured.

## Putting a gateway to work: five steps

1. **Download and install** the gateway on the machine that can reach
   your SQL Server (typically the same machine SQL Server runs on, or
   one on the same network).
2. **Configure** it for your firewall and network requirements.
3. **Add gateway admins** — people who can also manage and administer
   it.
4. **Use it** to actually refresh an on-premises data source (this is
   what Lesson 77 walks through in the service).
5. **Troubleshoot** issues as they come up (Lesson 78 covers the
   common ones).

## Why this matters for your labs

Every lab in this course that connects to `AdventureWorks2012`,
`AdventureWorksDW2014`, or `Northwind` through the SQL Server
connector depends on this gateway existing and being online. If a
scheduled refresh in Lesson 77 shows the gateway as "offline," nothing
else about the refresh configuration matters until that's fixed first.

## Key terms

| Term | Meaning |
|---|---|
| On-premises data gateway | Software bridging cloud services to on-premises data, without exposing the source directly |
| Personal mode | A single-user, Power-BI-only gateway variant, not shareable |
| Standard gateway | A shareable, multi-user, multi-source gateway for team scenarios |
| Gateway admin | A person permitted to manage and configure a gateway |

## Lab

1. On the machine hosting your SQL Server instance, download and
   install the on-premises data gateway (personal mode is sufficient
   for solo use).
2. During setup, sign in with the same account you use for the Power
   BI service.
3. Once installed, open the Power BI service and confirm your gateway
   shows as **online** — this is the prerequisite Lesson 77's
   scheduled refresh setup depends on.

## Check yourself

You're ready for Lesson 77 when you can explain why a personal-mode
gateway can't be shared with a teammate, and which gateway type would
be the right choice if it needed to be.
