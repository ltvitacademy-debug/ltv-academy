# Lesson 18 — Access Control Architecture

**Chapter 4 · Security and Platform Architecture · Lesson 18 of 30**

## What you'll learn

- RBAC vs. ABAC: the two dominant access-control models and where each one breaks down
- Row-level and column-level security as finer-grained mechanisms underneath both models
- Where access-control decisions actually get evaluated architecturally — at the query engine vs. inside an application
- Tag-driven access control as the architectural bridge between the catalog (Chapter 3) and enforcement (this chapter)

## RBAC vs. ABAC

- **RBAC (role-based access control)** — privileges are attached to a role, and roles are attached to users: grant a privilege to a role, grant the role to a user, exactly the pattern this career path's own Databricks and Snowflake governance courses already cover in depth. Simple to reason about and audit — you can read a role's privilege list directly — but roles multiply quickly once you need fine distinctions. "Analysts who can see EU customers but not US customers" becomes its own role, and the role list grows every time a new distinction shows up.
- **ABAC (attribute-based access control)** — access is decided by evaluating attributes of the user, the data, and the request context at the moment access is requested (for example: allow if the user's department matches the data's department, and the request falls within business hours). No new role is needed for every combination, but the policy logic itself becomes more complex, and harder to audit just by reading a list of role names.
- Most real architectures aren't purely one or the other. RBAC handles the coarse grain — can this person touch this catalog or schema at all — while ABAC-like mechanisms (row access policies, attribute-based masking) layer on top for the fine-grained decisions RBAC alone would turn into dozens of narrow roles.

## Row-level and column-level security

- **Row-level security** restricts which *rows* a query returns, based on who's asking — a sales rep's query against the same table a VP runs might return only their own region's rows.
- **Column-level security** restricts or masks specific *columns*, independent of which rows are returned — the two combine, so the same table can show different rows and different columns depending on who's querying it.

## Where enforcement actually happens, architecturally

- **Query-time (engine-level) enforcement** — the database or warehouse engine itself rewrites or filters the query based on policy at the moment it runs. The policy is defined once, centrally, and enforced no matter what tool issued the query — a BI dashboard, a notebook, or an ad hoc SQL client all get the same result.
- **Application-time enforcement** — a BI tool or application layer filters what it displays after receiving an already-unfiltered result from the engine. This is architecturally weaker: it only protects users going through that one specific application, and anyone with direct query access to the underlying engine bypasses it entirely.
- The architectural lesson: enforce as close to the data engine as possible, not in a layer that's easy to route around by using a different tool to reach the same data.

## Tags as the bridge from catalog to access control

A tag applied inside the catalog (Chapter 3) becomes genuinely useful for security only once an access-control policy is written against the tag itself, rather than against a hardcoded list of column names — the exact pattern Lesson 16 previewed as active metadata. This is the architectural seam between "we know what this data is" (the catalog's job) and "we control who sees it" (this chapter's job): a new column tagged the same way inherits the same enforcement automatically, with no policy rewrite required.

## Key terms

| Term | Meaning |
|---|---|
| RBAC | Role-based access control — privileges attached to roles, roles attached to users |
| ABAC | Attribute-based access control — access decided by evaluating attributes at request time |
| Row-level security | A policy restricting which rows a query returns, based on who's asking |
| Column-level security | A policy restricting or masking specific columns, independent of row-level rules |
| Query-time enforcement | Access control enforced by the data engine itself, regardless of which tool issued the query |

## Lab

For one system you have access to (or one covered elsewhere in this career path), identify whether its access control is closer to pure RBAC, pure ABAC, or a mix. If it's a mix, name one specific decision handled by roles and one specific decision handled by attribute- or tag-based rules.

## Check yourself

Can you explain the tradeoff between RBAC and ABAC, distinguish row-level from column-level security, and explain why enforcing access control at the query engine is architecturally stronger than enforcing it inside a single application?
