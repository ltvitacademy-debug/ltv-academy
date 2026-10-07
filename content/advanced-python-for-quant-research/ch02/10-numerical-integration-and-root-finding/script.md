# Script — Numerical Integration & Root Finding

## Segment 1 (title)

Two quant problems that look different on the surface — what discount rate matches a bond's price, and what volatility matches an option's market price — are both root-finding problems: find the input that makes a function equal, or equal zero against, a target. This lesson covers numerical integration and root-finding, with yield-to-maturity and implied volatility as the running examples.

## Segment 2 (code)

quad numerically integrates a function over a range using adaptive quadrature — it refines its own subdivisions until a target precision is reached, rather than using a fixed grid. For a continuously discounted cash flow stream, it returns both the present value and an estimate of the error, worth checking rather than assuming the number is exact.

## Segment 3 (code)

brentq finds a root within a bracketing interval where the function changes sign, combining bisection's reliability with faster methods' speed. For bond yield-to-maturity, the function you hand it is model price minus target price, bracketed between a near-zero and a very high yield — it's guaranteed to converge as long as that bracket genuinely contains a sign change.

## Segment 4 (code)

newton implements Newton-Raphson or the secant method — useful with a good starting guess but no convenient bracket, which is the usual shape of an implied volatility search. It can fail to converge with a bad starting point, since there's no bracket to stay within; in production, brentq with a bracket like 0.001 to 5 is often the more robust choice, since volatility is always positive.

## Segment 5 (code)

optimize dot root solves a system of several nonlinear equations in several unknowns, rather than one function of one variable — the right tool when the quantities you're solving for are coupled, like jointly calibrating two linked model parameters against two market observables.

## Segment 6 (outro)

Bond yield and implied volatility are root-finding problems in disguise; brentq is the robust default when you can bracket, newton trades that safety for speed with a good guess, and root extends the idea to coupled systems. Next up, lesson eleven: random number generation and reproducibility, the Monte Carlo foundation under many of these pricing models.
