# Dynamic Dashboards

**Chapter 3 · Dashboards · Lesson 17 of 22**

Every dashboard has a **running user** — the person whose record-level access determines what data actually shows up. For most dashboards, that's one fixed person, chosen at build time. A **dynamic dashboard** changes that rule: the running user becomes whoever is currently viewing it, so the same dashboard shows different numbers to different people, each respecting their own access.

## What you'll learn

- The difference between a static running user and a dynamic one
- Where "Viewing As" appears on a live dashboard
- Setting up a dynamic dashboard
- When dynamic is the right choice, and when it isn't

## Static dashboards: one running user for everyone

By default, a dashboard runs as whoever built it or whoever was explicitly set as the running user. Every viewer sees exactly that person's data access, regardless of their own permissions — which can mean a rep sees company-wide numbers they wouldn't normally have access to, or a manager sees less than they should.

## Dynamic dashboards: the viewer is the running user

A **dynamic dashboard** flips that: the running user is always whoever's currently logged in and looking at it. The same dashboard, opened by three different people, can show three different sets of numbers — each one accurate to what that person is actually allowed to see. You'll see this on a live dashboard as **"Viewing as [Name] · Change"** right under the header.

## Setting one up

From the dashboard's properties, set **View Dashboard As** to **The dashboard viewer** instead of a specific person. A few rules apply: a dynamic dashboard can't be saved in a private folder (it needs a shared folder so multiple people can actually view it), and you can optionally let viewers **change who they're viewing as**, useful for a manager checking what a specific report sees.

## When to use which

- **Static**, running as one specific person, is right for an executive dashboard meant to show one consistent, company-wide picture regardless of who's looking.
- **Dynamic** is right for a dashboard reused across a team — each rep's dashboard shows their own pipeline, each manager's shows their own team, from one single dashboard definition instead of building one per person.

## Recap

- Every dashboard has a running user whose data access determines what's shown.
- Static dashboards fix that person; dynamic dashboards make it whoever's viewing.
- "Viewing as [Name] · Change" is the on-screen sign of a dynamic dashboard.
- Dynamic dashboards can't live in private folders — they need a shared folder to be useful to more than one person.

## Check yourself

A sales VP wants one dashboard that every rep can open and see only their own pipeline, without building 40 separate dashboards. What setting makes that possible, and why would a static dashboard fail here?
