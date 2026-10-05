# Lesson 4 — Regulations: GDPR, CCPA and HIPAA Overview

**Chapter 1 · Sensitive Data Foundations · Lesson 4 of 30**

> **This lesson is an orientation overview for learning purposes, not legal advice.** It introduces three major data-privacy regulations at the level a data practitioner needs to recognize why a dataset is sensitive and what kind of obligation attaches to it. Real compliance decisions — what applies to your organization, how to implement it, what counts as sufficient — require qualified legal counsel, not a training course.

## What you'll learn

- Why GDPR, CCPA, and HIPAA show up constantly in data governance work, even though none of them are "governance" laws
- GDPR's core shape: who it covers, what it requires, and what happens when it's violated
- CCPA/CPRA's core shape, and how California's model differs from the EU's
- HIPAA's core shape: what it protects and who it binds
- The single clearest distinction across all three: GDPR's **opt-in** consent model versus CCPA's **opt-out** model

## Why data people need to know these at all

None of these three laws were written for data governance teams — they were written for regulators, courts, and compliance officers. But every one of them defines categories of data (personal data, consumer data, health information) and rules about how that data must be handled, which means every data classification scheme, every access control, and every retention policy in a regulated organization ultimately traces back to a law like one of these three. You don't need to practice law to do this work — you need to recognize *when* a dataset might trigger one of these regulations, so you know to loop in the people who do practice law.

## GDPR — the European Union's General Data Protection Regulation

GDPR took effect on **May 25, 2018**, and it protects the personal data of people located in the EU — **regardless of where the organization processing that data is based**. This extraterritorial scope is why a company with no EU office can still be subject to GDPR: what matters is whose data it is, not where the processing company sits.

GDPR is built on a short list of core principles: **lawfulness, fairness, and transparency**; **purpose limitation** (don't use data for something other than what you collected it for); **data minimization** (collect only what you need); **accuracy**; **storage limitation** (don't keep it longer than necessary); **integrity and confidentiality** (keep it secure); and **accountability** (be able to demonstrate compliance, not just claim it).

To process personal data at all, an organization needs a documented **legal basis** — consent, contract, legal obligation, vital interests, public task, or legitimate interests. Where consent is the basis, GDPR's standard is strict: it must be **freely given, specific, informed, and unambiguous**. In practice, this is commonly described as an **opt-in** model — the default is "no," and the organization has to earn an affirmative yes.

GDPR also grants individuals (data subjects) a set of enforceable rights: **access** to their data, **rectification** of errors, **erasure** (the "right to be forgotten"), **restriction** of processing, **portability** (getting a copy in a usable format), and **objection** to certain processing. Organizations must notify their supervisory authority of a personal-data breach within **72 hours** where feasible. Penalties are serious: fines up to **€20 million or 4% of global annual turnover, whichever is higher** (GDPR Article 83). Many organizations are also required to appoint a **Data Protection Officer (DPO)**. Article 25 requires **"data protection by design and by default"** — building privacy into systems from the start rather than bolting it on — a concept the next lesson covers in depth.

## CCPA/CPRA — California's consumer privacy law

The **California Consumer Privacy Act (CCPA)** took effect **January 1, 2020**, and was later expanded by the **California Privacy Rights Act (CPRA)**, effective **2023**. Together they give California consumers rights to **know** what personal information a business has collected about them, to **delete** it, to **opt out of the sale or sharing** of their personal information, and to **non-discrimination** for exercising any of those rights. The law applies to for-profit businesses doing business in California that meet revenue or data-volume thresholds, and it's enforced by the **California Privacy Protection Agency (CPPA)**.

## The clearest distinction: opt-in versus opt-out

This is the single most teachable contrast between GDPR and CCPA, and it's worth holding onto: **GDPR is opt-in** — processing personal data requires an affirmative legal basis before it happens, so the default is "don't collect/use it." **CCPA is opt-out** — collection and sale of personal information is allowed by default, and the consumer has to take action (the opt-out) to stop it. Same broad goal — giving people control over their data — built on opposite defaults.

## HIPAA — protecting health information in the US

The **Health Insurance Portability and Accountability Act (HIPAA)**, enacted in **1996**, protects **Protected Health Information (PHI)** held by **covered entities** — health plans, healthcare clearinghouses, and healthcare providers who transmit health information electronically — and by their **business associates**. HIPAA has three main rules relevant to data work: the **Privacy Rule** (governs use and disclosure of PHI), the **Security Rule** (sets administrative, physical, and technical safeguard standards specifically for *electronic* PHI, or ePHI), and the **Breach Notification Rule** (requires notifying affected individuals, HHS, and in some cases the media, after a breach of unsecured PHI). HIPAA is enforced by the **HHS Office for Civil Rights (OCR)**, with both civil and criminal penalties available.

## Key terms

| Term | Meaning |
|---|---|
| Extraterritorial scope | GDPR applies based on whose data it is (EU residents), not where the processing organization is located |
| Opt-in (GDPR) | Processing requires an affirmative legal basis before it happens — the default is no |
| Opt-out (CCPA) | Collection/sale is allowed by default until the consumer actively opts out |
| PHI | Protected Health Information — the data category HIPAA exists to protect |
| Covered entity | A health plan, clearinghouse, or provider bound directly by HIPAA |

## Lab

Pick one dataset you work with (or imagine a plausible one — customer signups, a patient intake form, a loyalty program). Write two or three sentences for each: would GDPR plausibly apply (is there EU-resident personal data)? Would CCPA plausibly apply (is there a California consumer relationship)? Would HIPAA plausibly apply (is there PHI)? This is a recognition exercise, not a compliance determination — the goal is noticing which law's category of data you might be sitting on.

## Check yourself

Can you state the opt-in versus opt-out contrast between GDPR and CCPA in one sentence, name one right GDPR grants individuals, and name the entity type HIPAA's Privacy Rule binds?
