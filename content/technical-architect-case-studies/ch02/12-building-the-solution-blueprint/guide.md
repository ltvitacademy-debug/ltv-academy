# Lesson 12 — Building the Solution Blueprint

**Chapter 2 · Working Ambiguous Requirements · Lesson 12 of 21**

## What you'll learn

- The standard set of artifacts a CTA-style solution blueprint is built from
- Why these artifacts need to reference each other, not stand as independent diagrams
- How to build a blueprint from a scenario using the requirements, assumptions, and risk work from Lessons 9–11
- How to apply the full artifact set to one case study end to end

## A blueprint is a set of connected artifacts, not one big diagram

It's tempting to think a solution design comes down to one architecture diagram with boxes and arrows. In practice, a defensible blueprint is a small set of distinct artifacts that each answer a different question, cross-referencing each other rather than duplicating the same picture four times: a **conceptual data model** (what are the things, and how do they relate), an **integration diagram** (what systems exchange what, and how), a **security and sharing model** (who can see and do what, and why), and a **user/access model** (which personas exist, and what's each one's actual access path into the system). A panel reading only the data model should still understand roughly what the integration picture must look like, because the data model names the external systems the integration diagram will detail — that cross-referencing is what turns four separate diagrams into one coherent blueprint.

## Starting from the requirements, assumptions, and risks already on the table

The blueprint isn't built from a blank page — it's the direct output of the work from the last three lessons. Take Lesson 5's Public Sector Case Management scenario as the running example: the extracted requirements (Lesson 9's technique) name three benefit programs, strict need-to-know sharing, cross-program consent, and in-state data residency. The stated assumptions (Lesson 10's technique) might include an assumed caseload size per caseworker and an assumed consent-management maturity level the department currently has. The prioritized risks (Lesson 11's technique) flag the cross-program visibility leak as the highest-priority risk to design against. The blueprint's security/sharing model artifact is where that highest-priority risk gets its direct answer — the restriction rules and cross-program consent gate described in Lesson 5 exist specifically because that risk was flagged as high-priority, not as a generic best practice applied without reason.

## The conceptual data model: things and relationships, not field-level detail

A conceptual data model names the core entities (Case, Program, Household, Consent Record) and how they relate to each other, deliberately leaving out field-level detail that belongs in a lower-level technical design, not a blueprint a panel is evaluating in a presentation. The level of detail that belongs here is "a Case belongs to exactly one Program and references a Household" — not every field on the Case object. Going too deep into field-level detail in a blueprint presentation wastes time that belongs in the security model or the Q&A, and signals that the candidate hasn't distinguished between a blueprint-level artifact and an implementation-level one.

## The integration diagram: systems, direction, and triggering event

An integration diagram for this scenario shows what external or adjacent systems exist (an identity-verification service for portal citizens, perhaps a state-level eligibility-determination system), which direction data flows, and what triggers each flow — a citizen's consent action, a caseworker's record update, a scheduled batch sync. Diagrams that show boxes and arrows without labeling the trigger or the direction look complete but actually answer less than they appear to; a panel question like "what happens if that sync fails halfway through" is unanswerable from a diagram that never said whether the flow was real-time or batch in the first place.

## The security/sharing and user/access models: who, and through what path

The security/sharing model names the organization-wide defaults, the sharing rules or restriction rules, and the specific risk each one is answering — tying directly back to Lesson 11's prioritized risks. The user/access model is a shorter, complementary artifact: for each persona (caseworker, supervisor, citizen applicant), what's their actual path into the system (internal login, Experience Cloud portal with sharing sets) and what does their access look like once they're in. Keeping these as two artifacts rather than one avoids a common blueprint mistake: conflating "what the sharing rules say" with "what a specific persona actually experiences," which are related but answer different questions a panel might ask separately.

## Key terms

| Term | Meaning |
|---|---|
| Solution blueprint | A connected set of artifacts (data model, integration diagram, security/sharing model, user/access model) describing a full design |
| Conceptual data model | Core entities and their relationships, without field-level implementation detail |
| Integration diagram | Systems, data-flow direction, and triggering events for each integration point |
| Security/sharing model | Org-wide defaults, sharing mechanisms, and the specific risk each one addresses |
| User/access model | Each persona's actual path into the system and what their access looks like in practice |

## Lab

Using Lesson 5's Public Sector Case Management scenario and the requirements/assumptions/risks you'd extract from it, sketch the four blueprint artifacts at the level of detail described in this lesson: a conceptual data model (entities and relationships only), an integration diagram (systems, direction, trigger), a security/sharing model tied to the highest-priority risk, and a user/access model for the caseworker, supervisor, and citizen personas.

## Check yourself

Can you name the four standard blueprint artifacts and the distinct question each one answers? Can you explain why the security/sharing model and the user/access model need to be two separate artifacts rather than one?
