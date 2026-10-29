# Lesson 14 — Security Policy, Standards, and Procedures: The Real Hierarchy

**Chapter 4 · Governance, Risk, and Compliance Programs · Lesson 2 of 4**

## What you'll learn

- Why "policy" isn't just a generic word for "any security document" —
  it's a specific level in a real documentation hierarchy
- What a **standard** adds that a policy deliberately leaves out:
  specific, measurable requirements
- What a **procedure** adds that a standard deliberately leaves out:
  the step-by-step how-to
- Why conflating these three levels — writing a policy that reads like
  a procedure, or a procedure that reads like a vague policy — causes
  real governance problems, not just stylistic ones

## Policy: the what and why

A **policy** states what the organization requires and why, at a
level of abstraction that survives a change of operating system,
vendor, or technology stack. "All production systems storing customer
data must enforce multi-factor authentication for privileged access"
is a policy statement. It doesn't name a specific MFA product, a
specific token length, or a specific vendor — doing so would mean
rewriting the policy every time the organization changed tools. Policies
are set and approved at the top: executive leadership, often with
board sponsorship for the highest-level ones, because a policy is
where the organization formally commits to a requirement and accepts
accountability for it. Policies change rarely — maybe once every year
or two — because changing one is a governance event, not a routine
edit.

## Standards: specific, measurable requirements

A **standard** translates a policy's "what and why" into something
concrete enough to actually test compliance against. Where the policy
said "enforce MFA for privileged access," a standard says "privileged
accounts must use a FIDO2 hardware token or an authenticator app;
SMS-based MFA is not acceptable; session timeout is 15 minutes of
inactivity." That's specific and measurable — an auditor, or an
automated control check, can verify whether a given account actually
meets it. Standards are owned by security leadership rather than the
board, and they change more often than policy, because a standard
needs to track what's actually achievable with current technology.

## Procedures: the step-by-step how-to

A **procedure** is the how-to: the exact sequence of steps a person
or a script follows to meet a standard. "To enroll a privileged
account in hardware-token MFA: open the identity provider admin
console, navigate to the user's MFA settings, select 'Add method,'
choose FIDO2, and have the user register their token within 10
minutes before the enrollment link expires" is a procedure. Procedures
are owned by the team that actually executes them, and they change the
most often of the three, because they track the literal clicks in a
specific tool's current interface.

## Why conflating the levels causes real problems

When these levels get mixed together, governance breaks down in
predictable ways. A policy written at procedure-level detail goes
stale the moment the organization switches identity providers —
and because a policy change is a governance event requiring executive
re-approval, that staleness often just gets ignored, which quietly
erodes the credibility of every other policy. A standard written at
policy-level vagueness ("use strong authentication") can't actually be
audited, so compliance reporting against it becomes a judgment call
instead of a measurement. A procedure written at policy-level
abstraction leaves the team executing it to improvise the actual
steps — which means two people doing "the same" task produce two
different outcomes, and nobody can say which one was correct.

## Key terms

| Term | Meaning |
|---|---|
| Policy | The "what and why," approved at the executive/board level; changes rarely because a change is a governance event |
| Standard | Specific, measurable requirements that translate a policy into something testable; owned by security leadership |
| Procedure | The step-by-step how-to for meeting a standard; owned by the executing team; changes most often |
| Governance event | A change requiring formal re-approval at the appropriate level — true of policy changes, not of routine procedure edits |

## Check yourself

You're ready for Lesson 15 when you can explain, without looking: why
is "use strong authentication" the wrong level of detail for a
standard, and what specifically goes wrong when a procedure is written
with policy-level vagueness instead of concrete steps?
