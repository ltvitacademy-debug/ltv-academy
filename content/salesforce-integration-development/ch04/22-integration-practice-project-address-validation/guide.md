# Lesson 22 — Integration Practice Project: Address Validation

**Chapter 4 · Patterns and Practice · Lesson 22 of 23**

## What you'll learn

- How to design a Request-Reply address-validation integration end to end
- Why a before-save trigger or before-save Flow cannot make a callout at all
- The two real architectural options this constraint leaves you with
- A complete Screen Flow-based solution versus an async-with-follow-up-update solution
- How to decide between the two for a given business requirement

## The project

Riverstone Outfitters wants every new Contact's mailing address checked against an address-validation API before it's considered "verified," standardizing the format (consistent casing, abbreviations) and flagging invalid addresses for manual review. Define your own plausible JSON contract for the validation API, for example:

```json
{
  "valid": true,
  "standardized_address": {
    "street": "123 Main St",
    "city": "Atlanta",
    "state": "GA",
    "zip": "30301"
  }
}
```

This is a Request-Reply pattern (Lesson 19): the validation result is needed before the record can be considered complete.

## The constraint that shapes this whole project

Here's the design problem worth sitting with: a **before-save** Apex trigger and a **before-save** Flow both run with DML already pending as part of that very save — which means, per the transaction-ordering rule from Lesson 7, **neither one can make a callout at all**. You cannot validate an address synchronously inside the same save that's creating the Contact. This is a real, governor-limit-driven constraint, not an oversight to work around with a trick — and it leaves exactly two legitimate architectural options.

## Option A: a Screen Flow, validating while the user is still present

If a human is filling out the Contact's address interactively, build a **Screen Flow** with an HTTP Callout action (Lesson 16) that validates the address *while the user is still on the screen*, before they submit. Because this happens before any Salesforce DML occurs at all — it's just a callout from a running Flow interview, not a before-save context — there's no conflict with the ordering rule. The user sees the standardized address and any validation warning immediately, and can correct it before submitting.

## Option B: save first, validate asynchronously, then update

If there's no interactive screen (for example, Contacts are created via the standard API from an external bulk import), the Contact has to be created first, and validation happens *after*, asynchronously:

```apex
trigger ContactAfterInsert on Contact (after insert) {
    List<Id> newContactIds = new List<Id>();
    for (Contact c : Trigger.new) {
        newContactIds.add(c.Id);
    }
    System.enqueueJob(new AddressValidationJob(newContactIds));
}
```

```apex
public class AddressValidationJob implements Queueable, Database.AllowsCallouts {
    private List<Id> contactIds;

    public AddressValidationJob(List<Id> contactIds) {
        this.contactIds = contactIds;
    }

    public void execute(QueueableContext context) {
        List<Contact> toUpdate = new List<Contact>();
        for (Contact c : [SELECT Id, MailingStreet, MailingCity, MailingState, MailingPostalCode
                          FROM Contact WHERE Id IN :contactIds]) {
            // build and send the callout per contact or in a batched request,
            // then parse the response and set Address_Verified__c / standardized fields
            toUpdate.add(c);
        }
        if (!toUpdate.isEmpty()) {
            update toUpdate;
        }
    }
}
```

This follows the exact same `after insert` trigger → Queueable → callout → DML shape as Lesson 21's Order Sync project, because it's the same underlying constraint being solved the same way: this is an `after` trigger, so the record already exists and its own DML has committed by the time the Queueable's callout runs — there's no conflict, just a brief delay between creation and verification.

## Choosing between A and B

Choose Option A when a human is present and interactive feedback adds real value (catching a typo before submission). Choose Option B when records arrive without a user present to watch a screen, or when a short delay before verification is acceptable. Many real implementations actually need both: Option A for the UI-driven create path, and Option B as a safety net catching anything created another way (API imports, data loads) that never went through the screen at all.

## Lab

Build Option B in a scratch org: the `after insert` trigger, the `AddressValidationJob` Queueable class, a simulated validation endpoint (reuse the same simulation technique from Lesson 21 — a throwaway Apex REST service), and an `Address_Verified__c` checkbox field on Contact. Using Lesson 5's mocking technique, write a test asserting the field is set correctly after a successful mock validation. Then, as a written design exercise only (no need to build it), sketch what Option A's Screen Flow would look like step by step.

## Check yourself

Explain, precisely, why a before-save trigger or before-save Flow cannot make a callout — tie your answer back to the specific rule from Lesson 7. Then explain the difference between Option A and Option B, and state one real scenario where you'd need both at once.
