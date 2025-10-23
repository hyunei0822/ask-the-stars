import mongoose, { Document, Schema } from 'mongoose';

export interface IVideo {
  title: string;
  thumbnail: string;
  url: string;
  duration: string;
  views: number;
  uploadDate: Date;
}

export interface IGood {
  name: string;
  price: number;
  image: string;
  description: string;
  stock: number;
}

export interface IArtist extends Document {
  name: string;
  category: 'music' | 'dance' | 'art';
  subcategory: string;
  profileImage: string;
  coverImage?: string;
  description: string;
  location: string;
  schedule?: string;
  followers: number;
  subscriptionPrice?: number;
  videos: IVideo[];
  goods: IGood[];
  userId: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const VideoSchema = new Schema<IVideo>({
  title: { type: String, required: true },
  thumbnail: { type: String, required: true },
  url: { type: String, required: true },
  duration: { type: String, required: true },
  views: { type: Number, default: 0 },
  uploadDate: { type: Date, default: Date.now }
});

const GoodSchema = new Schema<IGood>({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String, required: true },
  description: { type: String, required: true },
  stock: { type: Number, default: 0 }
});

const ArtistSchema = new Schema<IArtist>({
  name: {
    type: String,
    required: true,
    trim: true
  },
  category: {
    type: String,
    enum: ['music', 'dance', 'art'],
    required: true
  },
  subcategory: {
    type: String,
    required: true
  },
  profileImage: {
    type: String,
    required: true
  },
  coverImage: {
    type: String,
    default: ''
  },
  description: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  schedule: {
    type: String,
    default: ''
  },
  followers: {
    type: Number,
    default: 0
  },
  subscriptionPrice: {
    type: Number,
    default: 0
  },
  videos: [VideoSchema],
  goods: [GoodSchema],
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
});

export default mongoose.model<IArtist>('Artist', ArtistSchema);

