# Fixed Income & Yield Curves

Lesson 6 covered equities — ownership. This lesson covers the other major asset class from Lesson 1: fixed income, where you're a lender instead of an owner. Bonds are the backbone of corporate and government finance, and the shape of the yield curve they trace out is one of the most closely watched signals in all of markets.

## What you'll learn

- Core bond mechanics: face value, coupon rate, maturity, yield to maturity
- What the "term structure of interest rates" means
- The three yield curve shapes: normal, inverted, and flat — and what each suggests
- Why Treasuries serve as the market's risk-free proxy

## Bond mechanics

A **bond** is a loan: the issuer (a government or company) borrows money from investors and promises to repay it on fixed terms.

- **Face value (par value)** — the amount the issuer repays at maturity, typically $1,000 for a corporate bond. Coupon payments are calculated as a percentage of this amount.
- **Coupon rate** — the stated annual interest rate the bond pays, expressed as a percentage of face value. A $1,000 bond with a 5% coupon pays $50 per year (often split into two $25 semiannual payments).
- **Maturity** — the date the issuer repays the face value and the bond ceases to exist.
- **Yield to maturity (YTM)** — the single discount rate that makes the present value of all the bond's remaining coupon payments and its face value equal to its current market price. YTM is the bond market's way of expressing "the return you'd earn if you held this bond to maturity and reinvested every coupon at that same rate" — and it moves inversely with price: when a bond's price falls, its yield rises, and vice versa.

## The term structure of interest rates

Plot the yield of otherwise-identical bonds (same issuer, same credit quality) against their time to maturity, and you get the **term structure of interest rates** — better known as the **yield curve**. It answers the question: does lending for 2 years pay a different rate than lending for 10 years, and by how much?

## The three yield curve shapes

- **Normal (upward-sloping)** — longer maturities yield more than shorter ones. This is the most common shape, reflecting the fact that investors generally want extra compensation for locking money up longer (more time for inflation or rate surprises to erode their return).
- **Inverted** — shorter maturities yield *more* than longer ones. This is unusual, and historically has often preceded economic slowdowns — it tends to happen when markets expect the central bank to cut rates significantly in the future, pulling expected long-term yields below today's short-term yields.
- **Flat** — short- and long-term yields are close to equal, often seen as a transitional shape between normal and inverted (or vice versa) as expectations shift.

## Treasuries as the risk-free proxy

**US Treasury securities** (bills, notes, and bonds, differentiated mainly by maturity) are backed by the full faith and credit of the US government, which is considered to have effectively zero default risk in its own currency. Because of this, Treasury yields are used throughout finance as the **risk-free rate** — the baseline return against which every other investment's extra return (its "risk premium") is measured. Nearly every discounting and pricing model you'll encounter later in this course (including derivatives pricing) starts from a risk-free rate, and in practice, that number almost always comes from the Treasury curve.

## Key terms

| Term | Meaning |
|---|---|
| Face value (par) | The amount repaid at maturity |
| Coupon rate | The stated annual interest rate, as a percent of face value |
| Yield to maturity (YTM) | The discount rate equating a bond's price to its future cash flows |
| Term structure / yield curve | Yield plotted against maturity for comparable bonds |
| Inverted yield curve | Short-term yields exceed long-term yields; often a slowdown signal |
| Risk-free rate | The baseline return with (near) zero default risk, proxied by Treasuries |

## Recap

A bond pays a coupon on its face value until maturity, and its yield to maturity moves inversely with its price. Plotting yield against maturity produces the yield curve, whose shape — normal, inverted, or flat — carries real economic signal, and Treasury yields anchor the risk-free rate used throughout finance. Next up, Lesson 8: bond pricing, duration, and convexity — turning these concepts into actual formulas.
