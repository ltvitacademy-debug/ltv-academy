# Lesson 7 — Person Accounts and Contact Models

**Chapter 1 · Enterprise Data Modeling · Lesson 7 of 26**

## What you'll learn

- The core B2B contact model (Account with related Contacts) vs. the person account model, and what each is actually for
- What a person account mechanically is under the hood, per Salesforce's own API documentation
- Why enabling person accounts is one of the most consequence-heavy, hardest-to-reverse decisions in this course
- How to decide which model fits a given business, including the "both at once" option

## The default model: business accounts and Contacts

Out of the box, Salesforce's default data model assumes a business-to-business relationship: an Account represents a company, and one or more Contacts represent individual people at that company, linked to it. This fits naturally when the customer genuinely is an organization with multiple people inside it — a vendor relationship, an enterprise client, a hospital system. The Account carries the company-level facts (industry, billing address, annual revenue); each Contact carries the person-level facts (title, email, phone) and relates back to the Account.

This model strains when the customer is an individual person with no company behind them — a consumer buying a mattress, a patient, a policyholder. Forcing a consumer business into the B2B model usually means creating an Account named after the person just to have somewhere to hang the required Account relationship, which is a real but awkward workaround, not a clean fit.

## What a person account actually is

Person accounts exist for exactly that consumer scenario. Mechanically, per Salesforce's own SOAP API developer documentation, a person account is a special Account record type: "Record types are person account record types if the Account field IsPersonAccount is set to true." Business accounts are the same object with that field set to false.

The important mechanical detail is what happens underneath: "When a person account is created... a corresponding contact record is also created. This contact record is referred to as a 'person contact.'" That person contact is uniquely bound to its person account — it's "the only contact record that can be associated directly with the person account" — meaning a person account can never have a second, separate Contact the way a business Account can have many. Per the same documentation, you can modify a person contact's fields, but you can't create or delete it directly, and you can't change its record type; those operations happen through the Account record instead, and deleting the Account deletes its person contact along with it.

Field-level security also works differently here: per Salesforce's documentation, to set field-level security on a person account field, you set it on the corresponding Contact field instead, and the person account field inherits that same setting — you can't give the two different security settings.

## Why this decision carries so much weight

Person accounts combine certain Account and Contact fields into a single record, available (per Salesforce Help) in Professional, Enterprise, Performance, Unlimited, and Developer editions, and an org can use both business accounts and person accounts side by side. Converting an existing business Account to a person account, or back, is a real, documented operation — but Salesforce Help itself describes going from business accounts to person accounts as something with "no easy way... but it can be done," and converting back empties the person-specific fields and turns the former person contact into an ordinary Contact under the same parent Account.

That framing matters: this isn't a setting you flip casually to see how it feels. Enabling person accounts at all is an org-wide decision with broad downstream effects — on page layouts, on any AppExchange package that assumes a traditional Account/Contact split, on search behavior, and on every piece of automation or integration that was written assuming an Account's related Contacts could never include "itself." Treat the decision to enable person accounts as effectively one-directional at the org level, and plan the data model around that reality rather than assuming you can casually walk it back once real data and integrations depend on it.

## Choosing a model

- **Pure B2B:** stick with business Accounts and Contacts. No reason to introduce person accounts if every customer is an organization.
- **Pure B2C:** person accounts fit naturally — one record represents one consumer, without an artificial company wrapper.
- **Mixed B2B and B2C in the same org** (common in insurance, healthcare, and retail-plus-wholesale businesses): this is exactly the scenario person accounts were built to coexist with business accounts for, but it raises its own design questions — which record type a given workflow, report, or integration should assume, and how reporting distinguishes the two cleanly. This mixed case deserves its own deliberate design pass rather than an assumption that "it'll just work," precisely because of how differently person accounts behave under the hood from an ordinary Account-with-Contacts pairing.

## Key terms

| Term | Meaning |
|---|---|
| Business account | A standard Account record (IsPersonAccount = false) representing an organization, related to one or more separate Contacts |
| Person account | An Account record (IsPersonAccount = true) combining account and contact fields to represent one individual consumer |
| Person contact | The single, automatically created Contact record uniquely bound to a person account; it can't be created, deleted, or independently record-typed |
| IsPersonAccount | The Account field that determines whether a given record is a person account or a business account |

## Lab

A regional healthcare network is deciding its customer data model. They have two real populations: (1) individual Patients who receive care directly, with no company involved, and (2) corporate Accounts — employer groups that sponsor health plans for their employees, where each employee is a Contact-like individual tied to the employer. Using this lesson's framework, recommend whether this org should enable person accounts, use only business accounts and Contacts, or run both models side by side — and explain, specifically, which of the two populations maps to which model and why forcing both populations into a single model would create problems.

## Check yourself

Can you explain, mechanically, what happens when a person account is created or deleted, and why a person account can never have a second Contact the way a business Account can? Can you explain why Salesforce Help describes converting business accounts to person accounts as something with "no easy way... but it can be done," and what that implies about treating this as a one-way architectural decision?
