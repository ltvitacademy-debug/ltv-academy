# Script — Transfer Learning, Intuition

## Segment 1 (title)

Lessons twenty-two through twenty-four all quietly assumed one thing: that knowledge a model learned on one task can help it on a different task. That assumption has a name — transfer learning — and it's the actual reason a pretrained model is useful at all.

## Segment 2 (steps)

Lesson twenty's convolution example makes it concrete. A CNN's first layer learns edges and textures — useful for recognizing almost anything. Deeper layers combine those into specific shapes. The first layer looks nearly identical whether the model was trained on pets or cars. The last layer wouldn't. General knowledge sits early. Task-specific knowledge sits late.

## Segment 3 (code)

Lesson twenty-four fine-tuned every weight. There's a lighter option: freeze the pretrained layers entirely, and train only a small new layer on top. Setting requires_grad to False tells backpropagation to skip that parameter completely — no gradient, no update, ever. Only the small classification head trains.

## Segment 4 (code)

Just how small is that head? For this model, one layer mapping seven hundred sixty eight numbers down to two classes: fifteen hundred thirty eight parameters. Against a base model of around one hundred ten million, that's roughly zero point zero zero one four percent trained — the rest left completely untouched.

## Segment 5 (steps)

Feature extraction and fine-tuning aren't different techniques — they're the same spectrum at different settings. Freeze everything and train a tiny head, or unfreeze everything and nudge it all. Real projects often land in between: freeze most of it, unfreeze just the last few layers if accuracy needs it.

## Segment 6 (outro)

Early layers generalize, later layers specialize, and how much you unfreeze is a dial, not a binary choice. Next lesson goes back to the Hub itself — reading a model card closely enough to actually choose the right starting point.
