# Lesson 10 — Apex Tests

**Chapter 2 · Build: Automation and Code · Lesson 10 of 25**

## What you'll learn

- Salesforce's org-wide test coverage requirement and what it actually means for deployment
- `@isTest`, `Test.startTest()` / `Test.stopTest()`, and why test data must be created in the test itself
- A full bulk-safe test class for `WarrantyClaimTriggerHandler`
- `HttpCalloutMock`, and why a test can never make a real callout

## The coverage requirement, precisely

To deploy Apex to a production org, Salesforce requires an **org-wide average of at least 75% Apex code coverage**, with all executed tests passing, and **every trigger must have some test coverage** of its own — an org can be above 75% overall and still have deployment blocked by one trigger with zero coverage. `System.debug` statements don't count toward coverage, and test classes don't count toward the denominator either. 75% is described in Salesforce's own documentation as the minimum the platform enforces, not a target to aim for — Priya's standard for this capstone is coverage that actually exercises positive cases, negative cases, and bulk behavior, not just enough lines touched to clear the bar.

## Anatomy of a test method

```apex
@isTest
private class WarrantyClaimTriggerHandlerTest {

    @TestSetup
    static void setup() {
        Account acc = new Account(Name = 'Test Account');
        insert acc;
        Asset asset = new Asset(Name = 'Test Range', AccountId = acc.Id);
        insert asset;
        Service_Contract__c contract = new Service_Contract__c(
            Account__c = acc.Id,
            Asset__c = asset.Id,
            Coverage_Limit__c = 500,
            Start_Date__c = Date.today().addDays(-30),
            End_Date__c = Date.today().addDays(300)
        );
        insert contract;
    }

    @isTest
    static void claimWithinCoverageLimitSavesSuccessfully() {
        Asset asset = [SELECT Id FROM Asset LIMIT 1];

        Test.startTest();
        Warranty_Claim__c claim = new Warranty_Claim__c(
            Asset__c = asset.Id,
            Claim_Amount__c = 400,
            Claim_Status__c = 'Draft'
        );
        insert claim;
        Test.stopTest();

        System.assertNotEquals(null, [SELECT Id FROM Warranty_Claim__c WHERE Id = :claim.Id].Id);
    }

    @isTest
    static void claimOverCoverageLimitIsBlocked() {
        Asset asset = [SELECT Id FROM Asset LIMIT 1];
        Warranty_Claim__c claim = new Warranty_Claim__c(
            Asset__c = asset.Id,
            Claim_Amount__c = 999,
            Claim_Status__c = 'Draft'
        );

        Boolean errorThrown = false;
        try {
            insert claim;
        } catch (DmlException e) {
            errorThrown = true;
            System.assert(e.getMessage().contains('exceeds the active service contract'));
        }
        System.assert(errorThrown, 'Expected a claim over the coverage limit to be blocked.');
    }

    @isTest
    static void bulkInsertOfFiftyClaimsStaysWithinCoverage() {
        Asset asset = [SELECT Id FROM Asset LIMIT 1];
        List<Warranty_Claim__c> claims = new List<Warranty_Claim__c>();
        for (Integer i = 0; i < 50; i++) {
            claims.add(new Warranty_Claim__c(Asset__c = asset.Id, Claim_Amount__c = 100));
        }

        Test.startTest();
        insert claims;
        Test.stopTest();

        System.assertEquals(50, [SELECT COUNT() FROM Warranty_Claim__c]);
    }
}
```

Three things here are deliberate, not optional. `@TestSetup` creates shared test data once for every test method in the class, run in its own transaction. `Test.startTest()` / `Test.stopTest()` resets governor limits for the code inside that block and forces any asynchronous jobs enqueued inside it (like the Queueable from Lesson 9) to run synchronously before `stopTest()` returns, which is how you can assert on an async job's results in a test at all. And the bulk test inserting 50 records at once isn't padding — it's the test that actually exercises the trigger handler under more than one record per transaction, which a single-record test can't do on its own. Keep this number in mind: Lesson 20's performance review comes back to exactly why a bulk test passing at this volume still doesn't prove the handler is safe at every volume.

## Test data must be created in the test

Apex tests run in total isolation from your org's real data by default — no existing Account, Asset, or Service_Contract__c record is visible to a test method unless the test creates it (or is annotated `@isTest(SeeAllData=true)`, which this capstone deliberately avoids, since a test that depends on data existing in whatever org it runs in isn't a real, repeatable test). That's why `@TestSetup` creates its own Account, Asset, and Service_Contract__c from scratch.

## Mocking the callout instead of making it

Because Lesson 9's `afterInsert` enqueues a Queueable that calls the manufacturer's API, testing it for real would require a live network call during every test run — slow, unreliable, and against a real external system you don't control. Apex solves this with `HttpCalloutMock`: a test implementation that returns a canned `HttpResponse` instead of making a real HTTP request, set with `Test.setMock(HttpCalloutMock.class, new WarrantyApiMockSuccess())` before the callout runs. Lesson 14 builds the real callout; this lesson's job is to know that *any* Apex test touching that Queueable will use a mock, never a live call.

## Key terms

| Term | Meaning |
|---|---|
| `@isTest` | Annotation marking a class or method as test-only code, excluded from org code and not counted toward coverage |
| `@TestSetup` | Method that creates shared test data once per test class, in its own transaction |
| `Test.startTest()` / `Test.stopTest()` | Block that resets governor limits and runs enqueued async jobs synchronously before returning |
| `HttpCalloutMock` | Interface for returning a canned response in place of a real HTTP callout during tests |
| 75% org-wide coverage | Salesforce's minimum average Apex code coverage required to deploy to production, with every trigger needing some coverage of its own |

## Lab

Write the three test methods above (or your own equivalents) for `WarrantyClaimTriggerHandler` in your scratch org, run them with `sf apex run test`, and confirm all three pass and that `WarrantyClaimTriggerHandler` and `ServiceContractEvaluator` both show non-zero coverage in the test results.

## Check yourself

- What does Salesforce require for Apex coverage before a production deployment, beyond the 75% org-wide average?
- Why does `Test.stopTest()` matter for testing code that enqueues a Queueable job?
- Why can't a test method rely on an existing Account already in the org?
