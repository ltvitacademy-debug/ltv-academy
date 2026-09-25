# Campaign Analysis

Marketing spends money to reach people, and Salesforce records who was reached, who responded and what came of it. In this lesson you will use the standard campaign report types to answer three questions: who did each campaign reach, how did they respond, and what business followed. Lesson 32 then puts a return-on-investment number on the answers.

## What you'll learn

- The standard campaign report types and when to use each
- How Campaign Members and member status drive response reporting
- How to calculate response rate and conversion by campaign
- How campaign hierarchies and the "first campaign" limitation affect your numbers

## Campaigns and campaign members

A **Campaign** is a marketing initiative: an event, an email series, a webinar. A **Campaign Member** is a lead or contact attached to that campaign, with a **Member Status** such as Sent, Responded or Attended. Which statuses exist is defined per campaign, and each status is flagged as either "responded" or not. Response reporting is only as good as those statuses being kept up to date, whether by hand, by import or by automation. Your org may also allow person accounts as members.

## The standard campaign report types

In the Campaigns category of the report type picker, most orgs have report types along these lines:

- **Campaigns**: one row per campaign, with its own statistics such as number sent, budgeted cost, actual cost and, in most orgs, roll-up counts of leads, converted leads, opportunities and value won
- **Campaigns with Campaign Members**: one row per member, for who was reached and how they responded
- **Campaigns with Leads** and **Campaigns with Contacts**: the same idea from the lead or contact side
- **Campaigns with Opportunities**: which opportunities are linked to which campaign
- **Campaigns with Influenced Opportunities**: available only if Campaign Influence has been turned on, and dependent on edition and setup

Exact names and availability vary, so browse the category in your own org.

## Response rate

Response rate is members who responded divided by members reached. Two native ways to get it:

- Use the roll-up fields on the Campaign object, such as total responses and number sent, in a summary formula
- Use Campaigns with Campaign Members, group by campaign, and add a matrix column for the member's Responded flag

Number sent is often filled in manually or by an integration, so verify it exists before dividing. When it does not, use the count of members whose status is any "sent" status as the denominator, and label it that way.

## From response to pipeline

Campaign roll-up fields give quick totals: leads generated, converted leads, opportunities created and value of won opportunities. They are useful for a high-level comparison of campaigns. Beware of what they count. In most orgs an opportunity is credited to a campaign through its single **Primary Campaign Source** field, so an opportunity can only point to one campaign. If a customer attended a webinar and then received a later email, one of them gets all the credit. Multi-touch credit needs Campaign Influence, discussed in the next lesson.

## Hierarchies

Campaigns can have parents. A parent campaign such as "Spring Product Launch" may contain child campaigns for email, event and paid social. Hierarchy statistics roll up totals across the family, which is helpful for a program view but easy to double count if you also list the children in the same report. Decide whether you are reporting at program or tactic level, and filter accordingly.

## Watch for

- Members added late, or statuses updated in bulk, which shift the response date rather than the actual response
- Test campaigns and old campaigns polluting the list. Filter on Active or a date range
- Comparing campaigns of very different sizes by totals rather than rates

## Recap

Use Campaigns for campaign-level statistics, Campaigns with Campaign Members for reach and response, and the opportunity-linked types for pipeline. Response rate needs a trustworthy denominator, single-source opportunity credit can mislead, and hierarchy roll-ups need care to avoid double counting.
