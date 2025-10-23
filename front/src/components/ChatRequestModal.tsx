import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Clock, DollarSign, MessageCircle, Star } from 'lucide-react';
import { Artist } from '../types';

interface ChatRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
  artist: Artist;
  onRequestChat: (timeLimit: number, price: number) => void;
}

const ChatRequestModal: React.FC<ChatRequestModalProps> = ({
  isOpen,
  onClose,
  artist,
  onRequestChat
}) => {
  const [selectedTime, setSelectedTime] = useState(5);
  const [message, setMessage] = useState('');

  const timeOptions = [
    { minutes: 5, price: 5000, label: '5분' },
    { minutes: 10, price: 9000, label: '10분' },
    { minutes: 15, price: 13000, label: '15분' },
    { minutes: 30, price: 25000, label: '30분' }
  ];

  const selectedOption = timeOptions.find(option => option.minutes === selectedTime);

  const handleRequest = () => {
    if (selectedOption) {
      onRequestChat(selectedOption.minutes, selectedOption.price);
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="glass-effect rounded-xl p-6 w-full max-w-md"
          >
            {/* 헤더 */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                  <MessageCircle className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white">채팅 요청</h2>
                  <p className="text-sm text-gray-300">{artist.name}님과의 채팅</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* 아티스트 정보 */}
            <div className="flex items-center space-x-3 p-4 bg-white/5 rounded-lg mb-6">
              <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white/20">
                <img
                  src={artist.profileImage}
                  alt={artist.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <h3 className="font-bold text-white">{artist.name}</h3>
                  <div className="flex items-center space-x-1 bg-gradient-to-r from-star-400 to-star-600 text-white px-2 py-1 rounded-full text-xs">
                    <Star className="w-3 h-3 fill-current" />
                    <span>아티스트</span>
                  </div>
                </div>
                <p className="text-sm text-gray-300">{artist.description}</p>
              </div>
            </div>

            {/* 시간 선택 */}
            <div className="mb-6">
              <h3 className="text-lg font-bold text-white mb-4">채팅 시간 선택</h3>
              <div className="grid grid-cols-2 gap-3">
                {timeOptions.map((option) => (
                  <button
                    key={option.minutes}
                    onClick={() => setSelectedTime(option.minutes)}
                    className={`p-4 rounded-lg border-2 transition-all duration-200 ${
                      selectedTime === option.minutes
                        ? 'border-purple-400 bg-purple-500/20'
                        : 'border-white/20 bg-white/5 hover:border-white/40'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <Clock className="w-4 h-4 text-gray-400" />
                      <span className="text-sm font-medium text-white">{option.label}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <DollarSign className="w-4 h-4 text-star-400" />
                      <span className="text-lg font-bold text-star-400">
                        {option.price.toLocaleString()}원
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* 메시지 */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-300 mb-2">
                채팅 요청 메시지 (선택사항)
              </label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={3}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-400"
                placeholder="채팅하고 싶은 내용을 간단히 적어주세요..."
              />
            </div>

            {/* 요약 */}
            <div className="p-4 bg-white/5 rounded-lg mb-6">
              <h4 className="font-bold text-white mb-2">요청 요약</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-300">채팅 시간:</span>
                  <span className="text-white">{selectedOption?.label}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">결제 금액:</span>
                  <span className="text-star-400 font-bold">
                    {selectedOption?.price.toLocaleString()}원
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">상태:</span>
                  <span className="text-yellow-400">아티스트 승인 대기</span>
                </div>
              </div>
            </div>

            {/* 주의사항 */}
            <div className="p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg mb-6">
              <h4 className="font-bold text-yellow-400 mb-2">⚠️ 주의사항</h4>
              <ul className="text-sm text-yellow-300 space-y-1">
                <li>• 아티스트가 요청을 승인해야 채팅이 가능합니다</li>
                <li>• 승인 후 결제가 진행됩니다</li>
                <li>• 시간이 만료되면 자동으로 채팅이 종료됩니다</li>
                <li>• 채팅 내역은 저장되며 나중에 확인할 수 있습니다</li>
              </ul>
            </div>

            {/* 버튼들 */}
            <div className="flex space-x-3">
              <button
                onClick={onClose}
                className="flex-1 px-4 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
              >
                취소
              </button>
              <button
                onClick={handleRequest}
                className="flex-1 px-4 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg hover:from-blue-600 hover:to-purple-600 transition-all duration-300 transform hover:scale-105"
              >
                채팅 요청하기
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ChatRequestModal;
