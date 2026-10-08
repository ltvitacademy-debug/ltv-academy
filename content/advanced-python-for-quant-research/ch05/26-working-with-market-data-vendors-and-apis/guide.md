# Working With Market Data Vendors & APIs

Pulling data from a real market-data vendor is nothing like reading a clean local Parquet file. Vendors rate-limit you, paginate large responses, occasionally time out or fail for no visible reason, and — more dangerously — hand you data that looks fine but isn't point-in-time correct. This lesson covers the practical realities of vendor data: the operational annoyances (rate limits, pagination, retries) and the research-correctness pitfalls (adjusted vs. unadjusted prices, corporate actions, timezones, and lookahead bias from restated data) that are easy to miss until a backtest result turns out to be too good to be true.

## What you'll learn

- Rate limits, pagination, and why a single vendor call often isn't actually one HTTP request
- Retries with exponential backoff, and why that's different from just retrying immediately
- Adjusted vs. unadjusted prices, and corporate actions (splits, dividends) that cause the difference
- Timezone and trading-session handling for data stamped in the vendor's own convention
- Point-in-time data vs. restated data, and survivorship bias / lookahead bias as concrete research pitfalls

## Rate limits and pagination

Free and even paid data APIs cap how many requests you can make per minute or per day, and a request for "ten years of daily bars for 500 tickers" is rarely one HTTP call — most vendors paginate large responses (a `next_page_token` or a date-range cursor) and expect you to make several calls to get the full result. Code that assumes "one call, one complete answer" breaks the first time it hits a vendor that caps response size, and code that doesn't respect a rate limit gets throttled or temporarily banned. Handling this correctly means checking for pagination metadata in every response and pacing requests to stay under the documented limit, not just handling the happy path of a single small request.

## Retries with backoff

Vendor calls fail transiently — a timeout, a momentary rate-limit rejection, a flaky connection — and the correct response is usually "try again, but not immediately and not forever." **Exponential backoff** doubles the wait between retries, so a transient blip gets a quick retry while a real outage doesn't hammer the vendor with requests at full speed:

```python
import time

def fetch_with_retry(fn, *args, max_retries=3, base_delay=0.5, **kwargs):
    """Retry a flaky vendor call with exponential backoff."""
    for attempt in range(1, max_retries + 1):
        try:
            return fn(*args, **kwargs)
        except Exception as exc:
            if attempt == max_retries:
                raise
            delay = base_delay * (2 ** (attempt - 1))
            print(f"attempt {attempt} failed ({exc!r}); retrying in {delay:.1f}s")
            time.sleep(delay)

def flaky_vendor_call(fail_times=2, _state={"calls": 0}):
    _state["calls"] += 1
    if _state["calls"] <= fail_times:
        raise ConnectionError("simulated rate-limit / timeout")
    return "payload-ok"

result = fetch_with_retry(flaky_vendor_call, max_retries=4, base_delay=0.1)
print("result:", result)
```

```text
attempt 1 failed (ConnectionError('simulated rate-limit / timeout')); retrying in 0.1s
attempt 2 failed (ConnectionError('simulated rate-limit / timeout')); retrying in 0.2s
result: payload-ok
```

Each failed attempt waits twice as long as the one before (`0.1s`, then `0.2s`), and the third attempt succeeds. The same shape — wrap the call, catch the exception, back off, retry up to a limit, then give up and raise — works whether the underlying call is a REST request, a database query, or any other operation that fails occasionally for reasons outside your control.

## Pulling real data with `yfinance`

`yfinance` is a convenient way to see real vendor-style data mechanics without needing a paid API key:

```python
import pandas as pd
import yfinance as yf

pd.set_option("display.width", 120)
df = yf.download("AAPL", period="5d", interval="1d", progress=False, auto_adjust=False)
df.columns = df.columns.get_level_values(0)  # flatten the ticker level
print(df[["Open", "High", "Low", "Close", "Adj Close", "Volume"]].round(2))
```

```text
Price         Open    High     Low   Close  Adj Close    Volume
Date
2026-10-01  330.00  332.48  325.81  330.32     330.32  36306300
2026-10-02  333.26  334.54  330.61  333.69     333.69  33278600
2026-10-05  332.82  336.21  331.65  332.89     332.89  34400900
2026-10-06  332.28  334.38  330.62  333.63     333.63  30449000
2026-10-07  337.02  338.67  332.79  336.67     336.67  33380854
```

Notice `Close` and `Adj Close` are identical in this window — that's expected, because no dividend or split occurred in these five days. They diverge around corporate actions, which is exactly the next pitfall.

## Adjusted vs. unadjusted prices, and corporate actions

A stock's **unadjusted** close is simply what it traded at that day. Its **adjusted** close is retroactively modified to account for **corporate actions** — a 4-for-1 split quarters the raw price going forward, and each dividend payment is backed out of historical prices so that a return calculation across the ex-dividend date isn't artificially negative. Using unadjusted prices to compute returns across a split or dividend date produces a nonsensical, enormous (or negative) "return" that has nothing to do with the stock's actual performance. The rule of thumb: use adjusted prices for return calculations and backtests; use unadjusted (raw traded) prices when you specifically need what actually printed on the tape that day, e.g. matching a broker's execution price.

## Timezones and sessions

Vendors stamp timestamps in whatever convention they chose — exchange local time, UTC, or occasionally something vendor-specific — and mixing data from two vendors without normalizing timezone first silently misaligns "same day" data, especially near market open/close or across a DST transition. The data-layer pattern from the previous lesson is exactly where this gets resolved once: normalize every source's timestamps to one consistent timezone convention on the way in, rather than re-deriving the right offset at every call site.

## Point-in-time data vs. restated data: the real pitfall

The most dangerous vendor-data problem isn't a bad timestamp — it's data that looks completely plausible but wasn't actually knowable on the date it's stamped with. Two concrete forms:

- **Survivorship bias.** A vendor's "current S&P 500 constituents" list reflects today's membership, not who was actually in the index on a historical date. Backtesting a strategy against today's constituent list, projected backward, silently excludes every company that was delisted or dropped from the index — which were disproportionately the bad performers — and inflates the backtest's apparent returns.
- **Restated fundamentals / lookahead bias.** Companies revise reported financials after the fact (restatements, late filings, revisions). A vendor's fundamentals table often stores only the *latest* known value for a given reporting period, not what was actually known and reported on the original filing date. Backtesting a value strategy using today's restated earnings figure as if it were known on the original date silently leaks future information into the past — the strategy "knew" something it couldn't actually have known at the time.

Both are forms of **lookahead bias**: the backtest sees information that wasn't actually available at that point in history, producing a result that looks better than any real-time strategy could have achieved. The only real fix is point-in-time data — a vendor feed, or your own stored snapshots, that record exactly what was known as of each historical date, not what's known now.

## Key terms

| Term | Meaning |
|---|---|
| Rate limit / pagination | Vendor caps on request frequency, and splitting large responses across multiple calls |
| Exponential backoff | Retry strategy that doubles the wait between attempts after a failure |
| Adjusted price | Historical price retroactively modified for splits/dividends, correct for return calculations |
| Survivorship bias | Backtesting against today's index membership, silently excluding historical delistings |
| Lookahead bias | A backtest using information (e.g. restated fundamentals) that wasn't actually available at that historical date |

## Recap

Vendor data in practice means handling rate limits and pagination, retrying transient failures with exponential backoff, using adjusted prices for returns while being aware of what corporate actions changed, normalizing timezones at the data layer, and — most dangerously — watching for survivorship bias and restated/lookahead-biased data that make a backtest look better than any real-time strategy could have performed. Next lesson: scheduling and automating the research jobs that pull this data, so it happens reliably without someone remembering to run a script.
