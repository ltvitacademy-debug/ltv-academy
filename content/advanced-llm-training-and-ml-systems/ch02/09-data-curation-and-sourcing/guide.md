# Data Curation & Sourcing

Lesson 3 sketched "acquisition" as the first stage of the data pipeline. This lesson goes deep on what that actually means in practice: where real pretraining corpora come from, how raw web crawl becomes usable text, and the named, publicly documented datasets you'll encounter constantly in technical reports and your own project work.

## What you'll learn

- The major categories of pretraining data sources
- Real, publicly documented large-scale text datasets and what each contains
- How raw crawl data is extracted and cleaned into usable text
- How to load a real large-scale dataset with Hugging Face `datasets`

## The major source categories

- **Web crawl** — by far the largest source by volume. Common Crawl is the foundational raw crawl; derivative, cleaned datasets built on top of it include **C4** (Colossal Clean Crawled Corpus, used for T5), **RefinedWeb**, and **FineWeb** (Hugging Face's large-scale filtered web corpus).
- **Code** — repositories of permissively-licensed source code, such as **The Stack** (BigCode project), used to train and improve coding ability.
- **Books and long-form text** — public-domain book collections (e.g., Project Gutenberg-derived sets) and other long-form text, valuable for long-range coherence that short web documents don't provide as often.
- **Encyclopedic / reference text** — Wikipedia dumps, cleaned and processed, valued for density of verified factual content relative to their size.
- **Curated multi-source mixtures** — datasets like **The Pile** and **RedPajama** deliberately combine many of the above categories (web, code, books, academic papers, Wikipedia) into one documented, labeled mixture, which is also a preview of the mixture-weighting topic in Lesson 13.

## From raw crawl to usable text

Common Crawl distributes raw crawl data as WARC files (raw HTTP responses, including full HTML) and WET files (extracted plain text, but still full of boilerplate — navigation menus, ads, cookie banners, footers). Turning that into training-usable text requires:

1. **Boilerplate removal / main-content extraction** — isolating the actual article or page content from surrounding site furniture, using extraction tools (e.g., trafilatura, resiliparse) rather than relying on WET's generic text extraction alone.
2. **Language identification** — classifying each document's language (commonly with a fastText language-ID model) so you can build a corpus targeted at your chosen language(s).
3. **Basic structural filtering** — dropping documents that are too short, almost entirely symbols/numbers, or otherwise clearly not usable prose — before the more aggressive quality and toxicity filtering covered in Lesson 11.

## Loading a real large-scale dataset

```python
from datasets import load_dataset

# FineWeb: Hugging Face's large-scale, filtered Common Crawl derivative
fineweb = load_dataset("HuggingFaceFW/fineweb", split="train", streaming=True)

first_doc = next(iter(fineweb))
print(first_doc.keys())        # e.g. text, url, date, dump, language, ...
print(first_doc["text"][:200])
```

Streaming mode matters here specifically because these datasets are enormous — FineWeb-scale corpora run into the tens of terabytes — so `load_dataset(..., streaming=True)` reads documents one at a time rather than requiring you to download the entire dataset before you can start working with it.

## Why sourcing decisions matter downstream

Everything covered in the rest of this chapter — deduplication, quality/toxicity filtering, packing, mixture weighting — operates on top of whatever gets sourced here. A sourcing mistake (e.g., a crawl that's accidentally skewed toward one domain, or missing an entire content category like code) can't be fully corrected by filtering later; filtering can only remove unwanted content from what was collected, not add missing categories back in.

## Key terms

- **Common Crawl** — the largest public raw web-crawl dataset, the base source behind most curated web-text corpora
- **C4 / RefinedWeb / FineWeb** — named, publicly documented cleaned derivatives of Common Crawl
- **The Pile / RedPajama** — curated multi-source datasets combining web, code, books, and reference text
- **WARC / WET** — Common Crawl's raw HTTP-response and extracted-plain-text file formats, respectively

## Recap

Pretraining corpora are assembled from web crawl (via Common Crawl derivatives like C4, RefinedWeb, and FineWeb), code repositories, books, and reference text, extracted from raw crawl formats and filtered for language and basic structure before any aggressive cleaning happens. Next up, Lesson 10: deduplicating that sourced data at scale.
