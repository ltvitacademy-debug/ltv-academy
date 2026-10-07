# Script — Custom Layers & Modules

## Segment 1 (title)

This closes out chapter two. You've used layers PyTorch ships out of the box, but real work constantly needs something it doesn't provide. Because nn.Module is just a Python class with a specific contract, writing your own is completely ordinary.

## Segment 2 (code)

Here's a custom layer that scales and shifts its input by learnable per-feature values — nothing PyTorch ships by default. It's exactly the lesson eight pattern: parameters in init, logic in forward. Scale and shift get discovered by dot parameters, flow through autograd, and get saved by state_dict, all for free.

## Segment 3 (code)

Sometimes a module needs a tensor that isn't learned but should still move with the model and get saved — a running average, say. register_buffer tracks it like a parameter for moving and saving, but never includes it in dot parameters or updates it with gradients.

## Segment 4 (code)

Custom modules really shine when you reuse a pattern. This block packages linear-then-ReLU as one unit, so a deeper model can compose an arbitrary number of them — more flexible than Sequential once your logic isn't just a straight line.

## Segment 5 (steps)

Here's a genuinely dangerous bug: store submodules in a plain Python list, and nn.Module's attribute scanning never finds them. Your code runs with no error at all, but those layers never train, never move to the GPU, and never show up in state_dict. nn.ModuleList fixes this — same indexing, properly registered.

## Segment 6 (outro)

Parameters in init, logic in forward, register_buffer for non-learnable state, ModuleList for a variable number of submodules — that's the full chapter two toolkit. Up next, chapter three: training deep networks in practice.
