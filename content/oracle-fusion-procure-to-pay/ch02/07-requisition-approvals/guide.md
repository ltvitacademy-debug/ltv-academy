# Requisition Approvals

Dana's requisition is now sitting with a status of "Pending Approval." This lesson covers what that actually means: who approves it, why, and what happens if nobody does.

## What you'll learn

- How Oracle Fusion decides who must approve a requisition
- The role of the BPM-based approvals engine
- What a requester sees while a requisition is in approval
- What happens on rejection versus approval

## Approval rules, not a single approver

Oracle Fusion Cloud routes approvals through its Business Process Management (BPM)-based approval engine, often referred to by its underlying functionality, Approval Management. Rather than one hard-coded "manager approves everything" rule, approvals are built from configurable **approval rules** that can consider multiple factors on the requisition: the requested **amount**, the **item category**, the **business unit**, and the requester's own position in the supervisory hierarchy. A low-value, routine MRO purchase like Dana's bearings might only need her direct manager's approval. A large capital purchase or an unusual category might require a chain of approvers, or a specific named approver such as a procurement manager or a budget owner, regardless of hierarchy.

## What this looks like for Dana's requisition

For this course's transaction, LTV Manufacturing Corporation's approval rules route Dana's requisition to her direct supervisor, since the amount is modest and the category (MRO/maintenance parts) is routine and pre-approved for that supplier relationship. If her supervisor approves it, the requisition is fully approved and ready to move to the next stage. If the amount had been large enough to cross a configured threshold, the rule set could have added a second approver, such as a plant finance manager, before the requisition could proceed.

## What the requester sees while waiting

While a requisition is pending, Dana can see its status and which approver's queue it currently sits in, but she cannot push it forward herself. This is exactly the scenario from lesson 2: a requisition that looks "stuck" to a requester is almost always just waiting in someone else's approval queue. Approvers typically receive a notification (in their worklist and often by email) and can approve, reject, or request more information without leaving the approval task.

## Approval, rejection, and reapproval

If approved, the requisition becomes available for processing into a purchase order, which is covered in lesson 9. If **rejected**, it returns to Dana with a reason, and she can revise and resubmit it, which restarts the applicable approval routing. Rejection is not a system error — it is the approval rule working as designed, stopping a request before it becomes a financial commitment. Changing a requisition after partial approval (for example, increasing the quantity) can also trigger **reapproval**, since the change may now cross a threshold the original routing did not anticipate.

## Recap

Requisition approval is governed by configurable rules based on amount, category, business unit, and hierarchy, run through Oracle Fusion's BPM-based approval engine, not a single fixed approver. Dana's routine bearing purchase routes to her supervisor; a larger or unusual purchase could require more approvers. Next up, lesson 8: once approved, how the requisition's accounting distribution — which account actually gets charged — is determined.
