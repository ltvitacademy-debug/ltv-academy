# Prompting Fundamentals

You now know that a large language model does one thing at inference time: given the tokens so far, it produces a probability distribution over the next token, picks one, appends it, and repeats. **Prompting is simply the craft of choosing the starting tokens so that the distribution you get back is the one you want.** For a data scientist, that framing is useful because it turns prompting from folklore into something you can reason about, and test like any other model input.

This lesson covers the fundamentals only. The AI Engineer path goes much deeper on prompt engineering, tool use, and agents; here we want the working knowledge a data scientist needs to use an LLM sensibly inside an analysis or a pipeline.

## What you'll learn

- The parts of a well-formed prompt
- Zero-shot, few-shot, and step-by-step prompting, and when each helps
- What temperature does to the next-token distribution (with a runnable numpy demo)
- Why prompts should be treated as code: templated, versioned, and tested

## The anatomy of a prompt

Most useful prompts have four ingredients, in roughly this order:

1. **Role or context**: who the model should act as, or what situation it is in.
2. **Task**: one clear instruction, stated as an action.
3. **Input data**: the text, table rows, or ticket the task applies to, clearly separated from the instructions.
4. **Output format**: exactly what the answer should look like (one word, a JSON object, three bullets).

Vague prompts fail because the model has to guess the missing pieces. "Summarize this" leaves length, audience, and format open. "Summarize this ticket in one sentence for a support manager" closes all three.

## Zero-shot, few-shot, and step-by-step

A **zero-shot** prompt gives an instruction and no examples. A **few-shot** prompt adds a handful of worked examples, which is often the cheapest way to pin down the label set and the format. Because a prompt is just a string, you can build it in Python:

```python
def build_prompt(ticket, examples):
    parts = ["You label support tickets.",
             "Answer with one word: billing, bug, or other.",
             ""]
    for text, label in examples:
        parts.append(f"Ticket: {text}")
        parts.append(f"Label: {label}")
    parts.append(f"Ticket: {ticket}")
    parts.append("Label:")
    return "\n".join(parts)

examples = [("I was charged twice", "billing"),
            ("App crashes on login", "bug")]
print(build_prompt("Refund not received", examples))
```

Running this prints the assembled prompt, ending with `Label:` so the most likely next token is the label itself. The examples do real work: they show the model the exact output shape.

For multi-step reasoning (arithmetic, logic, multi-condition rules), asking the model to "think step by step" or to show its working before giving a final answer often improves accuracy, because the intermediate tokens become context for the later ones. It costs more tokens, and the shown reasoning is not guaranteed to reflect how the model actually arrived at the answer, so treat it as a technique that helps, not a guarantee.

## Temperature: controlling randomness

The model's raw scores (logits) are turned into probabilities with a softmax. **Temperature** divides the logits before the softmax. Low temperature sharpens the distribution; high temperature flattens it.

```python
import numpy as np

logits = np.array([3.0, 2.0, 1.0, -2.0])  # renew, cancel, upgrade, banana

def probs(logits, T):
    z = logits / T
    z = z - z.max()
    p = np.exp(z)
    return p / p.sum()

for T in [0.2, 1.0, 2.0]:
    print(T, np.round(probs(logits, T), 3))
```

The output was:

```
0.2 [0.993 0.007 0.    0.   ]
1.0 [0.662 0.244 0.09  0.004]
2.0 [0.486 0.295 0.179 0.04 ]
```

At T = 0.2 the top token has about 99 percent of the mass, so output is nearly deterministic, which is what you want for classification and extraction. At T = 2 even the nonsense token "banana" gets 4 percent. Higher temperature suits brainstorming, not labeling. Exact parameter names and ranges differ between providers, so check the API documentation of the one you use.

## Treat prompts like code

A prompt is an input to a system, so apply normal engineering habits:

- **Template it** in a function, as above, instead of pasting strings by hand.
- **Version it** in source control, so you know which wording produced which results.
- **Test it** on a small labeled set and measure accuracy, exactly as you would evaluate a classifier. Changing one sentence can move the score, and you only find out by measuring.
- **Keep instructions and data separate**, and never assume user-supplied text is harmless: text inside the data can itself contain instructions (prompt injection).

## Recap

A prompt conditions the next-token distribution. Give role, task, data, and format; add examples when the format matters; lower the temperature for anything you need to be repeatable; and test prompt changes against labeled data. The next lesson looks at where all of this breaks down.
