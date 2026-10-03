// app/components/JsonLd.tsx
// Renders structured data. Server component, no client JS.

export default function JsonLd({ data }: { data: object | object[] }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        // escape "<" so content can never close the script tag
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}