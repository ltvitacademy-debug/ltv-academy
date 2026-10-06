# Designing Expense Policy for a Real Company

Every lesson so far assumed Castellan Supply Co.'s policy already existed. This lesson works the problem in the other direction: you are the consultant handed a blank slate for a new client, **Harrowgate Freight Logistics**, a 600-employee regional trucking and logistics company that has never used a formal expense system — managers currently approve paper receipts by eyeballing them. Your job is to design the policy framework before any Oracle configuration begins.

## What you'll learn

- The discovery questions a consultant asks before designing any policy
- How a company's actual spending risk should shape audit intensity, not vice versa
- A worked policy design for Harrowgate across templates, limits, and audit rules
- Why policy design is a business conversation, not a technical one

## Start with discovery, not with Oracle

Before opening a single Expenses setup screen, a consultant needs answers to:

- **Who travels, and how much?** Harrowgate's dispatchers rarely travel; its 40 regional sales and account managers travel two to three nights a week.
- **What has historically gone wrong?** Harrowgate's controller mentions, informally, that fuel card misuse and unsubstantiated "client meals" are the two complaints that come up most in manual review.
- **What's the risk tolerance?** A 600-employee trucking company watching margins closely wants tight cost control; it does not want to spend more on policy enforcement overhead than the overhead is worth.
- **What already exists?** Harrowgate has a fuel card program for drivers (handled outside Expenses, through fleet management) that must not be confused with a corporate card program for traveling employees.

## Designing from what you learned

Because fuel card misuse and unsubstantiated client meals are the named pain points, policy design concentrates there rather than spreading effort evenly:

```
Harrowgate Freight Logistics - policy framework (illustrative)
  Business units: Harrowgate Corporate, Harrowgate Regional Sales

  Template: Regional Sales Travel
    Hotel:            $160/night cap (reflects Harrowgate's secondary-market travel)
    Business Meal:     $65/person cap, RECEIPT ALWAYS REQUIRED regardless of amount
    Client Entertainment: 100% audit (the named pain point)

  Corporate card: company-liability, issued only to the 40 regional reps
  Audit rule: "Repeat missing receipt" - 2+ declarations in 90 days -> Complete audit
  Audit rule: "Client Entertainment" - every instance -> Complete audit
```

Notice what is deliberately **not** heavily audited: routine ground transportation and standard hotel stays within policy, since nothing in discovery suggested those were a problem. Auditing everything equally would waste reviewer time on low-risk spend while the two real risk areas get the same scrutiny as everything else.

## Policy design is a business conversation

The technical configuration — templates, categories, audit rules — is the easy part once the decisions are made. The harder part is getting Harrowgate's controller and CFO to actually agree on numbers: is $65 per person a defensible client meal cap in Harrowgate's markets, or will account managers push back immediately? A consultant typically proposes a draft policy, benchmarks it against a couple of comparable companies if data is available, and iterates with the client before anything gets built in Oracle Fusion Expenses. Building the wrong policy correctly in Oracle is still the wrong policy.

## Recap

Policy design starts with discovery — who travels, what's gone wrong historically, what the company's risk tolerance is — not with Oracle setup screens. Audit intensity should concentrate on named risk areas rather than being spread evenly, and the hard part of the work is a business conversation about defensible numbers, not the technical configuration itself. Next up, lesson 19: corporate card reconciliation, the course's final lesson, closing the loop on the card topics from Chapter 2.
