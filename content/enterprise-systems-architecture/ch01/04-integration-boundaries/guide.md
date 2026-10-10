# Lesson 4 — Integration Boundaries

**Chapter 1 · Salesforce in the Enterprise · Lesson 4 of 22**

## What you'll learn

- What an integration boundary is and why drawing it clearly is a System Architect's core responsibility
- The six integration patterns Salesforce's own architecture guidance groups enterprise integrations into
- Why the business requirement has to be chosen before the technology that implements it
- How a poorly drawn boundary leads to either duplicated systems of record or tangled point-to-point spaghetti

## What a boundary actually is

An **integration boundary** is the explicit line that says: this system is responsible for this, that system is responsible for that, and here is exactly how data crosses between them. It isn't a technical artifact so much as a decision — a statement of ownership and responsibility that technology then has to implement faithfully. Drawing boundaries clearly is what keeps an enterprise's systems landscape from turning into either of its two failure modes: systems that silently duplicate each other's data with no coordination, or systems wired together with so many ad-hoc point-to-point connections that nobody can describe the whole picture anymore.

## Six patterns, three categories

Salesforce's own architecture guidance organizes enterprise integration into six recurring patterns, grouped into three categories. Knowing the names and shapes of these patterns matters because they give you a shared vocabulary for describing what an integration boundary actually does, instead of reinventing the description from scratch every time.

**Remote process invocation** (the org calls another system to do something):
- **Request and Reply.** Salesforce invokes a process on a remote system, waits for it to finish, and updates its own state based on the response — a synchronous pattern, used when the org genuinely needs to know the outcome before moving on, such as waiting to confirm a payment authorization succeeded.
- **Fire and Forget.** Salesforce sends a request and moves on without waiting for or tracking a response; the remote system takes over from there. Useful when the org doesn't need to block on the outcome, such as kicking off order creation in an external ERP, but it requires its own reliability plan since the sender doesn't know if the message actually got through.

**Remote call-in** (another system calls into Salesforce):
- **Remote Call-In.** An external system initiates the call and reads, creates, updates, or deletes Salesforce records through the platform's own APIs — for example, an ERP pushing a new order into Salesforce, or a marketing platform updating a lead score.

**Data synchronization and UI patterns:**
- **Batch Data Synchronization.** Records on both sides are created or refreshed in bulk, on a schedule, in either direction — the typical shape of a nightly account sync between Salesforce and an ERP.
- **UI Update Based on Data Changes.** Keeps the Salesforce interface current when underlying data changes elsewhere, which matters most for users (like service agents) who need to see fresh information without manually refreshing.
- **Data Virtualization.** Salesforce reads external data live, at query time, rather than storing its own copy — avoiding reconciliation work entirely by never actually owning a second copy of the data.

## Requirement first, technology second

A recurring mistake is picking an integration technology before the business requirement is actually understood. The discipline this course teaches is: identify which of the six patterns the business need actually matches, and only then choose the Salesforce technology (Platform Events, Bulk API, Salesforce Connect, a middleware platform, and so on) that implements that pattern well. Picking the pattern backward from a favorite tool tends to produce integrations that are technically impressive and operationally wrong — real-time infrastructure built for a need that was actually a nightly batch, or a slow synchronous call-and-wait built for something that should have fired and moved on.

## Key terms

| Term | Meaning |
|---|---|
| Integration boundary | The explicit line defining which system owns what, and exactly how data crosses between systems |
| Request and Reply | A synchronous remote-invocation pattern where the caller waits for the remote system's response |
| Fire and Forget | An asynchronous remote-invocation pattern where the caller doesn't wait for or track the outcome |
| Remote Call-In | A pattern where an external system initiates the call into Salesforce via its APIs |
| Batch Data Synchronization | Bulk, scheduled record creation or refresh on both sides of an integration |
| Data Virtualization | Reading external data live at query time instead of storing a local copy |

## Lab

Take the ERP-and-Salesforce order scenario: a sales rep closes an opportunity in Salesforce, and the order needs to appear in the ERP so fulfillment can begin. Decide which of the six integration patterns best fits this specific requirement, and justify your choice in two or three sentences. Then describe one way this same scenario would go wrong if the architect instead picked Request and Reply for a step where Fire and Forget was actually appropriate.

## Check yourself

Can you name all six integration patterns and briefly describe what each one does? Can you explain why choosing the pattern from the business requirement, rather than from a favorite integration technology, matters?

Sources: [Integration Patterns Overview](https://architect.salesforce.com/fundamentals/integration-patterns)
