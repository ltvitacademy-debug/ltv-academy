# Lesson 22 — Capstone Wrap-Up & Portfolio Packaging

**Chapter 6 · Capstone: Wrap-Up & Presentation · Lesson 22 of 26**

## What you'll learn

- Why this finished capstone is the flagship piece Chapter 3, Lesson 11 told you to go build —
  closing that loop explicitly, component by component
- How to write this specific project's business problem, in the plain language Lesson 11 required
- How this chapter's own ADRs — the category compromise, the Prairie View integration, the
  approval-subflow revision — fill in Lesson 11's "design decisions and why" component for real
- An honest answer to Lesson 11's hardest component: what you'd do differently if this were an
  actual 5,000-employee rollout instead of a course capstone
- What closing this workstream actually hands you heading into Chapter 7's interview preparation

## The loop Lesson 11 told you to close

Chapter 3, Lesson 11 taught a four-part structure for documenting any project — the business
problem, the design decisions and why, what was actually built, and what you'd do differently at
scale — and said plainly that you were about to build a capstone of your own to apply it to,
starting in Chapter 4. That capstone is now finished: requirements gathered, scope decided, service
workflows and a real integration built, tested against both the clean path and a genuine edge case,
documented, presented, defended, and revised against a specific peer-review finding. This lesson
closes the loop Lesson 11 opened — filling in all four components with this exact project, not a
hypothetical one.

## Component one: the business problem, stated plainly

Not "built a Flow Designer flow and a REST integration." The real version: three hospital systems
consolidating into Meridian Health Network had no shared way to log or route an IT help-desk
ticket, each running a different process its own staff had built real trust in, and the board
needed one unified Service Desk live within an eighteen-month window without breaking that trust
or any one system's existing reporting.

## Component two: the design decisions and why — your own ADRs

This is the component Lesson 11 said most candidates skip, and this capstone has three real ones
written along the way, not reconstructed afterward. The category conflict between all three systems
got resolved as a two-layer shared-top/domain-subcategory model, not a win for whichever system
asked loudest. The Prairie View integration chose a fifteen-minute scheduled pull over forcing a new
webhook build or a manual CSV process, accepting a named staleness window as the honest cost.
The approval subflow's fail-closed design was revised, after a specific peer-review finding, to add
a visible escalation path instead of a silent stop. Three decisions, three real alternatives named,
three honest tradeoffs — exactly the discipline course 13's ADR habit, and Lesson 11, both asked for.

## Component three: what was actually built — briefly

A shared service catalog front door with two catalog items; one domain-aware Flow Designer flow
routing requests to the correct hospital system's assignment group, with a reusable, domain-checked
approval subflow for Access requests; a scheduled Prairie View worker sync upserting into `sys_user`,
coalesced on employee ID and domain-tagged on every run; a three-category test plan that found and
fixed a real domain-tagging defect; and a go-live checklist, a domain-scoped rollback plan, and this
chapter's board presentation and panel defense. Lesson 11 was right that this component matters
least in the write-up — it's the part an interviewer can often see for themselves.

## Component four: the honest answer about scale

This capstone built and tested Phase 1 against realistic scenarios, not against 5,000 real
concurrent users, three real payroll-grade HR systems, or a real change-advisory board. At real
scale, the fifteen-minute Prairie View sync would need load-testing against actual ticket volume
during a shift change, not just a single test case; St. Catherine's Workday integration and
Lakeshore's ADP integration — deliberately deferred to the same template in Lesson 16 — would need
to actually get built, not just proven against the hardest case; and the escalation group added in
Lesson 21 would need a real staffing plan, not just a routing destination. Naming these limits
honestly is a stronger answer than pretending a course capstone was already production-ready.

## What this hands you next

A fully packaged, four-component portfolio document, built the way Lesson 11 described — written
as you went, not reconstructed from memory under interview pressure. Chapter 7 picks up from here
with the other half of the job search: how the interviews themselves actually run.

## Key terms

| Term | Meaning |
|---|---|
| Flagship portfolio piece | The single project a candidate can talk through unprompted, documented in full, not just demoed |
| Written-as-you-go ADR | A decision record captured while the reasoning is still fresh, the same discipline course 13 and Lesson 11 both taught |
| Scale limitation | An honest, specific statement of what a course-scale build doesn't prove, and what real deployment would require |
| Closing the loop | Applying an earlier lesson's framework to a project that didn't exist yet when that lesson was taught |

## Check yourself

Lesson 11 asked you to check whether any of your four written components was secretly just a
restatement of "what was built." Looking at this lesson's four components for the Meridian
capstone, which one would be easiest to accidentally flatten into a feature list if you got lazy
writing it up, and what would you say instead to keep it genuinely distinct?
