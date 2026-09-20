# Project Introduction — You're the Cross-Platform DBA

Seventeen chapters have covered Oracle, MySQL, and PostgreSQL one at a time — architecture,
security, backup, performance, and replication, then a chapter on migrating between them. This
final chapter puts all three platforms in front of you at once, the way a real job would, as one
continuous project. You're not a student anymore for the next five lessons — you're the newly
hired Cross-Platform Database Administrator at a company that runs all three, and the rest of
this chapter is the work.

## What you'll learn

- The company and environment this entire chapter's project is built around
- Why this company ended up running Oracle, MySQL, and PostgreSQL side by side, not by accident
- The exact servers, instances, and databases you'll be working with in Lessons 92 through 94
- What each remaining lesson in this project actually builds

## Meet Harborline Retail Group

Harborline Retail Group is a mid-size retailer — about 1,200 employees, stores plus a growing
online business. It runs three relational database platforms, and each one is there for a
concrete, ordinary reason, not a technology experiment:

**Oracle runs the finance system.** Harborline acquired a smaller specialty retailer several years
ago, and that acquisition came with its own finance and general-ledger system built on Oracle
Database. Nobody wants to touch it, it's too risky to replace, and it still closes the books every
month. This is exactly the "legacy finance system nobody wants to touch" scenario Lesson 1 used to
explain why real DBAs rarely stay on one platform.

**MySQL runs the storefront.** Harborline's customer-facing e-commerce site was built in-house
years before the acquisition, on MySQL, because it was free, well-documented, and every web
developer they hired already knew it. It has scaled with the business ever since and now handles
real transaction volume every day.

**PostgreSQL runs analytics.** Two years ago, Harborline stood up a company-wide reporting and BI
platform. PostgreSQL was chosen deliberately: no license cost at that scale, a mature extension
ecosystem, and strong support for the kind of ad hoc, evolving analytical queries a BI team runs
that an OLTP system isn't built for.

Three platforms, three business reasons — acquisition, web-application history, and a newer
analytics need for cost and extensibility. That's the same pattern this course has said all along:
companies don't pick multiple platforms for fun, they accumulate them.

## Your environment

You'll use these exact names across every remaining lesson in this project. Write them down.

| Platform | Host | Instance / Database | Role |
|---|---|---|---|
| Oracle Database | `ora-fin01` | Instance/SID `FINPRD`, schema owner `FINAPP` | Legacy finance system — general ledger, AP, AR |
| MySQL 8.0 | `mysql-web01` | Schema `storefront` | Customer-facing e-commerce site |
| PostgreSQL 16 | `pg-analytics01` | Database `analytics`, schema `reporting` | Company-wide reporting and BI |

The finance system's key tables are `GL_JOURNAL_LINES`, `AP_INVOICES`, and `AR_RECEIPTS`. The
storefront's key tables are `customers`, `orders`, `order_items`, and `products`. The analytics
database's central table is `sales_fact`, a reporting fact table refreshed nightly from both the
storefront and the finance system.

You'll run all three in the Docker-based lab environment from Lesson 5, as three containers next
to each other on your own machine — `harborline-oracle`, `harborline-mysql`, and
`harborline-postgres` — so every command in this project is one you can actually run, not just
read.

## What this project builds

- **Lesson 92** — stand up all three platforms side by side in your Docker lab, each configured
  appropriately for its actual role (finance OLTP, web OLTP, analytics)
- **Lesson 93** — secure each one with least-privilege accounts, and put a real backup strategy in
  place on all three
- **Lesson 94** — walk through an actual slow-performance incident on each platform, using the same
  measure-identify-change-verify discipline every time
- **Lesson 95** — turn everything you just built into interview-ready answers
- **Lesson 96** — wrap up the course and point you to what's next in the path

## Key terms

| Term | Meaning |
|---|---|
| OLTP | Online Transaction Processing — many small, fast reads/writes; describes the finance and storefront systems |
| OLAP / analytics workload | Fewer, larger, more complex queries over historical data; describes the analytics system |
| Fact table | A central table in an analytics schema holding measurable business events (here, `sales_fact`) |
| Cross-platform DBA | One person responsible for keeping multiple different database engines healthy, not a specialist in only one |

## Check yourself

For each of Harborline's three databases, name the real-world reason it ended up on that
particular platform instead of a different one.
