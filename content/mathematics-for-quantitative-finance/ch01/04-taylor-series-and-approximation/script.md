# Script — Taylor Series & Approximation

## Segment 1 (title)

Most functions in finance, option prices, bond prices, exponential growth, aren't polynomials, yet polynomials are the only functions a computer evaluates exactly. The Taylor series is the bridge: it approximates any smooth function near a point using its derivatives at that point.

## Segment 2 (code)

Each term in a Taylor polynomial uses one more derivative at the center point. The classic example is e to the x, where every derivative is itself, giving the familiar series 1 plus x plus x squared over 2 factorial and so on. That's why continuous growth is so often approximated as 1 plus the rate times time, for small moves.

## Segment 3 (steps)

Truncating that series at some degree leaves an error, and Taylor's theorem gives you the exact form of that leftover, the remainder term. The remainder shrinks fast when you're close to the center point, which is exactly why these approximations work well for small moves and can fail for large ones.

## Segment 4 (code)

Keep just the first two terms beyond the constant and you get the quadratic approximation, which in options language is delta-gamma. Delta captures the linear move, gamma corrects for the fact that value curves rather than moving in a straight line.

## Segment 5 (code)

You can check this numerically. Take a function with curvature, move the input by five, and compare the exact value to the first-order and second-order approximations. The second-order one lands far closer, because the gamma term is correcting for curvature exactly as advertised.

## Segment 6 (outro)

A Taylor polynomial rebuilds a function locally from its derivatives, and the remainder tells you exactly how much truncation costs you. Up next, lesson five: ordinary differential equations, where the derivative itself becomes the unknown we solve for.
