# Script — Supervised vs. Unsupervised vs. Reinforcement Learning

## Segment 1 (title)

Machine learning is a way of writing programs that improve at a task by being shown data, instead of being told explicit rules. That one idea splits into three broad paradigms, and almost everything you'll meet in ML falls into one of them.

## Segment 2 (steps)

Supervised learning learns from labeled examples. Unsupervised learning finds structure with no labels at all. And reinforcement learning learns from reward signals through trial and error. Let's look at each one.

## Segment 3 (code)

In supervised learning, every example carries the correct answer. An email paired with "spam" or "not spam." A house's features paired with its sale price. The label supervises the learning, the way an answer key lets a student check their work. This is the most common type of ML in business, because labeled historical data is usually already sitting in a database.

## Segment 4 (code)

Unsupervised learning gets no labels at all — just raw data — and has to find structure on its own. Feed it fifty thousand customers' purchase histories with no groups specified, and it might surface a cluster of bulk buyers and a cluster of frequent small-basket shoppers, without ever being told those categories exist.

## Segment 5 (steps)

Reinforcement learning is different again. There's no fixed dataset of right answers. An agent takes an action in an environment, gets a reward or penalty, and observes a new state. Over many attempts it learns a policy that tends to maximize total reward — the way a chess engine learns from playing games, not from labeled correct moves.

## Segment 6 (outro)

Most of this course, and most applied ML in industry, lives in supervised learning, because labeled historical data is usually what's available. Next, we'll look at the two phases every supervised model goes through: training and inference.
