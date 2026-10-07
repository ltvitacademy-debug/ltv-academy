# Child Flows and Modular Flow Design

Castlebridge Logistics has one small routine — create or update a shipment record — that both the warehouse team's flow and the finance team's flow need to run. Building that logic twice, inside two separate flows, means fixing it twice every time it changes. This lesson shows how Castlebridge builds that routine once, as a **child flow**, and calls it from both places instead.

## What you'll learn

- Why flows with hundreds of steps become hard to navigate and maintain, and how child flows fix that
- The difference between a parent flow and a child flow
- How to pass inputs into a child flow and get outputs back out of it
- The **Run a Child Flow** action, and why a child flow must use the **Manually trigger a flow** trigger
- Why a child flow needs its connections **embedded** rather than provided by a run-only user

## Why Castlebridge split one flow into two

A flow with dozens of steps is hard to read, hard to debug, and risky to change — one small edit can have effects three screens away. Child flows let Castlebridge pull a self-contained piece of logic, like "look up or create this shipment record," out of a large flow and give it its own name, its own inputs, and its own outputs. Any number of **parent flows** can then call that one child flow, so the logic exists — and gets fixed — in exactly one place.

## Building the child flow

A child flow always starts with the **Manually trigger a flow** trigger. That might look odd for something that's never triggered by a person, but it's what makes a flow eligible to be called as a child. Castlebridge adds **inputs** to that trigger — a contact name and email, in the example used here — which is the data the parent flow will hand off. After the child flow's own logic runs, it ends with a **Respond to a Power App or flow** action (or the premium HTTP **Response** action), which sends results back out.

## Calling the child flow from a parent

Inside the parent flow, Castlebridge adds the **Run a Child Flow** action, found under the built-in **Flows** connector, and picks the child flow it just built.

![Screenshot showing the picker for the Run a Child Flow action, selecting the child flow to run.](/courses/power-automate/ch02/23-child-flows-and-modular-design/select-child-flow.png)
*Only flows that use the manual trigger and live in the same solution show up in this picker.*

Once selected, Power Automate immediately shows the inputs that child flow expects:

![Screenshot of the input fields exposed after a child flow is selected.](/courses/power-automate/ch02/23-child-flows-and-modular-design/view-child-flow-input.png)
*Castlebridge fills these in exactly the way it would fill in fields for any built-in action — because to the parent flow, that's all this is.*

When the child flow finishes, its response comes back as structured output the parent flow can use in every step after it:

![Screenshot of a child flow's response output, showing a returned record ID.](/courses/power-automate/ch02/23-child-flows-and-modular-design/response-output.png)
*The ID of the record the child flow just created or updated, returned to the parent flow.*

## A note on connections

A child flow can't inherit a connection from its parent at run time — at this time, connections can't be passed between parent and child. If the child flow uses anything beyond built-in actions or Dataverse, Castlebridge has to open the child flow's **Run only users** settings and set each connection to **Use this connection**, rather than leaving it as **Provided by run-only user**. Skip this step, and the child flow fails with an error saying it can't be used as a child workflow.

## Key terms

- **Parent flow** — the flow that calls another flow and can have any trigger type
- **Child flow** — a flow with the Manually trigger a flow trigger, built to be called by one or more parent flows
- **Run a Child Flow** — the built-in action, under the Flows connector, that calls a child flow from a parent
- **Respond to a Power App or flow** — the action a child flow uses to send outputs back to whatever called it
- **Embedded connection** — a connection saved directly on the child flow, required because connections can't pass from parent to child
