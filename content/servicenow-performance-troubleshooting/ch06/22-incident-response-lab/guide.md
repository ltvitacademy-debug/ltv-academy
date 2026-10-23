# Lesson 22 — Incident Response Lab

**Chapter 6 · Incident Response for Platform Issues · Lesson 22 of 25**

## What you'll learn

- How to run Lesson 19's full triage sequence against a realistic platform-wide slowdown scenario
- How to decide whether a triaged incident actually needs a ServiceNow Support case, or is self-diagnosable
- How to write a complete, blameless postmortem for the resolved incident, using Lesson 21's four components
- How an unoptimized Business Rule from a deployment becomes a concrete, factual root cause rather than a vague "it was slow"
- How this lab's incident connects directly into the course's own capstone starting next chapter

## The scenario

At 1:50 PM on a Tuesday, the IT service desk starts receiving reports from across multiple
departments — HR, Facilities, IT itself — that "everything in ServiceNow is slow today." Reports keep
coming in steadily for the next 45 minutes. By 2:35 PM, the reports stop; whatever was happening
appears to have resolved on its own. This is the exact kind of ambiguous, high-pressure, platform-wide
complaint Lesson 19 was built for — and it's worth walking through, step by step, exactly how a
disciplined admin handles it.

## Step 1 — Triage: confirm scope

The admin's first move is not to start investigating any one department's complaint — it's to open the
Instance Health Dashboard from Chapter 4. The dashboard shows a clear, unambiguous signal: instance-wide
average response time roughly tripled starting right around 1:50 PM, holding elevated until almost
2:35 PM, then dropping back to baseline. Transaction volume over that same window was flat — not a
busy-Tuesday spike, just ordinary traffic running much slower than normal. That combination (response
time up, volume flat) is exactly the "something degraded" signal Lesson 19 described, not the "we're
just busier" signal. Scope confirmed: this really was instance-wide, not just one loud department.

## Step 2 — Triage: check for a recent deployment

Next, the admin checks the deployment history from Course 11's change-management process. A deployment
went out at 1:47 PM — three minutes before the first reports — including an update to a Business Rule
on the Incident table. That Business Rule, part of a feature shipped as a capstone-adjacent
enhancement, runs a GlideRecord query on every single Incident record update, with no indexed filter
on the query condition. On a table as heavily used as Incident, that one change runs constantly, all
day, for every user touching an incident — which lines up exactly with an instance-wide, not
department-specific, degradation. Timing correlation: strong. Mechanism: plausible and specific. This
is very likely the root cause, not just a coincidence.

## Step 3 — Triage: check resources, and confirm

To rule out a separate, unrelated cause, the admin also checks semaphore and node usage from Chapter 4
for the same window. Semaphore usage was elevated, consistent with transactions running longer than
normal and holding semaphores longer as a result — but there's no sign of a runaway scheduled job or a
separate capacity event. This is consistent with the Business Rule theory, not a competing explanation:
slower transactions naturally hold semaphores longer, which is the downstream effect of the root cause
already identified, not a second, independent problem.

## Step 4 — The support decision

Does this need a ServiceNow Support case? No — and recognizing that is as important as recognizing when
it *would*. This is a customization-caused problem: an unoptimized Business Rule that the customer's
own team wrote and deployed, not a platform or infrastructure issue. It's also fully self-diagnosable
(the triage sequence above found the specific cause) and self-fixable (disable or optimize the rule,
add the missing indexed filter, redeploy). Opening a support case here would send ServiceNow's
engineers to investigate a problem that was never on their side of the line to begin with. Lesson 20's
dividing line — customization versus platform — applies cleanly: this case had already been solved
before a case would even have been opened. A genuine infrastructure-level suspicion (say, if semaphore
and node checks had shown unexplained capacity pressure with no code-level explanation) is exactly the
kind of evidence that *would* justify opening a case — just not this one.

## Step 5 — The fix and the postmortem

The Business Rule is disabled immediately, resolving the slowdown, then corrected with a proper indexed
query filter and redeployed through normal change management. The postmortem that follows uses Lesson
21's four components in full. **Timeline:** deployment at 1:47 PM, first reports at 1:50 PM, root cause
confirmed by 2:20 PM, rule disabled at 2:24 PM, full resolution by 2:35 PM. **Root cause:** an
unoptimized Business Rule on the Incident table running an unindexed GlideRecord query on every update,
consuming semaphore capacity instance-wide. **Resolution:** the rule was disabled, then corrected with
an indexed filter and redeployed. **Prevention:** add a GlideRecord-query performance check to the
pre-deployment ATF suite — specifically, an automated test that flags any Business Rule query without
an indexed filter on a high-volume table — owner named, target date set before the next release window.
Written blamelessly, the postmortem asks what let an unoptimized query reach production undetected
(a gap in pre-deployment testing), not who wrote it — and that question is exactly what the prevention
action answers.

## Key terms

| Term | Meaning |
|---|---|
| Timing correlation | A deployment's timestamp lining up closely with when a slowdown began |
| Self-diagnosable | An incident whose root cause can be found using the customer's own tools, without vendor support |
| Self-fixable | An incident whose fix is within the customer's own control, such as disabling or correcting a rule |
| Downstream effect | A symptom (like elevated semaphore usage) that results from the root cause rather than being a separate cause |
| ATF performance-regression check | An automated test added specifically to catch unindexed or expensive queries before deployment |

## Check yourself

You're ready for Lesson 23 when you can explain, without looking: in this scenario, what two pieces of
evidence together ruled out a ServiceNow Support case, and what single prevention action in the
postmortem is specific enough to actually stop this exact failure from recurring?
