# Lesson 2 — Tokens & Tokenization

**Chapter 1 · How LLMs Actually Work · Lesson 2 of 31**

## What you'll learn

- What a token actually is, and why it's not the same thing as a word
- Why models use subword tokenization instead of splitting on whitespace
- How to see real tokenization with OpenAI's own public tokenizer tool
- Why tokenization quietly affects your API bill, your context window, and even non-English text

## A token is not a word

Every LLM reads and writes **tokens**, not words and not individual characters. A token is
usually a chunk of 3-4 characters — sometimes a whole common word ("the," "and"), sometimes a
fragment of a longer or rarer word, sometimes a single punctuation mark or a piece of a number.
The rough rule of thumb for English: about 0.75 words per token, or roughly 100 tokens for every
75 words of plain English text. That ratio is an approximation, not a law — it moves around by
model and by content.

## Why subwords instead of whole words

Early NLP systems tried whole-word vocabularies, but that breaks down fast: the English language
alone has hundreds of thousands of words, and any closed vocabulary will eventually hit a word it
has never seen (a typo, a brand name, a word in another language). Modern LLMs use **subword
tokenization** — algorithms like Byte-Pair Encoding (BPE) that learn a vocabulary of common
chunks from training data. Frequent whole words ("the," "is") get their own single token. Rarer
or longer words get split: "tokenization" might become "token" + "ization." This gives the model
a fixed-size vocabulary (tens of thousands of entries) that can still represent literally any
string, because in the worst case it can always fall back to individual bytes.

## Seeing it for real

OpenAI publishes its own tokenizer tool at platform.openai.com/tokenizer, and it's worth actually
using — paste in a sentence and watch it highlight each token in a different color, with a live
token count beneath:

![OpenAI's public tokenizer tool, default example text: whole words get one token each, an emoji splits into its underlying bytes, and a repeated digit sequence is grouped into chunks — 57 tokens for a short paragraph.](/courses/generative-ai-llms/ch01/02-tokens-and-tokenization/tokenizer-default-example.png)

Two things jump out immediately once you do. First, not everything splits the way you'd guess —
emoji get split into the raw bytes that represent them, and repeated sequences of digits often get
grouped in chunks rather than split per digit. Second, and more important: tokenization isn't
universal. Run the exact same short phrase, "TestingDocs.com LLM Tokenization Test," through the
current GPT-3.5/GPT-4 tokenizer, and it comes out to 8 tokens:

![The same tokenizer tool, GPT-3.5 & GPT-4 tab: "TestingDocs.com LLM Tokenization Test" tokenizes to 8 tokens for 37 characters.](/courses/generative-ai-llms/ch01/02-tokens-and-tokenization/tokenizer-gpt4-tab.png)

Switch the exact same tool to the older GPT-3 (Legacy) tokenizer, and the identical text comes out
to 10 tokens instead:

![The same tool and text under the GPT-3 (Legacy) tab: the identical phrase now tokenizes to 10 tokens instead of 8.](/courses/generative-ai-llms/ch01/02-tokens-and-tokenization/tokenizer-gpt3-legacy-tab.png)

Same string, different token count — because tokenization is specific to each tokenizer a model
generation was trained with, not one universal standard.

## Why this matters beyond trivia

Every API call you make is billed per token, both for what you send (input) and what the model
generates back (output) — Lesson 11 covers the actual pricing math. Context windows (Lesson 5)
are measured in tokens, not words or characters. And tokenization isn't evenly fair across
languages: English generally tokenizes efficiently, but many non-English languages and all
programming languages split into more tokens per "word" than English does, meaning the same idea
can cost noticeably more to send to a model depending on the language or format it's written in.

## Key terms

| Term | Meaning |
|---|---|
| Token | The basic unit an LLM reads/writes — roughly 3-4 characters, not a whole word |
| Subword tokenization | Splitting text into a learned vocabulary of common chunks (e.g., BPE) |
| Vocabulary | The fixed set of possible tokens a given tokenizer can produce |
| Token count | What API pricing and context-window limits are actually measured in |

## Check yourself

You're ready for Lesson 3 when you can explain, without looking: why can't an LLM just use a
dictionary of whole words as its vocabulary?
