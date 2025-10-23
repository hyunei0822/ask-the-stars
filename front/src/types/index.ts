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
  locations?: string[]; // 주 활동 장소들 (해시태그용)
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

export interface ArtistService {
  id: string;
  artistId: string;
  title: string;
  description: string;
  price: number;
  category: string;
  tags: string[];
  thumbnail: string;
  images?: string[];
  location?: string;
  schedule?: string;
  duration?: string; // 서비스 소요 시간
  maxBookings?: number; // 최대 예약 수
  currentBookings: number; // 현재 예약 수
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Booking {
  id: string;
  serviceId: string;
  userId: string;
  artistId: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  bookingDate: string;
  message?: string;
  createdAt: string;
}

export interface Post {
  id: string;
  artistId: string;
  title: string;
  content: string;
  images?: string[];
  type: 'announcement' | 'update' | 'performance' | 'general';
  isPinned: boolean;
  likes: number;
  comments: number;
  createdAt: string;
  updatedAt: string;
}

export interface ChatRoom {
  id: string;
  userId: string;
  artistId: string;
  status: 'requested' | 'accepted' | 'active' | 'expired';
  timeLimit: number; // 분 단위
  timeUsed: number; // 사용된 시간 (분)
  price: number;
  createdAt: string;
  expiresAt?: string;
}

export interface ChatMessage {
  id: string;
  roomId: string;
  senderId: string;
  senderType: 'user' | 'artist';
  content: string;
  timestamp: string;
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
