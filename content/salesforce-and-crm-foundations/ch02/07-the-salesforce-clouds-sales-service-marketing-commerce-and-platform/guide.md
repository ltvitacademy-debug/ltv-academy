# Lesson 7 — The Salesforce Clouds: Sales, Service, Marketing, Commerce and Platform

**Chapter 2 · The Salesforce Ecosystem · Lesson 7 of 20**

## What you'll learn

- What Salesforce means by a "cloud"
- What each major cloud is actually for
- How the clouds share the same underlying platform instead of being separate products
- Where to see this for yourself inside a real Salesforce org

## A "cloud" is a product line, not a separate company

When people say "Sales Cloud" or "Service Cloud," they're describing a
packaged product line — a specific bundle of objects, features, and
licenses aimed at one part of the business — not a separate piece of
software running somewhere else. Every cloud is built on the same
underlying Salesforce Platform, the subject of Lesson 8, which is why
an admin can see multiple clouds referenced side by side inside a
single Setup menu.

![Salesforce Setup home page showing goal cards for Field Service and "Cross Cloud," including Sales Cloud Everywhere, Agentforce, and Einstein Sales Emails.](/courses/salesforce-and-crm-foundations/ch02/07-the-salesforce-clouds-sales-service-marketing-commerce-and-platform/setup-home-cross-cloud.jpg)
*The Setup home page surfaces goals that span clouds — a "Cross Cloud" card referencing Sales Cloud Everywhere, Agentforce, and Einstein Sales Emails, all inside one admin console.*
Source: [Trailhead — Explore the features and benefits of the Service Console](https://trailhead.salesforce.com/content/learn/modules/service_lex/service_lex_cloud)

## Sales Cloud

Sales Cloud is Salesforce's original, flagship product — everything
from Lessons 2 and 3 (leads, opportunities, pipeline) lives here by
default. It's built for sales reps and sales managers: tracking deals,
forecasting revenue, and managing the accounts and contacts tied to
them.

## Service Cloud

Service Cloud is built for support and service teams, centered on the
**case** record from Lesson 2. It gives agents a console for working
cases, a searchable knowledge base, and routing tools that get a
customer's question to the right agent.

![A real-estate "NovaCard Service" console showing an open case, customer details on the left, the case feed in the center, and an AI-powered Service Rep Assistant panel on the right.](/courses/salesforce-and-crm-foundations/ch02/07-the-salesforce-clouds-sales-service-marketing-commerce-and-platform/service-cloud-console.png)
*A real Service Cloud console: customer context on the left, the case itself in the center, and an AI assistant surfacing suggested replies and relevant knowledge on the right.*
Source: [Trailhead — Explore the features and benefits of the Service Console](https://trailhead.salesforce.com/content/learn/modules/service_lex/service_lex_cloud)

## Marketing Cloud

Marketing Cloud is built for the marketing team from Lesson 2: email
campaigns, customer journeys across channels, and the tools that
generate and nurture the leads sales eventually works. It's one of the
clouds Salesforce grew largely through acquisition (ExactTarget,
Lesson 6) rather than building from scratch.

## Commerce Cloud

Commerce Cloud powers online storefronts and e-commerce, handling
product catalogs, shopping carts, and checkout — another
acquisition-built product line (Demandware, Lesson 6), aimed at
businesses selling directly to consumers online rather than through a
traditional sales process.

## Platform: the foundation underneath all of them

"Platform" isn't a business-function cloud like the other four — it's
the underlying foundation every one of them is built on: the database,
the security model, the customization tools. Lesson 8 draws this
distinction out in full, but the short version is that Salesforce
Platform is also sold on its own, for building entirely custom
applications that have nothing to do with CRM.

## Every cloud is also just an "app"

Inside Setup, each cloud typically surfaces as a configurable **app** —
a named bundle of tabs and branding a user can switch into.

![Lightning App Builder "App Settings" screen for the "Service Console" app, showing its developer name, description, and App Launcher preview card.](/courses/salesforce-and-crm-foundations/ch02/07-the-salesforce-clouds-sales-service-marketing-commerce-and-platform/app-branding-service-console.jpg)
*Under the hood, a cloud like Service Cloud is configured as an app — here, the "Service Console" app's name, description, and how it previews in the App Launcher.*
Source: [Trailhead — Explore the features and benefits of the Service Console](https://trailhead.salesforce.com/content/learn/modules/service_lex/service_lex_cloud)

## Key terms

| Term | Meaning |
|---|---|
| Cloud | A packaged Salesforce product line (Sales, Service, Marketing, Commerce) built for a specific part of the business |
| Platform | The underlying foundation — database, security, customization tools — every cloud is built on |
| App | How a cloud (or any custom bundle of functionality) surfaces to a user, switchable from the App Launcher |

## Lab

1. For each of Sales, Service, Marketing, and Commerce Cloud, write one
   sentence connecting it back to a stage of the customer lifecycle
   from Lesson 2.
2. Explain in your own words why "Platform" isn't listed alongside the
   other four as a business-function cloud.

## Check yourself

You're ready for Lesson 8 when you can name what each of the four
major clouds is for, and explain why they're described as being built
on one shared platform rather than as separate products.
