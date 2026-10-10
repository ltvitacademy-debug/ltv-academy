# Lesson 2 — Organization-Wide Defaults

**Chapter 1 · Sharing Building Blocks · Lesson 2 of 24**

## What you'll learn

- The real OWD options — Private, Public Read Only, Public Read/Write, and Controlled by Parent — and which objects support which options
- What "Grant Access Using Hierarchies" actually controls, and why you can turn it off for custom objects but not standard ones
- Why Salesforce separates the *internal* OWD from the *external* OWD for Experience Cloud and partner/customer access
- How to read the Sharing Settings grid the way an architect reads it: as a risk register, not a configuration list

## The Sharing Settings page

Organization-wide defaults live on one screen: **Setup > Security > Sharing Settings**. Every object with record ownership gets a row, and every row carries a Default Internal Access Level and, for objects exposed externally, a Default External Access Level.

![The Organization-Wide Defaults section of the Sharing Settings page in Salesforce Setup, listing objects with their default internal and external access levels.](/courses/sharing-and-visibility-architecture/ch01/02-organization-wide-defaults/sharing-settings-page.png)
*Setup > Security > Sharing Settings — every subsequent sharing mechanism in this course builds on top of the defaults set here.*

The four settings an architect actually chooses between are:

| Setting | What it means | Typical use |
|---|---|---|
| **Private** | Only the owner (and anyone above them in the role hierarchy) can see the record | Default for most core business objects — Opportunities, custom objects holding sensitive or deal-specific data |
| **Public Read Only** | Everyone in the org can see every record, but only the owner (and above) can edit | Reference-style objects, or objects where visibility helps collaboration but accidental edits are a real risk |
| **Public Read/Write** | Everyone in the org can see and edit every record | Rare for core objects; sometimes appropriate for small, high-trust teams or low-stakes objects |
| **Controlled by Parent** | The record's visibility exactly mirrors its master-detail parent's visibility | Default and often only option for detail objects in a master-detail relationship |

A few standard objects carry a fifth option, **Public Read/Write/Transfer**, specifically on Leads and Cases — it adds the ability for any user to reassign ownership of a record they can see, which matters for queue-style, high-throughput objects where ownership churns constantly.

## Grant Access Using Hierarchies

Every object's sharing settings row also carries a **Grant Access Using Hierarchies** checkbox. For every standard object, this is permanently checked and can't be turned off — a manager will always see what their subordinates own, no matter how restrictive OWD is set. For custom objects, you get a real choice: uncheck it, and the role hierarchy stops automatically granting upward visibility for that object. This matters for genuinely confidential custom objects — HR disciplinary records, legal matter files — where even "my manager can see everything their team owns" is too loose a default, and visibility should come only from explicit sharing rules or manual shares to specifically authorized people, not an organizational reporting line that happens to include people with no legitimate need to know.

## Internal vs. external OWD

Since Salesforce extended record access to Experience Cloud sites, partner portals, and other external-user contexts, every object's sharing row actually carries two independent defaults: internal (how employees see each other's records) and external (how portal/community/partner users see records). External OWD is always at least as restrictive as internal OWD — Salesforce will not let you set external access looser than internal access, because external users are, by definition, outside the trust boundary that justifies the internal default. An architect designing a partner-facing Experience Cloud site has to reason about both numbers independently: internal reps might see all their team's Opportunities by default (Public Read Only within the sales org), while the external OWD for that same object stays Private, with sharing sets and sharing rules (covered in Chapter 2) doing the real work of exposing exactly the records a specific partner needs.

## Reading the grid as a risk register

![A flowchart-style diagram for deciding which sharing model and OWD setting fits a given object.](/courses/sharing-and-visibility-architecture/ch01/02-organization-wide-defaults/sharing-model-decision.jpg)
*A decision flow for choosing an object's sharing model — the kind of reasoning an architect works through before ever opening the Sharing Settings page.*

An experienced architect doesn't look at the Sharing Settings page and see a settings screen — they see the ceiling under which every other mechanism in this course has to operate, and a map of where the organization has accepted the most risk. Every object set to Public Read/Write is an object where the platform is trusting every single user equally, with no per-record distinction at all. In a review, that's the first thing worth asking about: was that choice deliberate, or is it what the object defaulted to when nobody thought about it? Lesson 17 turns this reading skill into a repeatable design process; for now, the habit to build is simple — before touching a single sharing rule or role, read the OWD grid first and know exactly what baseline you're widening from.

## Key terms

| Term | Meaning |
|---|---|
| Organization-wide default (OWD) | The baseline record-visibility setting for an object, before any other sharing mechanism applies |
| Grant Access Using Hierarchies | A per-object setting controlling whether the role hierarchy automatically grants upward visibility; always on for standard objects, optional for custom objects |
| Controlled by Parent | An OWD setting where a detail record's visibility exactly follows its master-detail parent's visibility |
| Internal / external OWD | Two independent default-access settings per object — one for internal users, one for external (portal/community/partner) users, with external always at least as restrictive |

## Lab

In a Developer Edition org, go to **Setup > Security > Sharing Settings** and click Edit. For a custom object (create one first if none exists), set the OWD to Private and uncheck Grant Access Using Hierarchies. Create two test users with a manager/subordinate role relationship, have the subordinate create a record, and confirm the manager cannot see it. Then re-check Grant Access Using Hierarchies and confirm the manager's visibility changes immediately. Write one paragraph on a real scenario (HR records, legal holds, or similar) where you would deliberately leave that box unchecked in a production org.

## Check yourself

1. Which OWD setting makes a detail record's visibility inherit exactly from its master-detail parent, with no independent choice?
2. For a standard object like Opportunity, can an admin turn off Grant Access Using Hierarchies? Why or why not?
3. Why can external OWD never be set looser than internal OWD for the same object?
