# 📱 Lebian Mobile - Guide de Développement

Ce document détaille les spécifications techniques nécessaires pour élaborer une application mobile (iOS/Android) quasi-identique au Frontend Web actuel, en assurant une connexion parfaite avec le Backend Lebian existant.

## 🏗 Stack Technique Recommandée
Pour garantir la rapidité de développement et la fidélité visuelle du design (Glassmorphism, animations fluides) :
- **Framework** : **Flutter** (Dart) ou **React Native**.
- **Gestion d'État** : Provider/Riverpod (Flutter) ou Redux/Zustand (React Native).
- **Client API** : Dio (Flutter) ou Axios (React Native).
- **Cartographie** : Google Maps SDK.

---

## 🔌 Configuration Connexion Backend

Le backend est une API NestJS fonctionnant par défaut sur le port **3000** (ou 3001 selon votre config Docker).

### ⚠️ Point d'Attention : Localhost sur Mobile
Sur un simulateur ou un appareil réel, `localhost` ne pointera pas vers votre machine de développement.
- **Android Emulator** : Utilisez `http://10.0.2.2:3000/api`
- **iOS Simulator** : Utilisez `http://localhost:3000/api`
- **Appareil Réel** : Utilisez l'adresse IP locale de votre machine (ex: `http://192.168.1.XX:3000/api`).

---

## 🔐 Authentification & Sécurité

L'authentification utilise des **JSON Web Tokens (JWT)**.
1. **Login/Register** : Envoyez les identifiants pour recevoir un `access_token`.
2. **Persistence** : Stockez le token de manière sécurisée (Flutter: `flutter_secure_storage`, React Native: `react-native-keychain`).
3. **Intercepteurs** : Ajoutez le token dans le header de chaque requête protégée :
   ```http
   Authorization: Bearer <votre_token>
   ```

---

## 📡 Documentation de l'API (Endpoints)

### 🔑 Authentification (`/auth`)
- `POST /auth/register` : Création de compte.
- `POST /auth/login` : Connexion (retourne le token et les infos utilisateur).

### 📝 Signalements (`/reports`)
- `GET /reports/public` : Liste des signalements visibles par tous.
- `GET /reports/nearby?lat={lat}&lng={lng}&radius={km}` : Signalements à proximité (Crucial pour le mobile).
- `GET /reports/:id` : Détails d'un signalement spécifique.
- `POST /reports` : Créer un signalement (Nécessite Auth).
  - *Payload* : `title`, `description`, `location` (lat/lng), `type`, `images` (Base64).
- `POST /reports/:id/like` : Liker un signalement.
- `PATCH /reports/:id/views` : Incrémenter les vues.

### 👤 Utilisateurs (`/users`)
- `PUT /users/profile/password` : Changer le mot de passe.

### 🛡️ Administration & Équipes (`/admin`, `/teams`)
- `GET /admin/stats` : Statistiques globales.
- `GET /admin/users` : Liste des utilisateurs (Admin seul).
- `GET /teams` : Liste des équipes d'intervention.

---

## 🎨 Correspondance UI/UX (Frontend Parity)

Pour que la version mobile soit "quasi identique" au Web :
1. **Écran d'Accueil** : Carte interactive (Google Maps) affichant les clusters de signalements.
2. **Dashboard** : Liste filtrable des signalements récents avec statut (En attente, Résolu, etc.).
3. **Formulaire de Signalement** :
   - Utilisation native de la **Caméra** pour prendre des photos.
   - Utilisation du **GPS** pour pré-remplir la localisation exacte.
4. **Profil** : Gestion des informations personnelles et historique des signalements de l'utilisateur.

---

## 🚀 Étapes d'Implémentation
1. Initialiser le projet mobile.
2. Configurer le client API avec l'URL du backend.
3. Implémenter le flux d'Auth (Login/Stockage Token).
4. Créer la page principale avec la Carte et les signalements `nearby`.
5. Implémenter le formulaire de création de signalement avec intégration Caméra/GPS.
