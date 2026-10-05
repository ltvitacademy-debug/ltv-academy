# Lesson 12 — Row-Level and Column-Level Security in Fabric · Voiceover script

Segments map 1:1 to slides. Target: ~2-3 minutes total.

## S1 · TITLE

Chapter Three goes a layer deeper than item permissions: row-level and column-level security.

## S2 · STEPS — Two granularities, one model

Row-level security filters out specific rows for a role. Object-level security hides entire tables or columns. Both are model-level — once defined, they follow the data into every report built on top of it, unlike the item permissions and workspace roles you've already covered.

## S3 · CODE — Defined in Power BI Desktop, Manage roles

Every RLS role is a DAX filter expression that evaluates true or false for each row. A static filter like "Region equals East" always applies the same way. A dynamic one, keyed off USERPRINCIPALNAME, filters differently for every person assigned to the role.

## S4 · SCREENSHOT — After publishing, in the service

Once published, open the semantic model's menu and select Security — a separate option from Manage permissions. Permissions decide who can open the item; Security decides which rows they see once they're in.

## S5 · SCREENSHOT — Assigning members to a role

Role names and DAX filters come from Desktop, but you can't assign users there. Membership is added afterward, in the service, by email address or security group.

## S6 · SCREENSHOT — Never trust a role unvalidated

Define a filter and stop there, and you're trusting it blind. Test as role re-renders the report exactly as a member of that role would see it.

## S7 · SCREENSHOT — View as… by role or by person

Testing by a specific person goes further — it shows their effective permission and assigned roles exactly as that user experiences them, which is how you catch a misconfigured dynamic role.

## S8 · STEPS — Object-level security

OLS hides whole tables or columns, not just rows — and there's no Fabric portal screen for it. You set it with Tabular Editor, or by scripting the Tabular Object Model directly over the XMLA endpoint, which requires a capacity with XMLA read/write enabled.

## S9 · CODE — The Warehouse layer: plain T-SQL

A Fabric Warehouse has its own, separate security: CREATE SECURITY POLICY with a filter predicate function for row-level security, plain GRANT for column-level security. This protects anyone querying the Warehouse directly — it doesn't automatically protect a semantic model built on top of it.

## S10 · OUTRO

Next lesson: sensitivity labels — classification and protection that travels with the data wherever it goes.
