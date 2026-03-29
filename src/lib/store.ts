import { useState, useEffect } from 'react';

export interface MusicalAsset {
  id: string;
  title: string;
  artist?: string;
  type: 'song' | 'setlist' | 'note';
  chords?: string;
  content?: string;
  mediaUrl?: string;
  mediaType?: 'video' | 'image' | 'audio';
  tags: string[];
  updatedAt: number;
}

const STORAGE_KEY = 'harmony_vault_data';
const AUTH_KEY = 'harmony_vault_auth';

export type UserRole = 'admin' | 'user' | null;

export const useStore = () => {
  const [assets, setAssets] = useState<MusicalAsset[]>([]);
  const [role, setRole] = useState<UserRole>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const savedAssets = localStorage.getItem(STORAGE_KEY);
    const savedAuth = localStorage.getItem(AUTH_KEY);

    if (savedAssets) {
      setAssets(JSON.parse(savedAssets));
    } else {
      // Default sample data
      const initialAssets: MusicalAsset[] = [
        {
          id: '1',
          title: 'Purple Rain',
          artist: 'Prince',
          type: 'song',
          chords: 'Bb Gm7 F Eb',
          content: 'The iconic ballad...',
          mediaUrl: 'https://images.unsplash.com/photo-1514525253361-b83a65d5ed2c',
          mediaType: 'image',
          tags: ['80s', 'Rock'],
          updatedAt: Date.now()
        },
        {
          id: '2',
          title: 'Sunday Morning Setlist',
          type: 'setlist',
          content: '1. Amazing Grace\n2. How Great Thou Art',
          tags: ['Sunday', 'Worship'],
          updatedAt: Date.now()
        }
      ];
      setAssets(initialAssets);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(initialAssets));
    }

    if (savedAuth) {
      setRole(savedAuth as UserRole);
    }
    setIsLoaded(true);
  }, []);

  const saveAssets = (newAssets: MusicalAsset[]) => {
    setAssets(newAssets);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newAssets));
  };

  const login = (newRole: UserRole) => {
    setRole(newRole);
    localStorage.setItem(AUTH_KEY, newRole || '');
  };

  const logout = () => {
    setRole(null);
    localStorage.removeItem(AUTH_KEY);
  };

  const addAsset = (asset: Omit<MusicalAsset, 'id' | 'updatedAt'>) => {
    const newAsset: MusicalAsset = {
      ...asset,
      id: Math.random().toString(36).substr(2, 9),
      updatedAt: Date.now()
    };
    saveAssets([...assets, newAsset]);
  };

  const updateAsset = (id: string, updates: Partial<MusicalAsset>) => {
    saveAssets(assets.map(a => a.id === id ? { ...a, ...updates, updatedAt: Date.now() } : a));
  };

  const deleteAsset = (id: string) => {
    saveAssets(assets.filter(a => a.id !== id));
  };

  return { assets, role, isLoaded, login, logout, addAsset, updateAsset, deleteAsset };
};