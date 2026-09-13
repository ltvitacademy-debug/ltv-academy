# Script — Secure Views & Row Access Policies

## Segment 1 (title)

Two more layers of Snowflake security sit on top of GRANT and roles: secure views, which hide a view's definition, and row access policies, which filter which rows come back from a table. Neither one changes what role you're running as — they change what that role can see once it's already allowed in.

## Segment 2 (code: secure view)

A regular view's SQL is visible to anyone who can query it — GET_DDL reveals the exact logic behind it. A secure view hides that definition from everyone but its owner, which matters when the logic itself — a pricing formula, a fraud filter — is sensitive.

## Segment 3 (code: row access policy)

A row access policy is a function that returns true for rows a role should see. Defined once with CREATE ROW ACCESS POLICY, then attached to a table's column with ALTER TABLE ADD ROW ACCESS POLICY.

## Segment 4 (steps: how it filters)

Once attached, the same SELECT * FROM transactions returns different rows depending on who's asking — SALES_ADMIN sees everything, a role named WEST only sees WEST rows. No separate view per region, no application code changes.

## Segment 5 (outro)

Next lesson: dynamic data masking — the column-level equivalent of a row access policy, hiding sensitive values instead of filtering rows.
