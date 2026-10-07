# Script — Feed-Forward Sublayers

## Segment 1 (title)

Attention gets all the credit, but most of a transformer's parameters actually live right after it, in the feed-forward sublayer. This lesson looks closely at what that piece computes and why it's shaped the way it is.

## Segment 2 (steps)

Attention is the only sublayer that lets information move between positions — token five can only look at token two through attention. The feed-forward sublayer is the opposite: the exact same weights run on every position independently, with zero communication between them. If attention is looking around, the feed-forward sublayer is thinking alone about what you found.

## Segment 3 (code)

In code, it's just two linear layers with an activation in between: expand from d model up to a wider d ff, apply GELU, then project back down to d model. The activation is what makes this useful at all — without a non-linearity between the two linear layers, they'd collapse mathematically into a single linear layer. Input and output shape are identical, which is what lets you add the result straight back onto the residual stream.

## Segment 4 (steps)

That expand ratio is conventionally four times d model. The original transformer paper used five twelve expanding to twenty forty eight; GPT two small uses seven sixty eight expanding to thirty seventy two. The paper used ReLU; modern models default to GELU instead.

## Segment 5 (code)

Parameter-for-parameter, those two big matrices in the feed-forward sublayer actually outweigh the four smaller projection matrices inside attention, in the very same block — roughly eight times d model squared versus roughly four times d model squared. Attention mixes information across positions — it's the feed-forward sublayer that does most of the nonlinear, per-token thinking.

## Segment 6 (outro)

Up next, Lesson 39: why the residual adds around both sublayers matter, and exactly where layer norm belongs.
