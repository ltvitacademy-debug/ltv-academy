# Lesson 15 — Performance Review Checklist

**Chapter 3 · Fixing Performance · Lesson 15 of 16**

## What you'll learn

- A consolidated checklist pulling together every lesson in this course into one review tool
- How to use it both proactively (reviewing a design before it ships) and reactively (diagnosing a live issue)
- Why a checklist is a starting discipline, not a substitute for understanding the concepts behind each item
- How a Technical Architect uses this kind of checklist in a solution or code review

## Why a checklist, now, at the end of the course

Every item below was taught in depth earlier in this course — this lesson's job is to compress all of it into a single pass-through list usable in an actual design review or code review, where there usually isn't time to re-derive each concept from scratch. A checklist is only as good as the understanding behind it: ticking a box without knowing why the item matters is how a checklist becomes theater instead of a real safeguard. Use this list as a retrieval aid for concepts you've already learned, not as a replacement for having learned them.

## The checklist

**Bulkification (Lesson 3)**
- [ ] No SOQL query inside a per-record loop
- [ ] No DML statement inside a per-record loop
- [ ] Any helper method that might process a collection takes that collection as its parameter, not a single record

**Query optimization (Lesson 4)**
- [ ] Every WHERE clause filter is selective (checked against the standard/custom index thresholds, or verified with the Query Plan tool), not relying on `!=`, a leading wildcard, or a function wrapping the field
- [ ] SELECT lists name only the fields and relationships actually used downstream (Lesson 13)

**Transaction boundaries (Lesson 5)**
- [ ] The review accounts for other automation (other triggers, Flows, workflow rules) on the same object and related objects, not just the code under review in isolation
- [ ] Work that doesn't need an immediate answer is considered for asynchronous Apex instead of the synchronous transaction

**Scalability (Lesson 6)**
- [ ] The design has been considered against a future data volume, not just today's volume
- [ ] No design concentrates records on a single "catch-all" owner or parent by construction

**Trigger and Flow hygiene (Lesson 11)**
- [ ] Exactly one trigger per object, delegating to a handler class
- [ ] A recursion guard exists wherever a trigger might update its own object
- [ ] Any Flow loop has its Get/Create/Update Records elements moved outside the loop, not inside it

**Caching (Lesson 12)**
- [ ] Data that's expensive to produce, shared across users, and changes rarely is a candidate for Platform Cache
- [ ] Any cache read includes a safe cache-miss fallback

**Data volume (Lesson 13)**
- [ ] No unnecessarily large chunk of work is forced through a single transaction when deliberate chunking (e.g., Batch Apex) would fit better

**Diagnosis readiness (Lessons 7-10)**
- [ ] If something does go wrong in production, there's a way to capture a debug log or pull Event Monitoring data for the specific failing scenario, not just a vague bug report to work from

## Using it proactively versus reactively

Used proactively, during a design or code review before anything ships, this checklist is a structured way to ask "what will break at scale" before a client's users find out the hard way. Used reactively, during an active incident, it's a fast way to generate the Lesson 10 troubleshooting method's hypothesis list — instead of staring at a stack trace cold, you have eight specific categories of known anti-pattern to check against the evidence you've gathered.

## Key terms

| Term | Meaning |
|---|---|
| Design review | A proactive check of a solution before it ships, using known anti-patterns as a guide |
| Code review | A review of already-written code against the same known-anti-pattern checklist |
| Checklist discipline | Using a compressed list of known risks as a retrieval aid, grounded in real understanding, not a mechanical substitute for it |

## Lab

Take the "before" trigger from Lesson 3 (the non-bulkified `AccountTrigger` that queries Contacts per Account) and run it against this lesson's full checklist as if you were reviewing someone else's pull request. Write down every checklist item it fails, not just the one it was originally written to demonstrate — you should find it also has implications for the "transaction boundaries" and "diagnosis readiness" sections, not just "bulkification."

## Check yourself

Can you name, from memory, at least six of the eight checklist categories? Can you explain, in your own words, the difference between using this checklist proactively in a design review versus reactively during a live incident? Can you explain why a checklist without underlying understanding is "theater" rather than a real safeguard?
