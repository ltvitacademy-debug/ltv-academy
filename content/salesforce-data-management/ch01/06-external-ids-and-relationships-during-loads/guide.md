# External IDs and Relationships During Loads

**Chapter 1 · Getting Data In · Lesson 6 of 20**

Lesson 5 mentioned that Upsert's real power comes from matching on an External ID rather than a Salesforce record ID. This lesson covers what an External ID field actually is, and the trickier problem it solves: loading records that need to point at each other — a Contact that belongs to a specific Account, for instance — when your CSV only has each side's identifier from the *old* system, not a Salesforce ID.

## What you'll learn

- What an External ID field is and why it exists
- How to upsert using an External ID instead of a Salesforce record ID
- How to load a relationship (like Contact → Account) without Salesforce IDs in hand
- Why the External ID has to actually be unique, or Upsert breaks in an ugly way

## What an External ID field is

An External ID is a custom field — Text, Number, or Email type — with the **External ID** attribute checked in its field definition. That attribute tells Salesforce to index the field and allow it to be used as a match key during an upsert. A typical example: a `Legacy_Customer_Number__c` text field on Account, holding the customer number from the CRM you migrated from.

```
# CSV for upserting Accounts, matched on External ID
Legacy_Customer_Number__c,Name,Industry
CUST-10234,Acme Corp,Technology
CUST-10567,Beta LLC,Healthcare
```

Run Upsert, choose `Legacy_Customer_Number__c` as the match field instead of `Id`, and Data Loader looks for an existing Account with that value. Found one — update it. Not found — insert a new Account and populate that field for next time. This is what makes repeated loads from the same legacy source idempotent: run the same file twice, and the second run updates instead of duplicating.

## Loading a relationship without Salesforce IDs

Here's the harder problem External IDs solve. Say you're loading Contacts, and each Contact needs to be linked to the right Account — but your Contact export only has the *legacy* Account number, not that Account's Salesforce ID. You could look up every Account's Salesforce ID by hand and add a column for it, but that doesn't scale past a handful of rows.

Instead, Data Loader lets you map a CSV column directly to a relationship field using **External ID dot notation**:

```
# CSV for upserting Contacts, linked to Accounts by their legacy number
FirstName,LastName,Account.Legacy_Customer_Number__c
Dana,Ruiz,CUST-10234
Omar,Khalil,CUST-10567
```

In the field mapping step, map `Account.Legacy_Customer_Number__c` to the Contact's `Account` lookup field. Data Loader resolves each value against the Account's External ID field behind the scenes and links the Contact to the matching Account — no manual ID lookup required. This works for any lookup or master-detail relationship, as long as the parent object has an External ID field to match against.

## Why uniqueness is non-negotiable

When you define an External ID field, Salesforce lets you also mark it **Unique**. Always do this for a field you intend to match on. If two Accounts somehow end up sharing the same `Legacy_Customer_Number__c` value, an Upsert matching on that field has two candidates and fails the row rather than guessing — which is the safe outcome, but only if you notice the failure. A non-unique External ID is the single most common cause of an Upsert job that "mostly worked" but silently skipped or duplicated a handful of rows.

## Try it yourself

In a sandbox, create a custom text field on Account called `Legacy_Customer_Number__c`, check both **External ID** and **Unique**. Build a small CSV like the first example above and upsert it, matched on that field. Then build a Contacts CSV using `Account.Legacy_Customer_Number__c` dot notation and confirm each Contact lands under the correct Account without ever touching a Salesforce ID by hand.

## Recap

- An External ID field is a custom field flagged to serve as a match key for Upsert — typically holding an identifier from a legacy system.
- Upserting on an External ID makes repeated loads from the same source idempotent.
- Dot notation (`RelatedObject.ExternalIdField`) lets you load relationships using the parent's legacy identifier, with no manual Salesforce ID lookup.
- Mark External ID fields Unique — a non-unique match field is how Upsert jobs silently go wrong.

## Check yourself

You're loading Opportunities that each need to link to the right Account, and your source file only has each Account's old ERP code. In one sentence, describe the CSV column and mapping that would connect them without looking up a single Salesforce ID by hand.
