# Lesson 17 — Diagnosing a Stuck or Failing Flow

**Chapter 5 · Troubleshooting Integrations & Flows in Production · Lesson 17 of 25**

## What you'll learn

- A one-line recap of the Flow Execution Log from course 4 and what it actually shows
- The real production distinction: a flow that has genuinely failed vs. one that's correctly paused
- Why that distinction matters so much when a stakeholder is worried and wants an answer now
- The two most common real causes of a genuinely stuck or failing flow in production
- How to read the execution record to tell these apart quickly, without guessing

## Recap: what the Flow Execution Log actually shows

Course 4 covered the Flow Execution Log in detail — the execution record ServiceNow creates for each run of a flow, and the run history that lets you open any past execution and see exactly what each step did, including the resolved values a data pill actually held at that moment. That lesson taught you to read the log. This lesson is about what you're reading it *for* when a flow in production is reported as a problem.

## "Stuck" means two very different things

When a stakeholder says a flow is "stuck," they mean one thing: nothing visible has happened for a while, and they're worried. But a flow sitting idle for an hour can mean either of two very different real states, and the correct response to each is completely different.

The first is a flow that is **genuinely failed** — an actual error occurred in one of its steps, execution stopped there, and nothing further will happen until a person intervenes. The second is a flow that is **correctly paused**, most often sitting at an Approval step, legitimately waiting for someone to approve or reject a request that simply hasn't been actioned yet. To the flow itself, and to anyone glancing at a "not yet complete" status, these can look identical. To the person who has to respond, they demand opposite actions: a failed flow needs a troubleshooter; a paused-on-approval flow needs someone to go find the approver, not a bug fix.

## Telling them apart in the execution log

The Flow Execution Log resolves this in seconds, if you know where to look. Open the specific execution record and check its current step and status. A flow waiting on approval shows the Approval step itself as the current, active step, with a status like "Requested" or "Pending" — nothing below it has an error, because nothing below it has run yet; it's simply waiting. A genuinely failed flow shows a specific step with an actual error status, and a recorded error message explaining what went wrong at that exact step. The presence or absence of that error message, on the step the flow is currently sitting at, is the entire distinction. Don't infer failure from "it's been a while" — infer it from an actual error status on an actual step.

## Real causes of a genuinely failed flow in production

Once the log confirms a real failure rather than a legitimate pause, two causes show up constantly in production, and both point outside the flow's own logic:

- **An expired or invalid Connection & Credential Alias.** IntegrationHub actions reference a Connection & Credential Alias (course 7) rather than hardcoding credentials, which is exactly why this fails cleanly and visibly in the log: the action's step shows an authentication error, and the fix is refreshing or reassigning the alias's credential, not rewriting the flow.
- **The external system being temporarily unreachable.** An IntegrationHub action calling out to a REST endpoint fails the same way a direct integration would if that system is down — a connection timeout or an error response recorded on that specific action step. The flow isn't broken; what it's calling is unavailable.

Both show up as "the flow failed," and both are diagnosed the same way: open the step that actually has the error, read what it says, and resist the urge to assume the flow's own configuration is wrong before checking that.

## Key terms

| Term | Meaning |
|---|---|
| Execution record | The record created for one specific run of a flow — course 4's unit of investigation |
| Genuinely failed | An actual error occurred at a specific step; execution has stopped and needs intervention |
| Correctly paused | The flow is legitimately waiting — most often on an unactioned Approval step — not broken |
| Connection & Credential Alias | The named credential reference an IntegrationHub action uses; expiring or invalidating it fails the action cleanly |

## Check yourself

A flow has shown "not complete" for three hours. Before telling anyone it's broken, what's the one thing in the Flow Execution Log you check first, and what two different answers could it give you?
