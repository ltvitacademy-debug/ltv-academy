# Script — PostgreSQL Auditing & pgAudit

## Segment 1 (title)

Oracle has Unified Auditing built into the core engine. PostgreSQL doesn't have a comparable built-in equivalent — the real, standard answer the ecosystem has settled on is pgAudit, an extension so widely adopted it's the de facto standard.

## Segment 2 (code: logging isn't auditing)

postgresql.conf can log a lot already — log_statement, log_connections — but that's general-purpose logging, verbose and unstructured, built for debugging rather than designed as a compliance-grade audit trail.

## Segment 3 (code: pgAudit setup)

pgAudit installs like any extension, then gets configured through shared_preload_libraries and pgaudit.log. It's supported directly by AWS RDS, Azure Database for PostgreSQL, and Google Cloud SQL, which is part of why it's the standard answer.

## Segment 4 (steps: audit classes)

pgaudit.log accepts real statement classes — read for SELECT and COPY, write for INSERT/UPDATE/DELETE, ddl for CREATE/ALTER/DROP, and role for privilege changes — and can be scoped to specific roles or objects.

## Segment 5 (outro)

The honest comparison: Oracle's auditing is a dedicated core subsystem, while pgAudit is a trusted extension bolted onto general logging infrastructure — both legitimate, reflecting each platform's philosophy. Next up: encryption in PostgreSQL.
