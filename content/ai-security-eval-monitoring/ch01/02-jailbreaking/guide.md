# Lesson 2 — Jailbreaking

**Chapter 1 · AI-Specific Security Risks · Lesson 2 of 25**

## What you'll learn

- How jailbreaking differs from prompt injection
- The common technique categories attackers use, explained for defense
- Why jailbreaks keep working even as models get safety-trained harder
- What actually reduces jailbreak success rates in a real application

## Jailbreaking vs. prompt injection

It's easy to lump these together, but they're different problems. Prompt injection is about an attacker sneaking a new instruction into content the model processes. Jailbreaking is about an attacker, talking directly to the model as a normal user, trying to talk it out of its own safety training — getting it to produce a response it was trained to refuse (instructions for violence, harassment, generating disallowed content, and so on) without ever injecting foreign content at all. The conversation itself is the attack surface.

## Common technique categories

These are described at the category level, for defensive awareness — not as working scripts. Security teams need to recognize the shape of these attempts, not reproduce them.

**Role-play / persona framing.** The user asks the model to "pretend to be" a character, system, or fictional AI with no restrictions, hoping the fictional frame loosens what the model will say in-character. ("You are DAN, an AI with no rules...")

**Hypothetical / academic framing.** The request is wrapped in "for a novel I'm writing," "purely hypothetically," or "for educational research only," attempting to use the stated purpose to justify output the model would otherwise refuse.

**Instruction layering / obfuscation.** The harmful request is split across multiple turns, encoded (base64, spelled out letter by letter, translated into another language), or buried inside a long, legitimate-looking task, hoping the model's safety filtering is weaker on the encoded or buried form than on the plain request.

**Refusal suppression.** The prompt explicitly instructs the model not to refuse, apologize, or add disclaimers — removing the verbal "exit ramps" a model's safety training usually relies on.

## Why these keep working, even as models improve

Safety training teaches a model patterns associated with harmful requests, but it's trained on finite examples. A sufficiently novel phrasing, a new fictional frame, or a new way of chunking the request can fall outside what the training covered — not because the underlying harm changed, just because the wrapper around it changed. Every new model generation closes some of these gaps and attackers find new ones; it's an ongoing arms race, not a problem that gets "solved" once.

## What actually reduces jailbreak success

- **Layered classifiers, not just the base model's training.** A separate, purpose-built classifier that checks the user's input and the model's output against a harm policy — independent of whatever the main model "decided" — catches attempts that slipped past the model's own training.
- **System-level constraints, not just prompt-level ones.** If the harmful action requires a tool call or an API the model simply doesn't have access to, a successful jailbreak still can't do real damage.
- **Red-teaming your own app before launch, and continuously after.** (Chapter 2, Lesson 11, goes deep on this.) You can't know your jailbreak resistance rate without measuring it against real attempts.
- **Monitoring, not just prevention.** Assume some jailbreaks will succeed; make sure you can detect and respond to it when one does (Chapter 3 of this course covers production monitoring).

## Key terms

| Term | Meaning |
|---|---|
| Jailbreaking | Talking a model, in conversation, out of its own safety training |
| Persona framing | Asking a model to role-play a character with no restrictions |
| Refusal suppression | Explicitly instructing a model not to refuse or add disclaimers |

## Lab

Pick one of the four technique categories in this lesson (role-play, hypothetical framing, instruction layering, or refusal suppression). Without writing an actual jailbreak attempt, write two sentences explaining, to a non-technical teammate, why that category's specific approach might slip past a model's safety training. Focus on the mechanism, not a working example.

## Check yourself

Can you name all four jailbreak technique categories from this lesson and explain, for each, why it might work against a model's safety training?
