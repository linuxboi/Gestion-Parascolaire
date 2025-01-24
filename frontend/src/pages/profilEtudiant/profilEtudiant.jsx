import React, { useState, useEffect } from "react";
import axios from "axios";
import "./profilEtudiant.css";

const Profil = () => {
  const [userData, setUserData] = useState({
    nom: "",
    prenom: "",
    email: "",
    profilePic: "", // URL de la photo de profil
  });
  const [nouveauMotDePasse, setNouveauMotDePasse] = useState("");
  const [motDePasseActuel, setMotDePasseActuel] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [message, setMessage] = useState("");
  const [isPasswordChangeVisible, setIsPasswordChangeVisible] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:4000/api/profil", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUserData(response.data);
      } catch (error) {
        console.error("Erreur lors du chargement du profil:", error);
        setMessage("Impossible de charger les informations du profil.");
      }
    };
    fetchData();
  }, []);

  const handleUpdatePassword = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(
        "http://localhost:4000/api/profil/updatePassword",
        {
          motDePasseActuel,
          nouveauMotDePasse,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessage(response.data.message);
      setIsPasswordChangeVisible(false);
    } catch (error) {
      console.error("Erreur lors de la mise à jour du mot de passe:", error);
      setMessage("Erreur lors de la mise à jour du mot de passe.");
    }
  };

  const handleProfilePicUpload = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("photo", selectedFile);

    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(
        "http://localhost:4000/api/profil/upload",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setUserData((prevData) => ({
        ...prevData,
        profilePic: response.data.profilePic,
      }));
      setMessage("Photo de profil mise à jour avec succès.");
    } catch (error) {
      console.error(
        "Erreur lors de la mise à jour de la photo de profil:",
        error
      );
      setMessage("Erreur lors de la mise à jour de la photo de profil.");
    }
  };

  return (
    <div className="mt-20">
    <div className="profil-container">
      <h1>Mon Profil</h1>

      {message && (
        <p
          className={`message ${
            message.includes("Erreur") ? "error" : "success"
          }`}
        >
          {message}
        </p>
      )}

      {/* Photo de profil */}
      <div className="profile-pic-container">
        {userData.profilePic ? (
          <img
            src={`${userData.profilePic}`}
            alt="Profil"
            className="profile-pic"
          />
        ) : (
          <img
            src="/default-profile.png"
            alt="Default Profil"
            className="profile-pic"
          />
        )}
        <form onSubmit={handleProfilePicUpload}>
          <input
            type="file"
            id="fileInput"
            onChange={(e) => setSelectedFile(e.target.files[0])}
          />
          <button type="submit" disabled={!selectedFile}>
            Mettre à jour la photo
          </button>
        </form>
      </div>

      {/* Informations du profil */}
      <div className="profile-info">
        <div className="info-item">
          <span className="label">Nom : </span>
          <span className="value">{userData.nom}</span>
        </div>
        <div className="info-item">
          <span className="label">Prénom : </span>
          <span className="value">{userData.prenom}</span>
        </div>
        <div className="info-item">
          <span className="label">Email : </span>
          <span className="value">{userData.email}</span>
        </div>
      </div>

      {/* Bouton pour afficher/masquer le formulaire de changement de mot de passe */}
      <button
        onClick={() => setIsPasswordChangeVisible(!isPasswordChangeVisible)}
      >
        Modifier le mot de passe
      </button>

      {/* Formulaire de modification du mot de passe */}
      <div className="mdp">
        {isPasswordChangeVisible && (
          <form onSubmit={handleUpdatePassword}>
            <div>
              <input
                type="password"
                placeholder="Mot de passe actuel"
                value={motDePasseActuel}
                onChange={(e) => setMotDePasseActuel(e.target.value)}
              />
            </div>
            <div>
              <input
                type="password"
                placeholder="Nouveau mot de passe"
                value={nouveauMotDePasse}
                onChange={(e) => setNouveauMotDePasse(e.target.value)}
              />
            </div>
            <button type="submit">Mettre à jour le mot de passe</button>
          </form>
        )}
      </div>
    </div>
    </div>
  );
};

export default Profil;