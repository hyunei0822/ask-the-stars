import React, { useState } from 'react';
import { X, Star, Gift, CreditCard } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Artist, Good } from '../types';

interface DonationModalProps {
  isOpen: boolean;
  onClose: () => void;
  artist: Artist;
}

const DonationModal: React.FC<DonationModalProps> = ({ isOpen, onClose, artist }) => {
  const [selectedType, setSelectedType] = useState<'subscription' | 'good' | 'direct'>('subscription');
  const [selectedGood, setSelectedGood] = useState<Good | null>(null);
  const [goodQuantity, setGoodQuantity] = useState<{ [key: string]: number }>({});
  const [directAmount, setDirectAmount] = useState<number>(10000);

  const handleQuantityChange = (goodId: string, change: number) => {
    console.log(`Changing quantity for goodId: ${goodId}, change: ${change}`);
    setGoodQuantity(prev => {
      const currentQuantity = prev[goodId] || 0;
      const newQuantity = Math.max(0, currentQuantity + change);
      console.log(`Previous state:`, prev);
      console.log(`New quantity for ${goodId}: ${newQuantity}`);
      const newState = {
        ...prev,
        [goodId]: newQuantity
      };
      console.log(`New state:`, newState);
      return newState;
    });
  };

  const getTotalPrice = () => {
    if (!selectedGood) return 0;
    // selectedGood의 인덱스를 찾아서 uniqueKey 생성
    const goodIndex = artist.goods?.findIndex(good => good.id === selectedGood.id) ?? -1;
    const uniqueKey = `${selectedGood.id}-${goodIndex}`;
    const quantity = goodQuantity[uniqueKey] || 0;
    return selectedGood.price * quantity;
  };

  const handleDonation = () => {
    // 실제 결제 로직 구현
    alert('결제 기능은 추후 구현 예정입니다!');
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="glass-effect rounded-xl p-6 w-full max-w-md"
            onClick={(e) => e.stopPropagation()}
          >
            {/* 헤더 */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-white">
                {artist.name} 후원하기
              </h2>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* 후원 타입 선택 */}
            <div className="space-y-4 mb-6">
              <div className="grid grid-cols-3 gap-3">
                <button
                  onClick={() => setSelectedType('subscription')}
                  className={`p-3 rounded-lg border transition-all ${
                    selectedType === 'subscription'
                      ? 'border-purple-400 bg-purple-500/20 text-white'
                      : 'border-white/20 text-gray-300 hover:border-white/40'
                  }`}
                >
                  <Star className="w-5 h-5 mx-auto mb-1" />
                  <div className="text-sm font-medium">구독</div>
                </button>
                
                <button
                  onClick={() => setSelectedType('good')}
                  className={`p-3 rounded-lg border transition-all ${
                    selectedType === 'good'
                      ? 'border-purple-400 bg-purple-500/20 text-white'
                      : 'border-white/20 text-gray-300 hover:border-white/40'
                  }`}
                >
                  <Gift className="w-5 h-5 mx-auto mb-1" />
                  <div className="text-sm font-medium">굿즈</div>
                </button>
                
                <button
                  onClick={() => setSelectedType('direct')}
                  className={`p-3 rounded-lg border transition-all ${
                    selectedType === 'direct'
                      ? 'border-purple-400 bg-purple-500/20 text-white'
                      : 'border-white/20 text-gray-300 hover:border-white/40'
                  }`}
                >
                  <CreditCard className="w-5 h-5 mx-auto mb-1" />
                  <div className="text-sm font-medium">직접</div>
                </button>
              </div>
            </div>

            {/* 후원 내용 */}
            <div className="space-y-4 mb-6">
              {selectedType === 'subscription' && (
                <div className="glass-effect rounded-lg p-4">
                  <h3 className="font-medium text-white mb-2">월 구독</h3>
                  <p className="text-gray-300 text-sm mb-3">
                    매월 {artist.subscriptionPrice?.toLocaleString()}원으로 아티스트를 후원하세요
                  </p>
                  <div className="text-2xl font-bold text-star-400">
                    {artist.subscriptionPrice?.toLocaleString()}원/월
                  </div>
                </div>
              )}

              {selectedType === 'good' && (
                <div className="space-y-3">
                  <h3 className="font-medium text-white">굿즈 선택</h3>
                  {artist.goods?.map((good, index) => {
                    const uniqueKey = `${good.id}-${index}`;
                    console.log(`Rendering good: ${good.name}, ID: ${good.id}, Index: ${index}, UniqueKey: ${uniqueKey}, Quantity: ${goodQuantity[uniqueKey] || 0}`);
                    return (
                      <div
                        key={good.id}
                        className={`w-full p-3 rounded-lg border transition-all ${
                          selectedGood?.id === good.id
                            ? 'border-purple-400 bg-purple-500/20'
                            : 'border-white/20 hover:border-white/40'
                        }`}
                      >
                      <div className="flex items-center space-x-3">
                        <button
                          onClick={() => setSelectedGood(good)}
                          className="flex-1 flex items-center space-x-3 text-left"
                        >
                          <img
                            src={good.image}
                            alt={good.name}
                            className="w-12 h-12 rounded-lg object-cover"
                          />
                          <div className="flex-1">
                            <div className="font-medium text-white">{good.name}</div>
                            <div className="text-sm text-gray-300">{good.description}</div>
                            <div className="text-lg font-bold text-star-400">
                              {good.price.toLocaleString()}원
                            </div>
                          </div>
                        </button>
                        
                        {/* 수량 조절 버튼 */}
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleQuantityChange(uniqueKey, -1);
                            }}
                            className="w-8 h-8 rounded-full bg-gray-600 hover:bg-gray-500 flex items-center justify-center text-white text-lg font-bold transition-colors"
                          >
                            -
                          </button>
                          <span className="w-8 text-center text-white font-medium">
                            {goodQuantity[uniqueKey] || 0}
                          </span>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleQuantityChange(uniqueKey, 1);
                            }}
                            className="w-8 h-8 rounded-full bg-gray-600 hover:bg-gray-500 flex items-center justify-center text-white text-lg font-bold transition-colors"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                    );
                  })}
                </div>
              )}

              {selectedType === 'direct' && (
                <div className="glass-effect rounded-lg p-4">
                  <h3 className="font-medium text-white mb-3">직접 후원 금액</h3>
                  <div className="grid grid-cols-3 gap-2 mb-3">
                    {[5000, 10000, 20000, 50000, 100000].map((amount) => (
                      <button
                        key={amount}
                        onClick={() => setDirectAmount(amount)}
                        className={`p-2 rounded-lg border transition-all ${
                          directAmount === amount
                            ? 'border-purple-400 bg-purple-500/20 text-white'
                            : 'border-white/20 text-gray-300 hover:border-white/40'
                        }`}
                      >
                        {amount.toLocaleString()}원
                      </button>
                    ))}
                  </div>
                  <input
                    type="number"
                    value={directAmount}
                    onChange={(e) => setDirectAmount(Number(e.target.value))}
                    className="w-full p-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400"
                    placeholder="직접 입력"
                  />
                </div>
              )}
            </div>

            {/* 투명성 정보 */}
            <div className="mb-4 p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span className="text-green-400 text-sm font-medium">팬의 마음이 온전히 전해집니다</span>
              </div>
              <div className="text-xs text-gray-300 space-y-1">
                <div>• 회사 수수료: 약 10-20% (물품제작비 1,000원 + 인건비 1,000원)</div>
                <div>• 나머지 80-90%는 아티스트에게 직접 전달됩니다</div>
              </div>
            </div>

            {/* 결제 버튼 */}
            <button
              onClick={handleDonation}
              disabled={selectedType === 'good' && (!selectedGood || getTotalPrice() === 0)}
              className={`w-full py-3 rounded-lg font-medium transition-all duration-300 ${
                selectedType === 'good' && (!selectedGood || getTotalPrice() === 0)
                  ? 'bg-gray-500 text-gray-300 cursor-not-allowed'
                  : 'bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600 transform hover:scale-105'
              }`}
            >
              {selectedType === 'subscription' && `${artist.subscriptionPrice?.toLocaleString()}원 구독하기`}
              {selectedType === 'good' && (
                selectedGood && getTotalPrice() > 0 
                  ? `${getTotalPrice().toLocaleString()}원 구매하기 (${goodQuantity[`${selectedGood.id}-${artist.goods?.findIndex(good => good.id === selectedGood.id) ?? -1}`] || 0}개)`
                  : '굿즈를 선택하고 수량을 정해주세요'
              )}
              {selectedType === 'direct' && `${directAmount.toLocaleString()}원 후원하기`}
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default DonationModal;
