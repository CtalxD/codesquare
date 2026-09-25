// In a Server Component (not "use client")
const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Code Square Pvt. Ltd.",
  url: "https://www.codesquare.com.np",
  logo: "https://www.codesquare.com.np/codesquare.PNG",
  description: "A four-person software studio in Kathmandu building websites, mobile apps, and custom software.",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Kathmandu",
    addressCountry: "NP",
  },
  contactPoint: {
    "@type": "ContactPoint",
    email: "codesquare2026@gmail.com",
    telephone: "+9779813301334",
    contactType: "customer service",
  },
};

// Then render: <JsonLd data={organizationSchema} />