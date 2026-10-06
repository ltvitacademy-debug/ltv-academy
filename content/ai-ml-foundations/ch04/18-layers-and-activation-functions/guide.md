# Lesson 18 — Layers & Activation Functions

**Chapter 4 · Deep Learning Foundations · Lesson 18 of 30**

## What you'll learn

- Why stacking layers *without* an activation function is pointless — proved with numbers
- The three activation functions you'll meet constantly: sigmoid, tanh, and ReLU
- What each one's formula actually computes, with a worked table of values
- The "dying ReLU" problem, and why ReLU is still the default for hidden layers anyway
- Which activation to reach for in a hidden layer versus an output layer

## The activation function is the whole point

Lesson 17 showed a forward pass: a weighted sum `z`, then an activation turns it into the
neuron's output `a`. It's tempting to assume the activation is a minor finishing touch.
It is not — remove it, and stacking layers buys you nothing at all. Here's the proof, by
hand. Two linear layers, no activation:

```python
w1, b1 = 2.0, 1.0   # layer 1: h = w1*x + b1
w2, b2 = 3.0, -1.0  # layer 2: y = w2*h + b2

# substitute h into y:
# y = w2*(w1*x + b1) + b2 = (w2*w1)*x + (w2*b1 + b2)
combined_w = w2 * w1        # 6.0
combined_b = w2*b1 + b2     # 2.0

for x in [0, 1, 2]:
    h = w1*x + b1
    y = w2*h + b2
    print(x, y, combined_w*x + combined_b)
```

```
0  2.0  2.0
1  8.0  8.0
2  14.0 14.0
```

Both routes give identical answers at every `x`, because two stacked linear layers
*algebraically collapse* into one linear layer (`w=6.0, b=2.0`) — no matter how many
layers you add, as long as none of them have a nonlinear activation, the whole network
can only ever draw a straight line (or flat plane). An activation function is what
prevents that collapse and lets depth actually mean something.

## The three activations you'll see constantly

```
sigmoid(z) = 1 / (1 + e^-z)        range: (0, 1)
tanh(z)    = (e^z - e^-z)/(e^z+e^-z)   range: (-1, 1)
relu(z)    = max(0, z)              range: [0, ∞)
```

Worked values, same five inputs through all three:

```
z     sigmoid   tanh     relu
-2.0   0.1192  -0.9640    0
-0.5   0.3775  -0.4621    0
 0.0   0.5000   0.0000    0
 0.5   0.6225   0.4621    0.5
 2.0   0.8808   0.9640    2.0
```

**Sigmoid** squashes anything into (0, 1), which is exactly a probability's range — that's
why it sits on the output of a binary classifier (the `out = 0.6673` from lesson 17 is a
sigmoid output, readable as "67% confidence"). **Tanh** is sigmoid's zero-centered cousin,
squashing into (-1, 1); zero-centered outputs make some networks train more smoothly.
**ReLU** (Rectified Linear Unit) is almost insultingly simple — negative inputs become
exactly 0, positive inputs pass through unchanged — and it is the default choice for
hidden layers in modern networks precisely *because* it's cheap to compute and doesn't
squash large positive values down the way sigmoid and tanh do.

## The dying ReLU problem

ReLU's simplicity has a cost. Look at the table again: every negative `z` maps to exactly
`0`, with zero slope there. If a neuron's weights drift so its weighted sum is negative
for every training example it sees, that neuron outputs `0` forever and its gradient
(lesson 19) is also `0` forever — it stops learning entirely. This is called a **dead
ReLU**. In practice this is managed, not eliminated: sensible weight initialization,
reasonable learning rates, and variants like "leaky ReLU" (which lets a small negative
slope through instead of a hard `0`) all reduce how often it happens. It's a real
trade-off, not a reason to avoid ReLU — just something to know is happening if a network
trains worse than expected.

## Choosing one: hidden layers vs. the output layer

| Where | Typical choice | Why |
|---|---|---|
| Hidden layers | ReLU | Cheap, doesn't squash large values, trains fast in practice |
| Output, binary classification | Sigmoid | Squashes to (0, 1), readable as a probability |
| Output, multi-class classification | Softmax | Turns a layer of scores into a probability distribution over all classes |
| Output, regression | None (linear) | The target isn't bounded to a fixed range |

This table is exactly why lesson 17's hidden neurons used sigmoid but you'll see ReLU far
more often in real hidden layers from here forward — sigmoid was chosen there to keep the
by-hand arithmetic in one familiar function. Real networks almost always use ReLU in
hidden layers and save sigmoid (or softmax) for the output.

## Recap

Stack layers without an activation function and the whole network collapses, algebraically,
into one linear function — the lesson's own numbers proved it. Sigmoid and tanh squash
into a bounded range and suit output layers; ReLU is cheap and avoids squashing large
values, which is why it's the default for hidden layers, at the cost of the dying-ReLU
failure mode. Next, lesson 19 uses exactly these activation functions' derivatives to show
how a network's weights actually get learned.
