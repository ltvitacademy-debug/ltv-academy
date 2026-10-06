# Accounts and Contacts

**Chapter 1 · Objects · Lesson 3 of 23**

Account and Contact are the first two standard objects most people learn in Salesforce, and for good
reason: nearly everything else in the Sales Cloud data model points back to one of them.

## What you'll learn

- What an Account represents, and what's actually required to create one
- What a Contact represents, and how it relates to an Account
- That a Contact can relate to more than one Account (Contacts to Multiple Accounts)

## Account: the company

An **Account** represents the company or organization you have a relationship with — a customer, a
prospect, a partner. The New Account form has dozens of available fields (Type, Industry, Rating,
Billing/Shipping Address), but in a default org only **Account Name** is actually required to save a
record. Everything else is detail you can fill in over time.

## Contact: the person at that company

A **Contact** represents a person associated with an Account — typically someone who works there.
Contacts carry their own fields (Title, Email, Phone) and their own related lists: on a Contact
record page you'll see Opportunities and Cases tied to that specific person, not just to the Account
as a whole. A Contact is where "the company" and "the people at the company" meet.

## A Contact isn't locked to one Account

By default, each Contact has one primary Account. But Salesforce also supports **Contacts to
Multiple Accounts**, an optional feature that lets a single Contact have *indirect* relationships to
other Accounts too — useful for consultants, board members, or anyone who legitimately works across
more than one organization. When it's enabled, a Contact's Related Accounts list shows both the
primary (direct) relationship and any indirect ones, each with its own Roles field describing how
that person relates to that particular Account.

## Key terms

| Term | Meaning |
|---|---|
| Account | The company or organization a relationship is with |
| Contact | A person tied to an Account |
| Contacts to Multiple Accounts | Optional feature allowing a Contact to have indirect relationships to Accounts beyond its primary one |

## Recap

- Account Name is the only field required to create an Account by default.
- A Contact's related lists (Opportunities, Cases) reflect what's tied to that person specifically.
- Contacts to Multiple Accounts is off by default and adds indirect Account relationships for a Contact.

## Check yourself

A consultant works directly for Consulting Partners Southwest but also regularly represents Get
Cloudy on deals. With Contacts to Multiple Accounts enabled, which of their two Account relationships
would be the "direct" one, and which would be "indirect"?
