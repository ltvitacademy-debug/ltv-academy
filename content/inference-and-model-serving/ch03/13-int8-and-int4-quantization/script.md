# Script — INT8 & INT4 Quantization

## Segment 1 (title)

Lesson twelve established why quantization works. This lesson gets concrete about the three methods you'll actually run into: bitsandbytes, GPTQ, and AWQ.

## Segment 2 (steps)

bitsandbytes quantizes at load time with no calibration dataset at all — its four-bit mode, NF4, uses a data type shaped to how neural network weights are usually distributed. GPTQ and AWQ both calibrate first, using a few hundred example sequences, but they use that calibration differently.

## Segment 3 (steps)

GPTQ quantizes one layer at a time, and after rounding each weight, it uses the weights not yet quantized to compensate for the error it just introduced, guided by how sensitive the output actually is to each one. That correction loop is what lets GPTQ push down to four-bit, even three-bit, without the accuracy falling off a cliff.

## Segment 4 (steps)

AWQ takes a different angle: it finds the small fraction of weights tied to unusually large activation values, scales those up before quantizing, and scales the activations back down afterward. The eight-bit versus four-bit choice comes down to this same tension — eight-bit keeps nearly all the accuracy at roughly half the memory savings, four-bit saves much more memory but needs that calibration-based error correction to stay usable.

## Segment 5 (code)

Here's AWQ in practice: load the model and tokenizer, call quantize with your bit-width and group size, and save. The calibration pass happens automatically inside that one call.

## Segment 6 (outro)

All three methods are solving the same outlier problem from lesson twelve, just differently. Next up, lesson fourteen: pruning, which removes weights entirely instead of shrinking how each one is stored.
