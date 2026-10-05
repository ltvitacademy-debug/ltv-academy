# Lesson 15 — Segregation of Duties

**Chapter 3 · Access Control · Lesson 15 of 30**

## What you'll learn

- What segregation of duties (SoD) means, and why it's about splitting a *process*, not just restricting a permission
- The classic finance example: who requests, who approves, who pays
- How SoD applies directly to the access-decision roles from Lesson 12
- Toxic combinations and how an SoD conflict matrix catches them

## Splitting a process, not just restricting a permission

Least privilege (Lesson 14) asks "does this one account have too much access." **Segregation of duties** asks a different question: "can one person, alone, complete an entire sensitive process end to end?" Even if each individual permission in that process is perfectly justified on its own, letting one person hold *all* of them is the actual risk — because it removes the independent check that catches an honest mistake or stops a dishonest one.

The fix isn't to take permissions away arbitrarily. It's to split a sensitive process across multiple people, so no single account — compromised, careless, or malicious — can finish the whole thing alone.

## The classic finance example

Accounts payable is the textbook case, and it maps directly onto data systems too. Three separate functions, three separate people:

- **Who creates a vendor record** — adds a new vendor to the system
- **Who approves a vendor record** — reviews and signs off that the vendor is legitimate
- **Who issues payment** — actually releases funds to that vendor

If the same person can create a fake vendor, approve it, and issue payment to it, there's no independent check anywhere in that chain — which is exactly how a lot of real-world payment fraud happens. Split those three functions across three different people (or at minimum, three different system roles), and committing fraud now requires *collusion*, which is a much higher bar than one person acting alone.

## Mapping SoD onto the access-governance roles

Lesson 12 introduced four roles in every access decision: requester, approver, provisioner, and auditor. Segregation of duties is the principle that makes splitting those roles matter, not just a bookkeeping nicety. If the same person can request their own access *and* approve it, there's no independent check on that grant — the access-decision process has the identical SoD flaw as the vendor-payment example, just applied to access itself instead of money. This is why access governance programs explicitly forbid self-approval, and why the provisioner (who executes the grant) is kept separate from the approver (who authorized it) wherever practical.

## Toxic combinations

An SoD program names specific pairs of permissions that should never sit with the same person — a **toxic combination**. "Can create a vendor" plus "can approve payments" is one. In a data system, "can grant database access" plus "can approve their own access requests" is another. "Can write to the audit log table" plus "can read from it with no independent review" is a third — because that combination lets someone both commit and cover up an action.

An **SoD conflict matrix** lists every sensitive function down one side and across the top, flagging which pairs are toxic. Running a person's actual entitlements against that matrix — ideally as part of the access review process in Lesson 16 — surfaces violations that nobody designed on purpose but that accumulated anyway, often through the same permission-creep pattern described in Lesson 14.

## Key terms

| Term | Meaning |
|---|---|
| Segregation of duties (SoD) | Splitting a sensitive process across multiple people so no single person can complete it alone |
| Toxic combination | A specific pair of permissions or functions that should never be held by the same person |
| SoD conflict matrix | A reference table listing sensitive functions and flagging which pairs are toxic when combined |
| Collusion | Two or more people cooperating to defeat a control — the higher bar SoD is designed to require |

## Lab

Pick a process you're familiar with — an expense reimbursement, a code deployment, a vendor onboarding, even a household bill payment. Break it into its distinct steps (request, approve, execute, record). For each pair of steps, ask: if the same person did both, could they cause harm with no independent check? Any "yes" is a toxic combination in that process.

## Check yourself

- Why does segregation of duties matter even when every individual permission involved is fully justified on its own?
- Using the access-governance roles from Lesson 12, explain why letting the same person be both requester and approver is an SoD violation.
