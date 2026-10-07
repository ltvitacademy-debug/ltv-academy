# Training a Data-Quality Reward Model

Lesson 11 produced roughly 260 labeled `{chosen, rejected}` pairs. This lesson turns them into an actual trained model: a small pretrained encoder with a scalar head, trained with the same pairwise loss that reward models across the RLHF literature use. This is a genuinely separate learned model — not a programmatic reward like Project 3's.

## What you'll learn

- How a (messy record, candidate record) pair gets serialized into one text string
- The model architecture: `distilbert-base-uncased` plus a scalar linear head
- The pairwise Bradley-Terry / logistic loss, and why it operates on two scores at once
- The real PyTorch training loop, start to finish

## Serializing a record pair into text

The reward model needs a single text input per candidate, not a database row — so each (original messy record, one candidate cleaned record) pair gets flattened into one string before it ever reaches the encoder:

```python
def serialize(messy, candidate):
    return (
        f"ORIGINAL: CompanyName={messy['CompanyName']!r}, "
        f"Phone={messy['Phone']!r}, Country={messy['Country']!r}, "
        f"PostalCode={messy['PostalCode']!r} | "
        f"CANDIDATE: CompanyName={candidate['CompanyName']!r}, "
        f"Phone={candidate['Phone']!r}, Country={candidate['Country']!r}, "
        f"PostalCode={candidate['PostalCode']!r}"
    )
```

Both the original and the candidate go into the same string, in the same call, because the reward model's whole job is to judge the candidate *relative to* what it started from — a candidate that looks clean in isolation but silently dropped information from the original is exactly the case this project cares about catching (and exactly what Lesson 13's adversarial check targets).

## The model: a pretrained encoder plus a scalar head

```python
import torch
import torch.nn as nn
from transformers import AutoModel, AutoTokenizer

class RewardModel(nn.Module):
    def __init__(self, base="distilbert-base-uncased"):
        super().__init__()
        self.encoder = AutoModel.from_pretrained(base)
        hidden = self.encoder.config.hidden_size
        self.score_head = nn.Linear(hidden, 1)

    def forward(self, input_ids, attention_mask):
        out = self.encoder(input_ids=input_ids, attention_mask=attention_mask)
        pooled = out.last_hidden_state[:, 0]  # [CLS]-position pooled output
        return self.score_head(pooled).squeeze(-1)  # one scalar score per input
```

`distilbert-base-uncased` is small enough to fine-tune quickly on a dataset this size, and its pretrained language understanding gives the model a running start on recognizing things like "this looks like a dropped digit" without having to learn English from scratch on 260 pairs. The scalar head turns the pooled sentence representation into a single number — the reward score for that one serialized (messy, candidate) pair.

## The pairwise loss

The model is never trained to predict an absolute number — only to score the chosen candidate higher than the rejected one for the same original record. That's the Bradley-Terry / logistic pairwise loss:

```python
def pairwise_loss(r_chosen, r_cal_rejected):
    return -torch.log(torch.sigmoid(r_chosen - r_cal_rejected)).mean()
```

`r_chosen - r_rejected` is the model's margin between the two candidates for the same row; pushing that margin positive is exactly the same training objective reward models in the RLHF literature use for comparing a preferred vs. a dispreferred response.

## The training loop

```python
from torch.optim import AdamW
from torch.utils.data import DataLoader

model = RewardModel()
optimizer = AdamW(model.parameters(), lr=2e-5)
loader = DataLoader(train_pairs, batch_size=8, shuffle=True)

for epoch in range(4):
    for batch in loader:
        chosen_ids, chosen_mask = tokenize(batch["chosen_text"])
        rejected_ids, rejected_mask = tokenize(batch["rejected_text"])

        r_chosen = model(chosen_ids, chosen_mask)
        r_rejected = model(rejected_ids, rejected_mask)

        loss = pairwise_loss(r_chosen, r_rejected)
        optimizer.zero_grad()
        loss.backward()
        optimizer.step()
```

Every training step runs the model forward on both the chosen and the rejected serialized text for the same row, computes the pairwise loss from the two resulting scores, and backpropagates through both forward passes at once. A small batch size (8) and few epochs (4) suit a dataset this size — with only roughly 260 pairs, more epochs would risk overfitting the model to idiosyncrasies of this particular rater's choices rather than the general pattern.

## Why this is a genuinely separate model

Nothing here is a programmatic rule, and nothing here reuses Project 3's reward. This is an actual learned reward model, trained end-to-end on human pairwise preferences, with its own weights and its own failure modes — distinct from Project 3's execution-correctness function, which has no learned component at all.

## Key terms

- **Serialization** — flattening a structured (original, candidate) record pair into a single text string for the encoder
- **`distilbert-base-uncased`** — a small pretrained transformer encoder, chosen for fast fine-tuning on a small dataset
- **Pairwise Bradley-Terry loss** — `-log(sigmoid(r_chosen - r_rejected))`, a loss trained on score margins between two candidates rather than on absolute labels
- **AdamW** — the optimizer used for fine-tuning, with a small learning rate suited to adapting a pretrained encoder

## Recap

The reward model serializes each (original, candidate) pair into one text string, encodes it with `distilbert-base-uncased`, scores it with a scalar linear head, and trains with the pairwise Bradley-Terry loss over roughly 260 preference pairs using AdamW for a few epochs at a small batch size — a genuinely separate learned model, unlike Project 3's programmatic execution-correctness reward. Next up, Lesson 13: evaluating this model on held-out pairs, including a deliberately adversarial check.
