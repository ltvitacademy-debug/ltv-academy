# Web Scraping Basics

Sometimes the data you need lives on a web page, with no API and no download button. Web scraping means fetching a page's HTML with code and extracting the parts you need. It is a useful last resort, but unlike an API it is not something the site has promised to support, so it comes with technical fragility and ethical responsibilities. We start with the responsibilities, then build a small working scraper.

## What you'll learn

- The questions to ask before scraping: APIs, `robots.txt`, terms of use, and politeness
- How to check `robots.txt` from Python
- How to parse HTML with Beautiful Soup and CSS selectors
- How to turn scraped elements into a DataFrame
- Why scrapers break, and what `pd.read_html` offers for tables

## Before you scrape

1. **Is there an API or downloadable file?** If yes, use it. It is more stable and clearly permitted.
2. **What does `robots.txt` say?** Most sites publish `https://example.com/robots.txt` describing which paths automated tools should avoid. It is a widely followed convention rather than a law, but ignoring it is poor practice.
3. **What do the terms of use say?** Many sites prohibit scraping in their terms, whatever `robots.txt` says. Some data is copyrighted or contains personal information, which raises additional privacy and legal issues. This course cannot give legal advice; when in doubt, ask the site owner or do not scrape.
4. **Scrape gently.** Send a descriptive `User-Agent`, request only what you need, pause between requests, and stop if asked.

## The practice site

We will use **Books to Scrape** (`https://books.toscrape.com`), a fictional bookstore that describes itself as a sandbox built for people learning web scraping. It is a legitimate target for practice; never assume a real commercial site is.

`requests` and `beautifulsoup4` are third-party packages: `pip install requests beautifulsoup4`.

## Checking robots.txt

Python's standard library includes a parser:

```python
import requests
import pandas as pd
from bs4 import BeautifulSoup
from urllib.robotparser import RobotFileParser

base = "https://books.toscrape.com/"
rp = RobotFileParser()
rp.set_url(base + "robots.txt")
rp.read()
rp.can_fetch("*", base)        # True
```

When we checked, this site returned "404 Not Found" for `robots.txt`, meaning no rules are published, so `can_fetch` returns `True`. On a real site, read the file yourself too, and respect any `Disallow` rules that cover the pages you want. Then fetch the page, identifying yourself:

```python
headers = {"User-Agent": "LTV-Academy-class-demo (learning exercise)"}
resp = requests.get(base, headers=headers, timeout=10)
resp.status_code     # 200
```

## Parsing HTML

`resp.text` is a long string of HTML. Beautiful Soup turns it into a tree you can search with CSS selectors:

```python
soup = BeautifulSoup(resp.text, "html.parser")
soup.title.get_text(strip=True)   # 'All products | Books to Scrape - Sandbox'

cards = soup.select("article.product_pod")
len(cards)                        # 20

c = cards[0]
c.h3.a["title"]                            # 'A Light in the Attic'
c.select_one("p.price_color").get_text()   # '£51.77'
c.select_one("p.star-rating")["class"]     # ['star-rating', 'Three']
```

- `select(selector)` returns every match; `select_one(selector)` returns the first.
- `["title"]` reads an HTML attribute; `get_text()` reads the visible text.
- To find the right selector, right-click the element in your browser and choose Inspect, and look at its tags and classes.

## Rows to a DataFrame

```python
rows = []
for card in cards:
    rows.append({
        "title": card.h3.a["title"],
        "price": card.select_one("p.price_color").get_text(strip=True),
        "rating": card.select_one("p.star-rating")["class"][1],
    })
df = pd.DataFrame(rows)
#                   title   price rating
# 0  A Light in the Attic  £51.77  Three
# 1    Tipping the Velvet  £53.74    One
# 2            Soumission  £50.10    One
```

Every column is text, so apply the cleaning skills from Chapter 5:

```python
df["price"] = pd.to_numeric(df["price"].str.replace(r"[^0-9.]", "", regex=True))
df["price"].mean()     # about 38.05 across the 20 books on page 1
```

For several pages, loop over page URLs and pause between them. On this site, `https://books.toscrape.com/catalogue/page-1.html` through `page-3.html` gave us 60 books in total:

```python
import time
for n in (1, 2, 3):
    r = requests.get(f"{base}catalogue/page-{n}.html", headers=headers, timeout=10)
    r.raise_for_status()
    # ... parse as above ...
    time.sleep(1)      # be gentle
```

## Tables and fragility

If a page contains a plain HTML table, `pd.read_html` can parse it directly into a list of DataFrames (it needs a parser such as `lxml` installed):

```python
import io
tables = pd.read_html(io.StringIO(resp.text))
```

Scrapers break for three common reasons:

- **Layout changes.** Your selectors stop matching. Nothing warns you unless you validate the result (Lesson 26).
- **JavaScript-generated content.** `requests` only receives the initial HTML, not what scripts add afterward.
- **Blocks and rate limits.** If a site slows or blocks you, back off, or stop.

## Recap

- Prefer an API; check `robots.txt` and the terms of use; scrape gently.
- `requests` fetches HTML; `BeautifulSoup(...).select(...)` extracts elements.
- Build a list of dictionaries, then a DataFrame, then clean the types.
- Expect scrapers to be fragile, and validate what they return.
