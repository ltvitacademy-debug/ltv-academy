# Lesson 21 — Fine-Tuning, Basics

**Chapter 4 · Fine-Tuning & Customization · Lesson 21 of 31**

## What you'll learn

- The real, mechanical steps of a fine-tuning job, using OpenAI's live API as the concrete
  example (the one major self-serve fine-tuning API still running as of this course)
- The exact JSONL training-data shape
- What a fine-tuning job's status values mean, and what you get back when it succeeds
- Which hyperparameters you can actually set
- How Claude fine-tuning differs structurally — it runs through Amazon Bedrock, not a
  self-serve Claude API call (Lesson 20)

## The mechanical steps, at a glance

```
Prepare examples → Upload file → Create job → Job trains → Get a new model ID → Call it
```

Every self-serve fine-tuning flow follows this same shape, whichever provider is running
it. This lesson walks it using OpenAI's fine-tuning API as the real, concrete example,
since it's the major provider still running a self-serve flow today (see Lesson 20 for why
that matters, and why this isn't the industry's long-term direction).

## Step 1 — training data: one JSON object per line

Each line of your training file is a complete example conversation:

```json
{"messages": [
  { "role": "user", "content": "..." },
  { "role": "assistant", "content": "..." }
]}
```

You upload a `.jsonl` file (one such line per training example) and get back a file ID to
reference in the next step.

## Step 2 — create the job

```json
{
  "model": "gpt-4.1-mini",
  "training_file": "file-abc123"
}
```

`POST /v1/fine_tuning/jobs` with just those two fields kicks off training on reasonable
defaults. The job object that comes back tracks `status` (`validating_files` →
`running` → `succeeded`, or `failed`), plus `trained_tokens`, `created_at`, and
`finished_at`.

## Step 3 — optional hyperparameters

You can override training behavior instead of accepting the defaults:

```json
{
  "model": "gpt-4.1-mini",
  "training_file": "file-abc123",
  "method": {
    "supervised": {
      "hyperparameters": { "n_epochs": 3, "batch_size": 4 }
    }
  }
}
```

`n_epochs` (how many passes over your data), `batch_size`, and `learning_rate_multiplier`
are the ones you'll actually touch — and the right starting move is almost always "leave
them at the defaults" unless you have a specific, measured reason not to.

## Step 4 — use the result

Once `status` is `succeeded`, the job object includes `fine_tuned_model` — a new model ID
string. You call it exactly like any other model, in the same chat completion shape from
Lesson 13:

```json
{ "model": "ft:gpt-4.1-mini:acme::abc123", "messages": [ { "role": "user", "content": "..." } ] }
```

## The Claude path looks structurally different

There is no equivalent "upload a file, call an endpoint" self-serve flow on Anthropic's
own Claude API (Lesson 20). Fine-tuning a Claude model runs through **Amazon Bedrock**
instead — a different product, different console, different billing — and historically
has been scoped to specific models rather than the whole current lineup. If your
organization is set up around Claude, "fine-tune it" means a materially different project
than it does for a GPT model, not just a different `model` string in the same shape.

## Key terms

| Term | Meaning |
|---|---|
| JSONL | One JSON object per line — the standard training-data format |
| Fine-tuning job | A tracked, asynchronous training run with a `status` |
| `fine_tuned_model` | The new model ID string you get back and call like any other model |
| `trained_tokens` | How many tokens the training run actually consumed — this is what training cost is billed on (Lesson 24) |
| Hyperparameter | A training setting (epochs, batch size, learning rate) you can override from the default |

## Lab

1. Write three lines of a valid JSONL training file for a task of your choosing.
2. Write the minimal JSON body to create a fine-tuning job from an uploaded file.
3. List the job status values from `validating_files` through to a successful finish, in
   order.

## Check yourself

You're ready for Lesson 22 when you can describe the mechanical steps of a fine-tuning job
from memory, and explain why "fine-tune Claude" and "fine-tune GPT" are structurally
different projects today.
