# Lesson 13 — Security Documentation and Evidence

**Chapter 3 · Security Governance · Lesson 13 of 15**

## What you'll learn

- Why a security design that only lives in an architect's head (or a diagram nobody updates) isn't actually governed
- The difference between documentation written to explain a design and evidence written to prove a control actually operated
- What a data flow diagram is for, specifically, in a security context — not just a general architecture diagram
- How auditors (internal or external, e.g., for SOC 2) actually use this material, so documentation gets written with its real audience in mind

## Documentation explains; evidence proves

These two get bundled together casually, but they answer different questions. **Documentation** explains *what was designed and why* — a data flow diagram, a written description of the access model, the rationale behind choosing deterministic over probabilistic encryption for a specific field. **Evidence** proves *that a control actually operated*, on a specific occasion or continuously over a period — a Health Check score from a specific date, a Setup Audit Trail export showing no unauthorized profile changes in Q3, a signed-off review board checklist for a specific change.

An architecture can be beautifully documented and still fail an audit, because documentation shows intent, not operation. The question "do you have a least-privilege access model?" is answered by documentation. The question "can you prove that access model was actually enforced for the last twelve months?" requires evidence — something that was captured *at the time*, not reconstructed afterward from memory.

## Data flow diagrams, specifically for security

A general architecture diagram shows what systems exist and roughly how they connect. A **data flow diagram**, built for security purposes specifically, needs to show something more precise: where sensitive data enters the system, every boundary it crosses on its way through (tying directly back to Lesson 1), what transforms or touches it at each stage, and where it ultimately lands or leaves the system entirely (an outbound integration, an export, a third-party processor). This is the artifact a reviewer uses to ask "does this diagram account for every boundary this data actually crosses?" — and it's also usually the single most useful document in an actual incident investigation, because it tells a responder where to even start looking.

A data flow diagram that was accurate at launch and never updated is a liability, not an asset — it actively misleads anyone who trusts it during an incident. Keeping it current has to be a defined responsibility (tying back to the classification governance and ownership model this course's sibling courses cover), not a one-time deliverable.

## What audit evidence actually needs to look like

Compliance frameworks like **SOC 2** don't typically ask "do you have good security" in the abstract — they ask for evidence that specific, defined controls operated consistently over a specific period (often a 6–12 month observation window for a SOC 2 Type II report, as opposed to a single point-in-time Type I report). That distinction matters enormously for what has to be captured and retained: a screenshot of today's permission set assignments proves nothing about March. What an auditor actually wants to see is something like: a dated Health Check export from each quarter, a record of every review board sign-off for the period, an export of Setup Audit Trail covering the period showing no unauthorized administrative changes, and documented proof that access reviews (like the periodic classification reviews covered elsewhere in this catalog) actually happened on schedule rather than being a policy that exists only on paper.

## Writing for the actual audience

A design document that only an architect can parse is documentation that fails its own purpose. Security documentation and evidence need to be written assuming the reader is a reviewer, an auditor, or a future architect inheriting the system with none of the current context — which means stating assumptions explicitly, dating every artifact, and keeping evidence captured at the time an event happened rather than reconstructed from memory months later when someone finally asks for it.

## Key terms

| Term | Meaning |
|---|---|
| Documentation | Material explaining what was designed and why |
| Evidence | Material proving a control actually operated, captured at the time, not reconstructed later |
| Data flow diagram (security) | A diagram tracing sensitive data's path, boundaries crossed, and endpoints — used by reviewers and incident responders |
| SOC 2 Type II | An audit standard requiring evidence that controls operated consistently over an observation period, not just at one point in time |

## Lab

Your org is six weeks from a SOC 2 Type II audit covering the last nine months. The auditor asks for evidence that your least-privilege access reviews (Lesson 2) and your security architecture reviews (Lesson 11) actually happened throughout that period. List exactly what artifacts you would need to have been capturing all along to answer this request, and explain what you would have to tell the auditor if those artifacts don't exist because reviews happened informally in verbal conversations with no record kept.

## Check yourself

Can you explain, in one sentence each, the difference between documentation and evidence, and give an example of each that isn't from this lesson? Can you explain why a point-in-time screenshot generally isn't sufficient evidence for a SOC 2 Type II audit covering a multi-month period?
