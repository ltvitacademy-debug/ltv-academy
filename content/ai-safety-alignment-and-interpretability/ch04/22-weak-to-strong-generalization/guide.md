# Weak-to-Strong Generalization

Most scalable oversight proposals are designs for a future where models exceed human expertise on real tasks. Weak-to-strong generalization takes a different approach: build a miniature version of the actual problem using models available right now, and study it empirically, today, rather than waiting for the real version of the problem to arrive.

## What you'll learn

- How researchers simulate the "weak supervising strong" problem with today's models
- What it means for a strong model to generalize beyond its weak supervisor's mistakes
- The main empirical finding, and why it's encouraging without being a full solution
- What the open research questions around this result actually are

## Simulating the problem with today's models

OpenAI's weak-to-strong generalization work, led by Burns and colleagues, builds an analogy: take a weak model, fine-tune it on a task, and use its (sometimes mistaken) labels to train a much stronger pretrained model on the same task, instead of using ground-truth labels. The weak model stands in for a human supervisor who can't fully verify a superhuman task; the strong model stands in for a future system that exceeds that supervisor's ability. Because both models exist today, and ground truth is actually available to the researchers for grading purposes afterward, this setup lets the field study a version of the real future problem years before it would otherwise be forced to.

## The key question: does the student outgrow the teacher's mistakes?

If you naively fine-tune a strong model on a weak model's labels, you'd expect the strong model's performance to be capped at roughly the weak model's own performance, since that's literally what it's being trained to imitate. The interesting empirical question is whether the strong model does better than that — whether it uses its own pretrained knowledge to generalize past the weak supervisor's specific mistakes, recovering some of the performance gap between the weak supervisor and what the strong model could achieve with true labels.

## The finding: partial, encouraging recovery

The main result is that strong models trained on weak labels often do perform better than the weak supervisor itself, recovering a meaningful fraction of the gap between weak-supervisor performance and the strong model's own ceiling under ideal training. This is the paper's central piece of encouraging news: naive fine-tuning on imperfect supervision isn't a hard ceiling, and a strong model's own pretrained knowledge provides some real generalization past the specific errors in its training signal.

## What's still open

The recovery is partial, not complete, and it varies substantially across tasks and model pairs — some settings show strong generalization, others show much less. The paper itself frames this as an early, imperfect analogy for the real future problem rather than a finished solution: today's weak models fail differently than a human supervisor would, today's strong models aren't yet superhuman in the way the real future problem assumes, and it's an open research question how much of this result will actually hold up as the capability gap between supervisor and system grows larger and the tasks involved get harder and less verifiable.

## Key terms

- **Weak-to-strong generalization** — training a stronger model on a weaker model's labels and measuring how much the stronger model's own knowledge lets it outperform that weak supervisor
- **Naive fine-tuning** — training directly on a supervisor's labels without any additional technique meant to help the student exceed the supervisor's performance ceiling
- **Performance gap recovery** — the fraction of the difference between weak-supervisor performance and the strong model's true ceiling that the strong model manages to recover under weak supervision
- **Ground-truth grading** — using known correct answers, available to researchers but withheld from the training process, to measure how well the weak-to-strong setup actually performed
- **Analogy study** — using models and setups available today to approximate a future problem (superhuman tasks a human can't verify) that doesn't yet exist in its full form
