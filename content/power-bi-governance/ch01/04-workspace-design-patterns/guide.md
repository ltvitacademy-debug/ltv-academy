# Lesson 4 — Workspace Design Patterns

**Chapter 1 · Tenant and Workspace Governance · Lesson 4 of 20**

## What you'll learn

- The two failure modes organizations hit when structuring workspaces — too few, and too many
- How domains and subdomains provide a structural layer above individual workspaces
- A naming convention that keeps workspaces self-documenting as the tenant grows
- Three real anti-patterns to avoid, and why each one causes problems later

## One workspace, or a hundred?

Every organization using Power BI at scale eventually asks this question. Two failure modes show up repeatedly:

- **Too few workspaces** — one giant workspace holding everything from every team. Access control collapses to "everyone sees everything," and nobody can say who's actually responsible for a given report.
- **Too many, unstructured** — hundreds of flat workspaces with no organizing principle, often created ad hoc by whoever needed one that week. This is **workspace sprawl**, and it makes discovery, ownership, and auditing nearly impossible.

The fix is a deliberate structure, built around three tools: domains, naming conventions, and capacity assignment.

## Domains: the structural layer above workspaces

Covered briefly in Lesson 1, **domains** group related workspaces by business area — the modern mechanism for answering "how do I organize fifty workspaces."

![Screenshot of the Domains tab in the Fabric admin experience, listing Finance, Health, and Education domains with their admins and subdomain counts.](/courses/power-bi-governance/ch01/04-workspace-design-patterns/domains-page.png)
*Each domain lists its admins and subdomain count — this is the organizing layer that sits above individual workspaces.*

Once a domain itself grows large, **subdomains** narrow the grouping further:

![Screenshot of the Finance domain's detail page with a 'Loans' subdomain and a highlighted 'New subdomain' button.](/courses/power-bi-governance/ch01/04-workspace-design-patterns/select-new-subdomain.png)
*A Loans subdomain inside Finance — useful once a domain's own workspace count climbs into the dozens.*

Workspaces are assigned to a domain three ways — by name, by workspace admin, or by capacity:

![Screenshot of the 'Assign workspaces to this domain' side pane, with radio options for assigning by workspace name, by workspace admin, or by capacity.](/courses/power-bi-governance/ch01/04-workspace-design-patterns/domain-assign-workspaces-to-this-domain.png)
*Assigning by capacity is the fastest path at scale — if dev/test/prod each has its own dedicated capacity, this one action moves every workspace on that capacity into the domain at once.*

## A naming convention that scales

Structure isn't only about domains — a consistent **naming convention** keeps individual workspace names self-documenting as the list grows:

- **[Team]-[Project]-[Environment]** — for example, `Finance-Budgeting-Prod` — sorts alphabetically by team, is searchable, and tells anyone what it is without opening it
- **Avoid generic names** like "Reports," "Test," or "My Stuff" — meaningful today, meaningless to the next person six months from now
- **Set a contact list** on every workspace (covered in Lesson 3's workspace settings) with a named owner, not just whichever account currently holds the Admin role

## Capacity as a structural dimension

Assigning a workspace to **Premium capacity** is usually framed as a performance decision, but it's a structural one too:

![Screenshot of a workspace's Settings pane, Premium tab, with Premium capacity toggled On.](/courses/power-bi-governance/ch01/04-workspace-design-patterns/power-bi-workspace-premium.png)
*Separate capacities for dev, test, and production isn't just about isolating compute — it's a deliberate structural boundary between lifecycle stages, the same idea Lesson 17 covers for dev/test/prod workspaces.*

## Anti-patterns to avoid

- **Production content in "My workspace."** A personal workspace has no shared access model — if that person leaves the organization, their My workspace content can become inaccessible or orphaned.
- **One workspace for the entire company.** This flattens row-level security, workspace roles, and lifecycle stage into a single undifferentiated pile — there's no way to give one team Contributor access without giving it to everyone.
- **Workspaces with no real owner.** An Admin account that belonged to someone who's since left, and no contact list to fall back on, means nobody can even request a role change.

## Key terms

| Term | Meaning |
|---|---|
| Workspace sprawl | Hundreds of flat, unstructured workspaces created ad hoc with no organizing principle |
| Domain | A structural grouping of related workspaces by business area |
| Subdomain | A finer-grained grouping nested inside a domain |
| Naming convention | A consistent pattern (e.g., Team-Project-Environment) that keeps workspace names self-documenting |
| Contact list | The named owner(s) of a workspace, shown in the UI for anyone who needs help |

## Lab

Design a domain and naming structure for a hypothetical organization with four teams (Finance, Sales, HR, Operations), each running dev, test, and production workloads. Sketch the domain/subdomain hierarchy you'd create, and write the naming pattern you'd apply to every workspace in it.

## Check yourself

Can you name both failure modes this lesson describes (too few workspaces, too many unstructured) and explain why each one causes real governance problems? Can you explain all three ways a workspace gets assigned to a domain, and when you'd choose "by capacity" over "by name"?
