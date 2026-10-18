# Visualizing a Qubit State on the Bloch Sphere

A single qubit's state can't be fully captured by a probability bar chart alone — two different states can give identical measurement probabilities but point in completely different directions in a deeper geometric sense. The Bloch sphere is the standard way to see that extra information: every pure single-qubit state is a point (really, an arrow) on the surface of a unit sphere.

## What you'll learn

- What the Bloch sphere represents and why it needs two angles, theta and phi
- How to convert theta/phi into 3D Cartesian coordinates (x, y, z)
- How to convert a state's raw amplitudes directly into Bloch coordinates
- How to draw a wireframe sphere and a state vector arrow with Matplotlib's `mplot3d`
- How to read a few landmark states (`|0>`, `|1>`, `|+>`) off the sphere by eye

## What the Bloch sphere represents

Any pure single-qubit state can be written, up to a physically unobservable overall phase, as:

```
|psi> = cos(theta/2)|0> + e^(i*phi) * sin(theta/2)|1>
```

`theta` (the polar angle, 0 to pi) controls how close the state is to `|0>` versus `|1>`. `phi` (the azimuthal angle, 0 to 2*pi) controls the *relative phase* between the two amplitudes — information that a plain probability bar chart throws away entirely, since `P(0)` and `P(1)` only depend on `theta`, never on `phi`. The Bloch sphere plots both angles at once, so two states with identical measurement probabilities but different phase show up as different points on the sphere.

## From angles to 3D coordinates

The point on the sphere's surface is:

```
x = sin(theta) * cos(phi)
y = sin(theta) * sin(phi)
z = cos(theta)
```

A few verified landmark cases make this concrete:

| State | theta | phi | (x, y, z) |
|---|---|---|---|
| `\|0>` | 0 | 0 | (0, 0, 1) |
| `\|1>` | pi | 0 | (0, 0, -1) |
| `\|+>` = (`\|0>` + `\|1>`)/sqrt(2) | pi/2 | 0 | (1, 0, 0) |
| `\|+i>` = (`\|0>` + i`\|1>`)/sqrt(2) | pi/2 | pi/2 | (0, 1, 0) |

```python
import numpy as np

theta = np.pi / 2
phi = np.pi / 2

x = np.sin(theta) * np.cos(phi)
y = np.sin(theta) * np.sin(phi)
z = np.cos(theta)

print(round(x, 4), round(y, 4), round(z, 4))
# 0.0 1.0 0.0
```

`|0>` and `|1>` sit at the north and south poles — that matches intuition, since they're the two outcomes a measurement in the standard basis distinguishes. States with a probability split sit on the equator (`theta = pi/2`); where exactly on the equator depends entirely on the phase `phi`.

## From raw amplitudes to Bloch coordinates directly

You don't always start from `theta`/`phi` — often you have a state as a pair of amplitudes `[alpha, beta]` (possibly complex) straight out of a calculation. The Bloch coordinates can be computed directly from those:

```
z = |alpha|**2 - |beta|**2
x = 2 * Re(alpha * conj(beta))
y = 2 * Im(conj(alpha) * beta)
```

```python
import numpy as np

alpha = 1 / np.sqrt(2)
beta = 1 / np.sqrt(2)

z = abs(alpha) ** 2 - abs(beta) ** 2
x = 2 * (alpha * np.conj(beta)).real
y = 2 * (np.conj(alpha) * beta).imag

print(round(x, 4), round(y, 4), round(z, 4))
# 1.0 0.0 0.0
```

This is the `|+>` state, and it lands at `(1, 0, 0)` exactly as the theta/phi table above predicts — confirming the two formulas agree. Swapping `beta = 1j / np.sqrt(2)` (making beta purely imaginary) moves the point to `(0, 1, 0)`, matching the `|+i>` row in the table.

## Drawing the sphere

`mplot3d` is Matplotlib's 3D toolkit. A wireframe sphere is built from a mesh of `theta`/`phi` values converted with the same formulas as above.

```python
import numpy as np
import matplotlib.pyplot as plt
from mpl_toolkits.mplot3d import Axes3D  # noqa: F401 -- registers 3D projection

fig = plt.figure(figsize=(6, 6))
ax = fig.add_subplot(111, projection="3d")

# Wireframe mesh
u = np.linspace(0, 2 * np.pi, 30)
v = np.linspace(0, np.pi, 30)
xs = np.outer(np.cos(u), np.sin(v))
ys = np.outer(np.sin(u), np.sin(v))
zs = np.outer(np.ones_like(u), np.cos(v))
ax.plot_wireframe(xs, ys, zs, color="lightgray", linewidth=0.5)

ax.set_xlabel("X")
ax.set_ylabel("Y")
ax.set_zlabel("Z")
ax.set_box_aspect([1, 1, 1])  # keeps the sphere from looking stretched

plt.show()
```

`fig.add_subplot(111, projection="3d")` is the key line — it's what makes `ax` a 3D axes object instead of a 2D one. Importing `Axes3D` registers the `"3d"` projection with Matplotlib; in current Matplotlib versions it's often enabled automatically, but importing it explicitly is still the reliable, portable way to guarantee it's available. `set_box_aspect([1, 1, 1])` is important — without it, Matplotlib's default 3D scaling can stretch the sphere into something egg-shaped.

## Drawing the state vector

The state itself is drawn as an arrow from the origin to its `(x, y, z)` point, using `ax.quiver`.

```python
# continuing from the sphere code above
x, y, z = 1.0, 0.0, 0.0  # the |+> state, verified earlier

ax.quiver(0, 0, 0, x, y, z, color="crimson", linewidth=2, arrow_length_ratio=0.1)
ax.set_title("The |+> state on the Bloch sphere")

plt.show()
```

`ax.quiver(x0, y0, z0, dx, dy, dz, ...)` draws an arrow starting at `(x0, y0, z0)` — the origin, for a Bloch vector — extending by `(dx, dy, dz)`. Since the vector is already the full displacement from the origin, `dx, dy, dz` are just the state's `x, y, z` coordinates directly.

## Key terms

| Term | Meaning |
|---|---|
| Bloch sphere | A unit sphere whose surface points represent every possible pure single-qubit state |
| theta (polar angle) | Controls the probability split between `\|0>` and `\|1>`; `\|0>` is the north pole, `\|1>` is the south pole |
| phi (azimuthal angle) | Controls the relative phase between amplitudes; invisible to a plain probability bar chart |
| `Axes3D` / `projection="3d"` | The Matplotlib mechanism that turns a 2D axes into a 3D plotting surface |
| `ax.quiver` | Draws a 3D arrow from a start point by a given displacement — used here for the state vector |

## Check yourself

Two single-qubit states have the exact same measurement probabilities, P(0) = 0.5 and P(1) = 0.5, but they are visibly different points on the Bloch sphere. What property of the states must differ, and where on the sphere do both points lie?
