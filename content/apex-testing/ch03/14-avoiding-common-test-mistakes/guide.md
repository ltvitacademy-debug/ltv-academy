# Lesson 14 — Avoiding Common Test Mistakes

**Chapter 3 · Test Strategy · Lesson 14 of 18**

## What you'll learn

- The most common ways Apex tests end up passing without actually proving anything
- Why hardcoded Ids are a recurring, org-breaking mistake
- The risk of over-relying on `@isTest(SeeAllData=true)`
- Why tests with no assertions, or only trivially true ones, slip through code review

## Hardcoded record Ids

The single most notorious Apex test mistake is hardcoding a record Id directly in test code:

```apex
// Never do this
Account acc = [SELECT Id FROM Account WHERE Id = '001xx000003DGb2AAG'];
```

This works, once, in the specific org where that Id happens to exist — and fails immediately in every other org: a different sandbox, a scratch org, a fresh Developer Edition org, or even the same org after that specific record gets deleted. Salesforce Ids are not portable across orgs, so a hardcoded Id is really a hardcoded dependency on one specific org's exact data at one specific moment in time. The fix is always the same: create the record the test needs inside the test itself (directly, through `@TestSetup`, or through a factory), and capture the Id from that insert — never assume a specific Id, or even a specific *record*, already exists.

## Over-relying on SeeAllData=true

Lesson 3 covered why `@isTest(SeeAllData=true)` is discouraged for everyday use: it opts a test out of the default data isolation that makes tests portable and repeatable, and (per Lesson 6) it's incompatible with `@TestSetup`. A test suite that leans on `SeeAllData=true` broadly, rather than reserving it for the rare case that genuinely needs it, tends to accumulate exactly the hardcoded-Id problem above in a less obvious form — assumptions baked in about what data already exists in whichever org the tests happen to run against, which quietly stop holding the moment that org's data changes.

## Assertion-free or trivially-true tests

Covered from a different angle in Lesson 4: a test with zero assertions, or an assertion that's structurally guaranteed to pass regardless of what the code under test actually does, inflates a green test-run count without proving anything:

```apex
// Passes no matter what AccountService.process() actually does
@isTest
static void processRuns() {
    AccountService.process(new List<Id>{ acc.Id });
    System.assert(true); // always true — proves nothing
}
```

This pattern is easy to miss in code review precisely because the test "exists" and "passes" — it takes actually reading the assertion to notice it can never fail. When reviewing a test class, check not just that assertions exist, but that each one is actually tied to something the method under test could plausibly get wrong.

## Testing against hardcoded org-specific values

A close cousin of the hardcoded-Id problem: assuming a picklist's exact set of values, a specific user's existence, or a specific record count already present in the org, rather than something the test itself set up or explicitly verified first:

```apex
// Fragile — assumes this exact picklist value exists in every org
Opportunity opp = new Opportunity(StageName = 'Qualification', ...);
```

If a different org's sales process doesn't include a "Qualification" stage, this test fails for a reason that has nothing to do with whether the code under test is correct. Where practical, query the actual picklist metadata the test needs (or accept that some org-specific business configuration is a reasonable thing to also directly verify, rather than silently assume).

## Mistaking "it compiles and runs" for "it's correct"

A test class that compiles, executes without an unhandled exception, and reports as "passed" in the test runner has cleared a very low bar. None of that proves the assertions inside it are actually checking the right thing, or that the test covers the scenario it's named after. The antidote covered throughout this course — Arrange/Act/Assert structure (Lesson 2), real assertions tied to specific expected values (Lesson 4), both positive and negative paths (Lesson 7), and bulk-safety proof for triggers (Lesson 8) — is what separates a test that merely runs from a test that actually proves something.

## Key terms

| Term | Meaning |
|---|---|
| Hardcoded Id | A literal record Id written directly into test code; breaks in any org where that exact record doesn't exist |
| Assertion-free test | A test method containing no assertion, or one that's structurally guaranteed to pass, proving nothing |
| Org-specific assumption | Test code that assumes a specific picklist value, user, or record exists without creating or verifying it |

## Lab

Audit an existing test class in your org (or one you've written in an earlier lesson) against this lesson's checklist: any hardcoded Ids, any unnecessary `SeeAllData=true`, any assertion-free test methods, any assumed picklist values or org-specific data. Fix at least two issues you find, or — if the class is already clean — write a short note explaining specifically why each check passes (e.g. "all Ids come from inserts performed in this test method").

## Check yourself

Can you explain why a hardcoded record Id in a test is guaranteed to eventually fail, even if it currently passes? Can you describe what makes `System.assert(true)` or an assertion-free test method dangerous specifically because it's easy to miss in code review?
