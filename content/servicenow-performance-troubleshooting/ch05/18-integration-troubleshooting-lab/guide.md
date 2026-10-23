# Lesson 18 — Integration Troubleshooting Lab

**Chapter 5 · Troubleshooting Integrations & Flows in Production · Lesson 18 of 25**

## What you'll learn

- How to walk a real production incident end to end, using Lessons 16 and 17 together
- Why the first move is always the Flow Execution Log, before anything else
- How to follow a genuine failure down to a specific step and a specific status code
- How to tell an internal fix (a credential) apart from an external one (a vendor outage) using the same evidence
- How to communicate a root cause that includes something outside your own team's control

## The scenario

It's 9:40 a.m. The warehouse operations lead messages the ServiceNow team: "The inventory sync flow is stuck again. Orders are backing up because stock levels aren't updating." The flow in question runs whenever a sales order is created — it calls an external inventory management system via an IntegrationHub action to reserve stock, then updates the order record with the result. Nothing has changed in the flow's configuration recently. The message says "stuck," which, per Lesson 17, could mean two very different things. The investigation starts exactly where it should: not by opening the flow's logic, but by opening its most recent execution record.

## Step 1 — Check the Flow Execution Log first

Open the flow's run history and find the execution tied to the order in question. The current step is not the Approval step this flow doesn't even have — it's the "Reserve Stock (REST)" action step, and its status reads **Error**, not Requested or Pending. That single fact answers the first question from Lesson 17 immediately: this is not a flow correctly paused on an unactioned approval. It has genuinely failed, at a specific, identifiable step. That rules out "wait for someone to click approve" as the fix and justifies treating this as a real investigation.

## Step 2 — Read the error on that step

The execution record's error message on the REST step reads: `HTTP 503 Service Unavailable — upstream connect error or disconnect/reset before headers`. That's already informative on its own, but Lesson 16's checkpoint-logging pattern gives a second, independent confirmation. The integration's own structured log — the same `gs.error()` checkpoint pattern from course 7 — has an entry at the "after response" checkpoint for this transaction, recording the same transaction ID, the same 503 status, and a timestamp matching the failed execution almost exactly. Two independent sources agreeing on a 503 is far stronger evidence than either alone.

## Step 3 — Apply the bug-vs-external fork

This is the moment Lesson 16's diagnostic fork earns its keep. A 503 is not a 401 (which would point at the Connection & Credential Alias) and not a 429 (which would point at call volume). A 503 — "Service Unavailable" — is the signature of an outage: the external inventory system itself, or something directly in front of it, is not responding normally. Checking the Script Performance Profiler on this transaction confirms it: almost no time was spent in the flow's own action configuration before the call went out, and the response came back fast with the 503 rather than timing out slowly, which is consistent with the external system actively rejecting connections rather than the flow being slow to build the request. Nothing in the evidence points at the flow's logic, the credential, or ServiceNow's own performance.

## Step 4 — Confirm and communicate, don't "fix" what isn't broken

Checking the inventory vendor's own public status page confirms a listed incident affecting their API, starting nineteen minutes before the first failed execution. That closes the loop: this is an external cause, not a ServiceNow bug, and not a credential problem. The correct response is not to edit the flow or the integration script — there's nothing wrong in either. The correct response is to communicate clearly and specifically to the warehouse operations lead: the inventory sync flow has failed at the stock-reservation step because the external inventory system is currently experiencing an outage (confirmed on its own status page), the ServiceNow platform and this flow are functioning correctly, and orders will resume updating automatically once the vendor's system recovers — with retry/backoff from course 7 already set up to pick runs back up without manual replay for most of them.

## Why this order of operations mattered

Had the team started by editing the flow or the transform script — the instinctive reaction to "it's broken" — they'd have spent real time changing working logic while the actual cause sat entirely outside their instance, unaffected by any of it. Checking the execution log first (failed, not paused), then the specific error and status code (503, not 401 or 429), then corroborating with an independent source (the vendor's status page) is what turned a vague "it's stuck" into an accurate, fast, three-sentence explanation of what's actually happening and who needs to fix it.

## Key terms

| Term | Meaning |
|---|---|
| Execution record status | The first check — confirms a genuine failure (Error) versus a legitimate pause (Requested/Pending) |
| HTTP 503 | "Service Unavailable" — the external system itself (or something in front of it) is rejecting or dropping connections |
| Independent corroboration | Confirming the same root cause from two separate sources (the flow's execution log and the integration's own structured log) before concluding |
| Vendor status page | An external, independently maintained source that can confirm an outage is real and not specific to your instance |

## Check yourself

Walk through the four-step order used in this lab, out loud, from a cold "the flow is stuck" message to the final root-cause explanation — without skipping the Flow Execution Log check first.
