# Lesson 5 — Testing Environments

**Chapter 1 · Environments · Lesson 5 of 14**

## What you'll learn

- What a testing environment needs that a development environment deliberately doesn't
- The difference between unit testing, integration testing, and user acceptance testing, and where each happens
- Why Partial Copy sandboxes are the usual fit for this tier
- Who should be testing here, and why it shouldn't only be the person who built the change
- How a failed test at this tier should flow back to development

## What changes between development and testing

Lesson 2 established that development environments optimize for speed and isolation, with no real data required. A **testing environment** exists for a different purpose: to check, in conditions closer to production than development ever was, that a change actually does what it's supposed to do — and that it doesn't break anything that already worked. That second half matters as much as the first. A new Flow might work perfectly for the scenario its author tested, and still break an existing automation that fires on the same object.

This shift in purpose drives a shift in what the environment needs: testing has to happen against data that's realistic enough to surface real bugs (a report that times out against 50,000 records won't time out against 50 sample rows), and it has to happen where more than one kind of check can run without interfering with ongoing development work.

## Three kinds of testing, roughly

Real Salesforce testing practice usually layers a few different kinds of checks, often across more than one environment:

- **Unit testing** checks a single piece of logic in isolation — a specific Apex class's method, or one Flow's decision logic — often starting as early as the development tier itself, since Salesforce requires Apex unit tests to deploy to production anyway.
- **Integration testing** checks that pieces which depend on each other still work together once combined — a Flow that calls an Apex action, an Apex trigger that calls an external API, a Lightning component that reads data another process wrote. This is the core work of the testing tier.
- **User acceptance testing (UAT)** checks that the finished change actually satisfies what the business asked for, performed by people who aren't the developers — often sales or service staff clicking through their real day-to-day processes. UAT sometimes happens at this tier and sometimes gets pushed to Staging (Lesson 6), depending on how formal an org's release process is.

## Why Partial Copy fits this tier

A Partial Copy sandbox (Lesson 3) is the usual home for integration testing and UAT, because it offers something a Developer sandbox can't: a realistic sample of actual production data, defined by a sandbox template, without the full cost and refresh time of a Full sandbox. That's normally enough to catch the bugs that only show up against real data shapes — a picklist value that exists in production but was never added to a dev org's test data, a lookup relationship with more child records than any hand-built test scenario anticipated — without needing a complete production replica.

Smaller orgs sometimes skip a dedicated Partial Copy tier and do this testing in a Developer Pro sandbox with hand-built test data instead. That's a reasonable trade-off for a smaller team, but it reintroduces the exact risk Partial Copy exists to reduce: hand-built test data reflects what the tester expects to see, not necessarily what production actually contains.

## Who should test, and why not just the builder

A recurring architecture principle shows up here: **the person who built a change shouldn't be the only person who tests it.** A developer testing their own Flow is checking whether it does what they *intended* — which tells you almost nothing about whether they intended the right thing, or whether it breaks something elsewhere in the org they didn't think to check. Independent testing, by someone other than the builder (a QA specialist, another admin, or an end user doing UAT), is what actually catches the gap between "works as the builder expected" and "works as the business needs."

## Failed tests flow backward, not forward

A change that fails testing doesn't get pushed forward to Staging "to see if it's really a problem" — it goes back to Development for a fix, and the fixed version re-enters the testing tier from scratch. This is the promotion path's whole point: nothing advances past a stage it hasn't actually passed.

## Key terms

| Term | Meaning |
|---|---|
| Testing environment | The tier where a change is checked against realistic data and for its effect on existing functionality |
| Unit testing | Checking a single piece of logic (one class, one Flow) in isolation |
| Integration testing | Checking that interdependent pieces still work correctly once combined |
| User acceptance testing (UAT) | Business users confirming a change meets the actual requirement, performed by non-developers |

## Lab

A Flow that updates Opportunity stage automatically passes every test its developer ran, using five hand-built test Opportunities. Once promoted to a Partial Copy testing sandbox with a realistic sample of real Opportunity records, it starts throwing errors on about 2% of records. Explain, using what this lesson covered, why this gap between "passed development testing" and "fails in the testing tier" is exactly the scenario a Partial Copy environment and independent testing both exist to catch — and why the fix belongs back in Development, not a patch applied directly in the testing sandbox.

## Check yourself

Can you name and briefly describe the three kinds of testing this lesson covers, and say which one is most tied to this specific tier? Can you explain why independent testing (not by the original builder) catches a different class of bug than the builder's own testing does?
