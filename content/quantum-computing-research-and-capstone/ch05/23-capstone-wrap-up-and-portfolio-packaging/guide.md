# Capstone Wrap-Up & Portfolio Packaging

Your report is written and your presentations built. This lesson is about turning that finished work into something that actually functions as a portfolio piece — discoverable, well-documented, and genuinely useful when someone unfamiliar with your project looks at it for the first time.

## What you'll learn

- What a portfolio-ready capstone repository actually needs, beyond just the code
- How to write a README that lets a stranger understand your project in under two minutes
- How to package your report, presentation, and data so each is independently useful
- A worked portfolio structure for the running GHZ/ZNE capstone
- How this packaging step connects directly to Chapter 6's career-preparation content

## What a portfolio-ready repository needs

A repository containing only your raw code is not yet a portfolio piece — it's your working files. A portfolio-ready version adds: a README that orients a first-time visitor (covered below), the written report (Lesson 20) as a readable document, not buried in a folder of code comments, your presentation slides (both technical and non-specialist versions from Lessons 21–22), and your final dataset and run log (Lesson 19), ideally with a short note on how to regenerate your analysis from it if someone wanted to check your work.

## Writing a README that works in under two minutes

A strong capstone README answers, in order, near the very top: what question did this project investigate (one sentence), what was found (one or two sentences, with the actual headline number), and how is the repository organized (a short list: `/report`, `/slides`, `/data`, `/src`). Everything else — full methodology, detailed limitations, setup instructions for re-running the code — comes after this orienting summary, not before it. A visitor deciding whether to read further should be able to make that decision from the top third of the README alone.

## Packaging each piece to be independently useful

- **The report** should be readable as a standalone PDF or document, not require opening a code editor to view.
- **The slides** should work as a leave-behind document even without your narration — captions and labeled axes matter more in a portfolio slide deck than in one you're presenting live.
- **The data and run log** should be in a plain, inspectable format (CSV, JSON) with column/field names that are self-explanatory or documented, not a format that requires your own analysis code just to read the raw numbers.

## A worked portfolio structure

```
ghz-zne-capstone/
├── README.md              (orienting summary, repo map)
├── report/
│   └── final-report.pdf   (Lesson 20's methods/results/limitations/conclusions)
├── slides/
│   ├── technical-talk.pdf       (Lesson 21)
│   └── general-audience-talk.pdf (Lesson 22)
├── data/
│   ├── run_log.csv         (Lesson 15/19's final, frozen log)
│   └── raw_results/        (per-run measurement data)
└── src/
    ├── build_ghz_circuit.py
    ├── apply_noise_scaling.py
    └── richardson_extrapolate.py
```

This structure makes the project legible to three different visitors with three different needs: a hiring manager skimming the README and report, a technical interviewer opening the slides and asking about the code, and someone trying to actually verify or extend your work by reading the data and source together.

## Why this connects directly to Chapter 6

A finished capstone that lives only as scattered files on your own machine does none of the work it could do for you professionally. Chapter 6's lessons on portfolio-building and interview preparation assume you have something exactly like this structure ready to point to — this lesson is where you actually build that asset, not just finish the underlying work.

## Key terms

| Term | Meaning |
|---|---|
| Portfolio-ready repository | A project package that a first-time visitor can understand and evaluate without the author present to explain it |
| Orienting summary | The top portion of a README stating the question, the finding, and the repo's organization, before any detail |

## Check yourself

A visitor to your capstone repository has 90 seconds before deciding whether to read further. Using this lesson's README guidance, write the exact three sentences (question, finding, organization) that should appear at the very top for the running GHZ/ZNE capstone.
