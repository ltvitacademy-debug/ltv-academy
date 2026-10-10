# Lesson 1 — Why Test Apex

**Chapter 1 · Writing Apex Tests · Lesson 1 of 18**

## What you'll learn

- Why Salesforce makes automated tests a platform requirement, not just a best practice
- What `@isTest` classes actually are and how they differ from ordinary Apex classes
- The 75% code-coverage rule for deployment, and why it's a floor, not a target
- How tests protect you from the three biggest sources of unplanned breakage on the platform

## Testing isn't optional on this platform

On most platforms, automated testing is a team culture choice. On Salesforce, it's enforced by the platform itself: you cannot deploy Apex code to a production org, or package it for the AppExchange, unless it has test coverage. The Apex Developer Guide is specific about the mechanics — unit tests must cover at least 75% of your Apex code, and every one of those tests has to complete successfully for the deployment to go through. Calls to `System.debug` don't count toward that coverage, and neither do the test classes and test methods themselves; coverage is measured only against your actual application logic.

That 75% number is a gate, not a goal. Salesforce's own guidance is explicit that you shouldn't write tests to chase a coverage percentage — you should write tests that exercise every real use case of your code, and the coverage number falls out of that as a side effect. A class sitting at exactly 75% coverage with no assertions in its tests has satisfied the gate and tested nothing.

## What makes Salesforce different from "just test your code"

Three things make testing unusually important specifically on Salesforce, compared to a typical application you fully control:

1. **Multi-tenancy and governor limits.** Your code shares infrastructure with every other customer's code on the same instance. Salesforce enforces strict governor limits (maximum SOQL queries, DML rows, CPU time, and more) to keep one org's runaway code from degrading everyone else's. Code that works fine with 5 test records can blow through a limit with 200 records inserted in a single batch — and the only realistic way to catch that before a customer does is a test that inserts 200 records.
2. **Triggers fire in bulk, always.** A trigger you only ever tested with one record inserted at a time will behave differently — often badly — the first time someone imports a spreadsheet of 500 Leads, because all 500 records fire the same trigger in a single transaction. Bulk-safe code is a Salesforce-specific discipline, and tests are how you prove you have it.
3. **Declarative automation changes underneath your code.** Flows, validation rules, and page layouts can change without a deploy. A test suite that runs your trigger logic against real validation rules and sharing settings catches the case where someone adds a new required field or validation rule that now blocks your previously-working Apex.

## The shape of an Apex test class

A test class is an ordinary Apex class annotated `@isTest`, containing one or more methods also annotated `@isTest` (the modern style; older code sometimes uses the `testMethod` keyword instead, which still works but is no longer the recommended style). Test methods take no arguments and return no value. Salesforce runs these methods in a special test context: every DML change you make — inserting Accounts, updating Opportunities, whatever your test needs — is automatically rolled back when the test finishes, so your tests never leave junk data behind and never depend on what's already in the org.

```apex
@isTest
private class AccountServiceTest {
    @isTest
    static void updatesIndustryWhenBlank() {
        Account acc = new Account(Name = 'Test Co');
        insert acc;

        AccountService.setDefaultIndustry(new List<Id>{ acc.Id });

        Account updated = [SELECT Industry FROM Account WHERE Id = :acc.Id];
        System.assertEquals('Other', updated.Industry);
    }
}
```

Nothing about this test is exotic — it inserts data, calls the method under test, then queries back and checks the result. The rest of this chapter builds out every piece of that pattern in depth: how to generate realistic test data, how to write real assertions instead of ones that only check "it didn't throw," how coverage is actually measured, and how to share setup data across test methods cleanly.

## Key terms

| Term | Meaning |
|---|---|
| `@isTest` | Annotation marking a class or method as test-only code; test-only code is excluded from your org's Apex code limit |
| Code coverage | The percentage of non-test Apex lines executed by your test suite; Salesforce requires at least 75% org-wide to deploy to production |
| Governor limits | Hard caps the platform enforces on resource use per transaction (SOQL queries, DML rows, CPU time, etc.) to protect shared infrastructure |
| Bulk-safe | Code written to behave correctly whether it's handling 1 record or 200 records in the same transaction |
| Test rollback | Salesforce's automatic undo of all DML performed inside a test method once that method finishes |

## Lab

Open Developer Console (or VS Code with Salesforce Extensions) in a Developer Edition or scratch org. Find any existing Apex class with a trigger or service method behind it. Write a one-method `@isTest` class that inserts one record, calls the method, and queries the result back — don't worry yet about whether the assertion is meaningful, just get a test class to compile and run green in the Developer Console's test runner. Then open Setup → Apex Classes and check the "% Covered" column for the class you tested.

## Check yourself

Can you state the org-wide code coverage percentage Salesforce requires before you can deploy Apex to production? Can you explain, in your own words, why a trigger that only gets tested with a single record inserted at a time is not actually proven safe for real-world use?
