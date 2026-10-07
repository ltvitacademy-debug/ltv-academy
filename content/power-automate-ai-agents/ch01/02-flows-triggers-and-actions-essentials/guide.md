# Flows, Triggers and Actions: The Essentials

Every Power Automate flow is built from exactly two kinds of building blocks: one trigger and any number of actions. If you've worked with webhooks, event listeners, or serverless function bindings, this will feel familiar fast — a trigger is the event binding, and actions are the handler body, except the handler body is assembled visually instead of written as code. This lesson gets you oriented in the designer so later lessons can move quickly.

## What you'll learn

- The trigger/action model, mapped to concepts you already know from APIs and event-driven code
- What the flow designer canvas actually shows you, and where to find the pieces that matter
- How to add an action and understand the four categories it's organized into
- What "saving" and "testing" a flow actually do under the hood

## The trigger/action model

A flow is a directed sequence: one **trigger** starts it, then one or more **actions** run in order. That's the entire mental model — there's no hidden global state and no separate "handler registration" step. The trigger defines the event your flow reacts to (a new email arrives, an HTTP request comes in, a schedule fires, a row is added to a table), and the output of that trigger — its full JSON payload — becomes available to every action downstream, the same way the payload of a webhook call would be available inside your handler function.

Castlebridge Logistics' IT team uses this pattern constantly: "when a new email arrives in the dispatch inbox" (trigger) → "extract the attachment" → "call a model to classify it" → "write a row to the tracking table" (three actions, run in order). Nothing about this is AI-specific yet — it's the same shape as any integration flow — which is exactly the point. You're learning the shape now so Chapter 2 can drop AI actions into it without also teaching you the shape at the same time.

## Touring the designer canvas

The screenshot below shows the full designer with every major region labeled by Microsoft's own documentation. You don't need to memorize every number, but a few matter immediately: the canvas in the center is where your trigger and action cards live top to bottom, the configuration pane on the left is where you fill in a selected card's settings, and the Save and Test buttons on the command bar are how you persist a flow and then run it once to check your work.

![Screenshot of the Power Automate cloud flow designer with the command bar, canvas, and configuration pane numbered and outlined](/courses/power-automate-ai-agents/ch01/02-flows-triggers-and-actions-essentials/designer-overview.png)
*The designer canvas: trigger and action cards flow top to bottom in the center; the configuration pane opens on the left when a card is selected.*

## Adding an action

Every flow after the first card is built the same way: select the plus sign below the last step, and the **Add an action** pane opens. That pane is organized into four sections — Favorites (connectors you've starred), AI Capabilities (every AI-related action, called out separately — you'll live in this section starting Chapter 2), Built-in tools (control-flow actions like conditions, loops, and variables, covered in the next lesson), and By connector (everything else, organized by the app or service it talks to).

![Screenshot of the 'Add an action' pane in the Power Automate designer, showing categories of actions to choose from](/courses/power-automate-ai-agents/ch01/02-flows-triggers-and-actions-essentials/add-action-pane.png)
*The Add an action pane — search by name, or browse by category.*

Searching is almost always faster than browsing once you know roughly what an action is called — type "compose" to find the Compose data operation, "condition" to find branching logic, or the name of a connector like "SharePoint" to see everything it offers.

## Save, then test

Saving a flow runs a validation pass first — if something is misconfigured, Power Automate shows the error and won't save until it's fixed, the same way a compiler refuses to produce a binary from code with a syntax error. Once a flow saves cleanly, the Test button becomes available. Selecting it and choosing **Manually** lets you trigger one run by hand and watch each action complete with a green checkmark and a timing in real time.

![Screenshot of the manual test option in the Power Automate designer, prompting the user to select Manually to run a one-off test](/courses/power-automate-ai-agents/ch01/02-flows-triggers-and-actions-essentials/test-manually.png)
*Running a manual test — the fastest way to check a flow while you're still building it.*

Every test run (and every production run) is recorded in run history with the full input and output of each action — the closest thing Power Automate has to structured logs, and usually the first place you'll look when a flow doesn't behave the way you expect.

## Key terms

- **Trigger** — the event that starts a flow; every flow has exactly one
- **Action** — a single step that runs after the trigger fires; a flow can have many
- **Canvas** — the center area of the designer where trigger and action cards are arranged
- **Configuration pane** — the panel that opens to let you set a selected card's parameters and settings
- **Run history** — the per-run log of every action's input and output, used for debugging
