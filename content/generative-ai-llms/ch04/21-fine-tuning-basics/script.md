# Lesson 21 — Fine-Tuning, Basics · Voiceover script

Segments map 1:1 to slides. Target: ~3 minutes total.

---

## S1 · TITLE CARD

You've decided fine-tuning is actually worth it for your use case. So what does that
process actually look like, mechanically? This lesson walks it using OpenAI's fine-tuning
API as the real, concrete example — the major self-serve flow still running today.

## S2 · STEPS CARD: the shape

Four stages, whichever provider is running it. Prepare your training data as JSONL — one
example conversation per line. Upload that file and create a job, referencing it and
picking a base model. The job trains asynchronously, moving through a status from
validating to running to succeeded, or failed. And once it succeeds, you call the result
exactly like any other model.

## S3 · CODE CARD: one training example

Here's what one line of that training file actually looks like — the exact same messages
shape from Lesson 13, a user turn and an assistant turn, just saved to a file instead of
sent live. Your training file is just hundreds of these, one per line.

## S4 · CODE CARD: creating the job

And here's the real request that kicks off training: a POST to fine_tuning slash jobs,
with just a model and a training_file reference. Two fields, sane defaults. You can
override hyperparameters like epochs or batch size, but the right starting move is almost
always to leave them alone unless you have a specific, measured reason not to.

## S5 · CODE CARD: calling the result

Once the job succeeds, you get back a fine_tuned_model field — a brand new model ID
string. And here's the good news: you call it exactly like any other model, in the exact
same chat completion shape from Lesson 13. Nothing about how you use it changes, only
which model string you pass.

## S6 · OUTRO CARD

Prepare, upload, train, call — that's fine-tuning's real mechanical shape on the provider
still running it self-serve. Worth remembering: the Claude path looks structurally
different, running through Amazon Bedrock instead. Next lesson covers a technique that
makes training itself dramatically cheaper: LoRA. See you there.
