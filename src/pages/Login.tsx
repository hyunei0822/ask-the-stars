import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Star, User, Music, Mail, Lock, Phone, Eye, EyeOff } from 'lucide-react';

interface LoginProps {
  setCurrentUser: (user: any) => void;
}

const Login: React.FC<LoginProps> = ({ setCurrentUser }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [userType, setUserType] = useState<'artist' | 'user'>('user');
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Mock 로그인/회원가입
    const mockUser = {
      id: '1',
      name: formData.name || '테스트 유저',
      email: formData.email,
      type: userType,
      profileImage: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face'
    };
    
    setCurrentUser(mockUser);
    alert(`${isLogin ? '로그인' : '회원가입'}이 완료되었습니다!`);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md"
      >
        {/* 로고 */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-gradient-to-r from-star-400 to-star-600 rounded-full flex items-center justify-center mx-auto mb-4 star-glow float-effect">
            <Star className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">별들에게 물어봐</h1>
          <p className="text-gray-300">길거리 예술가 후원 플랫폼</p>
        </div>

        {/* 로그인/회원가입 탭 */}
        <div className="glass-effect rounded-xl p-6">
          <div className="flex space-x-1 mb-6 bg-white/10 rounded-lg p-1">
            <button
              onClick={() => setIsLogin(true)}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${
                isLogin
                  ? 'bg-white text-gray-900'
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              로그인
            </button>
            <button
              onClick={() => setIsLogin(false)}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${
                !isLogin
                  ? 'bg-white text-gray-900'
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              회원가입
            </button>
          </div>

          {/* 사용자 타입 선택 (회원가입시만) */}
          {!isLogin && (
            <div className="mb-6">
              <label className="block text-sm font-medium text-white mb-3">
                회원 유형
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => setUserType('user')}
                  className={`flex items-center space-x-3 p-4 rounded-lg border transition-all ${
                    userType === 'user'
                      ? 'border-purple-400 bg-purple-500/20 text-white'
                      : 'border-white/20 text-gray-300 hover:border-white/40'
                  }`}
                >
                  <User className="w-5 h-5" />
                  <div className="text-left">
                    <div className="font-medium">일반 유저</div>
                    <div className="text-xs opacity-75">후원자</div>
                  </div>
                </button>
                
                <button
                  onClick={() => setUserType('artist')}
                  className={`flex items-center space-x-3 p-4 rounded-lg border transition-all ${
                    userType === 'artist'
                      ? 'border-purple-400 bg-purple-500/20 text-white'
                      : 'border-white/20 text-gray-300 hover:border-white/40'
                  }`}
                >
                  <Music className="w-5 h-5" />
                  <div className="text-left">
                    <div className="font-medium">아티스트</div>
                    <div className="text-xs opacity-75">예술가</div>
                  </div>
                </button>
              </div>
            </div>
          )}

          {/* 폼 */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  이름
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required={!isLogin}
                  className="w-full p-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:border-purple-400 focus:outline-none"
                  placeholder="이름을 입력하세요"
                />
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-white mb-2">
                이메일
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full p-3 pl-10 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:border-purple-400 focus:outline-none"
                  placeholder="이메일을 입력하세요"
                />
              </div>
            </div>

            {!isLogin && (
              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  전화번호
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required={!isLogin}
                    className="w-full p-3 pl-10 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:border-purple-400 focus:outline-none"
                    placeholder="전화번호를 입력하세요"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-white mb-2">
                비밀번호
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                  className="w-full p-3 pl-10 pr-10 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:border-purple-400 focus:outline-none"
                  placeholder="비밀번호를 입력하세요"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {!isLogin && (
              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  비밀번호 확인
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    required={!isLogin}
                    className="w-full p-3 pl-10 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:border-purple-400 focus:outline-none"
                    placeholder="비밀번호를 다시 입력하세요"
                  />
                </div>
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 rounded-lg font-medium hover:from-purple-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105"
            >
              {isLogin ? '로그인' : '회원가입'}
            </button>
          </form>

          {/* 소셜 로그인 */}
          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/20" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-slate-900 text-gray-400">또는</span>
              </div>
            </div>

            <div className="mt-6">
              <button className="w-full flex items-center justify-center space-x-3 bg-white text-gray-900 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors">
                <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs font-bold">N</span>
                </div>
                <span>네이버로 {isLogin ? '로그인' : '회원가입'}</span>
              </button>
            </div>
          </div>

          {/* 홈으로 돌아가기 */}
          <div className="mt-6 text-center">
            <Link
              to="/"
              className="text-gray-400 hover:text-white transition-colors text-sm"
            >
              홈으로 돌아가기
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
