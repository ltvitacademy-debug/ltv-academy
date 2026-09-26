# Behavioral Interviews & Communication

Behavioral questions sound soft, but they carry real weight. Data scientists spend much of their time explaining, persuading and working through ambiguity with people who are not data scientists. Interviewers use questions like "Tell me about a time you..." to predict how you will behave on their team. The best preparation is a small bank of true stories from your projects, each told in a clear structure. Nothing here should be invented: use your real decisions from the capstone and the rest of the path.

## What you'll learn

- The STAR structure and how to keep stories short
- Which project decisions make strong stories
- How to explain a model to a non-technical audience
- How to answer weakness, failure and disagreement questions honestly

## The STAR structure

**S**ituation, **T**ask, **A**ction, **R**esult. Spend about 15% on situation and task, 60% on your actions, and 25% on the result and what you learned. Aim for roughly two minutes per story. Two common errors: spending the whole time on background, and saying "we" throughout so the interviewer cannot tell what you did.

## Turn project decisions into stories

Technical projects are full of decisions, and decisions make better stories than tasks. Look through your capstone and course work for moments like these, and write down what really happened:

- **A judgment call about metrics.** You chose recall over precision, or the reverse, because of what the retention action costs.
- **A problem you caught.** You found leakage, duplicates or a definition problem, and what you did about it.
- **A simplification.** You kept a simpler model because it was easier to explain or nearly as accurate.
- **A limitation you disclosed.** You told the audience where the model should not be trusted.
- **Feedback you acted on.** A reviewer's comment during your presentation practice changed your approach.
- **Ambiguity.** You started with an unclear question and narrowed it.

For each, write one sentence each for situation, task, action and result, and add a real number only if you measured it. A worked shape (fill it with your own details):

> Situation: In the churn capstone, my first model scored very well. Task: decide whether to trust it. Action: I checked which features it relied on, found one that was only recorded after cancellation, removed it, and moved to a time-based split. Result: the score dropped, but the number now reflected what the model could do at prediction time, and I documented the change in the write-up.

Keep three to five stories and make each flexible enough to answer several questions: a time you found a mistake, solved an ambiguous problem, disagreed with someone, simplified something, or learned quickly.

## Explaining a model to a non-technical audience

Interviewers often ask, "Explain a machine learning model to a business stakeholder." Focus on the decision, not the mathematics.

Too technical: "We trained a gradient boosting classifier on engineered features and optimized area under the ROC curve."

Better: "The model gives each customer a score for how likely they are to cancel in the next 30 to 60 days. If we contact the highest-scoring group, we reach more of the customers who would have left than if we picked at random. It is not perfect, so some customers we contact would have stayed anyway, which is why we should test whether the outreach works."

A good pattern is: the decision, what the model does in one sentence, how good it is compared to a simple alternative, what it cannot do, and the recommended next step. Use analogies sparingly, prefer a comparison to a baseline, and avoid jargon unless you define it.

## Weakness, failure and disagreement

- **Failure:** pick a real, modest mistake, own it without blaming others, and show what you changed afterward.
- **Weakness:** name a real one you are actively improving, with concrete steps. Avoid disguised strengths such as "I work too hard."
- **Disagreement:** describe how you sought to understand the other view, used data or a small test to decide, and respected the outcome.
- **"Why data science? Why us?"** Connect your path to something specific about the company's product or data, using research you have done.

## Questions to ask them

Prepare three: how models or analyses reach decisions on this team, what a successful first six months looks like, and how the team handles data quality and deployment. Good questions show you think like a colleague.

## Recap

Use STAR, build stories from real project decisions, explain models in terms of decisions and comparisons to baselines, and be candid about mistakes and limits. Practice out loud, ideally with a mentor or friend. Next, the final lesson of the course: salary and offer basics.
