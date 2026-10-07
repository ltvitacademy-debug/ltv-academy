# Script — Capstone: Evaluation & Error Analysis

## Segment 1 (title)

Training the model is only half the capstone — the other half is being honest about how well it actually works. This lesson covers a quantitative score, a qualitative read, and error analysis, using tools you already have from Chapters 2, 6, and 8.

## Segment 2 (steps)

Three ways to judge the model. Perplexity, from held-out loss. Generated samples, using greedy, top-k, and top-p sampling. And a reading of the gap between training and validation loss to catch overfitting before it quietly ruins your results.

## Segment 3 (code)

Run a no-grad pass over the validation set in eval mode, sum the cross-entropy loss over every token, and divide by the token count. Exponentiate that average loss and you get perplexity — roughly, how many equally-likely next tokens the model is confused between. Lower is better, and for a model this size, single digits to low teens is a reasonable, honest result.

## Segment 4 (code)

A perplexity number doesn't tell you what the model actually writes. Generate samples. Greedy decoding is deterministic but tends to loop and repeat. Top-k and top-p add controlled randomness and usually read more natural. Try both on the same seed text and compare what comes out.

## Segment 5 (steps)

Watch the gap between training and validation loss. Both falling together with validation slightly above is healthy. Training loss falling while validation flattens or rises is overfitting — a tiny model will do this reliably if you train it too long on too little data. Both stuck flat from the start usually means a configuration problem, not a hard dataset.

## Segment 6 (outro)

Quantitative score, qualitative read, honest error analysis — that's a complete evaluation. Up next, Lesson 60: writing this project up and pointing yourself toward what comes next.
