# Help-Center Policy Snippets (Course Dataset)

The exact seven illustrative help-center passages used throughout Chapter 4
(RAG & AI APIs) and the capstone — the document half of the course's
recurring "sales table + policy documents" assistant. Made up for this
course, matching a retailer's support pages, not real company policy. Use
this file as the document set for your own retrieval, embedding, or
semantic-search experiments instead of retyping the snippets from the
lesson text.

Each entry is numbered `[0]`–`[6]` to match the citation style used in the
lessons and the capstone (`DOCS_ANSWER` citations look like `[0]`, `[2]`,
etc. — the bracketed number is the index into this list).

```
[0] Returns: items can be returned within 30 days of delivery for a full refund.
[1] Shipping: standard shipping takes 3 to 5 business days; express takes 1 to 2.
[2] Loyalty: members earn 1 point per dollar spent and 2 points on weekends.
[3] Warranty: electronics carry a one year warranty against manufacturing defects.
[4] Gift cards: gift cards never expire and cannot be exchanged for cash.
[5] Support hours: live chat is available Monday through Friday, 8 AM to 8 PM Eastern.
[6] Price matching: we match a lower price from a major competitor within 14 days of purchase, on identical in-stock items.
```

## Known retrieval failure, documented honestly

The capstone's own wrap-up lesson flags a real, reproducible gap worth
testing against if you build retrieval on top of this set: a plain
keyword/TF-IDF retriever correctly matches "How many days do I have to
return an item?" to snippet `[0]`, but **misses** the paraphrase "How long
do I have to send an item back?" — none of those words overlap with "return"
or "item" in a way TF-IDF can see, so it returns nothing rather than a wrong
answer (a *safe miss*, not a dangerous one).

If you're testing a semantic/embedding-based retriever instead (Chapter 3,
Lessons 11–14), this exact query pair is a good first regression test: a
good embedding model should close this specific gap, because "send back" and
"return" are genuine synonyms a lexical match can never see.

## As Python, if you'd rather not retype it

```python
docs = [
    "Returns: items can be returned within 30 days of delivery for a full refund.",
    "Shipping: standard shipping takes 3 to 5 business days; express takes 1 to 2.",
    "Loyalty: members earn 1 point per dollar spent and 2 points on weekends.",
    "Warranty: electronics carry a one year warranty against manufacturing defects.",
    "Gift cards: gift cards never expire and cannot be exchanged for cash.",
    "Support hours: live chat is available Monday through Friday, 8 AM to 8 PM Eastern.",
    "Price matching: we match a lower price from a major competitor within 14 days of purchase, on identical in-stock items.",
]
```
