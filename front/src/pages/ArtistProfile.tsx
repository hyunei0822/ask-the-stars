import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  MapPin, 
  Calendar, 
  Users, 
  Star, 
  Heart, 
  Play, 
  ArrowLeft,
  Youtube
} from 'lucide-react';
import { mockArtists } from '../data/mockData';
import { categories } from '../data/mockData';
import { Artist, Comment } from '../types';
import DonationModal from '../components/DonationModal';
import CommentSection from '../components/CommentSection';
import ChatRequestModal from '../components/ChatRequestModal';
import { artistAPI } from '../services/api';

const ArtistProfile: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [artist, setArtist] = useState<Artist | null>(null);
  const [isDonationModalOpen, setIsDonationModalOpen] = useState(false);
  const [isChatRequestModalOpen, setIsChatRequestModalOpen] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [comments, setComments] = useState<Comment[]>([]);

  useEffect(() => {
    const fetchArtist = async () => {
      if (!id) return;
      
      try {
        // 먼저 백엔드 API에서 아티스트를 가져오려고 시도
        const response = await artistAPI.getById(id);
        setArtist(response);
      } catch (error) {
        // 백엔드에서 찾지 못하면 목업 데이터에서 찾기
        const foundArtist = mockArtists.find(a => a.id === id || (a as any)._id === id);
        setArtist(foundArtist || null);
      }
      
      // Mock comments
      setComments([
        {
          id: '1',
          artistId: id || '',
          userId: 'user1',
          userName: '팬1',
          content: '정말 멋진 공연이었어요! 다음에 또 보고 싶습니다.',
          type: 'general',
          date: '2024-01-20'
        },
        {
          id: '2',
          artistId: id || '',
          userId: 'user2',
          userName: '음악애호가',
          content: '혹시 클래식 곡도 연주하시나요?',
          type: 'question',
          date: '2024-01-19'
        },
        {
          id: '3',
          artistId: id || '',
          userId: 'user3',
          userName: '댄스팬',
          content: 'BTS의 Dynamite 안무도 해주실 수 있나요?',
          type: 'song_request',
          date: '2024-01-18'
        }
      ]);
    };

    fetchArtist();
  }, [id]);

  const handleAddComment = (content: string, type: Comment['type']) => {
    const newComment: Comment = {
      id: Date.now().toString(),
      artistId: id || '',
      userId: 'currentUser',
      userName: '나',
      content,
      type,
      date: new Date().toLocaleDateString()
    };
    setComments(prev => [newComment, ...prev]);
  };

  if (!artist) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <Star className="w-8 h-8 text-purple-400" />
          </div>
          <h2 className="text-xl font-bold text-white mb-2">아티스트를 찾을 수 없어요</h2>
          <Link to="/" className="text-purple-400 hover:text-purple-300">
            홈으로 돌아가기
          </Link>
        </div>
      </div>
    );
  }

  const categoryInfo = categories[artist.category as keyof typeof categories];
  const subcategoryName = categoryInfo?.subcategories[artist.subcategory as keyof typeof categoryInfo.subcategories] || artist.subcategory;

  return (
    <div className="min-h-screen">
      {/* 뒤로가기 버튼 */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-6"
      >
        <Link
          to="/"
          className="inline-flex items-center space-x-2 text-gray-300 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>뒤로가기</span>
        </Link>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* 왼쪽: 프로필 정보 */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="lg:col-span-1"
        >
          <div className="glass-effect rounded-xl p-6 sticky top-6">
            {/* 프로필 이미지 */}
            <div className="text-center mb-8">
              <div className="relative inline-block">
                <div className="w-36 h-36 mx-auto rounded-full overflow-hidden border-4 border-gradient-to-r from-purple-400/30 to-pink-400/30 shadow-2xl profile-circle">
                  <img
                    src={artist.profileImage}
                    alt={artist.name}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                </div>
                {/* 프로필 이미지 주변 글로우 효과 */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-400/20 to-pink-400/20 blur-xl -z-10"></div>
              </div>
              
              <div className="mt-3 space-y-4">
                <h1 className="text-3xl font-bold tracking-tight profile-name-gradient">
                  {artist.name}
                </h1>
                
                <div className="flex items-center justify-center space-x-3">
                  <span className="text-2xl category-icon">{categoryInfo?.icon || '🎵'}</span>
                  <span className="text-purple-300 font-semibold text-lg">{subcategoryName}</span>
                </div>
                
                <div className="flex items-center justify-center space-x-2 rating-badge rounded-full px-4 py-2">
                  <Star className="w-5 h-5 text-yellow-400 fill-current" />
                  <span className="text-white font-medium">4.8</span>
                  <span className="text-gray-300 text-sm">(125 리뷰)</span>
                </div>
              </div>
            </div>

            {/* 기본 정보 */}
            <div className="space-y-4 mb-6">
              {/* 활동 장소 해시태그 */}
              <div className="space-y-2">
                <div className="flex items-center space-x-2 text-gray-300 mb-2">
                  <MapPin className="w-4 h-4" />
                  <span className="text-sm font-medium">주 활동 장소</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  <span className="hashtag">
                    #{artist.location}
                  </span>
                  {artist.locations?.map((location, index) => (
                    <span 
                      key={index} 
                      className={`hashtag ${
                        index % 3 === 0 ? 'hashtag-blue' : 
                        index % 3 === 1 ? 'hashtag-green' : ''
                      }`}
                    >
                      #{location}
                    </span>
                  )) || (
                    <>
                      <span className="hashtag hashtag-blue">
                        #강남구
                      </span>
                      <span className="hashtag hashtag-green">
                        #서울
                      </span>
                    </>
                  )}
                </div>
              </div>
              
              {artist.schedule && (
                <div className="flex items-center space-x-3 text-gray-300">
                  <Calendar className="w-5 h-5" />
                  <span>{artist.schedule}</span>
                </div>
              )}
              
              <div className="flex items-center space-x-3 text-gray-300">
                <Users className="w-5 h-5" />
                <span>{artist.followers.toLocaleString()}명 구독</span>
              </div>
            </div>

            {/* 설명 */}
            <p className="text-gray-300 mb-6 leading-relaxed">
              {artist.description}
            </p>

            {/* 액션 버튼들 */}
            <div className="space-y-3">
              <button
                onClick={() => setIsSubscribed(!isSubscribed)}
                className={`w-full flex items-center justify-center space-x-2 py-3 rounded-lg font-medium transition-all duration-300 ${
                  isSubscribed
                    ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white'
                    : 'bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600'
                }`}
              >
                <Heart className={`w-5 h-5 ${isSubscribed ? 'fill-current' : ''}`} />
                <span>{isSubscribed ? '구독중' : '구독하기'}</span>
              </button>
              
              <button
                onClick={() => setIsDonationModalOpen(true)}
                className="w-full bg-gradient-to-r from-star-400 to-star-600 text-white py-3 rounded-lg font-medium hover:from-star-500 hover:to-star-700 transition-all duration-300 transform hover:scale-105"
              >
                후원하기 ✨
              </button>
              
              <button
                onClick={() => setIsChatRequestModalOpen(true)}
                className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white py-3 rounded-lg font-medium hover:from-blue-600 hover:to-purple-600 transition-all duration-300 transform hover:scale-105"
              >
                1:1 채팅 💬
              </button>
            </div>
          </div>
        </motion.div>

        {/* 중앙: 소통방 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="lg:col-span-2"
        >
          <CommentSection
            comments={comments}
            onAddComment={handleAddComment}
          />
        </motion.div>
      </div>

      {/* 하단: 영상 목록 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="mt-12"
      >
        <div className="glass-effect rounded-xl p-6">
          <div className="flex items-center space-x-3 mb-6">
            <Youtube className="w-6 h-6 text-red-500" />
            <h3 className="text-xl font-bold text-white">영상 목록</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {artist.videos?.map((video) => (
              <div key={video.id} className="group cursor-pointer">
                <div className="relative rounded-lg overflow-hidden mb-3">
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-full h-40 object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Play className="w-12 h-12 text-white" />
                  </div>
                  <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                    {video.duration}
                  </div>
                </div>
                <h4 className="font-medium text-white mb-1 group-hover:text-purple-300 transition-colors">
                  {video.title}
                </h4>
                <div className="flex items-center justify-between text-sm text-gray-400">
                  <span>{video.views.toLocaleString()}회 조회</span>
                  <span>{video.uploadDate}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* 후원 모달 */}
      <DonationModal
        isOpen={isDonationModalOpen}
        onClose={() => setIsDonationModalOpen(false)}
        artist={artist}
      />

      {/* 채팅 요청 모달 */}
      <ChatRequestModal
        isOpen={isChatRequestModalOpen}
        onClose={() => setIsChatRequestModalOpen(false)}
        artist={artist}
        onRequestChat={(timeLimit, price) => {
          console.log('Chat request:', { timeLimit, price });
          // TODO: 채팅 요청 API 호출
        }}
      />
    </div>
  );
};

export default ArtistProfile;
