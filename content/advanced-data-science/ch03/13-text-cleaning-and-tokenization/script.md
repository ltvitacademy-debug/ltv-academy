Every model so far has consumed numbers. Text is a messy string of letters, punctuation, URLs and typos. Natural language processing starts by turning that string into clean units a model can count.

The text pipeline has four steps. Normalize, tokenize, filter, and reduce. Every step is optional, and every step is a decision about what information you are willing to throw away.

Here is one messy review. We lowercase it, remove the URL with a regular expression, keep only letters and apostrophes, and split it into tokens. Nothing beyond Python's standard library.

The result is eleven tokens: loved, it, battery, lasts, days, and so on. Notice what our rules decided. The digit two is gone, and so is the smiley face. If numbers or emoticons matter for your problem, keep them. Write the rules for the data you actually have.

Now stop words. Scikit-learn ships a list of three hundred and eighteen very common English words. Filtering them shrinks the vocabulary, but look at this. The list contains the word not. So "not a good battery" becomes "good battery", the exact opposite of what the customer meant. For sentiment work, negation is signal, so skip this filter or edit the list.

Finally, reduction. Charge, charging and charged all express one idea. Stemming chops suffixes by rule. Our crude stemmer turns lasts into last, which is good, but loved into lov and batteries into batterie, which are not real words. Lemmatizers use a dictionary to do better. Libraries like NLTK and spaCy provide them, though we have not run them here, so check their current documentation.

The lesson: clean text on purpose, not by ritual. Next, we turn these tokens into numbers with bag-of-words and TF-IDF.
