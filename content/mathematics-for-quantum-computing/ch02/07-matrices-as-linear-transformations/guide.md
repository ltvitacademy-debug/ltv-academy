# Matrices as Linear Transformations

You just learned how to multiply a matrix by a vector. Now the key conceptual leap: a matrix isn't just a grid of numbers you compute with — it's a *transformation*, a rule that takes any vector in and produces a new vector out. In quantum computing, every gate is literally this: a matrix that transforms a qubit's state vector into a new state vector. Once you see matrices this way, "applying a gate" and "multiplying by a matrix" become the same sentence.

## What you'll learn

- Why a matrix $M$ acting on a vector $v$ (computing $Mv$) is best understood as "transforming" $v$ into a new vector
- A worked example of a rotation matrix physically rotating a specific vector
- The Pauli-X matrix as the quantum NOT gate, verified by actual matrix-vector multiplication
- Why this transformation view is exactly how you should think about every quantum gate from here on

## A matrix as a rule that transforms vectors

Given a matrix $M$ and a vector $v$, the product $Mv$ is a new vector. If you feed $M$ every possible input vector, it defines a consistent geometric rule — stretching, rotating, flipping, or shearing space. That rule is called a **linear transformation**, and every matrix represents one.

This is a shift in viewpoint from Lesson 6: there, multiplication was "an operation that produces a number in each slot." Here, $Mv$ is "the vector $v$, after being transformed by $M$." Both descriptions use the exact same arithmetic — only the interpretation changes, and the interpretation is what makes matrices useful for describing physical processes like quantum gates.

## Worked example: a rotation matrix

The matrix that rotates a 2D vector counterclockwise by angle $\theta$ is

$$R_\theta = \begin{pmatrix} \cos\theta & -\sin\theta \\ \sin\theta & \cos\theta \end{pmatrix}$$

Take $\theta = 90°$. Since $\cos 90° = 0$ and $\sin 90° = 1$:

$$R_{90°} = \begin{pmatrix} 0 & -1 \\ 1 & 0 \end{pmatrix}$$

Apply it to $v = \begin{pmatrix} 1 \\ 0 \end{pmatrix}$ (a vector pointing right, along the x-axis):

$$R_{90°}v = \begin{pmatrix} (0)(1) + (-1)(0) \\ (1)(1) + (0)(0) \end{pmatrix} = \begin{pmatrix} 0 \\ 1 \end{pmatrix}$$

$(1,0)$ became $(0,1)$ — the vector rotated 90° counterclockwise, exactly as the matrix promises, pointing straight up now instead of right. Try it on a second vector, $w = \begin{pmatrix} 2 \\ 1 \end{pmatrix}$:

$$R_{90°}w = \begin{pmatrix} (0)(2) + (-1)(1) \\ (1)(2) + (0)(1) \end{pmatrix} = \begin{pmatrix} -1 \\ 2 \end{pmatrix}$$

Same matrix, same 90° rotation rule, applied consistently to a different input. That consistency — one fixed rule applied to any vector you give it — is the defining feature of a linear transformation, and it's exactly what lets us describe a quantum gate once, as a single fixed matrix, and know it will act the same way on whatever qubit state it's given.

## The Pauli-X matrix: the quantum NOT gate

In quantum computing, a qubit's two basic states are written $|0\rangle$ and $|1\rangle$, and as vectors they are

$$|0\rangle = \begin{pmatrix} 1 \\ 0 \end{pmatrix}, \quad |1\rangle = \begin{pmatrix} 0 \\ 1 \end{pmatrix}$$

The **Pauli-X matrix** is

$$X = \begin{pmatrix} 0 & 1 \\ 1 & 0 \end{pmatrix}$$

It is the quantum analog of a classical NOT gate: it flips a bit. Verify this by actually multiplying. First, $X|0\rangle$:

$$X|0\rangle = \begin{pmatrix} 0 & 1 \\ 1 & 0 \end{pmatrix}\begin{pmatrix} 1 \\ 0 \end{pmatrix} = \begin{pmatrix} (0)(1)+(1)(0) \\ (1)(1)+(0)(0) \end{pmatrix} = \begin{pmatrix} 0 \\ 1 \end{pmatrix} = |1\rangle$$

Now $X|1\rangle$:

$$X|1\rangle = \begin{pmatrix} 0 & 1 \\ 1 & 0 \end{pmatrix}\begin{pmatrix} 0 \\ 1 \end{pmatrix} = \begin{pmatrix} (0)(0)+(1)(1) \\ (1)(0)+(0)(1) \end{pmatrix} = \begin{pmatrix} 1 \\ 0 \end{pmatrix} = |0\rangle$$

$X$ transforms $|0\rangle$ into $|1\rangle$ and $|1\rangle$ into $|0\rangle$ — it's the bit-flip gate, and it does this the same way a rotation matrix rotates: by being a fixed linear transformation applied via matrix-vector multiplication. There's no special "quantum" arithmetic happening here — it's the identical row-times-column multiplication from Lesson 6, applied to a physically meaningful vector.

## Common mistakes

- **Thinking a gate "does something" outside of matrix multiplication.** A gate's entire effect on a state is captured by multiplying the gate's matrix by the state's vector. There is nothing more to compute.
- **Forgetting that the transformation has to be checked on the actual vector, not assumed.** It's tempting to eyeball $X$ and say "obviously it swaps the two entries" — true here, but always verify with real multiplication, especially once matrices get more complex (as they will with Pauli-Y and general gates later in this course).

## Key terms

| Term | Meaning |
|---|---|
| Linear transformation | A consistent rule, represented by a matrix, that maps any input vector to an output vector via matrix-vector multiplication |
| Rotation matrix | A matrix of the form $\begin{pmatrix}\cos\theta & -\sin\theta\\ \sin\theta & \cos\theta\end{pmatrix}$ that rotates a 2D vector counterclockwise by angle $\theta$ |
| Pauli-X gate | The matrix $\begin{pmatrix}0&1\\1&0\end{pmatrix}$; the quantum bit-flip gate, swapping $\lvert 0\rangle$ and $\lvert 1\rangle$ |
| $\lvert 0\rangle$, $\lvert 1\rangle$ | The two basic qubit states, written as the column vectors $(1,0)$ and $(0,1)$ |

## Check yourself

Compute $X|0\rangle$ and $X|1\rangle$ by hand, row-times-column, the same way this lesson did. Then explain why calling $X$ a "linear transformation" is more accurate than just calling it "a gate that swaps two numbers" — what does the transformation view capture that the shortcut description doesn't?
