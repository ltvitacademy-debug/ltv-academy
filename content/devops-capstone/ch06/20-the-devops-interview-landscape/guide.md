# The DevOps Interview Landscape

Before you drill into specific questions, it helps to see the whole process laid out — most candidates lose points not because they don't know the material, but because they prepare for the wrong stage. This lesson maps the typical DevOps hiring pipeline end to end, so the next four lessons on specific question types fit into a structure you already understand.

## What you'll learn

- The typical stages of a DevOps interview process, in order
- What each stage is actually evaluating, which is rarely the same thing it appears to test
- How to prepare differently for a recruiter screen versus a technical screen versus a system design conversation
- Where take-home exercises and pairing sessions fit, and what to do if the capstone is directly relevant

## The typical stages

1. **Recruiter / phone screen (20-30 min).** This stage is checking fit, not depth: your background, why this role, salary range, work authorization, basic tool familiarity. It's a filter for whether to spend engineer time on you next, not a technical exam. Have a 60-second summary of the capstone ready — company, the two services, the architecture you built — because you will be asked "tell me about a recent project" almost every time.
2. **Technical screen (45-60 min).** Usually one engineer, covering a mix of conceptual questions (Linux, networking, Kubernetes, Terraform — covered in Lessons 21-23) and sometimes light hands-on work (debug a failing pipeline, read a Kubernetes manifest, write a short script). This is testing whether you actually did the work your resume claims, which is exactly why grounding answers in the capstone's real details matters so much.
3. **System design / whiteboarding (45-60 min).** You're asked to design something at a whiteboard level — "design a CI/CD pipeline for a service with X requirements," "how would you scale this." This tests reasoning under ambiguity and trade-off awareness, not memorized facts. The capstone gives you a real design to reason from instead of inventing one cold: you can say "in my capstone, checkout needed a wider autoscaling range than product-catalog because of flash-sale spikes — here's how I'd extend that reasoning to your system."
4. **Behavioral interview (30-45 min).** Covered in depth in Lesson 24. Tests how you work with people and handle pressure, using the STAR method. The incident drill and the near-miss secrets leak are built for exactly this stage.
5. **Take-home exercise or pairing session (varies).** Some companies skip the whiteboard and instead give a small real task — fix this Dockerfile, write this Terraform module, debug this manifest — either solo or live with an engineer. Treat it like a tiny version of the capstone: working code with a short README beats a clever but undocumented solution.
6. **Final / team or leadership round.** Often a culture-fit conversation with a hiring manager or future teammates. Lower technical depth, higher weight on questions you ask them.

## How to prepare for each stage differently

Don't prepare the same way for all of them. For the phone screen, prepare your story, not your facts. For the technical screen, prepare precise, correct definitions grounded in real experience — vague answers are the single biggest red flag at this stage. For system design, prepare a framework for asking clarifying questions before you design anything, and lean on the capstone's real trade-offs as reference points. For behavioral, prepare 3-4 STAR stories in advance so you're not constructing one live. For a take-home, prioritize a working solution with clear documentation over an incomplete "advanced" one.

## Key terms

| Stage | Primary focus | Typical length |
|---|---|---|
| Recruiter screen | Fit, logistics, basic story | 20-30 min |
| Technical screen | Depth of real knowledge | 45-60 min |
| System design | Reasoning and trade-offs under ambiguity | 45-60 min |
| Behavioral | How you work with people, STAR method | 30-45 min |
| Take-home / pairing | Practical, documented execution | Varies |
| Final round | Culture fit, your questions for them | 30-45 min |
