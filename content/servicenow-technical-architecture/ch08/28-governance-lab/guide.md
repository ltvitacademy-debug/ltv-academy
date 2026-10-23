# Lesson 28 — Governance Lab

**Chapter 8 · Governance & Multi-Department Implementation Strategy · Lesson 28 of 32**

## What you'll learn

- How to apply Lessons 25 through 27 together against one real, multi-department rollout
- How to choose a governance model when departments genuinely need different levels of control, not just different preferences
- How to sequence a pilot and draw the shared-versus-department-specific line for a real capability
- What a finished executive presentation of a governance tradeoff actually looks like, end to end

## The scenario

A company is rolling out a new Employee Service Center — a single front door for employees to request anything from a new laptop to a policy exception — across eight departments. Two of them anchor the real tension: **Finance** needs every request to pass through a tight, auditable approval chain before anything ships, because several request types touch regulated spend. **Marketing** wants fast, near-frictionless self-service, because its request volume is high and its approval needs are genuinely minimal. Both departments are funding the rollout. Neither want is wrong. You're the Technical Architect asked to make this real. Walk through the four steps below.

## Step 1 — Choose the governance model

Lesson 25's choice is the first decision, and it isn't close here: **federated governance with strong shared guardrails**. Centralized governance would force Finance's heavy approval chain and Marketing's lightweight flow through the same single review queue, which either over-controls Marketing or under-controls Finance — there's no one setting that's correct for both. Federation lets each department configure its own approval behavior inside a shared platform, provided the real guardrails from Lesson 25 are actively enforced: one naming convention across all eight departments' request types, mandatory code review on every department's customization, and a shared component library so nobody rebuilds the base intake experience from scratch.

## Step 2 — Sequence the pilot

Lesson 26's sequencing rule applies directly: pilot the department with the clearest, most contained use case, not the biggest department. That's Marketing, not Finance. Marketing's near-frictionless, low-approval-complexity flow is the simplest real test of the shared base, and a clean pilot win there builds the organizational confidence that makes Finance's harder, higher-stakes rollout land smoothly afterward — rather than asking the organization's most risk-sensitive department to be the first to trust an unproven capability.

## Step 3 — Draw the shared-versus-specific line

The base request-intake experience — the form, the underlying data model, the notification framework — is built once as the shared, platform-wide piece every department uses in the same shape. Approval routing is where departments genuinely differ, so it's built as a department-specific extension: Marketing's extension routes most requests straight through with no approval step; Finance's extension adds the multi-step, auditable approval chain its compliance need actually requires. Neither department forks the shared intake experience to get there.

## Step 4 — Present the tradeoff to the CFO and department heads

Lesson 27's translation work closes the loop. The pitch to the CFO and department heads isn't "federated governance with department-specific approval extensions" — it's: *"Every department gets a request experience built once, so you're not paying to build eight separate systems. Marketing gets speed because its real risk is low; Finance keeps the tight approval chain its compliance need actually requires. A small shared platform team keeps naming and review standards consistent across all eight, so nothing gets rebuilt from scratch twice."* Same decision, same real cost and risk — framed in terms the room holding the budget can actually evaluate and defend later.

## Key terms

| Term | Meaning |
|---|---|
| Governance fit | Choosing centralized or federated governance based on whether departments' real control needs are genuinely different, not just preferences |
| Contained pilot | The department chosen to launch first because its use case is simplest, building confidence before the harder departments follow |
| Shared intake, specific routing | A pattern where the base experience is built once and approval logic is built per department on top of it |
| Executive framing | Presenting the same real tradeoff in cost, risk, and timeline terms a budget-holding audience can evaluate |

## Check yourself

Why does piloting with Finance instead of Marketing — even though Finance is funding a larger share of the rollout — actually increase the risk that the whole Employee Service Center initiative stalls before Marketing ever gets to use it?
