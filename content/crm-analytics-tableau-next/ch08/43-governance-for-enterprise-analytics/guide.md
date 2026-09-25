# Governance for Enterprise Analytics

Security answers "who can see this data?" Governance answers a bigger set of questions: who owns this dashboard, which version is approved, how do changes reach production, and what happens to reports nobody uses any more. Without governance, an analytics platform slowly fills with conflicting dashboards, orphaned datasets, and numbers nobody trusts. This lesson lays out a practical governance model for CRM Analytics and Tableau Next.

## What you'll learn

- The main pillars of analytics governance
- How app organization and sharing roles support it
- A safe path for changes from development to production
- How to keep the platform tidy over time

## Pillar 1: Ownership and structure

Every asset should have a named owner, a business purpose, and a home. In CRM Analytics, the natural home is the **app**, which is a container for dashboards, lenses, and datasets. A common structure is one app per business area (Sales, Service, Finance) plus a separate app for shared, certified datasets, and private apps for personal experiments. Personal work should stay separate from anything the business relies on.

Naming conventions are governance too. A prefix or suffix that shows status and domain, such as `Sales - Pipeline (Prod)`, tells users instantly what they're opening.

## Pillar 2: Access roles

CRM Analytics apps use sharing roles that separate what different people can do: **Viewers** can use the content, **Editors** can change it, and **Managers** can also control sharing. Give most people Viewer access, keep Editors to the builders, and limit Managers to the true owners. Grant access to groups, roles, or permission sets rather than to individuals, so access follows the organization chart instead of decaying each time someone changes jobs.

Remember that app access is separate from row-level security, which the earlier lessons covered. Governance needs both.

Tableau Next has its own asset organization and permissions. Because the product is new and evolving, confirm the current concepts and names in Salesforce's documentation before you write standards for it.

## Pillar 3: Change management

Don't build directly in the environment where executives look. A sound path is:

1. **Develop** in a sandbox or a private app.
2. **Test** with real users' access, checking numbers against a known source and checking security.
3. **Promote** to production with a supported deployment method, and record what changed and why.

Which deployment tools support which analytics assets varies, so verify what your org can use. The principle holds regardless: production changes should be deliberate and reversible.

## Pillar 4: Trust signals

Users need a way to tell official content from experiments. Keep certified datasets and dashboards in a controlled app, document the definition of each key metric, and link back to the metric definitions you built in Chapter 6. When two dashboards disagree, governance says which one wins and who fixes the other.

## Pillar 5: Lifecycle

Assets should not live forever by default. Review usage on a schedule, using the audit data covered in the next lesson, and retire what nobody opens. Archive first, delete later, and tell owners before you act. Datasets that no dashboard uses still cost storage and refresh time, and they can still expose data.

## A minimal governance charter

Even a one-page document helps. Write down who approves new datasets, how apps are named, who holds Manager roles, how changes are promoted, and how often content is reviewed. Then assign an owner to enforce it, since a policy with no owner is only a suggestion.

## Recap

Governance covers ownership, access roles, change management, trust signals, and lifecycle. Organize by app, use sharing roles with least privilege, promote changes through environments, and retire what's unused.

## Check yourself

A VP finds two dashboards showing different win rates. Which governance practices should have prevented this, and how do you resolve it now?
