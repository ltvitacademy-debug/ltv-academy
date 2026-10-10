# Lesson 9 — Testing With Different Users: System.runAs

**Chapter 2 · Testing Well · Lesson 9 of 18**

## What you'll learn

- Why Apex normally runs in system mode, and what that hides from your tests
- The exact syntax and behavior of `System.runAs`
- What `runAs` does and does not enforce — sharing versus object/field permissions
- The restrictions on `runAs`: test-method-only, nesting, and its DML-count cost

## Apex normally ignores the running user

Outside of a test, Apex code (unless the class is explicitly declared `with sharing` or runs under `WITH USER_MODE` querying) executes in system mode: it ignores the current user's record-level sharing rules and sees every record regardless of who's actually logged in. This is convenient for writing business logic, but it means an ordinary test — which runs as whatever user kicked off the test execution, usually an admin-equivalent user — can never by itself prove that your sharing rules, roles, or profile-based visibility actually work the way you intend. If your Apex code is supposed to respect a specific user's record access, you need a way to actually become that user inside a test.

## System.runAs

`System.runAs(user)` lets a test method execute a block of code as if a specific user were running it, with that user's record sharing applied:

```apex
@isTest
static void salesRepCannotSeeOtherRepsOpportunities() {
    Profile p = [SELECT Id FROM Profile WHERE Name = 'Standard User'];
    User salesRep = new User(
        FirstName = 'Test',
        LastName = 'Rep',
        Email = 'testrep@example.com',
        Username = 'testrep' + DateTime.now().getTime() + '@example.com',
        Alias = 'trep',
        TimeZoneSidKey = 'America/New_York',
        LocaleSidKey = 'en_US',
        EmailEncodingKey = 'UTF-8',
        ProfileId = p.Id,
        LanguageLocaleKey = 'en_US'
    );
    insert salesRep;

    System.runAs(salesRep) {
        List<Opportunity> visible = [SELECT Id FROM Opportunity];
        Assert.areEqual(0, visible.size(), 'A new rep with no shared Opportunities should see none');
    }
}
```

Everything inside the `runAs` block runs with the given user's sharing context applied, and control returns to the original running user once the block ends.

## What runAs enforces — and what it doesn't

This distinction is the single most important thing to get right about `runAs`, and it's a common source of confusion:

- **Record sharing is enforced.** Role hierarchy, sharing rules, manual sharing, and territory-based sharing all apply inside the `runAs` block, exactly as they would for that user logged in normally.
- **Object and field-level permissions are *not* automatically enforced by `runAs` alone.** A user with no "Read" access to a field can still have that field returned by a query inside `runAs`, because `runAs` only switches the sharing context, not permission enforcement. To actually test field-level security or object permissions, you need the class under test to be querying `WITH USER_MODE`, or using `Security.stripInaccessible`, or you need to explicitly check `Schema.sObjectType` permission methods — `runAs` by itself is not a substitute for that.

Getting this backwards — assuming `runAs` proves a user *can't* see a field because they lack permission to it — produces a test that passes for the wrong reason and gives false confidence about data security.

## Restrictions worth knowing

- `runAs` can only be called inside a test method — it has no meaning or effect in non-test code.
- You can nest more than one `runAs` block inside a single test method, switching between several simulated users as the test progresses.
- Creating a user with `runAs` ignores the org's user license limits, so a test can create a user for this purpose even in an org that's otherwise out of spare licenses.
- Each call to `runAs` counts against the test method's total DML statement limit, since creating the user it runs as is itself a DML operation — this rarely matters in practice, but it's not literally free.

## Key terms

| Term | Meaning |
|---|---|
| System mode | The default Apex execution context, which ignores record sharing and runs with elevated visibility |
| `System.runAs(user) { ... }` | A test-only construct that executes a block of code as if the given user were running it, applying that user's sharing |
| Record sharing | Row-level visibility rules (role hierarchy, sharing rules, manual sharing) — what `runAs` actually enforces |
| Object/field-level security | Permissions controlling whether a user can access an object or field at all — not enforced by `runAs` alone |

## Lab

In a Developer Edition or scratch org, create a sharing rule or role hierarchy scenario where a "Standard User" profile rep should only see Opportunities they own. Write a test that creates that user with `System.runAs`, inserts an Opportunity owned by a different user, and asserts the test-created rep cannot query it. Then, separately, demonstrate for yourself (in a comment, or a second assertion) that the same rep can still see a field they have no field-level-security access to, if the query itself doesn't enforce `WITH USER_MODE` — to see firsthand that `runAs` alone did not block that field.

## Check yourself

Can you explain why an ordinary Apex test, without `runAs`, cannot prove that a sharing rule actually restricts the right users? Can you state precisely what `runAs` enforces (sharing) versus what it does not enforce on its own (object/field-level permissions)?
