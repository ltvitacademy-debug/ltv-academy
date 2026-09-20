# Editions & the AppExchange

Not every Salesforce org is the same size. A ten-person startup and a ten-thousand-employee
enterprise are both "running Salesforce," but they're very likely on different **editions** —
and that difference shapes what data, automation, and features actually exist in the org you're
analyzing. On top of that, most real orgs aren't running stock Salesforce at all; they've
installed apps from the **AppExchange**. Both facts change what you'll find when you start
poking around an org's data model.

## What you'll learn

- What a Salesforce edition is, and why it isn't just a pricing tier
- The real edition tiers and roughly what separates them
- What the AppExchange is, and why installed apps matter to an analyst

## Editions: not just price, but real feature and limit differences

A Salesforce **edition** determines which features, customization limits, and automation tools
an org actually has access to — it's not purely a price tag. The real tiers, from smallest to
largest, are:

- **Essentials** — built for very small teams; combined sales and service in one simplified
  product, with the fewest customization options.
- **Professional** — full CRM feature set for growing teams, but with real limits on
  automation and customization depth.
- **Enterprise** — the most common tier for mid-size and larger companies; opens up deeper
  customization, more automation, and API access that smaller tiers restrict.
- **Unlimited** — Enterprise's full feature set plus higher limits, more storage, and premium
  support, for orgs pushing the platform hardest.

Why this matters to an analyst: a field, automation, or API access you expect to exist might not,
depending on the org's edition. An Essentials org simply doesn't have some of the customization
capability an Enterprise org has — that's not a data quality problem, it's a licensing reality
you need to recognize before you assume something is "missing" or "broken."

## The AppExchange: Salesforce's real app marketplace

The **AppExchange** is Salesforce's official marketplace for third-party apps and add-ons that
install directly into an org — similar in spirit to a mobile app store, but for enterprise
software that extends Salesforce. A real org you analyze may have installed AppExchange products
for things like advanced marketing automation, document generation, data quality tools, or
industry-specific processes. Those installed apps often bring their own **custom objects** and
**custom fields** into the org — data that didn't come from standard Salesforce at all, and won't
be in any generic Salesforce documentation you look up. Part of understanding a real org's data
model is recognizing when you've hit AppExchange-sourced data versus native Salesforce data.

## Key terms

| Term | Meaning |
|---|---|
| Edition | The Salesforce tier (Essentials, Professional, Enterprise, Unlimited) that sets feature/limit access |
| Enterprise Edition | The most common tier for mid-size and larger companies; deep customization + API access |
| AppExchange | Salesforce's official marketplace for installable third-party apps |
| Custom object/field | Data added by an admin or an installed app, not part of standard Salesforce |

## Check yourself

An analyst finds a field they've never seen in any Salesforce documentation. What are the two
likely explanations this lesson gives for where non-standard data like that comes from?
