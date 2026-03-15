# Documentation Complète - Système de Signalement de Déchets

## 📋 Table des Matières

1. [Vue d'ensemble du projet](#vue-densemble-du-projet)
2. [Objectifs et fonctionnalités](#objectifs-et-fonctionnalités)
3. [Types d'utilisateurs](#types-dutilisateurs)
4. [Architecture technique](#architecture-technique)
5. [Modèle de données](#modèle-de-données)
6. [API RESTful](#api-restful)
7. [Interfaces utilisateur](#interfaces-utilisateur)
8. [Plan d'implémentation étape par étape](#plan-dimplémentation-étape-par-étape)
9. [Sécurité et bonnes pratiques](#sécurité-et-bonnes-pratiques)
10. [Déploiement](#déploiement)
11. [Tests et validation](#tests-et-validation)

---

## 1. Vue d'ensemble du projet

### Description générale

Le **Système de Signalement de Déchets** est une application fullstack permettant aux citoyens de signaler des déchets abandonnés dans leur environnement. Le système géolocalise automatiquement les signalements, permet aux administrateurs d'assigner des statuts de nettoyage, et fournit un tableau de bord statistique pour suivre l'évolution de la gestion des déchets.

### Objectif principal

Faciliter la collaboration entre citoyens et services de nettoyage pour maintenir un environnement propre grâce à une plateforme accessible via web et mobile.

### Portée du projet

- **Application Web** : Interface pour utilisateurs et administrateurs
- **Application Mobile** : Application Flutter pour signalements sur le terrain
- **Backend API** : Service REST pour gérer toutes les opérations
- **Dashboard Admin** : Visualisation des statistiques et gestion des signalements

---

## 2. Objectifs et fonctionnalités

### Fonctionnalités principales

#### Pour les utilisateurs (Citoyens)

1. **Signalement de déchets**
   - Prendre une photo du déchet
   - Géolocalisation automatique
   - Ajouter une description
   - Catégoriser le type de déchet
   - Suivre l'état de leurs signalements

2. **Consultation**
   - Voir leurs signalements passés
   - Consulter le statut (en attente, assigné, en cours, complété)
   - Voir la carte des déchets signalés à proximité

#### Pour les administrateurs

1. **Gestion des signalements**
   - Visualiser tous les signalements
   - Filtrer par statut, date, localisation
   - Assigner des statuts de nettoyage
   - Assigner des équipes de nettoyage
   - Marquer comme complété

2. **Tableau de bord statistique**
   - Nombre total de signalements
   - Signalements par statut
   - Temps moyen de résolution
   - Zones les plus problématiques
   - Graphiques et visualisations
   - Tendances temporelles

3. **Gestion des utilisateurs**
   - Gérer les comptes utilisateurs
   - Attribuer des rôles
   - Voir l'historique d'activité

---

## 3. Types d'utilisateurs

### 3.1 Utilisateur (Citoyen)

**Permissions :**
- Créer des signalements
- Voir ses propres signalements
- Mettre à jour ses informations de profil
- Voir la carte publique des déchets

**Cas d'usage typique :**
> Marie voit des déchets abandonnés dans un parc. Elle ouvre l'application mobile, prend une photo, ajoute une description "Bouteilles en plastique et emballages", et soumet le signalement. Le système capture automatiquement sa localisation GPS.

### 3.2 Administrateur

**Permissions :**
- Toutes les permissions utilisateur
- Voir tous les signalements
- Modifier le statut des signalements
- Assigner des équipes de nettoyage
- Accéder au tableau de bord statistique
- Gérer les utilisateurs

**Cas d'usage typique :**
> Jean, administrateur municipal, se connecte au dashboard. Il voit 5 nouveaux signalements. Il assigne chaque signalement à une équipe, change le statut en "Assigné", et suit la progression sur le tableau de bord.

### 3.3 Super Administrateur (optionnel)

**Permissions :**
- Toutes les permissions administrateur
- Gérer les comptes administrateurs
- Configurer les paramètres système
- Exporter les données

---

## 4. Architecture technique

### 4.1 Stack technologique requis

```
┌─────────────────────────────────────────────────────┐
│                  FRONTEND                           │
├─────────────────────────────────────────────────────┤
│ Web App        │ ReactJS / NextJS                   │
│ Mobile App     │ Flutter                            │
└─────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────┐
│                  BACKEND                            │
├─────────────────────────────────────────────────────┤
│ Framework      │ NodeJS (Express ou NestJS)         │
│ API            │ RESTful                            │
│ Auth           │ JWT ou Firebase Auth               │
└─────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────┐
│                  DATABASE                           │
├─────────────────────────────────────────────────────┤
│ Options        │ MongoDB / Firebase / Supabase      │
└─────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────┐
│                  SERVICES                           │
├─────────────────────────────────────────────────────┤
│ Storage        │ Cloudinary / AWS S3 / Firebase     │
│ Maps           │ Google Maps API / Mapbox           │
│ Email          │ SendGrid / Nodemailer              │
└─────────────────────────────────────────────────────┘
```

### 4.2 Recommandation de stack

Pour ce projet, je recommande :

**Backend :**
- **NestJS** : Framework structuré, excellent pour API RESTful, TypeScript natif
- **MongoDB** : Flexibilité pour les données géospatiales, facile à scaler
- **JWT** : Authentification stateless, parfait pour mobile + web

**Frontend Web :**
- **NextJS** : SEO-friendly, Server-Side Rendering, excellent écosystème

**Mobile :**
- **Flutter** : Interface native, un seul codebase pour iOS et Android

**Services externes :**
- **Cloudinary** : Gestion d'images optimisée
- **Google Maps API** : Cartes et géolocalisation
- **Vercel/Netlify** : Déploiement frontend
- **Railway/Render** : Déploiement backend

### 4.3 Architecture globale

```
┌──────────────┐         ┌──────────────┐
│   Web App    │         │  Mobile App  │
│   (NextJS)   │         │  (Flutter)   │
└──────┬───────┘         └──────┬───────┘
       │                        │
       └────────┬───────────────┘
                │
                │ HTTPS/REST
                │
        ┌───────▼────────┐
        │   API Gateway  │
        │   (NestJS)     │
        └───────┬────────┘
                │
        ┌───────┴────────┐
        │                │
    ┌───▼───┐      ┌────▼─────┐
    │MongoDB│      │Cloudinary│
    │       │      │(Images)  │
    └───────┘      └──────────┘
```

---

## 5. Modèle de données

### 5.1 Collection : Users

```javascript
{
  _id: ObjectId,
  email: String, // unique, required
  password: String, // hashed, required
  firstName: String,
  lastName: String,
  phone: String,
  role: String, // "user" | "admin" | "superadmin"
  avatar: String, // URL
  isActive: Boolean,
  createdAt: Date,
  updatedAt: Date,
  lastLogin: Date
}
```

**Indexes :**
- `email` (unique)
- `role`

### 5.2 Collection : Reports

```javascript
{
  _id: ObjectId,
  userId: ObjectId, // ref: Users
  title: String,
  description: String,
  category: String, // "plastic", "organic", "metal", "glass", "other"
  images: [String], // URLs
  location: {
    type: "Point",
    coordinates: [Number, Number] // [longitude, latitude]
  },
  address: String, // Adresse textuelle
  status: String, // "pending", "assigned", "in_progress", "completed", "rejected"
  priority: String, // "low", "medium", "high"
  assignedTo: ObjectId, // ref: Users (admin qui gère)
  assignedTeam: String, // Nom de l'équipe
  assignedDate: Date,
  completedDate: Date,
  rejectionReason: String,
  likes: Number, // Nombre de citoyens qui soutiennent le signalement
  views: Number,
  createdAt: Date,
  updatedAt: Date
}
```

**Indexes :**
- `location` (2dsphere pour requêtes géospatiales)
- `userId`
- `status`
- `createdAt`

### 5.3 Collection : Comments (optionnel)

```javascript
{
  _id: ObjectId,
  reportId: ObjectId, // ref: Reports
  userId: ObjectId, // ref: Users
  content: String,
  createdAt: Date
}
```

### 5.4 Collection : Statistics (cache)

```javascript
{
  _id: ObjectId,
  date: Date, // Date du snapshot
  totalReports: Number,
  pendingReports: Number,
  assignedReports: Number,
  inProgressReports: Number,
  completedReports: Number,
  rejectedReports: Number,
  averageResolutionTime: Number, // en heures
  topCategories: [{
    category: String,
    count: Number
  }],
  topLocations: [{
    area: String,
    count: Number
  }]
}
```

---

## 6. API RESTful

### 6.1 Authentification

#### POST /api/auth/register
Inscription d'un nouvel utilisateur

**Body :**
```json
{
  "email": "user@example.com",
  "password": "SecurePass123!",
  "firstName": "John",
  "lastName": "Doe",
  "phone": "+1234567890"
}
```

**Response (201) :**
```json
{
  "success": true,
  "data": {
    "user": {
      "_id": "...",
      "email": "user@example.com",
      "firstName": "John",
      "lastName": "Doe",
      "role": "user"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

#### POST /api/auth/login
Connexion utilisateur

**Body :**
```json
{
  "email": "user@example.com",
  "password": "SecurePass123!"
}
```

**Response (200) :**
```json
{
  "success": true,
  "data": {
    "user": { ... },
    "token": "..."
  }
}
```

#### GET /api/auth/me
Récupérer le profil de l'utilisateur connecté

**Headers :** `Authorization: Bearer <token>`

**Response (200) :**
```json
{
  "success": true,
  "data": {
    "user": { ... }
  }
}
```

### 6.2 Signalements (Reports)

#### POST /api/reports
Créer un nouveau signalement

**Headers :** `Authorization: Bearer <token>`

**Body (multipart/form-data) :**
```json
{
  "title": "Déchets dans le parc central",
  "description": "Bouteilles en plastique et emballages",
  "category": "plastic",
  "latitude": 48.8566,
  "longitude": 2.3522,
  "address": "Parc Central, Paris",
  "images": [File, File] // Fichiers images
}
```

**Response (201) :**
```json
{
  "success": true,
  "data": {
    "report": {
      "_id": "...",
      "title": "Déchets dans le parc central",
      "status": "pending",
      "location": {
        "type": "Point",
        "coordinates": [2.3522, 48.8566]
      },
      ...
    }
  }
}
```

#### GET /api/reports
Récupérer tous les signalements (avec filtres)

**Query params :**
- `status` : pending, assigned, in_progress, completed
- `category` : plastic, organic, metal, glass, other
- `userId` : ID de l'utilisateur
- `lat`, `lng`, `radius` : Recherche géospatiale
- `page`, `limit` : Pagination
- `sort` : createdAt, priority, likes

**Response (200) :**
```json
{
  "success": true,
  "data": {
    "reports": [...],
    "pagination": {
      "total": 150,
      "page": 1,
      "limit": 20,
      "pages": 8
    }
  }
}
```

#### GET /api/reports/:id
Récupérer un signalement spécifique

**Response (200) :**
```json
{
  "success": true,
  "data": {
    "report": { ... }
  }
}
```

#### PATCH /api/reports/:id
Mettre à jour un signalement (Admin uniquement)

**Headers :** `Authorization: Bearer <token>`

**Body :**
```json
{
  "status": "assigned",
  "assignedTeam": "Équipe Nord",
  "priority": "high"
}
```

**Response (200) :**
```json
{
  "success": true,
  "data": {
    "report": { ... }
  }
}
```

#### DELETE /api/reports/:id
Supprimer un signalement (Admin ou créateur)

**Response (200) :**
```json
{
  "success": true,
  "message": "Report deleted successfully"
}
```

#### GET /api/reports/nearby
Signalements à proximité

**Query params :**
- `lat` : latitude
- `lng` : longitude
- `radius` : rayon en km (défaut: 5)

**Response (200) :**
```json
{
  "success": true,
  "data": {
    "reports": [...],
    "count": 12
  }
}
```

### 6.3 Statistiques (Admin uniquement)

#### GET /api/statistics/dashboard
Tableau de bord statistique

**Headers :** `Authorization: Bearer <token>`

**Response (200) :**
```json
{
  "success": true,
  "data": {
    "overview": {
      "totalReports": 1250,
      "pendingReports": 45,
      "assignedReports": 30,
      "inProgressReports": 25,
      "completedReports": 1100,
      "rejectedReports": 50
    },
    "trends": {
      "thisMonth": 120,
      "lastMonth": 95,
      "percentageChange": 26.3
    },
    "averageResolutionTime": 48.5,
    "topCategories": [
      { "category": "plastic", "count": 450 },
      { "category": "organic", "count": 320 }
    ],
    "topLocations": [
      { "area": "Centre-Ville", "count": 230 },
      { "area": "Quartier Nord", "count": 180 }
    ],
    "recentActivity": [...]
  }
}
```

#### GET /api/statistics/charts
Données pour graphiques

**Query params :**
- `period` : week, month, year
- `type` : status, category, location

**Response (200) :**
```json
{
  "success": true,
  "data": {
    "labels": ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"],
    "datasets": [
      {
        "label": "Nouveaux signalements",
        "data": [12, 19, 15, 22, 18, 25, 20]
      }
    ]
  }
}
```

### 6.4 Utilisateurs (Admin uniquement)

#### GET /api/users
Liste de tous les utilisateurs

**Response (200) :**
```json
{
  "success": true,
  "data": {
    "users": [...],
    "pagination": { ... }
  }
}
```

#### PATCH /api/users/:id/role
Modifier le rôle d'un utilisateur

**Body :**
```json
{
  "role": "admin"
}
```

---

## 7. Interfaces utilisateur

### 7.1 Application Web (NextJS)

#### Pages principales

1. **Page d'accueil (`/`)**
   - Carte interactive des signalements
   - Statistiques en temps réel
   - Appel à l'action : "Signaler un déchet"

2. **Connexion/Inscription (`/auth/login`, `/auth/register`)**
   - Formulaires d'authentification
   - Validation côté client
   - Redirection après connexion

3. **Dashboard Utilisateur (`/dashboard`)**
   - Liste des signalements de l'utilisateur
   - Filtres et recherche
   - Carte des signalements

4. **Créer un signalement (`/reports/new`)**
   - Formulaire avec upload d'images
   - Sélection de localisation sur carte
   - Catégorisation

5. **Détails d'un signalement (`/reports/:id`)**
   - Toutes les informations
   - Photos en galerie
   - Carte de localisation
   - Historique des statuts

6. **Dashboard Admin (`/admin/dashboard`)**
   - Statistiques visuelles
   - Graphiques (Chart.js ou Recharts)
   - Métriques clés
   - Actions rapides

7. **Gestion des signalements (`/admin/reports`)**
   - Tableau avec tous les signalements
   - Filtres avancés
   - Actions en masse
   - Modal de mise à jour

8. **Gestion des utilisateurs (`/admin/users`)**
   - Liste des utilisateurs
   - Modification des rôles
   - Statistiques par utilisateur

#### Composants réutilisables

- `<Navbar>` : Navigation avec menu utilisateur
- `<Map>` : Carte interactive (Google Maps/Mapbox)
- `<ReportCard>` : Carte de signalement
- `<StatsWidget>` : Widget de statistique
- `<ImageUploader>` : Upload d'images
- `<StatusBadge>` : Badge de statut coloré
- `<Chart>` : Graphiques réutilisables

### 7.2 Application Mobile (Flutter)

#### Écrans principaux

1. **Splash Screen**
   - Logo et chargement initial

2. **Authentification**
   - Login / Register
   - Récupération de mot de passe

3. **Écran principal**
   - Bottom navigation : Accueil, Carte, Mes signalements, Profil
   - FAB (Floating Action Button) : Nouveau signalement

4. **Carte interactive**
   - Marqueurs des signalements
   - Filtres
   - Clustering pour performance

5. **Nouveau signalement**
   - Caméra pour prendre photo
   - Galerie pour sélectionner photo
   - Géolocalisation automatique
   - Formulaire de détails

6. **Mes signalements**
   - Liste avec images
   - Statuts visuels
   - Swipe pour actions

7. **Détails signalement**
   - Toutes les infos
   - Carte de localisation
   - Timeline du statut

8. **Profil**
   - Informations utilisateur
   - Statistiques personnelles
   - Paramètres

#### Packages Flutter recommandés

```yaml
dependencies:
  flutter:
    sdk: flutter
  
  # État et navigation
  provider: ^6.0.0
  go_router: ^10.0.0
  
  # HTTP et API
  dio: ^5.0.0
  
  # Authentification
  flutter_secure_storage: ^8.0.0
  
  # Cartes
  google_maps_flutter: ^2.5.0
  geolocator: ^10.0.0
  geocoding: ^2.1.0
  
  # Images
  image_picker: ^1.0.0
  cached_network_image: ^3.3.0
  
  # UI
  flutter_svg: ^2.0.0
  shimmer: ^3.0.0
  
  # Utilitaires
  intl: ^0.18.0
  timeago: ^3.5.0
```

---

## 8. Plan d'implémentation étape par étape

### Phase 1 : Configuration initiale (1-2 jours)

#### Étape 1.1 : Initialiser le backend

```bash
# Créer le projet NestJS
npm i -g @nestjs/cli
nest new waste-reporting-backend
cd waste-reporting-backend

# Installer les dépendances
npm install @nestjs/mongoose mongoose
npm install @nestjs/jwt @nestjs/passport passport passport-jwt
npm install bcrypt
npm install @nestjs/config
npm install class-validator class-transformer
npm install cloudinary multer-storage-cloudinary multer
```

**Configuration à créer :**
- `.env` : Variables d'environnement
- `src/config/` : Configuration MongoDB, JWT, Cloudinary
- `src/main.ts` : Configuration CORS, validation globale

#### Étape 1.2 : Initialiser le frontend web

```bash
# Créer le projet NextJS
npx create-next-app@latest waste-reporting-web
cd waste-reporting-web

# Installer les dépendances
npm install axios
npm install react-hook-form
npm install @react-google-maps/api
npm install chart.js react-chartjs-2
npm install tailwindcss
```

#### Étape 1.3 : Initialiser l'application mobile

```bash
# Créer le projet Flutter
flutter create waste_reporting_mobile
cd waste_reporting_mobile

# Ajouter les dépendances dans pubspec.yaml
```

#### Étape 1.4 : Configuration de la base de données

- Créer un cluster MongoDB Atlas (gratuit)
- Configurer les indexes
- Créer un utilisateur admin par défaut

### Phase 2 : Backend - Authentification (2-3 jours)

#### Étape 2.1 : Module Auth

```bash
nest g module auth
nest g service auth
nest g controller auth
```

**Fichiers à créer :**

1. `src/schemas/user.schema.ts` : Schéma utilisateur
2. `src/dto/auth.dto.ts` : DTOs pour register/login
3. `src/auth/auth.service.ts` : Logique d'authentification
4. `src/auth/jwt.strategy.ts` : Stratégie JWT
5. `src/guards/roles.guard.ts` : Guard pour les rôles

**Fonctionnalités à implémenter :**
- ✅ Inscription utilisateur avec hash du mot de passe
- ✅ Connexion avec génération JWT
- ✅ Validation des emails
- ✅ Middleware JWT pour routes protégées
- ✅ Guard pour vérifier les rôles

#### Étape 2.2 : Tests

```bash
npm test auth.service.spec.ts
```

### Phase 3 : Backend - Module Reports (3-4 jours)

#### Étape 3.1 : Structure du module

```bash
nest g module reports
nest g service reports
nest g controller reports
```

**Fichiers à créer :**

1. `src/schemas/report.schema.ts` : Schéma signalement
2. `src/dto/create-report.dto.ts` : DTO création
3. `src/dto/update-report.dto.ts` : DTO mise à jour
4. `src/reports/reports.service.ts` : Logique métier

**Fonctionnalités à implémenter :**
- ✅ Créer un signalement avec upload d'images
- ✅ Récupérer tous les signalements (avec pagination)
- ✅ Filtrer par statut, catégorie, utilisateur
- ✅ Recherche géospatiale (signalements à proximité)
- ✅ Mettre à jour le statut (admin uniquement)
- ✅ Supprimer un signalement

#### Étape 3.2 : Upload d'images avec Cloudinary

```typescript
// src/config/cloudinary.config.ts
import { v2 as cloudinary } from 'cloudinary';

export const CloudinaryProvider = {
  provide: 'CLOUDINARY',
  useFactory: () => {
    return cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });
  },
};
```

#### Étape 3.3 : Requêtes géospatiales

```typescript
// Exemple de recherche à proximité
async findNearby(lat: number, lng: number, radius: number) {
  return this.reportModel.find({
    location: {
      $near: {
        $geometry: {
          type: 'Point',
          coordinates: [lng, lat]
        },
        $maxDistance: radius * 1000 // km en mètres
      }
    }
  });
}
```

### Phase 4 : Backend - Module Statistics (2 jours)

#### Étape 4.1 : Service de statistiques

```bash
nest g module statistics
nest g service statistics
nest g controller statistics
```

**Fonctionnalités à implémenter :**
- ✅ Compter les signalements par statut
- ✅ Calculer le temps moyen de résolution
- ✅ Top catégories de déchets
- ✅ Top localisations
- ✅ Tendances temporelles
- ✅ Données pour graphiques

#### Étape 4.2 : Agrégation MongoDB

```typescript
// Exemple d'agrégation
async getDashboardStats() {
  const stats = await this.reportModel.aggregate([
    {
      $group: {
        _id: '$status',
        count: { $sum: 1 }
      }
    }
  ]);
  
  return stats;
}
```

### Phase 5 : Frontend Web - Authentification (2 jours)

#### Étape 5.1 : Configuration Axios

```typescript
// lib/axios.ts
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axiosInstance;
```

#### Étape 5.2 : Pages d'authentification

**Fichiers à créer :**
- `app/auth/login/page.tsx` : Page de connexion
- `app/auth/register/page.tsx` : Page d'inscription
- `components/AuthForm.tsx` : Formulaire réutilisable
- `hooks/useAuth.tsx` : Hook personnalisé pour l'authentification
- `context/AuthContext.tsx` : Contexte global d'authentification

**Fonctionnalités :**
- ✅ Formulaires avec validation
- ✅ Gestion des erreurs
- ✅ Redirection après login
- ✅ Protection des routes
- ✅ Persistance du token

### Phase 6 : Frontend Web - Signalements (3-4 jours)

#### Étape 6.1 : Liste des signalements

**Fichiers à créer :**
- `app/reports/page.tsx` : Liste des signalements
- `components/ReportCard.tsx` : Carte de signalement
- `components/ReportFilters.tsx` : Filtres
- `hooks/useReports.tsx` : Hook pour gérer les signalements

**Fonctionnalités :**
- ✅ Affichage en grille/liste
- ✅ Pagination
- ✅ Filtres (statut, catégorie)
- ✅ Recherche
- ✅ Tri

#### Étape 6.2 : Création de signalement

**Fichiers à créer :**
- `app/reports/new/page.tsx` : Formulaire de création
- `components/ImageUpload.tsx` : Upload d'images
- `components/MapPicker.tsx` : Sélection de localisation

**Fonctionnalités :**
- ✅ Upload de photos (glisser-déposer)
- ✅ Carte interactive pour sélectionner la localisation
- ✅ Géolocalisation automatique
- ✅ Validation du formulaire
- ✅ Prévisualisation avant envoi

#### Étape 6.3 : Détails d'un signalement

**Fichiers à créer :**
- `app/reports/[id]/page.tsx` : Page de détails
- `components/ImageGallery.tsx` : Galerie d'images
- `components/ReportMap.tsx` : Carte avec marqueur

### Phase 7 : Frontend Web - Dashboard Admin (3 jours)

#### Étape 7.1 : Vue d'ensemble

**Fichiers à créer :**
- `app/admin/dashboard/page.tsx` : Dashboard principal
- `components/admin/StatsCard.tsx` : Carte de statistique
- `components/admin/Chart.tsx` : Graphique réutilisable

**Widgets à créer :**
- ✅ Nombre total de signalements
- ✅ Signalements par statut
- ✅ Tendances (ce mois vs mois dernier)
- ✅ Temps moyen de résolution
- ✅ Graphique des signalements dans le temps
- ✅ Top catégories (graphique en barres)
- ✅ Carte de chaleur des zones

#### Étape 7.2 : Gestion des signalements

**Fichiers à créer :**
- `app/admin/reports/page.tsx` : Tableau de gestion
- `components/admin/ReportsTable.tsx` : Tableau
- `components/admin/UpdateStatusModal.tsx` : Modal de mise à jour

**Fonctionnalités :**
- ✅ Tableau avec tri et filtres
- ✅ Actions en ligne (changer statut)
- ✅ Sélection multiple
- ✅ Export CSV
- ✅ Assignation d'équipes

#### Étape 7.3 : Gestion des utilisateurs

**Fichiers à créer :**
- `app/admin/users/page.tsx` : Liste des utilisateurs
- `components/admin/UsersTable.tsx` : Tableau

### Phase 8 : Application Mobile Flutter (5-7 jours)

#### Étape 8.1 : Architecture et état

```dart
// lib/main.dart
void main() {
  runApp(
    MultiProvider(
      providers: [
        ChangeNotifierProvider(create: (_) => AuthProvider()),
        ChangeNotifierProvider(create: (_) => ReportProvider()),
      ],
      child: MyApp(),
    ),
  );
}
```

**Structure de dossiers :**
```
lib/
├── main.dart
├── models/
│   ├── user.dart
│   └── report.dart
├── providers/
│   ├── auth_provider.dart
│   └── report_provider.dart
├── services/
│   ├── api_service.dart
│   └── location_service.dart
├── screens/
│   ├── auth/
│   ├── home/
│   ├── reports/
│   └── profile/
├── widgets/
│   └── ...
└── utils/
    └── constants.dart
```

#### Étape 8.2 : Service API

```dart
// lib/services/api_service.dart
class ApiService {
  final Dio _dio = Dio(
    BaseOptions(
      baseUrl: 'https://your-api.com',
      connectTimeout: Duration(seconds: 5),
      receiveTimeout: Duration(seconds: 3),
    ),
  );

  Future<Response> login(String email, String password) async {
    return await _dio.post('/auth/login', data: {
      'email': email,
      'password': password,
    });
  }

  Future<Response> createReport(FormData data) async {
    return await _dio.post('/reports', data: data);
  }
}
```

#### Étape 8.3 : Écrans principaux

**Ordre d'implémentation :**

1. **Authentification** (1 jour)
   - Login screen
   - Register screen
   - Password reset

2. **Navigation principale** (0.5 jour)
   - Bottom navigation bar
   - App bar personnalisée

3. **Accueil et carte** (1.5 jours)
   - Carte avec marqueurs
   - Liste de signalements
   - Filtres

4. **Créer signalement** (2 jours)
   - Caméra et galerie
   - Formulaire
   - Upload avec progression
   - Géolocalisation

5. **Mes signalements** (1 jour)
   - Liste avec statuts
   - Détails
   - Suppression

6. **Profil** (0.5 jour)
   - Informations utilisateur
   - Statistiques
   - Déconnexion

#### Étape 8.4 : Géolocalisation

```dart
// lib/services/location_service.dart
class LocationService {
  Future<Position> getCurrentLocation() async {
    bool serviceEnabled = await Geolocator.isLocationServiceEnabled();
    if (!serviceEnabled) {
      throw Exception('Location services are disabled.');
    }

    LocationPermission permission = await Geolocator.checkPermission();
    if (permission == LocationPermission.denied) {
      permission = await Geolocator.requestPermission();
    }

    return await Geolocator.getCurrentPosition(
      desiredAccuracy: LocationAccuracy.high,
    );
  }

  Future<String> getAddressFromCoordinates(double lat, double lng) async {
    List<Placemark> placemarks = await placemarkFromCoordinates(lat, lng);
    Placemark place = placemarks[0];
    return '${place.street}, ${place.locality}, ${place.country}';
  }
}
```

### Phase 9 : Tests et validation (2-3 jours)

#### Étape 9.1 : Tests backend

```bash
# Tests unitaires
npm test

# Tests e2e
npm run test:e2e

# Couverture
npm run test:cov
```

**Tests à écrire :**
- ✅ Auth service : register, login, JWT validation
- ✅ Reports service : CRUD operations
- ✅ Statistics service : aggregations
- ✅ Guards et middlewares

#### Étape 9.2 : Tests frontend

```bash
npm run test
```

**Tests à écrire :**
- ✅ Composants React (Jest + React Testing Library)
- ✅ Hooks personnalisés
- ✅ Validation de formulaires
- ✅ Intégration API

#### Étape 9.3 : Tests manuels

**Checklist de validation :**

- [ ] Inscription d'un nouvel utilisateur
- [ ] Connexion et récupération du token
- [ ] Créer un signalement avec photo
- [ ] Voir la liste des signalements
- [ ] Filtrer par statut
- [ ] Admin : changer le statut d'un signalement
- [ ] Admin : voir les statistiques
- [ ] Recherche géospatiale fonctionne
- [ ] Upload d'images fonctionne
- [ ] Responsive design (mobile, tablette, desktop)
- [ ] Performance (chargement rapide)

### Phase 10 : Déploiement (2 jours)

#### Étape 10.1 : Backend (Railway / Render)

**Railway :**
```bash
# Installer Railway CLI
npm i -g @railway/cli

# Login
railway login

# Initialiser
railway init

# Déployer
railway up
```

**Variables d'environnement à configurer :**
```
MONGODB_URI=mongodb+srv://...
JWT_SECRET=your-secret-key
CLOUDINARY_CLOUD_NAME=...
CLOUDINARY_API_KEY=...
CLOUDINARY_API_SECRET=...
PORT=3000
```

#### Étape 10.2 : Frontend Web (Vercel)

```bash
# Installer Vercel CLI
npm i -g vercel

# Déployer
vercel

# Production
vercel --prod
```

**Variables d'environnement :**
```
NEXT_PUBLIC_API_URL=https://your-backend.railway.app/api
NEXT_PUBLIC_GOOGLE_MAPS_KEY=...
```

#### Étape 10.3 : Application Mobile

**Android :**
```bash
# Build APK
flutter build apk --release

# Build App Bundle (pour Play Store)
flutter build appbundle --release
```

**iOS :**
```bash
# Build
flutter build ios --release

# Archive dans Xcode
# Puis upload sur App Store Connect
```

#### Étape 10.4 : Documentation API

- Utiliser Swagger/OpenAPI
- Générer la documentation automatiquement
- Héberger sur `/api/docs`

---

## 9. Sécurité et bonnes pratiques

### 9.1 Authentification et autorisation

✅ **Implémenté :**
- Hash des mots de passe avec bcrypt (salt rounds ≥ 10)
- JWT avec expiration (24h recommandé)
- Refresh tokens pour sessions longues
- Validation des tokens à chaque requête
- Guards pour protéger les routes admin

✅ **À ajouter :**
- Rate limiting (express-rate-limit)
- Protection CSRF
- Validation email après inscription
- Réinitialisation de mot de passe sécurisée
- Two-factor authentication (optionnel)

### 9.2 Validation des données

```typescript
// Exemple de DTO avec validation
import { IsEmail, IsString, MinLength, IsEnum } from 'class-validator';

export class CreateReportDto {
  @IsString()
  @MinLength(5)
  title: string;

  @IsString()
  description: string;

  @IsEnum(['plastic', 'organic', 'metal', 'glass', 'other'])
  category: string;

  @IsNumber()
  @Min(-90)
  @Max(90)
  latitude: number;

  @IsNumber()
  @Min(-180)
  @Max(180)
  longitude: number;
}
```

### 9.3 Sécurité des uploads

- Limiter la taille des fichiers (5MB max)
- Valider les types MIME (images uniquement)
- Scanner les fichiers pour virus (ClamAV)
- Générer des noms de fichiers aléatoires
- Utiliser un CDN avec transformation d'images

### 9.4 Protection contre les injections

- Utiliser Mongoose pour éviter les injections NoSQL
- Sanitiser toutes les entrées utilisateur
- Utiliser des requêtes paramétrées
- Valider les ObjectIds MongoDB

### 9.5 HTTPS et CORS

```typescript
// main.ts
app.enableCors({
  origin: [
    'https://your-frontend.vercel.app',
    'http://localhost:3000' // Dev only
  ],
  credentials: true,
});
```

### 9.6 Gestion des erreurs

```typescript
// Exception filter global
@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    const status = exception instanceof HttpException
      ? exception.getStatus()
      : 500;

    response.status(status).json({
      success: false,
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      message: exception.message || 'Internal server error',
    });
  }
}
```

### 9.7 Logging

- Utiliser Winston ou Pino
- Logger toutes les requêtes API
- Logger les erreurs avec stack trace
- Ne jamais logger les mots de passe ou tokens

### 9.8 Variables d'environnement

```typescript
// .env.example
# Database
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/database

# JWT
JWT_SECRET=your-super-secret-key-change-this
JWT_EXPIRES_IN=24h

# Cloudinary
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret

# Google Maps
GOOGLE_MAPS_API_KEY=your-google-maps-key

# Email (optionnel)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-app-password
```

---

## 10. Déploiement

### 10.1 Checklist pré-déploiement

**Backend :**
- [ ] Toutes les variables d'environnement configurées
- [ ] Tests passent (npm test)
- [ ] Build de production fonctionne (npm run build)
- [ ] Logs configurés
- [ ] Rate limiting activé
- [ ] CORS configuré pour le domaine de production
- [ ] Healthcheck endpoint (`/health`)

**Frontend Web :**
- [ ] Variables d'environnement configurées
- [ ] Build de production optimisé
- [ ] Images optimisées (next/image)
- [ ] SEO meta tags
- [ ] Analytics configuré (optionnel)

**Mobile :**
- [ ] Icons et splash screens
- [ ] Permissions configurées (AndroidManifest.xml, Info.plist)
- [ ] Build signé pour release
- [ ] Testé sur plusieurs appareils

### 10.2 Architecture de déploiement recommandée

```
┌─────────────────────────────────────────────┐
│         Users (Web + Mobile)                │
└──────────────┬──────────────────────────────┘
               │
    ┌──────────┴───────────┐
    │                      │
┌───▼────────┐      ┌──────▼─────┐
│   Vercel   │      │   Flutter  │
│  (NextJS)  │      │   (App)    │
└───┬────────┘      └──────┬─────┘
    │                      │
    │        HTTPS         │
    │                      │
    └──────────┬───────────┘
               │
        ┌──────▼───────┐
        │   Railway    │
        │  (NestJS)    │
        └──────┬───────┘
               │
    ┌──────────┼──────────┐
    │          │          │
┌───▼──┐  ┌───▼────┐  ┌──▼─────┐
│Mongo │  │Cloudi- │  │Google  │
│ DB   │  │nary    │  │Maps API│
└──────┘  └────────┘  └────────┘
```

### 10.3 Monitoring et maintenance

**Outils recommandés :**
- **Sentry** : Tracking des erreurs
- **LogRocket** : Session replay (web)
- **Firebase Analytics** : Analytics mobile
- **UptimeRobot** : Monitoring de disponibilité
- **Datadog** : APM et logs (si budget)

**Métriques à surveiller :**
- Temps de réponse API
- Taux d'erreur
- Nombre d'utilisateurs actifs
- Utilisation de la base de données
- Stockage d'images

---

## 11. Tests et validation

### 11.1 Tests unitaires Backend

```typescript
// reports.service.spec.ts
describe('ReportsService', () => {
  let service: ReportsService;
  let model: Model<Report>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ReportsService,
        {
          provide: getModelToken(Report.name),
          useValue: mockReportModel,
        },
      ],
    }).compile();

    service = module.get<ReportsService>(ReportsService);
    model = module.get<Model<Report>>(getModelToken(Report.name));
  });

  it('should create a report', async () => {
    const dto: CreateReportDto = {
      title: 'Test Report',
      description: 'Test description',
      category: 'plastic',
      latitude: 48.8566,
      longitude: 2.3522,
    };

    jest.spyOn(model, 'create').mockResolvedValueOnce(mockReport as any);

    const result = await service.create(dto, 'userId');
    expect(result).toEqual(mockReport);
  });
});
```

### 11.2 Tests d'intégration Frontend

```typescript
// ReportCard.test.tsx
import { render, screen } from '@testing-library/react';
import ReportCard from './ReportCard';

describe('ReportCard', () => {
  const mockReport = {
    _id: '1',
    title: 'Test Report',
    description: 'Test description',
    status: 'pending',
    category: 'plastic',
    createdAt: new Date(),
  };

  it('renders report information', () => {
    render(<ReportCard report={mockReport} />);
    
    expect(screen.getByText('Test Report')).toBeInTheDocument();
    expect(screen.getByText('Test description')).toBeInTheDocument();
    expect(screen.getByText('En attente')).toBeInTheDocument();
  });
});
```

### 11.3 Tests E2E

```typescript
// reports.e2e-spec.ts
describe('Reports (e2e)', () => {
  let app: INestApplication;
  let authToken: string;

  beforeAll(async () => {
    // Setup app and authenticate
  });

  it('/reports (POST) - should create a report', () => {
    return request(app.getHttpServer())
      .post('/reports')
      .set('Authorization', `Bearer ${authToken}`)
      .send({
        title: 'E2E Test Report',
        description: 'Test',
        category: 'plastic',
        latitude: 48.8566,
        longitude: 2.3522,
      })
      .expect(201)
      .expect((res) => {
        expect(res.body.data.report).toHaveProperty('_id');
        expect(res.body.data.report.status).toBe('pending');
      });
  });
});
```

---

## 12. Améliorations futures

### 12.1 Phase 2 (Fonctionnalités avancées)

1. **Notifications push**
   - Notification quand le statut change
   - Notifications pour nouveaux signalements (admin)
   - Firebase Cloud Messaging (FCM)

2. **Système de gamification**
   - Points pour chaque signalement
   - Badges (Eco-Warrior, Clean Hero, etc.)
   - Leaderboard mensuel

3. **Chat et commentaires**
   - Commentaires sur les signalements
   - Chat entre admin et utilisateur

4. **Rapports avancés**
   - Export PDF des statistiques
   - Rapports mensuels automatiques
   - Visualisations avancées (heatmaps)

5. **Intelligence artificielle**
   - Classification automatique du type de déchet
   - Estimation de la quantité
   - Détection de doublons

### 12.2 Phase 3 (Scaling)

1. **Microservices**
   - Séparer en services indépendants
   - File d'attente pour traitement d'images (Redis, Bull)

2. **Multilinguisme**
   - Support de plusieurs langues
   - i18n pour web et mobile

3. **API publique**
   - Permettre aux développeurs tiers d'intégrer
   - Rate limiting par clé API
   - Documentation Swagger complète

4. **Mode hors ligne**
   - Créer des signalements sans connexion
   - Synchronisation automatique

---

## 13. Ressources et documentation

### 13.1 Documentation officielle

**Backend :**
- NestJS : https://docs.nestjs.com
- MongoDB : https://docs.mongodb.com
- Mongoose : https://mongoosejs.com/docs

**Frontend :**
- NextJS : https://nextjs.org/docs
- React : https://react.dev
- Tailwind CSS : https://tailwindcss.com/docs

**Mobile :**
- Flutter : https://docs.flutter.dev
- Provider : https://pub.dev/packages/provider
- Google Maps Flutter : https://pub.dev/packages/google_maps_flutter

**Services :**
- Cloudinary : https://cloudinary.com/documentation
- Google Maps API : https://developers.google.com/maps/documentation

### 13.2 Tutoriels recommandés

1. **NestJS Authentication JWT**
   - https://docs.nestjs.com/security/authentication

2. **NextJS App Router**
   - https://nextjs.org/docs/app

3. **Flutter State Management**
   - https://docs.flutter.dev/data-and-backend/state-mgmt

4. **MongoDB Geospatial Queries**
   - https://docs.mongodb.com/manual/geospatial-queries

### 13.3 Communautés et support

- Discord NestJS : https://discord.gg/nestjs
- Reddit Flutter : r/FlutterDev
- Stack Overflow
- GitHub Discussions

---

## 14. Conclusion

### Estimation du temps total

- **Backend** : 7-10 jours
- **Frontend Web** : 8-12 jours
- **Mobile** : 5-7 jours
- **Tests et debugging** : 2-3 jours
- **Déploiement** : 2 jours

**Total** : **24-34 jours** (1-1.5 mois pour un développeur fullstack)

### Compétences requises

- ✅ JavaScript/TypeScript avancé
- ✅ NodeJS et NestJS
- ✅ React et NextJS
- ✅ Dart et Flutter
- ✅ MongoDB et NoSQL
- ✅ API RESTful
- ✅ Authentification JWT
- ✅ Git et GitHub
- ✅ Déploiement cloud

### Checklist finale

- [ ] Backend API complet et testé
- [ ] Frontend web responsive et optimisé
- [ ] Application mobile iOS et Android
- [ ] Authentification sécurisée
- [ ] Upload d'images fonctionnel
- [ ] Géolocalisation précise
- [ ] Dashboard admin avec statistiques
- [ ] Tests unitaires et E2E
- [ ] Documentation API
- [ ] Application déployée en production
- [ ] Monitoring configuré

---

**Bon courage pour votre développement ! 🚀**

Cette documentation doit vous servir de guide complet tout au long du développement. N'hésitez pas à l'adapter selon vos besoins spécifiques et les retours utilisateurs.