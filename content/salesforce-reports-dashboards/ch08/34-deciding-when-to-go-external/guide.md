# Deciding When to Go External

The last lesson listed where native reporting stops. That list is not an argument for
abandoning it. Native reports and dashboards are free with your licenses, always in sync
with your data, understood by every admin, and secured by the same sharing rules as the
records themselves. The skill this lesson teaches is the decision: when is native enough,
and when does a different tool earn its extra cost?

Product names, packaging, and pricing in this area change often. Treat the tools below as
categories, and confirm current capabilities and licensing before recommending one.

## What you'll learn

- A short set of questions that decides "native or external"
- The main external options and what each is generally good for
- The hidden costs of leaving native reporting
- The rule of thumb: native first, escalate on evidence

## Start with the question, not the tool

Before naming any product, write down the business question in one sentence and who will
use the answer. Then ask five things in order:

1. **Can one report type plus filters answer it?** If yes, build it natively. Most
   operational questions (pipeline by stage, open cases by priority) live here.
2. **Does it need history nobody captured?** If the trend can be planned going forward, set
   up reporting snapshots or historical trend reporting. If the history has to be
   reconstructed from other sources, you need a tool that can hold it.
3. **Does it need data from outside Salesforce?** ERP revenue, web analytics, finance
   budgets, and support-tool telemetry cannot be blended natively.
4. **Is volume or performance the real constraint?** If well-filtered reports still time out
   or you are analyzing millions of rows, the tool is the bottleneck.
5. **What does the audience need?** A weekly manager check-in is well served natively. An
   executive who wants to drag, drill, and explore freely, or a customer-facing embedded
   view, often is not.

## The external options, in general terms

| Option | Generally good for |
|---|---|
| **CRM Analytics** | Deeper analysis inside Salesforce, with datasets that can also include outside data. Typically separately licensed. |
| **Tableau** | Rich visual exploration across Salesforce plus many other sources. You met it in its own course. |
| **Tableau Next** | Salesforce's newer analytics experience built on the Salesforce platform. Covered in the next course. |
| **A warehouse and BI tool** | Organizations that already keep data in a warehouse and want Salesforce as one of many sources. |

You don't need to master these yet. The next course, Salesforce CRM Analytics and Tableau
Next, goes deeper on the Salesforce-native ones.

## The costs people forget

Going external is not free even when the software is. Count:

- **Licensing and setup**, including any data pipeline you must build and maintain
- **Governance**: a copy of Salesforce data outside Salesforce needs its own security
  model, or people may see records the org's sharing rules would have hidden
- **Freshness**: an external copy is only as current as its last refresh
- **Skills and support**: someone must own the new tool, and users must learn it
- **Two versions of the truth**: a native number and an external number that disagree
  destroy trust faster than a limitation ever will

## The rule of thumb

**Native first. Escalate on evidence.** Build it natively, and move only when you can point
to a specific requirement (history, outside data, scale, interactivity) that the native
tool cannot meet, and that the business cares enough about to pay for. Analysts who
escalate by taste build expensive dashboards that a report would have served. Analysts who
never escalate spend weeks on workarounds that a proper tool would solve in a day.

## Recap

Ask the five questions in order, match the requirement to the tool category, count the
hidden costs, and default to native until evidence says otherwise.

## Check yourself

A VP wants a dashboard combining Salesforce pipeline with monthly revenue from the ERP,
refreshed weekly. Which of the five questions does this fail natively, and what would you
check before recommending a tool?
