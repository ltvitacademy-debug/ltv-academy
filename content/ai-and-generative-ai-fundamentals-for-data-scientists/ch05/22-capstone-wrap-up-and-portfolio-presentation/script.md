The tool runs, but a tool that runs is not yet a portfolio project. People want to know whether it is correct, where it fails, and whether you understand what is real and what is faked. So in this final lesson we evaluate, show the swap to a real model, and plan the presentation.

To evaluate, compute the expected numbers with a separate, plain pandas code path, then compare them with the tool's answers. All seven test questions passed. But be honest about what that proves. The stub was written with these questions in mind, so seven out of seven shows the plumbing works, not that the tool is smart. A real model needs a fresh evaluation.

So hunt for failures. Asking how long you have to send an item back returned I don't know. That is a safe miss, because retrieval by word matching cannot connect send back with return, and embeddings would fix it. Asking which region had the most revenue was worse. The stub returned total revenue across everything, a confident, plausible, wrong answer. Silent wrong answers are more dangerous than refusals, and reporting one, with a fix, impresses people.

Going live is a small change, because the model sits behind one function. Write a function that calls the provider client and returns its text, and pass it to ask. It is not run here, and the model name and call shape need checking against current documentation. You would also rewrite the prompts in natural language and re-run the evaluation.

For your README, cover the problem, the architecture, what is real versus stubbed, your results including failures, cost and privacy notes, and next steps.

That completes the course. Your next course on the Data Scientist path is Azure Data Science.
