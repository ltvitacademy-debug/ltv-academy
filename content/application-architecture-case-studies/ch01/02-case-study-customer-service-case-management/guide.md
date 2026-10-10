# Lesson 2 — Case Study: Customer Service Case Management

**Chapter 1 · Application Case Studies · Lesson 2 of 16**

## What you'll learn

- How to decide which Case-routing mechanism fits a support team's actual volume and skill mix
- Why Entitlements and Milestones exist as a separate layer from the Case object itself
- How a Knowledge base changes the shape of a support design, not just its content
- Why "reduce average handle time" is a measurable design goal, not a vague wish

## The scenario: Corvell Appliances

Corvell Appliances runs a 40-agent support team on Service Cloud handling warranty claims, repair scheduling questions, and general product questions across phone, email, and chat. Cases currently sit in a single shared queue that every agent pulls from in order, regardless of what kind of issue it is or which agents are actually good at that kind of issue. Average handle time has crept up for a year, and the support director's ask is blunt: "fix the routing." As with any vague ask, "fix the routing" first needs to become a specific statement of what's actually being routed, by what rule, to whom.

## What's actually wrong with one shared queue

A single first-in-first-out queue treats every Case as interchangeable, which Corvell's Cases are not. A billing-dispute Case needs an agent trained on refund policy; a repair-scheduling Case needs someone who can see technician calendars; a general product question can go to almost anyone. Pulling cases in strict arrival order means a simple product question can sit behind three complex billing disputes, and a case that needs a specialist might land with a generalist who then has to escalate it manually, doubling the handle time for that case.

**Omni-Channel routing** is built for exactly this: it assigns work to agents based on configured routing configurations (skill, queue-based priority, and each agent's current capacity) rather than first-in-first-out order, and it works across the phone, email, and chat channels Corvell already uses. Moving from one shared queue to Omni-Channel with routing configured by issue type and agent skill directly targets the actual mechanism behind the rising handle time — mismatched assignment — rather than Corvell's agents simply "needing to work faster."

## Entitlements and Milestones: a separate layer on top of the Case

Corvell's warranty terms promise a first response within a specific window that varies by product category (appliances still under the manufacturer's warranty get a faster commitment than out-of-warranty repair requests). That's not something the Case object's Status field was built to track on its own — it needs **Entitlements** (which define what level of support a specific customer or product is owed) and **Milestones** (time-based steps within an entitlement process, such as "first response" or "resolution," each with its own target time and an escalation action if it's missed).

The architectural point worth isolating here: entitlements and milestones answer "what is this customer owed and by when," while routing answers "who should work this Case." Corvell's original design conflated the two by trying to express warranty deadlines as a custom field on the Case layout with manual follow-up — which worked until volume grew past what anyone could track by eye. Separating the two concerns means a milestone breach can trigger its own escalation (notify a supervisor, bump Case priority) independent of whatever queue or skill-based routing already assigned the Case to.

## Knowledge changes case shape before it even reaches an agent

Corvell's general product questions make up roughly a third of total case volume, and most of them repeat the same answers. A **Knowledge base**, searchable both by agents (to answer faster) and customers (through a self-service help portal, covered architecturally in the next lesson), doesn't just speed up existing cases — it changes how many cases reach an agent at all, since a well-indexed public Knowledge article can resolve a customer's question before a Case is ever created. Designing Knowledge as part of this redesign, rather than as a separate later project, is what turns "fix the routing" into "reduce the total case volume the routing even has to handle," which is a bigger lever than routing efficiency alone.

## Key terms

| Term | Meaning |
|---|---|
| Omni-Channel routing | Assigns incoming work to agents based on configured skill, priority, and capacity rules, rather than a plain first-in-first-out queue |
| Entitlement | Defines the level of support a specific customer, account, or product is owed |
| Milestone | A time-based step within an entitlement process (e.g., first response, resolution), each with a target time and an escalation if missed |
| Knowledge base | A searchable repository of articles usable by agents and, through self-service, by customers directly |
| Average handle time (AHT) | The average total time an agent spends working a case, from assignment to resolution |

## Lab

Corvell's support director reports that billing-dispute Cases specifically still breach their response-time milestone more often than any other category, even after Omni-Channel routing goes live. Write a short root-cause analysis: list at least two architectural reasons (beyond "agents are slow") a specific case category could keep missing its milestone even with correct routing and entitlements configured, and propose one concrete design change for each reason you name.

## Check yourself

Can you explain why routing and entitlements/milestones are two separate architectural layers, even though both apply to the same Case object? Can you describe one way a Knowledge base changes case volume rather than just case-handling speed?
