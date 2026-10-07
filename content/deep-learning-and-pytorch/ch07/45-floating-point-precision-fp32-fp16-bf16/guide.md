# Floating-Point Precision: FP32, FP16, BF16

Welcome to Chapter 7. Every tensor you've built so far has quietly used 32-bit floating point numbers, and training has worked fine. Once you start training bigger models, that choice starts to cost you real memory and real time — and the fix is to understand what a "32-bit float" actually is, so you can knowingly trade some of its precision for speed. This lesson is the foundation the rest of the chapter builds on.

## What you'll learn

- How a floating-point number is actually laid out in bits: sign, exponent, mantissa
- Why FP32, FP16, and BF16 differ in *range* and in *precision*, and why that's two separate things
- How to create and inspect tensors in each format with `torch.finfo`
- A concrete overflow example that shows why BF16 exists at all

## What's inside a floating-point number

A float isn't one lump of precision — it's three fields packed into a fixed number of bits: a sign bit, an exponent (how big or small the number can get), and a mantissa (how many significant digits you keep). FP32 ("single precision," `torch.float32`) spends 1 bit on sign, 8 on exponent, and 23 on mantissa. That 8-bit exponent gives it a huge range (roughly 1e-38 to 3e38) and the 23-bit mantissa gives it about 7 decimal digits of precision. It's the PyTorch default for a reason: it's accurate enough that you never have to think about it.

```python
import torch

x = torch.tensor([3.14159265], dtype=torch.float32)
print(x.dtype, x.element_size(), "bytes")
print(torch.finfo(torch.float32))
```

## FP16: half the bits, half the exponent

FP16 (`torch.float16`, IEEE half precision) also uses 16 bits total, but it only gives 5 bits to the exponent and 10 to the mantissa. Half the storage means half the memory and, on GPUs with dedicated FP16 tensor cores, much faster matrix multiplies. The cost is a much smaller range — its largest representable finite value is 65,504 — and less precision, around 3 decimal digits. In deep learning, gradients and activations routinely land outside that range, which is why training in raw FP16 without any safety net tends to silently blow up.

```python
big = torch.tensor([70000.0])
print(big.half())          # torch.float16 — overflows to inf
print(torch.finfo(torch.float16).max)
```

## BF16: FP32's range, FP16's size

BF16 ("Brain Float 16," `torch.bfloat16`) is the fix: it keeps FP32's full 8-bit exponent (the same dynamic range, roughly 1e-38 to 3e38) but shrinks the mantissa down to 7 bits. You get the memory and speed benefits of a 16-bit format without FP16's overflow problem — at the cost of fewer significant digits, around 2-3 decimal. That same 70,000 value that overflowed FP16 is completely fine in BF16.

```python
big = torch.tensor([70000.0])
print(big.bfloat16())       # representable — same exponent range as FP32
print(torch.finfo(torch.bfloat16))
```

## Converting between formats

You can move a tensor between formats with `.float()`, `.half()`, and `.bfloat16()`, or the more general `.to(dtype=...)`. Converting down loses precision immediately — it isn't reversible — so these conversions are something you do deliberately, usually right before a forward pass, not something you leave lying around on your stored weights.

```python
x32 = torch.randn(4, 4, dtype=torch.float32)
x16 = x32.half()
xbf = x32.to(dtype=torch.bfloat16)
print(x32.dtype, x16.dtype, xbf.dtype)
```

Modern NVIDIA GPUs (Ampere architecture and newer — A100, RTX 30-series and up) have native BF16 tensor cores, which is why BF16 has become the default recommendation for mixed-precision training when the hardware supports it. Older GPUs may only accelerate FP16. Next lesson, you'll use `torch.autocast` to let PyTorch pick the right format automatically, operation by operation, instead of converting whole tensors by hand.

## Key terms

| Term | Meaning |
|---|---|
| FP32 (`torch.float32`) | 32-bit float: 1 sign + 8 exponent + 23 mantissa bits; PyTorch's default |
| FP16 (`torch.float16`) | 16-bit float: 1 + 5 + 10 bits; small range (max ~65,504), higher overflow risk |
| BF16 (`torch.bfloat16`) | 16-bit float: 1 + 8 + 7 bits; FP32's exponent range, fewer mantissa bits |
| `torch.finfo(dtype)` | Inspects a floating dtype's min, max, resolution, and bit layout |
