export interface Artist {
  id?: string;
  _id?: string;
  name: string;
  category: 'music' | 'dance' | 'art' | 'fashion' | 'beauty' | 'performance' | 'brand' | 'fitness' | 'healing' | 'product';
  subcategory: string;
  profileImage: string;
  coverImage?: string;
  description: string;
  location: string;
  schedule?: string;
  followers: number;
  isSubscribed?: boolean;
  videos?: Video[];
  goods?: Good[];
  subscriptionPrice?: number;
}

export interface Video {
  id: string;
  title: string;
  thumbnail: string;
  url: string;
  duration: string;
  views: number;
  uploadDate: string;
}

export interface Good {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
  stock?: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  type: 'artist' | 'user';
  profileImage?: string;
  subscribedArtists?: string[];
  donations?: Donation[];
}

export interface Donation {
  id: string;
  artistId: string;
  amount: number;
  type: 'subscription' | 'good' | 'direct';
  goodId?: string;
  date: string;
  status: 'completed' | 'pending' | 'failed';
}

export interface Comment {
  id: string;
  artistId: string;
  userId: string;
  userName: string;
  content: string;
  type: 'question' | 'request' | 'song_request' | 'general';
  date: string;
  replies?: Comment[];
}

export type Category = 'music' | 'dance' | 'art' | 'fashion' | 'beauty' | 'performance' | 'brand' | 'fitness' | 'healing' | 'product';
export type MusicSubcategory = 'classical' | 'korean_traditional' | 'kpop' | 'korean_pop' | 'jazz' | 'rock' | 'acoustic';
export type DanceSubcategory = 'ballet' | 'breakdance' | 'traditional' | 'kpop_dance' | 'contemporary' | 'hiphop';
export type ArtSubcategory = 'portrait' | 'mural' | 'sculpture' | 'caricature' | 'digital_art' | 'street_art';
