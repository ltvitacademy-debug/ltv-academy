# Script — Function Security vs. Data Security

## Segment 1 (title)

Chapter one has previewed this distinction twice already. This lesson covers it properly, because it's the single most useful mental model for diagnosing access problems in the rest of this course.

## Segment 2 (steps)

Function security is a statement of what actions a user can perform, and in which pages. It secures the page itself, buttons and tabs on it, and scheduled processes. Function security privileges are what get granted to duty roles. It answers: can this user open the Create Invoice page, see the Void Payment button, run a given scheduled process. If the answer is no, the user typically can't even reach that screen or control.

## Segment 3 (steps)

Data security is a statement of what action can be taken against which data. It doesn't control whether a page opens — it controls which rows are visible once it's open. A data security policy pairs a condition, like business unit equals US West, with a set of allowed actions, attached to a role. It answers: of all the invoices that exist, which ones can this user actually see.

## Segment 4 (steps)

The two are independent. Pass both, and the user opens the page and sees what they should. Fail function security, and they can't open the page at all — data security never even gets evaluated. Pass function security but fail data security, and you get the classic ticket: I can open the screen, but there's nothing in it. That third case is the most common real complaint, and the most often misdiagnosed — people assume no data means no access, and re-provision a job role that was already correct.

## Segment 5 (outro)

When someone reports an access problem, split it fast: can they reach the page at all? If no, it's function security. If yes but the data's wrong or empty, it's data security. Up next, chapter two and lesson six: data security and data access sets.
