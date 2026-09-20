# PostgreSQL Auditing & pgAudit

Oracle has Unified Auditing built into the core engine. PostgreSQL doesn't have a comparable
built-in equivalent — its own logging system (`log_statement`, `log_min_duration_statement`,
and similar `postgresql.conf` settings) captures activity, but it's not designed as a
compliance-grade audit trail. The real, standard answer the PostgreSQL ecosystem has settled
on is **pgAudit** — an extension, not a core feature, but one so widely adopted across
production PostgreSQL deployments (including managed cloud PostgreSQL services) that it's
effectively the de facto standard.

## What you'll learn

- Why PostgreSQL's built-in logging isn't the same thing as an audit trail
- pgAudit: what it is, and the real classes of activity it can log
- How pgAudit compares honestly to Oracle's built-in auditing

## Why ordinary logging isn't auditing

`postgresql.conf` can already log a lot: `log_statement = 'all'` logs every SQL statement,
`log_connections`/`log_disconnections` logs session activity. The problem is that this
general-purpose logging is verbose, unstructured for compliance purposes, and wasn't
designed with audit requirements (like consistently capturing *which specific objects* were
touched by a DDL or DML statement, in a structured, filterable format) in mind. It's a
debugging and monitoring tool first, not a compliance tool.

## pgAudit: the real, standard answer

**pgAudit** is a PostgreSQL extension, actively maintained and used widely enough in
production (AWS RDS, Azure Database for PostgreSQL, and Google Cloud SQL all support
enabling it) that it functions as the ecosystem's standard answer to "how do I get an audit
trail." Installing it follows the same pattern as any extension:

```sql
CREATE EXTENSION pgaudit;
```

```
-- postgresql.conf
shared_preload_libraries = 'pgaudit'
pgaudit.log = 'write, ddl'
```

`pgaudit.log` accepts classes of statements to audit — real classes include `read` (SELECT,
COPY), `write` (INSERT/UPDATE/DELETE/TRUNCATE), `ddl` (CREATE/ALTER/DROP), `role` (role and
privilege changes like GRANT/REVOKE/CREATE ROLE), and `misc` (things like DISCARD, FETCH). It
can also be scoped to specific roles or specific objects with `pgaudit.role` and per-table
object audit settings, so an org can audit "everything touching the `finance.transactions`
table" without logging every statement server-wide.

## Honest comparison to Oracle's auditing

Oracle's Unified Auditing is a first-class core feature — enabled and configured with SQL
inside the database itself (`AUDIT POLICY`, `CREATE AUDIT POLICY`), with audit records
written to a dedicated, structured audit trail the database manages directly. pgAudit is a
third-party-maintained (though widely trusted and cloud-provider-supported) extension that
writes structured entries into PostgreSQL's own log stream (governed by `log_destination`
and friends), not a separate dedicated audit store inside the database itself. That's a real
architectural difference worth being honest about: PostgreSQL's approach to auditing is
"a very good, standard extension bolted onto general logging infrastructure," while Oracle's
is "a dedicated core subsystem." Both are legitimate, production-grade answers to the same
compliance need — they just reflect each platform's different philosophy (PostgreSQL's lean
core plus extensions vs. Oracle's batteries-included core).

## Key terms

| Term | Meaning |
|---|---|
| log_statement | postgresql.conf setting for general-purpose SQL statement logging |
| pgAudit | The de facto standard extension providing structured, audit-grade logging |
| pgaudit.log | Setting controlling which statement classes (read, write, ddl, role, misc) get audited |
| Unified Auditing | Oracle's built-in, core audit subsystem — the comparison point for this lesson |

## Check yourself

Why isn't `log_statement = 'all'` in postgresql.conf an adequate substitute for pgAudit in a
compliance context, and what does pgAudit add that ordinary logging doesn't?
