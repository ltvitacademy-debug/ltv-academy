# Script — GRANT, Privileges & Least Privilege in Snowflake

## Segment 1 (title)

Every privilege in Snowflake follows the same shape: GRANT privilege ON object TO ROLE role. You never grant a privilege straight to a user — you grant it to a role, then grant that role to whichever users need it.

## Segment 2 (screenshot: object browser after GRANT)

This is the object browser right after running a GRANT statement — the JUNIOR_DBA role could not see these databases a moment earlier. Notice the layering: USAGE on a warehouse, database, or schema just lets a role see through to what's inside; SELECT on a table is what actually lets rows come back.

## Segment 3 (code: GRANT syntax)

GRANT USAGE ON WAREHOUSE gives a role compute; GRANT USAGE ON DATABASE and SCHEMA let it see inside; GRANT SELECT ON TABLE lets it actually read rows. Miss the USAGE grants and SELECT alone still can't reach the data.

## Segment 4 (steps: least privilege)

Least privilege means a role gets exactly what its job requires: grant to roles not users, grant the narrowest object you can, use future grants so new tables inherit the same access automatically, and audit with SHOW GRANTS to catch anything that's quietly accumulated too much.

## Segment 5 (outro)

Next lesson: secure views and row access policies — controlling not just which tables a role can query, but which rows and which parts of the query definition it can see.
