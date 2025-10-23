import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Star, Menu, X } from 'lucide-react';

const MobileHeader: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      {/* 모바일 헤더 */}
      <div className="lg:hidden fixed top-0 left-0 right-0 glass-effect border-b border-white/20 z-50">
        <div className="flex items-center justify-between p-4">
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-star-400 to-star-600 rounded-full flex items-center justify-center star-glow">
              <Star className="w-5 h-5 text-white" />
            </div>
            <span className="text-lg font-bold text-white">별들에게 물어봐</span>
          </Link>
          
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-white p-2"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* 모바일 메뉴 */}
      {isMenuOpen && (
        <div className="lg:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-40">
          <div className="absolute top-0 right-0 w-80 h-full glass-effect border-l border-white/20">
            <div className="p-6">
              <div className="flex items-center space-x-3 mb-8">
                <div className="w-10 h-10 bg-gradient-to-r from-star-400 to-star-600 rounded-full flex items-center justify-center star-glow">
                  <Star className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-white">별들에게 물어봐</h1>
                  <p className="text-xs text-gray-300">길거리 예술가 후원 플랫폼</p>
                </div>
              </div>

              <div className="space-y-4">
                <Link
                  to="/"
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-300 hover:bg-white/10 hover:text-white transition-all duration-200"
                >
                  <Star className="w-5 h-5" />
                  <span className="font-medium">전체 아티스트</span>
                </Link>
                
                <Link
                  to="/mypage"
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-300 hover:bg-white/10 hover:text-white transition-all duration-200"
                >
                  <span className="font-medium">마이페이지</span>
                </Link>
                
                <Link
                  to="/login"
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-300 hover:bg-white/10 hover:text-white transition-all duration-200"
                >
                  <span className="font-medium">로그인</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MobileHeader;
