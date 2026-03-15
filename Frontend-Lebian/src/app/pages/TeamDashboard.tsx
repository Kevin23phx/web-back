import React, { useState, useEffect, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { 
  FileText, 
  MapPin, 
  Clock, 
  CheckCircle2, 
  AlertCircle,
  Eye,
  Search
} from 'lucide-react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { useNavigate } from 'react-router';
import { useAuth } from '../context/AuthContext';
import { ReportCard } from '../components/ReportCard';
import { Input } from '../components/ui/input';
import api from '../lib/api';
import { toast } from 'sonner';

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
}

const getStatusLabel = (status: Report['status']): string => {
  const labels: Record<string, string> = {
    pending: 'En attente',
    assigned: 'Assigné',
    in_progress: 'En cours',
    completed: 'Terminé',
    rejected: 'Rejeté',
  };
  return labels[status];
};

const getPriorityLabel = (priority: Report['priority']): string => {
  const labels: Record<string, string> = {
    none: 'Aucune',
    low: 'Faible',
    medium: 'Moyenne',
    high: 'Haute',
  };
  return labels[priority];
};

export const TeamDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [reports, setReports] = useState<Report[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        setIsLoading(true);
        // L'équipe voit tous les signalements
        const res = await api.get('/reports');
        setReports(res.data);
      } catch (error) {
        console.error('Failed to fetch team reports', error);
        toast.error('Erreur lors du chargement des signalements');
      } finally {
        setIsLoading(false);
      }
    };
    fetchReports();
  }, []);

  // Missions assignées à l'équipe
  const assignedReports = useMemo(() => {
    return reports.filter(r => 
      (r.status === 'assigned' || r.status === 'in_progress') && 
      (user?.teamId ? r.assignedTeam === "Équipe Centre" : true)
    );
  }, [user, reports]);

  // Tous les signalements (comme sur le dashboard standard)
  const allReports = useMemo(() => {
    if (!searchQuery) return reports;
    return reports.filter(r => 
      r.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery, reports]);

  const getStatusColor = (status: Report['status']) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'assigned': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'in_progress': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'completed': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getPriorityColor = (priority: Report['priority']) => {
    switch (priority) {
      case 'high': return 'text-red-600';
      case 'medium': return 'text-orange-600';
      case 'low': return 'text-green-600';
      default: return 'text-gray-600';
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8 flex items-center justify-center">
        <p className="text-gray-500">Chargement des signalements...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Tableau de Bord Équipe
          </h1>
          <p className="text-gray-600">
            Gérez vos missions et consultez tous les signalements
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
                  <FileText className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Assignés</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {assignedReports.filter(r => r.status === 'assigned').length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-full bg-purple-100 flex items-center justify-center">
                  <Clock className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">En cours</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {assignedReports.filter(r => r.status === 'in_progress').length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center">
                  <CheckCircle2 className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Objectif du jour</p>
                  <p className="text-2xl font-bold text-gray-900">5/8</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Assignments List */}
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Missions en cours</h2>
        <div className="grid gap-4">
          {assignedReports.length > 0 ? (
            assignedReports.map((report) => (
              <Card key={report._id} className="overflow-hidden hover:shadow-md transition-shadow">
                <div className="flex flex-col md:flex-row">
                  <div className="md:w-48 h-32 md:h-auto">
                    <img
                      src={report.images[0]}
                      alt={report.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardContent className="flex-1 p-4">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <Badge variant="outline" className={getStatusColor(report.status)}>
                            {getStatusLabel(report.status)}
                          </Badge>
                          <span className={`text-xs font-bold uppercase ${getPriorityColor(report.priority)}`}>
                            Priorité {getPriorityLabel(report.priority)}
                          </span>
                        </div>
                        <h3 className="font-bold text-lg text-gray-900">{report.title}</h3>
                      </div>
                      <Button size="sm" variant="outline" onClick={() => navigate(`/reports/${report._id}`)}>
                        <Eye className="mr-2 h-4 w-4" />
                        Voir détails
                      </Button>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        <span className="truncate">{report.address}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        <span>Assigné le {format(new Date(report.assignedDate || report.createdAt), 'dd MMMM', { locale: fr })}</span>
                      </div>
                    </div>
                  </CardContent>
                </div>
              </Card>
            ))
          ) : (
            <Card>
              <CardContent className="p-12 text-center">
                <AlertCircle className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500 font-medium">Aucune mission assignée pour le moment</p>
              </CardContent>
            </Card>
          )}
        </div>

        {/* All Reports Section */}
        <div className="mt-12 mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <h2 className="text-2xl font-bold text-gray-900">Tous les signalements</h2>
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Rechercher..."
              value={searchQuery}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {allReports.map((report) => (
            <ReportCard key={report._id} report={report} />
          ))}
        </div>
      </div>
    </div>
  );
};
