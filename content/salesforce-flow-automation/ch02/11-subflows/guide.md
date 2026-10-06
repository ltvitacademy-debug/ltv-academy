**Chapter 2 · Flow Types · Lesson 11 of 31**

# Subflows

Lesson 10 mentioned that another flow can invoke an Autolaunched Flow (No Trigger). This lesson
is about exactly how: the **Subflow** element, which calls one flow — the **referenced flow** —
from inside another, the **parent flow**, and picks back up once it finishes.

## What you'll learn

- Which element category Subflow belongs to, and what else lives there
- How to configure a Subflow element to call a specific referenced flow
- Why a variable has to be marked "Available for input" or "Available for output" before a
  parent flow can use it
- Why subflows exist at all: reuse

## Where Subflow lives

Open Add Element in Flow Builder and Subflow sits in the **Interaction** category, right next to
Screen and Action:

![The Add Element panel's Interaction category, listing Screen, Action, and Subflow.](/courses/salesforce-flow-automation/ch02/11-subflows/interaction-elements.png)

That placement is a hint about what it does: like a Screen or an Action, a Subflow element is a
single step in the parent flow's canvas — except instead of showing a screen or calling an
external action, it hands control to an entire second flow and waits for that flow to finish
before the parent flow continues.

## Configuring a Subflow element

Drag a Subflow element onto the canvas and its panel asks for a Label, an API Name, and —
critically — a **Referenced Flow**: which flow to actually call. Below that, if the referenced
flow has any input variables, a **Set Input Values** section appears, letting you map values
from the parent flow into the child flow's variables:

![The "Post to Chatter" Subflow element's configuration panel, with a Referenced Flow field and a Set Input Values section, picking Triggering Case then Owner ID into the userMentionID field.](/courses/salesforce-flow-automation/ch02/11-subflows/subflow-element-panel.png)

Here, the parent flow is handing its own Triggering Case's Owner ID into the referenced "Post to
Chatter" flow's `userMentionID` input — so the child flow knows who to mention without needing
its own logic to look that up.

## Why a variable has to opt in

Set Input Values only works for variables the **referenced (child) flow** has explicitly exposed.
Create a new resource inside that child flow and its "Availability Outside the Flow" section is
where that happens — two checkboxes, Available for input and Available for output:

![A New Resource window for a Variable, with the "Availability Outside the Flow" section highlighted: Available for input and Available for output checkboxes.](/courses/salesforce-flow-automation/ch02/11-subflows/new-resource-availability-outside-flow.png)

Leave both unchecked and the variable is private to that flow — a parent flow calling it as a
subflow can't set it going in, and can't read it coming back out. Check Available for input and a
parent's Set Input Values section can populate it. Check Available for output and the parent can
pull a value back out after the subflow finishes.

## Why bother

If three different parent flows all need to post the same kind of Chatter update, email a
customer, or run the same five-step cleanup, building that logic once as its own flow — and
calling it as a subflow from each parent — means one place to fix it later, instead of three.
It's the same instinct as a reusable function in code, expressed as flow elements.

## Key terms

| Term | Meaning |
|---|---|
| Subflow | An Interaction element that calls another flow and waits for it to finish |
| Referenced flow | The flow a Subflow element calls — the "child" flow |
| Parent flow | The flow containing the Subflow element — the one doing the calling |
| Available for input / output | Per-variable settings in the child flow that expose it to a calling Subflow element |

## Check yourself

A child flow's variable has neither "Available for input" nor "Available for output" checked.
What happens when a parent flow tries to set that variable's value through a Subflow element's
Set Input Values section?
