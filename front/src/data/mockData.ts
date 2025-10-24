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
        name: '야광팔찌',
        price: 10000,
        image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=200&h=200&fit=crop',
        description: '1개당 1만원 - 어둠 속에서도 빛나는 특별한 팔찌',
        stock: 20
      },
      {
        id: 'g2',
        name: '형광스틱',
        price: 10000,
        image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=200&h=200&fit=crop',
        description: '1개당 1만원 - 공연장에서 함께 즐길 수 있는 형광스틱',
        stock: 30
      },
      {
        id: 'g3',
        name: '박수짝짝이',
        price: 15000,
        image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=200&h=200&fit=crop',
        description: '1개당 1만5천원 - 아티스트를 응원하는 특별한 도구',
        stock: 15
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
        id: 'g1',
        name: '야광팔찌',
        price: 10000,
        image: 'https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=200&h=200&fit=crop',
        description: '1개당 1만원 - 어둠 속에서도 빛나는 특별한 팔찌',
        stock: 20
      },
      {
        id: 'g2',
        name: '형광스틱',
        price: 10000,
        image: 'https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=200&h=200&fit=crop',
        description: '1개당 1만원 - 공연장에서 함께 즐길 수 있는 형광스틱',
        stock: 30
      },
      {
        id: 'g3',
        name: '박수짝짝이',
        price: 15000,
        image: 'https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=200&h=200&fit=crop',
        description: '1개당 1만5천원 - 아티스트를 응원하는 특별한 도구',
        stock: 15
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
        id: 'g1',
        name: '야광팔찌',
        price: 10000,
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop',
        description: '1개당 1만원 - 어둠 속에서도 빛나는 특별한 팔찌',
        stock: 20
      },
      {
        id: 'g2',
        name: '형광스틱',
        price: 10000,
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop',
        description: '1개당 1만원 - 공연장에서 함께 즐길 수 있는 형광스틱',
        stock: 30
      },
      {
        id: 'g3',
        name: '박수짝짝이',
        price: 15000,
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop',
        description: '1개당 1만5천원 - 아티스트를 응원하는 특별한 도구',
        stock: 15
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
        id: 'g1',
        name: '야광팔찌',
        price: 10000,
        image: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=200&h=200&fit=crop',
        description: '1개당 1만원 - 어둠 속에서도 빛나는 특별한 팔찌',
        stock: 20
      },
      {
        id: 'g2',
        name: '형광스틱',
        price: 10000,
        image: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=200&h=200&fit=crop',
        description: '1개당 1만원 - 공연장에서 함께 즐길 수 있는 형광스틱',
        stock: 30
      },
      {
        id: 'g3',
        name: '박수짝짝이',
        price: 15000,
        image: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=200&h=200&fit=crop',
        description: '1개당 1만5천원 - 아티스트를 응원하는 특별한 도구',
        stock: 15
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
};
