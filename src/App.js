import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Navbar from "./components/Navbar";
import ProfileManager from "./components/ProfileManager";
import M3UReader from "./components/M3UReader";
import Head from "./components/Head";

function App() {
  const [selectedProfile, setSelectedProfile] = useState(null); // URI de la Profile sélectionnée

  return (
    <Router>
      <Head
        title="🎥 WatchAnywhere - Gérez vos fichiers M3U & Profiles"
        description="Gérez et explorez vos fichiers M3U, Profiles et chaînes TV live avec WatchAnywhere."
        keywords="M3U, Profiles, chaînes TV, fichiers M3U"
        favicon="/favicon.ico"
      />

<Navbar selectedProfile={selectedProfile} />

      <main className="container mx-auto p-6">
        <h1 className="text-4xl font-bold text-center text-blue-600 mb-6">
          🎥 WatchAnywhere - Gérez vos fichiers M3U & Profiles
        </h1>
        <p className="text-center text-gray-700 mb-8">
          Ici, vous pouvez facilement importer, gérer et lire vos fichiers M3U pour explorer vos films, séries et chaînes TV live sur n'importe quel appareil !
        </p>

        {/* Barre de navigation */}
        <nav className="flex justify-center space-x-4 mb-6">
          <Link to="/" className="text-blue-500 hover:text-blue-600 font-semibold">
            Gestion des Profiles
          </Link>
          <Link to="/m3u" className="text-blue-500 hover:text-blue-600 font-semibold">
            Lecteur M3U
          </Link>
        </nav>

        <Routes>
          <Route
            path="/"
            element={
              <>
                <Head
                  title="Gestion des Profiles - WatchAnywhere"
                  description="Gérez vos Profiles pour explorer et organiser vos chaînes TV et fichiers vidéo en toute simplicité."
                />
                <ProfileManager
  setSelectedProfile={setSelectedProfile}
  selectedProfile={selectedProfile}
/>

              </>
            }
          />
          <Route
            path="/m3u"
            element={
              <>
                <Head
                  title="Lecteur M3U - WatchAnywhere"
                  description="Utilisez notre lecteur M3U pour explorer et regarder vos chaînes TV préférées en un clin d'œil."
                />
                {selectedProfile ? (
                  <M3UReader initialStream={selectedProfile} />
                ) : (
                  <p className="text-center text-gray-500">
                    Veuillez sélectionner une Profile depuis la page principale !
                  </p>
                )}
              </>
            }
          />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
