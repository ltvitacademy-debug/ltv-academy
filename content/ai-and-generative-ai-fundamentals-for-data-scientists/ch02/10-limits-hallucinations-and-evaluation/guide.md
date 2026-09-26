# Limits, Hallucinations & Evaluation

Large language models are impressive enough that it is easy to forget what they actually are: next-token predictors trained to produce plausible text. That single fact explains most of their failure modes. This lesson gives you a working mental model of where LLMs go wrong, and, because you are a data scientist, a way to measure how often, with honest error bars.

## What you'll learn

- Why hallucination is a natural consequence of how LLMs work, shown with a toy model you can run
- The main practical limits: knowledge cutoff, context window, reasoning and arithmetic slips, non-determinism
- How to evaluate an LLM-based system with a labeled set, a metric, and a confidence interval

## Hallucination: fluent is not the same as true

An LLM is trained to predict likely next tokens, not to check facts. Nothing in that objective distinguishes "likely to appear in text" from "true". You can see the principle in miniature with a bigram model, the simplest possible next-word predictor: for each word, remember which words followed it in the training text, then generate by sampling.

```python
import random
from collections import defaultdict

corpus = ("the customer renewed the plan . "
          "the customer cancelled the plan . "
          "the analyst renewed the report . "
          "the analyst cancelled the meeting .")
words = corpus.split()

nxt = defaultdict(list)
for a, b in zip(words, words[1:]):
    nxt[a].append(b)

def generate():
    out = ["the"]
    while out[-1] != ".":
        w = random.choice(nxt[out[-1]])
        out.append(w)
    return " ".join(out)

seen = [s.strip() + " ." for s in corpus.split(".") if s.strip()]
for seed in range(8):
    random.seed(seed)
    s = generate()
    print(s, "| in corpus:", s in seen)
```

Running this gave, among other lines:

```
the customer renewed the plan . | in corpus: True
the customer renewed the report . | in corpus: False
the plan . | in corpus: False
```

Every generated sentence is locally fluent, because each word pair occurred in the training text. But "the customer renewed the report" was never in the corpus. It is a novel, plausible-sounding statement that nobody wrote. Real LLMs are vastly more capable than this toy, but the same mechanism, generating what fits the pattern, is why they can cite a paper that does not exist or state a wrong number in a confident tone. That is a hallucination.

## The practical limits to plan for

- **Knowledge cutoff.** The model only knows what was in its training data. Recent events, your private data, and your company's tables are not in there unless you supply them in the prompt (the idea behind retrieval, covered later in this course).
- **Context window.** A model can only read a limited number of tokens at once. The exact limit varies by model and changes often, so check the current documentation.
- **Reasoning and arithmetic.** Multi-step logic and exact calculation are unreliable. When you need exact numbers, have the model write code or call a tool, then run it.
- **Non-determinism.** With temperature above zero, the same prompt can give different answers. Even at low temperature, results can vary across model versions.
- **Sensitivity to wording.** Small prompt changes can change results, which is why you test.

## Evaluating an LLM system like a data scientist

"It looked right when I tried it" is not evidence. Build a small labeled set, run the system on it, and score it. The `model` function below is a stand-in for a real LLM call that misses three of 20 items:

```python
import numpy as np

truth = ["A","B","A","C","B","A","C","C","B","A",
         "B","C","A","B","C","A","A","B","C","B"]
def model(i):            # stand-in for an LLM call
    wrong = {3, 8, 14}   # pretend it misses these
    return truth[i] if i not in wrong else "X"

preds = [model(i) for i in range(len(truth))]
correct = sum(p == t for p, t in zip(preds, truth))
n = len(truth)
p = correct / n
z = 1.96
center = (p + z**2/(2*n)) / (1 + z**2/n)
half = z*np.sqrt(p*(1-p)/n + z**2/(4*n**2)) / (1 + z**2/n)
print(correct, n, round(p, 2))
print("95% Wilson CI:", round(center-half, 2), round(center+half, 2))
```

Output: `17 20 0.85` and `95% Wilson CI: 0.64 0.95`. The point estimate is 85 percent, but with only 20 examples the plausible range runs from about 64 to 95 percent. That is the same small-sample lesson from your statistics course, and it applies here: do not celebrate a prompt tweak that moved accuracy from 85 to 90 percent on 20 items.

Good practice: use a labeled set large enough for the precision you need, keep it separate from the examples you put in prompts, use task-appropriate metrics (accuracy, F1, exact match), and for open-ended text add human review. Using another LLM as a judge is popular and useful, but it has its own biases, so calibrate it against human labels.

## Recap

LLMs generate plausible text, so they can be fluently wrong. Plan for cutoff, context limits, arithmetic slips, and variability, ground answers in real data, and evaluate with labeled sets and confidence intervals. The next chapter turns to embeddings, the representation that makes retrieval possible.
