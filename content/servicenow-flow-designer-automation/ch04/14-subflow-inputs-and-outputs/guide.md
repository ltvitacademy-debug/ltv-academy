# Lesson 14 — Subflow Inputs & Outputs

**Chapter 4 · Subflows & Reuse · Lesson 14 of 27**

## What you'll learn

- What a Subflow's Inputs section actually defines, and why it's not optional
- What a Subflow's Outputs section returns to the flow that called it
- The parameter/return-value analogy, and where it holds up and where it doesn't
- How a calling flow maps its own data pills into a subflow's inputs
- How a calling flow uses a subflow's outputs as data pills in its own later steps

## Why a subflow needs defined Inputs at all

A Subflow has no Trigger, which means it has no record and no event handing it data automatically the way a top-level Flow gets handed the record that triggered it. Everything a subflow needs to do its job has to be handed to it explicitly, by whatever flow calls it. That's what the Inputs section, defined on the subflow itself, is for: a named, typed list of exactly what the subflow requires to run. Build a "Notify and Log Manager Decision" subflow, and its Inputs section might define three inputs — a Manager (a reference to a `sys_user` record), a Request Record (a reference to whatever record triggered the need for a decision), and a Message (a string, the notification text). Every input gets a name and a data type, the same way a well-documented function signature tells you exactly what it needs before you can call it.

## Why a subflow needs defined Outputs too

A subflow runs its steps and then, usually, finishes with information the calling flow needs back — did the manager approve or reject, and when did that decision happen? That's what the Outputs section defines: a named, typed list of exactly what the subflow hands back once it completes. The same "Notify and Log Manager Decision" subflow might define two outputs — a Decision (a string, "Approved" or "Rejected") and a Decision Date (a date/time). Without defined outputs, a subflow's internal work would be invisible to whatever called it; the calling flow would have no way to react to what actually happened inside the subflow.

## The parameter and return-value analogy — and its limits

If you've ever worked with functions in any programming language, Inputs and Outputs will feel immediately familiar: Inputs are like a function's parameters, and Outputs are like its return value. That analogy is accurate as far as it goes — it's exactly why this lesson uses it — but it's worth being precise about where it's built for administrators rather than developers. You're not writing a function signature in code; you're defining these inputs and outputs through Flow Designer's own configuration screens, naming each one and picking its data type from a dropdown, the same low-code approach every other piece of Flow Designer configuration uses. The underlying behavior is the same idea as parameters and a return value; the authoring experience is deliberately not code.

## How the calling flow actually wires this up

When a flow calls a subflow — through a Call Subflow–style action dropped into its own sequence of steps — Flow Designer presents that subflow's defined Inputs right there in the action's configuration panel. The flow builder maps data pills from its own context into each input: the Request Record input might get filled with "Trigger Record" from the flow's own trigger, the Manager input might get filled with a data pill pulled from that record's manager field, and the Message input might get filled with a string built earlier in the flow. Once the subflow finishes running, its Outputs become available as new data pills in the calling flow — visible and selectable in every step that comes after the Call Subflow action, exactly the way any other data pill is used. The calling flow can then branch with an If/Else on the Decision output, or write the Decision Date output onto its own record, without ever needing to know how the subflow produced those values internally.

## Key terms

| Term | Meaning |
|---|---|
| Subflow Inputs | A named, typed list defined on the subflow, describing exactly what data it needs from whatever calls it |
| Subflow Outputs | A named, typed list defined on the subflow, describing exactly what data it hands back once it finishes |
| Call Subflow action | The action a flow uses to invoke a subflow, mapping data pills into its Inputs |
| Data pill | A reference to a specific piece of data available at a given point in a flow or subflow, reused in later steps |

## Check yourself

You're ready for Lesson 15 when you can explain, without looking: if a "Notify and Log Manager Decision" subflow defines a Decision output, what exactly can the flow that called it do with that output once the subflow finishes, and how does it get access to it?
