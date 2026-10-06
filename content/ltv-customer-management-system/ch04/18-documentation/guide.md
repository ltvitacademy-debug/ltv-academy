# Lesson 18 — Documentation

**Chapter 4 · Analytics and Delivery · Lesson 18 of 20**

## What you'll learn

- What a real handoff document contains, and why it's different from the
  Lesson 1 requirements checklist
- How to structure documentation so a new administrator could pick up
  this org without you in the room
- How to turn the artifacts from every earlier lesson — the data model
  diagram, the security matrix, the test results — into one coherent
  document
- Why documentation is a deliverable of this capstone, not an
  afterthought

## Why this is different from the Lesson 1 checklist

Lesson 1's Definition of Done tracks whether the *build* is finished.
This document is different — it's written for whoever inherits the org
next: a new hire, a consultant picking up the account, or an interviewer
deciding whether you actually understand what you built.

## The handoff document's structure

| Section | What goes in it |
|---|---|
| **1. Overview** | What Cascade is, in two sentences, and what this org does for them — the Lesson 2 summary, condensed |
| **2. Data Model** | The Lesson 3 object-relationship diagram, plus a table of every custom field added across Chapters 2–3, with its purpose |
| **3. Security Model** | The Lesson 11 role hierarchy diagram, the five-profile table, OWD settings, and all three sharing rules with the gap each one closes |
| **4. Automation Inventory** | Every Flow, validation rule, and the approval process, each with: what triggers it, what it does, and why it exists |
| **5. Reports & Dashboards** | The three report folders and what's in each, plus the Executive Dashboard and its running user |
| **6. Sample Data** | What was loaded, in what volumes, and how to reload it safely (Upsert, load order) |
| **7. Test Results** | The Lesson 17 test plan, with pass/fail recorded for every row |
| **8. Known Limitations & Next Steps** | What this build deliberately doesn't cover, and what a Phase 2 might add |

## Section 4 in detail — the automation inventory

This is the section a new administrator reads most carefully, since
automation is the easiest thing to break by accident. Document each item
the same way:

```
Name: New Lead Auto-Assignment
Type: Record-Triggered Flow (Lead, after save)
Trigger: Any new Lead
What it does: Sets Owner to Jordan Kessler;
  creates a follow-up Task due tomorrow
Why: Implements the "Jordan owns every new
  Lead" rule from the Lesson 2 scenario
```

Every Flow, every validation rule, and the approval process gets this
same four-line treatment — name, type/trigger, what it does, why it
exists. A list of automation with no "why" is useless to the next person
who has to decide whether it's safe to change.

## Section 8 — being honest about limitations

A portfolio-ready document names what it didn't do, not just what it
did. For Cascade, that's genuinely useful to write out: no Lightning
Web Components (this build stayed fully declarative), no integration
with an outside ERP or accounting system, and no Apex triggers or Apex
test classes (everything here is point-and-click automation, by design,
matching this capstone's "declarative build" framing from Lesson 1).

## Key terms

| Term | Meaning |
|---|---|
| Handoff document | Documentation written for whoever inherits the org next, not for the person who built it |
| Automation inventory | A structured list of every Flow, validation rule, and approval process, with what it does and why |
| Known limitations | An honest, explicit list of what a build deliberately doesn't cover |

## Lab

Write the full eight-section handoff document for your own build,
pulling directly from the artifacts you already created in Lessons 3,
4, 11–15, and 17. Keep the automation inventory in the four-line format
above for every Flow, validation rule, and the approval process.

## Check yourself

- How is this document different in purpose from the Lesson 1
  requirements checklist?
- What four pieces of information does the automation inventory record
  for each Flow, validation rule, and the approval process?
- Why does Section 8 matter, even though it only lists what *wasn't*
  built?
