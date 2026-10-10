# Lesson 23 — Sharing Architecture Review Board Practice

**Chapter 4 · Review and Practice · Lesson 23 of 24**

## What you'll learn

- How the real Salesforce Certified Technical Architect (CTA) review board is structured, and why sharing and visibility is one of its named domains
- Why the board scores reasoning and trade-off justification, not a single "correct" design
- A mock review scenario built on this course's own case-study pattern, presented and defended
- Five realistic panel follow-up questions with model answers, covering the rubric areas a real board probes

## Why this course ends here

This entire course is named after one of the real, individually-certifiable domains a Salesforce architect has to master: **Sharing and Visibility Designer** is one of the prerequisite certifications candidates must already hold before Salesforce will let them sit the **CTA review board** — the panel exam at the top of the architect track, alongside Data Architecture and Management, Integration Architecture, Identity and Access Management, and Development Lifecycle and Deployment. The review board doesn't re-test any one of those domains in isolation, though; it hands candidates a single, open-ended customer scenario and expects them to design and defend a solution that touches all of them at once — which is exactly why a sharing-model decision rarely shows up alone in a real review. It shows up tangled into the data model, the integration pattern, and the security story, all in the same breath.

## How the real review board works

Candidates receive a hypothetical business scenario in advance and prepare a proposed architecture. In the board itself, they present that design to a panel of CTA-certified judges, then face an extended round of Q&A where the panel challenges assumptions, asks "what if" variations on the scenario, and pushes on whichever part of the design seems weakest. Publicly, Salesforce and the architect community describe the panel's scoring as rubric-based across the architecture domains above, and explicitly **not** looking for one memorized "right" design — a candidate who proposes a reasonable design, explains the trade-offs honestly, and adapts cleanly when the panel introduces a new constraint typically fares better than one who defends an original answer rigidly once a flaw is pointed out. That philosophy is worth internalizing well before anyone sits a real board: in sharing-model design specifically, "it depends, and here's what it depends on" is frequently the strongest possible answer.

## Mock scenario: present and defend

**Scenario, presented to you as the candidate:** A logistics company is rolling out Salesforce to 2,000 dispatch and account-management users across 12 regional hubs. Opportunities are Private by OWD; each hub's dispatch manager needs to see every Opportunity in their hub regardless of which account executive owns it, and a small compliance team needs read-only visibility into Opportunities flagged as involving hazardous-materials contracts, across every hub, without seeing anything else.

**Your proposed design:** Hub-based roles under a regional-manager tier in the role hierarchy (dispatch managers see their hub via "Role and Subordinates"); a criteria-based sharing rule granting the compliance public group Read access to Opportunities where a Hazmat Contract checkbox is true, independent of hub or owner.

Below are five follow-up questions a real panel would plausibly ask next, with model answers in the reasoning the board is listening for.

**1. "Why role hierarchy for the hub structure instead of public groups and sharing rules?"**
*Model answer:* Hub assignment mirrors an actual management relationship — dispatch managers supervise their hub's account executives — so role hierarchy expresses that correctly and for free, with no extra rule to maintain. A sharing rule would work too, but it would be modeling an org-chart fact with a tool meant for cross-cutting exceptions.

**2. "What happens to the compliance team's visibility if a Hazmat Contract Opportunity is reassigned to a different owner mid-deal?"**
*Model answer:* Criteria-based sharing rules re-evaluate on the criteria field, not the owner, so the compliance group's access is unaffected by reassignment — this is precisely why a criteria rule, not an owner-based rule, was chosen for that requirement.

**3. "A hub expects to split into two next year. What breaks?"**
*Model answer:* Nothing in the compliance rule breaks, since it isn't hub-aware. The role hierarchy needs a new role created and the relevant account executives reassigned — a real but contained change, and worth naming as a known, bounded cost of this design rather than claiming the design is change-proof.

**4. "Why not just set Opportunity OWD to Public Read Only and skip the role hierarchy work entirely?"**
*Model answer:* That would give every account executive visibility into every other hub's deals, which the scenario never asked for and which widens exposure of pricing and customer information with no business justification — Private plus a narrow, intentional grant is the tighter design for a dataset this sensitive.

**5. "How would you prove, a year from now, that no one outside compliance can see hazmat deals?"**
*Model answer:* Point to the sharing rule itself as the enforcement mechanism, and to Setup Audit Trail (Lesson 21) as the audit evidence — any change to that rule's criteria or membership is logged, attributable, and reviewable on the same cadence as any other sharing-model change.

## Key terms

| Term | Meaning |
|---|---|
| CTA review board | The panel exam atop the Salesforce architect track: present a design to judges, then defend it under extended Q&A |
| Sharing and Visibility Designer | One of the named prerequisite certification domains this course corresponds to |
| Rubric-based, trade-off-aware scoring | The board's scoring philosophy — sound reasoning and adaptability, not one memorized correct design |

## Lab

Pick one of the five panel questions above and, without looking at the model answer, write your own response in two or three sentences. Then compare it against the model answer: does your answer name a concrete mechanism (a rule, a role, an audit tool) the way the model answer does, or does it stay abstract? Revise it once to make it as concrete and defensible as the model answer.

## Check yourself

Why does a real CTA review board panel typically score a candidate higher for openly explaining a trade-off than for defending an original design unchanged after a flaw is pointed out? In the mock scenario above, which of the five follow-up questions would be hardest to answer well if you hadn't thought through the hub-split scenario in advance — and why?
