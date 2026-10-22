# Lesson 2 — Flows, Actions & Subflows

**Chapter 1 · Flow Designer Fundamentals · Lesson 2 of 27**

## What you'll learn

- What a Flow actually is under the hood, and the one table every flow lives on
- What an Action is, and the difference between built-in and custom Actions
- What a Subflow is, and how it differs from a Flow you trigger directly
- How these three pieces fit together inside a single automation
- Where each one gets covered in depth later in this course

## The Flow: one trigger, a sequence of steps

Every piece of Flow Designer automation you build is, underneath, a record on the `sys_hub_flow` table. ServiceNow calls that record a Flow, and structurally it's simple: exactly one Trigger that decides when the flow starts, followed by an ordered sequence of Actions that run after it. You design a flow visually — add a trigger, then add actions one after another, with If/Else branches and For Each loops nested in where you need them — but every flow you will ever build reduces to that same shape: one trigger, then steps. Chapter 1 gets you fluent with that basic shape; later chapters add logic, data handling, and reuse, but the underlying shape never changes.

## The Action: one reusable, configurable step

An Action is a single step inside a flow — Create Record, Update Record, Send Notification, Ask For Approval are common examples you'll use constantly. Every Action is defined once, as an `sys_hub_action_type_definition` record, and that definition is what shows up in the Flow Designer step picker with its own configurable inputs. ServiceNow ships a large library of these built-in, out-of-box Actions covering most common tasks across ITSM, HR, and other applications. When none of the built-in Actions do exactly what a business process needs, an admin or developer can build a custom Action — its own reusable step with its own defined inputs and outputs, built once and then available to any flow, the same way a built-in Action is. Custom Actions are a real skill with real scripting involved, which is why this course gives them a full chapter later (Chapter 3) rather than rushing them here — for now, just know that "Action" means a single configurable step, whether ServiceNow built it or you did.

## The Subflow: a flow built to be called, not triggered

A Subflow is, structurally, still a `sys_hub_flow` record — the same underlying object as a Flow — but it's flagged as a subflow type and designed differently: it isn't meant to be triggered directly by a record change or a schedule. Instead, a Subflow defines its own inputs and outputs and is built to be called BY other flows (or by other subflows) as a reusable building block, the same way an Action is a reusable step, except a Subflow can contain an entire sequence of logic rather than one action. Think of it as the difference between a single tool and a toolkit you assembled once and now hand to other flows whenever they need that exact sequence of logic. Subflows get their own deep-dive in Chapter 4, where you'll build one and call it from more than one parent flow — for now, the distinction that matters is: a Flow is triggered directly; a Subflow is called by something else.

## How the three fit together

Picture a real flow: a Record trigger fires when an Incident is created. The flow runs an Action to set a field, then calls a Subflow that handles a standard notification-and-escalation sequence shared across several different flows in the instance, then runs one more Action to log the outcome. One trigger, a mix of built-in Actions, custom Actions, and a Subflow call, all inside one Flow record. That's the full vocabulary of Flow Designer's building blocks, and every later chapter in Part 1 of this course is really just teaching you to use these three pieces with more precision and more reuse.

## Key terms

| Term | Meaning |
|---|---|
| Flow | A `sys_hub_flow` record: one Trigger plus an ordered sequence of Actions |
| Action | A single reusable, configurable step (e.g., Create Record, Send Notification); built-in or custom |
| Subflow | Also a `sys_hub_flow` record, flagged as a subflow type; called by other flows rather than triggered directly |
| Action type definition | The `sys_hub_action_type_definition` record that defines an Action and its inputs |

## Check yourself

You're ready for Lesson 3 when you can explain: structurally, what's the actual difference between a Flow and a Subflow, given that both live on the same `sys_hub_flow` table?
