# Script — Building an SFT Dataset

## Segment 1 (title)

The last two lessons covered why instruction tuning works and how conversations get serialized. This lesson is the practical bridge: how an actual SFT dataset gets assembled, masked, and handed to a trainer.

## Segment 2 (steps)

Data comes from three blended sources. Human-written demonstrations are the most expensive but highest quality, and were the backbone of InstructGPT's original dataset. Model-generated responses, often called distillation, scale far more cheaply, provided it stays within the generating model's usage terms. And existing Q&A or support data gets reformatted into the same instruction-response shape. All of it still needs the quality filtering and dedup from Chapter 2.

## Segment 3 (code)

Loss only counts the assistant's response tokens. The standard implementation builds a labels tensor identical to the input, except prompt-token positions get set to negative one hundred, which CrossEntropyLoss treats as ignore. In a multi-turn conversation, every assistant turn stays unmasked, not just the final one — getting that wrong silently throws away most of the training signal.

## Segment 4 (code)

In practice, nobody hand-rolls this masking. TRL's SFTTrainer takes a conversational dataset, applies the chat template, and handles prompt masking internally — you just configure sequence length, whether to pack multiple conversations per sequence, batch size, and learning rate, and call train.

## Segment 5 (outro)

Packing instruction data is riskier than pretraining packing, since unrelated conversations concatenated together can bleed into each other unless attention is blocked between them — which is why many SFT setups just truncate per conversation instead. Up next: the dataset's ready, but how much of the model actually needs updating to learn from it?
