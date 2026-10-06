# Lesson 20 — Fault Handling

**Chapter 4 · Reliable and Scalable Flows · Lesson 20 of 31**

## What you'll learn

- What a fault path is, and which elements can have one
- The default behavior when an element fails with no fault path attached
- How to surface a real error message with the `$Flow.FaultMessage` global variable
- Why "handle the fault" doesn't mean "hide the fault" from the people who need to see it

## Flows fail. The question is what happens next

A **Get Records**, **Create Records**, **Update Records**, **Delete Records**, or **Action** element can fail at run time for reasons that have nothing to do with your flow logic being wrong: a validation rule blocks the write, a required field is missing, the running user lacks field-level access, an email address is malformed, a duplicate rule intercepts a save. None of that is something Flow Builder can stop you from encountering — it's data and org configuration colliding with your flow at the worst possible moment.

Without a **fault path**, a failed element throws an *unhandled fault*: the user running the flow sees a generic, unhelpful error, and you find out about it (if you find out at all) secondhand.

## Fault paths are a second connector, not a separate flow

Any element that can fail gets a second connector option on the canvas, alongside its normal one: **Add Fault Path**. It's reachable right from the element's own menu — the same menu that has Copy Element, Cut Element, and Delete Element. Attaching a fault path doesn't change what the element does on success; it just gives the flow somewhere else to go the moment that element throws an unhandled fault instead of crashing out with the generic error.

On the canvas, a fault path renders as a distinct red dashed connector running from the risky element down to whatever you've built to handle the failure — often its own small branch ending in a **Display Text** screen or a logging step, separate from the flow's normal success path.

![A flow canvas: Screen Flow start, Get Opp Details, Hot Account, Set Close Date, Create Opportunity, then End — with a second red dashed "Fault" connector running from Create Opportunity to its own End.](/courses/salesforce-flow-automation/ch04/20-fault-handling/fault-path-canvas.png)

You attach it from the element's own context menu, right alongside Copy Element, Cut Element, and Delete Element:

![The Create Opportunity element's context menu, with Copy Element, Cut Element, Delete Element, and Add Fault Path options — Add Fault Path highlighted.](/courses/salesforce-flow-automation/ch04/20-fault-handling/add-fault-path-menu.png)

## Surfacing the real error — `$Flow.FaultMessage`

The most useful thing you can put on a fault path is the **`$Flow.FaultMessage` global variable**. It holds the actual system-generated error text for whatever just failed — the real `REQUIRED_FIELD_MISSING`, `INSUFFICIENT_ACCESS_ON_CROSS_REFERENCE_ENTITY`, or validation-rule message, not a paraphrase. Drop it into a Display Text element (for a screen flow) so the user sees something real instead of a dead end, or concatenate it into a case/email/log record so an admin can see it without having to ask the user what happened.

![The Display Text element's configuration panel, API Name "FaultText", with a merge field reading {!$Flow.FaultMessage} followed by Name, Stage, Close Date, and Account merge fields.](/courses/salesforce-flow-automation/ch04/20-fault-handling/fault-message-display-text.jpg)

## Handling a fault still means someone has to see it

A fault path that quietly swallows the error and shows a cheerful "something went wrong, please try again" message has solved the *crash* but not the *problem* — nobody learns a required field is missing, so nobody fixes it, and the same fault recurs for the next ten users. Treat the fault path as the place where you decide, deliberately, who finds out and how: the end user (plain language), an admin (the real `$Flow.FaultMessage`), or both.

## Key terms

| Term | Meaning |
|---|---|
| Fault path | A secondary connector from an element that can fail, run only on an unhandled fault |
| Unhandled fault | What happens when a failing element has no fault path — a generic error shown to the user |
| `$Flow.FaultMessage` | Global variable holding the real system error text for the most recent fault |
| Elements that support fault paths | Get Records, Create Records, Update Records, Delete Records, and Action elements |

## Check yourself

A Create Records element has no fault path attached, and the record create fails because a required field is blank. What does the user running the flow see, and how would attaching a fault path with `$Flow.FaultMessage` change that?
