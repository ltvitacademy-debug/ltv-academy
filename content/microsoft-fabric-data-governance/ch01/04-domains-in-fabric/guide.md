# Lesson 4 — Domains in Fabric

**Chapter 1 · Fabric Governance Foundations · Lesson 4 of 25**

## What you'll learn

- What a domain groups, and how that's different from a workspace's own permissions and from a capacity
- What a subdomain is for
- The four parts of a domain's settings: general settings, admins, contributors, and assigning workspaces
- The three ways to assign a workspace into a domain
- That a domain can also carry default governance settings — teased here, covered later in the course

## What a domain actually groups

The admin portal's **Domains** page, previewed last lesson, groups workspaces by **business area** — Finance, Health, Education, and so on — for organization-wide discovery and governance. That's a different kind of grouping than anything covered so far: it's not a single workspace's own permissions (Lesson 5 covers those), and it's not a capacity, which groups by compute and region rather than business meaning (Lesson 2). A domain is how an org-wide catalog answers "which workspaces belong to Finance," regardless of which capacity each of those workspaces happens to run on.

**Subdomains** exist for further segmentation within a domain — a Health domain might have Clinics and Hospitals subdomains underneath it, each able to carry its own admins and its own assigned workspaces.

## Opening a domain's settings

From the Domains page, selecting a domain (Health, in this example) opens its workspace list, with buttons to assign workspaces, create a subdomain, or open the domain's own settings.

![Screenshot of the Health domain's workspace list page with "Assign workspaces," "New subdomain," and "Domain settings" buttons, and a table of subdomains/workspaces including Clinics, Hospitals, US South, and Alaska.](/courses/microsoft-fabric-data-governance/ch01/04-domains-in-fabric/open-domain-settings.png)
*The Health domain's own page. "Clinics" and "Hospitals" here are subdomains; "US South" and "Alaska" are workspaces assigned directly. "Domain settings" (Microsoft's own highlight) is where the rest of this lesson's walkthrough happens.*

## General settings: name and description

Domain settings opens to **General settings** first — just a name and an optional description.

![Screenshot of Domain settings' General settings page for the Finance domain, showing a Name field and a Domain description field.](/courses/microsoft-fabric-data-governance/ch01/04-domains-in-fabric/domain-edit-details.png)
*Name and description are the only two fields here — the domain's identity, nothing governance-specific yet.*

## Domain admins

The **Admins** tab is where you decide who can actually manage this domain.

![Screenshot of Domain settings' Admins page for the Health domain: "Assign admins to Health. Admins can change domain settings and add or remove workspaces" with a name/email entry box.](/courses/microsoft-fabric-data-governance/ch01/04-domains-in-fabric/domain-specify-domain-admins.png)
*Domain admins can change domain settings and add or remove workspaces — the broadest level of control over one domain.*

## Domain contributors

**Contributors** is a narrower role than admin — it controls specifically who can add or remove workspaces *from* the domain, not who can change its other settings.

![Screenshot of Domain settings' Contributors page for the Health domain: "Set who can add or remove workspaces from Health" with Apply-to radio options for the entire organization, specific users or security groups, and tenant and domain admins only.](/courses/microsoft-fabric-data-governance/ch01/04-domains-in-fabric/domain-specify-domain-contributors.png)
*Three choices for who can assign workspaces into this domain: the entire organization, specific users or groups, or just tenant and domain admins.*

By default this is open to the entire organization, meaning any workspace admin could assign their own workspace into the domain. Narrowing it to specific users/groups, or to tenant-and-domain-admins-only, is how you lock that down if a domain needs tighter control over what gets added to it.

## Assigning workspaces to the domain

The actual act of putting a workspace into a domain happens through **Assign workspaces**, with three different methods depending on what you're starting from.

![Screenshot of the "Assign workspaces to this domain" dialog for the Finance domain, with three radio options: Assign by workspace name, Assign by workspace admin, and Assign by capacity.](/courses/microsoft-fabric-data-governance/ch01/04-domains-in-fabric/domain-assign-workspaces-to-this-domain.png)
*Three ways in: name a workspace directly, pick by who administers it, or sweep in every workspace on a given capacity at once.*

- **By workspace name** — type or search for specific workspaces one at a time.
- **By workspace admin** — assign every workspace a given person administers.
- **By capacity** — assign every workspace running on a specific capacity (Lesson 2) in one move, useful when a whole region or business unit's capacity should land in one domain together.

## What a domain can carry beyond membership

Beyond grouping workspaces, a domain can also set a default sensitivity label or certification default that applies to everything assigned to it — a preview only; sensitivity labels and certification are covered in full later in the course (Chapter 3 and Chapter 4).

## Key terms

| Term | Meaning |
|---|---|
| Domain | A grouping of workspaces by business area, for org-wide discovery and governance — distinct from a workspace's own permissions and from a capacity |
| Subdomain | A further segmentation within a domain (e.g., Health → Clinics, Hospitals), with its own admins and assigned workspaces |
| Domain contributor | Who is allowed to add or remove workspaces from the domain — a narrower role than a domain admin |

## Lab

Sketch a domain plan for a fictional organization with three business areas (pick any three — e.g., Sales, Legal, Engineering). For each domain: name one person as domain admin, decide whether contributors should be the entire org or just admins, and pick which of the three assignment methods (by name, by workspace admin, by capacity) best fits how that business area's workspaces are currently organized.

## Check yourself

Can you explain, without looking back, the difference between a domain admin and a domain contributor? Can you name all three ways to assign a workspace into a domain, and explain why "by capacity" might assign many workspaces at once?
