# Script — Database Principals & Users

## Segment 1 (title)

Last lesson ended on a gap: a login gets you into the instance but not into any database. The object that closes that gap is a database user, mapped to a server login.

## Segment 2 (code: closing the gap from Lesson 27)

CREATE USER app_svc FOR LOGIN app_svc maps the login into the current database. The user name doesn't have to match the login name. DROP USER removes only the database mapping — the server login is untouched.

## Segment 3 (code: contained users skip the login entirely)

Contained database users skip the server login entirely — the credential lives inside the database, once containment is set to PARTIAL. That makes the database portable: restoring it on a different instance orphans nothing, which is the model Azure SQL Database uses by default.

## Segment 4 (steps: the failure mode that gives it away)

Drop a login before its database user and you get an orphaned user — a SID with no matching login. It's a common mess after a cross-instance restore, and ALTER USER WITH LOGIN re-links it. sys.database_principals shows authentication_type_desc as INSTANCE or DATABASE so you can tell login-mapped users from contained ones.

## Segment 5 (outro)

Next up: fixed roles — sysadmin, db_owner, and the rest of the built-in roles, and when reaching for them is the right call.
