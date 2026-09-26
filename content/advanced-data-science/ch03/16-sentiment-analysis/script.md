Sentiment analysis asks whether text is positive or negative. It looks like the easiest text task, but it is where bag-of-words shortcuts show their limits. We will build two simple scorers and test them honestly.

There are three broad approaches. A lexicon counts good and bad words. A trained classifier learns from labeled reviews. And pretrained models, such as VADER or transformers, are common in practice, though we have not run them here. Whatever you pick, test it on your own data.

Our lexicon has twenty-four positive words, twenty-eight negative ones, and four negators. The score adds up word polarity, flipping the sign of any word that follows not, no, never or hardly.

On eighty hand-written reviews, accuracy is point seven seven five without the negation rule, and point eight one two with it. But look closer. Thirty-two reviews score exactly zero because they contain no lexicon word. The other forty-eight are all correct. High precision, low coverage. And I wrote this lexicon, so treat the score as optimistic.

Next, a classifier. Trained on two hundred generated reviews, it scores ninety-eight percent in cross-validation. But those reviews all follow the same templates. On the eighty independent reviews, it scores only seventy percent. The training set has just sixty-seven distinct words, and about fifty-nine percent of the words in the test reviews were never seen. A model cannot weigh a word it has never met.

Now the hard cases. The lexicon handles not great, but it scores the sarcastic "Oh great, it broke on day one" as zero. The classifier hovers near point five, and it even leans positive on not great.

So remember: negation matters, sarcasm defeats word counts, vocabulary is the ceiling, and you must evaluate on realistic text. Next, topic modeling: finding themes in text with no labels at all.
