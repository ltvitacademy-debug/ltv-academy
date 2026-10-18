# Quantum Neural Network Architectures

"Quantum neural network" (QNN) is a name borrowed from classical deep learning, and like most borrowed names, the analogy is useful but imperfect. This lesson is precise about what structurally maps over from classical neural networks, and what genuinely doesn't.

## What you'll learn

- The specific structural analogy between QNN layers and classical NN layers — and its limits
- How a multi-layer QNN differs from the single-ansatz VQC of Chapter 3
- What "quantum neuron" models exist in the literature, and why they're not the dominant approach used here
- Why QNNs don't have anything structurally equivalent to classical nonlinear activation functions, and why that matters

## The structural analogy, stated carefully

A classical feedforward neural network alternates **linear transformations** (weight matrices) with **nonlinear activation functions** (ReLU, sigmoid). A QNN, in the sense used throughout this course, alternates:

- **Parameterized rotation layers** (Lesson 6's trainable single-qubit gates) — loosely analogous to a linear layer's weights
- **Entangling layers** (fixed two-qubit gates like CNOT) — with no classical neural-network analogue at all; this is where the metaphor starts to break down

Stacking several rotation+entangling blocks, as introduced in Lesson 6, is sometimes specifically called a "QNN" when the intent is explicitly to mimic the layered structure of a deep classical network, as opposed to "VQC," which is used more generally for any trainable circuit used as a classifier. In practice in the literature, the terms overlap heavily and aren't used with strict, universally agreed boundaries — know both terms, but don't expect a sharp dividing line.

## QNN vs. the VQC from Chapter 3

Nothing about the underlying circuit mechanics changes between a VQC and a QNN — both use the same encode → ansatz → measure → loss → parameter-shift-gradient → update loop from Lesson 12. The distinction that does matter is architectural intent and depth: a "QNN" framing usually implies a deeper stack of layers, explicitly justified by analogy to how classical networks gain expressiveness through depth, whereas "VQC" is often used for a single ansatz block applied once. This is a difference of emphasis and naming convention, not a different training algorithm — which also means every obstacle from Chapter 2 (barren plateaus getting worse with depth, parameter-shift cost scaling with parameter count) applies at least as strongly to a QNN as to a shallower VQC, and usually more so, since QNNs are specifically motivated by going deeper.

## "Quantum neuron" proposals

Some research threads have proposed circuit constructs intended to mimic an individual classical neuron's behavior more directly — including constructions using repeat-until-success circuits or specific nonlinear-approximating gate sequences meant to introduce neuron-like nonlinearity at the single-unit level. These exist in the literature and are worth knowing by name, but they are not the dominant, widely-used approach in practical QML work today — the layered rotation+entangling ansatz is what you'll actually encounter in PennyLane and Qiskit ML tutorials, papers, and this course's labs.

## The missing piece: no clean quantum analogue of a nonlinear activation function

This is the single most important structural difference, and it's worth dwelling on. Classical deep networks derive much of their expressive power from stacking nonlinear activation functions between linear layers — without that nonlinearity, a deep classical network collapses mathematically into a single linear transformation, no matter how many layers it has. Quantum mechanics, by contrast, evolves states **linearly** (unitarily) between measurements — there is no natural, built-in quantum gate that behaves like a ReLU. Circuit designers work around this in a few ways: entangling gates introduce genuine (if different) nonlinear-feeling complexity in the *correlations* a circuit can represent even though the underlying operators are linear; and some proposals introduce nonlinearity via mid-circuit measurement and post-processing, at the cost of extra circuit complexity. This is a real, open design question — not a solved problem — and a significant reason QNN expressiveness doesn't map onto classical deep-learning intuition as cleanly as the naming suggests.

## Key terms

| Term | Meaning |
|---|---|
| Quantum neural network (QNN) | A multi-layer variational circuit, typically alternating parameterized rotations and entangling gates, used by loose analogy to classical deep networks |
| Quantum neuron | A proposed circuit construct intended to mimic a single classical neuron's nonlinear behavior more directly; not the dominant approach in practice |
| Unitary evolution | The linear, reversible way quantum states evolve between measurements — the mathematical reason there's no natural quantum analogue of a classical nonlinear activation |
| Repeat-until-success circuit | A circuit design technique using conditional repetition to approximate nonlinear operations, used in some quantum-neuron proposals |

## Check yourself

A student says "a QNN with 10 layers should be strictly more powerful than a VQC with 1 layer, the same way a 10-layer classical neural network beats a 1-layer one." Using this lesson's point about nonlinear activation functions, what's incomplete about that comparison?
