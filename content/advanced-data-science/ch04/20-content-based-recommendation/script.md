# Script — Content-Based Recommendation

## Segment 1 (title)

What about a product that launched this morning, with no clicks at all? Collaborative filtering has nothing to work with. Content-based recommendation looks at what an item actually is.

## Segment 2 (idea)

The logic is simple: if you liked items that look like these, you will like other items that look like these. Describe each item as a TF-IDF vector built from its text. Build a user profile by adding up the vectors of the items they clicked. Then rank every item by cosine similarity to that profile.

## Segment 3 (code)

We attach an invented description to each of our thirty items: home-office products first, camping gear second. TF-IDF gives a thirty by one hundred twelve matrix. Multiplying the click matrix by those item vectors gives every user a profile, and cosine similarity scores each item against it.

## Segment 4 (output)

User zero's profile is dominated by the words desk, adjustable, and ergonomic, and the recommendations are office items they have not clicked yet. Notice we can explain why. One honest wrinkle: a camping chair showed up as similar to the office chair, because the descriptions share the word chair. Matching on words has limits, and our descriptions are cleaner than real ones.

## Segment 5 (cold start)

Now the payoff. Here is a brand-new mouse with no clicks. It scores zero point four for user zero, an office shopper, and only zero point zero eight for user forty, an outdoor shopper. Collaborative filtering could not do that.

## Segment 6 (limits)

Content-based methods have limits too. They stay inside a user's existing tastes, creating a filter bubble. They are only as good as the item data. They ignore popularity and quality. Production systems often blend both approaches into a hybrid.

## Segment 7 (outro)

We now have several recommenders. Which is actually better? That is the next lesson: evaluating recommenders.
