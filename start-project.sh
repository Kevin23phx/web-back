#!/bin/bash

echo "🚀 Démarrage du projet EcoSignal (Lebian)..."

# Vérifier si Docker est installé
if ! command -v docker-compose &> /dev/null
then
    echo "❌ docker-compose n'est pas installé. Veuillez l'installer avant de continuer."
    exit
fi

# Nettoyer les conteneurs orphelins ou en conflit
docker-compose down

# Démarrer les services
docker-compose up --build -d

echo "✅ Services démarrés !"
echo "🌐 Frontend : http://localhost:5173"
echo "🛠 Backend API : http://localhost:3001/api"
echo "📑 Documentation API : http://localhost:3001/api/docs"
echo ""
echo "Pour voir les logs : docker-compose logs -f"
echo "Pour arrêter : docker-compose down"
