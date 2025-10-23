import React, { useMemo, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import ArtistCard from '../components/ArtistCard';
import { artistAPI } from '../services/api';
import { Star, Sparkles } from 'lucide-react';

interface HomeProps {
  selectedCategory: string;
  selectedSubcategory: string;
}

const Home: React.FC<HomeProps> = ({ selectedCategory, selectedSubcategory }) => {
  const [artists, setArtists] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchArtists = async () => {
      try {
        setLoading(true);
        const response = await artistAPI.getAll({
          category: selectedCategory !== 'all' ? selectedCategory : undefined,
          subcategory: selectedSubcategory !== 'all' ? selectedSubcategory : undefined
        });
        setArtists(response.artists || []);
      } catch (error: any) {
        setError(error.message || '아티스트 목록을 불러오는데 실패했습니다.');
        // 에러 시 목업 데이터 사용
        const { mockArtists } = await import('../data/mockData');
        setArtists(mockArtists);
      } finally {
        setLoading(false);
      }
    };

    fetchArtists();
  }, [selectedCategory, selectedSubcategory]);

  const filteredArtists = useMemo(() => {
    return artists;
  }, [artists]);

  return (
    <div className="min-h-screen">
      {/* 헤더 */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-8"
      >
        <div className="flex items-center space-x-4 mb-4">
          <div className="w-12 h-12 bg-gradient-to-r from-star-400 to-star-600 rounded-full flex items-center justify-center star-glow float-effect">
            <Star className="w-7 h-7 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-white">
              별들에게 물어봐
            </h1>
            <p className="text-gray-300">
              길거리 예술가들과 함께하는 특별한 만남
            </p>
          </div>
        </div>

        {/* 검색 및 필터 정보 */}
        <div className="glass-effect rounded-lg p-4">
          <div className="flex items-center space-x-4">
            <Sparkles className="w-5 h-5 text-star-400" />
            <div>
              {selectedCategory === 'all' ? (
                <span className="text-white font-medium">전체 아티스트</span>
              ) : (
                <span className="text-white font-medium">
                  {selectedCategory === 'music' && '🎵 음악'}
                  {selectedCategory === 'dance' && '💃 댄스'}
                  {selectedCategory === 'art' && '🎨 아트'}
                  {selectedSubcategory !== 'all' && ` - ${selectedSubcategory}`}
                </span>
              )}
            </div>
            <div className="text-gray-400">
              총 {filteredArtists.length}명의 아티스트
            </div>
          </div>
        </div>
      </motion.div>

      {/* 로딩 상태 */}
      {loading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="text-center py-16"
        >
          <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-400">아티스트 목록을 불러오는 중...</p>
        </motion.div>
      )}

      {/* 에러 상태 */}
      {error && !loading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="text-center py-16"
        >
          <div className="w-24 h-24 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <Star className="w-12 h-12 text-red-400" />
          </div>
          <h3 className="text-xl font-bold text-white mb-2">오류가 발생했습니다</h3>
          <p className="text-gray-400 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-purple-500 text-white px-6 py-2 rounded-lg hover:bg-purple-600 transition-colors"
          >
            다시 시도
          </button>
        </motion.div>
      )}

      {/* 아티스트 그리드 */}
      {!loading && !error && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          {filteredArtists.map((artist, index) => (
            <motion.div
              key={artist._id || artist.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <ArtistCard artist={artist} />
            </motion.div>
          ))}
        </motion.div>
      )}

      {/* 빈 상태 */}
      {!loading && !error && filteredArtists.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="text-center py-16"
        >
          <div className="w-24 h-24 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <Star className="w-12 h-12 text-purple-400" />
          </div>
          <h3 className="text-xl font-bold text-white mb-2">
            아직 아티스트가 없어요
          </h3>
          <p className="text-gray-400">
            다른 카테고리를 선택해보세요!
          </p>
        </motion.div>
      )}

      {/* 하단 CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="mt-16 text-center"
      >
        <div className="glass-effect rounded-xl p-8">
          <h2 className="text-2xl font-bold text-white mb-4">
            당신도 아티스트가 되어보세요!
          </h2>
          <p className="text-gray-300 mb-6">
            길거리에서 예술을 선보이고, 팬들과 소통하며 수익을 창출해보세요.
          </p>
          <button className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-3 rounded-full font-medium hover:from-purple-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105">
            아티스트 등록하기
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default Home;
