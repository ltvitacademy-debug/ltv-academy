# Lesson 9 — What Data Poisoning Actually Targets

**Chapter 3 · Data Poisoning and Training-Time Attacks · Lesson 1 of 4**

## What you'll learn

- Why a model's training data is itself a protected asset, not just a
  resource you consume once and forget about
- What "data poisoning" conceptually means: corrupting what a model
  learns, not attacking it after it's already deployed
- The real risk categories poisoning falls into — availability attacks,
  targeted/integrity attacks, and feedback-loop poisoning
- A real, documented case (Microsoft's Tay chatbot) that shows what
  unvalidated learning-from-input looks like in production

## Training data is an asset you now have to defend

Every lesson so far in this course has looked at attacks that happen
after a model is already trained and deployed — prompt injection,
jailbreaks, abuse of a live API. Data poisoning is different: it
targets the model **before it exists**, by corrupting the data it
learns from. If an attacker can influence what goes into a training
set — or into a fine-tuning set, or into a feedback loop a deployed
model keeps learning from — they can shape what the model believes is
normal, correct, or safe, long before a security team ever sees a
running system to defend.

This matters because training data is no longer just an input. It's
an asset with the same protection requirements as any other sensitive
system: who can write to it, who can read it, how changes are
tracked, and whether anything unusual in it gets noticed before it's
baked into a model's weights.

## What poisoning conceptually does

At its core, a model learns a statistical mapping from inputs to
outputs by example. Data poisoning works by introducing examples into
that training set that are mislabeled, subtly altered, or
deliberately unrepresentative, so the mapping the model learns is
flawed in a way the attacker wants. This course deliberately does not
walk through how to construct such examples — that's an offensive
skill with no defensive value here. What matters for a security
engineer is recognizing the **categories of risk** this creates, so
you know what you're monitoring for.

## Three real risk categories

**Availability attacks** aim to simply degrade overall model quality —
flooding a training set with enough noisy or mislabeled data that
accuracy drops broadly. These are often the easiest to detect, because
the damage shows up in overall performance metrics during evaluation.

**Targeted (integrity) attacks** are narrower and more dangerous: the
attacker wants the model to behave normally on almost everything, but
fail in one specific, chosen way — misclassifying one category, or
behaving differently under one narrow condition. Because overall
accuracy barely moves, these are much harder to catch with standard
evaluation metrics alone. (Chapter 3's Lesson 11 covers the most
structured version of this — backdoor attacks — in depth.)

**Feedback-loop poisoning** targets systems that keep learning from
live user input after deployment — a chatbot, a recommendation engine,
a spam filter. If the feedback channel isn't validated, anyone who can
interact with the system can influence what it learns next.

## A real, documented case: Tay

Microsoft's Tay chatbot, released on Twitter in 2016, was designed to
learn conversational patterns from user interactions in real time.
Within about 16 hours of launch, coordinated users fed it a stream of
offensive input, and Tay began reproducing it — a textbook,
well-documented case of feedback-loop poisoning against a live
learning system. Microsoft took it offline the same day. The lesson
for engineers isn't about chatbots specifically; it's that **any
system that learns from unvalidated live input is exposed to the same
category of risk**, whether that's a 2016 Twitter bot or a modern
RAG pipeline that logs user corrections back into a fine-tuning set.

## Key terms

| Term | Meaning |
|---|---|
| Data poisoning | Deliberately corrupting a model's training, fine-tuning, or feedback data so it learns a flawed or attacker-chosen pattern |
| Availability attack | Poisoning aimed at broadly degrading model accuracy or quality |
| Targeted / integrity attack | Poisoning aimed at one narrow, chosen misbehavior while leaving overall accuracy mostly intact |
| Feedback-loop poisoning | Poisoning a system that keeps learning from live, unvalidated user input after deployment |

## Check yourself

You're ready for Lesson 10 when you can explain, without looking: why
is a targeted/integrity poisoning attack harder to catch through
standard accuracy metrics than an availability attack, and what made
Tay's feedback loop exploitable in the first place?
