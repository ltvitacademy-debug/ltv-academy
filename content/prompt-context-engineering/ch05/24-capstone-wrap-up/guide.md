# Lesson 24 — Capstone: Wrap-Up & Portfolio Presentation

**Chapter 5 · Capstone · Lesson 24 of 24 — Final Lesson**

## What you'll learn

- The last milestone: presenting a real, working prompt library
  credibly, not describing one
- What to actually show — prompts, budget, eval set, test results,
  the changelog — and in what order
- The specific questions this project should make you ready to answer
- Where this course's skills fit into the rest of the AI Engineer
  path, and into real work, going forward

## What to actually show

A real, working prompt library is more convincing than a slide deck.
In an interview or a portfolio review, walk through it in this order:

1. **`system.md` and your templates** — walked through out loud, not
   just opened. Explain the role, the rules, and why the templates are
   structured the way they are.
2. **`budget.md`** — the output reserve, the fixed costs (system
   prompt, any tool schemas), and the capped variable costs (history,
   retrieval), with the actual numbers and why they're set where they
   are.
3. **`tools.json`**, if your use case called for it — why each tool
   description says what it says, not just that the schema exists.
4. **`eval_set.json`** — point to one real case from each of the four
   categories (common, edge, known failure, adversarial) and explain
   what each one is checking for.
5. **A live automated test run** — run it in front of whoever you're
   presenting to, and report the actual pass rate on the spot. A
   number you remember from last week is a claim; a number you just
   generated is proof.
6. **`CHANGELOG.md`** — the real version history, including your A/B
   comparison's documented winner and reason, and the specific
   regression your baseline caught.

## Questions this project should prepare you for

- **"Why cap history and retrieval separately instead of one combined
  budget?"** (Lesson 13) — so that either one growing unexpectedly
  can't silently consume the entire remaining window on its own.
- **"Why does position in the context window matter if everything
  already fits inside the budget?"** (Lesson 15) — the "lost in the
  middle" effect: fitting inside the token limit doesn't guarantee the
  model reliably attends to something sitting in a weak position.
- **"What's actually wrong with a vague tool description?"**
  (Lesson 16) — it costs the same tokens as a precise one while giving
  the model less information to decide when and how to call it.
- **"How did your A/B test prove the winner actually won?"**
  (Lesson 20) — one isolated variable, the same eval set for both
  versions, a metric chosen in advance, and a specific documented
  reason — not a subjective impression.
- **"Walk me through the regression your baseline caught."**
  (Lesson 21) — a real case id that passed on one version and failed
  on the next, caught before it shipped.

## Where this fits going forward

Nothing in this course was really about any particular model's exact
syntax — it was about giving prompts, and the context assembled around
them, the same rigor software engineers already expect from tested
code: a defined budget, a deliberate order, a real eval set, and
evidence instead of a feeling that something "reads well." That
discipline transfers across models, providers, and API versions; the
specific token limits and schema formats don't.

This course is the sixth in the AI Engineer path's Job-Ready stage —
**Python for AI Engineering → Git/GitHub → APIs/JSON for AI
Applications → AI/ML Foundations → Generative AI & LLMs → Prompt &
Context Engineering** — and it's now complete: 24 lessons, 5 chapters,
from "what makes a good prompt" to a tested, versioned prompt library
built and evaluated end to end. From here, the path continues directly
into **RAG & Vector Databases** — the course that builds the actual
retrieval pipeline (embeddings, vector stores, chunking, reranking)
feeding the retrieved context this course just taught you to budget,
order, and compress.

## Key terms

| Term | Meaning |
|---|---|
| Presentation order | Prompts/templates → budget → tools → eval set → live test run → changelog |
| Portfolio review | Presenting a real, running prompt library as evidence of a skill, not describing one from memory |
| What transfers | The discipline (budgets, ordering, eval sets, evidence-based iteration) — not any one model's specific syntax |

## Lab

1. Practice the six-step walkthrough above, out loud, against your own
   prompt library, in under five minutes.
2. Write your own one-sentence answer to each of the five interview
   questions above, specific to your actual project.
3. If you're building a portfolio, save or link the whole
   `prompt-library/` folder directly — a real, working library is more
   convincing than a screenshot of one.

## Check yourself

This course is complete when you can walk a stranger through your
capstone prompt library end to end — prompts, budget, eval set, a live
test run, and the changelog — and answer all five interview questions
above without hesitation. That's Prompt & Context Engineering done:
24 lessons, 5 chapters. Next: RAG & Vector Databases.
