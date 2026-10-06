# Lesson 4 — Workspace Design Patterns · Voiceover script

Segments map 1:1 to slides. Target: ~2-3 minutes total.

## S1 · TITLE

Workspace design patterns — how to structure dozens, or hundreds, of workspaces so the whole thing stays governable.

## S2 · STEPS — One workspace, or a hundred?

Every organization eventually hits this question. Too few workspaces, and you get one giant pile where nobody can tell who owns what. Too many, unstructured, and you get workspace sprawl — hundreds of flat, unlabeled workspaces with no organizing principle. The fix is a deliberate structure: grouping by team, by lifecycle stage, and by domain.

## S3 · SCREENSHOT — The structural layer above workspaces

Domains are the modern answer to "how do I organize fifty workspaces." Finance, Health, and Education, in this example — each domain groups the workspaces that belong to that business area.

## S4 · SCREENSHOT — Subdomains for finer-grained grouping

Once a single domain itself has dozens of workspaces, subdomains narrow the grouping further. Here, a "Loans" subdomain sits inside Finance.

## S5 · SCREENSHOT — Three ways to assign at scale

Workspaces join a domain three ways: by name, by workspace admin, or by capacity. That capacity option matters most at scale — if your org already separates dev, test, and production onto dedicated capacities, assigning by capacity moves dozens of workspaces into the right domain in one action.

## S6 · STEPS — A naming convention that scales

Naming is structure too. A pattern like team, dash, project, dash, environment — Finance-Budgeting-Prod, for example — is sortable, searchable, and self-documenting. Avoid generic names like "Reports" or "Test" that tell no one anything six months from now. And every workspace should have a contact list with a named owner, not just whoever happens to hold the Admin role today.

## S7 · SCREENSHOT — Capacity as a structural dimension too

Assigning a workspace to Premium capacity isn't only about performance. Separate capacities per dev, test, and production stage is a common, deliberate design pattern — it's structure, not just horsepower.

## S8 · STEPS — Anti-patterns to avoid

A few things to actively avoid. Production content living in "My workspace" — a personal workspace has no shared access model, so it breaks the moment that person leaves. One workspace for the entire company, which flattens row-level security, roles, and lifecycle into one undifferentiated pile. And workspaces with no real owner — an Admin who left the company, and no contact list to fall back on.

## S9 · OUTRO

Next lesson: apps and content distribution — how workspace content gets packaged and shared with a broader audience.
