So far our network has random weights and a loss that scores its mistakes. Training is the process of nudging the weights until that loss goes down. The recipe is gradient descent, and the algorithm that makes it practical is backpropagation.

The training loop has four steps. A forward pass computes predictions. The loss scores them. The backward pass computes a gradient for every weight, the direction that would increase the loss. Then the update steps each weight the opposite way, scaled by the learning rate. Repeat for many epochs.

Backpropagation is the chain rule from calculus, applied layer by layer from the loss backward. Here it is in numpy for a network with one input, eight tanh neurons, and one output. Notice one minus a squared: that's the derivative of tanh, the one place the activation enters the backward pass.

How do you know hand-written backprop is right? Nudge one weight up and down, and estimate the gradient numerically. Analytic gives minus zero point nine six zero three, and numerical agrees to about nine digits. The backward pass is correct.

Then the update is just subtraction: each weight minus the learning rate times its gradient. Running this on a noisy sine wave, the loss fell from three point one three to zero point one three. The best any model could do here is about zero point zero nine, the noise level.

The chart shows the loss curve and the fitted curve. Notice the brief spike near epoch one thousand: plain gradient descent can overshoot, then recover. The fit follows the sine wave closely.

The learning rate matters most. At zero point zero zero one, training crawls. At zero point zero five, it's fine. At zero point five, the loss explodes to not-a-number. That's why optimizers like Adam adapt the step size. In scikit-learn, fit hides this loop; in PyTorch, loss dot backward does the backpropagation for you.

A network that trains well can still memorize its training data. Next lesson: overfitting and regularization in neural networks.
