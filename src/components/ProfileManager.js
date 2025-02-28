import React, { useState, useEffect } from "react";

const ProfileManager = ({ setSelectedProfile, selectedProfile }) => {
  const [profiles, setProfiles] = useState([]); // Liste des profils
  const [username, setUsername] = useState(""); // Nom d'utilisateur
  const [age, setAge] = useState(""); // Âge de l'utilisateur
  const [image, setImage] = useState(null); // Image facultative
  const [error, setError] = useState(""); // Gestion des erreurs

  // Charger les profils depuis le localStorage lors du montage
  useEffect(() => {
    const savedProfiles = JSON.parse(localStorage.getItem("profiles")) || [];
    setProfiles(savedProfiles);
  }, []);

  // Ajouter un profil
  const addProfile = (e) => {
    e.preventDefault();

    // Validation
    if (!username || !age) {
      setError("Le nom d'utilisateur et l'âge sont obligatoires !");
      return;
    }
    if (isNaN(age) || age <= 0) {
      setError("L'âge doit être un nombre valide et supérieur à 0.");
      return;
    }

    // Création d'un objet profil avec image facultative
    const newProfile = {
      username,
      age,
      image: image instanceof File ? URL.createObjectURL(image) : null,
    };

    const updatedProfiles = [...profiles, newProfile];
    setProfiles(updatedProfiles);

    // Sauvegarder dans localStorage
    localStorage.setItem("profiles", JSON.stringify(updatedProfiles));

    // Réinitialiser le formulaire
    setUsername("");
    setAge("");
    setImage(null);
    setError("");
  };

  // Supprimer un profil
  const deleteProfile = (index) => {
    const updatedProfiles = profiles.filter((_, i) => i !== index);
    setProfiles(updatedProfiles);

    // Mettre à jour localStorage
    localStorage.setItem("profiles", JSON.stringify(updatedProfiles));
  };

  return (
    <div className="p-4 bg-white shadow-md rounded">
      <h2 className="text-xl font-bold mb-4 text-blue-600">👤 Gestion des Profils</h2>
      <form onSubmit={addProfile}>
        <div className="mb-4">
          <label className="block font-semibold mb-2">Nom d'utilisateur</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Entrez le nom d'utilisateur"
            className="border border-gray-300 rounded w-full px-4 py-2"
          />
        </div>

        <div className="mb-4">
          <label className="block font-semibold mb-2">Âge</label>
          <input
            type="number"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            placeholder="Entrez l'âge"
            className="border border-gray-300 rounded w-full px-4 py-2"
          />
        </div>

        <div className="mb-4">
          <label className="block font-semibold mb-2">Image de profil (facultatif)</label>
          <input
            type="file"
            onChange={(e) => setImage(e.target.files[0])}
            accept="image/*"
            className="border border-gray-300 rounded w-full px-4 py-2"
          />
        </div>

        {error && <p className="text-red-500 mb-4">{error}</p>}

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Ajouter le Profil
        </button>
      </form>

      <hr className="my-6" />

      <h3 className="text-lg font-semibold mb-4 text-gray-700">📋 Liste des Profils :</h3>
      <ul>
        {profiles.map((profile, index) => (
          <li
            key={index}
            className="flex items-center justify-between border-b border-gray-200 py-4"
          >
            <div className="flex items-center gap-4">
              {profile.image ? (
                <img
                  src={profile.image}
                  alt={`Profil de ${profile.username}`}
                  className="rounded-full w-12 h-12 object-cover"
                />
              ) : (
                <div className="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center">
                  <span className="text-gray-600 text-xl">
                    {profile.username.charAt(0).toUpperCase()}
                  </span>
                </div>
              )}
              <div>
                <p className="font-bold text-blue-600">{profile.username}</p>
                <p className="text-gray-500 text-sm">Âge: {profile.age}</p>
              </div>
            </div>

            <div className="flex space-x-2">
  {/* Bouton dynamique */}
  {selectedProfile && selectedProfile.username === profile.username ? (
    <button
      className="bg-red-500 text-white px-2 py-1 rounded"
      onClick={() => setSelectedProfile(null)} // Désélectionner le profil
    >
      Désélectionner ce profil
    </button>
  ) : (
    <button
      className="bg-green-500 text-white px-2 py-1 rounded"
      onClick={() => setSelectedProfile(profile)} // Sélectionner le profil
    >
      Sélectionner ce profil
    </button>
  )}

  {/* Bouton supprimer */}
  <button
    className="bg-red-500 text-white px-2 py-1 rounded"
    onClick={() => deleteProfile(index)}
  >
    Supprimer
  </button>
</div>

          </li>
        ))}
      </ul>

      {profiles.length === 0 && (
        <p className="text-gray-500 italic">Aucun profil enregistré.</p>
      )}
    </div>
  );
};

export default ProfileManager;
