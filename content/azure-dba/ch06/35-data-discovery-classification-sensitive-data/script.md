# Script — Data Discovery, Classification & Sensitive Data

## Segment 1 (title)

Every earlier lesson in this chapter assumed you already know which columns are sensitive. On an inherited or years-old database, that's rarely obvious. Data Discovery and Classification exists to answer that question systematically instead of by memory.

## Segment 2 (screenshot: classification tab)

Azure scans column names, data types, and patterns to suggest likely-sensitive columns — an information type and a sensitivity label, each one reviewed and accepted or dismissed by a human.

## Segment 3 (code: querying the metadata)

Accepted classifications are stored as metadata, queryable through sys.sensitivity_classifications — letting you answer "show me every Highly Confidential column on this server" as a query, not a manual audit.

## Segment 4 (code: discovery, then everything else)

Classifying a column doesn't encrypt it, mask it, filter it, or restrict it in any way. It identifies which columns need protecting — TDE, Always Encrypted, masking, row-level security, and auditing are what actually apply that protection.

## Segment 5 (outro)

A classified column with none of those controls applied is a documented gap, not a closed one — exactly what a real compliance audit looks for. Next up: SQL Auditing, proving who actually accessed those columns.
