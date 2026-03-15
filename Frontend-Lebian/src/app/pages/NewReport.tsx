import { useState, useRef } from 'react';
import { useNavigate } from 'react-router';
import { useAuth } from '../context/AuthContext';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Upload, X, MapPin, Loader2, Camera } from 'lucide-react';
import { toast } from 'sonner';
import api from '../lib/api';

export const NewReport = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState<string[]>([]);
  const [showCamera, setShowCamera] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const [formData, setFormData] = useState<{
    title: string;
    description: string;
    category: string;
    otherCategoryDescription: string;
    address: string;
  }>({
    title: '',
    description: '',
    category: '',
    otherCategoryDescription: '',
    address: '',
  });

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const newImages: string[] = [];
    Array.from(files).forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        newImages.push(reader.result as string);
        if (newImages.length === files.length) {
          setImages((prev) => [...prev, ...newImages]);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'environment' } 
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      setShowCamera(true);
    } catch (error) {
      toast.error('Impossible d\'accéder à la caméra');
      console.error('Camera error:', error);
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    setShowCamera(false);
  };

  const capturePhoto = () => {
    if (videoRef.current) {
      const canvas = document.createElement('canvas');
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(videoRef.current, 0, 0);
        const imageData = canvas.toDataURL('image/jpeg');
        setImages((prev) => [...prev, imageData]);
        toast.success('Photo capturée avec succès !');
        stopCamera();
      }
    }
  };

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.category) {
      toast.error('Veuillez sélectionner une catégorie');
      return;
    }

    if (formData.category === 'other' && !formData.otherCategoryDescription) {
      toast.error('Veuillez décrire le type de catégorie');
      return;
    }

    if (images.length === 0) {
      toast.error('Veuillez ajouter au moins une photo');
      return;
    }

    if (!formData.address) {
      toast.error('Veuillez fournir une adresse');
      return;
    }

    setLoading(true);

    try {
      // Create FormData to handle image upload if the backend expects it
      // However, the current NestJS reports module uses Multer and Cloudinary.
      // If the backend accepts Base64, we can send JSON. 
      // Based on previous analysis, it uses @nestjs/swagger and likely expects multipart/form-data for images.
      
      const payload: any = {
        title: formData.title,
        description: formData.description,
        category: formData.category,
        images: images, // Send Base64 directly
      };

      if (formData.category === 'other') {
        payload.otherCategoryDescription = formData.otherCategoryDescription;
      }
      if (formData.address) {
        payload.address = formData.address;
      }


      await api.post('/reports', payload);
      
      toast.success('Signalement créé avec succès !');
      navigate('/dashboard');
    } catch (error: any) {
      console.error('Error creating report:', error);
      toast.error(error.response?.data?.message || 'Erreur lors de la création du signalement');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Nouveau signalement
          </h1>
          <p className="text-gray-600">
            Signalez un déchet pour contribuer à un environnement plus propre
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Photos */}
          <Card>
            <CardHeader>
              <CardTitle>Photos</CardTitle>
              <CardDescription>
                Ajoutez des photos du déchet à signaler (minimum 1)
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Upload Button */}
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-green-500 transition-colors">
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleImageUpload}
                    className="hidden"
                    id="image-upload"
                  />
                  <label
                    htmlFor="image-upload"
                    className="cursor-pointer flex flex-col items-center gap-2"
                  >
                    <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center">
                      <Upload className="h-6 w-6 text-green-600" />
                    </div>
                    <p className="font-medium text-gray-900">
                      Cliquez pour ajouter des photos
                    </p>
                    <p className="text-sm text-gray-500">
                      PNG, JPG jusqu'à 10MB
                    </p>
                  </label>
                </div>

                {/* Camera Button */}
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-green-500 transition-colors">
                  <button
                    type="button"
                    onClick={startCamera}
                    className="flex flex-col items-center gap-2 w-full"
                  >
                    <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center">
                      <Camera className="h-6 w-6 text-green-600" />
                    </div>
                    <p className="font-medium text-gray-900">
                      Utiliser la caméra
                    </p>
                    <p className="text-sm text-gray-500">
                      Capturez une photo
                    </p>
                  </button>
                </div>

                {/* Camera Preview */}
                {showCamera && (
                  <div className="relative rounded-lg overflow-hidden bg-black">
                    <video
                      ref={videoRef}
                      autoPlay
                      playsInline
                      className="w-full h-64 object-cover"
                    />
                    <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-4">
                      <Button
                        type="button"
                        onClick={capturePhoto}
                        className="bg-green-600 hover:bg-green-700"
                      >
                        <Camera className="mr-2 h-4 w-4" />
                        Capturer
                      </Button>
                      <Button
                        type="button"
                        onClick={stopCamera}
                        variant="destructive"
                      >
                        <X className="mr-2 h-4 w-4" />
                        Annuler
                      </Button>
                    </div>
                  </div>
                )}

                {/* Image Preview */}
                {images.length > 0 && (
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {images.map((image, index) => (
                      <div key={index} className="relative group">
                        <img
                          src={image}
                          alt={`Preview ${index + 1}`}
                          className="w-full h-32 object-cover rounded-lg"
                        />
                        <button
                          type="button"
                          onClick={() => removeImage(index)}
                          className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Informations */}
          <Card>
            <CardHeader>
              <CardTitle>Informations</CardTitle>
              <CardDescription>
                Décrivez le déchet que vous signalez
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Titre du signalement</Label>
                <Input
                  id="title"
                  placeholder="Ex: Bouteilles plastiques dans le parc"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Décrivez en détail le déchet signalé..."
                  rows={4}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="category">Catégorie</Label>
                <Select
                  value={formData.category}
                  onValueChange={(value) => setFormData({ ...formData, category: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionnez une catégorie" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="plastic">Plastique</SelectItem>
                    <SelectItem value="organic">Organique</SelectItem>
                    <SelectItem value="metal">Métal</SelectItem>
                    <SelectItem value="glass">Verre</SelectItem>
                    <SelectItem value="other">Autre</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {formData.category === 'other' && (
                <div className="space-y-2 animate-in fade-in slide-in-from-top-2 duration-300">
                  <Label htmlFor="otherCategoryDescription">Précisez le type de déchet</Label>
                  <Textarea
                    id="otherCategoryDescription"
                    placeholder="Décrivez le type de déchet que vous avez vu..."
                    rows={2}
                    value={formData.otherCategoryDescription}
                    onChange={(e) => setFormData({ ...formData, otherCategoryDescription: e.target.value })}
                    required
                  />
                </div>
              )}
            </CardContent>
          </Card>

          {/* Localisation */}
          <Card>
            <CardHeader>
              <CardTitle>Localisation</CardTitle>
              <CardDescription>
                Indiquez où se trouve le déchet
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="address">Adresse</Label>
                <Input
                  id="address"
                  placeholder="Ex: 12 Rue de la Paix, 75001 Paris"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  required
                />
              </div>
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="flex gap-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate('/dashboard')}
              className="flex-1"
            >
              Annuler
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-green-600 hover:bg-green-700"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Création en cours...
                </>
              ) : (
                'Créer le signalement'
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};