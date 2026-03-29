"use client"

import { useStore, MusicalAsset } from "@/lib/store";
import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Trash2, Edit2, Music, Save, X } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export default function AdminPage() {
  const { assets, role, addAsset, updateAsset, deleteAsset, isLoaded } = useStore();
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<MusicalAsset>>({
    title: '',
    artist: '',
    type: 'song',
    chords: '',
    content: '',
    tags: []
  });

  if (!isLoaded || role !== 'admin') {
    return (
      <div className="h-screen flex items-center justify-center p-6 text-center">
        <div>
          <h1 className="text-2xl font-bold mb-4">Access Denied</h1>
          <p className="text-muted-foreground">This area is reserved for administrators only.</p>
          <Button className="mt-6" onClick={() => window.location.href = '/dashboard'}>Return to Dashboard</Button>
        </div>
      </div>
    );
  }

  const resetForm = () => {
    setFormData({ title: '', artist: '', type: 'song', chords: '', content: '', tags: [] });
    setIsEditing(null);
  };

  const handleSave = () => {
    if (!formData.title) return toast({ title: "Error", description: "Title is required", variant: "destructive" });
    
    if (isEditing) {
      updateAsset(isEditing, formData);
      toast({ title: "Updated", description: "Asset has been updated successfully." });
    } else {
      addAsset(formData as any);
      toast({ title: "Created", description: "New asset added to the vault." });
    }
    resetForm();
  };

  const startEdit = (asset: MusicalAsset) => {
    setFormData(asset);
    setIsEditing(asset.id);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="md:ml-64 p-6 lg:p-10">
        <div className="max-w-6xl mx-auto">
          <header className="mb-10 flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-headline font-bold">Admin Store</h1>
              <p className="text-muted-foreground">Create and manage your musical library assets.</p>
            </div>
            {isEditing && (
              <Button variant="ghost" onClick={resetForm} className="text-muted-foreground">
                <X className="w-4 h-4 mr-2" /> Cancel Edit
              </Button>
            )}
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Editor Form */}
            <div className="lg:col-span-1 space-y-6">
              <div className="p-6 rounded-2xl bg-card border border-border space-y-4">
                <h3 className="font-headline font-bold flex items-center gap-2">
                  <Plus className="w-4 h-4 text-primary" />
                  {isEditing ? 'Edit Asset' : 'Add New Asset'}
                </h3>
                
                <div className="space-y-2">
                  <label className="text-xs font-bold text-muted-foreground uppercase">Type</label>
                  <Select value={formData.type} onValueChange={(val) => setFormData({...formData, type: val as any})}>
                    <SelectTrigger className="bg-background">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="song">Song Chart</SelectItem>
                      <SelectItem value="setlist">Setlist</SelectItem>
                      <SelectItem value="note">Performance Note</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-muted-foreground uppercase">Title</label>
                  <Input 
                    placeholder="Enter title" 
                    value={formData.title} 
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                    className="bg-background"
                  />
                </div>

                {formData.type === 'song' && (
                  <>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-muted-foreground uppercase">Artist</label>
                      <Input 
                        placeholder="Artist name" 
                        value={formData.artist} 
                        onChange={(e) => setFormData({...formData, artist: e.target.value})}
                        className="bg-background"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-muted-foreground uppercase">Chords</label>
                      <Input 
                        placeholder="e.g. G C D Em" 
                        value={formData.chords} 
                        onChange={(e) => setFormData({...formData, chords: e.target.value})}
                        className="bg-background font-mono"
                      />
                    </div>
                  </>
                )}

                <div className="space-y-2">
                  <label className="text-xs font-bold text-muted-foreground uppercase">Description / Content</label>
                  <Textarea 
                    placeholder="Enter performance notes or full chart lyrics..." 
                    value={formData.content} 
                    onChange={(e) => setFormData({...formData, content: e.target.value})}
                    className="bg-background h-32"
                  />
                </div>

                <Button onClick={handleSave} className="w-full music-gradient text-background font-bold h-11">
                  <Save className="w-4 h-4 mr-2" />
                  {isEditing ? 'Update Asset' : 'Save to Library'}
                </Button>
              </div>
            </div>

            {/* Asset List */}
            <div className="lg:col-span-2 space-y-4">
              <h3 className="font-headline font-bold">Current Assets ({assets.length})</h3>
              <div className="space-y-2">
                {assets.map(asset => (
                  <div key={asset.id} className="p-4 rounded-xl bg-card border border-border flex items-center justify-between group">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center shrink-0">
                        {asset.type === 'song' ? <Music className="w-5 h-5 text-primary" /> : <Plus className="w-5 h-5 text-accent" />}
                      </div>
                      <div>
                        <div className="font-medium">{asset.title}</div>
                        <div className="text-xs text-muted-foreground capitalize">{asset.type} • {asset.artist || 'No artist'}</div>
                      </div>
                    </div>
                    <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button variant="ghost" size="icon" onClick={() => startEdit(asset)} className="h-8 w-8 text-primary">
                        <Edit2 className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => deleteAsset(asset.id)} className="h-8 w-8 text-destructive">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}