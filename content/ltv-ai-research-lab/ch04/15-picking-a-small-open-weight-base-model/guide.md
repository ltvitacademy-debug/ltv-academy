# Picking a Small Open-Weight Base Model

Project 3 is the lab's most ambitious build: a natural-language-to-SQL assistant you'll take all the way through supervised fine-tuning and RLHF. Before writing a line of training code, you have to answer a question every real research team faces under a compute budget: which base model do you even start from? This lesson walks through that choice and names the assistant you'll be building for the rest of the chapter — "SQL Pete."

## What you'll learn

- Why Project 3 is scoped to exactly two schemas instead of "all of SQL"
- Why the lab picks `Qwen2.5-Coder-1.5B-Instruct` over a larger 7B+ model
- Why a code-specialized base model beats a general-purpose chat model here
- What "SQL Pete" is and the shape of the pipeline ahead (SFT, reward, RLHF, eval)

## Meet SQL Pete

SQL Pete is the name you'll use for the rest of this chapter — and the next one — for the assistant you're building: a natural-language-to-SQL model scoped to exactly two schemas, **Northwind** and **AdventureWorks2012**, the same two databases this catalog's own SQL courses use. Scoping to two known schemas instead of "arbitrary SQL" matters for a small lab: it bounds the table and column vocabulary the model needs to learn, which is exactly what makes a small base model viable at all.

## The base model: Qwen2.5-Coder-1.5B-Instruct

SQL Pete starts from `Qwen2.5-Coder-1.5B-Instruct`, a small, open-weight, code-oriented instruction-tuned model from the Qwen2.5-Coder family. Three properties make it the right pick for this lab, in order:

1. **It's open-weight.** The lab can download the full weights, fine-tune them locally, and inspect internals later — a hard requirement, since Chapter 5's interpretability case study needs to reach into SQL Pete's residual stream. A closed API model would make that chapter impossible.
2. **It's code-specialized.** Qwen2.5-Coder was pretrained with a heavy proportion of code and SQL-adjacent text, so it already has a head start on tokenizing identifiers like `OrderDetails.UnitPrice` sensibly and producing syntactically valid SQL, before any task-specific fine-tuning happens.
3. **It's small — 1.5B parameters.** That is the whole tradeoff this lesson is about.

```python
from transformers import AutoModelForCausalLM, AutoTokenizer

MODEL_NAME = "Qwen/Qwen2.5-Coder-1.5B-Instruct"

tokenizer = AutoTokenizer.from_pretrained(MODEL_NAME)
model = AutoModelForCausalLM.from_pretrained(
    MODEL_NAME,
    torch_dtype="auto",
    device_map="auto",
)
```

## The tradeoff: why not something bigger?

A 7B+ model (or larger) would almost certainly produce more fluent, more generally capable SQL out of the box — bigger models are better models, all else equal. But "all else" is not equal in a small research lab:

- **Single-GPU fine-tuning budget.** The lab's compute is one GPU. A 1.5B model's weights, optimizer state, and activations fit comfortably; a 7B+ model pushes into territory where you need multi-GPU sharding, aggressive quantization, or gradient checkpointing just to get a training step to run at all — overhead the lab can't afford to spend a project on.
- **Faster iteration loop.** SFT, reward modeling, and RLHF are three separate training runs in this chapter alone. A model that fine-tunes in under an hour lets you iterate on data and reward design; a model that takes all day punishes every mistake.
- **The task doesn't need 7B+ of general knowledge.** SQL Pete only needs to translate natural language into SQL against two known schemas — a narrow, bounded task. General world knowledge, long-form reasoning, and broad conversational ability (the things extra parameters mainly buy you) aren't what this task is short on.

## Why not a general-purpose chat model instead?

The other axis of the choice is code-specialization versus general chat ability. A general-purpose instruction-tuned model of the same size would be weaker at the actual output format — valid, schema-correct SQL — because less of its pretraining was spent on code and structured query syntax. Qwen2.5-Coder trades away some general conversational polish for exactly the skill this task is graded on. For a narrow, code-shaped task like NL-to-SQL, that's the right trade.

## What's ahead

The rest of this chapter builds SQL Pete in stages: Lesson 16 supervised fine-tunes this base model with LoRA on curated question/SQL pairs; Lesson 17 defines an execution-correctness reward; Lesson 18 runs RLHF with that reward using TRL's `PPOTrainer`; Lesson 19 evaluates the result before and after RLHF, including a specific failure mode to watch for.

## Key terms

- **Qwen2.5-Coder-1.5B-Instruct** — the open-weight, code-specialized 1.5B-parameter base model SQL Pete is built from
- **Open-weight model** — a model whose full trained weights are downloadable and inspectable, as opposed to API-only access
- **Code-specialized model** — a model pretrained with a heavy proportion of code/SQL text, biasing it toward syntactically valid structured output
- **SQL Pete** — the lab's name for the Project 3 natural-language-to-SQL assistant, scoped to the Northwind and AdventureWorks2012 schemas

## Recap

SQL Pete starts from Qwen2.5-Coder-1.5B-Instruct: open-weight (so later interpretability work is possible), code-specialized (so it starts closer to valid SQL), and small (so it fits single-GPU fine-tuning and a fast iteration loop) — a deliberate trade against a larger, more generally capable but far more expensive model. Next up, Lesson 16: supervised fine-tuning on natural-language-to-SQL pairs.
