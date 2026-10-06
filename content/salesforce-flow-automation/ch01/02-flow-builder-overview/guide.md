**Chapter 1 · Flow Foundations · Lesson 2 of 31**

# Flow Builder Overview

Lesson 1 established that Flow is the tool. This lesson is a tour of the actual screen you build
in: Flow Builder. Every flow in this course — screen flows, record-triggered flows, scheduled
flows, all of it — gets built in this same editor, so getting comfortable with its layout now pays
off for the rest of the course.

## What you'll learn

- How to get to Flow Builder and start a new flow
- The three main parts of the Flow Builder screen: toolbox, canvas, button bar
- What the key button-bar controls do: Save, Run, Debug, Activate
- Auto-Layout vs. Free-Form, and why this course uses Auto-Layout

## Getting to Flow Builder

From the App Launcher, search for **Automation**, open it, and in the Flows panel click **New**.
That takes you to the New Automation screen from Lesson 1, where you pick a flow type:

![The New Automation window showing flow types including Screen Flow, Record-Triggered Flow, and Autolaunched Flow (No Trigger).](/courses/salesforce-flow-automation/ch01/02-flow-builder-overview/new-automation-flow-types.png)

Pick a type and you land in Flow Builder itself.

## The three parts of the screen

Flow Builder has three main parts, and recognizing them by name will make the rest of this course
much easier to follow:

![The Flow Builder user interface, showing the toolbox, canvas, and button bar.](/courses/salesforce-flow-automation/ch01/02-flow-builder-overview/flow-builder-ui-overview.png)

- **Toolbox (left)** — lists every element and resource you've built in this flow so far, and has
  the **New Resource** button for creating variables, constants, and formulas
- **Canvas (center)** — the working area where you build the flow by adding elements; as you add
  them, you see a visual diagram of the flow take shape
- **Button bar (top)** — information about the flow (active or not, last saved, warnings) plus the
  controls that act on it

![The three parts of Flow Builder, numbered: Toolbox, Canvas, and Button Bar.](/courses/salesforce-flow-automation/ch01/02-flow-builder-overview/flow-builder-three-parts.png)

## What the button bar actually does

A few button-bar controls you'll use constantly:

- **Save** / **Save As New Version** — a flow can have multiple versions; saving doesn't make a
  new version active by itself
- **Run** — runs the most recently *saved* version of the flow (unsaved changes aren't included)
- **Debug** — runs the flow with sample data you choose, so you can watch exactly what happens at
  each step before anyone else touches it
- **Activate** — makes a specific saved version the one users actually encounter

## Auto-Layout vs. Free-Form

Flow Builder offers two canvas layout styles. **Auto-Layout** arranges and connects elements for
you and unlocks extra features (keyboard navigation between elements, path highlighting on
Decisions). **Free-Form** gives you manual control over element placement and connectors. This
course uses Auto-Layout throughout, which is also what Salesforce itself now recommends for new
flows.

## Key terms

| Term | Meaning |
|---|---|
| Toolbox | The panel listing a flow's elements and resources, with the New Resource button |
| Canvas | The working area where elements are added and connected into a visual flow diagram |
| Button bar | The top bar with flow status and controls (Save, Run, Debug, Activate) |
| Auto-Layout | The recommended canvas style that arranges and connects elements automatically |

## Check yourself

A teammate clicks Run right after making changes to a flow, but says "nothing I just changed
happened." Based on this lesson, what's the most likely explanation?
