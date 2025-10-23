import mongoose, { Document, Schema } from 'mongoose';

export interface IComment extends Document {
  artistId: mongoose.Types.ObjectId;
  userId: mongoose.Types.ObjectId;
  userName: string;
  content: string;
  type: 'question' | 'request' | 'song_request' | 'general';
  replies: mongoose.Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}

const CommentSchema = new Schema<IComment>({
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
  userName: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true,
    maxlength: 1000
  },
  type: {
    type: String,
    enum: ['question', 'request', 'song_request', 'general'],
    default: 'general'
  },
  replies: [{
    type: Schema.Types.ObjectId,
    ref: 'Comment'
  }]
}, {
  timestamps: true
});

export default mongoose.model<IComment>('Comment', CommentSchema);

