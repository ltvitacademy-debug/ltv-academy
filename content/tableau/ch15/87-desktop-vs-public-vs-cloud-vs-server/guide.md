# Lesson 87 — Tableau Desktop vs. Public vs. Cloud vs. Server

**Chapter 15 · Tableau Server, Cloud & Public · Lesson 87 of 95**

## What you'll learn

- What each of the four products actually is, in plain terms
- Which one you author in, and which ones you publish to
- Who hosts and manages each one, and what that means for cost and control
- How to answer "which one would you use here?" without memorizing a chart

## One authoring tool, three publishing destinations

Every workbook in this course so far has lived entirely in **Tableau
Desktop** — the application installed on your machine, where you
connect to data, build worksheets, and design dashboards. Desktop is
where the *building* happens. It is not, by itself, how anyone else
sees your work. For that, you publish to one of three destinations,
and the difference between them is really a difference in **who hosts
the server and who can see the content** — not a difference in what
Tableau can visualize.

| Product | What it is | Who hosts it |
|---|---|---|
| **Tableau Desktop** | The authoring application — where you build | Installed locally on your machine |
| **Tableau Public** | A free, public publishing destination | Tableau, and the content is public to anyone |
| **Tableau Cloud** | A paid, multi-tenant SaaS publishing destination | Tableau (you never touch a server) |
| **Tableau Server** | A paid, self-hosted publishing destination | Your own company's IT/infrastructure |

## Tableau Public — free, and genuinely public

**Tableau Public** is the free tier, but the tradeoff is exactly what
the name says: everything you publish to Tableau Public — the
workbook, the underlying data, all of it — is visible to anyone on the
internet at public.tableau.com. There is no private mode. That makes
it the wrong place for real company data, and the *right* place for
exactly one thing this course cares about: a public, shareable
portfolio. The three projects you'll build in Chapter 17 are designed
to be published here, because a hiring manager can open your dashboard
in a browser with no login at all.

## Tableau Cloud — Tableau manages the server for you

**Tableau Cloud** is a paid, software-as-a-service product: you (or
your company) pay for licenses, publish workbooks from Desktop the
same way you always have, and the people you share with view and
interact with those workbooks in a browser. Tableau itself owns and
operates the servers, scaling, and upgrades in a shared, multi-tenant
environment. Nobody on your team ever patches an operating system or
sizes a VM. Everything you're about to learn in Lessons 88-89
— publishing, permissions, refreshes, subscriptions, alerts — works
the same way on Cloud as it does on Server, because Cloud and Server
share the same underlying product; Cloud is just the version Tableau
hosts for you.

## Tableau Server — your company hosts it

**Tableau Server** is the same product as Tableau Cloud, feature for
feature, with one structural difference: your own organization installs
and manages it, on-premises or in a cloud VM your company controls
(AWS, Azure, GCP, or a private data center). That gets you more control
— over security policy, data residency, exactly when upgrades happen —
at the cost of needing IT staff to actually run it. Companies with
strict data-residency or compliance requirements often choose Server
specifically because the data never leaves infrastructure they control.

## Choosing between them

| Scenario | Product |
|---|---|
| Building a workbook, working solo | Tableau Desktop |
| A public portfolio piece, no company data involved | Tableau Public |
| A company wants BI in the cloud with zero server management | Tableau Cloud |
| A company has compliance/data-residency rules or existing infrastructure | Tableau Server |

Notice that "which one is *better*" isn't really the right question —
Cloud and Server run the identical set of publishing, permission, and
sharing features, and Public trades all privacy for being free. The
real question is always **who is going to host this, and who is
allowed to see it.**

## Key terms

| Term | Meaning |
|---|---|
| Tableau Desktop | The local authoring application used to build workbooks |
| Tableau Public | The free, fully public publishing destination at public.tableau.com |
| Tableau Cloud | Tableau's own multi-tenant, Tableau-hosted SaaS publishing destination |
| Tableau Server | The same server product as Cloud, self-hosted by your own organization |

## Lab

1. Without looking back at the tables above, write one sentence each
   explaining what Desktop, Public, Cloud, and Server are — in your
   own words.
2. For each of these three scenarios, name the product you'd
   recommend and say why in one sentence: (a) a student building a
   free portfolio piece to show recruiters, (b) a 40-person marketing
   team that wants a BI tool with no IT overhead, (c) a healthcare
   company with strict rules about where patient data can physically
   live.

## Check yourself

You're ready for Lesson 88 when you can explain, without hesitation,
why Tableau Cloud and Tableau Server are "the same product" from a
features standpoint, and what the one structural difference between
them actually is.
