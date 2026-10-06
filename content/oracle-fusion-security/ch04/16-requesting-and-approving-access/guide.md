# Requesting and Approving Access

Lesson 9 introduced self-request as one of three provisioning methods. This lesson covers the human workflow around it in more depth — what happens between a user clicking "request a role" and that role actually showing up on their account — plus how manual, non-self-service access requests typically flow in a real organization.

## What you'll learn

- The self-request-and-approval flow from a user's perspective
- Who typically acts as an approver, and why that matters for segregation of duties
- How non-self-requestable access gets requested in practice
- Why documenting access requests matters even when the process feels like "just paperwork"

## The self-request flow

When a role mapping is marked **self-requestable** (Lesson 9), a matching user can request that role themselves, typically through a self-service request page. That request doesn't grant access immediately — it routes to an **approval workflow**, which can route to one approver or a chain of them depending on how the mapping and workflow rules are configured. Only once approved does the role actually get provisioned to the user's account.

This matters for segregation of duties in a subtle way: whoever approves the request should not be the same person whose own access would create a conflict with the requester's new role. At Castellan Robotics Inc., a role mapping for "Accounts Payable Specialist" routes approval to the AP Supervisor — not to the requester's own manager if that manager happens to also hold AP payment-approval access, which would risk exactly the kind of self-approving arrangement Lesson 13 warns against.

## Requesting access that isn't self-requestable

Many roles — particularly higher-risk ones, like anything touching payment approval, chart of accounts maintenance, or security administration itself — are deliberately *not* marked self-requestable. For these, the request has to originate outside the self-service flow entirely: typically a formal request (a ticket, a form, an email to IT/security) initiated by the requester's manager, reviewed against the person's actual job need, and provisioned manually by an administrator through the Security Console once approved. This extra friction is intentional — it's a control, not an oversight.

## Why documentation matters

Every access request and approval should leave a record — who requested it, who approved it, when, and why. This isn't bureaucracy for its own sake: it's the evidence an auditor (internal or external) relies on to answer "why does this person have this access," and it's what makes Lesson 14's security reports actually useful during a review rather than just raising unanswered questions. A request with no documented justification is itself a finding in many audits, even if the access turns out to be appropriate.

## Key terms

| Term | Meaning |
|---|---|
| Self-requestable | A role flagged in its mapping as requestable by a matching user |
| Approval workflow | The routing that reviews a self-requested role before it's provisioned |
| Manual request | A formal, non-self-service request for roles not marked self-requestable |

## Recap

Self-requestable access still has to clear an approval workflow before provisioning, with approvers chosen deliberately to avoid self-approval conflicts. Higher-risk roles skip self-service entirely in favor of a formal, documented request. Next up, Lesson 17: security troubleshooting basics, where you'll start diagnosing what happens when any of this goes wrong.
