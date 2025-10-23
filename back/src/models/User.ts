import mongoose, { Document, Schema } from 'mongoose';

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  type: 'artist' | 'user';
  profileImage?: string;
  subscribedArtists: string[];
  donations: string[];
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema<IUser>({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  type: {
    type: String,
    enum: ['artist', 'user'],
    default: 'user'
  },
  profileImage: {
    type: String,
    default: ''
  },
  subscribedArtists: [{
    type: Schema.Types.ObjectId,
    ref: 'Artist'
  }],
  donations: [{
    type: Schema.Types.ObjectId,
    ref: 'Donation'
  }]
}, {
  timestamps: true
});

export default mongoose.model<IUser>('User', UserSchema);

