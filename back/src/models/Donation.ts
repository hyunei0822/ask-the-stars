import mongoose, { Document, Schema } from 'mongoose';

export interface IDonation extends Document {
  artistId: mongoose.Types.ObjectId;
  userId: mongoose.Types.ObjectId;
  amount: number;
  type: 'subscription' | 'good' | 'direct';
  goodId?: mongoose.Types.ObjectId;
  status: 'completed' | 'pending' | 'failed';
  createdAt: Date;
  updatedAt: Date;
}

const DonationSchema = new Schema<IDonation>({
  artistId: {
    type: Schema.Types.ObjectId,
    ref: 'Artist',
    required: true
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  amount: {
    type: Number,
    required: true,
    min: 0
  },
  type: {
    type: String,
    enum: ['subscription', 'good', 'direct'],
    required: true
  },
  goodId: {
    type: Schema.Types.ObjectId,
    ref: 'Artist.goods'
  },
  status: {
    type: String,
    enum: ['completed', 'pending', 'failed'],
    default: 'pending'
  }
}, {
  timestamps: true
});

export default mongoose.model<IDonation>('Donation', DonationSchema);

