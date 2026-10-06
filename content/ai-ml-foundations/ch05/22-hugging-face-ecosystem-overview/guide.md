# Lesson 22 — The Hugging Face Ecosystem, Overview

**Chapter 5 · Using Pretrained Models · Lesson 22 of 30**

## What you'll learn

- Why this chapter starts with the Hub instead of more architecture theory
- The three things Hugging Face actually hosts: Models, Datasets, and Spaces
- A real look at each one, so the names aren't abstract
- What the `transformers` library is, and how it relates to the Hub
- How the pieces fit together into the workflow the rest of this chapter uses

## From building to using

Chapter 4 built a transformer's core idea — self-attention — from scratch, with toy
numbers. Training a real transformer from nothing takes enormous datasets and enormous
compute, which is out of reach for almost everyone, almost all of the time. The practical
answer the entire field converged on: someone else trains a large model once, publishes
it, and everyone else starts from there instead of from zero. **Hugging Face** is the
ecosystem that made this normal. It isn't one thing — it's a hub for trained models, a hub
for datasets, a hub for interactive demos, and a Python library (`transformers`) that
knows how to load and run all of them with a few lines of code.

## Models: the Hub's main event

The Hub lists hundreds of thousands of trained models, each with its own page: a model
card describing what it does, example code, and the actual weight files. A real model
page looks like this:

![A real Hugging Face model page (alvdansen/littletinies), showing the standard tab structure every model page uses: Model card, Files and versions, and Community, plus a like count and license.](/courses/ai-ml-foundations/ch05/22-hugging-face-ecosystem-overview/models-gallery.png)
*Every model on the Hub — whatever task it does — uses this same page structure: a model card up front, the actual files one tab over.*
Source: [Hugging Face Hub — Models Widgets docs](https://huggingface.co/docs/hub/models-widgets)

This lesson doesn't load a model yet (lesson 23 does that); the point here is just to see
that "a model on the Hub" is a real, structured page, not an abstract concept — a name like
`bert-base-uncased` or `gpt2` refers to one of these pages.

## Datasets: the training data behind the models

Models need data to train on, and the Hub hosts that too — over a quarter million public
datasets, each with the same kind of structured page: a preview of the actual rows, size,
format, and how recently it was updated.

![The Hugging Face Datasets hub browse page, showing real public datasets (fka/awesome-chatgpt-prompts, HuggingFaceFW/fineweb-2, wikimedia/wikipedia, and others) with their row counts, download counts, and like counts, alongside filters for modality, size, and format.](/courses/ai-ml-foundations/ch05/22-hugging-face-ecosystem-overview/datasets-main.png)
*264,422 datasets at the time of this screenshot — from small benchmark sets to wikimedia/wikipedia at 61.6 million rows.*
Source: [Hugging Face Hub docs — Datasets Overview](https://huggingface.co/docs/hub/datasets-overview)

A dataset page and a model page follow the same pattern deliberately — once you know how
to read one kind of Hub page, you can read them all.

## Spaces: running demos, not just files

The third piece is **Spaces** — small, hosted applications (usually built with Gradio or
Streamlit) that let you try a model directly in the browser, no setup required:

![A newly created, blank Hugging Face Space, showing the real onboarding instructions for a Gradio app: git clone the space's repo, write an app.py with a gr.Interface, then git push to deploy it live.](/courses/ai-ml-foundations/ch05/22-hugging-face-ecosystem-overview/spaces-blank-space.png)
*A Space is a Git repository that happens to also run as a live, hosted web app the moment you push to it.*
Source: [Hugging Face Hub docs — Spaces Overview](https://huggingface.co/docs/hub/spaces-overview)

Spaces are how most people try a model for the first time — type a prompt, click a
button, see the output — before ever writing a line of code against it.

## Where the `transformers` library fits

Models, Datasets, and Spaces are the Hub's three content types. `transformers` is the
Python library that reaches into the Hub and does the actual work: downloading a model's
files, loading them into memory, and running them. The relationship in one line:

```
Hub = where models/datasets live   transformers = the code that loads and runs them
```

Lesson 23 is entirely about that second half — the handful of lines of `transformers`
code it takes to turn a model's Hub page into a running prediction.

## Recap

Hugging Face is three things working together: a Hub for trained **models**, a Hub for
**datasets**, a Hub for live **Spaces** demos, and the `transformers` library that loads
and runs whatever the Hub hosts. Chapter 4 built a transformer's mechanism from scratch;
this chapter uses ones other people already trained. Next, lesson 23 picks one real model
and loads it, with real code.
