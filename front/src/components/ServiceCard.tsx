import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Calendar, Clock, Users, Star, Tag } from 'lucide-react';
import { ArtistService } from '../types';

interface ServiceCardProps {
  service: ArtistService;
  artistName: string;
  artistProfileImage: string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ service, artistName, artistProfileImage }) => {
  const isAvailable = service.currentBookings < (service.maxBookings || 1);

  return (
    <div className="glass-effect rounded-xl overflow-hidden card-hover group">
      {/* 썸네일 */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={service.thumbnail}
          alt={service.title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        
        {/* 가용성 배지 */}
        <div className="absolute top-3 left-3">
          <div className={`flex items-center space-x-2 backdrop-blur-sm rounded-full px-3 py-1 ${
            isAvailable 
              ? 'bg-green-500/80 text-white' 
              : 'bg-red-500/80 text-white'
          }`}>
            <Users className="w-4 h-4" />
            <span className="text-sm font-medium">
              {isAvailable ? '예약 가능' : '예약 마감'}
            </span>
          </div>
        </div>

        {/* 가격 */}
        <div className="absolute top-3 right-3">
          <div className="bg-black/50 backdrop-blur-sm rounded-full px-3 py-1">
            <span className="text-white text-sm font-medium">
              {service.price.toLocaleString()}원
            </span>
          </div>
        </div>
      </div>

      {/* 아티스트 프로필 */}
      <div className="relative -mt-8 ml-4 mb-4">
        <div className="w-16 h-16 rounded-full border-4 border-white overflow-hidden profile-circle">
          <img
            src={artistProfileImage}
            alt={artistName}
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* 서비스 정보 */}
      <div className="p-4 pt-4">
        <div className="mb-3">
          <h3 className="text-lg font-bold text-white mb-1">{service.title}</h3>
          <p className="text-sm text-purple-300 font-medium">{artistName}</p>
        </div>

        <p className="text-gray-300 text-sm mb-4 line-clamp-2">
          {service.description}
        </p>

        {/* 태그 */}
        {service.tags && service.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-4">
            {service.tags.slice(0, 3).map((tag, index) => (
              <span
                key={index}
                className="inline-flex items-center space-x-1 px-2 py-1 bg-purple-500/20 text-purple-300 rounded text-xs"
              >
                <Tag className="w-3 h-3" />
                <span>{tag}</span>
              </span>
            ))}
            {service.tags.length > 3 && (
              <span className="text-xs text-gray-400">
                +{service.tags.length - 3}개 더
              </span>
            )}
          </div>
        )}

        {/* 일정 및 장소 정보 */}
        <div className="space-y-2 mb-4">
          {service.schedule && (
            <div className="flex items-center space-x-2 text-gray-400">
              <Calendar className="w-4 h-4" />
              <span className="text-sm">{service.schedule}</span>
            </div>
          )}
          
          {service.duration && (
            <div className="flex items-center space-x-2 text-gray-400">
              <Clock className="w-4 h-4" />
              <span className="text-sm">{service.duration}</span>
            </div>
          )}
          
          {service.location && (
            <div className="flex items-center space-x-2 text-gray-400">
              <MapPin className="w-4 h-4" />
              <span className="text-sm">{service.location}</span>
            </div>
          )}
        </div>

        {/* 예약 현황 */}
        <div className="mb-4">
          <div className="flex items-center justify-between text-sm text-gray-400 mb-2">
            <span>예약 현황</span>
            <span>{service.currentBookings}/{service.maxBookings || 1}</span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all duration-300"
              style={{
                width: `${((service.currentBookings / (service.maxBookings || 1)) * 100)}%`
              }}
            />
          </div>
        </div>

        {/* 액션 버튼 */}
        <div className="flex space-x-2">
          <Link
            to={`/service/${service.id}`}
            className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white py-2 px-4 rounded-lg text-center text-sm font-medium hover:from-purple-600 hover:to-pink-600 transition-all duration-300"
          >
            자세히 보기
          </Link>
          <button
            disabled={!isAvailable}
            className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all duration-300 ${
              isAvailable
                ? 'bg-gradient-to-r from-star-400 to-star-600 text-white hover:from-star-500 hover:to-star-700'
                : 'bg-gray-600 text-gray-400 cursor-not-allowed'
            }`}
          >
            {isAvailable ? '예약하기' : '예약 마감'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;
