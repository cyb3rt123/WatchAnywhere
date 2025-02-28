# WatchAnywhere

# 🎥 WatchAnywhere

> **Votre solution complète pour gérer vos fichiers M3U, vos playlists IPTV et explorer vos chaînes TV préférées sur n'importe quel appareil.**

![Logo WatchAnywhere](public/logo.png)

---

### 📝 Description

**WatchAnywhere** est une application web qui vous permet de :
- Importer et gérer des fichiers M3U.
- Créer et sélectionner des profils personnalisés (nom d'utilisateur, âge, image de profil).
- Accéder à vos contenus IPTV et chaînes TV en direct grâce à un lecteur facile à utiliser.

Que ce soit pour vos films, séries ou chaînes TV préférées, WatchAnywhere s'assure que tout est organisé et disponible à portée de main !

---

### 🚀 Fonctionnalités clé

- **Gestion des profils** :
  - Ajoutez des profils utilisateurs en incluant un prénom, une image et un âge.
  - Sélectionnez, désélectionnez et supprimez des profils rapidement.
  - Visualisez le profil sélectionné directement dans la barre de navigation.

- **Lecteur M3U entièrement fonctionnel** :
  - Prise en charge des fichiers de playlist M3U.
  - Permet de visualiser les flux TV des chaînes en direct (nécessite l'import des fichiers M3U).

- **Interface utilisateur intuitive :**
  - Système rapide et facilement navigable.
  - Responsive : Accessible sur mobile, tablette et desktop.

- **Personnalisation dynamique :**
  - Titre, description et autres métadonnées personnalisées grâce au composant `Head`.

---

### 📦 Installation et Démarrage
Installez les dépendances nécessaires :
Assurez-vous d’avoir Node.js installé sur votre machine, puis exécutez la commande suivante dans le terminal :

``` npm install

### Démarrez le serveur de développement local :
Lancez l'application en mode développement :

``` npm start

### Ensuite, ouvrez http://localhost:3000 dans votre navigateur.

### Build de production (facultatif) :
Si vous souhaitez générer une version optimisée pour le déploiement, exécutez :

``` npm run build

### 📷 Capture d'écran (Screenshots)

#### Interface principale (Sélection d'un profil)
https://prnt.sc/m64BMkymIGBO

---

### 📦 Installation locale

Suivez ces instructions pour cloner et exécuter une version locale de ce projet :

1. **Clonez le projet depuis GitHub** :
   ```bash
   git clone https://github.com/cyb3rt123/WatchAnywhere.git
   cd WatchAnywhere


🛠️ Dépendances principales
Voici les principales bibliothèques utilisées dans ce projet :

React JS : Framework JavaScript pour la création d'interfaces utilisateur.
React Router DOM : Pour gérer la navigation à travers plusieurs vues/pages.
React Helmet : Pour la gestion dynamique des balises <head> (SEO, favicon, etc.).
Tailwind CSS : Framework CSS utilitaire pour un développement rapide.
⚡ Fonctionnalités à venir
⚙️ Support natif pour les flux vidéo en direct (streaming HLS).
🔍 Recherche et filtrage des chaînes dans les fichiers M3U.
📱 Application mobile native pour Android et iOS.
🤝 Contributions
Les contributions sont les bienvenues ! Si vous souhaitez contribuer, suivez ces étapes :

Fork le projet
Créez une branche pour votre fonctionnalité (git checkout -b feature/ma-fonctionnalite)
Commitez vos modifications (git commit -m 'Ajout de ma fonctionnalité')
Poussez vers votre fork (git push origin feature/ma-fonctionnalite)
Ouvrez une Pull Request
📄 Licence
Ce projet est sous licence MIT. Consultez le fichier LICENSE pour plus d'informations.
