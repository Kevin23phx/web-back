import { Link, Navigate } from 'react-router';
import { useAuth } from '../context/AuthContext';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { MapPin, Users, TrendingUp, CheckCircle2, ArrowRight } from 'lucide-react';

export const Home = () => {
  const { isAuthenticated } = useAuth();

  // Rediriger vers le dashboard si l'utilisateur est déjà connecté
  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  const features = [
    {
      icon: MapPin,
      title: 'Signalement géolocalisé',
      description: 'Signalez facilement les déchets avec localisation GPS automatique',
    },
    {
      icon: Users,
      title: 'Action collective',
      description: 'Rejoignez une communauté engagée pour un environnement plus propre',
    },
    {
      icon: TrendingUp,
      title: 'Suivi en temps réel',
      description: 'Suivez le traitement de vos signalements étape par étape',
    },
    {
      icon: CheckCircle2,
      title: 'Impact mesurable',
      description: 'Visualisez l\'impact de vos actions avec des statistiques détaillées',
    },
  ];

  const stats = [
    { label: 'Signalements traités', value: '1,250+' },
    { label: 'Utilisateurs actifs', value: '450+' },
    { label: 'Zones nettoyées', value: '85+' },
    { label: 'Temps moyen', value: '36h' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex h-20 w-20 items-center justify-center rounded-2xl bg-green-600 mb-6">
            <MapPin className="h-12 w-12 text-white" />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Ensemble pour un environnement plus propre
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Signalez les déchets abandonnés dans votre quartier et contribuez à améliorer
            votre environnement. Simple, rapide et efficace.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-green-600 hover:bg-green-700 text-lg px-8">
              <Link to="/auth/register">
                Commencer gratuitement
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="text-lg px-8">
              <Link to="/auth/login">Se connecter</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Statistics */}
      <section className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
          {stats.map((stat, index) => (
            <Card key={index}>
              <CardContent className="p-6 text-center">
                <p className="text-3xl font-bold text-green-600 mb-2">{stat.value}</p>
                <p className="text-sm text-gray-600">{stat.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Comment ça fonctionne ?
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Une solution simple et efficace pour signaler et gérer les déchets abandonnés
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <Card key={index} className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-green-100 mb-4">
                  <feature.icon className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20">
        <Card className="bg-gradient-to-r from-green-600 to-green-700 border-0">
          <CardContent className="p-12 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Prêt à faire la différence ?
            </h2>
            <p className="text-xl text-green-50 mb-8 max-w-2xl mx-auto">
              Rejoignez des centaines de citoyens engagés pour un environnement plus propre
            </p>
            <Button asChild size="lg" variant="secondary" className="text-lg px-8">
              <Link to="/auth/register">
                Créer mon compte gratuit
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </CardContent>
        </Card>
      </section>

      {/* Footer */}
      <footer className="border-t bg-white">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="h-10 w-10 rounded-lg bg-green-600 flex items-center justify-center">
                <MapPin className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">EcoSignal</span>
            </div>
            <p className="text-sm text-gray-600">
              © 2026 EcoSignal. Pour un environnement plus propre.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};