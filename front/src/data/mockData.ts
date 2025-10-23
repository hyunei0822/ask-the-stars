import { Artist } from '../types';

export const mockArtists: Artist[] = [
  {
    id: '1',
    name: '김바이올린',
    category: 'music',
    subcategory: 'classical',
    profileImage: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop&crop=face',
    coverImage: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&h=300&fit=crop',
    description: '클래식 바이올린 연주자. 길거리에서 클래식의 아름다움을 전파합니다.',
    location: '홍대입구역 2번 출구',
    locations: ['홍대', '마포구', '서울'],
    schedule: '매주 토요일 오후 2-6시',
    followers: 1250,
    subscriptionPrice: 50000,
    videos: [
      {
        id: 'v1',
        title: '바하 무반주 바이올린 소나타',
        thumbnail: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=200&fit=crop',
        url: '#',
        duration: '4:32',
        views: 15420,
        uploadDate: '2024-01-15'
      }
    ],
    goods: [
      {
        id: 'g1',
        name: '수제 바이올린 손목띠',
        price: 10000,
        image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=200&h=200&fit=crop',
        description: '김바이올린이 직접 제작한 수제 손목띠입니다.',
        stock: 20
      }
    ]
  },
  {
    id: '2',
    name: '춤추는별',
    category: 'dance',
    subcategory: 'kpop_dance',
    profileImage: 'https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=400&h=400&fit=crop&crop=face',
    coverImage: 'https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=800&h=300&fit=crop',
    description: 'K-POP 댄스 커버 전문가. 역동적인 무대와 완벽한 안무로 관객을 사로잡습니다.',
    location: '강남역 11번 출구',
    locations: ['강남구', '서울', '강남역'],
    schedule: '매주 일요일 오후 3-7시',
    followers: 3200,
    subscriptionPrice: 30000,
    videos: [
      {
        id: 'v2',
        title: 'NewJeans - Get Up 안무 커버',
        thumbnail: 'https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=300&h=200&fit=crop',
        url: '#',
        duration: '3:15',
        views: 45600,
        uploadDate: '2024-01-20'
      }
    ],
    goods: [
      {
        id: 'g2',
        name: '댄스 워크샵 티켓',
        price: 25000,
        image: 'https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=200&h=200&fit=crop',
        description: '1:1 댄스 레슨 티켓입니다.',
        stock: 10
      }
    ]
  },
  {
    id: '3',
    name: '길거리화가',
    category: 'art',
    subcategory: 'portrait',
    profileImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face',
    coverImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=300&fit=crop',
    description: '순간의 아름다움을 캔버스에 담는 포트레이트 아티스트. 길거리에서 만나는 사람들의 특별한 순간을 그림으로 기록합니다.',
    location: '명동역 6번 출구',
    schedule: '평일 오후 1-5시',
    followers: 890,
    subscriptionPrice: 40000,
    videos: [
      {
        id: 'v3',
        title: '5분 초상화 그리기',
        thumbnail: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=200&fit=crop',
        url: '#',
        duration: '5:20',
        views: 12300,
        uploadDate: '2024-01-18'
      }
    ],
    goods: [
      {
        id: 'g3',
        name: '수채화 초상화',
        price: 50000,
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop',
        description: 'A4 사이즈 수채화 초상화입니다.',
        stock: 5
      }
    ]
  },
  {
    id: '4',
    name: '국악소리',
    category: 'music',
    subcategory: 'korean_traditional',
    profileImage: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=400&h=400&fit=crop&crop=face',
    coverImage: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=800&h=300&fit=crop',
    description: '전통 국악의 아름다움을 현대적으로 재해석하는 가야금 연주자.',
    location: '인사동길',
    schedule: '매주 금요일 오후 4-8시',
    followers: 2100,
    subscriptionPrice: 60000,
    videos: [
      {
        id: 'v4',
        title: '아리랑 가야금 연주',
        thumbnail: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=300&h=200&fit=crop',
        url: '#',
        duration: '6:45',
        views: 28900,
        uploadDate: '2024-01-22'
      }
    ],
    goods: [
      {
        id: 'g4',
        name: '전통 문양 스티커',
        price: 5000,
        image: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=200&h=200&fit=crop',
        description: '한국 전통 문양이 들어간 스티커 세트입니다.',
        stock: 50
      }
    ]
  }
];

export const categories = {
  music: {
    name: '음악',
    icon: '🎵',
    subcategories: {
      classical: '클래식',
      korean_traditional: '국악',
      kpop: 'K-POP',
      korean_pop: '가요',
      jazz: '재즈',
      rock: '록',
      acoustic: '어쿠스틱'
    }
  },
  dance: {
    name: '댄스',
    icon: '💃',
    subcategories: {
      ballet: '발레',
      breakdance: '브레이크댄스',
      traditional: '전통무용',
      kpop_dance: 'K-POP 댄스',
      contemporary: '컨템포러리',
      hiphop: '힙합'
    }
  },
  art: {
    name: '아트',
    icon: '🎨',
    subcategories: {
      portrait: '초상화',
      mural: '벽화',
      sculpture: '조각',
      caricature: '캐리커처',
      digital_art: '디지털 아트',
      street_art: '스트리트 아트'
    }
  },
  fashion: {
    name: '패션',
    icon: '👗',
    subcategories: {
      street_fashion: '스트리트 패션',
      vintage: '빈티지',
      korean_fashion: '한국 패션',
      sustainable: '지속가능 패션',
      custom: '맞춤 제작',
      styling: '스타일링'
    }
  },
  beauty: {
    name: '뷰티',
    icon: '💄',
    subcategories: {
      makeup: '메이크업',
      skincare: '스킨케어',
      hair: '헤어',
      nail: '네일',
      korean_beauty: 'K-뷰티',
      tutorial: '뷰티 튜토리얼'
    }
  },
  performance: {
    name: '공연',
    icon: '🎭',
    subcategories: {
      theater: '연극',
      musical: '뮤지컬',
      magic: '마술',
      comedy: '코미디',
      circus: '서커스',
      street_performance: '길거리 공연'
    }
  },
  brand: {
    name: '브랜드',
    icon: '🏷️',
    subcategories: {
      fashion_brand: '패션 브랜드',
      beauty_brand: '뷰티 브랜드',
      lifestyle: '라이프스타일',
      tech: '테크 브랜드',
      food: '푸드 브랜드',
      startup: '스타트업'
    }
  },
  fitness: {
    name: '운동',
    icon: '💪',
    subcategories: {
      yoga: '요가',
      pilates: '필라테스',
      dance_fitness: '댄스 피트니스',
      strength: '근력 운동',
      cardio: '유산소',
      outdoor: '야외 운동'
    }
  },
  healing: {
    name: '힐링',
    icon: '🧘',
    subcategories: {
      meditation: '명상',
      mindfulness: '마인드풀니스',
      therapy: '치료',
      wellness: '웰니스',
      spa: '스파',
      mental_health: '정신 건강'
    }
  },
  product: {
    name: '제품',
    icon: '🛍️',
    subcategories: {
      handmade: '수제 제품',
      artisanal: '장인 제품',
      organic: '유기농',
      eco_friendly: '친환경',
      tech_gadgets: '테크 가젯',
      home_decor: '홈 데코'
    }
  }
};
