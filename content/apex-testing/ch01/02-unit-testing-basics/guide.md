# Lesson 2 — Unit Testing Basics

**Chapter 1 · Writing Apex Tests · Lesson 2 of 18**

## What you'll learn

- The anatomy of an `@isTest` class and an `@isTest` method, line by line
- The Arrange / Act / Assert structure and why it keeps tests readable
- Naming conventions that make a failing test tell you what broke without opening the code
- Why each test method should be independent of every other test method in the class

## Anatomy of a test class

An Apex test class is a normal class with `@isTest` on the class declaration (Salesforce convention also marks it `private`, since nothing outside the test framework needs to call it directly). Inside it, each test method is a `static` method with no return type, annotated `@isTest`:

```apex
@isTest
private class OpportunityServiceTest {

    @isTest
    static void closingAnOpportunitySetsCloseDate() {
        // test body
    }

    @isTest
    static void closingAlreadyClosedOpportunityThrows() {
        // test body
    }
}
```

Nothing stops you from putting multiple unrelated tests in one file, but convention on Salesforce (and in this course) is one test class per class under test, named `<ClassName>Test`, with one test method per behavior you're proving.

## Arrange, Act, Assert

Every well-written unit test follows the same three-part shape, whether it's Apex, Java, or JavaScript:

1. **Arrange** — build the data and objects the test needs: insert records, construct inputs, set up any mocks.
2. **Act** — call the single method or operation you're actually testing.
3. **Assert** — check that the result matches what you expected.

```apex
@isTest
static void closingAnOpportunitySetsCloseDate() {
    // Arrange
    Opportunity opp = new Opportunity(
        Name = 'Test Deal',
        StageName = 'Prospecting',
        CloseDate = Date.today().addDays(30)
    );
    insert opp;

    // Act
    OpportunityService.closeAsWon(opp.Id);

    // Assert
    Opportunity result = [SELECT StageName, CloseDate FROM Opportunity WHERE Id = :opp.Id];
    System.assertEquals('Closed Won', result.StageName);
    System.assertEquals(Date.today(), result.CloseDate);
}
```

Keeping these three sections visually separate — even with just a comment or blank line — makes a test easy to read six months later, and makes it obvious which part broke when the test fails.

## One behavior per test method

A common mistake moving from manual testing to automated unit testing is cramming many scenarios into one giant test method: insert some records, call the method, assert something, call it again with different data, assert again. Resist this. Each test method should prove exactly one behavior. `closingAnOpportunitySetsCloseDate` and `closingAlreadyClosedOpportunityThrows` are two separate methods precisely because they're two separate claims about how the code behaves — and when one of them fails, the method name alone tells you which claim broke, without reading a single line of the test body.

This also keeps tests independent of each other. Each `@isTest` method runs with its own fresh transaction and its own rolled-back data at the end, so test methods should never depend on data or side effects left behind by another test method in the same class — and they never need to, if each one arranges its own data in its own Arrange step (or shares common setup through `@TestSetup`, covered in Lesson 6).

## Naming that reads like a sentence

A test method name should describe the behavior being proven, not the mechanics of how it's proven. `testMethod1` tells you nothing when it fails in a CI log; `closingAlreadyClosedOpportunityThrows` tells you exactly what assumption broke. A useful pattern is `<scenario><expectedOutcome>` — `closingAnOpportunitySetsCloseDate`, `insertingDuplicateEmailThrowsValidationError`, `blankIndustryDefaultsToOther`. Anyone reading just the list of method names in a test class should come away understanding most of what the class under test is supposed to do.

## Key terms

| Term | Meaning |
|---|---|
| Unit test | A test that exercises one small, specific piece of behavior in isolation |
| Arrange / Act / Assert | The three-part structure of a well-written test: set up data, perform the action, check the result |
| Test independence | The property that one test method's outcome never depends on another test method having run first |
| `@isTest` method | A static, no-argument, no-return-value method annotated `@isTest` that Apex runs as one isolated test |

## Lab

Pick any Apex class in your org with at least one public method. Write a test class named `<ClassName>Test` with two test methods: one proving the "normal" successful path, and one proving a different, distinct behavior (an edge case, a different input, or an error condition). Name both methods so that someone reading only the method names — not the bodies — could describe what each one proves. Run them in the Developer Console's test runner and confirm both pass.

## Check yourself

Can you describe, in your own words, what belongs in the Arrange, Act, and Assert sections of a test method? Can you explain why cramming several unrelated scenarios into one `@isTest` method makes a failing test harder to diagnose than splitting them into separate methods?
