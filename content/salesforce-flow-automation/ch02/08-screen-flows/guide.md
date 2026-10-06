**Chapter 2 · Flow Types · Lesson 8 of 31**

# Screen Flows

Lessons 6 and 7 covered flows that run with no one watching. A **screen flow** is the opposite: a
flow built specifically to put one or more screens in front of a user, collecting or displaying
information as they go. Every guided data-entry wizard, every "click here to start a return"
button in Salesforce is almost certainly a screen flow underneath.

## What you'll learn

- What a Screen element actually is, and what goes inside it
- How to add and configure screen components
- What Screen Properties control
- Where screen flows fit relative to the record-triggered flows from Lessons 6-7

## Building a screen flow

A screen flow's canvas looks like any other flow, but with Screen elements doing the interaction
work:

![The Flow Builder Toolbox and canvas for a screen flow, showing Screen Flow Start, a Questions screen, Create Case, and End.](/courses/salesforce-flow-automation/ch02/08-screen-flows/screen-flow-toolbox-canvas.png)

Each Screen element is its own configuration, starting with its **Screen Properties** — a label,
an API name, and navigation options:

![The New Screen window's Screen Properties pane.](/courses/salesforce-flow-automation/ch02/08-screen-flows/new-screen-properties-pane.png)

## Screen components: what goes on the screen

A Screen element starts blank. You fill it with **screen components** — the individual pieces a
user actually sees and interacts with: text boxes, radio buttons, dropdowns, checkboxes, and
display-only text. One of the simplest is **Display Text**, used to show information with no
input required:

![The Display Text component at the bottom of the Components list, next to an empty screen canvas.](/courses/salesforce-flow-automation/ch02/08-screen-flows/display-text-component.png)

Drag a component onto the canvas and its own configuration panel opens — set its label, the
resource it reads from or writes to, visibility conditions, and more:

![A screen component's configuration panel, showing its properties.](/courses/salesforce-flow-automation/ch02/08-screen-flows/screen-component-config.png)

Beyond Display Text, common components include text input fields, picklists built from a Record
Choice Set, and toggles for yes/no questions — all of them standard, no custom code required.

## Where screen flows fit

A screen flow is launched by a user action — clicking a button, a quick action, a tab, or a link —
never by a record change or a schedule on its own. That's the core distinction from Chapter 2's
other flow types: screen flows need a person in the loop; everything else in this chapter runs
without one.

## Key terms

| Term | Meaning |
|---|---|
| Screen flow | A flow built around one or more screens a user interacts with directly |
| Screen element | The container holding everything shown on one screen of the flow |
| Screen component | An individual piece on a screen — a text box, button, display text, etc. |
| Screen Properties | A Screen element's own settings — label, API name, navigation options |

## Check yourself

A record-triggered flow and a screen flow both need to collect "Reason for Status Change" from a
user. Which one can actually do that, and why?
