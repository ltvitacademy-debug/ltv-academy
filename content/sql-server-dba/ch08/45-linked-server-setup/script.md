# Script — Linked Server Setup

## Segment 1 (title)

This chapter shifts to a different connectivity concern: getting one SQL Server instance to talk directly to another server — or a non-SQL data source — from inside T-SQL. That connection is a linked server.

## Segment 2 (code: sp_addlinkedserver)

sp_addlinkedserver creates a named, stored connection definition pointing at a remote source through an OLE DB provider. The same call links to non-SQL sources too — Oracle, ODBC, flat files — just by naming a different provider.

## Segment 3 (code: sp_addlinkedsrvlogin)

sp_addlinkedsrvlogin controls who authenticates on the remote side. Useself equals False with an explicit mapped login is the more common production pattern, since it doesn't depend on Kerberos delegation the way passing through the connecting user's own credentials does.

## Segment 4 (steps: SQL Server vs. OLE DB/ODBC)

Linking to another SQL Server is the simplest case, with full T-SQL support. Linking to an OLE DB or ODBC source still works the same way, but the local instance needs that provider installed, and the further the source is from SQL Server, the more necessary OPENQUERY becomes.

## Segment 5 (outro)

Next up: remote queries — four-part names versus OPENQUERY, and the real performance tradeoff between them.
