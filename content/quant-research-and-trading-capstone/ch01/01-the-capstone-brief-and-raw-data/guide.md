# The Capstone Brief & Raw Data

Welcome to the Quantitative Research & Trading Capstone — internal codename **SR-5** (Sector Reversal, 5-day lookback). Every course in the Quantitative Developer / Researcher path up to this point has taught you one piece of the puzzle: math and statistics, Python, C++, financial markets, time series, and machine learning for finance, plus algorithmic trading and backtesting. This capstone asks you to put all of it together on one real research project, start to finish — research a trading idea, build it, backtest it honestly, and present the result.

## What you'll learn

- The capstone brief: what you're being asked to deliver, and why it's structured like a real research-desk assignment
- The raw data: the 11 Select Sector SPDR ETFs, SPY, and the VIX, sourced from Stooq.com
- The dynamic-universe wrinkle — XLRE and XLC didn't exist for the whole sample period
- Why this is explicitly framed as a research exercise, not investment advice

## The brief

Across the next 23 lessons you will research, build, backtest, and present a systematic trading signal end to end, using the full toolkit from this program. The research question: over 2007–2025, does a dollar-neutral cross-sectional 5-day reversal strategy across the 11 S&P 500 Select Sector SPDR ETFs generate risk-adjusted excess returns that survive realistic transaction costs and purged walk-forward out-of-sample validation — and does conditioning the signal on the VIX volatility regime improve it? The working hypothesis is that short-term sector overreaction mean-reverts over roughly 5 trading days, and that the effect is stronger when the VIX is elevated than when markets are calm.

This is explicitly a **research exercise** on public ETF data. It is not investment advice, and nothing in this course guarantees future performance — we'll say that honestly wherever the framing matters, especially once we get to results.

## The raw data

The universe is the 11 Select Sector SPDR ETFs — XLC (Communication Services), XLY (Consumer Discretionary), XLP (Consumer Staples), XLE (Energy), XLF (Financials), XLV (Health Care), XLI (Industrials), XLB (Materials), XLRE (Real Estate), XLK (Technology), and XLU (Utilities) — plus SPY as the market benchmark and the CBOE VIX index as a volatility-regime conditioner. Data is daily **OHLCV** (open, high, low, close, volume) with **adjusted close**, sourced from free public CSV exports at Stooq.com, covering 2007-01-02 through 2025-12-31.

```python
import pandas as pd

SECTORS = ["XLC","XLY","XLP","XLE","XLF","XLV","XLI","XLB","XLRE","XLK","XLU"]
LAUNCH = {"XLRE": "2015-10-08", "XLC": "2018-06-19"}

def load_sector(ticker):
    df = pd.read_csv(f"data/raw/{ticker}.us.csv", parse_dates=["Date"])
    df = df.rename(columns=str.lower).set_index("date").sort_index()
    if ticker in LAUNCH:
        df = df[df.index >= LAUNCH[ticker]]
    return df[["open", "high", "low", "close", "volume"]]

panel = {t: load_sector(t) for t in SECTORS}
```

## The dynamic-universe wrinkle

This isn't a clean, fixed 11-name universe for the entire sample. XLRE launched on 2015-10-08 and XLC launched on 2018-06-19 — both split out of older sectors (Real Estate out of Financials, Communication Services out of Technology and Consumer Discretionary). Before those dates, those tickers simply didn't exist. The loader above handles this correctly: it filters each ticker to data on or after its real launch date, and never backfills history before that date.

Backfilling would be a classic **survivorship bias** mistake — handing the backtest knowledge it couldn't have had at the time, since no fund existed to trade. A correct backtest only ever sees the **point-in-time universe**: nine sectors before 2015-10-08, ten through 2018-06-19, and eleven after. This is a real data-cleaning decision you'll carry through every later lesson, not an edge case to brush past.

## Key terms

| Term | Meaning |
|---|---|
| OHLCV | Open, High, Low, Close, Volume — the standard daily bar fields |
| Adjusted close | Closing price adjusted for dividends and splits, used for return calculations |
| Survivorship bias | Backtest error from including data/securities not actually available at the time |
| Point-in-time universe | The set of tradable names that actually existed on a given date, with no hindsight |

## Recap

You now have the capstone brief — research, build, backtest, and present the SR-5 reversal signal — and the raw ingredients: 11 sector ETFs plus SPY and VIX, daily OHLCV with adjusted close, from Stooq.com, 2007–2025, with XLRE and XLC entering the universe partway through. Next lesson, we turn this into a formally stated research question and hypothesis.
