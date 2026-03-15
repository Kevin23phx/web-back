# 📖 Guide Utilisateur - EcoSignal

## 🎯 Bienvenue sur EcoSignal !

EcoSignal est une plateforme citoyenne de signalement de déchets qui permet aux utilisateurs de signaler des déchets abandonnés et aux administrateurs de gérer efficacement leur nettoyage.

## 🚀 Premiers Pas

### 1. Connexion / Inscription

#### Comptes de démonstration disponibles :

**👤 Compte Utilisateur :**
- Email : `user@test.com`
- Mot de passe : `password`
- Accès : Dashboard utilisateur, création de signalements

**👨‍💼 Compte Administrateur :**
- Email : `admin@test.com`  
- Mot de passe : `password`
- Accès : Toutes les fonctionnalités + Dashboard admin

#### Créer un nouveau compte :
1. Cliquez sur "Inscription" dans la barre de navigation
2. Remplissez le formulaire (prénom, nom, email, téléphone, mot de passe)
3. Validez pour créer votre compte
4. Vous serez automatiquement connecté

## 📱 Navigation

### Pour tous les utilisateurs :

**🏠 Page d'accueil (`/`)**
- Présentation de l'application
- Statistiques globales
- Fonctionnalités principales

### Pour les utilisateurs connectés :

**📊 Dashboard (`/dashboard`)**
- Vue d'ensemble de vos signalements
- Statistiques personnelles (Total, En attente, En cours, Terminés)
- Filtres par statut et catégorie
- Recherche de signalements

**➕ Nouveau Signalement (`/reports/new`)**
- Upload de photos (minimum 1)
- Description détaillée du déchet
- Sélection de la catégorie
- Géolocalisation automatique ou manuelle
- Ajout de l'adresse

**🔍 Détails d'un signalement (`/reports/:id`)**
- Galerie de photos
- Informations complètes
- Localisation sur carte
- Timeline de progression
- Statut et équipe assignée

### Pour les administrateurs :

**📈 Dashboard Admin (`/admin/dashboard`)**
- Statistiques globales
- Graphiques interactifs :
  - Tendance hebdomadaire
  - Répartition par statut
  - Catégories principales
  - Zones les plus signalées
- Métriques clés

**📋 Gestion des signalements (`/admin/reports`)**
- Tableau de tous les signalements
- Filtres avancés
- Modification du statut
- Assignation d'équipes
- Changement de priorité

**👥 Gestion des utilisateurs (`/admin/users`)**
- Liste complète des utilisateurs
- Modification des rôles (User/Admin)
- Activation/Désactivation de comptes
- Statistiques par utilisateur

## 🗂️ Catégories de Déchets

- 🥤 **Plastique** : Bouteilles, emballages, sacs
- 🍎 **Organique** : Déchets alimentaires, restes de fruits et légumes
- 🔩 **Métal** : Canettes, ferraille, objets métalliques
- 🍷 **Verre** : Bouteilles, débris de verre
- 📦 **Autre** : Déchets mixtes, cartons, papiers

## 📊 Statuts de Signalement

| Statut | Description | Couleur |
|--------|-------------|---------|
| 🟡 **En attente** | Nouveau signalement, en attente d'assignation | Jaune |
| 🔵 **Assigné** | Équipe de nettoyage assignée | Bleu |
| 🟣 **En cours** | Nettoyage en cours d'exécution | Violet |
| 🟢 **Terminé** | Nettoyage complété avec succès | Vert |
| 🔴 **Rejeté** | Signalement rejeté (avec raison) | Rouge |

## 🎨 Niveaux de Priorité

- **🔴 Haute** : Nécessite une intervention urgente (dangers, verre brisé)
- **🟠 Moyenne** : Intervention nécessaire dans un délai raisonnable
- **⚪ Faible** : Peut être traité selon disponibilité

## 💡 Conseils d'Utilisation

### Pour créer un bon signalement :

1. **Photo claire** : Prenez une photo nette qui montre bien le déchet
2. **Titre descriptif** : "Bouteilles plastiques près du parc" plutôt que "Déchets"
3. **Description détaillée** : Mentionnez la quantité, le type exact de déchet
4. **Localisation précise** : Utilisez la géolocalisation ou entrez l'adresse exacte
5. **Catégorie appropriée** : Sélectionnez la bonne catégorie pour faciliter le tri

### Bonnes pratiques :

- ✅ Vérifiez qu'un signalement similaire n'existe pas déjà
- ✅ Ajoutez plusieurs photos si nécessaire
- ✅ Soyez précis dans la description
- ✅ Suivez l'évolution de vos signalements
- ✅ Likez les signalements importants pour augmenter leur priorité

## 🔍 Fonctionnalités de Recherche

### Filtres disponibles :

**Par statut :**
- Tous les statuts
- En attente uniquement
- Assignés
- En cours
- Terminés
- Rejetés

**Par catégorie :**
- Toutes les catégories
- Plastique
- Organique
- Métal
- Verre
- Autre

**Recherche textuelle :**
- Recherche dans les titres
- Recherche dans les descriptions
- Recherche par adresse

## 📱 Interface Responsive

L'application s'adapte à tous les écrans :
- 💻 **Desktop** : Vue complète avec tous les détails
- 📱 **Tablette** : Interface optimisée
- 📱 **Mobile** : Navigation simplifiée via menu hamburger

## 🔒 Sécurité et Confidentialité

- Les données d'authentification sont stockées en toute sécurité
- Chaque utilisateur ne voit que ses propres signalements (sauf admins)
- Les administrateurs ont accès à tous les signalements
- Déconnexion automatique après fermeture du navigateur (option)

## ❓ FAQ

**Q : Puis-je modifier un signalement après création ?**  
R : Actuellement, seuls les administrateurs peuvent modifier les signalements.

**Q : Combien de photos puis-je ajouter ?**  
R : Vous pouvez ajouter plusieurs photos (recommandé : 1-4 photos).

**Q : Comment savoir si mon signalement a été traité ?**  
R : Consultez le statut dans votre dashboard. Vous verrez la progression complète.

**Q : Que signifie "Likes" ?**  
R : Les likes permettent aux citoyens de soutenir un signalement et d'augmenter sa visibilité.

**Q : Puis-je supprimer un signalement ?**  
R : Contactez un administrateur pour supprimer un signalement.

## 📞 Support

Pour toute question ou problème :
- Consultez ce guide
- Contactez l'équipe administrative via l'interface

## 🌟 Contribuer

Chaque signalement compte ! En utilisant EcoSignal, vous contribuez activement à :
- 🌱 Un environnement plus propre
- 👥 Une meilleure qualité de vie pour tous
- 📊 Des données utiles pour les services municipaux
- 🤝 Une communauté engagée

---

**Merci d'utiliser EcoSignal ! Ensemble, faisons la différence ! 🌍**
