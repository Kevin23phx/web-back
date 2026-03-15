import { useState, useMemo, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { ReportCard } from '../components/ReportCard';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Card, CardContent } from '../components/ui/card';
import { Plus, Search, Filter, FileText, Clock, CheckCircle2, AlertCircle } from 'lucide-react';
import { Link } from 'react-router';
import api from '../lib/api';

interface Report {
  _id: string;
  userId: string | { _id: string };
  title: string;
  description: string;
  category: 'plastic' | 'organic' | 'metal' | 'glass' | 'other';
  images: string[];
  address: string;
  status: 'pending' | 'assigned' | 'in_progress' | 'completed' | 'rejected';
  priority: 'none' | 'low' | 'medium' | 'high';
  assignedTeam?: string;
  assignedDate?: string;
  completedDate?: string;
  likes: number;
  views: number;
  createdAt: string;
  updatedAt: string;
}

export const Dashboard = () => {
  const { user, isTeam, isAdmin } = useAuth();
  const [reports, setReports] = useState<Report[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');

  useEffect(() => {
    const fetchReports = async () => {
      try {
        if (isTeam || isAdmin) {
          // Admin et équipe voient tous les signalements
          const res = await api.get('/reports');
          setReports(res.data);
        } else {
          // Tous les utilisateurs voient désormais tous les signalements
          const res = await api.get('/reports');
          setReports(res.data);
        }
      } catch (error) {
        console.error('Failed to fetch reports:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchReports();
  }, [isTeam, isAdmin, user]);

  // Pour les utilisateurs normaux, on a déjà filtré dans le useEffect
  // Pour admin/team, on affiche tous les signalements
  const userReports = useMemo(() => {
    if (isTeam || isAdmin) return reports;
    // Les signalements publics des autres sont déjà inclus dans reports grâce au useEffect
    return reports;
  }, [reports, isTeam, isAdmin]);

  // Missions assignées à l'équipe
  const assignedReports = useMemo(() => {
    if (!isTeam) return [];
    return reports.filter(r => 
      (r.status === 'assigned' || r.status === 'in_progress') && 
      (user?.teamId ? r.assignedTeam === "Équipe Centre" : true)
    );
  }, [reports, isTeam, user]);

  // Appliquer les filtres
  const filteredReports = useMemo(() => {
    let filtered = userReports;

    if (searchQuery) {
      filtered = filtered.filter(
        report =>
          report.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          report.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (statusFilter !== 'all') {
      filtered = filtered.filter(report => report.status === statusFilter);
    }

    if (categoryFilter !== 'all') {
      filtered = filtered.filter(report => report.category === categoryFilter);
    }

    return filtered;
  }, [userReports, searchQuery, statusFilter, categoryFilter]);

  // Statistiques
  const stats = useMemo(() => {
    return {
      total: userReports.length,
      pending: userReports.filter(r => r.status === 'pending').length,
      inProgress: userReports.filter(r => r.status === 'in_progress' || r.status === 'assigned').length,
      completed: userReports.filter(r => r.status === 'completed').length,
    };
  }, [userReports]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-500">Chargement des signalements...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Bienvenue, {user?.firstName} !
          </h1>
          <p className="text-gray-600">
            {isTeam 
              ? "Gérez vos missions et consultez les signalements de la ville" 
              : "Gérez vos signalements et suivez leur progression"}
          </p>
        </div>

        {/* Section Missions pour l'équipe */}
        {isTeam && assignedReports.length > 0 && (
          <div className="mb-12">
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-blue-600" />
              Mes Missions Prioritaires
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {assignedReports.map((report) => (
                <ReportCard key={`mission-${report._id}`} report={report} />
              ))}
            </div>
            <div className="mt-4 border-b pb-8"></div>
          </div>
        )}

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Total</p>
                  <p className="text-3xl font-bold text-gray-900">{stats.total}</p>
                </div>
                <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
                  <FileText className="h-6 w-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">En attente</p>
                  <p className="text-3xl font-bold text-yellow-600">{stats.pending}</p>
                </div>
                <div className="h-12 w-12 rounded-full bg-yellow-100 flex items-center justify-center">
                  <Clock className="h-6 w-6 text-yellow-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">En cours</p>
                  <p className="text-3xl font-bold text-purple-600">{stats.inProgress}</p>
                </div>
                <div className="h-12 w-12 rounded-full bg-purple-100 flex items-center justify-center">
                  <AlertCircle className="h-6 w-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Terminés</p>
                  <p className="text-3xl font-bold text-green-600">{stats.completed}</p>
                </div>
                <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center">
                  <CheckCircle2 className="h-6 w-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters and Search */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Rechercher un signalement..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>

              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full lg:w-48">
                  <SelectValue placeholder="Statut" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous les statuts</SelectItem>
                  <SelectItem value="pending">En attente</SelectItem>
                  <SelectItem value="assigned">Assigné</SelectItem>
                  <SelectItem value="in_progress">En cours</SelectItem>
                  <SelectItem value="completed">Terminé</SelectItem>
                  <SelectItem value="rejected">Rejeté</SelectItem>
                </SelectContent>
              </Select>

              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-full lg:w-48">
                  <SelectValue placeholder="Catégorie" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Toutes catégories</SelectItem>
                  <SelectItem value="plastic">Plastique</SelectItem>
                  <SelectItem value="organic">Organique</SelectItem>
                  <SelectItem value="metal">Métal</SelectItem>
                  <SelectItem value="glass">Verre</SelectItem>
                  <SelectItem value="other">Autre</SelectItem>
                </SelectContent>
              </Select>

              <Button asChild className="bg-green-600 hover:bg-green-700">
                <Link to="/reports/new">
                  <Plus className="mr-2 h-4 w-4" />
                  Nouveau
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Reports Grid */}
        <div className="mb-6 flex justify-between items-center">
          <h2 className="text-xl font-bold text-gray-900">
            {isTeam ? "Tous les signalements" : isAdmin ? "Tous les signalements" : "Mes signalements & Signalements publics"}
          </h2>
          <span className="text-sm text-gray-500">{filteredReports.length} résultats</span>
        </div>

        {filteredReports.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredReports.map((report) => (
              <ReportCard key={report._id} report={report} />
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="p-12 text-center">
              <div className="mx-auto w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                <FileText className="h-8 w-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Aucun signalement trouvé
              </h3>
              <p className="text-gray-600 mb-6">
                {userReports.length === 0
                  ? "Vous n'avez pas encore créé de signalement"
                  : 'Aucun signalement ne correspond à vos critères de recherche'}
              </p>
              {userReports.length === 0 && (
                <Button asChild className="bg-green-600 hover:bg-green-700">
                  <Link to="/reports/new">
                    <Plus className="mr-2 h-4 w-4" />
                    Créer mon premier signalement
                  </Link>
                </Button>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};
