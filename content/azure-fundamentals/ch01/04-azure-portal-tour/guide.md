# Lesson 4 — Azure Portal Tour

**Chapter 1 · Cloud & Azure Concepts · Lesson 4 of 18**

## What you'll learn

- What the Azure Portal actually is, and how you'll reach it
- The side menu — Home, Favorites, and "All services"
- The global search bar, and its keyboard shortcut
- What a resource's "blade" looks like once you open one

## Your home base for almost everything

The **Azure Portal** (portal.azure.com) is the web-based interface
for creating, viewing, and managing Azure resources. You'll live in
it constantly, especially early on — before you're comfortable with
the CLI or automation tools covered later in this course, the portal
is how you'll do almost everything: create a resource, check its
settings, view its cost, delete it when you're done.

![The Azure Portal, with UI element callouts labeling the top command bar, the collapsible side menu, the main content area, and the notifications and settings icons.](/courses/azure-fundamentals/ch01/04-azure-portal-tour/portal-callouts.png)

## The side menu

Down the left side, the portal's menu gives you:

- **Home** — a dashboard of recently used resources and shortcuts
- **Favorites** — services you've pinned for one-click access (Virtual
  Machines, Resource Groups, whatever you use most)
- **All services** — every Azure service that exists, organized by
  category, for the ones you haven't pinned yet

![The Azure Portal's side menu, expanded to show Home, Dashboard, All services, and a Favorites section listing pinned services like Virtual machines and Resource groups.](/courses/azure-fundamentals/ch01/04-azure-portal-tour/azure-portal-menu.png)

You can drag services in or out of Favorites, so the menu becomes a
shortlist of exactly what you use, not a wall of every Azure service
Microsoft has ever shipped.

## The search bar — faster than clicking through menus

At the top of the portal is a global search bar. Type the name of
almost anything — a service ("storage accounts"), a specific resource
you've created, or even a documentation topic — and the portal jumps
straight there. The keyboard shortcut is **Ctrl+/** on Windows (or
**Cmd+/** on Mac), and it's worth building the habit early: once
you've created more than a handful of resources, searching is almost
always faster than navigating menus to find one.

## Resource "blades"

When you open a specific resource — a VM, a storage account, anything
you've created — the portal opens what Microsoft calls a **blade**: a
panel showing that resource's overview, settings, monitoring, and
configuration options, organized down its own left-hand sub-menu.
Every resource type has a slightly different blade, but the pattern —
Overview at the top, then Settings, then more specialized options
below — stays consistent across almost everything in Azure. Getting
comfortable reading a blade is a skill that transfers to every
service you'll touch in this course and beyond.

## Key terms

| Term | Meaning |
|---|---|
| Azure Portal | The web-based UI at portal.azure.com for managing Azure resources |
| Favorites | Services pinned to the side menu for one-click access |
| Global search | The top search bar (Ctrl+/) that jumps to any service, resource, or doc |
| Blade | The panel that opens when you view a specific resource, with Overview/Settings/etc. |

## Check yourself

You're ready for Lesson 5 when you can explain, without looking: what
is the fastest way to get to a specific resource you created last
week if you don't remember which menu category it's under?
