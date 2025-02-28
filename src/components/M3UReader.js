import React, { useState, useEffect, useRef } from "react";
import Hls from "hls.js";
import ReactPlayer from "react-player";
import Draggable from "react-draggable";

// Éléments sélectionnables dans la navigation
const sections = ["Films", "Séries", "Live TV"];

const M3UReader = () => {
  const [categories, setCategories] = useState(null); // Toutes les catégories
  const [selectedSection, setSelectedSection] = useState("Live TV"); // Section sélectionnée
  const [selectedCategory, setSelectedCategory] = useState(null); // Catégorie sélectionnée
  const [currentStream, setCurrentStream] = useState(null); // Stream sélectionné
  const [error, setError] = useState(""); // Gestion des erreurs
  const [masterSearch, setMasterSearch] = useState(""); // Recherche globale
  const [categorySearch, setCategorySearch] = useState(""); // Recherche par catégorie

  const videoRef = useRef(null);
  const draggableRef = useRef(null);

  // ✅ Fonction pour parser un fichier M3U
  const parseM3U = (content) => {
    const lines = content.split("\n");
    const parsed = { Films: {}, Séries: {}, "Live TV": {} };
    let currentMetadata = {};

    lines.forEach((line) => {
      const trimmed = line.trim();
      if (trimmed.startsWith("#EXTINF")) {
        // Extraire les métadonnées importantes
        const nameMatch = trimmed.match(/tvg-name="(.*?)"/);
        const logoMatch = trimmed.match(/tvg-logo="(.*?)"/);
        const groupMatch = trimmed.match(/group-title="(.*?)"/);
        const title = trimmed.split(",")[1]; // Nom après la virgule
        currentMetadata = {
          name: nameMatch ? nameMatch[1] : title || "Sans titre",
          logo: logoMatch ? logoMatch[1] : null,
          group: groupMatch ? groupMatch[1] : "Autres",
        };
      } else if (trimmed && !trimmed.startsWith("#")) {
        const uri = trimmed;

        // Tri des fichiers par section
        if (uri.includes("/movie/")) {
          const categoryKey = currentMetadata.group || "Autres";
          if (!parsed.Films[categoryKey]) parsed.Films[categoryKey] = [];
          parsed.Films[categoryKey].push({ ...currentMetadata, uri });
        } else if (uri.includes("/series/") || /S\d+\s?E\d+/i.test(currentMetadata.name)) {
          const categoryKey = currentMetadata.group || "Autres";
          if (!parsed.Séries[categoryKey]) parsed.Séries[categoryKey] = [];
          parsed.Séries[categoryKey].push({ ...currentMetadata, uri });
        } else {
          const categoryKey = currentMetadata.group || "Autres";
          if (!parsed["Live TV"][categoryKey]) parsed["Live TV"][categoryKey] = [];
          parsed["Live TV"][categoryKey].push({ ...currentMetadata, uri });
        }
      }
    });

    setCategories(parsed);
    setError("");
  };

  // ✅ Gestion de l'importation du fichier M3U
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return setError("Veuillez sélectionner un fichier M3U.");

    const reader = new FileReader();
    reader.onload = (e) => {
      if (!e.target.result.trim().startsWith("#EXTM3U")) {
        setError("Le fichier sélectionné n'est pas un fichier M3U valide.");
        return;
      }
      parseM3U(e.target.result);
    };
    reader.readAsText(file);
  };

  /** 🔍 Fonction pour les résultats filtrés */
  const getFilteredItems = () => {
    if (!categories) return [];

    if (masterSearch) {
      const filtered = [];
      Object.keys(categories[selectedSection] || {}).forEach((category) => {
        categories[selectedSection][category].forEach((item) => {
          if (item.name.toLowerCase().includes(masterSearch.toLowerCase())) {
            filtered.push(item);
          }
        });
      });
      return filtered;
    }

    if (selectedCategory && categorySearch) {
      return (categories[selectedSection][selectedCategory] || []).filter((item) =>
        item.name.toLowerCase().includes(categorySearch.toLowerCase())
      );
    }

    if (selectedCategory) return categories[selectedSection][selectedCategory] || [];

    return [];
  };

  const filteredItems = getFilteredItems();

/** 🎥 Gestion du player HLS.js */
useEffect(() => {
    const convertTsToM3U8 = async (stream) => {
      try {
        if (stream.endsWith(".ts")) {
          // Appeler le backend pour convertir le .ts en .m3u8
          const response = await fetch(`http://localhost:3001/convert?uri=${encodeURIComponent(stream)}`);
          const data = await response.json();
  
          if (data.playlist) {
            console.log("Conversion réussie, nouvelle playlist :", data.playlist);
            return data.playlist; // Retourne l'URI .m3u8 générée
          }
        }
        return stream; // Si ce n'est pas un .ts, renvoyer directement l'URI
      } catch (err) {
        console.error("Erreur lors de la conversion du flux :", err);
        return stream;
      }
    };
  
    const handleStream = async () => {
      const convertedStream =
        currentStream && (await convertTsToM3U8(currentStream));
  
      if (convertedStream && convertedStream.endsWith(".m3u8") && Hls.isSupported()) {
        const hls = new Hls();
        hls.loadSource(convertedStream);
        hls.attachMedia(videoRef.current);
  
        hls.on(Hls.Events.MANIFEST_PARSED, () => {
          console.log("Manifest HLS chargé !");
          videoRef.current.play();
        });
  
        hls.on(Hls.Events.ERROR, (event, data) => {
          console.error("Erreur avec HLS.js :", data);
        });
  
        return () => hls.destroy(); // Nettoyage HLS
      }
    };
  
    handleStream();
  }, [currentStream]);
  

  const handleFullscreen = () => {
    if (videoRef.current) {
      if (videoRef.current.requestFullscreen) {
        videoRef.current.requestFullscreen();
      } else if (videoRef.current.webkitRequestFullscreen) {
        videoRef.current.webkitRequestFullscreen();
      }
    }
  };

  return (
    <div className="bg-gray-900 text-white h-screen">
      <h1 className="text-center text-3xl font-bold py-4">Lecteur M3U Dynamique</h1>
      {!categories && (
        <div className="flex flex-col items-center justify-center h-full">
          <input
            type="file"
            accept=".m3u"
            onChange={handleFileUpload}
            className="cursor-pointer bg-gray-700 text-white px-4 py-2 rounded"
          />
          {error && <p className="text-red-500">{error}</p>}
        </div>
      )}

      {categories && (
        <div className="flex flex-col h-full">
          <div className="p-4 bg-gray-800 flex items-center">
            <select
              value={selectedSection}
              onChange={(e) => setSelectedSection(e.target.value)}
              className="bg-gray-700 text-white rounded px-4 py-2"
            >
              {sections.map((section) => (
                <option key={section} value={section}>
                  {section}
                </option>
              ))}
            </select>

            <input
              type="text"
              value={masterSearch}
              onChange={(e) => setMasterSearch(e.target.value)}
              placeholder="Recherche globale..."
              className="ml-4 w-full p-2 rounded bg-gray-700 text-white"
            />
          </div>

          <div className="flex flex-1">
            <div className="bg-gray-800 p-4 w-1/4 overflow-y-auto">
              <h2 className="text-xl font-bold mb-4">Catégories ({selectedSection})</h2>
              {Object.keys(categories[selectedSection] || {}).map((category, index) => (
                <div
                  key={index}
                  onClick={() => {
                    setSelectedCategory(category);
                    setCategorySearch("");
                  }}
                  className={`p-2 mb-2 rounded cursor-pointer ${
                    selectedCategory === category
                      ? "bg-blue-500"
                      : "bg-gray-700 hover:bg-gray-600"
                  }`}
                >
                  {category}
                </div>
              ))}
            </div>

            <div className="flex-1 bg-gray-900 p-4 overflow-y-auto">
              {selectedCategory && (
                <input
                  type="text"
                  value={categorySearch}
                  onChange={(e) => setCategorySearch(e.target.value)}
                  placeholder={`Recherche dans "${selectedCategory}"...`}
                  className="w-full p-2 rounded bg-gray-700 text-white mb-4"
                />
              )}

              <div className="grid grid-cols-4 gap-4">
                {filteredItems.map((item, index) => (
                  <div
                    key={index}
                    onClick={() => setCurrentStream(item.uri)}
                    className="bg-gray-700 p-4 rounded hover:bg-gray-600 cursor-pointer"
                  >
                    {item.logo && (
                      <img
                        src={item.logo}
                        alt={item.name}
                        className="w-full h-32 object-cover rounded mb-2"
                      />
                    )}
                    <h3 className="text-sm font-semibold truncate">{item.name}</h3>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {currentStream && (
        <Draggable bounds="parent" nodeRef={draggableRef}>
          <div
            ref={draggableRef}
            className="fixed bottom-0 right-0 bg-gray-800 p-4 rounded shadow-lg"
            style={{ width: "320px" }}
          >
            {currentStream.endsWith('.m3u8') ? (
              <video ref={videoRef} controls autoPlay className="w-full rounded" />
            ) : (
              <ReactPlayer
                url={currentStream}
                controls
                playing
                pip
                width="100%"
                height="180px"
              />
            )}
          </div>
        </Draggable>
      )}
    </div>
  );
};

export default M3UReader;
