# Lesson 7 — Leads and Lead Conversion

**Chapter 2 · Build: Data and Objects · Lesson 7 of 20**

## What you'll learn

- How to configure the Lead object for Cascade's four lead sources
- The custom Lead fields that carry Cascade-specific information
- How to build a lead-conversion field mapping into the Account, Contact,
  and Opportunity fields from Lesson 6
- Why Jordan Kessler, the SDR, is the right example user for walking
  through this process

## Step 1 — Lead Source values

Cascade's **Lead Source** picklist (standard field) gets exactly the four
values from Lesson 2:

1. **Trade Show**
2. **Website Inquiry**
3. **Referral**
4. **Partner/Dealer**

Set these under **Object Manager → Lead → Fields & Relationships → Lead
Source → New** (adding picklist values), replacing the generic default
values Salesforce ships with.

## Step 2 — Lead custom fields

| Field label (API name) | Type | Purpose |
|---|---|---|
| Interested Equipment Category (`Interested_Equipment_Category__c`) | Picklist (Cooking Equipment / Refrigeration / Dishwashing / Ventilation / Full Kitchen Package) | Maps directly onto Primary Equipment Interest on Account after conversion |
| Estimated Locations (`Estimated_Locations__c`) | Number | A rough self-reported or rep-estimated count, refined into Number of Kitchen Locations after conversion |
| Trade Show Name (`Trade_Show_Name__c`) | Text | Only populated when Lead Source = Trade Show — which specific show this came from |

These three fields exist so the conversion mapping in Step 4 has
somewhere real to send data — a Lead field with no destination on Account
or Contact is a dead end.

## Step 3 — Who works Leads

Jordan Kessler, Cascade's SDR, owns every new Lead regardless of source.
His job is to confirm it's a real business (not a student project or a
competitor), qualify budget and timeline by phone or email, and either
convert it — handing the resulting Account and Opportunity to Tom
Baptiste or Priya Nair depending on size — or mark it **Unqualified**
with a reason. This is why the Lead object's owner field defaults to
Jordan's queue, not directly to a closing rep.

## Step 4 — The conversion field mapping

Go to **Setup → Lead → Fields → Lead Mapping** (the Lead conversion
mapping screen within Lead Settings). Confirm this mapping:

| Lead field | Converts to | Target field |
|---|---|---|
| Company | Account | Account Name |
| Interested Equipment Category | Account | Primary Equipment Interest |
| Estimated Locations | Account | Number of Kitchen Locations |
| First Name / Last Name | Contact | First Name / Last Name |
| Email / Phone | Contact | Email / Phone |
| (none — set manually on convert) | Contact | Contact Role |
| Lead Source | Opportunity | Lead Source |
| Company (via Opportunity Name convention) | Opportunity | Opportunity Name |

Two fields need to be set **by the converting user, not the mapping**:
Business Segment on the new Account (the rep picks the matching Record
Type and segment during conversion, since a Lead doesn't carry that
distinction) and Contact Role on the new Contact (Jordan doesn't always
know the buyer's exact title until the qualifying call).

## Step 5 — Converting a Lead, end to end

When Jordan clicks **Convert** on a qualified Lead:

1. Salesforce checks whether the Company name matches an existing Account
   (avoiding duplicates for accounts Cascade already works with)
2. It creates (or updates) the Account and Contact using the mapping
   above
3. It creates a new Opportunity, defaulted to the **Qualifying** stage —
   the first stage from Lesson 2's sales process
4. Jordan reassigns Account/Contact/Opportunity ownership to the correct
   rep — Tom Baptiste for a single-location Account, Priya Nair if
   Estimated Locations suggests a Key Account

## Why this matters

A lead-conversion mapping that silently drops data is one of the most
common real-world CRM complaints — a rep re-typing information the SDR
already collected. Building the mapping deliberately, field by field,
against the exact fields from Lesson 6, is what makes this capstone's
lead-to-cash flow actually complete end to end.

## Key terms

| Term | Meaning |
|---|---|
| Lead conversion | The process that turns one Lead into an Account, a Contact, and (optionally) an Opportunity |
| Conversion mapping | The field-by-field rule set controlling what data moves where during conversion |
| Queue | A holding owner for records (like new Leads) before an individual is assigned |

## Lab

Create a test Lead with Lead Source = Trade Show, Trade Show Name filled
in, Interested Equipment Category set, and Estimated Locations = 12.
Convert it and verify: the new Account has Primary Equipment Interest and
Number of Kitchen Locations populated correctly, and a new Opportunity
exists in the Qualifying stage.

## Check yourself

- Why does Jordan Kessler own new Leads instead of Tom Baptiste or Priya
  Nair?
- Which two fields have to be set manually during conversion instead of
  through the mapping, and why?
- What stage does a newly converted Opportunity start in?
