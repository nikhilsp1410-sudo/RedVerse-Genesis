import { Helmet } from 'react-helmet-async';

const SEO = ({ 
  title = "RedVerse Genesis | The First Guardians", 
  description = "A premium Dark Luxury NFT experience on Polygon. 20 Handcrafted cinematic Guardians forged in the fracture.",
  image = "https://redverse.com/images/guardians/001.png",
  url = "https://redverse.xyz",
  type = "website" 
}) => {
  return (
    <Helmet>
      {/* Basic HTML Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={url} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={image} />

      {/* Structured Data (Schema.org) for WebSite */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": type === "website" ? "WebSite" : "CreativeWork",
          "url": url,
          "name": title,
          "description": description,
          "image": image,
          "publisher": {
            "@type": "Organization",
            "name": "RedVerse Studios"
          }
        })}
      </script>
    </Helmet>
  );
};

export default SEO;
