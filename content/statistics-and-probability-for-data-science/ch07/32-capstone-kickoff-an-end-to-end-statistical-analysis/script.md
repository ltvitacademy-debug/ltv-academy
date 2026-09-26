Welcome to the capstone. For six chapters you practiced statistics one technique at a time. Real work arrives as a business question and a messy table, and nobody tells you which lesson to use. Here you will run one complete analysis, from question to recommendation.

Our scenario is an illustrative online retailer. It redesigned its welcome experience, sending new customers a three-email onboarding series. The team randomized five thousand new customers, half to control and half to treatment, and recorded two outcomes after ninety days: whether each customer churned, and how much they spent. The question is whether the series reduces churn and whether it changes spend.

Before touching any outcome, we write a plan. The primary metric is ninety-day churn. The secondary metric is spend per customer. We test two-sided at point oh five, but with two outcomes we apply a Bonferroni correction and require p below point oh two five. We check randomization first, and we report effect sizes with confidence intervals, never a bare p-value.

Then we generate the dataset with a fixed seed so your numbers match ours. Each row is a customer, with a group, region, age, prior sessions, a churn flag, and spend.

A first look shows five thousand rows and seven columns. Only age has missing values, one hundred of them. The groups are balanced at twenty-five hundred each. Spend is strongly right-skewed, with a mean of about forty-seven dollars above a median of about thirty-six. That tells us to pair a mean comparison with a bootstrap interval and to look at the median.

The roadmap has five stages: describe and clean, check the design, test and estimate, model and caveat, and finally communicate. You will end with a reproducible script, a results table, and a short recommendation, exactly what belongs in a portfolio.

Next up, we build it.
