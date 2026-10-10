# Lesson 11 — Environment Access and Security

**Chapter 2 · Managing Environments · Lesson 11 of 14**

## What you'll learn

- Why access to a sandbox should be designed deliberately, not inherited casually from production
- Sandbox-specific access controls, including scoping access to a defined group of users
- Why the same user might need very different access in a sandbox than in production
- How access review applies to non-production environments, not just production
- How this connects the chapter's data-risk lessons to a concrete control

## Access isn't automatically the same as production's

A natural but mistaken assumption is that whoever has access to a given piece of functionality or data in production should automatically get the same access in every sandbox copied from it. Environment access deserves its own, deliberate design, for reasons that run in both directions:

- Someone might need **broader** sandbox access than their production access would suggest — a contractor doing short-term configuration work needs to log into a Developer sandbox to build and test, without ever needing (or being approved for) access to production at all.
- Someone might need **narrower** sandbox access than their production access would suggest — a sales rep who can see customer records in production has no legitimate reason to need access to a Full sandbox carrying the same real customer data, even though they're a normal, trusted production user.

Treating sandbox access as "whatever production already grants, copied over" misses both of these cases, and specifically creates the kind of unreviewed access sprawl Lesson 9 described.

## Scoping sandbox access deliberately

Salesforce supports scoping who can log into a sandbox once it's created to a specific, defined group of users, rather than leaving it open to every active user in the org by default. This single control directly shrinks the exposure Lesson 9 described: a Full sandbox holding real customer data is a much smaller risk once only the handful of people who actually need it for a specific project can log in, instead of the org's entire user base.

The design principle underneath this is the same **least privilege** principle that governs production access everywhere else in Salesforce architecture: access should be scoped to what a specific, current need actually requires, not granted broadly "in case it's useful," and specifically not granted automatically just because someone already holds similar access in production.

## Access review applies to non-production, too

Lesson 9's contractor example — someone whose login to a Partial Copy sandbox stayed active for months after their actual project ended — is an access review failure, and access review is a discipline organizations reliably apply to production while often neglecting entirely for sandboxes. The same questions a production access review asks apply here: does this person still have a current, legitimate reason to access this environment, and if their need was time-boxed (a single project, a specific migration), has that window actually closed? A sandbox access list that's never reviewed only ever grows, which is exactly how low-rigor sandbox access and real sandbox data (Lesson 9) end up compounding each other in practice.

## Bringing the chapter together

This lesson is where the chapter's two separate threads actually meet: Lesson 9 described the risk (real data, often with looser controls), Lesson 10 described one way to shrink the data side of that risk (masking), and this lesson describes the other side — shrinking who can actually reach that data in the first place. A mature environment strategy applies both: masked data where realistic data isn't strictly required, and a tightly scoped, periodically reviewed access list regardless of whether the data is masked, since defense that depends on only one control is more fragile than defense that layers two.

## Key terms

| Term | Meaning |
|---|---|
| Sandbox access scoping | Restricting who can log into a specific sandbox to a defined group, rather than every active user |
| Least privilege (environment context) | Granting access based on a specific, current need, not copied automatically from a different environment |
| Access review (non-production) | Periodically confirming sandbox access is still needed, the same discipline normally applied to production |

## Lab

An org's Full sandbox, used for staging, currently grants login access to "All Active Users" by default, inherited from how the sandbox was first created two years ago. Using this lesson's least-privilege principle, design a revised access policy for this sandbox: who should actually have access, how you'd determine that list, and what recurring check you'd put in place so the list doesn't drift back to "everyone" over time.

## Check yourself

Can you explain why copying production's access list directly into a sandbox is the wrong default, with one example of someone needing broader sandbox access and one example of someone needing narrower sandbox access than production would suggest? Can you describe what a periodic sandbox access review should actually check, and why it matters just as much here as it does for production?
