# Choosing the Right Tool for a Given Analytics Need

Knowing what each Salesforce analytics product does is only half the skill. The other half is the judgment call an employer actually pays for: given a business question and a set of constraints, which tool should carry it? This lesson gives you a practical way to make that call, and a set of worked scenarios to practice it on.

## What you'll learn

- Four questions that narrow the choice quickly
- The typical sweet spot of native reports, CRM Analytics, Tableau Next, and classic Tableau
- Worked scenarios, including when the honest answer is "the simplest tool"
- Why "what we already have and know" is a legitimate factor

## Four questions to ask first

1. **How much data, and how fresh must it be?** Small, operational, up-to-the-minute views favor native reports. Large volumes and heavy slicing favor a platform with prepared datasets.
2. **Where does the data live?** Only in Salesforce objects, or spread across warehouses, files, and other systems? Data that is already unified in Data 360 points toward Tableau Next. Data that needs blending and preparation points toward CRM Analytics recipes or an upstream pipeline.
3. **Who builds, who consumes, and who governs?** A handful of admins building lists is a different problem from twenty teams that need one agreed definition of "Revenue."
4. **What is licensed, and what can the team support?** A brilliant design that needs a license nobody bought is not a design. Skills matter too: CRM Analytics adds its own query language and tooling that you will learn in Chapter 3.

## Typical sweet spots

| Need | Usually the best fit |
|---|---|
| Live operational lists, simple KPIs, one or two related objects | **Native reports and dashboards** |
| Large volumes, blending Salesforce with external data, deep interactive exploration, data preparation, complex calculations | **CRM Analytics** |
| Shared, governed metrics across many teams on data unified in Data 360; agent-assisted, natural-language analysis | **Tableau Next** |
| Existing Tableau investment, many non-Salesforce sources, highly polished visual design | **Tableau Desktop or Cloud** |

These are tendencies, not laws. Capabilities in all four products keep growing, and vendors describe overlaps openly, so re-check the current feature lists before committing to a major build.

## Worked scenarios

- **Weekly pipeline list for one sales team.** Native dashboard. Adding another platform here is cost without benefit.
- **Blend ERP invoices with opportunities and let managers slice interactively.** CRM Analytics is a strong candidate: external data, preparation, and interactive exploration are exactly its purpose.
- **One definition of "Revenue" shared by twenty teams and an AI assistant.** Tableau Next with a governed semantic model on Data 360 is the fit Salesforce is designing toward.
- **A large company with an established Tableau Cloud estate and a warehouse.** Keep building in Tableau, and connect Salesforce data into it. Do not migrate just because a newer product exists.

## Common mistakes

- Choosing the newest tool by default. Newer is not automatically better for your situation.
- Choosing the most familiar tool by default. Familiarity is a factor, not the only factor.
- Ignoring the cost of maintaining two platforms. Every additional tool adds licensing, skills, and governance work.

## Recap

- Ask about volume and freshness, data location, roles and governance, and licensing and skills
- Match the need to the tool's sweet spot, starting with the simplest option that works
- Re-verify capabilities before big decisions

## Check yourself

A regional manager wants a weekly list of open opportunities over a certain size, grouped by owner. Which tool should you recommend, and why is a more powerful platform the wrong answer here?
