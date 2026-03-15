import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';
import { Card, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { Separator } from '../components/ui/separator';
import {
  MapPin,
  Calendar,
  Eye,
  Heart,
  ArrowLeft,
  AlertCircle,
} from 'lucide-react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { toast } from 'sonner';
import api from '../lib/api';
import { useAuth } from '../context/AuthContext';

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
  likedBy: string[];
  views: number;
  viewedBy: string[];
  createdAt: string;
  updatedAt: string;
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

const getCategoryLabel = (category: Report['category']): string => {
  const labels: Record<string, string> = {
    plastic: 'Plastique',
    organic: 'Organique',
    metal: 'Métal',
    glass: 'Verre',
    other: 'Autre',
  };
  return labels[category];
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

export const ReportDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [report, setReport] = useState<Report | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [views, setViews] = useState(0);
  const [likes, setLikes] = useState(0);
  const [hasLiked, setHasLiked] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    const fetchReport = async () => {
      try {
        const res = await api.get(`/reports/${id}`);
        setReport(res.data);
        setViews(res.data.views || 0);
        setLikes(res.data.likes || 0);
        if (user && res.data.likedBy) {
          setHasLiked(res.data.likedBy.includes(user._id));
        }
      } catch (error) {
        console.error('Failed to fetch report:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchReport();
  }, [id]);

  // Increment views on mount
  useEffect(() => {
    const incrementViews = async () => {
      try {
        const res = await api.patch(`/reports/${id}/views`);
        if (res.data) {
          setViews(res.data.views);
        }
      } catch (error) {
        console.error('Failed to increment views:', error);
      }
    };
    if (report && user && !report.viewedBy.includes(user._id)) {
      incrementViews();
    }
  }, [id, !!report, user]);

  const handleLike = async () => {
    if (!user) {
      toast.error('Connectez-vous pour liker');
      return;
    }
    try {
      if (hasLiked) {
        toast.info('Vous avez déjà liké ce signalement');
      } else {
        const res = await api.post(`/reports/${id}/like`);
        if (res.data) {
          setLikes(res.data.likes);
          setHasLiked(true);
          toast.success('Signalement liké !');
        }
      }
    } catch (error) {
      console.error('Failed to like report:', error);
      toast.error('Erreur lors du like');
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-500">Chargement...</p>
      </div>
    );
  }

  if (!report) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="max-w-md">
          <CardContent className="p-8 text-center">
            <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
            <h2 className="text-xl font-semibold mb-2">Signalement introuvable</h2>
            <p className="text-gray-600 mb-4">Ce signalement n'existe pas ou a été supprimé.</p>
            <Button onClick={() => navigate('/dashboard')}>
              Retour au tableau de bord
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const getStatusColor = (status: Report['status']) => {
    const colors = {
      pending: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      assigned: 'bg-blue-100 text-blue-800 border-blue-200',
      in_progress: 'bg-purple-100 text-purple-800 border-purple-200',
      completed: 'bg-green-100 text-green-800 border-green-200',
      rejected: 'bg-red-100 text-red-800 border-red-200',
    };
    return colors[status];
  };

  const getPriorityColor = (priority: Report['priority']) => {
    const colors = {
      none: 'bg-gray-100 text-gray-800 border-gray-200',
      low: 'bg-green-100 text-green-800 border-green-200',
      medium: 'bg-orange-100 text-orange-800 border-orange-200',
      high: 'bg-red-100 text-red-800 border-red-200',
    };
    return colors[priority];
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-5xl">
        {/* Back Button */}
        <Button
          variant="ghost"
          onClick={() => navigate(-1)}
          className="mb-6"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Retour
        </Button>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Images */}
            <Card>
              <CardContent className="p-0">
                <div className="relative bg-gray-100">
                  <img
                    src={report.images[currentImageIndex]}
                    alt={report.title}
                    className="w-full h-96 object-cover"
                  />
                  {report.images.length > 1 && (
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                      {report.images.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => setCurrentImageIndex(index)}
                          className={`h-2 w-2 rounded-full transition-all ${
                            index === currentImageIndex
                              ? 'bg-white w-8'
                              : 'bg-white/50'
                          }`}
                        />
                      ))}
                    </div>
                  )}
                </div>
                {report.images.length > 1 && (
                  <div className="grid grid-cols-4 gap-2 p-4">
                    {report.images.map((image, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`relative h-20 rounded-lg overflow-hidden border-2 transition-all ${
                          index === currentImageIndex
                            ? 'border-green-600'
                            : 'border-transparent'
                        }`}
                      >
                        <img
                          src={image}
                          alt={`Thumbnail ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Details */}
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-wrap gap-2 mb-4">
                  <Badge className={getStatusColor(report.status)}>
                    {getStatusLabel(report.status)}
                  </Badge>
                  <Badge variant="outline">
                    {getCategoryLabel(report.category)}
                  </Badge>
                  <Badge className={getPriorityColor(report.priority)}>
                    Priorité {getPriorityLabel(report.priority).toLowerCase()}
                  </Badge>
                </div>

                <h1 className="text-3xl font-bold text-gray-900 mb-4">
                  {report.title}
                </h1>

                <div className="flex items-center gap-6 text-sm text-gray-600 mb-6">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    <span>
                      {format(new Date(report.createdAt), 'dd MMMM yyyy', { locale: fr })}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Eye className="h-4 w-4" />
                    <span>{views} vues</span>
                  </div>
                  <button
                    onClick={handleLike}
                    className={`flex items-center gap-2 transition-colors hover:text-green-600 ${
                      hasLiked ? 'text-green-600' : ''
                    }`}
                  >
                    <Heart className={`h-4 w-4 ${hasLiked ? 'fill-current' : ''}`} />
                    <span>{likes} likes</span>
                  </button>
                </div>

                <Separator className="my-6" />

                <div>
                  <h2 className="text-lg font-semibold text-gray-900 mb-3">
                    Description
                  </h2>
                  <p className="text-gray-700 leading-relaxed">
                    {report.description}
                  </p>
                </div>

                <Separator className="my-6" />

                <div>
                  <h2 className="text-lg font-semibold text-gray-900 mb-3">
                    Localisation
                  </h2>
                  <div className="flex items-start gap-2 text-gray-700">
                    <MapPin className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p>{report.address}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Status Timeline */}
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold text-gray-900 mb-4">
                  Progression
                </h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className={`mt-1 h-2 w-2 rounded-full flex-shrink-0 ${
                      report.status !== 'pending' ? 'bg-green-600' : 'bg-yellow-600'
                    }`} />
                    <div>
                      <p className="text-sm font-medium">Signalement créé</p>
                      <p className="text-xs text-gray-500">
                        {format(new Date(report.createdAt), 'dd MMM yyyy, HH:mm', { locale: fr })}
                      </p>
                    </div>
                  </div>

                  {report.assignedDate && (
                    <div className="flex items-start gap-3">
                      <div className={`mt-1 h-2 w-2 rounded-full flex-shrink-0 ${
                        report.status === 'in_progress' || report.status === 'completed'
                          ? 'bg-green-600'
                          : 'bg-blue-600'
                      }`} />
                      <div>
                        <p className="text-sm font-medium">Assigné à une équipe</p>
                        <p className="text-xs text-gray-500">
                          {format(new Date(report.assignedDate), 'dd MMM yyyy, HH:mm', { locale: fr })}
                        </p>
                        {report.assignedTeam && (
                          <p className="text-xs text-green-600 font-medium mt-1">
                            {report.assignedTeam}
                          </p>
                        )}
                      </div>
                    </div>
                  )}

                  {report.status === 'in_progress' && (
                    <div className="flex items-start gap-3">
                      <div className="mt-1 h-2 w-2 rounded-full bg-purple-600 flex-shrink-0" />
                      <div>
                        <p className="text-sm font-medium">Nettoyage en cours</p>
                      </div>
                    </div>
                  )}

                  {report.completedDate && (
                    <div className="flex items-start gap-3">
                      <div className="mt-1 h-2 w-2 rounded-full bg-green-600 flex-shrink-0" />
                      <div>
                        <p className="text-sm font-medium">Terminé</p>
                        <p className="text-xs text-gray-500">
                          {format(new Date(report.completedDate), 'dd MMM yyyy, HH:mm', { locale: fr })}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Additional Info */}
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold text-gray-900 mb-4">
                  Informations supplémentaires
                </h3>
                <div className="space-y-3 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Catégorie</span>
                    <span className="font-medium">{getCategoryLabel(report.category)}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Priorité</span>
                    <span className="font-medium">{getPriorityLabel(report.priority)}</span>
                  </div>
                  {report.assignedTeam && (
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Équipe</span>
                      <span className="font-medium">{report.assignedTeam}</span>
                    </div>
                  )}
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">ID</span>
                    <span className="font-mono text-xs">{report._id}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};