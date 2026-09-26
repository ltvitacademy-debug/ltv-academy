A chatbot starts as random numbers. This lesson walks through how it gets from there to something useful, in three stages, using a toy model you can run.

Stage one is pretraining, and it's just next-token prediction. No labels are needed, because the text is its own label: the target at each position is the next token. The loss is the cross-entropy you already know; perplexity is its exponential.

Our toy is a bigram model trained on eight short sentences about customers and coffee. The loss starts at two point one nine seven, a uniform guess over nine tokens. It falls to zero point three seven eight, and it can't go lower, because the data itself is ambiguous: after the word a, coffee follows five times out of eight. Real pretraining has the same shape, at vastly larger scale. Data is the product: filtering, deduplication, and mixing matter enormously. And test data can leak into training text, which inflates benchmarks.

Stage two is supervised fine-tuning. The loss is the same, but the data is a smaller, curated set of prompts and ideal responses, teaching assistant behavior. In our toy, four new sentences push the probability of bagel after a from thirty-seven percent to ninety-four. But the loss on the original corpus nearly doubles, from point three seven eight to point seven three six. The model partly forgot.

Stage three is preference tuning. Humans compare pairs of answers, and a reward model learns to score the preferred one higher, with a pairwise loss that's small when it agrees, point three four one, and large when it's wrong, one point two four one. Then the language model is optimized against that reward, which is RLHF. Newer methods like DPO skip the separate reward model. In the InstructGPT paper, people preferred the answers of a tuned model that was over one hundred times smaller than GPT-3.

Next lesson: prompting, the everyday way to steer a trained model.
