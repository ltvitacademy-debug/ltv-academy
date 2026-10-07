# Bond Pricing, Duration & Convexity

Lesson 7 introduced yield to maturity conceptually. This lesson makes it concrete: the actual formula for pricing a bond from its cash flows, and the two measures — duration and convexity — quants use to answer "how much will this bond's price move if rates change?"

## What you'll learn

- The bond pricing formula: present value of coupons plus face value
- Macaulay duration and modified duration
- Convexity, and why duration alone isn't enough
- A full worked numerical example

## Bond pricing formula

A bond's price is simply the present value of everything it will pay you, discounted at its yield:

```
Price = Sum over t=1..T of [ Coupon_t / (1+y)^t ]  +  FaceValue / (1+y)^T
```

Each coupon payment and the final face-value repayment get discounted back to today at rate *y* (the yield to maturity), and the price is the sum of all those discounted amounts.

## Worked example: pricing a bond

Take a bond with face value $1,000, a 6% annual coupon (paid once a year for simplicity), 3 years to maturity, and a yield to maturity of 8%.

```
Year 1:  $60   / (1.08)^1  =  $55.56
Year 2:  $60   / (1.08)^2  =  $51.44
Year 3:  $1,060 / (1.08)^3  = $841.00
                     Price  = $948.00
```

Notice the price ($948.00) is *below* face value ($1,000) because the coupon rate (6%) is below the yield to maturity (8%) — the bond has to trade at a discount to compensate the buyer with the market's going rate.

## Macaulay duration and modified duration

**Macaulay duration** is the weighted-average time until you receive the bond's cash flows, where each cash flow's weight is its share of the bond's present value:

```
Macaulay Duration = Sum[ t × PV(CF_t) ] / Price
```

For the bond above: (1 × 55.56) + (2 × 51.44) + (3 × 841.00) = 2,681.44, divided by the price of $948.00, gives a Macaulay duration of **2.83 years**. Even though the bond matures in 3 years, its duration is less than 3 because some cash (the coupons) arrives earlier.

**Modified duration** adjusts Macaulay duration into a direct sensitivity measure — the approximate percentage price change for a 1-percentage-point change in yield:

```
Modified Duration = Macaulay Duration / (1 + y)
                   = 2.83 / 1.08 ≈ 2.62
```

A modified duration of 2.62 means: if yields rise by 1 percentage point (100 basis points), the bond's price is expected to *fall* by roughly 2.62%.

## Convexity: correcting duration's blind spot

Duration is a **linear** approximation — it assumes price changes proportionally with yield changes. In reality, the price-yield relationship curves (it's convex), so duration alone overstates the price drop for a yield increase and understates the price gain for a yield decrease. **Convexity** measures that curvature, and the combined approximation is:

```
ΔP/P  ≈  −D × Δy  +  ½ × C × (Δy)²
```

Where *D* is modified duration and *C* is convexity. The duration term (−D × Δy) is the straight-line estimate; the convexity term (½ × C × (Δy)²) corrects for the curve, and it's always positive for a plain bond — which is why convexity works in the bondholder's favor in both directions (it slightly cushions losses when yields rise and slightly boosts gains when yields fall).

## Key terms

| Term | Meaning |
|---|---|
| Bond price | PV of all coupons plus PV of face value, discounted at yield |
| Macaulay duration | Weighted-average time to receive a bond's cash flows |
| Modified duration | Approximate % price change per 1 percentage-point yield change |
| Convexity | Measures the curvature of the price-yield relationship; corrects duration's linear estimate |

## Recap

A bond's price discounts every future cash flow at its yield; Macaulay duration measures the weighted-average timing of those cash flows, and modified duration converts that into a price-sensitivity estimate. Convexity captures the curvature duration alone misses, refining the estimate with a second-order term. Next up, Lesson 9: futures and forwards.
