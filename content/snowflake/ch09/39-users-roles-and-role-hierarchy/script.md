# Script — Users, Roles & the Snowflake Role Hierarchy

## Segment 1 (title)

Snowflake's access control model is entirely role-based — every query runs as a role, and every role sits in a hierarchy. Five system-defined roles ship with every account: ACCOUNTADMIN at the top, SECURITYADMIN and USERADMIN beneath it, SYSADMIN alongside them, and PUBLIC as the floor every user stands on.

## Segment 2 (screenshot: Switch Role menu)

This is the Switch Role menu in Snowsight — it lists every role available to the current user, built-in and custom. Notice ACCOUNTADMIN, SECURITYADMIN, USERADMIN, SYSADMIN and PUBLIC are all there by default, alongside custom roles like this account's JUNIOR_DBA.

## Segment 3 (steps: the built-in hierarchy)

ACCOUNTADMIN sits at the top and encapsulates SECURITYADMIN and SYSADMIN. SECURITYADMIN manages grants and inherits USERADMIN, which creates and manages users and roles. SYSADMIN creates warehouses, databases and other objects, and is typically the parent role for the custom roles you create for your team. PUBLIC is automatically granted to every user and role.

## Segment 4 (code: building a custom role)

A custom role like JUNIOR_DBA gets created with CREATE ROLE, assigned to a user with GRANT ROLE TO USER, and slotted into the hierarchy with GRANT ROLE TO ROLE — usually granted up to SYSADMIN, so a system administrator inherits everything the custom role can do.

## Segment 5 (outro)

Next lesson: GRANT syntax and the principle of least privilege — deciding exactly what each role in this hierarchy should actually be allowed to do.
