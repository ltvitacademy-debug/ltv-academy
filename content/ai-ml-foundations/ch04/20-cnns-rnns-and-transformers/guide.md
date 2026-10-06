# Lesson 20 — CNNs vs. RNNs vs. Transformers, Conceptually

**Chapter 4 · Deep Learning Foundations · Lesson 20 of 30**

## What you'll learn

- Why the dense, fully-connected network from lessons 17-19 isn't the only architecture
- What a convolution actually computes, worked by hand on a tiny image
- Why RNNs process sequences step by step, and the bottleneck that creates
- The one-sentence shape of a transformer, to set up lesson 21
- A side-by-side comparison of what each architecture is built to notice

## One layer shape doesn't fit every kind of data

Every network so far in this chapter has been **fully connected** (also called "dense"):
every input connects to every neuron in the next layer, with its own independent weight.
That works fine for the small tabular examples in lessons 17-19, but it scales badly and
ignores structure that real data actually has. A photograph has *spatial* structure —
nearby pixels relate to each other. A sentence has *sequential* structure — word order
carries meaning. CNNs, RNNs, and transformers are three different answers to the same
question: how should the network's structure match the structure already in the data?

## CNNs: a small weighted window, slid across the input

A **convolutional neural network** doesn't connect every pixel to every neuron. Instead it
slides a small grid of weights — a **kernel** — across the image, computing one weighted
sum per position. The same small kernel is reused at every position, which is what makes
convolutions so much cheaper than a dense layer on image-sized input. Here's one kernel,
by hand, detecting a left-right edge in a tiny 4x4 image:

```python
img = [[1,1,0,0],
       [1,1,0,0],
       [0,0,1,1],
       [0,0,1,1]]

kernel = [[ 1, 0,-1],
          [ 1, 0,-1],
          [ 1, 0,-1]]   # vertical edge detector

# slide the 3x3 kernel over every valid 3x3 patch,
# multiply element-wise, sum:
# output[0][0] = sum(img[0:3, 0:3] * kernel) = 1
# output[1][0] = sum(img[1:4, 0:3] * kernel) = -1

output = [[ 1,  1],
          [-1, -1]]
```

The kernel's weights (`1, 0, -1` down each column) are tuned to respond strongly when
there's a sharp left-right contrast in a patch, and weakly otherwise — exactly the pattern
in this image, where the top rows have light pixels on the left and the bottom rows have
them on the right. A real CNN learns many such kernels (edges, textures, eventually whole
shapes in deeper layers) the same way lesson 19 learned weights: backpropagation, the
chain rule, gradient descent — just with a shared kernel's weights updated from every
position it slid across.

## RNNs: reading a sequence one step at a time

A **recurrent neural network** processes a sequence (text, a time series) one element at a
time, carrying a **hidden state** forward as a summary of everything read so far:

```
h0 = 0                          # starting hidden state
h1 = f(x1, h0)                  # read token 1, update the summary
h2 = f(x2, h1)                  # read token 2, updating again
h3 = f(x3, h2)                  # ...and so on, one step at a time
```

Each step's hidden state depends on the *previous* step's hidden state, which is exactly
what lets an RNN handle sequences of any length with the same small set of weights. The
cost is the bottleneck: step 50 of a long sequence can only "see" earlier tokens through
whatever survived being repeatedly compressed into that single hidden state, and the
steps cannot be computed in parallel — step 3 needs step 2's result first. For a long
document, information from the beginning can fade out by the end, and training is slow
because of the strict step-by-step order.

## Transformers, in one sentence (lesson 21 goes deep)

A **transformer** replaces the RNN's step-by-step hidden state with **self-attention**:
every token directly looks at every other token in the sequence at once, deciding how much
to weigh each one, with no step-by-step bottleneck and no information having to survive a
long chain of compression. That's the one-sentence version — lesson 21 is the whole lesson
on why that shift mattered enough to reshape the entire field.

## Side by side

| Architecture | Built to notice | Processes input | Classic use |
|---|---|---|---|
| Fully connected (lessons 17-19) | Nothing structural — every input is independent | All at once | Small tabular data |
| CNN | Local spatial patterns (edges, textures) | A sliding window, reused everywhere | Images |
| RNN | Sequential order, via a carried hidden state | One step at a time | Older text/speech models |
| Transformer | Relationships between any two positions at once | All positions in parallel | Modern LLMs (lesson 21) |

## Recap

Fully connected layers treat every input as independent; CNNs exploit an image's spatial
structure with a small, reused, shared kernel (worked by hand on a 4x4 edge-detection
example); RNNs exploit a sequence's order by carrying a hidden state forward one step at a
time, at the cost of a long-range bottleneck and no parallelism. Transformers solve that
bottleneck with self-attention — every position seeing every other position directly — and
lesson 21 is dedicated entirely to why that one architectural change is the reason today's
large language models exist at all.
