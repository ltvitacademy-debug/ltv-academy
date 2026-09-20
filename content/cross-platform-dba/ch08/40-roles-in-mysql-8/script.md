# Script — Roles in MySQL 8

## Segment 1 (title)

SQL Server and Oracle have had roles for decades. MySQL didn't get real, first-class roles until version 8.0 in 2018 — before that, giving five accounts the same privileges meant running the same GRANT statements five separate times.

## Segment 2 (code: CREATE ROLE)

A role in MySQL 8 is created almost exactly like a user, because internally it's implemented as one. Privileges are granted to the role using the exact same GRANT syntax, with the role sitting where a user account would normally go.

## Segment 3 (code: granting a role to users)

Granting a role to a real account means that account inherits every privilege the role holds. If the role's privileges change later, every account holding that role picks up the change immediately, with zero additional statements against individual users.

## Segment 4 (code: SET DEFAULT ROLE)

Granting a role doesn't automatically make it active the moment a user connects — this trips people up. SET DEFAULT ROLE makes it active on every future connection; without it, the user has to manually run SET ROLE in each session.

## Segment 5 (outro)

Manage the privilege set once, on the role, instead of once per account. Next up: MySQL security best practices and hardening — the real mysql_secure_installation checklist, in full.
