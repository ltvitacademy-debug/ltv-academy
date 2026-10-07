# Script — Flows, Triggers and Actions: The Essentials

## Segment 1 (title)

Every Power Automate flow is built from exactly two kinds of pieces: one trigger and any number of actions. If you've worked with webhooks or event bindings, this will feel familiar fast.

## Segment 2 (steps)

A trigger is the event your flow reacts to — a new email, an HTTP request, a schedule. Actions are the steps that run after it, in order. The trigger's full output becomes available to every action downstream, the same way a webhook payload is available inside your handler function. Nothing about this shape is AI-specific yet, and that's the point — you're learning it now so later chapters can drop AI actions straight into it.

## Segment 3 (screenshot)

Here's the designer canvas with every region labeled. Trigger and action cards live top to bottom in the center. Selecting a card opens a configuration pane on the left where you set its parameters. Save and Test sit on the command bar at the top.

## Segment 4 (screenshot)

Adding an action always works the same way: select the plus sign below the last step, and this pane opens. It's organized into four sections — Favorites, AI Capabilities, Built-in tools for control flow, and By connector for everything else. Searching by name is almost always faster than browsing.

## Segment 5 (screenshot)

Saving runs a validation pass first and blocks if something's misconfigured. Once it saves clean, Test becomes available — choose Manually to trigger one run by hand and watch each action complete with a green checkmark. Every run, test or production, lands in run history with the full input and output of each step.

## Segment 6 (outro)

That's the whole shape: one trigger, actions in order, run history to debug with. Next up, lesson three: conditions, loops, and variables.
