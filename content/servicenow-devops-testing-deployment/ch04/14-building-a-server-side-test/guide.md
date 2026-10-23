# Lesson 14 — Building a Server-Side Test

**Chapter 4 · Automated Test Framework (ATF) · Lesson 14 of 26**

## What you'll learn

- How a server-side Test differs structurally from the UI Test built in Lesson 13
- The real step types that exercise logic directly, bypassing the form entirely
- How a server-side Test validates a Script Include's return value
- How a server-side Test validates a GlideRecord created or modified by server logic
- Why UI Tests and server-side Tests catch genuinely different categories of bug

## Testing the logic, not the form

Lesson 13's UI Test simulated a user clicking through an actual form — opening it, filling it in,
submitting it, and checking the result. A server-side Test skips all of that. Instead of
interacting with the interface at all, its Test Steps call into server-side logic directly: running
a specific method on a Script Include, or creating and modifying a record through GlideRecord, and
then checking what came back. There's no form rendering, no field visibility to account for, no
page to wait on. A server-side Test runs faster than a UI Test for exactly that reason — it's
testing the logic in isolation, the same logic a UI Test would otherwise have to reach indirectly
by going through a whole form first.

## Validating a Script Include's return value

Course 6 built reusable, class-based Script Includes as the single source of truth for a piece of
server logic — called from a Business Rule, a Client Script, or anywhere else that needs the same
answer, instead of duplicating the same query in multiple places. A server-side Test Step can call
one of those methods directly and check what it returns. Conceptually: call a specific method on a
specific Script Include, pass it a known input, and assert that the value it returns matches what's
expected for that input. If the Script Include's logic ever changes in a way that breaks its
contract — returning the wrong answer for an input it used to handle correctly — this kind of Test
Step catches it immediately, without needing to reconstruct the exact form interaction that would
have eventually surfaced the same bug.

## Validating a record's resulting state

The other common server-side Test Step works through GlideRecord directly: create a new record, or
modify an existing one, exactly the way a Business Rule or Script Include would encounter it, and
then check the resulting record's state. Course 6 covered before-insert Business Rules that enforce
rules server-side — a before-insert Business Rule that's supposed to abort an insert under specific
conditions, for instance. A server-side Test Step can create a record under those exact conditions
and verify that the insert was actually aborted, or that a specific field ended up with the correct
value after the Business Rule ran — confirming the server-side logic behaved correctly, with
nothing about the UI involved.

## Why both layers matter, independently

A UI Test and a server-side Test are not two ways of testing the same thing — they test two
genuinely different layers, and a bug can live in either one without affecting the other. A UI
Test confirms the end-user *experience* works: the right field is visible, the right message
appears, the form behaves the way Lesson 13 described. A server-side Test confirms the underlying
*logic* works: the Script Include returns the right value, the Business Rule enforces the right
rule, independent of whatever form eventually calls it. It's entirely possible for a Script
Include's logic to be completely correct while a UI Policy on the form that calls it is broken —
a server-side Test would pass while only a UI Test would catch that. It's just as possible for a
form to look and behave perfectly while the Script Include behind it silently returns the wrong
answer — a UI Test might not even notice, if the form's own validation happens to mask the bad
value. Real ATF coverage for anything non-trivial uses both layers, each catching what the other
structurally cannot.

## Key terms

| Term | Meaning |
|---|---|
| Server-side Test | A Test whose steps exercise logic directly — a Script Include method or a GlideRecord operation — with no UI involved |
| Script Include validation | A Test Step that calls a specific method and asserts its return value matches an expected result |
| Record-state validation | A Test Step that creates or modifies a record and checks the resulting record's state |
| Contract | The expected input/output behavior of a piece of logic — what a Test Step actually checks for |

## Check yourself

Without looking back: describe a scenario where a server-side Test would pass but a UI Test on the
same feature would fail, and a second scenario where the reverse is true.
