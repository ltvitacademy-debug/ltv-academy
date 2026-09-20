# Accounts

Once a Lead converts (Lesson 7), it produces an Account and a Contact. This lesson covers the
first of those: the **Account**, the object that represents the company or organization at the
center of almost every other Sales Cloud object.

## What you'll learn

- What an Account object represents
- The real distinction between Business Accounts and Person Accounts
- Why Account is the object most other Sales Cloud objects relate back to

## An Account is a company or organization

An **Account** represents a company or organization Salesforce is tracking a relationship with —
a customer, a prospect, a partner. It's the anchor point for a huge share of Sales Cloud data:
Contacts belong to an Account, Opportunities are tied to an Account, and (as covered in Chapter 3)
Cases are tied to an Account too. When someone asks "what's our relationship with this company,"
the Account record and everything related to it is where that question gets answered.

## Business Accounts vs. Person Accounts

Most Accounts are **Business Accounts** — the standard case, representing a company with its own
name, industry, and one or more related Contacts (people who work there). But Salesforce also
supports **Person Accounts**, a real, specific feature (not enabled by default — an admin has to
turn it on) used when the "customer" is an individual consumer rather than a company, common in
B2C industries like retail, financial services for individuals, or healthcare. A Person Account
merges what would normally be a separate Account and Contact into a single record representing
one person. As an analyst, this distinction matters directly: if an org has Person Accounts
enabled, some "Account" records in your data represent individual people, not companies — and
treating them the same as Business Accounts in an analysis (like "average Contacts per Account")
will produce misleading results.

## Why Account sits at the center

Because so many other objects point back to Account, it's often the natural anchor for
company-level or customer-level analysis. "Total pipeline by Account," "all open Cases for this
Account," "every Contact at this Account" — these are all queries that start from Account and
traverse outward to related objects. Understanding Account well now sets up nearly everything the
rest of this chapter builds on.

## Key terms

| Term | Meaning |
|---|---|
| Account | The company or organization Salesforce tracks a relationship with |
| Business Account | The standard Account type, representing a company with related Contacts |
| Person Account | An optional Account type merging Account + Contact into one record for an individual consumer |

## Check yourself

If an org has Person Accounts enabled, why would calculating "average number of Contacts per
Account" across all Accounts produce a misleading number?
