import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Star, Music, Zap, Palette, User, Heart } from 'lucide-react';
import { categories } from '../data/mockData';

interface SidebarProps {
  selectedCategory: string;
  selectedSubcategory: string;
  onCategoryChange: (category: string) => void;
  onSubcategoryChange: (subcategory: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  selectedCategory,
  selectedSubcategory,
  onCategoryChange,
  onSubcategoryChange
}) => {
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);

  const handleCategoryClick = (categoryKey: string) => {
    if (expandedCategory === categoryKey) {
      setExpandedCategory(null);
      onCategoryChange('all');
      onSubcategoryChange('all');
    } else {
      setExpandedCategory(categoryKey);
      onCategoryChange(categoryKey);
      onSubcategoryChange('all');
    }
  };

  const handleSubcategoryClick = (subcategoryKey: string) => {
    onSubcategoryChange(subcategoryKey);
  };

  const getCategoryIcon = (categoryKey: string) => {
    switch (categoryKey) {
      case 'music': return <Music className="w-5 h-5" />;
      case 'dance': return <Zap className="w-5 h-5" />;
      case 'art': return <Palette className="w-5 h-5" />;
      default: return <Star className="w-5 h-5" />;
    }
  };

  return (
    <div className="fixed left-0 top-0 h-full w-64 glass-effect border-r border-white/20 z-50 hidden lg:block">
      {/* 로고 */}
      <div className="p-6 border-b border-white/20">
        <Link to="/" className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-r from-star-400 to-star-600 rounded-full flex items-center justify-center star-glow">
            <Star className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white">별들에게 물어봐</h1>
            <p className="text-xs text-gray-300">길거리 예술가 후원 플랫폼</p>
          </div>
        </Link>
      </div>

      {/* 메뉴 */}
      <div className="p-4 space-y-2">
        {/* 전체 아티스트 */}
        <button
          onClick={() => {
            onCategoryChange('all');
            onSubcategoryChange('all');
            setExpandedCategory(null);
          }}
          className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
            selectedCategory === 'all' 
              ? 'bg-purple-500/30 text-white border border-purple-400/50' 
              : 'text-gray-300 hover:bg-white/10 hover:text-white'
          }`}
        >
          <Star className="w-5 h-5" />
          <span className="font-medium">전체 아티스트</span>
        </button>

        {/* 카테고리별 메뉴 */}
        {Object.entries(categories).map(([categoryKey, category]) => (
          <div key={categoryKey}>
            <button
              onClick={() => handleCategoryClick(categoryKey)}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-lg transition-all duration-200 ${
                selectedCategory === categoryKey 
                  ? 'bg-purple-500/30 text-white border border-purple-400/50' 
                  : 'text-gray-300 hover:bg-white/10 hover:text-white'
              }`}
            >
              <div className="flex items-center space-x-3">
                {getCategoryIcon(categoryKey)}
                <span className="font-medium">{category.name}</span>
              </div>
              <span className="text-lg">{category.icon}</span>
            </button>

            {/* 서브카테고리 */}
            {expandedCategory === categoryKey && (
              <div className="ml-8 mt-2 space-y-1">
                {Object.entries(category.subcategories).map(([subKey, subName]) => (
                  <button
                    key={subKey}
                    onClick={() => handleSubcategoryClick(subKey)}
                    className={`w-full text-left px-4 py-2 rounded-lg text-sm transition-all duration-200 ${
                      selectedSubcategory === subKey
                        ? 'bg-purple-400/20 text-purple-300 border-l-2 border-purple-400'
                        : 'text-gray-400 hover:bg-white/5 hover:text-gray-300'
                    }`}
                  >
                    {subName}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* 하단 메뉴 */}
      <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-white/20">
        <div className="space-y-2">
          <Link
            to="/mypage"
            className="flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-300 hover:bg-white/10 hover:text-white transition-all duration-200"
          >
            <User className="w-5 h-5" />
            <span className="font-medium">마이페이지</span>
          </Link>
          
          <Link
            to="/login"
            className="flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-300 hover:bg-white/10 hover:text-white transition-all duration-200"
          >
            <Heart className="w-5 h-5" />
            <span className="font-medium">로그인</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
