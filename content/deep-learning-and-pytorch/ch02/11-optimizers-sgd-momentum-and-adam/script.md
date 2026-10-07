# Script — Optimizers: SGD, Momentum & Adam

## Segment 1 (title)

Back in lesson four, we updated w and b by hand with lr times the gradient. That's literally what an optimizer does, just formalized. torch dot optim packages this into a reusable object that knows about every parameter in your model.

## Segment 2 (code)

Every optimizer is constructed with the parameters it should update, almost always model dot parameters, plus a learning rate and whatever other hyperparameters it supports.

## Segment 3 (code)

The pattern replaces the manual update: zero_grad clears old gradients, backward computes new ones, and step applies the optimizer's update rule to every parameter using its current grad.

## Segment 4 (steps)

Plain SGD just subtracts the learning rate times the current gradient, and it can oscillate in narrow valleys because it only looks at right now. Momentum keeps a running average of recent gradients, like a ball building up speed downhill. Adam goes further, adding a per-parameter adaptive learning rate on top of momentum — it's the common default for most training today.

## Segment 5 (code)

Notice Adam's default learning rate, zero point zero zero one, is much smaller than SGD's typical zero point zero one to zero point one — Adam's adaptive scaling already does a lot of that work for you.

## Segment 6 (outro)

Zero_grad, backward, step — same three calls regardless of which optimizer you choose. Up next, lesson twelve: putting nn.Module, layers, losses, and optimizers together into a complete multilayer perceptron.
