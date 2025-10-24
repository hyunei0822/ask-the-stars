import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  User, 
  Heart, 
  Star, 
  Calendar, 
  Settings,
  LogOut,
  Crown,
  Gift,
  Plus,
  Package,
  MessageCircle,
  BarChart3,
  Edit
} from 'lucide-react';
import { mockArtists } from '../data/mockData';
import { User as UserType, Donation } from '../types';
import { removeToken } from '../services/api';

interface MyPageProps {
  currentUser: UserType | null;
  setCurrentUser: (user: UserType | null) => void;
}

const MyPage: React.FC<MyPageProps> = ({ currentUser, setCurrentUser }) => {
  // 로그아웃 함수
  const handleLogout = () => {
    removeToken();
    setCurrentUser(null);
    alert('로그아웃되었습니다.');
  };

  // Mock 데이터
  const subscribedArtists = mockArtists.slice(0, 2);
  const donations: Donation[] = [
    {
      id: '1',
      artistId: '1',
      amount: 50000,
      type: 'subscription',
      date: '2024-01-20',
      status: 'completed'
    },
    {
      id: '2',
      artistId: '2',
      amount: 25000,
      type: 'good',
      goodId: 'g2',
      date: '2024-01-18',
      status: 'completed'
    }
  ];

  if (!currentUser) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <User className="w-8 h-8 text-purple-400" />
          </div>
          <h2 className="text-xl font-bold text-white mb-4">로그인이 필요해요</h2>
          <Link
            to="/login"
            className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-lg font-medium hover:from-purple-600 hover:to-pink-600 transition-all duration-300"
          >
            로그인하기
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* 프로필 헤더 */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="glass-effect rounded-xl p-6 mb-8"
      >
        <div className="flex items-center space-x-6">
          <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-white/20">
            <img
              src={currentUser.profileImage || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face'}
              alt={currentUser.name}
              className="w-full h-full object-cover"
            />
          </div>
          
          <div className="flex-1">
            <div className="flex items-center space-x-3 mb-2">
              <h1 className="text-2xl font-bold text-white">{currentUser.name}</h1>
              {currentUser.type === 'artist' && (
                <div className="flex items-center space-x-1 bg-gradient-to-r from-star-400 to-star-600 px-3 py-1 rounded-full">
                  <Crown className="w-4 h-4 text-white" />
                  <span className="text-white text-sm font-medium">아티스트</span>
                </div>
              )}
            </div>
            <p className="text-gray-300">{currentUser.email}</p>
          </div>

          <div className="flex space-x-3">
            <Link
              to="/settings"
              className="flex items-center space-x-2 bg-white/10 text-white px-4 py-2 rounded-lg hover:bg-white/20 transition-colors"
            >
              <Settings className="w-4 h-4" />
              <span>설정</span>
            </Link>
            <button 
              onClick={handleLogout}
              className="flex items-center space-x-2 bg-red-500/20 text-red-400 px-4 py-2 rounded-lg hover:bg-red-500/30 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span>로그아웃</span>
            </button>
          </div>
        </div>
      </motion.div>

      {/* 아티스트 전용 기능 */}
      {currentUser.type === 'artist' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="glass-effect rounded-xl p-6 mb-8"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-white">아티스트 관리</h2>
            <div className="flex space-x-3">
              <Link
                to="/create-service"
                className="flex items-center space-x-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-300"
              >
                <Plus className="w-4 h-4" />
                <span>상품 등록</span>
              </Link>
              <Link
                to="/create-post"
                className="flex items-center space-x-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
              >
                <Edit className="w-4 h-4" />
                <span>게시글 작성</span>
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="p-4 bg-white/5 rounded-lg text-center">
              <Package className="w-8 h-8 text-purple-400 mx-auto mb-2" />
              <div className="text-lg font-bold text-white">3</div>
              <div className="text-sm text-gray-400">등록 상품</div>
            </div>
            <div className="p-4 bg-white/5 rounded-lg text-center">
              <Calendar className="w-8 h-8 text-blue-400 mx-auto mb-2" />
              <div className="text-lg font-bold text-white">12</div>
              <div className="text-sm text-gray-400">예약 건수</div>
            </div>
            <div className="p-4 bg-white/5 rounded-lg text-center">
              <MessageCircle className="w-8 h-8 text-green-400 mx-auto mb-2" />
              <div className="text-lg font-bold text-white">5</div>
              <div className="text-sm text-gray-400">채팅 요청</div>
            </div>
            <div className="p-4 bg-white/5 rounded-lg text-center">
              <BarChart3 className="w-8 h-8 text-star-400 mx-auto mb-2" />
              <div className="text-lg font-bold text-white">₩2.5M</div>
              <div className="text-sm text-gray-400">월 수익</div>
            </div>
          </div>
        </motion.div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* 구독한 아티스트 */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="glass-effect rounded-xl p-6"
        >
          <div className="flex items-center space-x-3 mb-6">
            <Heart className="w-6 h-6 text-red-500" />
            <h2 className="text-xl font-bold text-white">구독한 아티스트</h2>
            <span className="bg-purple-500/20 text-purple-300 px-2 py-1 rounded-full text-sm">
              {subscribedArtists.length}
            </span>
          </div>

          {subscribedArtists.length === 0 ? (
            <div className="text-center py-8 text-gray-400">
              <Heart className="w-12 h-12 mx-auto mb-3 opacity-50" />
              <p>아직 구독한 아티스트가 없어요</p>
              <Link
                to="/"
                className="text-purple-400 hover:text-purple-300 mt-2 inline-block"
              >
                아티스트 둘러보기
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {subscribedArtists.map((artist) => (
                <Link
                  key={artist.id}
                  to={`/artist/${artist.id}`}
                  className="flex items-center space-x-4 p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
                >
                  <div className="w-12 h-12 rounded-full overflow-hidden">
                    <img
                      src={artist.profileImage}
                      alt={artist.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-white">{artist.name}</h3>
                    <p className="text-sm text-gray-400">{artist.description}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-purple-300 font-medium">
                      {artist.subscriptionPrice?.toLocaleString()}원/월
                    </div>
                    <div className="text-xs text-gray-500">구독중</div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </motion.div>

        {/* 후원 내역 */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="glass-effect rounded-xl p-6"
        >
          <div className="flex items-center space-x-3 mb-6">
            <Gift className="w-6 h-6 text-star-500" />
            <h2 className="text-xl font-bold text-white">후원 내역</h2>
            <span className="bg-star-500/20 text-star-300 px-2 py-1 rounded-full text-sm">
              {donations.length}
            </span>
          </div>

          {donations.length === 0 ? (
            <div className="text-center py-8 text-gray-400">
              <Gift className="w-12 h-12 mx-auto mb-3 opacity-50" />
              <p>아직 후원 내역이 없어요</p>
              <Link
                to="/"
                className="text-purple-400 hover:text-purple-300 mt-2 inline-block"
              >
                아티스트 후원하기
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {donations.map((donation) => {
                const artist = mockArtists.find(a => a.id === donation.artistId);
                const good = artist?.goods?.find(g => g.id === donation.goodId);
                
                return (
                  <div
                    key={donation.id}
                    className="flex items-center space-x-4 p-4 rounded-lg bg-white/5"
                  >
                    <div className="w-12 h-12 rounded-full overflow-hidden">
                      <img
                        src={artist?.profileImage || ''}
                        alt={artist?.name || ''}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium text-white">{artist?.name}</h3>
                      <p className="text-sm text-gray-400">
                        {donation.type === 'subscription' && '월 구독'}
                        {donation.type === 'good' && good?.name}
                        {donation.type === 'direct' && '직접 후원'}
                      </p>
                      <div className="flex items-center space-x-2 text-xs text-gray-500">
                        <Calendar className="w-3 h-3" />
                        <span>{donation.date}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-star-400">
                        {donation.amount.toLocaleString()}원
                      </div>
                      <div className={`text-xs ${
                        donation.status === 'completed' ? 'text-green-400' : 'text-yellow-400'
                      }`}>
                        {donation.status === 'completed' ? '완료' : '대기중'}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </motion.div>
      </div>

      {/* 통계 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="mt-8"
      >
        <div className="glass-effect rounded-xl p-6">
          <h2 className="text-xl font-bold text-white mb-6">나의 활동 통계</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
                <Heart className="w-8 h-8 text-purple-400" />
              </div>
              <div className="text-2xl font-bold text-white">{subscribedArtists.length}</div>
              <div className="text-gray-400">구독 아티스트</div>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-star-500/20 to-yellow-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
                <Gift className="w-8 h-8 text-star-400" />
              </div>
              <div className="text-2xl font-bold text-white">{donations.length}</div>
              <div className="text-gray-400">후원 횟수</div>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
                <Star className="w-8 h-8 text-green-400" />
              </div>
              <div className="text-2xl font-bold text-white">
                {donations.reduce((sum, d) => sum + d.amount, 0).toLocaleString()}원
              </div>
              <div className="text-gray-400">총 후원 금액</div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default MyPage;
