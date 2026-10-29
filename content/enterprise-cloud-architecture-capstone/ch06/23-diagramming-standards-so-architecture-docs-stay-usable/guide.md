# Lesson 23 — Diagramming Standards So Architecture Docs Stay Usable

**Chapter 6 · Architecture Decision Records and Documentation · Lesson 3 of 4**

## What you'll learn

- The four C4 model levels, and which ones an architecture document
  actually needs
- Standard notation for trust boundaries and data flow, so a diagram
  reads the same way to every engineer who opens it
- Why mixing icon sets and abstraction levels on one diagram is what
  actually breaks documentation as a team grows
- A practical rule for which level of detail belongs in which diagram

## Why diagrams need standards at all

A written ADR explains one decision. A diagram is different — it's
usually the first thing a new engineer, or an outside reviewer, looks
at to understand the *shape* of a system before reading any of the
decisions behind it. That only works if the diagram follows notation
the reader already recognizes. A diagram invented fresh for every
document, with its own ad-hoc shapes and colors, forces every reader
to relearn a visual language before they can learn anything about the
system. Standard notation is what lets a diagram be read in seconds
instead of studied for ten minutes.

## The C4 model levels

Simon Brown's C4 model gives architecture diagrams four nested levels
of abstraction, each answering a different question:

- **Context** — the whole system as a single box, showing the people
  and other systems around it. Answers "what is this, and who or what
  talks to it?" This is the diagram you'd put in front of a
  non-technical stakeholder.
- **Container** — the system broken into its deployable pieces (an
  API, a database, a queue, a frontend). Answers "what are the major
  moving parts, and how do they talk to each other?" This is the level
  most enterprise architecture documentation actually lives at — it's
  detailed enough to be useful and abstract enough to stay stable.
- **Component** — one container broken into its internal modules.
  Answers "how is this one piece actually built?" Useful inside a
  single team's design doc, rarely useful in a cross-team architecture
  review.
- **Code** — class or function-level detail. C4 itself treats this
  level as something a UML tool or the IDE generates on demand, not
  something you hand-draw and maintain.

The practical rule for this capstone's documentation: most ADRs and
review diagrams should live at Context or Container level. If you find
yourself drawing Component-level detail into a document meant for a
cross-team review, that's usually a sign the diagram is trying to do
two jobs at once — pull the Component detail into its own, separately
maintained diagram instead.

## Trust boundaries and data flow

Two notational conventions matter more than any specific shape library:

- **Trust boundaries.** A dashed rectangle drawn around a zone where
  everything inside shares the same level of trust — a VNet, an
  account, a subnet behind a firewall. Anything a data-flow arrow
  crosses *out of* a trust boundary is a point worth a reviewer's
  attention; anything that stays inside one usually isn't. This is the
  same convention threat-modeling diagrams use, and reusing it means a
  security reviewer can read your architecture diagram without
  learning a new notation first.
- **Data flow.** A solid arrow, labeled with what's actually moving
  and how (`HTTPS`, `gRPC`, `JDBC`) and pointed in the real direction
  of the request or data, not just "these two things are connected."
  An unlabeled line tells a reviewer nothing about whether a boundary
  crossing is encrypted, authenticated, or even expected.

## One icon set, matched to the level

Pick one official icon set per diagram — the Azure Architecture Icons
set or the AWS Architecture Icons set — and don't mix a resource icon
from one provider's set with a generic rectangle for another. A
diagram that's half official icons and half ad-hoc boxes forces the
reader to guess whether the difference in rendering means something or
is just inconsistency. The same applies to abstraction level: don't
drop one deeply-zoomed box (an individual VM) into an otherwise
Container-level diagram — either zoom the whole diagram in, or pull
that one piece of detail into its own diagram and link to it.

## Why this actually matters as a team grows

With three engineers who were all in the original design meeting, an
inconsistent diagram still works, because everyone can fill in the
gaps from memory. That stops being true the moment the team doubles,
or a new reviewer who wasn't in the room opens the document cold. The
diagramming standards in this lesson aren't aesthetic preferences —
they're what keeps a diagram legible to a reader who has no other
context to fall back on, which is the exact same problem Lesson 21
described for written decisions.

## Key terms

| Term | Meaning |
|---|---|
| C4 model | Simon Brown's four nested levels of architecture diagram abstraction: Context, Container, Component, Code |
| Context level | The whole system as one box, showing the people and systems around it |
| Container level | The system's major deployable pieces and how they communicate; where most architecture docs should live |
| Trust boundary | A dashed boundary around a zone sharing one level of trust; crossings are what a reviewer should scrutinize |
| Data flow arrow | A labeled, directional line showing what's moving between two components and over what protocol |

## Check yourself

You're ready for Lesson 24 when you can explain, without looking: which
C4 level should most cross-team architecture diagrams live at, and why
does mixing icon sets or abstraction levels on one diagram make it
harder to read rather than just less pretty?
