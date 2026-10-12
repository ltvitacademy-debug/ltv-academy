# AZ-900 Exam Readiness Checklist

Lesson 18 maps this course's four chapters onto the AZ-900 exam's own four
scored areas. This checklist turns that mapping into something you can
actually work through before sitting the exam — the exam area, the lessons
that cover it, and every lesson's own "Check yourself" question compiled
into one self-test. If you can answer all 18 without looking back at the
guide, you are at the level AZ-900 expects.

## Exam area 1 — Cloud concepts (Chapter 1)

- [ ] **Lesson 1.** Why does shifting infrastructure spending from CapEx to
  OpEx matter to a business, beyond just "it's cheaper"?
- [ ] **Lesson 2.** If a team wants full control over the operating system
  to run a legacy piece of software, which service model do they need, and
  why won't PaaS work for them?
- [ ] **Lesson 3.** What specific kind of failure does spreading a resource
  across multiple availability zones actually protect against, and what
  does it *not* protect against?
- [ ] **Lesson 4.** What is the fastest way to get to a specific resource
  you created last week if you don't remember which menu category it's
  under?
- [ ] **Lesson 5.** If you delete a resource group, what happens to
  everything inside it — and why does that make resource groups useful for
  tearing down a test environment?

## Exam area 2 — Azure architecture and services (Chapter 2)

- [ ] **Lesson 6.** A team needs to run a legacy Windows application that
  requires a specific, older OS configuration — why won't App Service work
  for them, and what should they use instead?
- [ ] **Lesson 7.** A team needs a shared folder that three different
  application servers can all read and write to simultaneously, the way a
  traditional network drive works — which storage service fits, and why
  wouldn't Blob Storage work for this instead?
- [ ] **Lesson 8.** Why is a database server placed in its own subnet inside
  a VNet more secure than one directly reachable from the public internet,
  even before any specific firewall rule is configured?
- [ ] **Lesson 9.** Why is granting a permission to a group instead of
  fifty individual users actually a meaningfully better practice, beyond
  just saving typing?
- [ ] **Lesson 10.** What's the difference between what a metric tells you
  and what a log tells you, and why would you need both instead of just
  one?

## Exam area 3 — Azure management and governance (Chapter 3)

- [ ] **Lesson 11.** What are the three parts of every RBAC role assignment,
  and why does assigning "Contributor" at a resource group scope behave
  differently than assigning it at a subscription scope?
- [ ] **Lesson 12.** When would a reserved instance save money over
  pay-as-you-go, and when would it actually cost more?
- [ ] **Lesson 13.** How is Azure Policy different from RBAC, and why would
  a company apply a policy at the management group level instead of
  subscription by subscription?
- [ ] **Lesson 14.** Why doesn't "our data is on Azure" automatically make a
  company compliant with something like HIPAA or GDPR?

## Exam area 4 — Working knowledge, not directly scored (Chapter 4)

- [ ] **Lesson 15.** What does `az group create --name rg-demo --location
  eastus` actually do, piece by piece, and why does "scriptable" matter
  more than "faster to type"?
- [ ] **Lesson 16.** What's the actual relationship between Bicep and an ARM
  template — are they two different systems, or the same thing written two
  different ways?
- [ ] **Lesson 17.** What's identical about deploying through the Portal
  versus the CLI, and what's different?
- [ ] **Lesson 18.** What is a resource group, what do IaaS/PaaS/SaaS mean,
  and why would a company choose OpEx cloud spending over CapEx hardware —
  explained in plain language, to someone with zero cloud background?

## Exam-day logistics, from Lesson 18

- AZ-900 is proctored, multiple-choice/multiple-select, roughly 40-60
  questions, about an hour. No lab component, no code to write.
- Beyond this course, Microsoft's own free AZ-900 learning path on
  Microsoft Learn plus a practice exam or two is the recommended next step
  to get used to the question style.
- The exam tests whether you understand *what* these services are and
  *why* they exist — not whether you can write a Bicep file or recall a CLI
  command from memory.
