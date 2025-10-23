import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Calendar, Users, Star } from 'lucide-react';
import { Artist } from '../types';
import { categories } from '../data/mockData';

interface ArtistCardProps {
  artist: Artist;
}

const ArtistCard: React.FC<ArtistCardProps> = ({ artist }) => {
  const categoryInfo = categories[artist.category];
  const subcategoryName = categoryInfo.subcategories[artist.subcategory as keyof typeof categoryInfo.subcategories];

  return (
    <Link to={`/artist/${artist.id}`} className="block">
      <div className="glass-effect rounded-xl overflow-hidden card-hover group h-80 flex flex-col">
        {/* 커버 이미지 */}
        <div className="relative h-48 overflow-hidden">
          <img
            src={artist.coverImage || artist.profileImage}
            alt={artist.name}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          
          {/* 카테고리 배지 */}
          <div className="absolute top-3 left-3">
            <div className="flex items-center space-x-2 bg-black/50 backdrop-blur-sm rounded-full px-3 py-1">
              <span className="text-lg">{categoryInfo.icon}</span>
              <span className="text-white text-sm font-medium">{categoryInfo.name}</span>
            </div>
          </div>

          {/* 구독자 수 */}
          <div className="absolute top-3 right-3">
            <div className="flex items-center space-x-1 bg-black/50 backdrop-blur-sm rounded-full px-3 py-1">
              <Users className="w-4 h-4 text-white" />
              <span className="text-white text-sm font-medium">
                {artist.followers.toLocaleString()}
              </span>
            </div>
          </div>
        </div>

        {/* 프로필 이미지 - 카드 외부로 이동 */}
        <div className="relative -mt-8 ml-4 mb-4">
          <div className="w-16 h-16 rounded-full border-4 border-white overflow-hidden profile-circle">
            <img
              src={artist.profileImage}
              alt={artist.name}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* 아티스트 정보 */}
        <div className="p-4 pt-4 flex-1 flex flex-col justify-between">
          <div>
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="text-lg font-bold text-white mb-1">{artist.name}</h3>
                <p className="text-sm text-purple-300 font-medium">{subcategoryName}</p>
              </div>
              
              {/* 별점 */}
              <div className="flex items-center space-x-1">
                <Star className="w-4 h-4 text-star-400 fill-current" />
                <span className="text-sm text-gray-300">4.8</span>
              </div>
            </div>

            <p className="text-gray-300 text-sm mb-4 line-clamp-2">
              {artist.description}
            </p>

            {/* 위치 및 일정 */}
            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-gray-400">
                <MapPin className="w-4 h-4" />
                <span className="text-sm">{artist.location}</span>
              </div>
              
              {artist.schedule && (
                <div className="flex items-center space-x-2 text-gray-400">
                  <Calendar className="w-4 h-4" />
                  <span className="text-sm">{artist.schedule}</span>
                </div>
              )}
            </div>
          </div>

          {/* 후원 가격 */}
          {artist.subscriptionPrice && (
            <div className="mt-4 pt-4 border-t border-white/10">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-400">월 구독료</span>
                <span className="text-lg font-bold text-star-400">
                  {artist.subscriptionPrice.toLocaleString()}원
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
};

export default ArtistCard;
