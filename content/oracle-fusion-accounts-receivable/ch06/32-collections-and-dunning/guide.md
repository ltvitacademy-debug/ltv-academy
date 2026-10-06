# Collections and Dunning

Before a balance is ever written off (lesson 31), someone has to try to collect it. Oracle Fusion's collections functionality gives a company structured tools to track past-due customers, prioritize who to contact, and automate the escalating series of reminder notices known as **dunning**. This lesson covers how collections activity is organized and how dunning methods differ.

## What you'll learn

- The Collections Workbench and what a collector sees there
- Aged dunning versus staged dunning
- How dunning letters escalate in tone and urgency
- Where dunning fits for a customer, account, or site

## The Collections Workbench

The **Collections Workbench** is the central place a collector works from. For a given customer, it surfaces open balances by aging bucket, dunning history (what's already been sent and when), notes from prior contact, and the ability to print a statement or a dunning letter on the spot. Rather than hunting across multiple screens, a collector gets a consolidated view of exactly how overdue a customer is and what's already been tried.

## Two dunning methods: aged and staged

Dunning letters can be driven by one of two methods, configured per customer, account, or bill-to site:

- **Aged dunning** bases the letter on how old the customer's single oldest past-due transaction is. If the oldest open invoice crosses 30 days past due, it triggers the first-level letter; 60 days triggers the next level, and so on. The transaction's own age is what drives escalation.
- **Staged dunning** instead bases the next letter on how long it's been since the *last* dunning letter was sent, regardless of which specific transaction is oldest. If the last letter went out 15 days ago and the policy calls for a follow-up every 15 days, staged dunning triggers the next letter on schedule, treating the overall relationship's dunning cadence as the driver rather than any one invoice's age.

## Escalating tone and urgency

A dunning program typically defines multiple letters at increasing dunning levels, with each one more direct than the last:

1. A friendly first reminder — "you may have overlooked this invoice"
2. A firmer second notice — explicitly listing the overdue amount and due date
3. A formal final notice — warning of credit hold, collections referral, or service suspension

Letters can be delivered as a printed letter, a fax, or a PDF attachment, and the system tracks exactly which letter, at which level, went to which customer and when — which both supports a consistent customer experience and gives the next collector full context before making a call.

## Where dunning applies

Dunning setup can be scoped at different levels of specificity: the customer overall, a specific customer account, or an individual bill-to site. This matters for companies with large customers that have multiple divisions or locations ordering independently — one division might be a model payer while another division of the same parent customer is chronically late, and dunning needs to track and escalate at the right level rather than treating the whole customer as one undifferentiated relationship.

## Recap

Collections activity is organized around the Collections Workbench, which gives a collector a consolidated view of aging, history, and dunning tools for a customer. Dunning escalates reminder letters using either an aged method (driven by the oldest transaction's age) or a staged method (driven by time since the last letter), scoped at the customer, account, or site level as needed. Next up, lesson 33: customer statements, the other major piece of customer-facing AR communication.
