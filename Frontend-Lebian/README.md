# 🌍 EcoSignal - Système de Signalement de Déchets

Application web de signalement citoyen de déchets abandonnés, permettant aux utilisateurs de signaler des déchets géolocalisés et aux administrateurs de gérer efficacement le nettoyage.

## ✨ Fonctionnalités

### Pour les Utilisateurs
- ✅ **Inscription et connexion** sécurisées
- ✅ **Créer des signalements** avec photos et géolocalisation
- ✅ **Tableau de bord personnel** avec statistiques
- ✅ **Suivi en temps réel** du statut des signalements
- ✅ **Filtrage et recherche** de signalements

### Pour les Administrateurs
- ✅ **Dashboard statistique** avec graphiques interactifs
- ✅ **Gestion complète** de tous les signalements
- ✅ **Assignation d'équipes** de nettoyage
- ✅ **Modification des statuts** et priorités
- ✅ **Gestion des utilisateurs** et des rôles

## 🚀 Démarrage Rapide

### Comptes de démonstration

**Utilisateur standard :**
- Email: `user@test.com`
- Mot de passe: `password`

**Administrateur :**
- Email: `admin@test.com`
- Mot de passe: `password`

## 📱 Pages Disponibles

### Pages Publiques
- `/` - Page d'accueil
- `/auth/login` - Connexion
- `/auth/register` - Inscription

### Pages Utilisateur (Authentification requise)
- `/dashboard` - Tableau de bord utilisateur
- `/reports/new` - Créer un nouveau signalement
- `/reports/:id` - Détails d'un signalement

### Pages Administrateur (Rôle admin requis)
- `/admin/dashboard` - Dashboard administrateur avec statistiques
- `/admin/reports` - Gestion de tous les signalements
- `/admin/users` - Gestion des utilisateurs

## 🛠️ Technologies Utilisées

- **React** - Bibliothèque UI
- **TypeScript** - Typage statique
- **React Router** - Navigation
- **Tailwind CSS** - Styling
- **Recharts** - Graphiques et visualisations
- **Radix UI** - Composants UI accessibles
- **Lucide React** - Icônes
- **date-fns** - Formatage de dates
- **Sonner** - Notifications toast

## 📊 Catégories de Déchets

- 🥤 **Plastique** - Bouteilles, emballages
- 🍎 **Organique** - Déchets alimentaires
- 🔩 **Métal** - Canettes, ferraille
- 🍷 **Verre** - Bouteilles, débris
- 📦 **Autre** - Déchets mixtes

## 🎨 Statuts de Signalement

- 🟡 **En attente** - Nouveau signalement
- 🔵 **Assigné** - Équipe désignée
- 🟣 **En cours** - Nettoyage en cours
- 🟢 **Terminé** - Nettoyage complété
- 🔴 **Rejeté** - Signalement rejeté

## 🔐 Sécurité

- Authentification basée sur JWT (simulée)
- Protection des routes par rôle
- Stockage sécurisé des tokens (localStorage)
- Validation des formulaires

## 📝 Notes Techniques

- **Frontend uniquement** - Utilise des données mockées
- **Pas de backend** - Les actions sont simulées
- **Stockage local** - Les données d'authentification persistent dans localStorage
- **Responsive** - Optimisé pour desktop, tablette et mobile

## ⚙️ Spécifications Backend (Pour Développement)

Cette section détaille les besoins techniques pour la réalisation du backend.

### 🗄️ Modèles de Données (Schemas)

#### User
```typescript
{
  _id: string; // ObjectId
  email: string;
  password?: string; // Haché (bcrypt)
  firstName: string;
  lastName: string;
  role: 'user' | 'admin' | 'team';
  phone?: string;
  isActive: boolean;
  teamId?: string; // Requis si role === 'team'
  createdAt: Date;
}
```

#### Report
```typescript
{
  _id: string;
  userId: string; // Créateur du signalement
  title: string;
  description: string;
  category: 'plastic' | 'organic' | 'metal' | 'glass' | 'other';
  otherCategoryDescription?: string;
  images: string[]; // URLs vers stockage cloud
  location: {
    type: 'Point';
    coordinates: [number, number]; // [long, lat]
  };
  address: string;
  status: 'pending' | 'assigned' | 'in_progress' | 'completed' | 'rejected';
  priority: 'none' | 'low' | 'medium' | 'high';
  assignedTeam?: string; // Nom de l'équipe
  rejectionReason?: string;
  likes: number;
  views: number;
  createdAt: Date;
  updatedAt: Date;
}
```

### 🛣️ Endpoints API Requis

#### Authentification (`/api/auth`)
- `POST /register`: Inscription (User par défaut)
- `POST /login`: Retourne un `token` JWT et l'objet `user`

#### Signalements (`/api/reports`)
- `GET /`: Liste tous les signalements (Filtrage par statut/catégorie)
- `GET /my-reports`: Signalements de l'utilisateur connecté
- `POST /`: Créer un signalement (Support Multi-part pour images)
- `GET /:id`: Détails d'un signalement
- `PATCH /:id`: Mise à jour (Statut, priorité, assignation - Admin/Team uniquement)
- `POST /:id/like`: Liker un signalement

#### Équipes & Admin (`/api/admin`)
- `GET /stats`: Statistiques globales
- `GET /teams`: Liste des équipes de nettoyage
- `GET /users`: Gestion des utilisateurs

### 🔐 Configuration

Le frontend utilise `localStorage` pour persister le `token` et l'objet `user`.

**Variables d'environnement (.env) :**
- `VITE_API_URL`: URL de votre API backend (ex: `http://localhost:5000/api`)

## 🛠️ Technologies Recommandées

- **Runtime**: Node.js (Express ou NestJS)
- **Base de données**: MongoDB (pour la flexibilité GeoJSON) ou PostgreSQL (PostGIS)
- **Authentification**: JWT
- **Stockage**: Cloudinary ou AWS S3 pour les images des signalements

## 🎯 Statut du Projet

- **Frontend**: ✅ Stable et prêt pour intégration
- **Backend**: ⏳ À développer selon les spécifications ci-dessus

## 📄 Licence

Ce projet est une démonstration frontend. Tous droits réservés.
