# Lesson 11 — Multitenancy and How Salesforce Runs

**Chapter 3 · How Salesforce Works · Lesson 11 of 20**

## What you'll learn

- What "multitenancy" means and why it's the core idea behind how Salesforce is built
- How thousands of companies run on the same underlying Salesforce infrastructure without seeing each other's data
- What an "instance" (or "pod") is, and why your org lives on one
- The trade-offs multitenancy creates — including why Salesforce enforces governor limits

## One building, many tenants

Picture an apartment building. Every tenant has their own locked unit, their own furniture, their own guests — but they all share the same plumbing, the same elevators, and the same roof. Nobody has to install their own water heater, and when the building owner upgrades the lobby, every tenant benefits at the same time.

That's **multitenancy**: a single, shared software application and database infrastructure that serves many separate customers ("tenants") at once, while keeping each tenant's data completely walled off from every other tenant. When Acme Corp and Globex Inc both use Salesforce, they are running on the exact same application code, the exact same servers, and often the exact same physical database — but neither can see, query, or touch the other's records. Every row of data in Salesforce's underlying database is tagged with an organization ID, and every query is automatically scoped to the org the logged-in user belongs to.

This is fundamentally different from older, "single-tenant" enterprise software, where a company would install its own dedicated copy of an application on its own servers (or a dedicated virtual machine in the cloud). With single-tenant software, every customer's copy could drift out of sync — different versions, different patches, different bugs. Multitenancy means everyone is always on the same version of the same application.

## Why Salesforce built it this way

- **Automatic upgrades for everyone.** Three times a year (you'll cover this in the next lesson), Salesforce pushes a platform-wide upgrade. Every single customer gets the new features at the same time — nobody has to schedule an IT project to "install the update."
- **Economies of scale.** Salesforce can invest enormous engineering effort into security, performance, and reliability once, and every tenant benefits, instead of each company maintaining its own infrastructure.
- **Consistent security model.** Because the architecture is identical for every customer, Salesforce can harden it once and that hardening protects everyone.

## Instances (pods)

Your Salesforce org doesn't live on "the internet" in some abstract sense — it's physically hosted on a specific cluster of servers that Salesforce calls an **instance**, often nicknamed a "pod" (for example, an org might live on an instance named something like NA123). Each instance hosts many different companies' orgs at once. Salesforce publishes the status of every instance in real time, which you'll explore in Lesson 15.

## The trade-off: governor limits

Sharing infrastructure means Salesforce has to protect every tenant from any one tenant hogging shared resources — one company's runaway process can't be allowed to slow down everyone else on the same instance. That's why Salesforce enforces strict **governor limits**: hard caps on things like how many database queries a single transaction can run, how much data can be processed at once, or how many emails can be sent per day. You'll run into governor limits constantly once you start building in Salesforce — they exist specifically because the platform is multitenant.

## Key terms

| Term | Meaning |
|---|---|
| Multitenancy | One shared application and infrastructure serving many separate customers, with data fully isolated per tenant |
| Tenant | A single customer organization running on the shared platform |
| Instance (pod) | The specific cluster of servers your org is physically hosted on |
| Governor limit | A hard resource cap enforced per transaction, so no tenant can degrade performance for others |

## Lab

1. Log in to any Salesforce org (a free Trailhead Playground works) and check Setup → Company Information for your org's **Instance** name.
2. Visit trust.salesforce.com (you'll use this site properly in Lesson 15) and search for that instance name to see its current status.
3. In one or two sentences, explain to a non-technical friend why Salesforce can push a new feature to millions of users overnight — tie your answer back to multitenancy.

## Check yourself

You're ready for Lesson 12 when you can explain, in plain language, what multitenancy means, why Salesforce uses it, and what an instance is — without using the word "cloud" as a stand-in for an actual explanation.
