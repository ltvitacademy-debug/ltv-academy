# Script — nn.Module & Parameters

## Segment 1 (title)

Chapter one tracked two loose tensors as parameters by hand. A real network has thousands of parameters across dozens of layers — nn.Module is PyTorch's answer, a base class that organizes parameters, sub-layers, and computation into one object. Nearly every model you write is an nn.Module subclass.

## Segment 2 (code)

Three things are mandatory: subclass nn.Module, call super dot init first, and implement forward. Forgetting that super call is a classic mistake — leave it out, and nn.Module's internal bookkeeping never gets set up, so nothing you assign afterward actually registers. Everything else is up to you — here, w and b are wrapped as nn.Parameter so the module can track them.

## Segment 3 (steps)

nn.Parameter is a thin wrapper that turns on requires_grad automatically. The moment you assign one as an attribute, it's registered. That's the entire mechanism behind model dot parameters — nn.Module walks its own attributes, and any submodules', collecting every parameter it finds. This same walk, by the way, is exactly what makes dot to of device from lesson three able to move every parameter at once.

## Segment 4 (code)

Always call the model as a function, model of x, never model dot forward of x directly. Calling the model runs call, which runs registered hooks before and after your forward method — calling forward directly skips that. That bookkeeping is also where features like hooks for inspecting intermediate activations get attached, which matters more once you're debugging a deeper network.

## Segment 5 (code)

Layers like nn.Linear are themselves modules. Assign one as an attribute and it becomes a submodule, nested automatically, with its parameters swept up too — that's where the dotted names like hidden dot weight come from, the same naming you saw in state_dict.

## Segment 6 (outro)

Subclass, call super init, assign parameters and submodules, implement forward — that's the whole pattern. Up next, lesson nine: the actual layers, linear layers and activation functions, you'll use to build real networks.
