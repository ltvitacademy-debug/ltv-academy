# Security in Implementation and Testing

This closing lesson steps back from individual mechanics and troubleshooting to place security where it actually sits in a real implementation project: not a task you do once near the end, but a thread that runs through nearly every phase. It also sets up the course that follows, which covers that full project lifecycle in depth.

## What you'll learn

- Where security work shows up across a typical implementation timeline
- Why security design has to start early, not at user acceptance testing
- What a security-specific test cycle actually verifies
- How this course connects to the next one in your path

## Security shows up earlier than most people expect

A common mistake on smaller implementations is treating security as a late-stage task — something to configure once the "real" functional design is finished. In practice, security decisions are embedded in the functional design itself: the business units and ledgers decided during enterprise structure design (an earlier course in this path) directly determine the data access sets and business unit security contexts covered in Chapter 2 of this course. Segregation-of-duties review (Lesson 13) is far cheaper to do during role design than after fifty people have already been provisioned the "wrong" combination of roles.

## Security across the implementation timeline

- **Design phase** — job roles, abstract roles, and any genuinely needed custom roles get mapped against the organization's real structure, following the Lesson 15 approach
- **Configuration phase** — data access sets, business unit assignments, security contexts, and role provisioning rules (role mappings) get built out
- **Testing phase** — covered below
- **Cutover/go-live** — real users get provisioned (ideally through the role mappings already tested, not through last-minute manual grants), and the User and Role Access Audit Report (Lesson 14) is run as a pre-go-live baseline
- **Post-go-live** — recurring access reviews, SoD monitoring, and the troubleshooting method from Lesson 17 as real tickets arrive

## What security testing specifically verifies

A dedicated security test cycle, distinct from functional testing, confirms:

- Each role, once provisioned to a test account, grants exactly the function access expected — no more, no less (using Simulate Navigator and test accounts from Lesson 10)
- Data security policies produce the expected visible rows for each role/context combination
- Role mappings autoprovision and self-request correctly under their intended conditions
- No unapproved segregation-of-duties conflicts exist in the final set of role assignments before go-live

At Castellan Robotics Inc., the implementation team's security test cycle ran in parallel with functional user acceptance testing, using the same test accounts testers were already using — security testing doesn't need to be a separate, siloed exercise if it's planned for from the start.

## Where this course fits in your path

This course has covered the security model end to end: roles, privileges, data security, provisioning, Financials-specific roles, segregation of duties, reporting, and troubleshooting. The next course in the Security & Implementation stage, **Oracle Fusion Implementation Lifecycle**, zooms out to the full project: the implementation phases referenced above, in depth — requirements, configuration workbooks, testing cycles, cutover planning, and go-live support — with security as one thread running through all of it, rather than the sole focus.

## Key terms

| Term | Meaning |
|---|---|
| Security test cycle | A dedicated testing pass verifying function security, data security, provisioning, and SoD before go-live |
| Pre-go-live baseline | An access audit report run before cutover to confirm clean role assignments |

## Recap

Security isn't a late-stage checkbox — it's embedded in design, built out in configuration, verified in a dedicated test cycle, and then maintained through recurring review after go-live. That full project view is exactly where the next course, Oracle Fusion Implementation Lifecycle, picks up.
