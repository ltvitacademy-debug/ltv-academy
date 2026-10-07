# Error Handling and Run After

Every action in a flow can succeed, fail, time out, or get skipped — and by default, a single failure anywhere stops the entire flow. **Run After** is the setting that controls what happens next for every action, and it's the mechanism behind every error-handling pattern in Power Automate, including the scope-based try/catch pattern you'll use constantly once your flows are calling AI services that can legitimately fail: rate limits, timeouts, malformed responses.

## What you'll learn

- What Run After actually configures, and why it's the foundation of all error handling here
- How to build a try/catch pattern using Scopes
- When and why to use the Terminate action
- Why this matters more once a flow is calling an external model, not less

## Run After: the setting behind every outcome

Every action has a **Run After** setting (under its Settings tab) that lists the action immediately before it, with four checkboxes: **is successful**, **has timed out**, **is skipped**, and **has failed**. By default, a new action is configured to run only when the previous one **is successful** — which is exactly why one failure normally halts the whole flow. Check **has failed** instead (or in addition), and that action becomes your error path: it only runs when the thing before it didn't work.

![Screenshot of the Run After settings for a Send an email action in the Power Automate designer, configured to run when the previous action has failed](/courses/power-automate-ai-agents/ch01/06-error-handling-and-run-after/run-after-settings.png)
*Run After, configured so this email only sends when the step before it failed — the simplest error-notification pattern there is.*

## The try/catch pattern, with Scopes

Checking individual boxes on individual actions works for a two-step flow, but a real flow has many steps, and you don't want to wire up failure handling action by action. The standard pattern groups your main logic into one **Scope** (conventionally named "Try") and puts your error-handling logic into a second **Scope** ("Catch"), configuring the Catch scope's Run After to fire when the Try scope **has failed**. Because a Scope's own success or failure reflects whether *any* action inside it failed, this gives you one clean failure path for an arbitrarily large block of logic — exactly the shape of a try/catch block in any language you've used.

![Screenshot of a Catch scope's Run After settings configured to run when a Try scope has failed, in the Power Automate designer](/courses/power-automate-ai-agents/ch01/06-error-handling-and-run-after/configure-catch-scope.png)
*A Catch scope wired to run when Try has failed — one error path covering everything grouped inside Try.*

For Castlebridge Logistics, this is exactly the shape of a flow that calls an AI classification API: the HTTP call, the Parse JSON, and the downstream write-to-database action all live inside Try. If the API rate-limits the call or returns malformed JSON, Catch fires once, logs what happened, and notifies someone — instead of the flow silently dying with no record of why.

## Terminate: stopping on purpose

Sometimes the right response to an error isn't to keep running a degraded flow — it's to stop outright and make sure that failure is visible. The **Terminate** action does exactly that: it ends the flow immediately and sets a status (Succeeded, Failed, or Cancelled) along with an optional message, which shows up clearly in run history instead of a flow that technically "completed" while having quietly done nothing useful.

![Screenshot of the Terminate action's settings in the Power Automate designer, with Status and Message fields configured](/courses/power-automate-ai-agents/ch01/06-error-handling-and-run-after/terminate-flow.png)
*Terminate — stop the flow and set a clear status and message, so a silent failure can't masquerade as a successful run.*

Use Terminate inside a Catch scope after a critical failure, once you've logged what you need: it's the explicit, intentional version of letting a flow die by accident.

## Why this matters more for AI flows

A flow that calls SharePoint or Outlook is calling a service with years of stability behind it. A flow that calls a model endpoint is calling something that can legitimately return a 429 rate limit, time out on a long generation, or hand back JSON that doesn't match your schema — none of which are bugs, just the normal operating conditions of working with AI services. Run After, Scopes, and Terminate aren't an advanced topic to learn later; they're baseline hygiene for any flow in Chapters 2 and 3, and the earlier this pattern becomes automatic, the fewer silently-broken flows you'll ship.

## Key terms

- **Run After** — the per-action setting controlling whether it runs based on the previous action's outcome (successful, timed out, skipped, failed)
- **Scope** — a container action that groups other actions; its own success/failure reflects whether anything inside it failed
- **Try/Catch pattern** — two Scopes, with Catch's Run After set to fire when Try has failed
- **Terminate** — an action that ends a flow immediately with an explicit status and message
