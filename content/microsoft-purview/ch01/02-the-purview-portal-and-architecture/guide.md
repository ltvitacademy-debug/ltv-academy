# Lesson 2 — The Purview Portal and Architecture

**Chapter 1 · Purview Foundations · Lesson 2 of 35**

## What you'll learn

- How to reach the unified Microsoft Purview portal, and what the welcome dialog tells you about it
- The anatomy of the portal's home page: solution cards, compliance posture, and related portals
- How the left navigation changes once you're inside a specific solution like Data Loss Prevention
- What the Solutions page shows you, and how it's organized by Core, Risk & Compliance, Data Governance, and Data Security
- Where Settings lives, and why it's centralized instead of scattered per-solution

## One portal, many solutions

Every Purview capability — the Data Map, the Unified Catalog, Data Loss Prevention, eDiscovery, Audit, all of it — is reached through a single web application: the **Microsoft Purview portal**, at `https://purview.microsoft.com`. This replaced two older, separate experiences: the old Microsoft Purview compliance portal and the classic Microsoft Purview governance portal. If you ever see screenshots or documentation referencing those older portals, know that their features have been relocated into this one unified portal, not removed.

The first time you open it, you see a welcome dialog that compares the new portal against the old split experience:

![Screenshot of the Microsoft Purview portal welcome dialog, showing connected platforms (Microsoft 365, Azure, AWS, Snowflake, and other clouds) and a comparison table against the classic split portals.](/courses/microsoft-purview/ch01/02-the-purview-portal-and-architecture/purview-portal-welcome.png)
*The welcome dialog: one portal now covers protection, governance, and compliance across Microsoft 365, Azure, AWS, Snowflake, and more — versus "limited support" and a "split between separate portals" for the classic experience.*

That comparison table is the architecture lesson in miniature: the new portal isn't just a reskin, it's a genuine consolidation of what used to be disconnected tools.

## The home page

After the welcome dialog, you land on the home page — your actual starting point every time you sign in:

![Screenshot of the Microsoft Purview portal home page, showing the left navigation (Home, Solutions, Learn, Settings), a hero banner, solution cards for Data Catalog, Information Protection, Data Loss Prevention, Insider Risk Management, and AI Hub, and a Related portals section.](/courses/microsoft-purview/ch01/02-the-purview-portal-and-architecture/purview-portal.png)
*The home page: solution cards for whatever you have permissions and licensing for, plus a Related portals row linking out to Priva, Fabric, Defender, Entra, and Service Trust.*

A few things worth noticing in that screenshot: the solution cards you see depend entirely on your permissions and your organization's licensing — two people signed into the same tenant can see different cards. "Related portals" is a reminder that Purview doesn't try to absorb everything; Microsoft Fabric and Microsoft Entra, for example, stay as their own products with their own portals, linked from here for convenience.

## Left navigation, inside a solution

Select a solution card and the left navigation changes to that solution's own menu, while still keeping a few shared items (Home, Solutions, Learn, Settings) at the top so you're never more than a click from getting back out:

![Screenshot of the left navigation inside the Data Loss Prevention solution, showing Overview, Policies, Alerts, Activity explorer, Classifiers, and Explorers, plus a Related solutions section linking to Information Protection and Insider Risk Management.](/courses/microsoft-purview/ch01/02-the-purview-portal-and-architecture/purview-portal-left-navigation.png)
*Inside Data Loss Prevention: solution-specific items (Policies, Alerts, Classifiers) below the shared Home/Solutions/Learn/Settings row at the top.*

This is the pattern you'll see repeatedly in later lessons: when we get to the Data Map or the Unified Catalog, the shared top-of-nav items stay put, but everything below them is specific to that solution.

## The Solutions page

Selecting **Solutions → View all solutions** (or the grid icon) takes you to a catalog of everything you have access to, grouped into named sections:

![Screenshot of the Microsoft Purview Solutions page, showing a Core section (Audit, Settings), a Risk & Compliance section (Communication Compliance, Compliance Manager, eDiscovery, Information Barriers, Records Management), a Data Governance section (Data Catalog, Data Lifecycle Management), and a Data Security section (Data Loss Prevention, Information Protection, Insider Risk Management).](/courses/microsoft-purview/ch01/02-the-purview-portal-and-architecture/purview-portal-solutions-page.png)
*The Solutions page, grouped by Core, Risk & Compliance, Data Governance, and Data Security — the same three pillars from Lesson 1, plus a Core section for cross-cutting capabilities like Audit and Settings.*

Notice "Data Catalog" sitting in the Data Governance section here — that's the entry point this course cares about most, and it's what the rest of this chapter and Chapter 2 build toward.

## Settings, centralized

Older, split portals scattered their settings across multiple places. The unified portal puts them in one spot: select the gear icon at the top-right (or **Settings** in the left nav) from anywhere in the portal, and you get both portal-wide settings (theme, language, time zone) and a path into whichever solution's own settings you need. You'll use this in Lesson 4 to find **Roles and scopes**, and again in Chapter 2 when you configure Data Map settings.

## Key terms

| Term | Meaning |
|---|---|
| Microsoft Purview portal | The single unified web app at purview.microsoft.com for every Purview solution |
| Solution card | A home-page tile linking to one Purview solution, shown based on your permissions and licensing |
| Left navigation | The portal's sidebar; shared items (Home, Solutions, Learn, Settings) stay fixed, the rest changes per solution |

## Lab

Open a web browser (no Purview account required for this step) and navigate to `https://purview.microsoft.com`. Without signing in, note what the sign-in prompt tells you about which Microsoft account types are supported. Then, based on this lesson, write down which section of the Solutions page — Core, Risk & Compliance, Data Governance, or Data Security — you'd expect to find each of these in: Audit, Data Catalog, Insider Risk Management, eDiscovery.

## Check yourself

Name the four sections the Solutions page groups capabilities into, and explain why "Related portals" links to Fabric and Entra instead of those becoming Purview solution cards themselves.
