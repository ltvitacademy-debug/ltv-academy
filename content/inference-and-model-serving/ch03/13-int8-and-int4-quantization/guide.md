# INT8 & INT4 Quantization

Lesson 12 established why quantization works and the PTQ/QAT split. This lesson gets concrete about the three methods you'll actually encounter when you quantize a real model: bitsandbytes, GPTQ, and AWQ. They solve the same outlier problem from Lesson 12 in different ways, and the right choice depends on whether you're optimizing for simplicity, raw compression, or accuracy retention.

## What you'll learn

- How bitsandbytes, GPTQ, and AWQ each approach post-training quantization differently
- Why GPTQ and AWQ require a calibration step that bitsandbytes doesn't
- What "activation-aware" means in AWQ, and why it changes which weights get protected
- How to choose between INT8 and INT4 for a given deployment

## bitsandbytes: zero-calibration, drop-in quantization

bitsandbytes quantizes weights on the fly, at model-load time, with no calibration dataset and no separate conversion step — you pass a `BitsAndBytesConfig` to `from_pretrained` (as shown in Lesson 12) and it just works. Its 4-bit mode, **NF4** (4-bit NormalFloat), uses a data type tuned to the roughly bell-shaped distribution of neural network weights rather than a plain linear INT4 grid, which recovers meaningfully more accuracy than naive 4-bit rounding. The trade-off: because there's no calibration pass tailored to your specific model and data, bitsandbytes generally trails GPTQ and AWQ in both compression efficiency and inference speed. It's the right default when you want something working in one line of code, less so when you're optimizing a production serving stack.

## GPTQ: calibrate layer by layer, correct for error as you go

GPTQ (Generalized Post-Training Quantization) runs a short calibration pass — a few hundred example sequences through the model — and quantizes one layer at a time. After quantizing each weight, it uses the *remaining*, not-yet-quantized weights in that layer to compensate for the rounding error just introduced, based on second-order (Hessian) information about how sensitive the output is to each weight. This error-correction step is what lets GPTQ push down to 4-bit, and even 3-bit, with a much smaller accuracy hit than naive rounding. The cost is that calibration takes real GPU time (though far less than training) and is somewhat sensitive to the calibration data chosen.

## AWQ: protect the weights that matter most

AWQ (Activation-aware Weight Quantization) starts from a different observation: not all weights are equally important, and the ones that matter most are the ones whose *activations* (not the weight values themselves) tend to be unusually large. AWQ identifies that small fraction of "salient" weight channels by looking at activation magnitudes during a calibration pass, then scales those channels up before quantizing (and scales the corresponding activations down afterward) so that the important values suffer the least precision loss. AWQ typically runs faster to produce a quantized checkpoint than GPTQ, and tends to serve faster too, because it keeps the inference path simpler.

## Choosing between INT8 and INT4

- **INT8** keeps roughly double the memory footprint of INT4 but loses very little accuracy versus the original FP16 model for most tasks — it's the conservative choice when quality is the priority and VRAM isn't the binding constraint.
- **INT4** roughly halves memory again versus INT8, which is often what makes a 70B-parameter model fit on a single GPU instead of several — but accuracy degradation becomes noticeable on harder reasoning or long-tail tasks, especially with naive methods. This is exactly why GPTQ's and AWQ's calibration-based error correction matters most at 4-bit, not 8-bit.

## Key terms

| Term | Meaning |
|---|---|
| bitsandbytes | Zero-calibration, load-time quantization library; 4-bit mode uses the NF4 data type |
| GPTQ | Calibration-based PTQ that corrects layer-by-layer rounding error using Hessian information |
| AWQ | Calibration-based PTQ that protects weight channels tied to large activation magnitudes |
| NF4 | A 4-bit data type shaped to the typical distribution of neural network weights |
| Salient weights | The small subset of weights an activation-aware method protects most carefully |

## Recap

bitsandbytes trades calibration for simplicity; GPTQ and AWQ both calibrate, but GPTQ corrects rounding error layer by layer while AWQ protects the weight channels tied to large activations before quantizing. All three aim at the same target — recoverable accuracy at low bit-width — by solving the outlier problem from Lesson 12 differently. Next up, Lesson 14: pruning, a compression technique that removes weights entirely instead of shrinking how each one is stored.
