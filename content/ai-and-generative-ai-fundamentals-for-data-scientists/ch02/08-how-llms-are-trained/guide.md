# How LLMs Are Trained

You now know what a Transformer is. It starts as a pile of random numbers, and a chatbot is what comes out the other end of a long, expensive training process. As a data scientist you do not need to train one, but you do need to understand the pipeline, because almost every strength and weakness of an LLM (its fluency, its knowledge cutoff, its habit of sounding confident when wrong) traces back to how it was trained. This lesson walks through the three stages, using a toy model you can run yourself. The AI Engineer path covers fine-tuning in practical depth; here we build the concepts.

## What you'll learn

- Stage 1, pretraining: next-token prediction on a huge text corpus, and what "loss" and "perplexity" mean
- Why data quality and quantity matter more than most people expect
- Stage 2, supervised fine-tuning: the same training loop on curated examples
- Stage 3, preference tuning (RLHF and relatives): learning from human comparisons

## Stage 1: pretraining is next-token prediction

Pretraining needs no labels. The text itself is the label: for every position, the target is simply the next token. Loss is the same **cross-entropy** you met in the neural network lessons, measured on the probability the model assigned to the true next token. **Perplexity** is the exponential of that loss, roughly "how many tokens the model is torn between".

A real LLM uses a Transformer with billions of parameters. Our toy uses the simplest possible model, a **bigram** table: the logits for the next word depend only on the current word. The training loop is the one you already know: forward pass, cross-entropy, gradient of the loss, update. The corpus is eight invented sentences.

```python
import numpy as np

corpus = ["the customer buys a coffee", "the customer buys a bagel",
          "the customer buys a coffee", "the customer returns a bagel",
          "the manager buys a coffee", "the manager returns a coffee",
          "the customer buys a coffee", "the manager buys a bagel"]
words = sorted({w for s in corpus for w in s.split()} | {"<end>"})
idx = {w: i for i, w in enumerate(words)}
V = len(words)

def pairs(sentences):
    xs, ys = [], []
    for s in sentences:
        toks = s.split() + ["<end>"]
        for a, b in zip(toks[:-1], toks[1:]):
            xs.append(idx[a]); ys.append(idx[b])
    return np.array(xs), np.array(ys)

def softmax(z):
    e = np.exp(z - z.max(axis=1, keepdims=True))
    return e / e.sum(axis=1, keepdims=True)

def loss_of(W, xs, ys):
    p = softmax(W[xs])
    return -np.log(p[np.arange(len(xs)), ys]).mean()

def train(W, sentences, steps, lr):
    xs, ys = pairs(sentences)
    for _ in range(steps):
        p = softmax(W[xs])
        p[np.arange(len(xs)), ys] -= 1          # gradient: p - one-hot
        grad = np.zeros_like(W)
        np.add.at(grad, xs, p / len(xs))
        W -= lr * grad
    return W

xs, ys = pairs(corpus)
W = np.zeros((V, V))
print("uniform-guess loss ln(V) =", round(np.log(V), 3))
done = 0
for target in (0, 50, 200, 3000):
    W = train(W, corpus, target - done, lr=1.0)
    done = target
    l = loss_of(W, xs, ys)
    print(f"step {target:4d}  loss {l:.3f}  perplexity {np.exp(l):.2f}")

# the best possible bigram model just copies the data's own frequencies
counts = np.zeros((V, V)); np.add.at(counts, (xs, ys), 1)
P = counts / counts.sum(1, keepdims=True).clip(min=1)
print("data entropy floor:", round(-np.log(P[xs, ys]).mean(), 3))

def next_probs(W, word):
    p = softmax(W[[idx[word]]])[0]
    return {w: round(float(p[idx[w]]), 3) for w in words if p[idx[w]] > 0.01}
print("after 'a':", next_probs(W, "a"))

rng = np.random.default_rng(1)
def generate(W):
    out, cur = [], "the"
    while cur != "<end>" and len(out) < 8:
        out.append(cur)
        cur = words[rng.choice(V, p=softmax(W[[idx[cur]]])[0])]
    return " ".join(out)
print([generate(W) for _ in range(4)])
```

Our output: the loss starts at `2.197` (a uniform guess over 9 tokens, perplexity 9) and falls to `0.670` at step 50, `0.436` at step 200, and `0.378` at step 3000 (perplexity 1.46). It cannot go to zero: the corpus itself is ambiguous (after "a" the next word is "coffee" 5 times out of 8 and "bagel" 3 times out of 8), and the best any bigram model can do is the data's own entropy, which we computed as `0.375`. Training has essentially reached it. After "a" the model gives coffee `0.624` and bagel `0.374`, matching the counts. Sampling from it produces new text, including sentences that never appeared in the corpus, such as "the customer returns a coffee".

Real pretraining has the same shape at vastly larger scale. Two data-science points matter. First, **data is the product**: web text is filtered, de-duplicated, and mixed, and choices here shape the model more than architecture tweaks. Second, evaluation data can leak into training text (**contamination**), which inflates benchmark scores; you will meet this again when we discuss evaluation. On scale, the 2022 "Chinchilla" study trained a 70-billion-parameter model on about 1.4 trillion tokens, roughly 20 tokens per parameter, and argued that model size and data should grow together. Many recent models train on more data per parameter than that, trading extra training cost for cheaper use.

## Stage 2: supervised fine-tuning

A pretrained model continues text; it does not follow instructions. **Supervised fine-tuning (SFT)** keeps the same loss but trains on a much smaller set of curated (prompt, ideal response) pairs, so the model learns the assistant format. In our toy, "fine-tuning" is the same loop on four new sentences:

```python
tune = ["the customer buys a bagel"] * 4
before = loss_of(W, xs, ys)
W2 = train(W.copy(), tune, steps=100, lr=0.5)
print("after 'a' (tuned):", next_probs(W2, "a"))
print("original-corpus loss:", round(before, 3), "->", round(loss_of(W2, xs, ys), 3))
```

After tuning, the probability of "bagel" after "a" jumps from `0.374` to `0.945`. But the loss on the original corpus rises from `0.378` to `0.736`: the model has partly **forgotten** what it knew. Tuning on narrow data shifts everything, which is why fine-tuning needs care and evaluation on the old behavior too.

## Stage 3: preference tuning

Even after SFT, answers can be unhelpful or unsafe. So humans compare pairs of model answers, and a **reward model** is trained to score the preferred one higher. The loss is a pairwise logistic loss:

```python
def pair_loss(r_chosen, r_rejected):
    return -np.log(1 / (1 + np.exp(-(r_chosen - r_rejected))))

print(round(pair_loss(1.2, 0.3), 3))   # 0.341: agrees with the human
print(round(pair_loss(0.3, 1.2), 3))   # 1.241: got it wrong
```

The language model is then optimized to produce answers the reward model scores highly, using reinforcement learning (this is **RLHF**). OpenAI's 2022 InstructGPT paper followed exactly SFT, reward model, then PPO reinforcement learning, and reported that people preferred a 1.3-billion-parameter tuned model over the 175-billion-parameter original GPT-3. Newer methods such as direct preference optimization (DPO) skip the separate reward model and learn from the comparisons directly. Details vary by lab and change quickly; check current papers and model cards.

## Recap

- Pretraining: predict the next token over a huge corpus; the loss floor is set by the data's own uncertainty.
- SFT: the same loop on curated examples teaches the assistant format, at the risk of forgetting.
- Preference tuning: human comparisons train a reward model (or a direct method) to shape helpfulness and safety.
- Next lesson: prompting, the everyday way you steer a model that has finished training.
