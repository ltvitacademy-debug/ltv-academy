# Classical Coding Theory Lab

A hands-on pass through the two pieces of classical coding theory this chapter has used — success-probability arithmetic and minimum distance — before this course moves fully into the quantum case.

## What you'll learn

- How to compute repetition-code success probability for a new channel flip rate yourself
- Why larger codes keep helping, with the actual numbers to prove it
- What "minimum distance" means for a code, and why distance-3 codes correct exactly 1 error
- How to connect distance to the number of errors a code can detect vs. correct

## Worked exercise: a new channel flip rate

The previous lesson's table covered p = 0.01, 0.05, 0.10, 0.20. Here is the same calculation carried out for **p = 0.08**, across repetition codes of length 1 (no code), 3, 5, and 7, using the identical formula:

**P(success) = Σ (for flips = 0 to ⌊n/2⌋) of C(n, flips) · p^flips · (1−p)^(n−flips)**

| n | Success probability at p = 0.08 |
|---|---|
| 1 (no code) | 0.920000 |
| 3 | 0.981824 |
| 5 | 0.995475 |
| 7 | 0.998824 |

The pattern from before holds: each step up in *n* buys a real, shrinking improvement. Going from n=1 to n=3 cuts the failure rate from 8% down to 1.8176% (1 − 0.981824). Going from n=5 to n=7 only cuts the failure rate from 0.4525% down to 0.1176% — a smaller absolute gain, because there's less failure left to remove. This diminishing-but-real-returns pattern is exactly what you should expect to see again in chapter 6, when the "code size" is a surface code's distance *d* instead of a repetition length *n*.

## Minimum distance: why "distance 3" means "corrects 1 error"

A code's **minimum distance** *d* is the smallest number of bit positions in which any two distinct valid codewords differ. For the 3-bit repetition code, the only two codewords are 000 and 111, which differ in all 3 positions — so its minimum distance is 3.

The general rule connecting distance to error-handling power is:

- A code with minimum distance *d* can **detect** up to *d − 1* errors (it will notice something is wrong, even if it can't always fix it).
- A code with minimum distance *d* can **correct** up to ⌊(*d* − 1) / 2⌋ errors (it can identify and fix the error, not just notice it).

Plug in *d* = 3: it detects up to 2 errors, and corrects up to ⌊2/2⌋ = **1** error. That matches exactly what the 3-bit repetition code does in practice — 1 flip, corrected; 2 or 3 flips, decoded wrong, as seen in the previous lesson's failure cases. The 5-bit repetition code has minimum distance 5 (its two codewords, 00000 and 11111, differ in all 5 positions), giving ⌊4/2⌋ = **2** correctable errors — again matching the earlier success-probability math, where the 5-bit code's majority vote survives up to 2 flips.

## Why this matters going forward

This distance-to-correction-power relationship (*d* ≥ 2*t* + 1 to correct *t* errors) is not a classical-only fact — it reappears, unchanged in form, for every quantum code in this course. The Steane code (chapter 4) is called a [[7,1,3]] code specifically because its minimum distance is 3, which is exactly why — like the 3-bit repetition code — it corrects exactly 1 arbitrary single-qubit error, no more. Carrying this one relationship forward is the single most useful thing to take out of the classical review chapter.

## Key terms

| Term | Meaning |
|---|---|
| Minimum distance (d) | The smallest number of positions in which any two valid codewords of a code differ |
| Error detection | Noticing that an error occurred, without necessarily identifying or fixing it |
| Error correction | Identifying which error occurred and fixing it |
| d ≥ 2t + 1 | The general rule: a code of minimum distance d can correct up to t = ⌊(d−1)/2⌋ errors |

## Check yourself

A 7-bit repetition code (0000000 / 1111111) has minimum distance 7. Using the rule d ≥ 2t + 1, how many errors can it correct, and how many can it detect? Does that match the pattern of the 3-bit and 5-bit codes you've already seen?
