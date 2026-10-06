# Lesson 3 — CRM Data: Accounts, Contacts, Leads and Opportunities

**Chapter 1 · CRM Fundamentals · Lesson 3 of 20**

## What you'll learn

- The four record types nearly every CRM is built around
- How they relate to each other
- The difference between a "lead" and a "contact" — a distinction that
  trips up almost everyone new to CRM
- Why this structure, not any particular software, is the real thing to learn

## Four record types, one shared shape

Lesson 2 introduced leads and opportunities as part of the lifecycle.
This lesson slows down on the actual data — the records a CRM stores
and how they connect. Nearly every CRM platform, Salesforce included,
organizes customer data around four core record types:

- **Account** — the company (or household, for a consumer business)
- **Contact** — a specific person at that account
- **Lead** — someone who's shown interest, not yet qualified as a contact or account
- **Opportunity** — a specific potential deal, linked to an account

## Account: the organization

An account represents the business you're selling to — "Acme
Manufacturing," not any one person there. Accounts hold company-level
information: industry, size, billing address, website. For a
business-to-consumer company, "account" often just means the
individual customer or household instead of a company.

## Contact: a real person, tied to an account

A contact is a specific human being — a name, an email, a phone
number, a job title — linked to an account. One account can have many
contacts: the IT director who evaluates the product, the CFO who signs
off on the budget, the end user who'll actually log in every day.
Keeping them as separate contacts under one shared account is what
lets a rep see the whole buying committee, not just whoever answered
the phone first.

## Lead: not qualified yet

This is the distinction that trips up almost everyone new to CRM.
A **lead** is a single, unqualified record — name, company, email, all
in one object — that exists *before* anyone has decided this is a real
account and contact worth pursuing. Leads come from marketing forms,
trade show badge scans, cold outreach lists, referrals.

Once a lead is qualified as worth pursuing, it gets **converted**: the
CRM splits that one lead record into an account, a contact, and
usually an opportunity. Before conversion, you have one messy,
unverified record. After conversion, you have three clean, connected
ones. That conversion moment is the real boundary between "someone
might be interested" and "we are now actively selling to this
account."

## Opportunity: the deal itself

An opportunity is a specific potential sale, linked to an account (and
usually a contact): a dollar amount, an expected close date, and a
stage showing how far along it is — prospecting, proposal sent,
negotiation, closed-won, or closed-lost. One account can have multiple
opportunities over time, including ones that were lost and ones that
come later for renewals or upsells — the history doesn't disappear
just because one deal didn't close.

## How it all connects

A typical path: a lead comes in from a webinar signup → it gets
qualified and converted into an account, a contact, and an
opportunity → the opportunity moves through stages until it closes →
the account and contact remain in the system permanently, ready for
the next opportunity, renewal, or support case. That thread, from
first contact to years later, is the entire reason these four record
types exist as separate things instead of one giant list.

## Key terms

| Term | Meaning |
|---|---|
| Account | The company (or household) a business sells to |
| Contact | A specific person, linked to an account |
| Lead | An unqualified record of interest, not yet a contact or account |
| Convert | The process of turning a qualified lead into an account, contact, and opportunity |
| Opportunity | A specific potential deal, with a value, close date, and stage |

## Lab

1. Think of a recent purchase you made from a business with a sales
   process (a car, enterprise software, a custom service). Identify
   what would have been the lead, and what would have been the
   opportunity, in that process.
2. Explain in one or two sentences why a business wouldn't want to
   create a permanent "contact" record for every single unqualified
   lead that ever filled out a form.

## Check yourself

You're ready for Lesson 4 when you can explain the difference between
a lead and a contact, and describe what "converting" a lead actually
produces.
