# Lesson 2 — Why AI Needs Governance

**Chapter 1 · AI Governance Foundations · Lesson 2 of 30**

## What you'll learn

- What's actually different about a machine learning model compared to traditional software
- Why that difference is what makes AI governance necessary, not just data governance
- Who ends up bearing the risk when an ungoverned model makes a bad decision
- The general shape of consequences when governance is skipped

## Traditional software vs. a learned model

Traditional software runs on logic a person wrote down. If a tax calculator produces the wrong number, someone can open the code, find the line that's wrong, and fix it. The rule was explicit the whole time.

A machine learning model doesn't work that way. It's trained — shown large amounts of data and a learning algorithm adjusts millions of internal parameters until the model's outputs match the patterns in that data well enough. Nobody writes down "if income is under $40,000 and zip code starts with X, deny the loan." The model arrives at something that behaves like a rule, but it's statistical, embedded in those parameters, and not directly readable by a person. That's the core shift governance has to account for: the logic is learned, not authored, and often can't be fully explained even by the people who built it.

## Why that difference raises the stakes

Three consequences follow directly from "learned, not authored":

1. **Scale.** Once deployed, a model can make the same kind of decision thousands or millions of times per day, with no human looking at most of them individually. A flaw that would be one bad call from one person becomes a flaw repeated at machine speed.
2. **Opacity.** Because the logic isn't written in readable rules, it's genuinely harder to predict in advance exactly when a model will behave badly, or to explain after the fact exactly why it made a particular call.
3. **Inherited risk.** A model trained on flawed, biased, or incomplete data doesn't just reproduce that flaw — it can generalize it, applying a pattern learned from historical data to new cases in ways nobody explicitly intended.

## Who bears the risk

It's tempting to think the AI vendor or the data science team absorbs the risk of a model behaving badly. In practice, the organization that deploys the model and uses its output to make a real decision — approve a loan, flag a transaction, screen a resume, answer a customer — is the one accountable to the customer, the regulator, and the public. "The vendor's model did it" is rarely an acceptable answer after the fact. Governance exists so that accountability is assigned and tested before deployment, not discovered the hard way afterward.

## What skipping it tends to look like

Without governance, the pattern is usually not a single dramatic failure. It's a model quietly performing worse for one group of people than another for months before anyone notices. It's a chatbot generating a confident, wrong answer that a customer acted on. It's a fraud model whose accuracy slowly degrades as the real world shifts and nobody was watching for that drift. Each of these is survivable alone — the risk compounds when none of them were anyone's explicit job to catch.

## Key terms

| Term | Meaning |
|---|---|
| Learned logic | Behavior a model arrives at statistically from training data, rather than rules a person wrote |
| Opacity | The difficulty of fully explaining why a model produced a specific output |
| Model drift | A model's real-world performance degrading as conditions change after deployment (covered in depth in Chapter 4) |

## Lab

Think of one decision at your organization (or one you've observed as a customer) that is now made, even partly, by a model instead of a person — a recommendation, a flag, an approval, a response. Write one paragraph: if that decision were wrong in a specific case, how would anyone find out? Be honest if the answer is "probably nobody would notice quickly."

## Check yourself

Can you explain, without looking back, what makes a learned model different from traditional software, and name the three consequences (scale, opacity, inherited risk) that follow from that difference?
