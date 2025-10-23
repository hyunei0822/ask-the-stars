import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Upload, Image, Pin, Type, Calendar, Megaphone } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Post } from '../types';

const CreatePost: React.FC = () => {
  const [formData, setFormData] = useState<Partial<Post>>({
    title: '',
    content: '',
    type: 'general',
    isPinned: false
  });

  const [images, setImages] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newImages = Array.from(e.target.files);
      setImages(prev => [...prev, ...newImages]);
      
      // 이미지 미리보기 생성
      const newPreviews = newImages.map(file => URL.createObjectURL(file));
      setImagePreviews(prev => [...prev, ...newPreviews]);
    }
  };

  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));
    setImagePreviews(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: API 호출로 게시글 생성
    console.log('Creating post:', formData);
    console.log('Images:', images);
  };

  const getPostTypeIcon = (type: string) => {
    switch (type) {
      case 'announcement': return '📢';
      case 'update': return '📝';
      case 'performance': return '🎭';
      default: return '📄';
    }
  };

  return (
    <div className="min-h-screen">
      {/* 헤더 */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <Link
          to="/mypage"
          className="inline-flex items-center space-x-2 text-gray-300 hover:text-white transition-colors mb-6"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>뒤로가기</span>
        </Link>

        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
            <Type className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-white">게시글 작성</h1>
            <p className="text-gray-300">팬들과 소통할 게시글을 작성해보세요</p>
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* 폼 */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="lg:col-span-2"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* 기본 정보 */}
            <div className="glass-effect rounded-xl p-6">
              <h2 className="text-xl font-bold text-white mb-4">기본 정보</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    제목 *
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-400"
                    placeholder="게시글 제목을 입력하세요"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    내용 *
                  </label>
                  <textarea
                    name="content"
                    value={formData.content}
                    onChange={handleInputChange}
                    rows={8}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-400"
                    placeholder="팬들과 공유하고 싶은 내용을 작성해주세요..."
                    required
                  />
                </div>
              </div>
            </div>

            {/* 게시글 타입 및 설정 */}
            <div className="glass-effect rounded-xl p-6">
              <h2 className="text-xl font-bold text-white mb-4">게시글 설정</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-3">
                    게시글 타입
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { value: 'general', label: '일반', icon: '📄' },
                      { value: 'announcement', label: '공지사항', icon: '📢' },
                      { value: 'update', label: '업데이트', icon: '📝' },
                      { value: 'performance', label: '공연', icon: '🎭' }
                    ].map((type) => (
                      <button
                        key={type.value}
                        type="button"
                        onClick={() => setFormData(prev => ({ ...prev, type: type.value as any }))}
                        className={`p-4 rounded-lg border-2 transition-all duration-200 ${
                          formData.type === type.value
                            ? 'border-purple-400 bg-purple-500/20'
                            : 'border-white/20 bg-white/5 hover:border-white/40'
                        }`}
                      >
                        <div className="text-center">
                          <div className="text-2xl mb-2">{type.icon}</div>
                          <div className="text-sm font-medium text-white">{type.label}</div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    id="isPinned"
                    name="isPinned"
                    checked={formData.isPinned}
                    onChange={handleInputChange}
                    className="w-4 h-4 text-purple-600 bg-white/10 border-white/20 rounded focus:ring-purple-500 focus:ring-2"
                  />
                  <label htmlFor="isPinned" className="flex items-center space-x-2 text-gray-300">
                    <Pin className="w-4 h-4" />
                    <span>상단 고정</span>
                  </label>
                </div>
              </div>
            </div>

            {/* 이미지 업로드 */}
            <div className="glass-effect rounded-xl p-6">
              <h2 className="text-xl font-bold text-white mb-4">이미지 첨부</h2>
              
              <div className="space-y-4">
                <div>
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleImageChange}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-purple-400"
                  />
                  <p className="text-sm text-gray-400 mt-2">
                    최대 10장까지 업로드 가능합니다
                  </p>
                </div>

                {/* 이미지 미리보기 */}
                {imagePreviews.length > 0 && (
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {imagePreviews.map((preview, index) => (
                      <div key={index} className="relative group">
                        <img
                          src={preview}
                          alt={`미리보기 ${index + 1}`}
                          className="w-full h-32 object-cover rounded-lg"
                        />
                        <button
                          type="button"
                          onClick={() => removeImage(index)}
                          className="absolute top-2 right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* 제출 버튼 */}
            <div className="flex justify-end space-x-4">
              <Link
                to="/mypage"
                className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
              >
                취소
              </Link>
              <button
                type="submit"
                className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg hover:from-blue-600 hover:to-purple-600 transition-all duration-300 transform hover:scale-105"
              >
                게시글 발행하기
              </button>
            </div>
          </form>
        </motion.div>

        {/* 미리보기 */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="lg:col-span-1"
        >
          <div className="glass-effect rounded-xl p-6 sticky top-6">
            <h3 className="text-lg font-bold text-white mb-4">미리보기</h3>
            
            <div className="space-y-4">
              {/* 아티스트 정보 */}
              <div className="flex items-center space-x-3 p-4 bg-white/5 rounded-lg">
                <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-white/20">
                  <img
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face"
                    alt="프로필"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <h4 className="font-bold text-white text-sm">배현이</h4>
                    <div className="flex items-center space-x-1 bg-gradient-to-r from-star-400 to-star-600 text-white px-2 py-1 rounded-full text-xs">
                      <span>⭐</span>
                      <span>아티스트</span>
                    </div>
                  </div>
                  <p className="text-xs text-gray-400">방금 전</p>
                </div>
              </div>

              {/* 게시글 내용 */}
              <div>
                <h5 className="font-bold text-white mb-2">
                  {formData.title || '게시글 제목'}
                </h5>
                <p className="text-gray-300 text-sm leading-relaxed">
                  {formData.content || '게시글 내용이 여기에 표시됩니다.'}
                </p>
              </div>

              {/* 게시글 타입 표시 */}
              {formData.type && (
                <div className="flex items-center space-x-2">
                  <span className="text-lg">{getPostTypeIcon(formData.type)}</span>
                  <span className="text-sm text-gray-400">
                    {formData.type === 'general' && '일반'}
                    {formData.type === 'announcement' && '공지사항'}
                    {formData.type === 'update' && '업데이트'}
                    {formData.type === 'performance' && '공연'}
                  </span>
                  {formData.isPinned && (
                    <div className="flex items-center space-x-1 bg-purple-500/20 text-purple-300 px-2 py-1 rounded-full text-xs">
                      <Pin className="w-3 h-3" />
                      <span>고정</span>
                    </div>
                  )}
                </div>
              )}

              {/* 이미지 미리보기 */}
              {imagePreviews.length > 0 && (
                <div className="grid grid-cols-2 gap-2">
                  {imagePreviews.slice(0, 4).map((preview, index) => (
                    <img
                      key={index}
                      src={preview}
                      alt={`미리보기 ${index + 1}`}
                      className="w-full h-20 object-cover rounded"
                    />
                  ))}
                </div>
              )}

              {/* 액션 버튼들 */}
              <div className="flex items-center justify-between pt-4 border-t border-white/10">
                <div className="flex items-center space-x-4">
                  <button className="flex items-center space-x-1 text-gray-400 hover:text-red-400 transition-colors">
                    <span>❤️</span>
                    <span className="text-sm">0</span>
                  </button>
                  <button className="flex items-center space-x-1 text-gray-400 hover:text-blue-400 transition-colors">
                    <span>💬</span>
                    <span className="text-sm">0</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default CreatePost;
