# Script — Neo4j Authentication & Role-Based Access Control

## Segment 1 (title)

Every relational engine in this catalog draws a hard line between authentication and authorization, backed by logins and role membership. Neo4j draws the same line — the commands are Cypher, not T-SQL, but the shape will feel familiar.

## Segment 2 (code: the forced first login)

Neo4j enables native authentication by default. The default account, neo4j, is created in a password_change_required state — the server rejects every query except changing the password. Same instinct as disabling SQL Server's sa account.

## Segment 3 (steps: built-in roles)

Neo4j ships six built-in roles layered from least to most privileged: PUBLIC, reader, editor, publisher, architect, and admin — each tier adds a coherent slice of capability, the same reasoning as SQL Server's fixed database roles.

## Segment 4 (code: custom roles, Enterprise only)

Custom roles let you grant TRAVERSE, READ, and DENY at the level of graph, label, or even individual property.

## Segment 5 (outro)

But this fine-grained control is an Enterprise Edition feature — Community Edition has no role-based access control beyond basic authentication. Next up: Neo4j backup and restore.
