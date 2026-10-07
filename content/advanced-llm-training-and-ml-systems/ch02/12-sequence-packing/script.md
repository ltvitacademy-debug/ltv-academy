# Script — Sequence Packing

## Segment 1 (title)

Tokenized documents have to be assembled into fixed-length sequences the model trains on, but real documents vary wildly in length. Naively padding every short document wastes enormous GPU compute. Sequence packing fixes that by concatenating multiple documents into each training sequence.

## Segment 2 (code)

If a model's context length is four thousand ninety six tokens and a document only tokenizes to three hundred, padding it up to full length means roughly ninety three percent of that sequence is padding -- tokens with no training signal that still cost full attention compute.

## Segment 3 (code)

Packing solves this by concatenating many documents end to end, separated by an end-of-sequence token, into one long stream, then chunking that stream into fixed-length blocks. Nearly every position in every sequence now carries real content. This is the same pattern behind Hugging Face trl's ConstantLengthDataset and the packing option on SFTTrainer.

## Segment 4 (steps)

Packing introduces one subtlety: a packed sequence can contain the tail of one document and the start of an unrelated one. With standard causal attention, a token in the second document can still attend across that boundary. Many pipelines simply accept this mild noise, while others build a document-aware, block-diagonal attention mask that only allows attention within the same original document.

## Segment 5 (outro)

Getting packing right turns wasted padding into real training signal. Next up, lesson thirteen: data mixtures and domain weighting, deciding how much of each source actually ends up in these sequences.
