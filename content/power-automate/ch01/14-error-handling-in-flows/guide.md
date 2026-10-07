# Error Handling: Configure Run After and Try/Catch Patterns

Every flow you've built so far assumed the happy path: the SharePoint call succeeds, the email sends, the approval resolves cleanly. Castlebridge Logistics' freight-claim flow updates a Dataverse row as its last step, and that step can fail — a timeout, a throttled connection, a permissions change nobody told you about. This lesson covers the two real tools Power Automate gives you for that moment: **Configure run after**, and the scope-based try/catch pattern built on top of it.

## What you'll learn

- The four Configure run after conditions, and what each one actually means
- How to build an error-notification branch instead of letting a flow just fail silently
- The scope-based try/catch/finally pattern, and why scopes are what makes it possible
- How Castlebridge Logistics wires both together around its Dataverse update step

## Configure run after: four conditions, not one

Every action in a flow has a **Configure run after** setting, opened from its three-dot menu. By default, an action runs only if the previous one **is successful**. Unchecking that default and ticking different boxes changes when the action runs instead: **has failed**, **is skipped**, or **has timed out**. You can tick more than one — ticking both "is successful" and "has failed," for instance, makes an action run regardless of outcome, which is exactly the shape a cleanup or logging step needs.

![Screenshot of the Power Automate designer showing settings to configure a Run after condition that sends an email when the Update a row action fails.](/courses/power-automate/ch01/14-error-handling-in-flows/run-after-settings.png)
*Unchecking "is successful" and checking "has failed" turns this email step into an error branch — it only fires when Update a row breaks.*
Source: [Microsoft Learn — Employ robust error handling](https://learn.microsoft.com/en-us/power-automate/guidance/coding-guidelines/error-handling)

At Castlebridge Logistics, the step right after "Update a row" (writing the claim's final status to Dataverse) is a "Notify ops on failure" email, configured with Run After set to **has failed** and **has timed out**. The happy path never touches it; a broken connection does.

## The scope-based try/catch pattern

A single Run After setting handles one action. Real flows usually need to protect a whole sequence of steps at once, and that's what **scopes** are for. Group your main actions into a scope named "Try." Add a second scope named "Catch," and configure its Run After to trigger when the Try scope **has failed**. Inside Catch, identify the error, log it, and send the notification — the same pattern a developer would recognize from try/catch in any programming language, built here entirely out of scopes and Run After settings.

![Screenshot of the Power Automate designer showing configuring the Catch scope to run when the Try scope fails.](/courses/power-automate/ch01/14-error-handling-in-flows/configure-catch-scope.png)
*The Catch scope's Run After is set to the Try scope's "has failed" outcome — nothing else triggers it.*
Source: [Microsoft Learn — Employ robust error handling](https://learn.microsoft.com/en-us/power-automate/guidance/coding-guidelines/error-handling)

## Finding out what actually failed

Inside a Catch scope, the `result()` function returns the full outcome of every action inside the paired Try scope, including which one failed and why. A Filter array action narrows that down to just the failed action's details, which you can then log or include in the notification email — far more useful than a generic "something broke" message.

## Key terms

- **Configure run after** — the per-action setting that decides when it runs, based on the previous action's outcome
- **Is successful / Has failed / Is skipped / Has timed out** — the four conditions available on every Run After setting
- **Scope** — a container that groups actions so Run After can be configured once for the whole group
- **Try/Catch pattern** — a Try scope for the main work, paired with a Catch scope whose Run After triggers on failure
- **result()** — the expression function that returns every action's outcome from inside a scope, for logging the real error
