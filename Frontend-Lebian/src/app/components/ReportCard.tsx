import { Link } from 'react-router';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { MapPin, Calendar, Eye, Heart } from 'lucide-react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

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
  likes: number;
  views: number;
  createdAt: string;
}

interface ReportCardProps {
  report: Report;
}

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

export const ReportCard = ({ report }: ReportCardProps) => {
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
    const colors: Record<string, string> = {
      none: 'bg-gray-100 text-gray-800 border-gray-200',
      low: 'bg-gray-100 text-gray-800 border-gray-200',
      medium: 'bg-orange-100 text-orange-800 border-orange-200',
      high: 'bg-red-100 text-red-800 border-red-200',
    };
    return colors[priority] || colors.none;
  };

  return (
    <Link to={`/reports/${report._id}`}>
      <Card className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
        {/* Image */}
        {report.images[0] && (
          <div className="relative h-48 w-full overflow-hidden bg-gray-100">
            <img
              src={report.images[0]}
              alt={report.title}
              className="h-full w-full object-cover transition-transform hover:scale-105"
            />
            <div className="absolute top-2 right-2 flex gap-2">
              <Badge className={getStatusColor(report.status)}>
                {getStatusLabel(report.status)}
              </Badge>
            </div>
          </div>
        )}

        <CardContent className="p-4">
          {/* Title */}
          <h3 className="font-semibold text-lg mb-2 line-clamp-1">{report.title}</h3>

          {/* Description */}
          <p className="text-sm text-gray-600 mb-3 line-clamp-2">{report.description}</p>

          {/* Category & Priority */}
          <div className="flex gap-2 mb-3">
            <Badge variant="outline" className="text-xs">
              {getCategoryLabel(report.category)}
            </Badge>
            <Badge variant="outline" className={`text-xs ${getPriorityColor(report.priority)}`}>
              Priorité {report.priority === 'none' ? 'aucune' : report.priority === 'low' ? 'faible' : report.priority === 'medium' ? 'moyenne' : 'haute'}
            </Badge>
          </div>

          {/* Location */}
          <div className="flex items-start gap-2 text-sm text-gray-600 mb-2">
            <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
            <span className="line-clamp-1">{report.address}</span>
          </div>

          {/* Date */}
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
            <Calendar className="h-4 w-4" />
            <span>
              {format(new Date(report.createdAt), 'dd MMMM yyyy', { locale: fr })}
            </span>
          </div>

          {/* Stats */}
          <div className="flex items-center gap-4 text-sm text-gray-500 pt-3 border-t">
            <div className="flex items-center gap-1">
              <Eye className="h-4 w-4" />
              <span>{report.views}</span>
            </div>
            <div className="flex items-center gap-1">
              <Heart className="h-4 w-4" />
              <span>{report.likes}</span>
            </div>
            {report.assignedTeam && (
              <div className="ml-auto text-xs font-medium text-green-600">
                {report.assignedTeam}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};
