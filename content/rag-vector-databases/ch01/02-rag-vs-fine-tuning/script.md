# Script — RAG vs. Fine-Tuning

## Segment 1 (title)

There are two structurally different ways to give a model knowledge it doesn't have. Fine-tuning continues training the model on your own examples, adjusting its weights. RAG leaves the weights untouched and instead retrieves relevant text into the prompt at query time.

## Segment 2 (steps: fine-tuning's strength)

Fine-tuning is the right tool for changing how a model behaves, not what it knows — a consistent output format, a specific tone, a narrow classification skill. It bakes behavior in reliably. What it's not good at is staying current: every time your knowledge changes, you'd need to retrain, and you can't point to a weight as a source.

## Segment 3 (steps: RAG's strength)

RAG keeps knowledge external and updatable — add a document and it's searchable in minutes, no retraining. Because the model is literally handed the retrieved passage, you can show exactly which document an answer came from. In regulated industries or customer support, that traceability often isn't optional.

## Segment 4 (code: the decision rule)

The decision rule comes down to two questions: does the knowledge change often and need to be citable — that's RAG. Do you need to change behavior or format rather than facts — that's fine-tuning. Production systems increasingly use both together.

## Segment 5 (outro)

Next lesson: the RAG architecture itself — the actual embed, retrieve, generate loop that makes this all work end to end.
