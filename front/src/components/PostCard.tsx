import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, MessageCircle, Pin, Star, Calendar } from 'lucide-react';
import { Post } from '../types';

interface PostCardProps {
  post: Post;
  artistName: string;
  artistProfileImage: string;
  isArtistVerified?: boolean;
}

const PostCard: React.FC<PostCardProps> = ({ 
  post, 
  artistName, 
  artistProfileImage, 
  isArtistVerified = true 
}) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return '방금 전';
    if (diffInHours < 24) return `${diffInHours}시간 전`;
    if (diffInHours < 168) return `${Math.floor(diffInHours / 24)}일 전`;
    return date.toLocaleDateString('ko-KR');
  };

  const getPostTypeIcon = (type: Post['type']) => {
    switch (type) {
      case 'announcement': return '📢';
      case 'update': return '📝';
      case 'performance': return '🎭';
      default: return '📄';
    }
  };

  const getPostTypeColor = (type: Post['type']) => {
    switch (type) {
      case 'announcement': return 'bg-red-500/20 text-red-300 border-red-500/30';
      case 'update': return 'bg-blue-500/20 text-blue-300 border-blue-500/30';
      case 'performance': return 'bg-purple-500/20 text-purple-300 border-purple-500/30';
      default: return 'bg-gray-500/20 text-gray-300 border-gray-500/30';
    }
  };

  return (
    <div className="glass-effect rounded-xl p-6 card-hover">
      {/* 헤더 */}
      <div className="flex items-start space-x-3 mb-4">
        <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white/20">
          <img
            src={artistProfileImage}
            alt={artistName}
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-1">
            <h3 className="font-bold text-white">{artistName}</h3>
            {isArtistVerified && (
              <div className="flex items-center space-x-1 bg-gradient-to-r from-star-400 to-star-600 text-white px-2 py-1 rounded-full text-xs">
                <Star className="w-3 h-3 fill-current" />
                <span>아티스트 인증</span>
              </div>
            )}
            {post.isPinned && (
              <div className="flex items-center space-x-1 bg-purple-500/20 text-purple-300 px-2 py-1 rounded-full text-xs">
                <Pin className="w-3 h-3" />
                <span>고정</span>
              </div>
            )}
          </div>
          
          <div className="flex items-center space-x-2 text-sm text-gray-400">
            <span>{formatDate(post.createdAt)}</span>
            <span>•</span>
            <div className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs border ${getPostTypeColor(post.type)}`}>
              <span>{getPostTypeIcon(post.type)}</span>
              <span>
                {post.type === 'announcement' && '공지사항'}
                {post.type === 'update' && '업데이트'}
                {post.type === 'performance' && '공연'}
                {post.type === 'general' && '일반'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 제목 */}
      <h2 className="text-xl font-bold text-white mb-3">
        {post.title}
      </h2>

      {/* 내용 */}
      <div className="text-gray-300 mb-4 leading-relaxed">
        <p className="line-clamp-3">{post.content}</p>
      </div>

      {/* 이미지 */}
      {post.images && post.images.length > 0 && (
        <div className="mb-4">
          <div className="grid grid-cols-2 gap-2 rounded-lg overflow-hidden">
            {post.images.slice(0, 4).map((image, index) => (
              <div key={index} className="aspect-square">
                <img
                  src={image}
                  alt={`${post.title} 이미지 ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
          {post.images.length > 4 && (
            <div className="text-center mt-2">
              <span className="text-sm text-gray-400">
                +{post.images.length - 4}개 이미지 더 보기
              </span>
            </div>
          )}
        </div>
      )}

      {/* 액션 버튼들 */}
      <div className="flex items-center justify-between pt-4 border-t border-white/10">
        <div className="flex items-center space-x-6">
          <button className="flex items-center space-x-2 text-gray-400 hover:text-red-400 transition-colors">
            <Heart className="w-5 h-5" />
            <span className="text-sm">{post.likes}</span>
          </button>
          
          <button className="flex items-center space-x-2 text-gray-400 hover:text-blue-400 transition-colors">
            <MessageCircle className="w-5 h-5" />
            <span className="text-sm">{post.comments}</span>
          </button>
        </div>

        <Link
          to={`/post/${post.id}`}
          className="text-purple-400 hover:text-purple-300 text-sm font-medium transition-colors"
        >
          자세히 보기
        </Link>
      </div>
    </div>
  );
};

export default PostCard;
