import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Badge } from '../components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../components/ui/table';
import { Users, Plus, Search, FileText, Edit, Trash2 } from 'lucide-react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { toast } from 'sonner';
import api from '../lib/api';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../components/ui/dialog';
import { Label } from '../components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/ui/select';

interface Team {
  _id: string;
  name: string;
  description: string;
  category: string[];
  membersCount: number;
  isActive: boolean;
  assignedMissionsCount: number;
  createdAt: string;
}

export const AdminTeams = () => {
  const [teams, setTeams] = useState<Team[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState<Team | null>(null);
  const [editFormData, setEditFormData] = useState({
    name: '',
    description: '',
    isActive: true,
    membersCount: 0,
    category: [] as string[],
  });
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [createFormData, setCreateFormData] = useState({
    name: '',
    description: '',
    category: [] as string[],
    membersCount: 0,
  });

  const categories = [
    { id: 'organic', label: 'Organique' },
    { id: 'metal', label: 'Métal' },
    { id: 'paper', label: 'Papier' },
    { id: 'plastic', label: 'Plastique' },
    { id: 'glass', label: 'Verre' },
    { id: 'other', label: 'Autre' },
  ];

  const fetchTeams = async () => {
    try {
      const res = await api.get('/teams');
      setTeams(res.data);
    } catch (error) {
      console.error('Failed to fetch teams:', error);
      toast.error('Erreur lors du chargement des équipes');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTeams();
  }, []);

  const filteredTeams = teams.filter(
    (team) =>
      team.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      team.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleEdit = (team: Team) => {
    setSelectedTeam(team);
    setEditFormData({
      name: team.name,
      description: team.description,
      isActive: team.isActive,
      membersCount: team.membersCount || 0,
      category: team.category || [],
    });
    setIsEditDialogOpen(true);
  };

  const handleSaveEdit = async () => {
    if (!selectedTeam) return;
    try {
      await api.put(`/teams/${selectedTeam._id}`, editFormData);
      toast.success('Équipe mise à jour avec succès');
      setIsEditDialogOpen(false);
      fetchTeams();
    } catch (error) {
      toast.error('Erreur lors de la mise à jour');
    }
  };

  const handleCreateTeam = async () => {
    try {
      if (!createFormData.name || !createFormData.description) {
        toast.error('Veuillez remplir tous les champs');
        return;
      }
      await api.post('/teams', createFormData);
      toast.success('Équipe créée avec succès');
      setIsCreateDialogOpen(false);
      setCreateFormData({ name: '', description: '', category: [], membersCount: 0 });
      fetchTeams();
    } catch (error) {
      toast.error("Erreur lors de la création de l'équipe");
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette équipe ?')) {
      try {
        await api.delete(`/teams/${id}`);
        toast.success('Équipe supprimée avec succès');
        fetchTeams();
      } catch (error) {
        toast.error('Erreur lors de la suppression');
      }
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8 flex items-center justify-center">
        <p className="text-gray-500">Chargement des équipes...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Gestion des équipes
            </h1>
            <p className="text-gray-600">
              Gérez les équipes d'intervention et leurs spécialités
            </p>
          </div>
          <Button className="bg-green-600 hover:bg-green-700" onClick={() => setIsCreateDialogOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Nouvelle équipe
          </Button>
        </div>

        {/* Search */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Rechercher une équipe..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </CardContent>
        </Card>

        {/* Table */}
        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Équipe</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Spécialités</TableHead>
                    <TableHead>Membres</TableHead>
                    <TableHead>Missions</TableHead>
                    <TableHead>Statut</TableHead>
                    <TableHead>Créée le</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredTeams.length > 0 ? (
                    filteredTeams.map((team) => (
                      <TableRow key={team._id}>
                        <TableCell className="font-medium">
                          <div className="flex items-center gap-2">
                            <div className="h-8 w-8 rounded-lg bg-green-100 flex items-center justify-center">
                              <Users className="h-4 w-4 text-green-600" />
                            </div>
                            {team.name}
                          </div>
                        </TableCell>
                        <TableCell className="max-w-xs truncate text-gray-600">
                          {team.description}
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-wrap gap-1">
                            {team.category?.map((cat) => (
                              <Badge key={cat} variant="secondary" className="text-[10px]">
                                {cat}
                              </Badge>
                            ))}
                          </div>
                        </TableCell>
                        <TableCell>{team.membersCount} membres</TableCell>
                        <TableCell>
                          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                            {team.assignedMissionsCount} missions
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant="outline"
                            className={
                              team.isActive
                                ? 'border-green-200 bg-green-50 text-green-700'
                                : 'border-gray-200 bg-gray-50 text-gray-700'
                            }
                          >
                            {team.isActive ? 'Active' : 'Inactive'}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-sm text-gray-600">
                          {format(new Date(team.createdAt), 'dd/MM/yyyy', { locale: fr })}
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleEdit(team)}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleDelete(team._id)}
                              className="text-red-600 hover:text-red-700 hover:bg-red-50"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center py-12 text-gray-500">
                        Aucune équipe trouvée
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Modifier l'équipe</DialogTitle>
              <DialogDescription>
                Modifier les détails de l'équipe {selectedTeam?.name}
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nom de l'équipe</Label>
                <Input
                  id="name"
                  value={editFormData.name}
                  onChange={(e) => setEditFormData({ ...editFormData, name: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Input
                  id="description"
                  value={editFormData.description}
                  onChange={(e) => setEditFormData({ ...editFormData, description: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="membersCount">Nombre de membres</Label>
                <Input
                  id="membersCount"
                  type="number"
                  value={editFormData.membersCount}
                  onChange={(e) => setEditFormData({ ...editFormData, membersCount: parseInt(e.target.value) || 0 })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="isActive">Statut</Label>
                <Select
                  value={editFormData.isActive ? 'active' : 'inactive'}
                  onValueChange={(value) => setEditFormData({ ...editFormData, isActive: value === 'active' })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Spécialités</Label>
                <div className="grid grid-cols-2 gap-2">
                  {categories.map((cat) => (
                    <div key={cat.id} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id={`edit-cat-${cat.id}`}
                        checked={editFormData.category.includes(cat.id)}
                        onChange={(e) => {
                          const updated = e.target.checked
                            ? [...editFormData.category, cat.id]
                            : editFormData.category.filter(c => c !== cat.id);
                          setEditFormData({ ...editFormData, category: updated });
                        }}
                        className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                      />
                      <Label htmlFor={`edit-cat-${cat.id}`} className="text-sm font-normal">
                        {cat.label}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                Annuler
              </Button>
              <Button className="bg-green-600 hover:bg-green-700" onClick={handleSaveEdit}>
                Enregistrer
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Create Dialog */}
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Nouvelle équipe</DialogTitle>
              <DialogDescription>
                Créer une nouvelle équipe d'intervention
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="create-name">Nom de l'équipe</Label>
                <Input
                  id="create-name"
                  placeholder="Ex: Équipe Sud"
                  value={createFormData.name}
                  onChange={(e) => setCreateFormData({ ...createFormData, name: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="create-description">Description</Label>
                <Input
                  id="create-description"
                  placeholder="Description de l'équipe"
                  value={createFormData.description}
                  onChange={(e) => setCreateFormData({ ...createFormData, description: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="create-membersCount">Nombre de membres</Label>
                <Input
                  id="create-membersCount"
                  type="number"
                  placeholder="Ex: 5"
                  value={createFormData.membersCount}
                  onChange={(e) => setCreateFormData({ ...createFormData, membersCount: parseInt(e.target.value) || 0 })}
                />
              </div>
              <div className="space-y-2">
                <Label>Spécialités</Label>
                <div className="grid grid-cols-2 gap-2">
                  {categories.map((cat) => (
                    <div key={cat.id} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id={`cat-${cat.id}`}
                        checked={createFormData.category.includes(cat.id)}
                        onChange={(e) => {
                          const updated = e.target.checked
                            ? [...createFormData.category, cat.id]
                            : createFormData.category.filter(c => c !== cat.id);
                          setCreateFormData({ ...createFormData, category: updated });
                        }}
                        className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                      />
                      <Label htmlFor={`cat-${cat.id}`} className="text-sm font-normal">
                        {cat.label}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                Annuler
              </Button>
              <Button className="bg-green-600 hover:bg-green-700" onClick={handleCreateTeam}>
                Créer l'équipe
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};
