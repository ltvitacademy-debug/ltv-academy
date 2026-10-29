# Lesson 32 — Chapter Capstone: AI Security Engineering Review

**Chapter 8 · Capstone: Securing an AI Application End to End · Lesson 32 of 32**

## What you'll learn

- How every chapter of this course — fundamentals, prompt injection, data poisoning, model
  extraction, adversarial examples, architecture, and governance — showed up in this capstone's
  three lessons, not just the architecture chapter
- Why ProcureAssist's failure in Lesson 31 traces back to specific earlier lessons, not just "AI is
  risky"
- Where this course sits among the four Expert Specialization courses in this path, and what that
  actually means for what comes next
- Why this is the last course-wide review before you choose your next Expert Specialization course

## The whole course, not just this chapter

**Chapter 1** set the vocabulary this capstone used without re-explaining it: the OWASP Top 10 for
LLM Applications is the exact framework Lesson 29's finding and Lesson 30's checklist map back to,
and the NIST AI RMF's govern-map-measure-manage structure is the shape the Lesson 30 checklist
itself follows, even though no lesson here paused to redefine either one. **Chapter 2** is the
most direct ancestor of everything in this capstone — direct and indirect prompt injection, and the
idea that input sanitization alone isn't a sufficient defense, is exactly what Lesson 29 tested for
and exactly what ProcureAssist lacked in Lesson 31.

## Poisoning, extraction, and adversarial examples, still present even off-screen

**Chapter 3**'s data poisoning and supply-chain risk became Category 2 of Lesson 30's checklist —
the capstone's RAG application and agent didn't need a poisoned model to fail, but any AI feature
Larkspur or Vantage ships next still needs that category checked. **Chapter 4**'s model extraction
defenses — rate limiting and query monitoring — became Category 3, a reminder that a feature can
pass every injection test and still leak its model through an unmonitored API. **Chapter 5**'s
adversarial robustness work became Category 4: not every AI feature classifies input, but the ones
that do need the same "fail safe, don't default to allow" instinct this capstone's checklist
requires everywhere else.

## Architecture and governance, doing the most visible work

**Chapter 6** is the chapter this capstone leaned on hardest. Securing a RAG pipeline end to end is
literally Lesson 29's subject. Agent security — tool use and the blast radius of autonomy — is
exactly what went wrong in Lesson 31: ProcureAssist's blast radius included a tool it never should
have reached from a summarization session. Privilege separation and secrets handling, both from
Chapter 6, are the two concrete fixes that close that gap. **Chapter 7**'s red-teaming methodology
is the discipline behind Lesson 29's structured, authorized assessment rather than ad hoc poking,
and its AI-specific threat modeling is the habit of mind that should have flagged ProcureAssist's
single-session design before it ever shipped.

## What this capstone proved

Across four lessons, this course proved a security review of an AI application isn't one activity —
it's an authorized red-team assessment of the retrieval layer, a written checklist spanning every
attack category from injection through architecture, and the discipline to recognize that a model
behaving "correctly" at every step can still produce a real incident if the system around it has no
separation of privilege and no human in the loop for high-impact actions.

## Where this course sits, and what's next

AI Security Engineering & Adversarial AI Defense is one of four **Expert Specialization** courses
in the Cybersecurity Analyst → Security Engineer path, alongside **Digital Forensics & Malware
Analysis**, **Ethical Hacking, Penetration Testing & Purple Team Operations**, and **Enterprise
Security Architecture, GRC & Risk Management**. All four build on the same Advanced Specialization
foundation — identity, cloud security, security automation, and zero-trust architecture — but not
on each other, so they can be taken in **any order** from here. Finishing this course doesn't
point to one fixed "next" course the way earlier stages did; it opens the choice of any of the
other three, depending on which specialization — forensics, offensive security, or governance and
risk — fits where you want to go next.

## Key terms

| Term | Meaning |
|---|---|
| AI security review | A structured process spanning red-teaming, a category-based checklist, and architectural controls — not a single pass/fail test |
| Blast radius | How much damage a single compromised or manipulated agent session or tool call can reach |
| Expert Specialization | This path's final stage: four independent courses buildable on the same Advanced-stage foundation, takeable in any order |
| Fail safe | Defaulting to deny or escalate to a human when a system is uncertain, rather than defaulting to allow |

## Check yourself

Name one decision from this capstone that only worked because of something taught in an **earlier
chapter** of this course, not Chapter 8 itself. What was the decision, and which chapter made it
possible?

## Course complete

AI Security Engineering & Adversarial AI Defense is done: seven chapters covering fundamentals,
prompt injection, data poisoning, model extraction, adversarial examples, application architecture,
and governance and red-teaming, proven on one capstone spanning an authorized RAG assessment, a
shipping checklist, and a real architectural failure analyzed end to end. From here, the Expert
Specialization stage continues with any of the other three courses — Digital Forensics & Malware
Analysis, Ethical Hacking, Penetration Testing & Purple Team Operations, or Enterprise Security
Architecture, GRC & Risk Management — in whichever order fits your goals.
