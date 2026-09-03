// Real copy sourced from www.ltvacademy.com (scraped 2026-09-02).
// Do not invent testimonials or stats.

export const PHONE = "678-627-2796";

export const QUOTES = {
  prosper:
    "We will prosper in proportion as we learn to dignify and glorify labor and put brain and skill into the common occupations of life.",
  success:
    "Success is to be measured not so much by the position that one has reached in life as by the obstacles which he has overcome.",
};

export type Track = {
  n: string;
  slug: string;
  title: string;
  line: string;
  bullets: string[];
};

export const TRACKS: Track[] = [
  {
    n: "01",
    slug: "sql-server-bi",
    title: "SQL Server Database Development & Business Intelligence",
    line:
      "The flagship. T-SQL from the ground up through SSIS, SSRS, warehousing and dimensional modeling — finished with a capstone and a mock interview.",
    bullets: [
      "Master SQL fundamentals and advanced query techniques.",
      "Design, implement, and optimize databases for efficient data management.",
      "Gain expertise in SSIS and SSRS for robust business intelligence solutions.",
      "Hands-on experience in data warehousing and dimensional modeling.",
      "Analyze and visualize data effectively for informed decision-making.",
    ],
  },
  {
    n: "02",
    slug: "oracle-financials",
    title: "Oracle Financial Applications",
    line:
      "EBS architecture and the money modules — General Ledger, Payables, Receivables — through period close, reporting, and certification prep.",
    bullets: [
      "Understand the architecture and functionalities of Oracle Financial Applications.",
      "Configure and customize Oracle Financial modules for specific business requirements.",
      "Gain proficiency in General Ledger, Accounts Payable, and Accounts Receivable.",
      "Best practices for financial reporting and analysis using Oracle tools.",
      "Prepare for Oracle certification exams in Financials modules.",
    ],
  },
  {
    n: "03",
    slug: "salesforce-admin",
    title: "Salesforce Administration",
    line:
      "The platform, objects and fields, security, and Flow automation — pointed straight at the Salesforce Administrator certification.",
    bullets: [
      "Navigate the Salesforce platform and its core features.",
      "Configure and customize Salesforce to align with organizational needs.",
      "Manage user permissions, data security, and workflow automation.",
      "Create and customize reports and dashboards for actionable insights.",
      "Prepare for Salesforce Administrator certification.",
    ],
  },
  {
    n: "04",
    slug: "salesforce-architect",
    title: "Salesforce Solutions Architect",
    line:
      "Architecture at scale — data modeling, integration patterns, security, governance — run in the style of a CTA review board.",
    bullets: [
      "Dive deep into Salesforce architecture and design principles.",
      "Design scalable, high-performance Salesforce solutions.",
      "Master integration techniques connecting Salesforce to other systems.",
      "Architect solutions that meet complex business requirements.",
      "Prepare for Salesforce Certified Technical Architect (CTA) certification.",
    ],
  },
  {
    n: "05",
    slug: "data-science",
    title: "Data Science",
    line:
      "Statistics, Python and R, machine learning from cleaning to classification — finished with a portfolio you can put in front of an employer.",
    bullets: [
      "Foundational knowledge in statistics, machine learning, and data visualization.",
      "Techniques for data cleaning, preprocessing, and feature engineering.",
      "Popular machine learning algorithms for predictive modeling and classification.",
      "Extract insights from data using Python and R.",
      "Build a portfolio of data science projects for potential employers.",
    ],
  },
  {
    n: "06",
    slug: "data-engineering",
    title: "Data Engineering",
    line:
      "Scalable pipelines with Hadoop, Spark, and Kafka, and cloud data engineering on AWS and Google Cloud.",
    bullets: [
      "Principles of data architecture and data modeling.",
      "Design and build scalable data pipelines for ingestion and processing.",
      "Proficiency in big data technologies: Hadoop, Spark, and Kafka.",
      "Cloud-based data engineering on AWS and Google Cloud.",
      "Data warehouse design and optimization.",
    ],
  },
  {
    n: "07",
    slug: "data-analytics",
    title: "Data Analytics",
    line:
      "Exploratory analysis, hypothesis testing, forecasting, and visualization — applied to real business scenarios.",
    bullets: [
      "Data analytics tools and techniques for descriptive and diagnostic analysis.",
      "Data visualization methods to communicate insights effectively.",
      "Hands-on exploratory data analysis (EDA) and hypothesis testing.",
      "Statistical techniques for forecasting and trend analysis.",
      "Apply data analytics concepts to real-world business scenarios.",
    ],
  },
  {
    n: "08",
    slug: "devops",
    title: "DevOps Engineering",
    line:
      "Docker, Kubernetes, CI/CD pipelines, Ansible and Puppet — and the monitoring that keeps it all reliable.",
    bullets: [
      "Principles of DevOps and its role in modern software development.",
      "Automate infrastructure with Docker and Kubernetes.",
      "Continuous integration and continuous delivery (CI/CD) pipelines.",
      "Configuration management with Ansible and Puppet.",
      "Monitoring and logging for application performance and reliability.",
    ],
  },
  {
    n: "09",
    slug: "blockchain",
    title: "Blockchain Development",
    line:
      "Ethereum, Solidity, and decentralized applications — plus the uses for blockchain beyond cryptocurrency.",
    bullets: [
      "Fundamentals of blockchain technology and its applications.",
      "Develop decentralized applications (DApps) on platforms like Ethereum.",
      "Smart contract development with Solidity.",
      "Consensus mechanisms and blockchain security best practices.",
      "Blockchain beyond cryptocurrency: supply chain, digital identity, and more.",
    ],
  },
];

// Real graduate quotes from the current site. Tracks are not stated on the
// source site, so none are attributed — do not invent them.
export const TESTIMONIALS = [
  {
    quote:
      "I'd strongly advise anybody who's looking to upgrade their lives to take this course...",
    name: "Anthony",
  },
  {
    quote:
      "...I doubled my income in 8 months... I got a job within 3 weeks of finishing the class...",
    name: "Ian",
  },
  {
    quote: "Just got an offer for $74K per year... I couldn't be more happy!",
    name: "Lauren",
  },
  {
    quote:
      "I landed a new job... making $50/hr. I recommend this to anybody who wants to learn...",
    name: "Okey",
  },
  {
    quote: "I quadrupled my income...",
    name: "Johnny",
  },
];

export const ABOUT_STORY =
  "Founded by Bill Green in 2017, Lifting the Veil Academy has been steadfast in building professional, well trained, and career driven developers. LTV was actually started on a whim — a challenge to Bill to give back and share the skills he had acquired. Thinking he was just going to teach a few students, Bill decided to teach a class and bestow his database development skillset on a few students. Before long he had taught hundreds, and the requests to take the course kept coming. Since then, LTV has taught and/or helped employ thousands of students.";

export const FAQS = [
  {
    q: "How does the subscription model work for LTV Academy?",
    a: "The subscription model at LTV Academy is designed to provide flexible and cost-effective access to our wide range of classes and courses. Any subscription will allow access to any class, offering you the freedom to explore various subjects based on your interests and learning goals. The longer time you purchase for a subscription, the cheaper it is per month. For example, the All Access Annual Membership adds up to around $192 a month, but if you only subscribe for one month, it is $297 a month. This structure allows you to tailor your subscription to fit your budget and commitment level.",
  },
  {
    q: "What's the time commitment and schedule to complete the course?",
    a: "Our classes are web-based and typically take 4 to 5 months to complete, although some classes may run up to 8 months. You have the option to take more than one class at a time if you wish. Classes are taught nightly, and the specific weeknights vary based on each class and instructor. We have classes scheduled on weeknights and on Saturday mornings, making it convenient for working professionals to attend.",
  },
  {
    q: "How long will it take me to become job ready?",
    a: "The average student becomes job ready within 5 to 6 months (including the class). Expect a few more months for Salesforce Architecture. These students commit to attending classes, studying at least one hour a day, and completing all assignments. Keep in mind every student is different and results will vary. The total time is anywhere from 100 to 160 hours of self studying.",
  },
  {
    q: "How much does the course cost?",
    a: "The monthly subscription costs $297 per month. We also offer other packages as well.",
  },
  {
    q: "How can I cancel my membership?",
    a: "Simple — if you purchased a learning package, give us a 2 week notice before the next payment is due and we will cancel your monthly membership.",
  },
  {
    q: "What type of positions have your students landed after finishing the course?",
    a: "The majority of our students have received various developer positions including Reports Developer, ETL Developer, SQL Server Database Developer, and Business Intelligence Developer. Others have leveraged this course material to land other developer positions, such as Salesforce Developer/Architect and Python Developer.",
  },
  {
    q: "What materials or resources do I need?",
    a: "To become a developer, you'll need a laptop and access to a suite of software tools and environments. We provide those software tools and environments for you. You can either install the software on your own laptop, or you can rent a virtual machine. If you have a MacBook the software can be installed, but it would be wiser to rent a virtual machine. You need at least 100 gigs of space on your laptop to install the software. All software is free to download. We provide electronic versions of all learning materials; the most successful students choose to purchase additional resources as well.",
  },
  {
    q: "Do you guarantee I will land a job?",
    a: "No, we cannot guarantee employment in any form. There are many factors that determine if a company will hire you or not, and some of these factors are beyond the scope of the training provided in this course. However, we do guarantee that after taking our course, you will have the technical skills needed to hold your own in technical interviews related to the subject matter taught in our course.",
  },
  {
    q: "What is your refund policy?",
    a: "In light of the fact that this is a service industry we cannot issue refunds. However, if you desire a refund within 48 hours of a payment we will completely reverse your payment and issue a refund.",
  },
  {
    q: "Do you offer any certifications or certificates?",
    a: "We don't offer any certifications. However, after completing our course you will have a technical interview. If you are able to pass our technical interview process you will receive a certificate of completion. We also offer assistance in helping each student update their resume with their new skills.",
  },
  {
    q: "What if I miss the live class session?",
    a: "All class sessions are recorded and archived for you to access.",
  },
];
