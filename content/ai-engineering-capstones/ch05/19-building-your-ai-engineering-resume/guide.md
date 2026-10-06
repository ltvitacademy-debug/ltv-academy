# Lesson 19 — Building Your AI Engineering Resume

**Chapter 5 · Career Preparation · Lesson 19 of 23**

## What you'll learn

- The action + artifact + framework pattern for an AI engineering resume bullet
- Real before-and-after rewrites built from this course's three capstone projects
- How to lay out a one-page AI engineering resume
- The mistakes that most commonly weaken an AI engineering resume

## What AI hiring actually looks for

AI engineering is young enough that there's no universal certification to lean on, which means your resume has to carry more evidence than most. The three proof points that matter: something you **deployed** (not just ran in a notebook), something you **evaluated** (a real number showing how well it works, not a claim), and something you **documented** (a README a stranger could read and understand your decisions from). A resume built around those three things is stronger than one built around a list of model names.

## The action + artifact + framework pattern

A strong AI engineering bullet answers three questions in one line: what did you do, what did you actually produce (something a reviewer could ask to see or a number they could ask you to defend), and what technique or framework did you use. Vague verbs like "worked on" or "helped with" tell a reviewer nothing they can follow up on.

**Before:** "Worked on a chatbot that answers questions from documents."

**After:** "Built and deployed a production RAG knowledge assistant (LangChain, a hosted vector database) over 500+ pages of source documents with recursive chunking; evaluation against a 50-question test set showed 89% retrieval relevance and 94% answer faithfulness."

**Before:** "Made a tool that lets you ask a database questions in plain English."

**After:** "Designed a natural-language-to-SQL pipeline with schema-grounded prompting and read-only query validation; deployed as an API with per-query cost limits and a reviewable query log."

**Before:** "Built an agent that can do tasks automatically."

**After:** "Built a five-tool agent (ReAct pattern) with a human-approval checkpoint on every irreversible action and full audit logging of every tool call; deployed to a cloud container service with action-count guardrails."

**Before:** "Worked with AI stuff for testing and evaluation."

**After:** "Built an automated evaluation pipeline (retrieval relevance, answer faithfulness, latency) that runs against every pipeline change before deployment; it caught two real regressions before they shipped."

Notice what each "after" version does: it names a real number (89% relevance, five tools, two regressions), a real artifact (a deployed assistant, an API, an audit log), and a real technique from this path (chunking, schema-grounded prompting, the ReAct pattern). That's the pattern — repeat it for every bullet.

## Structure of a one-page AI engineering resume

1. **Header.** Name, location, email, a linked GitHub profile, and a portfolio or demo link if you have one.
2. **Summary (optional).** Two lines naming your target role and strongest skills (LLM applications, RAG, agents).
3. **Capstone projects.** Your three flagship builds from this course — the RAG assistant, the AI data analyst, the tool-using agent — each with two to three action + artifact + framework bullets and a link where honest (repo, demo, or deployed endpoint).
4. **Skills, grouped.** LLM & prompting (provider APIs, prompt and context engineering), retrieval & data (RAG, vector databases, embeddings, SQL), agents & tools (tool calling, approval workflows), deployment & ops (containers, cloud deployment, monitoring, eval pipelines).
5. **Experience.** Earlier roles, with bullets reframed toward engineering rigor where honestly possible.
6. **Education and any relevant coursework.**

## Tailoring to the posting

Read the job description and note which model provider, framework, and specialty it names — a RAG-focused product team cares about different depth than a team building autonomous agents. Lead with whichever of your three capstones is closest to that posting's emphasis, and only use a term from the posting if you can speak to it for five minutes unprompted.

## Common mistakes

- **A model-name buzzword list with nothing deployed.** "GPT-4, Claude, LangChain, Pinecone, Docker" with no project behind it is weaker than one well-proven bullet.
- **Calling notebook-only work "production."** Be precise about whether something is deployed and reachable, or still running locally.
- **Missing eval numbers.** A system with no stated accuracy, relevance, or faithfulness number gives a reviewer no way to judge whether it actually works.
- **Inconsistent claims across documents.** If your resume says "94% faithfulness" and your README says "88%," fix the mismatch before either goes out.

## Key terms

| Term | Meaning |
|---|---|
| Action + artifact + framework | A resume-bullet pattern naming what you did, what you produced, and what technique or tool you used |
| Evaluation pipeline | An automated, repeatable check of a system's quality (relevance, faithfulness, latency) against a test set |
| Tailoring | Matching a resume's emphasis and wording to a specific job posting's actual language, truthfully |

## Lab

Take one deliverable from each of your three capstone projects (Chapters 2, 3, and 4 of this course) and write one action + artifact + framework bullet for each, including a real metric or link for every single one.

## Check yourself

Can you write an action + artifact + framework bullet from memory, for a project you haven't looked at in a week, including a real number you could defend if asked about it?
