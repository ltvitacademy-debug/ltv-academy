# Script — Bond Pricing, Duration & Convexity

## Segment 1 (title)

Lesson seven introduced yield to maturity conceptually. This lesson makes it concrete: the actual formula for pricing a bond from its cash flows, and the two measures quants use to answer how much a bond's price will move if rates change.

## Segment 2 (code)

A bond's price is just the present value of everything it pays you, discounted at its yield. Take a bond with a thousand-dollar face value, a six percent annual coupon, three years to maturity, and an eight percent yield to maturity. Discount sixty dollars one year out, sixty dollars two years out, and ten-sixty three years out, and they sum to a price of nine hundred forty eight dollars. It prices below face value because the six percent coupon is below the eight percent market yield.

## Segment 3 (code)

Macaulay duration is the weighted-average time until you receive the bond's cash flows. Weight each payment's timing by its share of the present value, sum them, and divide by price — for this bond that works out to two point eight three years, less than its three-year maturity because some cash arrives earlier as coupons. Divide that by one plus the yield and you get modified duration, two point six two — meaning roughly a two point six two percent price drop for every one percentage point rise in yield.

## Segment 4 (code)

Duration alone is a straight-line estimate, but the real relationship between price and yield curves. Convexity measures that curvature, and the full approximation adds a second term: minus duration times the yield change, plus one-half times convexity times the yield change squared. That convexity term is always non-negative for a plain bond, which is why it works in the bondholder's favor in both directions — cushioning losses when yields rise and boosting gains when yields fall.

## Segment 5 (outro)

Price discounts the cash flows, duration estimates the straight-line sensitivity, and convexity corrects for the curve. Up next, lesson nine: futures and forwards — contracts on a future price, and how that price itself gets set.
