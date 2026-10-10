# Lesson 17 — Test Practice Lab

**Chapter 3 · Test Strategy · Lesson 17 of 18**

## What you'll learn

- How to assemble everything from Chapters 1 and 2 into one complete, realistic test class
- A worked scenario that requires a factory, `@TestSetup`, positive and negative tests, bulk testing, and a mock callout all together
- A self-review checklist to run against your own test class before considering it finished
- Where real test suites tend to still fall short even after covering every individual technique

## The scenario

You're testing `OpportunityCloseService`, a class with one public method:

```apex
public class OpportunityCloseService {
    public static void closeAsWon(List<Id> opportunityIds) {
        List<Opportunity> opps = [SELECT Id, Amount, StageName FROM Opportunity WHERE Id IN :opportunityIds];
        for (Opportunity opp : opps) {
            if (opp.Amount == null || opp.Amount <= 0) {
                opp.addError('Amount must be greater than zero to close as Won');
            } else {
                opp.StageName = 'Closed Won';
                opp.CloseDate = Date.today();
            }
        }
        update opps;

        HttpRequest req = new HttpRequest();
        req.setEndpoint('https://api.example.com/notify-won');
        req.setMethod('POST');
        req.setBody(JSON.serialize(new Map<String, Object>{ 'count' => opps.size() }));
        new Http().send(req);
    }
}
```

This one method deliberately needs every technique from the last two chapters: it queries and bulk-updates a list of records, enforces a business rule with `addError()`, and makes an outbound callout to notify an external system — all in one transaction.

## Building the test class, piece by piece

Start with a factory method and `@TestSetup` for the shared baseline data (Lessons 3 and 6):

```apex
@isTest
private class OpportunityCloseServiceTest {

    @TestSetup
    static void makeData() {
        insert new List<Opportunity>{
            new Opportunity(Name = 'Valid Deal', StageName = 'Prospecting', Amount = 500, CloseDate = Date.today().addDays(10)),
            new Opportunity(Name = 'Zero Deal', StageName = 'Prospecting', Amount = 0, CloseDate = Date.today().addDays(10))
        };
    }
```

Add the positive test, with a mock so the callout doesn't attempt a real network call (Lessons 7 and 10):

```apex
    @isTest
    static void closesValidOpportunityAndNotifiesExternalSystem() {
        Test.setMock(HttpCalloutMock.class, new NotifyWonMock());
        Opportunity valid = [SELECT Id FROM Opportunity WHERE Name = 'Valid Deal'];

        Test.startTest();
        OpportunityCloseService.closeAsWon(new List<Id>{ valid.Id });
        Test.stopTest();

        Opportunity result = [SELECT StageName, CloseDate FROM Opportunity WHERE Id = :valid.Id];
        Assert.areEqual('Closed Won', result.StageName);
        Assert.areEqual(Date.today(), result.CloseDate);
    }
```

Add the negative test for the business rule (Lessons 7 and 12):

```apex
    @isTest
    static void zeroAmountOpportunityIsBlockedWithAddError() {
        Test.setMock(HttpCalloutMock.class, new NotifyWonMock());
        Opportunity zero = [SELECT Id FROM Opportunity WHERE Name = 'Zero Deal'];

        try {
            OpportunityCloseService.closeAsWon(new List<Id>{ zero.Id });
            Assert.fail('Expected a zero-Amount Opportunity to be blocked by addError');
        } catch (DmlException e) {
            Assert.isTrue(e.getMessage().contains('Amount must be greater than zero'));
        }
    }
```

Add the bulk test proving the whole batch is handled in one pass (Lesson 8):

```apex
    @isTest
    static void processesTwoHundredOpportunitiesInOneTransaction() {
        List<Opportunity> opps = new List<Opportunity>();
        for (Integer i = 0; i < 200; i++) {
            opps.add(new Opportunity(Name = 'Bulk ' + i, StageName = 'Prospecting', Amount = 100, CloseDate = Date.today()));
        }
        insert opps;
        List<Id> oppIds = new List<Id>(new Map<Id, Opportunity>(opps).keySet());

        Test.setMock(HttpCalloutMock.class, new NotifyWonMock());
        Test.startTest();
        OpportunityCloseService.closeAsWon(oppIds);
        Test.stopTest();

        Integer closedCount = [SELECT COUNT() FROM Opportunity WHERE StageName = 'Closed Won' AND Name LIKE 'Bulk%'];
        Assert.areEqual(200, closedCount);
    }

    public class NotifyWonMock implements HttpCalloutMock {
        public HttpResponse respond(HttpRequest req) {
            HttpResponse res = new HttpResponse();
            res.setStatusCode(200);
            res.setBody('{"ok":true}');
            return res;
        }
    }
}
```

## Self-review checklist

Before considering any test class finished, run it against this list: Does every test method have a real assertion tied to a specific expected value (Lesson 4)? Is there at least one negative test for every business rule (Lesson 7)? Is there a bulk test at a realistic record count, not just 1 (Lesson 8)? Are any callouts mocked, never real (Lesson 10)? Are there zero hardcoded Ids anywhere (Lesson 14)? Does the org-wide coverage and per-trigger coverage both hold after adding this class (Lessons 5 and 16)?

## Key terms

| Term | Meaning |
|---|---|
| Integration of techniques | Combining factories, `@TestSetup`, positive/negative tests, bulk tests, and mocks in one realistic test class |
| Self-review checklist | A fixed list of questions run against a finished test class before considering it done |

## Lab

Build the `OpportunityCloseServiceTest` class above yourself in a Developer Edition or scratch org (adjust the `Opportunity.addError` validation to whatever mechanism fits your org if `Amount` isn't directly addErrorable the way shown). Run the full class and confirm all four test methods pass. Then run your own self-review checklist against it and fix anything it doesn't fully satisfy.

## Check yourself

Can you identify, in the `OpportunityCloseService` example, every distinct testing technique from Chapters 1 and 2 that this one method requires to be fully proven? Can you walk through your own self-review checklist from memory, without looking back at this lesson?
