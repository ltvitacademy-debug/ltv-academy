# Why Organizations Run Multiple Database Platforms

Lesson 1 established that many real DBA jobs cover more than one platform. This lesson
digs into the actual, concrete reasons that happens — not a hypothetical "some companies
like variety," but the specific business and technical events that leave a company running
SQL Server, Oracle, MySQL, and PostgreSQL at the same time.

## What you'll learn

- The four most common real-world reasons a company ends up multi-platform
- Why "just migrate everything to one platform" is rarely as simple as it sounds
- How to think about a multi-platform environment as a DBA, not as a mess to apologize for

## Mergers and acquisitions inherit whatever the other company was running

This is the single most common cause. When Company A acquires Company B, Company A
doesn't get a clean slate — it gets Company B's entire production database estate,
whatever platform it happens to run on. If Company A is a SQL Server shop and Company B
ran its core system on Oracle for the last fifteen years, that Oracle system doesn't
disappear on acquisition day. It keeps processing real transactions, and someone has to
keep it healthy. Ripping out and replacing a production system that works, purely to
standardize tooling, is a multi-year, high-risk project that most companies don't fund
unless there's a stronger business reason than "our DBA team would rather not context-switch."
The result: the combined company now runs two platforms, indefinitely.

## A legacy application predates the company's current standard

Even without an acquisition, this happens organically. A company might standardize on
SQL Server today, but its finance or manufacturing system was built twenty years ago on
Oracle, back when Oracle was the obvious enterprise choice. The vendor who wrote that
application may have gone out of business, the application may be so deeply customized
that a rewrite is unrealistic, or the system may simply still do its job well enough that
replacing it has never made the priority list. That system keeps running on its original
platform long after the rest of the company has moved on, and it still needs a DBA.

## A team picks the best tool for a specific workload

Not every multi-platform decision is inherited — some are deliberate. A web application
team might choose MySQL because it's lightweight, well-understood by their framework's
ecosystem, and easy to run at scale for read-heavy traffic. A data team building a new
analytics platform might choose PostgreSQL for its extensibility (JSON support, extensions
like PostGIS) and because it avoids licensing costs on a system that isn't core
transactional infrastructure. Meanwhile the ERP system stays on SQL Server because that's
what the ERP vendor certifies and supports. Each choice is reasonable in isolation; the
sum is a multi-platform environment.

## Licensing cost pressure pushes companies toward open source

Oracle and SQL Server licensing, especially at enterprise scale with per-core pricing and
optional feature packs, can represent a serious ongoing cost. When a company is under
pressure to cut infrastructure spend, migrating workloads that don't strictly need Oracle
or SQL Server's specific enterprise features toward PostgreSQL or MySQL is a real, common
cost-reduction strategy. This rarely happens as one clean cutover — it happens gradually,
system by system, over years, which means the company runs both the old and new platforms
side by side for a long time, sometimes permanently.

## Why full standardization rarely happens

Given all of this, it's tempting to ask why companies don't just pick one platform and
migrate everything. In practice: migrations are expensive and risky, some legacy systems
are effectively frozen because nobody fully understands their internals anymore, some
vendor-supplied applications only support specific platforms, and the business case for
migrating a system that already works is often weak compared to other priorities. A
realistic DBA career, especially outside the largest tech companies, means accepting that
multi-platform environments are normal, not a sign of organizational dysfunction.

## Key terms

| Term | Meaning |
|---|---|
| Legacy system | An older application still running in production, often on an outdated or non-standard platform |
| Vendor-certified platform | A specific database platform a software vendor officially supports for their application |
| Licensing cost pressure | Business pressure to reduce spend on per-core or per-feature database licensing |
| Standardization | The (often unrealized) goal of running all systems on one database platform |

## Check yourself

Pick one of the four reasons in this lesson and describe a realistic scenario where it
would apply at a company you're familiar with — even a hypothetical one.
