import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, MessageCircle, Music, Heart, User } from 'lucide-react';
import { Comment } from '../types';

interface CommentSectionProps {
  comments: Comment[];
  onAddComment: (content: string, type: Comment['type']) => void;
}

const CommentSection: React.FC<CommentSectionProps> = ({ comments, onAddComment }) => {
  const [newComment, setNewComment] = useState('');
  const [commentType, setCommentType] = useState<Comment['type']>('general');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newComment.trim()) {
      onAddComment(newComment.trim(), commentType);
      setNewComment('');
    }
  };

  const getCommentIcon = (type: Comment['type']) => {
    switch (type) {
      case 'question': return <MessageCircle className="w-4 h-4" />;
      case 'request': return <Heart className="w-4 h-4" />;
      case 'song_request': return <Music className="w-4 h-4" />;
      default: return <MessageCircle className="w-4 h-4" />;
    }
  };

  const getCommentTypeLabel = (type: Comment['type']) => {
    switch (type) {
      case 'question': return '질문';
      case 'request': return '요청';
      case 'song_request': return '신청곡';
      default: return '일반';
    }
  };

  return (
    <div className="space-y-6">
      {/* 댓글 작성 */}
      <div className="glass-effect rounded-xl p-6">
        <h3 className="text-lg font-bold text-white mb-4">소통방 / 참여방</h3>
        
        {/* 댓글 타입 선택 */}
        <div className="flex space-x-2 mb-4">
          {(['general', 'question', 'request', 'song_request'] as const).map((type) => (
            <button
              key={type}
              onClick={() => setCommentType(type)}
              className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm transition-all ${
                commentType === type
                  ? 'bg-purple-500/30 text-white border border-purple-400/50'
                  : 'bg-white/10 text-gray-300 hover:bg-white/20'
              }`}
            >
              {getCommentIcon(type)}
              <span>{getCommentTypeLabel(type)}</span>
            </button>
          ))}
        </div>

        {/* 댓글 입력 */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder={`${getCommentTypeLabel(commentType)}을 남겨보세요...`}
            className="w-full p-4 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 resize-none h-24"
          />
          <div className="flex justify-end">
            <button
              type="submit"
              className="flex items-center space-x-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-2 rounded-lg font-medium hover:from-purple-600 hover:to-pink-600 transition-all duration-300"
            >
              <Send className="w-4 h-4" />
              <span>전송</span>
            </button>
          </div>
        </form>
      </div>

      {/* 댓글 목록 */}
      <div className="space-y-4">
        <h4 className="text-lg font-bold text-white">댓글 ({comments.length})</h4>
        
        {comments.length === 0 ? (
          <div className="text-center py-8 text-gray-400">
            <MessageCircle className="w-12 h-12 mx-auto mb-3 opacity-50" />
            <p>아직 댓글이 없어요. 첫 번째 댓글을 남겨보세요!</p>
          </div>
        ) : (
          <div className="space-y-4">
            {comments.map((comment, index) => (
              <motion.div
                key={comment.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="glass-effect rounded-lg p-4"
              >
                <div className="flex items-start space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                    <User className="w-5 h-5 text-white" />
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <span className="font-medium text-white">{comment.userName}</span>
                      <div className="flex items-center space-x-1 text-xs text-gray-400">
                        {getCommentIcon(comment.type)}
                        <span>{getCommentTypeLabel(comment.type)}</span>
                      </div>
                      <span className="text-xs text-gray-500">{comment.date}</span>
                    </div>
                    
                    <p className="text-gray-300">{comment.content}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CommentSection;
