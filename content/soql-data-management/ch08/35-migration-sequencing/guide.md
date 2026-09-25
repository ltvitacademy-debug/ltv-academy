# Migration Sequencing: Parents Before Children

Salesforce data is relational. Contacts point to Accounts, Opportunities point to Accounts,
Cases point to both. When you load data, the **order of your loads** decides whether those
relationships survive. This lesson covers the load order and the External Id technique that
makes linking straightforward.

## What you'll learn

- The typical load order for core Salesforce objects
- Why child records can't be loaded before their parents
- How External Ids let you link children to parents without knowing Salesforce Ids

## Parents before children

A record with a lookup or master-detail relationship must reference a parent that already
exists. A typical order:

1. **Users**, because every record has an owner
2. **Accounts**, the parent of most other business records
3. **Contacts**, each linked to an Account
4. **Opportunities**, linked to Accounts
5. **Records that depend on those**, such as contact roles, Cases, and activities

Your own org's data model may add custom objects, and the rule is the same: sort objects by
dependency and load the depended-on ones first.

## The problem: new Ids don't exist yet

```text
Contact row:  LastName = Rivera,  AccountId = ???
```

The Salesforce Id of a new Account is created only when that Account is loaded. Your source
system's key means nothing to Salesforce by default.

There are two ways to solve this. One is to load the Accounts, take the Ids from Data
Loader's success file, and join them onto the Contact file in a spreadsheet, which works but
is error-prone at scale. The better way is an **External Id**.

## External Ids

An **External Id** is a custom field, for example `Legacy_Id__c` on Account, marked with the
External Id attribute. Objects can have several External Id fields. The pattern:

1. Add the External Id field to the parent object.
2. **Load the parents**, storing the source system's key in that field. Use **upsert** with
   that field as the matching key.
3. **Load the children**, mapping the parent relationship to the parent's External Id field,
   which Data Loader shows in the form `Account:Legacy_Id__c`. Salesforce resolves the real
   parent for each row.

You never look up a new Salesforce Id. As a bonus, upsert **updates** existing records rather
than creating duplicates, so a failed or repeated load is safe to run again.

## Special case: self-references

Some objects point to themselves, such as an Account's Parent Account. Load the records
first, then run a second **update** pass that fills in the lookup, since every parent needs
to exist before a child can point to it.

## Key terms

| Term | Meaning |
|---|---|
| Parent / child | The referenced record (parent) and the record that holds the reference (child) |
| External Id | A custom field flagged so records can be matched or referenced by a source-system key |
| Upsert | An operation that updates a record if the key matches and inserts it if not |
| Self-referencing lookup | A lookup field that points to another record of the same object |

## Check yourself

You must load 50,000 Contacts whose source rows carry the source system's customer key but no
Salesforce Account Id. What must be done to the Account object first, and how do you map
the Contact file?
