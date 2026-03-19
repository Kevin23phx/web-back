// Mock data pour les signalements

export interface Report {
  _id: string;
  userId: string;
  title: string;
  description: string;
  category: 'plastic' | 'organic' | 'metal' | 'glass' | 'other';
  otherCategoryDescription?: string;
  images: string[];
  location: {
    type: 'Point';
    coordinates: [number, number]; // [longitude, latitude]
  };
  address: string;
  status: 'pending' | 'assigned' | 'in_progress' | 'completed' | 'rejected';
  priority: 'none' | 'low' | 'medium' | 'high';
  assignedTo?: string;
  assignedTeam?: string;
  assignedDate?: Date;
  completedDate?: Date;
  rejectionReason?: string;
  likes: number;
  views: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface Team {
  _id: string;
  name: string;
  description: string;
  category: string[];
  membersCount: number;
  isActive: boolean;
  assignedMissionsCount: number;
  createdAt: Date;
}

export interface UserData {
  _id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: 'user' | 'admin' | 'team';
  phone?: string;
  isActive: boolean;
  createdAt: Date;
  lastLogin: Date;
  reportsCount: number;
  teamId?: string;
}

export const mockUsers: UserData[] = [
  {
    _id: 'admin-1',
    email: 'admin@test.com',
    firstName: 'Admin',
    lastName: 'System',
    role: 'admin',
    phone: '+226 70 00 00 00',
    isActive: true,
    createdAt: new Date('2025-01-01'),
    lastLogin: new Date('2026-03-07'),
    reportsCount: 0,
  },
  {
    _id: 'user-1',
    email: 'jean.dupont@example.com',
    firstName: 'Ali',
    lastName: 'Zerbo',
    role: 'user',
    phone: '+226 70 00 00 00',
    isActive: true,
    createdAt: new Date('2025-02-15'),
    lastLogin: new Date('2026-03-06'),
    reportsCount: 4, // Matches mockReports for user-1
  },
  {
    _id: 'user-2',
    email: 'marie.martin@example.com',
    firstName: 'Marie',
    lastName: 'Martin',
    role: 'user',
    phone: '+33 6 34 56 78 90',
    isActive: true,
    createdAt: new Date('2025-03-10'),
    lastLogin: new Date('2026-03-05'),
    reportsCount: 2, // Matches mockReports for user-2
  },
  {
    _id: 'user-3',
    email: 'pierre.bernard@example.com',
    firstName: 'Pierre',
    lastName: 'Bernard',
    role: 'user',
    isActive: true,
    createdAt: new Date('2025-04-20'),
    lastLogin: new Date('2026-03-04'),
    reportsCount: 1, // Matches mockReports for user-3
  },
  {
    _id: 'team-1',
    email: 'team@test.com',
    firstName: 'Équipe',
    lastName: 'Centre',
    role: 'team',
    phone: '+33 6 56 78 90 12',
    isActive: true,
    createdAt: new Date('2025-05-12'),
    lastLogin: new Date('2026-03-07'),
    reportsCount: 0,
    teamId: '1',
  },
];

export const mockTeams: Team[] = [
  {
    _id: '1',
    name: 'Équipe Centre',
    description: 'Chargée de la zone centrale et du centre-ville',
    category: ['plastic', 'glass'],
    membersCount: 8,
    isActive: true,
    assignedMissionsCount: 3,
    createdAt: new Date('2025-01-10'),
  },
  {
    _id: '2',
    name: 'Équipe Nord',
    description: 'Intervient dans les quartiers nord et périphériques',
    category: ['organic', 'metal'],
    membersCount: 6,
    isActive: true,
    assignedMissionsCount: 2,
    createdAt: new Date('2025-02-05'),
  },
  {
    _id: '3',
    name: 'Équipe Ouest',
    description: 'Spécialisée dans les interventions rapides zone ouest',
    category: ['other'],
    membersCount: 5,
    isActive: true,
    assignedMissionsCount: 0,
    createdAt: new Date('2025-03-01'),
  },
];

export const mockReports: Report[] = [
  {
    _id: '1',
    userId: 'user-1',
    title: 'Déchets plastiques dans le parc',
    description: 'Nombreuses bouteilles en plastique et emballages abandonnés près de l\'aire de jeux',
    category: 'plastic',
    images: ['https://images.unsplash.com/photo-1621451537084-482c73073a0f?w=800'],
    location: {
      type: 'Point',
      coordinates: [2.3522, 48.8566]
    },
    address: 'Parc des Buttes-Chaumont, Paris 19e',
    status: 'pending',
    priority: 'high',
    likes: 12,
    views: 45,
    createdAt: new Date('2026-03-06'),
    updatedAt: new Date('2026-03-06'),
  },
  {
    _id: '2',
    userId: 'user-1',
    title: 'Déchets organiques près du marché',
    description: 'Restes de fruits et légumes laissés sur le trottoir après le marché',
    category: 'organic',
    images: ['https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=800'],
    location: {
      type: 'Point',
      coordinates: [2.3488, 48.8534]
    },
    address: 'Marché Bastille, 75011 Paris',
    status: 'assigned',
    priority: 'medium',
    assignedTeam: 'Équipe Centre',
    assignedDate: new Date('2026-03-05'),
    likes: 8,
    views: 32,
    createdAt: new Date('2026-03-05'),
    updatedAt: new Date('2026-03-05'),
  },
  {
    _id: '3',
    userId: 'user-2',
    title: 'Canettes métalliques abandonnées',
    description: 'Plusieurs canettes de soda laissées sur un banc public',
    category: 'metal',
    images: ['https://images.unsplash.com/photo-1572696270106-8ec2c825e935?w=800'],
    location: {
      type: 'Point',
      coordinates: [2.3364, 48.8584]
    },
    address: 'Place de la Concorde, 75008 Paris',
    status: 'in_progress',
    priority: 'low',
    assignedTeam: 'Équipe Ouest',
    assignedDate: new Date('2026-03-04'),
    likes: 5,
    views: 28,
    createdAt: new Date('2026-03-04'),
    updatedAt: new Date('2026-03-05'),
  },
  {
    _id: '4',
    userId: 'user-1',
    title: 'Bouteilles en verre cassées',
    description: 'Verre brisé dangereux sur le chemin piéton',
    category: 'glass',
    images: ['https://images.unsplash.com/photo-1607611854893-a8a0ba6e6caf?w=800'],
    location: {
      type: 'Point',
      coordinates: [2.3412, 48.8606]
    },
    address: 'Rue de Rivoli, 75004 Paris',
    status: 'completed',
    priority: 'high',
    assignedTeam: 'Équipe Centre',
    assignedDate: new Date('2026-03-03'),
    completedDate: new Date('2026-03-04'),
    likes: 15,
    views: 67,
    createdAt: new Date('2026-03-03'),
    updatedAt: new Date('2026-03-04'),
  },
  {
    _id: '5',
    userId: 'user-3',
    title: 'Déchets divers près de la gare',
    description: 'Mégots, papiers et déchets mélangés',
    category: 'other',
    images: ['https://images.unsplash.com/photo-1609609830354-8f615d61b9c8?w=800'],
    location: {
      type: 'Point',
      coordinates: [2.3569, 48.8437]
    },
    address: 'Gare de Lyon, 75012 Paris',
    status: 'pending',
    priority: 'medium',
    likes: 6,
    views: 24,
    createdAt: new Date('2026-03-07'),
    updatedAt: new Date('2026-03-07'),
  },
  {
    _id: '6',
    userId: 'user-2',
    title: 'Sacs plastiques dans le canal',
    description: 'Plusieurs sacs plastiques flottants dans le canal',
    category: 'plastic',
    images: ['https://images.unsplash.com/photo-1618477388954-7852f32655ec?w=800'],
    location: {
      type: 'Point',
      coordinates: [2.3667, 48.8711]
    },
    address: 'Canal Saint-Martin, 75010 Paris',
    status: 'assigned',
    priority: 'high',
    assignedTeam: 'Équipe Nord',
    assignedDate: new Date('2026-03-06'),
    likes: 20,
    views: 89,
    createdAt: new Date('2026-03-06'),
    updatedAt: new Date('2026-03-06'),
  },
  {
    _id: '7',
    userId: 'user-1',
    title: 'Cartons abandonnés',
    description: 'Cartons d\'emballage laissés devant un commerce',
    category: 'other',
    images: ['https://images.unsplash.com/photo-1604187351574-c75ca79f5807?w=800'],
    location: {
      type: 'Point',
      coordinates: [2.3456, 48.8575]
    },
    address: 'Boulevard Haussmann, 75009 Paris',
    status: 'completed',
    priority: 'low',
    assignedTeam: 'Équipe Centre',
    assignedDate: new Date('2026-03-02'),
    completedDate: new Date('2026-03-03'),
    likes: 4,
    views: 18,
    createdAt: new Date('2026-03-02'),
    updatedAt: new Date('2026-03-03'),
  },
];

export const getCategoryLabel = (category: Report['category']): string => {
  const labels = {
    plastic: 'Plastique',
    organic: 'Organique',
    metal: 'Métal',
    glass: 'Verre',
    other: 'Autre',
  };
  return labels[category];
};

export const getStatusLabel = (status: Report['status']): string => {
  const labels = {
    pending: 'En attente',
    assigned: 'Assigné',
    in_progress: 'En cours',
    completed: 'Terminé',
    rejected: 'Rejeté',
  };
  return labels[status];
};

export const getPriorityLabel = (priority: Report['priority']): string => {
  const labels = {
    none: 'Aucune',
    low: 'Faible',
    medium: 'Moyenne',
    high: 'Haute',
  };
  return labels[priority];
};

// Statistiques mockées pour le dashboard admin
export const mockStatistics = {
  overview: {
    totalReports: 125,
    pendingReports: 24,
    assignedReports: 18,
    inProgressReports: 15,
    completedReports: 58,
    rejectedReports: 10,
  },
  trends: {
    thisMonth: 45,
    lastMonth: 38,
    percentageChange: 18.4,
  },
  averageResolutionTime: 36.5, // en heures
  topCategories: [
    { category: 'plastic', count: 48, label: 'Plastique' },
    { category: 'organic', count: 32, label: 'Organique' },
    { category: 'metal', count: 22, label: 'Métal' },
    { category: 'glass', count: 15, label: 'Verre' },
    { category: 'other', count: 8, label: 'Autre' },
  ],
  topLocations: [
    { area: 'Centre-Ville', count: 45 },
    { area: 'Quartier Nord', count: 32 },
    { area: 'Zone Est', count: 28 },
    { area: 'Quartier Sud', count: 20 },
  ],
  chartData: {
    labels: ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'],
    datasets: [
      {
        label: 'Nouveaux signalements',
        data: [5, 8, 6, 9, 7, 12, 8],
      },
      {
        label: 'Signalements terminés',
        data: [3, 6, 5, 7, 8, 9, 6],
      },
    ],
  },
};