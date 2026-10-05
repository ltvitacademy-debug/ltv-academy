# Lesson 12 — Access Governance

**Chapter 3 · Access Control · Lesson 12 of 30**

## What you'll learn

- What "access governance" means as a program, not a single control
- The Joiner-Mover-Leaver (JML) lifecycle that drives most access changes
- The four roles involved in every access decision: requester, approver, provisioner, auditor
- Why access governance is the coordinating layer that the rest of this chapter's controls (RBAC, least privilege, SoD, reviews, privileged access) all plug into

## What access governance actually coordinates

Every other lesson in this chapter — role-based access control, least privilege, segregation of duties, access reviews, privileged access — is a *control*. **Access governance** is the program that decides when each control fires, who's accountable for the decision, and how the organization proves, later, that the right people had the right access at the right time.

Concretely, access governance answers four questions for every system that holds anything worth protecting: Who can request access? Who has the authority to approve it? Who actually grants it in the system? And who checks, after the fact, that the grant was correct and is still needed?

## The Joiner-Mover-Leaver lifecycle

Most access changes in a real organization trace back to one of three employee-lifecycle events:

- **Joiner** — a new hire or new contractor needs a starting set of access, usually tied to their role (Lesson 13)
- **Mover** — someone changes teams, gets promoted, or takes on a new project; they need *new* access, and — this is the part organizations skip — they need their *old* access removed
- **Leaver** — someone's employment or contract ends; all of their access needs to be revoked, on a timeline tight enough that a termination on a Friday doesn't leave an active login over the weekend

The "Mover" case is where access governance programs most often fail quietly. Granting new access when someone changes roles is easy to remember because the new manager asks for it. Removing the access tied to the *old* role is nobody's trigger unless the governance program makes it one — which is exactly why access reviews (Lesson 16) exist as a backstop.

## The four roles in every access decision

- **Requester** — the person (or their manager) who identifies a business need for access
- **Approver** — typically the data or system owner, the person accountable for deciding whether the request is justified (this is the same "data owner" role from Data Governance Foundations)
- **Provisioner** — whoever (a person or an automated workflow) actually executes the grant in the target system
- **Auditor** — someone independent of the first three who can later confirm the grant was approved, was provisioned correctly, and is still appropriate

Splitting these roles across different people (or at least different *responsibilities*, even if one person wears two hats on a small team) is itself a form of segregation of duties (Lesson 15) — the same person shouldn't be able to request, approve, and grant their own access with no one else involved.

## Why this is the coordinating layer

A well-run access governance program doesn't invent new controls — it schedules and documents the controls this chapter already covers. It decides that new hires get role-based starting access (Lesson 13), that every grant is checked against least privilege before approval (Lesson 14), that no single workflow lets one person both request and approve (Lesson 15), that every grant gets reviewed on a cadence (Lesson 16), and that the small number of admin-level accounts get extra scrutiny (Lesson 17). Without that coordinating layer, an organization can have every individual control in place and still fail an audit, because nobody can produce evidence of *when* and *why* each grant happened.

## Key terms

| Term | Meaning |
|---|---|
| Access governance | The program that defines who can request, approve, provision, and audit access across an organization's systems |
| Joiner-Mover-Leaver (JML) | The three employee-lifecycle events that trigger most access changes |
| Entitlement | A specific unit of access granted to a person or role (e.g., "read access to the Sales database") |
| Access request workflow | The documented path a request follows from submission through approval to provisioning |

## Lab

Pick a system you have access to at work or school (email, a shared drive, a SaaS tool). Reconstruct, from memory or by asking, who filled each of the four roles when your access was granted: who requested it, who approved it, who provisioned it, and whether anyone has audited it since. If you can't answer one of the four, that's a real gap — not a hypothetical one.

## Check yourself

- Why is the "Mover" event in Joiner-Mover-Leaver the one most likely to leave stale access behind?
- Name the four roles involved in an access decision, and explain why the same person filling the requester and approver role for their own request is a problem.
