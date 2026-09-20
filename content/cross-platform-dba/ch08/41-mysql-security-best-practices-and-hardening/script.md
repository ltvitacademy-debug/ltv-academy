# Script — MySQL Security Best Practices and Hardening

## Segment 1 (title)

An earlier lesson ran mysql_secure_installation as a step in getting a server up. This lesson treats that same script, and the broader hardening checklist around it, as the real subject — a default MySQL install has specific, well-known weaknesses.

## Segment 2 (steps: the checklist)

The script walks through, in order: optionally enforcing password strength, setting the root password, removing anonymous accounts that some installs create by default, disallowing remote root login, and removing the test database along with its historically open privileges.

## Segment 3 (code: bind-address)

Hardening goes further than the script. The bind-address setting in my.cnf should point to a specific network interface — local-only, or the internal network — rather than leaving the server listening wide open unnecessarily.

## Segment 4 (code: auditing)

Querying mysql.user surfaces every account on the server, and SHOW GRANTS shows exactly what each one can do. A periodic audit pass, applying least privilege throughout, is how privilege creep gets caught before it becomes a real exposure.

## Segment 5 (outro)

Every one of these closes a specific, known attack surface — none of it is cosmetic. Next up: encryption at rest and in transit — InnoDB tablespace encryption and TLS configuration.
