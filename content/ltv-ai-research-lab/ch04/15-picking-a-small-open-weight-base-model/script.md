# Script — Picking a Small Open-Weight Base Model

## Segment 1 (title)

Project 3 is the lab's most ambitious build: a natural-language-to-SQL assistant you'll carry all the way through supervised fine-tuning and RLHF. Before writing any training code, you have to make a choice every real research team makes under a compute budget — which base model do you even start from, and what are you giving up by picking a smaller one?

## Segment 2 (steps)

The assistant you're building is called SQL Pete. It's scoped to exactly two schemas, Northwind and AdventureWorks2012, the same two databases this catalog's own SQL courses already use. Scoping to two known schemas instead of arbitrary SQL bounds the table and column vocabulary SQL Pete needs to learn, which is exactly what makes a small base model viable at all.

## Segment 3 (code)

SQL Pete starts from Qwen2.5-Coder-1.5B-Instruct, loaded here with Hugging Face's AutoTokenizer and AutoModelForCausalLM. It's a small, open-weight, code-specialized instruction model from the Qwen2.5-Coder family, pretrained with a heavy proportion of code and SQL-adjacent text.

## Segment 4 (steps)

Three properties make it the right pick, in order. It's open-weight, so Chapter 5's interpretability case study can later reach into its residual stream, which a closed API model would make impossible. It's code-specialized, giving it a head start on producing syntactically valid SQL before any task-specific training happens. And it's small, at 1.5 billion parameters, which is the whole tradeoff this lesson is about.

## Segment 5 (steps)

Why not something bigger? A 7B-plus model would likely be more fluent, but it pushes past single-GPU fine-tuning into multi-GPU or heavy-quantization territory the lab can't afford. This chapter alone runs three separate training stages, so a faster iteration loop matters more than raw scale. And the task itself — translating questions against two known schemas — doesn't need 7B-plus of general knowledge to begin with; it needs a narrow skill, which a code-specialized model already leans toward.

## Segment 6 (outro)

Hold onto SQL Pete's identity: Qwen2.5-Coder-1.5B-Instruct, scoped to Northwind and AdventureWorks2012. Up next, Lesson 16: supervised fine-tuning on natural-language-to-SQL pairs.
