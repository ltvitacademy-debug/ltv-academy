# Lesson 1 — Business Processes in Salesforce

**Chapter 1 · Declarative Business Logic · Lesson 1 of 18**

## What you'll learn

- What a "business process" actually means, in plain terms
- The declarative toolbox Salesforce gives admins to automate one: Validation Rules, Approval Processes, Flow, and Email Alerts/Notifications
- Why Salesforce admins are taught "clicks before code"
- How this chapter and the next one are organized

## A business process is just a repeatable sequence of steps

Strip away the jargon and a business process is nothing more than: someone does something, which triggers someone else to do something, until the work is done and recorded. Every org already runs dozens of these, whether or not anyone calls them "processes":

- An employee submits an expense report. A manager approves or rejects it. Finance reimburses it.
- A sales rep requests a non-standard discount. A manager, and maybe a VP, signs off before the deal can close.
- A support case sits unworked for four hours. It escalates to a supervisor automatically.
- A new hire needs a laptop, a badge, and system access, in a specific order, before day one.

None of that is specific to software. Businesses ran all of it on paper and email long before Salesforce existed. What Salesforce adds is a place where the record, the rule, and the notification live together, so the process runs the same way every time instead of depending on someone remembering to forward an email.

## The declarative toolbox, previewed

This chapter walks through four tools an admin reaches for before anyone writes a line of Apex:

| Tool | What it does | Lesson |
|---|---|---|
| **Approval Processes** | Routes a record to one or more people for sign-off before it can proceed | Lessons 2-3 |
| **Validation Rules** | Blocks a save outright when the data doesn't meet a standard | Lesson 4 |
| **Formulas** | The expression language every one of these tools leans on | Lesson 5 |
| **Email Alerts / Notifications** | Tells a human a process needs their attention | Lesson 6 |

Chapter 2 then steps back and asks the harder question: *which* tool, and when do you need to escalate past the declarative toolbox entirely into Apex.

## Why "clicks before code"

Salesforce's own admin guidance, and most architects you'll work for, default to the same order of operations: try to solve a requirement with configuration (validation rules, approval processes, Flow) before reaching for custom code. A few reasons this isn't just dogma:

1. **Maintainability.** A validation rule or an approval process can be read and changed by the next admin without a deployment pipeline. Apex requires a developer, a sandbox, and a deploy.
2. **Upgrade safety.** Salesforce's three annual releases are far less likely to break declarative automation than custom code that depended on an internal API behaving a certain way.
3. **Speed.** A validation rule can go from idea to production in an afternoon. A trigger needs tests, code review, and a deployment window.

That doesn't mean code is wrong — some logic (complex calculations across many related records, callouts to external systems, anything that needs to run outside of a single record's save) genuinely needs Apex. Chapter 2 gives you the actual decision criteria instead of a rule of thumb.

## A process you'll follow through this chapter

To keep the lessons concrete, most of this chapter uses one running example: a **discount approval process** for Opportunities. A rep requests a discount above a threshold; the request has to pass a validation rule (is the discount even allowed at all), then route through one or more approvers, with an email alert telling each approver it's their turn. By Lesson 6 you'll have seen every piece of that process built.

## Recap

- A business process is a repeatable sequence of steps — Salesforce didn't invent the concept, it gives it a home.
- The Chapter 1 toolbox: Approval Processes, Validation Rules, Formulas, and Email Alerts.
- "Clicks before code" is a maintainability and speed argument, not a rule against Apex.
- Chapter 2 covers how to actually decide between declarative and programmatic solutions.

## Check yourself

Name one business process your own workplace (or a business you're familiar with) runs today without any software enforcing it. What would go wrong if two different employees ran it two different ways?
