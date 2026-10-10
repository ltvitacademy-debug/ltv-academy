# Lesson 3 — Test Data and Test Factories

**Chapter 1 · Writing Apex Tests · Lesson 3 of 18**

## What you'll learn

- Why Apex tests should almost always create their own data instead of relying on what's in the org
- What `@isTest(SeeAllData=true)` does, and why it's discouraged for ordinary tests
- The test factory (test data builder) pattern, and the duplication problem it solves
- How to design a factory method that's flexible enough to serve many different test scenarios

## Tests create their own world

By default, an Apex test method sees none of your org's existing data — no Accounts, no Contacts, nothing you or your users created outside the test itself. This is deliberate. A test suite that depends on specific records already existing in the org (a particular Account named "Acme," a specific picklist value being set a certain way) is fragile: it breaks the moment someone cleans up test data in a sandbox, or runs the suite in a freshly created scratch org with nothing in it yet. Tests that create every record they need, inside the test method itself (or in `@TestSetup`, covered in Lesson 6), run identically in any org, every time.

Salesforce does provide an escape hatch: annotating a test class or method `@isTest(SeeAllData=true)` gives that test visibility into the org's existing data, including standard setup data like Business Hours and bypassing the usual data isolation. This exists for genuine edge cases — testing against configuration data that can't practically be created in a test (certain currency or org-wide default records) — but it is not meant for everyday use. A test marked `SeeAllData=true` is less portable, can behave differently from one org to the next, and (as you'll see in Lesson 6) loses the ability to use `@TestSetup` methods. Default to building your own data every time; reach for `SeeAllData=true` only when something genuinely cannot be created any other way.

## The problem test factories solve

Once you have more than a couple of test methods, you'll notice the same record-construction code repeated everywhere — building an Account, building a Contact tied to it, building an Opportunity tied to that. Copy-pasting this setup into every test method works at first, but it rots fast: when the object picks up a new required field, you now have to go fix that construction logic in every test method that builds one of those records.

A **test factory** (sometimes called a test data builder) is simply a method — usually a `public static` method on a dedicated `TestDataFactory` class — that builds a realistic, valid record (or set of records) for you, with sensible defaults, so every test method calls one factory method instead of repeating field-by-field construction.

```apex
@isTest
public class TestDataFactory {

    public static Account createAccount(String name) {
        return new Account(
            Name = name,
            Industry = 'Technology',
            BillingCountry = 'United States'
        );
    }

    public static List<Contact> createContacts(Id accountId, Integer count) {
        List<Contact> contacts = new List<Contact>();
        for (Integer i = 0; i < count; i++) {
            contacts.add(new Contact(
                LastName = 'Test Contact ' + i,
                AccountId = accountId,
                Email = 'contact' + i + '@example.com'
            ));
        }
        return contacts;
    }
}
```

Notice `createContacts` takes a `count` parameter and returns a list — this single method now serves both a single-record test and a 200-record bulk test, which is exactly the flexibility a trigger test (Lesson 8) will need.

## Keeping factories flexible, not rigid

A factory method that only ever returns one hardcoded record is barely better than copy-pasting. A better factory accepts the handful of fields a given test actually needs to vary, and defaults everything else sensibly, so most callers pass very little:

```apex
Account acc = TestDataFactory.createAccount('Acme Corp');
insert acc;
```

while a test that specifically needs to prove behavior tied to `Industry` can still override it after construction, or by passing it in. Resist the temptation to build one mega-factory method with a dozen optional parameters trying to cover every possible scenario — it's usually clearer to have a few small, named factory methods (`createAccount`, `createHighValueOpportunity`, `createContactWithoutEmail`) than one method trying to be everything.

## Key terms

| Term | Meaning |
|---|---|
| Test data isolation | The default behavior where a test method sees none of the org's pre-existing data unless it creates it |
| `@isTest(SeeAllData=true)` | Annotation giving a test visibility into existing org data; discouraged except for specific edge cases |
| Test factory / test data builder | A reusable method that constructs valid test records with sensible defaults, avoiding duplicated setup code |

## Lab

Create a `TestDataFactory` class in a Developer Edition or scratch org with a method that builds a valid Account, and a second method that builds a list of N Contacts linked to a given Account Id. Rewrite one of your Lesson 2 test methods to use the factory instead of constructing records inline. Then write a new test method that uses the same factory to insert 50 Contacts in one call, proving the factory works for both a single record and a bulk scenario without any changes to the factory itself.

## Check yourself

Can you explain why a test suite that depends on specific pre-existing records in the org is considered fragile? Can you describe what problem a test factory method solves that copy-pasting record-construction code into every test method does not?
