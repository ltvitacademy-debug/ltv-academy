import { FAQS, PHONE, TRACKS } from "@/lib/copy";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://ltv-academy.netlify.app";

/*
 * JSON-LD for search engines: the organization, the nine course tracks,
 * and the FAQ. All values come from the real site copy in lib/copy.ts.
 */
export default function StructuredData() {
  const organization = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    "@id": `${SITE_URL}/#organization`,
    name: "Lifting the Veil Academy",
    alternateName: "LTV Academy",
    url: SITE_URL,
    logo: `${SITE_URL}/brand/ltv-logo-still.png`,
    telephone: PHONE,
    foundingDate: "2017",
    founder: { "@type": "Person", name: "Bill Green" },
    description:
      "Live, instructor-led information technology training academy founded in 2017. Nine all-access tracks with nightly and Saturday classes; every session recorded.",
  };

  const courseList = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: TRACKS.map((t, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "Course",
        name: t.title,
        description: t.line,
        url: `${SITE_URL}/#tracks`,
        provider: { "@id": `${SITE_URL}/#organization` },
        hasCourseInstance: {
          "@type": "CourseInstance",
          courseMode: "online",
          courseSchedule: {
            "@type": "Schedule",
            repeatFrequency: "Daily",
            byDay: ["Monday", "Tuesday", "Wednesday", "Thursday", "Saturday"],
          },
        },
        offers: {
          "@type": "Offer",
          category: "Subscription",
          price: "297",
          priceCurrency: "USD",
        },
      },
    })),
  };

  const faq = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <>
      {[organization, courseList, faq].map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </>
  );
}
