# Script — The Capstone Brief & Raw Data

## Segment 1 (title)

Welcome to the Quantitative Research and Trading Capstone — codename SR-5, for Sector Reversal, 5-day lookback. This capstone pulls together everything from the math and statistics, Python, C++, financial markets, time series, machine learning for finance, and algorithmic trading and backtesting courses you've already taken, and asks you to run one real research project start to finish.

## Segment 2 (steps)

The brief: research, build, backtest, and present a systematic trading signal end to end, on your own, using the full toolkit from this program. SR-5 tests whether short-term sector overreaction in the S&P 500's eleven sector ETFs mean-reverts over about five trading days — and whether that effect is stronger when the market is already afraid. You'll decide if the evidence holds up under realistic costs.

## Segment 3 (steps)

The raw data is daily OHLCV — open, high, low, close, volume — with adjusted close, for the eleven Select Sector SPDR ETFs, plus SPY as the market benchmark and the CBOE VIX as a fear gauge, pulled from free public CSV exports at Stooq dot com, January 2007 through December 2025. This is a research exercise on public ETF data, not investment advice, and nothing here guarantees future performance.

## Segment 4 (code)

One real data-cleaning wrinkle: this isn't a fixed universe. XLRE didn't launch until October 2015, and XLC didn't launch until June 2018, so the point-in-time universe grows from nine names to eleven over the sample — and you never backfill history before a launch date, because that would hand your backtest knowledge it couldn't have had, a classic survivorship-bias trap. The loader filters each ticker to its real listing date.

## Segment 5 (outro)

You now have the brief and the raw ingredients. Next lesson, we turn this into a formally stated research question and hypothesis — and talk about why sectors, not single stocks, are the right level to test a reversal effect.
