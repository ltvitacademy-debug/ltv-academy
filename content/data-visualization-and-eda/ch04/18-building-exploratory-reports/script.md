In Python you explore one chart at a time. Power BI lets you explore a whole page of linked visuals at once, and this lesson shows how a data scientist uses that, without turning it into a full Power BI course.

Start with a question, and give each page one job. An overview page shows the overall churn rate. A distributions page shows how tenure, spend, and tickets are spread out. A relationships page breaks churn down by plan, region, and ticket count. If you cannot say what a page is for in one sentence, split it.

The magic is cross-filtering. Click a bar in one visual and the others update. Select the East region and every chart on the page shows only East customers. The Edit interactions button on the Format tab lets you control which visuals respond, so you never mislead yourself.

When Power BI lacks the chart you want, add a Python visual. A hedge here: it needs a local Python installation with pandas and matplotlib, and Python scripting must be enabled in Desktop, so check the current Microsoft documentation. You drag fields into the visual, and your script receives a pandas data frame named dataset.

Here is the trap. The visual groups rows the way a table visual does, and duplicate rows appear only once. On our churn data, two columns alone contain only thirteen distinct combinations, so eight hundred customers would collapse to thirteen rows. Add the customer ID field, and all eight hundred survive.

Know the limits too. As of this writing, the visual plots at most a hundred and fifty thousand rows, the script times out after five minutes, and the image itself is static, so you cannot click it to filter other visuals.

Next, we look at sharing what you find.
