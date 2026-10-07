# Script — Unconstrained Optimization & Gradient Methods

## Segment 1 (title)

Chapter five turns from building models to tuning them. Before you can calibrate a volatility surface, a factor model, or portfolio weights, you need a systematic way to find the input that minimizes some measure of error or risk. This lesson covers optimization without constraints — just a function and the search for its lowest point.

## Segment 2 (steps)

An unconstrained minimum must satisfy two conditions. First, the gradient has to be zero, meaning no direction decreases the function further — that's the first order condition. Second, the Hessian, the matrix of second derivatives, must be positive semi definite there, confirming the function curves upward in every direction rather than sitting at a saddle point. Checking both together confirms a candidate is truly a minimum.

## Segment 3 (code)

Gradient descent turns the first order condition into an algorithm. Start somewhere, compute the gradient, and step a small distance opposite it, since the gradient points toward the steepest increase. Repeating that update, x next equals x minus a step size times the gradient, walks you straight downhill on a convex bowl like this quadratic, toward the minimum.

## Segment 4 (steps)

Newton's method asks more but pays it back. Instead of only the gradient, it uses the Hessian too, the local curvature, and jumps to where that curved approximation says the minimum sits. Near the optimum it converges far faster than gradient descent, but each step costs more, since you must form and invert the Hessian.

## Segment 5 (code)

On this quadratic bowl, Newton's method uses the Hessian, which here is just the matrix A, inverts it once, and lands on the exact minimum in a single step, because a quadratic's curvature never changes. Real loss functions rarely look this clean, but correcting the gradient step with curvature is why Newton type methods power most numerical optimizers.

## Segment 6 (outro)

Hold onto both update rules — you'll meet them again inside every numerical optimizer. Up next, lesson twenty five: constrained optimization and Lagrange multipliers, where portfolio weights finally have to obey a budget constraint.
