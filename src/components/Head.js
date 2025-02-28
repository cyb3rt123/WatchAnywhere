import React from "react";
import { Helmet } from "react-helmet";

const Head = ({ title, description, keywords, favicon, image, url, type }) => {
  return (
    <Helmet>
      {/* Titre de la page */}
      <title>{title || "WatchAnywhere"}</title>

      {/* Metadonnées principales */}
      <meta
        name="description"
        content={description || "La meilleure plate-forme pour gérer et regarder vos fichiers M3U, où que vous soyez."}
      />
      <meta
        name="keywords"
        content={keywords || "films, séries, TV en direct, IPTV, M3U, lecteur M3U"}
      />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta charSet="utf-8" />

      {/* Favicon */}
      {favicon && <link rel="icon" href={favicon} type="image/x-icon" />}

      {/* Métadonnées Open Graph (pour Facebook, LinkedIn, etc.) */}
      <meta property="og:title" content={title || "WatchAnywhere"} />
      <meta
        property="og:description"
        content={description || "Explorez et regardez vos chaînes TV et fichiers vidéo partout et à tout moment."}
      />
      <meta property="og:image" content={image || "/logo.png"} />
      <meta property="og:url" content={url || "YOUR WEBSITE"} />
      <meta property="og:type" content={type || "website"} />

      {/* Métadonnées Twitter Cards */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title || "WatchAnywhere"} />
      <meta
        name="twitter:description"
        content={description || "Regardez vos chaînes TV préférées partout grâce à WatchAnywhere."}
      />
      <meta name="twitter:image" content={image || "/default-image.jpg"} />
      <meta name="twitter:site" content="" />

      {/* Ajout utile pour assurer un bon rendu avec mobile/tablette */}
      <meta name="theme-color" content="#000000" />
    </Helmet>
  );
};

export default Head;
