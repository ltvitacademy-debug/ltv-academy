# Script — Floating-Point Precision: FP32, FP16, BF16

## Segment 1 (title)

Welcome to Chapter 7. Every tensor you've built so far has quietly used 32-bit floats, and it's worked fine. Once your models get bigger, that choice starts costing you real memory and time — so this lesson opens up what a float actually is, bit by bit.

## Segment 2 (steps)

A float is three fields packed into a fixed number of bits: a sign bit, an exponent that sets how big or small the number can get, and a mantissa that sets how many significant digits you keep. Range and precision are controlled separately, and that's the whole story for everything else in this chapter.

## Segment 3 (code)

FP32, float32, spends 1 bit on sign, 8 on exponent, and 23 on mantissa. That gives it a huge range, roughly ten to the minus 38 up to ten to the 38, and about 7 decimal digits of precision. It's PyTorch's default because it's accurate enough that you never have to think about it.

## Segment 4 (code)

FP16 only gives 5 bits to the exponent, so its biggest representable value is 65,504 — a number like 70,000 silently overflows to infinity. BF16 keeps FP32's full 8-bit exponent but shrinks the mantissa instead, so that same 70,000 is completely fine; you just lose some precision, not range.

## Segment 5 (steps)

So the choice between the two 16-bit formats is really a choice about what you're willing to sacrifice. FP16 trades range for more mantissa precision. BF16 trades precision for FP32's safer range, which is exactly why it's become the default on modern GPUs with native BF16 tensor cores.

## Segment 6 (outro)

Next lesson, you'll stop converting tensors by hand and let torch.autocast pick the right format automatically, operation by operation, during training.
